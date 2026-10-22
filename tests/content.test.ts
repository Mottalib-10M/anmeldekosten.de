/**
 * Contrôle des fichiers de contenu sans build (CONTRIBUTING-SEITEN.md) : chaque page, dans chaque
 * langue, respecte les longueurs de snippet, le bloc citable, la FAQ et le volume de texte. Permet à
 * plusieurs rédacteurs de valider leur fichier sans écrire dans dist/.
 *   npx vitest run tests/content.test.ts            (toutes les pages)
 *   PAGE=wunschkennzeichen npx vitest run tests/content.test.ts
 */
import { describe, it, expect } from 'vitest';
import { PAGES } from '../src/lib/guides';
import { helpers } from '../src/lib/helpers';
import { ROUTES } from '../src/i18n/routes';
import { getSpec } from '../src/lib/mini-specs';

const txt = (s: string) => s.replace(/<table[\s\S]*?<\/table>/g, (t) => ` ${t} `).replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ');
const mots = (s: string) => txt(s).split(/\s+/).filter(Boolean).length;
const only = process.env.PAGE;
const ids = new Set(ROUTES.map((r) => r.id));

for (const p of PAGES.filter((x) => !only || x.id === only)) {
  for (const lang of ['de', 'en'] as const) {
    describe(`${p.id} (${lang})`, () => {
      const h = helpers(lang);
      const x = p[lang];
      it('title 50–60, description 150–160 (texte final, espaces insécables comptés)', () => {
        expect(x.title.length, x.title).toBeGreaterThanOrEqual(50);
        expect(x.title.length, x.title).toBeLessThanOrEqual(60);
        expect(x.description.length, x.description).toBeGreaterThanOrEqual(150);
        expect(x.description.length, x.description).toBeLessThanOrEqual(160);
      });
      it('bloc citable : un seul paragraphe de 120 mots ou plus', () => {
        const r = x.resume(h);
        expect(r).not.toMatch(/<p|\n\n/);
        expect(mots(r)).toBeGreaterThanOrEqual(120);
      });
      it('FAQ : 3 à 8 questions, réponses de 40 à 90 mots', () => {
        const f = x.faqs(h);
        expect(f.length).toBeGreaterThanOrEqual(3);
        expect(f.length).toBeLessThanOrEqual(8);
        for (const q of f) {
          const n = mots(q.a);
          expect(n, q.q).toBeGreaterThanOrEqual(40);
          expect(n, q.q).toBeLessThanOrEqual(90);
        }
      });
      it('volume : guide ≥ 1 000 mots (résumé + corps + FAQ), page outil ≥ 330', () => {
        const n = mots(x.intro) + mots(x.resume(h)) + mots(x.body(h)) + x.faqs(h).reduce((t, f) => t + mots(f.q) + mots(f.a), 0);
        expect(n).toBeGreaterThanOrEqual(p.tool ? 330 : 1000);
      });
      it('liens internes vers des pages existantes, minis connus', () => {
        const b = x.body(h) + x.faqs(h).map((f) => f.a).join(' ');
        for (const m of b.matchAll(/<!--mini:([A-Za-z0-9_]+)-->/g)) expect(() => getSpec(m[1], lang)).not.toThrow();
        if (p.mini) expect(() => getSpec(p.mini!, lang)).not.toThrow();
        for (const r of p.related) expect(ids.has(r) || !PAGES.length, `related ${r}`).toBe(true);
        expect(b).not.toMatch(/undefined|NaN|\[object/);
      });
    });
  }
}

describe('unicité', () => {
  it('aucune question de FAQ répétée entre pages', () => {
    const seen = new Map<string, string>();
    for (const p of PAGES) for (const lang of ['de', 'en'] as const) for (const f of p[lang].faqs(helpers(lang))) {
      expect(seen.get(f.q), `« ${f.q} » : ${p.id} et ${seen.get(f.q)}`).toBeUndefined();
      seen.set(f.q, p.id);
    }
  });
  it('slugs et titres uniques', () => {
    const s = new Set<string>();
    for (const p of PAGES) for (const lang of ['de', 'en'] as const) {
      for (const k of [`${lang}:${p[lang].slug}`, p[lang].title]) { expect(s.has(k), k).toBe(false); s.add(k); }
    }
  });
});
