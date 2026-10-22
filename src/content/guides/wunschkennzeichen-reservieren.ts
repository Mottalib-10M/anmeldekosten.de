import { defineGuide, type Helpers } from '../../lib/guide-types';

/** Hauptstellen nach DV-Verfahren (Spalte des KBA-Verzeichnisses) : explique pourquoi les portails diffèrent. */
function verfahren(h: Helpers): string {
  const de = h.lang === 'de';
  const c = new Map<string, number>();
  for (const s of h.Z.STELLEN) if (s.art === 'haupt' && s.dv) c.set(s.dv, (c.get(s.dv) ?? 0) + 1);
  const tot = [...c.values()].reduce((a, b) => a + b, 0);
  const rows = [...c.entries()].sort((a, b) => b[1] - a[1]).map(([k, n]) => [k.replace(/[.-]$/, ''), h.num(n), h.pct(n / tot, 0)]);
  return h.table(de ? ['Kennung des Verfahrens', 'Hauptstellen', 'Anteil'] : ['Software code', 'Main offices', 'Share'], rows,
    de ? `Spalte „DV-Verfahren“ im Anschriftenverzeichnis des Kraftfahrt-Bundesamts, Stand ${h.Z.avStand('de')}` : `“DV-Verfahren” column of the Federal Motor Transport Authority directory, ${h.Z.avStand('en')}`, ['l', 'r', 'r']);
}
const R = (h: Helpers) => h.P.land['230'];
const W = (h: Helpers) => h.P.zuschlag.wunsch;
const RM = (h: Helpers) => h.P.fzv.reservierung_monate;

export default defineGuide({
  id: 'wunschkennzeichen-reservieren',
  group: 'kennzeichen',
  order: 3,
  mini: 'wunsch',
  miniHref: 'kosten',
  related: ['wunschkennzeichen', 'auto-online-anmelden', 'auto-abmelden', 'zulassungsstelle-termin', 'kfz-kennzeichen'],
  sources: ['gebost', 'fzv9', 'fzv16', 'kbaAv'],
  de: {
    slug: 'wunschkennzeichen-reservieren',
    nav: 'Kennzeichen reservieren',
    card: 'Online reservieren, Gebühr, Frist, Schilder vorab prägen, Reservierung beim Abmelden.',
    title: 'Wunschkennzeichen reservieren 2026: online, Gebühr und Frist',
    description: 'Wunschkennzeichen reservieren: Portal der Zulassungsstelle, Gebühr nach GebOSt, wie lange sie hält, Schilder vorab prägen, Kennzeichen beim Abmelden sichern.',
    h1: 'Wunschkennzeichen reservieren: online in fünf Minuten',
    intro: 'Wer ein Wunschkennzeichen will, reserviert es am besten vor dem Termin. Das geht online bei Ihrer Zulassungsstelle, kostet wenig und spart am Schalter einen Gang.',
    resume: (h) => `Ein Wunschkennzeichen reservieren Sie im Online-Portal der Zulassungsbehörde, die für Ihren Wohnsitz zuständig ist; private Reservierungsseiten greifen auf dieselben Portale zu und berechnen ihren Service zusätzlich. Sie geben das Kürzel Ihres Bezirks, die gewünschte Kombination und Ihren Namen ein, sehen sofort, ob sie frei ist, und erhalten eine Reservierungsbestätigung. Die Gebührenordnung, ${h.P.gebost_stand.de}, setzt für die Reservierung nach Nummer 230 ${h.eur(R(h))} an; der Zuschlag für das Wunschkennzeichen von ${h.eur(W(h))} wird erst bei der Zulassung fällig. Wie lange eine Reservierung hält, legt jede Behörde selbst fest; nach Ablauf wird die Nummer wieder frei. Anders bei der Abmeldung: Dort lässt sich das bisherige Kennzeichen für bis zu ${h.num(RM(h))} Monate reservieren, damit dasselbe Fahrzeug es bei der Wiederzulassung zurückbekommt. Die Schilder können Sie mit der Bestätigung schon vorher prägen lassen.`,
    faqs: (h) => [
      { q: 'Wie lange hält die Reservierung eines Wunschkennzeichens?', a: 'Eine bundesweite Frist gibt es nicht; jede Behörde legt sie fest, und das Portal nennt das Ablaufdatum in der Bestätigung. Wer bis dahin nicht zulässt, verliert die Reservierung, und die Nummer geht zurück in den Bestand. Manche Behörden erlauben, eine Reservierung einmal zu verlängern oder neu anzulegen, wenn die Nummer noch frei ist; die Gebühr fällt dann erneut an.' },
      { q: 'Kann ich ein Wunschkennzeichen für jemand anderen reservieren?', a: 'Ja, in den meisten Portalen gibt man den Namen des späteren Halters ein, nicht den des Reservierenden. Bei der Zulassung muss die Person, auf die das Fahrzeug kommt, mit der Reservierung übereinstimmen. Wer ein Kennzeichen als Geschenk reserviert, sollte den Namen genau so schreiben wie im Ausweis des Beschenkten, sonst kann die Behörde die Reservierung ablehnen.' },
      { q: 'Muss ich die Reservierungsgebühr sofort bezahlen?', a: `Das hängt vom Portal ab. Bei vielen Behörden ist die Reservierung zunächst kostenlos, und die ${h.eur(R(h))} werden erst mit der Zulassung abgerechnet; andere verlangen die Zahlung online gleich bei der Reservierung. Wird die Reservierung nicht genutzt, wird die Gebühr in der Regel nicht erstattet, wenn sie schon bezahlt ist. Der Wunschzuschlag kommt immer erst am Schalter.` },
      { q: 'Kann ich ein reserviertes Kennzeichen wieder freigeben?', a: 'Ja. Viele Portale haben eine Funktion zum Stornieren mit der Reservierungsnummer; sonst genügt eine kurze Nachricht an die Behörde. Das lohnt sich, wenn Sie mehrere Kombinationen reserviert haben und sich für eine entschieden haben, denn so werden die anderen für andere frei. Eine Pflicht zur Freigabe gibt es nicht; ungenutzte Reservierungen verfallen von selbst.' },
    ],
    body: (h) => `<h2>Schritt für Schritt</h2>
<p><strong>Zuständige Behörde finden.</strong> Reservieren können Sie nur bei der Behörde, die später auch zulässt, also an Ihrem Hauptwohnsitz. Die ${h.a('home', 'Suche nach Ort oder Postleitzahl')} nennt sie mit dem Kürzel, das Ihr Bezirk vergibt.</p>
<p><strong>Portal öffnen.</strong> Die Website des Kreises oder der Stadt verlinkt das Reservierungsportal, meist unter „Wunschkennzeichen“. Ein Konto braucht es nicht.</p>
<p><strong>Kombination prüfen.</strong> Sie wählen das Kürzel, wenn der Bezirk mehrere führt, und geben Buchstaben und Zahl ein. Das Portal zeigt sofort, ob die Kombination frei, vergeben oder gesperrt ist. Viele Portale schlagen freie Nachbarn vor.</p>
<p><strong>Reservieren.</strong> Name und Anschrift des späteren Halters eintragen, Reservierung bestätigen, Bestätigung als PDF speichern oder ausdrucken. Darin stehen Kennzeichen, Reservierungsnummer und Ablaufdatum.</p>
<p><strong>Schilder prägen lassen.</strong> Mit der Bestätigung prägt jeder Schilderdienst die Schilder vorab. Am Schalter werden sie dann nur noch gestempelt.</p>
<p><strong>Zulassen.</strong> Am Termin oder im ${h.a('auto-online-anmelden', 'Online-Antrag')} die Reservierungsnummer angeben. Erst jetzt fallen Wunschzuschlag und Reservierungsgebühr an.</p>
<h2>Was die Reservierung kostet</h2>
${h.table(['Posten', 'GebOSt', 'Betrag', 'Fällig'], [
  ['Reservierung', 'Nr. 230', h.eur(R(h)), 'je nach Portal sofort oder bei der Zulassung'],
  ['Zuschlag Wunschkennzeichen', 'Nr. 221', h.eur(W(h)), 'bei der Zulassung'],
  ['Neuzulassung mit beidem, vor Ort', 'Nr. 221.1', h.eur(h.M.berechne({ vorgang: 'neu', wunsch: true, reservierung: true }).gebuehr), 'bei der Zulassung'],
  ['Neuzulassung mit beidem, online', 'Nr. 221.1.1', h.eur(h.M.berechne({ vorgang: 'neu', online: true, wunsch: true, reservierung: true }).gebuehr), 'im Portal'],
], `GebOSt ${h.P.gebost_stand.de}`, ['l', 'l', 'r', 'l'])}
<p>Wer ohne Reservierung zum Termin geht und dort eine freie Wunschnummer wählt, spart die Reservierungsgebühr, riskiert aber, dass die Nummer weg ist, und muss die Schilder nach der Zuteilung prägen lassen. Bei knappen Terminen ist das der teurere Weg, weil er Zeit kostet.</p>
<!--mini:wunsch-->
<h2>Warum jedes Portal anders aussieht</h2>
<p>Die Zulassungsbehörden arbeiten mit Fachverfahren weniger Softwareanbieter, und das Reservierungsportal gehört zum Verfahren. Das Anschriftenverzeichnis des Kraftfahrt-Bundesamts nennt für jede Stelle die Kennung ihres Verfahrens. Die Verteilung zeigt, dass fast alle Hauptstellen eines von vier Verfahren nutzen; wer ein Portal kennt, findet sich in den anderen desselben Verfahrens sofort zurecht.</p>
${verfahren(h)}
<p>Die Kennungen sind so wiedergegeben, wie das Verzeichnis sie kürzt. Für Sie zählt nur, dass Sie das Portal Ihrer eigenen Behörde nutzen; eine Reservierung im Portal eines anderen Kreises gilt dort nicht.</p>
<h2>Das Kennzeichen beim Abmelden sichern</h2>
<p>Ein zweiter Weg zur Reservierung führt über die Abmeldung. Wer ein Fahrzeug außer Betrieb setzt, etwa über den Winter oder für eine längere Reparatur, kann das bisherige Kennzeichen für ${h.eur(R(h))} reservieren lassen, für bis zu ${h.num(RM(h))} Monate. Bei der Wiederzulassung desselben Fahrzeugs kommen dieselben Schilder wieder dran, und es entfällt die Neuprägung. Für ein anderes Fahrzeug lässt sich so ein Kennzeichen in vielen Kreisen ebenfalls übernehmen, wenn die Behörde zustimmt. Mehr dazu unter ${h.a('auto-abmelden', 'Auto abmelden')}.</p>
<h2>Fehler, die eine Reservierung kosten</h2>
<p>Am häufigsten verfällt eine Reservierung, weil der Termin bei der Zulassungsstelle später liegt als ihr Ablaufdatum. Prüfen Sie deshalb erst, ob Sie einen ${h.a('zulassungsstelle-termin', 'Termin')} bekommen, und reservieren Sie danach. Zweitens: ein falscher Name. Steht in der Reservierung der Vater, zugelassen wird aber auf die Tochter, muss die Behörde nicht mitspielen. Drittens: die Verwechslung von O und Null oder I und Eins beim Eintippen; die Bestätigung vor dem Prägen genau lesen. Viertens: eine Reservierung bei einem privaten Anbieter, der sich als Behörde ausgibt. Die echte Reservierung kostet nach der Gebührenordnung ${h.eur(R(h))}, nicht mehr.</p>
<h2>Reservieren für besondere Kennzeichen</h2>
<p>Auch für ein späteres ${h.a('h-kennzeichen', 'H-Kennzeichen')} oder ein E-Kennzeichen lässt sich die Kombination reservieren; die Endung kommt erst bei der Zuteilung dazu. Prüfen Sie dann, ob die Kombination mit Endung noch auf das Schild passt. Für ${h.a('saisonkennzeichen', 'Saisonkennzeichen')} gibt es Wunschnummern ebenso, der Zeitraum wird erst bei der Zulassung festgelegt. Welche Regeln für die Zeichen selbst gelten, steht auf der Seite ${h.a('wunschkennzeichen', 'Wunschkennzeichen')}.</p>`,
  },
  en: {
    slug: 'reserve-personalised-plate-germany',
    nav: 'Reserving a plate',
    card: 'Reserve online, the fee, how long it lasts, plates in advance, keeping the plate when deregistering.',
    title: 'Reserve a Wunschkennzeichen in Germany: online, fee, expiry',
    description: 'Reserving a personalised plate in Germany: the office portal, the GebOSt fee, how long a reservation lasts, plates made in advance and keeping your number.',
    h1: 'Reserving a personalised plate in Germany: five minutes online',
    intro: 'If you want a personalised plate (Wunschkennzeichen), reserve it before your appointment. It is done online with your registration office, costs little and saves a trip at the counter.',
    resume: (h) => `You reserve a personalised plate (Wunschkennzeichen) in the online portal of the registration office responsible for your home address; private reservation sites use the same portals and charge for their service on top. You enter your district code, the combination you want and your name, see at once whether it is free, and receive a reservation confirmation. The road traffic fee schedule (GebOSt), ${h.P.gebost_stand.en}, charges ${h.eur(R(h))} for the reservation under number 230; the ${h.eur(W(h))} surcharge for the personalised number is due only at registration. How long a reservation lasts is set by each office; after it expires the number becomes free again. Deregistration is different: there you can reserve your existing number for up to ${h.num(RM(h))} months so that the same vehicle gets it back when it is re-registered. With the confirmation you can have the plates made beforehand.`,
    faqs: (h) => [
      { q: 'How long does a personalised plate reservation last?', a: 'There is no nationwide period; each office sets its own, and the portal states the expiry date in the confirmation. If you have not registered by then, the reservation lapses and the number returns to the pool. Some offices let you extend a reservation once or create a new one if the number is still free; the fee is then charged again.' },
      { q: 'Can I reserve a personalised plate for someone else?', a: 'Yes, most portals ask for the name of the future keeper, not of the person reserving. At registration, the person the vehicle is registered to must match the reservation. If you reserve a plate as a gift, spell the name exactly as it appears on the recipient’s ID, or the office may refuse the reservation.' },
      { q: 'Do I have to pay the reservation fee straight away?', a: `That depends on the portal. At many offices the reservation is free at first and the ${h.eur(R(h))} is billed at registration; others ask for payment online when you reserve. If a paid reservation goes unused, the fee is generally not refunded. The personalised surcharge is always charged at the counter.` },
      { q: 'Can I release a reserved number again?', a: 'Yes. Many portals have a cancel function using the reservation number; otherwise a short message to the office is enough. It is worth doing if you reserved several combinations and picked one, because the others then become free for someone else. There is no duty to release; unused reservations lapse on their own.' },
    ],
    body: (h) => `<h2>Step by step</h2>
<p><strong>Find the responsible office.</strong> You can only reserve with the office that will later register the car, the one for your main residence. The ${h.a('home', 'search by town or postcode')} names it together with the code your district issues.</p>
<p><strong>Open the portal.</strong> The district or city website links to the reservation portal, usually under “Wunschkennzeichen”. No account is needed.</p>
<p><strong>Check the combination.</strong> Choose the district code if there is more than one, then type the letters and number. The portal shows at once whether the combination is free, taken or blocked. Many portals suggest free alternatives nearby.</p>
<p><strong>Reserve.</strong> Enter the future keeper’s name and address, confirm, and save or print the confirmation. It shows the number, the reservation reference and the expiry date.</p>
<p><strong>Have the plates made.</strong> With the confirmation any plate maker will stamp the plates in advance. At the counter they are then only sealed.</p>
<p><strong>Register.</strong> Quote the reservation reference at your appointment or in the ${h.a('auto-online-anmelden', 'online application')}. Only now are the personalised surcharge and the reservation fee charged.</p>
<h2>What the reservation costs</h2>
${h.table(['Item', 'GebOSt', 'Amount', 'When due'], [
  ['Reservation', 'no. 230', h.eur(R(h)), 'depending on the portal, at once or at registration'],
  ['Personalised number surcharge', 'no. 221', h.eur(W(h)), 'at registration'],
  ['New registration with both, in person', 'no. 221.1', h.eur(h.M.berechne({ vorgang: 'neu', wunsch: true, reservierung: true }).gebuehr), 'at registration'],
  ['New registration with both, online', 'no. 221.1.1', h.eur(h.M.berechne({ vorgang: 'neu', online: true, wunsch: true, reservierung: true }).gebuehr), 'in the portal'],
], `GebOSt ${h.P.gebost_stand.en}`, ['l', 'l', 'r', 'l'])}
<p>Going to your appointment without a reservation and choosing a free number there saves the reservation fee, but you risk the number being gone and must have the plates made after allocation. Where appointments are scarce, that is the more expensive route because it costs time.</p>
<!--mini:wunsch-->
<h2>Why every portal looks different</h2>
<p>Registration offices work with case-management software from a small number of vendors, and the reservation portal is part of that software. The Federal Motor Transport Authority’s directory gives the code of each office’s system. The breakdown shows that almost every main office uses one of four systems; once you know one portal, you will find your way around the others built on the same system.</p>
${verfahren(h)}
<p>The codes are shown as the directory abbreviates them. What matters is that you use your own office’s portal; a reservation made in another district’s portal is not valid in yours.</p>
<h2>Keeping your number when you deregister</h2>
<p>A second way to reserve runs through deregistration. If you take a vehicle off the road, say for the winter or a long repair, you can reserve its current number for ${h.eur(R(h))} for up to ${h.num(RM(h))} months. When the same vehicle is re-registered, the same plates go back on and no new ones are needed. Many districts will also let you move such a number to another vehicle if the office agrees. More under ${h.a('auto-abmelden', 'deregistering a car')}.</p>
<h2>Mistakes that cost a reservation</h2>
<p>Most often a reservation lapses because the appointment at the registration office falls after its expiry date. So first check that you can get an ${h.a('zulassungsstelle-termin', 'appointment')}, then reserve. Second, a wrong name: if the reservation names the father but the car is registered to the daughter, the office need not accept it. Third, mixing up O and zero or I and one when typing; read the confirmation carefully before the plates are made. Fourth, reserving with a private provider posing as the authority. The real reservation costs ${h.eur(R(h))} under the fee schedule, no more.</p>
<h2>Reserving for special plates</h2>
<p>You can also reserve a combination for a later ${h.a('h-kennzeichen', 'H plate')} or E plate; the suffix is added only at allocation. Check that the combination with its suffix still fits on the plate. ${h.a('saisonkennzeichen', 'Seasonal plates')} can be personalised as well; the season is set at registration. The rules for the characters themselves are on the ${h.a('wunschkennzeichen', 'personalised plates')} page.</p>`,
  },
});
