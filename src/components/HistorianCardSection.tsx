import React from 'react';
import { HistorianCardResult } from '../utils/getHistorianCard';
import { historianCards } from '../data/historianCards';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { getHistorianCard } from '../utils/getHistorianCard';
import { Vazir, vazirs } from '../data/vazirs';
import { formatYear } from '../utils/format';
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
  onVazirSelect?: (v: Vazir) => void;
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
  onVazirSelect = (_v: any) => {},
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

  const bannerMetadataMap: Record<string, { caption: {en: string, fa: string}, source: {en: string, fa: string} }> = {
    'prehistoric': { caption: { en: 'Sialk Ziggurat', fa: 'زیگورات سیلک' }, source: { en: 'Historical Reconstruction', fa: 'بازسازی تاریخی' } },
    'median': { caption: { en: 'Ecbatana Ruins', fa: 'ویرانه‌های هگمتانه' }, source: { en: 'Archaeological Archive', fa: 'آرشیو باستان‌شناسی' } },
    'achaemenid': { caption: { en: 'Persepolis Grand Staircase', fa: 'پلکان بزرگ تخت جمشید' }, source: { en: 'National Museum', fa: 'موزه ملی' } },
    'hellenistic': { caption: { en: 'Seleucid Coinage', fa: 'سکه‌شناسی سلوکی' }, source: { en: 'British Museum', fa: 'موزه بریتانیا' } },
    'parthian': { caption: { en: 'Parthian Cavalry', fa: 'سوارنظام اشکانی' }, source: { en: 'Historical Relief', fa: 'نقش‌برجسته تاریخی' } },
    'sasanian': { caption: { en: 'Taq Kasra', fa: 'طاق کسری' }, source: { en: 'Ctesiphon Archives', fa: 'آرشیو تیسفون' } },
    'early_islamic': { caption: { en: 'Early Mosque Architecture', fa: 'معماری اولیه مساجد' }, source: { en: 'Islamic Art Collection', fa: 'مجموعه هنر اسلامی' } },
    'iranian_renaissance': { caption: { en: 'Samanid Mausoleum', fa: 'آرامگاه سامانیان' }, source: { en: 'Bukhara Heritage', fa: 'میراث بخارا' } },
    'seljuk': { caption: { en: 'Seljuk Dome', fa: 'گنبد سلجوقی' }, source: { en: 'Isfahan Archives', fa: 'آرشیو اصفهان' } },
    'mongol_invasion': { caption: { en: 'Ilkhanate Manuscript', fa: 'نسخه خطی ایلخانی' }, source: { en: 'Topkapi Palace', fa: 'کاخ توپکاپی' } },
    'timurid': { caption: { en: 'Gur-e-Amir', fa: 'گور امیر' }, source: { en: 'Samarkand Register', fa: 'ثبت سمرقند' } },
    'safavid': { caption: { en: 'Naqsh-e Jahan', fa: 'نقش جهان' }, source: { en: 'Royal Collection', fa: 'مجموعه سلطنتی' } },
    'afsharid_zand': { caption: { en: 'Naderi Throne', fa: 'تخت نادری' }, source: { en: 'Jewelry Museum', fa: 'موزه جواهرات' } },
    'qajar': { caption: { en: 'Golestan Palace', fa: 'کاخ گلستان' }, source: { en: 'Tehran Archives', fa: 'آرشیو تهران' } },
    'modern': { caption: { en: 'Azadi Tower', fa: 'برج آزادی' }, source: { en: 'Contemporary Archive', fa: 'آرشیو معاصر' } },
  };

  const eraBanner = bannerMap[card.eraId] || '/Achaemenid-banner.webp'; 
  const bannerMeta = bannerMetadataMap[card.eraId] || bannerMetadataMap['achaemenid'];

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
        {/* Era Banner Illustration - Slim on mobile, Atmospheric */}
        <div 
          className="relative h-[90px] sm:h-[240px] md:h-[280px] w-full flex-shrink-0 overflow-hidden cursor-zoom-in group/banner"
          onClick={() => onBannerClick(eraBanner, card.eraName[lang])}
        >
          <img 
            src={eraBanner} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover/banner:scale-105" 
            alt={card.eraName[lang]} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          {/* Era Title - Desktop Only */}
          <div className="absolute bottom-4 left-4 right-4 z-10 hidden sm:block">
             {isBetweenEras && (
              <div className="text-[10px] text-amber-500/80 font-bold uppercase tracking-widest mb-1 drop-shadow-md">
                {lang === 'en' ? 'Transition Era' : 'دوران گذار'}
              </div>
            )}
            <h2 className={`font-bold text-white text-2xl sm:text-3xl leading-tight drop-shadow-lg ${lang === 'fa' ? 'font-vazirmatn' : 'font-serif'}`}>
              {card.eraName[lang]}
            </h2>
          </div>
        </div>
        
        {/* Caption */}
        <div className="px-4 py-1.5 flex justify-end">
          <span className="text-[11px] text-slate-500 font-medium" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
            {bannerMeta.caption[lang]} — {bannerMeta.source[lang]}
          </span>
        </div>

        {/* Connection Navigation - Sticky */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-slate-950/80 backdrop-blur-md border-b border-white/5" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
          {prevCard ? (
            <button
               onClick={() => onNavigate(prevCard.card.yearRange.start)}
               className={`flex items-center gap-2 group hover:text-amber-400 transition-colors ${lang === 'fa' ? '' : ''}`}
            >
              <ChevronLeft className={`w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-transform ${lang === 'fa' ? 'rotate-180 group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
              <div className="flex flex-col items-start overflow-hidden">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 group-hover:text-amber-400">{prevCard.card.eraName[lang]}</span>
                <span className="text-[9px] font-mono opacity-50">{formatYear(prevCard.card.yearRange.start, lang)} — {formatYear(prevCard.card.yearRange.end, lang)}</span>
              </div>
            </button>
          ) : <div className="flex-1" />}
          
          <div className="w-px h-6 bg-white/10 mx-2" />

          {nextCard ? (
            <button
               onClick={() => onNavigate(nextCard.card.yearRange.start)}
               className="flex items-center justify-end gap-2 group hover:text-amber-400 transition-colors text-right"
            >
              <div className="flex flex-col items-end overflow-hidden">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 group-hover:text-amber-400">{nextCard.card.eraName[lang]}</span>
                <span className="text-[9px] font-mono opacity-50">{formatYear(nextCard.card.yearRange.start, lang)} — {formatYear(nextCard.card.yearRange.end, lang)}</span>
              </div>
              <ChevronRight className={`w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-transform ${lang === 'fa' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </button>
          ) : <div className="flex-1" />}
        </div>

        {/* Text Content Area */}
        <div className="px-4 py-2 flex flex-col gap-4">
          {/* Year info - Whisper Volume */}
           <div className={`flex items-center opacity-40 mb-2 ${lang === 'fa' ? 'justify-end' : 'justify-start'}`} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
             <p className="text-[11px] font-mono text-white tracking-widest uppercase">
               {formatYear(card.yearRange.start, lang)} — {formatYear(card.yearRange.end, lang)}
             </p>
           </div>

          {/* Full Summary */}
          <p className="text-slate-200 text-sm leading-relaxed font-normal">
            {lang === 'fa' && card.fullSummary.fa
              ? card.fullSummary.fa
              : card.fullSummary.en}
          </p>

          {/* Vazir Interaction Logic */}
          {selectedVazir ? (
            /* 1. Detailed Advisor Card - Full Volume */
            <div className="mt-4 p-5 rounded-3xl border border-amber-500/30 bg-amber-500/5 relative overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl pointer-events-none" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30 shadow-inner">
                  {lang === 'en' ? 'Vazir advisor' : 'وزیر مشاور'}
                </span>
                <button
                  onClick={onVazirClose}
                  className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-full transition-all active:scale-90"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full bg-amber-500/20 border-2 border-amber-500/40 flex items-center justify-center text-amber-500 font-bold text-2xl shadow-[0_0_15px_rgba(245,158,11,0.2)] ${lang === 'fa' ? 'font-vazirmatn' : 'font-serif'}`}>
                  {selectedVazir.name.en?.charAt(0) || 'V'}
                </div>
                <div>
                  <h3 className={`font-bold text-white text-lg leading-tight ${lang === 'fa' ? 'font-vazirmatn' : 'font-serif'}`}>
                    {selectedVazir.name[lang]}
                  </h3>
                  <p className="text-amber-500/60 text-xs font-semibold uppercase tracking-widest mt-0.5">
                    {selectedVazir.title[lang]}
                  </p>
                </div>
              </div>
              
              <p className="text-slate-200 text-[13px] leading-relaxed italic border-l-2 border-amber-500/40 pl-4 py-1 bg-white/5 rounded-r-lg">
                "{selectedVazir.contribution[lang]}"
              </p>
              
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-slate-400 text-[11px] leading-snug font-medium">
                  {selectedVazir.paradox[lang]}
                </p>
              </div>
            </div>
          ) : eraVazir && (
            /* 2. Person Row - Scannable Point of Entry */
            <button 
              onClick={() => onVazirSelect?.(eraVazir)}
              className="mt-4 flex items-center gap-3 p-3 rounded-2xl bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/10 transition-all text-left rtl:text-right w-full group shadow-md"
            >
              <div className={`w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold text-lg shrink-0 group-hover:scale-105 transition-transform shadow-inner ${lang === 'fa' ? 'font-vazirmatn' : 'font-serif'}`}>
                {eraVazir.name.en?.charAt(0) || 'V'}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-amber-500/80 text-[9px] font-bold uppercase tracking-[0.2em]">{lang === 'en' ? 'Vazir advisor' : 'وزیر مشاور'}</span>
                  <div className="w-1 h-1 rounded-full bg-amber-500/40" />
                </div>
                <h4 className="text-white text-sm font-bold truncate tracking-wide">{eraVazir.name[lang]}</h4>
                <p className="text-slate-500 text-[10px] truncate leading-tight mt-0.5 opacity-80">
                  {eraVazir.paradox[lang]}
                </p>
              </div>
              
              <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-amber-500/60 transition-colors" />
            </button>
          )}

          {/* AI Narrative Integration */}
          {(isEnriching || aiNarrative) && (
            <div className="pt-4 mt-2 border-t border-white/5">
                {isEnriching && !aiNarrative && (
                <div className="flex items-center gap-2 text-indigo-400 text-[9px] font-bold uppercase tracking-wider animate-pulse">
                    <span className="w-1 h-1 rounded-full bg-indigo-500" />
                    {lang === 'en' ? 'Expanding context...' : 'در حال گسترش زمینه...'}
                </div>
                )}
                {aiNarrative && (
                <p className="text-slate-400 text-sm italic leading-relaxed">
                    {aiNarrative}
                </p>
                )}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
