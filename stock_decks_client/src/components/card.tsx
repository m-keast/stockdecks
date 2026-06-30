// Card component and styling

import Image from 'next/image';
import { getSectorColor } from '../lib/cardstyle';
import { Card } from '../lib/definitions'; // <-- Import shared Card type
import { motion } from 'framer-motion';


// Extra card properties for display
type CardProps = {
  card: Card;                       // Use shared type
  onClick?: (card: Card) => void;   // Optional click handler
  className?: string;               // For stacking/fanning in pack opening
  style?: React.CSSProperties;      // For dynamic inline styles (like colors)
  showDescription?: boolean;        // Hide description for compact views (e.g., pack opening)
};

export default function CardComponent({
  card,
  onClick,
  className,
  style,
  showDescription = false,
}: CardProps) {
  const [borderColor, backgroundColor] = getSectorColor(card.sector) || ['#000', '#f0f0f0'];

  return (
    <motion.div
      onClick={() => onClick?.(card)}
      className={`relative flex flex-col cursor-pointer justify-between rounded-xl shadow-md w-[220px] aspect-[3/4] p-3 flex-shrink-0 border-[5px] hover:shadow-xl ${borderColor} ${backgroundColor}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformPerspective: 1200, ...style }}
    >
      {/* "New" badge (optional) */}
      {card.isNew && (
        <span className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
          NEW
        </span>
      )}

      {/* Header */}
      <div className="flex justify-between text-gray-600 font-bold mb-2">
        <span>{card.symbol}</span>
        <span>1</span>

        <img
           src={`/data/sectorIcons/${card.sector}.png`}
           alt={card.sector}
          className="w-6 h-6 object-contain"
        />
      </div>

      {/* Company Image */}
      <div className="w-full flex h-[150px] items-center justify-center flex-shrink-0">
        <img src={card.imgurl} alt={card.symbol} className="w-full h-full object-contain" />
      </div>

      {/* Name */}
      <span className="text-center text-black text-base font-semibold">{card.name}</span>

      {/* Info Row */}
      <div className="flex justify-between text-gray-600 mb-1 text-sm">
        <span>{card.sector}</span>
        <span>${card.price.toFixed(2)}</span>
      </div>

      {/* Optional Description */}
      {showDescription && (
        <p className="text-xs text-gray-600 text-left mt-1 line-clamp-3">
          {card.description}
        </p>
      )}
    </motion.div>
  );
}
