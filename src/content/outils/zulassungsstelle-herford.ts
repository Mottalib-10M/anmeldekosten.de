import { defineGuide } from '../../lib/guide-types';
import { stadtKoerper, bz, rangPkw } from '../../lib/stadt';

const ID = '05758';

export default defineGuide({
  id: 'zulassungsstelle-herford',
  group: 'staedte',
  order: 18,
  tool: 'finder',
  bezirk: ID,
  related: ['zulassungsstelle-minden', 'zulassungsstelle-guetersloh', 'auto-online-anmelden', 'kosten', 'fuehrerschein-umtauschen'],
  sources: ['kbaAv', 'kbaFz1', 'gebost', 'fev8e'],
  de: {
    slug: 'zulassungsstelle-herford',
    nav: 'Herford (Kirchlengern)',
    card: 'Kreis Herford: Zulassung in Kirchlengern, nur das Kürzel HF.',
    title: 'Zulassungsstelle Herford in Kirchlengern: Elsestraße, HF',
    description: 'Zulassungsstelle Herford: das Straßenverkehrsamt des Kreises sitzt in Kirchlengern, Elsestraße 225, mit Führerscheinstelle, Kürzel HF und Gebühren 2026.',
    h1: 'Straßenverkehrsamt Kreis Herford: Zulassung in Kirchlengern',
    intro: 'Wer im Kreis Herford ein Auto zulässt, fährt nicht in die Kreisstadt, sondern nach Kirchlengern. Dort sitzen Zulassung und Führerscheinstelle des Kreises.',
    resume: (h) => { const s = bz(h, ID).stat!, g = rangPkw(h, ID); const st = h.Z.paketVon(ID).stellen[0]; return `Zulassungsbehörde für Herford, Bünde, Löhne, Enger, Hiddenhausen, Vlotho, Spenge, Rödinghausen und Kirchlengern ist der Kreis Herford. Sein Straßenverkehrsamt liegt laut Verzeichnis des Kraftfahrt-Bundesamts nicht in der Stadt Herford, sondern in der ${st.strasse}, ${st.plz} ${st.stadt}, Telefon ${st.tel}. Unter derselben Anschrift führt das Verzeichnis die Fahrerlaubnisbehörde; Außenstellen nennt es nicht. Das einzige Kürzel ist HF, auslaufende Kürzel gibt es für den Kreis keine. Das ist selten: Viele Nachbarkreise führen noch alte Kürzel früherer Kreise. Zum ${h.Z.META.fz1Stand} waren ${h.num(s.pkw)} Pkw zugelassen, Rang ${h.num(g.rang)} von ${h.num(g.von)}, mit ${h.num(s.pkwDichte)} Pkw je 1.000 Einwohner gegen ${h.num(h.Z.META.total.pkwDichte)} im Bund; mit Lkw, Krafträdern und Zugmaschinen zählte das Kraftfahrt-Bundesamt ${h.num(s.kfz)} Kraftfahrzeuge. Wer den Weg nach Kirchlengern sparen will, meldet online an: ${h.eur(h.M.berechne({ vorgang: 'gebraucht', online: true }).gebuehr)} statt ${h.eur(h.M.berechne({ vorgang: 'gebraucht' }).gebuehr)} vor Ort für einen Gebrauchtwagen, Stand ${h.Z.META.av1Stand}.`; },
    faqs: (h) => [
      { q: 'Warum ist die Zulassungsstelle des Kreises Herford in Kirchlengern?', a: 'Weil der Kreis sein Straßenverkehrsamt dort betreibt, an der Elsestraße, im Norden des Kreisgebiets. Für die Zuständigkeit spielt der Ort keine Rolle: Halter aus allen neun Kommunen gehen dorthin, auch aus der Stadt Herford. Eine Außenstelle in Herford selbst steht nicht im Verzeichnis des Kraftfahrt-Bundesamts. Online-Zulassung über i-Kfz erspart die Fahrt.' },
      { q: 'Ich ziehe von Herford nach Bünde: muss ich mein Auto ummelden?', a: `Nur die Anschrift ändert sich, denn beide Städte gehören zum Kreis Herford und die Behörde bleibt dieselbe. Das HF-Kennzeichen bleibt am Auto. Die Änderung im Fahrzeugschein kostet ${h.eur(h.M.berechne({ vorgang: 'adresse' }).gebuehr)} am Schalter in Kirchlengern und ${h.eur(h.M.berechne({ vorgang: 'adresse', online: true }).gebuehr)} online. Ziehen Sie nach Bielefeld oder Minden, ist es eine Ummeldung bei einer anderen Behörde.` },
      { q: 'Wo tausche ich im Kreis Herford meinen alten Führerschein um?', a: `Bei der Fahrerlaubnisbehörde des Kreises, die das Verzeichnis ebenfalls in der Elsestraße in Kirchlengern führt. Der Umtausch kostet ${h.eur(h.M.UMTAUSCH_GEBUEHR)}; mitzubringen sind Ausweis, ein biometrisches Foto und der alte Führerschein. Wann Ihre Frist nach Anlage 8e abläuft, rechnet der ${h.a('fuehrerschein-umtauschen', 'Umtausch-Rechner')} aus Geburts- oder Ausstellungsjahr.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Kirchlengern liegt zwischen Bünde und Löhne im Norden des Kreises. Die Anschrift steht in der Tabelle; wie Termine vergeben werden, regelt der Kreis selbst.',
      `Für Bielefeld, den Kreis Minden-Lübbecke oder den Kreis Lippe nennt die Suche oben die eigene Behörde. Wie die Zulassung ohne Termin am Bildschirm geht, steht unter ${h.a('auto-online-anmelden', 'Auto online anmelden')}.`),
  },
  en: {
    slug: 'registration-office-herford',
    nav: 'Herford (Kirchlengern)',
    card: 'Herford district: registration in Kirchlengern, code HF only.',
    title: 'Zulassungsstelle Herford: Kirchlengern office, code HF',
    description: 'Zulassungsstelle Herford: the district road traffic office is in Kirchlengern, Elsestraße 225, with the licensing office, plate code HF and the 2026 fees.',
    h1: 'Herford district road traffic office: registration in Kirchlengern',
    intro: 'Registering a car in the Herford district means going not to the town of Herford but to Kirchlengern, where the district runs registration and licensing.',
    resume: (h) => { const s = bz(h, ID).stat!, g = rangPkw(h, ID); const st = h.Z.paketVon(ID).stellen[0]; return `The registration authority for Herford, Bünde, Löhne, Enger, Hiddenhausen, Vlotho, Spenge, Rödinghausen and Kirchlengern is the Herford district. According to the Federal Motor Transport Authority’s directory its road traffic office is not in the town of Herford but at ${st.strasse}, ${st.plz} ${st.stadt}, phone ${st.tel}. The directory lists the licensing office at the same address and no branches. The only code is HF, with no phased-out codes for the district. That is unusual: many neighbouring districts still list old codes of former districts. On ${h.Z.fz1Stand('en')} there were ${h.num(s.pkw)} registered cars, rank ${h.num(g.rang)} of ${h.num(g.von)}, with ${h.num(s.pkwDichte)} cars per 1,000 residents against ${h.num(h.Z.META.total.pkwDichte)} nationally; with lorries, motorcycles and tractors the Federal Motor Transport Authority counted ${h.num(s.kfz)} motor vehicles. To save the trip to Kirchlengern, register online: ${h.eur(h.M.berechne({ vorgang: 'gebraucht', online: true }).gebuehr)} instead of ${h.eur(h.M.berechne({ vorgang: 'gebraucht' }).gebuehr)} in person for a used car, as of ${h.Z.avStand('en')}.`; },
    faqs: (h) => [
      { q: 'Why is the Herford district registration office in Kirchlengern?', a: 'Because the district runs its road traffic office there, on Elsestraße, in the north of the district. The location does not affect who is served: keepers from all nine towns go there, including the town of Herford. No branch in Herford itself appears in the Federal Motor Transport Authority directory. Registering online through i-Kfz saves the trip.' },
      { q: 'I am moving from Herford to Bünde: do I have to re-register my car?', a: `Only the address changes, because both towns belong to the Herford district and the office stays the same. The HF plate stays on the car. The change to the registration certificate costs ${h.eur(h.M.berechne({ vorgang: 'adresse' }).gebuehr)} at the counter in Kirchlengern and ${h.eur(h.M.berechne({ vorgang: 'adresse', online: true }).gebuehr)} online. Moving to Bielefeld or Minden is a re-registration with another office.` },
      { q: 'Where do I exchange my old driving licence in the Herford district?', a: `At the district licensing office, which the directory also lists on Elsestraße in Kirchlengern. The exchange costs ${h.eur(h.M.UMTAUSCH_GEBUEHR)}; bring your ID, a biometric photo and the old licence. When your Annex 8e deadline falls is worked out by the ${h.a('fuehrerschein-umtauschen', 'exchange calculator')} from your year of birth or year of issue.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Kirchlengern lies between Bünde and Löhne in the north of the district. The address is in the table; the district sets its own appointment system.',
      `For Bielefeld, the Minden-Lübbecke district or the Lippe district the search above names their own office. How to register from your screen without an appointment is explained under ${h.a('auto-online-anmelden', 'registering a car online')}.`),
  },
});
