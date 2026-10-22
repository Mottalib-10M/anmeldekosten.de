import { defineGuide } from '../../lib/guide-types';
import { stadtKoerper, bz, rangBev, rangPkw } from '../../lib/stadt';

const ID = '06412';

export default defineGuide({
  id: 'zulassungsstelle-frankfurt',
  group: 'staedte',
  order: 5,
  tool: 'finder',
  bezirk: ID,
  related: ['zulassungsstelle-stuttgart', 'zulassungsstelle-koeln', 'kfz-kennzeichen', 'kosten', 'auto-online-anmelden'],
  sources: ['kbaAv', 'kbaFz1', 'gebost', 'fzv9'],
  de: {
    slug: 'zulassungsstelle-frankfurt',
    nav: 'Frankfurt am Main',
    card: 'Am Römerhof, Kürzel F, auslaufende FB- und FH-Kennzeichen.',
    title: 'Zulassungsstelle Frankfurt: Am Römerhof, Kürzel F, Kosten',
    description: 'Zulassungsstelle Frankfurt am Main: Anschrift Am Römerhof, Führerscheinstelle, Kürzel F, was aus FB und FH wurde, Fahrzeugbestand und Gebühren 2026 nach GebOSt.',
    h1: 'Zulassungsstelle Frankfurt am Main: Am Römerhof',
    intro: 'Frankfurt lässt Fahrzeuge und Führerscheine am selben Ort, Am Römerhof, bearbeiten. Das Kürzel ist F; zwei ältere Kürzel hängen noch an manchen Autos.',
    resume: (h) => { const s = bz(h, ID).stat!, r = rangBev(h, ID), g = rangPkw(h, ID); return `Die Stadt Frankfurt am Main hat eine einzige Zulassungsstelle, Am Römerhof 19, unter derselben Anschrift wie die Fahrerlaubnisbehörde des Ordnungsamts. So steht es im Verzeichnis des Kraftfahrt-Bundesamts, Stand ${h.Z.META.av1Stand}. Neu vergeben wird nur das Kürzel F. Das Verzeichnis vermerkt für Frankfurt außerdem zwei auslaufende Kürzel: FB, das heute der Wetteraukreis in Friedberg wieder ausgibt, und FH, das früher für Frankfurt-Höchst stand und bei mehreren Nachbarbehörden ebenfalls nur noch auslaufend geführt wird. Zum ${h.Z.META.fz1Stand} waren in Frankfurt ${h.num(s.pkw)} Pkw zugelassen, Rang ${h.num(g.rang)} unter den Zulassungsbezirken. Mit ${h.pct(s.bev / s.pkw)} reinen Elektroautos und ${h.pct(s.phev / s.pkw)} Plug-in-Hybriden liegt die Stadt beim Elektroanteil auf Rang ${h.num(r.rang)} von ${h.num(r.von)}; Firmenwagen zählen dabei am Sitz des Unternehmens, nicht am Wohnort des Fahrers. Die Gebühren sind die der Bundesverordnung.`; },
    faqs: (h) => [
      { q: 'Bekomme ich in Frankfurt noch ein FH-Kennzeichen?', a: 'Nein. FH ist laut Verzeichnis des Kraftfahrt-Bundesamts in Frankfurt nur noch auslaufend vermerkt: Wer es am Auto hat, behält es, neu zugeteilt wird es nicht. Neue Frankfurter Kennzeichen beginnen mit F. Wer FB möchte, müsste im Wetteraukreis wohnen, der das Kürzel heute ausgibt.' },
      { q: 'Wo wird ein Frankfurter Firmenwagen zugelassen?', a: `Am Sitz des Unternehmens oder der Niederlassung, die als Halter eingetragen wird, nicht am Wohnort des Fahrers. Sitzt die Firma in Frankfurt, ist die Zulassungsstelle Am Römerhof zuständig. Für Firmen gibt es eigene Unterlagen, etwa den Handelsregisterauszug und eine Vollmacht; die Gebühr bleibt ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)} für eine Neuzulassung vor Ort.` },
      { q: 'Ich wohne in Offenbach: Zulassungsstelle Frankfurt oder Offenbach?', a: `Offenbach. Die Stadt Offenbach am Main ist kreisfrei und hat ihre eigene Zulassungsbehörde, ebenso der Kreis Offenbach. Das Frankfurter Amt ist nur für Halter mit Hauptwohnsitz in Frankfurt zuständig. Online über i-Kfz geht die Zulassung ebenfalls an Ihre eigene Behörde, kostet aber nur ${h.eur(h.M.berechne({ vorgang: 'neu', online: true }).gebuehr)}.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Zulassung und Führerschein teilen sich in Frankfurt die Anschrift, haben aber getrennte Telefonnummern und Termine. Das Verzeichnis nennt für die Zulassung die unten stehende Durchwahl.',
      `Für den Main-Taunus-Kreis, den Hochtaunuskreis oder Offenbach nennt die Suche oben die eigene Behörde. Welche Kürzel es im Rhein-Main-Gebiet gibt und welche auslaufen, zeigt die ${h.a('kfz-kennzeichen', 'Kennzeichen-Liste')}; online zulassen erklärt ${h.a('auto-online-anmelden', 'diese Seite')}.`),
  },
  en: {
    slug: 'registration-office-frankfurt',
    nav: 'Frankfurt am Main',
    card: 'Am Römerhof, code F, phased-out FB and FH plates.',
    title: 'Zulassungsstelle Frankfurt: Am Römerhof office, code F, fees',
    description: 'Zulassungsstelle Frankfurt am Main: the Am Römerhof address, licensing office, plate code F, what became of FB and FH, vehicle numbers and the 2026 fees.',
    h1: 'Frankfurt registration office: Am Römerhof',
    intro: 'Frankfurt handles vehicles and driving licences at the same address, Am Römerhof. The code is F; two older codes are still on some cars.',
    resume: (h) => { const s = bz(h, ID).stat!, r = rangBev(h, ID), g = rangPkw(h, ID); return `The city of Frankfurt am Main has a single registration office, Am Römerhof 19, at the same address as the public order office’s licensing department. That is how the Federal Motor Transport Authority’s directory lists it, as of ${h.Z.avStand('en')}. Only the code F is issued. The directory also notes two phased-out codes for Frankfurt: FB, which the Wetterau district in Friedberg now issues again, and FH, which used to stand for Frankfurt-Höchst and is likewise listed only as phased out at several neighbouring offices. On ${h.Z.fz1Stand('en')} Frankfurt had ${h.num(s.pkw)} registered cars, rank ${h.num(g.rang)} among registration districts. With ${h.pct(s.bev / s.pkw)} fully electric cars and ${h.pct(s.phev / s.pkw)} plug-in hybrids it ranks ${h.num(r.rang)} of ${h.num(r.von)} for electric share; company cars are counted at the firm’s seat, not where the driver lives. Fees are those of the federal ordinance.`; },
    faqs: (h) => [
      { q: 'Can I still get an FH plate in Frankfurt?', a: 'No. According to the Federal Motor Transport Authority’s directory, FH is only listed as phased out in Frankfurt: cars that carry it keep it, but it is not issued again. New Frankfurt plates start with F. To get FB you would have to live in the Wetterau district, which issues that code today.' },
      { q: 'Where is a Frankfurt company car registered?', a: `At the seat of the company or branch entered as keeper, not at the driver’s home. If the firm is based in Frankfurt, the Am Römerhof office handles it. Companies need extra documents, such as a commercial register extract and a power of attorney; the fee stays at ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)} for a new registration in person.` },
      { q: 'I live in Offenbach: Frankfurt or Offenbach registration office?', a: `Offenbach. The city of Offenbach am Main is independent of any district and has its own registration office, as does the district of Offenbach. The Frankfurt office only serves keepers whose main address is in Frankfurt. Online through i-Kfz your application also goes to your own office, but costs just ${h.eur(h.M.berechne({ vorgang: 'neu', online: true }).gebuehr)}.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'In Frankfurt vehicle registration and driving licences share an address but have separate phone numbers and appointments. The directory gives the registration extension shown below.',
      `For the Main-Taunus district, the Hochtaunus district or Offenbach the search above names the right office. Which codes exist around Frankfurt and which are being phased out is shown in the ${h.a('kfz-kennzeichen', 'plate code list')}; registering online is explained on ${h.a('auto-online-anmelden', 'this page')}.`),
  },
});
