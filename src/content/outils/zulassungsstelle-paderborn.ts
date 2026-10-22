import { defineGuide } from '../../lib/guide-types';
import { stadtKoerper, bz, rangPkw, rangBev } from '../../lib/stadt';

const ID = '05774';

export default defineGuide({
  id: 'zulassungsstelle-paderborn',
  group: 'staedte',
  order: 16,
  tool: 'finder',
  bezirk: ID,
  related: ['zulassungsstelle-guetersloh', 'zulassungsstelle-minden', 'wunschkennzeichen', 'kosten', 'auto-anmelden-kosten'],
  sources: ['kbaAv', 'kbaFz1', 'gebost', 'fzv9'],
  de: {
    slug: 'zulassungsstelle-paderborn',
    nav: 'Paderborn',
    card: 'An der Talle für zehn Kommunen, wahlweise PB oder BÜR.',
    title: 'Zulassungsstelle Paderborn: An der Talle, Kürzel PB und BÜR',
    description: 'Zulassungsstelle Paderborn: Straßenverkehrsamt des Kreises An der Talle 7, Führerscheinstelle, Kürzel PB und BÜR, zehn Kommunen, Bestand und Gebühren 2026.',
    h1: 'Straßenverkehrsamt Paderborn: Zulassung und Führerschein An der Talle',
    intro: 'Die Stadt Paderborn gehört zum Kreis Paderborn, und dessen Straßenverkehrsamt An der Talle ist für Zulassung und Führerschein im ganzen Kreis zuständig.',
    resume: (h) => { const s = bz(h, ID).stat!, g = rangPkw(h, ID), r = rangBev(h, ID); const st = h.Z.paketVon(ID).stellen[0]; return `Paderborn ist keine kreisfreie Stadt: Zulassungsbehörde ist der Kreis Paderborn, für die Stadt ebenso wie für Delbrück, Salzkotten, Büren, Bad Lippspringe und die übrigen der zehn Kommunen. Das Verzeichnis des Kraftfahrt-Bundesamts nennt eine Zulassungsstelle, ${st.strasse}, ${st.plz} ${st.stadt}, Telefon ${st.tel}, und unter derselben Anschrift die Führerscheinstelle. Zwei Kürzel sind aktuell: PB und BÜR, das für den früheren Kreis Büren steht und wieder ausgegeben wird. Auslaufende Kürzel führt das Verzeichnis für den Kreis nicht. Zum ${h.Z.META.fz1Stand} waren ${h.num(s.pkw)} Pkw zugelassen, Rang ${h.num(g.rang)} von ${h.num(g.von)} Bezirken, mit ${h.num(s.pkwDichte)} Pkw je 1.000 Einwohner. Reine Elektroautos machten ${h.pct(s.bev / s.pkw)} aus, Rang ${h.num(r.rang)} beim Elektroanteil. Die Gebühr ist die bundesweite: ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)} für die Neuzulassung vor Ort, ${h.eur(h.M.berechne({ vorgang: 'neu', wunsch: true }).gebuehr)} mit Wunschkennzeichen, Stand ${h.Z.META.av1Stand}.`; },
    faqs: (h) => [
      { q: 'Kann ich im Kreis Paderborn ein BÜR-Kennzeichen bekommen?', a: 'Ja. Das Verzeichnis des Kraftfahrt-Bundesamts führt BÜR für den Kreis Paderborn als aktuelles Kürzel, nicht als auslaufendes. Es steht für den früheren Kreis Büren, der in den Kreis Paderborn aufging. Ob Sie BÜR oder PB nehmen, sagen Sie bei der Zulassung; für das Kürzel allein steht in der Gebührenordnung kein Aufpreis, nur eine selbst gewählte Nummer dahinter kostet den Wunschzuschlag.' },
      { q: 'Ist die Stadt Paderborn für die Zulassung selbst zuständig?', a: 'Nein. Paderborn ist eine kreisangehörige Stadt, und die Zulassungsbehörde ist der Kreis. Das Verzeichnis nennt für die Stadt keine eigene Stelle, nur das Straßenverkehrsamt des Kreises An der Talle. Für Halter aus der Stadt und aus Hövelhof, Borchen oder Altenbeken ist es also dieselbe Adresse, mit denselben Gebühren und Terminen.' },
      { q: 'Was kostet in Paderborn die Ummeldung auf einen neuen Halter?', a: `Kaufen Sie einen Gebrauchtwagen aus dem Kreis und behalten das Kennzeichen, ist das eine Umschreibung für ${h.eur(h.M.berechne({ vorgang: 'umschreibung' }).gebuehr)} vor Ort. Mit neuem Kennzeichen kostet sie ${h.eur(h.M.berechne({ vorgang: 'umschreibungNeu' }).gebuehr)} plus Schilder. Kommt das Auto aus einem anderen Kreis, rechnet der Kostenrechner den passenden Vorgang mit jeder Gebührennummer.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Zulassung und Führerscheinstelle teilen sich die Anschrift An der Talle 7. Die Tabelle nennt Anschrift und Telefon; Termine und Online-Dienste stellt der Kreis selbst bereit.',
      `Für den Kreis Höxter, den Hochsauerlandkreis oder den Kreis Soest nennt die Suche oben die eigene Behörde. Welche Kombination hinter PB oder BÜR frei ist, zeigt die Seite zum ${h.a('wunschkennzeichen', 'Wunschkennzeichen')}; die Kosten einer Anmeldung erklärt ${h.a('auto-anmelden-kosten', 'Auto anmelden: Kosten')}.`),
  },
  en: {
    slug: 'registration-office-paderborn',
    nav: 'Paderborn',
    card: 'An der Talle for ten towns, PB or BÜR to choose.',
    title: 'Zulassungsstelle Paderborn: An der Talle, codes PB and BÜR',
    description: 'Zulassungsstelle Paderborn: the district road traffic office at An der Talle 7, licensing office, plate codes PB and BÜR, ten towns, car numbers and 2026 fees.',
    h1: 'Paderborn road traffic office: registration and licences at An der Talle',
    intro: 'The city of Paderborn belongs to the Paderborn district, whose road traffic office at An der Talle handles registration and licences for the whole district.',
    resume: (h) => { const s = bz(h, ID).stat!, g = rangPkw(h, ID), r = rangBev(h, ID); const st = h.Z.paketVon(ID).stellen[0]; return `Paderborn is not an independent city: the registration authority is the Paderborn district, for the city just as for Delbrück, Salzkotten, Büren, Bad Lippspringe and the rest of its ten towns. The Federal Motor Transport Authority’s directory lists one registration office, ${st.strasse}, ${st.plz} ${st.stadt}, phone ${st.tel}, and the licensing office at the same address. Two codes are current: PB and BÜR, which stands for the former Büren district and is issued again. The directory lists no phased-out codes for the district. On ${h.Z.fz1Stand('en')} there were ${h.num(s.pkw)} registered cars, rank ${h.num(g.rang)} of ${h.num(g.von)} districts, with ${h.num(s.pkwDichte)} cars per 1,000 residents. Fully electric cars made up ${h.pct(s.bev / s.pkw)}, rank ${h.num(r.rang)} for the electric share. The fee is the federal one: ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)} for a new registration in person, ${h.eur(h.M.berechne({ vorgang: 'neu', wunsch: true }).gebuehr)} with a personalised number, as of ${h.Z.avStand('en')}.`; },
    faqs: (h) => [
      { q: 'Can I get a BÜR plate in the Paderborn district?', a: 'Yes. The Federal Motor Transport Authority directory lists BÜR for the Paderborn district as a current code, not a phased-out one. It stands for the former Büren district, which merged into the Paderborn district. You say whether you want BÜR or PB at registration; the fee schedule has no surcharge for the code alone, only a number you choose behind it costs the personalised-plate surcharge.' },
      { q: 'Does the city of Paderborn register cars itself?', a: 'No. Paderborn belongs to the district, and the registration authority is the district. The directory lists no separate office for the city, only the district road traffic office at An der Talle. For keepers from the city and from Hövelhof, Borchen or Altenbeken it is therefore the same address, with the same fees and appointments.' },
      { q: 'What does a change of keeper cost in Paderborn?', a: `If you buy a used car from within the district and keep the plate, it is a transfer (Umschreibung) for ${h.eur(h.M.berechne({ vorgang: 'umschreibung' }).gebuehr)} in person. With a new plate it costs ${h.eur(h.M.berechne({ vorgang: 'umschreibungNeu' }).gebuehr)} plus plates. If the car comes from another district, the fee calculator works out the matching procedure with every fee number.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Registration and the licensing office share the address An der Talle 7. The table gives the address and phone; the district runs its own appointments and online services.',
      `For the Höxter district, the Hochsauerlandkreis or the Soest district the search above names their own office. Which combination behind PB or BÜR is free is shown on the ${h.a('wunschkennzeichen', 'personalised plate')} page; the cost of registering is explained under ${h.a('auto-anmelden-kosten', 'car registration cost')}.`),
  },
});
