import { defineGuide, type Helpers } from '../../lib/guide-types';

const MON = { de: ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.'], en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] };
const monate = (a: number, b: number) => ((b - a + 12) % 12) + 1;
/** Saisons types : mois sur la route, mois sans taxe ni assurance (part de l'année). */
function beispiele(h: Helpers): string {
  const de = h.lang === 'de';
  const F: Array<[string, string, number, number]> = [
    ['Motorrad', 'Motorcycle', 4, 10],
    ['Cabrio', 'Convertible', 3, 10],
    ['Wohnmobil', 'Motorhome', 4, 9],
    ['Winterauto', 'Winter car', 11, 3],
    ['Oldtimer', 'Classic car', 5, 9],
  ];
  const rows = F.map(([d, e, a, b]) => { const n = monate(a, b); return [de ? d : e, `${String(a).padStart(2, '0')}–${String(b).padStart(2, '0')} (${MON[h.lang][a - 1]} – ${MON[h.lang][b - 1]})`, h.num(n), h.num(12 - n), h.pct((12 - n) / 12, 0)]; });
  return h.table(de ? ['Fahrzeug', 'Saison auf dem Schild', 'Monate zugelassen', 'Monate ruhend', 'Steuer und Haftpflicht gespart'] : ['Vehicle', 'Season on the plate', 'Months on the road', 'Months off', 'Tax and liability saved'], rows,
    de ? `Beispiele; erlaubt sind ${h.num(h.P.fzv.saison_min_monate)} bis ${h.num(h.P.fzv.saison_max_monate)} volle Monate (§ 10 Abs. 3 FZV). Gespart ist der Anteil des Jahres, nicht der Euro-Betrag: Der Versicherer kann für die Saison einen eigenen Tarif ansetzen.` : `Examples; ${h.num(h.P.fzv.saison_min_monate)} to ${h.num(h.P.fzv.saison_max_monate)} full months are allowed (section 10(3) FZV). The saving is the share of the year, not a euro amount: the insurer may set its own seasonal rate.`, ['l', 'l', 'r', 'r', 'r']);
}
const wohnmobile = (h: Helpers) => h.Z.BEZIRKE.reduce((t, b) => t + (b.stat?.wohnmobile ?? 0), 0);

export default defineGuide({
  id: 'saisonkennzeichen',
  group: 'kennzeichen',
  order: 5,
  mini: 'saison',
  miniHref: 'kosten',
  related: ['kfz-kennzeichen', 'auto-abmelden', 'h-kennzeichen', 'kurzzeitkennzeichen', 'kosten'],
  sources: ['fzv10', 'gebost', 'kraftstg9', 'kbaFz1'],
  de: {
    slug: 'saisonkennzeichen',
    nav: 'Saisonkennzeichen',
    card: 'Zwei bis elf Monate: Zeitraum wählen, Steuer und Versicherung sparen, Regeln außerhalb der Saison.',
    title: 'Saisonkennzeichen 2026: Zeitraum, Kosten, Steuer, Regeln',
    description: 'Saisonkennzeichen 2026: Zeitraum von zwei bis elf Monaten, Gebühr nach GebOSt, Kfz-Steuer und Versicherung nur für die Saison, Abstellen und Beispiele.',
    h1: 'Saisonkennzeichen: nur zahlen, wenn das Fahrzeug fährt',
    intro: 'Motorrad im Sommer, Winterauto im Winter, Wohnmobil für die Reisemonate: Mit einem Saisonkennzeichen bleibt das Fahrzeug zugelassen, kostet aber nur in den Monaten, in denen es fährt.',
    resume: (h) => `Ein Saisonkennzeichen ist nach § 10 Absatz 3 der Fahrzeug-Zulassungsverordnung ein normales Kennzeichen mit einem Betriebszeitraum als Zusatz, zum Beispiel 04 bis 10 für April bis Oktober. Der Zeitraum umfasst volle Monate, mindestens ${h.num(h.P.fzv.saison_min_monate)} und höchstens ${h.num(h.P.fzv.saison_max_monate)}, und wiederholt sich jedes Jahr ohne neuen Antrag. Außerhalb des Zeitraums darf das Fahrzeug auf öffentlichen Straßen weder fahren noch abgestellt werden; es braucht also einen privaten Stellplatz. Dafür fallen Kfz-Steuer und Haftpflichtbeitrag nur für die Saison an. Die Zulassungsbehörde berechnet für ein Saisonkennzeichen dieselbe Gebühr wie für jede Zulassung, nach der Gebührenordnung, ${h.P.gebost_stand.de}, ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)} am Schalter bei einer Neuzulassung; ein zugelassenes Fahrzeug umzustellen kostet ${h.eur(h.M.berechne({ vorgang: 'kennzeichenart' }).gebuehr)} plus neue Schilder. Außerhalb der Saison erlaubt ein Kurzzeitkennzeichen einzelne Fahrten.`,
    faqs: (h) => [
      { q: 'Lohnt sich ein Saisonkennzeichen für ein Wohnmobil?', a: `Wenn das Wohnmobil im Winter auf einem privaten Platz steht, oft ja, weil Steuer und Haftpflicht nur für die Reisemonate anfallen. In Deutschland sind laut Kraftfahrt-Bundesamt ${h.num(wohnmobile(h))} Wohnmobile zugelassen. Wer spontan auch im Winter fahren will, verliert die Flexibilität. Fragen Sie den Versicherer nach dem Saisontarif und prüfen Sie, ob die Kasko in der Ruhezeit weiterläuft; oft bleibt sie als Ruheversicherung bestehen.` },
      { q: 'Darf ich mit Saisonkennzeichen außerhalb der Saison zur Werkstatt fahren?', a: 'Nur mit einem Kurzzeitkennzeichen, und das Saisonkennzeichen darf dabei nicht gleichzeitig am Fahrzeug sein, so § 42 der Fahrzeug-Zulassungsverordnung. Erlaubt ist außerhalb der Saison sonst nur die Fahrt zur Außerbetriebsetzung und die Rückfahrt danach. Eine Fahrt zur Werkstatt mit dem Saisonkennzeichen gilt als Fahren ohne Zulassung und ohne Versicherungsschutz.' },
      { q: 'Kann ich den Saisonzeitraum später ändern?', a: `Ja, aber nur bei der Zulassungsbehörde, weil der Zeitraum auf den Schildern und in beiden Zulassungsbescheinigungen steht. Neue Schilder sind nötig. Die Behörde berechnet die Änderung als Kennzeichenwechsel, nach diesem Rechner ${h.eur(h.M.berechne({ vorgang: 'kennzeichenart' }).gebuehr)} am Schalter. Planen Sie den Zeitraum deshalb lieber großzügig, statt jedes Jahr nachzubessern.` },
      { q: 'Gibt es Saisonkennzeichen auch als H- oder E-Kennzeichen?', a: 'Ja. Ein Oldtimer kann ein H-Kennzeichen mit Saisonzeitraum tragen, ein Elektroauto ein E-Kennzeichen mit Saisonzeitraum; der Zeitraum steht dann hinter dem Kennbuchstaben. Auch grüne Kennzeichen für steuerbefreite Fahrzeuge lassen sich als Saisonkennzeichen zuteilen. Nur das Wechselkennzeichen ist ausgeschlossen, ebenso Kurzzeit- und Ausfuhrkennzeichen.' },
    ],
    body: (h) => `<h2>So funktioniert der Zeitraum</h2>
<p>Auf dem Schild steht rechts ein kleines Feld mit zwei Zahlen übereinander: oben der erste, unten der letzte Monat. 04 über 10 heißt: zugelassen vom ersten April bis zum letzten Oktober. Der Zeitraum darf über den Jahreswechsel gehen, etwa 11 bis 03 für ein Winterauto. Er gilt jedes Jahr gleich, bis Sie ihn ändern oder das Fahrzeug abmelden. Die Tabelle zeigt verbreitete Beispiele.</p>
${beispiele(h)}
<p>Mit dem Rechner unter dem Zitierblock prüfen Sie Ihren Wunschzeitraum. Die Verordnung verlangt volle Monate; einen Zeitraum vom fünfzehnten März an gibt es nicht.</p>
<h2>Was es kostet</h2>
<p>Für die Zulassungsbehörde ist das Saisonkennzeichen keine eigene Gebührenart. Bei einer Neuzulassung zahlen Sie die normale Gebühr; bei einem bereits zugelassenen Fahrzeug, das Sie auf ein Saisonkennzeichen umstellen, rechnet dieser Rechner die Änderung der Kennzeichenart mit neuen Schildern.</p>
${h.table(['Fall', 'Gebühr', 'Mit Nebenposten, ohne Schilder'], [
  ['Neuzulassung mit Saisonkennzeichen, vor Ort', h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr), `${h.eur(h.M.berechne({ vorgang: 'neu' }).min)} – ${h.eur(h.M.berechne({ vorgang: 'neu' }).max)}`],
  ['Neuzulassung mit Saisonkennzeichen, online', h.eur(h.M.berechne({ vorgang: 'neu', online: true }).gebuehr), `${h.eur(h.M.berechne({ vorgang: 'neu', online: true }).min)} – ${h.eur(h.M.berechne({ vorgang: 'neu', online: true }).max)}`],
  ['Zugelassenes Fahrzeug umstellen', h.eur(h.M.berechne({ vorgang: 'kennzeichenart' }).gebuehr), `${h.eur(h.M.berechne({ vorgang: 'kennzeichenart' }).min)} – ${h.eur(h.M.berechne({ vorgang: 'kennzeichenart' }).max)}`],
  ['Umstellen mit Wunschkennzeichen', h.eur(h.M.berechne({ vorgang: 'kennzeichenart', wunsch: true }).gebuehr), `${h.eur(h.M.berechne({ vorgang: 'kennzeichenart', wunsch: true }).min)} – ${h.eur(h.M.berechne({ vorgang: 'kennzeichenart', wunsch: true }).max)}`],
], `GebOSt ${h.P.gebost_stand.de}`, ['l', 'r', 'r'])}
<p>Die eigentliche Ersparnis liegt nicht bei der Behörde, sondern bei Steuer und Versicherung. Die Kfz-Steuer wird nach dem Kraftfahrzeugsteuergesetz nur für die Monate des Betriebszeitraums festgesetzt; das Hauptzollamt erhält den Zeitraum von der Behörde. Der Versicherer berechnet den Beitrag für die Saison, oft mit eigenem Tarif. Ein Motorrad mit sieben Monaten zahlt also Steuer für sieben Monate, nicht für zwölf.</p>
<!--mini:saison-->
<h2>Die Regeln außerhalb der Saison</h2>
<p><strong>Kein Fahren, kein Abstellen.</strong> Das Fahrzeug darf außerhalb des Zeitraums nicht auf öffentlichen Straßen stehen, auch nicht am Straßenrand vor dem Haus. Garage, Hof oder gemieteter Stellplatz sind nötig.</p>
<p><strong>Ausnahmen.</strong> Erlaubt sind Fahrten zur Außerbetriebsetzung und zurück. Für alles andere, etwa eine Probefahrt nach der Winterpause oder einen Werkstatttermin im Februar, braucht es ein ${h.a('kurzzeitkennzeichen', 'Kurzzeitkennzeichen')}, und das Saisonkennzeichen muss dafür ab.</p>
<p><strong>Hauptuntersuchung.</strong> Die HU-Frist läuft auch in der Ruhezeit weiter. Fällt sie hinein, klären Sie vor dem Saisonstart mit der Prüfstelle, wie Sie hinkommen; für die Fahrt dorthin außerhalb der Saison braucht es wieder ein Kurzzeitkennzeichen.</p>
<p><strong>Versicherung.</strong> Die Haftpflicht ruht, eine Teilkasko läuft bei vielen Verträgen als Ruheversicherung weiter, etwa gegen Diebstahl oder Brand in der Garage. Fragen Sie danach, bevor Sie Ihr Fahrzeug abstellen.</p>
<h2>Saisonkennzeichen oder Abmelden?</h2>
<p>Die Alternative ist, das Fahrzeug jedes Jahr ${h.a('auto-abmelden', 'abzumelden')} und im Frühjahr wieder zuzulassen. Das kostet zweimal Gebühr, zweimal einen Termin, und das Kennzeichen muss reserviert werden. Das Saisonkennzeichen kostet einmal und läuft dann von selbst. Abmelden lohnt sich nur, wenn das Fahrzeug mehr als ein Jahr steht oder unklar ist, ob es wieder fährt. Für Motorräder, deren Zahl das Kraftfahrt-Bundesamt am ${h.Z.fz1Stand('de')} mit ${h.num(h.Z.META.total.krad)} angibt, ist das Saisonkennzeichen deshalb der übliche Weg.</p>
<h2>Drei Fehler</h2>
<p>Erstens: der Zeitraum zu knapp gewählt. Ein Motorrad mit 05 bis 08 verpasst schöne Wochen im April und September, und die Änderung kostet Gebühr und Schilder. Zweitens: das Fahrzeug im Winter am Straßenrand stehen gelassen. Das ist ein Verstoß, auch wenn es sich nicht bewegt. Drittens: der Verkauf außerhalb der Saison mit einer Probefahrt auf dem Saisonkennzeichen; dafür braucht der Käufer ein Kurzzeitkennzeichen. Welche anderen Kennzeichenarten es gibt, zeigt die ${h.a('kfz-kennzeichen', 'Kennzeichenseite')}.</p>`,
  },
  en: {
    slug: 'seasonal-number-plate-germany',
    nav: 'Seasonal plate',
    card: 'Two to eleven months: choose the period, save tax and insurance, rules outside the season.',
    title: 'Saisonkennzeichen: seasonal number plates in Germany 2026',
    description: 'Seasonal number plates in Germany for 2026: two to eleven months, the GebOSt fee, vehicle tax and insurance for the season only, parking rules and examples.',
    h1: 'Seasonal plates in Germany: pay only while the vehicle is on the road',
    intro: 'A motorcycle in summer, a winter car in winter, a motorhome for the travel months: with a seasonal plate (Saisonkennzeichen) the vehicle stays registered but costs money only in the months it is used.',
    resume: (h) => `A seasonal plate (Saisonkennzeichen) is, under section 10(3) of the vehicle registration ordinance (FZV), an ordinary plate with an operating period added, for example 04 to 10 for April to October. The period covers full months, at least ${h.num(h.P.fzv.saison_min_monate)} and at most ${h.num(h.P.fzv.saison_max_monate)}, and repeats every year without a new application. Outside the period the vehicle may neither be driven nor parked on public roads, so it needs a private space. In return, vehicle tax and third-party insurance are charged for the season only. The registration office charges the same fee as for any registration under the road traffic fee schedule (GebOSt), ${h.P.gebost_stand.en}: ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)} at the counter for a new registration; switching a registered vehicle costs ${h.eur(h.M.berechne({ vorgang: 'kennzeichenart' }).gebuehr)} plus new plates. Outside the season, a short-term plate allows individual trips.`,
    faqs: (h) => [
      { q: 'Is a seasonal plate worth it for a motorhome?', a: `If the motorhome spends the winter on private ground, often yes, because tax and third-party cover are charged only for the travel months. According to the Federal Motor Transport Authority, ${h.num(wohnmobile(h))} motorhomes are registered in Germany. You lose the freedom to set off in winter. Ask your insurer about a seasonal rate and whether comprehensive cover continues during the rest period; it often stays as storage cover.` },
      { q: 'Can I drive to a garage outside the season on a seasonal plate?', a: 'Only with a short-term plate, and the seasonal plate must not be fitted at the same time, says section 42 of the vehicle registration ordinance. Otherwise, outside the season only the trip to deregister and the return trip are allowed. Driving to a garage on the seasonal plate counts as driving unregistered and without insurance cover.' },
      { q: 'Can I change the seasonal period later?', a: `Yes, but only at the registration office, because the period is on the plates and in both registration certificates. New plates are needed. The office treats it as a change of plate, ${h.eur(h.M.berechne({ vorgang: 'kennzeichenart' }).gebuehr)} at the counter by this calculator. So choose the period generously rather than adjusting it every year.` },
      { q: 'Can a seasonal plate also be an H or E plate?', a: 'Yes. A classic car can carry an H plate with a season, an electric car an E plate with a season; the period then follows the letter. Green plates for tax-exempt vehicles can also be issued as seasonal plates. Only the interchangeable plate is excluded, as are short-term and export plates.' },
    ],
    body: (h) => `<h2>How the period works</h2>
<p>On the right of the plate is a small field with two numbers stacked: the first month on top, the last below. 04 over 10 means registered from the first of April to the end of October. The period may run across the new year, such as 11 to 03 for a winter car. It applies the same way every year until you change it or deregister the vehicle. The table shows common examples.</p>
${beispiele(h)}
<p>Use the calculator below the summary to check the period you want. The ordinance requires full months; a period starting on the fifteenth of March does not exist.</p>
<h2>What it costs</h2>
<p>For the registration office, a seasonal plate is not a separate type of fee. For a new registration you pay the normal fee; for a vehicle already registered that you switch to a seasonal plate, this calculator charges the change of plate type with new plates.</p>
${h.table(['Case', 'Fee', 'With small items, no plates'], [
  ['New registration with a seasonal plate, in person', h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr), `${h.eur(h.M.berechne({ vorgang: 'neu' }).min)} – ${h.eur(h.M.berechne({ vorgang: 'neu' }).max)}`],
  ['New registration with a seasonal plate, online', h.eur(h.M.berechne({ vorgang: 'neu', online: true }).gebuehr), `${h.eur(h.M.berechne({ vorgang: 'neu', online: true }).min)} – ${h.eur(h.M.berechne({ vorgang: 'neu', online: true }).max)}`],
  ['Switching a registered vehicle', h.eur(h.M.berechne({ vorgang: 'kennzeichenart' }).gebuehr), `${h.eur(h.M.berechne({ vorgang: 'kennzeichenart' }).min)} – ${h.eur(h.M.berechne({ vorgang: 'kennzeichenart' }).max)}`],
  ['Switching with a personalised number', h.eur(h.M.berechne({ vorgang: 'kennzeichenart', wunsch: true }).gebuehr), `${h.eur(h.M.berechne({ vorgang: 'kennzeichenart', wunsch: true }).min)} – ${h.eur(h.M.berechne({ vorgang: 'kennzeichenart', wunsch: true }).max)}`],
], `GebOSt ${h.P.gebost_stand.en}`, ['l', 'r', 'r'])}
<p>The real saving is not at the office but in tax and insurance. Under the Motor Vehicle Tax Act, vehicle tax is assessed only for the months of the operating period; the customs office receives the period from the registration office. The insurer charges for the season, often at its own rate. A motorcycle with seven months therefore pays tax for seven months, not twelve.</p>
<!--mini:saison-->
<h2>The rules outside the season</h2>
<p><strong>No driving, no parking.</strong> Outside the period the vehicle may not stand on public roads, not even at the kerb outside your house. A garage, yard or rented space is needed.</p>
<p><strong>Exceptions.</strong> Trips to deregister and back are allowed. For anything else, such as a test drive after the winter break or a garage appointment in February, you need a ${h.a('kurzzeitkennzeichen', 'short-term plate')}, and the seasonal plate must come off.</p>
<p><strong>Roadworthiness test.</strong> The inspection deadline keeps running during the rest period. If it falls inside, agree with the test centre before the season starts how to get there; a trip outside the season again needs a short-term plate.</p>
<p><strong>Insurance.</strong> Third-party cover rests; with many policies partial comprehensive cover continues as storage cover, for example against theft or fire in the garage. Ask about it before you lay the vehicle up.</p>
<h2>Seasonal plate or deregistering?</h2>
<p>The alternative is to ${h.a('auto-abmelden', 'deregister')} the vehicle every year and register it again in spring. That means two fees, two appointments and a reserved number. The seasonal plate is paid once and then runs by itself. Deregistering is only worth it if the vehicle will stand for more than a year or it is unclear whether it will be used again. For motorcycles, of which the Federal Motor Transport Authority counted ${h.num(h.Z.META.total.krad)} on ${h.Z.fz1Stand('en')}, the seasonal plate is therefore the usual route.</p>
<h2>Three mistakes</h2>
<p>First, a period chosen too tightly. A motorcycle on 05 to 08 misses good weeks in April and September, and changing it costs a fee and plates. Second, leaving the vehicle at the kerb in winter. That is an offence even if it never moves. Third, selling outside the season with a test drive on the seasonal plate; the buyer needs a short-term plate for that. The ${h.a('kfz-kennzeichen', 'plate page')} shows the other types of plate.</p>`,
  },
});
