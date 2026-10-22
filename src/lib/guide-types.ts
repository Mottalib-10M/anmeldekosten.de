/**
 * Une page (guide ou page outil) = UN fichier de données dans `src/content/guides/` ou `outils/`.
 * Il porte les deux langues (de, en), le texte, la FAQ, les sources, le mini-simulateur et les liens ;
 * le cœur du site (routes, menus, pied de page, sitemap, hreflang, schémas, maillage) le lit seul.
 */
import type { SourceKey, Params } from './engine/params';
import type { VorgangId } from './engine/gebuehren';
import type { Paket } from './zul';

export type Lang = 'de' | 'en';
export type Group = 'kosten' | 'kennzeichen' | 'fuehrerschein' | 'staedte';
/** `finder` : Ort/PLZ/Kennzeichen → Zulassungsstelle ; `kosten` : Gebühren Posten für Posten ;
 *  `umtausch` : Frist des Führerscheinumtauschs ; `kennzeichen` : Unterscheidungszeichen → Kreis. */
export type Tool = 'finder' | 'kosten' | 'umtausch' | 'kennzeichen';
export interface FAQ { q: string; a: string }

/** Outils d'écriture passés au corps : liens internes, nombres au format de la langue, moteur, données KBA. */
export interface Helpers {
  lang: Lang;
  a: (id: string, text: string) => string;
  /** Montant en euros, au centime par défaut (les gebühren GebOSt ont des centimes). */
  eur: (n: number, decimals?: number) => string;
  num: (n: number, decimals?: number) => string;
  pct: (x: number, decimals?: number) => string;
  date: (iso: string) => string;
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string, align?: Array<'l' | 'r'>) => string;
  src: (key: SourceKey, text?: string) => string;
  P: Params;
  M: typeof import('./engine/index');
  /** Données KBA du dernier build. */
  Z: typeof import('./zul-build');
  land: (code: string) => string;
  /** Jour de référence du build (heure de Berlin). */
  today: string;
}

export interface PageText {
  slug: string;
  nav: string;
  card: string;
  /** 50 à 60 caractères, terme-clé en tête (RECETTE §11). */
  title: string;
  /** 150 à 160 caractères. */
  description: string;
  h1: string;
  intro: string;
  /** Bloc citable : UN paragraphe d'au moins 120 mots (RECETTE §21). */
  resume: (h: Helpers) => string;
  faqs: (h: Helpers) => FAQ[];
  body: (h: Helpers) => string;
}

export interface PageDef {
  id: string;
  group: Group;
  order: number;
  mini?: string;
  miniHref?: string;
  tool?: Tool;
  /** Page ville : identifiant du Zulassungsbezirk (clé KBA, ex. « 09162 »). */
  bezirk?: string;
  /** Démarche présélectionnée dans l'outil, et liste restreinte s'il y a lieu. */
  vorgang?: VorgangId;
  vorgaenge?: VorgangId[];
  wunsch?: boolean;
  online?: boolean;
  /** Kennzeichen présélectionné (outil kennzeichen). */
  code?: string;
  related: string[];
  sources: SourceKey[];
  de: PageText;
  en: PageText;
}
export const defineGuide = (g: PageDef): PageDef => g;
export type { Paket };
