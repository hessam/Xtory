import React from 'react';
import { HistorianCardResult } from '../utils/getHistorianCard';
import { historianCards } from '../data/historianCards';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { getHistorianCard } from '../utils/getHistorianCard';
import { Vazir, vazirs } from '../data/vazirs';
import { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  result: HistorianCardResult;
  lang: 'en' | 'fa';
  onNavigate: (year: number) => void;   // calls setYear in App.tsx
  isEnriching?: boolean;                // true while AI is fetching (shows the pulse)
  aiNarrative?: string | null;          // AI text to show beneath the card (null = not yet loaded)
  selectedVazir?: Vazir | null;
  onVazirClose?: () => void;
  onBannerClick?: (url: string, title: string) => void;
}

export const HistorianCardSection: React.FC<Props> = ({
  result,
  lang,
  onNavigate,
  isEnriching = false,
  aiNarrative = null,
  selectedVazir = null,
  onVazirClose = () => {},
  onBannerClick = (_url: string, _title: string) => {},
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

  // Find a vazir that was active during the current card's range (or specific year)
  // We use the start year of the current era as the primary anchor
  const eraYear = card.yearRange.start;
  const eraVazir = useMemo(() => {
    return vazirs.find(v => eraYear >= v.activeYearStart && eraYear <= v.activeYearEnd) 
        || vazirs.find(v => v.activeYearStart >= card.yearRange.start && v.activeYearEnd <= card.yearRange.end);
  }, [eraYear, card.yearRange.start, card.yearRange.end]);

  // era banner mapping
  const bannerMap: Record<string, string> = {
    'prehistoric': '/Pre-historic-banner.webp',
    'median': '/Median-banner.webp',
    'achaemenid': '/Achaemenid-banner.webp',
    'hellenistic': '/Helenic-banner.webp',
    'parthian': '/Partian-banner.webp',
    'sasanian': '/Sassanian-banner.webp',
    'early_islamic': '/Arab-conquest-banner.webp',
    'iranian_renaissance': '/renaisance-banner.webp',
    'seljuk': '/Seljuks-banner.webp',
    'mongol_invasion': '/Mongol-banner.webp',
    'timurid': '/Timur-banner.webp',
    'safavid': '/Safavi-banner.webp',
    'afsharid_zand': '/Afshar-banner.webp',
    'qajar': '/Qajar-banner.webp',
    'modern': '/Modern-banner.webp',
  };

  const eraBanner = bannerMap[card.eraId] || '/Achaemenid-banner.webp'; 

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${card.eraId}-${lang}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col"
      >
        {/* Era Banner Illustration */}
        <div 
          className="relative h-[160px] sm:h-[240px] md:h-[280px] w-full flex-shrink-0 overflow-hidden cursor-zoom-in group/banner"
          onClick={() => onBannerClick(eraBanner, card.eraName[lang])}
        >
          <img 
            src={eraBanner} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover/banner:scale-105" 
            alt={card.eraName[lang]} 
          />
          {/* Fading gradient into the background slate-900 (liquid-glass-heavy base) */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent" />
          
          {/* Era Title Floating on Banner */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
             {isBetweenEras && (
              <div className="text-[10px] text-amber-500/80 font-bold uppercase tracking-widest mb-1 drop-shadow-md">
                {lang === 'en' ? 'Transition Era' : 'دوران گذار'}
              </div>
            )}
            <h2 className="font-serif font-bold text-white text-2xl sm:text-3xl leading-tight drop-shadow-lg">
              {card.eraName[lang]}
            </h2>
          </div>
        </div>

        {/* Text Content Area */}
        <div className="p-4 flex flex-col gap-4">
          {/* Year info - styled as a parchment detail */}
          <div className="flex items-center gap-2">
            <span className="h-px bg-white/10 flex-1" />
            <p className="text-slate-400 text-xs font-mono bg-white/5 px-2 py-0.5 rounded-md border border-white/10 whitespace-nowrap">
              {Math.abs(card.yearRange.start)}{card.yearRange.start < 0 ? ' BC' : ' AD'}
              {' – '}
              {Math.abs(card.yearRange.end)}{card.yearRange.end < 0 ? ' BC' : ' AD'}
            </p>
            <span className="h-px bg-white/10 flex-1" />
          </div>

          {/* Full Summary */}
          <p className="text-slate-300 text-sm leading-relaxed font-normal">
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

          {/* AI Narrative */}
          {aiNarrative && (
            <div className="pt-3 border-t border-amber-500/20">
              <p className="text-slate-400 text-sm italic leading-relaxed">
                {aiNarrative}
              </p>
            </div>
          )}

          {/* Connection Navigation */}
          <div className="flex flex-col gap-2 mt-4" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
            {nextCard && (
              <button
                onClick={() => onNavigate(nextCard.card.yearRange.start)}
                className="w-full flex items-center justify-between px-4 py-3 bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 hover:border-indigo-400/50 rounded-2xl text-indigo-100 calm-transition active:scale-95 group shadow-lg shadow-indigo-500/10 cursor-pointer"
              >
                <div className="flex flex-col text-start items-start space-y-0.5">
                  <span className={`text-[9px] text-indigo-300/80 font-bold uppercase tracking-widest ${lang === 'fa' ? 'font-vazirmatn' : ''}`}>{lang === 'en' ? 'Next Era' : 'دوره بعدی'}</span>
                  <span className={`text-xs sm:text-sm font-bold uppercase tracking-widest leading-tight ${lang === 'fa' ? 'font-vazirmatn' : ''}`}>{nextCard.card.eraName[lang]}</span>
                </div>
                <ChevronRight className="w-5 h-5 shrink-0 text-indigo-400 ltr:group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform" />
              </button>
            )}

            {prevCard && (
              <button
                onClick={() => onNavigate(prevCard.card.yearRange.start)}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-2xl text-slate-300 calm-transition active:scale-95 group shadow-lg cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 shrink-0 text-slate-500 ltr:group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1 transition-transform" />
                <div className="flex flex-col text-end items-end space-y-0.5">
                  <span className={`text-[8px] text-slate-500 font-bold uppercase tracking-widest ${lang === 'fa' ? 'font-vazirmatn' : ''}`}>{lang === 'en' ? 'Previous Era' : 'دوره قبلی'}</span>
                  <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-widest leading-tight ${lang === 'fa' ? 'font-vazirmatn' : ''}`}>{prevCard.card.eraName[lang]}</span>
                </div>
              </button>
            )}
          </div>

          {/* Vazir Profile (Full mode) */}
          {selectedVazir && (
            <div className="mt-2 p-4 rounded-3xl border border-amber-500/30 bg-amber-500/5 relative overflow-hidden group hover:bg-amber-500/10 transition-colors shadow-lg">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-3xl pointer-events-none" />
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  {lang === 'en' ? 'Vazir Signature' : 'دست‌خط وزیر'}
                </span>
                <button
                  onClick={onVazirClose}
                  className="p-1 text-slate-500 hover:text-white hover:bg-white/10 rounded-full transition-all active:scale-90"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-serif font-bold text-white text-base leading-snug">
                {selectedVazir.name[lang]}
              </h3>
              <p className="text-slate-400 text-xs mt-1 font-medium">
                {selectedVazir.title[lang]} <span className="text-slate-600 mx-1">·</span> <span className="text-amber-200/60 ">{selectedVazir.rulerName[lang]}</span>
              </p>
              <p className="text-slate-200 text-sm mt-3 leading-relaxed italic border-l-2 border-amber-500/30 pl-3">
                "{selectedVazir.contribution[lang]}"
              </p>
              <p className="text-slate-500 text-[11px] mt-3 leading-relaxed font-medium">
                {selectedVazir.paradox[lang]}
              </p>
            </div>
          )}

          {/* Vazir Highlight */}
          {!selectedVazir && eraVazir && (
            <div className="mt-2 p-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 transition-colors calm-transition group cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                <span className="text-[10px] font-bold text-amber-500/80 uppercase tracking-widest">
                  {lang === 'en' ? 'Vazir Highlight' : 'چهره برجسته دیوان'}
                </span>
              </div>
              <p className="text-slate-300 text-xs font-medium leading-snug">
                <span className="text-white font-bold">{eraVazir.name[lang]}:</span> {eraVazir.paradox[lang]}
              </p>
              <div className="mt-2 text-[10px] text-amber-200/40 italic group-hover:text-amber-200/60 transition-colors">
                {lang === 'en' ? 'Find his marker on the map to read his full story →' : 'برای خواندن داستان او، نشانگرش را روی نقشه بیابید ←'}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
