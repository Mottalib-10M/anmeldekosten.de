/** Libellés des démarches et des lignes de calcul, en allemand et en anglais (un seul endroit). */
import type { VorgangId } from './engine/gebuehren';
import type { Lang } from './zul';

export const VORGANG_TEXT: Record<VorgangId, { de: string; en: string }> = {
  neu: { de: 'Neuwagen zulassen', en: 'Register a new car' },
  gebraucht: { de: 'Gebrauchtwagen anmelden (war abgemeldet)', en: 'Register a used car (was deregistered)' },
  umschreibung: { de: 'Halterwechsel, Kennzeichen bleibt (gleicher Kreis)', en: 'New keeper, plate kept (same district)' },
  umschreibungNeu: { de: 'Halterwechsel mit neuem Kennzeichen (gleicher Kreis)', en: 'New keeper, new plate (same district)' },
  umzugBehalten: { de: 'Ummelden nach Umzug, Kennzeichen bleibt', en: 'Re-register after a move, plate kept' },
  umzugNeu: { de: 'Ummelden nach Umzug, neues Kennzeichen', en: 'Re-register after a move, new plate' },
  adresse: { de: 'Umzug im selben Kreis (neue Anschrift)', en: 'Move within the same district (new address)' },
  wieder: { de: 'Wiederzulassung mit reserviertem Kennzeichen', en: 'Re-registration with a reserved plate' },
  abmelden: { de: 'Auto abmelden (Außerbetriebsetzung)', en: 'Deregister a car' },
  kurzzeit: { de: 'Kurzzeitkennzeichen (fünf Tage)', en: 'Short-term plate (five days)' },
  ausfuhr: { de: 'Ausfuhrkennzeichen (Export)', en: 'Export plate' },
  kennzeichenart: { de: 'Saison-, H- oder E-Kennzeichen für ein zugelassenes Auto', en: 'Seasonal, H or E plate for a registered car' },
  tages: { de: 'Tageszulassung (Handel)', en: 'One-day registration (trade)' },
};
/** Ordre du sélecteur : les démarches les plus fréquentes d'abord. */
export const VORGANG_ORDRE: VorgangId[] = ['neu', 'gebraucht', 'umzugBehalten', 'umzugNeu', 'adresse', 'umschreibung', 'umschreibungNeu', 'abmelden', 'wieder', 'kennzeichenart', 'kurzzeit', 'ausfuhr', 'tages'];

export function zeileText(key: string, nr: string, l: Lang): string {
  const de = l === 'de';
  switch (key) {
    case 'land': return de ? `Gebühr der Zulassungsbehörde, GebOSt Nr. ${nr}` : `Registration office fee, GebOSt no. ${nr}`;
    case 'landOnline': return de ? `Gebühr online (i-Kfz), GebOSt Nr. ${nr}` : `Online fee (i-Kfz), GebOSt no. ${nr}`;
    case 'traeger': return de ? 'Plakettenträger für den Versand' : 'Seal carrier for postal delivery';
    case 'zb1': return de ? 'Neuer Fahrzeugschein (Zulassungsbescheinigung Teil I)' : 'New registration certificate part I';
    case 'wunsch': return de ? 'Wunschkennzeichen' : 'Personalised number';
    case 'reservierung': return de ? 'Reservierung des Kennzeichens, Nr. 230' : 'Plate reservation, no. 230';
    case 'brief': return de ? 'Alter Fahrzeugbrief wird Teil II' : 'Old logbook replaced by part II';
    case 'wechsel': return de ? 'Wechselkennzeichen' : 'Interchangeable plate';
    case 'kbaHalter': return de ? 'Kraftfahrt-Bundesamt, Halterwechsel, Nr. 124' : 'Federal Motor Transport Authority, keeper change, no. 124';
    case 'kba': return de ? `Kraftfahrt-Bundesamt, Registereintrag, Nr. ${nr}` : `Federal Motor Transport Authority, register entry, no. ${nr}`;
    case 'stempel': return de ? 'Zwei Stempelplaketten, Nr. 228.2' : 'Two registration seals, no. 228.2';
    case 'hu': return de ? 'HU-Plakette, Nr. 228.1' : 'Roadworthiness sticker, no. 228.1';
    case 'siegel': return de ? 'Klebesiegel, Nr. 233' : 'Adhesive seals, no. 233';
    default: return key;
  }
}
