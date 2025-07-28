// components/Deck.tsx
'use client';

import { useEffect, useState } from 'react';
import { loadCards } from '../lib/storage';
import { getSectorColor } from '../lib/cardstyle'; // Adjust paths as needed
import { getCard } from '../lib/cards';

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

  useEffect(() => {
    const loaded = loadCards();
    setCards(loaded);
  }, []);

  const handleNewCard = async () => {
    try {
      await getCard(); // You may want this to return a card to push directly
      const updated = loadCards();
      setCards(updated);
    } catch (error) {
      console.error('Failed to get new stock card:', error);
    }
  };

  return (
    <div className="deck-container">
      <button onClick={handleNewCard}>Click to generate new card</button>

      <h2>Your Cards</h2>
      <div id="card-container">
        {cards.length === 0 ? (
          <p>No cards yet.</p>
        ) : (
          cards.map((card, index) => {
            const [borderColor, backgroundColor] = getSectorColor(card.sector) || ['#000', '#f0f0f0'];

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
                <img src={card.imgurl} alt="Image" className="card-image" />
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
