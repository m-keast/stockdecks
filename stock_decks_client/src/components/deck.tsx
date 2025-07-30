// Deck Component

'use client';

import { loadCards } from '../lib/storage';
import CardComponent from '../components/card';

export default function Deck() {

  const cards = loadCards();

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
