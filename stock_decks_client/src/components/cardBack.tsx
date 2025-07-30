import { Card } from '../lib/definitions';

interface CardBackProps {
  card: Card;
  onClose: () => void;
}

export default function CardBack({ card, onClose }: CardBackProps) {
  return (
    <div className="fixed inset-0 z-50 bg-gray-200 bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-2xl relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* Full info display */}
        <h2 className="text-xl font-bold mb-2">{card.name}</h2>
        <img src={card.imgurl} alt={card.symbol} className="w-full max-h-[250px] object-contain mb-3" />
        <p><strong>Sector:</strong> {card.sector}</p>
        <p><strong>Price:</strong> ${card.price.toFixed(2)}</p>
        <p className="mt-2 text-sm text-gray-600">{card.description}</p>
      </div>
    </div>
  );
}
