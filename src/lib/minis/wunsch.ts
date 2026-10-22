/** Wunschkennzeichen : Aufpreis selon démarche et réservation. */
import { T, geb, yesNoOpts, type L } from './_kit';
import { vOpts, at, ortOpts } from './_zul';
import { berechne, type VorgangId } from '../engine/gebuehren';
import type { MiniSpec } from '../mini-types';
const IDS: VorgangId[] = ['neu', 'gebraucht', 'umzugNeu', 'umschreibungNeu'];
export default (l: L): MiniSpec => ({
  title: T(l, 'Was kostet mein Wunschkennzeichen?', 'What does my personalised number cost?'),
  cta: T(l, 'Gesamte Zulassung rechnen', 'Work out the whole registration'),
  inputs: [
    { id: 'v', label: T(l, 'Anlass', 'Occasion'), def: 0, options: vOpts(l, IDS) },
    { id: 'r', label: T(l, 'Vorab reserviert?', 'Reserved in advance?'), def: 1, options: yesNoOpts(l) },
    { id: 'o', label: T(l, 'Antrag', 'Application'), def: 0, options: ortOpts(l) },
  ],
  run: (v) => {
    const vg = at(IDS, v.v), o = v.o === 1;
    const mit = berechne({ vorgang: vg, online: o, wunsch: true, reservierung: v.r === 1 });
    const ohne = berechne({ vorgang: vg, online: o });
    return {
      head: [T(l, 'Aufpreis für den Wunsch', 'Extra for the personalised number'), geb(mit.gebuehr - ohne.gebuehr, l)],
      rows: [
        [T(l, 'Gebühr mit Wunschkennzeichen', 'Fee with personalised number'), geb(mit.gebuehr, l)],
        [T(l, 'Gebühr ohne Wunsch', 'Fee without'), geb(ohne.gebuehr, l)],
      ],
    };
  },
});
