/** Saisonkennzeichen : mois de début et de fin → nombre de mois, validité (2 à 11 mois, § 10 Abs. 3 FZV). */
import { T, num, type L } from './_kit';
import { P } from '../engine/params';
import type { MiniSpec } from '../mini-types';
const MONATE = { de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'], en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] };
export default (l: L): MiniSpec => ({
  title: T(l, 'Wie lang ist mein Saisonzeitraum?', 'How long is my season?'),
  cta: T(l, 'Gebühr im Kostenrechner', 'Fee in the fee calculator'),
  inputs: [
    { id: 'a', label: T(l, 'Erster Monat', 'First month'), def: 3, options: MONATE[l].map((m, i) => ({ value: String(i + 1), label: m })) },
    { id: 'b', label: T(l, 'Letzter Monat', 'Last month'), def: 10, options: MONATE[l].map((m, i) => ({ value: String(i + 1), label: m })) },
  ],
  run: (v) => {
    const n = ((v.b - v.a + 12) % 12) + 1;
    const ok = n >= P.fzv.saison_min_monate && n <= P.fzv.saison_max_monate;
    return {
      head: [T(l, 'Monate mit Kennzeichen', 'Months on the road'), num(n, l)],
      rows: [
        [T(l, 'Abgemeldet ohne Abmeldung', 'Off the road without deregistering'), num(12 - n, l)],
        [T(l, 'Zulässig (2 bis 11 Monate)?', 'Allowed (2 to 11 months)?'), ok ? T(l, 'Ja', 'Yes') : T(l, 'Nein', 'No')],
        [T(l, 'Auf dem Schild', 'On the plate'), `${v.a} / ${v.b}`],
      ],
      note: ok ? undefined : T(l, 'Ein Saisonkennzeichen gilt für mindestens zwei und höchstens elf volle Monate.', 'A seasonal plate covers at least two and at most eleven full months.'),
    };
  },
});
