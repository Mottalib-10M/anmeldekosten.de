import { defineGuide, type Helpers } from '../../lib/guide-types';

const K = (h: Helpers) => h.M.berechne({ vorgang: 'kurzzeit' });
const T = (h: Helpers) => h.P.fzv.kurzzeit_tage;
/** Trois façons de déplacer une voiture non immatriculée, chiffrées par le moteur. */
function wege(h: Helpers): string {
  const de = h.lang === 'de';
  const k = K(h), g = h.M.berechne({ vorgang: 'gebraucht' }), a = h.M.berechne({ vorgang: 'ausfuhr' });
  const rows = [
    [de ? 'Kurzzeitkennzeichen' : 'Short-term plate', h.eur(k.gebuehr), `${h.eur(k.min)} – ${h.eur(k.max)}`, de ? `${h.num(T(h))} Tage, nur Deutschland` : `${h.num(T(h))} days, Germany only`],
    [de ? 'Gleich am Wohnort zulassen' : 'Register at home straight away', h.eur(g.gebuehr), `${h.eur(g.min)} – ${h.eur(g.max)}`, de ? 'unbefristet' : 'unlimited'],
    [de ? 'Ausfuhrkennzeichen (Export)' : 'Export plate', h.eur(a.gebuehr), `${h.eur(a.min)} – ${h.eur(a.max)}`, de ? `bis ${h.num(h.P.fzv.ausfuhr_max_monate)} Monate` : `up to ${h.num(h.P.fzv.ausfuhr_max_monate)} months`],
  ];
  return h.table(de ? ['Weg', 'Gebühr', 'Mit Nebenposten, ohne Schilder', 'Gültig'] : ['Route', 'Fee', 'With small items, no plates', 'Valid'], rows,
    de ? `GebOSt ${h.P.gebost_stand.de}; Versicherung und Schilder kommen dazu` : `GebOSt ${h.P.gebost_stand.en}; insurance and plates come on top`, ['l', 'r', 'r', 'l']);
}

export default defineGuide({
  id: 'kurzzeitkennzeichen',
  group: 'kennzeichen',
  order: 4,
  mini: 'kurzzeit',
  miniHref: 'kosten',
  related: ['ausfuhrkennzeichen', 'saisonkennzeichen', 'kosten', 'auto-anmelden-kosten', 'kfz-kennzeichen'],
  sources: ['fzv42', 'gebost', 'fzv10', 'kbaAv'],
  de: {
    slug: 'kurzzeitkennzeichen',
    nav: 'Kurzzeitkennzeichen',
    card: 'Fünf Tage für Überführung und Probefahrt: Voraussetzungen, Gebühr, Versicherung, Grenzen.',
    title: 'Kurzzeitkennzeichen 2026: Kosten, Voraussetzungen, Dauer',
    description: 'Kurzzeitkennzeichen 2026: Gebühr nach GebOSt, Kurzzeitversicherung, Hauptuntersuchung, wer es ausstellt, wie lange es gilt, Ausland und die Alternativen.',
    h1: 'Kurzzeitkennzeichen: fünf Tage für Überführung und Probefahrt',
    intro: 'Ein Auto gekauft, das nicht zugelassen ist, und es muss nach Hause oder zur Prüfstelle: Dafür gibt es das gelbe Kurzzeitkennzeichen. Was es kostet, wer es bekommt und wann es nicht passt.',
    resume: (h) => `Das Kurzzeitkennzeichen erlaubt nach § 42 der Fahrzeug-Zulassungsverordnung Probefahrten und Überführungsfahrten mit einem Fahrzeug, das nicht zugelassen ist. Es besteht aus dem Kürzel des Bezirks und einer Zahl, die mit 03 oder 04 beginnt, und trägt rechts ein gelbes Feld mit dem Ablaufdatum: Es gilt bis zum Ende des ${h.num(T(h))}. Tages nach der Zuteilung. Ausstellen darf es die Zulassungsbehörde des Antragstellers oder die am Standort des Fahrzeugs. Das Kennzeichen ist an ein Fahrzeug gebunden, dessen Daten im besonderen Fahrzeugschein stehen. Voraussetzungen sind eine Kurzzeitversicherung mit eVB-Nummer, eine gültige Hauptuntersuchung oder eine Fahrt, die unmittelbar dazu dient, und ein genehmigter Fahrzeugtyp. Die Gebühr beträgt nach Nummer 221.4 der Gebührenordnung, ${h.P.gebost_stand.de}, ${h.eur(h.P.land['221.4'])}, mit dem Eintrag beim Kraftfahrt-Bundesamt ${h.eur(K(h).max)}. Schilder und Versicherung haben keinen amtlichen Preis. Online geht der Antrag nicht.`,
    faqs: (h) => [
      { q: 'Darf ich mit einem Kurzzeitkennzeichen ins Ausland fahren?', a: 'Rechtlich gilt das Kennzeichen in Deutschland. Ob ein anderer Staat es anerkennt, entscheidet dieser selbst, und viele tun es nicht oder nur eingeschränkt; auch die Kurzzeitversicherung deckt das Ausland oft nicht. Wer ein Auto dauerhaft ins Ausland bringen will, nimmt ein Ausfuhrkennzeichen. Wer ein Auto aus dem Ausland holt, braucht meist ein Überführungskennzeichen des Herkunftslands.' },
      { q: 'Kann ich das Kurzzeitkennzeichen für ein anderes Auto benutzen?', a: 'Nein. Seit der Neuregelung ist das Kurzzeitkennzeichen an ein bestimmtes Fahrzeug gebunden, dessen Fahrzeug-Identifizierungsnummer im Fahrzeugschein für Kurzzeitkennzeichen steht. Wer mehrere Autos überführen will, braucht für jedes ein eigenes Kennzeichen und eine eigene Versicherung. Händler, die regelmäßig wechselnde Fahrzeuge bewegen, nutzen stattdessen rote Kennzeichen.' },
      { q: 'Wo bekomme ich die Kurzzeitversicherung?', a: 'Bei jedem Kfz-Versicherer, der sie anbietet, oft online oder über Schilderdienste an der Zulassungsstelle, die mit Versicherern zusammenarbeiten. Sie erhalten eine eVB-Nummer für Kurzzeitkennzeichen, die Sie bei der Behörde angeben. Der Preis ist frei und hängt vom Fahrzeug und vom Anbieter ab; vergleichen Sie vorher, denn an der Zulassungsstelle selbst ist das Angebot oft teurer.' },
      { q: 'Was passiert, wenn ich nach Ablauf noch fahre?', a: 'Nach dem Ablaufdatum darf das Fahrzeug nicht mehr auf öffentlichen Straßen bewegt werden, so § 42 der Verordnung. Wer trotzdem fährt, fährt ohne Zulassung und in der Regel ohne Versicherungsschutz, was eine Straftat nach dem Pflichtversicherungsgesetz sein kann. Ein neues Kurzzeitkennzeichen für dasselbe Fahrzeug ist möglich, kostet aber erneut die volle Gebühr.' },
    ],
    body: (h) => `<h2>Wofür das Kurzzeitkennzeichen gedacht ist</h2>
<p>Die Verordnung kennt zwei Zwecke: Probefahrten, etwa um ein Auto vor dem Kauf zu testen oder nach einer Reparatur zu prüfen, und Überführungsfahrten, etwa vom Verkäufer zum eigenen Wohnort, zur Werkstatt oder zur Prüfstelle. Für den Alltag ist es nicht gedacht. Wer ein Auto regelmäßig fahren will, lässt es zu; wer es nur über den Winter abstellen will, nimmt ein ${h.a('saisonkennzeichen', 'Saisonkennzeichen')}.</p>
<h2>Was es kostet, und was die Alternativen kosten</h2>
<p>Die Tabelle vergleicht das Kurzzeitkennzeichen mit den beiden Wegen, die oft in Frage kommen. In allen drei Fällen kommen Schilder und Versicherung hinzu, die Sie selbst einkaufen.</p>
${wege(h)}
<p>Das Kurzzeitkennzeichen ist also nicht billiger als eine Zulassung. Es lohnt sich, wenn das Auto erst am Wohnort zugelassen werden kann, etwa weil der Kaufvertrag noch nicht erfüllt ist, die Hauptuntersuchung fehlt oder die Papiere unterwegs sind. Wer alle Unterlagen schon hat, lässt das Auto oft besser gleich ${h.a('auto-online-anmelden', 'online zu')} und holt es mit den eigenen Schildern ab.</p>
<!--mini:kurzzeit-->
<h2>Voraussetzungen im Einzelnen</h2>
<p><strong>Fahrzeug.</strong> Es muss einem genehmigten Typ entsprechen oder eine Einzelgenehmigung haben. Fehlt beides, erlaubt die Verordnung nur Fahrten im Zusammenhang mit einer neuen Betriebserlaubnis, und auch die nur im Bezirk und in angrenzenden Bezirken.</p>
<p><strong>Hauptuntersuchung.</strong> Ein gültiger Nachweis muss vorliegen. Ist die HU abgelaufen, sind nur Fahrten zur Prüfstelle und zurück erlaubt, und die Beschränkung steht im Fahrzeugschein.</p>
<p><strong>Versicherung.</strong> Eine Kurzzeit-Haftpflichtversicherung mit eVB-Nummer. Der Versicherer meldet ihr Ende mit.</p>
<p><strong>Unterlagen.</strong> Ausweis, die Zulassungsbescheinigung Teil II oder ein anderer Nachweis der Fahrzeugdaten, der HU-Bericht und, wenn jemand anderes kommt, eine Vollmacht.</p>
<h2>Wer es ausstellt</h2>
<p>Zuständig ist die Zulassungsbehörde Ihres Wohnsitzes oder die Behörde, in deren Bezirk das Fahrzeug steht. Das ist praktisch: Wer ein Auto in einer anderen Stadt kauft, kann das Kurzzeitkennzeichen dort holen und direkt losfahren. Einen Termin brauchen Sie wie für jede andere Zulassung; viele Behörden vergeben Kurzzeitkennzeichen aber auch an Schaltern ohne Termin. Die Stelle mit Adresse finden Sie über die ${h.a('home', 'Suche nach Ort oder Postleitzahl')}.</p>
<h2>Das Schild und der Fahrzeugschein</h2>
<p>Das Kennzeichen besteht aus dem Kürzel und einer reinen Ziffernfolge, die mit 03 oder 04 beginnt; Buchstaben in der Erkennungsnummer gibt es nicht, ein Wunschkennzeichen also auch nicht. Rechts steht im gelben Feld das Ablaufdatum. Die Schilder müssen nicht fest angeschraubt sein, aber sicher sitzen und lesbar sein. Dazu gibt es einen eigenen Fahrzeugschein auf den Antragsteller, den Sie bei jeder Fahrt mitführen.</p>
<h2>Typische Fehler</h2>
<p>Der häufigste ist, das Kennzeichen für mehr als die Überführung zu nutzen, etwa für eine Urlaubsfahrt: Das deckt der Zweck nicht. Der zweite ist eine Fahrt ins Ausland ohne Prüfung, ob Versicherung und Zielland das Kennzeichen akzeptieren. Der dritte betrifft das Ablaufdatum: Es zählt der Tag, nicht die Stunde, und der Tag der Zuteilung zählt nicht mit. Der vierte ist, das Kennzeichen für ein zweites Auto weiterzugeben; das ist nicht erlaubt. Wer ein zugelassenes Auto mit ${h.a('saisonkennzeichen', 'Saisonkennzeichen')} außerhalb der Saison bewegen muss, darf dafür übrigens ein Kurzzeitkennzeichen nutzen, solange das Saisonkennzeichen nicht gleichzeitig dranhängt.</p>
<h2>Kurzzeitkennzeichen oder Ausfuhrkennzeichen?</h2>
<p>Soll das Auto Deutschland dauerhaft verlassen, ist das ${h.a('ausfuhrkennzeichen', 'Ausfuhrkennzeichen')} der vorgesehene Weg. Es gilt länger, bis zu ${h.num(h.P.fzv.ausfuhr_max_monate)} Monate, wird von einer Versicherung für ausländische Fahrzeuge gedeckt und ist im Ausland eher bekannt. Für die kurze Strecke zur Grenze reicht ein Kurzzeitkennzeichen rechtlich zwar in Deutschland, aber dahinter beginnt das Risiko. Was jede Variante mit allen Posten kostet, rechnet der ${h.a('kosten', 'Kostenrechner')}.</p>`,
  },
  en: {
    slug: 'short-term-number-plate-germany',
    nav: 'Short-term plate',
    card: 'Five days for transfers and test drives: requirements, fee, insurance and limits.',
    title: 'Kurzzeitkennzeichen: short-term number plates in Germany',
    description: 'Short-term number plates in Germany for 2026: GebOSt fee, short-term insurance, inspection rules, who issues them, how long they last and the alternatives.',
    h1: 'Short-term plates in Germany: five days for transfers and test drives',
    intro: 'You bought a car that is not registered and it has to get home or to the test centre: that is what the yellow short-term plate (Kurzzeitkennzeichen) is for. What it costs, who gets one and when it is the wrong choice.',
    resume: (h) => `Under section 42 of the vehicle registration ordinance (FZV), a short-term plate (Kurzzeitkennzeichen) allows test drives and transfer drives with a vehicle that is not registered. It consists of the district code and a number beginning with 03 or 04, with a yellow field on the right showing the expiry date: it is valid until the end of the ${h.num(T(h))}th day after allocation. It may be issued by the applicant’s registration office or by the office where the vehicle is located. The plate is tied to one vehicle, whose data appear in a special registration document. You need short-term insurance with an eVB number, a valid roadworthiness test or a trip made directly to one, and an approved vehicle type. Under number 221.4 of the road traffic fee schedule (GebOSt), ${h.P.gebost_stand.en}, the fee is ${h.eur(h.P.land['221.4'])}, or ${h.eur(K(h).max)} with the Federal Motor Transport Authority’s register entry. Plates and insurance have no official price. You cannot apply online.`,
    faqs: (h) => [
      { q: 'Can I drive abroad on a German short-term plate?', a: 'Legally the plate is valid in Germany. Whether another country recognises it is up to that country, and many do not, or only with limits; the short-term insurance often does not cover other countries either. To take a car abroad permanently, use an export plate. To bring a car from abroad, you usually need a transfer plate from the country of origin.' },
      { q: 'Can I use a short-term plate on a different car?', a: 'No. Since the rules changed, a short-term plate is tied to one vehicle, whose identification number is entered in the short-term registration document. To move several cars you need a plate and insurance for each. Dealers who regularly move different vehicles use red trade plates instead.' },
      { q: 'Where do I get short-term insurance in Germany?', a: 'From any motor insurer that offers it, often online or through plate makers at the registration office who work with insurers. You receive an eVB number for short-term plates, which you give to the office. The price is set freely and depends on the vehicle and the provider; compare beforehand, because the offer at the registration office itself is often dearer.' },
      { q: 'What happens if I keep driving after the plate expires?', a: 'After the expiry date the vehicle may no longer be used on public roads, under section 42 of the ordinance. Driving anyway means driving unregistered and usually uninsured, which can be a criminal offence under the compulsory insurance act. A new short-term plate for the same vehicle is possible but costs the full fee again.' },
    ],
    body: (h) => `<h2>What the short-term plate is for</h2>
<p>The ordinance names two purposes: test drives, for example to try a car before buying or to check it after a repair, and transfer drives, for example from the seller to your home, to a garage or to the test centre. It is not meant for everyday use. If you want to drive a car regularly, register it; if you only want to lay it up for the winter, use a ${h.a('saisonkennzeichen', 'seasonal plate')}.</p>
<h2>What it costs, and what the alternatives cost</h2>
<p>The table compares the short-term plate with the two routes that often come into question. In all three cases you add plates and insurance, which you buy yourself.</p>
${wege(h)}
<p>So a short-term plate is not cheaper than registering. It is worth it when the car can only be registered at your home address later, for instance because the purchase is not complete, the inspection is missing or the papers are in the post. If you already have every document, it is often better to register the car ${h.a('auto-online-anmelden', 'online')} straight away and collect it with your own plates.</p>
<!--mini:kurzzeit-->
<h2>The requirements in detail</h2>
<p><strong>Vehicle.</strong> It must match an approved type or have an individual approval. If it has neither, the ordinance only allows trips connected with obtaining a new approval, and only within the district and neighbouring districts.</p>
<p><strong>Roadworthiness test.</strong> Valid proof must exist. If the inspection (HU) has expired, only trips to the test centre and back are allowed, and the restriction is entered in the registration document.</p>
<p><strong>Insurance.</strong> Short-term third-party insurance with an eVB number. The insurer reports its end date too.</p>
<p><strong>Documents.</strong> ID, registration certificate part II or other proof of the vehicle data, the inspection report and, if someone else applies, a power of attorney.</p>
<h2>Who issues it</h2>
<p>The registration office for your home address or the office in whose district the vehicle is located. That is handy: if you buy a car in another city, you can get the short-term plate there and drive off. You need an appointment as for any registration, though many offices also issue short-term plates at counters without one. The ${h.a('home', 'search by town or postcode')} gives the office and its address.</p>
<h2>The plate and the registration document</h2>
<p>The plate shows the district code and a string of digits only, starting with 03 or 04; there are no letters in the number, so no personalised version either. The yellow field on the right shows the expiry date. The plates need not be screwed on permanently, but they must be secure and legible. You also receive a separate registration document in the applicant’s name, which you carry on every trip.</p>
<h2>Common mistakes</h2>
<p>The most common is using the plate for more than the transfer, such as a holiday trip: the purpose does not cover it. The second is a trip abroad without checking whether the insurance and the destination country accept the plate. The third concerns the expiry date: the day counts, not the hour, and the day of allocation is not included. The fourth is passing the plate on to a second car, which is not allowed. Incidentally, if you need to move a registered car with a ${h.a('saisonkennzeichen', 'seasonal plate')} outside its season, you may use a short-term plate for it, as long as the seasonal plate is not fitted at the same time.</p>
<h2>Short-term plate or export plate?</h2>
<p>If the car is to leave Germany for good, the ${h.a('ausfuhrkennzeichen', 'export plate')} is the intended route. It lasts longer, up to ${h.num(h.P.fzv.ausfuhr_max_monate)} months, is covered by insurance for foreign vehicles and is better known abroad. A short-term plate is legally enough for the drive to the border within Germany, but beyond it the risk begins. The ${h.a('kosten', 'fee calculator')} works out each option with every item.</p>`,
  },
});
