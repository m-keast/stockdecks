// Page for opening a pack of cards

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getCard, Card } from '../../../lib/cards'; // Use the shared Card type
import { loadCards, saveCards } from '../../../lib/storage';

export default function PackOpenPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>([]);
  const [packOpened, setPackOpened] = useState(false);
  const [flipped, setFlipped] = useState<boolean[]>([]);

type UnopenedPack = {
  id: string;
  timestamp: number;
};

const openPack = async () => {
  const newCards: Card[] = [];

  for (let i = 0; i < 5; i++) {
    try {
      const card = await getCard();

      if (!card) {
        console.warn('getCard() returned null, retrying...');
        i--;
        continue;
      }

      newCards.push({
        ...card,
        id: crypto.randomUUID(),
        dateAcquired: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to generate card:', error);
      i--;
    }
  }

  setCards(newCards);
  setFlipped(new Array(newCards.length).fill(false));
  setPackOpened(true);

  // Remove this pack from unopened packs
  const unopened: UnopenedPack[] = JSON.parse(
    localStorage.getItem('unopenedPacks') || '[]'
  );
  const updated = unopened.filter((p) => p.id !== id);
  localStorage.setItem('unopenedPacks', JSON.stringify(updated));
};

  const flipCard = (index: number) => {
    const updated = [...flipped];
    updated[index] = !updated[index];
    setFlipped(updated);

    if (updated.every((f) => f)) {
      const existing = loadCards();
      saveCards([...existing, ...cards]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      {!packOpened ? (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-yellow-500 text-black p-8 rounded-lg shadow-lg cursor-pointer"
          onClick={openPack}
        >
          <h1 className="text-3xl font-bold">Click to Open {id} Pack</h1>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex gap-4 flex-wrap justify-center mt-8"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="w-40 h-60 bg-blue-600 rounded-lg shadow-lg cursor-pointer perspective"
              onClick={() => flipCard(index)}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: flipped[index] ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Card front */}
              <div
                className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white text-xl"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
              >
                ?
              </div>

              {/* Card back */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center bg-white text-black p-2 rounded-lg"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <img src={card.imgurl} alt={card.symbol} className="w-16 h-16 mb-2" />
                <p className="font-bold">{card.symbol}</p>
                <p className="text-sm">{card.name}</p>
                <p className="text-xs text-gray-600">{card.sector}</p>
                <p className="text-green-600 font-semibold">${card.price.toFixed(2)}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
