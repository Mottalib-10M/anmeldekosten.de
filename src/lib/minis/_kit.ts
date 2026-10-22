/** Petits outils communs aux mini-simulateurs (fichier ignoré par le registre : préfixe « _ »). */
import { formatMoney, formatPercent, formatNumber, displayDate } from '../format';
export type L = 'de' | 'en';
export const T = <A>(l: L, de: A, en: A) => (l === 'en' ? en : de);
export const eur = (x: number, l: L, d = 2) => formatMoney(x, d, l);
/** Montant GebOSt : toujours au centime (« 30,00 € »), sauf montant rond demandé. */
export const geb = (x: number, l: L) => formatMoney(x, 2, l);
export const pct = (x: number, l: L, d = 1) => formatPercent(x, d, l);
export const num = (x: number, l: L, d = 0) => formatNumber(x, d, l);
export const dateL = (iso: string, l: L) => displayDate(iso, l === 'en' ? 'en-GB' : 'de-DE');
export const yesNoOpts = (l: L) => [{ value: '0', label: l === 'en' ? 'No' : 'Nein' }, { value: '1', label: l === 'en' ? 'Yes' : 'Ja' }];
export const anneeOptions = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => String(to - i)).map((y) => ({ value: y, label: y }));
