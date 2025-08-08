// Page for viewing deck of cards

import Deck from '../../components/deck';
import Pack from '../../components/packs';




export default function Home() {
  return (
    <div className="pt-5 px-3 overflow-y-auto max-h-[calc(100vh-4rem)] min-h-screen bg-zinc-900 ">
      <h1 className="text-2xl text-gray-300 font-bold mb-4">Your Cards</h1>
      <Pack /> 
      <Deck /> {/* This now handles rendering and refreshing */}
    </div>
  )
}
