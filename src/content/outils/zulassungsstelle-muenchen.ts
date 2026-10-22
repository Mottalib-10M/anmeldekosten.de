import { defineGuide } from '../../lib/guide-types';
import { stadtKoerper, bz, rangBev, rangPkw } from '../../lib/stadt';

const ID = '09162';

export default defineGuide({
  id: 'zulassungsstelle-muenchen',
  group: 'staedte',
  order: 2,
  tool: 'finder',
  bezirk: ID,
  related: ['zulassungsstelle-stuttgart', 'zulassungsstelle-frankfurt', 'wunschkennzeichen', 'kosten', 'auto-ummelden'],
  sources: ['kbaAv', 'kbaFz1', 'gebost', 'fzv9'],
  de: {
    slug: 'zulassungsstelle-muenchen',
    nav: 'München',
    card: 'KVR an der Eichstätter Straße, Kürzel M und MUC, Landkreis getrennt.',
    title: 'Zulassungsstelle München: KVR, Kürzel M und MUC, Kosten',
    description: 'Zulassungsstelle München im Kreisverwaltungsreferat: Anschrift, Führerscheinstelle, Kürzel M und MUC, Abgrenzung zum Landkreis und Gebühren 2026 nach GebOSt.',
    h1: 'Zulassungsstelle München: Stadt oder Landkreis?',
    intro: 'In München gibt es zwei Zulassungsbehörden mit demselben Kürzel M: die der Landeshauptstadt und die des Landkreises. Welche zuständig ist, hängt allein von Ihrer Meldeadresse ab.',
    resume: (h) => { const s = bz(h, ID).stat!, r = rangBev(h, ID), g = rangPkw(h, ID); return `Wer in der Landeshauptstadt München gemeldet ist, lässt sein Fahrzeug beim Kreisverwaltungsreferat (KVR) zu, das laut Verzeichnis des Kraftfahrt-Bundesamts eine einzige Zulassungsstelle an der Eichstätter Straße 2 betreibt; dort sitzt auch die Fahrerlaubnisbehörde. Die Stadt vergibt die Kürzel M und MUC. Das M teilt sie mit dem Landkreis München, dessen eigene Zulassungsstelle in Grasbrunn-Neukeferloh liegt: Gemeinden wie Unterhaching, Garching oder Ottobrunn gehören dorthin, nicht zum KVR. MUC dagegen gibt es nur in der Stadt. Mit ${h.num(s.pkw)} Pkw zum ${h.Z.META.fz1Stand} ist München der ${h.num(g.rang)}.-größte Zulassungsbezirk Deutschlands, und mit ${h.pct(s.bev / s.pkw)} reinen Elektroautos liegt er auf Rang ${h.num(r.rang)} von ${h.num(r.von)}. Die Gebühren sind die bundesweiten: ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)} für eine Neuzulassung vor Ort, ${h.eur(h.M.berechne({ vorgang: 'neu', online: true }).gebuehr)} online (Stand ${h.Z.META.av1Stand}). Ein Wunschkennzeichen kostet ${h.eur(h.P.zuschlag.wunsch)} mehr.`; },
    faqs: (h) => [
      { q: 'Ich wohne in Unterhaching: KVR oder Landratsamt München?', a: 'Das Landratsamt. Unterhaching gehört wie alle Gemeinden rund um die Stadt zum Landkreis München, und der hat eine eigene Zulassungsbehörde in Grasbrunn-Neukeferloh. Das KVR ist nur für Halter mit Hauptwohnsitz innerhalb der Stadtgrenze zuständig. Das Kürzel M bekommen Sie in beiden Fällen; die Suche oben ordnet jede Gemeinde über ihren Gemeindeschlüssel richtig zu.' },
      { q: 'Kann ich in München statt M das Kürzel MUC wählen?', a: `Ja, als Halter in der Stadt München. Die Landeshauptstadt führt beide Kürzel, Sie wählen bei der Zulassung. Die Wahl des Kürzels kostet nichts zusätzlich; nur die gewünschte Buchstaben- und Zahlenfolge dahinter ist ein Wunschkennzeichen für ${h.eur(h.P.zuschlag.wunsch)}. Im Landkreis München gibt es MUC nicht.` },
      { q: 'Wie viele Elektroautos fahren in München?', a: `Zum ${h.Z.META.fz1Stand} zählte das Kraftfahrt-Bundesamt in der Stadt ${h.num(bz(h, ID).stat!.bev)} reine Elektro-Pkw und ${h.num(bz(h, ID).stat!.phev)} Plug-in-Hybride, zusammen ${h.pct((bz(h, ID).stat!.bev + bz(h, ID).stat!.phev) / bz(h, ID).stat!.pkw)} aller Pkw. Das E-Kennzeichen können Halter solcher Fahrzeuge bei der Zulassung wählen. Wie sich München im Vergleich schlägt, zeigt die Tabelle unten neben den Werten für ganz Deutschland.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Das KVR fasst Zulassung und Führerscheinwesen an einem Standort zusammen. Termine vergibt es online; welche Vorgänge ohne Termin möglich sind, regelt das KVR selbst und ändert es von Zeit zu Zeit, deshalb nennen wir hier keine Öffnungszeiten.',
      `Für den Landkreis, für Dachau, Fürstenfeldbruck oder Freising nennt die Suche oben die jeweilige Behörde. Die Kosten für jeden Vorgang rechnet der ${h.a('kosten', 'Kostenrechner')}; wie man das passende Kürzel und die Erkennungsnummer wählt, erklärt die Seite zum ${h.a('wunschkennzeichen', 'Wunschkennzeichen')}.`),
  },
  en: {
    slug: 'registration-office-munich',
    nav: 'Munich',
    card: 'KVR on Eichstätter Straße, codes M and MUC, the district apart.',
    title: 'Zulassungsstelle München: Munich KVR, plate codes and fees',
    description: 'Zulassungsstelle München at the Kreisverwaltungsreferat: address, licensing office, plate codes M and MUC, city versus district, and 2026 fees under the GebOSt.',
    h1: 'Munich registration office: city or district?',
    intro: 'Munich has two registration authorities sharing the code M: the city’s and the surrounding district’s. Which one is yours depends only on your registered address.',
    resume: (h) => { const s = bz(h, ID).stat!, r = rangBev(h, ID), g = rangPkw(h, ID); return `Anyone registered in the city of Munich registers a vehicle with the Kreisverwaltungsreferat (KVR), which according to the Federal Motor Transport Authority’s directory runs a single registration office at Eichstätter Straße 2, also home to the licensing office. The city issues the codes M and MUC. It shares M with the district of Munich (Landkreis München), whose own office is in Grasbrunn-Neukeferloh: municipalities such as Unterhaching, Garching or Ottobrunn belong there, not to the KVR. MUC exists only in the city. With ${h.num(s.pkw)} cars on ${h.Z.fz1Stand('en')}, Munich is Germany’s number ${h.num(g.rang)} registration district by size, and with ${h.pct(s.bev / s.pkw)} fully electric cars it ranks ${h.num(r.rang)} of ${h.num(r.von)}. Fees are the national ones: ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)} for a new registration in person, ${h.eur(h.M.berechne({ vorgang: 'neu', online: true }).gebuehr)} online (as of ${h.Z.avStand('en')}).`; },
    faqs: (h) => [
      { q: 'I live in Unterhaching: the KVR or the Munich district office?', a: 'The district office (Landratsamt). Unterhaching, like every municipality around the city, belongs to the district of Munich, which has its own registration office in Grasbrunn-Neukeferloh. The KVR only handles keepers whose main address is inside the city boundary. You get the code M either way; the search above assigns each municipality correctly through its official key.' },
      { q: 'Can I choose MUC instead of M on a Munich plate?', a: `Yes, if you live in the city of Munich. The city uses both codes and you choose at registration. Choosing the code costs nothing extra; only a chosen sequence of letters and digits after it is a personalised number at ${h.eur(h.P.zuschlag.wunsch)}. The district of Munich does not issue MUC.` },
      { q: 'How many electric cars are registered in Munich?', a: `On ${h.Z.fz1Stand('en')} the Federal Motor Transport Authority counted ${h.num(bz(h, ID).stat!.bev)} fully electric cars and ${h.num(bz(h, ID).stat!.phev)} plug-in hybrids in the city, together ${h.pct((bz(h, ID).stat!.bev + bz(h, ID).stat!.phev) / bz(h, ID).stat!.pkw)} of all cars. Keepers of such vehicles can choose the E plate at registration. The table below sets Munich against the figures for Germany as a whole.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'The KVR handles vehicle registration and driving licences at one site. It books appointments online; which procedures work without one is decided by the KVR and changes from time to time, so we do not give opening hours here.',
      `For the district of Munich, Dachau, Fürstenfeldbruck or Freising the search above names the right office. The ${h.a('kosten', 'fee calculator')} works out each procedure; how to pick the code and the identification number is explained on the ${h.a('wunschkennzeichen', 'personalised number')} page.`),
  },
});
