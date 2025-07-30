// Card component and styling

import Image from 'next/image';
import { getSectorColor } from '../lib/cardstyle';
import { Card } from '../lib/cards'; // <-- Import shared Card type


// Extra card properties for display
type CardProps = {
  card: Card;                       // Use shared type
  className?: string;               // For stacking/fanning in pack opening
  style?: React.CSSProperties;      // For dynamic inline styles (like colors)
  showDescription?: boolean;        // Hide description for compact views (e.g., pack opening)
  isNew?: boolean;                  // Optional flag to show "New" badge
};

export default function CardComponent({
  card,
  className,
  style,
  showDescription = true,
  isNew = false,
}: CardProps) {
  const [borderColor, backgroundColor] = getSectorColor(card.sector) || ['#000', '#f0f0f0'];

  return (
    <div
      className={`relative flex flex-col justify-between rounded-xl shadow-md w-[220px] p-3 flex-shrink-0 bg-white border-[5px] hover:scale-105 hover:shadow-xl transition-transform duration-200 ease-in-out ${className || ''}`}
      style={{
        borderColor,
        backgroundColor,
        ...style,
      }}
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
      <Image
        src={card.imgurl}
        alt={card.symbol}
        width={200}
        height={150}
        className="w-full max-h-[150px] object-contain block mx-auto"
      />

      {/* Info Row */}
      <div className="flex justify-between text-gray-600 mb-1 text-sm">
        <span>{card.sector}</span>
        <span>${card.price.toFixed(2)}</span>
      </div>

      {/* Name */}
      <span className="text-center text-base font-semibold">{card.name}</span>

      {/* Optional Description */}
      {showDescription && (
        <p className="text-xs text-gray-600 text-left mt-1 line-clamp-3">
          {card.description}
        </p>
      )}
    </div>
  );
}
