/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://de-zulassungsstelle.example";
export const SITE_NAMES: Record<string, string> = {"de": "Zulassungsrechner", "en": "Zulassungsrechner"};
export const LANG_TAGS: Record<string, string> = {"de": "de-DE", "en": "en-DE"};
export const OG_LOCALES: Record<string, string> = {"de": "de_DE", "en": "en_GB"};
/** Une locale par langue (RECETTE §4) : l'anglais écrit « €1,234 », l'allemand « 1.234 € ». */
export const LOCALE_BY_LANG: Record<string, string> = { de: 'de-DE', en: 'en-GB' };
export const LOCALE_TAG = 'de-DE';
export const CURRENCY = 'EUR';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
import FICHIER from './zul/fichier.json';
/** Date des données lues au dernier build (scripts/update-data.py) : c'est la date affichée sur chaque page. */
export const LAST_UPDATED: string = FICHIER.build;
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"de": "Herausgeber eines unabhängigen Gebühren- und Fristenrechners für Kfz-Zulassung und Führerscheinumtausch, Zulassungsbezirk für Zulassungsbezirk", "en": "Publisher of an independent fee and deadline calculator for German vehicle registration and driving licence exchange, district by district"};
export const AUTHOR_DESC: Record<string, string> = {"de": "Radif Partners zerlegt jede Zulassungsgebühr in die Positionen der Gebührenordnung für Maßnahmen im Straßenverkehr: Landesgebühr, Anteil des Kraftfahrt-Bundesamts, Plaketten, Wunschkennzeichen, Online-Abschlag. Die Anschriften und Unterscheidungszeichen aller Zulassungsbehörden stammen aus dem amtlichen Verzeichnis des Kraftfahrt-Bundesamts, die Umtauschfristen aus Anlage 8e der Fahrerlaubnis-Verordnung. Wir verkaufen keine Kennzeichen, vermitteln keinen Zulassungsdienst und vergeben keine Termine.", "en": "Radif Partners breaks every German registration fee down into the line items of the federal road traffic fee schedule: the district office's fee, the Federal Motor Transport Authority's share, seals, a personalised number and the online discount. Addresses and district codes of every registration office come from the Authority's official directory, exchange deadlines from Annex 8e of the Driving Licence Regulation. We sell no plates, broker no registration service and book no appointments."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"de": ["Gebührenordnung für Maßnahmen im Straßenverkehr (GebOSt), Abschnitt Zulassung", "Fahrzeug-Zulassungsverordnung: Kennzeichenarten und Unterscheidungszeichen", "Internetbasierte Fahrzeugzulassung (i-Kfz)", "Pflichtumtausch des Führerscheins nach Anlage 8e FeV"], "en": ["German road traffic fee schedule (GebOSt), registration section", "Vehicle Registration Ordinance: plate types and district codes", "Online vehicle registration in Germany (i-Kfz)", "Mandatory driving licence exchange under Annex 8e FeV"]};
export const CONTACT_EMAIL = "kontakt@de-zulassungsstelle.example";
export const THEME_COLOR = '#1D4ED8';
export const LOGO_SYMBOL = 'Kfz';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = '';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = '';
export const INDEXNOW_KEY = '759c05e24b6b5931cb38a2ee3746e8eb';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',  // éditeur de tous les sites du portefeuille (RECETTE §8)
  legalForm: '',  // vide : comme les autres sites du portefeuille
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "Frankreich / France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "USt-IdNr.",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city'];

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
