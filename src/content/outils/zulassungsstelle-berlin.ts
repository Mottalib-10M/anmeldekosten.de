import { defineGuide, type Helpers } from '../../lib/guide-types';
import { stellenTabelle, feTabelle, bestandTabelle, bz, rangBev, rangDichte } from '../../lib/stadt';

const ID = '11000';
/** Montants publiés par Berlin, avec la ligne GebOSt quand ils se décomposent exactement. */
function berlin(h: Helpers): string {
  const de = h.lang === 'de';
  const L = h.P.lokal[ID];
  const zerlegt: Record<string, string> = {
    abmelden: `${h.eur(h.P.land['224.1'])} + ${h.eur(h.P.kba['125'])}`,
    abmeldenOnline: `${h.eur(h.P.land['224.2'])} + ${h.eur(h.P.kba['125'])}`,
    adresse: `${h.eur(h.P.land['225'])} + ${h.eur(h.P.zuschlag.zb1)} + ${h.eur(h.P.zuschlag.klebesiegel)} + ${h.eur(h.P.kba['125'])}`,
    umtausch: `${h.eur(h.P.fuehrerschein.umstellung)} + ${h.eur(h.P.fuehrerschein.zfer)}`,
  };
  const rows = L.posten.map((p) => [p[h.lang], h.eur(p.betrag), zerlegt[p.id] ?? (de ? 'nicht zerlegbar, nur angezeigt' : 'does not break down, shown only')]);
  return h.table(de ? ['Vorgang (Berliner Angabe)', 'Betrag', 'Abgleich mit GebOSt'] : ['Procedure (as Berlin states it)', 'Amount', 'Check against GebOSt'], rows,
    de ? `Beträge auf service.berlin.de, abgerufen am ${h.date(L.abgerufen)}` : `Amounts on service.berlin.de, retrieved ${h.date(L.abgerufen)}`, ['l', 'r', 'l']);
}

export default defineGuide({
  id: 'zulassungsstelle-berlin',
  group: 'staedte',
  order: 1,
  tool: 'finder',
  bezirk: ID,
  related: ['zulassungsstelle-hamburg', 'zulassungsstelle-leipzig', 'kosten', 'zulassungsstelle-termin', 'auto-online-anmelden'],
  sources: ['kbaAv', 'kbaFz1', 'berlinZul', 'berlinUmtausch', 'gebost'],
  de: {
    slug: 'zulassungsstelle-berlin',
    nav: 'Berlin',
    card: 'LABO mit Standorten Tempelhof und Hohenschönhausen, Berliner Beträge.',
    title: 'Zulassungsstelle Berlin: Standorte, Kosten und Termin 2026',
    description: 'Zulassungsstelle Berlin (LABO): Standorte Tempelhof und Hohenschönhausen, Führerscheinstelle, Gebühren 2026 nach GebOSt und die Beträge, die Berlin nennt.',
    h1: 'Zulassungsstelle Berlin: Standorte, Gebühren, Wunschkennzeichen',
    intro: 'Ganz Berlin hat eine einzige Zulassungsbehörde, das Landesamt für Bürger- und Ordnungsangelegenheiten, mit zwei Standorten. Hier stehen Anschriften, Gebühren und die Beträge, die Berlin nennt.',
    resume: (h) => { const s = bz(h, ID).stat!; const r = rangBev(h, ID), d = rangDichte(h, ID); return `In Berlin ist das Landesamt für Bürger- und Ordnungsangelegenheiten (LABO) für alle Zulassungen zuständig, gleich in welchem der zwölf Bezirke Sie wohnen. Das Verzeichnis des Kraftfahrt-Bundesamts nennt zwei Standorte: die Hauptstelle in der Jüterboger Straße in Kreuzberg, unter dem Ortsnamen Tempelhof geführt, und eine Außenstelle in der Ferdinand-Schultze-Straße in Hohenschönhausen. Das Kürzel ist B. In Berlin waren zum ${h.Z.META.fz1Stand} ${h.num(s.pkw)} Pkw zugelassen, nur ${h.num(s.pkwDichte)} je 1.000 Einwohner, die ${d.rang === 1 ? 'niedrigste Dichte' : `${h.num(d.rang)}.-niedrigste Dichte`} unter ${h.num(d.von)} Bezirken; der Anteil reiner Elektroautos lag bei ${h.pct(s.bev / s.pkw)}, Rang ${h.num(r.rang)} von ${h.num(r.von)}. Berlin veröffentlicht seine Gebühren, was einen Abgleich erlaubt: Die Außerbetriebsetzung kostet vor Ort ${h.eur(h.P.lokal[ID].posten[0].betrag)}, genau die ${h.eur(h.P.land['224.1'])} der Gebührenordnung plus ${h.eur(h.P.kba['125'])} für das Kraftfahrt-Bundesamt. Termine vergibt das LABO über service.berlin.de; vieles geht online, und online sind die Gebühren niedriger.`; },
    faqs: (h) => [
      { q: 'Muss ich in Berlin in meinem Bezirk zur Zulassungsstelle?', a: 'Nein. Berlin hat für die ganze Stadt eine einzige Zulassungsbehörde, das LABO. Sie können jeden der beiden Standorte nutzen, Tempelhof oder Hohenschönhausen, gleich ob Sie in Spandau oder in Marzahn wohnen. Entscheidend ist nur ein freier Termin. Die Bezirksämter selbst nehmen keine Kfz-Zulassungen an, wohl aber manche Bürgerämter Führerscheinanträge.' },
      { q: 'Warum nennt Berlin für die Neuzulassung einen anderen Betrag als dieser Rechner?', a: `Berlin gibt für die Erstzulassung vor Ort mindestens ${h.eur(h.P.lokal[ID].posten[2].betrag)} an. Der Betrag lässt sich mit der heutigen Gebührenordnung nicht auf den Cent zerlegen; er enthält Posten, die je nach Fall anfallen, und ist womöglich älter. Wir zeigen ihn mit Quelle, rechnen aber mit den Nummern der Verordnung: ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)} Gebühr, mit allen Nebenposten bis ${h.eur(h.M.berechne({ vorgang: 'neu' }).max)}.` },
      { q: 'Wo tausche ich in Berlin meinen Führerschein um?', a: `Bei der Fahrerlaubnisbehörde des LABO in der Puttkamerstraße in Kreuzberg; Anträge nehmen auch die Bürgerämter entgegen. Berlin nennt für den Umtausch ${h.eur(h.P.lokal[ID].posten.find((p) => p.id === 'umtausch')!.betrag)}, das sind die ${h.eur(h.P.fuehrerschein.umstellung)} der Gebührenordnung und ${h.eur(h.P.fuehrerschein.zfer)} für das Register. Ihre Frist berechnet der ${h.a('fuehrerschein-umtauschen', 'Umtausch-Rechner')}.` },
      { q: 'Wie bekomme ich in Berlin ein Wunschkennzeichen mit B?', a: `Reserviert wird bei der Behörde, die das Kürzel vergibt, in Berlin also beim LABO, für ${h.eur(h.P.zuschlag.reservierung)}. Bei der Zulassung kommt der Zuschlag für das Wunschkennzeichen von ${h.eur(h.P.zuschlag.wunsch)} hinzu, egal an welchem der beiden Standorte Sie zulassen. Ob eine Kombination frei ist und welche Folgen gesperrt sind, erklärt die Seite ${h.a('wunschkennzeichen-reservieren', 'Wunschkennzeichen reservieren')}; die Schilder lassen Sie mit der Bestätigung vorab prägen.` },
    ],
    body: (h) => `<h2>Die beiden Standorte des LABO</h2>
<p>Die Hauptstelle liegt an der Jüterboger Straße in Kreuzberg, die Außenstelle im Nordosten, in Hohenschönhausen. Beide haben dieselbe Telefonnummer, und beide arbeiten mit Termin. Welche Vorgänge an welchem Standort angeboten werden, steht auf service.berlin.de; das Verzeichnis des Kraftfahrt-Bundesamts nennt nur Anschriften.</p>
${stellenTabelle(h, ID)}
<h2>Was Berlin selbst veröffentlicht</h2>
<p>Berlin ist eine der wenigen Behörden, die ihre Gesamtbeträge je Vorgang nennen. Wo sich ein Betrag exakt aus der Gebührenordnung ergibt, zeigt die dritte Spalte die Zerlegung. Bei den übrigen geht die Rechnung mit der geltenden Fassung nicht auf; wir übernehmen sie deshalb nicht in den Rechner, sondern zeigen sie nur.</p>
${berlin(h)}
<h2>Führerscheinstelle und Fahrzeugbestand</h2>
${feTabelle(h, ID)}
${bestandTabelle(h, ID)}
<p>Für andere Orte in Brandenburg oder anderswo nennt die Suche oben die zuständige Stelle; die Stadtseiten ${h.a('zulassungsstelle-hamburg', 'Hamburg')} und ${h.a('zulassungsstelle-leipzig', 'Leipzig')} folgen demselben Aufbau.</p>`,
  },
  en: {
    slug: 'registration-office-berlin',
    nav: 'Berlin',
    card: 'LABO with offices in Tempelhof and Hohenschönhausen, Berlin’s own amounts.',
    title: 'Zulassungsstelle Berlin: registration offices and fees 2026',
    description: 'Zulassungsstelle Berlin (LABO): offices in Tempelhof and Hohenschönhausen, the licensing office, 2026 fees under the GebOSt and the amounts Berlin publishes.',
    h1: 'Berlin registration office: locations and fees',
    intro: 'All of Berlin has a single registration authority, the State Office for Citizens’ and Regulatory Affairs, with two locations. Here are the addresses, the fees and the amounts Berlin itself quotes.',
    resume: (h) => { const s = bz(h, ID).stat!; const r = rangBev(h, ID), d = rangDichte(h, ID); return `In Berlin the State Office for Citizens’ and Regulatory Affairs (Landesamt für Bürger- und Ordnungsangelegenheiten, LABO) handles every vehicle registration, whichever of the twelve boroughs you live in. The Federal Motor Transport Authority’s directory lists two locations: the main office on Jüterboger Straße in Kreuzberg, filed under the name Tempelhof, and a branch on Ferdinand-Schultze-Straße in Hohenschönhausen. The plate code is B. On ${h.Z.fz1Stand('en')} Berlin had ${h.num(s.pkw)} registered cars, only ${h.num(s.pkwDichte)} per 1,000 residents, ${d.rang === 1 ? 'the lowest density' : `rank ${h.num(d.rang)} from the bottom`} among ${h.num(d.von)} districts; ${h.pct(s.bev / s.pkw)} were fully electric, rank ${h.num(r.rang)} of ${h.num(r.von)} districts. Berlin publishes its fees, which allows a cross-check: deregistering in person costs ${h.eur(h.P.lokal[ID].posten[0].betrag)}, exactly the ${h.eur(h.P.land['224.1'])} of the fee schedule plus ${h.eur(h.P.kba['125'])} for the Federal Motor Transport Authority. LABO books appointments through service.berlin.de, and much can be done online.`; },
    faqs: (h) => [
      { q: 'Do I have to use the registration office of my Berlin borough?', a: 'No. Berlin has one registration authority for the whole city, LABO. You can use either location, Tempelhof or Hohenschönhausen, whether you live in Spandau or Marzahn; what matters is a free appointment. The borough offices do not register vehicles, although some citizens’ offices (Bürgerämter) accept driving licence applications.' },
      { q: 'Why does Berlin quote a different new-registration amount than this calculator?', a: `Berlin states at least ${h.eur(h.P.lokal[ID].posten[2].betrag)} for a first registration in person. That amount does not break down to the cent under the current fee schedule; it includes items that depend on the case and may be older. We show it with its source but calculate from the ordinance’s numbers: ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)} in fees, up to ${h.eur(h.M.berechne({ vorgang: 'neu' }).max)} with every small item.` },
      { q: 'Where do I exchange my driving licence in Berlin?', a: `At LABO’s licensing office on Puttkamerstraße in Kreuzberg; the citizens’ offices also take applications. Berlin quotes ${h.eur(h.P.lokal[ID].posten.find((p) => p.id === 'umtausch')!.betrag)} for the exchange: the ${h.eur(h.P.fuehrerschein.umstellung)} of the fee schedule plus ${h.eur(h.P.fuehrerschein.zfer)} for the register. The ${h.a('fuehrerschein-umtauschen', 'exchange calculator')} gives your deadline, by year of birth or year of issue.` },
      { q: 'How do I get a personalised B plate in Berlin?', a: `You reserve with the office that issues the code, in Berlin the LABO, for ${h.eur(h.P.zuschlag.reservierung)}. At registration the personalised-plate surcharge of ${h.eur(h.P.zuschlag.wunsch)} is added, whichever of the two sites you use. Whether a combination is free and which sequences are blocked is explained under ${h.a('wunschkennzeichen-reservieren', 'reserving a personalised plate')}; with the confirmation you can have the plates pressed in advance.` },
    ],
    body: (h) => `<h2>LABO’s two locations</h2>
<p>The main office is on Jüterboger Straße in Kreuzberg, the branch in the north-east, in Hohenschönhausen. Both share one phone number and both work by appointment. Which procedures each location offers is stated on service.berlin.de; the Federal Motor Transport Authority’s directory only gives addresses.</p>
${stellenTabelle(h, ID)}
<h2>What Berlin publishes itself</h2>
<p>Berlin is one of the few offices that state a total per procedure. Where an amount follows exactly from the fee schedule, the third column shows how. The others do not add up under the version in force, so we do not use them in the calculator; we only show them.</p>
${berlin(h)}
<h2>Licensing office and vehicles</h2>
${feTabelle(h, ID)}
${bestandTabelle(h, ID)}
<p>For other places in Brandenburg or elsewhere the search above names the office in charge; the city pages for ${h.a('zulassungsstelle-hamburg', 'Hamburg')} and ${h.a('zulassungsstelle-leipzig', 'Leipzig')} follow the same layout.</p>`,
  },
});
