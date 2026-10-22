import { defineGuide, type Helpers } from '../../lib/guide-types';

/** Matrice des pièces par cas (neu, gebraucht abgemeldet, gebraucht zugelassen, Import, Firma). */
function matrix(h: Helpers): string {
  const de = h.lang === 'de';
  const J = de ? 'ja' : 'yes', N = '–', E = de ? 'je nach Fall' : 'depends';
  const rows: string[][] = [
    [de ? 'Personalausweis oder Pass mit Meldebescheinigung' : 'ID card, or passport with proof of address', J, J, J, J, de ? 'Vertreter' : 'representative'],
    [de ? 'eVB-Nummer der Versicherung' : 'Insurer’s eVB number', J, J, J, J, J],
    [de ? 'SEPA-Mandat für die Kfz-Steuer' : 'SEPA mandate for vehicle tax', J, J, J, J, J],
    [de ? 'Zulassungsbescheinigung Teil II' : 'Registration certificate part II', J, J, J, de ? 'ausländisches Dokument' : 'foreign document', J],
    [de ? 'Zulassungsbescheinigung Teil I' : 'Registration certificate part I', N, J, J, N, E],
    [de ? 'Übereinstimmungsbescheinigung (CoC)' : 'Certificate of conformity (CoC)', J, N, N, J, E],
    [de ? 'Nachweis der Hauptuntersuchung' : 'Proof of roadworthiness test', N, J, J, J, E],
    [de ? 'Alte Kennzeichenschilder' : 'Old number plates', N, de ? 'falls reserviert' : 'if reserved', de ? 'bei neuem Kennzeichen' : 'if new plate', N, E],
    [de ? 'Handelsregisterauszug, Gewerbeanmeldung' : 'Commercial register extract, trade registration', N, N, N, N, J],
    [de ? 'Vollmacht und Ausweiskopie des Halters' : 'Power of attorney and keeper’s ID copy', E, E, E, E, J],
  ];
  return h.table(de ? ['Unterlage', 'Neuwagen', 'Gebraucht, abgemeldet', 'Gebraucht, noch zugelassen', 'Import', 'Firma'] : ['Document', 'New car', 'Used, deregistered', 'Used, still registered', 'Import', 'Company'], rows,
    de ? 'Regelfall nach §§ 6, 15 und 16 FZV; die Behörde kann im Einzelfall mehr verlangen' : 'Usual case under §§ 6, 15 and 16 FZV; an office may ask for more in a given case', ['l', 'l', 'l', 'l', 'l', 'l']);
}

export default defineGuide({
  id: 'auto-anmelden-unterlagen',
  group: 'kosten',
  order: 5,
  mini: 'anmelden',
  miniHref: 'kosten',
  related: ['auto-anmelden-kosten', 'auto-online-anmelden', 'zulassungsstelle-termin', 'auto-ummelden', 'kosten'],
  sources: ['fzv16', 'fzv15', 'gebost', 'kbaAv'],
  de: {
    slug: 'auto-anmelden-unterlagen',
    nav: 'Unterlagen',
    card: 'Was Sie für Neuwagen, Gebrauchtwagen, Import und Firmenwagen mitbringen.',
    title: 'Auto anmelden Unterlagen 2026: Checkliste für jeden Fall',
    description: 'Auto anmelden Unterlagen: Checkliste für Neuwagen, Gebrauchtwagen, Import und Firmenwagen, eVB-Nummer, SEPA-Mandat, HU-Nachweis und Vollmacht im Überblick.',
    h1: 'Unterlagen für die Autoanmeldung: die Checkliste',
    intro: 'Ein fehlendes Papier kostet einen neuen Termin. Die Liste unten sortiert die Unterlagen nach Fall, vom Neuwagen bis zum Firmenwagen, und sagt, wofür die Behörde sie braucht.',
    resume: (h) => `Für jede Zulassung verlangt die Behörde vier Dinge: einen Nachweis, wer Halter wird und wo er wohnt, einen Nachweis, dass das Fahrzeug versichert ist, ein Lastschriftmandat für die Kfz-Steuer und die Papiere des Fahrzeugs. Konkret sind das ein Personalausweis oder ein Reisepass mit Meldebescheinigung, die siebenstellige eVB-Nummer der Versicherung, ein SEPA-Mandat für das Konto, von dem das Hauptzollamt die Steuer abbucht, und die Zulassungsbescheinigung Teil II, früher Fahrzeugbrief. Bei einem Neuwagen kommt die Übereinstimmungsbescheinigung des Herstellers dazu, bei einem Gebrauchtwagen die Zulassungsbescheinigung Teil I und der Nachweis der Hauptuntersuchung. Wer für jemand anderen anmeldet, braucht eine Vollmacht und eine Kopie des Ausweises des Halters; Firmen legen einen Handelsregisterauszug oder eine Gewerbeanmeldung vor. Die Gebühr, ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)} für eine Neuzulassung vor Ort, zahlen Sie am Ende des Termins. Diese Liste beschreibt den Regelfall nach der Fahrzeug-Zulassungsverordnung; Ihre Behörde kann im Einzelfall mehr verlangen.`,
    faqs: (h) => [
      { q: 'Was ist die eVB-Nummer und woher bekomme ich sie?', a: 'Die elektronische Versicherungsbestätigung ist ein siebenstelliger Code, mit dem der Versicherer der Zulassungsbehörde meldet, dass für das Fahrzeug eine Haftpflichtversicherung besteht. Sie bekommen ihn beim Abschluss des Vertrags, oft sofort online. Die Nummer gilt nur für eine bestimmte Zeit; ist sie abgelaufen, lehnt die Behörde die Zulassung ab. Fragen Sie vor dem Termin nach dem Ablaufdatum.' },
      { q: 'Reicht ein Reisepass für die Anmeldung?', a: 'Nur zusammen mit einer Meldebescheinigung, denn im Reisepass steht keine Anschrift. Die Behörde muss prüfen können, dass Sie im Bezirk mit Hauptwohnsitz gemeldet sind. Ausländische Staatsangehörige legen ihren Pass oder Aufenthaltstitel mit Meldebescheinigung vor. Der Personalausweis mit aktueller Anschrift genügt dagegen allein.' },
      { q: 'Welche Unterlagen braucht ein Import aus einem anderen EU-Land?', a: 'Die ausländische Zulassungsbescheinigung, möglichst beide Teile, die Übereinstimmungsbescheinigung des Herstellers, einen Nachweis über die Hauptuntersuchung, wenn das Fahrzeug älter ist, und bei Neufahrzeugen eine Bescheinigung über die Erwerbsteuer. Fehlen Daten, verlangen Behörden oft ein Gutachten einer Prüforganisation. Weil Importe Einzelfälle sind, lohnt sich ein Anruf vor dem Termin.' },
      { q: 'Kann ein Freund mein Auto anmelden?', a: `Ja, mit einer schriftlichen Vollmacht und einer Kopie Ihres Ausweises; er bringt außerdem seinen eigenen Ausweis mit. Eine bestimmte Form schreibt die Verordnung nicht vor; viele Behörden stellen Vordrucke auf ihre Website. Die Gebühr ist dieselbe, ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)} für eine Neuzulassung. Online geht es mit einer Vollmacht nicht, weil der Ausweis des Halters gelesen wird.` },
    ],
    body: (h) => `<h2>Die Unterlagen nach Fall</h2>
<p>Die Tabelle zeigt, welche Unterlage in welchem Fall üblich ist. „Je nach Fall“ heißt: Die Behörde verlangt sie nur, wenn der Fall es erfordert, etwa die Vollmacht, wenn nicht der Halter selbst kommt.</p>
${matrix(h)}
<h2>Wofür die Behörde die einzelnen Papiere braucht</h2>
<p><strong>Ausweis und Anschrift.</strong> Zuständig ist die Behörde am Hauptwohnsitz des Halters, bei Firmen am Sitz. Die Anschrift im Ausweis entscheidet, welche Zulassungsstelle den Antrag annimmt; wer gerade umgezogen ist, lässt sie vorher beim Einwohnermeldeamt ändern.</p>
<p><strong>eVB-Nummer.</strong> Ohne Haftpflichtversicherung keine Zulassung. Der Versicherer liefert die Daten elektronisch, sobald die Behörde die Nummer eingibt. Achten Sie darauf, dass die Nummer für die richtige Fahrzeugart und den richtigen Halter ausgestellt ist.</p>
<p><strong>SEPA-Mandat.</strong> Die Kfz-Steuer wird nur noch per Lastschrift erhoben. Das Konto muss nicht Ihres sein, der Kontoinhaber unterschreibt dann das Mandat. Steuerrückstände aus früheren Zulassungen können eine neue Zulassung blockieren, bis sie beglichen sind.</p>
<p><strong>Zulassungsbescheinigung Teil II.</strong> Sie beweist nicht das Eigentum, aber die Behörde braucht sie, um den neuen Halter einzutragen. Liegt bei sehr alten Autos noch ein Fahrzeugbrief vor, tauscht die Behörde ihn um, für ${h.eur(h.P.zuschlag.fahrzeugbrief)} zusätzlich.</p>
<p><strong>Hauptuntersuchung.</strong> Bei einem Gebrauchtwagen muss die HU-Frist gültig sein. Ist sie während der Abmeldung abgelaufen, wird die Untersuchung vor der Zulassung nachgeholt. Neuwagen bekommen ihren ersten HU-Termin bei der Zulassung.</p>
<!--mini:ummelden-->
<h2>Beim Gebrauchtwagenkauf: was der Verkäufer übergeben muss</h2>
<p>Ob die Anmeldung klappt, entscheidet sich oft schon bei der Übergabe. Lassen Sie sich beide Teile der Zulassungsbescheinigung im Original geben, den letzten Prüfbericht der Hauptuntersuchung und, wenn das Auto noch zugelassen ist, die Schilder am Fahrzeug. Vergleichen Sie die Fahrgestellnummer in den Papieren mit der am Auto. Ein schriftlicher Kaufvertrag mit Datum, Uhrzeit und Kilometerstand hilft bei späteren Fragen zu Steuer, Versicherung oder Bußgeldern. Fehlt die Zulassungsbescheinigung Teil II, kann die Behörde nicht umschreiben; ein Ersatz lässt sich nur vom eingetragenen Halter beantragen und dauert.</p>
<h2>Sonderfälle</h2>
<p><strong>Minderjährige Halter</strong> brauchen die Zustimmung beider Sorgeberechtigten. <strong>Halter ohne Wohnsitz in Deutschland</strong> können nur in Ausnahmefällen zulassen, etwa mit einem Empfangsbevollmächtigten im Inland. <strong>Leasing- und finanzierte Fahrzeuge</strong>: Die Zulassungsbescheinigung Teil II liegt oft bei der Bank oder Leasinggesellschaft, die sie für die Zulassung schickt oder die Zulassung selbst übernimmt. <strong>Wohnmobile und Anhänger</strong> folgen denselben Regeln; bei Anhängern entfällt die HU-Plakette nicht, wohl aber die Prüfung der Abgaswerte.</p>
<h2>Vor dem Termin prüfen</h2>
<p>Stimmen Fahrgestellnummer in Fahrzeugpapieren und eVB, ist die eVB noch gültig, ist das SEPA-Mandat unterschrieben? Liegen bei einer Umschreibung beide Teile der Zulassungsbescheinigung vor? Ist die HU nicht abgelaufen? Wer diese fünf Fragen bejaht, kommt fast immer mit einem Termin aus. Legen Sie die Papiere in der Reihenfolge der Tabelle in eine Mappe; am Schalter geht es dann schneller, und Sie sehen sofort, ob etwas fehlt. Was der Termin kostet, steht bei den ${h.a('auto-anmelden-kosten', 'Anmeldekosten')}; wie man einen bekommt, unter ${h.a('zulassungsstelle-termin', 'Termin')}. Online genügt statt der Papiere vor Ort der Sicherheitscode auf den Bescheinigungen, siehe ${h.a('auto-online-anmelden', 'online anmelden')}.</p>`,
  },
  en: {
    slug: 'car-registration-documents-germany',
    nav: 'Documents',
    card: 'What to bring for a new car, used car, import or company car.',
    title: 'Car registration documents Germany: checklist for each case',
    description: 'Documents to register a car in Germany: checklist for new, used, imported and company cars, eVB number, SEPA mandate, test proof and power of attorney.',
    h1: 'Documents for registering a car in Germany: the checklist',
    intro: 'A missing paper costs a new appointment. The list below sorts the documents by case, from new cars to company cars, and says what the office needs each one for.',
    resume: (h) => `For every registration the German office needs four things: proof of who the keeper will be and where they live, proof that the vehicle is insured, a direct-debit mandate for vehicle tax, and the vehicle’s papers. In practice that means an ID card, or a passport with a registration certificate (Meldebescheinigung), the insurer’s seven-character eVB number, a SEPA mandate for the account from which the customs office collects the tax, and registration certificate part II, formerly the logbook (Fahrzeugbrief). A new car also needs the manufacturer’s certificate of conformity; a used car needs registration certificate part I and proof of the roadworthiness test. Anyone registering for someone else needs a power of attorney and a copy of the keeper’s ID; companies show a commercial register extract or trade registration. You pay the fee, ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)} for a new car in person, at the end of the appointment. This list describes the usual case under the Vehicle Registration Ordinance; your office may ask for more in a particular case.`,
    faqs: (h) => [
      { q: 'What is the eVB number and where do I get it?', a: 'The electronic insurance confirmation (elektronische Versicherungsbestätigung) is a seven-character code with which the insurer tells the registration office that the vehicle has third-party cover. You get it when you take out the policy, often instantly online. It is only valid for a limited time; if it has expired, the office will refuse registration. Ask for the expiry date before your appointment.' },
      { q: 'Is a passport enough to register a car in Germany?', a: 'Only together with a registration certificate (Meldebescheinigung), because a passport shows no address. The office has to check that your main residence is in its district. Foreign nationals show their passport or residence permit with the registration certificate. A German ID card with the current address is enough on its own.' },
      { q: 'Which documents does a car imported from another EU country need?', a: 'The foreign registration certificate, ideally both parts, the manufacturer’s certificate of conformity, proof of a roadworthiness test for older vehicles and, for new vehicles, a certificate on acquisition tax. If data are missing, offices often ask for an expert report from a testing organisation. Imports are individual cases, so a call before the appointment pays off.' },
      { q: 'Can a friend register my car for me?', a: `Yes, with a written power of attorney and a copy of your ID; they also bring their own ID. The ordinance prescribes no particular form, and many offices put templates on their websites. The fee is the same, ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)} for a new car. It does not work online with a power of attorney, because the keeper’s own ID card is read.` },
    ],
    body: (h) => `<h2>Documents by case</h2>
<p>The table shows which document is usual in which case. “Depends” means the office only asks for it if the case requires it, such as the power of attorney when the keeper does not come in person.</p>
${matrix(h)}
<h2>What the office needs each paper for</h2>
<p><strong>ID and address.</strong> The office for the keeper’s main residence is in charge, or for companies the office for their seat. The address on the ID decides which registration office accepts the application; if you have just moved, update it at the residents’ office first.</p>
<p><strong>eVB number.</strong> No third-party insurance, no registration. The insurer sends the data electronically as soon as the office enters the number. Make sure it was issued for the right type of vehicle and the right keeper.</p>
<p><strong>SEPA mandate.</strong> Vehicle tax is only collected by direct debit. The account need not be yours; the account holder then signs the mandate. Tax arrears from earlier registrations can block a new one.</p>
<p><strong>Registration certificate part II.</strong> It does not prove ownership, but the office needs it to enter the new keeper. If a very old car still has a logbook, the office replaces it, for ${h.eur(h.P.zuschlag.fahrzeugbrief)} extra.</p>
<p><strong>Roadworthiness test.</strong> For a used car the inspection date must still be valid. If it lapsed while the car was deregistered, the test is done before registration. New cars get their first inspection date at registration.</p>
<!--mini:ummelden-->
<h2>Buying used: what the seller must hand over</h2>
<p>Whether registration works is often decided at the handover. Get both parts of the registration certificate as originals, the latest roadworthiness report and, if the car is still registered, the plates on the vehicle. Compare the identification number in the papers with the one on the car. A written contract with date, time and mileage helps with later questions about tax, insurance or fines. Without registration certificate part II the office cannot transfer the car; only the registered keeper can apply for a replacement, and that takes time.</p>
<h2>Special cases</h2>
<p><strong>Keepers under 18</strong> need the consent of both parents or guardians. <strong>Keepers without a residence in Germany</strong> can register only in exceptional cases, for example with an authorised recipient in Germany. <strong>Leased and financed vehicles</strong>: registration certificate part II is often held by the bank or leasing company, which sends it for the registration or handles it itself. <strong>Motorhomes and trailers</strong> follow the same rules; trailers still get a roadworthiness sticker but no emissions check.</p>
<h2>Check before your appointment</h2>
<p>Does the vehicle identification number match in the papers and the eVB? Is the eVB still valid? Is the SEPA mandate signed? For a transfer, are both parts of the registration certificate there? Is the roadworthiness test still in date? If you can answer yes to these five questions, one appointment is almost always enough. What it costs is under ${h.a('auto-anmelden-kosten', 'registration costs')}; how to get an appointment under ${h.a('zulassungsstelle-termin', 'appointment')}. Online, the security code on the certificates replaces bringing the papers, see ${h.a('auto-online-anmelden', 'registering online')}.</p>`,
  },
});
