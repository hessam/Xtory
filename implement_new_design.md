# Implementation Plan: The Living Atlas Refinement

> **Finalized Strategy · Version 2.0**  
> Focus: Docked layouts, narrative discoverability, and Iranian resilience.  
> **Constraint: Design-system agnostic — no new visuals, only layout, behavioral, and data updates.**

---

## 1. Executive Summary
This re-architecture transforms the application from a "map with floating overlapping widgets" into a **structured, docked dashboard**. The core philosophy is **"The Historian Speaks First,"** ensuring that era narratives, Vazir stories, and the timeline are always visible and distinct, without fighting for screen real estate.

---

## 2. Sprint 0: Layout Re-architecture (The Foundation)
*Goal: Restructure `App.tsx` from absolute-positioned overlays to a Flex/Grid docked layout.*

### 2.1 Desktop 3-Column Collapsible Layout
*   **Top Navigation**: Full width.
*   **Collapsible State**: Introduce `isLeftSidebarOpen` and `isRightSidebarOpen` states in `App.tsx` (similar to VS Code) to let users expand/collapse panels and focus solely on the map.
*   **Left Sidebar (Fixed ~250px)**: Extract the Legend from `Map.tsx` into its own panel. Add the "Map Dots" key. Can be collapsed to the left edge.
*   **Center Viewer (Flex-1)**: `Map.tsx` container. Expands dynamically when sidebars are collapsed. Move BYOK banner to `absolute bottom-6 left-1/2`.
*   **Right Sidebar (Fixed ~350px)**: Convert `EventsPanel.tsx` to a permanent docked column holding the Historian card. Can be collapsed to the right edge.
*   **Bottom Track**: `Timeline.tsx` fixed to the bottom edge below the columns.

### 2.2 Mobile 3-Row Resizing Layout
*   **Top Row (Map)**: `Map.tsx` inside a container whose `flex-basis` shrinks when the drawer opens (creating the "thumbnail map" effect).
*   **Middle Row (Historian Panel)**: `BottomSheet.tsx` logic converts to a resizable middle container. It houses the handle, the narrative, and the grid of action links.
*   **Bottom Row (Timeline)**: Pinned permanently to the bottom floor. It is never obscured by the middle panel.

---

## 3. Sprint 1: Orientation & Narrative
*Goal: Remove the "Silence" on load and scrub.*

### 3.1 Data Layer: `historianCards.ts` [NEW]
*   Author 15 era cards with contiguous year ranges.
*   Fields: `eraName`, `yearRange`, `situationOneLiner`, `fullSummary`, `prevEraId`, `nextEraId`.
*   Fallback logic: Nearest era midpoint handles transition years.

### 3.2 UI: Context Strip & Panel Content
*   **Desktop Strip**: Spans below the top header, showing the current `situationOneLiner`.
*   **Mobile Strip**: The Drawer "Handle" shows the current era name and `situationOneLiner` when collapsed.
*   **Panel Content**: Replace Horizontal Tabs with a vertical stack: Era Summary → Connections Chips → Action Grid (Figures ↗, Events ↗, Heritage ↗).

---

## 4. Sprint 2: Discovery & Visual Evidence
*Goal: Surfacing "Human" history and Iranian resilience.*

### 4.1 Data Layer: `vazirs.ts` [NEW]
*   Author 6-10 priority entries (Yahya Barmaki, Nizam al-Mulk, Burzoe, etc.).

### 4.2 Map: `VazirDot.tsx` & Marker Logic
*   Colour: **`amber-400` / `orange-500`** (Warm human contrast vs cool political map).
*   Implement `18px` clustering logic to group multiple Vazirs in the same region (shows a count badge).

### 4.3 Timeline: Scrubber Dots & Presence Indicator
*   **Chapter Dots**: Tiny markers on the minimap track (Red battle, Green cultural, Amber Vazir).
*   **Persian Presence Indicator**: A thin waveform/bar on the timeline track whose thickness maps dynamically to `% of regions under colorFamily === 'persian'`.

---

## 5. Sprint 3: Conversion & Narrative Gate
*Goal: Making the AI upgrade emotionally compelling.*

### 5.1 Data Layer: `byokTeasers.ts` [NEW]
*   Author 15 era-specific teasers (e.g., *"In 600 AD, an Iranian Vazir was translating Indian wisdom... Unlock this story."*).
*   **i18n Rule**: EN first; Farsi optional (fallback to EN).

### 5.2 UI: The "Narrative Gate" Redesign
*   **Location**: Anchored to the bottom center of the map viewport.
*   **Blurred Skeleton Preview**: Above the teaser text, render 3-4 blurred skeleton lines visualizing the locked, rich history waiting behind the API key.
*   **Action**: Instead of "Add Key", button uses contextual CTA (e.g., "Explore his story ↗").

---

## 6. CSS & Integration Principles
*   **No New Colours**: Strictly use existing `cyan-500`, `amber-400`, `indigo-400`, and `slate-900` palettes.
*   **Glass Containers**: Docked columns inherit the existing `liquid-glass-heavy` / `backdrop-blur-xl` treatments to retain the premium feel.
*   **Animation**: Mobile map resize uses Framer Motion `layout` transitions for buttery smooth thumbnail scaling.
