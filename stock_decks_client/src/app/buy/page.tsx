// Page for buying packs of cards
'use client';

import { useRef, useState } from 'react';
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
    description: '3 random stock cards.',
    details: 'Contains 3 random stock cards from various sectors. No rares guaranteed.',
    expectedSpecials: .2,
    specialsGuaranteed: 0
  },
  {
    id: 'epic',
    name: 'Epic Pack',
    packType: 'epic',
    price: 15,
    numCards: 5,
    description: '5 random stock cards.',
    details: 'Contains 5 cards with a 50% chance of a rare S&P stock.',
    expectedSpecials: .5,
    specialsGuaranteed: 0
  },
  {
    id: 'legendary',
    name: 'Legendary Pack',
    packType: 'legendary',
    numCards: 7,
    price: 50,
    description: '7 cards, high chance of rare stocks!',
    details: 'Contains 7 cards with a guaranteed rare, and a high chance of additional rares.',
    expectedSpecials: 1,
    specialsGuaranteed: 1
  }
];

export default function BuyPage() {
  const [selectedPack, setSelectedPack] = useState<typeof PACKS[0] | null>(null);
  const router = useRouter();
  const isOpeningRef = useRef(false);

  const handlePurchase = (packType: string, numCards: number, expectedSpecials: number, specialsGuaranteed: number) => {
    // Store the pack as "unopened" in localStorage
    console.log("Trying to purchase")
    if (isOpeningRef.current){
      console.log("blocked purchase due to duplicate request")
      return;
    }
    isOpeningRef.current = true;

    const newId = savePack(packType, numCards, expectedSpecials, specialsGuaranteed);
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
              <Pack id={pack.id} timestamp={0} packType={pack.packType} numCards={pack.numCards}
              expectedSpecials={pack.expectedSpecials} specialsGuaranteed={pack.specialsGuaranteed}/>
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
              <Pack id={selectedPack.id} timestamp={0} packType={selectedPack.packType} numCards={selectedPack.numCards}
              specialsGuaranteed={selectedPack.specialsGuaranteed} expectedSpecials={selectedPack.expectedSpecials}/>
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
                onClick={() => handlePurchase(selectedPack.packType, selectedPack.numCards, selectedPack.expectedSpecials, selectedPack.specialsGuaranteed)}
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