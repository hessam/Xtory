# Sprint 3: Conversion & Narrative Gate

> **Goal**: Make the AI upgrade feel like finding a door, not hitting a wall. Replace the cold
> "Add API Key" banner with a contextual, story-driven teaser. Wire the Vazir profile panel
> wired in Sprint 2's click handler.
>
> **Prerequisites**: Sprint 0, Sprint 1, and Sprint 2 must all be complete and passing their DoD.

---

## ⛔ GUARDRAILS — Read Before Writing a Single Line of Code

1. **DO NOT change the position or container structure of the BYOK banner.** It was moved to
   the bottom-center of the map in Sprint 0. Its container stays. Only the inner content changes.
2. **DO NOT change the `setShowSettings` call** that the "Add Key" / CTA button triggers.
   The button must still open the settings modal.
3. **DO NOT touch any Gemini API fetch logic** in `App.tsx` or `geminiService.ts`.
4. **Farsi `byokTeasers` strings are optional** — use the `??` fallback pattern. Never let
   the component crash if a Farsi string is missing.
5. **The blurred skeleton preview must use `pointer-events-none`** so clicks pass through
   to the map below.
6. Run `npm run dev` after each task and confirm the BYOK banner still opens the settings
   modal when clicked.

---

## Task 3-A: Create `src/data/byokTeasers.ts` [NEW FILE]

```ts
// src/data/byokTeasers.ts

export interface ByokTeaser {
  eraId: string;                       // matches historianCards.ts eraId
  yearRange: { start: number; end: number };
  teaser: { en: string; fa?: string }; // fa is optional — falls back to en
  cta:    { en: string; fa?: string }; // call-to-action label on the button
}

// Helper: get the teaser for a given year
export function getByokTeaser(year: number): ByokTeaser {
  const match = byokTeasers.find(
    t => year >= t.yearRange.start && year < t.yearRange.end
  );
  return match ?? byokTeasers[byokTeasers.length - 1]; // fallback to last entry
}

// i18n helper: returns the correct language string, falling back to EN
export function getTeaserText(teaser: ByokTeaser, lang: 'en' | 'fa'): {
  text: string;
  cta: string;
} {
  return {
    text: (lang === 'fa' ? teaser.teaser.fa : undefined) ?? teaser.teaser.en,
    cta:  (lang === 'fa' ? teaser.cta.fa : undefined)    ?? teaser.cta.en,
  };
}

// ────────────────────────────────────────────────────────────────────────────
// TODO: Farsi (fa) strings below require human translation by a native speaker.
//       Do NOT use machine translation for these — the emotional resonance of
//       the Vazir stories in Farsi is the whole point for the diaspora audience.
//       Leave fa fields undefined until a translator reviews them.
// ────────────────────────────────────────────────────────────────────────────

export const byokTeasers: ByokTeaser[] = [
  {
    eraId: 'prehistoric',
    yearRange: { start: -3000, end: -700 },
    teaser: { en: 'The earliest Iranians carved an empire from nothing. What were they building toward?' },
    cta:    { en: 'Explore the origins' },
  },
  {
    eraId: 'median',
    yearRange: { start: -700, end: -550 },
    teaser: { en: 'A nomadic confederation unified and toppled the Assyrian superpower. How?' },
    cta:    { en: 'Discover how they won' },
  },
  {
    eraId: 'achaemenid',
    yearRange: { start: -550, end: -330 },
    teaser: { en: 'Cyrus freed the Jews, respected local gods, and built the first human rights charter. Unlock his story.' },
    cta:    { en: 'Unlock his story' },
  },
  {
    eraId: 'hellenistic',
    yearRange: { start: -330, end: -247 },
    teaser: { en: 'Alexander burned Persepolis — but the Persian elite survived and began a quiet resistance. Find out how.' },
    cta:    { en: 'Find out how' },
  },
  {
    eraId: 'parthian',
    yearRange: { start: -247, end: 224 },
    teaser: { en: 'For 400 years, the Parthians held Rome at bay with horse archers and Iranian culture. Discover their strategy.' },
    cta:    { en: 'Discover their strategy' },
  },
  {
    eraId: 'sasanian',
    yearRange: { start: 224, end: 651 },
    teaser: { en: 'In 600 AD, an Iranian Vazir was translating Indian wisdom into Persian — while the empire crumbled around him.' },
    cta:    { en: 'Read his story' },
  },
  {
    eraId: 'early_islamic',
    yearRange: { start: 651, end: 820 },
    teaser: { en: 'The Arab armies conquered Iran — but Iranian bureaucrats ran the caliphate in Persian. Unlock the paradox.' },
    cta:    { en: 'Unlock the paradox' },
  },
  {
    eraId: 'iranian_renaissance',
    yearRange: { start: 820, end: 1040 },
    teaser: { en: 'Under an Arab Caliphate, Iranians produced Ferdowsi, Avicenna, and al-Biruni in one century. How?' },
    cta:    { en: 'Explore the renaissance' },
  },
  {
    eraId: 'seljuk',
    yearRange: { start: 1040, end: 1220 },
    teaser: { en: 'A Turkic warlord conquered Iran — then hired an Iranian Vazir to govern it. His name was Nizam al-Mulk.' },
    cta:    { en: 'Meet Nizam al-Mulk' },
  },
  {
    eraId: 'mongol_invasion',
    yearRange: { start: 1220, end: 1370 },
    teaser: { en: 'The Mongols killed millions — then an Iranian scholar convinced Hulagu to spare the library of Baghdad.' },
    cta:    { en: 'See how he did it' },
  },
  {
    eraId: 'timurid',
    yearRange: { start: 1370, end: 1501 },
    teaser: { en: 'Tamerlane left a trail of skulls — and a son who made Samarkand the cultural capital of the world.' },
    cta:    { en: 'Explore the paradox' },
  },
  {
    eraId: 'safavid',
    yearRange: { start: 1501, end: 1736 },
    teaser: { en: 'Shah Abbas built Isfahan in 30 years — one of the most beautiful cities in human history. Unlock the blueprint.' },
    cta:    { en: 'Unlock the blueprint' },
  },
  {
    eraId: 'afsharid_zand',
    yearRange: { start: 1736, end: 1796 },
    teaser: { en: 'Nader Shah recaptured the Peacock Throne from Delhi — then lost everything within a generation.' },
    cta:    { en: 'Discover what happened' },
  },
  {
    eraId: 'qajar',
    yearRange: { start: 1796, end: 1925 },
    teaser: { en: 'Russia and Britain carved up Iran between them — while Iranian intellectuals invented constitutional democracy.' },
    cta:    { en: 'Read the hidden history' },
  },
  {
    eraId: 'modern',
    yearRange: { start: 1925, end: 2000 },
    teaser: { en: 'Iran had oil, democracy, and a revolution — all within 30 years. AI can help you connect the dots.' },
    cta:    { en: 'Connect the dots' },
  },
];
```

---

## Task 3-B: Create the Blurred Skeleton Component `src/components/ByokGate.tsx` [NEW FILE]

This component replaces the inner content of the existing BYOK banners. The container
wrappers and `setShowSettings` calls stay exactly where they are.

```tsx
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
```

---

## Task 3-C: Replace BYOK Banner Content in `App.tsx` (Desktop)

**File**: `src/App.tsx`

Find the BYOK banner block (moved to the map center-bottom in Sprint 0). It currently says:
`"Add your free Gemini key to unlock AI features"`.

Replace the inner content of the banner `<div>` with `<ByokGate>`:

```tsx
{isReady && !apiKey && (
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
    <div className="liquid-glass border border-amber-500/30 rounded-3xl shadow-xl overflow-hidden">
      <ByokGate
        year={year}
        lang={lang}
        onUnlock={() => setShowSettings(true)}
      />
    </div>
  </div>
)}
```

> ⚠️ The outer container's position (`absolute bottom-6 left-1/2 -translate-x-1/2`) was set
> in Sprint 0 and **must not change here**.

---

## Task 3-D: Replace BYOK Banner Content in `BottomSheet.tsx` (Mobile)

**File**: `src/components/BottomSheet.tsx`

Find the existing mobile BYOK banner (the `<div>` showing "Add Gemini key to unlock AI").

Replace its inner content with `<ByokGate>`:

```tsx
{!apiKey && (
  <div className="p-4 border-t border-white/5">
    <ByokGate
      year={year}
      lang={lang}
      onUnlock={() => setShowSettings?.(true)}
    />
  </div>
)}
```

> ⚠️ Check that `BottomSheet.tsx` already receives `year` as a prop via `panelProps` from
> `App.tsx`. If `year` is not in `panelProps`, add `year: year` to the `panelProps` object.

---

## Task 3-E: Wire the Vazir Profile Panel (from Sprint 2's `onVazirClick`)

In Sprint 2, clicking a Vazir dot only logged to the console. Now we wire it properly.

### Step 1: Add state to `App.tsx`

```tsx
const [selectedVazir, setSelectedVazir] = useState<Vazir | null>(null);
```

### Step 2: Pass the handler to Map

In `App.tsx`, on both mobile and desktop `<Map>` usages:

```tsx
onVazirClick={(vazir) => setSelectedVazir(vazir)}
```

### Step 3: Add `selectedVazir` to `panelProps`

```tsx
const panelProps = {
  // ... all existing panelProps fields ...
  selectedVazir,
  onVazirClose: () => setSelectedVazir(null),
};
```

### Step 4: Render the Vazir Profile in `HistorianCardSection.tsx`

In `HistorianCardSection.tsx`, accept an optional `selectedVazir` prop and render it
at the bottom of the card (below the connection chips):

```tsx
// In Props interface:
selectedVazir?: Vazir | null;
onVazirClose?: () => void;
```

```tsx
// In JSX, after the connection chips:
{selectedVazir && (
  <div className="mt-3 p-3 rounded-2xl border border-amber-500/30 bg-amber-500/5">
    {/* Vazir of this Era Label */}
    <div className="flex items-center justify-between mb-2">
      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
        {lang === 'en' ? 'Vazir of this Era' : 'وزیر این دوره'}
      </span>
      <button
        onClick={onVazirClose}
        className="text-slate-500 hover:text-white text-xs calm-transition"
      >
        ✕
      </button>
    </div>

    {/* Name */}
    <h3 className="font-serif font-bold text-white text-base">
      {selectedVazir.name[lang]}
    </h3>

    {/* Title & Ruler */}
    <p className="text-slate-400 text-xs mt-0.5">
      {selectedVazir.title[lang]} · {selectedVazir.rulerName[lang]}
    </p>

    {/* Contribution */}
    <p className="text-slate-300 text-sm mt-2 leading-relaxed italic">
      "{selectedVazir.contribution[lang]}"
    </p>

    {/* Paradox */}
    <p className="text-slate-500 text-xs mt-2 leading-relaxed">
      {selectedVazir.paradox[lang]}
    </p>
  </div>
)}
```

---

## Task 3-F: Legend Simplification Toggle in the Left Sidebar

**File**: The left sidebar panel created in Sprint 0 inside `App.tsx`.

The left sidebar currently has a placeholder comment "Legend panel (Sprint 1)."
Now we replace it with the actual legend content plus a simplified/detailed toggle.

### Step 1: Add state

In `App.tsx`:
```tsx
const [legendMode, setLegendMode] = useState<'simple' | 'detailed'>('simple');
```

### Step 2: Extract the legend from `Map.tsx`

In `Map.tsx`, find the existing legend rendering block (look for "LEGEND" in comments or
a section that renders the `colorFamily` categories). Cut it and move it to the left sidebar.

> ⚠️ **GUARDRAIL**: Do NOT remove the legend from `Map.tsx` until you have confirmed it
> renders correctly in the sidebar. Use a copy-then-delete approach.

### Step 3: Render in the left sidebar

```tsx
{/* In the left sidebar div in App.tsx: */}
<div className="px-4 py-3 flex flex-col gap-3">

  {/* LEGEND Header */}
  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
    Legend
  </span>

  {/* Simple Mode */}
  {legendMode === 'simple' && (
    <>
      <LegendItem color="persian"  label={{ en: 'Iranian-origin rule',  fa: 'حاکمیت ایرانی' }} lang={lang} />
      <LegendItem color="foreign"  label={{ en: 'Foreign rule',         fa: 'حاکمیت بیگانه' }} lang={lang} />
      <LegendItem color="nomadic"  label={{ en: 'Contested',            fa: 'در مناقشه' }} lang={lang} />
    </>
  )}

  {/* Detailed Mode */}
  {legendMode === 'detailed' && (
    <>
      {/* Render all 7 existing colorFamily categories */}
    </>
  )}

  {/* Toggle */}
  <button
    onClick={() => setLegendMode(m => m === 'simple' ? 'detailed' : 'simple')}
    className="text-[10px] text-slate-500 hover:text-slate-300 calm-transition text-left underline"
  >
    {legendMode === 'simple'
      ? (lang === 'en' ? 'detailed view ↓' : 'نمای دقیق ↓')
      : (lang === 'en' ? 'simplified ↑'     : 'ساده‌شده ↑')}
  </button>

  {/* MAP DOTS Key */}
  <div className="mt-2 flex flex-col gap-2">
    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
      Map Dots
    </span>
    <LegendItem color="amber"    label={{ en: 'Vazir',   fa: 'وزیر' }}    lang={lang} />
    <LegendItem color="purple"   label={{ en: 'Figure',  fa: 'شخصیت' }}   lang={lang} />
    <LegendItem color="emerald"  label={{ en: 'Event',   fa: 'رویداد' }}   lang={lang} />
    <LegendItem color="sky"      label={{ en: 'Heritage',fa: 'میراث' }}    lang={lang} />
  </div>
</div>
```

Create a small `LegendItem` helper component or inline it — whichever is cleaner. Keep it
in the same file unless it grows past 20 lines.

---

## Definition of Done (DoD)

- [ ] `src/data/byokTeasers.ts` exists with 15 era entries and the `getByokTeaser` + `getTeaserText` utilities
- [ ] `src/components/ByokGate.tsx` exists with blurred skeleton, teaser text, and CTA button
- [ ] Desktop BYOK banner shows contextual story teaser for the current era (not generic text)
- [ ] Mobile BYOK banner shows the same contextual teaser
- [ ] Clicking the CTA button still opens the settings modal
- [ ] Scrubbing the timeline to a new era changes the teaser text
- [ ] Clicking a Vazir dot on the map opens the Vazir profile panel in the historian sidebar
- [ ] The Vazir profile panel shows name, title, ruler, contribution, and paradox
- [ ] The `✕` button on the Vazir profile dismisses it correctly
- [ ] Left sidebar legend shows "simplified" mode by default with 3 buckets
- [ ] Legend toggle switches between simplified and detailed views
- [ ] "Map Dots" key in the legend shows the 4 dot categories with correct amber/gold Vazir colour
- [ ] Farsi fallback works — no blank strings appear in either language
- [ ] `npm run build` passes with zero TypeScript errors
- [ ] The app works end-to-end: scrub timeline → era changes → teaser changes → click Vazir → profile opens → click CTA → settings modal opens
