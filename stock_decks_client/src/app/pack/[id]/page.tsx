'use client';

import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getCard} from '../../../lib/cards';
import type { Card } from '../../../lib/definitions';
import CardComponent from '../../../components/card';
import type { UnopenedPack } from '../../../components/packs';
import { useRouter } from 'next/navigation';
import { PackVisual } from '../../../components/packs';
import { loadPacks } from '../../../lib/storage';

export default function PackOpenPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  // Captured once on mount, since openPack removes this pack from storage
  // as soon as it starts, which would otherwise make this fall back to 'basic' mid-open.
  const [packType] = useState(() => loadPacks().find((p) => p.id === id)?.packType ?? 'basic');
  const [numCards] = useState(() => loadPacks().find((p) => p.id === id)?.numCards ?? 3);
  const [cardsRemaining, setCardsRemaining] = useState(numCards);
  const [cards, setCards] = useState<Card[]>([]);
  const [packOpened, setPackOpened] = useState(false);
  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [isOpening, setIsOpening] = useState(false);
  const isOpeningRef = useRef(false);

  const openPack = async () => {
    if (isOpeningRef.current) return;
    isOpeningRef.current = true;
    setIsOpening(true);

    const newCards: Card[] = [];

    // Remove from unopened
    const unopened: UnopenedPack[] = JSON.parse(localStorage.getItem('unopenedPacks') || '[]');
    const remainingUnopened = unopened.filter((p) => p.id !== id);
    localStorage.setItem('unopenedPacks', JSON.stringify(remainingUnopened));


    // Get all the new cards and add to storage
    for (let i = 0; i < numCards; i++) {
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

    setCards(newCards);
    setFlipped(new Array(newCards.length).fill(false));
    setPackOpened(true);
  };

  const handleSlide = (index: number) => {
    const updated = [...flipped];
    if (!updated[index]) {
      updated[index] = true;
      setFlipped(updated);

      const next = cardsRemaining - 1;
      console.log(`Card flipped. Remaining: ${next}`);
      setCardsRemaining(next);

      if (next <= 0) {
        console.log('All cards revealed');
        router.push(`/deck`); // Go to deck page
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      {!packOpened ? (
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`relative w-64 aspect-square group transition-transform ${isOpening ? 'pointer-events-none opacity-75' : 'cursor-pointer hover:scale-105'}`}
            onClick={openPack}
          >
            <PackVisual packType={packType} />
          </motion.div>
          <h1 className="text-xl font-semibold">{isOpening ? 'Opening...' : 'Click to Open'}</h1>
        </div>
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
                  //className="w-full h-full"
                  //isNew={true}
                />
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
