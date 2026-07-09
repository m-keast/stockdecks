// Home Page
import DeckScrollerClient from '../../components/deckScrollerClient';


export default function HomePage() {
  return (
    <div >
      <div className="content">
        <h1 className="text-5xl font-bold mb-4">Stock Decks</h1>
        <DeckScrollerClient/>
      </div>
    </div>
  );
}
