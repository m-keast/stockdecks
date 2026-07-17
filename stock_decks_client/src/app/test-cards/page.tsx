//Testing page test-cards. Remove along with readCsv -> readAllTaggedStocks function and api/test


'use client';
import { useEffect, useState } from 'react';
import CardComponent from '../../components/card';
import type { Card } from '../../lib/definitions';
import type { StockRecord } from '../../lib/readCsv';

export default function TestCardsPage() {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    fetch('/api/test/all-tagged')
      .then((r) => r.json())
      .then((data) => {
        setCards(
          (data.stocks as StockRecord[]).map((s) => ({
            id: s.symbol,           // stable & unique → good React key
            symbol: s.symbol,
            name: s.stockname,
            sector: s.sector,
            price: 0,               // stubbed — skip getPrice for the test
            description: s.description,
            imgurl: s.imgurl,
            tags: s.tags,
            dateAcquired: new Date().toISOString(),
            isNew: false,
          }))
        );
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-white text-xl font-bold mb-4">All SP cards ({cards.length})</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {cards.map((card) => (
          <CardComponent key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}