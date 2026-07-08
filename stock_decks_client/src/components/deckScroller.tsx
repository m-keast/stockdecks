'use client';

import { useRef, useEffect } from 'react';
import { loadCards } from '../lib/storage';
import CardComponent from '../components/card';
import { useRouter } from 'next/navigation';
import { Card as CardType } from '../lib/definitions';

const CARD_WIDTH = 220;
const GAP = 16;
const CARD_STEP = CARD_WIDTH + GAP;
const MAX_ROTATE = 20;
const MAX_SPEED = 12;
const DEAD_ZONE = 0.25;

export default function DeckScroller() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollXRef = useRef(0);
  const targetSpeedRef = useRef(0);
  const speedRef = useRef(0);
  const paddingRef = useRef(0);

  const cards = loadCards();

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const padding = container.clientWidth / 2 - CARD_WIDTH / 2;
    paddingRef.current = padding;
    track.style.paddingLeft = `${padding}px`;
    track.style.paddingRight = `${padding}px`;

    const updateCardTransforms = () => {
      const containerWidth = container.clientWidth;
      const visibleCenter = scrollXRef.current + containerWidth / 2;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const cardCenter = paddingRef.current + i * CARD_STEP + CARD_WIDTH / 2;
        const dist = cardCenter - visibleCenter;
        const normalized = dist / (containerWidth * 0.5);

        const rotate = normalized * MAX_ROTATE;
        const scale = Math.max(0.82, 1 - Math.abs(normalized) * 0.18);
        const translateY = Math.pow(Math.abs(normalized), 1.5) * 25;
        const zIndex = Math.round(1000 - Math.abs(dist));

        el.style.transform = `rotate(${rotate}deg) scale(${scale}) translateY(${translateY}px)`;
        el.style.zIndex = String(Math.max(0, zIndex));
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normalized = ((e.clientX - rect.left) / rect.width - 0.5) * 2;

      if (Math.abs(normalized) < DEAD_ZONE) {
        targetSpeedRef.current = 0;
      } else {
        const sign = Math.sign(normalized);
        const magnitude = (Math.abs(normalized) - DEAD_ZONE) / (1 - DEAD_ZONE);
        targetSpeedRef.current = sign * Math.pow(magnitude, 1.5) * MAX_SPEED;
      }
    };

    const handleMouseLeave = () => { targetSpeedRef.current = 0; };

    let rafId: number;
    const loop = () => {
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.08;

      if (Math.abs(speedRef.current) > 0.01) {
        const totalWidth = paddingRef.current * 2 + cards.length * CARD_STEP - GAP;
        const maxScroll = totalWidth - container.clientWidth;
        scrollXRef.current = Math.max(0, Math.min(maxScroll, scrollXRef.current + speedRef.current));
        track.style.transform = `translateX(${-scrollXRef.current}px)`;
      }

      updateCardTransforms();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cards.length]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden relative" style={{ height: 380 }}>
      <div
        ref={trackRef}
        className="flex absolute top-0 left-0"
        style={{ gap: GAP, willChange: 'transform', paddingTop: 20, paddingBottom: 20 }}
      >
        {cards.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            style={{ flexShrink: 0, transformOrigin: 'bottom center' }}
            onClick={() => router.push(`/deck?openCard=${card.id}`)}
          >
            <CardComponent card={card} />
          </div>
        ))}
      </div>
    </div>
  );
}