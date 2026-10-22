import { defineGuide, type Helpers } from '../../lib/guide-types';
import type { VorgangId } from '../../lib/engine/gebuehren';
import { VORGANG_TEXT } from '../../lib/vorgaenge-text';

const IDS: VorgangId[] = ['neu', 'gebraucht', 'umzugBehalten', 'umzugNeu', 'adresse', 'umschreibung', 'abmelden', 'wieder'];
/** Vor Ort contre online, démarche par démarche, chiffré par le moteur. */
function vergleich(h: Helpers): string {
  const de = h.lang === 'de';
  const rows = IDS.map((v) => {
    const a = h.M.berechne({ vorgang: v }), o = h.M.berechne({ vorgang: v, online: true });
    return [VORGANG_TEXT[v][h.lang], h.eur(a.gebuehr), h.eur(o.gebuehr), h.eur(a.gebuehr - o.gebuehr)];
  });
  return h.table(de ? ['Vorgang', 'Vor Ort', 'Online', 'Ersparnis'] : ['Procedure', 'In person', 'Online', 'Saving'], rows,
    de ? `Gebühr der Zulassungsbehörde mit Zuschlägen, GebOSt ${h.P.gebost_stand.de}` : `Registration office fee with surcharges, GebOSt ${h.P.gebost_stand.en}`, ['l', 'r', 'r', 'r']);
}
const n = (h: Helpers) => h.M.berechne({ vorgang: 'neu' });
const no = (h: Helpers) => h.M.berechne({ vorgang: 'neu', online: true });

export default defineGuide({
  id: 'auto-online-anmelden',
  group: 'kosten',
  order: 6,
  mini: 'online',
  miniHref: 'kosten',
  related: ['kosten', 'auto-anmelden-kosten', 'auto-anmelden-unterlagen', 'zulassungsstelle-termin', 'auto-abmelden'],
  sources: ['gebost', 'fzv16', 'fzv15', 'kbaAv'],
  de: {
    slug: 'auto-online-anmelden',
    nav: 'Online anmelden',
    card: 'i-Kfz: was man braucht, was es kostet, wo es hakt, und die Ersparnis je Vorgang.',
    title: 'Auto online anmelden 2026: i-Kfz, Kosten und Voraussetzungen',
    description: 'Auto online anmelden mit i-Kfz: Gebühr je Vorgang gegenüber dem Schalter, Ausweis mit Online-Funktion, Sicherheitscodes, Ablauf, typische Fehler und Fristen.',
    h1: 'Auto online anmelden: i-Kfz Schritt für Schritt',
    intro: 'Ohne Termin und ohne Wartemarke: Mit der internetbasierten Zulassung erledigen Sie die meisten Vorgänge am Rechner und zahlen dafür weniger. Was Sie dafür brauchen und wo es scheitert.',
    resume: (h) => `Die internetbasierte Fahrzeugzulassung, kurz i-Kfz, erlaubt es, ein Auto ohne Besuch bei der Zulassungsstelle anzumelden, umzumelden oder abzumelden. Die Gebührenordnung für Maßnahmen im Straßenverkehr, ${h.P.gebost_stand.de}, sieht dafür eigene, niedrigere Nummern vor: Ein Neuwagen kostet online nach Nummer 221.1.1 ${h.eur(no(h).gebuehr)} statt ${h.eur(n(h).gebuehr)} am Schalter, eine Abmeldung nach Nummer 224.2 ${h.eur(h.P.land['224.2'])} statt ${h.eur(h.P.land['224.1'])}. Voraussetzung ist ein Personalausweis, eine eID-Karte oder ein elektronischer Aufenthaltstitel mit freigeschalteter Online-Funktion und bekannter PIN, dazu ein Kartenleser oder ein Smartphone mit NFC. Die Zulassungsbescheinigungen müssen einen verdeckten Sicherheitscode tragen, der freigerubbelt wird. Für die Anmeldung kommen die eVB-Nummer der Versicherung und ein SEPA-Mandat für die Kfz-Steuer dazu. Die Plaketten schickt die Behörde per Post; bis sie da sind, gilt der elektronische Bescheid.`,
    faqs: (h) => [
      { q: 'Welche Ausweise funktionieren für i-Kfz?', a: 'Der deutsche Personalausweis mit aktivierter Online-Funktion, die eID-Karte für Bürgerinnen und Bürger anderer EU- und EWR-Staaten und der elektronische Aufenthaltstitel. Ein Reisepass reicht nicht, weil er keine Online-Funktion hat. Wer die PIN vergessen hat, bekommt bei der Ausweisbehörde einen neuen PIN-Brief; der Rücksetzdienst per Post wurde eingestellt, daher lohnt es sich, die PIN vor dem Antrag zu testen.' },
      { q: 'Wo finde ich den Sicherheitscode auf dem Fahrzeugschein?', a: 'Auf der Zulassungsbescheinigung Teil I liegt er unter einem Feld, das man freirubbelt, auf Teil II unter einem Aufkleber oder ebenfalls unter einer Rubbelschicht. Ältere Papiere haben noch keinen Code; dann geht der Vorgang nur am Schalter. Zum Abmelden braucht es zusätzlich die Codes unter den Stempelplaketten der Schilder. Ein einmal freigelegter Code bleibt gültig, bis er benutzt wird.' },
      { q: 'Darf ich nach der Online-Zulassung sofort losfahren?', a: 'Ja, sobald der elektronische Zulassungsbescheid vorliegt und die Schilder montiert sind. Den Bescheid führen Sie ausgedruckt oder auf dem Handy mit; er ersetzt für eine begrenzte Zeit Plaketten und Papiere, bis die Post sie bringt. Fahrten ins Ausland sind damit heikel, weil ausländische Polizei den deutschen Bescheid nicht kennen muss. Die Plaketten kleben Sie selbst auf die Schilder.' },
      { q: 'Was passiert, wenn der Online-Antrag abgelehnt wird?', a: 'Die Behörde schickt eine Nachricht mit dem Grund, oft ein fehlender Prüfbericht, unlesbare Nachweise oder Steuerrückstände. Bereits gezahlte Beträge für einen abgelehnten Antrag erstatten viele Behörden nicht vollständig, weil Prüfaufwand entstanden ist. Wer unsicher ist, ob ein Fall online geht, etwa bei Importen oder geänderten technischen Daten, fährt mit einem Termin am Schalter meist schneller.' },
    ],
    body: (h) => `<h2>Was online wie viel billiger ist</h2>
<p>Die Gebührenordnung behandelt die Online-Zulassung nicht als Rabatt, sondern mit eigenen Nummern. Die folgende Tabelle stellt die häufigsten Vorgänge nebeneinander; gerechnet ist nur die Gebühr der Zulassungsbehörde mit ihren Zuschlägen. Der Anteil des Kraftfahrt-Bundesamts und die Plaketten kommen in beiden Fällen dazu und ändern den Abstand kaum.</p>
${vergleich(h)}
<p>Bei Neuwagen und Gebrauchten ist der Abstand am größten, weil die Bearbeitung am Schalter mit Schildern, Plaketten und Prüfung der Originale aufwendiger ist. Bei der Abmeldung ist der Betrag klein, aber die Ersparnis an Zeit oft die größere: Kein Termin, kein Weg. Online kommt nur ein kleiner Zuschlag für den Plakettenträger von ${h.eur(h.P.zuschlag.plakettentraeger)} dazu, den die Behörde mit der Post verschickt.</p>
<h2>Die Voraussetzungen, Punkt für Punkt</h2>
<p><strong>Ausweis mit Online-Funktion.</strong> Der Antrag wird mit der eID des Halters unterschrieben. Ist die Funktion nicht aktiviert, schaltet die Ausweisbehörde sie frei; prüfen Sie vorher mit der AusweisApp, ob die PIN funktioniert. Nach drei Fehlversuchen wird sie gesperrt und muss mit der PUK entsperrt werden.</p>
<p><strong>Kartenleser oder Smartphone.</strong> Ein Smartphone mit NFC und der AusweisApp genügt. Am Rechner geht es auch, wenn das Telefon als Lesegerät gekoppelt wird.</p>
<p><strong>Papiere mit Sicherheitscode.</strong> Für Anmeldung und Umschreibung braucht es den Code der Zulassungsbescheinigung Teil II, für Ummeldung und Abmeldung den der Teil I, beim Abmelden zusätzlich die Codes der Stempelplaketten. Fehlt ein Code, weil das Papier zu alt ist, bleibt nur der Schalter.</p>
<p><strong>eVB-Nummer und Konto.</strong> Die elektronische Versicherungsbestätigung gibt der Versicherer, das SEPA-Mandat für die Kfz-Steuer tragen Sie im Portal ein. Das Konto muss nicht Ihres sein, aber der Kontoinhaber muss zustimmen.</p>
<p><strong>Hauptuntersuchung.</strong> Bei Gebrauchten muss der letzte Prüfbericht gültig sein. Viele Prüforganisationen übermitteln die Daten elektronisch; sonst laden Sie den Bericht hoch.</p>
<h2>Der Ablauf am Bildschirm</h2>
<p>Den Einstieg bietet das Portal Ihres Kreises oder Landes, das die Seite der ${h.a('home', 'zuständigen Zulassungsstelle')} nennt; welche Behörde zuständig ist, entscheidet der Wohnort des Halters, nicht der Ort des Kaufs. Nach der Anmeldung mit dem Ausweis tragen Sie die Fahrzeugdaten ein, legen die Codes frei, wählen ein freies oder ${h.a('wunschkennzeichen', 'reserviertes Wunschkennzeichen')} und zahlen. Danach prüft die Behörde. Bei vollständigen Unterlagen kommt der Bescheid oft am selben oder am nächsten Werktag, bei Rückfragen später. Mit dem Bescheid lassen Sie die Schilder prägen und montieren sie; die Plaketten kommen per Post.</p>
<!--mini:anmelden-->
<h2>Wann online nicht geht</h2>
<p>Einige Fälle bleiben dem Schalter vorbehalten. Dazu gehören Kurzzeit- und ${h.a('ausfuhrkennzeichen', 'Ausfuhrkennzeichen')}, Fahrzeuge aus dem Ausland ohne deutsche Papiere, Fahrzeuge mit Änderungen, die erst eingetragen werden müssen, und alte Papiere ohne Sicherheitscode. Auch wer keinen Ausweis mit Online-Funktion hat, etwa mit Reisepass, muss persönlich kommen oder jemanden mit Vollmacht schicken. Für Firmen gibt es eigene Wege über ein Unternehmenskonto; die Einzelheiten regelt jedes Land.</p>
<h2>Fristen, die online genauso gelten</h2>
<p>Der Weg ändert nichts an den Pflichten. Wer umzieht oder ein Auto kauft, muss die Änderung nach § 15 der Fahrzeug-Zulassungsverordnung unverzüglich melden; online geht das am schnellsten. Wer abmeldet, kann das Kennzeichen auch online für ${h.num(h.P.fzv.reservierung_monate)} Monate reservieren lassen. Und wer online zulässt, muss die Plaketten nach Erhalt sofort aufkleben, denn der elektronische Bescheid ersetzt sie nur für eine Übergangszeit.</p>
<h2>Fünf Fehler, die einen Online-Antrag ausbremsen</h2>
<p>Erstens ein Halter, der nicht der Ausweisinhaber ist: Wer für den Ehepartner zulässt, muss mit dessen Ausweis signieren. Zweitens ein Tippfehler in der Fahrzeug-Identifizierungsnummer, die siebzehn Zeichen lang ist und oft ein O mit einer Null verwechselt. Drittens ein Konto ohne Zustimmung des Inhabers. Viertens zu kleine oder unscharfe Fotos von Nachweisen. Fünftens ein abgelaufener Prüfbericht. Ein Blick in die ${h.a('auto-anmelden-unterlagen', 'Checkliste der Unterlagen')} vor dem Start erspart den Rückruf der Behörde.</p>
<p>Wer alle Voraussetzungen erfüllt, spart mit i-Kfz Geld und meist einen halben Tag. Wer nur eine davon nicht erfüllt, ist mit einem ${h.a('zulassungsstelle-termin', 'Termin am Schalter')} besser bedient, als einen Antrag zu stellen, der hängen bleibt. Was ein Vorgang mit allen Posten kostet, zeigt der ${h.a('kosten', 'Kostenrechner')}.</p>`,
  },
  en: {
    slug: 'register-car-online-germany',
    nav: 'Register online',
    card: 'i-Kfz: what you need, what it costs, where it fails, and the saving per procedure.',
    title: 'Register a car online in Germany: i-Kfz, costs and checklist',
    description: 'Register a car online in Germany with i-Kfz: fee per procedure versus the counter, ID with the online function, security codes, the steps and common mistakes.',
    h1: 'Registering a car online in Germany: i-Kfz step by step',
    intro: 'No appointment and no queue ticket: with internet-based registration you can do most procedures from your computer and pay less for them. What you need, and where it goes wrong.',
    resume: (h) => `Internet-based vehicle registration, known as i-Kfz, lets you register, re-register or deregister a car in Germany without visiting the registration office (Zulassungsstelle). The road traffic fee schedule (GebOSt), ${h.P.gebost_stand.en}, has separate, lower numbers for it: a new car costs ${h.eur(no(h).gebuehr)} online under number 221.1.1 instead of ${h.eur(n(h).gebuehr)} at the counter, and a deregistration ${h.eur(h.P.land['224.2'])} under number 224.2 instead of ${h.eur(h.P.land['224.1'])}. You need a German ID card, an EU eID card or an electronic residence permit with the online function activated and its PIN known, plus a card reader or an NFC smartphone. The registration certificates must carry a hidden security code that you scratch free. Registration also needs the insurer’s eVB number and a SEPA mandate for vehicle tax. The office posts the seals; until they arrive, the electronic decision is your proof.`,
    faqs: (h) => [
      { q: 'Which ID documents work for i-Kfz?', a: 'The German ID card with its online function activated, the eID card for citizens of other EU and EEA countries, and the electronic residence permit. A passport is not enough because it has no online function. If you have forgotten the PIN, the ID office issues a new PIN letter; the postal reset service has been discontinued, so test your PIN before you start the application.' },
      { q: 'Where is the security code on the registration certificate?', a: 'On registration certificate part I it sits under a field you scratch off; on part II under a sticker or a similar scratch layer. Older papers have no code, and then the procedure is only possible at the counter. To deregister you also need the codes under the registration seals on the plates. Once uncovered, a code stays valid until it is used.' },
      { q: 'Can I drive straight away after registering online?', a: 'Yes, once the electronic registration decision has arrived and the plates are fitted. Carry the decision printed or on your phone; for a limited period it stands in for the seals and papers until the post delivers them. Trips abroad are risky with it, because foreign police need not recognise the German decision. You stick the seals on the plates yourself.' },
      { q: 'What happens if my online application is rejected?', a: 'The office sends a message with the reason, often a missing inspection report, unreadable evidence or tax arrears. Many offices do not refund the full amount for a rejected application because checking it took work. If you are unsure whether your case works online, for instance an import or changed technical data, an appointment at the counter is usually quicker.' },
    ],
    body: (h) => `<h2>How much cheaper each procedure is online</h2>
<p>The fee schedule does not treat online registration as a discount but gives it its own numbers. The table below sets the most common procedures side by side; it counts only the registration office’s fee with its surcharges. The Federal Motor Transport Authority’s share and the seals are added in both cases and barely change the gap.</p>
${vergleich(h)}
<p>The gap is widest for new and used cars, because at the counter the plates, seals and original papers take more handling. For a deregistration the amount is small, but the time saved is often the bigger gain: no appointment, no trip. Online adds only a small surcharge of ${h.eur(h.P.zuschlag.plakettentraeger)} for the seal carrier that the office sends by post.</p>
<h2>What you need, item by item</h2>
<p><strong>ID with the online function.</strong> The application is signed with the keeper’s eID. If the function is switched off, the ID office activates it; check beforehand in the AusweisApp that your PIN works. After three wrong attempts it locks and must be unlocked with the PUK.</p>
<p><strong>Card reader or smartphone.</strong> A smartphone with NFC and the AusweisApp is enough. A computer works too if the phone is paired as the reader.</p>
<p><strong>Papers with a security code.</strong> Registration and transfer need the code on registration certificate part II, re-registration and deregistration the one on part I, and deregistration also the codes on the registration seals. If a code is missing because the paper is too old, only the counter remains.</p>
<p><strong>eVB number and bank account.</strong> The insurer gives you the electronic insurance confirmation; you enter the SEPA mandate for vehicle tax in the portal. The account need not be yours, but its holder must agree.</p>
<p><strong>Roadworthiness test.</strong> For a used car the latest inspection report (HU) must be valid. Many testing organisations send the data electronically; otherwise you upload the report.</p>
<h2>The steps on screen</h2>
<p>You start from the portal of your district or federal state, which the page of the ${h.a('home', 'responsible registration office')} names; the keeper’s home address decides which office is responsible, not the place of purchase. After signing in with your ID you enter the vehicle data, uncover the codes, choose a free number or a ${h.a('wunschkennzeichen', 'reserved personalised number')} and pay. The office then checks the case. With complete documents the decision often comes the same or the next working day, later if there are questions. With the decision you have the plates made and fit them; the seals come by post.</p>
<!--mini:anmelden-->
<h2>When online is not possible</h2>
<p>Some cases stay at the counter. They include short-term and ${h.a('ausfuhrkennzeichen', 'export plates')}, vehicles from abroad without German papers, vehicles with modifications that must first be entered, and old papers without a security code. Anyone without an ID that has the online function, for instance with only a passport, must go in person or send someone with a power of attorney. Companies have their own route through a business account; each federal state sets the details.</p>
<h2>Deadlines apply online just the same</h2>
<p>The route does not change your obligations. If you move or buy a car, section 15 of the vehicle registration ordinance (FZV) requires you to report the change without delay; online is the fastest way to do it. If you deregister, you can also reserve the number online for ${h.num(h.P.fzv.reservierung_monate)} months. And if you register online, stick the seals on as soon as they arrive, because the electronic decision only covers a transition period.</p>
<h2>Five mistakes that stall an online application</h2>
<p>First, a keeper who is not the ID holder: registering for your spouse means signing with their ID. Second, a typo in the vehicle identification number, which is seventeen characters long and often confuses the letter O with zero. Third, a bank account without its holder’s consent. Fourth, photos of evidence that are too small or blurred. Fifth, an expired inspection report. A look at the ${h.a('auto-anmelden-unterlagen', 'document checklist')} before you start saves a call-back from the office.</p>
<p>If you meet every requirement, i-Kfz saves money and usually half a day. If you miss even one, an ${h.a('zulassungsstelle-termin', 'appointment at the counter')} serves you better than an application that gets stuck. The ${h.a('kosten', 'fee calculator')} shows what a procedure costs with every item.</p>`,
  },
});
