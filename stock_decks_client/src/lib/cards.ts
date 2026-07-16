// src/lib/cards.ts
// Handles card creation and management


import { addCard } from './storage';
import { getPrice, getRandomStockData } from './stocks';
import type { Card } from '../lib/definitions';
import { removeCardById } from './storage'


// Creates and returns a new card with stock data
export async function getCard(special: boolean): Promise<Card | null> {
  try {
    const stock = await getRandomStockData(special);
    if (!stock) return null;

    const price = await getPrice(stock.symbol);

    const newCard: Card = {
      id: crypto.randomUUID(),
      symbol: stock.symbol,
      name: stock.stockname,
      sector: stock.sector,
      price: parseFloat(price),
      description: stock.description,
      imgurl: stock.imgurl,
      tags: stock.tags,
      dateAcquired: new Date().toISOString(),
      isNew: true,
    };

    addCard(newCard);

    return newCard;
  } catch (err) {
    console.error('Failed to get new stock card:', err);
    return null;
  }
}
