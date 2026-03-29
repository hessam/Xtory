// src/components/ByokGate.tsx
import React from 'react';
import { getByokTeaser, getTeaserText } from '../data/byokTeasers';
import { Sparkles } from 'lucide-react';

interface Props {
  year: number;
  lang: 'en' | 'fa';
  onUnlock: () => void; // calls setShowSettings(true) from App.tsx
}

export const ByokGate: React.FC<Props> = ({ year, lang, onUnlock }) => {
  const teaser = getByokTeaser(year);
  const { text, cta } = getTeaserText(teaser, lang);

  return (
    <div className="flex flex-col gap-3 p-4 w-full max-w-sm">

      {/* Blurred Skeleton Lines — implies locked content above */}
      <div className="flex flex-col gap-1.5 pointer-events-none select-none" aria-hidden="true">
        <div className="h-2.5 rounded-full bg-white/10 blur-[2px] w-full" />
        <div className="h-2.5 rounded-full bg-white/10 blur-[2px] w-4/5" />
        <div className="h-2.5 rounded-full bg-white/10 blur-[2px] w-3/5" />
      </div>

      {/* Teaser Story */}
      <p className="text-amber-100 text-sm leading-relaxed font-medium italic">
        {text}
      </p>

      {/* CTA Button */}
      <button
        onClick={onUnlock}
        className="flex items-center justify-center gap-2 px-4 py-2.5
                   bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40
                   rounded-2xl text-amber-300 text-sm font-bold calm-transition
                   active:scale-[0.98]"
      >
        <Sparkles className="w-4 h-4" />
        {cta}
      </button>
    </div>
  );
};
