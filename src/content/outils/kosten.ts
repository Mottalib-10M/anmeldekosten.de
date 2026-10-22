import { defineGuide, type Helpers } from '../../lib/guide-types';
import type { VorgangId } from '../../lib/engine/gebuehren';

const b = (h: Helpers, vorgang: VorgangId, online = false) => h.M.berechne({ vorgang, online });

/** Toutes les démarches avec leur numéro GebOSt, sur place et en ligne. */
function alle(h: Helpers): string {
  const de = h.lang === 'de';
  const ids: VorgangId[] = ['neu', 'gebraucht', 'umzugBehalten', 'umzugNeu', 'adresse', 'umschreibung', 'umschreibungNeu', 'abmelden', 'wieder', 'kennzeichenart', 'kurzzeit', 'ausfuhr'];
  const T = (id: VorgangId) => ({
    neu: de ? 'Neuwagen' : 'New car', gebraucht: de ? 'Gebrauchtwagen (war abgemeldet)' : 'Used car (was deregistered)',
    umzugBehalten: de ? 'Umzug, Kennzeichen bleibt' : 'Move, plate kept', umzugNeu: de ? 'Umzug, neues Kennzeichen' : 'Move, new plate',
    adresse: de ? 'Neue Anschrift im Kreis' : 'New address, same district', umschreibung: de ? 'Halterwechsel, Kennzeichen bleibt' : 'New keeper, plate kept',
    umschreibungNeu: de ? 'Halterwechsel, neues Kennzeichen' : 'New keeper, new plate', abmelden: de ? 'Abmelden' : 'Deregister',
    wieder: de ? 'Wiederzulassung, reserviertes Kennzeichen' : 'Re-registration, reserved plate', kennzeichenart: de ? 'Saison-, H- oder E-Kennzeichen' : 'Seasonal, H or E plate',
    kurzzeit: de ? 'Kurzzeitkennzeichen' : 'Short-term plate', ausfuhr: de ? 'Ausfuhrkennzeichen' : 'Export plate',
  } as Record<string, string>)[id];
  const rows = ids.map((id) => {
    const a = b(h, id), o = h.M.hatOnline(id) ? b(h, id, true) : null;
    return [T(id), a.fest[0].nr, h.eur(a.gebuehr), o ? `${h.eur(o.gebuehr)} (${o.fest[0].nr})` : '–'];
  });
  return h.table(de ? ['Vorgang', 'Nr.', 'Vor Ort', 'Online (Nr.)'] : ['Procedure', 'No.', 'In person', 'Online (no.)'], rows,
    de ? `Gebühr der Zulassungsbehörde ohne Nebenposten, GebOSt ${h.P.gebost_stand.de}` : `Registration office fee without small items, GebOSt ${h.P.gebost_stand.en}`, ['l', 'l', 'r', 'r']);
}

export default defineGuide({
  id: 'kosten',
  group: 'kosten',
  order: 1,
  tool: 'kosten',
  vorgang: 'neu',
  related: ['auto-anmelden-kosten', 'auto-ummelden', 'auto-abmelden', 'wunschkennzeichen', 'auto-online-anmelden'],
  sources: ['gebost', 'fzv9', 'fzv16', 'berlinZul', 'bmv'],
  de: {
    slug: 'zulassung-kosten',
    nav: 'Kostenrechner',
    card: 'Jede Gebühr mit ihrer Nummer, vor Ort und online, mit Wunschkennzeichen.',
    title: 'Zulassung Kosten 2026: Gebühren Zeile für Zeile berechnen',
    description: 'Zulassung Kosten 2026 nach der Gebührenordnung: Neuwagen, Gebrauchtwagen, Ummelden, Abmelden, Wunschkennzeichen, online oder vor Ort, jede Zeile mit Nummer.',
    h1: 'Was kostet die Zulassung? Gebühren nach Nummer',
    intro: 'Wählen Sie den Vorgang und die Optionen: Der Rechner zeigt jede Gebühr mit ihrer Nummer aus der Gebührenordnung und, getrennt, die kleinen Posten, die je nach Fall dazukommen.',
    resume: (h) => `Die Gebühren der Zulassungsbehörden stehen in der Gebührenordnung für Maßnahmen im Straßenverkehr (GebOSt), einer Bundesverordnung, ${h.P.gebost_stand.de}. Sie gelten in jedem Kreis gleich. Eine Neuzulassung kostet nach Nummer 221.1 ${h.eur(b(h, 'neu').gebuehr)} vor Ort und nach Nummer 221.1.1 ${h.eur(b(h, 'neu', true).gebuehr)} online, einschließlich des Plakettenträgers für den Versand. Die Ummeldung nach einem Umzug in einen anderen Kreis kostet ${h.eur(b(h, 'umzugBehalten').gebuehr)}, wenn das Kennzeichen bleibt, und ${h.eur(b(h, 'umzugNeu').gebuehr)} mit neuem Kennzeichen. Das Abmelden kostet ${h.eur(b(h, 'abmelden').gebuehr)} vor Ort und ${h.eur(b(h, 'abmelden', true).gebuehr)} online. Dazu kommen je nach Fall Stempelplaketten zu ${h.eur(h.P.zuschlag.stempelplakette[0])} oder ${h.eur(h.P.zuschlag.stempelplakette[1])} pro Schild, die HU-Plakette zu ${h.eur(h.P.zuschlag.huPlakette)} und ein Anteil des Kraftfahrt-Bundesamts von ${h.eur(h.P.kba['125'])} bis ${h.eur(h.P.kba['123.1'])}. Die Schilder selbst verkauft ein Schilderpräger zu freien Preisen.`,
    faqs: (h) => [
      { q: 'Sind die Zulassungsgebühren in jeder Stadt gleich?', a: `Die Gebühr der Behörde ja: Sie steht in einer Bundesverordnung und gilt überall, auch in Stadtstaaten. Unterschiede gibt es nur bei Kleinigkeiten. Stempelplaketten kosten ${h.eur(h.P.zuschlag.stempelplakette[0])} oder ${h.eur(h.P.zuschlag.stempelplakette[1])}, je nach Ausführung des Landes, und manche Behörden berechnen Versand oder Kartenzahlung gesondert. Wer in einer Stadt deutlich mehr zahlt, hat meist Schilder oder einen Zulassungsdienst mitbezahlt.` },
      { q: 'Warum ist die Online-Zulassung so viel billiger?', a: `Weil die Gebührenordnung für die internetbasierte Zulassung eigene, niedrigere Nummern vorsieht: Der Antrag wird automatisch geprüft, die Behörde spart Schalterzeit. Bei einer Neuzulassung beträgt der Unterschied ${h.eur(b(h, 'neu').ersparnisOnline ?? 0)}, beim Abmelden ${h.eur(b(h, 'abmelden').ersparnisOnline ?? 0)}. Für den Versand der Plaketten kommen online ${h.eur(h.P.zuschlag.plakettentraeger)} für den Plakettenträger dazu; der Rechner rechnet sie ein.` },
      { q: 'Was kostet ein Wunschkennzeichen zusätzlich?', a: `Die Zuteilung einer gewünschten Buchstaben- und Zahlenfolge kostet ${h.eur(h.P.zuschlag.wunsch)} zusätzlich zur Zulassungsgebühr. Wer die Kombination vorab, etwa online, reservieren lässt, zahlt für die Reservierung nach Nummer 230 weitere ${h.eur(h.P.land['230'])}. Manche Behörden nehmen die Reservierung über ein Portal mit Vorauszahlung an; die Beträge sind dieselben.` },
      { q: 'Sind Versicherung und Kfz-Steuer in den Kosten enthalten?', a: 'Nein. Die Versicherung schließen Sie vorher selbst ab; die Behörde braucht nur die eVB-Nummer als Nachweis. Die Kfz-Steuer setzt das Hauptzollamt nach der Zulassung fest und bucht sie per Lastschrift ab, deshalb verlangt die Behörde ein SEPA-Mandat. Beides sind laufende Kosten des Fahrzeugs, keine Zulassungsgebühren, und fehlen deshalb im Rechner.' },
    ],
    body: (h) => `<h2>Alle Vorgänge auf einen Blick</h2>
<p>Die Tabelle nennt für jeden Vorgang die Nummer der Gebührenordnung und den Betrag. Die Spalte „Online“ gilt für Anträge über das Portal i-Kfz; ein Strich bedeutet, dass die Verordnung für diesen Vorgang keine Online-Gebühr kennt.</p>
${alle(h)}
<h2>Feste Gebühr und kleine Posten</h2>
<p>Der Rechner trennt zwei Arten von Beträgen. Die erste ist die Gebühr der Zulassungsbehörde mit ihren Zuschlägen: Wunschkennzeichen ${h.eur(h.P.zuschlag.wunsch)}, Reservierung ${h.eur(h.P.land['230'])}, Umtausch eines alten Fahrzeugbriefs ${h.eur(h.P.zuschlag.fahrzeugbrief)}, Wechselkennzeichen ${h.eur(h.P.zuschlag.wechsel)}. Diese Beträge stehen wörtlich in der Verordnung und sind genau. Die zweite Art sind Nebenposten, die je nach Fall und Land schwanken: die beiden Stempelplaketten, die HU-Plakette und der Registereintrag beim Kraftfahrt-Bundesamt. Wir zeigen sie als Spanne, weil ihre Zuordnung zum einzelnen Vorgang unsere Lesart ist; die ${h.a('method', 'Methodik')} erklärt sie.</p>
<p>Zum Abgleich: Berlin veröffentlicht seine Beträge. Die Außerbetriebsetzung vor Ort kostet dort ${h.eur(h.P.lokal['11000'].posten[0].betrag)}; das sind die ${h.eur(h.P.land['224.1'])} der Nummer 224.1 und ${h.eur(h.P.kba['125'])} für das Kraftfahrt-Bundesamt. Die Rechnung geht auf den Cent auf.</p>
<h2>Was der Rechner nicht enthält</h2>
<p>Kennzeichenschilder prägt ein privater Schilderhändler; tragen Sie seinen Preis ein, wenn er mitgezählt werden soll. Zulassungsdienste, die den Gang zur Behörde übernehmen, berechnen eine eigene Vergütung. Versicherung und Kfz-Steuer sind keine Gebühren der Zulassung. Für Sonderfälle wie ${h.a('kurzzeitkennzeichen', 'Kurzzeitkennzeichen')}, ${h.a('ausfuhrkennzeichen', 'Ausfuhrkennzeichen')} oder ${h.a('h-kennzeichen', 'H-Kennzeichen')} gibt es eigene Seiten mit den Regeln der Fahrzeug-Zulassungsverordnung.</p>`,
  },
  en: {
    slug: 'registration-fees',
    nav: 'Fee calculator',
    card: 'Every fee with its number, in person and online, with personalised plates.',
    title: 'Car registration fees Germany 2026: line-by-line calculator',
    description: 'Car registration fees in Germany for 2026 under the federal fee schedule: new car, used car, moving, deregistering, personalised plates, online or in person.',
    h1: 'What does registering a car cost? Fees by number',
    intro: 'Pick the procedure and the options: the calculator shows each fee with its number in the fee schedule and, separately, the small items that may be added.',
    resume: (h) => `The fees charged by German registration offices are set in the road traffic fee schedule (Gebührenordnung für Maßnahmen im Straßenverkehr, GebOSt), a federal ordinance, ${h.P.gebost_stand.en}. They are the same in every district. Registering a new car costs ${h.eur(b(h, 'neu').gebuehr)} in person under number 221.1 and ${h.eur(b(h, 'neu', true).gebuehr)} online under number 221.1.1, including the seal carrier for postal delivery. Re-registering after moving to another district costs ${h.eur(b(h, 'umzugBehalten').gebuehr)} if you keep your plate and ${h.eur(b(h, 'umzugNeu').gebuehr)} with a new one. Deregistering costs ${h.eur(b(h, 'abmelden').gebuehr)} in person and ${h.eur(b(h, 'abmelden', true).gebuehr)} online. Depending on the case, registration seals at ${h.eur(h.P.zuschlag.stempelplakette[0])} or ${h.eur(h.P.zuschlag.stempelplakette[1])} per plate, the roadworthiness sticker at ${h.eur(h.P.zuschlag.huPlakette)} and a Federal Motor Transport Authority share of ${h.eur(h.P.kba['125'])} to ${h.eur(h.P.kba['123.1'])} are added. The plates themselves are sold by private plate makers at their own prices.`,
    faqs: (h) => [
      { q: 'Are registration fees the same in every German city?', a: `The office’s fee is: it is set in a federal ordinance and applies everywhere, including the city-states. Only small items differ. Registration seals cost ${h.eur(h.P.zuschlag.stempelplakette[0])} or ${h.eur(h.P.zuschlag.stempelplakette[1])} depending on the state’s design, and some offices charge separately for postage or card payment. Anyone paying much more in one city has usually also paid for plates or a registration agency.` },
      { q: 'Why is online registration so much cheaper in Germany?', a: `Because the fee schedule has separate, lower numbers for internet-based registration: the application is checked automatically and the office saves counter time. For a new car the difference is ${h.eur(b(h, 'neu').ersparnisOnline ?? 0)}, for deregistering ${h.eur(b(h, 'abmelden').ersparnisOnline ?? 0)}. Online, ${h.eur(h.P.zuschlag.plakettentraeger)} is added for the seal carrier sent by post; the calculator includes it.` },
      { q: 'How much extra does a personalised number cost?', a: `Being assigned a chosen combination of letters and digits costs ${h.eur(h.P.zuschlag.wunsch)} on top of the registration fee. Reserving the combination in advance, for example online, adds ${h.eur(h.P.land['230'])} under number 230. Some offices take reservations through a portal with advance payment; the amounts are the same.` },
      { q: 'Are insurance and vehicle tax included in the cost?', a: 'No. You take out insurance yourself beforehand; the office only needs the eVB number as proof. Vehicle tax is assessed by the customs office after registration and collected by direct debit, which is why the office asks for a SEPA mandate. Both are running costs of the vehicle, not registration fees, so the calculator leaves them out.' },
    ],
    body: (h) => `<h2>Every procedure at a glance</h2>
<p>The table gives each procedure’s number in the fee schedule and its amount. The “online” column applies to applications through the i-Kfz portal; a dash means the ordinance has no online fee for that procedure.</p>
${alle(h)}
<h2>Fixed fee and small items</h2>
<p>The calculator separates two kinds of amounts. The first is the registration office’s fee with its surcharges: personalised number ${h.eur(h.P.zuschlag.wunsch)}, reservation ${h.eur(h.P.land['230'])}, replacing an old logbook ${h.eur(h.P.zuschlag.fahrzeugbrief)}, interchangeable plate ${h.eur(h.P.zuschlag.wechsel)}. These are written in the ordinance and exact. The second kind are small items that vary by case and state: the two registration seals, the roadworthiness sticker and the register entry at the Federal Motor Transport Authority. We show them as a range because matching them to each procedure is our reading; the ${h.a('method', 'method page')} explains it.</p>
<p>As a cross-check, Berlin publishes its amounts. Deregistering in person costs ${h.eur(h.P.lokal['11000'].posten[0].betrag)} there: the ${h.eur(h.P.land['224.1'])} of number 224.1 plus ${h.eur(h.P.kba['125'])} for the Federal Motor Transport Authority. It adds up to the cent.</p>
<h2>What the calculator leaves out</h2>
<p>Number plates are made by a private plate shop; enter its price if you want it counted. Registration agencies that queue at the office for you charge their own fee. Insurance and vehicle tax are not registration fees. Special cases such as ${h.a('kurzzeitkennzeichen', 'short-term plates')}, ${h.a('ausfuhrkennzeichen', 'export plates')} or ${h.a('h-kennzeichen', 'H plates')} have their own pages with the rules of the Vehicle Registration Ordinance.</p>`,
  },
});
