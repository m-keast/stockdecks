// Page for viewing deck of cards
//"use client";

import Deck from '../../components/deck';

export default function Home() {
  return (
    <div className="content">
      <h1>Stock Decks</h1>
      <div id="card-container"></div>
      <Deck /> {/* This now handles rendering and refreshing */}
    </div>
  )
}
