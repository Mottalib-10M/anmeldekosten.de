/** Côté build seulement : les fichiers de src/data/zul (écrits par scripts/update-data.py) et le paquet d'un bezirk. */
import BEZ from '../data/zul/bezirke.json';
import ST from '../data/zul/stellen.json';
import FE from '../data/zul/fe.json';
import KZ from '../data/zul/kennzeichen.json';
import FICHIER from '../data/zul/fichier.json';
import { paket as paketDe, type Bezirk, type Stelle, type FeBehoerde, type Paket } from './zul';

export const BEZIRKE = BEZ as unknown as Bezirk[];
export const STELLEN = ST as unknown as Stelle[];
export const FEB = FE as unknown as FeBehoerde[];
export const KENNZEICHEN = KZ as Record<string, { bez: string[]; alt: string[] }>;
export const META = FICHIER;

export function paketVon(id: string): Paket {
  const p = paketDe({ bezirke: BEZIRKE, stellen: STELLEN, fe: FEB }, id);
  if (!p) throw new Error(`Bezirk inconnu : ${id}`);
  return p;
}
export const bezirk = (id: string) => paketVon(id).bezirk;
/** Liste compacte pour l'outil des Kennzeichen : code → [[Kreis, Land, auslaufend 0/1], …]. */
export function kennzeichenListe(): Record<string, Array<[string, string, number]>> {
  const byId = new Map(BEZIRKE.map((b) => [b.id, b]));
  return Object.fromEntries(Object.entries(KENNZEICHEN).map(([c, v]) => [c, [
    ...v.bez.map((id) => [byId.get(id)!.kreis, byId.get(id)!.land, 0] as [string, string, number]),
    ...v.alt.map((id) => [byId.get(id)!.kreis, byId.get(id)!.land, 1] as [string, string, number]),
  ]]));
}
const MONATE: Record<string, string> = { Januar: 'January', Februar: 'February', März: 'March', April: 'April', Mai: 'May', Juni: 'June', Juli: 'July', August: 'August', September: 'September', Oktober: 'October', November: 'November', Dezember: 'December' };
/** Stand de l'AV1 (« Oktober 2026 ») dans la langue de la page. */
export const avStand = (l: 'de' | 'en') => (l === 'de' ? META.av1Stand : META.av1Stand.replace(/^(\S+)/, (m) => MONATE[m] ?? m));
/** « 1. Januar 2026 » → « 1 January 2026 ». */
export const fz1Stand = (l: 'de' | 'en') => (l === 'de' ? META.fz1Stand : META.fz1Stand.replace(/^(\d+)\. (\S+)/, (_, d, m) => `${d} ${MONATE[m] ?? m}`));
