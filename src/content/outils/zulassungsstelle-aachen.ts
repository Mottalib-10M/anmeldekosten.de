import { defineGuide } from '../../lib/guide-types';
import { stadtKoerper, bz, rangPkw } from '../../lib/stadt';

const ID = '05334';

export default defineGuide({
  id: 'zulassungsstelle-aachen',
  group: 'staedte',
  order: 13,
  tool: 'finder',
  bezirk: ID,
  related: ['zulassungsstelle-koeln', 'zulassungsstelle-siegburg', 'kfz-kennzeichen', 'kosten', 'auto-ummelden'],
  sources: ['kbaAv', 'kbaFz1', 'gebost', 'fzv9'],
  de: {
    slug: 'zulassungsstelle-aachen',
    nav: 'Aachen',
    card: 'StädteRegion in Würselen, Kürzel AC und MON, zehn Kommunen.',
    title: 'Zulassungsstelle Aachen: Würselen, Kürzel AC und MON, Kosten',
    description: 'Zulassungsstelle Aachen: Straßenverkehrsamt der StädteRegion in Würselen, Führerscheinstelle, Kürzel AC und MON, zehn Kommunen, Bestand und Gebühren 2026.',
    h1: 'Straßenverkehrsamt Aachen: die Zulassung sitzt in Würselen',
    intro: 'Für Aachen und seine Nachbarstädte ist die StädteRegion Aachen zuständig. Ihr Straßenverkehrsamt liegt nicht in Aachen selbst, sondern in Würselen.',
    resume: (h) => { const s = bz(h, ID).stat!, g = rangPkw(h, ID); const st = h.Z.paketVon(ID).stellen[0]; return `Zulassungsbehörde für die Stadt Aachen ist die StädteRegion Aachen, ein Gemeindeverband aus zehn Städten und Gemeinden, darunter Eschweiler, Stolberg, Alsdorf, Herzogenrath und Monschau. Das Verzeichnis des Kraftfahrt-Bundesamts nennt eine einzige Zulassungsstelle: ${st.strasse}, ${st.plz} ${st.stadt}, Telefon ${st.tel}. Unter derselben Anschrift führt es auch die Fahrerlaubnisbehörde, Außenstellen stehen nicht im Verzeichnis. Halter aus allen zehn Kommunen gehen dorthin, auch wer mitten in Aachen wohnt. Ausgegeben werden zwei Kürzel, AC und MON; GK ist für die StädteRegion nur noch als auslaufend vermerkt. Zum ${h.Z.META.fz1Stand} waren ${h.num(s.pkw)} Pkw zugelassen, Rang ${h.num(g.rang)} von ${h.num(g.von)} Zulassungsbezirken, mit ${h.num(s.pkwDichte)} Pkw je 1.000 Einwohner gegen ${h.num(h.Z.META.total.pkwDichte)} im Bund. Die Gebühren richten sich nach der bundesweiten Gebührenordnung: Eine Neuzulassung kostet ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)} vor Ort und ${h.eur(h.M.berechne({ vorgang: 'neu', online: true }).gebuehr)} online, Stand ${h.Z.META.av1Stand}.`; },
    faqs: (h) => [
      { q: 'Warum muss ich aus Aachen nach Würselen zur Zulassungsstelle?', a: 'Weil die Stadt Aachen keine eigene Zulassungsbehörde hat. Die Aufgabe liegt bei der StädteRegion, und deren Straßenverkehrsamt steht laut Verzeichnis des Kraftfahrt-Bundesamts in der Carlo-Schmid-Straße in Würselen, gleich hinter der Aachener Stadtgrenze. Wer den Weg sparen will, erledigt Anmeldung, Ummeldung oder Abmeldung online über i-Kfz; das kostet zudem weniger als am Schalter.' },
      { q: 'Wer bekommt in der StädteRegion Aachen das Kürzel MON?', a: 'MON steht für den früheren Kreis Monschau in der Eifel. Das Verzeichnis führt es für die StädteRegion als aktuelles Kürzel neben AC, es wird also weiter ausgegeben. Ob Sie es bei der Zulassung wählen können, entscheidet die Behörde; viele Zulassungsstellen mit zwei Kürzeln lassen dem Halter die Wahl. Ein Aufpreis für das Kürzel selbst steht nicht in der Gebührenordnung.' },
      { q: 'Ziehe ich von Aachen nach Eschweiler: brauche ich ein neues Kennzeichen?', a: `Nein. Beide Städte gehören zur StädteRegion, die Behörde bleibt dieselbe, und das AC-Kennzeichen bleibt am Auto. Zu ändern ist nur die Anschrift im Fahrzeugschein, für ${h.eur(h.M.berechne({ vorgang: 'adresse' }).gebuehr)} am Schalter oder ${h.eur(h.M.berechne({ vorgang: 'adresse', online: true }).gebuehr)} online. Ein Umzug nach Düren oder Heinsberg dagegen ist eine Ummeldung bei einem anderen Kreis.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Würselen grenzt im Norden an Aachen; die Anschrift steht in der Tabelle, Termine vergibt die StädteRegion selbst. Welche Vorgänge ohne Termin gehen, ändert sich, deshalb nennen wir keine Öffnungszeiten.',
      `Zum Bezirk gehören neben Aachen auch Baesweiler, Roetgen, Simmerath und Würselen. Für den Kreis Düren, den Kreis Heinsberg oder die Euregio-Nachbarn nennt die Suche oben die passende Stelle; die Kosten jedes Vorgangs rechnet der ${h.a('kosten', 'Kostenrechner')}.`),
  },
  en: {
    slug: 'registration-office-aachen',
    nav: 'Aachen',
    card: 'The StädteRegion office in Würselen, codes AC and MON, ten towns.',
    title: 'Zulassungsstelle Aachen: Würselen office, codes AC and MON',
    description: 'Zulassungsstelle Aachen: the StädteRegion road traffic office in Würselen, licensing office, plate codes AC and MON, ten towns, vehicle numbers and 2026 fees.',
    h1: 'Aachen registration office: it sits in Würselen',
    intro: 'Aachen and its neighbouring towns are served by the StädteRegion Aachen. Its road traffic office is not in Aachen itself but in Würselen.',
    resume: (h) => { const s = bz(h, ID).stat!, g = rangPkw(h, ID); const st = h.Z.paketVon(ID).stellen[0]; return `The registration authority for the city of Aachen is the StädteRegion Aachen, an association of ten towns and municipalities including Eschweiler, Stolberg, Alsdorf, Herzogenrath and Monschau. The Federal Motor Transport Authority’s directory lists a single registration office: ${st.strasse}, ${st.plz} ${st.stadt}, phone ${st.tel}. It lists the licensing office at the same address and no branches. Keepers from all ten towns go there, including those who live in central Aachen. Two codes are issued, AC and MON; GK is listed for the StädteRegion only as phased out. On ${h.Z.fz1Stand('en')} there were ${h.num(s.pkw)} registered cars, rank ${h.num(g.rang)} of ${h.num(g.von)} registration districts, with ${h.num(s.pkwDichte)} cars per 1,000 residents against ${h.num(h.Z.META.total.pkwDichte)} nationally. Fees follow the federal schedule: a new registration costs ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)} in person and ${h.eur(h.M.berechne({ vorgang: 'neu', online: true }).gebuehr)} online, as of ${h.Z.avStand('en')}.`; },
    faqs: (h) => [
      { q: 'Why do I have to go from Aachen to Würselen to register a car?', a: 'Because the city of Aachen has no registration office of its own. The task lies with the StädteRegion, whose road traffic office is on Carlo-Schmid-Straße in Würselen according to the Federal Motor Transport Authority directory, just past the Aachen city limit. To skip the trip, register, transfer or deregister online through i-Kfz, which also costs less than at the counter.' },
      { q: 'Who gets the MON plate code in the Aachen region?', a: 'MON stands for the former district of Monschau in the Eifel. The directory lists it for the StädteRegion as a current code next to AC, so it is still issued. Whether you can choose it at registration is up to the office; many offices with two codes let the keeper choose. The fee schedule has no surcharge for the code itself.' },
      { q: 'If I move from Aachen to Eschweiler, do I need a new plate?', a: `No. Both towns belong to the StädteRegion, the office stays the same and the AC plate stays on the car. Only the address on the registration certificate changes, for ${h.eur(h.M.berechne({ vorgang: 'adresse' }).gebuehr)} at the counter or ${h.eur(h.M.berechne({ vorgang: 'adresse', online: true }).gebuehr)} online. A move to Düren or Heinsberg, by contrast, is a re-registration with another district.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Würselen borders Aachen to the north; the address is in the table, and the StädteRegion handles appointments itself. Which procedures work without one changes over time, so we give no opening hours.',
      `Besides Aachen, the district includes Baesweiler, Roetgen, Simmerath and Würselen. For the Düren or Heinsberg districts, or neighbours across the border region, the search above names the right office; the ${h.a('kosten', 'fee calculator')} works out each procedure.`),
  },
});
