/** i-Kfz : différence vor Ort / online pour une démarche. */
import { T, geb, pct, type L } from './_kit';
import { vOpts, at } from './_zul';
import { berechne, type VorgangId } from '../engine/gebuehren';
import type { MiniSpec } from '../mini-types';
const IDS: VorgangId[] = ['neu', 'gebraucht', 'umzugBehalten', 'umzugNeu', 'adresse', 'umschreibung', 'abmelden', 'wieder'];
export default (l: L): MiniSpec => ({
  title: T(l, 'Wie viel spare ich online?', 'How much do I save online?'),
  cta: T(l, 'Alle Posten im Kostenrechner', 'Every item in the fee calculator'),
  inputs: [{ id: 'v', label: T(l, 'Vorgang', 'Procedure'), def: 0, options: vOpts(l, IDS) }],
  run: (v) => {
    const vg = at(IDS, v.v);
    const a = berechne({ vorgang: vg }), b = berechne({ vorgang: vg, online: true });
    const d = a.gebuehr - b.gebuehr;
    return {
      head: [T(l, 'Ersparnis online', 'Online saving'), geb(d, l)],
      rows: [
        [T(l, 'Gebühr vor Ort', 'Fee in person'), geb(a.gebuehr, l)],
        [T(l, 'Gebühr online', 'Fee online'), geb(b.gebuehr, l)],
        [T(l, 'Ersparnis in Prozent', 'Saving in per cent'), pct(a.gebuehr ? d / a.gebuehr : 0, l, 0)],
      ],
    };
  },
});
