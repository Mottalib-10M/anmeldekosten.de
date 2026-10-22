import { defineGuide } from '../../lib/guide-types';
import { stadtKoerper, bz, rangPkw } from '../../lib/stadt';

const ID = '05770';

export default defineGuide({
  id: 'zulassungsstelle-minden',
  group: 'staedte',
  order: 17,
  tool: 'finder',
  bezirk: ID,
  related: ['zulassungsstelle-herford', 'zulassungsstelle-hannover', 'saisonkennzeichen', 'kosten', 'auto-ummelden'],
  sources: ['kbaAv', 'kbaFz1', 'gebost', 'fzv10'],
  de: {
    slug: 'zulassungsstelle-minden',
    nav: 'Minden-Lübbecke',
    card: 'Portastraße in Minden, Außenstelle Lübbecke, Kürzel MI, auslaufend LK.',
    title: 'Zulassungsstelle Minden-Lübbecke: Portastraße, Kürzel MI',
    description: 'Zulassungsstelle Minden-Lübbecke: Straßenverkehrsamt in der Portastraße in Minden, Außenstelle Lübbecke, Kürzel MI, auslaufend LK, Bestand und Gebühren 2026.',
    h1: 'Straßenverkehrsamt Minden: Portastraße und Außenstelle Lübbecke',
    intro: 'Der Kreis Minden-Lübbecke hat zwei Zulassungsstandorte: die Hauptstelle in Minden und eine Außenstelle in Lübbecke, im Westen des Kreises.',
    resume: (h) => { const s = bz(h, ID).stat!, g = rangPkw(h, ID); const [hs, as] = h.Z.paketVon(ID).stellen; return `Für Minden, Bad Oeynhausen, Porta Westfalica, Lübbecke, Espelkamp und die übrigen der elf Kommunen im Kreis Minden-Lübbecke lässt das Straßenverkehrsamt des Kreises Fahrzeuge zu. Das Verzeichnis des Kraftfahrt-Bundesamts nennt die Hauptstelle in der ${hs.strasse}, ${hs.plz} ${hs.stadt}, und die Außenstelle in der ${as.strasse}, ${as.plz} ${as.stadt}. Die Führerscheinstelle führt es nur unter der Mindener Anschrift. Neu ausgegeben wird MI; LK, das Kürzel des früheren Kreises Lübbecke, steht im Verzeichnis als auslaufend. Zum ${h.Z.META.fz1Stand} waren ${h.num(s.pkw)} Pkw zugelassen, Rang ${h.num(g.rang)} von ${h.num(g.von)} Bezirken, und ${h.num(s.krad)} Krafträder. Mit ${h.num(s.pkwDichte)} Pkw je 1.000 Einwohner liegt der Kreis deutlich über dem Bundeswert von ${h.num(h.Z.META.total.pkwDichte)}. Wer nur für die Sommermonate fährt, spart mit einem Saisonkennzeichen Steuer und Versicherung; die Zulassung selbst kostet ${h.eur(h.M.berechne({ vorgang: 'gebraucht' }).gebuehr)} vor Ort, Stand ${h.Z.META.av1Stand}.`; },
    faqs: (h) => [
      { q: 'Bekomme ich in Lübbecke noch ein LK-Kennzeichen?', a: 'Neu nicht. LK steht für den früheren Kreis Lübbecke und ist im Verzeichnis des Kraftfahrt-Bundesamts für den Kreis Minden-Lübbecke nur als auslaufend vermerkt. Fahrzeuge mit LK behalten es, solange ihre Zulassung besteht; wer neu zulässt, auch an der Außenstelle in Lübbecke, bekommt MI. Ob ein gekauftes Auto sein LK bei der Umschreibung behalten kann, fragen Sie am besten vorher.' },
      { q: 'Bad Oeynhausen oder Porta Westfalica: welche Zulassungsstelle?', a: 'Beide Städte gehören zum Kreis Minden-Lübbecke, zuständig ist dessen Straßenverkehrsamt. Für den Süden des Kreises ist die Hauptstelle in der Portastraße in Minden der nähere Standort, für Espelkamp, Rahden oder Stemwede eher die Außenstelle in Lübbecke. Herford und Bielefeld haben eigene Behörden; die Suche oben ordnet jede Gemeinde zu.' },
      { q: 'Wie viele Motorräder fahren im Kreis Minden-Lübbecke?', a: `Zum ${h.Z.META.fz1Stand} zählte das Kraftfahrt-Bundesamt ${h.num(bz(h, ID).stat!.krad)} Krafträder, also ${h.num(Math.round(bz(h, ID).stat!.krad / bz(h, ID).stat!.pkw * 1000))} je 1.000 Pkw; im Bund sind es ${h.num(Math.round(h.Z.META.total.krad / h.Z.META.total.pkw * 1000))}. Viele Motorräder fahren nur im Sommer und eignen sich deshalb für ein Saisonkennzeichen von ${h.num(h.P.fzv.saison_min_monate)} bis ${h.num(h.P.fzv.saison_max_monate)} Monaten; wie das funktioniert, steht unter ${h.a('saisonkennzeichen', 'Saisonkennzeichen')}.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Die Hauptstelle liegt in der Portastraße in Minden, die Außenstelle in Lübbecke im Westen des Kreises; beide Anschriften stehen in der Tabelle.',
      `Für den Kreis Herford, den Landkreis Schaumburg oder den Landkreis Diepholz nennt die Suche oben die eigene Behörde. Was ein Umzug in den Kreis kostet, rechnet ${h.a('auto-ummelden', 'Auto ummelden')}, jede andere Gebühr der ${h.a('kosten', 'Kostenrechner')}.`),
  },
  en: {
    slug: 'registration-office-minden',
    nav: 'Minden-Lübbecke',
    card: 'Portastraße in Minden, Lübbecke branch, code MI, phased-out LK.',
    title: 'Zulassungsstelle Minden-Lübbecke: Minden and Lübbecke, MI',
    description: 'Zulassungsstelle Minden-Lübbecke: the road traffic office on Portastraße in Minden, the Lübbecke branch, plate code MI, phased-out LK, vehicles and 2026 fees.',
    h1: 'Minden road traffic office: Portastraße and the Lübbecke branch',
    intro: 'The Minden-Lübbecke district has two registration sites: the main office in Minden and a branch in Lübbecke, in the west of the district.',
    resume: (h) => { const s = bz(h, ID).stat!, g = rangPkw(h, ID); const [hs, as] = h.Z.paketVon(ID).stellen; return `For Minden, Bad Oeynhausen, Porta Westfalica, Lübbecke, Espelkamp and the rest of the eleven towns in the Minden-Lübbecke district, vehicles are registered by the district road traffic office. The Federal Motor Transport Authority’s directory lists the main office at ${hs.strasse}, ${hs.plz} ${hs.stadt}, and the branch at ${as.strasse}, ${as.plz} ${as.stadt}. It lists the licensing office only at the Minden address. The code issued is MI; LK, the code of the former Lübbecke district, is listed as phased out. On ${h.Z.fz1Stand('en')} there were ${h.num(s.pkw)} registered cars, rank ${h.num(g.rang)} of ${h.num(g.von)} districts, and ${h.num(s.krad)} motorcycles. With ${h.num(s.pkwDichte)} cars per 1,000 residents the district is well above the national ${h.num(h.Z.META.total.pkwDichte)}. Anyone who only drives in summer saves tax and insurance with a seasonal plate; registration itself costs ${h.eur(h.M.berechne({ vorgang: 'gebraucht' }).gebuehr)} in person, as of ${h.Z.avStand('en')}.`; },
    faqs: (h) => [
      { q: 'Can I still get an LK plate in Lübbecke?', a: 'Not as a new plate. LK stands for the former Lübbecke district and is listed in the Federal Motor Transport Authority directory for Minden-Lübbecke only as phased out. Vehicles with LK keep it while their registration lasts; anyone registering anew, even at the Lübbecke branch, gets MI. Whether a car you buy can keep its LK at the transfer is best asked beforehand.' },
      { q: 'Bad Oeynhausen or Porta Westfalica: which registration office?', a: 'Both towns belong to the Minden-Lübbecke district, so its road traffic office is in charge. For the south of the district the main office on Portastraße in Minden is closer; for Espelkamp, Rahden or Stemwede the Lübbecke branch usually is. Herford and Bielefeld have their own offices; the search above places every municipality.' },
      { q: 'How many motorcycles are registered in the Minden-Lübbecke district?', a: `On ${h.Z.fz1Stand('en')} the Federal Motor Transport Authority counted ${h.num(bz(h, ID).stat!.krad)} motorcycles, or ${h.num(Math.round(bz(h, ID).stat!.krad / bz(h, ID).stat!.pkw * 1000))} per 1,000 cars; nationally the figure is ${h.num(Math.round(h.Z.META.total.krad / h.Z.META.total.pkw * 1000))}. Many motorcycles only run in summer and so suit a seasonal plate of ${h.num(h.P.fzv.saison_min_monate)} to ${h.num(h.P.fzv.saison_max_monate)} months; how that works is under ${h.a('saisonkennzeichen', 'seasonal plates')}.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'The main office is on Portastraße in Minden, the branch in Lübbecke in the west of the district; both addresses are in the table.',
      `For the Herford district, Schaumburg or Diepholz the search above names their own office. What moving into the district costs is worked out under ${h.a('auto-ummelden', 're-registering after a move')}, every other fee by the ${h.a('kosten', 'fee calculator')}.`),
  },
});
