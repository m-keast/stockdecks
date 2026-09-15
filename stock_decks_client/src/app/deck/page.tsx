'use client';

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { SortBy } from '../../components/deck';
import { useSearchParams } from 'next/navigation';
import Pack from '../../components/packs';
import SellPanel from '../../components/sellPanel';
import { getEquity, sellCard } from '../../lib/wallet';
import { loadBalance } from '../../lib/storage';
import { Card } from '../../lib/definitions';

const Deck = dynamic(() => import('../../components/deck'), { ssr: false });

function MyDeckContent() {
  const [sortBy, setSortBy] = useState<SortBy>('dateAcquired');
  const [collapsed, setCollapsed] = useState(false);
  const [sellOpen, setSellOpen] = useState(false);
  const [sellCards, setSellCards] = useState<Card[]>([]);
  const searchParams = useSearchParams();
  const openCardId = searchParams.get('openCard');
  const totalEquity = getEquity();
  const balance = loadBalance();

  // Toggle a card in/out of the sell list (clicking a deck card while the
  // panel is open).
  const toggleSellCard = (card: Card) => {
    setSellCards((prev) =>
      prev.some((c) => c.id === card.id)
        ? prev.filter((c) => c.id !== card.id)
        : [...prev, card]
    );
  };

  const closeSell = () => {
    setSellOpen(false);
    setSellCards([]);
  };

  const confirmSale = () => {
    sellCards.forEach((c) => sellCard(c.id));
    // Clearing the list + closing the panel re-renders this component, so
    // getEquity()/loadBalance() above recompute and the Deck re-reads storage.
    setSellCards([]);
    setSellOpen(false);
  };

  return (
    <div>
      <h1 className="text-5xl font-bold mb-4 pt-8">My Deck</h1>

      <div className="mt-8">
        <Pack></Pack>
      </div>
      <div className="flex items-center justify-between gap-4 px-8 pt-4">
        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="border rounded px-3 py-1.5 text-sm"
          >
            <option value="dateAcquired">Date Acquired</option>
            <option value="price">Price</option>
            <option value="sector">Sector</option>
          </select>

          {sortBy !== 'sector' && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-sm px-3 py-1.5 border rounded hover:bg-gray-100"
            >
              {collapsed ? 'Expand' : 'Collapse'}
            </button>
          )}
        </div>
        <div className="flex items-center gap-4 pr-30">
          {/* <> ELEMENTS FOR TOTAL EQUITY BALANCE AND SELL BUTTON */}
          <div className="font-bold">Total Equity: ${totalEquity}</div>
          <div className="font-bold">Balance: ${balance}</div>
          <button
            onClick={() => setSellOpen(true)}
            className="text-sm px-3 py-1.5 border rounded hover:bg-gray-100 cursor-pointer"
          >
            Sell Cards
          </button>
        </div>


      </div>

      <Deck
        sortBy={sortBy}
        collapsed={collapsed}
        onExpand={() => setCollapsed(false)}
        openCardId={openCardId}
        sellMode={sellOpen}
        sellIds={sellCards.map((c) => c.id)}
        onToggleSell={toggleSellCard}
      />

      <SellPanel
        open={sellOpen}
        cards={sellCards}
        onRemove={(id) => setSellCards((prev) => prev.filter((c) => c.id !== id))}
        onClose={closeSell}
        onConfirm={confirmSale}
      />
    </div>
  );
}

export default function MyDeckPage() {
  return (
    <Suspense>
      <MyDeckContent />
    </Suspense>
  );
}
