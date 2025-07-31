import { Card } from '../lib/definitions';
import { motion } from 'framer-motion';

interface CardBackProps {
  card: Card;
  onClose: () => void;
}

export default function CardBack({ card, onClose }: CardBackProps) {
  return (
    <div
      onClick ={onClose}
      className="cursor-pointer fixed inset-0 z-10 bg-transparent backdrop-blur-sm flex items-center justify-center"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className=" cursor-default bg-white p-6 rounded-lg w-11/12 max-w-2xl relative shadow-lg"
        layoutId={`card-${card.id}`}
      >
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* Full info display */}
        <h2 className="text-xl font-bold mb-2">{card.name}</h2>
        <img src={card.imgurl} alt={card.symbol} className="w-full max-h-[250px] object-contain mb-3" />
        <p><strong>Sector:</strong> {card.sector}</p>
        <p><strong>Price:</strong> ${card.price.toFixed(2)}</p>
        <p className="mt-2 text-sm text-gray-600">{card.description}</p>
      </motion.div>
    </div>
  );
}
