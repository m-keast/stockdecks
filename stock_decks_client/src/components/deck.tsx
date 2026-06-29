'use client';

import { useState } from 'react';
import { loadCards } from '../lib/storage';
import CardComponent from '../components/card';
import CardBack from '../components/cardBack'; // adjust path if needed
import { Card as CardType } from '../lib/definitions';
import { AnimatePresence } from 'framer-motion';
import { updateStoredCard } from '../lib/storage';

export default function Deck() {
  const cards = loadCards();
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  return (
    <div className="pt-5 deck-container relative z-10">
      <div id="card-container" className="flex justify-center flex-wrap gap-4">
        {cards.length === 0 ? (
          <p>No cards yet.</p>
        ) : (
          cards.map((card) => (
            <CardComponent
              key={card.id}
              card={card}
              onClick={() => setSelectedCard(card)}
              style={selectedCard?.id === card.id ? { visibility: 'hidden' } : undefined}
            />
          ))
        )}
      </div>
      <AnimatePresence>
        {selectedCard && (
          <CardBack
            key={selectedCard.id}
            card={selectedCard}
            onClose={() => {
              setSelectedCard(null);
              updateStoredCard(selectedCard.id, { isNew: false })
              console.log("closed cardback");
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}