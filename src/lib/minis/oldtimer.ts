/** H-Kennzeichen : année de première immatriculation → année d'éligibilité (30 ans), taxe forfaitaire. */
import { T, geb, num, type L } from './_kit';
import { P } from '../engine/params';
import type { MiniSpec } from '../mini-types';
import { BUILD_TODAY } from '../today';
const AN = Number(BUILD_TODAY.slice(0, 4));
const J = () => Array.from({ length: AN - 1950 + 1 }, (_, i) => String(AN - i)).map((x) => ({ value: x, label: x }));
export default (l: L): MiniSpec => ({
  title: T(l, 'Ab wann geht ein H-Kennzeichen?', 'When can I get an H plate?'),
  cta: T(l, 'Gebühr für den Wechsel rechnen', 'Work out the fee for the change'),
  inputs: [
    { id: 'e', label: T(l, 'Jahr der Erstzulassung', 'Year first registered'), def: 1996, options: J() },
    { id: 'k', label: T(l, 'Fahrzeug', 'Vehicle'), def: 0, options: [{ value: '0', label: T(l, 'Pkw', 'Car') }, { value: '1', label: T(l, 'Motorrad', 'Motorcycle') }] },
  ],
  run: (v) => {
    const ab = v.e + P.fzv.oldtimer_jahre;
    return {
      head: [T(l, 'Frühestens im Jahr', 'At the earliest in'), String(ab)],
      rows: [
        [T(l, 'Alter heute', 'Age today'), num(Math.max(0, AN - v.e), l)],
        [T(l, 'Kfz-Steuer pauschal im Jahr', 'Flat vehicle tax per year'), geb(v.k === 1 ? P.kfzsteuer.oldtimer_krad : P.kfzsteuer.oldtimer, l)],
      ],
      note: T(l, 'Das Jahr zählt ab dem Tag der Erstzulassung; dazu braucht es ein Oldtimer-Gutachten.', 'The 30 years run from the day of first registration; a classic-car report is also required.'),
    };
  },
});
