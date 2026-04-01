---
trigger: manual
---

# Living Atlas — Guardrails

> **IMPORTANT:** This checklist represents the core behavioral contracts and interactions of the application. It **MUST** be respected during all phases of development and especially during the Map/Timeline refactor.
> If any item on this list breaks during a refactor phase, **STOP AND FIX IT** before continuing to the next phase.

## Part 1: Interactive Guardrail Checklist

Manually verify each item works now, then re-verify after EVERY development phase.

### MAP INTERACTIONS
- [ ] Clicking a region opens the historian panel with correct era content
- [ ] Hovering a region shows a visual highlight state
- [ ] Clicking outside a region deselects / closes panel
- [ ] Clicking a Vazir dot (gold) opens the Vazir profile in the panel
- [ ] Clicking a Historical Figure dot (purple) opens figure detail
- [ ] Clicking a Historical Event dot (teal) opens event detail
- [ ] Clicking a Cultural Heritage dot (coral/blue) opens heritage detail
- [ ] Zoom in button increases zoom level
- [ ] Zoom out button decreases zoom level
- [ ] Map can be panned by drag (desktop) and touch (mobile)

### TIMELINE INTERACTIONS
- [ ] Scrubbing the timeline changes region colours on the map
- [ ] Scrubbing to a new major era updates the context strip text
- [ ] Scrubbing to a new major era updates the historian panel content
- [ ] Event dots on the timeline track are visible
- [ ] Clicking "Who ruled here?" fires the AI call and populates rulers
- [ ] The result of "Who ruled here?" is cached — firing it again at the same year does NOT make a second AI call

### PANEL / DRAWER INTERACTIONS
- [ ] Historian panel is open by default on desktop
- [ ] Before/after era chips navigate the timeline correctly
- [ ] Vazir row is visible in the panel and tappable
- [ ] Events / Figures / Heritage tabs switch content correctly
- [ ] BYOK footnote is visible at the bottom of the drawer
- [ ] On mobile: drawer collapsed state shows era name + one-liner + 3 quick-action buttons
- [ ] On mobile: swipe up opens the drawer to half state
- [ ] On mobile: timeline is always visible regardless of drawer state

### LANGUAGE
- [ ] EN/FA toggle switches all UI text including map labels
- [ ] RTL layout is correct in Farsi mode
- [ ] Era names in context strip display in correct language

---

## Part 2: Critical Function Signatures

These function signatures are the internal contracts of the app. If any of these signatures change during a refactor, you have broken the contract and must update every caller. TypeScript must compile with zero errors.

### `src/services/geminiService.ts`
- `fetchHistoricalDataForYear(year: number, lang: 'en' | 'fa')`
- Cache strategy (Hybrid): wrap the existing `getYearBucketKey()` (25-year increments for long eras like Abbasid) with era boundary checking for short/specific eras.
- Maintain the strict 12 region IDs exact list in the prompt payload (`fars`, `jibal`, `khuzestan`, `mesopotamia`, `azerbaijan`, `caucasus`, `caspian_coast`, `khorasan`, `sistan`, `makran`, `transoxiana`, `chorasmia`).

### `src/components/Map.tsx`
- The `Props` interface must remain identical to allow for a seamless 1:1 map component swap (`MapLeaflet.tsx`).
- `onRegionClick(regionId: string)`
- `onVazirClick(vazir: Vazir)`
- `dynastyColor` derivation logic (same year must strictly produce the same color).
- Zoom state scale bindings for threshold rendering.

### `src/App.tsx`
- `handleYearContextClick`
- `onJumpToYear`
- `selectedRegion` and `selectedFigure` state footprint must not be mutated.
- The `panelProps` object shape passed down to `EventsPanel`.
