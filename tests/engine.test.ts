import { describe, it, expect } from 'vitest';
import { berechne, VORGANG_IDS, VORGAENGE } from '../src/lib/engine/gebuehren';
import { umtauschFrist, ablaufKarte, UMTAUSCH_GEBUEHR } from '../src/lib/engine/umtausch';
import { P } from '../src/lib/engine/params';
import BEZ from '../src/data/zul/bezirke.json';
import KZ from '../src/data/zul/kennzeichen.json';
import F from '../src/data/zul/fichier.json';
import { bezirkVonGemeinde, normaliser, type Bezirk } from '../src/lib/zul';

describe('GebOSt : montants du texte (Anlage zu § 1, relue le 2026-10-21)', () => {
  it('Gebühren der Zulassungsbehörde', () => {
    expect(P.land['221.1']).toBe(30.0);
    expect(P.land['221.1.1']).toBe(12.8);
    expect(P.land['221.2']).toBe(27.1);
    expect(P.land['221.8']).toBe(24.2);
    expect(P.land['221.9.1']).toBe(9.9);
    expect(P.land['224.1']).toBe(15.9);
    expect(P.land['224.2']).toBe(2.1);
    expect(P.zuschlag.wunsch).toBe(10.2);
    expect(P.kba['124']).toBe(3.2);
  });
  it('Neuwagen vor Ort : 30,00 € ; online 12,80 € + 0,30 € Plakettenträger', () => {
    expect(berechne({ vorgang: 'neu' }).gebuehr).toBe(30);
    expect(berechne({ vorgang: 'neu', online: true }).gebuehr).toBe(13.1);
    expect(berechne({ vorgang: 'neu' }).ersparnisOnline).toBe(16.9);
  });
  it('Wunschkennzeichen reserviert : + 10,20 € + 2,60 €', () => {
    expect(berechne({ vorgang: 'neu', wunsch: true, reservierung: true }).gebuehr).toBe(42.8);
    // pas de Wunsch-Zuschlag sur un Vorgang qui ne le prévoit pas (221.8)
    expect(berechne({ vorgang: 'umschreibung', wunsch: true }).gebuehr).toBe(24.2);
  });
  it('Berlin publie 17,10 € (vor Ort) et 3,30 € (online) pour la Außerbetriebsetzung : 224.1/224.2 + KBA 125', () => {
    expect(berechne({ vorgang: 'abmelden' }).max).toBe(17.1);
    expect(berechne({ vorgang: 'abmelden', online: true }).max).toBe(3.3);
    expect(berechne({ vorgang: 'abmelden', reservierung: true }).max).toBe(19.7);
  });
  it('Berlin publie 12,60 € pour l’Adressänderung : 225 + ZB I + Klebesiegel + KBA 125', () => {
    const r = berechne({ vorgang: 'adresse' });
    expect(r.min).toBe(12.6);
    expect(r.max).toBe(12.6);
  });
  it('Kurzzeitkennzeichen : 10,20 € + KBA 3,20 €', () => {
    expect(berechne({ vorgang: 'kurzzeit' }).max).toBe(13.4);
  });
  it('Fahrzeugbrief et Wechselkennzeichen seulement là où le texte les prévoit', () => {
    expect(berechne({ vorgang: 'gebraucht', brief: true, wechsel: true }).gebuehr).toBe(41.1);
    expect(berechne({ vorgang: 'gebraucht', brief: true, online: true }).gebuehr).toBe(13.1);
    expect(berechne({ vorgang: 'abmelden', brief: true, wechsel: true }).gebuehr).toBe(15.9);
  });
  it('les plaques ne sont comptées que si l’utilisateur saisit un prix', () => {
    expect(berechne({ vorgang: 'neu', schilderPreis: 25 }).min - berechne({ vorgang: 'neu' }).min).toBeCloseTo(25, 6);
    expect(berechne({ vorgang: 'adresse', schilderPreis: 25 }).schilder).toBe(0);
  });
  it('chaque démarche : min ≤ max, Gebühr > 0, numéro présent dans params', () => {
    for (const v of VORGANG_IDS) {
      for (const online of [false, true]) {
        const r = berechne({ vorgang: v, online });
        expect(r.gebuehr).toBeGreaterThan(0);
        expect(r.min).toBeLessThanOrEqual(r.max);
        expect(P.land[VORGAENGE[v].vorOrt]).toBeDefined();
      }
    }
  });
});

describe('Führerscheinumtausch (Anlage 8e FeV)', () => {
  const H = '2026-10-21';
  it('Papierführerschein : Geburtsjahr', () => {
    expect(umtauschFrist({ art: 'papier', geburtsjahr: 1955 }, H).frist).toBe('2022-07-19');
    expect(umtauschFrist({ art: 'papier', geburtsjahr: 1968 }, H).frist).toBe('2024-01-19');
    expect(umtauschFrist({ art: 'papier', geburtsjahr: 1975 }, H).frist).toBe('2025-01-19');
    expect(umtauschFrist({ art: 'papier', geburtsjahr: 1968 }, H).abgelaufen).toBe(true);
  });
  it('Kartenführerschein : Ausstellungsjahr', () => {
    expect(umtauschFrist({ art: 'karte', geburtsjahr: 1975, ausstellungsjahr: 2000 }, H).frist).toBe('2026-01-19');
    expect(umtauschFrist({ art: 'karte', geburtsjahr: 1975, ausstellungsjahr: 2003 }, H).frist).toBe('2027-01-19');
    expect(umtauschFrist({ art: 'karte', geburtsjahr: 1975, ausstellungsjahr: 2008 }, H).frist).toBe('2029-01-19');
    expect(umtauschFrist({ art: 'karte', geburtsjahr: 1975, ausstellungsjahr: 2012 }, H).frist).toBe('2033-01-19');
    expect(umtauschFrist({ art: 'karte', geburtsjahr: 1975, ausstellungsjahr: 2003 }, H).tage).toBe(90);
  });
  it('vor 1953 geboren : 19.01.2033, quel que soit le document', () => {
    expect(umtauschFrist({ art: 'papier', geburtsjahr: 1950 }, H).frist).toBe('2033-01-19');
    expect(umtauschFrist({ art: 'karte', geburtsjahr: 1952, ausstellungsjahr: 2000 }, H).frist).toBe('2033-01-19');
  });
  it('carte de 2014 : pas d’échange obligatoire, 15 ans', () => {
    expect(umtauschFrist({ art: 'karte', geburtsjahr: 1990, ausstellungsjahr: 2014 }, H).regel).toBe('befristet');
    expect(ablaufKarte('2026-10-21')).toBe('2041-10-21');
  });
  it('Gebühr 25,50 € + 1,00 € = 26,50 € (Berlin publie 26,50 €)', () => {
    expect(UMTAUSCH_GEBUEHR).toBe(26.5);
    expect(P.lokal['11000'].posten.find((x) => x.id === 'umtausch')!.betrag).toBe(UMTAUSCH_GEBUEHR);
  });
});

describe('Données KBA', () => {
  const B = BEZ as unknown as Bezirk[];
  it('volumes plausibles', () => {
    expect(B.length).toBeGreaterThan(390);
    expect(Object.keys(KZ).length).toBeGreaterThan(700);
    expect(F.total.pkw).toBeGreaterThan(45_000_000);
  });
  it('Kennzeichen des grandes villes', () => {
    const k = KZ as Record<string, { bez: string[] }>;
    expect(k.M.bez).toContain('09162');
    expect(k.B.bez).toContain('11000');
    expect(k.K.bez).toContain('05315');
    expect(k.HH.bez).toContain('02000');
  });
  it('Gemeinde → Bezirk : Hannover (Stadt) et Garbsen (Region)', () => {
    expect(bezirkVonGemeinde(B, { name: 'Hannover', ags: '03241001' })?.id).toBe('03241-1');
    expect(bezirkVonGemeinde(B, { name: 'Garbsen', ags: '03241005' })?.id).toBe('03241');
  });
  it('normalisation des umlauts', () => { expect(normaliser('Düsseldorf')).toBe('duesseldorf'); expect(normaliser('Gießen')).toBe('giessen'); });
  it('toutes les sources du params ont une URL https', () => {
    for (const s of Object.values(P.sources)) expect(s.url.startsWith('https://')).toBe(true);
  });
});
