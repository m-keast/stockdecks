// Pack Opening Component

'use client';

import { loadPacks } from '../lib/storage';
import { getPackImage } from '../lib/cardstyle';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

export type UnopenedPack = {
id: string;
timestamp: number;
packType: string;
numCards: number;
expectedSpecials: number;
specialsGuaranteed: number;
};

export default function Packs() {

  const packs = loadPacks();

  return (
    <div className="deck-container">
      <div id="card-container" className="flex justify-center flex-wrap gap-4">
        {packs.length === 0 ? (
          <p></p>
        ) : (
          packs.map((pack) => (
            <Pack key={pack.id} id={pack.id} timestamp={pack.timestamp} packType={pack.packType} numCards={pack.numCards}
            expectedSpecials={pack.expectedSpecials} specialsGuaranteed={pack.specialsGuaranteed}/>
          ))
        )}
      </div>
    </div>
  );
}



// Base pack artwork with the logo/title overlaid on top. No click behavior of its own,
// so callers can wrap it with whatever interaction fits (navigate to it, open it, etc).
export function PackVisual({ packType }: { packType: string }) {
  return (
    <>
      <Image
        src={getPackImage(packType)}
        alt={`${packType} pack`}
        fill
        sizes="192px"
        className="object-contain drop-shadow-lg"
      />

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
    </>
  );
}

export function Pack({ id, packType }: UnopenedPack) {
  const router = useRouter();
  const isOpeningRef = useRef(false);

  const handleClick = () => {
    if (isOpeningRef.current) return;
    isOpeningRef.current = true;
    router.push(`/pack/${id}`);
  }

  return (
    <div
      onClick={handleClick}
      className="relative w-48 aspect-square cursor-pointer group hover:scale-105 transition-transform"
    >
      <PackVisual packType={packType} />
    </div>
  );
}
