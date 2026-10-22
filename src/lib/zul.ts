/**
 * Zulassungsbezirke, Zulassungs- und Fahrerlaubnisbehörden (KBA-Verzeichnisse AV1 und AV2),
 * Fahrzeugbestand (KBA FZ1) und Gemeinden (Wikidata, CC0) : Typen, Suche, Ladefunktion.
 * Die Seiten erhalten den Bezirk ihrer Stadt beim Build ; die vollständigen Dateien
 * (public/data/behoerden.json, gemeinden.json) lädt der Browser erst bei der ersten Suche.
 * Was Sie tippen, verlässt Ihr Gerät nicht : gesucht wird in diesen Dateien.
 */
export type Lang = 'de' | 'en';
export interface Stat { pkw: number; bev: number; phev: number; hybrid: number; kfz: number; krad: number; pkwDichte: number; wohnmobile: number; anh: number; diesel: number; benzin: number; halterinnen: number; name: string }
export interface Bezirk { id: string; kz: string; land: string; name: string; behoerde: string; kreis: string; uz: string[]; alt: string[]; stellen: string[]; fe: number[]; stat: Stat | null }
export interface Stelle { id: string; kz: string; zusatz: string; ort: string; land: string; behoerde: string; art: 'haupt' | 'neben' | 'polizei' | 'bund'; plz: string; stadt: string; strasse: string; tel: string; mail: string; uz: string[]; alt: string[]; dv: string }
export interface FeBehoerde { kz: string; gem: string; name: string; stelle: string; land: string; strasse: string; plz: string; stadt: string; tel: string; mail: string }
export interface Daten { bezirke: Bezirk[]; stellen: Stelle[]; fe: FeBehoerde[]; kennzeichen: Record<string, { bez: string[]; alt: string[] }> }
/** Was eine Seite für einen Bezirk braucht, beim Build zusammengestellt. */
export interface Paket { bezirk: Bezirk; stellen: Stelle[]; fe: FeBehoerde[] }
export type GemeindeRaw = [string, string, string[]];
export interface Gemeinde { name: string; ags: string; plz: string[]; cle: string }

export const LAENDER: Record<string, { de: string; en: string }> = {
  SH: { de: 'Schleswig-Holstein', en: 'Schleswig-Holstein' }, HH: { de: 'Hamburg', en: 'Hamburg' },
  NI: { de: 'Niedersachsen', en: 'Lower Saxony' }, HB: { de: 'Bremen', en: 'Bremen' },
  NW: { de: 'Nordrhein-Westfalen', en: 'North Rhine-Westphalia' }, HE: { de: 'Hessen', en: 'Hesse' },
  RP: { de: 'Rheinland-Pfalz', en: 'Rhineland-Palatinate' }, BW: { de: 'Baden-Württemberg', en: 'Baden-Württemberg' },
  BY: { de: 'Bayern', en: 'Bavaria' }, SL: { de: 'Saarland', en: 'Saarland' }, B: { de: 'Berlin', en: 'Berlin' },
  BB: { de: 'Brandenburg', en: 'Brandenburg' }, MV: { de: 'Mecklenburg-Vorpommern', en: 'Mecklenburg-Western Pomerania' },
  SN: { de: 'Sachsen', en: 'Saxony' }, ST: { de: 'Sachsen-Anhalt', en: 'Saxony-Anhalt' }, TH: { de: 'Thüringen', en: 'Thuringia' },
};
export const landName = (code: string, l: Lang) => LAENDER[code]?.[l] ?? code;

export const normaliser = (s: string) => s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
  .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

let pd: Promise<Daten> | null = null;
let pg: Promise<Gemeinde[]> | null = null;
export function chargerDaten(): Promise<Daten> {
  pd ??= fetch('/data/behoerden.json').then((r) => r.json());
  return pd;
}
export function chargerGemeinden(): Promise<Gemeinde[]> {
  pg ??= fetch('/data/gemeinden.json').then((r) => r.json()).then((l: GemeindeRaw[]) => l.map(([name, ags, plz]) => ({ name, ags, plz, cle: normaliser(name) })));
  return pg;
}

export function paket(d: Pick<Daten, 'bezirke' | 'stellen' | 'fe'>, id: string): Paket | null {
  const bezirk = d.bezirke.find((b) => b.id === id);
  if (!bezirk) return null;
  const stellen = bezirk.stellen.map((s) => d.stellen.find((x) => x.id === s)).filter((x): x is Stelle => !!x);
  return { bezirk, stellen, fe: bezirk.fe.map((i) => d.fe[i]).filter(Boolean) };
}

/** Bezirk einer Gemeinde : Kreisschlüssel = die ersten fünf Stellen des Gemeindeschlüssels. Hat der Kreis
 *  mehrere Zulassungsbehörden (z. B. Stadt und Region Hannover), wird die gewählt, deren Sitz so heißt wie
 *  die Gemeinde ; sonst die des Kreises. */
export function bezirkVonGemeinde(bez: Bezirk[], g: Pick<Gemeinde, 'name' | 'ags'>): Bezirk | undefined {
  const k = g.ags.slice(0, 5);
  const im = bez.filter((b) => b.kz === k);
  if (im.length <= 1) return im[0];
  const n = normaliser(g.name);
  return im.find((b) => b.id.includes('-') && normaliser(b.name).startsWith(n)) ?? im.find((b) => !b.id.includes('-')) ?? im[0];
}

export type Treffer =
  | { typ: 'kz'; code: string; bezirke: string[]; alt: string[] }
  | { typ: 'gemeinde'; g: Gemeinde }
  | { typ: 'bezirk'; b: Bezirk };

/** Suche : Kennzeichen (1 bis 3 Buchstaben), Postleitzahl, Gemeinde oder Kreis. */
export function suche(d: Daten, gem: Gemeinde[], q: string, max = 8): Treffer[] {
  const s = q.trim();
  if (!s) return [];
  const out: Treffer[] = [];
  const code = s.toUpperCase().replace(/[^A-ZÄÖÜ]/g, '');
  if (/^[a-zäöü]{1,3}$/i.test(s) && d.kennzeichen[code]) out.push({ typ: 'kz', code, bezirke: d.kennzeichen[code].bez, alt: d.kennzeichen[code].alt });
  if (/^\d/.test(s)) {
    const p = s.replace(/\s/g, '');
    return gem.filter((g) => g.plz.some((x) => x.startsWith(p))).slice(0, max).map((g) => ({ typ: 'gemeinde' as const, g }));
  }
  const n = normaliser(s);
  if (n.length < 2) return out;
  const gd = gem.filter((g) => g.cle.startsWith(n));
  const gi = gd.length >= max ? [] : gem.filter((g) => !g.cle.startsWith(n) && g.cle.includes(n));
  const kreise = d.bezirke.filter((b) => normaliser(b.kreis).includes(n) && !gd.some((g) => g.ags.slice(0, 5) === b.kz));
  for (const g of [...gd, ...gi]) out.push({ typ: 'gemeinde', g });
  for (const b of kreise) out.push({ typ: 'bezirk', b });
  return out.slice(0, max);
}

/** Anteil an den Pkw, z. B. Elektroautos. */
export const anteil = (teil: number, ganz: number) => (ganz > 0 ? teil / ganz : 0);
