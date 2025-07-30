// src/lib/storage.ts
//Handles loading and saving cards and packs to localStorage

import { UnopenedPack } from '@/components/packs';
import { Card } from '../lib/definitions';

const STORAGE_KEY = 'userCards';
const PACKS_KEY = 'unopenedPacks';

//Loads cards from localStorage
export function loadCards(): Card[] {
  if (typeof window === 'undefined') return []; // SSR safety
  const stored = localStorage.getItem(STORAGE_KEY);
  try {
    return stored ? (JSON.parse(stored) as Card[]) : [];
  } catch (err) {
    console.error('Error parsing cards from storage:', err);
    return [];
  }
}

//Saves cards to localStorage
export function saveCards(cards: Card[]): void {
  console.log('[saveCards] saving', cards.length, 'cards');
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch (err) {
    console.error('Failed to save cards to storage:', err);
  }
}

//Adds a card parameter to localStorage
export function addCard(card: Card): void {
  const cards = loadCards();
  cards.push(card);
  saveCards(cards);
}

//Load packs from localStorage
export function loadPacks(): UnopenedPack[] {
  if (typeof window === 'undefined') return []; // SSR safety
  const stored = localStorage.getItem(PACKS_KEY);
  try {
    return stored ? (JSON.parse(stored) as UnopenedPack[]) : [];
  } catch (err) {
    console.error('Error parsing cards from storage:', err);
    return [];
  }

}

//Saves pack to localStorage
export function savePack(packid: string): void {
  const unopened = JSON.parse(localStorage.getItem('unopenedPacks') || '[]');
  unopened.push({ id: packid, timestamp: Date.now() });
  localStorage.setItem('unopenedPacks', JSON.stringify(unopened));
}