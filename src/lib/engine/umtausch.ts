/**
 * Pflichtumtausch des Führerscheins (§ 24a Abs. 2 FeV mit Anlage 8e).
 * Papierführerscheine (bis 31.12.1998) : Frist nach dem Geburtsjahr. Kartenführerscheine
 * (1.1.1999 bis 18.1.2013) : Frist nach dem Ausstellungsjahr ; wer vor 1953 geboren ist, tauscht
 * in jedem Fall bis zum 19.1.2033. Ab dem 19.1.2013 ausgestellte Karten sind 15 Jahre gültig.
 */
import { P } from './params';
import { addYears, daysBetween } from './dates';

export type Art = 'papier' | 'karte';
export interface UmtauschEingabe { art: Art; geburtsjahr: number; ausstellungsjahr?: number }
export type Regel = 'vor1953' | 'papier' | 'karte' | 'befristet' | 'unbekannt';
export interface UmtauschErgebnis {
  regel: Regel;
  /** Tag, bis zu dem umgetauscht sein muss (ISO), oder null (befristete Karte : Datum auf der Karte). */
  frist: string | null;
  /** Spanne der Anlage-8e-Zeile, z. B. « 1965 bis 1970 ». */
  zeile: { von?: number; bis?: number } | null;
  /** Frist verstrichen am Stichtag ? */
  abgelaufen: boolean;
  /** Tage vom Stichtag bis zur Frist (negativ : seit so vielen Tagen abgelaufen). */
  tage: number | null;
  /** Gebühr nach GebOSt : Nr. 202.5 (25,50 €) + KBA Nr. 126.2 (1,00 €). */
  gebuehr: number;
}

const F = P.fuehrerschein;
export const UMTAUSCH_GEBUEHR = Math.round((F.umstellung + F.zfer) * 100) / 100;

function zeileVon<T extends { von?: number; bis?: number; frist: string }>(liste: T[], jahr: number): T | undefined {
  return liste.find((z) => (z.von === undefined || jahr >= z.von) && (z.bis === undefined || jahr <= z.bis));
}

export function umtauschFrist(e: UmtauschEingabe, heute: string): UmtauschErgebnis {
  const fertig = (regel: Regel, frist: string | null, zeile: UmtauschErgebnis['zeile']): UmtauschErgebnis => {
    const tage = frist ? daysBetween(heute, frist) : null;
    return { regel, frist, zeile, abgelaufen: tage !== null && tage < 0, tage, gebuehr: UMTAUSCH_GEBUEHR };
  };
  if (e.geburtsjahr < F.geburtsjahr_vor) return fertig('vor1953', F.frist_vor_1953, { bis: F.geburtsjahr_vor - 1 });
  if (e.art === 'papier') {
    const z = zeileVon(F.papier, e.geburtsjahr);
    return z ? fertig('papier', z.frist, { von: z.von, bis: z.bis }) : fertig('unbekannt', null, null);
  }
  const a = e.ausstellungsjahr ?? 0;
  // 2013 : nur bis zum 18. Januar alte Regel (Zeile « 2012 bis 18. Januar 2013 ») ; danach befristet.
  if (a >= 2014) return fertig('befristet', null, null);
  if (a < 1999) return fertig('unbekannt', null, null);
  const z = zeileVon(F.karte, a);
  return z ? fertig('karte', z.frist, { von: z.von, bis: z.bis === 2013 ? 2012 : z.bis }) : fertig('unbekannt', null, null);
}

/** Ablauf einer ab dem 19.1.2013 ausgestellten Karte : 15 Jahre nach dem Ausstellungstag (§ 24a Abs. 1 FeV). */
export const ablaufKarte = (ausgestellt: string) => addYears(ausgestellt, F.gueltigkeit_jahre);
