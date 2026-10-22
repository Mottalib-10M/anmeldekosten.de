import { defineGuide } from '../../lib/guide-types';
import { stadtKoerper, bz, rangPkw, rangBev } from '../../lib/stadt';

const ID = '03255';

export default defineGuide({
  id: 'zulassungsstelle-holzminden',
  group: 'staedte',
  order: 21,
  tool: 'finder',
  bezirk: ID,
  related: ['zulassungsstelle-hannover', 'zulassungsstelle-paderborn', 'auto-anmelden-kosten', 'kosten', 'h-kennzeichen'],
  sources: ['kbaAv', 'kbaFz1', 'gebost', 'fzv9'],
  de: {
    slug: 'zulassungsstelle-holzminden',
    nav: 'Holzminden',
    card: 'Landkreis Holzminden an der Rehwiese, Kürzel HOL, auslaufend ALF.',
    title: 'Zulassungsstelle Holzminden: Rehwiese, Kürzel HOL, Gebühren',
    description: 'Zulassungsstelle Holzminden: Straßenverkehrsamt des Landkreises an der Rehwiese, Führerscheinstelle, Kürzel HOL, auslaufend ALF, Bestand und Gebühren 2026.',
    h1: 'Straßenverkehrsamt Holzminden: Zulassung an der Rehwiese',
    intro: 'Der Landkreis Holzminden an der Weser ist einer der kleineren Zulassungsbezirke Niedersachsens. Zulassung und Führerschein erledigt das Straßenverkehrsamt in der Kreisstadt.',
    resume: (h) => { const s = bz(h, ID).stat!, g = rangPkw(h, ID), r = rangBev(h, ID); const st = h.Z.paketVon(ID).stellen[0]; return `Zulassungsbehörde für Holzminden, Stadtoldendorf, Bodenwerder, Delligsen, Eschershausen und die übrigen der 32 Gemeinden des Landkreises ist das Straßenverkehrsamt des Landkreises Holzminden. Das Verzeichnis des Kraftfahrt-Bundesamts nennt eine Zulassungsstelle, ${st.strasse}, ${st.plz} ${st.stadt}, Telefon ${st.tel}, und die Fahrerlaubnisbehörde in derselben Straße. Außenstellen stehen nicht im Verzeichnis. Neu ausgegeben wird HOL; ALF, das Kürzel des früheren Kreises Alfeld, führt das Verzeichnis für den Landkreis als auslaufend. Mit ${h.num(s.pkw)} Pkw zum ${h.Z.META.fz1Stand} liegt der Kreis auf Rang ${h.num(g.rang)} von ${h.num(g.von)} Bezirken, aber mit ${h.num(s.pkwDichte)} Pkw je 1.000 Einwohnern deutlich über dem Bundeswert von ${h.num(h.Z.META.total.pkwDichte)}. Reine Elektroautos machen ${h.pct(s.bev / s.pkw)} aus, gegen ${h.pct(h.Z.META.total.bev / h.Z.META.total.pkw)} im Bund, Rang ${h.num(r.rang)} von ${h.num(r.von)}. Die Gebühren sind die bundesweiten: ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)} für eine Neuzulassung vor Ort, Stand ${h.Z.META.av1Stand}.`; },
    faqs: (h) => [
      { q: 'Was bedeutet ALF im Verzeichnis für den Landkreis Holzminden?', a: 'ALF ist das Kürzel des früheren Landkreises Alfeld (Leine). Das Verzeichnis des Kraftfahrt-Bundesamts führt es für Holzminden als auslaufend: Fahrzeuge mit ALF behalten es, solange ihre Zulassung besteht, neu bekommt im Landkreis jeder HOL. Anders im Landkreis Hildesheim, zu dem Alfeld heute gehört: Dort steht ALF als aktuelles Kürzel und wird weiter ausgegeben.' },
      { q: 'Ich ziehe aus Höxter nach Holzminden: was kostet die Ummeldung?', a: `Höxter liegt in Nordrhein-Westfalen und hat eine eigene Behörde, also ist es eine Ummeldung zu einem anderen Kreis. Mit dem HX-Kennzeichen kostet sie ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten' }).gebuehr)} vor Ort und ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten', online: true }).gebuehr)} online, mit neuem HOL-Kennzeichen ${h.eur(h.M.berechne({ vorgang: 'umzugNeu' }).gebuehr)} plus Schilder. Das Bundesland spielt für die Gebühr keine Rolle.` },
      { q: 'Wie viele Autos sind im Landkreis Holzminden zugelassen?', a: `Zum ${h.Z.META.fz1Stand} zählte das Kraftfahrt-Bundesamt ${h.num(bz(h, ID).stat!.pkw)} Pkw und insgesamt ${h.num(bz(h, ID).stat!.kfz)} Kraftfahrzeuge, darunter ${h.num(bz(h, ID).stat!.krad)} Krafträder. Der Anteil der Dieselautos lag bei ${h.pct(bz(h, ID).stat!.diesel / bz(h, ID).stat!.pkw)}, im Bund bei ${h.pct(h.Z.META.total.diesel / h.Z.META.total.pkw)}. Die Tabelle unten stellt die Werte neben die für ganz Deutschland.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Zulassungsstelle und Führerscheinstelle liegen beide an der Rehwiese in Holzminden, mit eigenen Hausnummern und Telefonnummern. Termine vergibt der Landkreis selbst.',
      `Für die Kreise Höxter, Hameln-Pyrmont, Hildesheim oder Northeim nennt die Suche oben die eigene Behörde. Was eine Anmeldung insgesamt kostet, erklärt ${h.a('auto-anmelden-kosten', 'Auto anmelden: Kosten')}; für Oldtimer gilt die Seite zum ${h.a('h-kennzeichen', 'H-Kennzeichen')}.`),
  },
  en: {
    slug: 'registration-office-holzminden',
    nav: 'Holzminden',
    card: 'Holzminden district on Rehwiese, code HOL, phased-out ALF.',
    title: 'Zulassungsstelle Holzminden: Rehwiese office, code HOL, fees',
    description: 'Zulassungsstelle Holzminden: the district road traffic office on Rehwiese, licensing office, plate code HOL, phased-out ALF, vehicle numbers and the 2026 fees.',
    h1: 'Holzminden road traffic office: registration on Rehwiese',
    intro: 'The Holzminden district on the Weser is one of the smaller registration districts in Lower Saxony. The road traffic office in the district town handles registration and licences.',
    resume: (h) => { const s = bz(h, ID).stat!, g = rangPkw(h, ID), r = rangBev(h, ID); const st = h.Z.paketVon(ID).stellen[0]; return `The registration authority for Holzminden, Stadtoldendorf, Bodenwerder, Delligsen, Eschershausen and the rest of the district’s 32 municipalities is the road traffic office of the Holzminden district. The Federal Motor Transport Authority’s directory lists one registration office, ${st.strasse}, ${st.plz} ${st.stadt}, phone ${st.tel}, and the licensing office on the same street. No branches appear in the directory. The code issued is HOL; ALF, the code of the former Alfeld district, is listed for Holzminden as phased out. With ${h.num(s.pkw)} cars on ${h.Z.fz1Stand('en')} the district ranks ${h.num(g.rang)} of ${h.num(g.von)}, but with ${h.num(s.pkwDichte)} cars per 1,000 residents it is well above the national ${h.num(h.Z.META.total.pkwDichte)}. Fully electric cars make up ${h.pct(s.bev / s.pkw)}, against ${h.pct(h.Z.META.total.bev / h.Z.META.total.pkw)} nationally, rank ${h.num(r.rang)} of ${h.num(r.von)}. Fees are the federal ones: ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)} for a new registration in person, as of ${h.Z.avStand('en')}.`; },
    faqs: (h) => [
      { q: 'What does ALF mean in the directory for the Holzminden district?', a: 'ALF is the code of the former Alfeld (Leine) district. The Federal Motor Transport Authority directory lists it for Holzminden as phased out: vehicles with ALF keep it while their registration lasts, and new registrations in the district all get HOL. The Hildesheim district, to which Alfeld belongs today, is different: there ALF is a current code and is still issued.' },
      { q: 'I am moving from Höxter to Holzminden: what does re-registering cost?', a: `Höxter is in North Rhine-Westphalia with its own office, so it is a re-registration to another district. Keeping the HX plate it costs ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten' }).gebuehr)} in person and ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten', online: true }).gebuehr)} online, with a new HOL plate ${h.eur(h.M.berechne({ vorgang: 'umzugNeu' }).gebuehr)} plus plates. The federal state makes no difference to the fee.` },
      { q: 'How many cars are registered in the Holzminden district?', a: `On ${h.Z.fz1Stand('en')} the Federal Motor Transport Authority counted ${h.num(bz(h, ID).stat!.pkw)} cars and ${h.num(bz(h, ID).stat!.kfz)} motor vehicles in all, including ${h.num(bz(h, ID).stat!.krad)} motorcycles. Diesel cars made up ${h.pct(bz(h, ID).stat!.diesel / bz(h, ID).stat!.pkw)}, against ${h.pct(h.Z.META.total.diesel / h.Z.META.total.pkw)} nationally. The table below sets the figures next to those for Germany as a whole.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'The registration office and the licensing office are both on Rehwiese in Holzminden, with their own house and phone numbers. The district handles appointments itself.',
      `For the Höxter, Hameln-Pyrmont, Hildesheim or Northeim districts the search above names their own office. The full cost of registering is explained under ${h.a('auto-anmelden-kosten', 'car registration cost')}; classic cars are covered on the ${h.a('h-kennzeichen', 'H plate')} page.`),
  },
});
