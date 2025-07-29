// Deck Component

'use client';

import { useEffect, useState } from 'react';
import { loadCards } from '../lib/storage';
import { getCard, Card } from '../lib/cards';
import CardComponent from '../components/card';

export default function Deck() {
  const [cards, setCards] = useState<Card[]>([]); // <-- Use the imported type

  const refreshCards = () => {
    const loaded = loadCards();
    setCards(loaded);
  };

  useEffect(() => {
    refreshCards();

    const interval = setInterval(refreshCards, 2000);
    const handleStorageChange = () => refreshCards();

    window.addEventListener('storage', handleStorageChange);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleNewCard = async () => {
    try {
      await getCard(); // Adds card to localStorage
      refreshCards();
    } catch (error) {
      console.error('Failed to get new stock card:', error);
    }
  };

  return (
    <div className="deck-container">
      <button
        onClick={handleNewCard}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Click to generate new card
      </button>

      <h2 className="text-2xl font-bold mb-4">Your Cards</h2>
      <div id="card-container" className="flex flex-wrap gap-4">
        {cards.length === 0 ? (
          <p>No cards yet.</p>
        ) : (
          cards.map((card) => (
            <CardComponent key={card.id} card={card} />
          ))
        )}
      </div>
    </div>
  );
}
