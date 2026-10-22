/** Abmelden : vor Ort ou online, Kennzeichen reservieren. */
import { T, geb, yesNoOpts, type L } from './_kit';
import { ortOpts } from './_zul';
import { berechne } from '../engine/gebuehren';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Was kostet das Abmelden?', 'What does deregistering cost?'),
  cta: T(l, 'Alle Vorgänge im Kostenrechner', 'Every procedure in the fee calculator'),
  inputs: [
    { id: 'o', label: T(l, 'Antrag', 'Application'), def: 0, options: ortOpts(l) },
    { id: 'r', label: T(l, 'Kennzeichen für später reservieren?', 'Reserve the plate for later?'), def: 0, options: yesNoOpts(l) },
  ],
  run: (v) => {
    const r = berechne({ vorgang: 'abmelden', online: v.o === 1, reservierung: v.r === 1 });
    const kba = r.neben.find((z) => z.key === 'kba')!;
    return {
      head: [T(l, 'Abmeldung gesamt', 'Deregistration total'), geb(r.max, l)],
      rows: [
        [T(l, 'Gebühr der Behörde', 'Office fee'), geb(r.gebuehr, l)],
        [T(l, 'Kraftfahrt-Bundesamt (Nr. 125)', 'Federal Motor Transport Authority (no. 125)'), geb(kba.max ?? kba.betrag, l)],
        [r.online ? T(l, 'Gespart gegenüber vor Ort', 'Saved versus in person') : T(l, 'Online wären es weniger um', 'Online would be lower by'), geb(r.ersparnisOnline ?? 0, l)],
      ],
    };
  },
});
