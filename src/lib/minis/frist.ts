/** Führerschein-Umtausch : type et années → date limite (Anlage 8e FeV). */
import { T, geb, dateL, num, anneeOptions, type L } from './_kit';
import { umtauschFrist } from '../engine/umtausch';
import { BUILD_TODAY } from '../today';
import type { MiniSpec } from '../mini-types';
export default (l: L): MiniSpec => ({
  title: T(l, 'Bis wann muss mein Führerschein getauscht sein?', 'When must my licence be exchanged?'),
  cta: T(l, 'Ausführlich im Umtausch-Rechner', 'Full detail in the exchange calculator'),
  inputs: [
    { id: 'a', label: T(l, 'Führerschein', 'Licence'), def: 1, options: [{ value: '0', label: T(l, 'Papier', 'Paper') }, { value: '1', label: T(l, 'Scheckkarte', 'Card') }] },
    { id: 'g', label: T(l, 'Geburtsjahr', 'Year of birth'), def: 1975, options: anneeOptions(1930, 2008) },
    { id: 's', label: T(l, 'Ausstellungsjahr (Karte)', 'Year issued (card)'), def: 2006, options: anneeOptions(1999, 2026) },
  ],
  run: (v) => {
    const r = umtauschFrist({ art: v.a === 0 ? 'papier' : 'karte', geburtsjahr: v.g, ausstellungsjahr: v.s }, BUILD_TODAY);
    if (r.regel === 'befristet') return { head: [T(l, 'Kein Pflichtumtausch', 'No mandatory exchange'), T(l, '15 Jahre gültig', 'Valid 15 years')], rows: [[T(l, 'Ablauf', 'Expiry'), T(l, 'Feld 4b der Karte', 'Field 4b on the card')]] };
    if (!r.frist) return { head: [T(l, 'Keine Zeile der Anlage 8e', 'No Annex 8e row'), '—'], rows: [] };
    return {
      head: [r.abgelaufen ? T(l, 'Frist abgelaufen am', 'Deadline passed on') : T(l, 'Umtausch bis', 'Exchange by'), dateL(r.frist, l)],
      rows: [
        [r.abgelaufen ? T(l, 'Seit', 'Overdue by') : T(l, 'Noch', 'Days left'), `${num(Math.abs(r.tage!), l)} ${T(l, 'Tage', 'days')}`],
        [T(l, 'Gebühr', 'Fee'), geb(r.gebuehr, l)],
      ],
      note: v.a === 0 ? T(l, 'Beim Papierführerschein zählt nur das Geburtsjahr.', 'For a paper licence only the year of birth counts.') : undefined,
    };
  },
});
