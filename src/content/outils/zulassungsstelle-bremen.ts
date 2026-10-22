import { defineGuide } from '../../lib/guide-types';
import { stadtKoerper, bz, rangBev } from '../../lib/stadt';

const ID = '04011';

export default defineGuide({
  id: 'zulassungsstelle-bremen',
  group: 'staedte',
  order: 11,
  tool: 'finder',
  bezirk: ID,
  related: ['zulassungsstelle-hamburg', 'zulassungsstelle-hannover', 'ausfuhrkennzeichen', 'kosten', 'auto-anmelden-kosten'],
  sources: ['kbaAv', 'kbaFz1', 'gebost', 'fzv45'],
  de: {
    slug: 'zulassungsstelle-bremen',
    nav: 'Bremen',
    card: 'Stresemannstraße und Bremen-Nord, Kürzel HB, Bremerhaven getrennt.',
    title: 'Zulassungsstelle Bremen: Stresemannstraße und Bremen-Nord',
    description: 'Zulassungsstelle Bremen: Stresemannstraße und Bremen-Nord, Führerscheinstellen, Kürzel HB, Bremerhaven als eigene Behörde und Gebühren 2026 nach GebOSt.',
    h1: 'Zulassungsstelle Bremen: zwei Standorte, ein Land, zwei Behörden',
    intro: 'Das Land Bremen besteht aus zwei Städten, und jede hat ihre eigene Zulassungsbehörde. Beide vergeben das Kürzel HB.',
    resume: (h) => { const s = bz(h, ID).stat!, r = rangBev(h, ID); return `Die Stadt Bremen lässt Fahrzeuge in der Stresemannstraße 48 zu, Postleitzahl 28207, und in einer Außenstelle in Bremen-Nord, Gerhard-Rohlfs-Straße 62; beide stehen so im Verzeichnis des Kraftfahrt-Bundesamts, mit derselben Telefonnummer. Die Fahrerlaubnisbehörde hat dieselbe Anschrift in der Stresemannstraße und weitere Anlaufstellen in den BürgerServiceCentern. Bremerhaven gehört zwar zum Land Bremen, hat aber eine eigene Zulassungsbehörde; das Kürzel HB vergeben beide Städte. Wer in Bremerhaven wohnt, ist also nicht in Bremen zuständig, auch wenn das Kennzeichen gleich beginnt. Zum ${h.Z.META.fz1Stand} waren in der Stadt Bremen ${h.num(s.pkw)} Pkw zugelassen, ${h.num(s.pkwDichte)} je 1.000 Einwohner. Der Dieselanteil war mit ${h.pct(s.diesel / s.pkw)} höher als im Bundesdurchschnitt von ${h.pct(h.Z.META.total.diesel / h.Z.META.total.pkw)}, der Anteil reiner Elektroautos mit ${h.pct(s.bev / s.pkw)} niedriger, Rang ${h.num(r.rang)} von ${h.num(r.von)}. Die Gebühren sind bundesweit gleich: ${h.eur(h.M.berechne({ vorgang: 'gebraucht' }).gebuehr)} für einen abgemeldeten Gebrauchtwagen vor Ort.`; },
    faqs: (h) => [
      { q: 'Ich wohne in Vegesack: Stresemannstraße oder Bremen-Nord?', a: 'Beides ist möglich. Vegesack gehört zur Stadt Bremen, und beide Standorte sind Teil derselben Zulassungsbehörde. Die Außenstelle in der Gerhard-Rohlfs-Straße liegt für Bewohner von Vegesack, Blumenthal und Burglesum näher. Ob dort jeder Vorgang angeboten wird, steht auf der Website der Stadt; das Verzeichnis nennt nur die Anschriften.' },
      { q: 'Bekomme ich in Bremerhaven ein anderes Kürzel als in Bremen?', a: 'Nein, beide Städte vergeben HB. Ein Bremerhavener Kennzeichen ist am Kürzel nicht von einem Bremer zu unterscheiden. Zuständig sind trotzdem verschiedene Behörden: Wer in Bremerhaven gemeldet ist, lässt dort zu. Ein Umzug zwischen den beiden Städten ist deshalb eine Ummeldung mit Behördenwechsel, auch wenn das Kennzeichen bleibt.' },
      { q: 'Wo bekomme ich in Bremen ein Ausfuhrkennzeichen?', a: `Bei der Zulassungsbehörde Ihres Wohnorts, in der Stadt Bremen also in der Stresemannstraße oder in Bremen-Nord. Ein Ausfuhrkennzeichen gilt nach der Fahrzeug-Zulassungsverordnung höchstens ${h.num(h.P.fzv.ausfuhr_max_monate)} Monate. Die Gebühr der Behörde beträgt ${h.eur(h.M.berechne({ vorgang: 'ausfuhr' }).gebuehr)}; die Versicherung für das Ausfuhrkennzeichen schließen Sie vorher selbst ab.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Die Stresemannstraße liegt östlich der Innenstadt, Bremen-Nord am anderen Ende der langgestreckten Stadt. Beide Standorte haben im Verzeichnis dieselbe Rufnummer.',
      `Für Bremerhaven, den Landkreis Osterholz oder Delmenhorst nennt die Suche oben die eigene Behörde. Wer ein Auto ins Ausland verkauft, findet die Regeln beim ${h.a('ausfuhrkennzeichen', 'Ausfuhrkennzeichen')}; die Kosten der Anmeldung stehen bei den ${h.a('auto-anmelden-kosten', 'Anmeldekosten')}.`, [ID]),
  },
  en: {
    slug: 'registration-office-bremen',
    nav: 'Bremen',
    card: 'Stresemannstraße and Bremen-Nord, code HB, Bremerhaven separate.',
    title: 'Zulassungsstelle Bremen: Stresemannstraße and Bremen-Nord',
    description: 'Zulassungsstelle Bremen: offices on Stresemannstraße and in Bremen-Nord, licensing offices, plate code HB, Bremerhaven as a separate office, 2026 fees.',
    h1: 'Bremen registration office: two sites, one state, two offices',
    intro: 'The state of Bremen consists of two cities, and each has its own registration office. Both issue the code HB.',
    resume: (h) => { const s = bz(h, ID).stat!, r = rangBev(h, ID); return `The city of Bremen registers vehicles at Stresemannstraße 48, postcode 28207, and at a branch in Bremen-Nord, Gerhard-Rohlfs-Straße 62; both are listed that way in the Federal Motor Transport Authority’s directory, with the same phone number. The licensing office shares the Stresemannstraße address and has further points of contact in the citizens’ service centres. Bremerhaven belongs to the state of Bremen but has its own registration office; both cities issue the code HB. So if you live in Bremerhaven, the Bremen office is not yours, even though the plate starts the same. On ${h.Z.fz1Stand('en')} the city of Bremen had ${h.num(s.pkw)} registered cars, ${h.num(s.pkwDichte)} per 1,000 residents. Its diesel share, ${h.pct(s.diesel / s.pkw)}, was higher than the national ${h.pct(h.Z.META.total.diesel / h.Z.META.total.pkw)}, and its share of fully electric cars, ${h.pct(s.bev / s.pkw)}, lower, rank ${h.num(r.rang)} of ${h.num(r.von)}. Fees are the same nationwide: ${h.eur(h.M.berechne({ vorgang: 'gebraucht' }).gebuehr)} for a deregistered used car in person.`; },
    faqs: (h) => [
      { q: 'I live in Vegesack: Stresemannstraße or Bremen-Nord?', a: 'Either. Vegesack is part of the city of Bremen, and both sites belong to the same registration office. The branch on Gerhard-Rohlfs-Straße is closer for residents of Vegesack, Blumenthal and Burglesum. Whether it offers every procedure is stated on the city’s website; the directory only gives addresses.' },
      { q: 'Does Bremerhaven issue a different code from Bremen?', a: 'No, both cities issue HB. A Bremerhaven plate cannot be told apart from a Bremen one by its code. Different offices are in charge all the same: anyone registered in Bremerhaven registers there. Moving between the two cities is therefore a re-registration with a change of office, even if the plate stays.' },
      { q: 'Where do I get an export plate in Bremen?', a: `At the registration office for where you live, so in the city of Bremen on Stresemannstraße or in Bremen-Nord. Under the Vehicle Registration Ordinance an export plate is valid for at most ${h.num(h.P.fzv.ausfuhr_max_monate)} months. The office’s fee is ${h.eur(h.M.berechne({ vorgang: 'ausfuhr' }).gebuehr)}; you take out the insurance for the export plate yourself beforehand.` },
    ],
    body: (h) => stadtKoerper(h, ID,
      'Stresemannstraße is east of the city centre, Bremen-Nord at the far end of the long, narrow city. Both sites share one number in the directory.',
      `For Bremerhaven, the Osterholz district or Delmenhorst the search above names the right office. Anyone selling a car abroad will find the rules under ${h.a('ausfuhrkennzeichen', 'export plates')}; registration costs are under ${h.a('auto-anmelden-kosten', 'registration costs')}.`, [ID]),
  },
});
