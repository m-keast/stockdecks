// Page for viewing deck of cards
//"use client";

import Deck from '../../components/deck';



export default function Home() {
  return (
    <div className="pt-16 overflow-y-auto max-h-[calc(100vh-4rem)]">
      <h1>Stock Decks</h1>
      <h2 className="text-2xl font-bold mb-4">Your Cards</h2>
      
      <Deck /> {/* This now handles rendering and refreshing */}
    </div>
  )
}
