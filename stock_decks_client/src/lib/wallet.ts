import { Card } from './definitions';
import { adjustBalance, loadCards, removeCardById } from './storage';

export function getEquity(cards: Card[] = loadCards()): number {
  return cards.reduce((sum, c) => sum + c.price, 0);
}

export function sellCard(cardId: string): void {
  const card = loadCards().find((c) => c.id === cardId);
  if (!card) return;
  removeCardById(cardId);      // equity drops automatically (it's derived)
  adjustBalance(card.price);   // cash goes up
}