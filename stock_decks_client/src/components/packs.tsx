// Pack Opening Component

'use client';

import { loadPacks } from '../lib/storage';
import { getPackImage } from '../lib/cardstyle';
import { useRouter } from 'next/navigation';
import Image from "next/image";

export type UnopenedPack = {
id: string;
timestamp: number;
packType: string;
};

export default function Packs() {

  const packs = loadPacks();

  return (
    <div className="deck-container">
      <div id="card-container" className="flex justify-center flex-wrap gap-4">
        {packs.length === 0 ? (
          <p>No unopened packs.</p>
        ) : (
          packs.map((pack) => (
            <Pack key={pack.id} id={pack.id} timestamp={pack.timestamp} packType={pack.packType} />
          ))
        )}
      </div>
    </div>
  );
}



export function Pack({ id, packType }: UnopenedPack) {
  const router = useRouter();

  const handleClick = () => router.push(`/pack/${id}`);

  return (
    <div
      onClick={handleClick}
      className="relative w-48 aspect-square cursor-pointer group hover:scale-105 transition-transform"
    >
      {/* Base pack graphic */}
      <Image
        src={getPackImage(packType)}
        alt={`${packType} pack`}
        fill
        sizes="192px"
        className="object-contain drop-shadow-lg"
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <Image
          src="/data/logo.png"
          alt="Pack Logo"
          width={72}
          height={72}
          className="rounded-md"
        />
        <div className="text-gray-800 font-semibold text-center text-base">
          {packType} pack
        </div>
      </div>
    </div>
  );
}
