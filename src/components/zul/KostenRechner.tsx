/**
 * Kostenrechner : une démarche, ses options (en ligne, Wunschkennzeichen, réservation, ancien
 * Fahrzeugbrief, Wechselkennzeichen, changement de détenteur) → chaque ligne de la GebOSt avec son
 * numéro, les petits postes en fourchette, le prix des plaques saisi par l'utilisateur.
 */
import { useEffect, useState } from 'react';
import SelectField from '../ui/SelectField';
import NumberField from '../ui/NumberField';
import Toggle from '../ui/Toggle';
import { Shell, Head, Rows, Note, MethodLink, type L } from '../calc/kit';
import { berechne, VORGAENGE, type VorgangId } from '../../lib/engine/gebuehren';
import { VORGANG_TEXT, VORGANG_ORDRE, zeileText } from '../../lib/vorgaenge-text';
import { formatMoney } from '../../lib/format';
import { updateURL, readParams } from '../../lib/url-state';

interface Props { lang: L; id: string; vorgang?: VorgangId; vorgaenge?: VorgangId[]; wunsch?: boolean; online?: boolean; methodHref?: string }
const T = <A,>(l: L, de: A, en: A) => (l === 'en' ? en : de);
const eur = (x: number, l: L) => formatMoney(x, 2, l);
const spanne = (a: number, b: number, l: L) => (a === b ? eur(a, l) : `${eur(a, l)} – ${eur(b, l)}`);

export default function KostenRechner({ lang: l, id, vorgang: v0 = 'neu', vorgaenge, wunsch: w0 = false, online: o0 = false, methodHref }: Props) {
  const [vorgang, setVorgang] = useState<VorgangId>(v0);
  const [online, setOnline] = useState(o0);
  const [wunsch, setWunsch] = useState(w0);
  const [reserv, setReserv] = useState(w0);
  const [brief, setBrief] = useState(false);
  const [wechsel, setWechsel] = useState(false);
  const [halter, setHalter] = useState(false);
  const [schilder, setSchilder] = useState(0);
  useEffect(() => {
    const sp = readParams(window.location.search);
    const v = sp.get('v') as VorgangId | null;
    if (v && VORGAENGE[v]) setVorgang(v);
    const b = (k: string, f: (x: boolean) => void) => { const x = sp.get(k); if (x !== null) f(x === '1'); };
    b('o', setOnline); b('w', setWunsch); b('r', setReserv); b('fb', setBrief); b('wk', setWechsel); b('h', setHalter);
    const s = Number(sp.get('s')); if (s > 0 && s < 500) setSchilder(s);
  }, []);
  useEffect(() => { updateURL({ v: vorgang, o: online ? 1 : 0, w: wunsch ? 1 : 0, r: reserv ? 1 : 0, fb: brief ? 1 : 0, wk: wechsel ? 1 : 0, h: halter ? 1 : 0, s: schilder || undefined }); }, [vorgang, online, wunsch, reserv, brief, wechsel, halter, schilder]);

  const d = VORGAENGE[vorgang];
  const r = berechne({ vorgang, online, wunsch, reservierung: reserv, brief, wechsel, halterwechsel: halter, schilderPreis: schilder });
  const ja = (k: string, label: string, v: boolean, set: (x: boolean) => void) => (
    <Toggle key={k} id={`${id}-${k}`} label={label} value={v ? '1' : '0'} onChange={(x) => set(x === '1')} options={[{ value: '0', label: T(l, 'Nein', 'No') }, { value: '1', label: T(l, 'Ja', 'Yes') }]} />
  );
  const liste = vorgaenge ?? VORGANG_ORDRE;
  const form = (
    <>
      <SelectField id={`${id}-v`} label={T(l, 'Vorgang', 'Procedure')} value={vorgang} onChange={(x) => setVorgang(x as VorgangId)} options={liste.map((v) => ({ value: v, label: VORGANG_TEXT[v][l] }))} />
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        {d.online ? <Toggle id={`${id}-o`} label={T(l, 'Antrag', 'Application')} value={online ? '1' : '0'} onChange={(x) => setOnline(x === '1')} options={[{ value: '0', label: T(l, 'Vor Ort', 'Counter') }, { value: '1', label: 'Online' }]} /> : null}
        {d.wunsch && ja('w', T(l, 'Wunschkennzeichen', 'Personalised number'), wunsch, setWunsch)}
        {((d.wunsch && wunsch) || d.reserv) && ja('r', d.reserv ? T(l, 'Kennzeichen reservieren', 'Reserve the plate') : T(l, 'Vorab reserviert', 'Reserved in advance'), reserv, setReserv)}
        {d.brief && !online && ja('fb', T(l, 'Alter Fahrzeugbrief', 'Old-style logbook'), brief, setBrief)}
        {d.wechsel && ja('wk', T(l, 'Wechselkennzeichen', 'Interchangeable plate'), wechsel, setWechsel)}
        {d.halter === 'wahl' && ja('h', T(l, 'Neuer Halter', 'New keeper'), halter, setHalter)}
        {d.schilder && <NumberField id={`${id}-s`} label={T(l, 'Preis der Schilder (Händler)', 'Plate price (shop)')} value={schilder} onChange={setSchilder} unit="€" max={300} decimals={2} lang={l} />}
      </div>
      <Note>{T(l,
        'Die Schilder prägt ein Schilderhändler, nicht die Behörde: Tragen Sie seinen Preis ein, wenn er mitgerechnet werden soll. Versicherung (eVB-Nummer) und Kfz-Steuer sind keine Zulassungsgebühren.',
        'Plates are made by a private plate shop, not the office: enter its price if you want it included. Insurance (eVB number) and vehicle tax are not registration fees.')}</Note>
    </>
  );
  const rows: Array<[string, string] | [string, string, boolean]> = [
    ...r.fest.map((z) => [zeileText(z.key, z.nr, l), eur(z.betrag, l)] as [string, string]),
    [T(l, 'Gebühr nach GebOSt', 'GebOSt fee'), eur(r.gebuehr, l), true],
    ...r.neben.filter((z) => (z.max ?? z.betrag) > 0).map((z) => [zeileText(z.key, z.nr, l), spanne(z.betrag, z.max ?? z.betrag, l)] as [string, string]),
    ...(r.schilder > 0 ? [[T(l, 'Kennzeichenschilder (Ihre Angabe)', 'Number plates (your figure)'), eur(r.schilder, l)] as [string, string]] : []),
    [T(l, 'Gesamt', 'Total'), spanne(r.min, r.max, l), true],
  ];
  const result = (
    <>
      <Head label={T(l, `${VORGANG_TEXT[vorgang].de}${r.online ? ', online' : ', vor Ort'}`, `${VORGANG_TEXT[vorgang].en}${r.online ? ', online' : ', in person'}`)} value={eur(r.gebuehr, l)}
        sub={T(l, `Gesamt mit Plaketten und KBA-Anteil: ${spanne(r.min, r.max, l)}`, `Total with seals and KBA share: ${spanne(r.min, r.max, l)}`)} />
      <Rows rows={rows} />
      {r.ersparnisOnline !== null && r.ersparnisOnline > 0 && <Note>{r.online ? T(l, `Online sparen Sie ${eur(r.ersparnisOnline, l)} gegenüber dem Antrag vor Ort.`, `Online you save ${eur(r.ersparnisOnline, l)} compared with applying in person.`) : T(l, `Online (i-Kfz) wäre die Gebühr ${eur(r.ersparnisOnline, l)} niedriger.`, `Online (i-Kfz) the fee would be ${eur(r.ersparnisOnline, l)} lower.`)}</Note>}
      <MethodLink href={methodHref} lang={l} />
    </>
  );
  return <Shell id={id} form={form} result={result} />;
}
