/**
 * Tableaux des pages villes (données KBA du build) : Zulassungsstellen, Fahrerlaubnisbehörden,
 * Fahrzeugbestand comparé à l'Allemagne. La prose de chaque ville est écrite dans son fichier.
 */
import type { Helpers } from './guide-types';
import type { Bezirk } from './zul';

export const bz = (h: Helpers, id: string): Bezirk => h.Z.paketVon(id).bezirk;

export function stellenTabelle(h: Helpers, ...ids: string[]): string {
  const de = h.lang === 'de';
  const rows = ids.flatMap((id) => h.Z.paketVon(id).stellen.map((s) => [
    s.art === 'haupt' ? (de ? 'Hauptstelle' : 'Main office') : de ? 'Außenstelle' : 'Branch',
    s.ort.replace(/\(Stadt\)$/, ''),
    `${s.strasse}, ${s.plz} ${s.stadt}`,
    s.tel || '–',
  ]));
  return h.table(de ? ['Art', 'Standort', 'Anschrift', 'Telefon'] : ['Type', 'Location', 'Address', 'Phone'], rows,
    de ? `Zulassungsbehörde laut Verzeichnis des Kraftfahrt-Bundesamts, Stand ${h.Z.META.av1Stand}` : `Registration office per the Federal Motor Transport Authority directory, as of ${h.Z.avStand('en')}`, ['l', 'l', 'l', 'l']);
}

export function feTabelle(h: Helpers, id: string): string {
  const de = h.lang === 'de';
  const rows = h.Z.paketVon(id).fe.map((f) => [`${f.name}${f.stelle ? ` · ${f.stelle}` : ''}`, [f.strasse, `${f.plz} ${f.stadt}`].filter((x) => x.trim()).join(', ')]);
  return h.table(de ? ['Fahrerlaubnisbehörde', 'Anschrift'] : ['Licensing office', 'Address'], rows,
    de ? `Führerscheinstellen laut Kraftfahrt-Bundesamt, Stand ${h.Z.META.av1Stand}` : `Licensing offices per the Federal Motor Transport Authority, as of ${h.Z.avStand('en')}`, ['l', 'l']);
}

export function bestandTabelle(h: Helpers, id: string): string {
  const de = h.lang === 'de';
  const s = bz(h, id).stat!, t = h.Z.META.total;
  const rows: Array<Array<string>> = [
    [de ? 'Pkw' : 'Cars', h.num(s.pkw), h.num(t.pkw)],
    [de ? 'Pkw je 1.000 Einwohner' : 'Cars per 1,000 residents', h.num(s.pkwDichte), h.num(t.pkwDichte)],
    [de ? 'Anteil reiner Elektro-Pkw' : 'Share of fully electric cars', h.pct(s.bev / s.pkw), h.pct(t.bev / t.pkw)],
    [de ? 'Anteil Plug-in-Hybride' : 'Share of plug-in hybrids', h.pct(s.phev / s.pkw), h.pct(t.phev / t.pkw)],
    [de ? 'Anteil Diesel' : 'Share of diesel cars', h.pct(s.diesel / s.pkw), h.pct(t.diesel / t.pkw)],
    [de ? 'Krafträder' : 'Motorcycles', h.num(s.krad), h.num(t.krad)],
  ];
  return h.table(de ? ['Bestand', bz(h, id).name.replace(/\(Stadt\)$/, '').replace(/-Tempelhof$|-Stadt$/, ''), 'Deutschland'] : ['Vehicles', bz(h, id).name.replace(/\(Stadt\)$/, '').replace(/-Tempelhof$|-Stadt$/, ''), 'Germany'], rows,
    de ? `Fahrzeugbestand am ${h.Z.META.fz1Stand}, Statistik FZ1 des Kraftfahrt-Bundesamts` : `Vehicles on ${h.Z.fz1Stand('en')}, Federal Motor Transport Authority FZ1 statistics`, ['l', 'r', 'r']);
}

/** Rang du Bezirk parmi les 400 et quelques pour la part d'électriques (1 = la plus forte). */
export function rangBev(h: Helpers, id: string): { rang: number; von: number } {
  const l = h.Z.BEZIRKE.filter((b) => b.stat && b.stat.pkw > 0 && typeof b.stat.pkwDichte === 'number').sort((a, b) => b.stat!.bev / b.stat!.pkw - a.stat!.bev / a.stat!.pkw);
  return { rang: l.findIndex((b) => b.id === id) + 1, von: l.length };
}

/** Rang du Bezirk pour la densité de Pkw (1 = la plus faible). */
export function rangDichte(h: Helpers, id: string): { rang: number; von: number } {
  const l = h.Z.BEZIRKE.filter((b) => b.stat && b.stat.pkw > 0 && typeof b.stat.pkwDichte === 'number').sort((a, b) => a.stat!.pkwDichte - b.stat!.pkwDichte);
  return { rang: l.findIndex((b) => b.id === id) + 1, von: l.length };
}

/** Rang du Bezirk par nombre de Pkw (1 = le plus grand parc). */
export function rangPkw(h: Helpers, id: string): { rang: number; von: number } {
  const l = h.Z.BEZIRKE.filter((b) => b.stat && b.stat.pkw > 0 && typeof b.stat.pkwDichte === 'number').sort((a, b) => b.stat!.pkw - a.stat!.pkw);
  return { rang: l.findIndex((b) => b.id === id) + 1, von: l.length };
}

/** Squelette commun du corps d'une page ville : prose propre (avant, après) autour des tableaux KBA. */
export function stadtKoerper(h: Helpers, id: string, vor: string, nach: string, ids: string[] = [id]): string {
  const de = h.lang === 'de';
  return `<h2>${de ? 'Anschriften der Zulassungsbehörde' : 'Registration office addresses'}</h2>
<p>${vor}</p>
${stellenTabelle(h, ...ids)}
<h2>${de ? 'Führerscheinstelle und Fahrzeugbestand' : 'Licensing office and vehicles'}</h2>
${feTabelle(h, id)}
${bestandTabelle(h, id)}
<p>${nach}</p>`;
}
