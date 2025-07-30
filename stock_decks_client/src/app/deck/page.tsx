// Page for viewing deck of cards

import Deck from '../../components/deck';
import Pack from '../../components/packs';




export default function Home() {
  return (
    <div className="pt-16 overflow-y-auto max-h-[calc(100vh-4rem)]">
      <h1>Stock Decks</h1>
      <h2 className="text-2xl font-bold mb-4">Your Cards</h2>
   
      <Pack /> 
      <Deck /> {/* This now handles rendering and refreshing */}
    </div>
  )
}
