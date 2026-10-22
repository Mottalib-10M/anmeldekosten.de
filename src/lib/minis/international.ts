/** Internationaler Führerschein : nombre de permis × Gebühr (fourchette GebOSt Nr. 207) + photos (saisie). */
import { T, geb, type L } from './_kit';
import { P } from '../engine/params';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Was kostet der internationale Führerschein?', 'What does an international driving permit cost?'),
  cta: T(l, 'Frist für den Umtausch prüfen', 'Check your exchange deadline'),
  inputs: [
    { id: 'n', label: T(l, 'Anzahl Fahrer', 'Number of drivers'), def: 1, max: 6 },
    { id: 'f', label: T(l, 'Passbild, Preis je Person', 'Passport photo, price per person'), def: 0, max: 50, unit: '€', decimals: 2 },
  ],
  run: (v) => {
    const n = Math.max(1, Math.round(v.n)), [a, b] = P.fuehrerschein.international;
    return {
      head: [T(l, 'Gebühren zusammen', 'Fees together'), `${geb(n * a, l)} – ${geb(n * b, l)}`],
      rows: [
        [T(l, 'Je Führerschein (GebOSt Nr. 207)', 'Per permit (GebOSt no. 207)'), `${geb(a, l)} – ${geb(b, l)}`],
        [T(l, 'Mit Passbildern', 'With photos'), `${geb(n * (a + v.f), l)} – ${geb(n * (b + v.f), l)}`],
      ],
      note: T(l, 'Voraussetzung: ein Kartenführerschein. Den alten Papierführerschein vorher umtauschen.', 'You need a card licence first: exchange an old paper licence beforehand.'),
    };
  },
});
