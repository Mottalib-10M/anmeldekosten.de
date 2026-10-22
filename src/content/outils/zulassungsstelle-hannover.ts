import { defineGuide } from '../../lib/guide-types';
import { stadtKoerper, bz, rangPkw } from '../../lib/stadt';

const ID = '03241';
const STADT = '03241-1';

export default defineGuide({
  id: 'zulassungsstelle-hannover',
  group: 'staedte',
  order: 12,
  tool: 'finder',
  bezirk: STADT,
  related: ['zulassungsstelle-hamburg', 'zulassungsstelle-bremen', 'kfz-kennzeichen', 'kosten', 'auto-ummelden'],
  sources: ['kbaAv', 'kbaFz1', 'gebost', 'fzv9'],
  de: {
    slug: 'zulassungsstelle-hannover',
    nav: 'Hannover',
    card: 'Stadt am Schützenplatz, Region an der Hildesheimer Straße, beide H.',
    title: 'Zulassungsstelle Hannover: Stadt oder Region, Anschriften',
    description: 'Zulassungsstelle Hannover: Landeshauptstadt am Schützenplatz oder Region an der Hildesheimer Straße, wer zuständig ist, Kürzel H und die Gebühren 2026.',
    h1: 'Zulassungsstelle Hannover: Landeshauptstadt oder Region?',
    intro: 'In Hannover gibt es zwei Zulassungsbehörden für dasselbe Kürzel H: die der Landeshauptstadt und die der Region. Das ist bundesweit eine Besonderheit.',
    resume: (h) => { const s = bz(h, ID).stat!, g = rangPkw(h, ID); const st = h.Z.paketVon(STADT).stellen[0], rg = h.Z.paketVon(ID).stellen[0]; return `Die Region Hannover ist ein Kommunalverband, zu dem die Landeshauptstadt und zwanzig weitere Städte und Gemeinden gehören. Für die Kfz-Zulassung führt das Verzeichnis des Kraftfahrt-Bundesamts im Regionsgebiet zwei Behörden: die Landeshauptstadt Hannover, ${st.strasse}, und die Region Hannover, ${rg.strasse}, beide mit Postleitzahl ${rg.plz}. Halter mit Hauptwohnsitz in der Stadt gehen zur Stadt, Halter aus Garbsen, Laatzen, Langenhagen oder den übrigen Regionskommunen zur Region. Beide vergeben das Kürzel H. Bei der Region stehen außerdem die auslaufenden Kürzel BU, SPR und NRÜ, für die früheren Kreise Burgdorf, Springe und Neustadt am Rübenberge; SPR führt auch der Landkreis Schaumburg als auslaufend. Die Fahrzeugstatistik des Kraftfahrt-Bundesamts zählt Stadt und Region zusammen: ${h.num(s.pkw)} Pkw zum ${h.Z.META.fz1Stand}, Rang ${h.num(g.rang)} unter den Zulassungsbezirken, mit ${h.num(s.pkwDichte)} Pkw je 1.000 Einwohner. Die Gebühren sind bei beiden Behörden dieselben: ${h.eur(h.M.berechne({ vorgang: 'umzugNeu' }).gebuehr)} für eine Ummeldung aus einem anderen Kreis mit neuem Kennzeichen.`; },
    faqs: (h) => [
      { q: 'Ich wohne in Langenhagen: Zulassungsstelle Stadt oder Region Hannover?', a: 'Die Region. Langenhagen ist eine eigene Stadt innerhalb der Region Hannover, nicht Teil der Landeshauptstadt. Zuständig ist die Zulassungsbehörde der Region an der Hildesheimer Straße. Die Suche oben unterscheidet das: Für Hannover selbst zeigt sie die Stelle am Schützenplatz, für jede andere Regionskommune die der Region.' },
      { q: 'Ist ein Umzug von Hannover nach Garbsen eine Ummeldung?', a: `Ja, denn die Behörde wechselt, von der Landeshauptstadt zur Region, auch wenn das Kennzeichen H bleibt. Mit altem Kennzeichen kostet die Ummeldung ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten' }).gebuehr)} vor Ort. Wer nur innerhalb der Stadt umzieht, ändert dagegen nur die Anschrift, für ${h.eur(h.M.berechne({ vorgang: 'adresse' }).gebuehr)}. Zuständig ist dann weiter die Stelle am Schützenplatz.` },
      { q: 'Was bedeuten BU, SPR und NRÜ auf Kennzeichen aus der Region?', a: 'Es sind Kürzel früherer Landkreise, die 1974 im damaligen Landkreis Hannover aufgingen: Burgdorf, Springe und Neustadt am Rübenberge. Das Kraftfahrt-Bundesamt führt sie bei der Region als auslaufend. Wer ein solches Kennzeichen hat, behält es; neu ausgegeben wird es laut Verzeichnis nicht.' },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Die Tabelle nennt beide Behörden: zuerst die Region, dann die Landeshauptstadt. Beide liegen in der Stadt Hannover, haben aber getrennte Telefonnummern und Termine; wer am falschen Schalter steht, wird weitergeschickt.',
      `Die Bestandszahlen gelten für die ganze Region einschließlich der Stadt, weil das Kraftfahrt-Bundesamt sie nach Kreisen veröffentlicht. Für Hildesheim, Celle oder Schaumburg nennt die Suche oben die eigene Behörde; die ${h.a('kfz-kennzeichen', 'Kennzeichen-Liste')} zeigt alle Kürzel Niedersachsens.`, [ID, STADT]),
  },
  en: {
    slug: 'registration-office-hannover',
    nav: 'Hannover',
    card: 'City at Schützenplatz, region on Hildesheimer Straße, both H.',
    title: 'Zulassungsstelle Hannover: city or region office, addresses',
    description: 'Zulassungsstelle Hannover: the state capital at Schützenplatz or the region on Hildesheimer Straße, who is in charge, the plate code H and the 2026 fees.',
    h1: 'Hannover registration office: city or region?',
    intro: 'Hannover has two registration offices for the same code H: the state capital’s and the region’s. That is unusual in Germany.',
    resume: (h) => { const s = bz(h, ID).stat!, g = rangPkw(h, ID); const st = h.Z.paketVon(STADT).stellen[0], rg = h.Z.paketVon(ID).stellen[0]; return `The Hannover Region is a local-government association made up of the state capital and twenty other towns and municipalities. For vehicle registration the Federal Motor Transport Authority’s directory lists two offices in the region: the city of Hannover, ${st.strasse}, and the Hannover Region, ${rg.strasse}, both with postcode ${rg.plz}. Keepers whose main address is in the city go to the city; keepers from Garbsen, Laatzen, Langenhagen or the other municipalities go to the region. Both issue the code H. The region also has the phased-out codes BU, SPR and NRÜ, for the former districts of Burgdorf, Springe and Neustadt am Rübenberge; SPR is also listed as phased out at the Schaumburg district. The Authority’s vehicle statistics count city and region together: ${h.num(s.pkw)} cars on ${h.Z.fz1Stand('en')}, rank ${h.num(g.rang)} among registration districts, with ${h.num(s.pkwDichte)} cars per 1,000 residents. Fees are the same at both offices: ${h.eur(h.M.berechne({ vorgang: 'umzugNeu' }).gebuehr)} to re-register from another district with a new plate.`; },
    faqs: (h) => [
      { q: 'I live in Langenhagen: city or region registration office in Hannover?', a: 'The region. Langenhagen is a town of its own within the Hannover Region, not part of the state capital. The region’s registration office on Hildesheimer Straße is in charge. The search above makes the distinction: for Hannover itself it shows the Schützenplatz office, for every other municipality in the region the region’s office.' },
      { q: 'Is moving from Hannover to Garbsen a re-registration?', a: `Yes, because the office changes, from the city to the region, even if the H plate stays. Keeping the plate, re-registering costs ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten' }).gebuehr)} in person. Moving within the city only changes the address, for ${h.eur(h.M.berechne({ vorgang: 'adresse' }).gebuehr)}, and the Schützenplatz office stays in charge.` },
      { q: 'What do BU, SPR and NRÜ mean on plates from the region?', a: 'They are the codes of former districts that merged into the then district of Hannover in 1974: Burgdorf, Springe and Neustadt am Rübenberge. The Federal Motor Transport Authority lists them for the region as phased out. If you have one you keep it; according to the directory it is not issued again.' },
    ],
    body: (h) => stadtKoerper(h, ID,
      'The table lists both offices: first the region, then the state capital. Both are inside the city of Hannover but have separate phone numbers and appointments; at the wrong counter you will be sent on.',
      `The vehicle figures cover the whole region including the city, because the Federal Motor Transport Authority publishes them by district. For Hildesheim, Celle or Schaumburg the search above names the right office; the ${h.a('kfz-kennzeichen', 'plate code list')} shows every code in Lower Saxony.`, [ID, STADT]),
  },
});
