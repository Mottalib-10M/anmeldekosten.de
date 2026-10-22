import { defineGuide, type Helpers } from '../../lib/guide-types';

const F = (h: Helpers) => h.P.fuehrerschein;
const tage = (h: Helpers, iso: string) => h.M.daysBetween(h.today, iso);
const status = (h: Helpers, iso: string) => {
  const d = tage(h, iso), de = h.lang === 'de';
  if (d < 0) return de ? `abgelaufen seit ${h.num(-d)} Tagen` : `passed ${h.num(-d)} days ago`;
  return de ? `noch ${h.num(d)} Tage` : `${h.num(d)} days left`;
};
const spanne = (h: Helpers, z: { von?: number; bis?: number }) => {
  const de = h.lang === 'de';
  if (z.von === undefined) return de ? `bis ${z.bis}` : `up to ${z.bis}`;
  if (z.bis === undefined) return de ? `ab ${z.von}` : `${z.von} or later`;
  return z.von === z.bis ? String(z.von) : `${z.von} – ${z.bis}`;
};
/** Calendrier complet de l'Anlage 8e, avec l'état au jour du build. */
function kalender(h: Helpers): string {
  const de = h.lang === 'de';
  const rows = [
    ...F(h).papier.map((z) => [de ? 'Papier' : 'Paper', de ? `Geburtsjahr ${spanne(h, z)}` : `born ${spanne(h, z)}`, h.date(z.frist), status(h, z.frist)]),
    ...F(h).karte.map((z) => [de ? 'Karte' : 'Card', de ? `ausgestellt ${spanne(h, z)}` : `issued ${spanne(h, z)}`, h.date(z.frist), status(h, z.frist)]),
  ];
  return h.table(de ? ['Führerschein', 'Maßgeblich', 'Umtausch bis', `Stand ${h.date(h.today)}`] : ['Licence', 'Deciding year', 'Exchange by', `As of ${h.date(h.today)}`], rows,
    de ? `Anlage 8e FeV. Wer vor ${F(h).geburtsjahr_vor} geboren ist, tauscht unabhängig von der Art bis ${h.date(F(h).frist_vor_1953)}.` : `Annex 8e FeV. Anyone born before ${F(h).geburtsjahr_vor} exchanges by ${h.date(F(h).frist_vor_1953)}, whatever the type.`, ['l', 'l', 'l', 'r']);
}
/** Prochaine échéance à venir (la ligne de carte la plus proche dans le futur). */
const naechste = (h: Helpers) => F(h).karte.find((z) => tage(h, z.frist) >= 0)!;
const letzte = (h: Helpers) => [...F(h).karte].reverse().find((z) => tage(h, z.frist) < 0);

export default defineGuide({
  id: 'fuehrerschein-umtausch-frist',
  group: 'fuehrerschein',
  order: 2,
  mini: 'frist',
  miniHref: 'fuehrerschein-umtauschen',
  related: ['fuehrerschein-umtauschen', 'internationaler-fuehrerschein', 'strassenverkehrsamt', 'zulassungsstelle-termin'],
  sources: ['fev8e', 'fev24a', 'bkat', 'gebost', 'bmv'],
  de: {
    slug: 'fuehrerschein-umtausch-frist',
    nav: 'Umtausch-Fristen',
    card: 'Alle Stichtage der Anlage 8e auf einen Blick, die nächste Welle und was nach Ablauf gilt.',
    title: 'Führerschein Umtausch Frist: alle Stichtage bis 2033',
    description: 'Führerschein Umtausch Frist: alle Stichtage der Anlage 8e für Papier und Karte, die nächste Frist im Januar, was nach Ablauf gilt, wie viel Vorlauf nötig ist.',
    h1: 'Führerschein-Umtausch: alle Fristen und die nächste Welle',
    intro: 'Der Pflichtumtausch läuft in Wellen, eine pro Jahr, immer am 19. Januar. Welche Welle Sie trifft, welche schon vorbei ist und wie viel Vorlauf die Behörde braucht.',
    resume: (h) => { const n = naechste(h), l = letzte(h); return `Nach § 24a Absatz 2 der Fahrerlaubnis-Verordnung verlieren alle vor dem ${h.date(F(h).stichtag_befristung)} ausgestellten Führerscheine ihre Gültigkeit zu dem Tag, den Anlage 8e nennt. Für Papierführerscheine richtet sich der Stichtag nach dem Geburtsjahr; diese Fristen sind alle abgelaufen, außer für Menschen, die vor ${F(h).geburtsjahr_vor} geboren sind: Sie haben Zeit bis ${h.date(F(h).frist_vor_1953)}. Für Kartenführerscheine zählt das Ausstellungsjahr. ${l ? `Die letzte Welle traf Karten aus den Jahren ${spanne(h, l)} am ${h.date(l.frist)}.` : ''} Die nächste betrifft Karten aus ${spanne(h, n)}: Sie müssen bis ${h.date(n.frist)} getauscht sein, in ${h.num(tage(h, n.frist))} Tagen ab dem ${h.date(h.today)}. Der Umtausch kostet ${h.eur(h.M.UMTAUSCH_GEBUEHR)} nach der Gebührenordnung, ohne Prüfung. Wer zu spät ist, behält die Fahrerlaubnis, fährt aber mit einem ungültigen Dokument, wofür ein Verwarnungsgeld von ${h.eur(F(h).verwarnungsgeld, 0)} vorgesehen ist. Die neue Karte gilt ${h.num(F(h).gueltigkeit_jahre)} Jahre.`; },
    faqs: (h) => [
      { q: 'Wie lange vor der Frist sollte ich den Umtausch beantragen?', a: 'Rechnen Sie mit mehreren Wochen. Die neue Karte stellt die Bundesdruckerei her, und vor jedem Stichtag im Januar steigen die Anträge stark. Dazu kommt bei manchen Behörden die Wartezeit auf einen Termin und gegebenenfalls auf die Karteikartenabschrift einer anderen Behörde. Wer im Herbst davor beantragt, ist auf der sicheren Seite. Den alten Führerschein behalten Sie bis zur Abholung.' },
      { q: 'Gilt mein abgelaufener Führerschein noch im Ausland?', a: 'Darauf sollten Sie sich nicht verlassen. Ein nach Anlage 8e ungültiges Dokument ist auch im Ausland kein gültiger Nachweis, und Mietwagenfirmen lehnen es oft ab. Im Ausland kann die Polizei strenger reagieren als das deutsche Verwarnungsgeld. Vor einer Reise lohnt sich deshalb der Umtausch, und für Länder außerhalb der EU oft zusätzlich ein internationaler Führerschein, der eine gültige Karte voraussetzt.' },
      { q: 'Muss ich auch einen Kartenführerschein von 2012 schon umtauschen?', a: `Nicht jetzt. Karten aus den Jahren 2012 bis zum 18. Januar 2013 sind die letzte Gruppe; ihr Stichtag ist der ${h.date(F(h).karte[F(h).karte.length - 1].frist)}. Sie dürfen aber jederzeit früher tauschen, zur selben Gebühr. Wer vor ${F(h).geburtsjahr_vor} geboren ist, hat unabhängig vom Ausstellungsjahr bis ${h.date(F(h).frist_vor_1953)} Zeit.` },
      { q: 'Ich habe zwei Führerscheine: welche Frist gilt?', a: 'Wer zum Beispiel einen Papierführerschein für das Auto und später eine Karte für das Motorrad bekommen hat, besitzt meist nur noch die Karte, weil die Behörde den Papierführerschein beim Ausstellen einzieht. Liegt doch noch ein altes Dokument vor, zählt für jedes seine eigene Zeile der Anlage 8e. Beim Umtausch werden alle Klassen auf eine neue Karte übertragen.' },
    ],
    body: (h) => { const n = naechste(h); return `<h2>Der ganze Kalender</h2>
<p>Die Anlage 8e der Fahrerlaubnis-Verordnung ordnet jeden alten Führerschein einer Zeile zu. Die Tabelle zeigt alle Zeilen mit dem Stand von heute. Den Stichtag für Ihr eigenes Dokument rechnet der Rechner unter dem Zitierblock oder ausführlich die ${h.a('fuehrerschein-umtauschen', 'Umtauschseite')}.</p>
${kalender(h)}
<p>Beim grauen oder rosa Papierführerschein zählt nach der Verordnung das Geburtsjahr, nicht das Ausstellungsjahr. Beim Kartenführerschein steht das Ausstellungsjahr in Feld 4a. Achtung bei Ersatzkarten: Wer eine Karte nach Verlust neu bekommen hat, nimmt das Datum der Ersatzkarte.</p>
<h2>Die nächste Welle: Karten aus ${spanne(h, n)}</h2>
<p>Wer seine Karte in diesen Jahren bekommen hat, muss bis ${h.date(n.frist)} tauschen. Maßgeblich ist das Datum in Feld 4a, nicht das Jahr der Fahrprüfung. Ab dem ${h.date(h.today)} bleiben ${h.num(tage(h, n.frist))} Tage. Weil viele Behörden vor jedem Januar Spitzen erleben, lohnt es sich, den Antrag jetzt zu stellen.</p>
<!--mini:frist-->
<h2>Was nach Ablauf der Frist gilt</h2>
<p>Mit dem Stichtag verliert das Dokument seine Gültigkeit, so § 24a Absatz 2. Die Fahrerlaubnis bleibt bestehen; Sie müssen keine Prüfung wiederholen. Wer mit dem abgelaufenen Dokument kontrolliert wird, kann seine Fahrberechtigung aber nicht mit einem gültigen Führerschein nachweisen. Der Bußgeldkatalog sieht dafür ein Verwarnungsgeld von ${h.eur(F(h).verwarnungsgeld, 0)} vor. Punkte gibt es nicht. Teurer werden andere Folgen: Mietwagen, Carsharing und manche Arbeitgeber verlangen einen gültigen Führerschein, und im Ausland gilt das alte Dokument nicht mehr als Nachweis.</p>
<h2>Was der Umtausch kostet und wie lange er dauert</h2>
${h.table(['Posten', 'Betrag'], [
  ['Umstellung auf den Kartenführerschein, GebOSt', h.eur(F(h).umstellung)],
  ['Eintrag im Zentralen Fahrerlaubnisregister', h.eur(F(h).zfer)],
  ['<strong>Gebühr zusammen</strong>', `<strong>${h.eur(h.M.UMTAUSCH_GEBUEHR)}</strong>`],
  [`Direktversand in Berlin (optional, abgerufen ${h.date(h.P.lokal['11000'].abgerufen)})`, h.eur(h.P.lokal['11000'].posten.find((p) => p.id === 'versand')!.betrag)],
  ['Biometrisches Passfoto', 'Preis des Fotografen'],
], `GebOSt ${h.P.gebost_stand.de}`, ['l', 'r'])}
<p>Nach dem Antrag gibt die Führerscheinstelle den Auftrag an die Bundesdruckerei. Die Karte kommt zur Behörde zurück oder, wo angeboten, direkt per Post. Den alten Führerschein geben Sie erst bei der Abholung ab, damit Sie in der Zwischenzeit einen Nachweis haben. Manche Behörden stellen auf Wunsch einen vorläufigen Nachweis aus, wenn der alte Führerschein schon eingezogen ist.</p>
<h2>Ein Plan in vier Schritten</h2>
<p>Erstens: die Zeile in der Tabelle finden und den Stichtag notieren. Zweitens: prüfen, ob die Führerscheinstelle am heutigen Wohnort den alten Führerschein ausgestellt hat; sonst die Karteikartenabschrift bei der damaligen Behörde anfordern, was Wochen dauern kann. Drittens: Termin buchen, wie bei der ${h.a('zulassungsstelle-termin', 'Zulassungsstelle')}; viele Behörden nehmen Umtauschanträge auch per Post oder online an. Viertens: Ausweis, Foto und alten Führerschein mitbringen. Welche Stelle zuständig ist, erklärt die Seite zum ${h.a('strassenverkehrsamt', 'Straßenverkehrsamt')}.</p>
<h2>Nach dem Umtausch: die ${h.num(F(h).gueltigkeit_jahre)} Jahre</h2>
<p>Die neue Karte trägt in Feld 4b ein Ablaufdatum, ${h.num(F(h).gueltigkeit_jahre)} Jahre nach dem Tag, an dem die Behörde den Auftrag erteilt hat. Danach wird nur das Dokument erneuert, wieder ohne Prüfung, ähnlich wie ein Personalausweis. Wer eine Reise plant, sollte das Datum im Blick behalten; für Fahrten außerhalb der EU hilft zusätzlich ein ${h.a('internationaler-fuehrerschein', 'internationaler Führerschein')}.</p>`; },
  },
  en: {
    slug: 'driving-licence-exchange-deadlines-germany',
    nav: 'Exchange deadlines',
    card: 'Every Annex 8e deadline at a glance, the next wave and what applies after the date.',
    title: 'Licence exchange deadlines in Germany: every date up to 2033',
    description: 'German licence exchange deadlines: every Annex 8e date for paper and card licences, the next January deadline, what applies afterwards and how early to apply.',
    h1: 'Exchanging a German driving licence: every deadline and the next wave',
    intro: 'The mandatory exchange runs in waves, one a year, always on 19 January. Which wave applies to you, which have already passed and how much notice the office needs.',
    resume: (h) => { const n = naechste(h), l = letzte(h); return `Under section 24a(2) of the driving licence ordinance (FeV), every German licence issued before ${h.date(F(h).stichtag_befristung)} loses its validity on the date given in Annex 8e. For paper licences the deadline depends on the holder’s year of birth; those deadlines have all passed, except for people born before ${F(h).geburtsjahr_vor}, who have until ${h.date(F(h).frist_vor_1953)}. For card licences the year of issue counts. ${l ? `The last wave hit cards issued in ${spanne(h, l)} on ${h.date(l.frist)}.` : ''} The next concerns cards from ${spanne(h, n)}: they must be exchanged by ${h.date(n.frist)}, ${h.num(tage(h, n.frist))} days from ${h.date(h.today)}. The exchange costs ${h.eur(h.M.UMTAUSCH_GEBUEHR)} under the fee schedule, with no test. If you are late, you keep the right to drive but carry an invalid document, for which a warning fine of ${h.eur(F(h).verwarnungsgeld, 0)} is set. The new card is valid for ${h.num(F(h).gueltigkeit_jahre)} years.`; },
    faqs: (h) => [
      { q: 'How far ahead of the deadline should I apply for the exchange?', a: 'Allow several weeks. The new card is made by the Federal Printing Office, and applications surge before every January deadline. Some offices add a wait for an appointment and, where needed, for the record extract from another authority. Applying in the autumn before is the safe option. You keep the old licence until you collect the new one.' },
      { q: 'Is my expired German licence still valid abroad?', a: 'Do not rely on it. A document that is invalid under Annex 8e is not valid proof abroad either, and car rental firms often refuse it. Police abroad may react more strictly than the German warning fine. Exchanging before a trip is therefore worthwhile, and for countries outside the EU often an international driving permit as well, which requires a valid card.' },
      { q: 'Do I already have to exchange a card licence from 2012?', a: `Not yet. Cards issued from 2012 up to 18 January 2013 are the last group; their deadline is ${h.date(F(h).karte[F(h).karte.length - 1].frist)}. You may exchange earlier at any time for the same fee. Anyone born before ${F(h).geburtsjahr_vor} has until ${h.date(F(h).frist_vor_1953)}, whatever the year of issue.` },
      { q: 'I have two licences: which deadline applies?', a: 'If you got a paper licence for a car and later a card for a motorcycle, you usually hold only the card, because the office withdrew the paper licence when issuing it. If an old document does remain, each follows its own row of Annex 8e. On exchange, all categories are transferred to one new card.' },
    ],
    body: (h) => { const n = naechste(h); return `<h2>The full calendar</h2>
<p>Annex 8e of the driving licence ordinance assigns every old licence to a row. The table shows every row with its status today. The calculator below the summary, or in more detail the ${h.a('fuehrerschein-umtauschen', 'exchange page')}, works out the deadline for your own document.</p>
${kalender(h)}
<p>For the grey or pink paper licence, the ordinance uses the year of birth, not the year of issue. On a card licence the year of issue is in field 4a. Watch out with replacement cards: if you received a new card after a loss, use the date of the replacement.</p>
<h2>The next wave: cards from ${spanne(h, n)}</h2>
<p>If you received your card in those years, you must exchange it by ${h.date(n.frist)}. What counts is the date in field 4a, not the year you passed your test. From ${h.date(h.today)}, ${h.num(tage(h, n.frist))} days remain. Because many offices see peaks before every January, it is worth applying now.</p>
<!--mini:frist-->
<h2>What applies after the deadline</h2>
<p>On the deadline the document loses its validity, says section 24a(2). The right to drive remains; you do not retake any test. But if you are stopped with the expired document, you cannot prove your entitlement with a valid licence. The fines catalogue sets a warning fine of ${h.eur(F(h).verwarnungsgeld, 0)} for that. No points are given. Other consequences cost more: car rental, car sharing and some employers require a valid licence, and abroad the old document no longer counts as proof.</p>
<h2>What the exchange costs and how long it takes</h2>
${h.table(['Item', 'Amount'], [
  ['Conversion to the card licence, GebOSt', h.eur(F(h).umstellung)],
  ['Entry in the central driving licence register', h.eur(F(h).zfer)],
  ['<strong>Fee in total</strong>', `<strong>${h.eur(h.M.UMTAUSCH_GEBUEHR)}</strong>`],
  [`Direct delivery in Berlin (optional, retrieved ${h.date(h.P.lokal['11000'].abgerufen)})`, h.eur(h.P.lokal['11000'].posten.find((p) => p.id === 'versand')!.betrag)],
  ['Biometric passport photo', 'photographer’s price'],
], `GebOSt ${h.P.gebost_stand.en}`, ['l', 'r'])}
<p>After you apply, the licence office sends the order to the Federal Printing Office. The card comes back to the office or, where offered, straight to you by post. You hand in the old licence only on collection, so you have proof in the meantime. Some offices issue a provisional document on request if the old licence has already been withdrawn.</p>
<h2>A plan in four steps</h2>
<p>First, find your row in the table and note the deadline. Second, check whether the licence office at your current address issued the old licence; if not, request the record extract (Karteikartenabschrift) from the original office, which can take weeks. Third, book an appointment, as at the ${h.a('zulassungsstelle-termin', 'registration office')}; many offices also accept exchange applications by post or online. Fourth, bring your ID, photo and old licence. The page on the ${h.a('strassenverkehrsamt', 'road traffic office')} explains which office is responsible.</p>
<h2>After the exchange: the ${h.num(F(h).gueltigkeit_jahre)} years</h2>
<p>The new card shows an expiry date in field 4b, ${h.num(F(h).gueltigkeit_jahre)} years after the day the office placed the order. After that only the document is renewed, again without a test, much like an ID card. If you plan a trip, keep the date in mind; for driving outside the EU an ${h.a('internationaler-fuehrerschein', 'international driving permit')} also helps.</p>`; },
  },
});
