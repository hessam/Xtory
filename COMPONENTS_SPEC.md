# Xtory: Component & Behavioral Specification
*Single Source of Truth (SSOT) v1.0*

This document defines the behavioral and architectural contract for all Xtory UI components. It serves as the primary reference for state management, multilingual logic, and data consumption. **Compliance is mandatory** to prevent "vibe-coding" and technical debt.

---

## 1. Core Principles & Multilingual Contract
The application operates on a **Persian-First** architectural contract.

| Scenario | Rule | Requirement |
| :--- | :--- | :--- |
| **UI Labels** | Always Persian (`fa`) | Use translations or mappings. Avoid hardcoded English strings. |
| **Numerals** | Localized per Language | In `fa`, numbers MUST be Persian (۰-۹). In `en`, Latin (0-9). |
| **Dates (Eras)** | Standardized Era Labels | BC/AD (EN) vs. ق.م/م (FA). No exceptions. |
| **Script Mixing** | Latin for Proper Nouns Only | Only use English for internal IDs or proper nouns with no Persian equivalent. |
| **Numeral Flow** | RTL Consistency | Use `formatYear(year, lang)` for all dates. Never use `Math.abs(year)` manually in UI. |

---

## 2. Design Tokens & Semantic Layers
Components must use existing class tokens from `index.css` rather than ad-hoc Tailwind configurations.

### Surfaces
- **`.liquid-glass`**: Standard container (40% opacity). Use for small modals or detached UI elements.
- **`.liquid-glass-heavy`**: Higher contrast (65% opacity). Use for sidebars (`EventsPanel`) and full-screen overlays.
- **`.mobile-sheet-glass`**: Opaque fallback (92% opacity) for mobile to prevent map bleed-through.

### Typography & Icons
- **Primary Labels**: White (`text-white`) or Amber-400 (`text-amber-400`).
- **Secondary/Date Labels**: Slate-500 (`text-slate-500`) or Slate-400.
- **Directional Icons**: Use `dir="rtl"` on containers. Flip `ChevronRight`/`ChevronLeft` logic based on `lang`.

---

## 3. Component Specifications

### 3.1 BottomSheet (Mobile Hub)
**Behaviors:**
- **State: Collapsed**: Single drag handle + horizontal row with EXACTLY two elements (Era Name | Date). No other interactive elements allowed.
- **State: Half**: Contextual information. Sticky tab bar appears at the top. Scroller contains `HistorianCardSection`.
- **State: Full**: Map is completely obscured. Navigation becomes primary. Era switching navigation must be **sticky** under the banner.
- **Drag Interaction**: Handle must be a distinct 4px element with vertical spacing above the text row.

**Empty States:**
- Never show "No data found."
- **Invitation Logic**: Show AI icon (`Sparkles`), Title ("Explore this Era with AI"), and Subtitle ("Discover events, figures...").

### 3.2 HistorianCardSection (Atmospheric Era Context)
**Behaviors:**
- **Banner Caption**: Every banner MUST have a two-part caption: `Caption Name — Source`. Rendered at 11px to suggest curation over generic assets.
- **Sticky Navigation Row**: Predecessor/Successor navigation must stick to the top during full-scroll.
- **Era Range**: Format as `Start — End` with an em-dash. Right-aligned in RTL.

**Data Consumption:**
- Must consume `HistorianCard` interface.
- Requires `onNavigate` callback to bridge the gap between era browsing and map updates.

### 3.3 RulerCard (The "Door" Pattern)
**Principles:**
- **Simplified Front**: Name + Dynasty + Summary Label.
- **No Pills**: Individual regions are deferred to the `DetailModal`.
- **Storytelling Label**: Calculate counts dynamically. Use the pattern "Expanded from X to Y regions" if growth is detected, otherwise "X regions controlled".

### 3.4 DetailModal (Deep Context)
**Behaviors:**
- **Enum Translation Map**: Internal statuses like 'Direct Control' or 'Vassal State' MUST be mapped through a localized object before rendering.
- **AI Generation**: Buttons must transform into a `Loader` state during async operations.
- **Layout**: 2-column grid for meta-stats (Year, Status, etc.).

---

## 4. Logical Layer (Utility Contract)

### `formatYear(year, lang)`
- **Input**: Integer (Negative for BC).
- **Operation**: Converts digits to Persian if `lang === 'fa'`. Appends localized era abbreviations.
- **Registry**: `src/utils/format.ts`.

### `formatDuration(years, lang)`
- **Input**: Integer.
- **Output**: `X سال` (FA) or `X yrs` (EN).
- **Registry**: `src/utils/format.ts`.

---

## 5. Standardized Data Structures
Ensuring consistent data consumption across components.

```typescript
// Core Data Contract
interface HistorianCard {
  eraId: string;
  eraName: { en: string; fa: string };
  yearRange: { start: number; end: number };
  situationOneLiner: { en: string; fa: string };
  fullSummary: { en: string; fa?: string };
}

// Event Data Contract
interface ReignEvent {
  rulerId: string;
  regionId: string;
  startDate: number;
  endDate: number;
  status: string; // Must be mapped via UI translation map
}
```

---

## 6. Implementation Checklist for New Features
1. Does this feature respect the **Persian-First** contract?
2. Are all numbers using the localized **formatting utilities**?
3. Does the **Empty State** invite the user to engage with AI?
4. Are UI labels consistently **translated** (no leaked English strings)?
5. Does it use the existing **Glassmorphism design tokens**?
