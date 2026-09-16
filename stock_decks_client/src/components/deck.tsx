'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useState, useMemo, useEffect, CSSProperties } from 'react';
import { loadCards } from '../lib/storage';
import CardComponent from '../components/card';
import CardBack from '../components/cardBack';
import { Card as CardType } from '../lib/definitions';
import { AnimatePresence, motion } from 'framer-motion';
import { updateStoredCard } from '../lib/storage';
import { useRouter } from 'next/navigation';

export type SortBy = 'price' | 'sector' | 'dateAcquired';

interface DeckProps {
  sortBy: SortBy;
  collapsed: boolean;
  onExpand: () => void;
  openCardId?: string | null;
  // Sell mode: when active, clicking a card adds it to the sell list (via
  // onToggleSell) instead of opening the card back. sellIds are the ids
  // currently selected, used to highlight them.
  sellMode?: boolean;
  sellIds?: string[];
  onToggleSell?: (card: CardType) => void;
}

const STACK_COUNT = 5;

// Full-deck collapsed stack (non-sector view).
const DECK_STACK_SPREAD = 10;        // base horizontal peek; sqrt(i) => later cards stick out less
const DECK_STACK_SPREAD_HOVER = 20;  // wider fan on hover

// Progressive overlap: each card's horizontal offset grows with sqrt(i), so the
// gap between successive cards shrinks the deeper you go into the stack.
function deckStackX(i: number, hovered: boolean) {
  const spread = hovered ? DECK_STACK_SPREAD_HOVER : DECK_STACK_SPREAD;
  return Math.max(spread * i-(i*i),0);
}

// Marks every stored card as seen. Loads from storage itself so callers
// (e.g. the toolbar button in page.tsx) don't need to hold the card array.
export function markAllAsSeen() {
  loadCards().forEach((card) => {
    if (card.isNew) updateStoredCard(card.id, { isNew: false });
  });
}

function SectorGroup({
  sector,
  cards,
  onCardClick,
  getCardStyle,
}: {
  sector: string;
  cards: CardType[];
  onCardClick: (card: CardType) => void;
  getCardStyle: (card: CardType) => CSSProperties | undefined;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [stackHovered, setStackHovered] = useState(false);
  const collapsedRef = useRef(collapsed);
  collapsedRef.current = collapsed;

  const handleCardClick = (card: CardType) => {
    if (collapsedRef.current) return;
    onCardClick(card);
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-2 mb-3 text-gray-700 font-semibold text-lg hover:text-black"
      >
        <span>{collapsed ? '▶' : '▼'}</span>
        <span>{sector}</span>
        <span className="text-sm font-normal text-gray-400">({cards.length})</span>
      </button>

      <AnimatePresence initial={false} mode="wait">
        {collapsed ? (
          <motion.div
            key="stack"
            className="flex flex-wrap gap-4 relative cursor-pointer"
            style={{ height: 292 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseEnter={() => setStackHovered(true)}
            onMouseLeave={() => setStackHovered(false)}
            onClick={(e) =>{
              e.stopPropagation();
              setStackHovered(false);
              setCollapsed(false);
            }}
          >
            {cards.slice(0, STACK_COUNT).map((card, i) => (
              <motion.div
                key={card.id}
                className="absolute pointer-events-none"
                style={{ transformOrigin: 'bottom center', zIndex: STACK_COUNT - i }}
                animate={{ x: deckStackX(i, stackHovered) }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              >
                <CardComponent
                  card={card}
                  onClick={() => handleCardClick(card)}
                  style={selectedCardId === card.id ? { visibility: 'hidden' } : undefined}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {cards.map((card) => (
              <motion.div key={card.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <CardComponent
                  card={card}
                  onClick={() => handleCardClick(card)}
                  style={selectedCardId === card.id ? { visibility: 'hidden' } : undefined}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Deck({ sortBy, collapsed, onExpand, openCardId, sellMode, sellIds, onToggleSell }: DeckProps) {
  const router = useRouter();
  // Re-reads storage on every render; referencing refreshKey ties fresh reads
  // to the parent bumping it after a storage mutation.
  void refreshKey;
  const rawCards = loadCards();
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [stackHovered, setStackHovered] = useState(false);

  // Mirror `collapsed` into a ref so the guard below sees the current value even
  // from a card element that's frozen mid-exit by AnimatePresence (those elements
  // keep the props/closures they had when collapsed was still false).
  const collapsedRef = useRef(collapsed);
  collapsedRef.current = collapsed;


  const openCard = (card: CardType) => {
    if (collapsedRef.current) return;
    setSelectedCard(card);
  };

  // In sell mode a click toggles the card in the sell list; otherwise it opens
  // the card back as usual.
  const handleCardClick = (card: CardType) => {
    if (sellMode) {
      onToggleSell?.(card);
      return;
    }
    setSelectedCard(card);
  };

  // Hide the card that's currently shown in the card back; highlight cards
  // picked for sale.
  const getCardStyle = (card: CardType): CSSProperties | undefined => {
    if (selectedCard?.id === card.id) return { visibility: 'hidden' };
    if (sellMode && sellIds?.includes(card.id)) {
      return { outline: '4px solid #22c55e', outlineOffset: 2, borderRadius: '0.75rem' };
    }
    return undefined;
  };

  useEffect(() => {
    if (openCardId && rawCards.length > 0) {
      const card = rawCards.find((c) => c.id === openCardId);
      if (card) {
        setSelectedCard(card);
        router.replace('/deck');
      }
    }
  }, [openCardId, rawCards.length]);

  const cards = useMemo(() => {
    return [...rawCards].sort((a, b) => {
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'dateAcquired') return new Date(b.dateAcquired).getTime() - new Date(a.dateAcquired).getTime();
      if (sortBy === 'sector') return a.sector.localeCompare(b.sector);
      return 0;
    });
  }, [rawCards, sortBy]);

  const handleClose = () => {
    if (!selectedCard) return;
    if (selectedCard.isNew) {
      updateStoredCard(selectedCard.id, { isNew: false });
      onCardSeen?.();
    }
    setSelectedCard(null);
  };

  const grouped = useMemo(() => {
    if (sortBy !== 'sector') return null;
    return cards.reduce((acc, card) => {
      (acc[card.sector] ??= []).push(card);
      return acc;
    }, {} as Record<string, CardType[]>);
  }, [cards, sortBy]);

  return (
    <div className="pt-5 pb-10 deck-container relative z-10">
      {grouped ? (
        <div className="px-4">
          {Object.entries(grouped).map(([sector, sectorCards]) => (
            <SectorGroup
              key={sector}
              sector={sector}
              cards={sectorCards}
              onCardClick={handleCardClick}
              getCardStyle={getCardStyle}
            />
          ))}
        </div>
      ) : (
        <AnimatePresence initial={false} mode="wait">
          {collapsed ? (
            <motion.div
              key="stack"
              className="relative mx-8 cursor-pointer"
              style={{ width: 320, height: 300 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onMouseEnter={() => setStackHovered(true)}
              onMouseLeave={() => setStackHovered(false)}
              onClick={(e) => {
                e.stopPropagation();
                onExpand();
                setStackHovered(false);
              }}
            >
              {cards.map((card, i) => (
                <motion.div
                  key={card.id}
                  className="absolute pointer-events-none"
                  style={{ transformOrigin: 'bottom center', zIndex: cards.length - i }}
                  animate={{ x: deckStackX(i, stackHovered) }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                >
                  <CardComponent
                    card={card}
                    onClick={() => handleCardClick(card)}
                    style={getCardStyle(card)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              className="flex justify-left w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-wrap gap-4 px-8">
                {cards.map((card) => (
                  <motion.div
                    key={card.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CardComponent
                      card={card}
                      onClick={() => openCard(card)}
                      style={selectedCard?.id === card.id ? { visibility: 'hidden' } : undefined}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <AnimatePresence >
        {selectedCard && (
          <CardBack key={selectedCard.id} card={selectedCard} onClose={handleClose} />
        )}
      </AnimatePresence>
    </div>
  );
}