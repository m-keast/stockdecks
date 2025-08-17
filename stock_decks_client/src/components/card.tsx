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
  isNew?: boolean;                  // Optional flag to show "New" badge
};

export default function CardComponent({
  card,
  onClick,
  className,
  style,
  showDescription = false,
  isNew = false,
}: CardProps) {
  const [borderColor, backgroundColor] = getSectorColor(card.sector) || ['#000', '#f0f0f0'];

  return (
    <motion.div
      onClick={() => onClick?.(card)}
      layoutId={`card-${card.id}`}
      className={`relative flex flex-col cursor-pointer justify-between rounded-xl shadow-md w-[220px] p-3 flex-shrink-0 border-[5px] hover:scale-105 hover:shadow-xl transition-transform duration-200 ease-in-out ${borderColor} ${backgroundColor}`}
      
    >
      {/* "New" badge (optional) */}
      {isNew && (
        <span className="absolute top-1 right-1 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
          NEW
        </span>
      )}

      {/* Header */}
      <div className="flex justify-between text-gray-600 font-bold mb-2">
        <span>{card.symbol}</span>
        <span>1</span>
      </div>

      {/* Company Image */}
      <div className="w-full h-[150px] flex items-center justify-center">
        <Image
          src={card.imgurl}
          alt={card.symbol}
          width={200}
          height={150}
          className="object-contain max-h-full"
        />
      </div>

      {/* Name */}
      <span className="text-center text-base font-semibold">{card.name}</span>

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
