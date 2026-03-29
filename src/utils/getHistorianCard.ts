// src/utils/getHistorianCard.ts
import { historianCards, HistorianCard } from '../data/historianCards';

export interface HistorianCardResult {
  card: HistorianCard;
  isBetweenEras: boolean;
}

export function getHistorianCard(year: number): HistorianCardResult {
  // 1. Try exact match
  // A match is found if: start <= year < end
  const exact = historianCards.find(
    c => year >= c.yearRange.start && year < c.yearRange.end
  );
  if (exact) return { card: exact, isBetweenEras: false };

  // 2. Fallback: find nearest card by midpoint distance
  const nearest = historianCards.reduce((best, current) => {
    const midBest = (best.yearRange.start + best.yearRange.end) / 2;
    const midCurrent = (current.yearRange.start + current.yearRange.end) / 2;
    return Math.abs(midCurrent - year) < Math.abs(midBest - year) ? current : best;
  });

  return { card: nearest, isBetweenEras: true };
}
