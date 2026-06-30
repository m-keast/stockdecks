'use client';

import { useState } from 'react';
import Deck, { SortBy } from '../../components/deck';

export default function MyDeckPage() {
  const [sortBy, setSortBy] = useState<SortBy>('dateAcquired');
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <h1 className="text-5xl font-bold mb-4 pt-8">My Deck</h1>
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

      <Deck sortBy={sortBy} collapsed={collapsed} onExpand={() => setCollapsed(false)}/>
    </div>
  );
}