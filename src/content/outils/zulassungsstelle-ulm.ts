import { defineGuide } from '../../lib/guide-types';
import { stadtKoerper, bz, rangPkw } from '../../lib/stadt';

const ID = '08421';
const LAND = '08425';
const NU = '09775';

export default defineGuide({
  id: 'zulassungsstelle-ulm',
  group: 'staedte',
  order: 20,
  tool: 'finder',
  bezirk: ID,
  related: ['zulassungsstelle-stuttgart', 'zulassungsstelle-muenchen', 'fuehrerschein-umtauschen', 'kosten', 'auto-ummelden'],
  sources: ['kbaAv', 'kbaFz1', 'gebost', 'fev8e'],
  de: {
    slug: 'zulassungsstelle-ulm',
    nav: 'Ulm',
    card: 'Stadt Ulm und Alb-Donau-Kreis in der Schillerstraße, Kürzel UL; Neu-Ulm getrennt.',
    title: 'Zulassungsstelle Ulm: Schillerstraße, Kürzel UL, Neu-Ulm',
    description: 'Zulassungsstelle Ulm: Stadt Ulm und Alb-Donau-Kreis in der Schillerstraße 30, Außenstellen Ehingen und Langenau, Kürzel UL, Neu-Ulm in Bayern, Gebühren 2026.',
    h1: 'Straßenverkehrsamt Ulm: Stadt und Alb-Donau-Kreis unter einem Dach',
    intro: 'In Ulm teilen sich zwei Zulassungsbehörden eine Adresse: die Stadt Ulm und das Landratsamt Alb-Donau-Kreis. Neu-Ulm auf der anderen Donauseite gehört zu Bayern.',
    resume: (h) => { const s = bz(h, ID).stat!, l = bz(h, LAND).stat!, g = rangPkw(h, ID); const st = h.Z.paketVon(ID).stellen[0], nu = h.Z.paketVon(NU).stellen[0]; return `Die kreisfreie Stadt Ulm ist eine eigene Zulassungsbehörde, ebenso das Landratsamt des Alb-Donau-Kreises, der die Stadt umschließt. Das Verzeichnis des Kraftfahrt-Bundesamts führt beide unter derselben Anschrift, ${st.strasse}, ${st.plz} ${st.stadt}, Telefon ${st.tel}; der Kreis hat dazu Außenstellen in Ehingen und Langenau. Beide vergeben UL. Für den Kreis stehen außerdem EHI und MÜN sowie BC im Verzeichnis, als auslaufend. Führerscheine stellen getrennte Behörden aus: für die Stadt die Bürgerdienste in der Olgastraße, für den Kreis das Landratsamt in der Schillerstraße und in Ehingen. Neu-Ulm gehört nicht dazu: Es liegt in Bayern, Zulassungsbehörde ist das Landratsamt Neu-Ulm, ${nu.strasse}, mit den Kürzeln NU und ILL. Zum ${h.Z.META.fz1Stand} waren in der Stadt Ulm ${h.num(s.pkw)} Pkw zugelassen, Rang ${h.num(g.rang)} von ${h.num(g.von)}, im Alb-Donau-Kreis ${h.num(l.pkw)}. Die Gebühren sind überall dieselben, etwa ${h.eur(h.M.berechne({ vorgang: 'abmelden' }).gebuehr)} für eine Abmeldung vor Ort, Stand ${h.Z.META.av1Stand}.`; },
    faqs: (h) => [
      { q: 'Ich wohne in Neu-Ulm: kann ich in Ulm zulassen?', a: 'Nein. Neu-Ulm liegt in Bayern und gehört zum Landkreis Neu-Ulm, dessen Landratsamt in der Kantstraße die Zulassung übernimmt; das Verzeichnis nennt dazu eine Außenstelle in Illertissen. Zugelassen wird immer bei der Behörde des Hauptwohnsitzes, die Nähe zur Ulmer Schillerstraße ändert daran nichts. Neu-Ulmer bekommen NU oder ILL, nicht UL.' },
      { q: 'Haben Stadt Ulm und Alb-Donau-Kreis dasselbe Kennzeichen?', a: 'Ja, beide vergeben UL, und am Kennzeichen sieht man nicht, ob ein Auto aus der Stadt oder aus Blaustein, Erbach oder Laichingen kommt. Es sind trotzdem zwei Behörden. Ein Umzug von Ulm nach Ehingen ist deshalb eine Ummeldung zum Kreis, auch wenn das UL bleiben kann. Der Kreis führt zusätzlich die auslaufenden Kürzel EHI, MÜN und BC.' },
      { q: 'Wo tausche ich in Ulm den Führerschein um?', a: `Als Einwohner der Stadt bei den Bürgerdiensten in der Olgastraße, die das Verzeichnis als Fahrerlaubnisbehörde der Stadt Ulm führt. Wer im Alb-Donau-Kreis wohnt, geht zum Landratsamt in der Schillerstraße oder zur Außenstelle Ehingen. Die Gebühr beträgt in beiden Fällen ${h.eur(h.M.UMTAUSCH_GEBUEHR)}; Ihre Frist nennt der ${h.a('fuehrerschein-umtauschen', 'Umtausch-Rechner')}.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Die Tabelle nennt zuerst die Stelle der Stadt, dann die des Alb-Donau-Kreises mit den Außenstellen. Wer in der Stadt wohnt, ist bei der Stadt richtig, wer in einer Kreisgemeinde wohnt, beim Landratsamt.',
      `Die Bestandszahlen gelten nur für die Stadt Ulm; der Alb-Donau-Kreis hatte ${h.num(bz(h, LAND).stat!.pkwDichte)} Pkw je 1.000 Einwohner, der Landkreis Neu-Ulm ${h.num(bz(h, NU).stat!.pkwDichte)}. Für Neu-Ulm, Biberach oder Heidenheim nennt die Suche oben die zuständige Stelle; was ein Umzug zwischen Stadt und Kreis kostet, rechnet ${h.a('auto-ummelden', 'Auto ummelden')}.`, [ID, LAND]),
  },
  en: {
    slug: 'registration-office-ulm',
    nav: 'Ulm',
    card: 'City of Ulm and Alb-Donau district on Schillerstraße, code UL; Neu-Ulm separate.',
    title: 'Zulassungsstelle Ulm: Schillerstraße office, UL, Neu-Ulm',
    description: 'Zulassungsstelle Ulm: the city of Ulm and the Alb-Donau district at Schillerstraße 30, branches in Ehingen and Langenau, code UL, Neu-Ulm in Bavaria, 2026 fees.',
    h1: 'Ulm road traffic office: city and Alb-Donau district under one roof',
    intro: 'In Ulm two registration authorities share an address: the city of Ulm and the Alb-Donau district office. Neu-Ulm, across the Danube, belongs to Bavaria.',
    resume: (h) => { const s = bz(h, ID).stat!, l = bz(h, LAND).stat!, g = rangPkw(h, ID); const st = h.Z.paketVon(ID).stellen[0], nu = h.Z.paketVon(NU).stellen[0]; return `The independent city of Ulm is a registration authority in its own right, and so is the office of the Alb-Donau district that surrounds it. The Federal Motor Transport Authority’s directory lists both at the same address, ${st.strasse}, ${st.plz} ${st.stadt}, phone ${st.tel}; the district also has branches in Ehingen and Langenau. Both issue UL. For the district the directory also lists EHI, MÜN and BC, as phased out. Licences come from separate offices: for the city the citizens’ services on Olgastraße, for the district the office on Schillerstraße and in Ehingen. Neu-Ulm is not part of this: it lies in Bavaria, and its authority is the Neu-Ulm district office, ${nu.strasse}, with the codes NU and ILL. On ${h.Z.fz1Stand('en')} the city of Ulm had ${h.num(s.pkw)} registered cars, rank ${h.num(g.rang)} of ${h.num(g.von)}, and the Alb-Donau district ${h.num(l.pkw)}. Fees are the same everywhere, for example ${h.eur(h.M.berechne({ vorgang: 'abmelden' }).gebuehr)} to deregister in person, as of ${h.Z.avStand('en')}.`; },
    faqs: (h) => [
      { q: 'I live in Neu-Ulm: can I register my car in Ulm?', a: 'No. Neu-Ulm is in Bavaria and belongs to the Neu-Ulm district, whose office on Kantstraße handles registration; the directory also lists a branch in Illertissen. You always register with the office of your main residence, and being close to Schillerstraße in Ulm does not change that. Neu-Ulm residents get NU or ILL, not UL.' },
      { q: 'Do the city of Ulm and the Alb-Donau district share a plate code?', a: 'Yes, both issue UL, and the plate does not show whether a car comes from the city or from Blaustein, Erbach or Laichingen. They are still two authorities. Moving from Ulm to Ehingen is therefore a re-registration with the district, even though the UL can stay. The district also lists the phased-out codes EHI, MÜN and BC.' },
      { q: 'Where do I exchange my driving licence in Ulm?', a: `City residents go to the citizens’ services on Olgastraße, which the directory lists as the city of Ulm’s licensing office. If you live in the Alb-Donau district, go to the district office on Schillerstraße or the Ehingen branch. The fee is ${h.eur(h.M.UMTAUSCH_GEBUEHR)} in both cases; the ${h.a('fuehrerschein-umtauschen', 'exchange calculator')} gives your deadline.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'The table lists the city office first, then the Alb-Donau district with its branches. City residents go to the city, residents of a district municipality to the district office.',
      `The vehicle figures cover the city of Ulm only; the Alb-Donau district had ${h.num(bz(h, LAND).stat!.pkwDichte)} cars per 1,000 residents and the Neu-Ulm district ${h.num(bz(h, NU).stat!.pkwDichte)}. For Neu-Ulm, Biberach or Heidenheim the search above names the right office; what a move between city and district costs is worked out under ${h.a('auto-ummelden', 're-registering after a move')}.`, [ID, LAND]),
  },
});
