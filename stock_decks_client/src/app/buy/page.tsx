// Page for buying packs of cards
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pack } from '../../components/packs';
import { savePack } from '@/lib/storage';

// Example pack data (can later be loaded from API)
const PACKS = [
  {
    id: 'basic',
    name: 'Basic Pack',
    packType: 'basic',
    price: 5,
    numCards: 3,
    description: '3 random common stock cards. Great for beginners.',
    details: 'Contains 3 random stock cards from various sectors. No rares guaranteed.'
  },
  {
    id: 'epic',
    name: 'Epic Pack',
    packType: 'epic',
    price: 15,
    numCards: 5,
    description: '5 random stock cards. 1 rare guaranteed.',
    details: 'Contains 5 cards with at least 1 rare (high-volume stock) guaranteed.'
  },
  {
    id: 'legendary',
    name: 'Legendary Pack',
    packType: 'legendary',
    numCards: 7,
    price: 50,
    description: '10 cards, high chance of rare stocks!',
    details: 'Contains 10 cards with 3 guaranteed rares, and a chance for a special edition card.'
  }
];

export default function BuyPage() {
  const [selectedPack, setSelectedPack] = useState<typeof PACKS[0] | null>(null);
  const router = useRouter();

  const handlePurchase = (packType: string, numCards: number) => {
    // Store the pack as "unopened" in localStorage
    const newId = savePack(packType, numCards);
    // Redirect to the pack opening page
    router.push(`/pack/${newId}`);
  };

  return (
    <div className="buy-page p-6">
      <h1 className="text-2xl font-bold mb-4">Buy Packs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PACKS.map((pack) => (
          <div
            key={pack.id}
            className="p-4 border rounded-lg shadow cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedPack(pack)}
          >
            <h2 className="text-lg font-semibold">{pack.name}</h2>
            <div className="m-4 flex justify-center pointer-events-none">
              <Pack id={pack.id} timestamp={0} packType={pack.packType} numCards={pack.numCards}/>
            </div>
            <p className="font-semibold text-gray-700">${pack.price}</p>
            <p className="text-sm text-gray-500">{pack.description}</p>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedPack && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-2">{selectedPack.name}</h2>
            <div className='pointer-events-none flex justify-center m-4'>
              <Pack id={selectedPack.id} timestamp={0} packType={selectedPack.packType} numCards={selectedPack.numCards} />
            </div>
            <p className="mb-4">{selectedPack.details}</p>
            <p className="mb-4 font-semibold">Price: ${selectedPack.price}</p>
            <div className="flex justify-between">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setSelectedPack(null)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handlePurchase(selectedPack.packType, selectedPack.numCards)}
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}