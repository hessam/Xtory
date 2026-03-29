import React from 'react';
import { HistorianCardResult } from '../utils/getHistorianCard';
import { historianCards } from '../data/historianCards';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getHistorianCard } from '../utils/getHistorianCard';

interface Props {
  result: HistorianCardResult;
  lang: 'en' | 'fa';
  onNavigate: (year: number) => void;   // calls setYear in App.tsx
  isEnriching?: boolean;                // true while AI is fetching (shows the pulse)
  aiNarrative?: string | null;          // AI text to show beneath the card (null = not yet loaded)
}

export const HistorianCardSection: React.FC<Props> = ({
  result,
  lang,
  onNavigate,
  isEnriching = false,
  aiNarrative = null,
}) => {
  const { card, isBetweenEras } = result;

  const prevCard = card.prevEraId
    ? getHistorianCard(
        historianCards.find(c => c.eraId === card.prevEraId)?.yearRange.start ?? 0
      )
    : null;

  const nextCard = card.nextEraId
    ? getHistorianCard(
        historianCards.find(c => c.eraId === card.nextEraId)?.yearRange.start ?? 0
      )
    : null;

  return (
    <div className="p-4 flex flex-col gap-3">

      {/* Between-Eras Note */}
      {isBetweenEras && (
        <div className="text-[10px] text-slate-500 italic px-1">
          {lang === 'en'
            ? `Between major eras — closest context:`
            : `بین دوره‌های اصلی — نزدیک‌ترین زمینه:`}
        </div>
      )}

      {/* Era Title & Year Range */}
      <div>
        <h2 className="font-serif font-bold text-white text-lg leading-tight">
          {card.eraName[lang]}
        </h2>
        <p className="text-slate-400 text-xs mt-0.5 font-mono">
          {Math.abs(card.yearRange.start)}{card.yearRange.start < 0 ? ' BC' : ' AD'}
          {' – '}
          {Math.abs(card.yearRange.end)}{card.yearRange.end < 0 ? ' BC' : ' AD'}
        </p>
      </div>

      {/* Full Summary */}
      <p className="text-slate-300 text-sm leading-relaxed">
        {lang === 'fa' && card.fullSummary.fa
          ? card.fullSummary.fa
          : card.fullSummary.en}
      </p>

      {/* AI Enrichment State */}
      {isEnriching && !aiNarrative && (
        <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">
          <div className="w-1 h-1 rounded-full bg-indigo-500" />
          {lang === 'en' ? 'Expanding context...' : 'در حال گسترش زمینه...'}
        </div>
      )}

      {/* AI Narrative (appended below, never replaces the card) */}
      {aiNarrative && (
        <div className="pt-3 border-t border-amber-500/20">
          <p className="text-slate-400 text-sm italic leading-relaxed">
            {aiNarrative}
          </p>
        </div>
      )}

      {/* Connection Chips */}
      <div className="flex gap-2 flex-wrap mt-1" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
        {prevCard && (
          <button
            onClick={() => onNavigate(prevCard.card.yearRange.start)}
            className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-slate-300 calm-transition"
          >
            <ChevronLeft className="w-3 h-3" />
            {prevCard.card.eraName[lang]}
          </button>
        )}
        {nextCard && (
          <button
            onClick={() => onNavigate(nextCard.card.yearRange.start)}
            className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-slate-300 calm-transition"
          >
            {nextCard.card.eraName[lang]}
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

    </div>
  );
};
