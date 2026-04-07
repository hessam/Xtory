/**
 * FULL E2E SIMULATION: "Who Ruled Here?" for year 919 AD
 * 
 * This script replicates the EXACT pipeline the app uses:
 *   1. Load historical JSON files → build anchors
 *   2. Build the region manifest
 *   3. Construct the AI prompt (printed in full)
 *   4. Call the real Gemini API
 *   5. Parse and validate the response
 *   6. Show what would be added to App state (rulers, dynasties, events)
 *   7. Show what would render on the map
 * 
 * Usage: GEMINI_KEY=your_key npx tsx src/diagnostics/full_simulation.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const YEAR = 919;
const LANG = 'en';
const API_KEY = process.env.GEMINI_KEY || '';

if (!API_KEY) {
  console.error('❌ Missing API key. Run with: GEMINI_KEY=your_key npx tsx src/diagnostics/full_simulation.ts');
  process.exit(1);
}

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 1: Load historical data (mirrors historicalDataIndex.ts)
// ═══════════════════════════════════════════════════════════════════════════════

console.log('═'.repeat(80));
console.log('FULL E2E SIMULATION — "Who Ruled Here?" — Year 919 AD');
console.log('═'.repeat(80));

interface RawEntry {
  region_id?: string;
  dynasty_name?: string;
  approximate_years_active?: string;
  approximate_years?: string;
  confidence?: string;
}

interface Anchor {
  regionId: string;
  dynastyName: string;
  startYear: number;
  endYear: number;
  confidence: string;
  sourceFile: string;
}

function parseYearToken(token: string, isBC: boolean): number {
  const cleaned = token.replace(/^c\.\s*/, '').replace(/s$/i, '').trim();
  const num = parseInt(cleaned);
  if (isNaN(num)) return NaN;
  return isBC ? -Math.abs(num) : Math.abs(num);
}

function parseYearRange(raw: string): { start: number; end: number } | null {
  if (!raw || typeof raw !== 'string') return null;
  if (raw.includes(';')) {
    const parts = raw.split(';').map(s => parseYearRange(s.trim())).filter(Boolean) as { start: number; end: number }[];
    if (parts.length === 0) return null;
    return { start: Math.min(...parts.map(p => p.start)), end: Math.max(...parts.map(p => p.end)) };
  }
  const cleaned = raw.trim().replace(/\+$/, '');
  const isBC = /BC/i.test(cleaned);
  const stripped = cleaned.replace(/\s*(BC|AD)\s*/gi, '').trim();
  const dashMatch = stripped.split(/[–—]/);

  if (dashMatch.length === 2) {
    const startRaw = dashMatch[0].trim();
    const endRaw = dashMatch[1].trim();

    let startNum: number;
    const startCentury = startRaw.match(/(\d+)(?:st|nd|rd|th)\s+century/i);
    if (startCentury) {
      startNum = (parseInt(startCentury[1]) - 1) * 100;
      if (isBC) startNum = -startNum;
    } else {
      startNum = parseYearToken(startRaw, isBC);
    }

    let endNum: number;
    const endCentury = endRaw.match(/(\d+)(?:st|nd|rd|th)\s+century/i);
    if (endCentury) {
      endNum = parseInt(endCentury[1]) * 100 - 1;
      if (isBC) endNum = -endNum;
    } else {
      endNum = parseYearToken(endRaw, isBC);
    }

    if (isNaN(startNum) || isNaN(endNum)) return null;
    return { start: Math.min(startNum, endNum), end: Math.max(startNum, endNum) };
  }

  const singleCentury = stripped.match(/(\d+)(?:st|nd|rd|th)\s+century/i);
  if (singleCentury) {
    const c = parseInt(singleCentury[1]);
    return { start: isBC ? -(c * 100 - 1) : (c - 1) * 100, end: isBC ? -((c - 1) * 100) : c * 100 - 1 };
  }

  const singleNum = parseYearToken(stripped, isBC);
  if (!isNaN(singleNum)) {
    if (/\d+s$/i.test(stripped)) {
      const base = Math.floor(singleNum / 10) * 10;
      return { start: isBC ? -(base + 9) : base, end: isBC ? -base : base + 9 };
    }
    return { start: singleNum, end: singleNum };
  }
  return null;
}

function normalizeDynastyName(name: string): string {
  return name.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
}

const DATA_DIR = path.resolve(__dirname, '../../docs/historical_data');
const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));

const allRaw: Anchor[] = [];
for (const file of files) {
  try {
    const entries: RawEntry[] = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf-8'));
    if (!Array.isArray(entries)) continue;
    for (const e of entries) {
      const yr = e.approximate_years_active || e.approximate_years;
      if (!e.region_id || !e.dynasty_name || !yr) continue;
      const range = parseYearRange(yr);
      if (!range) continue;
      allRaw.push({ regionId: e.region_id, dynastyName: e.dynasty_name, startYear: range.start, endYear: range.end, confidence: (e.confidence || 'medium').toLowerCase(), sourceFile: file });
    }
  } catch { continue; }
}

// Fuzzy dedup
const seen = new Map<string, Anchor>();
const anchors: Anchor[] = [];
for (const a of allRaw) {
  const key = `${a.regionId}|${normalizeDynastyName(a.dynastyName)}`;
  const existing = seen.get(key);
  if (!existing) { seen.set(key, a); anchors.push(a); }
  else if ((a.endYear - a.startYear) > (existing.endYear - existing.startYear)) {
    const idx = anchors.indexOf(existing);
    if (idx !== -1) anchors[idx] = a;
    seen.set(key, a);
  }
}

const yearAnchors = anchors.filter(a => YEAR >= a.startYear && YEAR <= a.endYear);

console.log(`\n📦 PHASE 1: Historical Data Loaded`);
console.log(`   Total files: ${files.length}`);
console.log(`   Total raw entries: ${allRaw.length}`);
console.log(`   After dedup: ${anchors.length}`);
console.log(`   Active at year ${YEAR}: ${yearAnchors.length} dynasties`);

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 2: Build Region Manifest (mirrors geminiService.ts)
// ═══════════════════════════════════════════════════════════════════════════════

// Simplified region list (mirrors regions.ts)
const REGIONS = [
  { id: 'fars', aliases: ['Pars', 'Persis'], anchorCities: [{ name: 'Shiraz' }, { name: 'Istakhr' }] },
  { id: 'jibal', aliases: ['Media', 'Western Iran'], anchorCities: [{ name: 'Isfahan' }, { name: 'Hamadan' }] },
  { id: 'khuzestan', aliases: ['Susiana', 'Elam'], anchorCities: [{ name: 'Shushtar' }] },
  { id: 'mesopotamia', aliases: ['Iraq', 'Babylon'], anchorCities: [{ name: 'Baghdad' }, { name: 'Ctesiphon' }] },
  { id: 'azerbaijan', aliases: ['Atropatene'], anchorCities: [{ name: 'Tabriz' }, { name: 'Ardabil' }] },
  { id: 'caucasus', aliases: ['Armenia', 'Arran'], anchorCities: [{ name: 'Dvin' }, { name: 'Baku' }] },
  { id: 'caspian_coast', aliases: ['Tabaristan', 'Mazandaran'], anchorCities: [{ name: 'Amol' }, { name: 'Sari' }, { name: 'Noor' }] },
  { id: 'khorasan', aliases: ['Greater Khorasan'], anchorCities: [{ name: 'Nishapur' }, { name: 'Merv' }] },
  { id: 'sistan', aliases: ['Drangiana', 'Nimruz'], anchorCities: [{ name: 'Zaranj' }] },
  { id: 'makran', aliases: ['Gedrosia'], anchorCities: [{ name: 'Panjgur' }] },
  { id: 'transoxiana', aliases: ['Mavarannahr'], anchorCities: [{ name: 'Bukhara' }, { name: 'Samarkand' }] },
  { id: 'chorasmia', aliases: ['Khwarezm'], anchorCities: [{ name: 'Gurganj' }] },
];

const regionManifest = REGIONS.map(r => {
  const regionAnchors = yearAnchors.filter(a => a.regionId === r.id);
  return {
    id: r.id,
    knownAs: r.aliases.slice(0, 3),
    knownRulers: [],
    verifiedDynasties: regionAnchors.map(a => ({
      dynastyName: a.dynastyName,
      yearsActive: `${a.startYear < 0 ? Math.abs(a.startYear) + ' BC' : a.startYear + ' AD'}–${a.endYear < 0 ? Math.abs(a.endYear) + ' BC' : a.endYear + ' AD'}`,
      confidence: a.confidence
    })),
    anchorCity: r.anchorCities[0]?.name,
    anchorCities: r.anchorCities.map(c => ({ name: c.name, historical: [] }))
  };
});

console.log(`\n📋 PHASE 2: Region Manifest`);
for (const r of regionManifest) {
  const count = r.verifiedDynasties.length;
  const label = count > 0
    ? r.verifiedDynasties.map(d => d.dynastyName).join(', ')
    : '(Zone B — no curated data)';
  console.log(`   ${r.id}: ${count} dynasties → ${label}`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 3: Build the exact prompt
// ═══════════════════════════════════════════════════════════════════════════════

// Format anchors table
const byRegion: Record<string, Anchor[]> = {};
for (const a of yearAnchors) {
  if (!byRegion[a.regionId]) byRegion[a.regionId] = [];
  byRegion[a.regionId].push(a);
}
const anchorsTable = Object.entries(byRegion).map(([rid, anch]) => {
  const entries = anch.map(a => {
    const sy = a.startYear < 0 ? `${Math.abs(a.startYear)} BC` : `${a.startYear} AD`;
    const ey = a.endYear < 0 ? `${Math.abs(a.endYear)} BC` : `${a.endYear} AD`;
    return `${a.dynastyName} (${sy}–${ey}, ${a.confidence})`;
  }).join('; ');
  return `  ${rid}: ${entries}`;
}).join('\n');

const regionCount = regionManifest.filter(r => r.verifiedDynasties.length > 0).length;

const prompt = `You are a strict data-entry historian mapping the political borders in Greater Iran for the year ${YEAR} AD.
   Your goal is to provide high-fidelity historical data while strictly avoiding fabrication (hallucination).

   ═══ VERIFIED HISTORICAL DATA (from curated research files) ═══
   The following dynasties are CONFIRMED active at year ${YEAR} AD across ${regionCount} regions:

${anchorsTable}

   ═══ INSTRUCTIONS ═══
   
   ZONE A — Regions with "verifiedDynasties" in the manifest:
   These dynasties are documented fact. For EACH dynasty listed under a region:
   - Identify the SPECIFIC ruler of that dynasty at year ${YEAR} AD.
   - Return a separate JSON entry for each concurrent dynasty in the same region.
   - Do NOT invent dynasties that are not in the verified list for these regions.
   - If multiple dynasties are listed for one region (e.g. Bavandid + Justanid + Paduspanid in caspian_coast), return one entry per dynasty.
   
   ZONE B — Regions with EMPTY "verifiedDynasties" (no curated data):
   - You may identify rulers based on your historical knowledge.
   - Mark confidence as "low" unless you are certain.
   
   GRANULARITY: Different cities in the same region could be held by rival houses. Use the anchorCities to identify localized seats of power.
   
   Return compact JSON ONLY. Every regionId must come from the manifest.
   
   Regions Manifest: ${JSON.stringify(regionManifest)}
 
   Required fields for each region object:
   - rulerNameEn, rulerNameFa, rulerTitleEn, rulerTitleFa
   - dynastyNameEn, dynastyNameFa
   - dynastyColorFamily: "persian" | "arab" | "turkic" | "greek" | "nomadic" | "foreign" | "semitic"
   - dynastyClassification: e.g., "Empire", "Kingdom", "Principality", "Emirate"
   - capitalCityEn, capitalCityFa
   - startDate (integer, negative for BC), endDate (integer, negative for BC)
   - regionId (from manifest), status: "Direct Control" | "Vassal State" | "Contested/Warzone" | "Sphere of Influence"
   - confidence: "high" if from verifiedDynasties, "low" if obscure.`;

console.log(`\n📝 PHASE 3: Prompt (${prompt.length} chars)`);
console.log('─'.repeat(80));
console.log(prompt);
console.log('─'.repeat(80));

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 4: Call Gemini API
// ═══════════════════════════════════════════════════════════════════════════════

console.log(`\n🤖 PHASE 4: Calling Gemini API...`);
const startTime = Date.now();

const { GoogleGenAI } = await import('@google/genai');
const ai = new GoogleGenAI({ apiKey: API_KEY });

const regionIds = REGIONS.map(r => r.id);
const response = await ai.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: prompt,
  config: {
    responseMimeType: "application/json",
    responseSchema: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          rulerNameEn: { type: "STRING" },
          rulerNameFa: { type: "STRING" },
          rulerTitleEn: { type: "STRING" },
          rulerTitleFa: { type: "STRING" },
          dynastyNameEn: { type: "STRING" },
          dynastyNameFa: { type: "STRING" },
          dynastyColorFamily: { type: "STRING", enum: ["persian", "arab", "turkic", "greek", "nomadic", "foreign", "semitic"] },
          dynastyClassification: { type: "STRING" },
          capitalCityEn: { type: "STRING" },
          capitalCityFa: { type: "STRING" },
          startDate: { type: "INTEGER" },
          endDate: { type: "INTEGER" },
          regionId: { type: "STRING", enum: regionIds },
          status: { type: "STRING", enum: ["Direct Control", "Vassal State", "Contested/Warzone", "Sphere of Influence"] },
          confidence: { type: "STRING", enum: ["high", "low"] }
        },
        required: ["rulerNameEn", "rulerNameFa", "rulerTitleEn", "rulerTitleFa", "dynastyNameEn", "dynastyNameFa", "dynastyColorFamily", "dynastyClassification", "capitalCityEn", "capitalCityFa", "startDate", "endDate", "regionId", "status", "confidence"]
      }
    }
  }
});

const elapsed = Date.now() - startTime;
const rawText = response.text || "[]";

console.log(`   ✅ Response received in ${(elapsed / 1000).toFixed(1)}s`);
console.log(`   Raw text length: ${rawText.length} chars`);

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 5: Parse the response
// ═══════════════════════════════════════════════════════════════════════════════

console.log(`\n📊 PHASE 5: Raw AI Response`);
console.log('─'.repeat(80));

const data = JSON.parse(rawText);
console.log(JSON.stringify(data, null, 2));
console.log('─'.repeat(80));
console.log(`Total entries returned: ${data.length}`);

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 6: Simulate App.tsx handleAddDynamicData
// ═══════════════════════════════════════════════════════════════════════════════

console.log(`\n🏗️  PHASE 6: State Mutations (App.tsx handleAddDynamicData)`);
console.log('─'.repeat(80));

const COLOR_MAP: Record<string, string> = {
  persian: '🟣', arab: '🟢', turkic: '🟠', greek: '🔵', nomadic: '🟤', foreign: '🔴', semitic: '⚫'
};

const createdDynasties: string[] = [];
const createdRulers: string[] = [];
const createdEvents: { regionId: string; rulerId: string; status: string; capital?: string }[] = [];

for (let i = 0; i < data.length; i++) {
  const item = data[i];
  const dynastyId = `dyn_${item.dynastyNameEn.toLowerCase().replace(/\s+/g, '_')}`;
  const rulerId = `rul_${item.rulerNameEn.toLowerCase().replace(/\s+/g, '_')}`;
  const eventId = `ai_${YEAR}_${i}_${Date.now()}`;

  if (!createdDynasties.includes(dynastyId)) {
    createdDynasties.push(dynastyId);
    console.log(`   ${COLOR_MAP[item.dynastyColorFamily] || '⬜'} NEW DYNASTY: ${item.dynastyNameEn} (${item.dynastyNameFa}) → ID: ${dynastyId}`);
    console.log(`      colorFamily: ${item.dynastyColorFamily}, classification: ${item.dynastyClassification}`);
  }

  if (!createdRulers.includes(rulerId)) {
    createdRulers.push(rulerId);
    console.log(`   👑 NEW RULER: ${item.rulerNameEn} (${item.rulerNameFa}) — ${item.rulerTitleEn} → ID: ${rulerId}`);
    console.log(`      Reign: ${item.startDate}–${item.endDate}, Dynasty: ${dynastyId}`);
  }

  createdEvents.push({
    regionId: item.regionId,
    rulerId,
    status: item.status,
    capital: item.capitalCityEn
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 7: Map & Timeline rendering simulation
// ═══════════════════════════════════════════════════════════════════════════════

console.log(`\n🗺️  PHASE 7: Map Rendering Simulation`);
console.log('─'.repeat(80));

// Group events by region
const eventsByRegion: Record<string, typeof createdEvents> = {};
for (const ev of createdEvents) {
  if (!eventsByRegion[ev.regionId]) eventsByRegion[ev.regionId] = [];
  eventsByRegion[ev.regionId].push(ev);
}

for (const [regionId, events] of Object.entries(eventsByRegion).sort()) {
  console.log(`\n   📍 ${regionId.toUpperCase()}`);
  
  const primary = events.find(e => e.status === 'Direct Control') || events[0];
  const secondary = events.filter(e => e !== primary);
  
  const primaryItem = data.find((d: any) => `rul_${d.rulerNameEn.toLowerCase().replace(/\s+/g, '_')}` === primary.rulerId);
  const color = COLOR_MAP[primaryItem?.dynastyColorFamily] || '⬜';
  
  console.log(`      ${color} PRIMARY FILL: ${primaryItem?.dynastyNameEn} — ${primaryItem?.rulerNameEn}`);
  console.log(`         Status: ${primary.status}`);
  console.log(`         Polygon color: ${primaryItem?.dynastyColorFamily} family`);
  
  if (primary.capital) {
    console.log(`         👑 CAPITAL MARKER: ${primary.capital} (Crown icon on map)`);
  }

  for (const sec of secondary) {
    const secItem = data.find((d: any) => `rul_${d.rulerNameEn.toLowerCase().replace(/\s+/g, '_')}` === sec.rulerId);
    const secColor = COLOR_MAP[secItem?.dynastyColorFamily] || '⬜';
    console.log(`      ${secColor} SECONDARY LAYER: ${secItem?.dynastyNameEn} — ${secItem?.rulerNameEn}`);
    console.log(`         Status: ${sec.status}, opacity: reduced overlay`);
    if (sec.capital) {
      console.log(`         👑 CAPITAL MARKER: ${sec.capital}`);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// PHASE 8: BottomSheet ruler cards
// ═══════════════════════════════════════════════════════════════════════════════

console.log(`\n\n📱 PHASE 8: Bottom Sheet Ruler Cards (horizontal scroll)`);
console.log('─'.repeat(80));

const rulerCards = [...new Set(data.map((d: any) => `rul_${d.rulerNameEn.toLowerCase().replace(/\s+/g, '_')}`))];
for (const rulerId of rulerCards) {
  const rulerEvents = createdEvents.filter(e => e.rulerId === rulerId);
  const item = data.find((d: any) => `rul_${d.rulerNameEn.toLowerCase().replace(/\s+/g, '_')}` === rulerId);
  const color = COLOR_MAP[item?.dynastyColorFamily] || '⬜';
  const regionCount = rulerEvents.length;
  
  console.log(`   ${color} ┌─────────────────────────────────┐`);
  console.log(`   ${color} │ 👑 ${item?.rulerNameEn?.padEnd(28) || ''}│`);
  console.log(`   ${color} │    ${item?.dynastyNameEn?.padEnd(28) || ''}│`);
  console.log(`   ${color} │    ${String(regionCount + ' region(s) controlled').padEnd(28)}│`);
  console.log(`   ${color} └─────────────────────────────────┘`);
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════════════════════════════════════════════

console.log(`\n\n${'═'.repeat(80)}`);
console.log('SIMULATION SUMMARY');
console.log('═'.repeat(80));
console.log(`   Year: ${YEAR} AD`);
console.log(`   API response time: ${(elapsed / 1000).toFixed(1)}s`);
console.log(`   Entries returned: ${data.length}`);
console.log(`   Unique dynasties created: ${createdDynasties.length}`);
console.log(`   Unique rulers created: ${createdRulers.length}`);
console.log(`   Regions covered: ${Object.keys(eventsByRegion).length} / ${REGIONS.length}`);
console.log(`   Regions NOT covered: ${REGIONS.filter(r => !eventsByRegion[r.id]).map(r => r.id).join(', ') || 'none'}`);

// Validation: check if AI respected the verified dynasties
console.log(`\n   ANCHOR COMPLIANCE CHECK:`);
for (const r of regionManifest) {
  if (r.verifiedDynasties.length === 0) continue;
  const aiEntries = data.filter((d: any) => d.regionId === r.id);
  for (const vd of r.verifiedDynasties) {
    const found = aiEntries.some((e: any) => 
      normalizeDynastyName(e.dynastyNameEn).includes(normalizeDynastyName(vd.dynastyName).split(' ')[0])
    );
    console.log(`   ${found ? '✅' : '❌'} ${r.id} → ${vd.dynastyName}: ${found ? 'AI included it' : 'AI MISSED IT'}`);
  }
}

console.log(`\n${'═'.repeat(80)}`);
console.log('END OF SIMULATION');
console.log('═'.repeat(80));
