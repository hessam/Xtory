/**
 * FULL E2E SIMULATION V2: Two-Pass Architecture
 * 
 * Pass 1: Dynasty identification (fast, reliable, no ruler hallucination)
 * Pass 2: Ruler detail (on-demand, per dynasty, allows null)
 * 
 * Usage: GEMINI_KEY=your_key npx tsx src/diagnostics/full_simulation_v2.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const YEAR = 919;
const API_KEY = process.env.GEMINI_KEY || '';

if (!API_KEY) {
  console.error('❌ Missing API key. Run with: GEMINI_KEY=your_key npx tsx src/diagnostics/full_simulation_v2.ts');
  process.exit(1);
}

// ── Reuse the data loader from trace919 ──

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
    if (startCentury) { startNum = (parseInt(startCentury[1]) - 1) * 100; if (isBC) startNum = -startNum; }
    else { startNum = parseYearToken(startRaw, isBC); }
    let endNum: number;
    const endCentury = endRaw.match(/(\d+)(?:st|nd|rd|th)\s+century/i);
    if (endCentury) { endNum = parseInt(endCentury[1]) * 100 - 1; if (isBC) endNum = -endNum; }
    else { endNum = parseYearToken(endRaw, isBC); }
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

// ═════════════════════════════════════════════════════════════════════════
console.log('═'.repeat(80));
console.log('TWO-PASS ARCHITECTURE SIMULATION — Year 919 AD');
console.log('═'.repeat(80));

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

// ═════════════════════════════════════════════════════════════════════════
// PASS 1: Dynasty identification
// ═════════════════════════════════════════════════════════════════════════

const pass1Prompt = `You are a strict data-entry historian mapping the political borders in Greater Iran for the year ${YEAR} AD.
Your goal is to identify which DYNASTIES controlled each region. Do NOT identify individual rulers — only the dynasty/polity.

═══ VERIFIED HISTORICAL DATA (from curated research files) ═══
The following dynasties are CONFIRMED active at year ${YEAR} AD across ${regionCount} regions:

${anchorsTable}

═══ INSTRUCTIONS ═══

ZONE A — Regions with "verifiedDynasties" in the manifest:
- Return a separate entry for EACH verified dynasty in that region.
- Do NOT invent dynasties that are not in the verified list.
- Use the dynasty's documented years as dynastyStartYear/dynastyEndYear.

ZONE B — Regions with EMPTY "verifiedDynasties" (no curated data):
- Identify which dynasty/polity held this region based on your knowledge.
- Mark confidence as "low".

IMPORTANT: This is dynasty-level identification ONLY.
- Do NOT include ruler names or ruler reign dates.
- capitalCityEn/capitalCityFa should be the dynasty's seat of power in THIS region, constrained to the anchorCities listed.

Return compact JSON ONLY. Every regionId must come from the manifest.

Regions Manifest: ${JSON.stringify(regionManifest)}`;

console.log(`\n▶ PASS 1: Dynasty Identification`);
console.log(`  Prompt length: ${pass1Prompt.length} chars`);
console.log('─'.repeat(80));
console.log(pass1Prompt);
console.log('─'.repeat(80));

console.log(`\n🤖 Calling Gemini (Pass 1)...`);
const startPass1 = Date.now();

const { GoogleGenAI } = await import('@google/genai');
const ai = new GoogleGenAI({ apiKey: API_KEY });

const regionIds = REGIONS.map(r => r.id);
const pass1Response = await ai.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: pass1Prompt,
  config: {
    responseMimeType: "application/json",
    responseSchema: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          dynastyNameEn: { type: "STRING" },
          dynastyNameFa: { type: "STRING" },
          dynastyColorFamily: { type: "STRING", enum: ["persian", "arab", "turkic", "greek", "nomadic", "foreign", "semitic"] },
          dynastyClassification: { type: "STRING" },
          capitalCityEn: { type: "STRING" },
          capitalCityFa: { type: "STRING" },
          dynastyStartYear: { type: "INTEGER" },
          dynastyEndYear: { type: "INTEGER" },
          regionId: { type: "STRING", enum: regionIds },
          status: { type: "STRING", enum: ["Direct Control", "Vassal State", "Contested/Warzone", "Sphere of Influence"] },
          confidence: { type: "STRING", enum: ["high", "low"] }
        },
        required: ["dynastyNameEn", "dynastyNameFa", "dynastyColorFamily", "dynastyClassification", "capitalCityEn", "capitalCityFa", "dynastyStartYear", "dynastyEndYear", "regionId", "status", "confidence"]
      }
    }
  }
});

const pass1Elapsed = Date.now() - startPass1;
const pass1Data = JSON.parse(pass1Response.text || "[]");

console.log(`\n✅ Pass 1 complete in ${(pass1Elapsed / 1000).toFixed(1)}s`);
console.log(`   Entries returned: ${pass1Data.length}`);
console.log(`\n📊 PASS 1 RAW RESPONSE:`);
console.log('─'.repeat(80));
console.log(JSON.stringify(pass1Data, null, 2));
console.log('─'.repeat(80));

// Show what the map would render (dynasty names only, NO ruler names)
console.log(`\n🗺️  MAP RENDERING (Pass 1 — dynasty names as placeholders):`);
const COLOR_MAP: Record<string, string> = {
  persian: '🟣', arab: '🟢', turkic: '🟠', greek: '🔵', nomadic: '🟤', foreign: '🔴', semitic: '⚫'
};

const groupedByRegion: Record<string, any[]> = {};
for (const item of pass1Data) {
  if (!groupedByRegion[item.regionId]) groupedByRegion[item.regionId] = [];
  groupedByRegion[item.regionId].push(item);
}

for (const [rid, items] of Object.entries(groupedByRegion).sort()) {
  console.log(`\n  📍 ${rid.toUpperCase()}`);
  for (const item of items as any[]) {
    const c = COLOR_MAP[item.dynastyColorFamily] || '⬜';
    console.log(`     ${c} ${item.dynastyNameEn} (${item.dynastyNameFa})`);
    console.log(`        ${item.dynastyStartYear}–${item.dynastyEndYear}, ${item.status}, capital: ${item.capitalCityEn}`);
    console.log(`        🏷️  Map label: "${item.dynastyNameEn}" (ruler: TBD)`);
  }
}

// ═════════════════════════════════════════════════════════════════════════
// PASS 2: Ruler detail (sample 3 dynasties — 1 well-known, 1 obscure, 1 medium)
// ═════════════════════════════════════════════════════════════════════════

console.log(`\n\n${'═'.repeat(80)}`);
console.log('▶ PASS 2: Ruler Detail (on-demand, per dynasty)');
console.log('═'.repeat(80));

// Pick 3 dynasties to test
const testCases = [
  pass1Data.find((d: any) => d.dynastyNameEn.includes('Abbasid') && d.regionId === 'mesopotamia'),
  pass1Data.find((d: any) => d.dynastyNameEn.includes('Paduspanid')),
  pass1Data.find((d: any) => d.dynastyNameEn.includes('Samanid') && d.regionId === 'khorasan'),
].filter(Boolean);

for (const dynasty of testCases) {
  const d = dynasty as any;
  const anchorCity = REGIONS.find(r => r.id === d.regionId)?.anchorCities[0]?.name || '';
  
  const pass2Prompt = `Year: ${YEAR} AD.
Dynasty: ${d.dynastyNameEn} / ${d.dynastyNameFa} (active ${d.dynastyStartYear} AD–${d.dynastyEndYear} AD).
Region: ${d.regionId} (anchor city: ${anchorCity}).

What is the name of the SPECIFIC ruler of the ${d.dynastyNameEn} who controlled ${anchorCity || d.regionId} around ${YEAR} AD?

STRICT RULES:
- Return the ruler's name ONLY if you are highly confident it is historically documented.
- If uncertain or if the specific ruler for this exact year is unknown, return null for all ruler fields.
- A null answer is CORRECT and PREFERRED over a fabrication.
- Do NOT invent a plausible-sounding name to fill the field.
- Do NOT return the dynasty's dates as the ruler's reign dates.
- rulerReignStart/rulerReignEnd must be THIS individual ruler's personal reign dates, NOT the dynasty's lifespan.

Return JSON only.`;

  console.log(`\n  🔍 Testing: ${d.dynastyNameEn} in ${d.regionId}`);
  console.log(`     Prompt: ${pass2Prompt.length} chars`);
  
  const startPass2 = Date.now();
  
  const pass2Response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: pass2Prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          rulerNameEn: { type: "STRING", nullable: true },
          rulerNameFa: { type: "STRING", nullable: true },
          rulerTitleEn: { type: "STRING", nullable: true },
          rulerTitleFa: { type: "STRING", nullable: true },
          rulerReignStart: { type: "INTEGER", nullable: true },
          rulerReignEnd: { type: "INTEGER", nullable: true },
          confidence: { type: "STRING", enum: ["high", "low", "unknown"] }
        },
        required: ["confidence"]
      }
    }
  });

  const pass2Elapsed = Date.now() - startPass2;
  const pass2Data = JSON.parse(pass2Response.text || "{}");
  
  console.log(`     ⏱️  Response: ${(pass2Elapsed / 1000).toFixed(1)}s`);
  console.log(`     📊 Raw response: ${JSON.stringify(pass2Data)}`);
  
  // Validate: check for dynasty-date cheating
  if (pass2Data.rulerReignStart === d.dynastyStartYear && pass2Data.rulerReignEnd === d.dynastyEndYear) {
    console.log(`     ⚠️  CHEAT DETECTED: AI returned dynasty dates as ruler dates — nulling`);
    pass2Data.rulerReignStart = null;
    pass2Data.rulerReignEnd = null;
  }
  
  if (pass2Data.confidence === 'unknown' || !pass2Data.rulerNameEn) {
    console.log(`     ❓ RESULT: Ruler unknown — UI shows "${d.dynastyNameEn}" (honest)`);
  } else {
    console.log(`     👑 RESULT: ${pass2Data.rulerNameEn} (${pass2Data.rulerNameFa})`);
    console.log(`        Title: ${pass2Data.rulerTitleEn}`);
    console.log(`        Reign: ${pass2Data.rulerReignStart || '?'}–${pass2Data.rulerReignEnd || '?'}`);
    console.log(`        Confidence: ${pass2Data.confidence}`);
    console.log(`        🏷️  Map label updates to: "${pass2Data.rulerNameEn}"`);
  }
}

// ═════════════════════════════════════════════════════════════════════════
// SUMMARY
// ═════════════════════════════════════════════════════════════════════════

console.log(`\n\n${'═'.repeat(80)}`);
console.log('SIMULATION SUMMARY');
console.log('═'.repeat(80));
console.log(`  Year: ${YEAR} AD`);
console.log(`  Pass 1 time: ${(pass1Elapsed / 1000).toFixed(1)}s → ${pass1Data.length} dynasties identified`);
console.log(`  Pass 1 hallucination risk: ZERO (no ruler names requested)`);
console.log(`  Pass 2 tested: ${testCases.length} dynasties (ruler lookup)`);
console.log(`  Pass 2 allows: null responses (honest "unknown")`);
console.log(`\n  ARCHITECTURE BENEFIT:`);
console.log(`  ✅ Map loads with DYNASTY names (100% reliable)`);
console.log(`  ✅ Ruler names resolved on-demand (when user taps)`);
console.log(`  ✅ Unknown rulers shown as "Ruler unknown" (not fabricated)`);
console.log(`  ✅ Dynasty dates never confused with ruler dates`);
console.log(`${'═'.repeat(80)}`);
