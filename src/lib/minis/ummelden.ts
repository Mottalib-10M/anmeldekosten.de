/** Ummelden nach Umzug : Kennzeichen behalten ou neues, Halterwechsel, online. */
import { T, geb, yesNoOpts, type L } from './_kit';
import { ortOpts } from './_zul';
import { berechne } from '../engine/gebuehren';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Ummelden: Kennzeichen behalten oder neu?', 'Re-registering: keep the plate or get a new one?'),
  cta: T(l, 'Ganze Rechnung im Kostenrechner', 'Full bill in the fee calculator'),
  inputs: [
    { id: 'h', label: T(l, 'Neuer Halter (gekauft)?', 'New keeper (bought)?'), def: 0, options: yesNoOpts(l) },
    { id: 'o', label: T(l, 'Antrag', 'Application'), def: 0, options: ortOpts(l) },
  ],
  run: (v) => {
    const o = v.o === 1, h = v.h === 1;
    const a = berechne({ vorgang: 'umzugBehalten', online: o, halterwechsel: h });
    const b = berechne({ vorgang: 'umzugNeu', online: o, halterwechsel: h });
    return {
      head: [T(l, 'Kennzeichen behalten', 'Keep the plate'), geb(a.gebuehr, l)],
      rows: [
        [T(l, 'Neues Kennzeichen (ohne Schilder)', 'New plate (without plates)'), geb(b.gebuehr, l)],
        [T(l, 'Unterschied', 'Difference'), geb(b.gebuehr - a.gebuehr, l)],
        [T(l, 'Behalten, mit Nebenposten', 'Keep, with small items'), `${geb(a.min, l)} – ${geb(a.max, l)}`],
      ],
      note: T(l, 'Wer das Kennzeichen behält, braucht keine neuen Schilder.', 'Keeping the plate means no new plates to buy.'),
    };
  },
});
