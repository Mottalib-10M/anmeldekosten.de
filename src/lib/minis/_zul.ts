/** Données communes aux mini-simulateurs (fichier ignoré par le registre : préfixe « _ »). */
import { VORGANG_TEXT } from '../vorgaenge-text';
import type { VorgangId } from '../engine/gebuehren';
import type { L } from './_kit';
export const vOpts = (l: L, ids: VorgangId[]) => ids.map((v, i) => ({ value: String(i), label: VORGANG_TEXT[v][l] }));
export const at = <A,>(arr: A[], i: number) => arr[Math.max(0, Math.min(arr.length - 1, Math.round(i)))];
export const ortOpts = (l: L) => [{ value: '0', label: l === 'en' ? 'In person' : 'Vor Ort' }, { value: '1', label: 'Online (i-Kfz)' }];
