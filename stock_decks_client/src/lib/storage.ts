// src/lib/storage.ts
//Handles loading and saving cards and packs to localStorage

import { UnopenedPack } from '@/components/packs';
import { Card } from '../lib/definitions';

const STORAGE_KEY = 'userCards';
const PACKS_KEY = 'unopenedPacks';
const BALANCE_KEY = 'userBalance';

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

//Removes card from localStorage by ID
export function removeCardById(targetId: string): void{
  try{
    //Get raw userCards data from storage
    const rawData = localStorage.getItem('userCards');
    if (!rawData) return; // Exit if the key doesn't exist

    const cards:Card[] = JSON.parse(rawData);

    const updatedCards = cards.filter((card) => card.id !== targetId);
    saveCards(updatedCards);
    
  } catch (error) {
    console.error("Error updating localStorage data (removing card by id)", error);
  }
}


//Updates fields on stored cards
export function updateStoredCard(
  cardId: string,
  updates: Partial<Card>
): void {
  const rawData = localStorage.getItem('userCards');
  if (!rawData) return;

  try {
    const cards: Card[] = JSON.parse(rawData);
    // Map through the array to find and update the target card
    const updatedCards = cards.map((card) => {
      if (card.id === cardId) {
        return { ...card, ...updates }; // Keep existing fields, overwrite updated fields
      }
      return card; // Keep other cards exactly as they are
    });

    localStorage.setItem('userCards', JSON.stringify(updatedCards));
  } catch (error) {
    console.error("Error updating Card array in localStorage:", error);
  }
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

//Saves pack to localStorage, returns the generated unique id for the stored pack
export function savePack(packType: string, numCards: number, expectedSpecials: number, specialsGuaranteed: number): string {
  const unopened = JSON.parse(localStorage.getItem('unopenedPacks') || '[]');
  const id = crypto.randomUUID();
  unopened.push({ id, timestamp: Date.now(), packType, numCards, expectedSpecials, specialsGuaranteed });
  localStorage.setItem('unopenedPacks', JSON.stringify(unopened));
  return id;
}

export function loadBalance(): number {
  if (typeof window === 'undefined') return 0;
  const raw = localStorage.getItem(BALANCE_KEY);
  return raw !== null ? Number(raw) : 0;
}

export function saveBalance(b: number): void{
  if (typeof window === 'undefined') return;
  localStorage.setItem(BALANCE_KEY, String(b));
}

export function adjustBalance(delta: number): number {
  const newBalance = loadBalance() + delta;
  saveBalance(newBalance);
  return newBalance;
}