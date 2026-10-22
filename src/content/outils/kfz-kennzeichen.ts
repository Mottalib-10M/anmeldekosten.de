import { defineGuide, type Helpers } from '../../lib/guide-types';

/** Liste A–Z de tous les Unterscheidungszeichen (AV1 du KBA) : code, Kreis, Land, marque « auslaufend ». */
function liste(h: Helpers): string {
  const de = h.lang === 'de';
  const L = h.Z.kennzeichenListe();
  const rows = Object.keys(L).sort((a, b) => a.localeCompare(b, 'de')).map((c) => {
    const akt = L[c].filter((x) => !x[2]), alt = L[c].filter((x) => x[2]);
    const kreise = [...akt.map((x) => x[0]), ...alt.map((x) => `${x[0]} (${de ? 'auslaufend' : 'phased out'})`)];
    const laender = [...new Set(L[c].map((x) => h.land(x[1])))];
    return [`<strong>${c}</strong>`, kreise.join('; '), laender.join(', ')];
  });
  return h.table(de ? ['Kürzel', 'Zulassungsbezirk', 'Land'] : ['Code', 'Registration district', 'State'], rows,
    de ? `Alle ${h.num(rows.length)} Unterscheidungszeichen, Verzeichnis des Kraftfahrt-Bundesamts, Stand ${h.Z.META.av1Stand}` : `All ${h.num(rows.length)} district codes, Federal Motor Transport Authority directory, as of ${h.Z.avStand('en')}`, ['l', 'l', 'l']);
}
const zahlen = (h: Helpers) => {
  const L = h.Z.kennzeichenListe();
  const n = Object.keys(L).length;
  const nurAlt = Object.values(L).filter((v) => v.every((x) => x[2])).length;
  const multi = h.Z.BEZIRKE.filter((b) => b.uz.length > 1).length;
  const max = [...h.Z.BEZIRKE].sort((a, b) => b.uz.length - a.uz.length)[0];
  return { n, nurAlt, multi, max };
};

export default defineGuide({
  id: 'kfz-kennzeichen',
  group: 'kennzeichen',
  order: 1,
  tool: 'kennzeichen',
  code: 'M',
  related: ['wunschkennzeichen', 'h-kennzeichen', 'saisonkennzeichen', 'kurzzeitkennzeichen', 'auto-ummelden'],
  sources: ['kbaAv', 'fzv9', 'fzv10', 'fzv11', 'fzv2'],
  de: {
    slug: 'kfz-kennzeichen-liste',
    nav: 'Kennzeichen-Liste',
    card: 'Alle Kürzel von A bis Z mit Kreis, Land und zuständiger Behörde.',
    title: 'Kfz-Kennzeichen Liste 2026: alle Kürzel mit Kreis und Land',
    description: 'Kfz-Kennzeichen Liste nach dem Verzeichnis des Kraftfahrt-Bundesamts: jedes Kürzel mit Zulassungsbezirk, Bundesland und Behörde, auch auslaufende Kennzeichen.',
    h1: 'Kfz-Kennzeichen: Welches Kürzel gehört zu welchem Kreis?',
    intro: 'Kürzel eingeben: Sie sehen den Zulassungsbezirk, das Land und, mit einem Klick, die zuständige Zulassungsstelle. Darunter steht die vollständige Liste.',
    resume: (h) => { const z = zahlen(h); return `Das Unterscheidungszeichen, also die ein bis drei Buchstaben vor dem Siegel, ordnet ein Kennzeichen einem Zulassungsbezirk zu. Welche Kürzel es gibt, legt jedes Land fest; das Kraftfahrt-Bundesamt führt sie in seinem Verzeichnis der Zulassungsbehörden, Stand ${h.Z.META.av1Stand}. Dort stehen ${h.num(z.n)} Kürzel. Seit der Kennzeichenliberalisierung von 2012 dürfen Kreise Kürzel früherer Kreise wieder ausgeben, deshalb führen heute ${h.num(z.multi)} der ${h.num(h.Z.META.bezirke)} Bezirke mehr als ein Kürzel; am meisten hat ${z.max.kreis} mit ${h.num(z.max.uz.length)}. ${h.num(z.nurAlt)} Kürzel sind nur noch als „auslaufend“ vermerkt: Sie hängen noch an Autos, werden aber nicht mehr neu vergeben. Wer umzieht, darf sein Kennzeichen seit 2015 behalten; ein Kürzel verrät also nicht mehr sicher, wo der Halter wohnt. Die Liste unten führt jedes Kürzel mit seinem Bezirk und Land, die Suche oben die Anschrift der zuständigen Zulassungsstelle.`; },
    faqs: (h) => [
      { q: 'Kann ich mir das Kürzel auf meinem Kennzeichen aussuchen?', a: `Nur unter den Kürzeln, die Ihr Zulassungsbezirk führt. Hat der Kreis mehrere, etwa nach einer Kreisreform, wählen Sie bei der Zulassung frei; das kostet nichts extra. Die Buchstaben und Zahlen dahinter sind ein ${h.a('wunschkennzeichen', 'Wunschkennzeichen')} und kosten ${h.eur(h.P.zuschlag.wunsch)} zusätzlich. Ein Kürzel eines anderen Kreises bekommen Sie nicht, außer Sie behalten es nach einem Umzug.` },
      { q: 'Was heißt „auslaufend“ in der Liste?', a: 'Das Kraftfahrt-Bundesamt kennzeichnet so Kürzel, die eine Behörde nicht mehr zuteilt, die aber noch an zugelassenen Fahrzeugen ihres Bezirks hängen. Meist gehörten sie zu einem aufgelösten Kreis. Ein solches Kennzeichen bleibt gültig, solange das Fahrzeug zugelassen ist, auch nach einem Halterwechsel im selben Bezirk.' },
      { q: 'Darf ich mein altes Kennzeichen nach einem Umzug behalten?', a: `Ja, seit 2015 bundesweit. Bei der Ummeldung wird dann nur die Anschrift geändert; Schilder und Plaketten bleiben. Das ist auch billiger: ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten' }).gebuehr)} statt ${h.eur(h.M.berechne({ vorgang: 'umzugNeu' }).gebuehr)} vor Ort. Wer ein neues Kürzel möchte, kann es trotzdem beantragen; dann werden neue Schilder fällig.` },
    ],
    body: (h) => `<h2>Wie ein Kennzeichen aufgebaut ist</h2>
<p>Nach § 9 der Fahrzeug-Zulassungsverordnung besteht ein Kennzeichen aus dem Unterscheidungszeichen des Bezirks mit ein bis drei Buchstaben und einer Erkennungsnummer, die Anlage 1 regelt: ein oder zwei Buchstaben ohne Umlaute und eine Zahl bis 9999. Zwischen Kürzel und Erkennungsnummer stehen die Stempelplakette der Behörde und hinten die HU-Plakette. Ein angehängtes „H“ steht für ein ${h.a('h-kennzeichen', 'Oldtimer-Kennzeichen')}, ein „E“ für ein Elektrofahrzeug; ${h.a('saisonkennzeichen', 'Saisonkennzeichen')} tragen rechts die Monate.</p>
<h2>Alle Kürzel von A bis Z</h2>
${liste(h)}`,
  },
  en: {
    slug: 'german-number-plate-codes',
    nav: 'Plate code list',
    card: 'Every code from A to Z with its district, state and office.',
    title: 'Number plate codes in Germany 2026: full list by district',
    description: 'Number plate codes in Germany from the Federal Motor Transport Authority directory: each code with its district, state and office, phased-out codes too.',
    h1: 'German number plates: which code belongs to which district?',
    intro: 'Type a code: you see the registration district, the state and, one click away, the office in charge. The full list follows below.',
    resume: (h) => { const z = zahlen(h); return `The district code, the one to three letters before the seal, links a German number plate to a registration district. Each state decides which codes exist; the Federal Motor Transport Authority lists them in its directory of registration offices, as of ${h.Z.avStand('en')}. It holds ${h.num(z.n)} codes. Since codes were liberalised in 2012, districts may issue the codes of former districts again, so ${h.num(z.multi)} of the ${h.num(h.Z.META.bezirke)} districts now have more than one; ${z.max.kreis} has the most, with ${h.num(z.max.uz.length)}. ${h.num(z.nurAlt)} codes are only listed as “phased out”: they are still on cars but no longer issued. Since 2015 anyone who moves may keep their plate, so a code no longer reliably shows where the keeper lives. The list below gives every code with its district and state, and the search above the address of the office in charge.`; },
    faqs: (h) => [
      { q: 'Can I choose the district code on my German plate?', a: `Only among the codes your registration district uses. If it has several, for instance after districts merged, you choose freely at registration at no extra cost. The letters and digits after it are a ${h.a('wunschkennzeichen', 'personalised number')} and cost ${h.eur(h.P.zuschlag.wunsch)} more. You cannot get another district’s code, unless you keep it after moving.` },
      { q: 'What does “phased out” mean in the list?', a: 'The Federal Motor Transport Authority uses it for codes an office no longer issues but which are still on registered vehicles in its district, usually from a district that was dissolved. Such a plate stays valid as long as the vehicle is registered, even after a change of keeper within the district.' },
      { q: 'Can I keep my old plate after moving within Germany?', a: `Yes, nationwide since 2015. Re-registration then only changes the address; plates and seals stay. It is also cheaper: ${h.eur(h.M.berechne({ vorgang: 'umzugBehalten' }).gebuehr)} instead of ${h.eur(h.M.berechne({ vorgang: 'umzugNeu' }).gebuehr)} in person. If you want a new code you can still ask for one, and new plates are then needed.` },
    ],
    body: (h) => `<h2>How a German plate is built</h2>
<p>Under § 9 of the Vehicle Registration Ordinance a plate consists of the district code of one to three letters and an identification number governed by Annex 1: one or two letters, no umlauts, and a number up to 9999. Between the code and the number sit the office’s registration seal and, on the rear plate, the roadworthiness sticker. A trailing “H” marks a ${h.a('h-kennzeichen', 'historic vehicle plate')}, an “E” an electric vehicle; ${h.a('saisonkennzeichen', 'seasonal plates')} show the months on the right.</p>
<h2>Every code from A to Z</h2>
${liste(h)}`,
  },
});
