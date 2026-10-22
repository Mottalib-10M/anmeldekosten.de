/**
 * Kennzeichen-Suche : Unterscheidungszeichen (1 à 3 lettres) → Kreis(e) qui le délivrent, ou qui le
 * gardent comme « auslaufend ». Liste complète passée en props au build (≈ 770 codes).
 */
import { useEffect, useMemo, useState } from 'react';
import { Shell, Head, Rows, Note, MethodLink, type L } from '../calc/kit';
import { landName } from '../../lib/zul';
import { formatNumber } from '../../lib/format';
import { updateURL, readParams } from '../../lib/url-state';

type Liste = Record<string, Array<[string, string, number]>>;
interface Props { lang: L; id: string; liste: Liste; code?: string; methodHref?: string; finderHref?: string }
const T = <A,>(l: L, de: A, en: A) => (l === 'en' ? en : de);
const norm = (s: string) => s.toUpperCase().replace(/[^A-ZÄÖÜ]/g, '').slice(0, 3);

export default function KennzeichenSuche({ lang: l, id, liste, code: c0 = 'M', methodHref, finderHref }: Props) {
  const [q, setQ] = useState(c0);
  useEffect(() => { const c = readParams(window.location.search).get('k'); if (c) setQ(norm(c)); }, []);
  useEffect(() => { updateURL({ k: q || undefined }); }, [q]);
  const code = norm(q);
  const hit = liste[code];
  const aehnlich = useMemo(() => (code && !hit ? Object.keys(liste).filter((k) => k.startsWith(code)).slice(0, 12) : []), [code, hit, liste]);
  const aktiv = hit?.filter((x) => !x[2]) ?? [], alt = hit?.filter((x) => x[2]) ?? [];
  const form = (
    <>
      <div>
        <label htmlFor={`${id}-k`} className="mb-1 block text-sm font-medium text-navy-700">{T(l, 'Unterscheidungszeichen (vor dem Siegel)', 'District code (before the seal)')}</label>
        <input id={`${id}-k`} type="text" autoComplete="off" spellCheck={false} maxLength={3} value={q} onChange={(e) => setQ(norm(e.target.value))}
          className="h-12 w-full rounded-lg border border-navy-300 bg-white px-4 text-2xl font-semibold uppercase tracking-widest text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
      </div>
      <Note>{T(l, `${formatNumber(Object.keys(liste).length, 0, l)} Unterscheidungszeichen aus dem Verzeichnis des Kraftfahrt-Bundesamts, darunter die auslaufenden, die nicht mehr ausgegeben werden.`, `${formatNumber(Object.keys(liste).length, 0, l)} district codes from the Federal Motor Transport Authority directory, including phased-out codes no longer issued.`)}</Note>
    </>
  );
  const result = hit ? (
    <>
      <Head label={T(l, `${code} steht für`, `${code} stands for`)} value={(aktiv[0] ?? alt[0])[0]} sub={landName((aktiv[0] ?? alt[0])[1], l)} />
      <Rows rows={[
        ...aktiv.slice(1).map((x) => [T(l, 'Ebenfalls ausgegeben in', 'Also issued in'), `${x[0]} (${x[1]})`] as [string, string]),
        ...alt.map((x) => [aktiv.length ? T(l, 'Auslaufend, Bestand in', 'Phased out, still on cars in') : T(l, 'Nicht mehr ausgegeben; Bestand in', 'No longer issued; still on cars in'), `${x[0]} (${x[1]})`] as [string, string]),
        [T(l, 'Neu zu bekommen?', 'Can you still get it?'), aktiv.length ? T(l, 'Ja, bei der Zulassungsbehörde dieses Kreises', 'Yes, from this district’s registration office') : T(l, 'Nein', 'No')],
      ]} />
      {finderHref && <p className="mt-3 text-sm"><a href={finderHref} className="font-medium text-accent-700 underline">{T(l, 'Anschrift der Zulassungsstelle finden', 'Find the registration office address')}</a></p>}
      <MethodLink href={methodHref} lang={l} />
    </>
  ) : (
    <>
      <Head label={T(l, 'Kein Kreis mit diesem Kürzel', 'No district with this code')} value={code || '—'} sub={aehnlich.length ? T(l, `Beginnt mit ${code}: ${aehnlich.join(', ')}`, `Starting with ${code}: ${aehnlich.join(', ')}`) : T(l, 'Ein bis drei Buchstaben eingeben.', 'Type one to three letters.')} />
    </>
  );
  return <Shell id={id} form={form} result={result} />;
}
