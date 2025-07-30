'use client';

import { useState } from 'react';
import { loadCards } from '../lib/storage';
import CardComponent from '../components/card';
import CardBack from '../components/cardBack'; // adjust path if needed
import { Card as CardType } from '../lib/definitions';

export default function Deck() {
  const cards = loadCards();
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  return (
    <div className="deck-container relative">
      <div id="card-container" className="flex flex-wrap gap-4">
        {cards.length === 0 ? (
          <p>No cards yet.</p>
        ) : (
          cards.map((card) => (
            <CardComponent
              key={card.id}
              card={card}
              onClick={() => setSelectedCard(card)}
            />
          ))
        )}
      </div>

      {selectedCard && (
        <CardBack
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
}