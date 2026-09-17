'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Card } from '../lib/definitions';

interface SellPanelProps {
  open: boolean;
  cards: Card[];                  // cards the user has selected to sell
  onRemove: (id: string) => void; // remove a single card from the list
  onClose: () => void;            // close the panel (and clear selection)
  onConfirm: () => void;          // commit the sale
}

// Side panel that slides in from the right. While it's open the deck is in
// "sell mode": clicking a card in the deck adds it to `cards` here.
export default function SellPanel({ open, cards, onRemove, onClose, onConfirm }: SellPanelProps) {
  const total = cards.reduce((sum, c) => sum + c.price, 0);

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          key="sell-panel"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-16 bottom-0 right-0 h-screen-16
           w-[340px] bg-white shadow-2xl z-50 flex flex-col border-l border-gray-200"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h2 className="text-lg font-bold">Sell Cards</h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="text-gray-500 hover:text-black text-lg leading-none cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cards.length === 0 ? (
              <p className="text-sm text-gray-500">
                Click cards in your deck to add them here.
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {cards.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center justify-between border border-gray-200 rounded px-3 py-2"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold">{c.symbol}</span>
                      <span className="text-sm text-gray-500">${c.price.toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => onRemove(c.id)}
                      className="text-xs text-gray-400 hover:text-red-500 cursor-pointer"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between mb-3 font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={onConfirm}
              disabled={cards.length === 0}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Sell {cards.length} {cards.length === 1 ? 'card' : 'cards'} for ${total.toFixed(2)}
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
