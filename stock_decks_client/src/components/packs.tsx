// Deck Component

'use client';

import { loadPacks } from '../lib/storage';
import { useRouter } from 'next/navigation';
import Image from "next/image";

export type UnopenedPack = {
id: string;
timestamp: number;
};

export default function Packs() {

  const packs = loadPacks();

  return (
    <div className="deck-container">
      <div id="card-container" className="flex justify-center flex-wrap gap-4">
        {packs.length === 0 ? (
          <p className="text-gray-300">No unopened packs.</p>
        ) : (
          packs.map((pack) => (
            <Pack key={pack.id} id={pack.id} timestamp={pack.timestamp} />
          ))
        )}
      </div>
    </div>
  );
}



function Pack({ id }: UnopenedPack) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/pack/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-48 h-64 cursor-pointer bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl shadow-lg border-4 border-dashed border-indigo-300 p-4 flex flex-col justify-between items-center group hover:scale-105 transition-transform"
    >
      {/* Grooved Edge Effect */}
      <div className="absolute -top-1 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 via-white to-indigo-400 rounded-t-sm" />
      <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 via-white to-indigo-400 rounded-b-sm" />

      {/* Logo */}
      <div className="flex-grow flex items-center justify-center">
        <Image
          src="/data/logo.png"
          alt="Pack Logo"
          width={80}
          height={80}
          className="rounded-md shadow-md"
        />
      </div>

      {/* Title */}
      <div className="text-white text-center font-semibold text-lg mt-2">
        Pack #{id}
      </div>
    </div>
  );
}