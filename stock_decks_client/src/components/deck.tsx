// components/Deck.tsx
'use client';

import { useEffect, useState } from 'react';
import { loadCards } from '../lib/storage';
import { getSectorColor } from '../lib/cardstyle';
import { getCard } from '../lib/cards';
import Image from 'next/image';

type Card = {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  imgurl: string;
  description: string;
};

export default function Deck() {
  const [cards, setCards] = useState<Card[]>([]);

  // Function to refresh cards from localStorage
  const refreshCards = () => {
    const loaded = loadCards();
    setCards(loaded);
  };

  // Load cards on mount + set up auto-refresh
  useEffect(() => {
    refreshCards();

    // Refresh periodically (every 2 seconds)
    const interval = setInterval(refreshCards, 2000);

    // Update when localStorage changes (other tabs, etc.)
    const handleStorageChange = () => refreshCards();
    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Button to generate a new card and refresh instantly
  const handleNewCard = async () => {
    try {
      await getCard(); // Assumes this adds a card to localStorage
      refreshCards();  // Immediately refresh deck after adding
    } catch (error) {
      console.error('Failed to get new stock card:', error);
    }
  };

  return (
    <div className="deck-container">
      <button onClick={handleNewCard}>Click to generate new card</button>

      <h2>Your Cards</h2>
      <div id="card-container" className="card-grid">
        {cards.length === 0 ? (
          <p>No cards yet.</p>
        ) : (
          cards.map((card, index) => {
            const [borderColor, backgroundColor] =
              getSectorColor(card.sector) || ['#000', '#f0f0f0'];

            return (
              <div
                key={index}
                className="card"
                style={{ borderColor, backgroundColor }}
              >
                <div className="card-header">
                  <span className="abbr">{card.symbol}</span>
                  <span className="top-number">1</span>
                </div>

                {/* Next.js Image requires width/height */}
                <Image
                  src={card.imgurl}
                  alt={card.symbol}
                  className="card-image"
                  width={120}
                  height={120}
                />

                <div className="card-info">
                  <span className="sector">{card.sector}</span>
                  <span className="info-number">${card.price.toFixed(2)}</span>
                </div>

                <span className="title">{card.name}</span>
                <p className="description">{card.description}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
