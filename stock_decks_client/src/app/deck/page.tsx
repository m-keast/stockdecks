'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { SortBy } from '../../components/deck';
import { useSearchParams } from 'next/navigation';
import Pack from '../../components/packs';
import { markAllAsSeen } from '../../components/deck';
import { loadCards } from '../../lib/storage';

const Deck = dynamic(() => import('../../components/deck'), { ssr: false });

function MyDeckContent() {
  const [sortBy, setSortBy] = useState<SortBy>('dateAcquired');
  const [collapsed, setCollapsed] = useState(false);
  const searchParams = useSearchParams();
  const openCardId = searchParams.get('openCard');

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
    <div>
      <h1 className="text-5xl font-bold mb-4 pt-8">My Deck</h1>

      <div className="mt-8">
        <Pack></Pack>
      </div>
      <div className="flex items-center gap-4 px-8 pt-4">
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

      <Deck
        sortBy={sortBy}
        collapsed={collapsed}
        onExpand={() => setCollapsed(false)}
        openCardId={openCardId}
        refreshKey={refreshKey}
        onCardSeen={() => setRefreshKey((k) => k + 1)}
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

