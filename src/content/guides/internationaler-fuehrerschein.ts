import { defineGuide, type Helpers } from '../../lib/guide-types';

const F = (h: Helpers) => h.P.fuehrerschein;
const I = (h: Helpers) => F(h).international;
const ber = (h: Helpers) => h.P.lokal['11000'].posten.find((p) => p.id === 'international')!;
const naechste = (h: Helpers) => F(h).karte.find((z) => h.M.daysBetween(h.today, z.frist) >= 0)!;
/** Qui l'obtient directement, qui doit d'abord échanger son permis (§ 25a FeV + Anlage 8e). */
function faelle(h: Helpers): string {
  const de = h.lang === 'de';
  const n = naechste(h);
  const rows = de ? [
    ['Papierführerschein (grau oder rosa)', 'nein', 'erst in die Karte umtauschen'],
    [`Karte aus ${n.von} – ${n.bis}`, 'ja', `Umtausch bis ${h.date(n.frist)} mit einplanen`],
    ['Karte ab dem 19. Januar 2013', 'ja', 'Ablaufdatum in Feld 4b prüfen'],
    ['Ausländische Fahrerlaubnis, in Deutschland gültig', 'ja', 'Nachweis nach § 29 FeV'],
    ['Unter 18 Jahren', 'nein', '§ 25a verlangt das vollendete 18. Lebensjahr'],
  ] : [
    ['Paper licence (grey or pink)', 'no', 'exchange it for a card first'],
    [`Card issued ${n.von} – ${n.bis}`, 'yes', `plan for the exchange by ${h.date(n.frist)}`],
    ['Card issued from 19 January 2013', 'yes', 'check the expiry date in field 4b'],
    ['Foreign licence valid in Germany', 'yes', 'proof under section 29 FeV'],
    ['Under 18', 'no', 'section 25a requires the holder to be 18'],
  ];
  return h.table(de ? ['Ihr Führerschein', 'Internationaler Führerschein direkt?', 'Hinweis'] : ['Your licence', 'International permit straight away?', 'Note'], rows,
    de ? `§ 25a FeV; Fristen nach Anlage 8e, Stand ${h.date(h.today)}` : `Section 25a FeV; deadlines under Annex 8e, as of ${h.date(h.today)}`, ['l', 'l', 'l']);
}

export default defineGuide({
  id: 'internationaler-fuehrerschein',
  group: 'fuehrerschein',
  order: 3,
  mini: 'international',
  miniHref: 'fuehrerschein-umtausch-frist',
  related: ['fuehrerschein-umtausch-frist', 'fuehrerschein-umtauschen', 'strassenverkehrsamt', 'zulassungsstelle-termin'],
  sources: ['fev25a', 'gebost', 'fev8e', 'berlinIntl'],
  de: {
    slug: 'internationaler-fuehrerschein',
    nav: 'Internationaler Führerschein',
    card: 'Wer ihn bekommt, was er kostet, welche Unterlagen, welches Muster und wann er nicht hilft.',
    title: 'Internationaler Führerschein 2026: Kosten und Antrag',
    description: 'Internationaler Führerschein 2026: Gebühr nach GebOSt, Voraussetzungen nach § 25a FeV, Passbild und Kartenführerschein, die zwei Muster und der Antrag.',
    h1: 'Internationaler Führerschein: Antrag, Kosten und Grenzen',
    intro: 'Mietwagen in Übersee, Roadtrip außerhalb Europas: Viele Länder wollen neben dem deutschen Führerschein eine Übersetzung in Heftform. Die stellt die Führerscheinstelle aus, meist am selben Tag.',
    resume: (h) => `Den internationalen Führerschein stellt die Fahrerlaubnisbehörde am Wohnsitz aus. Nach § 25a der Fahrerlaubnis-Verordnung bekommt ihn auf Antrag, wer das 18. Lebensjahr vollendet hat und eine EU-Fahrerlaubnis nach einem ab dem 1. Januar 1999 verwendeten Muster vorlegt, also einen Kartenführerschein, oder eine in Deutschland gültige ausländische Fahrerlaubnis. Dem Antrag liegen ein biometrisches Passbild und der Führerschein bei. Wer noch einen Papierführerschein hat, muss ihn zuerst umtauschen. Die Gebühr liegt nach der Gebührenordnung, ${h.P.gebost_stand.de}, zwischen ${h.eur(I(h)[0])} und ${h.eur(I(h)[1])}; Berlin nennt ${h.eur(ber(h).betrag)}. Es gibt zwei Muster, nach dem Genfer Abkommen von 1949 und dem Wiener Übereinkommen von 1968; welches ein Land verlangt, richtet sich nach dem Abkommen, dem es beigetreten ist. Der internationale Führerschein gilt nur zusammen mit dem nationalen und ist zeitlich begrenzt; das Ablaufdatum steht im Dokument. In der EU braucht man ihn nicht.`,
    faqs: (h) => [
      { q: 'Welche Länder verlangen einen internationalen Führerschein?', a: 'Eine verbindliche Liste führt die deutsche Verwaltung nicht; maßgeblich ist das Recht des Reiselands und oft die Vorgabe des Mietwagenanbieters. Viele Staaten außerhalb Europas verlangen ihn, einige nur das Muster von 1949, andere das von 1968. Japan etwa erkennt nur das Genfer Muster an. Prüfen Sie vor der Reise die Hinweise der Botschaft des Ziellands oder des Auswärtigen Amts.' },
      { q: 'Kann ich den internationalen Führerschein online beantragen?', a: 'Das hängt von der Behörde ab. Viele Führerscheinstellen stellen ihn bei persönlicher Vorsprache sofort aus, weil nur ein Heft ausgefüllt und gestempelt wird. Einige bieten einen Antrag per Post oder online an und schicken das Dokument zu. Da Passbild und Führerschein geprüft werden, ist der persönliche Weg meist der schnellste, wenn ein Termin frei ist.' },
      { q: 'Reicht der internationale Führerschein allein zum Fahren?', a: 'Nein. Er ist eine Übersetzung und gilt nur zusammen mit dem nationalen Führerschein, den Sie immer mitführen müssen. Wird der nationale Führerschein ungültig, etwa weil die Umtauschfrist abgelaufen ist, verliert auch der internationale seinen Wert. Das ist ein häufiger Fehler bei Reisenden mit alten Karten, die kurz vor dem Stichtag stehen.' },
      { q: 'Brauche ich als Deutscher in Deutschland einen internationalen Führerschein?', a: 'Nein, im Inland gilt der deutsche Führerschein, und innerhalb der EU und des EWR wird er überall anerkannt. Umgekehrt dürfen Menschen, die mit einem ausländischen Führerschein nach Deutschland ziehen, eine Zeit lang damit fahren und brauchen danach je nach Herkunftsland eine deutsche Fahrerlaubnis; das regeln die Paragrafen 28 und 29 der Fahrerlaubnis-Verordnung.' },
    ],
    body: (h) => `<h2>Wer ihn bekommt</h2>
<p>Die Voraussetzungen sind kurz: Volljährigkeit, ein passender Führerschein und ein Passbild. Ob Sie direkt beantragen können, hängt vor allem davon ab, welchen Führerschein Sie haben. Die Tabelle zeigt die häufigsten Fälle.</p>
${faelle(h)}
<p>Der Papierführerschein ist kein Muster ab dem 1. Januar 1999 und reicht deshalb nicht. Wer noch einen hat, braucht ohnehin den Umtausch, dessen Frist für fast alle Jahrgänge abgelaufen ist. Den Stichtag Ihrer Karte zeigt die Seite ${h.a('fuehrerschein-umtausch-frist', 'Umtausch-Fristen')}. Planen Sie beides zusammen: Viele Behörden stellen den internationalen Führerschein beim Abholen der neuen Karte gleich mit aus.</p>
<h2>Was er kostet</h2>
${h.table(['Posten', 'Betrag'], [
  ['Internationaler Führerschein, GebOSt', `${h.eur(I(h)[0])} – ${h.eur(I(h)[1])}`],
  [`Berlin (abgerufen ${h.date(h.P.lokal['11000'].abgerufen)})`, h.eur(ber(h).betrag)],
  ['Biometrisches Passbild', 'Preis des Fotografen'],
  ['Vorher nötig: Umtausch eines Papierführerscheins', h.eur(h.M.UMTAUSCH_GEBUEHR)],
], `GebOSt ${h.P.gebost_stand.de}`, ['l', 'r'])}
<p>Die Gebührenordnung gibt eine Spanne vor, innerhalb derer jede Behörde ihren Betrag festlegt. Wer für die ganze Familie beantragt, zahlt für jeden Fahrer einzeln; der Rechner unter dem Zitierblock zählt zusammen.</p>
<!--mini:international-->
<h2>Die zwei Muster</h2>
<p>Deutschland stellt den internationalen Führerschein nach zwei Abkommen aus. Das ältere, das Genfer Abkommen über den Straßenverkehr von 1949, wird noch von Staaten verlangt, die dem jüngeren Wiener Übereinkommen von 1968 nicht beigetreten sind. Das Wiener Muster stellt die Behörde nach § 25a nur aus, wenn Sie Ihren ordentlichen Wohnsitz in Deutschland haben oder in einem Staat, der dem Übereinkommen nicht angehört. Sagen Sie beim Antrag, wohin Sie reisen; die Behörde wählt dann das passende Heft, oder stellt beide aus, wenn die Reise mehrere Länder berührt.</p>
<h2>Für wen er sich lohnt</h2>
<p>Wer nur in Europa unterwegs ist, braucht ihn nicht: In der EU, im EWR und in vielen Nachbarstaaten wird der deutsche Kartenführerschein direkt anerkannt. Für Reisen nach Übersee ist das Heft dagegen eine kleine Versicherung gegen Diskussionen am Mietwagenschalter oder bei einer Kontrolle. Bei der geringen Gebühr lohnt es sich oft schon, wenn nur die Mietbedingungen ihn verlangen.</p>
<h2>Der Antrag Schritt für Schritt</h2>
<p>Erstens: die zuständige Führerscheinstelle am Hauptwohnsitz finden; das ${h.a('strassenverkehrsamt', 'Straßenverkehrsamt')} erklärt, wie sie heißt. Zweitens: Termin buchen oder prüfen, ob die Behörde ohne Termin bedient. Drittens: Personalausweis oder Pass, Kartenführerschein und ein biometrisches Passbild mitbringen. Viertens: Gebühr zahlen und das Heft mitnehmen; vielerorts geht es in wenigen Minuten. Vor großen Reisezeiten werden Termine knapp, also lieber einige Wochen vorher kümmern.</p>
<h2>Unterwegs: was er leistet und was nicht</h2>
<p>Der internationale Führerschein übersetzt Ihre Fahrerlaubnis in mehrere Sprachen und in ein international bekanntes Format. Er ersetzt nicht den nationalen Führerschein, der bei jeder Fahrt dabei sein muss. Er ändert nichts an den Verkehrsregeln des Reiselands, an Mindestaltern von Mietwagenfirmen oder an Kautionen. Und er gilt nur so lange, wie das Datum im Heft und der nationale Führerschein es erlauben. Läuft Ihre Karte bald ab oder steht der Umtausch an, kümmern Sie sich zuerst darum.</p>
<h2>Typische Fehler</h2>
<p>Erstens: mit dem Papierführerschein zur Behörde gehen und abgewiesen werden. Zweitens: das falsche Muster für das Reiseland. Drittens: den nationalen Führerschein zu Hause lassen, weil man glaubt, das Heft genüge. Viertens: ein altes Heft wiederverwenden, dessen Datum abgelaufen ist. Fünftens: den Antrag bei einem privaten Anbieter stellen, der ein „internationales Führerscheindokument“ verkauft; das ist kein amtlicher internationaler Führerschein und wird von Behörden im Ausland nicht anerkannt. Den amtlichen gibt es nur bei der ${h.a('fuehrerschein-umtauschen', 'Fahrerlaubnisbehörde')}.</p>`,
  },
  en: {
    slug: 'international-driving-permit-germany',
    nav: 'International driving permit',
    card: 'Who gets one, what it costs, which documents and model, and when it does not help.',
    title: 'International driving permit Germany: cost and how to apply',
    description: 'International driving permit in Germany for 2026: the GebOSt fee, section 25a FeV conditions, photo and card licence, the two models and how to apply.',
    h1: 'International driving permits in Germany: applying, cost and limits',
    intro: 'A hire car overseas, a road trip beyond Europe: many countries want a booklet translation alongside your German licence. The licence office issues it, often on the same day.',
    resume: (h) => `The international driving permit (Internationaler Führerschein) is issued by the licensing authority for your home address. Under section 25a of the driving licence ordinance (FeV) you receive it on request if you are 18 or over and present an EU licence in a model used from 1 January 1999 onwards, meaning a card licence, or a foreign licence valid in Germany. The application includes a biometric passport photo and the licence. If you still have a paper licence, you must exchange it first. Under the road traffic fee schedule (GebOSt), ${h.P.gebost_stand.en}, the fee lies between ${h.eur(I(h)[0])} and ${h.eur(I(h)[1])}; Berlin quotes ${h.eur(ber(h).betrag)}. There are two models, under the 1949 Geneva Convention and the 1968 Vienna Convention; which one a country requires depends on the convention it has joined. The permit is valid only together with your national licence and for a limited time; the expiry date is in the booklet. You do not need one within the EU.`,
    faqs: (h) => [
      { q: 'Which countries require an international driving permit?', a: 'The German administration keeps no binding list; what counts is the law of the country you visit and often the hire company’s terms. Many countries outside Europe require it, some only the 1949 model, others the 1968 one. Japan, for example, recognises only the Geneva model. Before you travel, check the guidance of the destination’s embassy or the German Federal Foreign Office.' },
      { q: 'Can I apply for an international driving permit online in Germany?', a: 'It depends on the office. Many licence offices issue it on the spot when you appear in person, because only a booklet is filled in and stamped. Some offer applications by post or online and send the document to you. Since the photo and licence are checked, going in person is usually fastest if an appointment is free.' },
      { q: 'Is the international driving permit enough on its own?', a: 'No. It is a translation and is valid only together with your national licence, which you must always carry. If the national licence becomes invalid, for instance because its exchange deadline has passed, the international permit loses its value too. This is a common mistake among travellers with old cards close to their deadline.' },
      { q: 'Do I need an international permit to drive in Germany?', a: 'If you hold a German or other EU licence, no: it is recognised throughout the EU and EEA. If you move to Germany with a licence from outside the EU, you may drive on it for a period and then, depending on the country of issue, need a German licence; sections 28 and 29 of the driving licence ordinance set the rules. An international permit can help as a translation during that time.' },
    ],
    body: (h) => `<h2>Who can get one</h2>
<p>The conditions are short: being of age, a suitable licence and a passport photo. Whether you can apply straight away depends mainly on the licence you hold. The table shows the most common cases.</p>
${faelle(h)}
<p>The paper licence is not a model from 1 January 1999 onwards and so does not qualify. If you still have one, you need the exchange anyway, and its deadline has passed for almost every age group. The ${h.a('fuehrerschein-umtausch-frist', 'exchange deadlines')} page shows the date for your card. Plan both together: many offices issue the international permit when you collect the new card.</p>
<h2>What it costs</h2>
${h.table(['Item', 'Amount'], [
  ['International driving permit, GebOSt', `${h.eur(I(h)[0])} – ${h.eur(I(h)[1])}`],
  [`Berlin (retrieved ${h.date(h.P.lokal['11000'].abgerufen)})`, h.eur(ber(h).betrag)],
  ['Biometric passport photo', 'photographer’s price'],
  ['Needed first: exchanging a paper licence', h.eur(h.M.UMTAUSCH_GEBUEHR)],
], `GebOSt ${h.P.gebost_stand.en}`, ['l', 'r'])}
<p>The fee schedule sets a range within which each office fixes its amount. If you apply for the whole family, each driver pays separately; the calculator below the summary adds it up.</p>
<!--mini:international-->
<h2>The two models</h2>
<p>Germany issues international permits under two conventions. The older one, the 1949 Geneva Convention on Road Traffic, is still required by countries that have not joined the newer 1968 Vienna Convention. Under section 25a the office issues the Vienna model only if your ordinary residence is in Germany or in a country that is not a party to that convention. Say where you are travelling when you apply; the office then picks the right booklet, or issues both if the trip covers several countries.</p>
<h2>Applying step by step</h2>
<p>First, find the licence office for your main residence; the page on the ${h.a('strassenverkehrsamt', 'road traffic office')} explains what it is called. Second, book an appointment or check whether the office serves walk-ins. Third, bring your ID card or passport, card licence and a biometric photo. Fourth, pay the fee and take the booklet; in many places it takes a few minutes. Before peak travel seasons appointments get scarce, so sort it out a few weeks ahead.</p>
<h2>On the road: what it does and does not do</h2>
<p>The international permit translates your licence into several languages and an internationally familiar format. It does not replace the national licence, which must be with you on every trip. It changes nothing about the traffic rules of the country you visit, hire companies’ minimum ages or deposits. And it is valid only as long as the date in the booklet and your national licence allow. If your card expires soon or its exchange is due, deal with that first.</p>
<h2>Common mistakes</h2>
<p>First, going to the office with a paper licence and being turned away. Second, the wrong model for the destination. Third, leaving the national licence at home in the belief that the booklet is enough. Fourth, reusing an old booklet whose date has passed. Fifth, buying an “international driving document” from a private provider; that is not an official international driving permit and authorities abroad do not recognise it. The official one is only available from the ${h.a('fuehrerschein-umtauschen', 'licensing authority')}.</p>`,
  },
});
