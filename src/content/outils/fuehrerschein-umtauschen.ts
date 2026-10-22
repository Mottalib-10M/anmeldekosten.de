import { defineGuide, type Helpers } from '../../lib/guide-types';

const F = (h: Helpers) => h.P.fuehrerschein;
/** Tableau Anlage 8e : cartes par année de délivrance. */
function karten(h: Helpers): string {
  const de = h.lang === 'de';
  const rows = F(h).karte.map((z) => [
    z.bis === 2013 ? (de ? `${z.von} bis 18. Januar 2013` : `${z.von} to 18 January 2013`) : z.von === z.bis ? String(z.von) : de ? `${z.von} bis ${z.bis}` : `${z.von} to ${z.bis}`,
    h.date(z.frist),
    z.frist < h.today ? (de ? 'abgelaufen' : 'passed') : de ? 'offen' : 'open',
  ]);
  return h.table(de ? ['Ausstellungsjahr der Karte', 'Umtausch bis', 'Stand heute'] : ['Year the card was issued', 'Exchange by', 'Status today'], rows,
    de ? `Kartenführerscheine, Anlage 8e FeV; Stand ${h.date(h.today)}` : `Card licences, FeV Annex 8e; as of ${h.date(h.today)}`, ['l', 'r', 'l']);
}
function papier(h: Helpers): string {
  const de = h.lang === 'de';
  const rows = F(h).papier.map((z) => [
    z.von === undefined ? (de ? `vor ${z.bis! + 1}` : `before ${z.bis! + 1}`) : z.bis === undefined ? (de ? `ab ${z.von}` : `${z.von} or later`) : de ? `${z.von} bis ${z.bis}` : `${z.von} to ${z.bis}`,
    h.date(z.frist),
  ]);
  return h.table(de ? ['Geburtsjahr (Papierführerschein)', 'Umtausch bis'] : ['Year of birth (paper licence)', 'Exchange by'], rows,
    de ? 'Papierführerscheine bis 31. Dezember 1998, Anlage 8e FeV' : 'Paper licences up to 31 December 1998, FeV Annex 8e', ['l', 'r']);
}
const naechste = (h: Helpers) => F(h).karte.find((z) => z.frist >= h.today)!;

export default defineGuide({
  id: 'fuehrerschein-umtauschen',
  group: 'fuehrerschein',
  order: 1,
  tool: 'umtausch',
  related: ['fuehrerschein-umtausch-frist', 'internationaler-fuehrerschein', 'strassenverkehrsamt', 'zulassungsstelle-termin'],
  sources: ['fev8e', 'fev24a', 'gebost', 'bkat', 'berlinUmtausch'],
  de: {
    slug: 'fuehrerschein-umtauschen',
    nav: 'Führerschein-Umtausch',
    card: 'Ihre Frist nach Anlage 8e, für Papier und Karte, mit Gebühr.',
    title: 'Führerschein umtauschen 2026: Ihre Frist und die Kosten',
    description: 'Führerschein umtauschen: Frist nach Geburtsjahr oder Ausstellungsjahr laut Anlage 8e FeV, Gebühr 26,50 €, Verwarnungsgeld, Unterlagen und zuständige Stelle.',
    h1: 'Führerschein umtauschen: Ihre Frist ausrechnen',
    intro: 'Art des Führerscheins und Jahr eingeben: Der Rechner nennt den Stichtag aus der Fahrerlaubnis-Verordnung und sagt, ob er schon verstrichen ist.',
    resume: (h) => { const k = naechste(h); return `Alle Führerscheine, die vor dem 19. Januar 2013 ausgestellt wurden, müssen gegen einen befristeten EU-Kartenführerschein umgetauscht werden. Den Stichtag legt Anlage 8e der Fahrerlaubnis-Verordnung fest: Bei Papierführerscheinen zählt das Geburtsjahr des Inhabers, bei Kartenführerscheinen das Ausstellungsjahr, das im Feld 4a steht. Wer vor 1953 geboren ist, hat in jedem Fall bis zum ${h.date(F(h).frist_vor_1953)} Zeit. Alle Papierführerscheine jüngerer Inhaber sind seit dem ${h.date('2025-01-19')} fällig. Als Nächstes sind die Karten aus ${k.von === k.bis ? k.von : `${k.von} bis ${k.bis}`} an der Reihe, mit Frist bis zum ${h.date(k.frist)}. Der Umtausch kostet ${h.eur(h.M.UMTAUSCH_GEBUEHR)}: ${h.eur(F(h).umstellung)} Gebühr der Fahrerlaubnisbehörde und ${h.eur(F(h).zfer)} für das Zentrale Fahrerlaubnisregister. Wer nach Ablauf mit dem alten Dokument fährt, verliert die Fahrerlaubnis nicht, riskiert aber ein Verwarnungsgeld von ${h.eur(F(h).verwarnungsgeld, 0)}. Eine Prüfung gibt es beim Umtausch nicht.`; },
    faqs: (h) => [
      { q: 'Verliere ich meine Fahrerlaubnis, wenn ich die Frist verpasse?', a: `Nein. Mit dem Stichtag wird nur das Dokument ungültig, nicht die Berechtigung zu fahren. Sie dürfen weiter Auto fahren, können sie bei einer Kontrolle aber nicht mit einem gültigen Führerschein nachweisen. Dafür sieht der Bußgeldkatalog ein Verwarnungsgeld von ${h.eur(F(h).verwarnungsgeld, 0)} vor. Den Umtausch können Sie jederzeit nachholen, zur gleichen Gebühr.` },
      { q: 'Welche Unterlagen brauche ich für den Umtausch?', a: 'Personalausweis oder Reisepass, ein aktuelles biometrisches Passfoto und den alten Führerschein. Wurde er nicht von der Behörde Ihres heutigen Wohnorts ausgestellt, verlangen viele Führerscheinstellen eine Karteikartenabschrift der ausstellenden Behörde, die bestätigt, welche Klassen Sie besitzen. Sie kostet je nach Behörde etwas; fragen Sie vorher nach, denn das Anfordern dauert oft Wochen.' },
      { q: 'Muss ich beim Umtausch eine Prüfung oder einen Sehtest machen?', a: 'Nein. Der Umtausch ändert nur das Dokument: keine Prüfung, kein Sehtest, keine ärztliche Untersuchung. Ausnahme sind Klassen, die schon von sich aus befristet sind, etwa Lkw- und Busklassen; für sie gelten die üblichen Untersuchungen bei der Verlängerung. Die Klassen werden in die heutigen EU-Klassen übertragen, Besitzstände bleiben erhalten.' },
      { q: 'Wie lange ist der neue Führerschein gültig?', a: `${F(h).gueltigkeit_jahre} Jahre. Seit dem 19. Januar 2013 ausgestellte Kartenführerscheine sind befristet; das Ablaufdatum steht im Feld 4b. Danach wird nur das Dokument erneuert, ohne Prüfung, ähnlich wie ein Personalausweis. Die Fahrerlaubnis selbst bleibt unbefristet, solange sie nicht entzogen wird. Merken Sie sich das Datum: Wer mit abgelaufenem Dokument fährt, riskiert dasselbe Verwarnungsgeld wie beim verpassten Umtausch.` },
    ],
    body: (h) => `<h2>Der Kalender für Kartenführerscheine</h2>
<p>Kartenführerscheine wurden zwischen dem 1. Januar 1999 und dem 18. Januar 2013 unbefristet ausgestellt. Maßgeblich ist das Ausstellungsjahr im Feld 4a der Karte, nicht das Geburtsjahr. Ausnahme: Wer vor 1953 geboren ist, tauscht bis zum ${h.date(F(h).frist_vor_1953)}, gleich welche Karte.</p>
${karten(h)}
<h2>Der Kalender für Papierführerscheine</h2>
<p>Für die grauen und rosa Papierführerscheine, die bis Ende 1998 ausgestellt wurden, zählt das Geburtsjahr des Inhabers. Bis auf den Jahrgang vor 1953 sind alle Fristen verstrichen.</p>
${papier(h)}
<p>Wo Sie umtauschen, sagt die Suche auf der ${h.a('home', 'Startseite')}: Sie nennt zu jedem Ort die Fahrerlaubnisbehörde. Einige Behörden nehmen den Antrag auch online an; den neuen Führerschein holen Sie dann ab oder erhalten ihn per Post. Mehr zu Fristen, Bußgeld und Ausnahmen steht unter ${h.a('fuehrerschein-umtausch-frist', 'Umtauschfrist')}.</p>`,
  },
  en: {
    slug: 'driving-licence-exchange',
    nav: 'Licence exchange',
    card: 'Your Annex 8e deadline, for paper and card licences, with the fee.',
    title: 'Führerschein exchange Germany 2026: your deadline and fee',
    description: 'German driving licence exchange (Führerschein-Umtausch): your deadline by year of birth or year of issue under FeV Annex 8e, the fee, the fine and documents.',
    h1: 'German licence exchange: work out your deadline',
    intro: 'Enter the type of licence and the year: the calculator gives the deadline from the Driving Licence Regulation and tells you whether it has passed.',
    resume: (h) => { const k = naechste(h); return `Every German driving licence issued before 19 January 2013 has to be exchanged for a time-limited EU card licence. The deadline is set by Annex 8e of the Driving Licence Regulation (Fahrerlaubnis-Verordnung, FeV): for paper licences it depends on the holder’s year of birth, for card licences on the year of issue shown in field 4a. Holders born before 1953 have until ${h.date(F(h).frist_vor_1953)} in any case. All paper licences of younger holders have been due since ${h.date('2025-01-19')}. Next in line are cards issued in ${k.von === k.bis ? k.von : `${k.von} to ${k.bis}`}, with a deadline of ${h.date(k.frist)}. The exchange costs ${h.eur(h.M.UMTAUSCH_GEBUEHR)}: ${h.eur(F(h).umstellung)} for the licensing office and ${h.eur(F(h).zfer)} for the central licence register. Driving with the old document after the deadline does not cancel your entitlement to drive, but it can cost a ${h.eur(F(h).verwarnungsgeld, 0)} caution fine. There is no test when you exchange.`; },
    faqs: (h) => [
      { q: 'Do I lose my right to drive if I miss the exchange deadline?', a: `No. On the deadline only the document becomes invalid, not your entitlement. You may keep driving, but at a check you cannot show a valid licence, which the fine catalogue punishes with a ${h.eur(F(h).verwarnungsgeld, 0)} caution fine. You can still exchange later, for the same fee.` },
      { q: 'What documents do I need for the exchange?', a: 'An ID card or passport, a recent biometric photo and the old licence. If it was not issued by the office where you now live, many licensing offices ask for an index-card copy (Karteikartenabschrift) from the issuing office confirming your classes. It may cost a small fee; ask beforehand, because requesting it often takes weeks.' },
      { q: 'Is there a test or eye test when exchanging a German licence?', a: 'No. The exchange only replaces the document: no test, no eye test, no medical. The exception is classes that are time-limited anyway, such as lorry and bus classes, which keep their usual checks on renewal. Your classes are converted to today’s EU classes, and acquired rights are kept.' },
      { q: 'How long is the new German licence valid?', a: `${F(h).gueltigkeit_jahre} years. Card licences issued since 19 January 2013 are time-limited; the expiry date is in field 4b. After that only the document is renewed, without a test, much like an ID card. The entitlement to drive itself has no end date unless it is withdrawn. Note the date: driving on an expired document risks the same caution fine as a missed exchange.` },
    ],
    body: (h) => `<h2>The timetable for card licences</h2>
<p>Card licences were issued without an end date between 1 January 1999 and 18 January 2013. What counts is the year of issue in field 4a, not the year of birth. Exception: holders born before 1953 exchange by ${h.date(F(h).frist_vor_1953)}, whatever their card.</p>
${karten(h)}
<h2>The timetable for paper licences</h2>
<p>For the grey and pink paper licences issued up to the end of 1998, the holder’s year of birth counts. Apart from holders born before 1953, every deadline has passed.</p>
${papier(h)}
<p>Where to exchange is shown by the search on the ${h.a('home', 'home page')}: for every town it names the licensing office. Some offices also accept the application online; you then collect the new licence or receive it by post. More on deadlines, fines and exceptions under ${h.a('fuehrerschein-umtausch-frist', 'exchange deadline')}.</p>`,
  },
});
