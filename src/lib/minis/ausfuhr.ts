/** Ausfuhrkennzeichen : Gebühr + KBA (fourchette), durée de l'assurance (max. un an). */
import { T, geb, num, type L } from './_kit';
import { P } from '../engine/params';
import { berechne } from '../engine/gebuehren';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Ausfuhrkennzeichen: Gebühr und Laufzeit', 'Export plate: fee and validity'),
  cta: T(l, 'Alle Posten im Kostenrechner', 'Every item in the fee calculator'),
  inputs: [
    { id: 'm', label: T(l, 'Laufzeit der Versicherung (Monate)', 'Insurance period (months)'), def: 1, max: 24 },
    { id: 's', label: T(l, 'Preis der Schilder', 'Plate price'), def: 0, max: 200, unit: '€', decimals: 2 },
  ],
  run: (v) => {
    const r = berechne({ vorgang: 'ausfuhr', schilderPreis: v.s });
    const m = Math.max(1, Math.min(P.fzv.ausfuhr_max_monate, Math.round(v.m)));
    return {
      head: [T(l, 'Gebühr GebOSt Nr. 221.3', 'GebOSt fee no. 221.3'), geb(r.gebuehr, l)],
      rows: [
        [T(l, 'Mit Plaketten, KBA-Anteil und Schildern', 'With seals, KBA share and plates'), `${geb(r.min, l)} – ${geb(r.max, l)}`],
        [T(l, 'Zulassung befristet auf', 'Registration limited to'), T(l, `${num(m, l)} Monat${m > 1 ? 'e' : ''}`, `${num(m, l)} month${m > 1 ? 's' : ''}`)],
      ],
      note: v.m > P.fzv.ausfuhr_max_monate ? T(l, 'Höchstens ein Jahr: so lange wie die Versicherung, nie länger.', 'One year at most: as long as the insurance, never longer.') : undefined,
    };
  },
});
