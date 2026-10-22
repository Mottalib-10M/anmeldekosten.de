/** Kurzzeitkennzeichen : Gebühr + KBA + Schilder + Versicherung (saisies). */
import { T, geb, type L } from './_kit';
import { berechne } from '../engine/gebuehren';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Kurzzeitkennzeichen: was kommt zusammen?', 'Short-term plate: what does it add up to?'),
  cta: T(l, 'Weitere Kennzeichen im Kostenrechner', 'Other plates in the fee calculator'),
  inputs: [
    { id: 's', label: T(l, 'Preis der Schilder', 'Plate price'), def: 0, max: 200, unit: '€', decimals: 2 },
    { id: 'v', label: T(l, 'Preis der Kurzzeitversicherung', 'Short-term insurance price'), def: 0, max: 1000, unit: '€', decimals: 2 },
  ],
  run: (v) => {
    const r = berechne({ vorgang: 'kurzzeit' });
    const amt = r.max;
    return {
      head: [T(l, 'Gesamt für fünf Tage', 'Total for five days'), geb(amt + v.s + v.v, l)],
      rows: [
        [T(l, 'Gebühr GebOSt Nr. 221.4', 'GebOSt fee no. 221.4'), geb(r.gebuehr, l)],
        [T(l, 'Kraftfahrt-Bundesamt Nr. 124', 'Federal Motor Transport Authority no. 124'), geb(amt - r.gebuehr, l)],
        [T(l, 'Schilder und Versicherung (Ihre Angaben)', 'Plates and insurance (your figures)'), geb(v.s + v.v, l)],
      ],
      note: T(l, 'Schilder und Versicherung haben keinen amtlichen Preis: Tragen Sie die Angebote ein, die Sie haben.', 'Plates and insurance have no official price: enter the quotes you have.'),
    };
  },
});
