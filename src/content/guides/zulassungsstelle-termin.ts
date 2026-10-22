import { defineGuide, type Helpers } from '../../lib/guide-types';

/** Pkw par lieu d'accueil, Land par Land (KBA FZ1 + AV1) : un indicateur de charge, pas un délai. */
function last(h: Helpers): string {
  const de = h.lang === 'de';
  const pkw = new Map<string, number>(), orte = new Map<string, number>();
  for (const b of h.Z.BEZIRKE) pkw.set(b.land, (pkw.get(b.land) ?? 0) + (b.stat?.pkw ?? 0));
  for (const s of h.Z.STELLEN) if (s.art === 'haupt' || s.art === 'neben') orte.set(s.land, (orte.get(s.land) ?? 0) + 1);
  const rows = [...pkw.entries()].filter(([l]) => orte.get(l))
    .map(([l, p]) => ({ l, p, o: orte.get(l)!, q: p / orte.get(l)! }))
    .sort((a, b) => b.q - a.q)
    .map((x) => [h.land(x.l), h.num(x.p), h.num(x.o), h.num(Math.round(x.q / 100) * 100)]);
  return h.table(de ? ['Land', 'Pkw', 'Zulassungsstellen', 'Pkw je Stelle'] : ['State', 'Cars', 'Registration offices', 'Cars per office'], rows,
    de ? `Pkw-Bestand am ${h.Z.fz1Stand('de')} (KBA FZ1), Haupt- und Außenstellen nach dem Anschriftenverzeichnis, Stand ${h.Z.avStand('de')}` : `Cars on ${h.Z.fz1Stand('en')} (KBA FZ1), main and branch offices from the directory, ${h.Z.avStand('en')}`, ['l', 'r', 'r', 'r']);
}
const M = (h: Helpers) => h.Z.META;

export default defineGuide({
  id: 'zulassungsstelle-termin',
  group: 'kosten',
  order: 7,
  mini: 'anmelden',
  miniHref: 'kosten',
  related: ['auto-online-anmelden', 'auto-anmelden-unterlagen', 'strassenverkehrsamt', 'kosten', 'zulassungsstelle-berlin'],
  sources: ['kbaAv', 'kbaFz1', 'gebost', 'fzv15'],
  de: {
    slug: 'zulassungsstelle-termin',
    nav: 'Termin bekommen',
    card: 'Termin buchen, ohne Termin kommen, Vollmacht, Zulassungsdienst und die Last je Stelle.',
    title: 'Zulassungsstelle Termin 2026: buchen, ohne Termin, Vollmacht',
    description: 'Zulassungsstelle Termin: online buchen, freie Termine finden, ohne Termin kommen, Vollmacht und Zulassungsdienst, was mitbringen, und wie voll die Stellen sind.',
    h1: 'Termin bei der Zulassungsstelle: so kommen Sie schneller dran',
    intro: 'In vielen Städten ist der Termin das eigentliche Hindernis, nicht die Gebühr. Welche Wege es gibt, wann man ganz ohne Termin auskommt und wie man den einen Termin nicht verschenkt.',
    resume: (h) => `Die meisten Zulassungsstellen in Deutschland vergeben ihre Termine über ein Buchungsportal auf der Website des Kreises oder der Stadt; einige nehmen zusätzlich Kunden ohne Termin mit Wartemarke an, oft nur für einfache Vorgänge wie die Abmeldung. Das Anschriftenverzeichnis des Kraftfahrt-Bundesamts, Stand ${h.Z.avStand('de')}, zählt ${h.num(M(h).hauptstellen)} Hauptstellen und insgesamt ${h.num(M(h).stellen)} Anlaufstellen für ${h.num(M(h).bezirke)} Zulassungsbezirke; zuständig ist immer die Behörde am Wohnsitz des Halters. Wer schnell sein will, hat drei Wege: früh morgens nach frei gewordenen Terminen schauen, eine Außenstelle desselben Kreises wählen, oder den Termin ganz vermeiden, denn die meisten Vorgänge gehen online über i-Kfz, für einen Neuwagen zu ${h.eur(h.M.berechne({ vorgang: 'neu', online: true }).gebuehr)} statt ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)}. Ein Zulassungsdienst geht mit Vollmacht ohne Termin über eigene Schalter, gegen eine eigene Vergütung. Die Gebühr der Behörde ist auf jedem Weg dieselbe.`,
    faqs: (h) => [
      { q: 'Warum finde ich bei meiner Zulassungsstelle keinen freien Termin?', a: 'Viele Behörden schalten Termine nur für wenige Wochen im Voraus frei und geben abgesagte Termine kurzfristig wieder ins System. Wer zu einer festen Uhrzeit sucht, sieht oft nur ausgebuchte Tage. Mehrfach am Tag nachsehen, auch früh morgens, hilft mehr als ein Blick pro Woche. Manche Kreise haben eine zweite Stelle mit kürzeren Wartezeiten, die für denselben Wohnort zuständig ist.' },
      { q: 'Darf ich bei einer anderen Zulassungsstelle einen Termin buchen?', a: `Nur bei einer Stelle Ihres eigenen Zulassungsbezirks. Viele Kreise haben neben der Hauptstelle Außenstellen, insgesamt sind es ${h.num(M(h).stellen)} Anlaufstellen; jede davon darf Sie bedienen. Eine Behörde in einem anderen Kreis lehnt den Antrag dagegen ab, weil sie nicht zuständig ist. Ausnahmen gelten für bestimmte Händler- und Flottenvorgänge.` },
      { q: 'Was kostet es, wenn ich meinen Termin verpasse?', a: 'Die Behörde berechnet für einen verpassten Termin in der Regel keine Gebühr, weil keine Amtshandlung stattgefunden hat. Manche Portale sperren aber Nutzer, die mehrfach nicht erscheinen, für eine Weile oder verlangen eine Bestätigung per Mail. Wer nicht kommen kann, sagt über den Link in der Buchungsbestätigung ab; der Termin geht dann an den Nächsten.' },
      { q: 'Wie lange dauert ein Termin bei der Zulassungsstelle?', a: 'Die Bearbeitung am Schalter dauert bei vollständigen Unterlagen meist nur wenige Minuten. Dazu kommt das Prägen der Schilder beim Schilderdienst, wenn ein neues Kennzeichen nötig ist, und der Rückweg zum Schalter zum Stempeln. Wer die Schilder vorher mit reserviertem Kennzeichen prägen lässt, spart diesen Zwischenschritt. Planen Sie trotzdem Puffer ein, weil sich Termine verschieben.' },
    ],
    body: (h) => `<h2>Vier Wege zur Zulassung im Vergleich</h2>
<p>Der Termin am Schalter ist nicht der einzige Weg. Die Tabelle zeigt, was jede Variante an Gebühr kostet und was sie an Zeit verlangt. Gerechnet ist eine Neuzulassung; für andere Vorgänge ändert sich der Betrag, nicht das Verhältnis.</p>
${h.table(['Weg', 'Gebühr der Behörde', 'Zusätzliche Kosten', 'Zeit'], [
  ['Termin am Schalter', h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr), 'keine', 'Termin abwarten, dann kurzer Besuch'],
  ['Ohne Termin mit Wartemarke', h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr), 'keine', 'nur wo angeboten, Wartezeit offen'],
  ['Online (i-Kfz)', h.eur(h.M.berechne({ vorgang: 'neu', online: true }).gebuehr), 'keine', 'kein Weg, Bescheid oft nach einem Werktag'],
  ['Zulassungsdienst mit Vollmacht', h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr), 'Vergütung des Dienstes, frei', 'Dienst erledigt es, oft am selben Tag'],
], `Neuzulassung, GebOSt ${h.P.gebost_stand.de}`, ['l', 'r', 'l', 'l'])}
<p>Zulassungsdienste haben in vielen Behörden eigene Händlerschalter mit festen Kontingenten. Deshalb kommen sie oft schneller dran als Privatkunden. Ihre Vergütung ist ein Marktpreis; fragen Sie vorher, was darin enthalten ist, ob Schilder dabei sind und ob sie die Papiere zurückbringen.</p>
<h2>Wie voll sind die Zulassungsstellen?</h2>
<p>Eine amtliche Statistik der Wartezeiten gibt es nicht. Ein grober Anhaltspunkt ist, wie viele Pkw auf eine Anlaufstelle kommen: Je mehr Fahrzeuge eine Stelle betreut, desto mehr Vorgänge fallen dort an. Die Zahlen unten verbinden den Fahrzeugbestand des Kraftfahrt-Bundesamts mit dessen Anschriftenverzeichnis. Sie sagen nichts über Personal und Öffnungszeiten, zeigen aber, warum es in Stadtstaaten oft enger ist als auf dem Land.</p>
${last(h)}
<p>Wo eine Stelle sehr viele Pkw betreut, lohnt sich die Online-Zulassung besonders. Die Zahl je Stelle ist auf Hunderter gerundet; Polizei- und Bundesbehörden sind nicht mitgezählt.</p>
<h2>Freie Termine finden</h2>
<p>Viele Buchungsportale geben neue Termine zu einer festen Uhrzeit frei, oft früh am Morgen, und abgesagte Termine laufen zufällig über den Tag ein. Drei Gewohnheiten helfen. Erstens: mehrmals am Tag nachsehen, nicht nur abends. Zweitens: alle Stellen Ihres Kreises prüfen, nicht nur die nächstgelegene; die ${h.a('home', 'Suche nach Ort oder Postleitzahl')} zeigt Haupt- und Außenstellen mit Adresse. Drittens: den passenden Vorgang wählen, denn viele Portale vergeben für Abmeldung, Anmeldung und Ummeldung getrennte Kontingente, und ein falsch gebuchter Termin wird am Schalter abgewiesen.</p>
<h2>Ohne Termin: wann es klappt</h2>
<p>Einige Behörden bedienen Kunden ohne Termin, meist zu bestimmten Zeiten oder nur für einfache Vorgänge. Ob das bei Ihrer Stelle so ist, steht auf deren Website, nicht in einer bundesweiten Regel. Wer ohne Termin kommt, sollte früh da sein und die Unterlagen vollständig haben, weil bei Rückfragen niemand wartet. Für die Abmeldung ist der Weg ohne Termin am ehesten offen; noch einfacher ist sie ${h.a('auto-online-anmelden', 'online')}.</p>
<!--mini:online-->
<h2>Vollmacht: jemand anderes geht hin</h2>
<p>Wer keine Zeit hat, schickt jemanden mit schriftlicher Vollmacht. Die bevollmächtigte Person bringt ihren eigenen Ausweis, Ihren Ausweis oder eine Kopie davon, die Vollmacht im Original und alle Fahrzeugunterlagen mit. Das SEPA-Mandat für die Kfz-Steuer müssen Sie als Kontoinhaber selbst unterschreiben. Die Gebühr ändert sich nicht. Viele Behörden stellen ein Vollmachtsformular bereit; ein formloses Schreiben mit Namen, Anschrift, Vorgang und Unterschrift genügt meist auch.</p>
<h2>Den einen Termin nicht verschenken</h2>
<p>Ein Termin ist knapp, also lohnt die Vorbereitung. Prüfen Sie am Vortag die ${h.a('auto-anmelden-unterlagen', 'Unterlagen')}: Ausweis, Zulassungsbescheinigungen, eVB-Nummer, Bankdaten, Prüfbericht. Reservieren Sie ein Wunschkennzeichen vorher und lassen Sie die Schilder schon prägen; dann entfällt der Gang zum Schilderdienst. Bezahlt wird am Schalter, vielerorts nur mit Karte. Und nehmen Sie die Buchungsbestätigung mit, denn manche Stellen rufen nur gebuchte Nummern auf. Was der Vorgang kostet, rechnet der ${h.a('kosten', 'Kostenrechner')}.</p>
<h2>Was Sie von der Behörde erwarten dürfen</h2>
<p>Die Zulassungsbehörde muss Sie bedienen, wenn sie für Ihren Wohnsitz zuständig ist und die Unterlagen vollständig sind. Sie darf den Antrag ablehnen, wenn die Versicherungsbestätigung fehlt, Steuern rückständig sind oder die Hauptuntersuchung abgelaufen ist. Eine Pflicht zur Online-Terminbuchung gibt es bundesweit nicht; jede Behörde organisiert ihren Publikumsverkehr selbst. Wer nach einem Umzug ummelden muss, hat nach § 15 der Fahrzeug-Zulassungsverordnung unverzüglich zu handeln; ein fehlender Termin entschuldigt das nicht, der Online-Weg aber erfüllt die Pflicht.</p>`,
  },
  en: {
    slug: 'registration-office-appointment-germany',
    nav: 'Getting an appointment',
    card: 'Booking, walking in, power of attorney, registration agencies and how busy each office is.',
    title: 'Zulassungsstelle appointment: book, walk in or go online',
    description: 'Zulassungsstelle appointment in Germany: booking online, finding free slots, walking in, power of attorney, agencies, what to bring and how busy offices are.',
    h1: 'Getting an appointment at the German registration office',
    intro: 'In many cities the appointment, not the fee, is the real obstacle. The routes available, when you can do without an appointment, and how not to waste the one you get.',
    resume: (h) => `Most registration offices (Zulassungsstellen) in Germany hand out appointments through a booking portal on the district or city website; some also see walk-in customers with a queue ticket, often only for simple procedures such as deregistration. The Federal Motor Transport Authority’s directory, ${h.Z.avStand('en')}, lists ${h.num(M(h).hauptstellen)} main offices and ${h.num(M(h).stellen)} service points in all for ${h.num(M(h).bezirke)} registration districts; the office responsible is always the one for the keeper’s home address. To be quick, you have three routes: look for freed-up slots early in the morning, choose a branch office in the same district, or avoid the appointment entirely, because most procedures work online through i-Kfz, for a new car at ${h.eur(h.M.berechne({ vorgang: 'neu', online: true }).gebuehr)} instead of ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)}. A registration agency (Zulassungsdienst) goes without an appointment through its own counters, for its own fee. The office’s fee is the same on every route.`,
    faqs: (h) => [
      { q: 'Why can I not find a free appointment at my registration office?', a: 'Many offices release slots only a few weeks ahead and put cancelled appointments back into the system at short notice. Searching at one fixed time often shows only fully booked days. Checking several times a day, including early in the morning, helps more than one look a week. Some districts have a second office with shorter waits that serves the same addresses.' },
      { q: 'Can I book at a registration office in another district?', a: `Only at an office in your own registration district. Many districts have branch offices besides the main one, ${h.num(M(h).stellen)} service points in all, and any of yours may serve you. An office in another district will turn the application down because it is not responsible. Exceptions exist for certain dealer and fleet procedures.` },
      { q: 'What does it cost if I miss my appointment?', a: 'The office usually charges nothing for a missed appointment, because no official act took place. Some portals do block users who repeatedly fail to turn up, for a while, or ask for e-mail confirmation. If you cannot come, cancel through the link in the booking confirmation so the slot goes to the next person.' },
      { q: 'How long does an appointment at the registration office take?', a: 'With complete documents the counter work usually takes only a few minutes. Add the time for the plate maker to stamp plates if you need a new number, and the walk back to the counter for the seals. Having the plates made beforehand with a reserved number saves that step. Still allow some slack, because appointments run late.' },
    ],
    body: (h) => `<h2>Four routes to registration compared</h2>
<p>The counter appointment is not the only route. The table shows what each option costs in fees and what it asks of your time. It uses a new registration; for other procedures the amount changes, not the comparison.</p>
${h.table(['Route', 'Office fee', 'Extra cost', 'Time'], [
  ['Appointment at the counter', h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr), 'none', 'wait for the slot, then a short visit'],
  ['Walk-in with a queue ticket', h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr), 'none', 'only where offered, wait unknown'],
  ['Online (i-Kfz)', h.eur(h.M.berechne({ vorgang: 'neu', online: true }).gebuehr), 'none', 'no trip, decision often after one working day'],
  ['Registration agency with power of attorney', h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr), 'agency fee, set freely', 'agency handles it, often the same day'],
], `New registration, GebOSt ${h.P.gebost_stand.en}`, ['l', 'r', 'l', 'l'])}
<p>In many offices registration agencies have their own dealer counters with fixed quotas, which is why they are often served faster than private customers. Their fee is a market price; ask beforehand what it includes, whether plates are part of it and whether they bring the papers back.</p>
<h2>How busy are the registration offices?</h2>
<p>There is no official statistic on waiting times. A rough indicator is how many cars each service point looks after: the more vehicles an office serves, the more procedures it handles. The figures below combine the Federal Motor Transport Authority’s vehicle stock with its office directory. They say nothing about staff or opening hours, but they show why it is often tighter in the city states than in rural areas.</p>
${last(h)}
<p>Where an office serves a great many cars, registering online pays off most. The figure per office is rounded to the nearest hundred; police and federal offices are not counted.</p>
<h2>Finding a free slot</h2>
<p>Many booking portals release new slots at a fixed time, often early in the morning, while cancellations come in at random through the day. Three habits help. First, check several times a day, not only in the evening. Second, try every office in your district, not just the nearest; the ${h.a('home', 'search by town or postcode')} shows main and branch offices with addresses. Third, pick the right procedure, because many portals keep separate quotas for deregistering, registering and re-registering, and a slot booked for the wrong one is turned away at the counter.</p>
<h2>Without an appointment: when it works</h2>
<p>Some offices serve customers without an appointment, usually at set times or for simple procedures only. Whether yours does is stated on its website, not in a nationwide rule. If you walk in, come early with complete documents, because nobody waits while you fetch something. Deregistration is the procedure most likely to be open to walk-ins; it is even easier ${h.a('auto-online-anmelden', 'online')}.</p>
<!--mini:online-->
<h2>Power of attorney: someone else goes</h2>
<p>If you have no time, send someone with a written power of attorney. That person brings their own ID, your ID or a copy of it, the original power of attorney and all the vehicle documents. You must sign the SEPA mandate for vehicle tax yourself as the account holder. The fee does not change. Many offices provide a form; an informal letter with name, address, procedure and signature is usually enough as well.</p>
<h2>Do not waste the one appointment</h2>
<p>Slots are scarce, so preparation pays. The day before, check the ${h.a('auto-anmelden-unterlagen', 'documents')}: ID, registration certificates, eVB number, bank details, inspection report. Reserve a personalised number in advance and have the plates made already; then the trip to the plate maker disappears. Payment is at the counter, in many places by card only. Bring the booking confirmation, because some offices only call booked numbers. The ${h.a('kosten', 'fee calculator')} works out what your procedure costs.</p>
<h2>What you can expect from the office</h2>
<p>The registration office must serve you if it is responsible for your address and your documents are complete. It may refuse the application if the insurance confirmation is missing, taxes are in arrears or the roadworthiness test has expired. There is no nationwide duty to book online; each office organises its public service itself. If you must re-register after a move, section 15 of the vehicle registration ordinance (FZV) requires you to act without delay; a missing appointment is no excuse, but the online route meets the duty.</p>`,
  },
});
