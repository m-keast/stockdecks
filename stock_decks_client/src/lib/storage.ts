// src/lib/storage.ts
//Handles loading and saving cards to localStorage

import { Card } from './cards';

const STORAGE_KEY = 'userCards';

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
