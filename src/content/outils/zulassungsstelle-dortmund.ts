import { defineGuide } from '../../lib/guide-types';
import { stadtKoerper, bz, rangBev, rangPkw } from '../../lib/stadt';

const ID = '05913';

export default defineGuide({
  id: 'zulassungsstelle-dortmund',
  group: 'staedte',
  order: 8,
  tool: 'finder',
  bezirk: ID,
  related: ['zulassungsstelle-essen', 'zulassungsstelle-koeln', 'kfz-kennzeichen', 'kosten', 'auto-abmelden'],
  sources: ['kbaAv', 'kbaFz1', 'gebost', 'fzv16'],
  de: {
    slug: 'zulassungsstelle-dortmund',
    nav: 'Dortmund',
    card: 'Südwall in der Innenstadt, Kürzel DO, das auslaufende IS.',
    title: 'Zulassungsstelle Dortmund: Südwall, Kürzel DO, Gebühren',
    description: 'Zulassungsstelle Dortmund am Südwall: Anschrift und Telefon, Führerschein in den Bürgerdiensten, Kürzel DO, das auslaufende IS, Bestand und Gebühren 2026.',
    h1: 'Zulassungsstelle Dortmund: am Südwall',
    intro: 'Dortmund lässt Fahrzeuge in der Innenstadt zu, am Südwall. Führerscheine bearbeiten die Bürgerdienste an mehreren Orten der Stadt.',
    resume: (h) => { const s = bz(h, ID).stat!, r = rangBev(h, ID), g = rangPkw(h, ID); const fe = h.Z.paketVon(ID).fe.length; return `Die Zulassungsstelle der Stadt Dortmund liegt am Südwall 2–4, am Rand der Innenstadt, Postleitzahl 44137; Außenstellen für Kfz-Zulassungen nennt das Verzeichnis des Kraftfahrt-Bundesamts nicht. Für den Führerschein sind die Bürgerdienste zuständig, mit ${h.num(fe)} Anschriften im Verzeichnis, vom Südwall bis zu den Bezirksverwaltungsstellen in Aplerbeck und Brackel. Neu ausgegeben wird das Kürzel DO. Daneben führt das Verzeichnis für Dortmund IS als auslaufendes Kürzel; es stand für den früheren Kreis Iserlohn und ist auch in Hagen, im Märkischen Kreis und im Kreis Unna nur noch auslaufend vermerkt. Dortmund hatte zum ${h.Z.META.fz1Stand} ${h.num(s.pkw)} Pkw, Rang ${h.num(g.rang)} der Zulassungsbezirke, und ${h.num(s.pkwDichte)} Pkw je 1.000 Einwohner. Der Anteil reiner Elektroautos lag mit ${h.pct(s.bev / s.pkw)} unter dem Bundeswert von ${h.pct(h.Z.META.total.bev / h.Z.META.total.pkw)}, Rang ${h.num(r.rang)} von ${h.num(r.von)}. Abmelden kostet hier wie überall ${h.eur(h.M.berechne({ vorgang: 'abmelden' }).gebuehr)} vor Ort.`; },
    faqs: (h) => [
      { q: 'Kann ich in Dortmund ein IS-Kennzeichen bekommen?', a: 'Nein. IS ist im Verzeichnis des Kraftfahrt-Bundesamts für Dortmund und die Nachbarn nur als auslaufend vermerkt: Fahrzeuge, die es tragen, behalten es, neu vergeben wird es nicht. Wer in Dortmund zulässt, bekommt DO. Wer ein Auto mit IS-Kennzeichen kauft, fragt bei der Umschreibung am besten nach, ob es bleiben kann.' },
      { q: 'Ich wohne in Lünen oder Schwerte: ist Dortmund zuständig?', a: 'Nein, beide Städte gehören zum Kreis Unna, der eine eigene Zulassungsbehörde mit dem Kürzel UN hat. Dortmund ist kreisfrei und nur für Halter in der Stadt zuständig. Wer aus Dortmund dorthin zieht, kann das DO behalten; die Ummeldung macht dann der Kreis Unna.' },
      { q: 'Was kostet es in Dortmund, ein Auto stillzulegen und später wieder anzumelden?', a: `Die Abmeldung kostet ${h.eur(h.M.berechne({ vorgang: 'abmelden' }).gebuehr)} vor Ort; lassen Sie das Kennzeichen für ${h.eur(h.P.land['230'])} reservieren, können Sie es bis zu ${h.num(h.P.fzv.reservierung_monate)} Monate später wieder zuteilen lassen. Die Wiederzulassung kostet dann ${h.eur(h.M.berechne({ vorgang: 'wieder' }).gebuehr)}, ohne neue Schilder. Ohne Reservierung geht das Kennzeichen zurück in den Bestand und kann an andere vergeben werden.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Der Südwall gehört zum Ring um die City und ist mit Bus und Bahn gut erreichbar. Die Stadt vergibt Termine über ihre Website; dort steht auch, welche Vorgänge ohne Termin möglich sind.',
      `Für den Kreis Unna, Hagen oder Bochum nennt die Suche oben die eigene Behörde. Die Regeln zur Stilllegung stehen unter ${h.a('auto-abmelden', 'Abmelden')}, und die ${h.a('kfz-kennzeichen', 'Kennzeichen-Liste')} zeigt alle Kürzel im Ruhrgebiet.`),
  },
  en: {
    slug: 'registration-office-dortmund',
    nav: 'Dortmund',
    card: 'Südwall in the city centre, code DO, the phased-out IS.',
    title: 'Zulassungsstelle Dortmund: Südwall office, code DO, fees',
    description: 'Zulassungsstelle Dortmund on Südwall: address and phone, driving licences at citizens’ services, plate code DO, the phased-out IS code and the 2026 fees.',
    h1: 'Dortmund registration office: on Südwall',
    intro: 'Dortmund registers vehicles in the city centre, on Südwall. Driving licences are handled by the citizens’ services at several places in the city.',
    resume: (h) => { const s = bz(h, ID).stat!, r = rangBev(h, ID), g = rangPkw(h, ID); const fe = h.Z.paketVon(ID).fe.length; return `The city of Dortmund’s registration office is at Südwall 2–4, on the edge of the city centre, postcode 44137; the Federal Motor Transport Authority’s directory lists no branches for vehicle registration. Driving licences are handled by the citizens’ services (Bürgerdienste), with ${h.num(fe)} addresses in the directory, from Südwall to the borough offices in Aplerbeck and Brackel. The code issued is DO. The directory also lists IS for Dortmund as a phased-out code; it stood for the former district of Iserlohn and is likewise only listed as phased out in Hagen, the Märkischer Kreis and the district of Unna. On ${h.Z.fz1Stand('en')} Dortmund had ${h.num(s.pkw)} cars, rank ${h.num(g.rang)} among registration districts, and ${h.num(s.pkwDichte)} cars per 1,000 residents. The share of fully electric cars, ${h.pct(s.bev / s.pkw)}, was below the national ${h.pct(h.Z.META.total.bev / h.Z.META.total.pkw)}, rank ${h.num(r.rang)} of ${h.num(r.von)}. Deregistering costs ${h.eur(h.M.berechne({ vorgang: 'abmelden' }).gebuehr)} in person here as everywhere.`; },
    faqs: (h) => [
      { q: 'Can I get an IS plate in Dortmund?', a: 'No. The Federal Motor Transport Authority’s directory lists IS for Dortmund and its neighbours only as phased out: vehicles that carry it keep it, but it is not issued again. Registering in Dortmund gets you DO. If you buy a car with an IS plate, ask at the transfer whether it can stay.' },
      { q: 'I live in Lünen or Schwerte: is Dortmund in charge?', a: 'No, both towns belong to the district of Unna, which has its own registration office with the code UN. Dortmund is an independent city and serves only keepers who live there. Anyone moving there from Dortmund can keep DO; the Unna district then handles the re-registration.' },
      { q: 'What does it cost in Dortmund to take a car off the road and re-register it later?', a: `Deregistering costs ${h.eur(h.M.berechne({ vorgang: 'abmelden' }).gebuehr)} in person; if you reserve the number for ${h.eur(h.P.land['230'])}, you can have it assigned again up to ${h.num(h.P.fzv.reservierung_monate)} months later. Re-registration then costs ${h.eur(h.M.berechne({ vorgang: 'wieder' }).gebuehr)}, with no new plates. Without a reservation the number goes back into the pool and may be given to someone else.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Südwall is part of the ring road around the centre and easy to reach by public transport. The city books appointments on its website, which also says which procedures work without one.',
      `For the Unna district, Hagen or Bochum the search above names the right office. The rules for taking a car off the road are under ${h.a('auto-abmelden', 'deregistering')}, and the ${h.a('kfz-kennzeichen', 'plate code list')} shows every code in the Ruhr.`),
  },
});
