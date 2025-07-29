'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getCard, Card } from '../../../lib/cards';
import CardComponent from '../../../components/card'; // adjust path if needed

export default function PackOpenPage() {
  const { id } = useParams<{ id: string }>();
  const [cards, setCards] = useState<Card[]>([]);
  const [packOpened, setPackOpened] = useState(false);
  const [flipped, setFlipped] = useState<boolean[]>([]);

  type UnopenedPack = {
    id: string;
    timestamp: number;
  };

  const openPack = async () => {

    const openedPacks = JSON.parse(localStorage.getItem('openedPacks') || '[]');
    const newCards: Card[] = [];

    for (let i = 0; i < 5; i++) {
      try {
        console.log(`Fetching card ${i + 1}`);
        const card = await getCard();
        if (!card) {
          i--;
          continue;
        }

        const fullCard = {
          ...card,
          id: crypto.randomUUID(),
          dateAcquired: new Date().toISOString(),
        };

        newCards.push(fullCard);
        console.log('New card added:', fullCard);
      } catch (error) {
        console.error('getCard error:', error);
        i--;
      }
    }

    // Mark pack as opened
    localStorage.setItem('openedPacks', JSON.stringify([...openedPacks, id]));

    // Remove from unopened
    const unopened: UnopenedPack[] = JSON.parse(localStorage.getItem('unopenedPacks') || '[]');
    const remainingUnopened = unopened.filter((p) => p.id !== id);
    localStorage.setItem('unopenedPacks', JSON.stringify(remainingUnopened));

    setCards(newCards);
    setFlipped(new Array(newCards.length).fill(false));
    setPackOpened(true);
  };

  const handleSlide = (index: number) => {
    const updated = [...flipped];
    updated[index] = true;
    setFlipped(updated);
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
        <div className="relative w-[260px] h-[320px] mt-8">
          {cards.map((card, index) => {
            const revealedCount = flipped.filter(Boolean).length;
            const remaining = cards.length - revealedCount;
            const position = index - revealedCount;

            if (flipped[index]) return null;

            const offset = position * 12 - ((remaining - 1) * 12) / 2;
            const rotation = position * 2;

            return (
              <motion.div
                key={card.id}
                className="absolute left-1/2 top-1/2 w-[220px] h-[300px] origin-center"
                style={{ zIndex: cards.length - index }}
                initial={false}
                animate={{
                  x: '-50%',
                  y: '-50%',
                  rotateZ: rotation,
                  translateX: offset,
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                onClick={() => handleSlide(index)}
              >
                <CardComponent
                  card={card}
                  className="w-full h-full"
                  showDescription={false}
                  isNew={true}
                />
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
