/** Auto anmelden : Neuwagen oder Gebrauchtwagen, vor Ort oder online → Gebühr GebOSt et total. */
import { T, geb, type L } from './_kit';
import { vOpts, at, ortOpts } from './_zul';
import { berechne, type VorgangId } from '../engine/gebuehren';
import type { MiniSpec } from '../mini-types';
const IDS: VorgangId[] = ['neu', 'gebraucht', 'wieder'];
export default (l: L): MiniSpec => ({
  title: T(l, 'Was kostet die Anmeldung?', 'What does registering cost?'),
  cta: T(l, 'Alle Posten im Kostenrechner', 'Every item in the fee calculator'),
  inputs: [
    { id: 'v', label: T(l, 'Fahrzeug', 'Vehicle'), def: 0, options: vOpts(l, IDS) },
    { id: 'o', label: T(l, 'Antrag', 'Application'), def: 0, options: ortOpts(l) },
  ],
  run: (v) => {
    const r = berechne({ vorgang: at(IDS, v.v), online: v.o === 1 });
    return {
      head: [T(l, 'Gebühr nach GebOSt', 'GebOSt fee'), geb(r.gebuehr, l)],
      rows: [
        [T(l, 'Mit Plaketten und KBA-Anteil', 'With seals and KBA share'), `${geb(r.min, l)} – ${geb(r.max, l)}`],
        [r.online ? T(l, 'Gespart gegenüber vor Ort', 'Saved versus in person') : T(l, 'Online wäre es weniger um', 'Online would be lower by'), r.ersparnisOnline !== null ? geb(r.ersparnisOnline, l) : '—'],
      ],
      note: T(l, 'Schilder vom Händler, Versicherung und Kfz-Steuer kommen dazu.', 'Plates from a shop, insurance and vehicle tax come on top.'),
    };
  },
});
