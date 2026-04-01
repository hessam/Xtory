import type { GoogleGenAI } from "@google/genai";
import { HistoricalEvent } from '../data/historicalEvents';
import { HistoricalFigure } from '../data/figures';
import { Artifact } from '../data/artifacts';
import { regions, EraKey, getRegionById } from '../data/regions';
import { events as staticEvents } from '../data/events';
import { QuizQuestion } from '../types/quiz';

const ERA_BOUNDARIES = [
  { id: 'median',        start: -678, end: -550 },
  { id: 'achaemenid',    start: -550, end: -330 },
  { id: 'seleucid',      start: -330, end: -247 },
  { id: 'parthian',      start: -247, end:  224  },
  { id: 'sasanian',      start:  224, end:  651  },
  { id: 'umayyad',       start:  661, end:  750  },
  { id: 'abbasid',       start:  750, end:  1258 },
  { id: 'samanid',       start:  819, end:  999  },
  { id: 'buyid',         start:  934, end:  1062 },
  { id: 'ghaznavid',     start:  977, end:  1186 },
  { id: 'seljuk',        start: 1037, end:  1194 },
  { id: 'ilkhanid',      start: 1256, end:  1335 },
  { id: 'timurid',       start: 1370, end:  1507 },
  { id: 'safavid',       start: 1501, end:  1736 },
];

function getYearBucketKey(year: number, prefix: string, lang: string): string {
  const bucket = Math.floor(year / 25) * 25;
  return `${prefix}_${bucket}_${lang}`;
}

/**
 * Returns a hybrid cache key.
 * Short eras get a single static key.
 * Long eras (>150 years) use 25-year buckets to preserve map granularity.
 */
function getHybridCacheKey(year: number, prefix: string, lang: string): string {
  const era = ERA_BOUNDARIES.find(e => year >= e.start && year <= e.end);
  
  if (era) {
    const eraLength = era.end - era.start;
    if (eraLength > 150) {
      return getYearBucketKey(year, `${prefix}_${era.id}`, lang);
    }
    return `${prefix}_${era.id}_${lang}`;
  }
  
  return getYearBucketKey(year, prefix, lang);
}

// --- IN-MEMORY SESSION CACHE (LRU) ---
const CACHE_MAP = new Map<string, any>();
const MAX_CACHE_SIZE = 50;

function getCached<T>(key: string): T | null {
  // Check memory first
  if (CACHE_MAP.has(key)) {
    const value = CACHE_MAP.get(key);
    CACHE_MAP.delete(key);
    CACHE_MAP.set(key, value);
    return value as T;
  }
  
  // Back with localStorage if in browser
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(`xtory_${key}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Sync back to memory for faster subsequent access
        CACHE_MAP.set(key, parsed);
        return parsed as T;
      }
    } catch (e) {
      console.warn("Storage access failed", e);
    }
  }
  return null;
}

function setCache<T>(key: string, value: T): void {
  if (CACHE_MAP.size >= MAX_CACHE_SIZE) {
    const oldestKey = CACHE_MAP.keys().next().value;
    if (oldestKey !== undefined) CACHE_MAP.delete(oldestKey);
  }
  CACHE_MAP.set(key, value);
  
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`xtory_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  }
}

// --- NEW PROMPT HELPERS & METADATA PARSING --- 
function getSourcesForPeriod(year: number): string {
  if (year < -550) return `- Elamite/Mesopotamian texts & Archaeology (Susa)\n- Cambridge History of Iran Vol. 2`;
  if (year >= -550 && year < -247) return `- Behistun Inscription\n- Persepolis Fortification Tablets\n- Pierre Briant, From Cyrus to Alexander`;
  if (year >= -247 && year < 651) return `- Coin & rock inscriptions\n- Cambridge History of Iran Vol. 3\n- Roman/Chinese sources`;
  if (year >= 651 && year < 1501) return `- al-Tabari's Tarikh\n- al-Biruni's writings\n- Cambridge History of Iran Vol. 4/5`;
  if (year >= 1501 && year < 1925) return `- Persian court chronicles\n- European traveler accounts\n- Cambridge History of Iran Vol. 6`;
  return `- Ervand Abrahamian, Modern Iran\n- Encyclopaedia Iranica`;
}

interface AIContentResult {
  body: string;
  sources: string[];
  certainty: 'HIGH' | 'MEDIUM' | 'LOW';
  archaeologicalEvidence?: 'YES' | 'NO' | 'PARTIAL';
}

function parseAIResponse(raw: string): AIContentResult {
  const lines = raw.split('\n');
  const bodyLines: string[] = [];
  let sources: string[] = [];
  let certainty: 'HIGH' | 'MEDIUM' | 'LOW' = 'MEDIUM';
  let archaeologicalEvidence: 'YES' | 'NO' | 'PARTIAL' | undefined;
  
  let parsingMetadata = false;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('SOURCES:')) {
      sources = line.replace('SOURCES:', '').replace('[', '').replace(']', '').trim().split(',').map(s => s.trim());
      parsingMetadata = true;
    } else if (trimmed.startsWith('CERTAINTY:')) {
      certainty = line.replace('CERTAINTY:', '').replace('[', '').replace(']', '').trim() as 'HIGH' | 'MEDIUM' | 'LOW';
      parsingMetadata = true;
    } else if (trimmed.startsWith('ARCHAEOLOGICAL_EVIDENCE:')) {
      archaeologicalEvidence = line.replace('ARCHAEOLOGICAL_EVIDENCE:', '').trim() as 'YES' | 'NO' | 'PARTIAL';
      parsingMetadata = true;
    } else {
      if (!parsingMetadata) {
        bodyLines.push(line);
      }
    }
  });

  return { body: bodyLines.join('\n').trim(), sources, certainty, archaeologicalEvidence };
}

function formatAIResponseForUI(content: AIContentResult, lang: 'en' | 'fa'): string {
    const certConfig = {
      HIGH: { label: 'مستند', labelEn: 'Documented', icon: '✓', color: '#10b981' },
      MEDIUM: { label: 'نسبتاً مستند', labelEn: 'Partially documented', icon: '◎', color: '#f59e0b' },
      LOW: { label: 'افسانه‌آمیز', labelEn: 'Sparse sources', icon: '?', color: '#ef4444' }
    };
    const cert = certConfig[content.certainty] || certConfig.MEDIUM;
    const certLabel = lang === 'en' ? cert.labelEn : cert.label;
    const aiLabel = lang === 'en' ? 'AI' : 'هوش مصنوعی';
    const sourcesLabel = content.sources.length > 0 ? `📚 ${content.sources.join(' · ')}` : '';
    
    const footer = `\n\n---\n> **✦ ${aiLabel}** • **${cert.icon} ${certLabel}**${sourcesLabel ? ' • *' + sourcesLabel + '*' : ''}`;
    
    return content.body + footer;
}

function handleAIError(error: any, lang: 'en' | 'fa'): string {
  console.error("AI Service Error:", error);
  const msg = error?.message || "";
  
  if (msg.includes("429") || msg.toLowerCase().includes("quota") || msg.toLowerCase().includes("limit") || msg.includes("503")) {
    return lang === 'en' 
      ? "⚠️ **API Limit Reached.**\nYou've reached the free tier quota. Please wait a minute or add a different key in settings."
      : "⚠️ **اتمام سهمیه یا ترافیک بالا.**\nسهمیه طرح رایگان شما به پایان رسیده یا ترافیک سرور بالاست. لطفاً یک دقیقه صبر کنید یا یک کلید جدید در تنظیمات اضافه کنید.";
  }
  
  if (msg.includes("403") || msg.toLowerCase().includes("invalid") || msg.toLowerCase().includes("key") || msg.includes("API Key not found")) {
    return lang === 'en'
      ? "❌ **Invalid API Key.**\nThe provided key is either expired or incorrect. Please update it in the settings."
      : "❌ **کلید API نامعتبر است.**\nکلید وارد شده منقضی شده یا اشتباه است. لطفاً آن را در بخش تنظیمات به‌روزرسانی کنید.";
  }

  if (msg.toLowerCase().includes("safety") || msg.toLowerCase().includes("blocked")) {
    return lang === 'en'
      ? "🛡️ **Content Filtered.**\nThe response was blocked by safety filters. Feel free to try a different topic."
      : "🛡️ **محتوای فیلتر شده.**\nپاسخ به دلیل فیلترهای اخلاقی مسدود شد. می‌توانید موضوع دیگری را امتحان کنید.";
  }

  return lang === 'en' 
    ? "📡 **Connection Error.**\nUnable to reach the AI historian right now. Check your internet or try again in a moment."
    : "📡 **خطای اتصال.**\nدر حال حاضر دسترسی به هوش مصنوعی امکان‌پذیر نیست. اینترنت خود را چک کنید یا دوباره تلاش کنید.";
}
// ---------------------------------------------

let aiInstance: GoogleGenAI | null = null;
let GoogleGenAIClass: any = null;

export const setApiKey = async (key: string) => {
  if (!key) {
    aiInstance = null;
    return;
  }
  if (!GoogleGenAIClass) {
    const module = await import('@google/genai');
    GoogleGenAIClass = module.GoogleGenAI;
  }
  aiInstance = new GoogleGenAIClass({ apiKey: key });
};

// --- GEO-CORRECTION HELPERS ---

/**
 * Maps a year to a representative historical EraKey.
 * Used to cross-reference AI results against hardcoded eraPresence data.
 */
export function getEraForYear(year: number): { id: EraKey } {
  if (year < -1000) return { id: 'elamite' };
  if (year >= -1000 && year < -550) return { id: 'median' };
  if (year >= -550 && year < -330) return { id: 'achaemenid' };
  if (year >= -330 && year < -247) return { id: 'seleucid' };
  if (year >= -247 && year < 224) return { id: 'parthian' };
  if (year >= 224 && year < 651) return { id: 'sasanian' };
  if (year >= 651 && year < 750) return { id: 'umayyad' };
  if (year >= 750 && year < 850) return { id: 'abbasid' };
  if (year >= 850 && year < 950) return { id: 'samanid' };
  if (year >= 950 && year < 1030) return { id: 'buyid' };
  if (year >= 1030 && year < 1186) return { id: 'ghaznavid' };
  if (year >= 1186 && year < 1250) return { id: 'seljuk' };
  if (year >= 1250 && year < 1350) return { id: 'ilkhanid' };
  if (year >= 1350 && year < 1500) return { id: 'timurid' };
  return { id: 'safavid' };
}

/**
 * Validates AI results against known geographic constraints.
 * If AI places a ruler with "low" confidence in a region where that era's
 * presence is not pre-authored, we flag it as contested.
 */
function validateRegionResult(result: DynamicRulerData, year: number): DynamicRulerData {
  const region = getRegionById(result.regionId as any);
  if (!region) return result;

  const era = getEraForYear(year);
  const knownPresence = region.eraPresence[era.id];

  // AI occasionally assigns a ruler to the wrong region (especially contested border regions).
  // If we have zero hardcoded record of this era's presence in the region AND the AI is unsure:
  if (!knownPresence && result.confidence === "low") {
    result.status = "Contested/Warzone"; // Flag rather than render wrong data
  }
  
  return result;
}

const getAiAsync = async () => {
  if (!aiInstance) throw new Error("API key not set");
  return aiInstance;
};

export interface DynamicRulerData {
  id: string;
  rulerNameEn: string;
  rulerNameFa: string;
  rulerTitleEn: string;
  rulerTitleFa: string;
  dynastyNameEn: string;
  dynastyNameFa: string;
  dynastyColorFamily: 'persian' | 'arab' | 'turkic' | 'greek' | 'nomadic' | 'foreign' | 'semitic';
  dynastyClassification: string;
  capitalCityEn: string;
  capitalCityFa: string;
  startDate: number;
  endDate: number;
  regionId: string;
  status: 'Direct Control' | 'Vassal State' | 'Contested/Warzone' | 'Sphere of Influence';
  confidence?: 'high' | 'low';
}

export interface SearchResult {
  year: number;
  type: 'event' | 'figure' | 'ruler' | 'dynasty' | 'region';
  nameEn: string;
  nameFa: string;
  descriptionEn: string;
  descriptionFa: string;
}

export interface Relative {
  nameEn: string;
  nameFa: string;
  relationEn: string;
  relationFa: string;
  noteEn: string;
  noteFa: string;
}

export interface LineageData {
  parents: Relative[];
  spouses: Relative[];
  children: Relative[];
  notableRelatives: Relative[];
}

export async function generateLineage(personName: string, context: string, lang: 'en' | 'fa'): Promise<LineageData | string | null> {
  const cacheKey = `lineage_${personName}_${lang}`;
  const cached = getCached<LineageData>(cacheKey);
  if (cached) return cached;

  const prompt = `You are a historian expert in Greater Iran and surrounding regions.
  Provide the known family lineage and notable relatives of the historical figure "${personName}".
  Context about this person to ensure accuracy: ${context}
  
  Include parents, spouses, children, and any other notable relatives (like grandparents or siblings if historically significant).
  
  Return a JSON object with this exact structure:
  {
    "parents": [{"nameEn": "...", "nameFa": "...", "relationEn": "Mother/Father", "relationFa": "مادر/پدر", "noteEn": "Brief note about them", "noteFa": "یادداشت کوتاه"}],
    "spouses": [{"nameEn": "...", "nameFa": "...", "relationEn": "Wife/Husband", "relationFa": "همسر", "noteEn": "...", "noteFa": "..."}],
    "children": [{"nameEn": "...", "nameFa": "...", "relationEn": "Son/Daughter", "relationFa": "پسر/دختر", "noteEn": "...", "noteFa": "..."}],
    "notableRelatives": [{"nameEn": "Uzun Hasan", "nameFa": "اوزون حسن", "relationEn": "Maternal Grandfather", "relationFa": "پدربزرگ مادری", "noteEn": "...", "noteFa": "..."}]
  }
  
  If a category is empty or unknown, return an empty array for that key.
  Return ONLY valid JSON without any markdown formatting.`;

  try {
    const response = await (await getAiAsync()).models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    let text = response.text || "{}";
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(text) as LineageData;
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    return handleAIError(error, lang);
  }
}

export async function searchHistoricalElement(query: string, lang: 'en' | 'fa'): Promise<SearchResult | null> {
  const prompt = `You are a historian expert in world history.
  The user is searching for an historical element (event, figure, ruler, dynasty, or region). If the element is related to Greater Iran, prioritize that context.
  Query: "${query}"
  
  If you can identify the element, return a JSON object with this exact structure:
  {
    "found": true,
    "year": number (the most representative year, negative for BC),
    "type": "event" | "figure" | "ruler" | "dynasty" | "region",
    "nameEn": "English Name",
    "nameFa": "Persian Name",
    "descriptionEn": "Short description in English",
    "descriptionFa": "Short description in Persian"
  }
  
  If the element is not found, return:
  {
    "found": false
  }
  
  Return ONLY valid JSON without any markdown formatting.`;

  try {
    const responsePromise = (await getAiAsync()).models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    // Add a 15-second timeout to prevent infinite loading
    const timeoutPromise = new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error("Search timeout")), 15000)
    );

    const response = await Promise.race([responsePromise, timeoutPromise]) as any;
    
    let text = response.text || "{}";
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(text);
    
    if (data.found) {
      return {
        year: data.year,
        type: data.type,
        nameEn: data.nameEn,
        nameFa: data.nameFa,
        descriptionEn: data.descriptionEn,
        descriptionFa: data.descriptionFa
      };
    }
    return null;
  } catch (error) {
    console.error("Error searching historical element:", error);
    return null;
  }
}

export async function fetchHistoricalEventsForYear(year: number, lang: 'en' | 'fa'): Promise<HistoricalEvent[]> {
  const cacheKey = `events_${year}_${lang}`;
  const cached = getCached<HistoricalEvent[]>(cacheKey);
  if (cached) return cached;

  const prompt = `Find 3 to 5 major historical events (battles, downfalls, political shifts, cultural milestones) that happened in Greater Iran within 25 years of the year ${year}.
  Return a JSON array of objects. Each object must contain:
  - id: A unique string ID (e.g., "ai_event_1")
  - year: The exact year the event occurred (negative for BC)
  - titleEn: Event title in English
  - titleFa: Event title in Persian
  - descriptionEn: A short, 1-2 sentence description in English
  - descriptionFa: A short, 1-2 sentence description in Persian
  - type: Must be exactly one of: "battle", "downfall", "political", "cultural", "universal"
  - coordinates: An array of two numbers [x, y] representing the approximate location on a map (x: 0-1000, y: 0-600). For example, Anatolia is around [150, 150], Mesopotamia [250, 250], Fars [350, 350], Khorasan [500, 200]. If unknown, omit this field.`;

  try {
    const response = await (await getAiAsync()).models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              id: { type: "STRING" },
              year: { type: "INTEGER" },
              titleEn: { type: "STRING" },
              titleFa: { type: "STRING" },
              descriptionEn: { type: "STRING" },
              descriptionFa: { type: "STRING" },
              type: { type: "STRING", enum: ["battle", "downfall", "political", "cultural", "universal"] },
              coordinates: {
                type: "ARRAY",
                items: { type: "NUMBER" }
              }
            },
            required: ["id", "year", "titleEn", "titleFa", "descriptionEn", "descriptionFa", "type"]
          }
        }
      }
    });
    
    const text = response.text || "[]";
    const data = JSON.parse(text);
    
    const result = data.map((item: any) => ({
      id: `${item.id}_${Date.now()}`,
      year: item.year,
      title: { en: item.titleEn, fa: item.titleFa },
      description: { en: item.descriptionEn, fa: item.descriptionFa },
      type: item.type,
      coordinates: item.coordinates
    })) as HistoricalEvent[];

    setCache(cacheKey, result);
    return result;
  } catch (error) {
    throw new Error(handleAIError(error, lang));
  }
}

export async function fetchHistoricalFiguresForYear(year: number, lang: 'en' | 'fa'): Promise<HistoricalFigure[]> {
  const cacheKey = `figures_${year}_${lang}`;
  const cached = getCached<HistoricalFigure[]>(cacheKey);
  if (cached) return cached;

  const prompt = `You are a historian expert in world history.
  Provide a list of 3 to 5 notable historical figures (philosophers, scientists, poets, artists, or other thinkers) from any part of the world who were alive and active around the year ${Math.abs(year)} ${year < 0 ? 'BC' : 'AD'}.
  Return ONLY a valid JSON array of objects with this exact structure:
  [{
    "id": "unique_string_id",
    "nameEn": "English Name",
    "nameFa": "Persian Name",
    "birthYear": number (negative for BC),
    "deathYear": number (negative for BC),
    "descriptionEn": "Short description in English",
    "descriptionFa": "Short description in Persian",
    "type": "philosopher" | "poet" | "scientist" | "artist" | "other"
  }]`;

  try {
    const response = await (await getAiAsync()).models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              id: { type: "STRING" },
              nameEn: { type: "STRING" },
              nameFa: { type: "STRING" },
              birthYear: { type: "INTEGER" },
              deathYear: { type: "INTEGER" },
              descriptionEn: { type: "STRING" },
              descriptionFa: { type: "STRING" },
              type: { type: "STRING", enum: ["philosopher", "poet", "scientist", "artist", "other"] }
            },
            required: ["id", "nameEn", "nameFa", "birthYear", "deathYear", "descriptionEn", "descriptionFa", "type"]
          }
        }
      }
    });
    
    const text = response.text || "[]";
    const data = JSON.parse(text);
    
    const result = data.map((item: any, index: number) => ({
      id: `ai_figure_${year}_${index}_${Date.now()}`,
      name: { en: item.nameEn, fa: item.nameFa },
      birthYear: item.birthYear,
      deathYear: item.deathYear,
      description: { en: item.descriptionEn, fa: item.descriptionFa },
      type: item.type
    })) as HistoricalFigure[];

    setCache(cacheKey, result);
    return result;
  } catch (error) {
    throw new Error(handleAIError(error, lang));
  }
}

export async function fetchArtifactsForYear(year: number, lang: 'en' | 'fa'): Promise<Artifact[]> {
  const cacheKey = `artifacts_${year}_${lang}`;
  const cached = getCached<Artifact[]>(cacheKey);
  if (cached) return cached;

  const prompt = `You are a historian expert in Greater Iran.
  Provide a list of 3 to 5 notable monuments, heritages, artifacts, or manuscripts that were created or became prominent in Greater Iran around the year ${Math.abs(year)} ${year < 0 ? 'BC' : 'AD'}.
  Return ONLY a valid JSON array of objects with this exact structure:
  [{
    "id": "unique_string_id",
    "nameEn": "English Name",
    "nameFa": "Persian Name",
    "descriptionEn": "Short description in English",
    "descriptionFa": "Short description in Persian",
    "year": number (negative for BC),
    "currentLocationEn": "Current location (e.g., British Museum, Tehran, Isfahan)",
    "currentLocationFa": "Current location in Persian",
    "coordinates": [x, y] (array of two numbers representing the approximate location on a map where x: 0-1000, y: 0-600. For example, Anatolia is around [150, 150], Mesopotamia [250, 250], Fars [350, 350], Khorasan [500, 200], Transoxiana/Turkmenistan [700, 100]),
    "type": "monument" | "artifact" | "manuscript" | "architecture"
  }]`;

  try {
    const response = await (await getAiAsync()).models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              id: { type: "STRING" },
              nameEn: { type: "STRING" },
              nameFa: { type: "STRING" },
              descriptionEn: { type: "STRING" },
              descriptionFa: { type: "STRING" },
              year: { type: "INTEGER" },
              currentLocationEn: { type: "STRING" },
              currentLocationFa: { type: "STRING" },
              coordinates: {
                type: "ARRAY",
                items: { type: "NUMBER" }
              },
              type: { type: "STRING", enum: ["monument", "artifact", "manuscript", "architecture"] }
            },
            required: ["id", "nameEn", "nameFa", "descriptionEn", "descriptionFa", "year", "currentLocationEn", "currentLocationFa", "coordinates", "type"]
          }
        }
      }
    });
    
    const text = response.text || "[]";
    const data = JSON.parse(text);
    
    const result = data.map((item: any, index: number) => ({
      id: `ai_artifact_${year}_${index}_${Date.now()}`,
      name: { en: item.nameEn, fa: item.nameFa },
      description: { en: item.descriptionEn, fa: item.descriptionFa },
      year: item.year,
      currentLocation: { en: item.currentLocationEn, fa: item.currentLocationFa },
      coordinates: item.coordinates,
      type: item.type
    })) as Artifact[];

    setCache(cacheKey, result);
    return result;
  } catch (error) {
    throw new Error(handleAIError(error, lang));
  }
}

export async function fetchHistoricalDataForYear(year: number, lang: 'en' | 'fa'): Promise<DynamicRulerData[]> {
  const cacheKey = getHybridCacheKey(year, 'rulers', lang);
  const cached = getCached<DynamicRulerData[]>(cacheKey);
  if (cached) return cached;

  const knownRegionIds = staticEvents
    .filter(e => year >= e.startDate && year <= e.endDate)
    .map(e => e.regionId);

  const missingRegions = regions.filter(r => !knownRegionIds.includes(r.id));

  // If we already have full static coverage for this year across all regions, we don't need AI.
  if (missingRegions.length === 0) return [];

  const regionManifest = missingRegions.map(r => ({
    id: r.id,
    knownAs: r.aliases.slice(0, 3), // max 3 aliases
    anchorCities: r.anchorCities.map(c => ({
      name: c.name,
      historical: c.historicalNames || []
    }))
  }));

  const prompt = `You are a strict data-entry historian mapping the exact political borders in Greater Iran for the year ${Math.abs(year)}${year<0?'BC':'AD'}.
  For the specific regions in the manifest below, return the ruling dynasty/power and primary ruler name. 
  The anchorCities (including modern and historical names) and aliases are for geographic grounding—return who ruled those specific areas during that era. Do not hallucinate based on modern names if they didn't exist then.
  Use the id field as your key. 
  Return compact JSON ONLY. 
  Do not skip ANY of the regions listed in the manifest.
  
  Regions Manifest: ${JSON.stringify(regionManifest)}

  Required fields for each region object:
  - rulerNameEn: Ruler's name in English
  - rulerNameFa: Ruler's name in Persian
  - rulerTitleEn: Ruler's title in English (e.g., "King of Kings", "Emperor")
  - rulerTitleFa: Ruler's title in Persian
  - dynastyNameEn: Dynasty name in English
  - dynastyNameFa: Dynasty name in Persian
  - dynastyColorFamily: Must be exactly one of: "persian", "arab", "turkic", "greek", "nomadic", "foreign", "semitic"
  - dynastyClassification: e.g., "Empire", "Kingdom", "Caliphate", "Chiefdom"
  - capitalCityEn: Capital city in English
  - capitalCityFa: Capital city in Persian
  - startDate: Start year of their reign (negative for BC)
  - endDate: End year of their reign (negative for BC)
  - regionId: Must be exactly the id from the manifest.
  - status: Must be exactly one of: "Direct Control", "Vassal State", "Contested/Warzone", "Sphere of Influence"
  - confidence: "high" if you are extremely certain of this ruler/region mapping, "low" if it's a fringe/contested area or historical sources are silent.`;

  try {
    const response = await (await getAiAsync()).models.generateContent({
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
              regionId: { type: "STRING", enum: missingRegions.map(r => r.id) },
              status: { type: "STRING", enum: ["Direct Control", "Vassal State", "Contested/Warzone", "Sphere of Influence"] },
              confidence: { type: "STRING", enum: ["high", "low"] }
            },
            required: ["rulerNameEn", "rulerNameFa", "rulerTitleEn", "rulerTitleFa", "dynastyNameEn", "dynastyNameFa", "dynastyColorFamily", "dynastyClassification", "capitalCityEn", "capitalCityFa", "startDate", "endDate", "regionId", "status", "confidence"]
          }
        }
      }
    });

    const text = response.text || "[]";
    const data = JSON.parse(text);
    
    const result = data.map((item: any, index: number) => {
      const entry = {
        ...item,
        id: `ai_${year}_${index}_${Date.now()}`
      };
      return validateRegionResult(entry, year);
    });

    setCache(cacheKey, result);
    return result;
  } catch (error: any) {
    const msg = error?.message || "";
    if (msg.includes("503") || msg.toLowerCase().includes("unavailable") || msg.toLowerCase().includes("high demand")) {
      console.warn("Gemini 3 Flash busy, retrying in 2 seconds...");
      await new Promise(r => setTimeout(r, 2000));
      try {
        // Simple retry once
        const response = await (await getAiAsync()).models.generateContent({
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
                  regionId: { type: "STRING", enum: missingRegions.map(r => r.id) },
                  status: { type: "STRING", enum: ["Direct Control", "Vassal State", "Contested/Warzone", "Sphere of Influence"] },
                  confidence: { type: "STRING", enum: ["high", "low"] }
                },
                required: ["rulerNameEn", "rulerNameFa", "rulerTitleEn", "rulerTitleFa", "dynastyNameEn", "dynastyNameFa", "dynastyColorFamily", "dynastyClassification", "capitalCityEn", "capitalCityFa", "startDate", "endDate", "regionId", "status", "confidence"]
              }
            }
          }
        });
        const text = response.text || "[]";
        const data = JSON.parse(text);
        const result = data.map((item: any, index: number) => {
          const entry = {
            ...item,
            id: `ai_retry_${year}_${index}_${Date.now()}`
          };
          return validateRegionResult(entry, year);
        });
        setCache(cacheKey, result);
        return result;
      } catch (retryError) {
        throw new Error(handleAIError(retryError, lang));
      }
    }
    throw new Error(handleAIError(error, lang));
  }
}

export async function generateBiography(name: string, title: string, dynasty: string, lang: 'en' | 'fa', year: number = 0): Promise<string> {
  const cacheKey = `bio_${name}_${dynasty}_${lang}`;
  const cached = getCached<string>(cacheKey);
  if (cached) return cached;

  const sources = getSourcesForPeriod(year);
  const prompt = lang === 'en'
    ? `Historian voice, general audience. Biography of ${name} (${title}, ${dynasty}). Exactly 3 paragraphs: P1-vivid opening scene/decision. P2-reign arc & central tension. P3-echo/legacy + one open historical question. Natural uncertainty lowercase phrase inline. No quotes, No headers, No MD lists. Sources: ${sources}\n\nAppend on new lines:\nSOURCES: [comma list of 2-3 sources]\nCERTAINTY: [HIGH or MEDIUM or LOW]`
    : `لحن مورخ، مخاطب عام. بیوگرافی ${name} (${title}، دودمان ${dynasty}). دقیقاً ۳ پاراگراف: پ۱-صحنه آغازین واضح. پ۲-مسیر سلطنت و تنش اصلی. پ۳-میراث و یک سوال تاریخی بی‌پاسخ. بدون نقل قول، بدون تیتر، رزومه نباشد. منابع استفاده شده: ${sources}\n\nدر خطوط جدید اضافه کنید:\nSOURCES: [2-3 منبع محدود با کاما]\nCERTAINTY: [HIGH یا MEDIUM یا LOW]`;

  try {
    const response = await (await getAiAsync()).models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    
    if (!response.text) return '';
    const parsed = parseAIResponse(response.text);
    const finalUI = formatAIResponseForUI(parsed, lang);
    setCache(cacheKey, finalUI);
    return finalUI;
  } catch (error) {
    return handleAIError(error, lang);
  }
}

export async function generateAlternateHistory(eventDescription: string, rulerName: string, regionName: string, year: number, lang: 'en' | 'fa', customPrompt?: string): Promise<string> {
  const cacheKey = `whatif_${rulerName}_${regionName}_${year}_${lang}_${customPrompt || 'default'}`;
  const cached = getCached<string>(cacheKey);
  if (cached) return cached;

  const sources = getSourcesForPeriod(year);
  const realismEn = "Plausible cause-and-effect. Acknowledge uncertainty. No definitively false claims.";
  const realismFa = "علت و معلول منطقی. پذیرش عدم قطعیت. دفاع تاریخی معقول.";
  
  let prompt = '';
  if (customPrompt) {
    prompt = lang === 'en'
      ? `Historian voice. Context: ${rulerName} in ${regionName} around ${Math.abs(year)}${year<0?'BC':'AD'}. "What If": "${customPrompt}". Explain changes to region + ripple effects. ${realismEn} Exactly 2 paragraphs. Sources: ${sources}\n\nAppend:\nSOURCES: [2-3 sources]\nCERTAINTY: [HIGH أو MEDIUM أو LOW]`
      : `لحن مورخ. زمینه: ${rulerName} در ${regionName} حدود ${Math.abs(year)}${year<0?'ق.م':'م'}. چه میشد اگر: "${customPrompt}". تغییرات منطقه و اثرات موجی را توضیح دهید. ${realismFa} دقیقا ۲ پاراگراف. منابع: ${sources}\n\nاضافه کنید:\nSOURCES: [2-3 منابع]\nCERTAINTY: [HIGH یا MEDIUM یا LOW]`;
  } else {
    prompt = lang === 'en'
      ? `Historian voice. Context: ${rulerName} in ${regionName} around ${Math.abs(year)}${year<0?'BC':'AD'}. Invent 1 alternative path for a major event (e.g. diplomacy, succession, disaster). Explain "What If" scenario, changes to region + ripple effects. ${realismEn} Exactly 2 paragraphs. Sources: ${sources}\n\nAppend:\nSOURCES: [2-3 sources]\nCERTAINTY: [HIGH/MEDIUM/LOW]`
      : `لحن مورخ. زمینه: ${rulerName} در ${regionName} حدود ${Math.abs(year)}${year<0?'ق.م':'م'}. یک مسیر متفاوت برای رویدادی بزرگ پیشنهاد دهید. سناریو، تغییرات و اثرات موجی را توضیح دهید. ${realismFa} دقیقا ۲ پاراگراف. منابع: ${sources}\n\nاضافه کنید:\nSOURCES: [2-3 منابع]\nCERTAINTY: [HIGH/MEDIUM/LOW]`;
  }

  try {
    const response = await (await getAiAsync()).models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    if (!response.text) return '';
    const parsed = parseAIResponse(response.text);
    const finalUI = formatAIResponseForUI(parsed, lang);
    setCache(cacheKey, finalUI);
    return finalUI;
  } catch (error) {
    return handleAIError(error, lang);
  }
}

export async function generateHistoricalEventWhatIf(eventTitle: string, eventDesc: string, year: number, lang: 'en' | 'fa', customPrompt?: string): Promise<string> {
  const cacheKey = `event_whatif_${eventTitle}_${year}_${lang}_${customPrompt || 'default'}`;
  const cached = getCached<string>(cacheKey);
  if (cached) return cached;

  const sources = getSourcesForPeriod(year);
  const realismEn = "Logical cause-and-effect. Acknowledge uncertainty. Defensible claims.";
  const realismFa = "علت و معلول منطقی. پذیرش عدم قطعیت. دفاع معقول.";

  let prompt = '';
  if (customPrompt) {
    prompt = lang === 'en'
      ? `Historian voice. Event "${eventTitle}" (${eventDesc}) in ${Math.abs(year)}${year<0?'BC':'AD'}. "What If": "${customPrompt}". Changes to region & world. ${realismEn} Exactly 2 paragraphs. Sources: ${sources}\n\nAppend:\nSOURCES: [2-3 sources]\nCERTAINTY: [HIGH/MEDIUM/LOW]`
      : `لحن مورخ. رویداد "${eventTitle}" (${eventDesc}) در سال ${Math.abs(year)}${year<0?'ق.م':'م'}. "چه میشد اگر": "${customPrompt}". اثرات بر منطقه. ${realismFa} دقیقا ۲ پاراگراف. منابع: ${sources}\n\nاضافه کنید:\nSOURCES: [2-3 منابع]\nCERTAINTY: [HIGH/MEDIUM/LOW]`;
  } else {
    prompt = lang === 'en'
      ? `Historian voice. Event "${eventTitle}" (${eventDesc}) in ${Math.abs(year)}${year<0?'BC':'AD'}. Explore 1 divergence path (e.g. diplomacy, succession, disaster). Changes to region & ripples. ${realismEn} Exactly 2 paragraphs. Sources: ${sources}\n\nAppend:\nSOURCES: [2-3 sources]\nCERTAINTY: [HIGH/MEDIUM/LOW]`
      : `لحن مورخ. رویداد "${eventTitle}" (${eventDesc}) در سال ${Math.abs(year)}${year<0?'ق.م':'م'}. یک انحراف مسیر پیشنهاد دهید. اثرات منطقه ای چیست؟ ${realismFa} دقیقا ۲ پاراگراف. منابع: ${sources}\n\nاضافه کنید:\nSOURCES: [2-3 منابع]\nCERTAINTY: [HIGH/MEDIUM/LOW]`;
  }

  try {
    const response = await (await getAiAsync()).models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    if (!response.text) return '';
    const parsed = parseAIResponse(response.text);
    const finalUI = formatAIResponseForUI(parsed, lang);
    setCache(cacheKey, finalUI);
    return finalUI;
  } catch (error) {
    return handleAIError(error, lang);
  }
}

export async function chatWithAssistant(history: { role: 'user' | 'model', text: string }[], message: string, lang: 'en' | 'fa'): Promise<string> {
  const systemInstruction = lang === 'en'
    ? "You are a knowledgeable Historical Assistant specializing in the history of Greater Iran, its dynasties, rulers, and regions. Provide accurate, engaging, and concise answers."
    : "شما یک دستیار تاریخی مطلع هستید که در تاریخ ایران بزرگ، دودمان‌ها، حاکمان و مناطق آن تخصص دارید. پاسخ‌های دقیق، جذاب و مختصر ارائه دهید.";

  try {
    const isContextQuery = history.length === 0;
    // Hash message to prevent huge keys
    const msgHash = message.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0).toString();
    const cacheKey = `chat_${msgHash}_${lang}`;
    
    if (isContextQuery) {
      const cached = getCached<string>(cacheKey);
      if (cached) return cached;
    }

    const chat = (await getAiAsync()).chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction,
      },
    });

    // We need to simulate the history if the SDK doesn't support passing history directly in create.
    // Actually, we can just send the latest message, but to keep context, we can pass the history as a single prompt if needed,
    // or use the chat session. Since we create a new chat instance here, it won't have the history.
    // Let's format the history into the message for context.
    let fullPrompt = message;
    if (history.length > 0) {
        fullPrompt = "Previous conversation:\n" + history.map(h => `${h.role}: ${h.text}`).join('\n') + `\n\nUser: ${message}`;
    }

    const response = await chat.sendMessage({ message: fullPrompt });
    const text = response.text || '';
    
    if (isContextQuery && text) {
      setCache(cacheKey, text);
    }
    return text;
  } catch (error) {
    return handleAIError(error, lang);
  }
}

const QUIZ_GENERATION_PROMPT = `
You are creating a highly specific, intriguing history trivia question 
about Iranian/Greater Iranian history.
Generate ONE trivia myth/fact for the era around year {YEAR} in THIS LANGUAGE: {LANG}.

The fact MUST be specifically about: {ANGLE}

Output JSON EXACTLY like this:
{
  "myth": "myth or false assumption",
  "answer": "TRUE" | "FALSE" | "IT'S COMPLICATED",
  "reality": "1-2 sentence shocking reality",
  "reveal_hook": "1 short punchy sentence hook",
  "era_link": year
}

Rules:
- MUST be highly specific and random.
- Keep output extremely concise to save tokens.
- Output ONLY valid JSON, no markdown.
`;

const ANGLES = [
  "Major Military or Political Events",
  "Specific Historical Figures or Rulers",
  "Cultural and Literary Figures (Poets, Thinkers, Artists)",
  "Heritage, Architecture, or Famous Artifacts",
  "Scientific Discoveries or Ancient Innovations",
  "Daily Life, Strange Customs, or Economics"
];

export async function generateQuizQuestion(year: number, lang: 'en' | 'fa', askedMyths: string[] = []): Promise<QuizQuestion | string | null> {
  try {
    const randomAngle = ANGLES[Math.floor(Math.random() * ANGLES.length)];
    
    let prompt = QUIZ_GENERATION_PROMPT
      .replace('{YEAR}', year.toString())
      .replace('{LANG}', lang === 'en' ? 'English' : 'Persian (Farsi)')
      .replace('{ANGLE}', randomAngle);

    if (askedMyths.length > 0) {
      prompt += `\n\nCRITICAL: DO NOT generate any of these myths or variations of them:\n${askedMyths.map(m => `- ${m}`).join('\n')}`;
    }

    const requestPayload = {
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            myth: { type: "STRING" },
            answer: { type: "STRING", enum: ["TRUE", "FALSE", "IT'S COMPLICATED"] },
            reality: { type: "STRING" },
            reveal_hook: { type: "STRING" },
            era_link: { type: "INTEGER" }
          },
          required: ["myth", "answer", "reality", "reveal_hook", "era_link"]
        }
      }
    };

    let response;
    try {
      response = await (await getAiAsync()).models.generateContent({
        ...requestPayload,
        model: "gemini-3-flash-preview"
      });
    } catch (primaryError: any) {
      if (primaryError?.message?.includes("503") || primaryError?.message?.includes("high demand") || primaryError?.status === "UNAVAILABLE" || primaryError?.message?.includes("not found")) {
        console.warn("Gemini 3 Flash is experiencing issues, falling back to stable 1.5 Flash...", primaryError);
        response = await (await getAiAsync()).models.generateContent({
          ...requestPayload,
          model: "gemini-1.5-flash"
        });
      } else {
        throw primaryError;
      }
    }

    const text = response.text || "{}";
    const data = JSON.parse(text);
    return {
      id: `ai_quiz_${year}_${Date.now()}`,
      myth: data.myth,
      myth_fa: data.myth,
      answer: data.answer,
      reality: data.reality,
      reality_fa: data.reality,
      reveal_hook: data.reveal_hook,
      reveal_hook_fa: data.reveal_hook,
      era_link: data.era_link,
      difficulty: "MEDIUM",
      sources: [],
      certainty: "HIGH",
      is_ai_generated: true
    } as QuizQuestion;
  } catch (error) {
    console.error("Error generating quiz question:", error);
    return handleAIError(error, lang);
  }
}
