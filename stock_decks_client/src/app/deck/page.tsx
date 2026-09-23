'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { SortBy } from '../../components/deck';
import { useSearchParams } from 'next/navigation';
import Pack from '../../components/packs';
import SellPanel from '../../components/sellPanel';
import { markAllAsSeen } from '../../components/deck';
import { getEquity, sellCard } from '../../lib/wallet';
import { loadBalance, loadCards } from '../../lib/storage';
import { Card } from '../../lib/definitions';

const Deck = dynamic(() => import('../../components/deck'), { ssr: false });

function MyDeckContent() {
  const [sortBy, setSortBy] = useState<SortBy>('dateAcquired');
  const [collapsed, setCollapsed] = useState(false);
  const [sellOpen, setSellOpen] = useState(false);
  const [sellCards, setSellCards] = useState<Card[]>([]);
  const searchParams = useSearchParams();
  const openCardId = searchParams.get('openCard');
  const totalEquity = Math.round((getEquity() + Number.EPSILON) * 100) / 100;
  const balance = Math.round((loadBalance() + Number.EPSILON) * 100) / 100;

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
    setRefreshKey((k) => k + 1);
  };

  // Bumped after any change to cards' seen state; drives the Deck refresh
  // and re-derives hasNewCards below.
  const [refreshKey, setRefreshKey] = useState(0);
  const [hasNewCards, setHasNewCards] = useState(false);

  // loadCards() reads localStorage, so keep it client-only (starts false on the
  // server) to avoid a hydration mismatch. Re-runs whenever refreshKey changes.
  useEffect(() => {
    setHasNewCards(loadCards().some((card) => card.isNew));
  }, [refreshKey]);

  const handleMarkAllAsSeen = () => {
    markAllAsSeen();
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className={`transition-[margin] duration-300 ease-out ${sellOpen ? 'mr-[340px]' : 'mr-0'}`}>
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
          {hasNewCards && (
            <button
              onClick={handleMarkAllAsSeen}
              className="text-sm px-3 py-1.5 border rounded hover:bg-gray-100"
            >
              Mark all as seen
            </button>
          )}
        </div>
        <div className="flex items-center gap-4">
          {/* <> ELEMENTS FOR TOTAL EQUITY BALANCE AND SELL BUTTON */}
          <div className="font-bold">Total Equity: ${totalEquity}</div>
          <div className="font-bold">Balance: ${balance}</div>
          {!sellOpen && (
            <button
              onClick={() => setSellOpen(true)}
              className="text-sm px-3 py-1.5 border rounded hover:bg-gray-100 cursor-pointer"
            >
              Sell Cards
            </button>
          )}
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
        onSellCard={(card: Card) => {
          setSellOpen(true);
          toggleSellCard(card);
        }}
        refreshKey={refreshKey}
        onCardSeen={() => setRefreshKey((k) => k + 1)}
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

