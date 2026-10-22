/**
 * L'outil principal : Ort, Postleitzahl, Kreis ou Kennzeichen → Zulassungsbehörde zuständige
 * (Hauptstelle et Nebenstellen, adresse KBA), Kennzeichen du Kreis, Fahrerlaubnisbehörde, parc
 * automobile (KBA FZ1) et la Gebühr GebOSt de la démarche choisie. Premier rendu = le Bezirk de la
 * page (props) ; les fichiers complets ne sont chargés qu'à la première saisie. Rien n'est envoyé.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { Shell, Head, Rows, Note, MethodLink, type L } from '../calc/kit';
import { berechne, hatOnline, type VorgangId } from '../../lib/engine/gebuehren';
import { VORGANG_TEXT, VORGANG_ORDRE } from '../../lib/vorgaenge-text';
import { chargerDaten, chargerGemeinden, paket as paketDe, bezirkVonGemeinde, suche, landName, anteil, type Daten, type Gemeinde, type Paket, type Treffer } from '../../lib/zul';
import { formatMoney, formatNumber, formatPercent, displayDate } from '../../lib/format';
import { updateURL, readParams } from '../../lib/url-state';

export interface LokalPosten { id: string; de: string; en: string; betrag: number; url: string }
export interface Lokal { stadt: string; abgerufen: string; posten: LokalPosten[] }
interface Props { lang: L; id: string; initial: Paket; lokal?: Record<string, Lokal>; today: string; /** Stand des KBA-Verzeichnisses, in der Sprache der Seite. */ stand: string; vorgang?: VorgangId; methodHref?: string; kostenHref?: string }

const T = <A,>(l: L, de: A, en: A) => (l === 'en' ? en : de);
const eur = (x: number, l: L) => formatMoney(x, 2, l);
/** Montant publié par la ville pour la démarche (correspondance simple entre nos démarches et ses postes). */
const LOKAL_MAP: Partial<Record<VorgangId, [string, string]>> = { neu: ['neu', 'neuOnline'], abmelden: ['abmelden', 'abmeldenOnline'], wieder: ['wieder', 'wiederOnline'], umschreibung: ['umschreibung', 'umschreibung'], adresse: ['adresse', 'adresse'] };

export default function BehoerdenFinder({ lang: l, id, initial, lokal = {}, today, stand, vorgang: v0 = 'neu', methodHref, kostenHref }: Props) {
  const [p, setP] = useState<Paket>(initial);
  const [daten, setDaten] = useState<Daten | null>(null);
  const [gem, setGem] = useState<Gemeinde[] | null>(null);
  const [q, setQ] = useState(initial.bezirk.kreis);
  const [ouvert, setOuvert] = useState(false);
  const [actif, setActif] = useState(0);
  const [vorgang, setVorgang] = useState<VorgangId>(v0);
  const [online, setOnline] = useState(false);
  const [charge, setCharge] = useState(false);
  const [hinweis, setHinweis] = useState('');

  const charger = () => {
    if (charge) return;
    setCharge(true);
    chargerDaten().then(setDaten).catch(() => setCharge(false));
    chargerGemeinden().then(setGem).catch(() => undefined);
  };
  // Lien partagé : lu après le premier rendu seulement (RECETTE §17.5).
  useEffect(() => {
    const sp = readParams(window.location.search);
    const b = sp.get('b'), vg = sp.get('v') as VorgangId | null;
    if (vg && VORGANG_TEXT[vg]) setVorgang(vg);
    if (sp.get('o') === '1') setOnline(true);
    if (b && b !== initial.bezirk.id) { setCharge(true); chargerDaten().then((d) => { setDaten(d); const x = paketDe(d, b); if (x) { setP(x); setQ(x.bezirk.kreis); } }); chargerGemeinden().then(setGem); }
  }, []);
  useEffect(() => { updateURL({ b: p.bezirk.id, v: vorgang, o: online ? 1 : undefined }); }, [p, vorgang, online]);

  const sugg = useMemo<Treffer[]>(() => (daten && gem && ouvert ? suche(daten, gem, q) : []), [daten, gem, q, ouvert]);
  const choisir = (t: Treffer) => {
    if (!daten) return;
    setOuvert(false);
    let bid: string | undefined; let h = '';
    if (t.typ === 'kz') { bid = t.bezirke[0] ?? t.alt[0]; h = t.bezirke.length > 1 ? T(l, `Das Kennzeichen ${t.code} vergeben ${t.bezirke.length} Behörden; angezeigt ist die erste.`, `${t.bezirke.length} offices issue ${t.code}; the first is shown.`) : !t.bezirke.length ? T(l, `${t.code} wird nicht mehr ausgegeben (auslaufend).`, `${t.code} is no longer issued (being phased out).`) : ''; setQ(t.code); }
    else if (t.typ === 'gemeinde') { bid = bezirkVonGemeinde(daten.bezirke, t.g)?.id; setQ(t.g.name); }
    else { bid = t.b.id; setQ(t.b.kreis); }
    const x = bid ? paketDe(daten, bid) : null;
    if (x) setP(x);
    setHinweis(h);
  };
  const label = (t: Treffer) => t.typ === 'kz' ? `${t.code} · ${T(l, 'Kennzeichen', 'plate code')}` : t.typ === 'gemeinde' ? `${t.g.name} (${t.g.plz[0] ?? ''}${t.g.plz.length > 1 ? '…' : ''})` : `${t.b.kreis} · ${T(l, 'Kreis', 'district')}`;

  const r = berechne({ vorgang, online });
  const b = p.bezirk, st = b.stat;
  const lk = lokal[b.id] ?? lokal[b.kz];
  const map = LOKAL_MAP[vorgang];
  const lp = lk && map ? lk.posten.find((x) => x.id === map[online ? 1 : 0]) : undefined;
  const haupt = p.stellen.filter((s) => s.art === 'haupt'), neben = p.stellen.filter((s) => s.art === 'neben');
  const options = VORGANG_ORDRE.map((v) => ({ value: v, label: VORGANG_TEXT[v][l] }));

  const form = (
    <>
      <div className="relative">
        <label htmlFor={`${id}-q`} className="mb-1 block text-sm font-medium text-navy-700">{T(l, 'Ort, Postleitzahl, Kreis oder Kennzeichen', 'Town, postcode, district or plate code')}</label>
        <input id={`${id}-q`} type="text" autoComplete="off" spellCheck={false} role="combobox" aria-expanded={sugg.length > 0} aria-controls={`${id}-sugg`} aria-autocomplete="list"
          value={q} onFocus={(e) => { charger(); e.currentTarget.select(); }}
          onChange={(e) => { setQ(e.target.value); setOuvert(true); setActif(0); charger(); }}
          onKeyDown={(e) => { if (!sugg.length) return; if (e.key === 'ArrowDown') { e.preventDefault(); setActif((a) => Math.min(a + 1, sugg.length - 1)); } else if (e.key === 'ArrowUp') { e.preventDefault(); setActif((a) => Math.max(a - 1, 0)); } else if (e.key === 'Enter') { e.preventDefault(); choisir(sugg[actif]); } else if (e.key === 'Escape') setOuvert(false); }}
          onBlur={() => setTimeout(() => setOuvert(false), 150)}
          className="h-12 w-full rounded-lg border border-navy-300 bg-white px-4 text-lg text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
        <p className="mt-1 text-xs text-navy-600">{charge && !gem ? T(l, 'Lade 11 000 Gemeinden …', 'Loading 11,000 municipalities…') : T(l, 'Alle Gemeinden und Kreise, alle Unterscheidungszeichen', 'Every municipality, district and plate code')}</p>
        {sugg.length > 0 && (
          <ul id={`${id}-sugg`} role="listbox" className="absolute z-30 mt-1 max-h-72 w-full overflow-auto rounded-lg border border-navy-200 bg-white py-1 shadow-lg">
            {sugg.map((t, i) => (
              <li key={label(t) + i} role="option" aria-selected={i === actif} onMouseDown={(e) => { e.preventDefault(); choisir(t); }}
                className={`cursor-pointer px-3 py-2 text-sm ${i === actif ? 'bg-accent-50 text-navy-900' : 'text-navy-700'}`}>{label(t)}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-4">
        <SelectField id={`${id}-v`} label={T(l, 'Was wollen Sie erledigen?', 'What do you need to do?')} value={vorgang} onChange={(x) => setVorgang(x as VorgangId)} options={options} />
        <Toggle id={`${id}-o`} label={T(l, 'Antrag', 'Application')} value={online && hatOnline(vorgang) ? '1' : '0'} onChange={(x) => setOnline(x === '1')} options={[{ value: '0', label: T(l, 'Vor Ort', 'In person') }, { value: '1', label: 'Online' }]} />
      </div>
      {hinweis && <Note>{hinweis}</Note>}
      <Note>{T(l,
        `Anschriften: Verzeichnis des Kraftfahrt-Bundesamts, Stand ${stand}. Gebühren: GebOSt, bundesweit gleich. Daten vom ${displayDate(today, 'de-DE')}.`,
        `Addresses: Federal Motor Transport Authority directory, as of ${stand}. Fees: GebOSt, the same nationwide. Data of ${displayDate(today, 'en-GB')}.`)}</Note>
    </>
  );

  const result = (
    <>
      <Head label={T(l, `${VORGANG_TEXT[vorgang].de} · ${b.kreis}`, `${VORGANG_TEXT[vorgang].en} · ${b.kreis}`)} value={eur(r.gebuehr, l)}
        sub={T(l, `Gebühr nach GebOSt${r.online ? ', online' : ''}; mit Plaketten und KBA-Anteil ${eur(r.min, l)} bis ${eur(r.max, l)}`, `GebOSt fee${r.online ? ', online' : ''}; with seals and the KBA share ${eur(r.min, l)} to ${eur(r.max, l)}`)} />
      <Rows rows={[
        [T(l, 'Kennzeichen des Kreises', 'District plate codes'), b.uz.join(', ') || '—', true],
        ...(b.alt.length ? [[T(l, 'Auslaufend (nur noch Bestand)', 'Phased out (existing cars only)'), b.alt.join(', ')] as [string, string]] : []),
        [T(l, 'Bundesland', 'State'), landName(b.land, l)],
        ...(r.ersparnisOnline !== null && r.ersparnisOnline > 0 ? [[T(l, r.online ? 'Gespart gegenüber vor Ort' : 'Online wären es weniger', r.online ? 'Saved versus in person' : 'Online would cost less by'), eur(r.ersparnisOnline, l)] as [string, string]] : []),
        lp ? [T(l, `Von ${lk!.stadt} veröffentlicht`, `Published by ${lk!.stadt}`), eur(lp.betrag, l)] : [T(l, 'Eigener Betrag der Stadt', 'City’s own amount'), T(l, 'von der Stadt nicht veröffentlicht', 'not published by the city')],
      ]} />
      {r.onlineNichtMoeglich && <Note>{T(l, 'Diesen Antrag gibt es nicht online: gerechnet ist der Betrag vor Ort.', 'This application is not available online: the in-person amount is shown.')}</Note>}
      {kostenHref && <p className="mt-3 text-sm"><a href={kostenHref} className="font-medium text-accent-700 underline">{T(l, 'Alle Posten einzeln, mit Wunschkennzeichen', 'Every line item, with a personalised number')}</a></p>}
      <MethodLink href={methodHref} lang={l} />
    </>
  );

  return (
    <div>
      <Shell id={id} form={form} result={result} />
      <div data-chrome className="not-prose mt-4 grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-navy-200 bg-white p-4">
          <h3 className="text-base font-semibold text-navy-900">{T(l, 'Zulassungsbehörde', 'Registration office')}: {b.behoerde}</h3>
          <ul className="mt-2 space-y-3 text-sm text-navy-700">
            {[...haupt, ...neben].map((s) => (
              <li key={s.id}>
                <span className="font-medium text-navy-900">{s.art === 'haupt' ? T(l, 'Hauptstelle', 'Main office') : T(l, 'Außenstelle', 'Branch')} {s.ort}</span><br />
                {s.strasse}, {s.plz} {s.stadt}{s.tel && <><br />{T(l, 'Tel.', 'Tel.')} {s.tel}</>}{s.mail && <><br />{s.mail}</>}
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-xl border border-navy-200 bg-white p-4">
          <h3 className="text-base font-semibold text-navy-900">{T(l, 'Führerscheinstelle', 'Driving licence office')}</h3>
          {p.fe.length ? (
            <ul className="mt-2 space-y-3 text-sm text-navy-700">
              {p.fe.slice(0, 4).map((f, i) => <li key={i}><span className="font-medium text-navy-900">{f.name}</span><br />{f.strasse}, {f.plz} {f.stadt}{f.tel && <><br />{T(l, 'Tel.', 'Tel.')} {f.tel}</>}</li>)}
              {p.fe.length > 4 && <li className="text-navy-600">{T(l, `und ${p.fe.length - 4} weitere im Kreis`, `and ${p.fe.length - 4} more in the district`)}</li>}
            </ul>
          ) : <p className="mt-2 text-sm text-navy-600">{T(l, 'Im Verzeichnis der Fahrerlaubnisbehörden nicht unter diesem Kreisschlüssel geführt.', 'Not listed under this district code in the licensing office directory.')}</p>}
          {st && (
            <p className="mt-3 border-t border-navy-100 pt-3 text-sm text-navy-700">
              {T(l,
                `${formatNumber(st.pkw, 0, l)} Pkw zugelassen (1. Januar 2026), davon ${formatPercent(anteil(st.bev, st.pkw), 1, l)} rein elektrisch; ${formatNumber(st.pkwDichte, 0, l)} Pkw je 1.000 Einwohner.`,
                `${formatNumber(st.pkw, 0, l)} cars registered (1 January 2026), ${formatPercent(anteil(st.bev, st.pkw), 1, l)} fully electric; ${formatNumber(st.pkwDichte, 0, l)} cars per 1,000 residents.`)}
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
