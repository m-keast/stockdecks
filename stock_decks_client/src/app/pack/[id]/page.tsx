'use client';

import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
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
  const [expectedSpecials] = useState(() => loadPacks().find((p) => p.id === id)?.expectedSpecials ?? .10);
  const [specialsGuaranteed] = useState(() => loadPacks().find((p) => p.id === id)?.specialsGuaranteed ?? 0);
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

    // Remove from unopened
    const unopened: UnopenedPack[] = JSON.parse(localStorage.getItem('unopenedPacks') || '[]');
    const remainingUnopened = unopened.filter((p) => p.id !== id);
    localStorage.setItem('unopenedPacks', JSON.stringify(remainingUnopened));



    //Generate array to determine which indicies of newCards will contain special cards
    const specialPlan = new Array<boolean>(numCards).fill(false);

    const guaranteed = Math.min(specialsGuaranteed, numCards);
    const indices = Array.from({ length: numCards }, (_, i) => i);
    for (let i = 0; i < guaranteed; i++) {
      // Partial Fisher–Yates: pick `guaranteed` distinct random indices.
      const j = i + Math.floor(Math.random() * (numCards - i));
      [indices[i], indices[j]] = [indices[j], indices[i]];
      specialPlan[indices[i]] = true;
    }

    const remaining = numCards - guaranteed;
    const p = remaining > 0 ? Math.min(expectedSpecials / remaining, 1) : 0;
    for (let i = 0; i < numCards; i++) {
      if (!specialPlan[i] && Math.random() < p) specialPlan[i] = true;
    }

    // Get all the new cards and add to storage
    const newCards: Card[] = [];
    for (let i = 0; i < numCards; i++) {
      try {

        //Logic for generating cards according to specialsGuaranteed and expectedSpecials
        console.log(`Fetching card ${i + 1}`);
        const card = await getCard(specialPlan[i]); //gets random card 
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
      setCardsRemaining(next);

      if (next <= 0) {
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
            const isTop = position === 0;

            return (
              <motion.div
                key={card.id}
                className={`absolute left-1/2 top-1/2 w-[220px] h-[300px] -ml-[110px] -mt-[150px] ${isTop ? '' : 'pointer-events-none'}`}
                style={{ zIndex: cards.length - index }}
                initial={false}
                animate={{ x: offset, rotate: rotation }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                {isTop ? (
                  <TopCard card={card} onDismiss={() => handleSlide(index)} />
                ) : (
                  <CardComponent card={card} />
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// The top card in the stack: draggable to the left along an arc (derived from drag
// distance, not raw pointer position, so a click and a drag animate identically).
// Any release except returning ~back to the start commits to falling off screen.
function TopCard({ card, onDismiss }: { card: Card; onDismiss: () => void }) {
  // drag="x" mutates this value directly, so it must be passed as `x` itself below —
  // not wrapped in a derived useTransform — or the drag gesture silently controls a
  // disconnected value instead of this one, leaving the arc (and the release threshold
  // check, which reads this same value) frozen at 0.
  const dragX = useMotionValue(0);
  const y = useTransform(dragX, (v) => Math.min(Math.pow(Math.max(-v, 0) / 14, 1.6), 320));
  const rotate = useTransform(dragX, (v) => v * 0.12);
  const opacity = useTransform(dragX, (v) => (v < -500 ? Math.max(0, 1 - (-v - 500) / 250) : 1));
  const [isFalling, setIsFalling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const wasDragging = useRef(false);

  const fallOff = () => {
    if (isFalling) return;
    setIsFalling(true);
    const target = -(typeof window !== 'undefined' ? window.innerWidth : 800) - 300;
    animate(dragX, target, {
      type: 'tween',
      duration: 0.5,
      ease: 'easeIn',
      onComplete: onDismiss,
    });
  };

  const handleDragEnd = () => {
    if (isFalling) return;
    setIsHovered(false);
    console.log(`dragX value: ${dragX.get()}`)
    if (dragX.get() > -30) {
      animate(dragX, 0, { type: 'spring', stiffness: 400, damping: 30 });
    } else {
      fallOff();
    }
  };

  return (
    <motion.div
      className="w-full h-full cursor-grab active:cursor-grabbing"
      style={{ x: dragX, y, rotate, opacity }}
      drag={isFalling ? false : 'x'}
      dragConstraints={{ left: -400, right: 0 }}
      dragElastic={0.15}
      dragMomentum={false}
      onDragStart={() => { wasDragging.current = true; setIsHovered(true); }}
      onDragEnd={handleDragEnd}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{ scale: isHovered ? 1.05 : 1 }}
      onTap={() => {
        setIsHovered(false);
        if (wasDragging.current) {
          wasDragging.current = false;
          return;
        }
        fallOff();
        console.log("onTap triggered");
      }
      }
    >
      <CardComponent card={card} />
    </motion.div>
  );
}
