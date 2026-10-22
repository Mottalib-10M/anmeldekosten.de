/** Texte de l'accueil (page pilier), de et en. Chiffres : paramètres GebOSt, moteur, données KBA. */
import type { Helpers, FAQ } from '../lib/guide-types';

interface HomeText { title: string; description: string; h1: string; intro: string; resume: (h: Helpers) => string; faqs: (h: Helpers) => FAQ[]; body: (h: Helpers) => string }

const g = (h: Helpers, v: Parameters<Helpers['M']['berechne']>[0]) => h.M.berechne(v);

/** Tableau des démarches courantes : vor Ort, online, numéro GebOSt. */
function tabelle(h: Helpers): string {
  const de = h.lang === 'de';
  const T = h.M;
  const ids = ['neu', 'gebraucht', 'umzugBehalten', 'umzugNeu', 'adresse', 'umschreibung', 'abmelden', 'wieder'] as const;
  const txt = (id: (typeof ids)[number]) => ({
    neu: de ? 'Neuwagen zulassen' : 'Register a new car',
    gebraucht: de ? 'Gebrauchtwagen anmelden' : 'Register a used car',
    umzugBehalten: de ? 'Umzug in anderen Kreis, Kennzeichen bleibt' : 'Move to another district, keep plate',
    umzugNeu: de ? 'Umzug in anderen Kreis, neues Kennzeichen' : 'Move to another district, new plate',
    adresse: de ? 'Umzug im selben Kreis' : 'Move within the district',
    umschreibung: de ? 'Halterwechsel, Kennzeichen bleibt' : 'New keeper, plate kept',
    abmelden: de ? 'Abmelden' : 'Deregister',
    wieder: de ? 'Wiederzulassung, reserviertes Kennzeichen' : 'Re-register with reserved plate',
  })[id];
  const rows = ids.map((id) => {
    const a = T.berechne({ vorgang: id }), b = T.berechne({ vorgang: id, online: true });
    return [txt(id), a.fest[0].nr, h.eur(a.gebuehr), h.eur(b.gebuehr), `${h.eur(a.min)} – ${h.eur(a.max)}`];
  });
  return h.table(de ? ['Vorgang', 'GebOSt-Nr.', 'Vor Ort', 'Online', 'Vor Ort mit Nebenposten'] : ['Procedure', 'GebOSt no.', 'In person', 'Online', 'In person, all items'], rows,
    de ? `Gebühren nach der GebOSt, ${h.P.gebost_stand.de}` : `Fees under the GebOSt, ${h.P.gebost_stand.en}`, ['l', 'l', 'r', 'r', 'r']);
}

/** Kennzeichenarten : base légale, Gebühr (moteur), règle clé. */
function arten(h: Helpers): string {
  const de = h.lang === 'de';
  const B = (v: Parameters<Helpers['M']['berechne']>[0]) => h.eur(h.M.berechne(v).gebuehr);
  const rows = de ? [
    [h.a('wunschkennzeichen', 'Wunschkennzeichen'), '§ 9 FZV', `+ ${h.eur(h.P.zuschlag.wunsch)}`, `Reservierung ${h.eur(h.P.land['230'])}`],
    [h.a('saisonkennzeichen', 'Saisonkennzeichen'), '§ 10 Abs. 3 FZV', B({ vorgang: 'kennzeichenart' }), `${h.num(h.P.fzv.saison_min_monate)} bis ${h.num(h.P.fzv.saison_max_monate)} volle Monate`],
    [h.a('h-kennzeichen', 'H-Kennzeichen'), '§ 10 Abs. 1 FZV', B({ vorgang: 'kennzeichenart' }), `ab ${h.num(h.P.fzv.oldtimer_jahre)} Jahren, Steuer ${h.eur(h.P.kfzsteuer.oldtimer)}`],
    [h.a('kurzzeitkennzeichen', 'Kurzzeitkennzeichen'), '§ 42 FZV', B({ vorgang: 'kurzzeit' }), `${h.num(h.P.fzv.kurzzeit_tage)} Tage, an ein Fahrzeug gebunden`],
    [h.a('ausfuhrkennzeichen', 'Ausfuhrkennzeichen'), '§ 45 FZV', B({ vorgang: 'ausfuhr' }), `höchstens ${h.num(h.P.fzv.ausfuhr_max_monate)} Monate`],
  ] : [
    [h.a('wunschkennzeichen', 'Personalised plate'), 'section 9 FZV', `+ ${h.eur(h.P.zuschlag.wunsch)}`, `reservation ${h.eur(h.P.land['230'])}`],
    [h.a('saisonkennzeichen', 'Seasonal plate'), 'section 10(3) FZV', B({ vorgang: 'kennzeichenart' }), `${h.num(h.P.fzv.saison_min_monate)} to ${h.num(h.P.fzv.saison_max_monate)} full months`],
    [h.a('h-kennzeichen', 'H plate'), 'section 10(1) FZV', B({ vorgang: 'kennzeichenart' }), `from ${h.num(h.P.fzv.oldtimer_jahre)} years, tax ${h.eur(h.P.kfzsteuer.oldtimer)}`],
    [h.a('kurzzeitkennzeichen', 'Short-term plate'), 'section 42 FZV', B({ vorgang: 'kurzzeit' }), `${h.num(h.P.fzv.kurzzeit_tage)} days, tied to one vehicle`],
    [h.a('ausfuhrkennzeichen', 'Export plate'), 'section 45 FZV', B({ vorgang: 'ausfuhr' }), `${h.num(h.P.fzv.ausfuhr_max_monate)} months at most`],
  ];
  return h.table(de ? ['Kennzeichen', 'Grundlage', 'Gebühr vor Ort', 'Wichtigste Regel'] : ['Plate', 'Legal basis', 'Fee in person', 'Key rule'], rows,
    de ? `GebOSt ${h.P.gebost_stand.de}; Saison und H: Umstellung eines zugelassenen Fahrzeugs` : `GebOSt ${h.P.gebost_stand.en}; seasonal and H: switching a registered vehicle`, ['l', 'l', 'r', 'l']);
}

/** Les dix districts qui comptent le plus de voitures (KBA FZ1). */
function grosse(h: Helpers): string {
  const de = h.lang === 'de';
  const top = h.Z.BEZIRKE.filter((b) => b.stat).sort((a, b) => b.stat!.pkw - a.stat!.pkw).slice(0, 10);
  const rows = top.map((b, i) => [h.num(i + 1), b.kreis, b.uz.join(', '), h.num(b.stat!.pkw), h.pct(b.stat!.bev / b.stat!.pkw, 1)]);
  return h.table(de ? ['Rang', 'Zulassungsbezirk', 'Kürzel', 'Pkw', 'Davon elektrisch'] : ['Rank', 'Registration district', 'Codes', 'Cars', 'Of which electric'], rows,
    de ? `Kraftfahrt-Bundesamt, Bestand am ${h.Z.fz1Stand('de')} (FZ1)` : `Federal Motor Transport Authority, stock on ${h.Z.fz1Stand('en')} (FZ1)`, ['r', 'l', 'l', 'r', 'r']);
}

const anteilTop = (h: Helpers) => h.Z.BEZIRKE.filter((b) => b.stat).map((b) => b.stat!.pkw).sort((a, b) => b - a).slice(0, 10).reduce((t, x) => t + x, 0) / h.Z.META.total.pkw;

export const HOME: Record<'de' | 'en', HomeText> = {
  de: {
    title: 'Zulassungsstelle finden: Anschrift, Kennzeichen, Kosten 2026',
    description: 'Zulassungsstelle für jeden Ort und jedes Kennzeichen, mit Anschrift laut KBA und Gebühr 2026 nach GebOSt: Anmelden, Ummelden, Abmelden, Wunschkennzeichen.',
    h1: 'Zulassungsstelle finden und Gebühr ausrechnen',
    intro: 'Ort, Postleitzahl oder Kennzeichen eingeben: Sie sehen die zuständige Zulassungsbehörde mit Anschrift und was Ihr Vorgang nach der Gebührenordnung kostet.',
    resume: (h) => {
      const n = g(h, { vorgang: 'neu' }), o = g(h, { vorgang: 'neu', online: true }), ab = g(h, { vorgang: 'abmelden' });
      return `Für ein Auto ist die Zulassungsbehörde des Kreises oder der kreisfreien Stadt zuständig, in der der Halter wohnt; in Deutschland gibt es ${h.num(h.Z.META.bezirke)} solcher Zulassungsbezirke mit ${h.num(h.Z.META.stellen)} Haupt- und Außenstellen, die das Kraftfahrt-Bundesamt in seinem Verzeichnis führt (Stand ${h.Z.META.av1Stand}). Die Gebühren sind dagegen überall gleich, denn sie stehen in einer Bundesverordnung, der Gebührenordnung für Maßnahmen im Straßenverkehr. Eine Neuzulassung kostet dort ${h.eur(n.gebuehr)} vor Ort und ${h.eur(o.gebuehr)} online, das Abmelden ${h.eur(ab.gebuehr)} vor Ort. Mit Stempelplaketten, HU-Plakette und dem Anteil des Kraftfahrt-Bundesamts liegt eine Neuzulassung bei ${h.eur(n.min)} bis ${h.eur(n.max)}; die Schilder kauft man getrennt beim Schilderpräger. Ein Wunschkennzeichen kostet ${h.eur(h.P.zuschlag.wunsch)} mehr, seine Reservierung ${h.eur(h.P.land['230'])}. Wer einen Führerschein von vor 2013 besitzt, muss ihn nach einem festen Kalender umtauschen; der Umtausch kostet ${h.eur(h.M.UMTAUSCH_GEBUEHR)}.`;
    },
    faqs: (h) => [
      { q: 'Kann ich mein Auto bei jeder Zulassungsstelle anmelden?', a: `Nein. Zuständig ist die Zulassungsbehörde des Bezirks, in dem Sie mit Hauptwohnsitz gemeldet sind; bei Firmenwagen der Sitz des Unternehmens. Innerhalb eines Kreises dürfen Sie meist jede Außenstelle nutzen. Einen Ausweg gibt es online: Die internetbasierte Zulassung (i-Kfz) läuft ebenfalls über Ihre zuständige Behörde, erspart aber den Weg und kostet für eine Neuzulassung ${h.eur(g(h, { vorgang: 'neu', online: true }).gebuehr)} statt ${h.eur(g(h, { vorgang: 'neu' }).gebuehr)}.` },
      { q: 'Warum nennen manche Seiten je nach Stadt andere Preise?', a: `Weil sie Schilder, Plaketten oder Zulassungsdienste mitzählen oder alte Beträge zitieren. Die Gebühr selbst legt die Gebührenordnung bundesweit fest, ${h.P.gebost_stand.de}. Unterschiede entstehen nur bei Kleinposten: Stempelplaketten kosten ${h.eur(h.P.zuschlag.stempelplakette[0])} oder mit farbigem Landeswappen ${h.eur(h.P.zuschlag.stempelplakette[1])}, und der Schilderpreis ist frei. Unser Rechner zeigt jede Zeile mit ihrer Nummer.` },
      { q: 'Was bedeuten die „auslaufenden“ Kennzeichen in der Suche?', a: 'Das Verzeichnis des Kraftfahrt-Bundesamts markiert Unterscheidungszeichen, die eine Behörde nicht mehr ausgibt, die aber noch an Autos ihres Bezirks hängen, etwa nach einer Kreisreform. Wer so ein Kennzeichen fährt, darf es behalten. Neu zuteilen kann die Behörde es nicht, außer das Land hat das alte Kürzel wieder eingeführt; dann steht es bei den aktuellen Kennzeichen.' },
      { q: 'Wie viele Autos sind in Deutschland zugelassen?', a: `Zum ${h.Z.META.fz1Stand} zählte das Kraftfahrt-Bundesamt ${h.num(h.Z.META.total.pkw)} Pkw, davon ${h.num(h.Z.META.total.bev)} reine Elektroautos, also ${h.pct(h.Z.META.total.bev / h.Z.META.total.pkw)}. Auf 1.000 Einwohner kamen ${h.num(h.Z.META.total.pkwDichte)} Pkw. Die Suche zeigt dieselben Zahlen für jeden Zulassungsbezirk, aus der Statistik FZ1 vom ${h.Z.META.fz1Pub}, samt Anteil der Elektroautos.` },
      { q: 'Muss ich für die Zulassungsstelle immer einen Termin haben?', a: 'Das entscheidet jede Behörde selbst. Viele Großstädte arbeiten nur mit Termin, manche Landkreise auch ohne, oft mit Wartemarken am Morgen. Ohne Termin geht es immer online: Neuzulassung, Ummeldung, Halterwechsel und Abmeldung lassen sich über i-Kfz beantragen, wenn Personalausweis mit Online-Funktion und Fahrzeugpapiere mit freigelegtem Sicherheitscode vorliegen.' },
      { q: 'Wer ist für den Führerschein zuständig, die Zulassungsstelle?', a: `Nein, die Fahrerlaubnisbehörde, oft Führerscheinstelle genannt. Sie sitzt häufig im selben Straßenverkehrsamt, hat aber eigene Schalter und Termine. Das Kraftfahrt-Bundesamt führt ${h.num(h.Z.META.fe)} solcher Stellen; die Suche nennt die Ihres Kreises. Dort tauschen Sie den alten Führerschein um, beantragen den internationalen Führerschein oder lassen einen ausländischen umschreiben.` },
    ],
    body: (h) => {
      const n = g(h, { vorgang: 'neu' }), w = g(h, { vorgang: 'neu', wunsch: true, reservierung: true });
      const k = h.P.fuehrerschein.karte.find((z) => z.frist >= h.today)!;
      return `<h2>Was jede Zulassung kostet</h2>
<p>Die Gebührenordnung kennt für jeden Vorgang eine eigene Nummer, und für fast jeden auch eine günstigere Online-Nummer. Die Tabelle zeigt die häufigsten Fälle mit der Gebühr der Zulassungsbehörde und, rechts, den Betrag mit allen Nebenposten, die je nach Fall anfallen können: zwei Stempelplaketten, die HU-Plakette und der Registereintrag beim Kraftfahrt-Bundesamt. Kennzeichenschilder sind nirgends enthalten.</p>
${tabelle(h)}
<p>Ein Beispiel: Wer einen Neuwagen vor Ort mit reserviertem Wunschkennzeichen zulässt, zahlt ${h.eur(w.gebuehr)} Gebühr statt ${h.eur(n.gebuehr)}, weil ${h.eur(h.P.zuschlag.wunsch)} für den Wunsch und ${h.eur(h.P.land['230'])} für die Reservierung dazukommen. Alle Varianten, auch Fahrzeugbrief, Wechselkennzeichen und Halterwechsel, rechnet der ${h.a('kosten', 'Kostenrechner')} Zeile für Zeile.</p>
<!--mini:online-->
<h2>Welche Behörde zuständig ist</h2>
<p>Maßgeblich ist der Hauptwohnsitz des Halters. Die Suche oben ordnet jede der ${h.num(h.Z.META.gemeinden)} Gemeinden über ihren amtlichen Gemeindeschlüssel dem Kreis zu und zeigt dessen Zulassungsbehörde mit Haupt- und Außenstellen. In ein paar Kreisen gibt es zwei Behörden, etwa die Stadt und die Region Hannover; dann zählt, wo Sie wohnen. Für die großen Städte gibt es eigene Seiten, etwa ${h.a('zulassungsstelle-berlin', 'Berlin')}, ${h.a('zulassungsstelle-muenchen', 'München')}, ${h.a('zulassungsstelle-hamburg', 'Hamburg')} und ${h.a('zulassungsstelle-koeln', 'Köln')}.</p>
<p>Auch ein Kennzeichen führt zur Behörde: Das Kürzel vor dem Siegel, das Unterscheidungszeichen, gehört zu einem Kreis. Seit der Kennzeichenliberalisierung sind viele alte Kürzel zurück, sodass ein Kreis oft mehrere führt. Die ${h.a('kfz-kennzeichen', 'Kennzeichen-Liste')} nennt alle ${h.num(h.Z.META.kennzeichen)}.</p>
<h2>Anmelden, ummelden, abmelden</h2>
<p>Für eine Anmeldung brauchen Sie Personalausweis oder Reisepass mit Meldebescheinigung, die Zulassungsbescheinigungen Teil I und II, die eVB-Nummer der Versicherung, ein SEPA-Mandat für die Kfz-Steuer und bei Gebrauchtwagen den Nachweis der Hauptuntersuchung. Die Einzelheiten stehen bei ${h.a('auto-anmelden-unterlagen', 'den Unterlagen')}, die Beträge bei ${h.a('auto-anmelden-kosten', 'den Anmeldekosten')}. Nach einem Umzug in einen anderen Kreis dürfen Sie Ihr Kennzeichen behalten; die ${h.a('auto-ummelden', 'Ummeldung')} kostet dann weniger als mit neuem Kennzeichen, und neue Schilder entfallen.</p>
<!--mini:ummelden-->
<p>Wer ein Auto stilllegt, verkauft oder verschrottet, meldet es ab: ${h.eur(g(h, { vorgang: 'abmelden' }).gebuehr)} vor Ort, ${h.eur(g(h, { vorgang: 'abmelden', online: true }).gebuehr)} online. Mehr dazu beim ${h.a('auto-abmelden', 'Abmelden')}.</p>
<h2>Führerschein: der Kalender des Pflichtumtauschs</h2>
<p>Alle vor dem 19. Januar 2013 ausgestellten Führerscheine verlieren nach Anlage 8e der Fahrerlaubnis-Verordnung ihre Gültigkeit, gestaffelt nach Jahrgängen. Papierführerscheine sind inzwischen alle fällig, außer bei vor 1953 Geborenen. Als Nächstes sind die Karten aus ${k.von === k.bis ? k.von : `${k.von} bis ${k.bis}`} an der Reihe, mit Frist zum ${h.date(k.frist)}. Der Umtausch kostet ${h.eur(h.M.UMTAUSCH_GEBUEHR)} bei der Führerscheinstelle; der ${h.a('fuehrerschein-umtauschen', 'Umtausch-Rechner')} nennt Ihr Datum.</p>
<!--mini:frist-->
<h2>Besondere Kennzeichen auf einen Blick</h2>
<p>Neben dem gewöhnlichen Kennzeichen kennt die Fahrzeug-Zulassungsverordnung mehrere Sonderformen. Jede hat eine eigene Rechtsgrundlage und eine Regel, an der sich entscheidet, ob sie zu Ihrem Fall passt. Die Tabelle fasst sie zusammen; jede Zeile führt zu einer Seite mit Rechenbeispielen, Voraussetzungen und typischen Fehlern.</p>
${arten(h)}
<p>Das Saisonkennzeichen spart Steuer und Versicherung für die Monate, in denen ein Motorrad oder Wohnmobil steht. Das H-Kennzeichen setzt ein Gutachten voraus und ersetzt die Kfz-Steuer durch eine Pauschale. Kurzzeit- und Ausfuhrkennzeichen sind für Fahrten ohne reguläre Zulassung gedacht, das eine für wenige Tage im Inland, das andere für den dauerhaften Weg ins Ausland. Ein Wunschkennzeichen lässt sich mit fast allen kombinieren. Für Kurzzeit- und Ausfuhrkennzeichen gibt es dagegen keine Wunschnummer, und ein Wechselkennzeichen für zwei Fahrzeuge lässt sich weder als Saison- noch als Kurzzeitkennzeichen ausführen. Wer unsicher ist, welche Form passt, beginnt mit der Frage, ob das Fahrzeug regelmäßig fahren soll, nur einen Teil des Jahres oder nur ein einziges Mal.</p>
<h2>Wo die meisten Autos zugelassen sind</h2>
<p>Die Zahl der Fahrzeuge erklärt, warum Termine in manchen Bezirken knapp sind und in anderen nicht. Die zehn Zulassungsbezirke mit dem größten Pkw-Bestand betreuen zusammen ${h.pct(anteilTop(h), 0)} der ${h.num(h.Z.META.total.pkw)} Autos in Deutschland, obwohl es ${h.num(h.Z.META.bezirke)} Bezirke gibt. Die rechte Spalte zeigt den Anteil reiner Elektroautos am Bestand des Bezirks.</p>
${grosse(h)}
<p>Wo viele Fahrzeuge auf eine Behörde kommen, lohnt sich die ${h.a('auto-online-anmelden', 'Online-Zulassung')} besonders, und ein ${h.a('zulassungsstelle-termin', 'Termin')} sollte früh gebucht werden. Welche Aufgaben die Ämter dort neben der Zulassung haben, erklärt die Seite zum ${h.a('strassenverkehrsamt', 'Straßenverkehrsamt')}.</p>
<h2>Was dieser Rechner nicht tut</h2>
<p>Er vergibt keine Termine, nimmt keine Anträge an und verkauft keine Kennzeichen. Er rechnet nach dem Wortlaut der Verordnungen und zeigt Anschriften, wie die Behörden sie dem Kraftfahrt-Bundesamt melden. Wie genau, steht in der ${h.a('method', 'Methodik')}; wer dahintersteht, unter ${h.a('about', 'Über uns')}.</p>`;
    },
  },
  en: {
    title: 'Zulassungsstelle Germany: find your office and the 2026 fee',
    description: 'Find the German registration office (Zulassungsstelle) for any town or plate code, with its official address and the 2026 fee to register, move or deregister.',
    h1: 'Find your registration office and work out the fee',
    intro: 'Type a town, postcode or plate code: you get the registration office in charge, its address, and what your procedure costs under the federal fee schedule.',
    resume: (h) => {
      const n = g(h, { vorgang: 'neu' }), o = g(h, { vorgang: 'neu', online: true }), ab = g(h, { vorgang: 'abmelden' });
      return `In Germany a car is registered by the registration office (Zulassungsstelle) of the district or independent city where its keeper lives; there are ${h.num(h.Z.META.bezirke)} such registration districts with ${h.num(h.Z.META.stellen)} main offices and branches, listed in the Federal Motor Transport Authority’s directory (as of ${h.Z.avStand('en')}). The fees, on the other hand, are the same everywhere, because they are set in a single federal ordinance, the road traffic fee schedule (GebOSt). Registering a new car costs ${h.eur(n.gebuehr)} in person and ${h.eur(o.gebuehr)} online; deregistering costs ${h.eur(ab.gebuehr)} in person. With registration seals, the roadworthiness sticker and the Authority’s share, a new registration comes to ${h.eur(n.min)} to ${h.eur(n.max)}; the plates themselves are bought separately from a plate maker. A personalised number adds ${h.eur(h.P.zuschlag.wunsch)}, reserving it ${h.eur(h.P.land['230'])}. Anyone holding a licence issued before 2013 must exchange it on a fixed timetable, for ${h.eur(h.M.UMTAUSCH_GEBUEHR)}.`;
    },
    faqs: (h) => [
      { q: 'Can I register my car at any registration office in Germany?', a: `No. The office in charge is the one for the district where you have your main registered address (Hauptwohnsitz); for company cars, the company’s seat. Within a district you can usually use any branch. Online registration (i-Kfz) also goes through your own office but saves the trip, and a new car costs ${h.eur(g(h, { vorgang: 'neu', online: true }).gebuehr)} online instead of ${h.eur(g(h, { vorgang: 'neu' }).gebuehr)}.` },
      { q: 'Why do some websites quote different prices for different cities?', a: `Because they add plates, seals or agency fees, or quote old amounts. The fee itself is set nationwide by the fee schedule, ${h.P.gebost_stand.en}. Only small items vary: registration seals cost ${h.eur(h.P.zuschlag.stempelplakette[0])}, or ${h.eur(h.P.zuschlag.stempelplakette[1])} with the state’s coloured coat of arms, and plate makers set their own prices. The calculator shows each line with its number.` },
      { q: 'What are the “phased-out” plate codes shown in the search?', a: 'The Federal Motor Transport Authority’s directory marks district codes an office no longer issues but which are still on cars in its area, often after districts merged. If your car carries one, you may keep it. The office cannot issue it again unless the state has brought the old code back, in which case it is listed among the current codes.' },
      { q: 'How many cars are registered in Germany?', a: `At ${h.Z.fz1Stand('en')} the Federal Motor Transport Authority counted ${h.num(h.Z.META.total.pkw)} cars, of which ${h.num(h.Z.META.total.bev)} were fully electric, ${h.pct(h.Z.META.total.bev / h.Z.META.total.pkw)}. There were ${h.num(h.Z.META.total.pkwDichte)} cars per 1,000 residents. The search shows the same figures for each registration district, from the FZ1 statistics.` },
      { q: 'Do I always need an appointment at the registration office?', a: 'Each office decides. Many large cities work by appointment only; some rural districts also take walk-ins, often with numbered tickets early in the morning. Online always works without one: new registration, re-registration, change of keeper and deregistration can be done via i-Kfz with an ID card that has the online function enabled and vehicle papers with the security code uncovered.' },
      { q: 'Is the registration office also in charge of driving licences?', a: `No, that is the licensing office (Fahrerlaubnisbehörde or Führerscheinstelle). It is often in the same building but has its own counters and appointments. The Federal Motor Transport Authority lists ${h.num(h.Z.META.fe)} of them; the search names yours. That is where you exchange an old licence, apply for an international driving permit or convert a foreign licence.` },
    ],
    body: (h) => {
      const n = g(h, { vorgang: 'neu' }), w = g(h, { vorgang: 'neu', wunsch: true, reservierung: true });
      const k = h.P.fuehrerschein.karte.find((z) => z.frist >= h.today)!;
      return `<h2>What each registration costs</h2>
<p>The fee schedule gives every procedure its own number, and almost every one a cheaper online number too. The table shows the most common cases with the registration office’s fee and, on the right, the amount including every small item that may apply: two registration seals, the roadworthiness sticker and the register entry at the Federal Motor Transport Authority. Number plates are never included.</p>
${tabelle(h)}
<p>An example: registering a new car in person with a reserved personalised number costs ${h.eur(w.gebuehr)} in fees instead of ${h.eur(n.gebuehr)}, because ${h.eur(h.P.zuschlag.wunsch)} for the personalised number and ${h.eur(h.P.land['230'])} for the reservation are added. The ${h.a('kosten', 'fee calculator')} works out every variant line by line, including old logbooks, interchangeable plates and a change of keeper.</p>
<!--mini:online-->
<h2>Which office is yours</h2>
<p>What matters is the keeper’s main address. The search above maps each of the ${h.num(h.Z.META.gemeinden)} municipalities to its district through the official municipality key and shows that district’s registration office with its main office and branches. A few districts have two offices, such as the city and the region of Hannover; then it depends on where you live. The large cities have their own pages, for example ${h.a('zulassungsstelle-berlin', 'Berlin')}, ${h.a('zulassungsstelle-muenchen', 'Munich')}, ${h.a('zulassungsstelle-hamburg', 'Hamburg')} and ${h.a('zulassungsstelle-koeln', 'Cologne')}.</p>
<p>A plate also leads to the office: the letters before the seal, the district code (Unterscheidungszeichen), belong to one district. Since codes were liberalised many old ones are back, so a district often has several. The ${h.a('kfz-kennzeichen', 'plate code list')} gives all ${h.num(h.Z.META.kennzeichen)}.</p>
<h2>Registering, moving, deregistering</h2>
<p>To register you need an ID card, or a passport with proof of address, registration certificates parts I and II, the insurer’s eVB number, a direct-debit mandate for vehicle tax and, for a used car, proof of the last roadworthiness test. The details are under ${h.a('auto-anmelden-unterlagen', 'documents')}, the amounts under ${h.a('auto-anmelden-kosten', 'registration costs')}. After moving to another district you may keep your plate; ${h.a('auto-ummelden', 're-registering')} then costs less than with a new plate, and no new plates are needed.</p>
<!--mini:ummelden-->
<p>Anyone taking a car off the road, selling or scrapping it deregisters it: ${h.eur(g(h, { vorgang: 'abmelden' }).gebuehr)} in person, ${h.eur(g(h, { vorgang: 'abmelden', online: true }).gebuehr)} online. More under ${h.a('auto-abmelden', 'deregistering')}.</p>
<h2>Driving licences: the exchange timetable</h2>
<p>Under Annex 8e of the Driving Licence Regulation every licence issued before 19 January 2013 loses its validity on a date set by age group. All paper licences are now due, except for holders born before 1953. Next in line are cards issued in ${k.von === k.bis ? k.von : `${k.von} to ${k.bis}`}, with a deadline of ${h.date(k.frist)}. The exchange costs ${h.eur(h.M.UMTAUSCH_GEBUEHR)} at the licensing office; the ${h.a('fuehrerschein-umtauschen', 'exchange calculator')} gives your date.</p>
<!--mini:frist-->
<h2>Special plates at a glance</h2>
<p>Besides the ordinary plate, the vehicle registration ordinance provides several special forms. Each has its own legal basis and one rule that decides whether it fits your case. The table sums them up; each row leads to a page with worked examples, requirements and common mistakes.</p>
${arten(h)}
<p>The seasonal plate saves tax and insurance for the months a motorcycle or motorhome is laid up. The H plate needs an expert report and replaces vehicle tax with a flat rate. Short-term and export plates are for trips without regular registration, one for a few days within Germany, the other for leaving the country for good. A personalised number can be combined with almost all of them.</p>
<h2>Where most cars are registered</h2>
<p>The number of vehicles explains why appointments are scarce in some districts and not in others. The ten registration districts with the largest car stock together look after ${h.pct(anteilTop(h), 0)} of Germany’s ${h.num(h.Z.META.total.pkw)} cars, out of ${h.num(h.Z.META.bezirke)} districts. The right-hand column shows the share of fully electric cars in each district’s stock.</p>
${grosse(h)}
<p>Where many vehicles fall to one office, ${h.a('auto-online-anmelden', 'registering online')} pays off most, and an ${h.a('zulassungsstelle-termin', 'appointment')} should be booked early. The page on the ${h.a('strassenverkehrsamt', 'road traffic office')} explains what else those offices handle besides registration.</p>
<h2>What this calculator does not do</h2>
<p>It books no appointments, takes no applications and sells no plates. It calculates from the wording of the regulations and shows addresses as the offices report them to the Federal Motor Transport Authority. How exactly is on the ${h.a('method', 'method page')}; who is behind it under ${h.a('about', 'about')}.</p>`;
    },
  },
};
