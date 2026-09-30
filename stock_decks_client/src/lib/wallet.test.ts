import { describe, it, expect, beforeEach } from 'vitest';
import { getEquity, sellCard } from './wallet';
import { saveCards, loadCards, loadBalance, saveBalance } from './storage';
import type { Card } from './definitions';

let n = 0;
const makeCard = (over: Partial<Card> = {}): Card => ({
  id: `c${n++}`, symbol: 'SYM', name: 'Name', sector: 'Technology',
  price: 10, description: '', imgurl: '', tags: [],
  dateAcquired: new Date().toISOString(), isNew: false, ...over,
});

beforeEach(() => { n = 0; localStorage.clear(); });

describe('getEquity', () => {
  it('is 0 for an empty deck', () => expect(getEquity([])).toBe(0));
  it('sums card prices', () =>
    expect(getEquity([makeCard({ price: 10 }), makeCard({ price: 20 })])).toBe(30));
  it('defaults to cards in storage', () => {
    saveCards([makeCard({ price: 15 })]);
    expect(getEquity()).toBe(15);
  });
});

describe('sellCard', () => {
  it('removes the card and credits its price to balance', () => {
    const c = makeCard({ price: 25 });
    saveCards([c]); saveBalance(100);
    sellCard(c.id);
    expect(loadCards()).toHaveLength(0);
    expect(loadBalance()).toBe(125);
  });
  it('is a no-op for an unknown id', () => {
    saveCards([makeCard({ price: 25 })]); saveBalance(100);
    sellCard('does-not-exist');
    expect(loadCards()).toHaveLength(1);
    expect(loadBalance()).toBe(100);
  });
});