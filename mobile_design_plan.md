# Mobile Design Alignment Plan
> **Version 1.0 · Junior Developer Guide**  
> Scope: Mobile only (`sm:hidden` layout in `App.tsx`). Zero changes to desktop. Zero logic changes.  
> Constraint: Touch only CSS + JSX layout fixes. No new libraries. No state refactor.

---

## ⚠️ Hard Rules — Read Before You Write a Single Line

1. **Desktop is frozen.** Every change must live inside `sm:hidden` blocks, `@media (max-width: 639.98px)` CSS rules, or mobile-only props. If you touch something that also affects `sm:` breakpoint classes, you broke the desktop.
2. **No logic changes.** `setYear`, `handleEventClick`, `handleFetch`, etc. are off-limits. Only layout, styling, and z-index are in scope.
3. **No new colours.** Use only `cyan-500`, `amber-400`, `indigo-400`, `slate-900`, `white/10`, and existing palette tokens.
4. **Test after every step.** Open DevTools → device emulator (iPhone 14, 390px wide) after each task. If something looks off, stop and fix before moving on.
5. **One file at a time.** Never edit two files simultaneously in the same commit. Finish → verify → commit → next.

---

## Current Problems to Fix (Diagnosed from code review)

| # | Problem | Root cause | Files affected |
|---|---------|-----------|----------------|
| 1 | Timeline slider floats in the wrong position — not sticky at the very bottom | `--sheet-extra-height` CSS var pushes it UP when BottomSheet opens, but the spacer + transform logic causes it to drift between the map and the sheet | `App.tsx` (mobile section), `BottomSheet.tsx`, `index.css` |
| 2 | BottomSheet backdrop blur bleeds through and weakens text readability | `liquid-glass-heavy` uses `backdrop-filter: blur(32px)` — fine on desktop where the panel is opaque over dark map, but on mobile the glass sits on top of content it itself obscures | `BottomSheet.tsx`, `index.css` |
| 3 | `EventsPanel` (old mobile sheet) still renders on mobile alongside the new `BottomSheet`, creating two overlapping drawers | `EventsPanel` has `fixed bottom-0` on mobile; it was never removed from the mobile code path | `App.tsx` (EventsPanel is inside `panelProps` + rendered inside BottomSheet, but EventsPanel's own CSS still targets mobile) |
| 4 | Chatbot FAB is displaced because `--sheet-height` CSS var is updated but `--bottom-offset` is stale in some states | `chat-fab-mobile` class in `index.css` uses `--bottom-offset` which is never set, it should use `--sheet-height` | `index.css`, `Chatbot.tsx` |
| 5 | Context Strip on mobile has no background — it blends into the map | `ContextStrip` has no opaque backing on mobile | `ContextStrip.tsx` |

---

## Step-by-Step Tasks

---

### Step 1 — Fix the Timeline: Pinned to Bottom, Above BottomSheet

**Goal:** The Timeline slider row must always sit at the bottom-most edge of the visible screen, directly above the collapsed BottomSheet handle. It must never move when the sheet opens.

**Why it's broken now:** The current code uses `transform: translateY(calc(-1px * var(--sheet-extra-height, 0)))` on the Timeline wrapper in `App.tsx` to push it up as the sheet opens. This creates an unreliable coupling. The correct approach is to render the Timeline *below* the BottomSheet in the flex stack with a fixed height, making it permanently visible.

#### 1.1 — Restructure the Mobile Container in `App.tsx`

Open `src/App.tsx` and find the `sm:hidden` layout block (lines ~306–434).

**Current structure:**
```
<div> (flex-col, mobile container)
  <header />           z-40
  <ContextStrip />
  <div> (map, flex-1) z-0
  <div> (Timeline)    z-30  ← moves with sheet
  <div> (spacer)
  <div> (absolute BottomSheet overlay) z-35
```

**Target structure:**
```
<div> (flex-col, mobile container)
  <header />           z-40
  <ContextStrip />
  <div> (map, flex-1) z-0
  <div> (BottomSheet, absolute, bottom=TIMELINE_HEIGHT) z-35
  <div> (Timeline, fixed height at bottom) z-30
```

**Exact changes to make:**

1. Remove the spacer div (`<div style={{ height: 'calc(60px + var(--safe-bottom))' ... }}>`) entirely.
2. Remove the `transform: translateY(...)` and `transition` props from the Timeline wrapper div (`id="tour-timeline-mobile"`). The Timeline must NOT move at all.
3. Change the Timeline wrapper from `style={{ height: 'auto', flexShrink: 0 }}` to `style={{ height: 'auto', flexShrink: 0, zIndex: 30 }}` — keep it as a flex child **below** the map and **below** the sheet in DOM order, but visually above via z-index.
4. Change the BottomSheet `absolute` wrapper so its `bottom` is offset by the Timeline height. Use a CSS variable `--timeline-height` for this (you'll set it via JS later, or use a fixed `60px` estimate).

**Guardrail:** After this change, scrub the timeline slider on mobile. The slider row must NOT move when you drag the BottomSheet up. The map should shrink from the top as the sheet grows; the slider stays fixed at the bottom.

---

#### 1.2 — Remove Sheet-Driven Timeline Movement in `BottomSheet.tsx`

Open `src/components/BottomSheet.tsx`.

Find the `useEffect` that sets `--sheet-extra-height` (lines ~533–542):

```tsx
useEffect(() => {
  if (isDragging) return;
  const raf = requestAnimationFrame(() => {
    document.documentElement.style.setProperty('--sheet-extra-height', `${extraHeight}`);
    document.documentElement.style.setProperty('--sheet-transition', transitionStr);
  });
  return () => cancelAnimationFrame(raf);
}, [extraHeight, transitionStr, isDragging]);
```

**Action:** Delete the two lines that set `--sheet-extra-height` and `--sheet-transition`. These variables are what drives the Timeline to move — we no longer want that. The Timeline is now stationary.

**Keep** the `--sheet-height` CSS variable update (used by Chatbot FAB). That's in a different `useEffect` (lines ~194–207) — do not touch it.

**Guardrail:** After this change, verify the Timeline still shows the slider correctly when the sheet is collapsed.

---

#### 1.3 — Clean Up `index.css` Timeline Coupling

Open `src/index.css`.

Find any rules referencing `--sheet-extra-height` or `--sheet-transition`. They were only used on the Timeline wrapper. Since the wrapper no longer uses them, these CSS variable declarations become dead code — they are fine to leave but do not add new ones.

---

### Step 2 — Fix the BottomSheet Blur: Reduce Opacity, Increase Solid Background

**Goal:** The BottomSheet on mobile must be legible. Text on the sheet (Era name, event titles) must have high contrast. The current `backdrop-filter: blur(32px)` at low opacity makes content behind bleed through.

**Why it's broken:** The `.liquid-glass-heavy` class (used on the BottomSheet root div in `BottomSheet.tsx`) has `background: rgba(15, 23, 42, 0.65)` — only 65% opacity. On desktop this is fine because the panel is layered over a relatively dark sidebar edge. On mobile it sits over the colourful map, so 35% of the map colours mix in and wash out text.

#### 2.1 — Add a Mobile-Specific Glass Override in `index.css`

Open `src/index.css`. In the `@layer utilities` block, add a new utility class specifically for the mobile sheet:

```css
/* Mobile bottom sheet: higher opacity so map doesn't bleed through */
@media (max-width: 639.98px) {
  .mobile-sheet-glass {
    background: rgba(8, 12, 28, 0.92);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.10);
    border-top: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }
}
```

Key changes from `liquid-glass-heavy`:
- Background opacity raised from `0.65` → `0.92` (near-solid dark base)
- Blur reduced from `32px` → `16px` (less bleed, faster GPU)
- Shadow direction flipped (upward shadow for a bottom sheet)

#### 2.2 — Apply `mobile-sheet-glass` to the BottomSheet Root

Open `src/components/BottomSheet.tsx`. Find the root `<div>` returned at the bottom of the component (around line 545):

```tsx
className="w-full relative liquid-glass-heavy border-t border-white/10 shadow-[0_-12px_40px_rgba(0,0,0,0.6)] overflow-hidden"
```

Replace `liquid-glass-heavy` with `mobile-sheet-glass`:

```tsx
className="w-full relative mobile-sheet-glass border-t border-white/10 overflow-hidden"
```

Note: Remove the `shadow-[...]` since the new class has its own shadow.

**Guardrail:** Open the app in mobile emulator. Navigate to a year that has colourful regions on the map (e.g., 550 BC — Achaemenid era). Drag the sheet to half-open. The text in the drag handle ("Achaemenid Empire") must be crisp white, not washed out by amber/purple from the map.

---

#### 2.3 — Fix the Handle Row Background

The drag handle row (with the pill and era name) currently inherits the glass blur from the parent. It's fine — no separate class needed. But check: if you can still see map colours significantly through the handle, add `bg-slate-950/30` as an additional class on the handle `<div>` (the one with class `drag-handle flex flex-col...`).

---

### Step 3 — Verify BottomSheet Z-Index Stack is Correct

**Goal:** Ensure the correct stacking order: TopBar (z-40) > BottomSheet (z-35) > Timeline (z-30) > Map (z-0).

Open `App.tsx`. Check each element in the `sm:hidden` block:

| Element | Current z-index | Correct? |
|---------|----------------|----------|
| `<header>` (TopBar) | `zIndex: 40` via `style` | ✅ Keep |
| Map wrapper `<div>` | `zIndex: 0` | ✅ Keep |
| Timeline wrapper `<div>` | `zIndex: 30` | ✅ Keep |
| BottomSheet outer `<div>` | `zIndex: 35` (on the `absolute inset-0` wrapper) | ✅ Keep |

The BottomSheet itself (inside the absolute wrapper) has `zIndex: 20` in style — this applies within the wrapper which is already at z-35, so effectively z-35. That's fine.

**Action:** Remove the inner sheet's `zIndex: 20` style entirely since it's redundant (the parent wrapper at z-35 already handles stacking correctly against Timeline at z-30 and header at z-40). This prevents any GPU compositing confusion.

---

### Step 4 — Fix Chatbot FAB Position on Mobile

**Goal:** Chatbot FAB stays above the BottomSheet handle (never hidden behind it).

**Current issue:** `index.css` has `.chat-fab-mobile` using `--bottom-offset` but BottomSheet sets `--sheet-height`. The variable name mismatch means the FAB uses a fallback `24px`.

#### 4.1 — Fix the CSS Variable Name

Open `src/index.css`. Find:

```css
@media (max-width: 639.98px) {
  .chat-fab-mobile {
    position: absolute !important;
    bottom: var(--bottom-offset, 24px) !important;
  }
}
```

Change `--bottom-offset` to `--sheet-height`:

```css
@media (max-width: 639.98px) {
  .chat-fab-mobile {
    position: absolute !important;
    bottom: var(--sheet-height, 60px) !important;
  }
}
```

The fallback changes from `24px` to `60px` (the collapsed sheet height) so even if the variable hasn't been set yet on first render, the FAB has a sane position.

#### 4.2 — Verify Chatbot.tsx Applies the Class

Open `src/components/Chatbot.tsx`. Check that the FAB button has the `chat-fab-mobile` class on mobile. If it uses Tailwind `bottom-*` classes, those override the CSS directly — you may need to check if `!important` is truly needed or if the class is even applied.

**Guardrail:** Pop open the sheet to `half` snap. The Chatbot FAB (robot/chat icon button) must float `sheet-height` pixels from the bottom of the screen — not hidden under the sheet.

---

### Step 5 — Fix the ContextStrip Visibility

**Goal:** The era one-liner strip between the TopBar and the map must be visually distinct — not a transparent overlay on the map.

**Current issue:** `ContextStrip.tsx` has no solid background colour. On mobile, the map starts immediately below the TopBar and the strip text is nearly invisible on some map colours.

#### 5.1 — Add Background to ContextStrip on Mobile

Open `src/components/ContextStrip.tsx`. Find the root element. Add mobile-specific styling:

```tsx
// Before — whatever the current root is:
<div className="px-4 py-1.5 text-xs ...">

// After — add a solid mobile background:
<div className="px-4 py-1.5 text-xs bg-slate-950/80 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none border-b border-white/5 sm:border-0 ...">
```

Key principle: `sm:bg-transparent` ensures desktop is NOT affected. `bg-slate-950/80` on mobile gives the strip its own backing.

**Guardrail:** After this change, the one-liner text (e.g., "Persian Empire at its zenith") must be clearly readable on all map era colours.

---

### Step 6 — Check and Remove Old `EventsPanel` Mobile Rendering

**Goal:** Confirm the old `EventsPanel` component's mobile CSS is not creating a ghost sheet.

**Issue diagnosed:** `EventsPanel.tsx` (lines 137–151) contains this class:

```tsx
className={`
  fixed sm:static    ← 'fixed' on mobile
  bottom-0 sm:bottom-auto
  ... z-20
  ${isOpen ? 'h-[70vh] sm:h-full' : 'h-16 sm:h-full'}
`}
```

This means `EventsPanel` renders as a `fixed bottom-0` element on mobile — potentially layering a second sheet on top of the BottomSheet if it's mounted on mobile.

#### 6.1 — Verify EventsPanel is NOT rendered on mobile

Open `App.tsx`. In the `sm:hidden` mobile section (lines ~306–434), verify that `<EventsPanel>` is **not** rendered. The mobile section uses `<BottomSheet>` which internally renders the same content. `<EventsPanel>` should only appear inside the `hidden sm:flex` desktop section.

If `EventsPanel` IS being rendered on mobile, wrap its usage in a `hidden sm:block` div or add a `window.innerWidth >= 640` guard.

**Guardrail:** In mobile emulator, open DevTools Elements panel. Search for `id="tour-events-panel-desktop"`. It must NOT be visible/rendered on mobile.

---

### Step 7 — Mobile Bottom Layout Final Check: Three-Row Stack

After all steps above, the final mobile layout from top to bottom must be:

```
┌─────────────────────────────┐ ← z-40, flexShrink: 0
│  TopBar (48px + safe-top)   │
├─────────────────────────────┤ ← z-auto, flexShrink: 0
│  ContextStrip (~28px)       │
├─────────────────────────────┤ ← flex: 1, minHeight: 0
│                             │
│      Map (fills space)      │
│                             │
├─────────────────────────────┤ ← z-30, flexShrink: 0
│  Timeline Slider (~60px)    │
└─────────────────────────────┘

      ↑ BottomSheet absolute-positioned
        bottom: 0 → sits over Timeline
        translateY animates 0 (full) ↔ (full-60px) collapsed
```

**Verify this checklist after all steps:**

- [ ] Drag the slider — map changes year, sheet and Timeline do NOT move
- [ ] Drag the BottomSheet handle up to `half` — map shrinks visually (by flex), Timeline stays at bottom
- [ ] Drag the BottomSheet to `full` — map is hidden, Timeline is still visible at bottom of screen
- [ ] Text in the handle ("Era name · year") is crisp white, not washed
- [ ] Chatbot FAB is above the sheet handle at all snap positions
- [ ] ContextStrip text is legible when the map is any colour
- [ ] No duplicate sheet / ghost drawer visible

---

## File Change Summary

| File | What changes | What stays the same |
|------|-------------|---------------------|
| `src/App.tsx` | Remove `--sheet-extra-height` transform on Timeline wrapper; remove spacer div | All desktop JSX, all state, all event handlers |
| `src/components/BottomSheet.tsx` | Remove `--sheet-extra-height` + `--sheet-transition` setProperty calls; remove redundant `zIndex: 20` from root div | All drag logic, snap logic, content rendering |
| `src/index.css` | Add `.mobile-sheet-glass` utility; fix `--bottom-offset` → `--sheet-height` in `.chat-fab-mobile` | All desktop utilities, desktop glass classes |
| `src/components/ContextStrip.tsx` | Add `bg-slate-950/80 sm:bg-transparent` + `backdrop-blur-sm sm:backdrop-blur-none` | All content, desktop rendering |
| `src/components/Chatbot.tsx` | Verify `chat-fab-mobile` class is applied (read-only check, likely no edit) | All chat logic |

---

## What NOT to Touch

- `src/components/EventsPanel.tsx` — desktop only; the mobile path uses `BottomSheet.tsx`
- `src/components/Timeline.tsx` — the slider component itself is correct; only its wrapper in `App.tsx` changes
- `src/components/Map.tsx` — no changes
- Any file in `src/data/`, `src/services/`, `src/utils/`, `src/types/` — zero changes to data or logic
- `src/components/DetailModal.tsx`, `src/components/SearchModal.tsx`, etc. — modals are unaffected

---

## Commit Order (Recommended)

```
git commit -m "fix(mobile): pin timeline to bottom, remove sheet-driven translate"
git commit -m "fix(mobile): increase sheet background opacity for readability"
git commit -m "fix(mobile): correct chatbot FAB CSS variable name"
git commit -m "fix(mobile): add opaque backing to mobile ContextStrip"
```

One commit per logical fix. If something breaks, you can revert a single commit without losing other work.
