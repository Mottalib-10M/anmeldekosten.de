import { defineGuide, type Helpers } from '../../lib/guide-types';
import type { Eingabe } from '../../lib/engine/gebuehren';

const b = (h: Helpers, e: Eingabe) => h.M.berechne(e);
/** Quatre cas types, chiffrés par le moteur. */
function faelle(h: Helpers): string {
  const de = h.lang === 'de';
  const F: Array<[string, Eingabe]> = [
    [de ? 'Neuwagen, vor Ort, Standardkennzeichen' : 'New car, in person, standard number', { vorgang: 'neu' }],
    [de ? 'Neuwagen, online' : 'New car, online', { vorgang: 'neu', online: true }],
    [de ? 'Neuwagen, vor Ort, reserviertes Wunschkennzeichen' : 'New car, in person, reserved personalised number', { vorgang: 'neu', wunsch: true, reservierung: true }],
    [de ? 'Gebrauchtwagen, vor Ort, mit Halterwechsel' : 'Used car, in person, new keeper', { vorgang: 'gebraucht' }],
    [de ? 'Gebrauchtwagen mit altem Fahrzeugbrief' : 'Used car with an old logbook', { vorgang: 'gebraucht', brief: true }],
    [de ? 'Gebrauchtwagen, online' : 'Used car, online', { vorgang: 'gebraucht', online: true }],
    [de ? 'Gebrauchtwagen, noch zugelassen, gleicher Kreis' : 'Used car still registered, same district', { vorgang: 'umschreibung' }],
  ];
  const rows = F.map(([t, e]) => { const r = b(h, e); return [t, h.eur(r.gebuehr), `${h.eur(r.min)} – ${h.eur(r.max)}`]; });
  return h.table(de ? ['Fall', 'Gebühr', 'Mit Nebenposten, ohne Schilder'] : ['Case', 'Fee', 'With small items, no plates'], rows,
    de ? `Berechnet nach der GebOSt, ${h.P.gebost_stand.de}` : `Calculated under the GebOSt, ${h.P.gebost_stand.en}`, ['l', 'r', 'r']);
}

export default defineGuide({
  id: 'auto-anmelden-kosten',
  group: 'kosten',
  order: 2,
  mini: 'anmelden',
  miniHref: 'kosten',
  related: ['kosten', 'auto-anmelden-unterlagen', 'auto-online-anmelden', 'wunschkennzeichen', 'zulassungsstelle-termin'],
  sources: ['gebost', 'fzv9', 'berlinZul', 'kbaAv', 'bmv'],
  de: {
    slug: 'auto-anmelden-kosten',
    nav: 'Anmeldekosten',
    card: 'Neu- oder Gebrauchtwagen: Gebühr, Plaketten, Schilder, online oder vor Ort.',
    title: 'Auto anmelden Kosten 2026: Gebühr, Schilder und Plaketten',
    description: 'Auto anmelden Kosten 2026: Gebühr nach GebOSt für Neu- und Gebrauchtwagen, online günstiger, Wunschkennzeichen, Plaketten und Schilder, mit Beispielen.',
    h1: 'Auto anmelden: Was kostet die Zulassung 2026?',
    intro: 'Neuwagen oder Gebrauchter, vor Ort oder online, mit oder ohne Wunschkennzeichen: der Betrag für Ihren Fall, Posten für Posten, und was zusätzlich zu zahlen ist.',
    resume: (h) => { const n = b(h, { vorgang: 'neu' }), o = b(h, { vorgang: 'neu', online: true }), g = b(h, { vorgang: 'gebraucht' }); return `Wer in Deutschland ein Auto anmeldet, zahlt der Zulassungsbehörde eine Gebühr nach der Gebührenordnung für Maßnahmen im Straßenverkehr, ${h.P.gebost_stand.de}. Für die Zulassung eines Neuwagens sind das nach Nummer 221.1 ${h.eur(n.gebuehr)} am Schalter; online über i-Kfz ${h.eur(o.gebuehr)}. Ein Gebrauchtwagen, der vorher abgemeldet war, kostet ebenfalls ${h.eur(g.gebuehr)} vor Ort. Dazu kommen kleine Posten: zwei Stempelplaketten zu je ${h.eur(h.P.zuschlag.stempelplakette[0])} oder ${h.eur(h.P.zuschlag.stempelplakette[1])}, bei Bedarf die HU-Plakette zu ${h.eur(h.P.zuschlag.huPlakette)} und der Eintrag beim Kraftfahrt-Bundesamt, bei einem Halterwechsel ${h.eur(h.P.kba['124'])}. Ohne Schilder liegt eine Anmeldung damit zwischen ${h.eur(o.min)} online und ${h.eur(n.max)} vor Ort. Die Kennzeichenschilder kauft man getrennt bei einem Schilderpräger; ihr Preis ist frei. Ein Wunschkennzeichen kostet ${h.eur(h.P.zuschlag.wunsch)} mehr. Versicherung und Kfz-Steuer sind keine Zulassungsgebühren.`; },
    faqs: (h) => [
      { q: 'Kostet die Anmeldung eines Gebrauchtwagens weniger als die eines Neuwagens?', a: `Nein, die Grundgebühr ist dieselbe: Nummer 221.1 gilt für jede Zulassung eines Fahrzeugs, neu oder gebraucht, mit ${h.eur(h.P.land['221.1'])}. Beim Gebrauchten kommt meist der Halterwechsel im Register dazu, ${h.eur(h.P.kba['124'])}, und bei sehr alten Autos der Umtausch des Fahrzeugbriefs in die Zulassungsbescheinigung Teil II, ${h.eur(h.P.zuschlag.fahrzeugbrief)}. Ist der Gebrauchte noch zugelassen und bleibt im Kreis, ist die Umschreibung günstiger.` },
      { q: 'Wann wird die Gebühr bei der Zulassungsstelle bezahlt?', a: 'Am Schalter nach der Bearbeitung, meist mit Karte; manche Behörden nehmen kein Bargeld mehr, andere zahlen über Kassenautomaten. Online wird die Gebühr im Portal per Karte, Lastschrift oder Bezahldienst fällig, bevor der Bescheid kommt. Die Schilder bezahlen Sie getrennt beim Schilderpräger, der oft im selben Gebäude oder gegenüber sitzt.' },
      { q: 'Muss ich bei der Anmeldung schon die Kfz-Steuer bezahlen?', a: 'Nein. Die Behörde nimmt nur ein SEPA-Lastschriftmandat für das Konto entgegen, von dem die Steuer abgebucht wird. Den Steuerbescheid erlässt danach das Hauptzollamt, und die erste Abbuchung folgt einige Wochen später, für das laufende Zulassungsjahr. Ohne Mandat oder mit Steuerrückständen kann die Zulassung verweigert werden.' },
      { q: 'Ist ein Zulassungsdienst sein Geld wert?', a: 'Das hängt von den Wartezeiten ab. Ein Zulassungsdienst geht mit Ihrer Vollmacht zur Behörde und berechnet dafür eine eigene Vergütung zusätzlich zur Gebühr, die gleich bleibt. Wo es Termine erst in Wochen gibt, spart er Zeit. Die Online-Zulassung erreicht dasselbe ohne Aufschlag, wenn Ausweis mit Online-Funktion und Papiere mit Sicherheitscode vorliegen.' },
      { q: 'Kostet die Anmeldung eines Elektroautos etwas anderes?', a: `Nein, die Gebühr ist dieselbe wie für einen Verbrenner. Ein E-Kennzeichen kann bei der Zulassung ohne Aufpreis gewählt werden, wenn das Fahrzeug die Voraussetzungen erfüllt; wer es nachträglich möchte, zahlt die Gebühr für eine Änderung. Unterschiede gibt es bei der Kfz-Steuer, nicht bei der Zulassung.` },
    ],
    body: (h) => { const n = b(h, { vorgang: 'neu' }), w = b(h, { vorgang: 'neu', wunsch: true, reservierung: true }); return `<h2>Sieben typische Fälle durchgerechnet</h2>
<p>Die folgende Tabelle rechnet die häufigsten Anmeldungen mit dem Rechner dieser Website durch. Die mittlere Spalte ist die genaue Gebühr der Zulassungsbehörde mit ihren Zuschlägen, die rechte Spalte der Betrag mit allen kleinen Posten, die je nach Fall dazukommen. Schilder sind nirgends enthalten.</p>
${faelle(h)}
<p>Bei einem Neuwagen kommt die HU-Plakette immer dazu, weil der erste Termin der Hauptuntersuchung bei der Zulassung festgelegt wird. Beim Gebrauchten hängt sie davon ab, ob die alte Plakette noch passt. Den Anteil des Kraftfahrt-Bundesamts zeigen wir als Spanne, weil die Gebührenordnung ihn nach Art des Registereintrags staffelt; die ${h.a('method', 'Methodik')} erklärt unsere Zuordnung.</p>
<h2>Neuwagen: was der Händler übernimmt</h2>
<p>Viele Autohäuser melden den Neuwagen selbst an und stellen dafür eine Pauschale in Rechnung. Diese Pauschale ist keine Gebühr der Behörde, sondern ein Preis des Händlers: Sie enthält meist Schilder, Fahrten und Arbeitszeit. Fragen Sie nach der Aufteilung. Die Gebühr selbst bleibt bei ${h.eur(n.gebuehr)}, mit reserviertem Wunschkennzeichen ${h.eur(w.gebuehr)}. Wer selbst anmeldet, braucht dafür die Zulassungsbescheinigung Teil II vom Händler und die Übereinstimmungsbescheinigung des Herstellers, bei Importen gegebenenfalls ein Gutachten.</p>
<h2>Gebrauchtwagen: abgemeldet oder noch zugelassen?</h2>
<p>Beim Kauf eines Gebrauchtwagens entscheidet der Zustand der Zulassung über den Weg. War das Auto abgemeldet, ist es eine neue Zulassung nach Nummer 221.1, mit neuem Kennzeichen oder dem reservierten alten. Ist es noch auf den Verkäufer zugelassen und Sie wohnen im selben Kreis, genügt eine Umschreibung auf Sie; das Kennzeichen kann bleiben, Schilder entfallen. Kommt das Auto aus einem anderen Kreis, behalten Sie auf Wunsch das fremde Kennzeichen; der Rechner kennt beide Fälle. Wichtig: Der Verkäufer muss den Verkauf melden, und Sie müssen das Auto unverzüglich auf sich umschreiben lassen.</p>
<!--mini:ummelden-->
<h2>Online anmelden: der günstigste Weg</h2>
<p>Die internetbasierte Zulassung ist der einzige Weg, die Gebühr selbst zu senken: Die Gebührenordnung sieht dafür eigene Nummern vor. Für einen Neuwagen sparen Sie ${h.eur(n.ersparnisOnline ?? 0)}. Voraussetzungen sind ein Personalausweis mit freigeschalteter Online-Funktion samt PIN, ein Kartenlesegerät oder Smartphone, die Zulassungsbescheinigungen mit freigelegtem Sicherheitscode und die eVB-Nummer. Die Plaketten kommen per Post auf einem Plakettenträger; bis dahin dürfen Sie mit dem vorläufigen Bescheid fahren. Mehr unter ${h.a('auto-online-anmelden', 'online anmelden')}.</p>
<h2>Was nicht in den Zulassungskosten steckt</h2>
<p>Drei Posten werden oft dazugerechnet, gehören aber nicht dazu. Die Kennzeichenschilder prägt ein privater Betrieb, dessen Preis vom Material und vom Ort abhängt; tragen Sie ihn im ${h.a('kosten', 'Kostenrechner')} ein, wenn Sie den Gesamtbetrag wollen. Die Haftpflichtversicherung ist Voraussetzung, wird aber vom Versicherer berechnet. Die Kfz-Steuer setzt das Hauptzollamt fest. Für die Unterlagen gibt es eine eigene ${h.a('auto-anmelden-unterlagen', 'Checkliste')}.</p>
<h2>Drei Fehler, die einen zweiten Termin kosten</h2>
<p>Der häufigste ist eine fehlende oder abgelaufene eVB-Nummer: Ohne gültige Versicherungsbestätigung bricht die Behörde ab, und der Termin ist verloren. Der zweite betrifft Gebrauchtwagen mit überfälliger Hauptuntersuchung; ohne aktuellen Prüfbericht gibt es keine Zulassung. Der dritte ist eine Vollmacht ohne Ausweiskopie, wenn jemand anderes die Anmeldung übernimmt. Wer alles am Vorabend mit der Checkliste prüft, kommt mit einem Termin aus, und bei knappen Terminen in Großstädten ist das oft mehr wert als jede Gebührenersparnis.</p>`; },
  },
  en: {
    slug: 'car-registration-cost-germany',
    nav: 'Registration cost',
    card: 'New or used car: fee, seals, plates, online or in person.',
    title: 'Car registration cost Germany 2026: fee, plates and seals',
    description: 'Car registration cost in Germany for 2026: the GebOSt fee for new and used cars, cheaper online, personalised numbers, seals and plates, with worked examples.',
    h1: 'Registering a car in Germany: what does it cost in 2026?',
    intro: 'New or used, in person or online, with or without a personalised number: the amount for your case, item by item, and what you pay on top.',
    resume: (h) => { const n = b(h, { vorgang: 'neu' }), o = b(h, { vorgang: 'neu', online: true }), g = b(h, { vorgang: 'gebraucht' }); return `Registering a car in Germany means paying the registration office a fee under the road traffic fee schedule (GebOSt), ${h.P.gebost_stand.en}. For a new car that is ${h.eur(n.gebuehr)} at the counter under number 221.1, or ${h.eur(o.gebuehr)} online through i-Kfz. A used car that had been deregistered also costs ${h.eur(g.gebuehr)} in person. Small items come on top: two registration seals at ${h.eur(h.P.zuschlag.stempelplakette[0])} or ${h.eur(h.P.zuschlag.stempelplakette[1])} each, the roadworthiness sticker at ${h.eur(h.P.zuschlag.huPlakette)} where needed, and the Federal Motor Transport Authority’s register entry, ${h.eur(h.P.kba['124'])} for a change of keeper. Without plates, a registration therefore comes to between ${h.eur(o.min)} online and ${h.eur(n.max)} in person. Plates are bought separately from a plate maker at its own price. A personalised number costs ${h.eur(h.P.zuschlag.wunsch)} more. Insurance and vehicle tax are not registration fees.`; },
    faqs: (h) => [
      { q: 'Is registering a used car in Germany cheaper than a new one?', a: `No, the base fee is the same: number 221.1 covers any vehicle registration, new or used, at ${h.eur(h.P.land['221.1'])}. A used car usually adds the change of keeper in the register, ${h.eur(h.P.kba['124'])}, and for very old cars replacing the logbook with registration certificate part II, ${h.eur(h.P.zuschlag.fahrzeugbrief)}. If the car is still registered and stays in the district, a transfer is cheaper.` },
      { q: 'When do I pay the fee at the registration office?', a: 'At the counter once your case is processed, usually by card; some offices no longer take cash, others use payment machines. Online, the fee is paid in the portal by card, direct debit or payment service before the decision is issued. Plates are paid separately to the plate maker, often in the same building or across the street.' },
      { q: 'Do I pay vehicle tax when I register a car in Germany?', a: 'No. The office only takes a SEPA direct-debit mandate for the account the tax will be collected from. The customs office then issues the tax assessment, and the first debit follows a few weeks later for the current registration year. Without a mandate, or with tax arrears, registration can be refused.' },
      { q: 'Is a registration agency (Zulassungsdienst) worth paying for?', a: 'It depends on waiting times. An agency goes to the office with your power of attorney and charges its own fee on top of the official one, which stays the same. Where appointments are weeks away it saves time. Online registration achieves the same without the surcharge if you have an ID card with the online function and papers with the security code.' },
      { q: 'Does registering an electric car cost anything different?', a: 'No, the fee is the same as for a combustion car. An E plate can be chosen at registration at no extra cost if the vehicle qualifies; asking for one later costs the fee for a change. The differences lie in vehicle tax, not in registration.' },
    ],
    body: (h) => { const n = b(h, { vorgang: 'neu' }), w = b(h, { vorgang: 'neu', wunsch: true, reservierung: true }); return `<h2>Seven typical cases worked out</h2>
<p>The table below runs the most common registrations through this site’s calculator. The middle column is the registration office’s exact fee with its surcharges, the right column the amount including every small item that may apply. Plates are never included.</p>
${faelle(h)}
<p>For a new car the roadworthiness sticker is always added, because the first inspection date is set at registration. For a used car it depends on whether the old sticker still fits. We show the Federal Motor Transport Authority’s share as a range because the fee schedule grades it by type of register entry; the ${h.a('method', 'method page')} explains how we assign it.</p>
<h2>New cars: what the dealer handles</h2>
<p>Many dealers register a new car themselves and charge a flat rate for it. That flat rate is not an official fee but the dealer’s price: it usually covers plates, trips and staff time. Ask for the breakdown. The fee itself stays at ${h.eur(n.gebuehr)}, or ${h.eur(w.gebuehr)} with a reserved personalised number. If you register yourself you need registration certificate part II from the dealer and the manufacturer’s certificate of conformity, and for imports possibly an expert report.</p>
<h2>Used cars: deregistered or still registered?</h2>
<p>When you buy a used car, the state of its registration decides the route. If it was deregistered, it is a new registration under number 221.1, with a new number or the reserved old one. If it is still registered to the seller and you live in the same district, a transfer to your name is enough; the number can stay and no plates are needed. If the car comes from another district, you may keep its plate if you wish; the calculator covers both cases. Important: the seller must report the sale, and you must have the car transferred to you without delay.</p>
<!--mini:ummelden-->
<h2>Registering online: the cheapest route</h2>
<p>Internet-based registration is the only way to lower the fee itself: the fee schedule has separate numbers for it. For a new car you save ${h.eur(n.ersparnisOnline ?? 0)}. You need an ID card with the online function activated and its PIN, a card reader or smartphone, registration certificates with the security code uncovered, and the eVB number. The seals arrive by post on a seal carrier; until then you may drive with the provisional decision. More under ${h.a('auto-online-anmelden', 'registering online')}.</p>
<h2>What registration costs do not include</h2>
<p>Three items are often added in but do not belong. Plates are made by a private business whose price depends on material and place; enter it in the ${h.a('kosten', 'fee calculator')} if you want the full total. Third-party insurance is a precondition but billed by the insurer. Vehicle tax is set by the customs office. The documents have their own ${h.a('auto-anmelden-unterlagen', 'checklist')}.</p>
<h2>Three mistakes that cost a second appointment</h2>
<p>The most common is a missing or expired eVB number: without a valid insurance confirmation the office stops, and the appointment is lost. The second concerns used cars with an overdue roadworthiness test; without a current inspection report there is no registration. The third is a power of attorney without a copy of the owner’s ID when someone else handles the registration. Checking everything against the checklist the evening before means one appointment is enough, and where appointments are scarce, as in many large cities, that is often worth more than any fee saving.</p>`; },
  },
});
