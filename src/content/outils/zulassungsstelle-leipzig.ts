import { defineGuide } from '../../lib/guide-types';
import { stadtKoerper, bz, rangBev, rangDichte } from '../../lib/stadt';

const ID = '14713';

export default defineGuide({
  id: 'zulassungsstelle-leipzig',
  group: 'staedte',
  order: 10,
  tool: 'finder',
  bezirk: ID,
  related: ['zulassungsstelle-berlin', 'zulassungsstelle-hannover', 'kfz-kennzeichen', 'kosten', 'auto-ummelden'],
  sources: ['kbaAv', 'kbaFz1', 'gebost', 'fzv9'],
  de: {
    slug: 'zulassungsstelle-leipzig',
    nav: 'Leipzig',
    card: 'Prager Straße, Kürzel L, Stadt und Landkreis Leipzig getrennt.',
    title: 'Zulassungsstelle Leipzig: Prager Straße, Kürzel L, Kosten',
    description: 'Zulassungsstelle Leipzig in der Prager Straße 136: Anschrift, Abgrenzung zum Landkreis Leipzig mit demselben Kürzel L, Führerscheinstelle und Gebühren 2026.',
    h1: 'Zulassungsstelle Leipzig: Stadt und Landkreis trennen',
    intro: 'Das Kürzel L vergeben in Sachsen zwei Behörden, die Stadt Leipzig und der Landkreis Leipzig. Welche für Sie zuständig ist, entscheidet der Wohnort, nicht das Kennzeichen.',
    resume: (h) => { const s = bz(h, ID).stat!, r = rangBev(h, ID), d = rangDichte(h, ID); return `Die Zulassungsbehörde der Stadt Leipzig gehört zum Ordnungsamt und sitzt in der Prager Straße 136, Postleitzahl 04317, im Südosten der Stadt. Sie ist nur für Halter mit Hauptwohnsitz in der kreisfreien Stadt zuständig. Das Kürzel L vergibt auch der Landkreis Leipzig, dessen Zulassungsbehörde ihren Hauptsitz in Borna hat; Markkleeberg, Grimma oder Markranstädt gehören dorthin. Im Verzeichnis des Kraftfahrt-Bundesamts steht L außerdem als auslaufendes Kürzel bei den hessischen Behörden in Gießen und Wetzlar, ein Rest der kurzlebigen Stadt Lahn. Leipzig fällt in der Fahrzeugstatistik auf: Mit ${h.num(s.pkwDichte)} Pkw je 1.000 Einwohner zum ${h.Z.META.fz1Stand} hat die Stadt nach Berlin eine der niedrigsten Dichten in Deutschland, Rang ${h.num(d.rang)} von unten unter ${h.num(d.von)} Bezirken. Der Anteil reiner Elektroautos lag bei ${h.pct(s.bev / s.pkw)}, Rang ${h.num(r.rang)}. Die Gebühren sind bundesweit gleich: ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)} für eine Neuzulassung vor Ort, ${h.eur(h.M.berechne({ vorgang: 'neu', online: true }).gebuehr)} online.`; },
    faqs: (h) => [
      { q: 'Ich wohne in Markkleeberg: Zulassungsstelle Leipzig oder Borna?', a: 'Die des Landkreises Leipzig. Markkleeberg grenzt zwar an die Stadt, gehört aber zum Landkreis, und der hat eine eigene Zulassungsbehörde mit Hauptsitz in Borna und weiteren Standorten. Das Kennzeichen beginnt in beiden Fällen mit L. Die Suche oben ordnet jede Gemeinde über den amtlichen Gemeindeschlüssel dem richtigen Kreis zu.' },
      { q: 'Kann man am Kennzeichen erkennen, ob ein Auto aus der Stadt Leipzig kommt?', a: 'Nicht sicher. L vergeben Stadt und Landkreis Leipzig, und seit 2015 darf jeder sein Kennzeichen nach einem Umzug behalten. Ein Leipziger Kennzeichen kann also an einem Auto hängen, dessen Halter längst in Dresden wohnt. Für die Behörde zählt allein die Meldeadresse des Halters.' },
      { q: 'Wo ist in Leipzig die Führerscheinstelle?', a: `Das Verzeichnis des Kraftfahrt-Bundesamts führt die Fahrerlaubnisbehörde beim Ordnungsamt, nennt aber nur eine Postfach-Postleitzahl ohne Straße. Die Anschrift für Besuche steht deshalb auf der Website der Stadt. Der Umtausch eines alten Führerscheins kostet dort wie überall ${h.eur(h.M.UMTAUSCH_GEBUEHR)}, ohne Prüfung.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Die Prager Straße führt vom Zentrum nach Südosten, Richtung Probstheida. Für die Zulassung gibt es laut Verzeichnis keinen zweiten Standort in der Stadt.',
      `Für den Landkreis Leipzig, Nordsachsen oder Halle an der Saale nennt die Suche oben die eigene Behörde. Woher die vielen doppelten und auslaufenden Kürzel kommen, erklärt die ${h.a('kfz-kennzeichen', 'Kennzeichen-Liste')}; wie man beim Umzug sein L behält, die Seite zum ${h.a('auto-ummelden', 'Ummelden')}.`),
  },
  en: {
    slug: 'registration-office-leipzig',
    nav: 'Leipzig',
    card: 'Prager Straße, code L, city and district of Leipzig apart.',
    title: 'Zulassungsstelle Leipzig: Prager Straße office, code L, fees',
    description: 'Zulassungsstelle Leipzig at Prager Straße 136: address, how it differs from the Leipzig district with the same code L, licensing office, vehicles and 2026 fees.',
    h1: 'Leipzig registration office: city versus district',
    intro: 'In Saxony two authorities issue the code L, the city of Leipzig and the district of Leipzig. Which one is yours depends on where you live, not on the plate.',
    resume: (h) => { const s = bz(h, ID).stat!, r = rangBev(h, ID), d = rangDichte(h, ID); return `The city of Leipzig’s registration office is part of its public order office and sits at Prager Straße 136, postcode 04317, in the south-east of the city. It serves only keepers whose main address is in the independent city. The code L is also issued by the district of Leipzig (Landkreis Leipzig), whose registration office has its headquarters in Borna; Markkleeberg, Grimma and Markranstädt belong there. The Federal Motor Transport Authority’s directory also lists L as a phased-out code at the Hessian offices in Gießen and Wetzlar, a remnant of the short-lived city of Lahn. Leipzig stands out in the vehicle statistics: with ${h.num(s.pkwDichte)} cars per 1,000 residents on ${h.Z.fz1Stand('en')}, it has one of the lowest densities in Germany after Berlin, rank ${h.num(d.rang)} from the bottom among ${h.num(d.von)} districts. Fully electric cars made up ${h.pct(s.bev / s.pkw)}, rank ${h.num(r.rang)}. Fees are the same nationwide: ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)} for a new registration in person, ${h.eur(h.M.berechne({ vorgang: 'neu', online: true }).gebuehr)} online.`; },
    faqs: (h) => [
      { q: 'I live in Markkleeberg: Leipzig or Borna registration office?', a: 'The district of Leipzig’s. Markkleeberg borders the city but belongs to the district, which has its own registration office headquartered in Borna, with further locations. The plate starts with L either way. The search above assigns every municipality to the right district through its official municipality key.' },
      { q: 'Can you tell from the plate whether a car is from the city of Leipzig?', a: 'Not reliably. L is issued by both the city and the district of Leipzig, and since 2015 anyone may keep their plate after moving. A Leipzig plate can therefore be on a car whose keeper has long lived in Dresden. For the office, only the keeper’s registered address counts.' },
      { q: 'Where is the driving licence office in Leipzig?', a: `The Federal Motor Transport Authority’s directory lists the licensing office under the public order office but gives only a PO-box postcode without a street. The visiting address is therefore on the city’s website. Exchanging an old licence there costs ${h.eur(h.M.UMTAUSCH_GEBUEHR)}, as everywhere.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Prager Straße runs south-east from the centre towards Probstheida. According to the directory there is no second registration site in the city.',
      `For the Leipzig district, North Saxony or Halle (Saale) the search above names the right office. Where the many shared and phased-out codes come from is explained in the ${h.a('kfz-kennzeichen', 'plate code list')}; how to keep your L when moving, on the ${h.a('auto-ummelden', 're-registering')} page.`),
  },
});
