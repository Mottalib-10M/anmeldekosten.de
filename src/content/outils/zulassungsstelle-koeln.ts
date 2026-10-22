import { defineGuide } from '../../lib/guide-types';
import { stadtKoerper, bz, rangBev, rangPkw } from '../../lib/stadt';

const ID = '05315';

export default defineGuide({
  id: 'zulassungsstelle-koeln',
  group: 'staedte',
  order: 4,
  tool: 'finder',
  bezirk: ID,
  related: ['zulassungsstelle-duesseldorf', 'zulassungsstelle-essen', 'zulassungsstelle-dortmund', 'kosten', 'zulassungsstelle-termin'],
  sources: ['kbaAv', 'kbaFz1', 'gebost', 'fev8e'],
  de: {
    slug: 'zulassungsstelle-koeln',
    nav: 'Köln',
    card: 'Eine Zulassungsstelle für ganz Köln, zehn Führerscheinanschriften, Kürzel K.',
    title: 'Zulassungsstelle Köln: Anschrift, Führerschein, Kosten 2026',
    description: 'Zulassungsstelle Köln: Anschrift an der Max-Glomsda-Straße, Führerscheinstellen in den Kundenzentren, Kürzel K, Fahrzeugbestand und Gebühren 2026 nach GebOSt.',
    h1: 'Zulassungsstelle Köln: eine Adresse für die ganze Stadt',
    intro: 'Für Autos gibt es in Köln eine einzige Zulassungsstelle. Führerscheinanträge nehmen dagegen viele Stellen in der Stadt an; beide Listen stehen unten.',
    resume: (h) => { const s = bz(h, ID).stat!, r = rangBev(h, ID), g = rangPkw(h, ID); const fe = h.Z.paketVon(ID).fe.length; return `Die Stadt Köln lässt Fahrzeuge an einem einzigen Standort zu: Das Verzeichnis des Kraftfahrt-Bundesamts nennt für den Zulassungsbezirk Köln nur die Max-Glomsda-Straße 4 im Rechtsrheinischen, Postleitzahl 51105. Anders beim Führerschein: Hier führt das Amt ${h.num(fe)} Anschriften, die Fahrerlaubnisbehörde selbst und Kundenzentren in den Stadtbezirken, darunter das Kundenzentrum Innenstadt am Laurenzplatz. Das Kürzel ist K, und kein anderer Kreis teilt es. Köln hatte zum ${h.Z.META.fz1Stand} ${h.num(s.pkw)} Pkw und ist damit der ${h.num(g.rang)}.-größte Zulassungsbezirk Deutschlands; ${h.pct(s.bev / s.pkw)} davon fuhren rein elektrisch, Rang ${h.num(r.rang)} von ${h.num(r.von)}. Für eine Ummeldung aus einem anderen Kreis mit Kölner Kennzeichen verlangt die Stadt wie jede Behörde ${h.eur(h.M.berechne({ vorgang: 'umzugNeu' }).gebuehr)} vor Ort; wer das alte Kennzeichen behält, zahlt ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten' }).gebuehr)}. Lokale Zuschläge auf die Gebühr sieht die Verordnung nicht vor; was eine Stadt zusätzlich nennt, sind Schilder, Plaketten oder Versand.`; },
    faqs: (h) => [
      { q: 'Kann ich in einem Kölner Kundenzentrum mein Auto anmelden?', a: 'Nach dem Verzeichnis des Kraftfahrt-Bundesamts nein: Für Kfz-Zulassungen nennt es in Köln nur den Standort an der Max-Glomsda-Straße. Die Kundenzentren in den Stadtbezirken erscheinen dort als Anlaufstellen für Führerscheinanträge. Ohne Weg geht die Zulassung online über i-Kfz, mit Personalausweis und den Papieren mit Sicherheitscode.' },
      { q: 'Ich ziehe von Köln nach Bergisch Gladbach: wer ist zuständig?', a: `Die Zulassungsbehörde des Rheinisch-Bergischen Kreises, nicht mehr die Stadt Köln. Sie dürfen das K-Kennzeichen behalten; dann wird nur die Anschrift geändert, für ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten' }).gebuehr)} vor Ort. Für Leverkusen, Hürth oder Troisdorf gilt dasselbe mit der jeweiligen Behörde; die Suche oben nennt sie.` },
      { q: 'Wo tausche ich in Köln meinen Führerschein um?', a: `In einem der Kundenzentren oder bei der Fahrerlaubnisbehörde; die Tabelle unten nennt alle ${h.num(h.Z.paketVon(ID).fe.length)} Anschriften des Verzeichnisses. Die Gebühr ist überall ${h.eur(h.M.UMTAUSCH_GEBUEHR)}. Ob Ihr Führerschein schon fällig ist, sagt der Umtausch-Rechner nach Anlage 8e der Fahrerlaubnis-Verordnung. Bringen Sie Ausweis, Passfoto und den alten Führerschein mit.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Die Zulassungsstelle liegt auf der rechten Rheinseite. Termine vergibt die Stadt online; ein Teil der Vorgänge, etwa die Abmeldung, ist bei vielen Behörden ohne Termin oder vollständig online möglich. Was in Köln gerade gilt, steht auf der Website der Stadt.',
      `Wer im Umland wohnt, findet die Behörde des eigenen Kreises über die Suche oben. Für die Nachbarstädte gibt es eigene Seiten: ${h.a('zulassungsstelle-duesseldorf', 'Düsseldorf')}, ${h.a('zulassungsstelle-essen', 'Essen')} und ${h.a('zulassungsstelle-dortmund', 'Dortmund')}.`),
  },
  en: {
    slug: 'registration-office-cologne',
    nav: 'Cologne',
    card: 'One registration office for all of Cologne, ten licence addresses, code K.',
    title: 'Zulassungsstelle Köln: Cologne office, licences and fees',
    description: 'Zulassungsstelle Köln: the Cologne registration office on Max-Glomsda-Straße, licence offices in customer centres, plate code K, vehicle numbers and 2026 fees.',
    h1: 'Cologne registration office: one address for the city',
    intro: 'Cologne registers vehicles at a single office. Driving licence applications, by contrast, are taken at many places in the city; both lists are below.',
    resume: (h) => { const s = bz(h, ID).stat!, r = rangBev(h, ID), g = rangPkw(h, ID); const fe = h.Z.paketVon(ID).fe.length; return `The city of Cologne registers vehicles at a single site: for the Cologne registration district the Federal Motor Transport Authority’s directory lists only Max-Glomsda-Straße 4 on the east bank of the Rhine, postcode 51105. Driving licences are different: there the directory lists ${h.num(fe)} addresses, the licensing office itself and customer centres in the city’s boroughs, including the city-centre customer centre on Laurenzplatz. The plate code is K, shared with no other district. On ${h.Z.fz1Stand('en')} Cologne had ${h.num(s.pkw)} cars, making it Germany’s number ${h.num(g.rang)} registration district by size; ${h.pct(s.bev / s.pkw)} of them were fully electric, rank ${h.num(r.rang)} of ${h.num(r.von)}. To re-register a car from another district with a Cologne plate, the city charges what every office charges, ${h.eur(h.M.berechne({ vorgang: 'umzugNeu' }).gebuehr)} in person; keeping the old plate costs ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten' }).gebuehr)}.`; },
    faqs: (h) => [
      { q: 'Can I register my car at a Cologne customer centre?', a: 'According to the Federal Motor Transport Authority’s directory, no: for vehicle registration it lists only the Max-Glomsda-Straße site in Cologne. The customer centres in the boroughs appear there as points of contact for driving licence applications. Without travelling, registration works online through i-Kfz, with an ID card and papers carrying the security code.' },
      { q: 'I am moving from Cologne to Bergisch Gladbach: who handles it?', a: `The registration office of the Rheinisch-Bergischer Kreis, no longer the city of Cologne. You may keep the K plate; then only the address changes, for ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten' }).gebuehr)} in person. The same applies to Leverkusen, Hürth or Troisdorf with their own offices; the search above names them.` },
      { q: 'Where do I exchange my driving licence in Cologne?', a: `At one of the customer centres or the licensing office; the table below lists all ${h.num(h.Z.paketVon(ID).fe.length)} addresses from the directory. The fee is ${h.eur(h.M.UMTAUSCH_GEBUEHR)} everywhere. Whether your licence is already due is shown by the exchange calculator, based on Annex 8e of the Driving Licence Regulation.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'The registration office is on the right bank of the Rhine. The city books appointments online; some procedures, deregistration for instance, can be done without an appointment or fully online at many offices. What applies in Cologne right now is stated on the city’s website.',
      `If you live in the surrounding area, the search above finds your own district’s office. Neighbouring cities have their own pages: ${h.a('zulassungsstelle-duesseldorf', 'Düsseldorf')}, ${h.a('zulassungsstelle-essen', 'Essen')} and ${h.a('zulassungsstelle-dortmund', 'Dortmund')}.`),
  },
});
