// Home Page
import DeckScrollerClient from '../../components/deckScrollerClient';


export default function HomePage() {
  return (
    <div >
      <div className="content">
        <h1 className="text-5xl font-bold mb-4">Stock Decks</h1>
        <DeckScrollerClient/>
        <h2 className="text-xl font-semibold mt-8">
          Collect stock cards and build your deck
        </h2>
      </div>
    </div>
  );
}
