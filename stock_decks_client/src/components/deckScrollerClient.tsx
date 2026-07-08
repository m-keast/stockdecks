'use client';
import dynamic from 'next/dynamic';
const DeckScroller = dynamic(() => import('./deckScroller'), { ssr: false });
export default function DeckScrollerClient() {
  return <DeckScroller />;
}