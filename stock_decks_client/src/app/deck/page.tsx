'use client';

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { SortBy } from '../../components/deck';
import { useSearchParams } from 'next/navigation';
import Pack from '../../components/packs';

const Deck = dynamic(() => import('../../components/deck'), { ssr: false });

function MyDeckContent() {
  const [sortBy, setSortBy] = useState<SortBy>('dateAcquired');
  const [collapsed, setCollapsed] = useState(false);
  const searchParams = useSearchParams();
  const openCardId = searchParams.get('openCard');

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
      </div>

      <Deck sortBy={sortBy} collapsed={collapsed} onExpand={() => setCollapsed(false)} openCardId={openCardId} />
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
