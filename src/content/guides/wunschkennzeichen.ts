import { defineGuide, type Helpers } from '../../lib/guide-types';
import type { VorgangId } from '../../lib/engine/gebuehren';
import { VORGANG_TEXT } from '../../lib/vorgaenge-text';

/** Unterscheidungszeichen nach Länge (KBA) : plus le code est court, plus il reste de place. */
function laengen(h: Helpers): string {
  const de = h.lang === 'de';
  const by = new Map<number, string[]>();
  for (const c of Object.keys(h.Z.KENNZEICHEN)) { const l = c.length; if (!by.has(l)) by.set(l, []); by.get(l)!.push(c); }
  const rows = [...by.entries()].sort((a, b) => a[0] - b[0]).map(([l, cs]) => [
    de ? `${l === 1 ? 'Ein' : l === 2 ? 'Zwei' : 'Drei'} Buchstabe${l > 1 ? 'n' : ''}` : `${l === 1 ? 'One' : l === 2 ? 'Two' : 'Three'} letter${l > 1 ? 's' : ''}`,
    h.num(cs.length), cs.sort().slice(0, 6).join(', '),
  ]);
  return h.table(de ? ['Kürzel', 'Anzahl', 'Beispiele'] : ['District code', 'Number', 'Examples'], rows,
    de ? `Unterscheidungszeichen im Verzeichnis des Kraftfahrt-Bundesamts, Stand ${h.Z.avStand('de')}` : `District codes in the Federal Motor Transport Authority directory, ${h.Z.avStand('en')}`, ['l', 'r', 'l']);
}
const IDS: VorgangId[] = ['neu', 'gebraucht', 'umzugNeu', 'umschreibungNeu'];
function preise(h: Helpers): string {
  const de = h.lang === 'de';
  const rows = IDS.map((v) => {
    const o = h.M.berechne({ vorgang: v }), w = h.M.berechne({ vorgang: v, wunsch: true }), r = h.M.berechne({ vorgang: v, wunsch: true, reservierung: true });
    return [VORGANG_TEXT[v][h.lang], h.eur(o.gebuehr), h.eur(w.gebuehr), h.eur(r.gebuehr)];
  });
  return h.table(de ? ['Anlass', 'Ohne Wunsch', 'Wunsch am Schalter', 'Wunsch vorab reserviert'] : ['Occasion', 'No personalised number', 'Chosen at the counter', 'Reserved in advance'], rows,
    de ? `Gebühr vor Ort mit Zuschlägen, GebOSt ${h.P.gebost_stand.de}` : `Fee in person with surcharges, GebOSt ${h.P.gebost_stand.en}`, ['l', 'r', 'r', 'r']);
}
/** Combinaisons théoriques d'une Erkennungsnummer (Anlage 1 FZV : 26 lettres sans umlaut, 1 à 9 999). */
const kombis = () => (26 + 26 * 26) * 9999;
const W = (h: Helpers) => h.P.zuschlag.wunsch;
const R = (h: Helpers) => h.P.land['230'];

export default defineGuide({
  id: 'wunschkennzeichen',
  group: 'kennzeichen',
  order: 2,
  mini: 'wunsch',
  miniHref: 'kosten',
  related: ['wunschkennzeichen-reservieren', 'kfz-kennzeichen', 'kosten', 'auto-anmelden-kosten', 'h-kennzeichen'],
  sources: ['gebost', 'fzv9', 'fzvAnl1', 'kbaAv'],
  de: {
    slug: 'wunschkennzeichen',
    nav: 'Wunschkennzeichen',
    card: 'Was erlaubt ist, was es kostet, welche Kombinationen gesperrt sind und wie man sie findet.',
    title: 'Wunschkennzeichen 2026: Kosten, Regeln und Kombinationen',
    description: 'Wunschkennzeichen 2026: Aufpreis nach GebOSt, Reservierung, erlaubte Buchstaben und Zahlen, gesperrte Kombinationen und Tipps, um freie Nummern zu finden.',
    h1: 'Wunschkennzeichen: was erlaubt ist und was es kostet',
    intro: 'Initialen, ein Geburtsjahr, eine Lieblingszahl: Ein Wunschkennzeichen ist der einzige Teil der Zulassung, bei dem Sie mitreden. Die Regeln dafür sind einfacher, als viele Portale tun.',
    resume: (h) => `Ein Wunschkennzeichen ist eine selbst gewählte Erkennungsnummer hinter dem Kürzel des Zulassungsbezirks. Nach § 9 der Fahrzeug-Zulassungsverordnung besteht das Kennzeichen aus dem Unterscheidungszeichen mit einem bis drei Buchstaben und der Erkennungsnummer, die nach Anlage 1 aus einem oder zwei Buchstaben ohne Umlaute und einer Zahl aus bis zu vier Ziffern besteht. Die Kombination darf nicht gegen die guten Sitten verstoßen; viele Behörden sperren deshalb Buchstabenfolgen mit Bezug zum Nationalsozialismus. Der Aufpreis ist bundesweit gleich: Die Gebührenordnung, ${h.P.gebost_stand.de}, setzt für die Zuteilung eines Wunschkennzeichens ${h.eur(W(h))} an, für eine Reservierung vorab nach Nummer 230 weitere ${h.eur(R(h))}. Eine Neuzulassung mit reserviertem Wunschkennzeichen kostet am Schalter damit ${h.eur(h.M.berechne({ vorgang: 'neu', wunsch: true, reservierung: true }).gebuehr)} statt ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)}. Das Kürzel selbst können Sie nur wählen, wenn Ihr Bezirk mehrere führt; zuständig bleibt der Wohnort.`,
    faqs: (h) => [
      { q: 'Welche Kombinationen sind beim Wunschkennzeichen verboten?', a: 'Verboten ist, was gegen die guten Sitten verstößt, so § 9 der Fahrzeug-Zulassungsverordnung. Die meisten Behörden sperren deshalb Buchstabenfolgen wie KZ, NS, SA, SS und HJ sowie Zahlen, die als Code für verfassungsfeindliche Inhalte gelten. Die genaue Liste führt jede Behörde selbst, weshalb dieselbe Kombination in einem Kreis frei und im Nachbarkreis gesperrt sein kann. Umlaute sind nie zulässig.' },
      { q: 'Kann ich mein Wunschkennzeichen bei einem Umzug mitnehmen?', a: `Ja, sofern Sie das Kennzeichen behalten wollen und das Auto ummelden: Seit der Kennzeichenmitnahme darf das bisherige Kennzeichen auch im neuen Kreis bleiben, ohne neuen Aufpreis. Die Ummeldung mit Mitnahme kostet nach Nummer 221.9 ${h.eur(h.P.land['221.9'])}. Wer im neuen Kreis ein neues Wunschkennzeichen möchte, zahlt den Zuschlag von ${h.eur(W(h))} erneut.` },
      { q: 'Wie viele Kombinationen gibt es für ein Kürzel?', a: `Rechnerisch erlaubt Anlage 1 der Fahrzeug-Zulassungsverordnung ${h.num(kombis())} Erkennungsnummern je Kürzel: jeder der ${h.num(26)} Buchstaben allein oder als Paar, mit einer Zahl bis ${h.num(9999)}. In der Praxis sind es weniger, weil lange Kürzel nicht jede Länge zulassen, gesperrte Folgen entfallen und viele Nummern schon vergeben sind.` },
      { q: 'Gibt es Wunschkennzeichen auch für Motorräder und Anhänger?', a: 'Ja, der Aufpreis ist derselbe. Bei Motorrädern ist das Schild kleiner, und manche Behörden lassen dort nur kürzere Kombinationen zu, damit sie lesbar bleiben. Für Anhänger gilt dasselbe Verfahren wie für Autos. Auch Saison-, H- und E-Kennzeichen lassen sich als Wunschkennzeichen zuteilen; die Endung H oder E verbraucht dann Platz auf dem Schild.' },
    ],
    body: (h) => `<h2>Was das Wunschkennzeichen kostet</h2>
<p>Der Aufpreis hängt nicht vom Anlass ab, sondern kommt zu jeder Zulassung dazu, bei der ein neues Kennzeichen zugeteilt wird. Die Tabelle rechnet die vier häufigsten Fälle durch. Schilder sind nicht enthalten; sie kosten mit Wunschkennzeichen nichts anderes als ohne.</p>
${preise(h)}
<p>Bei einer Ummeldung mit Kennzeichenmitnahme und bei einer Umschreibung, bei der das Kennzeichen bleibt, fällt kein Zuschlag an, weil kein neues Kennzeichen zugeteilt wird. Online gilt derselbe Aufpreis, den der Rechner unten ebenfalls zeigt.</p>
<h2>Woraus ein Kennzeichen besteht</h2>
<p>Das Kennzeichen hat zwei Teile. Vorne steht das Unterscheidungszeichen des Bezirks, das das Bundesministerium für Verkehr auf Antrag der Länder festlegt; es hat einen bis drei Buchstaben. Dahinter folgt die Erkennungsnummer: nach Anlage 1 der Verordnung ein oder zwei Buchstaben und eine Zahl aus einer bis vier Ziffern, ohne führende Null. Umlaute sind ausgeschlossen. Wählen können Sie nur die Erkennungsnummer, nicht das Kürzel, es sei denn, Ihr Bezirk führt mehrere.</p>
${laengen(h)}
<p>Ein kurzes Kürzel lässt mehr Platz. Wer in einem Bezirk mit einem Buchstaben wohnt, kann zwei Buchstaben und vier Ziffern kombinieren, wo bei drei Buchstaben im Kürzel die Länge des Schilds früher Grenzen setzt. Rechnerisch gibt es je Kürzel ${h.num(kombis())} Erkennungsnummern; welche davon frei sind, zeigt nur das Portal Ihrer Behörde. Welcher Kreis hinter welchem Kürzel steht, verrät die ${h.a('kfz-kennzeichen', 'Kennzeichensuche')}.</p>
<h2>Gesperrte und begehrte Kombinationen</h2>
<p>Die Verordnung verbietet Kombinationen, die gegen die guten Sitten verstoßen, und überlässt die Auslegung den Behörden. Üblich sind Sperren für Abkürzungen nationalsozialistischer Organisationen und für Zahlencodes aus der rechtsextremen Szene, oft in Verbindung mit bestimmten Kürzeln. Daneben halten viele Behörden kurze Nummern zurück, etwa für Behördenfahrzeuge. Begehrt sind Initialen mit Geburtsjahr und Kombinationen, die mit dem Kürzel ein Wort ergeben. Je kürzer und je runder die Nummer, desto eher ist sie vergeben.</p>
<!--mini:wunsch-->
<h2>Wunschkennzeichen und besondere Kennzeichen</h2>
<p>Das Wunschkennzeichen lässt sich mit fast jeder Kennzeichenart kombinieren. Bei einem ${h.a('h-kennzeichen', 'H-Kennzeichen')} für Oldtimer oder einem E-Kennzeichen für Elektroautos steht der Kennbuchstabe am Ende und verbraucht Platz. Bei einem ${h.a('saisonkennzeichen', 'Saisonkennzeichen')} kommt rechts das Feld mit den Monaten dazu, das ebenfalls Raum braucht. Ein Wechselkennzeichen für zwei Fahrzeuge teilt sich alle Zeichen bis auf die letzte Ziffer; wer es sich wünscht, wählt also eine Nummer, deren letzte Stelle zweimal frei ist. Für Kurzzeit- und Ausfuhrkennzeichen gibt es keine Wunschnummer.</p>
<h2>So gehen Sie vor</h2>
<p>Erstens: Klären Sie, welche Behörde zuständig ist; die ${h.a('home', 'Suche nach Ort oder Postleitzahl')} nennt sie. Zweitens: Prüfen Sie im Portal dieser Behörde, ob Ihre Kombination frei ist, und reservieren Sie sie; wie das genau geht, beschreibt die Seite ${h.a('wunschkennzeichen-reservieren', 'Wunschkennzeichen reservieren')}. Drittens: Lassen Sie die Schilder mit der Reservierungsbestätigung schon vorab prägen. Viertens: Nennen Sie die Reservierungsnummer beim Termin oder im Online-Antrag. Ohne Reservierung können Sie am Schalter fragen, ob eine Nummer frei ist; dann zahlen Sie nur den Wunschzuschlag, gehen aber das Risiko ein, dass die Nummer weg ist.</p>
<h2>Drei Irrtümer</h2>
<p>Ein Wunschkennzeichen gehört nicht Ihnen, sondern ist an das Fahrzeug zugeteilt; wird das Auto abgemeldet und die Nummer nicht reserviert, ist sie nach Ablauf der Sperrfrist wieder frei. Es kostet keinen jährlichen Aufschlag; der Zuschlag fällt nur bei der Zuteilung an. Und private Anbieter, die Wunschkennzeichen gegen Gebühr reservieren, haben keinen besseren Zugang als Sie: Sie nutzen dasselbe Portal der Behörde und berechnen ihren eigenen Service zusätzlich. Was die ganze Zulassung mit allen Posten kostet, zeigt der ${h.a('kosten', 'Kostenrechner')}.</p>`,
  },
  en: {
    slug: 'personalised-number-plate-germany',
    nav: 'Personalised plate',
    card: 'What is allowed, what it costs, which combinations are blocked and how to find a free one.',
    title: 'Wunschkennzeichen: personalised number plates in Germany',
    description: 'Personalised number plates in Germany for 2026: GebOSt surcharge, reservation, allowed letters and digits, blocked combinations and how to find a free one.',
    h1: 'Personalised number plates in Germany: rules and costs',
    intro: 'Initials, a birth year, a lucky number: a personalised plate (Wunschkennzeichen) is the one part of registration where you get a say. The rules are simpler than many portals make out.',
    resume: (h) => `A personalised number plate (Wunschkennzeichen) is a registration number you choose yourself after your district’s code. Under section 9 of the vehicle registration ordinance (FZV), a German plate consists of the district code of one to three letters and a registration number which, under Annex 1, has one or two letters without umlauts and a number of up to four digits. The combination must not offend public decency, so many offices block letter sequences linked to National Socialism. The surcharge is the same nationwide: the road traffic fee schedule (GebOSt), ${h.P.gebost_stand.en}, charges ${h.eur(W(h))} for allocating a personalised number and a further ${h.eur(R(h))} under number 230 for reserving it in advance. A new registration with a reserved personalised number therefore costs ${h.eur(h.M.berechne({ vorgang: 'neu', wunsch: true, reservierung: true }).gebuehr)} at the counter instead of ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)}. You can only choose the district code itself if your district has more than one; your home address still decides the office.`,
    faqs: (h) => [
      { q: 'Which personalised plate combinations are banned in Germany?', a: 'Anything that offends public decency, says section 9 of the vehicle registration ordinance. Most offices therefore block sequences such as KZ, NS, SA, SS and HJ, as well as numbers regarded as codes for anti-constitutional content. Each office keeps its own list, which is why a combination may be free in one district and blocked next door. Umlauts are never allowed.' },
      { q: 'Can I keep my personalised plate when I move?', a: `Yes, if you keep your number and re-register the car: since plate portability was introduced, the old number may stay in the new district at no new surcharge. Re-registering while keeping the plate costs ${h.eur(h.P.land['221.9'])} under number 221.9. If you want a new personalised number in the new district, you pay the ${h.eur(W(h))} surcharge again.` },
      { q: 'How many combinations exist for one district code?', a: `On paper, Annex 1 of the vehicle registration ordinance allows ${h.num(kombis())} registration numbers per code: each of the ${h.num(26)} letters alone or as a pair, with a number up to ${h.num(9999)}. In practice there are fewer, because long district codes do not allow every length, blocked sequences drop out and many numbers are already taken.` },
      { q: 'Can motorcycles and trailers have personalised plates too?', a: 'Yes, with the same surcharge. Motorcycle plates are smaller, and some offices only allow shorter combinations there so they stay legible. Trailers follow the same procedure as cars. Seasonal, H and E plates can also be personalised; the H or E suffix then takes up space on the plate.' },
    ],
    body: (h) => `<h2>What a personalised plate costs</h2>
<p>The surcharge does not depend on the occasion; it is added to any registration where a new number is allocated. The table works through the four most common cases. Plates are not included; with a personalised number they cost no more than without.</p>
${preise(h)}
<p>Re-registering while keeping your plate, and a transfer in which the plate stays, carry no surcharge because no new number is allocated. The same surcharge applies online, which the calculator below also shows.</p>
<h2>What a German plate is made of</h2>
<p>A plate has two parts. First comes the district code, set by the Federal Ministry for Transport at the request of the states; it has one to three letters. Then follows the registration number: under Annex 1 of the ordinance, one or two letters and a number of one to four digits, with no leading zero. Umlauts are excluded. You can only choose the registration number, not the district code, unless your district has several.</p>
${laengen(h)}
<p>A short code leaves more room. Someone living in a district with a one-letter code can combine two letters and four digits, whereas a three-letter code hits the length of the plate sooner. On paper each code has ${h.num(kombis())} registration numbers; only your office’s portal shows which are free. Which district stands behind which code is shown by the ${h.a('kfz-kennzeichen', 'plate code search')}.</p>
<h2>Blocked and sought-after combinations</h2>
<p>The ordinance bans combinations that offend public decency and leaves the interpretation to the offices. Common blocks cover abbreviations of Nazi organisations and number codes used by the far right, often in combination with particular district codes. Many offices also hold back short numbers, for example for official vehicles. Initials with a birth year and combinations that form a word together with the district code are popular. The shorter and rounder the number, the likelier it is taken.</p>
<!--mini:wunsch-->
<h2>Personalised numbers and special plates</h2>
<p>A personalised number works with almost every type of plate. On an ${h.a('h-kennzeichen', 'H plate')} for classic cars or an E plate for electric cars, the letter goes at the end and takes up space. A ${h.a('saisonkennzeichen', 'seasonal plate')} adds the month field on the right, which also needs room. An interchangeable plate for two vehicles shares every character except the last digit, so if you want one, choose a number whose final digit is free twice. Short-term and export plates cannot be personalised.</p>
<h2>How to go about it</h2>
<p>First, establish which office is responsible; the ${h.a('home', 'search by town or postcode')} names it. Second, check in that office’s portal whether your combination is free and reserve it; the page on ${h.a('wunschkennzeichen-reservieren', 'reserving a personalised plate')} explains exactly how. Third, have the plates made in advance with the reservation confirmation. Fourth, quote the reservation number at your appointment or in the online application. Without a reservation you can ask at the counter whether a number is free; you then pay only the personalised surcharge but risk the number being gone.</p>
<h2>Three misconceptions</h2>
<p>A personalised number is not yours; it is allocated to the vehicle, and if the car is deregistered without reserving the number, it becomes free again once the holding period ends. There is no yearly charge; the surcharge is paid only at allocation. And private services that reserve personalised plates for a fee have no better access than you: they use the same office portal and add their own service charge. The ${h.a('kosten', 'fee calculator')} shows what the whole registration costs with every item.</p>`,
  },
});
