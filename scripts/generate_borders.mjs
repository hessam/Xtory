#!/usr/bin/env node
/**
 * generate_borders.mjs
 *
 * Reads GADM administrative-boundary GeoJSON for 9 countries,
 * merges modern provinces into 12 historical regions of Greater Iran,
 * computes a best-fit affine projection from existing city anchors,
 * simplifies polygon geometry (Douglas-Peucker), and outputs
 * SVG polygon strings suitable for mapPolygons.ts.
 *
 * Usage:  node scripts/generate_borders.mjs
 */

import { readFileSync, writeFileSync } from 'fs';

// ─── 1. GADM Data Loading ──────────────────────────────────────────────────────

const GADM_DIR = '/tmp';

function loadCountry(code) {
  const path = `${GADM_DIR}/gadm_${code}.json`;
  const raw = JSON.parse(readFileSync(path, 'utf-8'));
  return raw.features.map(f => ({
    name: f.properties.NAME_1,
    country: code,
    geometry: f.geometry,
  }));
}

const allProvinces = [
  ...loadCountry('IRN'),
  ...loadCountry('IRQ'),
  ...loadCountry('AFG'),
  ...loadCountry('TKM'),
  ...loadCountry('UZB'),
  ...loadCountry('PAK'),
  ...loadCountry('AZE'),
  ...loadCountry('ARM'),
  ...loadCountry('GEO'),
];

console.log(`Loaded ${allProvinces.length} provinces from 9 countries`);

// ─── 2. Province → Historical Region Mapping ────────────────────────────────────

/**
 * Maps modern GADM province names to our 12 historical region IDs.
 * Format: { regionId: [[countryCode, provinceName], ...] }
 *
 * Province selection rationale:
 * - These are approximations — historical borders didn't follow modern ones
 * - We pick the provinces whose *core territory* fell within each historical region
 * - Some borderline provinces are assigned to the region that best represents
 *   their historical identity
 */
const REGION_PROVINCE_MAP = {
  fars: [
    ['IRN', 'Fars'],
    ['IRN', 'Bushehr'],
    ['IRN', 'KohgiluyehandBuyerAhmad'],
    ['IRN', 'ChaharMahallandBakhtiari'],
  ],
  jibal: [
    ['IRN', 'Hamadan'],
    ['IRN', 'Lorestan'],
    ['IRN', 'Markazi'],
    ['IRN', 'Esfahan'],
    ['IRN', 'Qom'],
    ['IRN', 'Tehran'],
    ['IRN', 'Alborz'],
    ['IRN', 'Semnan'],
    ['IRN', 'Yazd'],
    ['IRN', 'Kerman'],
    ['IRN', 'Qazvin'],
    ['IRN', 'Zanjan'],
  ],
  khuzestan: [
    ['IRN', 'Khuzestan'],
    ['IRN', 'Ilam'],
  ],
  mesopotamia: [
    ['IRQ', 'Baghdad'],
    ['IRQ', 'Babil'],
    ['IRQ', 'Wasit'],
    ['IRQ', "Karbala'"],
    ['IRQ', 'An-Najaf'],
    ['IRQ', 'Al-Qadisiyah'],
    ['IRQ', 'Dhi-Qar'],
    ['IRQ', 'Al-Muthannia'],
    ['IRQ', 'Maysan'],
    ['IRQ', 'Al-Basrah'],
    ['IRQ', 'Salaad-Din'],
    ['IRQ', 'Diyala'],
    ['IRQ', "At-Ta'mim"],
    ['IRQ', 'Ninawa'],
    ['IRQ', 'Al-Anbar'],
    ['IRQ', 'Arbil'],
    ['IRQ', 'As-Sulaymaniyah'],
    ['IRQ', 'Dihok'],
  ],
  azerbaijan: [
    ['IRN', 'EastAzarbaijan'],
    ['IRN', 'WestAzarbaijan'],
    ['IRN', 'Ardebil'],
    ['IRN', 'Kordestan'],
    ['IRN', 'Kermanshah'],
  ],
  caucasus: [
    // Azerbaijan uses economic regions in GADM, not districts
    ['AZE', 'Absheron'],
    ['AZE', 'Aran'],
    ['AZE', 'Daglig-Shirvan'],
    ['AZE', 'Ganja-Qazakh'],
    ['AZE', 'Kalbajar-Lachin'],
    ['AZE', 'Lankaran'],
    ['AZE', 'Nakhchivan'],
    ['AZE', 'Quba-Khachmaz'],
    ['AZE', 'Shaki-Zaqatala'],
    ['AZE', 'Yukhari-Karabakh'],
    // Armenia — all provinces
    ['ARM', 'Aragatsotn'],
    ['ARM', 'Ararat'],
    ['ARM', 'Armavir'],
    ['ARM', 'Erevan'],
    ['ARM', 'Gegharkunik'],
    ['ARM', 'Kotayk'],
    ['ARM', 'Lori'],
    ['ARM', 'Shirak'],
    ['ARM', 'Syunik'],
    ['ARM', 'Tavush'],
    ['ARM', 'VayotsDzor'],
    // Georgia — all regions
    ['GEO', 'Tbilisi'],
    ['GEO', 'KvemoKartli'],
    ['GEO', 'Kakheti'],
    ['GEO', 'ShidaKartli'],
    ['GEO', 'Mtskheta-Mtianeti'],
    ['GEO', 'Samtskhe-Javakheti'],
    ['GEO', 'Ajaria'],
    ['GEO', 'Guria'],
    ['GEO', 'Imereti'],
    ['GEO', 'Racha-Lechkhumi-KvemoSvaneti'],
    ['GEO', 'Samegrelo-ZemoSvaneti'],
    ['GEO', 'Abkhazia'],
  ],
  caspian_coast: [
    ['IRN', 'Gilan'],
    ['IRN', 'Mazandaran'],
    ['IRN', 'Golestan'],
  ],
  khorasan: [
    ['IRN', 'RazaviKhorasan'],
    ['IRN', 'NorthKhorasan'],
    ['IRN', 'SouthKhorasan'],
    ['TKM', 'Mary'],
    ['TKM', 'Ahal'],
    ['AFG', 'Hirat'],
    ['AFG', 'Badghis'],
    ['AFG', 'Faryab'],
    ['AFG', 'Ghor'],
  ],
  sistan: [
    ['AFG', 'Nimroz'],
    ['AFG', 'Hilmand'],
    ['AFG', 'Kandahar'],
    ['AFG', 'Zabul'],
    ['AFG', 'Ghazni'],
    ['AFG', 'Uruzgan'],
    ['AFG', 'Farah'],
    ['AFG', 'Wardak'],
    ['AFG', 'Kabul'],
    ['AFG', 'Logar'],
    ['AFG', 'Paktya'],
    ['AFG', 'Paktika'],
  ],
  makran: [
    ['IRN', 'SistanandBaluchestan'],
    ['IRN', 'Hormozgan'],
    ['PAK', 'Balochistan'],
  ],
  transoxiana: [
    ['UZB', "Samarqand'"],
    ['UZB', 'Buxoro'],
    ['UZB', 'Jizzax'],
    ['UZB', 'Qashqadaryo'],
    ['UZB', 'Surxondaryo'],
    ['UZB', 'Namangan'],
    ['UZB', "Farg'ona"],
    ['UZB', 'Andijon'],
    ['UZB', 'Toshkent'],
    ['UZB', 'ToshkentShahri'],
    ['UZB', 'Sirdaryo'],
    ['UZB', 'Navoiy'],
    ['TKM', 'Lebap'],
    ['AFG', 'Balkh'],
    ['AFG', 'Jawzjan'],
    ['AFG', 'Samangan'],
    ['AFG', 'SariPul'],
    ['AFG', 'Kunduz'],
    ['AFG', 'Takhar'],
    ['AFG', 'Baghlan'],
    ['AFG', 'Badakhshan'],
  ],
  chorasmia: [
    ['UZB', 'Xorazm'],
    ['UZB', 'Qaraqalpaqstan'],
    ['TKM', 'Daşoguz'],
    ['TKM', 'Balkan'],
  ],
};

// ─── 3. Thin-Plate Spline (TPS) Projection ─────────────────────────────────────

/**
 * Known city positions in BOTH coordinate systems.
 * geo: [longitude, latitude]  (EPSG:4326)
 * svg: [x, y]                (1000×600 SVG viewport)
 *
 * The map uses an artistic (non-linear) projection that doesn't match any
 * standard cartographic projection. We solve this with a Thin-Plate Spline
 * (TPS) — the standard for warping between two sets of control points.
 * TPS passes exactly through all anchors (0px error) and smoothly
 * interpolates between them.
 */
const CITY_ANCHORS = [
  { name: 'Baghdad',    geo: [44.37, 33.31], svg: [140, 305] },
  { name: 'Isfahan',    geo: [51.68, 32.65], svg: [425, 295] },
  { name: 'Tabriz',     geo: [46.30, 38.08], svg: [340, 110] },
  { name: 'Merv',       geo: [62.19, 37.66], svg: [640, 178] },
  { name: 'Samarkand',  geo: [66.96, 39.65], svg: [732, 138] },
  { name: 'Ghazni',     geo: [68.42, 33.55], svg: [730, 330] },
  { name: 'Shiraz',     geo: [52.53, 29.59], svg: [435, 400] },
  { name: 'Susa',       geo: [48.26, 32.19], svg: [240, 345] },
  { name: 'Rasht',      geo: [49.58, 37.28], svg: [428, 162] },
  { name: 'Nishapur',   geo: [58.80, 36.21], svg: [582, 240] },
  { name: 'Sari',       geo: [53.06, 36.57], svg: [478, 168] },
  { name: 'Darband',    geo: [48.30, 42.06], svg: [296, 68] },
  { name: 'Bukhara',    geo: [64.42, 39.77], svg: [676, 122] },
  { name: 'Zaranj',     geo: [61.87, 30.96], svg: [650, 400] },
  { name: 'Tiz',        geo: [60.64, 25.29], svg: [620, 500] },
];

/**
 * TPS radial basis function: U(r) = r² ln(r)
 */
function tpsU(r) {
  if (r === 0) return 0;
  return r * r * Math.log(r);
}

/**
 * Solve a system of linear equations Ax = b using LU decomposition.
 */
function solveLU(A, b) {
  const n = A.length;
  const L = Array.from({ length: n }, () => new Float64Array(n));
  const U = Array.from({ length: n }, () => new Float64Array(n));

  // LU decomposition with partial pivoting
  const P = Array.from({ length: n }, (_, i) => i);
  const AA = A.map(row => [...row]);

  for (let k = 0; k < n; k++) {
    // Find pivot
    let maxVal = 0, maxIdx = k;
    for (let i = k; i < n; i++) {
      if (Math.abs(AA[i][k]) > maxVal) {
        maxVal = Math.abs(AA[i][k]);
        maxIdx = i;
      }
    }
    [AA[k], AA[maxIdx]] = [AA[maxIdx], AA[k]];
    [P[k], P[maxIdx]] = [P[maxIdx], P[k]];

    if (Math.abs(AA[k][k]) < 1e-12) continue;

    for (let i = k + 1; i < n; i++) {
      AA[i][k] /= AA[k][k];
      for (let j = k + 1; j < n; j++) {
        AA[i][j] -= AA[i][k] * AA[k][j];
      }
    }
  }

  // Forward substitution (Ly = Pb)
  const pb = P.map(i => b[i]);
  const y = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    y[i] = pb[i];
    for (let j = 0; j < i; j++) {
      y[i] -= AA[i][j] * y[j];
    }
  }

  // Back substitution (Ux = y)
  const x = new Float64Array(n);
  for (let i = n - 1; i >= 0; i--) {
    x[i] = y[i];
    for (let j = i + 1; j < n; j++) {
      x[i] -= AA[i][j] * x[j];
    }
    x[i] /= AA[i][i];
  }

  return Array.from(x);
}

/**
 * Build TPS transform from anchor points.
 * Returns a project(lon, lat) function.
 */
function buildTPS(anchors) {
  const n = anchors.length;
  const size = n + 3; // n weights + 3 affine params (a0, a1, a2)

  // Build the (n+3) × (n+3) matrix
  //   | K  P |   | w |   | v |
  //   | P' 0 | × | a | = | 0 |
  //
  // where K[i][j] = U(|p_i - p_j|), P = [[x1,y1,1], ...], v = target values

  const K = Array.from({ length: size }, () => new Float64Array(size));

  // Fill K block (n × n)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) { K[i][j] = 0; continue; }
      const dx = anchors[i].geo[0] - anchors[j].geo[0];
      const dy = anchors[i].geo[1] - anchors[j].geo[1];
      const r = Math.sqrt(dx*dx + dy*dy);
      K[i][j] = tpsU(r);
    }
  }

  // Fill P block (n × 3 at columns n..n+2)
  // Fill P' block (3 × n at rows n..n+2)
  for (let i = 0; i < n; i++) {
    K[i][n]     = anchors[i].geo[0];
    K[i][n + 1] = anchors[i].geo[1];
    K[i][n + 2] = 1;

    K[n][i]     = anchors[i].geo[0];
    K[n + 1][i] = anchors[i].geo[1];
    K[n + 2][i] = 1;
  }

  // Bottom-right 3×3 is zeros (already initialized)

  // Solve for x-coordinates
  const bx = new Float64Array(size);
  const by = new Float64Array(size);
  for (let i = 0; i < n; i++) {
    bx[i] = anchors[i].svg[0];
    by[i] = anchors[i].svg[1];
  }

  const wx = solveLU(K.map(r => Array.from(r)), Array.from(bx));
  const wy = solveLU(K.map(r => Array.from(r)), Array.from(by));

  return {
    project(lon, lat) {
      let x = wx[n] * lon + wx[n+1] * lat + wx[n+2];
      let y = wy[n] * lon + wy[n+1] * lat + wy[n+2];

      for (let i = 0; i < n; i++) {
        const dx = lon - anchors[i].geo[0];
        const dy = lat - anchors[i].geo[1];
        const r = Math.sqrt(dx*dx + dy*dy);
        const u = tpsU(r);
        x += wx[i] * u;
        y += wy[i] * u;
      }

      return [Math.round(x), Math.round(y)];
    }
  };
}

const transform = buildTPS(CITY_ANCHORS);

// Validate fit quality
console.log('\n─── TPS Projection Fit Quality ───');
let totalErr = 0;
for (const a of CITY_ANCHORS) {
  const [px, py] = transform.project(a.geo[0], a.geo[1]);
  const dx = px - a.svg[0], dy = py - a.svg[1];
  const err = Math.sqrt(dx*dx + dy*dy);
  totalErr += err;
  if (err > 1) {
    console.log(`  ⚠ ${a.name.padEnd(12)} expected(${a.svg[0]},${a.svg[1]})  got(${px},${py})  err=${err.toFixed(1)}px`);
  }
}
console.log(`  Average error: ${(totalErr/CITY_ANCHORS.length).toFixed(1)}px (should be ~0)`);

// ─── 4. Geometry Processing ─────────────────────────────────────────────────────

import * as turf from '@turf/turf';

/**
 * Extract the largest outer ring from a geometry.
 * Returns array of coordinates: [[lon,lat], ...]
 */
function extractLargestRing(geometry) {
  let largestArea = -1;
  let bestRing = [];

  const checkRing = (ring) => {
    // ring is [[x,y], [x,y], ...]
    if (!ring || ring.length < 3) return;
    const poly = turf.polygon([[...ring]]);
    const area = turf.area(poly);
    if (area > largestArea) {
      largestArea = area;
      bestRing = ring;
    }
  };

  if (geometry.type === 'Polygon') {
    checkRing(geometry.coordinates[0]);
  } else if (geometry.type === 'MultiPolygon') {
    for (const poly of geometry.coordinates) {
      checkRing(poly[0]);
    }
  }

  return bestRing;
}

/**
 * Douglas-Peucker line simplification.
 */
function simplify(points, tolerance) {
  if (points.length <= 2) return points;

  let maxDist = 0;
  let maxIdx = 0;
  const start = points[0];
  const end = points[points.length - 1];

  for (let i = 1; i < points.length - 1; i++) {
    const d = perpendicularDist(points[i], start, end);
    if (d > maxDist) {
      maxDist = d;
      maxIdx = i;
    }
  }

  if (maxDist > tolerance) {
    const left = simplify(points.slice(0, maxIdx + 1), tolerance);
    const right = simplify(points.slice(maxIdx), tolerance);
    return [...left.slice(0, -1), ...right];
  } else {
    return [start, end];
  }
}

function perpendicularDist(point, lineStart, lineEnd) {
  const dx = lineEnd[0] - lineStart[0];
  const dy = lineEnd[1] - lineStart[1];
  const lenSq = dx*dx + dy*dy;
  if (lenSq === 0) return Math.sqrt((point[0]-lineStart[0])**2 + (point[1]-lineStart[1])**2);

  const t = Math.max(0, Math.min(1, ((point[0]-lineStart[0])*dx + (point[1]-lineStart[1])*dy) / lenSq));
  const projX = lineStart[0] + t * dx;
  const projY = lineStart[1] + t * dy;
  return Math.sqrt((point[0]-projX)**2 + (point[1]-projY)**2);
}

// ─── 5. Process Each Region ─────────────────────────────────────────────────────

const OUTPUT_POLYGONS = {};

// Target vertex count per region (after simplification)
const TARGET_VERTICES = 35;

for (const [regionId, provinceDefs] of Object.entries(REGION_PROVINCE_MAP)) {
  console.log(`\nProcessing: ${regionId}`);
  
  const matchedGeometries = [];
  const missed = [];
  
  for (const [code, name] of provinceDefs) {
    const prov = allProvinces.find(p => p.country === code && p.name === name);
    if (prov) {
      matchedGeometries.push(prov.geometry);
    } else {
      missed.push(`${code}/${name}`);
    }
  }
  
  if (missed.length > 0) {
    console.log(`  ⚠ Missing provinces: ${missed.join(', ')}`);
  }
  console.log(`  Matched ${matchedGeometries.length}/${provinceDefs.length} provinces`);
  
  if (matchedGeometries.length === 0) {
    console.log(`  ✗ Skipping — no data`);
    continue;
  }
  
  // 1. Union all provinces into a single GeoJSON geometry
  let mergedGeo = matchedGeometries[0];
  for (let i = 1; i < matchedGeometries.length; i++) {
    try {
      // Create features from geometries for turf.union
      const fc = turf.featureCollection([
        turf.feature(mergedGeo),
        turf.feature(matchedGeometries[i])
      ]);
      const result = turf.union(fc);
      if (result) mergedGeo = result.geometry;
    } catch (e) {
      console.log(`  ⚠ Ignoring geometry merge error: ${e.message}`);
    }
  }

  // 2. Extract the main outline out of the merged multipolygon
  const geoRing = extractLargestRing(mergedGeo);
  console.log(`  Geo ring points: ${geoRing.length}`);

  // 3. Project geo points into SVG viewport
  const svgRing = geoRing.map(coord => transform.project(coord[0], coord[1]));

  // 4. Simplify line to visual target
  let simplified = svgRing;
  let tolerance = 0.5;
  while (simplified.length > TARGET_VERTICES && tolerance < 20) {
    simplified = simplify([...svgRing], tolerance);
    tolerance += 0.5;
  }
  // Ensure start and end close properly
  if (simplified.length > 0 && 
      (simplified[0][0] !== simplified[simplified.length-1][0] || 
       simplified[0][1] !== simplified[simplified.length-1][1])) {
       // it's supposed to be a closed ring
  } else {
      // remove duplicate last point for SVG polygon format
      simplified.pop();
  }

  console.log(`  Simplified: ${simplified.length} vertices (tolerance=${tolerance-0.5})`);
  
  // Format as SVG polygon string
  const polyStr = simplified.map(p => `${Math.round(p[0])},${Math.round(p[1])}`).join(' ');
  
  // Compute visual center (centroid) in SVG
  const centerX = Math.round(simplified.reduce((s, p) => s + p[0], 0) / simplified.length);
  const centerY = Math.round(simplified.reduce((s, p) => s + p[1], 0) / simplified.length);
  
  OUTPUT_POLYGONS[regionId] = {
    polygon: polyStr,
    center: [centerX, centerY],
    vertexCount: simplified.length,
  };
}

// ─── 6. Output ──────────────────────────────────────────────────────────────────

console.log('\n\n═══════════════════════════════════════════════════');
console.log('       GENERATED REGION POLYGONS');
console.log('═══════════════════════════════════════════════════\n');

for (const [regionId, data] of Object.entries(OUTPUT_POLYGONS)) {
  console.log(`// ${regionId} (${data.vertexCount} vertices)`);
  console.log(`polygon: '${data.polygon}',`);
  console.log(`center: [${data.center[0]}, ${data.center[1]}],`);
  console.log('');
}

// Also write to a JSON file for easier consumption
const outputPath = '/tmp/generated_borders.json';
writeFileSync(outputPath, JSON.stringify(OUTPUT_POLYGONS, null, 2));
console.log(`\nJSON output written to: ${outputPath}`);

// ─── 7. Diagnostics ─────────────────────────────────────────────────────────────

console.log('\n─── Available GADM Province Names ───');
const countries = [...new Set(allProvinces.map(p => p.country))];
for (const code of countries.sort()) {
  const provs = allProvinces.filter(p => p.country === code).map(p => p.name).sort();
  console.log(`\n  ${code}: ${provs.join(', ')}`);
}
