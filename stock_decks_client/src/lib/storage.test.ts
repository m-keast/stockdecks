import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadCards, saveCards, addCard, removeCardById, updateStoredCard,
  loadBalance, adjustBalance, savePack, loadPacks,
} from './storage';
import type { Card } from './definitions';

let n = 0;
const makeCard = (over: Partial<Card> = {}): Card => ({
  id: `c${n++}`, symbol: 'SYM', name: 'Name', sector: 'Technology',
  price: 10, description: '', imgurl: '', tags: [],
  dateAcquired: new Date().toISOString(), isNew: false, ...over,
});

beforeEach(() => { n = 0; localStorage.clear(); });

describe('cards storage', () => {
  it('round-trips save/load', () => {
    const cards = [makeCard(), makeCard()];
    saveCards(cards);
    expect(loadCards()).toEqual(cards);
  });
  it('returns [] when empty', () => expect(loadCards()).toEqual([]));
  it('returns [] on corrupt JSON', () => {
    localStorage.setItem('userCards', '{not valid json');
    expect(loadCards()).toEqual([]);
  });
  it('addCard appends', () => {
    const a = makeCard(); saveCards([a]);
    const b = makeCard(); addCard(b);
    expect(loadCards().map((c) => c.id)).toEqual([a.id, b.id]);
  });
  it('removeCardById removes only the match', () => {
    const a = makeCard(), b = makeCard(); saveCards([a, b]);
    removeCardById(a.id);
    expect(loadCards().map((c) => c.id)).toEqual([b.id]);
  });
  it('updateStoredCard merges the update and leaves others', () => {
    const a = makeCard({ isNew: true }), b = makeCard({ isNew: true });
    saveCards([a, b]);
    updateStoredCard(a.id, { isNew: false });
    const [ra, rb] = loadCards();
    expect(ra.isNew).toBe(false);
    expect(rb.isNew).toBe(true);
  });
});

describe('balance', () => {
  it('defaults to 0', () => expect(loadBalance()).toBe(0));
  it('adjustBalance persists and returns the new value', () => {
    expect(adjustBalance(50)).toBe(50);
    expect(adjustBalance(-20)).toBe(30);
    expect(loadBalance()).toBe(30);
  });
});

describe('packs', () => {
  it('savePack returns an id and loadPacks includes it', () => {
    const id = savePack('basic', 3, 0.2, 0);
    const packs = loadPacks();
    expect(packs).toHaveLength(1);
    expect(packs[0].id).toBe(id);
    expect(packs[0].numCards).toBe(3);
  });
});