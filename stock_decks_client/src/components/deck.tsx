// Deck Component

'use client';

import { useEffect, useState } from 'react';
import { loadCards } from '../lib/storage';
import { Card } from '../lib/cards';
import CardComponent from '../components/card';

export default function Deck() {
  const [cards, setCards] = useState<Card[]>([]); // <-- Use the imported type

  const refreshCards = (): void => {
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

  return (
    <div className="deck-container">
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
