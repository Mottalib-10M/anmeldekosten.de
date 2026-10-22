import { defineGuide } from '../../lib/guide-types';
import { stadtKoerper, bz, rangDichte, rangPkw } from '../../lib/stadt';

const ID = '02000';

export default defineGuide({
  id: 'zulassungsstelle-hamburg',
  group: 'staedte',
  order: 3,
  tool: 'finder',
  bezirk: ID,
  related: ['zulassungsstelle-bremen', 'zulassungsstelle-hannover', 'zulassungsstelle-berlin', 'kosten', 'auto-abmelden'],
  sources: ['kbaAv', 'kbaFz1', 'gebost', 'fzv16'],
  de: {
    slug: 'zulassungsstelle-hamburg',
    nav: 'Hamburg',
    card: 'LBV mit fünf Standorten, Kürzel HH, Führerscheinstellen.',
    title: 'Zulassungsstelle Hamburg: LBV-Standorte, Kosten, Termin',
    description: 'Zulassungsstelle Hamburg beim Landesbetrieb Verkehr: alle Standorte mit Anschrift und Telefon, Führerscheinstellen, Kürzel HH, Bestand und Gebühren 2026.',
    h1: 'Zulassungsstelle Hamburg: LBV-Standorte und Wunschkennzeichen',
    intro: 'In Hamburg ist der Landesbetrieb Verkehr für die ganze Stadt zuständig. Er hat mehrere Standorte, und Sie dürfen jeden davon nutzen.',
    resume: (h) => { const s = bz(h, ID).stat!, d = rangDichte(h, ID), g = rangPkw(h, ID); const n = h.Z.paketVon(ID).stellen.length; return `Für Fahrzeugzulassungen in Hamburg ist der Landesbetrieb Verkehr (LBV) zuständig, eine Einrichtung der Freien und Hansestadt. Das Verzeichnis des Kraftfahrt-Bundesamts führt ${h.num(n)} Standorte: die Hauptstelle am Ausschläger Weg in Hamburg-Mitte und Außenstellen in Bergedorf, Harburg, Hamburg-Nord an der Langenhorner Chaussee und an der Schnackenburgallee. Weil es nur eine Behörde gibt, ist jeder Standort für jeden Hamburger Halter zuständig. Das Kürzel ist HH, für Hansestadt Hamburg. Mit ${h.num(s.pkw)} Pkw zum ${h.Z.META.fz1Stand} ist Hamburg nach Berlin der ${h.num(g.rang)}.-größte Zulassungsbezirk; auf 1.000 Einwohner kommen aber nur ${h.num(s.pkwDichte)} Pkw, Rang ${h.num(d.rang)} von unten unter ${h.num(d.von)} Bezirken. Der LBV erhebt die bundesweiten Gebühren der Gebührenordnung: ${h.eur(h.M.berechne({ vorgang: 'abmelden' }).gebuehr)} für eine Abmeldung am Schalter, ${h.eur(h.M.berechne({ vorgang: 'abmelden', online: true }).gebuehr)} online. Einen eigenen Hamburger Tarif gibt es nicht, denn die Verordnung gilt auch im Stadtstaat.`; },
    faqs: (h) => [
      { q: 'Welcher LBV-Standort ist für meinen Hamburger Stadtteil zuständig?', a: 'Jeder. Hamburg hat für die ganze Stadt eine einzige Zulassungsbehörde, den Landesbetrieb Verkehr; die Standorte sind Teile derselben Behörde. Wer in Wilhelmsburg wohnt, kann in Langenhorn zulassen und umgekehrt. Entscheidend sind freie Termine und die Vorgänge, die ein Standort anbietet; der LBV nennt sie auf seiner Website.' },
      { q: 'Wohin, wenn ich in Norderstedt oder Pinneberg wohne?', a: 'Nicht zum LBV. Norderstedt gehört zum Kreis Segeberg, Pinneberg zum Kreis Pinneberg, beide in Schleswig-Holstein mit eigenen Zulassungsbehörden. Auch das Kennzeichen ist ein anderes, SE oder PI. Wer aus Hamburg ins Umland zieht, darf das HH-Kennzeichen behalten; die Ummeldung macht dann die Behörde des neuen Kreises.' },
      { q: 'Wo ist in Hamburg die Führerscheinstelle?', a: `Beim selben Landesbetrieb, Fachbereich Fahrerlaubnis. Das Kraftfahrt-Bundesamt führt ${h.num(h.Z.paketVon(ID).fe.length)} Hamburger Anschriften, darunter Ausschläger Weg und Bergedorfer Straße; die Tabelle unten nennt alle. Dort tauschen Sie alte Führerscheine um, Gebühr ${h.eur(h.M.UMTAUSCH_GEBUEHR)}, und beantragen den internationalen Führerschein. Termine vergibt der Fachbereich getrennt von der Zulassung.` },
      { q: 'Wie reserviere ich in Hamburg ein Wunschkennzeichen mit HH?', a: `Beim Landesbetrieb Verkehr, der als einzige Behörde in Hamburg das Kürzel HH vergibt; die Reservierung kostet ${h.eur(h.P.zuschlag.reservierung)}, der Zuschlag für die Wunschnummer bei der Zulassung ${h.eur(h.P.zuschlag.wunsch)}. An welchem LBV-Standort Sie danach zulassen, spielt für die Nummer keine Rolle. Wer aus Norderstedt oder Pinneberg kommt, reserviert dagegen bei seinem Kreis, weil dort SE oder PI gilt.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Alle Standorte erreichen Sie über dieselbe Telefonzentrale. Der Standort an der Schnackenburgallee hat im Verzeichnis eine eigene Durchwahl. Ob ein Standort jeden Vorgang anbietet, etwa Sonderkennzeichen, steht auf der Website des LBV; das Verzeichnis nennt nur Anschriften.',
      `Für Umzüge ins Umland, nach Stormarn, Harburg-Land oder Pinneberg, nennt die Suche oben die neue Behörde. Wie man bei der Ummeldung das HH behält, steht unter ${h.a('auto-ummelden', 'Ummelden')}; was die Abmeldung kostet, unter ${h.a('auto-abmelden', 'Abmelden')}.`),
  },
  en: {
    slug: 'registration-office-hamburg',
    nav: 'Hamburg',
    card: 'LBV with five locations, code HH, licensing offices.',
    title: 'Zulassungsstelle Hamburg: LBV locations, fees, appointment',
    description: 'Zulassungsstelle Hamburg at the Landesbetrieb Verkehr: every location with address and phone, licensing offices, plate code HH, vehicle numbers and 2026 fees.',
    h1: 'Hamburg registration office: the LBV locations',
    intro: 'In Hamburg the State Transport Agency handles the whole city. It has several locations, and you may use any of them.',
    resume: (h) => { const s = bz(h, ID).stat!, d = rangDichte(h, ID), g = rangPkw(h, ID); const n = h.Z.paketVon(ID).stellen.length; return `Vehicle registration in Hamburg is handled by the Landesbetrieb Verkehr (LBV), an agency of the Free and Hanseatic City. The Federal Motor Transport Authority’s directory lists ${h.num(n)} locations: the main office on Ausschläger Weg in Hamburg-Mitte and branches in Bergedorf, Harburg, Hamburg-Nord on Langenhorner Chaussee and on Schnackenburgallee. Because there is only one authority, every location serves every Hamburg keeper. The code is HH, for Hansestadt Hamburg. With ${h.num(s.pkw)} cars on ${h.Z.fz1Stand('en')}, Hamburg is the number ${h.num(g.rang)} registration district after Berlin, yet it has only ${h.num(s.pkwDichte)} cars per 1,000 residents, rank ${h.num(d.rang)} from the bottom for density among ${h.num(d.von)} districts. The LBV charges the national fees of the fee schedule: ${h.eur(h.M.berechne({ vorgang: 'abmelden' }).gebuehr)} to deregister at the counter, ${h.eur(h.M.berechne({ vorgang: 'abmelden', online: true }).gebuehr)} online. Einen eigenen Hamburger Tarif gibt es nicht, denn die Verordnung gilt auch im Stadtstaat.`; },
    faqs: (h) => [
      { q: 'Which LBV location serves my part of Hamburg?', a: 'Any of them. Hamburg has one registration authority for the whole city, the Landesbetrieb Verkehr; the locations are parts of the same office. Someone living in Wilhelmsburg can register in Langenhorn and vice versa. What matters is free appointments and which procedures a location offers, which the LBV lists on its website.' },
      { q: 'Where do I go if I live in Norderstedt or Pinneberg?', a: 'Not to the LBV. Norderstedt belongs to the district of Segeberg, Pinneberg to the district of Pinneberg, both in Schleswig-Holstein with their own registration offices. The plate code differs too, SE or PI. Anyone moving from Hamburg to the surrounding area may keep the HH plate; the new district’s office handles the re-registration.' },
      { q: 'Where is the driving licence office in Hamburg?', a: `At the same agency, in its driving licence department. The Federal Motor Transport Authority lists ${h.num(h.Z.paketVon(ID).fe.length)} Hamburg addresses, including Ausschläger Weg and Bergedorfer Straße; the table below gives them all. That is where you exchange an old licence, for ${h.eur(h.M.UMTAUSCH_GEBUEHR)}.` },
      { q: 'How do I reserve a personalised HH plate in Hamburg?', a: `With the Landesbetrieb Verkehr, the only office in Hamburg that issues the code HH; the reservation costs ${h.eur(h.P.zuschlag.reservierung)} and the surcharge for the chosen number at registration ${h.eur(h.P.zuschlag.wunsch)}. Which LBV location you then register at makes no difference to the number. Anyone from Norderstedt or Pinneberg reserves with their own district instead, because SE or PI applies there.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'All locations share one switchboard number; the Schnackenburgallee site has its own extension in the directory. Whether a location offers every procedure, special plates for instance, is stated on the LBV website; the directory only gives addresses.',
      `For moves into the surrounding districts, Stormarn, Harburg or Pinneberg, the search above names the new office. How to keep HH when re-registering is under ${h.a('auto-ummelden', 're-registering')}; what deregistering costs is under ${h.a('auto-abmelden', 'deregistering')}.`),
  },
});
