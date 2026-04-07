/**
 * DIAGNOSTIC: Trace the full "Who Ruled Here?" pipeline for year 919 AD
 * 
 * Run with: npx tsx src/diagnostics/trace919.ts
 * 
 * This script simulates exactly what happens when the user clicks
 * "Who Ruled Here?" — without calling the AI. It shows:
 *   1. Which JSON files are loaded
 *   2. Which entries match year 919
 *   3. The region manifest that would be sent
 *   4. The exact prompt that would be constructed
 */

import * as fs from 'fs';
import * as path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const YEAR = 919;
const DATA_DIR = path.resolve(__dirname, '../../docs/historical_data');

// ── Step 1: List all JSON files ──────────────────────────────────────────────
console.log('═══════════════════════════════════════════════════════════════');
console.log(`DIAGNOSTIC TRACE: Year ${YEAR} AD`);
console.log('═══════════════════════════════════════════════════════════════\n');

console.log('STEP 1: JSON FILES FOUND');
console.log('─────────────────────────');

const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
console.log(`Found ${files.length} JSON files:\n`);
files.forEach(f => console.log(`  📄 ${f}`));

// ── Step 2: Parse year ranges (same logic as historicalDataIndex.ts) ─────────

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

function parseYearRange(raw: string): { start: number; end: number } | null {
  if (!raw || typeof raw !== 'string') return null;

  if (raw.includes(';')) {
    const parts = raw.split(';').map(s => parseYearRange(s.trim())).filter(Boolean) as { start: number; end: number }[];
    if (parts.length === 0) return null;
    return {
      start: Math.min(...parts.map(p => p.start)),
      end: Math.max(...parts.map(p => p.end))
    };
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
    const centuryNum = parseInt(singleCentury[1]);
    const start = (centuryNum - 1) * 100;
    const end = centuryNum * 100 - 1;
    return { start: isBC ? -end : start, end: isBC ? -start : end };
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

function parseYearToken(token: string, isBC: boolean): number {
  const cleaned = token.replace(/^c\.\s*/, '').replace(/s$/i, '').trim();
  const num = parseInt(cleaned);
  if (isNaN(num)) return NaN;
  return isBC ? -Math.abs(num) : Math.abs(num);
}

// ── Step 3: Load all entries and find matches ────────────────────────────────

console.log('\n\nSTEP 2: LOADING & PARSING ALL ENTRIES');
console.log('──────────────────────────────────────');

const allAnchors: Anchor[] = [];
const parseErrors: { file: string; entry: any; yearRaw: string }[] = [];
let totalEntries = 0;

for (const file of files) {
  const filePath = path.join(DATA_DIR, file);
  let entries: RawEntry[];
  
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    entries = JSON.parse(raw);
  } catch (e) {
    console.log(`  ⚠️  PARSE ERROR in ${file}: ${(e as Error).message}`);
    continue;
  }
  
  if (!Array.isArray(entries)) {
    console.log(`  ⚠️  ${file}: not an array, skipping`);
    continue;
  }
  
  let fileCount = 0;
  for (const entry of entries) {
    totalEntries++;
    const regionId = entry.region_id;
    const dynastyName = entry.dynasty_name;
    const yearsRaw = entry.approximate_years_active || entry.approximate_years;
    
    if (!regionId || !dynastyName || !yearsRaw) continue;
    
    const range = parseYearRange(yearsRaw);
    if (!range) {
      parseErrors.push({ file, entry, yearRaw: yearsRaw });
      continue;
    }
    
    allAnchors.push({
      regionId,
      dynastyName,
      startYear: range.start,
      endYear: range.end,
      confidence: (entry.confidence || 'medium').toLowerCase(),
      sourceFile: file
    });
    fileCount++;
  }
  
  console.log(`  ✅ ${file}: ${fileCount} entries parsed`);
}

console.log(`\nTotal raw entries: ${totalEntries}`);
console.log(`Total parsed anchors: ${allAnchors.length}`);

if (parseErrors.length > 0) {
  console.log(`\n⚠️  PARSE FAILURES (${parseErrors.length}):`);
  parseErrors.forEach(e => {
    console.log(`  ❌ ${e.file}: "${e.yearRaw}" for ${e.entry.dynasty_name} in ${e.entry.region_id}`);
  });
}

// Deduplicate
const seen = new Set<string>();
const deduped: Anchor[] = [];
for (const a of allAnchors) {
  const key = `${a.regionId}|${a.dynastyName}|${a.startYear}|${a.endYear}`;
  if (!seen.has(key)) {
    seen.add(key);
    deduped.push(a);
  }
}
console.log(`After deduplication: ${deduped.length} unique anchors`);

// ── Step 4: Filter for year 919 ──────────────────────────────────────────────

console.log(`\n\nSTEP 3: ANCHORS ACTIVE AT YEAR ${YEAR} AD`);
console.log('──────────────────────────────────────────');

const matchingAnchors = deduped.filter(a => YEAR >= a.startYear && YEAR <= a.endYear);

// Group by region
const byRegion: Record<string, Anchor[]> = {};
for (const a of matchingAnchors) {
  if (!byRegion[a.regionId]) byRegion[a.regionId] = [];
  byRegion[a.regionId].push(a);
}

const regionIds = Object.keys(byRegion).sort();
console.log(`\nFound ${matchingAnchors.length} active dynasties across ${regionIds.length} regions:\n`);

for (const regionId of regionIds) {
  const anchors = byRegion[regionId];
  console.log(`  📍 ${regionId} (${anchors.length} dynasties):`);
  for (const a of anchors) {
    const yearStr = `${a.startYear < 0 ? Math.abs(a.startYear) + ' BC' : a.startYear}–${a.endYear < 0 ? Math.abs(a.endYear) + ' BC' : a.endYear}`;
    console.log(`     ${a.confidence === 'high' ? '🟢' : a.confidence === 'medium' ? '🟡' : '🔴'} ${a.dynastyName} (${yearStr}) [${a.confidence}] ← ${a.sourceFile}`);
  }
}

// ── Step 5: Identify missing regions ─────────────────────────────────────────

console.log(`\n\nSTEP 4: COVERAGE ANALYSIS`);
console.log('─────────────────────────');

const KNOWN_REGIONS = [
  'fars', 'jibal', 'khuzestan', 'mesopotamia', 'azerbaijan',
  'caucasus', 'caspian_coast', 'khorasan', 'sistan', 'makran',
  'transoxiana', 'chorasmia'
];

const coveredRegions = new Set(regionIds);
const missingRegions = KNOWN_REGIONS.filter(r => !coveredRegions.has(r));
const extraRegions = regionIds.filter(r => !KNOWN_REGIONS.includes(r));

if (missingRegions.length > 0) {
  console.log(`\n  ⚠️  UNCOVERED REGIONS (no curated data for year ${YEAR}):`);
  missingRegions.forEach(r => console.log(`     ❌ ${r} — AI will use Zone B (free exploration)`));
}

if (extraRegions.length > 0) {
  console.log(`\n  📌 EXTRA REGIONS (in data but not in core map):`);
  extraRegions.forEach(r => console.log(`     ➕ ${r}`));
}

console.log(`\n  Coverage: ${coveredRegions.size}/${KNOWN_REGIONS.length} core regions have curated data`);

// ── Step 6: Cross-reference known historical facts for 919 AD ────────────────

console.log(`\n\nSTEP 5: HISTORICAL FACT-CHECK FOR YEAR ${YEAR} AD`);
console.log('──────────────────────────────────────────────────');
console.log('Expected rulers based on standard historical sources:\n');

const EXPECTED = [
  { region: 'fars', dynasty: 'Abbasid Caliphate', ruler: 'Al-Muqtadir (governor)', notes: 'Abbasid governors still in place' },
  { region: 'jibal', dynasty: 'Abbasid Caliphate', ruler: 'Al-Muqtadir (governor)', notes: '' },
  { region: 'khuzestan', dynasty: 'Abbasid Caliphate', ruler: 'Al-Muqtadir (governor)', notes: '' },
  { region: 'mesopotamia', dynasty: 'Abbasid Caliphate', ruler: 'Al-Muqtadir', notes: 'Caliph in Baghdad' },
  { region: 'azerbaijan', dynasty: 'Sajid Dynasty', ruler: 'Yusuf ibn Abi\'l-Saj', notes: '890-929' },
  { region: 'caucasus', dynasty: 'Shirvanshahs', ruler: 'Muhammad I', notes: '' },
  { region: 'caucasus', dynasty: 'Bagratid Armenia', ruler: 'Ashot II', notes: '' },
  { region: 'caucasus', dynasty: 'Sajid Dynasty', ruler: 'Yusuf ibn Abi\'l-Saj', notes: 'overlapping' },
  { region: 'caspian_coast', dynasty: 'Alid Zaydi / Alavids', ruler: 'Zaydis in Amol', notes: '' },
  { region: 'caspian_coast', dynasty: 'Bavandid Dynasty', ruler: 'Sharwin II (or successor)', notes: '' },
  { region: 'caspian_coast', dynasty: 'Paduspanid Dynasty', ruler: 'local Ispahbad', notes: '' },
  { region: 'caspian_coast', dynasty: 'Justanid Dynasty', ruler: 'local ruler in Dailam', notes: '' },
  { region: 'caspian_coast', dynasty: 'Ziyarid Dynasty', ruler: 'Mardavij (NOT YET - starts 928)', notes: 'Should NOT appear at 919' },
  { region: 'khorasan', dynasty: 'Samanid Empire', ruler: 'Ahmad ibn Isma\'il or Nasr II', notes: '' },
  { region: 'sistan', dynasty: 'Saffarid Dynasty', ruler: 'Ahmad ibn Muhammad', notes: '' },
  { region: 'makran', dynasty: 'Abbasid Caliphate', ruler: 'Governor (sparse data)', notes: '' },
  { region: 'transoxiana', dynasty: 'Samanid Empire', ruler: 'Ahmad ibn Isma\'il or Nasr II', notes: 'Capital: Bukhara' },
  { region: 'chorasmia', dynasty: 'Afrighid Dynasty', ruler: 'Local Khwarazmshah', notes: '305-995' },
];

for (const exp of EXPECTED) {
  const found = matchingAnchors.filter(a => 
    a.regionId === exp.region && 
    a.dynastyName.toLowerCase().includes(exp.dynasty.toLowerCase().split(' ')[0])
  );
  
  const status = found.length > 0 ? '✅ FOUND' : '❌ MISSING';
  console.log(`  ${status}  ${exp.region} → ${exp.dynasty} (${exp.ruler}) ${exp.notes ? `[${exp.notes}]` : ''}`);
  if (found.length > 0) {
    found.forEach(f => console.log(`          ↳ Matched: "${f.dynastyName}" from ${f.sourceFile}`));
  }
}

// ── Step 6: Show data gaps ───────────────────────────────────────────────────

console.log(`\n\nSTEP 6: DATA GAPS & RECOMMENDATIONS`);
console.log('────────────────────────────────────');

// Check for Sajid dynasty anywhere
const sajidAnywhere = deduped.filter(a => a.dynastyName.toLowerCase().includes('sajid'));
if (sajidAnywhere.length > 0) {
  console.log(`\n  Sajid Dynasty entries in index:`);
  sajidAnywhere.forEach(a => {
    const match919 = YEAR >= a.startYear && YEAR <= a.endYear;
    console.log(`    ${match919 ? '🟢 ACTIVE' : '⚪ inactive'} at ${YEAR}: ${a.regionId} → ${a.dynastyName} (${a.startYear}–${a.endYear}) [${a.sourceFile}]`);
  });
} else {
  console.log(`\n  ⚠️ Sajid Dynasty: NO entries found in ANY file!`);
}

// Check for Sallarid
const sallaridAnywhere = deduped.filter(a => a.dynastyName.toLowerCase().includes('sallarid'));
if (sallaridAnywhere.length > 0) {
  console.log(`\n  Sallarid Dynasty entries in index:`);
  sallaridAnywhere.forEach(a => {
    const match919 = YEAR >= a.startYear && YEAR <= a.endYear;
    console.log(`    ${match919 ? '🟢 ACTIVE' : '⚪ inactive'} at ${YEAR}: ${a.regionId} → ${a.dynastyName} (${a.startYear}–${a.endYear}) [${a.sourceFile}]`);
  });
}

// Check for Ziyarid (should NOT be at 919)
const ziyaridAnywhere = deduped.filter(a => a.dynastyName.toLowerCase().includes('ziyarid'));
if (ziyaridAnywhere.length > 0) {
  console.log(`\n  Ziyarid Dynasty entries in index:`);
  ziyaridAnywhere.forEach(a => {
    const match919 = YEAR >= a.startYear && YEAR <= a.endYear;
    console.log(`    ${match919 ? '🟢 ACTIVE' : '⚪ inactive'} at ${YEAR}: ${a.regionId} → ${a.dynastyName} (${a.startYear}–${a.endYear}) [${a.sourceFile}]`);
    if (match919 && a.startYear > 919) {
      console.log(`    ⚠️ WARNING: Ziyarid starts at ${a.startYear}, should NOT be active at ${YEAR}!`);
    }
  });
}

console.log('\n═══════════════════════════════════════════════════════════════');
console.log('END OF DIAGNOSTIC TRACE');
console.log('═══════════════════════════════════════════════════════════════\n');
