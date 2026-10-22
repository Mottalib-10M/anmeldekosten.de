import { defineGuide } from '../../lib/guide-types';
import { stadtKoerper, bz, rangPkw } from '../../lib/stadt';

const ID = '05382';

export default defineGuide({
  id: 'zulassungsstelle-siegburg',
  group: 'staedte',
  order: 14,
  tool: 'finder',
  bezirk: ID,
  related: ['zulassungsstelle-koeln', 'zulassungsstelle-aachen', 'auto-anmelden-unterlagen', 'kosten', 'wunschkennzeichen'],
  sources: ['kbaAv', 'kbaFz1', 'gebost', 'fzv9'],
  de: {
    slug: 'zulassungsstelle-siegburg',
    nav: 'Siegburg (Rhein-Sieg)',
    card: 'Rhein-Sieg-Kreis: Siegburg und Meckenheim, Kürzel SU, 19 Kommunen.',
    title: 'Zulassungsstelle Siegburg: Rhein-Sieg-Kreis, Meckenheim, SU',
    description: 'Zulassungsstelle Siegburg: Straßenverkehrsamt des Rhein-Sieg-Kreises am Kaiser-Wilhelm-Platz, Außenstelle Meckenheim, Kürzel SU, Bestand und Gebühren 2026.',
    h1: 'Straßenverkehrsamt Siegburg und Meckenheim für den Rhein-Sieg-Kreis',
    intro: 'Der Rhein-Sieg-Kreis umschließt Bonn und hat zwei Standorte für Zulassung und Führerschein: Siegburg rechts des Rheins und Meckenheim links davon.',
    resume: (h) => { const s = bz(h, ID).stat!, g = rangPkw(h, ID); const [hs, as] = h.Z.paketVon(ID).stellen; return `Zuständig für Fahrzeuge aus Troisdorf, Sankt Augustin, Hennef, Bornheim, Königswinter und den übrigen der 19 Städte und Gemeinden des Rhein-Sieg-Kreises ist das Straßenverkehrsamt des Kreises. Das Verzeichnis des Kraftfahrt-Bundesamts nennt die Hauptstelle in ${hs.stadt}, ${hs.strasse}, und eine Außenstelle in ${as.stadt}, ${as.strasse}; beide führt es auch als Fahrerlaubnisbehörde. Ausgegeben wird das Kürzel SU, für Siegkreis. BN steht beim Kreis nur als auslaufend im Verzeichnis, denn Bonn ist kreisfrei und hat eine eigene Zulassungsbehörde. Mit ${h.num(s.pkw)} Pkw zum ${h.Z.META.fz1Stand} gehört der Kreis zu den großen Bezirken, Rang ${h.num(g.rang)} von ${h.num(g.von)}, und hat mit ${h.num(s.pkwDichte)} Pkw je 1.000 Einwohner mehr Autos als der Bundesdurchschnitt von ${h.num(h.Z.META.total.pkwDichte)}. Die Gebühren sind an beiden Standorten dieselben: ${h.eur(h.M.berechne({ vorgang: 'gebraucht' }).gebuehr)} für einen Gebrauchtwagen vor Ort, ohne Schilder und Plaketten, Stand ${h.Z.META.av1Stand}.`; },
    faqs: (h) => [
      { q: 'Ich wohne in Bornheim oder Wachtberg: Siegburg oder Meckenheim?', a: 'Beide Standorte gehören zur selben Behörde, dem Rhein-Sieg-Kreis; das Verzeichnis führt Siegburg als Hauptstelle und Meckenheim als Außenstelle. Für Orte links des Rheins wie Bornheim, Alfter, Wachtberg oder Rheinbach liegt Meckenheim meist näher. Welche Vorgänge die Außenstelle anbietet und wie Termine vergeben werden, legt der Kreis fest; fragen Sie bei Sonderfällen wie Importen vorher nach.' },
      { q: 'Bekomme ich als Bonner ein SU-Kennzeichen?', a: 'Nein. Bonn ist eine kreisfreie Stadt mit eigener Zulassungsbehörde und dem Kürzel BN; der Rhein-Sieg-Kreis ist nur für Halter in seinen 19 Kommunen zuständig. Wer von Bonn nach Siegburg oder Troisdorf zieht, meldet beim Kreis um und darf das BN-Kennzeichen behalten. Umgekehrt nimmt man ein SU-Kennzeichen nach Bonn mit.' },
      { q: 'Was kostet im Rhein-Sieg-Kreis die Ummeldung nach einem Umzug aus Köln?', a: `Mit dem Kölner Kennzeichen kostet die Ummeldung ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten' }).gebuehr)} am Schalter und ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten', online: true }).gebuehr)} online. Wer zu SU wechselt, zahlt ${h.eur(h.M.berechne({ vorgang: 'umzugNeu' }).gebuehr)} vor Ort und kauft neue Schilder. Die Pflicht zur Ummeldung besteht in jedem Fall: Die neue Anschrift muss in den Fahrzeugschein.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Siegburg liegt an der Sieg östlich von Bonn, Meckenheim im linksrheinischen Kreisteil. Beide Anschriften stehen in der Tabelle, mit Haupt- und Außenstelle getrennt.',
      `Für Bonn, den Kreis Euskirchen oder den Westerwald nennt die Suche oben die eigene Behörde. Was zur Anmeldung mitzubringen ist, listet die Seite ${h.a('auto-anmelden-unterlagen', 'Unterlagen')}; eine freie SU-Nummer findet man über das ${h.a('wunschkennzeichen', 'Wunschkennzeichen')}.`),
  },
  en: {
    slug: 'registration-office-siegburg',
    nav: 'Siegburg (Rhein-Sieg)',
    card: 'Rhein-Sieg district: Siegburg and Meckenheim, code SU, 19 towns.',
    title: 'Zulassungsstelle Siegburg: Rhein-Sieg district offices, SU',
    description: 'Zulassungsstelle Siegburg: the Rhein-Sieg district road traffic office on Kaiser-Wilhelm-Platz, the Meckenheim branch, plate code SU, vehicles and 2026 fees.',
    h1: 'Siegburg and Meckenheim: registration for the Rhein-Sieg district',
    intro: 'The Rhein-Sieg district surrounds Bonn and has two sites for registration and licences: Siegburg east of the Rhine and Meckenheim to the west.',
    resume: (h) => { const s = bz(h, ID).stat!, g = rangPkw(h, ID); const [hs, as] = h.Z.paketVon(ID).stellen; return `Vehicles from Troisdorf, Sankt Augustin, Hennef, Bornheim, Königswinter and the rest of the 19 towns and municipalities of the Rhein-Sieg district are handled by the district’s road traffic office (Straßenverkehrsamt). The Federal Motor Transport Authority’s directory lists the main office in ${hs.stadt}, ${hs.strasse}, and a branch in ${as.stadt}, ${as.strasse}; it lists both as licensing offices too. The code issued is SU, for Siegkreis. BN appears for the district only as phased out, because Bonn is an independent city with its own registration office. With ${h.num(s.pkw)} cars on ${h.Z.fz1Stand('en')}, the district is one of the large ones, rank ${h.num(g.rang)} of ${h.num(g.von)}, and with ${h.num(s.pkwDichte)} cars per 1,000 residents it has more than the national ${h.num(h.Z.META.total.pkwDichte)}. Fees are the same at both sites: ${h.eur(h.M.berechne({ vorgang: 'gebraucht' }).gebuehr)} for a used car in person, before plates and seals, as of ${h.Z.avStand('en')}.`; },
    faqs: (h) => [
      { q: 'I live in Bornheim or Wachtberg: Siegburg or Meckenheim?', a: 'Both sites belong to the same authority, the Rhein-Sieg district; the directory lists Siegburg as the main office and Meckenheim as a branch. For places west of the Rhine such as Bornheim, Alfter, Wachtberg or Rheinbach, Meckenheim is usually closer. Which procedures the branch offers and how appointments work is set by the district; ask beforehand for special cases such as imports.' },
      { q: 'Can a Bonn resident get an SU plate?', a: 'No. Bonn is an independent city with its own registration office and the code BN; the Rhein-Sieg district serves only keepers in its 19 towns. Anyone moving from Bonn to Siegburg or Troisdorf re-registers with the district and may keep the BN plate. The other way round, an SU plate can move to Bonn with you.' },
      { q: 'What does re-registering in the Rhein-Sieg district cost after moving from Cologne?', a: `Keeping the Cologne plate, the re-registration costs ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten' }).gebuehr)} at the counter and ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten', online: true }).gebuehr)} online. Switching to SU costs ${h.eur(h.M.berechne({ vorgang: 'umzugNeu' }).gebuehr)} in person plus new plates. The duty to re-register applies either way: the new address has to go on the registration certificate.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Siegburg lies on the river Sieg east of Bonn, Meckenheim in the part of the district west of the Rhine. Both addresses are in the table, main office and branch shown separately.',
      `For Bonn, the Euskirchen district or the Westerwald the search above names their own office. What to bring to register is listed under ${h.a('auto-anmelden-unterlagen', 'documents')}; a free SU number can be found through the ${h.a('wunschkennzeichen', 'personalised plate')} page.`),
  },
});
