// src/lib/cards.ts
// Handles card creation and management


import { addCard } from './storage';
import { getPrice, getRandomStockData } from './stocks';


// Data structure for a card object
export type Card = {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  price: number;
  description: string;
  imgurl: string;
  dateAcquired: string;
};


// Creates and returns a new card with stock data
export async function getCard(): Promise<Card | null> {
  console.log('[getCard] called');
  try {
    const stock = await getRandomStockData();
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
      dateAcquired: new Date().toISOString(),
    };

    addCard(newCard);
    console.log('New card added:', newCard);

    return newCard;
  } catch (err) {
    console.error('Failed to get new stock card:', err);
    return null;
  }
}
