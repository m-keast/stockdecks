// Home Page

import DeckScroller from '@/components/deckScroller';
import Image from 'next/image'; 


export default function HomePage() {
  return (
    <div >
      <div className="content">
        <h1 className="text-5xl font-bold mb-4">Stock Decks</h1>
        <DeckScroller/>
      </div>
    </div>
  );
}
