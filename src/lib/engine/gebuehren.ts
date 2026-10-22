/**
 * Zulassungsgebühren nach der GebOSt (Anlage zu § 1), Zeile für Zeile.
 *
 * Sicher (Wortlaut der Gebührennummer) : die Gebühr der Zulassungsbehörde (Abschnitt 2, Nr. 221 ff.)
 * und die Zuschläge, die der Text an diese Nummern knüpft (Wunschkennzeichen, Fahrzeugbrief,
 * Wechselkennzeichen, Plakettenträger). Spanne statt Einzelbetrag : Plaketten und Siegel (je nach
 * Land und Fall) und der Anteil des Kraftfahrt-Bundesamts (Abschnitt 1, Nr. 123.1, 124, 125), dessen
 * Zuordnung zum Vorgang unsere Lesart ist. Die Kennzeichenschilder verkauft nicht die Behörde : ihr
 * Preis ist eine Eingabe des Nutzers, nie eine Schätzung von uns.
 */
import { P } from './params';

export type VorgangId =
  | 'neu' | 'gebraucht' | 'umschreibung' | 'umschreibungNeu' | 'umzugBehalten' | 'umzugNeu'
  | 'adresse' | 'wieder' | 'abmelden' | 'kurzzeit' | 'ausfuhr' | 'kennzeichenart' | 'tages';

type LandNr = keyof typeof P.land;
interface Def {
  vorOrt: LandNr;
  online?: LandNr;
  /** Online : + 0,30 € für den Plakettenträger (Nr. 221.1.1, 221.2.1, 221.7, 221.10.1). */
  traeger?: boolean;
  /** Neue oder neu gestempelte Schilder : Stempelplaketten. */
  schilder: boolean;
  /** HU-Plakette sicher (1), möglich (0.5) oder nie (0). */
  hu: 0 | 0.5 | 1;
  /** Zuschlag Wunschkennzeichen zulässig (Nr. 221.1, 221.1.1, 221.2, 221.2.1, 221.10, 221.10.1). */
  wunsch: boolean;
  /** Zuschlag Fahrzeugbrief → ZB II (Nr. 221.1, 221.2, 221.6, 221.8 ; nur vor Ort). */
  brief: boolean;
  /** Zuschlag Wechselkennzeichen (Nr. 221.1, 221.2). */
  wechsel: boolean;
  /** Halterwechsel : sicher (true), nie (false), wählbar ('wahl'). */
  halter: boolean | 'wahl';
  /** Fahrzeugschein (ZB I) neu nach Nr. 225 : + 0,90 €. */
  zb1?: boolean;
  /** Spanne des KBA-Anteils, wenn sie nicht aus dem Halterwechsel folgt. */
  kba?: [number, number];
  /** Reservierung des Kennzeichens möglich (Nr. 230). */
  reserv?: boolean;
}

export const VORGAENGE: Record<VorgangId, Def> = {
  neu: { vorOrt: '221.1', online: '221.1.1', traeger: true, schilder: true, hu: 1, wunsch: true, brief: false, wechsel: true, halter: false, kba: [0, P.kba['123.1']] },
  gebraucht: { vorOrt: '221.1', online: '221.1.1', traeger: true, schilder: true, hu: 0.5, wunsch: true, brief: true, wechsel: true, halter: true },
  umschreibung: { vorOrt: '221.8', online: '221.8.1', schilder: false, hu: 0, wunsch: false, brief: true, wechsel: false, halter: true },
  umschreibungNeu: { vorOrt: '221.10', online: '221.10.1', traeger: true, schilder: true, hu: 0.5, wunsch: true, brief: false, wechsel: false, halter: true },
  umzugBehalten: { vorOrt: '221.9', online: '221.9.1', schilder: false, hu: 0, wunsch: false, brief: false, wechsel: false, halter: 'wahl' },
  umzugNeu: { vorOrt: '221.2', online: '221.2.1', traeger: true, schilder: true, hu: 0.5, wunsch: true, brief: true, wechsel: true, halter: 'wahl' },
  adresse: { vorOrt: '225', online: '225.1', schilder: false, hu: 0, wunsch: false, brief: false, wechsel: false, halter: false, zb1: true, kba: [P.kba['125'], P.kba['125']] },
  wieder: { vorOrt: '221.6', online: '221.7', traeger: true, schilder: true, hu: 0.5, wunsch: false, brief: true, wechsel: false, halter: false, kba: [P.kba['125'], P.kba['125']] },
  abmelden: { vorOrt: '224.1', online: '224.2', schilder: false, hu: 0, wunsch: false, brief: false, wechsel: false, halter: false, kba: [P.kba['125'], P.kba['125']], reserv: true },
  kurzzeit: { vorOrt: '221.4', schilder: false, hu: 0, wunsch: false, brief: false, wechsel: false, halter: false, kba: [P.kba['124'], P.kba['124']] },
  ausfuhr: { vorOrt: '221.3', schilder: true, hu: 0, wunsch: false, brief: false, wechsel: false, halter: false, kba: [0, P.kba['125']] },
  kennzeichenart: { vorOrt: '221.1', schilder: true, hu: 0, wunsch: true, brief: false, wechsel: true, halter: false, kba: [P.kba['125'], P.kba['125']] },
  tages: { vorOrt: '221.1.2', online: '221.1.3', schilder: true, hu: 0.5, wunsch: false, brief: false, wechsel: false, halter: false, kba: [0, P.kba['125']] },
};

export const VORGANG_IDS = Object.keys(VORGAENGE) as VorgangId[];

export interface Eingabe {
  vorgang: VorgangId;
  online?: boolean;
  wunsch?: boolean;
  /** Wunschkennzeichen vorab reserviert (Nr. 230 : 2,60 €). Bei der Abmeldung : Kennzeichen für die Wiederzulassung reserviert. */
  reservierung?: boolean;
  /** Fahrzeug hat noch einen alten Fahrzeugbrief (vor Oktober 2005) : Umtausch in ZB II, + 5,10 €. */
  brief?: boolean;
  wechsel?: boolean;
  /** Nur bei umzugBehalten / umzugNeu : Halter wechselt gleichzeitig. */
  halterwechsel?: boolean;
  /** Preis der Kennzeichenschilder beim Schilderhändler, vom Nutzer eingegeben (0 = nicht eingerechnet). */
  schilderPreis?: number;
}

export interface Zeile { nr: string; key: string; betrag: number; max?: number }
export interface Ergebnis {
  vorgang: VorgangId;
  online: boolean;
  /** Online gewählt, aber für diesen Vorgang nicht vorgesehen : vor Ort gerechnet. */
  onlineNichtMoeglich: boolean;
  /** Gebühr der Zulassungsbehörde und Zuschläge : genaue Beträge. */
  fest: Zeile[];
  /** Plaketten, Siegel, KBA-Anteil : Spannen. */
  neben: Zeile[];
  gebuehr: number;
  min: number;
  max: number;
  schilder: number;
  /** Gebühr vor Ort minus Gebühr online, gleiche Zusätze (null, wenn kein Online-Verfahren). */
  ersparnisOnline: number | null;
}

const r2 = (x: number) => Math.round(x * 100) / 100;

function rechne(e: Eingabe): Omit<Ergebnis, 'ersparnisOnline'> {
  const d = VORGAENGE[e.vorgang];
  const online = !!e.online && !!d.online;
  const fest: Zeile[] = [];
  const nr = online ? d.online! : d.vorOrt;
  fest.push({ nr, key: online ? 'landOnline' : 'land', betrag: P.land[nr] as number });
  if (online && d.traeger) fest.push({ nr, key: 'traeger', betrag: P.zuschlag.plakettentraeger });
  if (d.zb1 && !online) fest.push({ nr: '225', key: 'zb1', betrag: P.zuschlag.zb1 });
  if (e.wunsch && d.wunsch) fest.push({ nr: '221', key: 'wunsch', betrag: P.zuschlag.wunsch });
  if (e.reservierung && ((e.wunsch && d.wunsch) || d.reserv)) fest.push({ nr: '230', key: 'reservierung', betrag: P.land['230'] });
  if (e.brief && d.brief && !online) fest.push({ nr: '221', key: 'brief', betrag: P.zuschlag.fahrzeugbrief });
  if (e.wechsel && d.wechsel) fest.push({ nr: '221', key: 'wechsel', betrag: P.zuschlag.wechsel });

  const neben: Zeile[] = [];
  const halter = d.halter === 'wahl' ? !!e.halterwechsel : d.halter;
  if (halter) neben.push({ nr: '124', key: 'kbaHalter', betrag: P.kba['124'], max: P.kba['124'] });
  else if (d.kba) neben.push({ nr: d.kba[1] === P.kba['123.1'] ? '123.1' : d.kba[1] === P.kba['124'] ? '124' : '125', key: 'kba', betrag: d.kba[0], max: d.kba[1] });
  else neben.push({ nr: '125', key: 'kba', betrag: P.kba['125'], max: P.kba['125'] });
  const [s1, s2] = P.zuschlag.stempelplakette;
  if (d.schilder) neben.push({ nr: '228.2', key: 'stempel', betrag: r2(2 * s1), max: r2(2 * s2) });
  if (d.hu) neben.push({ nr: '228.1', key: 'hu', betrag: d.hu === 1 ? P.zuschlag.huPlakette : 0, max: P.zuschlag.huPlakette });
  // Klebesiegel (Nr. 233) : l'autocollant d'adresse sur la ZB I lors d'un changement d'adresse sur place.
  if (e.vorgang === 'adresse' && !online) neben.push({ nr: '233', key: 'siegel', betrag: P.zuschlag.klebesiegel, max: P.zuschlag.klebesiegel });

  const gebuehr = r2(fest.reduce((t, z) => t + z.betrag, 0));
  const schilder = d.schilder ? Math.max(0, e.schilderPreis ?? 0) : 0;
  const min = r2(gebuehr + neben.reduce((t, z) => t + z.betrag, 0) + schilder);
  const max = r2(gebuehr + neben.reduce((t, z) => t + (z.max ?? z.betrag), 0) + schilder);
  return { vorgang: e.vorgang, online, onlineNichtMoeglich: !!e.online && !d.online, fest, neben, gebuehr, min, max, schilder };
}

export function berechne(e: Eingabe): Ergebnis {
  const r = rechne(e);
  const ersparnisOnline = VORGAENGE[e.vorgang].online ? r2(rechne({ ...e, online: false }).gebuehr - rechne({ ...e, online: true }).gebuehr) : null;
  return { ...r, ersparnisOnline };
}

/** Nur die Gebühr der Zulassungsbehörde mit Zuschlägen (der genaue, bundesweit gleiche Teil). */
export const gebuehr = (e: Eingabe) => berechne(e).gebuehr;
export const hatOnline = (v: VorgangId) => !!VORGAENGE[v].online;
