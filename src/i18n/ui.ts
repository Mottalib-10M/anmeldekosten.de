import type { Locale } from './routes';
const de = {
  updatedOn: 'Aktualisiert am', editorialPolicy: 'Redaktionsrichtlinien', contactLabel: 'Kontakt', reviewedBy: 'Geprüft von',
  skipToContent: 'Zum Inhalt springen', mainNav: 'Hauptnavigation', breadcrumbLabel: 'Brotkrumennavigation', breadcrumbHome: 'Start', menuOpen: 'Menü öffnen',
  faqTitle: 'Häufige Fragen', relatedCalculators: 'Weiter mit', sourcesTitle: 'Quellen', writtenBy: 'Verfasst von',
  asOf: 'Gebühren', lastUpdated: 'Behördendaten vom', footerValidated: 'Grundlagen: GebOSt, FZV und FeV im amtlichen Wortlaut; Anschriften und Bestand: Kraftfahrt-Bundesamt', footerBrowser: 'Ohne Konto · ohne Termin · ohne Datenübertragung · kostenlos',
  footerDisclaimer: 'Unabhängige Website von Radif Partners. Sie ist keine Zulassungsbehörde, keine Fahrerlaubnisbehörde und kein Angebot des Kraftfahrt-Bundesamts, vergibt keine Termine, prägt keine Schilder und vermittelt keinen Zulassungsdienst. Die Beträge folgen der Gebührenordnung; die Angaben sind unverbindlich, maßgeblich ist der Gebührenbescheid Ihrer Behörde.', footerPopular: '', notFound: 'Diese Seite gibt es nicht.',
  readMore: 'Weiterlesen',
};
const en: typeof de = {
  updatedOn: 'Updated on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Checked by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Frequently asked questions', relatedCalculators: 'Next steps', sourcesTitle: 'Sources', writtenBy: 'Written by',
  asOf: 'Fees', lastUpdated: 'office data of', footerValidated: 'Based on the official texts of the GebOSt, FZV and FeV; addresses and vehicle stock: Federal Motor Transport Authority', footerBrowser: 'No account · no appointment · no data sent · free',
  footerDisclaimer: 'Independent website published by Radif Partners. It is not a registration office, a licensing office or a service of the Federal Motor Transport Authority, books no appointments, makes no plates and brokers no registration service. Amounts follow the federal fee schedule; they are for guidance only, and the fee notice from your office is what counts.', footerPopular: '', notFound: 'This page does not exist.',
  readMore: 'Read more',
};
export function t(lang: Locale) { return lang === 'en' ? en : de; }
