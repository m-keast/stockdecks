//Back of card component and styling

import { Card } from '../lib/definitions';
import { motion } from 'framer-motion';
import { getSectorColor } from '../lib/cardstyle';
import { getTagIcons } from '../lib/cardstyle';

interface CardBackProps {
  card: Card;
  onClose: () => void;
}

export default function CardBack({ card, onClose }: CardBackProps) {
  const [borderColor, backgroundColor, shinyBg] = getSectorColor(card.sector) || ['#000', '#f0f0f0'];
  return (
    <div
      onClick ={onClose}
      className="cursor-pointer fixed inset-0 z-10 bg-transparent backdrop-blur-sm flex items-center justify-center"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={
          `cursor-default p-6 rounded-xl h-8/10 aspect-[3/4] mt-10 relative shadow-lg border-[10px] ${borderColor} ${backgroundColor}
          ${card.tags.length > 0 ? ` bg-linear-to-r ${shinyBg}` : `${backgroundColor}` }`
        }
        initial={{ rotateY: -90, opacity: 1 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 130, damping: 20}}
        style={{ transformPerspective: 1200, backfaceVisibility: 'hidden' }}
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
        {card.tags.length > 0 && (
          <div className='absolute bottom-10 '>
            {getTagIcons(card.tags).map((icon) => (
              <img key={icon} src={icon} alt="" className="w-6 h-6 object-contain drop-shadow mr-2" />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
