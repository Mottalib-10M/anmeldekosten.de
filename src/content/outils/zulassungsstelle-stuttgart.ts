import { defineGuide } from '../../lib/guide-types';
import { stadtKoerper, bz, rangBev } from '../../lib/stadt';

const ID = '08111';

export default defineGuide({
  id: 'zulassungsstelle-stuttgart',
  group: 'staedte',
  order: 6,
  tool: 'finder',
  bezirk: ID,
  related: ['zulassungsstelle-muenchen', 'zulassungsstelle-frankfurt', 'fuehrerschein-umtauschen', 'kosten', 'h-kennzeichen'],
  sources: ['kbaAv', 'kbaFz1', 'gebost', 'fev8e'],
  de: {
    slug: 'zulassungsstelle-stuttgart',
    nav: 'Stuttgart',
    card: 'Krailenshaldenstraße in Feuerbach, Führerschein in den Bürgerbüros, Kürzel S.',
    title: 'Zulassungsstelle Stuttgart: Anschrift, Bürgerbüros, Kosten',
    description: 'Zulassungsstelle Stuttgart in der Krailenshaldenstraße: Anschrift, Führerschein in den Bürgerbüros, Kürzel S, Elektroanteil und Gebühren 2026 nach GebOSt.',
    h1: 'Zulassungsstelle Stuttgart: Feuerbach und Bürgerbüros',
    intro: 'Autos lässt Stuttgart an einem Ort zu, Führerscheine nehmen dagegen viele Bürgerbüros an. Dazu die Zahlen eines Bezirks mit besonders vielen Elektroautos.',
    resume: (h) => { const s = bz(h, ID).stat!, r = rangBev(h, ID); const fe = h.Z.paketVon(ID).fe.length; return `Die Landeshauptstadt Stuttgart betreibt eine einzige Kfz-Zulassungsstelle, in der Krailenshaldenstraße 32 im Stadtbezirk Feuerbach, Postleitzahl 70469. Für den Führerschein ist das Amt für öffentliche Ordnung zuständig, mit der Führerscheinstelle am Löwentorbogen und den Bürgerbüros der Stadtbezirke: Insgesamt nennt das Verzeichnis des Kraftfahrt-Bundesamts ${h.num(fe)} Anschriften, an denen Stuttgarter einen Führerschein beantragen oder umtauschen können. Das Kürzel ist S. Stuttgart gehört zu den Bezirken mit dem höchsten Elektroanteil: Zum ${h.Z.META.fz1Stand} fuhren ${h.pct(s.bev / s.pkw)} der ${h.num(s.pkw)} Pkw rein elektrisch, Rang ${h.num(r.rang)} von ${h.num(r.von)}, und weitere ${h.pct(s.phev / s.pkw)} als Plug-in-Hybrid. Der Dieselanteil lag bei ${h.pct(s.diesel / s.pkw)}, unter dem Bundesdurchschnitt von ${h.pct(h.Z.META.total.diesel / h.Z.META.total.pkw)}. Die Gebühren sind bundesweit gleich; ein Wunschkennzeichen kostet ${h.eur(h.P.zuschlag.wunsch)} zusätzlich. Einen eigenen Stuttgarter Tarif gibt es nicht: Die Stadt erhebt die Beträge der Bundesverordnung.`; },
    faqs: (h) => [
      { q: 'Kann ich in einem Stuttgarter Bürgerbüro mein Auto zulassen?', a: 'Laut Verzeichnis des Kraftfahrt-Bundesamts nicht: Für Zulassungen nennt es nur die Krailenshaldenstraße. Die Bürgerbüros stehen dort als Anlaufstellen für Führerscheinanträge. Ohne Weg nach Feuerbach geht die Zulassung online, wenn der Personalausweis die Online-Funktion hat und die Fahrzeugpapiere einen Sicherheitscode tragen.' },
      { q: 'Wohne ich in Esslingen oder Ludwigsburg, ist Stuttgart zuständig?', a: 'Nein. Esslingen gehört zum Landkreis Esslingen, Ludwigsburg zum Landkreis Ludwigsburg; beide haben eigene Zulassungsbehörden und eigene Kürzel, ES und LB. Stuttgart ist ein Stadtkreis und nur für Halter in der Stadt zuständig. Ein S-Kennzeichen dürfen Sie nach dem Umzug ins Umland trotzdem behalten.' },
      { q: 'Wo tausche ich in Stuttgart meinen alten Führerschein um?', a: `In jedem Bürgerbüro oder bei der Führerscheinstelle am Löwentorbogen, laut Verzeichnis. Die Gebühr beträgt ${h.eur(h.M.UMTAUSCH_GEBUEHR)}. Karten aus den Jahren ${h.P.fuehrerschein.karte[0].von} bis ${h.P.fuehrerschein.karte[0].bis} waren bis zum ${h.date(h.P.fuehrerschein.karte[0].frist)} umzutauschen; welche Frist für Sie gilt, nennt der Umtausch-Rechner. Mitzubringen sind Ausweis, Passfoto und der alte Führerschein.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Die Zulassungsstelle liegt im Norden der Stadt. Ihre Telefonnummer steht in der Tabelle; Termine und Online-Dienste bietet die Stadt auf ihrer Website an.',
      `Die vielen Führerscheinanschriften in der zweiten Tabelle sind die Bürgerbüros. Für einen Umtausch genügt das nächstgelegene; die Frist berechnet der ${h.a('fuehrerschein-umtauschen', 'Umtausch-Rechner')}. Wer einen Oldtimer anmelden will, findet die Regeln beim ${h.a('h-kennzeichen', 'H-Kennzeichen')}.`),
  },
  en: {
    slug: 'registration-office-stuttgart',
    nav: 'Stuttgart',
    card: 'Krailenshaldenstraße in Feuerbach, licences at citizens’ offices, code S.',
    title: 'Zulassungsstelle Stuttgart: office address, licences, fees',
    description: 'Zulassungsstelle Stuttgart on Krailenshaldenstraße: address, driving licences at citizens’ offices, plate code S, electric car share and the 2026 fees.',
    h1: 'Stuttgart registration office: Feuerbach and citizens’ offices',
    intro: 'Stuttgart registers cars at one site, while many citizens’ offices take driving licence applications. Plus the figures of a district with a high share of electric cars.',
    resume: (h) => { const s = bz(h, ID).stat!, r = rangBev(h, ID); const fe = h.Z.paketVon(ID).fe.length; return `The state capital Stuttgart runs a single vehicle registration office, at Krailenshaldenstraße 32 in the Feuerbach borough, postcode 70469. Driving licences are handled by the public order office, with its licensing office at Löwentorbogen and the citizens’ offices (Bürgerbüros) of the boroughs: in all, the Federal Motor Transport Authority’s directory lists ${h.num(fe)} addresses where Stuttgart residents can apply for or exchange a licence. The plate code is S. Stuttgart is one of the districts with the highest electric share: on ${h.Z.fz1Stand('en')}, ${h.pct(s.bev / s.pkw)} of its ${h.num(s.pkw)} cars were fully electric, rank ${h.num(r.rang)} of ${h.num(r.von)}, and another ${h.pct(s.phev / s.pkw)} were plug-in hybrids. Diesel cars made up ${h.pct(s.diesel / s.pkw)}, below the national average of ${h.pct(h.Z.META.total.diesel / h.Z.META.total.pkw)}. Fees are the same nationwide; a personalised number costs ${h.eur(h.P.zuschlag.wunsch)} extra.`; },
    faqs: (h) => [
      { q: 'Can I register my car at a Stuttgart citizens’ office?', a: 'According to the Federal Motor Transport Authority’s directory, no: for registration it lists only Krailenshaldenstraße. The citizens’ offices appear there as points of contact for driving licence applications. To avoid the trip to Feuerbach, register online if your ID card has the online function and your vehicle papers carry a security code.' },
      { q: 'If I live in Esslingen or Ludwigsburg, is Stuttgart in charge?', a: 'No. Esslingen belongs to the district of Esslingen and Ludwigsburg to the district of Ludwigsburg; both have their own registration offices and codes, ES and LB. Stuttgart is an urban district and serves only keepers living in the city. You may still keep an S plate after moving out to the surrounding area.' },
      { q: 'Where do I exchange an old driving licence in Stuttgart?', a: `At any citizens’ office or at the licensing office at Löwentorbogen, according to the directory. The fee is ${h.eur(h.M.UMTAUSCH_GEBUEHR)}. Cards issued from ${h.P.fuehrerschein.karte[0].von} to ${h.P.fuehrerschein.karte[0].bis} had to be exchanged by ${h.date(h.P.fuehrerschein.karte[0].frist)}; the exchange calculator gives the deadline that applies to you. Bring your ID, a photo and the old licence.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'The registration office is in the north of the city. Its phone number is in the table; the city offers appointments and online services on its website.',
      `The many licence addresses in the second table are the citizens’ offices. For an exchange the nearest one will do; the ${h.a('fuehrerschein-umtauschen', 'exchange calculator')} works out the deadline. Anyone registering a classic car will find the rules under ${h.a('h-kennzeichen', 'H plates')}.`),
  },
});
