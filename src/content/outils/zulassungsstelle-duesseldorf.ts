import { defineGuide } from '../../lib/guide-types';
import { stadtKoerper, bz, rangBev, rangDichte } from '../../lib/stadt';

const ID = '05111';

export default defineGuide({
  id: 'zulassungsstelle-duesseldorf',
  group: 'staedte',
  order: 7,
  tool: 'finder',
  bezirk: ID,
  related: ['zulassungsstelle-koeln', 'zulassungsstelle-essen', 'wunschkennzeichen', 'kosten', 'auto-anmelden-unterlagen'],
  sources: ['kbaAv', 'kbaFz1', 'gebost', 'fzv9'],
  de: {
    slug: 'zulassungsstelle-duesseldorf',
    nav: 'Düsseldorf',
    card: 'Höherweg 101 für Auto und Führerschein, Kürzel D, Mettmanner D auslaufend.',
    title: 'Zulassungsstelle Düsseldorf: Höherweg, Kürzel D, Gebühren',
    description: 'Zulassungsstelle Düsseldorf am Höherweg 101: Anschrift, Führerscheinstelle unter derselben Adresse, Kürzel D, das auslaufende D in Mettmann, Gebühren 2026.',
    h1: 'Zulassungsstelle Düsseldorf: alles am Höherweg',
    intro: 'Zulassung und Führerschein sitzen in Düsseldorf unter einer Adresse. Das Kürzel D gehört heute nur der Stadt, auch wenn es noch an Autos aus dem Kreis Mettmann hängt.',
    resume: (h) => { const s = bz(h, ID).stat!, r = rangBev(h, ID), d = rangDichte(h, ID); return `In der Landeshauptstadt Düsseldorf ist das Amt für Einwohnerwesen sowohl Zulassungsbehörde als auch Fahrerlaubnisbehörde, beide am Höherweg 101, Postleitzahl 40233. Außenstellen für die Zulassung nennt das Verzeichnis des Kraftfahrt-Bundesamts nicht. Das Kürzel D wird nur in der Stadt neu vergeben; im benachbarten Kreis Mettmann ist es als auslaufend vermerkt, weil dort noch Fahrzeuge mit D-Kennzeichen zugelassen sind. Mit ${h.num(s.pkw)} Pkw zum ${h.Z.META.fz1Stand} kommt Düsseldorf auf ${h.num(s.pkwDichte)} Pkw je 1.000 Einwohner, mehr als Köln oder Hamburg, aber unter dem Bundeswert von ${h.num(h.Z.META.total.pkwDichte)}; bei der Dichte liegt die Stadt auf Rang ${h.num(d.rang)} von unten. ${h.pct(s.bev / s.pkw)} der Pkw sind reine Elektroautos, Rang ${h.num(r.rang)} von ${h.num(r.von)}. Die Gebühren sind die bundesweiten der Gebührenordnung, ${h.P.gebost_stand.de}: ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)} für eine Neuzulassung vor Ort.`; },
    faqs: (h) => [
      { q: 'Warum haben Autos aus Mettmann manchmal ein D-Kennzeichen?', a: 'Weil der heutige Kreis Mettmann bis zur Gebietsreform der 1970er-Jahre Kreis Düsseldorf-Mettmann hieß und das D führte. Das Kraftfahrt-Bundesamt führt D beim Kreis Mettmann deshalb als auslaufendes Kürzel: Es bleibt an zugelassenen Fahrzeugen, wird dort aber nicht mehr neu vergeben. Neue Kennzeichen im Kreis tragen ME.' },
      { q: 'Wie bekomme ich in Düsseldorf ein Kennzeichen mit nur einem Buchstaben?', a: `Ein Kürzel aus einem Buchstaben wie D lässt mehr Platz für die Erkennungsnummer, das Kennzeichen bleibt kurz. Eine bestimmte Folge wie D-AB 12 beantragen Sie als Wunschkennzeichen für ${h.eur(h.P.zuschlag.wunsch)} zusätzlich, mit Reservierung für ${h.eur(h.P.land['230'])} mehr. Kurze Kombinationen sind begehrt und oft vergeben.` },
      { q: 'Muss ich für den Führerschein in Düsseldorf an eine andere Adresse?', a: 'Nein, laut Verzeichnis des Kraftfahrt-Bundesamts sitzt die Fahrerlaubnisbehörde ebenfalls am Höherweg 101. Telefonnummer und Termine sind aber getrennt von der Zulassung. Dort werden auch alte Führerscheine umgetauscht und internationale Führerscheine ausgestellt. Wer beides an einem Tag erledigen will, braucht deshalb trotz gleicher Adresse zwei Termine.' },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Der Höherweg liegt östlich der Innenstadt. Die Stadt vergibt Termine online und bietet i-Kfz für die Online-Zulassung an, wie alle Zulassungsbehörden.',
      `Für Neuss, Ratingen oder Hilden ist die Behörde des jeweiligen Kreises zuständig; die Suche oben nennt sie. Welche Papiere Sie mitbringen, steht in der ${h.a('auto-anmelden-unterlagen', 'Checkliste')}; die Gebühren für jeden Fall rechnet der ${h.a('kosten', 'Kostenrechner')}.`),
  },
  en: {
    slug: 'registration-office-duesseldorf',
    nav: 'Düsseldorf',
    card: 'Höherweg 101 for cars and licences, code D, phased out in Mettmann.',
    title: 'Zulassungsstelle Düsseldorf: Höherweg office, code D, fees',
    description: 'Zulassungsstelle Düsseldorf at Höherweg 101: address, licensing office at the same site, plate code D and the phased-out D in the Mettmann district, 2026 fees.',
    h1: 'Düsseldorf registration office: all at Höherweg',
    intro: 'In Düsseldorf registration and driving licences share one address. Today the code D belongs to the city alone, even if it is still seen on cars from the Mettmann district.',
    resume: (h) => { const s = bz(h, ID).stat!, r = rangBev(h, ID), d = rangDichte(h, ID); return `In the state capital Düsseldorf the residents’ office (Amt für Einwohnerwesen) is both the registration office and the licensing office, both at Höherweg 101, postcode 40233. The Federal Motor Transport Authority’s directory lists no registration branches. The code D is issued only in the city; in the neighbouring district of Mettmann it is marked as phased out, because vehicles there still carry D plates. With ${h.num(s.pkw)} cars on ${h.Z.fz1Stand('en')}, Düsseldorf has ${h.num(s.pkwDichte)} cars per 1,000 residents, more than Cologne or Hamburg but below the national figure of ${h.num(h.Z.META.total.pkwDichte)}; for density the city ranks ${h.num(d.rang)} from the bottom. ${h.pct(s.bev / s.pkw)} of its cars are fully electric, rank ${h.num(r.rang)} of ${h.num(r.von)}. Fees are the national ones of the fee schedule, ${h.P.gebost_stand.en}: ${h.eur(h.M.berechne({ vorgang: 'neu' }).gebuehr)} for a new registration in person.`; },
    faqs: (h) => [
      { q: 'Why do some cars from Mettmann have a D plate?', a: 'Because today’s Mettmann district was called Düsseldorf-Mettmann until the local government reform of the 1970s and used D. The Federal Motor Transport Authority therefore lists D for the Mettmann district as a phased-out code: it stays on registered vehicles but is no longer issued there. New plates in the district carry ME.' },
      { q: 'How do I get a short Düsseldorf plate?', a: `A one-letter code like D leaves more room for the identification number and keeps the plate short. You apply for a specific sequence such as D-AB 12 as a personalised number for ${h.eur(h.P.zuschlag.wunsch)} extra, plus ${h.eur(h.P.land['230'])} if you reserve it. Short combinations are popular and often taken.` },
      { q: 'Is the Düsseldorf driving licence office at a different address?', a: 'No, according to the Federal Motor Transport Authority’s directory the licensing office is also at Höherweg 101. Its phone number and appointments are separate from registration, though. Old licences are exchanged and international driving permits issued there too, so doing both on one day still takes two appointments.' },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Höherweg is east of the city centre. The city books appointments online and, like every registration office, offers i-Kfz for online registration.',
      `For Neuss, Ratingen or Hilden the office of the respective district is in charge; the search above names it. Which papers to bring is in the ${h.a('auto-anmelden-unterlagen', 'checklist')}; the ${h.a('kosten', 'fee calculator')} works out every case.`),
  },
});
