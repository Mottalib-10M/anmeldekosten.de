import { defineGuide } from '../../lib/guide-types';
import { stadtKoerper, bz, rangBev } from '../../lib/stadt';

const ID = '05113';

export default defineGuide({
  id: 'zulassungsstelle-essen',
  group: 'staedte',
  order: 9,
  tool: 'finder',
  bezirk: ID,
  related: ['zulassungsstelle-dortmund', 'zulassungsstelle-duesseldorf', 'saisonkennzeichen', 'kosten', 'fuehrerschein-umtauschen'],
  sources: ['kbaAv', 'kbaFz1', 'gebost', 'fzv10'],
  de: {
    slug: 'zulassungsstelle-essen',
    nav: 'Essen',
    card: 'Altendorfer Straße für Autos, Führerschein in Steele, Kürzel E.',
    title: 'Zulassungsstelle Essen: Altendorfer Straße, Kürzel E, Kosten',
    description: 'Zulassungsstelle Essen in der Altendorfer Straße 101: Anschrift, Führerscheinstelle an anderer Adresse, Kürzel E, Pkw und Krafträder, Gebühren 2026 nach GebOSt.',
    h1: 'Zulassungsstelle Essen: zwei Adressen, ein Kürzel',
    intro: 'In Essen liegen Zulassungsstelle und Führerscheinstelle an verschiedenen Orten. Wer beides erledigen will, muss das wissen, bevor er losfährt.',
    resume: (h) => { const s = bz(h, ID).stat!, r = rangBev(h, ID); const f = h.Z.paketVon(ID).fe[0]; return `Die Stadt Essen lässt Fahrzeuge in der Altendorfer Straße 101 zu, Postleitzahl 45143, westlich der Innenstadt. Die Fahrerlaubnisbehörde ist dagegen dem Einwohneramt zugeordnet und steht im Verzeichnis des Kraftfahrt-Bundesamts unter einer anderen Anschrift, ${f.strasse} in ${f.plz} ${f.stadt}. Wer am selben Tag ein Auto ummelden und einen Führerschein umtauschen möchte, braucht also zwei Termine an zwei Orten. Das Kürzel E teilt Essen mit keinem anderen Kreis, und auslaufende Kürzel sind für die Stadt nicht vermerkt. Zum ${h.Z.META.fz1Stand} waren in Essen ${h.num(s.pkw)} Pkw und ${h.num(s.krad)} Krafträder zugelassen; auf 1.000 Einwohner kamen ${h.num(s.pkwDichte)} Pkw. Reine Elektroautos machten ${h.pct(s.bev / s.pkw)} aus, Rang ${h.num(r.rang)} von ${h.num(r.von)} Bezirken, der Dieselanteil ${h.pct(s.diesel / s.pkw)}. Die Gebühren sind die der Bundesverordnung: ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten' }).gebuehr)} für eine Ummeldung mit altem Kennzeichen vor Ort.`; },
    faqs: (h) => [
      { q: 'Kann ich in Essen Führerschein und Zulassung an einem Ort erledigen?', a: 'Laut Verzeichnis des Kraftfahrt-Bundesamts nicht: Die Zulassungsstelle sitzt in der Altendorfer Straße, die Fahrerlaubnisbehörde unter der Anschrift des Einwohneramts. Beide vergeben eigene Termine. Die Zulassung lässt sich online erledigen; dann bleibt nur der Weg zur Führerscheinstelle. Planen Sie beide Wege getrennt.' },
      { q: 'Lohnt sich für Motorräder in Essen ein Saisonkennzeichen?', a: `Das hängt vom Fahrprofil ab. Ein Saisonkennzeichen gilt nach der Fahrzeug-Zulassungsverordnung für ${h.num(h.P.fzv.saison_min_monate)} bis ${h.num(h.P.fzv.saison_max_monate)} Monate im Jahr, und Versicherung und Steuer fallen nur für diese Zeit an. Für ein Motorrad, das im Winter steht, spart das laufende Kosten. Was die Umstellung eines schon zugelassenen Motorrads kostet, rechnet die Seite zum Saisonkennzeichen vor.` },
      { q: 'Ich ziehe von Essen nach Mülheim: wohin zum Ummelden?', a: `Zur Zulassungsbehörde der Stadt Mülheim an der Ruhr, die kreisfrei ist und das Kürzel MH vergibt. Das E dürfen Sie behalten; dann kostet die Ummeldung ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten' }).gebuehr)} vor Ort statt ${h.eur(h.M.berechne({ vorgang: 'umzugNeu' }).gebuehr)} mit neuem Kennzeichen, und die alten Schilder bleiben am Auto.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Die Altendorfer Straße führt aus der Innenstadt nach Westen. Telefonnummer und Anschrift stehen in der Tabelle; Termine vergibt die Stadt online.',
      `Für Gelsenkirchen, Bottrop oder Mülheim nennt die Suche oben die jeweilige Behörde. Wer ein Motorrad nur im Sommer fährt, findet die Regeln beim ${h.a('saisonkennzeichen', 'Saisonkennzeichen')}; den Führerscheinumtausch erklärt der ${h.a('fuehrerschein-umtauschen', 'Umtausch-Rechner')}.`),
  },
  en: {
    slug: 'registration-office-essen',
    nav: 'Essen',
    card: 'Altendorfer Straße for cars, licences elsewhere, code E.',
    title: 'Zulassungsstelle Essen: Altendorfer Straße office, code E',
    description: 'Zulassungsstelle Essen at Altendorfer Straße 101: address, the licensing office at another site, plate code E, cars and motorcycles, and the 2026 fees.',
    h1: 'Essen registration office: two addresses, one code',
    intro: 'In Essen the registration office and the licensing office are in different places. Anyone handling both should know before setting off.',
    resume: (h) => { const s = bz(h, ID).stat!, r = rangBev(h, ID); const f = h.Z.paketVon(ID).fe[0]; return `The city of Essen registers vehicles at Altendorfer Straße 101, postcode 45143, west of the city centre. The licensing office, by contrast, belongs to the residents’ office and is listed in the Federal Motor Transport Authority’s directory at a different address, ${f.strasse} in ${f.plz} ${f.stadt}. Anyone who wants to re-register a car and exchange a licence on the same day therefore needs two appointments in two places. Essen shares the code E with no other district, and no phased-out codes are listed for the city. On ${h.Z.fz1Stand('en')} Essen had ${h.num(s.pkw)} cars and ${h.num(s.krad)} motorcycles; there were ${h.num(s.pkwDichte)} cars per 1,000 residents. Fully electric cars made up ${h.pct(s.bev / s.pkw)}, rank ${h.num(r.rang)} of ${h.num(r.von)} districts, and diesel cars ${h.pct(s.diesel / s.pkw)}. Fees are those of the federal ordinance: ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten' }).gebuehr)} to re-register in person keeping the old plate.`; },
    faqs: (h) => [
      { q: 'Can I handle a licence and a registration at one place in Essen?', a: 'According to the Federal Motor Transport Authority’s directory, no: the registration office is on Altendorfer Straße, the licensing office at the residents’ office address. Each books its own appointments. Registration can be done online, which leaves only the trip to the licensing office.' },
      { q: 'Is a seasonal plate worth it for a motorcycle in Essen?', a: `It depends on how you ride. Under the Vehicle Registration Ordinance a seasonal plate covers ${h.num(h.P.fzv.saison_min_monate)} to ${h.num(h.P.fzv.saison_max_monate)} months a year, and insurance and tax are only due for that period. For a motorcycle that stays in the garage in winter this cuts running costs. What switching an already registered motorcycle costs is worked out on the seasonal plate page.` },
      { q: 'I am moving from Essen to Mülheim: where do I re-register?', a: `At the registration office of the city of Mülheim an der Ruhr, which is independent of any district and issues the code MH. You may keep your E; re-registering then costs ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten' }).gebuehr)} in person instead of ${h.eur(h.M.berechne({ vorgang: 'umzugNeu' }).gebuehr)} with a new plate.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Altendorfer Straße runs west out of the city centre. Phone number and address are in the table; the city books appointments online.',
      `For Gelsenkirchen, Bottrop or Mülheim the search above names the right office. If you only ride a motorcycle in summer, the rules are under ${h.a('saisonkennzeichen', 'seasonal plates')}; the licence exchange is covered by the ${h.a('fuehrerschein-umtauschen', 'exchange calculator')}.`),
  },
});
