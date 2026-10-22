/**
 * Umtausch-Rechner : Papier- oder Kartenführerschein, Geburtsjahr, Ausstellungsjahr → Frist nach
 * Anlage 8e FeV, Tage bis zur Frist, Gebühr nach GebOSt, Verwarnungsgeld bei Fristversäumnis.
 * Premier rendu = date du build ; la date du jour est lue après hydratation (RECETTE §17.5).
 */
import { useEffect, useState } from 'react';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { Shell, Head, Rows, Note, MethodLink, type L } from '../calc/kit';
import { umtauschFrist, ablaufKarte, type Art } from '../../lib/engine/umtausch';
import { P } from '../../lib/engine/params';
import { formatMoney, formatNumber, displayDate } from '../../lib/format';
import { updateURL, readParams } from '../../lib/url-state';
import { parisNow } from '../../lib/today';

interface Props { lang: L; id: string; today: string; art?: Art; geburtsjahr?: number; ausstellungsjahr?: number; methodHref?: string }
const T = <A,>(l: L, de: A, en: A) => (l === 'en' ? en : de);
const years = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => String(b - i)).map((y) => ({ value: y, label: y }));

export default function UmtauschRechner({ lang: l, id, today: t0, art: a0 = 'papier', geburtsjahr: g0 = 1968, ausstellungsjahr: s0 = 2003, methodHref }: Props) {
  const [today, setToday] = useState(t0);
  const [art, setArt] = useState<Art>(a0);
  const [geb, setGeb] = useState(g0);
  const [aus, setAus] = useState(s0);
  useEffect(() => {
    setToday(parisNow().date);
    const sp = readParams(window.location.search);
    const a = sp.get('a'), g = Number(sp.get('g')), s = Number(sp.get('s'));
    if (a === 'papier' || a === 'karte') setArt(a);
    if (g >= 1920 && g <= 2010) setGeb(g);
    if (s >= 1999 && s <= 2026) setAus(s);
  }, []);
  useEffect(() => { updateURL({ a: art, g: geb, s: art === 'karte' ? aus : undefined }); }, [art, geb, aus]);

  const r = umtauschFrist({ art, geburtsjahr: geb, ausstellungsjahr: aus }, today);
  const tag = l === 'en' ? 'en-GB' : 'de-DE';
  const d = (iso: string) => displayDate(iso, tag);
  const eur = (x: number) => formatMoney(x, 2, l);
  const zeile = r.zeile ? (r.zeile.von && r.zeile.bis ? `${r.zeile.von}–${r.zeile.bis}` : r.zeile.bis ? T(l, `vor ${r.zeile.bis + 1}`, `before ${r.zeile.bis + 1}`) : T(l, `ab ${r.zeile.von}`, `${r.zeile.von} or later`)) : '—';
  const form = (
    <>
      <Toggle id={`${id}-a`} label={T(l, 'Ihr Führerschein', 'Your licence')} value={art} onChange={(x) => setArt(x as Art)} options={[{ value: 'papier', label: T(l, 'Papier', 'Paper') }, { value: 'karte', label: T(l, 'Scheckkarte', 'Plastic card') }]} />
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        <SelectField id={`${id}-g`} label={T(l, 'Geburtsjahr', 'Year of birth')} value={String(geb)} onChange={(x) => setGeb(Number(x))} options={years(1925, 2010)} />
        {art === 'karte' && <SelectField id={`${id}-s`} label={T(l, 'Ausstellungsjahr (Feld 4a)', 'Year issued (field 4a)')} value={String(aus)} onChange={(x) => setAus(Number(x))} options={years(1999, 2026)} />}
      </div>
      <Note>{art === 'papier'
        ? T(l, 'Papierführerscheine wurden bis zum 31. Dezember 1998 ausgestellt. Für sie zählt nur Ihr Geburtsjahr.', 'Paper licences were issued until 31 December 1998. Only your year of birth counts for them.')
        : T(l, 'Für Kartenführerscheine von 1999 bis zum 18. Januar 2013 zählt das Ausstellungsjahr in Feld 4a, außer Sie sind vor 1953 geboren.', 'For card licences issued from 1999 to 18 January 2013 the year in field 4a counts, unless you were born before 1953.')}</Note>
    </>
  );
  const result = r.regel === 'befristet' ? (
    <>
      <Head label={T(l, 'Kein Pflichtumtausch', 'No mandatory exchange')} value={T(l, '15 Jahre', '15 years')} sub={T(l, `Ab dem 19. Januar 2013 ausgestellte Karten sind befristet; das Ablaufdatum steht in Feld 4b. Eine ${aus} ausgestellte Karte läuft ${aus + P.fuehrerschein.gueltigkeit_jahre} ab.`, `Cards issued from 19 January 2013 carry an expiry date in field 4b. A card issued in ${aus} expires in ${aus + P.fuehrerschein.gueltigkeit_jahre}.`)} />
      <Rows rows={[[T(l, 'Neuer Führerschein bei Ablauf', 'New card on expiry'), eur(r.gebuehr)]]} />
      <MethodLink href={methodHref} lang={l} />
    </>
  ) : r.frist ? (
    <>
      <Head label={r.abgelaufen ? T(l, 'Frist abgelaufen am', 'Deadline passed on') : T(l, 'Umtauschen bis spätestens', 'Exchange by')} value={d(r.frist)}
        sub={r.abgelaufen ? T(l, `seit ${formatNumber(-r.tage!, 0, l)} Tagen: Der alte Führerschein ist kein gültiges Dokument mehr, die Fahrerlaubnis bleibt.`, `${formatNumber(-r.tage!, 0, l)} days ago: the old licence is no longer a valid document, your driving entitlement remains.`) : T(l, `noch ${formatNumber(r.tage!, 0, l)} Tage`, `${formatNumber(r.tage!, 0, l)} days left`)} />
      <Rows rows={[
        [r.regel === 'karte' ? T(l, 'Zeile der Anlage 8e (Ausstellungsjahr)', 'Annex 8e row (year issued)') : T(l, 'Zeile der Anlage 8e (Geburtsjahr)', 'Annex 8e row (year of birth)'), zeile],
        [T(l, 'Gebühr: GebOSt Nr. 202.5 + KBA Nr. 126.2', 'Fee: GebOSt no. 202.5 + KBA no. 126.2'), eur(r.gebuehr), true],
        ...(r.abgelaufen ? [[T(l, 'Verwarnungsgeld bei einer Kontrolle', 'On-the-spot fine if stopped'), formatMoney(P.fuehrerschein.verwarnungsgeld, 0, l)] as [string, string]] : []),
        [T(l, 'Neue Karte gültig bis etwa', 'New card valid until about'), d(ablaufKarte(today))],
      ]} />
      {r.regel === 'karte' && aus === 2013 && <Note>{T(l, 'Gilt nur, wenn die Karte vor dem 19. Januar 2013 ausgestellt wurde; danach ist sie 15 Jahre gültig.', 'Applies only if the card was issued before 19 January 2013; later cards are valid for 15 years.')}</Note>}
      <Note>{T(l, 'Dazu kommt bei manchen Behörden der Direktversand per Post, wenn Sie ihn wählen.', 'Some offices add a postal delivery charge if you choose home delivery.')}</Note>
      <MethodLink href={methodHref} lang={l} />
    </>
  ) : (
    <Head label={T(l, 'Diese Angabe passt zu keiner Zeile', 'This combination matches no row')} value="—" sub={T(l, 'Kartenführerscheine gibt es seit 1999.', 'Card licences exist since 1999.')} />
  );
  return <Shell id={id} form={form} result={result} />;
}
