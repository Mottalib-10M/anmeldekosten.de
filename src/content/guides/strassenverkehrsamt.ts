import { defineGuide, type Helpers } from '../../lib/guide-types';

/** Par Land : districts, lieux d'immatriculation, autorités du permis (annuaires KBA). */
function laender(h: Helpers): string {
  const de = h.lang === 'de';
  const t = new Map<string, { b: number; s: number; f: number }>();
  const g = (l: string) => { if (!t.has(l)) t.set(l, { b: 0, s: 0, f: 0 }); return t.get(l)!; };
  for (const b of h.Z.BEZIRKE) g(b.land).b++;
  for (const s of h.Z.STELLEN) if (s.art === 'haupt' || s.art === 'neben') g(s.land).s++;
  for (const f of h.Z.FEB) g(f.land).f++;
  const rows = [...t.entries()].filter(([, v]) => v.b).sort((a, b) => b[1].s - a[1].s).map(([l, v]) => [h.land(l), h.num(v.b), h.num(v.s), h.num(v.f)]);
  return h.table(de ? ['Land', 'Zulassungsbezirke', 'Zulassungsstellen', 'Führerscheinstellen'] : ['State', 'Registration districts', 'Registration offices', 'Licence offices'], rows,
    de ? `Anschriftenverzeichnisse des Kraftfahrt-Bundesamts, Stand ${h.Z.avStand('de')}` : `Federal Motor Transport Authority directories, ${h.Z.avStand('en')}`, ['l', 'r', 'r', 'r']);
}
const M = (h: Helpers) => h.Z.META;
const F = (h: Helpers) => h.P.fuehrerschein;

export default defineGuide({
  id: 'strassenverkehrsamt',
  group: 'kosten',
  order: 8,
  mini: 'ummelden',
  miniHref: 'kosten',
  related: ['zulassungsstelle-termin', 'fuehrerschein-umtauschen', 'kosten', 'auto-ummelden', 'zulassungsstelle-hamburg'],
  sources: ['kbaAv', 'gebost', 'fev24a', 'fzv15'],
  de: {
    slug: 'strassenverkehrsamt',
    nav: 'Straßenverkehrsamt',
    card: 'Was das Amt macht, wie es in Ihrem Land heißt, und Zulassung gegenüber Führerscheinstelle.',
    title: 'Straßenverkehrsamt: Aufgaben, Zuständigkeit, Gebühren 2026',
    description: 'Straßenverkehrsamt: was Zulassungsstelle und Führerscheinstelle erledigen, wer zuständig ist, die Namen je Land, die Gebühren 2026 und Zahl der Stellen.',
    h1: 'Straßenverkehrsamt: wer was erledigt',
    intro: 'Straßenverkehrsamt, Kfz-Zulassungsstelle, Führerscheinstelle, Bürgerbüro: Hinter den vielen Namen stecken zwei Aufgaben und eine einfache Regel für die Zuständigkeit.',
    resume: (h) => `Straßenverkehrsamt ist der übliche Name für das Amt eines Landkreises oder einer kreisfreien Stadt, das zwei getrennte Behörden unter einem Dach vereint: die Zulassungsbehörde für Fahrzeuge und die Fahrerlaubnisbehörde für Führerscheine. Die Anschriftenverzeichnisse des Kraftfahrt-Bundesamts, Stand ${h.Z.avStand('de')}, führen ${h.num(M(h).bezirke)} Zulassungsbezirke mit ${h.num(M(h).stellen)} Anlaufstellen und ${h.num(M(h).fe)} Fahrerlaubnisbehörden. Zuständig ist für beide Aufgaben die Behörde am Hauptwohnsitz. Die Zulassungsstelle meldet Fahrzeuge an, um und ab und vergibt Kennzeichen; die Gebühr einer Zulassung beträgt nach der Gebührenordnung, ${h.P.gebost_stand.de}, ${h.eur(h.P.land['221.1'])} am Schalter. Die Führerscheinstelle stellt Fahrerlaubnisse aus, tauscht alte Führerscheine um, für ${h.eur(h.M.UMTAUSCH_GEBUEHR)}, und stellt den internationalen Führerschein aus. Je nach Land heißt das Amt auch Bürgeramt, Landratsamt, Kreisverwaltung oder Landesbetrieb Verkehr; die Aufgaben sind überall dieselben, weil sie Bundesrecht folgen.`,
    faqs: (h) => [
      { q: 'Ist das Straßenverkehrsamt dasselbe wie die Zulassungsstelle?', a: 'Nicht ganz. Die Zulassungsstelle ist eine Abteilung des Straßenverkehrsamts, zuständig für Fahrzeuge. Daneben gibt es die Führerscheinstelle und oft eine Straßenverkehrsbehörde, die Verkehrszeichen, Parkausweise und Sondergenehmigungen bearbeitet. Im Alltag nennt man das Ganze Straßenverkehrsamt. In manchen Städten sitzen die Abteilungen an verschiedenen Adressen; prüfen Sie deshalb vorher, wohin Ihr Anliegen gehört.' },
      { q: 'Welches Straßenverkehrsamt ist für Zweitwohnsitze zuständig?', a: 'Grundsätzlich das am Hauptwohnsitz, der im Melderegister eingetragen ist. Ein Auto wird dort zugelassen, wo der Halter mit Hauptwohnsitz gemeldet ist; wer an einem Zweitwohnsitz zulassen will, braucht eine Begründung, die die Behörde prüft, etwa bei Studierenden. Für den Führerschein gilt ebenfalls der Hauptwohnsitz. Firmenwagen werden am Sitz des Unternehmens oder der Niederlassung zugelassen.' },
      { q: 'Kann das Straßenverkehrsamt meine Punkte in Flensburg abfragen?', a: 'Nein. Das Fahreignungsregister führt das Kraftfahrt-Bundesamt in Flensburg, und Auskunft daraus erhalten Sie dort selbst, online mit dem Ausweis oder schriftlich, kostenlos. Das Straßenverkehrsamt bekommt Mitteilungen aus dem Register, wenn es um Maßnahmen wie eine Verwarnung oder den Entzug der Fahrerlaubnis geht, ist aber keine Auskunftsstelle für Punkte.' },
      { q: 'Welche Öffnungszeiten hat das Straßenverkehrsamt?', a: 'Jede Behörde legt sie selbst fest. Viele öffnen werktags vormittags und an ein oder zwei Tagen auch nachmittags, manche samstags. Häufig gelten für Zulassung und Führerscheinstelle unterschiedliche Zeiten, und vielerorts wird nur mit Termin bedient. Die aktuellen Zeiten stehen auf der Website des Kreises oder der Stadt, die unsere Suche zu jeder Stelle nennt.' },
    ],
    body: (h) => `<h2>Zwei Behörden, ein Haus</h2>
<p>Die Zulassung von Fahrzeugen regelt die Fahrzeug-Zulassungsverordnung, den Führerschein die Fahrerlaubnis-Verordnung. Beide Verordnungen weisen die Aufgaben den unteren Verwaltungsbehörden zu, also den Landkreisen und kreisfreien Städten, in einigen Ländern auch großen kreisangehörigen Städten. Darum gibt es fast so viele Straßenverkehrsämter wie Kreise. Die folgende Tabelle zeigt, wie sich die Stellen auf die Länder verteilen.</p>
${laender(h)}
<p>Dass ein Land mehr Zulassungsstellen als Bezirke hat, liegt an Außenstellen: Viele Flächenkreise betreiben mehrere Standorte. Bei den Führerscheinstellen zählt das Verzeichnis jede Behörde mit eigener Anschrift; manche Kreise haben die Aufgabe an große Städte abgegeben, andere teilen sie auf.</p>
<h2>Was die Zulassungsstelle erledigt</h2>
<p>Die Zulassungsstelle bringt Fahrzeuge in den Verkehr und nimmt sie wieder heraus. Dazu gehören die Erstzulassung, die Umschreibung nach einem Kauf, die Ummeldung nach einem Umzug, die Adressänderung, die Abmeldung und besondere Kennzeichen wie ${h.a('saisonkennzeichen', 'Saison-')}, ${h.a('h-kennzeichen', 'Oldtimer-')}, ${h.a('kurzzeitkennzeichen', 'Kurzzeit-')} und ${h.a('ausfuhrkennzeichen', 'Ausfuhrkennzeichen')}. Alle Beträge folgen derselben bundesweiten Gebührenordnung.</p>
${h.table(['Vorgang', 'GebOSt-Nr.', 'Gebühr vor Ort'], [
  ['Zulassung eines Fahrzeugs', '221.1', h.eur(h.P.land['221.1'])],
  ['Ummeldung mit Kennzeichenmitnahme', '221.9', h.eur(h.P.land['221.9'])],
  ['Halterwechsel, Kennzeichen bleibt', '221.8', h.eur(h.P.land['221.8'])],
  ['Adressänderung', '225', h.eur(h.P.land['225'])],
  ['Außerbetriebsetzung', '224.1', h.eur(h.P.land['224.1'])],
  ['Kurzzeitkennzeichen', '221.4', h.eur(h.P.land['221.4'])],
  ['Ausfuhrkennzeichen', '221.3', h.eur(h.P.land['221.3'])],
], `Gebühren der Zulassungsbehörde ohne Zuschläge, ${h.P.gebost_stand.de}`, ['l', 'l', 'r'])}
<!--mini:online-->
<h2>Was die Führerscheinstelle erledigt</h2>
<p>Die Fahrerlaubnisbehörde erteilt Fahrerlaubnisse nach bestandener Prüfung, erweitert sie um Klassen, verlängert befristete Klassen wie die für Lkw und Busse und tauscht alte Führerscheine in den EU-Kartenführerschein um. Der Pflichtumtausch nach § 24a der Fahrerlaubnis-Verordnung läuft in Stufen bis ${h.date(F(h).frist_vor_1953)}; den Termin für Ihr Dokument rechnet die ${h.a('fuehrerschein-umtauschen', 'Umtauschseite')}. Die Behörde stellt auch den ${h.a('internationaler-fuehrerschein', 'internationalen Führerschein')} aus.</p>
${h.table(['Leistung', 'Gebühr'], [
  ['Umtausch in den Kartenführerschein (mit Registereintrag)', h.eur(h.M.UMTAUSCH_GEBUEHR)],
  ['Ersterteilung einer Fahrerlaubnis', h.eur(F(h).ersterteilung)],
  ['Internationaler Führerschein', `${h.eur(F(h).international[0])} – ${h.eur(F(h).international[1])}`],
], `GebOSt, ${h.P.gebost_stand.de}`, ['l', 'r'])}
<p>Neue Kartenführerscheine sind ${h.num(F(h).gueltigkeit_jahre)} Jahre gültig; danach wird nur das Dokument erneuert, ohne Prüfung. Die Fahrerlaubnis selbst bleibt unbefristet.</p>
<h2>Wie das Amt in Ihrem Land heißt</h2>
<p>Die Bezeichnung ist Sache des Kreises oder der Stadt. In Bayern und Baden-Württemberg sitzt die Stelle meist im Landratsamt, in Rheinland-Pfalz in der Kreisverwaltung, in Nordrhein-Westfalen beim Straßenverkehrsamt des Kreises oder der Stadt. In Berlin heißt sie Kfz-Zulassungsbehörde des Landesamts für Bürger- und Ordnungsangelegenheiten, in Hamburg Landesbetrieb Verkehr, in München Kreisverwaltungsreferat. Manche Städte bieten Zulassungen auch in Bürgerbüros an, was die Last auf mehr Schalter verteilt. Wer nur den Wohnort kennt, findet die zuständige Stelle mit der ${h.a('home', 'Suche nach Ort, Postleitzahl oder Kennzeichen')}.</p>
<h2>Zuständigkeit in drei Sätzen</h2>
<p>Für Fahrzeuge privater Halter ist die Behörde am Hauptwohnsitz zuständig. Für Firmenfahrzeuge die Behörde am Sitz oder an der Niederlassung, die das Fahrzeug einsetzt. Für den Führerschein ebenfalls der Hauptwohnsitz, auch wenn der alte Führerschein woanders ausgestellt wurde. Wer umzieht, muss das Auto nach § 15 der Fahrzeug-Zulassungsverordnung unverzüglich ${h.a('auto-ummelden', 'ummelden')}; den Führerschein muss er dagegen nicht ändern lassen, weil die Karte keine Anschrift trägt.</p>
<h2>Typische Missverständnisse</h2>
<p>Das Straßenverkehrsamt erhebt keine Kfz-Steuer; die setzt das Hauptzollamt fest, die Behörde nimmt nur das Lastschriftmandat auf. Es verkauft keine Kennzeichenschilder; das tun private Schilderpräger, oft im selben Gebäude. Es verhängt keine Bußgelder für Raser; das tun die Bußgeldstellen der Länder und Kommunen. Und es ist nicht die Stelle für Punkte, die das Kraftfahrt-Bundesamt verwaltet. Wer das auseinanderhält, landet gleich beim richtigen Schalter und braucht nur einen ${h.a('zulassungsstelle-termin', 'Termin')}.</p>`,
  },
  en: {
    slug: 'strassenverkehrsamt-road-traffic-office',
    nav: 'Road traffic office',
    card: 'What the office does, what it is called in your state, and registration versus licence office.',
    title: 'Straßenverkehrsamt: the German road traffic office explained',
    description: 'Straßenverkehrsamt explained: what the registration and licence offices do, who is responsible, the names by state, the 2026 fees and how many offices exist.',
    h1: 'The Straßenverkehrsamt: who handles what',
    intro: 'Straßenverkehrsamt, Kfz-Zulassungsstelle, Führerscheinstelle, Bürgerbüro: behind the many names are two jobs and one simple rule on who is responsible.',
    resume: (h) => `Straßenverkehrsamt, the road traffic office, is the usual name for the office of a rural district or an independent city that houses two separate authorities: the registration office for vehicles (Zulassungsbehörde) and the licensing office for driving licences (Fahrerlaubnisbehörde). The Federal Motor Transport Authority’s directories, ${h.Z.avStand('en')}, list ${h.num(M(h).bezirke)} registration districts with ${h.num(M(h).stellen)} service points and ${h.num(M(h).fe)} licensing authorities. For both jobs, the office for your main residence is responsible. The registration office registers, re-registers and deregisters vehicles and issues number plates; under the road traffic fee schedule (GebOSt), ${h.P.gebost_stand.en}, a registration costs ${h.eur(h.P.land['221.1'])} at the counter. The licence office issues licences, exchanges old ones for ${h.eur(h.M.UMTAUSCH_GEBUEHR)} and issues the international driving permit. Depending on the state, the office is also called Bürgeramt, Landratsamt, Kreisverwaltung or Landesbetrieb Verkehr; the tasks are the same everywhere, because they follow federal law.`,
    faqs: (h) => [
      { q: 'Is the Straßenverkehrsamt the same as the registration office?', a: 'Not quite. The registration office is one department of the road traffic office, in charge of vehicles. Next to it are the licence office and often a road traffic authority that handles traffic signs, parking permits and special permits. In everyday speech the whole thing is called the Straßenverkehrsamt. In some cities the departments are at different addresses, so check beforehand where your matter belongs.' },
      { q: 'Which road traffic office handles a second home?', a: 'In principle the one for your main residence as recorded in the population register. A car is registered where its keeper has their main residence; registering at a second home needs a reason the office will check, for example for students. The main residence also applies to the driving licence. Company cars are registered at the seat of the company or the branch that uses them.' },
      { q: 'Can the road traffic office tell me my penalty points?', a: 'No. The driver fitness register is kept by the Federal Motor Transport Authority in Flensburg, and you request information from it yourself, online with your ID or in writing, free of charge. The road traffic office receives notices from the register when measures such as a warning or withdrawal of the licence are due, but it is not where you ask about points.' },
      { q: 'What are the opening hours of the Straßenverkehrsamt?', a: 'Each office sets its own. Many open on weekday mornings and on one or two afternoons, some on Saturdays. Registration and licence departments often keep different hours, and many places serve customers by appointment only. Current times are on the district or city website, which our search names for every office.' },
    ],
    body: (h) => `<h2>Two authorities, one building</h2>
<p>Vehicle registration is governed by the vehicle registration ordinance (FZV), driving licences by the driving licence ordinance (FeV). Both assign the work to the lower administrative authorities, meaning rural districts and independent cities, and in some states large towns within a district as well. That is why there are almost as many road traffic offices as districts. The table below shows how the offices are spread across the states.</p>
${laender(h)}
<p>A state with more registration offices than districts has branch offices: many large rural districts run several sites. For licence offices, the directory counts every authority with its own address; some districts have handed the task to large towns, others split it.</p>
<h2>What the registration office does</h2>
<p>The registration office puts vehicles on the road and takes them off again. That covers first registration, transfer after a sale, re-registration after a move, change of address, deregistration and special plates such as ${h.a('saisonkennzeichen', 'seasonal')}, ${h.a('h-kennzeichen', 'classic-car')}, ${h.a('kurzzeitkennzeichen', 'short-term')} and ${h.a('ausfuhrkennzeichen', 'export plates')}. Every amount follows the same nationwide fee schedule.</p>
${h.table(['Procedure', 'GebOSt no.', 'Fee in person'], [
  ['Registering a vehicle', '221.1', h.eur(h.P.land['221.1'])],
  ['Re-registration keeping the plate', '221.9', h.eur(h.P.land['221.9'])],
  ['New keeper, plate kept', '221.8', h.eur(h.P.land['221.8'])],
  ['Change of address', '225', h.eur(h.P.land['225'])],
  ['Deregistration', '224.1', h.eur(h.P.land['224.1'])],
  ['Short-term plate', '221.4', h.eur(h.P.land['221.4'])],
  ['Export plate', '221.3', h.eur(h.P.land['221.3'])],
], `Registration office fees without surcharges, ${h.P.gebost_stand.en}`, ['l', 'l', 'r'])}
<!--mini:online-->
<h2>What the licence office does</h2>
<p>The licensing authority grants licences after the test, adds categories, renews time-limited categories such as those for lorries and buses, and exchanges old licences for the EU card licence. The mandatory exchange under section 24a of the driving licence ordinance runs in stages until ${h.date(F(h).frist_vor_1953)}; the ${h.a('fuehrerschein-umtauschen', 'exchange page')} works out the date for your document. The office also issues the ${h.a('internationaler-fuehrerschein', 'international driving permit')}.</p>
${h.table(['Service', 'Fee'], [
  ['Exchange for a card licence (with register entry)', h.eur(h.M.UMTAUSCH_GEBUEHR)],
  ['First grant of a driving licence', h.eur(F(h).ersterteilung)],
  ['International driving permit', `${h.eur(F(h).international[0])} – ${h.eur(F(h).international[1])}`],
], `GebOSt, ${h.P.gebost_stand.en}`, ['l', 'r'])}
<p>New card licences are valid for ${h.num(F(h).gueltigkeit_jahre)} years; after that only the document is renewed, without a test. The right to drive itself has no end date.</p>
<h2>What the office is called in your state</h2>
<p>The name is up to the district or city. In Bavaria and Baden-Württemberg the office usually sits in the Landratsamt, in Rhineland-Palatinate in the Kreisverwaltung, in North Rhine-Westphalia in the district or city Straßenverkehrsamt. In Berlin it is the vehicle registration authority of the State Office for Citizens’ and Regulatory Affairs, in Hamburg the Landesbetrieb Verkehr, in Munich the Kreisverwaltungsreferat. Some cities also offer registration in citizens’ offices, which spreads the load across more counters. If you only know the town, the ${h.a('home', 'search by town, postcode or plate code')} finds the responsible office.</p>
<h2>Responsibility in three sentences</h2>
<p>For vehicles of private keepers, the office for the main residence is responsible. For company vehicles, the office at the seat or the branch that uses the vehicle. For the licence, again the main residence, even if the old licence was issued elsewhere. If you move, section 15 of the vehicle registration ordinance requires you to ${h.a('auto-ummelden', 're-register')} the car without delay; the licence does not need changing, because the card carries no address.</p>
<h2>Common misunderstandings</h2>
<p>The road traffic office does not levy vehicle tax; the customs office sets it, and the registration office only takes the direct-debit mandate. It does not sell number plates; private plate makers do, often in the same building. It does not fine speeders; the fines offices of the states and municipalities do. And it is not where penalty points are kept; the Federal Motor Transport Authority manages them. Keeping this straight takes you to the right counter first time and needs only one ${h.a('zulassungsstelle-termin', 'appointment')}.</p>`,
  },
});
