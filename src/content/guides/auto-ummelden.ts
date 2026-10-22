import { defineGuide, type Helpers } from '../../lib/guide-types';
import type { Eingabe } from '../../lib/engine/gebuehren';

const b = (h: Helpers, e: Eingabe) => h.M.berechne(e);
function faelle(h: Helpers): string {
  const de = h.lang === 'de';
  const F: Array<[string, Eingabe]> = [
    [de ? 'Neuer Kreis, Kennzeichen bleibt' : 'New district, plate kept', { vorgang: 'umzugBehalten' }],
    [de ? 'Neuer Kreis, Kennzeichen bleibt, online' : 'New district, plate kept, online', { vorgang: 'umzugBehalten', online: true }],
    [de ? 'Neuer Kreis, neues Kennzeichen' : 'New district, new plate', { vorgang: 'umzugNeu' }],
    [de ? 'Neuer Kreis, neues Wunschkennzeichen' : 'New district, new personalised number', { vorgang: 'umzugNeu', wunsch: true }],
    [de ? 'Neuer Kreis und neuer Halter, Kennzeichen bleibt' : 'New district and new keeper, plate kept', { vorgang: 'umzugBehalten', halterwechsel: true }],
    [de ? 'Gleicher Kreis, nur neue Anschrift' : 'Same district, new address only', { vorgang: 'adresse' }],
    [de ? 'Gleicher Kreis, neue Anschrift, online' : 'Same district, new address, online', { vorgang: 'adresse', online: true }],
  ];
  const rows = F.map(([t, e]) => { const r = b(h, e); return [t, r.fest[0].nr, h.eur(r.gebuehr), `${h.eur(r.min)} – ${h.eur(r.max)}`]; });
  return h.table(de ? ['Fall', 'GebOSt-Nr.', 'Gebühr', 'Mit Nebenposten'] : ['Case', 'GebOSt no.', 'Fee', 'With small items'], rows,
    de ? `Ummelden nach der GebOSt, ${h.P.gebost_stand.de}; ohne Schilder` : `Re-registration under the GebOSt, ${h.P.gebost_stand.en}; plates excluded`, ['l', 'l', 'r', 'r']);
}

export default defineGuide({
  id: 'auto-ummelden',
  group: 'kosten',
  order: 3,
  mini: 'ummelden',
  miniHref: 'kosten',
  related: ['kosten', 'auto-anmelden-unterlagen', 'auto-online-anmelden', 'kfz-kennzeichen', 'auto-abmelden'],
  sources: ['gebost', 'fzv15', 'fzv9', 'fzv16', 'kbaAv'],
  de: {
    slug: 'auto-ummelden',
    nav: 'Ummelden nach Umzug',
    card: 'Kennzeichen behalten oder neu, gleicher oder neuer Kreis, Kosten je Fall.',
    title: 'Auto ummelden 2026: Kosten, Kennzeichen behalten, Unterlagen',
    description: 'Auto ummelden nach Umzug: Kosten 2026 nach GebOSt mit und ohne neues Kennzeichen, Umzug im selben Kreis, Halterwechsel, Fristen, Unterlagen und Online-Ummelden.',
    h1: 'Auto ummelden nach einem Umzug: Kosten und Ablauf',
    intro: 'Nach einem Umzug muss die Anschrift im Fahrzeugregister stimmen. Wie teuer das wird, hängt an zwei Fragen: Wechseln Sie den Kreis, und wollen Sie Ihr Kennzeichen behalten?',
    resume: (h) => { const k = b(h, { vorgang: 'umzugBehalten' }), n = b(h, { vorgang: 'umzugNeu' }), a = b(h, { vorgang: 'adresse' }); return `Wer umzieht, muss die neue Anschrift seiner Zulassungsbehörde melden, und zwar unverzüglich, wie die Fahrzeug-Zulassungsverordnung es verlangt. Zuständig ist die Behörde am neuen Wohnort. Zieht der Halter in einen anderen Zulassungsbezirk, darf er das bisherige Kennzeichen seit 2015 bundesweit behalten. Die Ummeldung kostet dann nach Nummer 221.9 der Gebührenordnung ${h.eur(k.gebuehr)} vor Ort und ${h.eur(b(h, { vorgang: 'umzugBehalten', online: true }).gebuehr)} online; Schilder und Plaketten bleiben am Auto. Mit neuem Kennzeichen sind es nach Nummer 221.2 ${h.eur(n.gebuehr)}, dazu neue Schilder und Stempelplaketten. Bleibt der Halter im selben Kreis, ändert die Behörde nur die Anschrift in der Zulassungsbescheinigung Teil I: ${h.eur(a.gebuehr)} nach Nummer 225, mit neuem Fahrzeugschein und Siegel ${h.eur(a.max)}. Die Kfz-Steuer und die Versicherung laufen weiter; der Versicherer braucht die neue Anschrift trotzdem. Gebühren und Nummern gelten in der Fassung ${h.P.gebost_stand.de}.`; },
    faqs: (h) => [
      { q: 'Wie schnell muss ich mein Auto nach dem Umzug ummelden?', a: 'Die Fahrzeug-Zulassungsverordnung sagt „unverzüglich“, nennt aber keine feste Zahl von Tagen. Gemeint ist: ohne schuldhaftes Zögern, sobald Sie am neuen Wohnort gemeldet sind. Wer monatelang wartet, riskiert ein Verwarnungsgeld; im äußersten Fall darf die Behörde den Betrieb des Fahrzeugs untersagen, bis die Meldung nachgeholt ist (§ 15 Absatz 1 FZV). Planen Sie die Ummeldung deshalb gleich nach der Anmeldung beim Einwohnermeldeamt.' },
      { q: 'Muss ich nach dem Umzug neue Schilder kaufen?', a: `Nein, wenn Sie das Kennzeichen behalten. Dann bleiben Schilder und Stempelplaketten, und die Ummeldung kostet ${h.eur(b(h, { vorgang: 'umzugBehalten' }).gebuehr)} vor Ort. Nur wer ein Kennzeichen des neuen Kreises möchte, braucht neue Schilder vom Schilderpräger und neue Plaketten. Die Wahl ist frei; manche wollen das neue Kürzel, andere sparen sich Weg und Kosten.` },
      { q: 'Was passiert, wenn ich gleichzeitig umziehe und das Auto übernehme?', a: `Dann sind es zwei Vorgänge in einem Antrag: Halterwechsel und Wechsel des Bezirks. Die Gebührennummer ist dieselbe wie beim reinen Umzug, es kommt aber der Eintrag des neuen Halters beim Kraftfahrt-Bundesamt dazu, ${h.eur(h.P.kba['124'])}. Sie brauchen dann auch die Zulassungsbescheinigung Teil II, den Kaufvertrag oder eine Erklärung des bisherigen Halters und eine eVB-Nummer auf Ihren Namen.` },
      { q: 'Kann ich online ummelden, wenn ich ins Ausland ziehe?', a: 'Nein. Mit dem Wegzug ins Ausland endet die Zuständigkeit jeder deutschen Zulassungsbehörde für Sie als Halter; eine Ummeldung gibt es dann nicht. Sie melden das Auto in Deutschland ab und im neuen Land an, oder Sie nutzen für die Überführung ein Ausfuhrkennzeichen. Die Regeln des Ziellands entscheiden, was dort nötig ist.' },
    ],
    body: (h) => { const k = b(h, { vorgang: 'umzugBehalten' }), n = b(h, { vorgang: 'umzugNeu' }); return `<h2>Sieben Fälle mit ihren Kosten</h2>
<p>Die Gebührenordnung unterscheidet beim Umzug drei Wege, jeweils vor Ort und online. Die Tabelle rechnet die häufigsten Fälle durch: links die Gebühr der Zulassungsbehörde, rechts der Betrag mit Plaketten und Registereintrag. Schilder sind nicht enthalten.</p>
${faelle(h)}
<p>Der Unterschied zwischen Behalten und Wechseln beträgt bei der Gebühr selbst nur ${h.eur(n.gebuehr - k.gebuehr)} zugunsten des neuen Kennzeichens; teurer wird der Wechsel erst durch Schilder und Plaketten. Wer zwei Schilder neu prägen lässt, zahlt dafür beim Händler einen freien Preis, den der ${h.a('kosten', 'Kostenrechner')} auf Wunsch mitrechnet.</p>
<h2>Kennzeichen behalten: was sich ändert und was nicht</h2>
<p>Seit Januar 2015 darf jeder Halter sein Kennzeichen bei einem Umzug innerhalb Deutschlands mitnehmen. Die neue Behörde übernimmt dann Kürzel und Erkennungsnummer, ändert die Anschrift im Register und in der Zulassungsbescheinigung Teil I. Die Stempelplaketten bleiben gültig, obwohl sie das Wappen des alten Landes oder Kreises tragen. Wer später innerhalb des neuen Kreises umzieht oder das Auto verkauft, kann das alte Kennzeichen ebenfalls weiterführen, solange das Fahrzeug nicht außer Betrieb gesetzt wird.</p>
<p>Ein Nachteil des Behaltens: Bei einer Abmeldung im neuen Kreis lässt sich das mitgebrachte Kennzeichen nicht mehr reservieren, wenn es aus einem anderen Bezirk stammt. Die Regel steht in § 16 der Fahrzeug-Zulassungsverordnung, und sie betrifft vor allem Halter, die ihr Auto stilllegen und später wieder zulassen wollen.</p>
<!--mini:online-->
<h2>Umzug im selben Kreis</h2>
<p>Bleiben Sie im Zulassungsbezirk, ist der Vorgang klein: Die Behörde trägt die neue Anschrift ein und klebt bei einem Antrag vor Ort ein Siegel auf den Fahrzeugschein, oder stellt eine neue Zulassungsbescheinigung Teil I aus. Kennzeichen, Schilder und Plaketten bleiben. Die Gebühr nach Nummer 225 beträgt ${h.eur(h.P.land['225'])}, online nach Nummer 225.1 ${h.eur(h.P.land['225.1'])}. Nach § 15 Absatz 2 der Fahrzeug-Zulassungsverordnung genügt es sogar, die neue Anschrift über die Meldebehörde mitzuteilen, wenn die Kommune dieses Verfahren eröffnet hat; ob das bei Ihnen gilt, steht auf der Website der Stadt.</p>
<h2>Welche Unterlagen Sie brauchen</h2>
<p>Für eine Ummeldung genügen in der Regel Personalausweis mit neuer Anschrift oder Reisepass mit Meldebescheinigung, die Zulassungsbescheinigung Teil I und ein gültiger Nachweis der Hauptuntersuchung. Für ein neues Kennzeichen kommen die alten Schilder zur Entstempelung dazu; ein SEPA-Mandat für die Kfz-Steuer verlangen viele Behörden auch beim Umzug, weil das zuständige Hauptzollamt wechseln kann. Wechselt zugleich der Halter, braucht die Behörde zusätzlich die Zulassungsbescheinigung Teil II und eine eVB-Nummer des neuen Halters. Die vollständige Liste steht bei den ${h.a('auto-anmelden-unterlagen', 'Unterlagen')}.</p>
<h2>Online ummelden</h2>
<p>Alle drei Wege gibt es auch über die internetbasierte Zulassung. Voraussetzung sind ein Personalausweis mit freigeschalteter Online-Funktion, die neue Anschrift schon im Chip und Zulassungsbescheinigungen mit Sicherheitscode. Beim Behalten des Kennzeichens kommt nichts per Post außer dem geänderten Fahrzeugschein, bei einem neuen Kennzeichen die Plaketten auf einem Plakettenträger. Die Ersparnis beim Behalten beträgt ${h.eur(k.ersparnisOnline ?? 0)}; Einzelheiten unter ${h.a('auto-online-anmelden', 'online anmelden')}.</p>
<h2>Was der Umzug sonst auslöst</h2>
<p>Die Kfz-Steuer läuft weiter, auch wenn ein anderes Hauptzollamt zuständig wird; einen neuen Bescheid gibt es nur, wenn sich etwas an der Steuer ändert. Die Versicherung muss die neue Anschrift kennen, weil die Regionalklasse am Wohnort hängt und der Beitrag steigen oder sinken kann. Für Halter, die ihr Kennzeichen nicht behalten, nennt die ${h.a('kfz-kennzeichen', 'Kennzeichen-Liste')} die Kürzel des neuen Kreises; ob Sie ein bestimmtes wählen dürfen, hängt davon ab, welche Kürzel die Behörde ausgibt.</p>`; },
  },
  en: {
    slug: 're-register-car-after-moving',
    nav: 'Re-register after a move',
    card: 'Keep or change the plate, same or new district, cost per case.',
    title: 'Re-register a car after moving in Germany: cost and plates',
    description: 'Re-registering a car after a move in Germany (Ummeldung): 2026 fees with or without a new plate, moves within a district, keeper change and deadlines.',
    h1: 'Re-registering a car after a move: cost and steps',
    intro: 'After a move the address in the vehicle register must be right. The cost turns on two questions: are you changing district, and do you want to keep your plate?',
    resume: (h) => { const k = b(h, { vorgang: 'umzugBehalten' }), n = b(h, { vorgang: 'umzugNeu' }), a = b(h, { vorgang: 'adresse' }); return `Anyone who moves in Germany has to report the new address to the registration office without delay, as the Vehicle Registration Ordinance requires. The office at the new home is in charge. If the keeper moves to another registration district, they may keep their current plate, nationwide since 2015. Re-registering (Ummeldung) then costs ${h.eur(k.gebuehr)} in person under number 221.9 of the fee schedule and ${h.eur(b(h, { vorgang: 'umzugBehalten', online: true }).gebuehr)} online; plates and seals stay on the car. With a new plate it is ${h.eur(n.gebuehr)} under number 221.2, plus new plates and registration seals. If the keeper stays in the same district, the office only changes the address on registration certificate part I: ${h.eur(a.gebuehr)} under number 225, or ${h.eur(a.max)} with a new certificate and seal. Vehicle tax and insurance continue; the insurer still needs the new address. Fees and numbers are those of the version ${h.P.gebost_stand.en}.`; },
    faqs: (h) => [
      { q: 'How soon after moving must I re-register my car in Germany?', a: 'The Vehicle Registration Ordinance says “without delay” (unverzüglich) but sets no fixed number of days. It means promptly, once you are registered at the new address. Waiting for months risks a caution fine; in the last resort the office may prohibit use of the vehicle until the change is reported (§ 15(1) FZV). Plan the re-registration right after registering your new address with the residents’ office.' },
      { q: 'Do I need new plates after moving house in Germany?', a: `No, if you keep your plate. Plates and seals then stay, and re-registering costs ${h.eur(b(h, { vorgang: 'umzugBehalten' }).gebuehr)} in person. Only if you want a plate from the new district do you need new plates from a plate maker and new seals. The choice is yours; some want the new code, others save the trip and the cost.` },
      { q: 'What if I move and take over the car at the same time?', a: `Then it is two procedures in one application: change of keeper and change of district. The fee number is the same as for a plain move, but the new keeper’s entry at the Federal Motor Transport Authority is added, ${h.eur(h.P.kba['124'])}. You also need registration certificate part II, the purchase contract or a statement from the previous keeper, and an eVB number in your name.` },
      { q: 'Can I re-register online if I am moving abroad?', a: 'No. Once you move abroad, no German registration office is responsible for you as keeper any more, so there is no re-registration. You deregister the car in Germany and register it in the new country, or use an export plate to drive it there. The destination country’s rules decide what is needed.' },
    ],
    body: (h) => { const k = b(h, { vorgang: 'umzugBehalten' }), n = b(h, { vorgang: 'umzugNeu' }); return `<h2>Seven cases and their cost</h2>
<p>The fee schedule distinguishes three routes for a move, each in person and online. The table works out the most common cases: on the left the registration office’s fee, on the right the amount with seals and register entry. Plates are not included.</p>
${faelle(h)}
<p>The difference between keeping and changing the plate is only ${h.eur(n.gebuehr - k.gebuehr)} in the fee itself, in favour of the new plate; what makes the change dearer is plates and seals. Having two plates made costs whatever the plate shop charges, which the ${h.a('kosten', 'fee calculator')} can include.</p>
<h2>Keeping your plate: what changes and what does not</h2>
<p>Since January 2015 every keeper may take their plate along when moving within Germany. The new office then takes over the code and number and changes the address in the register and on registration certificate part I. The seals remain valid even though they show the coat of arms of the old state or district. If you later move within the new district or sell the car, the old plate can also continue as long as the vehicle is not taken off the road.</p>
<p>One drawback of keeping it: if you later deregister in the new district, a plate brought in from another district can no longer be reserved. The rule is in § 16 of the Vehicle Registration Ordinance, and it matters mostly to keepers who want to lay up a car and register it again later.</p>
<!--mini:online-->
<h2>Moving within the same district</h2>
<p>If you stay in the registration district, the procedure is small: the office records the new address and, when you apply in person, puts a seal on the certificate or issues a new registration certificate part I. Plate, plates and seals stay. The fee under number 225 is ${h.eur(h.P.land['225'])}, online under number 225.1 ${h.eur(h.P.land['225.1'])}. Under § 15(2) of the Vehicle Registration Ordinance it is even enough to report the new address through the residents’ registration office, where the municipality offers that procedure; whether it does is stated on its website.</p>
<h2>Documents you need</h2>
<p>A re-registration usually takes an ID card showing the new address, or a passport with a registration certificate, registration certificate part I and valid proof of the roadworthiness test. For a new plate, bring the old plates for their seals to be removed; many offices also ask for a SEPA mandate for vehicle tax, because the responsible customs office may change. If the keeper changes as well, the office also needs registration certificate part II and an eVB number for the new keeper. The full list is under ${h.a('auto-anmelden-unterlagen', 'documents')}.</p>
<h2>Re-registering online</h2>
<p>All three routes are also available through internet-based registration. You need an ID card with the online function enabled and the new address already stored on its chip, and registration certificates with a security code. Keeping the plate, nothing arrives by post except the updated certificate; with a new plate the seals come on a seal carrier. The saving when keeping the plate is ${h.eur(k.ersparnisOnline ?? 0)}; details under ${h.a('auto-online-anmelden', 'registering online')}.</p>
<h2>What else a move triggers</h2>
<p>Vehicle tax continues even if a different customs office becomes responsible; a new assessment is only issued if something about the tax changes. The insurer must know the new address, because the regional class depends on where you live and the premium may rise or fall. If you do not keep your plate, the ${h.a('kfz-kennzeichen', 'plate code list')} shows the codes of the new district; whether you may pick a particular one depends on which codes the office issues.</p>`; },
  },
});
