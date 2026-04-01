# Living Atlas — Map Refactor & Region Architecture
## Junior Team Implementation Plan

> **Version:** 1.0  
> **Scope:** Leaflet migration + 12-region data architecture + caching refactor  
> **Prerequisite:** Read this entire document before touching any file.  
> **Rule:** Never work on more than one phase at a time. Each phase must pass its checklist before the next begins.

---

## Part 1 — Guardrail File

> **This section must be completed FIRST — before any migration work begins.**  
> The guardrail file is a snapshot of every current behaviour that must still work after the refactor. If any item on this list breaks at any point, stop and fix it before continuing.

### Step 1A — Generate the guardrail snapshot

Before touching any file, run through the app manually and record the current state of every interaction listed below. Screenshot each one. Store them in `/docs/guardrails/screenshots/`.

```
GUARDRAIL CHECKLIST — verify each item works NOW, then re-verify after EVERY phase

MAP INTERACTIONS
[ ] Clicking a region opens the historian panel with correct era content
[ ] Hovering a region shows a visual highlight state
[ ] Clicking outside a region deselects / closes panel
[ ] Clicking a Vazir dot (gold) opens the Vazir profile in the panel
[ ] Clicking a Historical Figure dot (purple) opens figure detail
[ ] Clicking a Historical Event dot (teal) opens event detail
[ ] Clicking a Cultural Heritage dot (coral/blue) opens heritage detail
[ ] Zoom in button increases zoom level
[ ] Zoom out button decreases zoom level
[ ] Map can be panned by drag (desktop) and touch (mobile)

TIMELINE INTERACTIONS
[ ] Scrubbing the timeline changes region colours on the map
[ ] Scrubbing to a new major era updates the context strip text
[ ] Scrubbing to a new major era updates the historian panel content
[ ] Event dots on the timeline track are visible
[ ] Clicking "Who ruled here?" fires the AI call and populates rulers
[ ] The result of "Who ruled here?" is cached — firing it again at the same year does NOT make a second AI call

PANEL / DRAWER INTERACTIONS
[ ] Historian panel is open by default on desktop
[ ] Before/after era chips navigate the timeline correctly
[ ] Vazir row is visible in the panel and tappable
[ ] Events / Figures / Heritage tabs switch content correctly
[ ] BYOK footnote is visible at the bottom of the drawer
[ ] On mobile: drawer collapsed state shows era name + one-liner + 3 quick-action buttons
[ ] On mobile: swipe up opens the drawer to half state
[ ] On mobile: timeline is always visible regardless of drawer state

LANGUAGE
[ ] EN/FA toggle switches all UI text including map labels
[ ] RTL layout is correct in Farsi mode
[ ] Era names in context strip display in correct language
```

### Step 1B — Document the critical functions

Open the following files and record the exact current function signatures. If the signature changes during refactor, you have broken the contract.

**`src/services/geminiService.ts`**
```
Record these exactly as they exist today:
- fetchHistoricalDataForYear(year, lang) → return type
- Current cache key format for political data: data_${year}_${lang}
- CACHE_MAP type definition (lines 7–28)
- The exact 11 region IDs currently in the prompt (lines 494–514)
```

**`src/components/Map.tsx`** (or wherever the map lives)
```
Record these exactly:
- Props interface — every prop the map component accepts
- The onRegionClick handler signature
- The onVazirClick handler signature  
- How dynastyColor is currently derived from year + region
- How zoom state is currently managed
```

**`src/App.tsx`**
```
Record these exactly:
- handleYearContextClick — full signature
- onJumpToYear — full signature
- How selectedRegion state is managed
- How selectedFigure state is managed
- The panelProps object shape passed to EventsPanel
```

> **Rule:** If you change any of these function signatures, you must update every caller. Use TypeScript — the compiler will tell you every call site that breaks.

---

## Part 2 — Data Architecture (Do this before any map code)

> **This phase has zero risk.** It creates new files only. Nothing existing is touched.

### Phase 0 — Author `src/data/regions.ts`

This is the most important file in the entire refactor. Every subsequent phase depends on it.

**What it must contain for each of the 12 regions:**

```typescript
export interface City {
  name: string;
  nameLocal?: string;           // historical name (e.g. "Abarshahr" for Nishapur)
  lat: number;
  lng: number;
  tier: 1 | 2 | 3;             // 1 = always show at zoom 2, 2 = zoom 2.5, 3 = zoom 3+
}

export interface Region {
  id: string;                   // stable machine ID — never change this
  zone: ZoneId;                 // which of the 5 zones this belongs to
  displayName: { en: string; fa: string };
  aliases: string[];            // historical names — max 4, used in AI prompts
  anchorCities: City[];         // all cities for this region
  centroid: { lat: number; lng: number }; // for dot placement at default zoom
  eraPresence: Partial<Record<EraId, 'heartland' | 'province' | 'contested' | 'frontier'>>;
}
```

**The 5 zones:**
```typescript
export type ZoneId =
  | 'core_plateau'       // Fars, Jibal, Khuzestan
  | 'western_lowlands'   // Mesopotamia
  | 'north_caucasus'     // Azerbaijan, The Caucasus, Caspian Coast
  | 'eastern_expanse'    // Khorasan, Sistan, Makran
  | 'northeast_frontier' // Transoxiana, Chorasmia
```

**The 12 region IDs (use these exact strings everywhere — do not invent new IDs):**
```
fars | jibal | khuzestan | mesopotamia | azerbaijan |
caucasus | caspian_coast | khorasan | sistan | makran |
transoxiana | chorasmia
```

**The 15 era IDs (use these exact strings in eraPresence — do not invent new IDs):**
```
median | achaemenid | seleucid | parthian | sasanian |
early_islamic | umayyad | abbasid | samanid | buyid |
ghaznavid | seljuk | ilkhanate | timurid | safavid
```

**Anchor cities — minimum required per region (use real lat/lng from Google Maps or Wikipedia):**

| Region | Required anchor cities (tier 1) |
|--------|-------------------------------|
| fars | Persepolis (29.935, 52.891), Shiraz (29.591, 52.583) |
| jibal | Ecbatana/Hamadan (34.799, 48.515), Isfahan (32.661, 51.680), Ray (35.594, 51.453) |
| khuzestan | Susa (32.188, 48.258), Shushtar (32.045, 48.856) |
| mesopotamia | Babylon (32.536, 44.420), Ctesiphon (33.094, 44.581), Baghdad (33.341, 44.401) |
| azerbaijan | Tabriz (38.080, 46.291), Ardabil (38.249, 48.301) |
| caucasus | Derbent (42.059, 48.288), Barda (40.376, 47.138) |
| caspian_coast | Amul (36.470, 52.357), Sari (36.563, 53.060) |
| khorasan | Nishapur (36.213, 58.796), Merv (37.633, 62.183), Herat (34.353, 62.204), Balkh (36.756, 66.897) |
| sistan | Zaranj (30.958, 61.862) |
| makran | Kerman (30.285, 57.078) |
| transoxiana | Samarkand (39.627, 66.975), Bukhara (39.774, 64.429) |
| chorasmia | Urgench (41.550, 60.633), Khiva (41.378, 60.362) |

**Checklist for Phase 0:**
```
[ ] regions.ts created with all 12 region objects
[ ] All 12 region IDs match the exact strings in the table above
[ ] Every region has at minimum 2 anchor cities with verified lat/lng
[ ] Every region has centroid coordinates
[ ] eraPresence matrix authored for at minimum: achaemenid, sasanian, abbasid, seljuk, safavid
[ ] TypeScript compiles with zero errors
[ ] No existing files were modified
```

---

## Part 3 — Caching Refactor

> **Risk level: Low.** Changes only `geminiService.ts`. All other files untouched.  
> **Do this before the Leaflet migration.** It is independent and immediately valuable.

### Phase 1 — Upgrade the cache strategy

**Current state:** Cache key is `data_${year}_${lang}`. Every year is a separate entry. Page refresh clears everything.

**Target state:** Cache key is `rulers_${eraId}_${lang}`. One entry per era per language. Persisted to localStorage. 15 total entries cover the entire timeline.

**File to modify:** `src/services/geminiService.ts`

#### Step 1 — Add ERA_BOUNDARIES array

Add this above the CACHE_MAP declaration. Use the era IDs from Part 2.

```typescript
// src/services/geminiService.ts

interface EraBoundary {
  id: EraId;
  start: number;   // year — use negative for BC (e.g. -550 for 550 BC)
  end: number;
}

const ERA_BOUNDARIES: EraBoundary[] = [
  { id: 'median',        start: -678, end: -550 },
  { id: 'achaemenid',    start: -550, end: -330 },
  { id: 'seleucid',      start: -330, end: -247 },
  { id: 'parthian',      start: -247, end:  224  },
  { id: 'sasanian',      start:  224, end:  651  },
  { id: 'early_islamic', start:  632, end:  661  },
  { id: 'umayyad',       start:  661, end:  750  },
  { id: 'abbasid',       start:  750, end:  1258 },
  { id: 'samanid',       start:  819, end:  999  },
  { id: 'buyid',         start:  934, end:  1062 },
  { id: 'ghaznavid',     start:  977, end:  1186 },
  { id: 'seljuk',        start: 1037, end:  1194 },
  { id: 'ilkhanate',     start: 1256, end:  1335 },
  { id: 'timurid',       start: 1370, end:  1507 },
  { id: 'safavid',       start: 1501, end:  1736 },
];

// Note: overlapping eras are intentional — multiple powers coexisted.
// getEraKey returns the DOMINANT era for cache purposes.
```

#### Step 2 — Add the cache key helper

```typescript
function getEraKey(year: number, lang: string): string {
  // Find the era where this year falls
  // For overlapping eras, prefer the one with the smallest range (most specific)
  const matching = ERA_BOUNDARIES
    .filter(e => year >= e.start && year <= e.end)
    .sort((a, b) => (a.end - a.start) - (b.end - b.start));

  const era = matching[0];
  return era
    ? `rulers_${era.id}_${lang}`
    : `rulers_year_${year}_${lang}`; // fallback for between-era years
}
```

#### Step 3 — Upgrade CACHE_MAP to use localStorage persistence

```typescript
// Replace the current in-memory Map with this hybrid:

const MEMORY_CACHE = new Map<string, any>();

function getCached(key: string): any | null {
  // 1. Check memory first (fastest)
  if (MEMORY_CACHE.has(key)) return MEMORY_CACHE.get(key);

  // 2. Check localStorage (survives page refresh)
  try {
    const stored = localStorage.getItem(`atlas_cache_${key}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      MEMORY_CACHE.set(key, parsed); // warm the memory cache
      return parsed;
    }
  } catch (e) {
    // localStorage unavailable — continue without it
  }
  return null;
}

function setCached(key: string, value: any): void {
  MEMORY_CACHE.set(key, value);
  try {
    localStorage.setItem(`atlas_cache_${key}`, JSON.stringify(value));
  } catch (e) {
    // localStorage full or unavailable — memory cache still works
  }
}
```

#### Step 4 — Update fetchHistoricalDataForYear to use new cache

```typescript
// In fetchHistoricalDataForYear:

// OLD:
// const cacheKey = `data_${year}_${lang}`;
// if (CACHE_MAP.has(cacheKey)) return CACHE_MAP.get(cacheKey);

// NEW:
const cacheKey = getEraKey(year, lang);
const cached = getCached(cacheKey);
if (cached) return cached;

// ... AI call happens ...

// OLD:
// CACHE_MAP.set(cacheKey, result);

// NEW:
setCached(cacheKey, result);
```

#### Step 5 — Update the prompt to use region manifest from regions.ts

```typescript
// Import regions at top of geminiService.ts
import { regions } from '../data/regions';

// Replace the hardcoded 11-region list in the prompt with:
const regionManifest = regions.map(r => ({
  id: r.id,
  knownAs: r.aliases.slice(0, 2),    // max 2 aliases — keeps tokens low
  anchor: r.anchorCities[0].name     // most famous city — geographic anchor
}));

// Prompt structure:
const prompt = `
Year: ${year}.
For each region in the list below, return:
- id (use exactly as given)
- dynasty (ruling power name)  
- ruler (primary ruler name, or null if unknown)
- confidence: "high" or "low" (low = contested or unclear)

Return a JSON array only. No explanation. No markdown.
Regions: ${JSON.stringify(regionManifest)}
`.trim();
```

**Checklist for Phase 1:**
```
[ ] ERA_BOUNDARIES array added with all 15 eras
[ ] getEraKey() returns correct era ID for test years:
    - Year -500 → 'achaemenid'
    - Year 400 → 'sasanian'  
    - Year 900 → 'abbasid'
    - Year 1100 → 'seljuk'
[ ] getCached() checks memory first, then localStorage
[ ] setCached() writes to both memory and localStorage
[ ] fetchHistoricalDataForYear uses new cache key
[ ] Firing "Who ruled here?" twice at same year = 1 AI call total
[ ] Refreshing page and firing "Who ruled here?" = 0 AI calls (localStorage hit)
[ ] All 12 region IDs appear in the prompt (not the old 11)
[ ] TypeScript compiles with zero errors
[ ] All guardrail checklist items still pass
```

---

## Part 4 — Leaflet Migration

> **Risk level: High.** This replaces the map component entirely.  
> **Strategy: Build alongside, not on top of.** Create `MapLeaflet.tsx` as a parallel component. Do not modify `Map.tsx` until the new component passes all guardrail checks.

### Phase 2 — Install and configure Leaflet

```bash
npm install leaflet react-leaflet
npm install -D @types/leaflet
```

Add to your global CSS (e.g. `src/index.css`):
```css
@import 'leaflet/dist/leaflet.css';

/* Dark topographic theme — matches manuscript aesthetic */
.leaflet-tile-pane {
  filter: brightness(0.45) sepia(0.2) saturate(0.6) contrast(1.2);
}

.leaflet-container {
  background-color: #0a1410 !important;
  font-family: inherit;
}

/* Hide default Leaflet controls — we use custom ones */
.leaflet-control-zoom {
  display: none;
}

.leaflet-control-attribution {
  font-size: 9px;
  opacity: 0.3;
  background: transparent !important;
  color: rgba(201, 169, 110, 0.4) !important;
}
```

### Phase 3 — Author the GeoJSON region file

**This is the critical path item. Do not skip ahead to Phase 4 until this is complete.**

**Method — use AWMC as base data:**

1. Go to `https://awmc.unc.edu/awmc/map_data/`
2. Download the relevant ancient world boundary datasets
3. Open each in `geojson.io` to visualise and edit
4. Simplify polygons to max 50 coordinate pairs per region (more causes performance issues)
5. Add the `id` property to each GeoJSON feature — must match the 12 region IDs exactly

**Required GeoJSON structure:**
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": "fars",
        "zone": "core_plateau"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [[52.0, 27.5], [54.5, 27.5], [54.5, 31.5], [52.0, 31.5], [52.0, 27.5]]
        ]
      }
    }
  ]
}
```

> **GeoJSON coordinate order:** `[longitude, latitude]` — this is the opposite of Leaflet's `[lat, lng]`. Do not mix them up.

**Save as:** `src/data/regions.geojson`

**Checklist for Phase 3:**
```
[ ] All 12 region IDs present in the GeoJSON file
[ ] Each feature has an 'id' property matching the exact region ID strings
[ ] No polygon has more than 60 coordinate pairs (performance)
[ ] Regions do not have large gaps between them at default zoom
[ ] Coordinates are in [longitude, latitude] order (GeoJSON spec)
[ ] File validated at geojson.io with no errors shown
[ ] Regions visually cover the correct geographic area (spot-check
    against a modern map: Persepolis should be inside 'fars', 
    Baghdad inside 'mesopotamia', Samarkand inside 'transoxiana')
```

### Phase 4 — Build MapLeaflet.tsx

Create `src/components/MapLeaflet.tsx`. Accept the **exact same props interface** as the current `Map.tsx`. This is mandatory — it allows a one-line swap in `App.tsx`.

```typescript
// src/components/MapLeaflet.tsx

import { MapContainer, TileLayer, GeoJSON, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import { GeoJsonObject } from 'geojson';
import regionsGeoJSON from '../data/regions.geojson';
import { regions } from '../data/regions';

// IMPORTANT: Props interface must be identical to current Map.tsx props
// Copy the interface from Map.tsx exactly — do not add or remove props
interface MapLeafletProps {
  // paste current Map.tsx props here
}

// Helper: map dynasty/ruler to colour — reuse existing colour logic
function getDynastyFillColor(dynastyId: string, year: number): string {
  // Copy the existing colour derivation logic from Map.tsx
  // Do NOT change the colour output — same year must produce same colour
}

// Helper: zoom controls that call Leaflet's imperative API
function ZoomControls() {
  const map = useMap();
  return (
    <div className="absolute left-3 top-1/2 -translate-y-1/2 z-[1000] flex flex-col gap-1">
      <button onClick={() => map.zoomIn()}  className="...existing zoom button styles...">+</button>
      <button onClick={() => map.zoomOut()} className="...existing zoom button styles...">−</button>
    </div>
  );
}

export default function MapLeaflet(props: MapLeafletProps) {
  const { onRegionClick, year, dynastyColors, vazirs, figures, events, ...rest } = props;

  // Style function for GeoJSON — recomputed when year changes
  const regionStyle = (feature: any) => {
    const color = getDynastyFillColor(feature.properties.id, year);
    return {
      fillColor: color,
      fillOpacity: 0.35,   // lower than current — terrain bleeds through
      color: color,
      weight: 1.5,
      opacity: 0.7,
    };
  };

  // Interaction handler for GeoJSON features
  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: () => onRegionClick(feature.properties.id),
      mouseover: (e: any) => {
        e.target.setStyle({ fillOpacity: 0.55, weight: 2.5 });
      },
      mouseout: (e: any) => {
        e.target.setStyle({ fillOpacity: 0.35, weight: 1.5 });
      },
    });
  };

  return (
    <MapContainer
      center={[32, 53]}   // centred on Greater Iran
      zoom={5}
      minZoom={4}
      maxZoom={9}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}  // we use custom ZoomControls component
    >
      <TileLayer
        url="https://api.thunderforest.com/landscape/{z}/{x}/{y}{r}.png?apikey=YOUR_KEY"
        attribution='&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Region polygons — key forces remount on era/colour change */}
      <GeoJSON
        key={`regions-${year}`}
        data={regionsGeoJSON as GeoJsonObject}
        style={regionStyle}
        onEachFeature={onEachFeature}
      />

      {/* Vazir dots — gold, tier 1 priority */}
      {vazirs.map(v => (
        <CircleMarker
          key={v.id}
          center={[v.lat, v.lng]}
          radius={6}
          pathOptions={{ color: '#0a1410', weight: 1.5, fillColor: '#c9a96e', fillOpacity: 1 }}
          eventHandlers={{ click: () => props.onVazirClick(v.id) }}
        >
          <Tooltip direction="right" offset={[8, 0]}>
            <span className="text-xs font-cinzel">{v.name}</span>
          </Tooltip>
        </CircleMarker>
      ))}

      {/* Historical Figure dots — purple */}
      {/* Historical Event dots  — teal   */}
      {/* Cultural Heritage dots — coral  */}
      {/* Pattern is identical to Vazir dots above — repeat for each type */}

      <ZoomControls />
    </MapContainer>
  );
}
```

**Checklist for Phase 4:**
```
[ ] MapLeaflet.tsx accepts identical props to current Map.tsx
[ ] Tile layer renders with dark topographic filter applied
[ ] All 12 region polygons visible and correctly coloured
[ ] Clicking a region calls onRegionClick with correct region ID
[ ] Hover state changes polygon opacity (not colour)
[ ] Scrubbing timeline changes polygon colours (key prop forces remount)
[ ] Vazir dots visible at correct lat/lng positions
[ ] Clicking a Vazir dot calls onVazirClick with correct ID
[ ] Zoom in/out buttons work
[ ] Map pans on drag
[ ] All guardrail checklist items pass with MapLeaflet replacing Map
```

### Phase 5 — Swap in App.tsx

Only do this after Phase 4 checklist is 100% complete.

```typescript
// src/App.tsx

// OLD:
// import Map from './components/Map';

// NEW:
import Map from './components/MapLeaflet';

// That's the entire change in App.tsx.
// The props interface is identical so nothing else changes.
```

Keep `Map.tsx` in the codebase for two sprints. Do not delete it until the Leaflet version has been live for at least one sprint with no reported issues.

**Final checklist:**
```
[ ] App.tsx imports MapLeaflet
[ ] Full guardrail checklist passes
[ ] Tested on Chrome desktop
[ ] Tested on Safari mobile (iOS)
[ ] Tested on Chrome mobile (Android)
[ ] Map loads in under 3 seconds on a standard connection
[ ] No console errors in production build
[ ] Map.tsx kept in codebase but unused (rollback option)
```

---

## Part 5 — Zoom-threshold City Rendering

> **Do this last.** Only start after Phase 5 is complete and stable.

Add zoom-aware city dot rendering to `MapLeaflet.tsx`:

```typescript
// Inside MapLeaflet component:
const [currentZoom, setCurrentZoom] = useState(5);

// Listen for zoom changes
function ZoomListener() {
  const map = useMap();
  useEffect(() => {
    map.on('zoomend', () => setCurrentZoom(map.getZoom()));
    return () => { map.off('zoomend'); };
  }, [map]);
  return null;
}

// City rendering — threshold-based
{regions.flatMap(r => r.anchorCities).map(city => {
  const visible =
    (city.tier === 1 && currentZoom >= 6) ||
    (city.tier === 2 && currentZoom >= 7) ||
    (city.tier === 3 && currentZoom >= 8);

  if (!visible) return null;

  return (
    <CircleMarker
      key={city.name}
      center={[city.lat, city.lng]}
      radius={3}
      pathOptions={{
        color: '#0a1410',
        weight: 1,
        fillColor: 'rgba(201,169,110,0.5)',
        fillOpacity: 1
      }}
    >
      <Tooltip direction="top" offset={[0, -4]}>
        <span className="text-xs">{city.name}</span>
      </Tooltip>
    </CircleMarker>
  );
})}
```

---

## Summary — What to build in what order

| Phase | What | Files changed | Risk |
|-------|------|--------------|------|
| 0 | Author `regions.ts` | New file only | None |
| 1 | Cache refactor | `geminiService.ts` only | Low |
| 2 | Install Leaflet | `package.json`, `index.css` | None |
| 3 | Author `regions.geojson` | New file only | None |
| 4 | Build `MapLeaflet.tsx` | New file only | None |
| 5 | Swap in `App.tsx` | One line change | Medium |
| 6 | City zoom thresholds | `MapLeaflet.tsx` | Low |

**Golden rule: One phase at a time. Full guardrail check between each phase. Never skip ahead.**

---

## Reference — Tile layer options

| Style | URL | Notes |
|-------|-----|-------|
| Landscape terrain (recommended) | `https://api.thunderforest.com/landscape/{z}/{x}/{y}{r}.png?apikey=YOUR_KEY` | 150K tiles/mo free |
| Minimal dark | `https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png` | No labels — good fallback |
| Shaded relief | `https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}` | Esri, free tier |

Apply the CSS filter to all tile layers:
```css
.leaflet-tile-pane {
  filter: brightness(0.45) sepia(0.2) saturate(0.6) contrast(1.2);
}
```

## Reference — GeoJSON sources for historical boundaries

| Source | URL | What to download |
|--------|-----|-----------------|
| AWMC (Ancient World Mapping Center) | `awmc.unc.edu/awmc/map_data/` | Ancient world provinces |
| Pleiades | `pleiades.stoa.org` | Ancient place data with coordinates |
| geojson.io | `geojson.io` | Draw and validate custom polygons |

---

