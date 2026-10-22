import { defineGuide, type Helpers } from '../../lib/guide-types';

const J = (h: Helpers) => h.P.fzv.oldtimer_jahre;
const AN = (h: Helpers) => Number(h.today.slice(0, 4));
/** Années de première immatriculation qui deviennent éligibles cette année et les suivantes. */
function jahrgaenge(h: Helpers): string {
  const de = h.lang === 'de';
  const rows = Array.from({ length: 5 }, (_, i) => {
    const ez = AN(h) - J(h) + i;
    return [String(ez), String(ez + J(h)), i === 0 ? (de ? 'ab dem Jahrestag in diesem Jahr' : 'from the anniversary this year') : de ? `in ${h.num(i)} Jahr${i > 1 ? 'en' : ''}` : `in ${h.num(i)} year${i > 1 ? 's' : ''}`];
  });
  return h.table(de ? ['Erstzulassung', 'H-Kennzeichen frühestens', 'Ab heute'] : ['First registered', 'H plate at the earliest', 'From today'], rows,
    de ? `${h.num(J(h))} Jahre nach dem Tag der Erstzulassung (§ 2 Nr. 22 FZV); Stichtag ${h.date(h.today)}` : `${h.num(J(h))} years after the day of first registration (section 2 no. 22 FZV); as of ${h.date(h.today)}`, ['l', 'l', 'l']);
}
const ber = (h: Helpers) => h.P.lokal['11000'].posten.find((p) => p.id === 'historisch')!;

export default defineGuide({
  id: 'h-kennzeichen',
  group: 'kennzeichen',
  order: 6,
  mini: 'oldtimer',
  miniHref: 'kosten',
  related: ['kfz-kennzeichen', 'saisonkennzeichen', 'wunschkennzeichen', 'kosten', 'zulassungsstelle-berlin'],
  sources: ['fzv2', 'fzv10', 'kraftstg9', 'gebost', 'berlinZul'],
  de: {
    slug: 'h-kennzeichen',
    nav: 'H-Kennzeichen',
    card: 'Oldtimer: Alter, Gutachten, Gebühr, pauschale Steuer, Saison und Umweltzone.',
    title: 'H-Kennzeichen 2026: Voraussetzungen, Kosten und Kfz-Steuer',
    description: 'H-Kennzeichen 2026: ab wann ein Oldtimer es bekommt, Gutachten nach § 23 StVZO, Gebühr der Zulassung, pauschale Kfz-Steuer, Umweltzone und Saisonkennzeichen.',
    h1: 'H-Kennzeichen: was ein Oldtimer dafür braucht',
    intro: 'Alt genug, im Originalzustand, gepflegt: Dann kann ein Auto ein H-Kennzeichen tragen und zahlt eine feste Steuer. Was die Prüfung verlangt, was die Zulassung kostet und wann es sich rechnet.',
    resume: (h) => `Das H-Kennzeichen ist das Oldtimerkennzeichen nach § 10 Absatz 1 der Fahrzeug-Zulassungsverordnung: ein normales Kennzeichen mit dem Buchstaben H hinter der Erkennungsnummer. Es setzt ein Fahrzeug voraus, das nach § 2 Nummer 22 vor mindestens ${h.num(J(h))} Jahren erstmals in Verkehr gekommen ist, weitgehend dem Originalzustand entspricht, gut erhalten ist und der Pflege des kraftfahrzeugtechnischen Kulturguts dient. Das prüft ein Sachverständiger in einem Gutachten nach § 23 der Straßenverkehrs-Zulassungs-Ordnung; dessen Preis legt die Prüforganisation fest. Mit dem Gutachten teilt die Zulassungsbehörde das Kennzeichen zu, zur Gebühr nach der Gebührenordnung, ${h.P.gebost_stand.de}; Berlin nennt als günstigsten Fall ${h.eur(ber(h).betrag)}. Der Vorteil ist die Kfz-Steuer: nach § 9 des Kraftfahrzeugsteuergesetzes pauschal ${h.eur(h.P.kfzsteuer.oldtimer)} im Jahr für Pkw und ${h.eur(h.P.kfzsteuer.oldtimer_krad)} für Motorräder, unabhängig von Hubraum und Abgas. Dazu dürfen Fahrzeuge mit H-Kennzeichen in Umweltzonen fahren.`,
    faqs: (h) => [
      { q: 'Zählt für das H-Kennzeichen das Baujahr oder die Erstzulassung?', a: `Die Erstzulassung, genauer der Tag, an dem das Fahrzeug erstmals in Verkehr gekommen ist. Ein Auto, das im Herbst gebaut und im Frühjahr darauf zugelassen wurde, wird also erst ${h.num(J(h))} Jahre nach diesem Frühjahr Oldtimer. Die Behörde kann im Einzelfall Zeiten anrechnen, in denen das Fahrzeug vorher außerhalb des Straßenverkehrs in Betrieb war, etwa als Werksfahrzeug; das müssen Sie belegen.` },
      { q: 'Welche Umbauten verhindern ein H-Kennzeichen?', a: 'Alles, was den zeitgenössischen Charakter verändert und nicht innerhalb der ersten Jahre nach der Erstzulassung üblich war. Moderne Felgen, Tuning neueren Datums, geänderte Innenausstattung oder sichtbarer Rost können zur Ablehnung führen. Zeitgenössisches Zubehör aus der Bauzeit ist dagegen meist erlaubt. Sicherheitsrelevante Nachrüstungen wie Gurte sind kein Hindernis. Im Zweifel fragen Sie den Prüfer vorher.' },
      { q: 'Kann ich ein H-Kennzeichen mit einem Saisonkennzeichen verbinden?', a: 'Ja. Die Verordnung lässt das ausdrücklich zu: Der Betriebszeitraum steht dann hinter dem H. Für viele Oldtimer, die im Winter in der Garage stehen, ist das die günstigste Kombination, weil die pauschale Steuer anteilig nur für die Saison anfällt und auch die Versicherung oft weniger kostet. Die Saison muss mindestens zwei und höchstens elf Monate umfassen.' },
      { q: 'Lohnt sich das H-Kennzeichen auch für kleine Autos?', a: `Nicht immer. Die Pauschale von ${h.eur(h.P.kfzsteuer.oldtimer)} lohnt sich vor allem bei großen Motoren, die nach Hubraum und Schadstoffklasse teuer wären. Ein kleiner Wagen kann normal versteuert günstiger sein. Dann bleibt als Vorteil die Zufahrt zu Umweltzonen und oft eine günstige Oldtimerversicherung. Vergleichen Sie Ihren aktuellen Steuerbescheid mit der Pauschale, bevor Sie das Gutachten bezahlen.` },
    ],
    body: (h) => `<h2>Ab wann Ihr Auto in Frage kommt</h2>
<p>Die ${h.num(J(h))} Jahre laufen ab dem Tag der Erstzulassung, nicht ab dem Jahresbeginn. Die Tabelle zeigt, welche Jahrgänge in diesem Jahr dazukommen und welche in den nächsten Jahren folgen. Den Rechner für Ihr eigenes Fahrzeug finden Sie unter dem Zitierblock.</p>
${jahrgaenge(h)}
<p>Das Datum der Erstzulassung steht in Feld B der Zulassungsbescheinigung Teil I. Bei Importen zählt die erste Zulassung im Herkunftsland, die Sie mit alten Papieren belegen müssen.</p>
<h2>Das Gutachten nach § 23 StVZO</h2>
<p>Ein amtlich anerkannter Sachverständiger einer Prüforganisation prüft vier Punkte: das Alter, den weitgehenden Originalzustand, den guten Pflegezustand und die Einordnung als kraftfahrzeugtechnisches Kulturgut. Er sieht sich Karosserie, Motor, Fahrwerk und Innenraum an und vergleicht sie mit dem Auslieferungszustand und zeitgenössischen Änderungen. Oft wird das Gutachten zusammen mit der Hauptuntersuchung gemacht. Der Preis ist kein amtlicher Betrag; die Prüforganisation nennt ihn auf Anfrage.</p>
<h2>Was die Zulassung kostet</h2>
<p>Für die Zulassungsbehörde ist das H-Kennzeichen eine besondere Kennzeichenart, für die sie die Gebühr nach der Gebührenordnung erhebt. Neue Schilder sind nötig, weil das H dazukommt. Die Beträge je nach Fall:</p>
${h.table(['Fall', 'Gebühr', 'Mit Nebenposten, ohne Schilder'], [
  ['Zugelassenes Auto auf H umstellen', h.eur(h.M.berechne({ vorgang: 'kennzeichenart' }).gebuehr), `${h.eur(h.M.berechne({ vorgang: 'kennzeichenart' }).min)} – ${h.eur(h.M.berechne({ vorgang: 'kennzeichenart' }).max)}`],
  ['Umstellen mit Wunschkennzeichen', h.eur(h.M.berechne({ vorgang: 'kennzeichenart', wunsch: true }).gebuehr), `${h.eur(h.M.berechne({ vorgang: 'kennzeichenart', wunsch: true }).min)} – ${h.eur(h.M.berechne({ vorgang: 'kennzeichenart', wunsch: true }).max)}`],
  ['Abgemeldeten Oldtimer mit H zulassen', h.eur(h.M.berechne({ vorgang: 'gebraucht' }).gebuehr), `${h.eur(h.M.berechne({ vorgang: 'gebraucht' }).min)} – ${h.eur(h.M.berechne({ vorgang: 'gebraucht' }).max)}`],
  ['Dasselbe mit altem Fahrzeugbrief', h.eur(h.M.berechne({ vorgang: 'gebraucht', brief: true }).gebuehr), `${h.eur(h.M.berechne({ vorgang: 'gebraucht', brief: true }).min)} – ${h.eur(h.M.berechne({ vorgang: 'gebraucht', brief: true }).max)}`],
  [`Berlin, günstigster Fall (abgerufen ${h.date(h.P.lokal['11000'].abgerufen)})`, h.eur(ber(h).betrag), 'von der Stadt veröffentlicht'],
], `GebOSt ${h.P.gebost_stand.de}; Gutachten und Schilder kommen dazu`, ['l', 'r', 'r'])}
<p>Viele Oldtimer haben noch einen alten Fahrzeugbrief aus der Zeit vor der Zulassungsbescheinigung Teil II. Er wird bei der Zulassung umgetauscht, was den Zuschlag von ${h.eur(h.P.zuschlag.fahrzeugbrief)} erklärt. Bewahren Sie den alten Brief auf; die Behörde gibt ihn entwertet zurück, und für Sammler hat er Wert.</p>
<!--mini:oldtimer-->
<h2>Die Steuer: fest statt nach Hubraum</h2>
<p>Mit dem H-Kennzeichen setzt das Hauptzollamt die Kfz-Steuer nach § 9 des Kraftfahrzeugsteuergesetzes pauschal fest: ${h.eur(h.P.kfzsteuer.oldtimer)} im Jahr für Pkw und andere Fahrzeuge, ${h.eur(h.P.kfzsteuer.oldtimer_krad)} für Krafträder. Hubraum, Kraftstoff und Schadstoffklasse spielen keine Rolle mehr. Für einen großen Motor ohne Katalysator ist das oft ein Bruchteil der normalen Steuer, für einen kleinen Wagen mit Katalysator kann es mehr sein. Schauen Sie auf Ihren letzten Steuerbescheid, bevor Sie sich entscheiden.</p>
<h2>Umweltzone, Saison und rote Kennzeichen</h2>
<p>Fahrzeuge mit H-Kennzeichen sind von den Fahrverboten in Umweltzonen ausgenommen und brauchen keine Feinstaubplakette. Ein H-Kennzeichen lässt sich mit einem ${h.a('saisonkennzeichen', 'Saisonzeitraum')} verbinden, dann fällt auch die Pauschalsteuer nur anteilig an. Wer mehrere Oldtimer besitzt und sie selten fährt, kann bei der Behörde ein rotes Oldtimerkennzeichen beantragen, das für Fahrten zu Veranstaltungen, Prüfungen und Werkstätten an wechselnden Fahrzeugen genutzt wird; die Voraussetzungen legt die Behörde fest.</p>
<h2>Häufige Fehler</h2>
<p>Erstens: das Gutachten zu früh. Vor dem Jahrestag der Erstzulassung darf die Behörde kein H-Kennzeichen zuteilen, auch mit Gutachten nicht. Zweitens: Umbauten, die erst nach der Prüfung angebaut werden; dann erlischt die Grundlage, und bei einer Kontrolle droht Ärger. Drittens: das H-Kennzeichen als Freibrief für einen schlechten Zustand. Die Hauptuntersuchung gilt unverändert. Viertens: das Wunschkennzeichen zu lang gewählt, sodass mit dem H kein Platz bleibt; prüfen Sie das vor der ${h.a('wunschkennzeichen', 'Reservierung')}. Was die gesamte Zulassung mit Ihrem Fall kostet, rechnet der ${h.a('kosten', 'Kostenrechner')}.</p>`,
  },
  en: {
    slug: 'h-plate-classic-car-germany',
    nav: 'H plate',
    card: 'Classic cars: age, expert report, fee, flat-rate tax, seasons and low-emission zones.',
    title: 'H-Kennzeichen: classic car H plates in Germany, 2026 guide',
    description: 'H plates for classic cars in Germany: when a car qualifies, the StVZO expert report, registration fee, flat-rate vehicle tax, low-emission zones and seasons.',
    h1: 'The German H plate: what a classic car needs',
    intro: 'Old enough, close to original, well kept: then a car can carry an H plate (H-Kennzeichen) and pay a fixed tax. What the inspection asks for, what registration costs and when it pays off.',
    resume: (h) => `The H plate (H-Kennzeichen) is the classic-car plate under section 10(1) of the vehicle registration ordinance (FZV): an ordinary plate with the letter H after the registration number. Under section 2 no. 22 it requires a vehicle that first went into service at least ${h.num(J(h))} years ago, is largely in original condition, well preserved and serves to maintain automotive cultural heritage. An expert checks this in a report under section 23 of the road vehicle licensing regulations (StVZO); the testing organisation sets its price. With the report, the registration office allocates the plate for the fee under the road traffic fee schedule (GebOSt), ${h.P.gebost_stand.en}; Berlin quotes ${h.eur(ber(h).betrag)} as the cheapest case. The advantage is vehicle tax: under section 9 of the Motor Vehicle Tax Act, a flat ${h.eur(h.P.kfzsteuer.oldtimer)} a year for cars and ${h.eur(h.P.kfzsteuer.oldtimer_krad)} for motorcycles, whatever the engine size and emissions. Vehicles with an H plate may also enter low-emission zones.`,
    faqs: (h) => [
      { q: 'Does the H plate depend on the build year or first registration?', a: `On first registration, more precisely the day the vehicle first went into service. A car built in autumn and registered the following spring only becomes a classic ${h.num(J(h))} years after that spring. The office may, case by case, count earlier periods in which the vehicle was used off public roads, for example as a factory vehicle; you must prove this.` },
      { q: 'Which modifications rule out an H plate?', a: 'Anything that changes the period character and was not usual in the first years after registration. Modern wheels, recent tuning, a changed interior or visible rust can lead to refusal. Accessories from the period are usually allowed. Safety retrofits such as seat belts are no obstacle. If in doubt, ask the examiner beforehand.' },
      { q: 'Can I combine an H plate with a seasonal plate?', a: 'Yes. The ordinance expressly allows it: the operating period then follows the H. For many classic cars that spend the winter in a garage this is the cheapest combination, because the flat-rate tax is charged only for the season and insurance often costs less too. The season must cover at least two and at most eleven months.' },
      { q: 'Is an H plate worth it for a small car?', a: `Not always. The flat ${h.eur(h.P.kfzsteuer.oldtimer)} pays off mainly for large engines that would be expensive under engine size and emission class. A small car may be cheaper taxed normally. The remaining advantages are access to low-emission zones and often cheaper classic-car insurance. Compare your current tax assessment with the flat rate before paying for the report.` },
    ],
    body: (h) => `<h2>When your car qualifies</h2>
<p>The ${h.num(J(h))} years run from the day of first registration, not from the start of the year. The table shows which model years join this year and which follow in the coming years. The calculator for your own vehicle is below the summary.</p>
${jahrgaenge(h)}
<p>The date of first registration is in field B of registration certificate part I. For imports, the first registration in the country of origin counts, which you must prove with old papers.</p>
<h2>The section 23 StVZO report</h2>
<p>An officially recognised expert from a testing organisation checks four points: age, largely original condition, good state of preservation and status as automotive cultural heritage. They look at the body, engine, chassis and interior and compare them with the delivery condition and period modifications. The report is often done together with the roadworthiness test. Its price is not an official amount; the testing organisation quotes it on request.</p>
<h2>What registration costs</h2>
<p>For the registration office, the H plate is a special type of plate for which it charges the fee under the fee schedule. New plates are needed because the H is added. The amounts by case:</p>
${h.table(['Case', 'Fee', 'With small items, no plates'], [
  ['Switching a registered car to H', h.eur(h.M.berechne({ vorgang: 'kennzeichenart' }).gebuehr), `${h.eur(h.M.berechne({ vorgang: 'kennzeichenart' }).min)} – ${h.eur(h.M.berechne({ vorgang: 'kennzeichenart' }).max)}`],
  ['Switching with a personalised number', h.eur(h.M.berechne({ vorgang: 'kennzeichenart', wunsch: true }).gebuehr), `${h.eur(h.M.berechne({ vorgang: 'kennzeichenart', wunsch: true }).min)} – ${h.eur(h.M.berechne({ vorgang: 'kennzeichenart', wunsch: true }).max)}`],
  ['Registering a deregistered classic with H', h.eur(h.M.berechne({ vorgang: 'gebraucht' }).gebuehr), `${h.eur(h.M.berechne({ vorgang: 'gebraucht' }).min)} – ${h.eur(h.M.berechne({ vorgang: 'gebraucht' }).max)}`],
  ['The same with an old logbook', h.eur(h.M.berechne({ vorgang: 'gebraucht', brief: true }).gebuehr), `${h.eur(h.M.berechne({ vorgang: 'gebraucht', brief: true }).min)} – ${h.eur(h.M.berechne({ vorgang: 'gebraucht', brief: true }).max)}`],
  [`Berlin, cheapest case (retrieved ${h.date(h.P.lokal['11000'].abgerufen)})`, h.eur(ber(h).betrag), 'published by the city'],
], `GebOSt ${h.P.gebost_stand.en}; report and plates come on top`, ['l', 'r', 'r'])}
<p>Many classic cars still have an old logbook (Fahrzeugbrief) from before registration certificate part II. It is exchanged at registration, which explains the ${h.eur(h.P.zuschlag.fahrzeugbrief)} surcharge. Keep the old logbook; the office returns it cancelled, and collectors value it.</p>
<!--mini:oldtimer-->
<h2>Tax: fixed instead of by engine size</h2>
<p>With an H plate, the customs office sets vehicle tax as a flat rate under section 9 of the Motor Vehicle Tax Act: ${h.eur(h.P.kfzsteuer.oldtimer)} a year for cars and other vehicles, ${h.eur(h.P.kfzsteuer.oldtimer_krad)} for motorcycles. Engine size, fuel and emission class no longer matter. For a large engine without a catalytic converter that is often a fraction of the normal tax; for a small car with a converter it can be more. Look at your last tax assessment before deciding.</p>
<h2>Low-emission zones, seasons and red plates</h2>
<p>Vehicles with an H plate are exempt from driving bans in low-emission zones and need no emissions sticker. An H plate can be combined with a ${h.a('saisonkennzeichen', 'seasonal period')}, in which case the flat tax is also charged only pro rata. If you own several classics and drive them rarely, you can apply to the office for a red classic-car plate used on changing vehicles for trips to events, inspections and workshops; the office sets the conditions.</p>
<h2>Common mistakes</h2>
<p>First, getting the report too early. Before the anniversary of first registration the office may not allocate an H plate, even with a report. Second, modifications fitted after the inspection; the basis then lapses, and a roadside check can mean trouble. Third, treating the H plate as a pass for poor condition. The roadworthiness test applies unchanged. Fourth, choosing a personalised number so long that the H no longer fits; check this before the ${h.a('wunschkennzeichen', 'reservation')}. The ${h.a('kosten', 'fee calculator')} works out the whole registration for your case.</p>`,
  },
});
