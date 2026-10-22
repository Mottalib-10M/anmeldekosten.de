import { defineGuide, type Helpers } from '../../lib/guide-types';
import { zeileText } from '../../lib/vorgaenge-text';

const A = (h: Helpers) => h.M.berechne({ vorgang: 'ausfuhr' });
const MAX = (h: Helpers) => h.P.fzv.ausfuhr_max_monate;
/** Ligne par ligne, ce que l'office facture pour un Ausfuhrkennzeichen (moteur). */
function posten(h: Helpers): string {
  const de = h.lang === 'de';
  const r = A(h);
  const rows = [
    ...r.fest.map((z) => [zeileText(z.key, z.nr, h.lang), h.eur(z.betrag)]),
    ...r.neben.map((z) => [zeileText(z.key, z.nr, h.lang), z.max !== undefined && z.max !== z.betrag ? `${h.eur(z.betrag)} – ${h.eur(z.max)}` : h.eur(z.betrag)]),
    [de ? '<strong>Zusammen, ohne Schilder und Versicherung</strong>' : '<strong>Total, without plates and insurance</strong>', `<strong>${h.eur(r.min)} – ${h.eur(r.max)}</strong>`],
  ];
  return h.table(de ? ['Posten', 'Betrag'] : ['Item', 'Amount'], rows, de ? `GebOSt ${h.P.gebost_stand.de}` : `GebOSt ${h.P.gebost_stand.en}`, ['l', 'r']);
}

export default defineGuide({
  id: 'ausfuhrkennzeichen',
  group: 'kennzeichen',
  order: 7,
  mini: 'ausfuhr',
  miniHref: 'kosten',
  related: ['kurzzeitkennzeichen', 'auto-abmelden', 'kosten', 'kfz-kennzeichen', 'zulassungsstelle-bremen'],
  sources: ['fzv45', 'gebost', 'fzv42', 'kbaAv'],
  de: {
    slug: 'ausfuhrkennzeichen',
    nav: 'Ausfuhrkennzeichen',
    card: 'Export eines Autos: Versicherung, Laufzeit bis zu einem Jahr, Gebühr, Hauptuntersuchung, Unterlagen.',
    title: 'Ausfuhrkennzeichen 2026: Kosten, Versicherung, Gültigkeit',
    description: 'Ausfuhrkennzeichen 2026: Gebühr nach GebOSt, Versicherung für den Export, Laufzeit bis zu einem Jahr, Hauptuntersuchung, Unterlagen, Ablauf, wer es ausstellt.',
    h1: 'Ausfuhrkennzeichen: ein Auto dauerhaft ins Ausland bringen',
    intro: 'Das Auto ist verkauft und fährt ins Ausland, oder Sie ziehen mit ihm weg: Dafür gibt es das Ausfuhrkennzeichen mit dem roten Datumsfeld. Was es kostet, was die Versicherung verlangt und wie lange es gilt.',
    resume: (h) => `Das Ausfuhrkennzeichen, oft Exportkennzeichen oder Zollkennzeichen genannt, regelt § 45 der Fahrzeug-Zulassungsverordnung. Es ist für Fahrzeuge gedacht, die mit eigener Kraft dauerhaft in einen anderen Staat gebracht werden. Die Zulassung ist auf die Dauer der Haftpflichtversicherung befristet, höchstens auf ${h.num(MAX(h))} Monate, und die Hauptuntersuchung muss bis zum Ablaufdatum gültig sein, sonst ist sie vorher zu machen. Das Kennzeichen besteht aus dem Kürzel des Bezirks, einer Zahl mit bis zu vier Ziffern und einem Buchstaben; rechts steht im roten Feld das Ablaufdatum. Nötig ist eine Versicherungsbestätigung für ausländische Fahrzeuge, die nicht jeder Versicherer anbietet. Die Gebühr der Zulassungsbehörde beträgt nach Nummer 221.3 der Gebührenordnung, ${h.P.gebost_stand.de}, ${h.eur(h.P.land['221.3'])}; mit Plaketten und Registereintrag sind es ${h.eur(A(h).min)} bis ${h.eur(A(h).max)}. Schilder und Versicherung kommen dazu. Ein online-Antrag ist nicht vorgesehen; der Antrag läuft am Schalter.`,
    faqs: (h) => [
      { q: 'Brauche ich für den Export in ein EU-Land ein Ausfuhrkennzeichen?', a: 'Nicht zwingend. Innerhalb der EU lassen viele Käufer das Auto mit einem Überführungskennzeichen ihres Landes abholen oder transportieren es auf einem Anhänger. Das Ausfuhrkennzeichen ist der deutsche Weg, mit eigener Kraft dauerhaft auszureisen, und wird in vielen Staaten akzeptiert. Ob das Zielland es anerkennt und wie dort die Zulassung abläuft, regelt dessen Recht.' },
      { q: 'Wo bekomme ich die Versicherung für das Ausfuhrkennzeichen?', a: 'Bei Versicherern, die Policen nach dem Gesetz über die Haftpflichtversicherung für ausländische Kraftfahrzeuge anbieten, oft über Schilderdienste an der Zulassungsstelle. Die Bestätigung folgt einem eigenen Muster und nennt das Ende des Versicherungsschutzes, das die Zulassungsbehörde übernimmt. Der Preis ist frei und hängt von Laufzeit und Fahrzeug ab; tragen Sie Ihr Angebot im Rechner ein.' },
      { q: 'Was passiert mit dem deutschen Fahrzeugbrief beim Export?', a: 'War das Auto zugelassen, zieht die Behörde die Zulassungsbescheinigung Teil I ein und schreibt Teil II fort; die alten Schilder werden entstempelt. Sie erhalten eine neue Teil I, die auf die Ausfuhr beschränkt ist und das Ablaufdatum trägt. Den Teil II brauchen Sie im Zielland für die Zulassung; geben Sie ihn mit dem Auto an den Käufer.' },
      { q: 'Wer kann ein Ausfuhrkennzeichen beantragen?', a: 'Der Halter selbst oder eine bevollmächtigte Person. Wer in Deutschland wohnt, geht zur Behörde des Wohnsitzes. Käufer aus dem Ausland ohne Wohnsitz in Deutschland wenden sich in der Regel an die Behörde, in deren Bezirk das Fahrzeug steht, und brauchen ihren Pass oder Ausweis. Manche Behörden verlangen bei ausländischen Käufern einen Kaufvertrag.' },
    ],
    body: (h) => `<h2>Was die Zulassungsbehörde berechnet</h2>
<p>Die Gebühr nach Nummer 221.3 ist der feste Teil. Dazu kommen kleine Posten, die je nach Fall anfallen. Die Tabelle zeigt sie einzeln, so wie der ${h.a('kosten', 'Kostenrechner')} sie aufschlüsselt.</p>
${posten(h)}
<p>Schilder kaufen Sie beim Schilderdienst. Für Ausfuhrkennzeichen haben sie ein eigenes Format mit rotem Feld, das nicht jeder Präger vorrätig hat; die Dienste an der Zulassungsstelle haben sie meist. Die Versicherung ist der größte Posten und hängt von der Laufzeit ab, die Sie selbst wählen.</p>
<!--mini:ausfuhr-->
<h2>Voraussetzungen</h2>
<p><strong>Versicherung.</strong> Eine Haftpflichtversicherung für ausländische Fahrzeuge mit Bestätigung nach Anlage 16 der Verordnung. Sie bestimmt die Laufzeit der Zulassung, die höchstens ${h.num(MAX(h))} Monate betragen darf.</p>
<p><strong>Hauptuntersuchung.</strong> Der nächste HU-Termin muss nach dem Ablaufdatum der Zulassung liegen. Läuft die HU vorher ab, ist sie vor der Zuteilung zu machen. Wer nur eine kurze Laufzeit wählt, kommt oft ohne neue HU aus.</p>
<p><strong>Fahrzeugdaten.</strong> Bei Pkw verlangt die Verordnung zusätzlich die vom Hersteller aufgebrachte Farbe. Halten Sie die Zulassungsbescheinigung Teil II oder die Übereinstimmungsbescheinigung bereit.</p>
<p><strong>Unterlagen.</strong> Ausweis oder Pass, beide Teile der Zulassungsbescheinigung, bei einem zugelassenen Fahrzeug die bisherigen Schilder zum Entstempeln, Versicherungsbestätigung und HU-Bericht. Für Bevollmächtigte eine schriftliche Vollmacht.</p>
<h2>Die Laufzeit richtig wählen</h2>
<p>Die Laufzeit legen Sie mit der Versicherung fest, nicht mit der Behörde. Rechnen Sie vom Tag der Zuteilung bis zur Ankunft im Zielland und zur dortigen Zulassung, und geben Sie Puffer für Wartezeiten an der Grenze, Werkstattbesuche unterwegs oder eine verzögerte Zulassung im Zielland. Eine längere Laufzeit kostet bei der Versicherung mehr, die Gebühr der Behörde bleibt gleich. Wer ein Auto über den Landweg in ein Nachbarland bringt, kommt oft mit einem Monat aus; für Fahrten in entfernte Staaten wählen viele mehrere Monate.</p>
<h2>Ablauf an der Zulassungsstelle</h2>
<p>Mit allen Unterlagen beantragen Sie das Kennzeichen am Schalter; das zuständige Amt finden Sie mit der ${h.a('home', 'Suche nach Ort oder Postleitzahl')}. Die Behörde prüft Versicherung und HU, teilt das Kennzeichen zu und stellt die auf die Ausfuhr beschränkte Zulassungsbescheinigung Teil I mit Ablaufdatum aus. Mit der Nummer lassen Sie die Schilder prägen, die Behörde stempelt sie. Auf Wunsch gibt es einen internationalen Zulassungsschein, der in Staaten außerhalb der EU hilft. Ab dann darf das Fahrzeug bis zum Ablaufdatum fahren, in Deutschland und auf dem Weg ins Ausland.</p>
<h2>Nach dem Ablaufdatum</h2>
<p>Ist das Datum erreicht, darf das Fahrzeug in Deutschland nicht mehr auf öffentlichen Straßen fahren. Die Zulassung endet von selbst, ohne Abmeldung. Steht das Auto dann noch hier, braucht es eine neue Zulassung oder ein ${h.a('kurzzeitkennzeichen', 'Kurzzeitkennzeichen')}. Die Behörde kann die Zulassung auch kürzer befristen oder mit Auflagen versehen, damit das Fahrzeug in angemessener Zeit ausreist.</p>
<h2>Ausfuhrkennzeichen oder Abmelden und Transport?</h2>
<p>Wer das Auto nicht selbst fährt, sondern per Lkw, Schiff oder Anhänger ins Ausland bringt, braucht kein Ausfuhrkennzeichen. Dann genügt es, das Fahrzeug ${h.a('auto-abmelden', 'abzumelden')}, und der Käufer lässt es im Zielland zu. Das Ausfuhrkennzeichen lohnt sich, wenn das Auto auf eigener Achse fahren soll und das Zielland es anerkennt. Für Exporte, die Umsatzsteuer betreffen, verlangt das Finanzamt einen Ausfuhrnachweis über den Zoll; das ist ein eigenes Verfahren und mit dem Kennzeichen nicht erledigt.</p>
<h2>Typische Fehler</h2>
<p>Erstens: die Laufzeit zu knapp gewählt. Ein Stau an der Grenze oder eine Panne, und das Datum ist vorbei. Zweitens: die HU übersehen, die vor dem Ablaufdatum endet; dann lehnt die Behörde ab. Drittens: das Kennzeichen mit einem Kurzzeitkennzeichen verwechselt, das nur ${h.num(h.P.fzv.kurzzeit_tage)} Tage gilt und im Ausland oft nicht anerkannt ist. Viertens: Teil II vergessen, den der Käufer im Zielland dringend braucht. Mit einem Blick in die Liste der Voraussetzungen und dem Rechner oben lässt sich das vermeiden.</p>`,
  },
  en: {
    slug: 'export-number-plate-germany',
    nav: 'Export plate',
    card: 'Exporting a car: insurance, validity of up to one year, fee, roadworthiness test, documents.',
    title: 'Ausfuhrkennzeichen: export number plates in Germany 2026',
    description: 'Export number plates in Germany for 2026: the GebOSt fee, export insurance, validity of up to one year, roadworthiness test, documents and who issues them.',
    h1: 'Export plates: taking a car abroad from Germany for good',
    intro: 'The car is sold and leaving the country, or you are moving abroad with it: that is what the export plate (Ausfuhrkennzeichen) with the red date field is for. What it costs, what the insurance requires and how long it lasts.',
    resume: (h) => `The export plate (Ausfuhrkennzeichen), often called an export or customs plate, is governed by section 45 of the vehicle registration ordinance (FZV). It is meant for vehicles driven under their own power to another country for good. The registration is limited to the term of the liability insurance, at most ${h.num(MAX(h))} months, and the roadworthiness test must be valid until the expiry date, otherwise it must be done first. The plate shows the district code, a number of up to four digits and one letter; the red field on the right shows the expiry date. You need an insurance confirmation for foreign vehicles, which not every insurer offers. The registration office’s fee under number 221.3 of the road traffic fee schedule (GebOSt), ${h.P.gebost_stand.en}, is ${h.eur(h.P.land['221.3'])}; with seals and the register entry it comes to ${h.eur(A(h).min)} to ${h.eur(A(h).max)}. Plates and insurance come on top. There is no online application; it is handled at the counter.`,
    faqs: (h) => [
      { q: 'Do I need an export plate to take a car to another EU country?', a: 'Not necessarily. Within the EU many buyers collect the car on a transfer plate from their own country or transport it on a trailer. The export plate is the German route for leaving permanently under the car’s own power and is accepted in many countries. Whether the destination recognises it, and how registration works there, is governed by that country’s law.' },
      { q: 'Where do I get insurance for a German export plate?', a: 'From insurers that offer policies under the act on liability insurance for foreign vehicles, often through plate makers at the registration office. The confirmation follows its own template and states when cover ends, which the registration office adopts. The price is set freely and depends on the term and the vehicle; enter your quote in the calculator.' },
      { q: 'What happens to the German registration papers on export?', a: 'If the car was registered, the office withdraws registration certificate part I and updates part II; the old plates are de-stamped. You receive a new part I restricted to export and showing the expiry date. You need part II for registration in the destination country, so hand it over to the buyer with the car.' },
      { q: 'Who can apply for an export plate?', a: 'The keeper or a person with power of attorney. If you live in Germany, go to the office for your home address. Buyers from abroad with no residence in Germany usually apply to the office in whose district the vehicle is located, with their passport or ID. Some offices ask foreign buyers for a sales contract.' },
    ],
    body: (h) => `<h2>What the registration office charges</h2>
<p>The fee under number 221.3 is the fixed part. Small items are added depending on the case. The table lists them one by one, as the ${h.a('kosten', 'fee calculator')} breaks them down.</p>
${posten(h)}
<p>You buy the plates from a plate maker. Export plates have their own format with a red field that not every maker stocks; those at the registration office usually do. Insurance is the largest item and depends on the term you choose.</p>
<!--mini:ausfuhr-->
<h2>Requirements</h2>
<p><strong>Insurance.</strong> Liability insurance for foreign vehicles with a confirmation under Annex 16 of the ordinance. It sets the term of the registration, which may be at most ${h.num(MAX(h))} months.</p>
<p><strong>Roadworthiness test.</strong> The next inspection date must fall after the registration expires. If the inspection runs out before then, it must be done before the plate is issued. A short term often avoids a new inspection.</p>
<p><strong>Vehicle data.</strong> For cars the ordinance also asks for the colour applied by the manufacturer. Have registration certificate part II or the certificate of conformity ready.</p>
<p><strong>Documents.</strong> ID or passport, both parts of the registration certificate, for a registered vehicle the current plates for de-stamping, the insurance confirmation and the inspection report. A written power of attorney if someone applies for you.</p>
<h2>Choosing the right term</h2>
<p>You set the term with the insurer, not with the office. Count from the day of allocation to arrival in the destination country and registration there, and add slack for border queues, garage stops on the way or a delayed registration abroad. A longer term costs more in insurance; the office fee stays the same. Taking a car overland to a neighbouring country often needs only one month; for trips to distant countries many people choose several months.</p>
<h2>The steps at the registration office</h2>
<p>With every document you apply at the counter; the ${h.a('home', 'search by town or postcode')} finds the right office. The office checks insurance and inspection, allocates the number and issues registration certificate part I restricted to export with its expiry date. With the number you have the plates made, and the office seals them. On request you also get an international registration certificate, which helps in countries outside the EU. From then on the vehicle may be driven until the expiry date, in Germany and on the way abroad.</p>
<h2>After the expiry date</h2>
<p>Once the date is reached, the vehicle may no longer be driven on public roads in Germany. The registration ends by itself, without deregistration. If the car is still here, it needs a new registration or a ${h.a('kurzzeitkennzeichen', 'short-term plate')}. The office may also set a shorter term or conditions so that the vehicle leaves within a reasonable time.</p>
<h2>Export plate, or deregister and transport?</h2>
<p>If the car is not driven but taken abroad by lorry, ship or trailer, no export plate is needed. It is enough to ${h.a('auto-abmelden', 'deregister')} it, and the buyer registers it in the destination country. The export plate is worth it when the car is to travel on its own wheels and the destination accepts it. For exports with VAT implications, the tax office requires proof of export through customs; that is a separate procedure, not settled by the plate.</p>
<h2>Common mistakes</h2>
<p>First, a term chosen too short. A queue at the border or a breakdown, and the date has passed. Second, overlooking an inspection that ends before the expiry date; the office will then refuse. Third, confusing the export plate with a short-term plate, which lasts only ${h.num(h.P.fzv.kurzzeit_tage)} days and is often not recognised abroad. Fourth, forgetting part II, which the buyer urgently needs in the destination country. A look at the requirements and the calculator above avoids all of this.</p>`,
  },
});
