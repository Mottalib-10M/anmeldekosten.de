# Eine Seite schreiben (de-zulassungsstelle)

Eine Seite = eine Datei in `src/content/guides/<id>.ts` (Ratgeber) oder `src/content/outils/<id>.ts`
(Seite mit Werkzeug: Kosten, Umtausch, Kennzeichen, Städte). Die Datei trägt Deutsch **und** Englisch.
Menüs, Routen, hreflang, Sitemap und Schemas lesen sie von selbst. Vorbilder:
`src/content/guides/auto-anmelden-kosten.ts` (Ratgeber), `src/content/outils/zulassungsstelle-berlin.ts` (Stadt).

## Aufbau

```ts
import { defineGuide, type Helpers } from '../../lib/guide-types';
export default defineGuide({
  id: 'wunschkennzeichen',          // = Dateiname
  group: 'kennzeichen',             // kosten | kennzeichen | fuehrerschein | staedte
  order: 2,
  mini: 'wunsch',                   // Mini-Rechner unter dem Zitierblock (src/lib/minis/<kind>.ts)
  miniHref: 'kosten',               // Ziel des Buttons im Mini-Rechner (Routen-ID)
  related: ['kosten', ...],         // 4–5 Routen-IDs
  sources: ['gebost', 'fzv9'],      // Schlüssel aus src/data/params-2026.json → sources
  de: { slug, nav, card, title, description, h1, intro, resume: (h) => '', faqs: (h) => [], body: (h) => '' },
  en: { ... },
});
```

`h` (Helpers): `h.eur(x)` Betrag mit Cent, `h.num`, `h.pct(anteil)`, `h.date(iso)`,
`h.a('route-id', 'Text')` interner Link, `h.table(köpfe, zeilen, legende, ['l','r'])`, `h.src('gebost')`,
`h.P` Parameter (GebOSt-Beträge, FZV-Fristen, FeV-Kalender, Kfz-Steuer), `h.M.berechne({ vorgang, online,
wunsch, reservierung, brief, wechsel, halterwechsel })` → `{ gebuehr, min, max, fest, neben, ersparnisOnline }`,
`h.M.umtauschFrist`, `h.M.UMTAUSCH_GEBUEHR`, `h.Z` KBA-Daten (`META`, `BEZIRKE`, `paketVon(id)`,
`kennzeichenListe()`), `h.today` (Stichtag ISO). `<!--mini:KIND-->` setzt einen weiteren Mini-Rechner in den Text.

## Regeln (jede wird geprüft)

1. **Keine Zahl ohne Quelle, keine Zahl von Hand.** Jeder Betrag, jede Frist, jede Zählung kommt aus
   `h.P`, `h.M` oder `h.Z`. Paragraphennummern, Jahreszahlen von Gesetzen und Ordnungszahlen dürfen im
   Text stehen. Fehlt ein Wert in `params-2026.json`, wird er nicht erfunden: weglassen und melden.
   Ein Betrag einer Behörde, der nicht veröffentlicht ist, heißt „nicht veröffentlicht“.
2. **Titel 50–60 Zeichen, Beschreibung 150–160**, Suchbegriff zuerst (nie „Deutschland“, „Rechner“,
   „Ratgeber“ oder eine Frage am Anfang). Englischer Titel: Suchbegriff, den ein Ausländer in Deutschland
   tippt; deutsches Stichwort erlaubt (z. B. „Kurzzeitkennzeichen“).
3. **Zitierblock `resume`**: ein einziger Absatz, 120–170 Wörter, beantwortet die Frage der Seite mit
   den Zahlen; Stand der Daten nennen (`h.P.gebost_stand`, `h.Z.META.av1Stand`).
4. **FAQ**: 4–5 Fragen je Sprache, Antworten 40–90 Wörter, keine Frage, die auf einer anderen Seite steht.
5. **Umfang**: Ratgeber ≥ 1 000 Wörter je Sprache in Zitierblock, Text, Tabellen und FAQ (der Test zählt; mit Rahmen ergibt das die 1 200 Wörter der Prüfung). Inhalt statt Füllstoff:
   Fälle durchrechnen, Tabellen aus dem Motor, Ausnahmen, typische Fehler.
6. **Eigener Text je Seite**: höchstens 30 % Ähnlichkeit mit jeder anderen Seite. Keine Absätze kopieren.
7. **Wahrheit**: nur, was die Quellen in `sources` tragen. Behördenpraxis (Termine, Bezahlarten,
   Öffnungszeiten) nur allgemein und als „viele Behörden“ formulieren. Radif Partners ist keine Behörde.
8. **Keine Links nach außen** im Text außer `h.src(...)`; kein Angebot, kein Formular, keine Affiliate-Links.
9. Englisch: britische Schreibweise, deutsche Begriffe beim ersten Auftreten in Klammern.

## Prüfen (ohne Build)

```bash
PAGE=<id> npx vitest run tests/content.test.ts
```

Der Test prüft Snippet-Längen, Zitierblock, FAQ, Umfang, Links und Minis. Den Build (`npm run check`)
startet nur der Seitenverantwortliche, damit sich zwei Builds nicht in `dist/` überschneiden.
