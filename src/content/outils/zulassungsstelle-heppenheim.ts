import { defineGuide } from '../../lib/guide-types';
import { stadtKoerper, bz, rangPkw } from '../../lib/stadt';

const ID = '06431';

export default defineGuide({
  id: 'zulassungsstelle-heppenheim',
  group: 'staedte',
  order: 19,
  tool: 'finder',
  bezirk: ID,
  related: ['zulassungsstelle-frankfurt', 'zulassungsstelle-stuttgart', 'h-kennzeichen', 'kosten', 'strassenverkehrsamt'],
  sources: ['kbaAv', 'kbaFz1', 'gebost', 'fzv9'],
  de: {
    slug: 'zulassungsstelle-heppenheim',
    nav: 'Heppenheim (Bergstraße)',
    card: 'Kreis Bergstraße: Zulassung in der Benzstraße, Führerschein in der Gräffstraße.',
    title: 'Zulassungsstelle Heppenheim: Kreis Bergstraße, Kürzel HP',
    description: 'Zulassungsstelle Heppenheim: Straßenverkehrsamt des Kreises Bergstraße in der Benzstraße, Führerscheinstelle in der Gräffstraße, Kürzel HP und Gebühren 2026.',
    h1: 'Straßenverkehrsamt Bergstraße: Zulassung in Heppenheim',
    intro: 'Der Kreis Bergstraße an der Grenze zu Baden-Württemberg lässt alle Fahrzeuge in Heppenheim zu. Zulassung und Führerschein liegen dort an zwei verschiedenen Adressen.',
    resume: (h) => { const s = bz(h, ID).stat!, g = rangPkw(h, ID); const st = h.Z.paketVon(ID).stellen[0], fe = h.Z.paketVon(ID).fe[0]; return `Zuständig für Bensheim, Viernheim, Lampertheim, Heppenheim, Lorsch und die übrigen der 21 Städte und Gemeinden des Kreises Bergstraße ist der Landrat des Kreises. Das Verzeichnis des Kraftfahrt-Bundesamts nennt eine Zulassungsstelle in der Kreisstadt: ${st.strasse}, ${st.plz} ${st.stadt}, Telefon ${st.tel}. Die Fahrerlaubnisbehörde steht dort unter einer anderen Anschrift, ${fe.strasse}; wer Auto und Führerschein am selben Tag erledigen will, plant also zwei Wege ein. Ausgegeben wird nur HP, das für Heppenheim steht; auslaufende Kürzel führt das Verzeichnis für den Kreis nicht. Zum ${h.Z.META.fz1Stand} waren ${h.num(s.pkw)} Pkw zugelassen, Rang ${h.num(g.rang)} von ${h.num(g.von)}, dazu ${h.num(s.krad)} Krafträder, und auf 1.000 Einwohner kamen ${h.num(s.pkwDichte)} Pkw, gegen ${h.num(h.Z.META.total.pkwDichte)} im Bund. Die Gebühren sind die bundesweiten: Eine Ummeldung mit neuem HP-Kennzeichen kostet ${h.eur(h.M.berechne({ vorgang: 'umzugNeu' }).gebuehr)} vor Ort, Stand ${h.Z.META.av1Stand}.`; },
    faqs: (h) => [
      { q: 'Wo ist die Führerscheinstelle des Kreises Bergstraße?', a: 'Ebenfalls in Heppenheim, aber nicht unter der Anschrift der Zulassung. Das Verzeichnis des Kraftfahrt-Bundesamts führt die Fahrerlaubnisbehörde des Landrats in der Gräffstraße 5, die Zulassungsstelle in der Benzstraße 1. Für Umtausch, internationalen Führerschein oder Ersatz nach Verlust ist die Gräffstraße die richtige Adresse; für Anmelden, Ummelden und Abmelden die Benzstraße.' },
      { q: 'Viernheim und Lampertheim liegen bei Mannheim: ist trotzdem Heppenheim zuständig?', a: 'Ja. Beide Städte gehören zum hessischen Kreis Bergstraße, auch wenn Mannheim näher liegt. Die Stadt Mannheim in Baden-Württemberg ist für sie nicht zuständig, weil die Zulassung immer bei der Behörde des Hauptwohnsitzes liegt. Das Kennzeichen ist HP. Die Suche oben ordnet jede Gemeinde über ihren Gemeindeschlüssel dem richtigen Kreis zu.' },
      { q: 'Ich ziehe aus Mannheim an die Bergstraße: was kostet das Ummelden?', a: `Behalten Sie das MA-Kennzeichen, kostet die Ummeldung ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten' }).gebuehr)} vor Ort und ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten', online: true }).gebuehr)} online. Wer zu HP wechselt, zahlt ${h.eur(h.M.berechne({ vorgang: 'umzugNeu' }).gebuehr)} und neue Schilder. Ein Wechsel des Bundeslands ändert an den Gebühren nichts, denn die Gebührenordnung gilt bundesweit. Melden müssen Sie den Umzug in jedem Fall bei der Zulassungsstelle in Heppenheim oder online.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Die erste Tabelle nennt die Anschrift der Zulassung, die zweite die der Führerscheinstelle; beide liegen in Heppenheim. Termine vergibt der Kreis selbst.',
      `Für die Stadt Darmstadt, den Odenwaldkreis oder den Rhein-Neckar-Kreis nennt die Suche oben die eigene Behörde. Was das Straßenverkehrsamt neben der Zulassung erledigt, erklärt die Seite ${h.a('strassenverkehrsamt', 'Straßenverkehrsamt')}; die Kosten jedes Vorgangs rechnet der ${h.a('kosten', 'Kostenrechner')}.`),
  },
  en: {
    slug: 'registration-office-heppenheim',
    nav: 'Heppenheim (Bergstraße)',
    card: 'Bergstraße district: registration on Benzstraße, licences on Gräffstraße.',
    title: 'Zulassungsstelle Heppenheim: Bergstraße district, code HP',
    description: 'Zulassungsstelle Heppenheim: the Bergstraße district road traffic office on Benzstraße, the licensing office on Gräffstraße, plate code HP and the 2026 fees.',
    h1: 'Bergstraße road traffic office: registration in Heppenheim',
    intro: 'The Bergstraße district on the border with Baden-Württemberg registers every vehicle in Heppenheim. Registration and licences are at two different addresses there.',
    resume: (h) => { const s = bz(h, ID).stat!, g = rangPkw(h, ID); const st = h.Z.paketVon(ID).stellen[0], fe = h.Z.paketVon(ID).fe[0]; return `Bensheim, Viernheim, Lampertheim, Heppenheim, Lorsch and the rest of the 21 towns and municipalities of the Bergstraße district are served by the district administrator (Landrat). The Federal Motor Transport Authority’s directory lists one registration office in the district town: ${st.strasse}, ${st.plz} ${st.stadt}, phone ${st.tel}. The licensing office is at another address in the same town, ${fe.strasse}; anyone handling a car and a licence on the same day should plan for two stops. Only HP, for Heppenheim, is issued; the directory lists no phased-out codes for the district. On ${h.Z.fz1Stand('en')} there were ${h.num(s.pkw)} registered cars, rank ${h.num(g.rang)} of ${h.num(g.von)}, plus ${h.num(s.krad)} motorcycles, and ${h.num(s.pkwDichte)} cars per 1,000 residents against ${h.num(h.Z.META.total.pkwDichte)} nationally. Fees are the federal ones: re-registering after a move with a new HP plate costs ${h.eur(h.M.berechne({ vorgang: 'umzugNeu' }).gebuehr)} in person, as of ${h.Z.avStand('en')}.`; },
    faqs: (h) => [
      { q: 'Where is the Bergstraße district licensing office?', a: 'Also in Heppenheim, but not at the registration address. The Federal Motor Transport Authority directory lists the district licensing office at Gräffstraße 5 and the registration office at Benzstraße 1. For an exchange, an international permit or a replacement after loss, Gräffstraße is the right address; for registering, re-registering and deregistering, Benzstraße.' },
      { q: 'Viernheim and Lampertheim are near Mannheim: is Heppenheim still in charge?', a: 'Yes. Both towns belong to the Hessian Bergstraße district, even though Mannheim is closer. The city of Mannheim in Baden-Württemberg does not serve them, because registration always lies with the office of your main residence. The plate code is HP. The search above assigns every municipality to the right district by its official code.' },
      { q: 'I am moving from Mannheim to the Bergstraße: what does re-registering cost?', a: `Keeping the MA plate, re-registering costs ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten' }).gebuehr)} in person and ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten', online: true }).gebuehr)} online. Switching to HP costs ${h.eur(h.M.berechne({ vorgang: 'umzugNeu' }).gebuehr)} plus new plates. Changing federal state makes no difference to the fees, because the fee schedule applies nationwide. Either way, the move has to be reported to the Heppenheim office or online, since the new address must appear on the registration certificate.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'The first table gives the registration address, the second the licensing office; both are in Heppenheim. The district handles appointments itself.',
      `For the city of Darmstadt, the Odenwaldkreis or the Rhein-Neckar district the search above names their own office. What the road traffic office does besides registration is explained on the ${h.a('strassenverkehrsamt', 'Straßenverkehrsamt')} page; the ${h.a('kosten', 'fee calculator')} works out each procedure.`),
  },
});
