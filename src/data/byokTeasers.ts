// src/data/byokTeasers.ts

export interface ByokTeaser {
  eraId: string;                       // matches historianCards.ts eraId
  yearRange: { start: number; end: number };
  teaser: { en: string; fa?: string }; // fa is optional — falls back to en
  cta:    { en: string; fa?: string }; // call-to-action label on the button
}

export const byokTeasers: ByokTeaser[] = [
  {
    eraId: 'prehistoric',
    yearRange: { start: -3000, end: -700 },
    teaser: { en: 'The earliest Iranians carved an empire from nothing. What were they building toward?' },
    cta:    { en: 'Explore the origins' },
  },
  {
    eraId: 'median',
    yearRange: { start: -700, end: -550 },
    teaser: { en: 'A nomadic confederation unified and toppled the Assyrian superpower. How?' },
    cta:    { en: 'Discover how they won' },
  },
  {
    eraId: 'achaemenid',
    yearRange: { start: -550, end: -330 },
    teaser: { en: 'Cyrus freed the Jews, respected local gods, and built the first human rights charter. Unlock his story.' },
    cta:    { en: 'Unlock his story' },
  },
  {
    eraId: 'hellenistic',
    yearRange: { start: -330, end: -247 },
    teaser: { en: 'Alexander burned Persepolis — but the Persian elite survived and began a quiet resistance. Find out how.' },
    cta:    { en: 'Find out how' },
  },
  {
    eraId: 'parthian',
    yearRange: { start: -247, end: 224 },
    teaser: { en: 'For 400 years, the Parthians held Rome at bay with horse archers and Iranian culture. Discover their strategy.' },
    cta:    { en: 'Discover their strategy' },
  },
  {
    eraId: 'sasanian',
    yearRange: { start: 224, end: 651 },
    teaser: { en: 'In 600 AD, an Iranian Vazir was translating Indian wisdom into Persian — while the empire crumbled around him.' },
    cta:    { en: 'Read his story' },
  },
  {
    eraId: 'early_islamic',
    yearRange: { start: 651, end: 820 },
    teaser: { en: 'The Arab armies conquered Iran — but Iranian bureaucrats ran the caliphate in Persian. Unlock the paradox.' },
    cta:    { en: 'Unlock the paradox' },
  },
  {
    eraId: 'iranian_renaissance',
    yearRange: { start: 820, end: 1040 },
    teaser: { en: 'Under an Arab Caliphate, Iranians produced Ferdowsi, Avicenna, and al-Biruni in one century. How?' },
    cta:    { en: 'Explore the renaissance' },
  },
  {
    eraId: 'seljuk',
    yearRange: { start: 1040, end: 1220 },
    teaser: { en: 'A Turkic warlord conquered Iran — then hired an Iranian Vazir to govern it. His name was Nizam al-Mulk.' },
    cta:    { en: 'Meet Nizam al-Mulk' },
  },
  {
    eraId: 'mongol_invasion',
    yearRange: { start: 1220, end: 1370 },
    teaser: { en: 'The Mongols killed millions — then an Iranian scholar convinced Hulagu to spare the library of Baghdad.' },
    cta:    { en: 'See how he did it' },
  },
  {
    eraId: 'timurid',
    yearRange: { start: 1370, end: 1501 },
    teaser: { en: 'Tamerlane left a trail of skulls — and a son who made Samarkand the cultural capital of the world.' },
    cta:    { en: 'Explore the paradox' },
  },
  {
    eraId: 'safavid',
    yearRange: { start: 1501, end: 1736 },
    teaser: { en: 'Shah Abbas built Isfahan in 30 years — one of the most beautiful cities in human history. Unlock the blueprint.' },
    cta:    { en: 'Unlock the blueprint' },
  },
  {
    eraId: 'afsharid_zand',
    yearRange: { start: 1736, end: 1796 },
    teaser: { en: 'Nader Shah recaptured the Peacock Throne from Delhi — then lost everything within a generation.' },
    cta:    { en: 'Discover what happened' },
  },
  {
    eraId: 'qajar',
    yearRange: { start: 1796, end: 1925 },
    teaser: { en: 'Russia and Britain carved up Iran between them — while Iranian intellectuals invented constitutional democracy.' },
    cta:    { en: 'Read the hidden history' },
  },
  {
    eraId: 'modern',
    yearRange: { start: 1925, end: 2000 },
    teaser: { en: 'Iran had oil, democracy, and a revolution — all within 30 years. AI can help you connect the dots.' },
    cta:    { en: 'Connect the dots' },
  },
];

// Helper: get the teaser for a given year
export function getByokTeaser(year: number): ByokTeaser {
  const match = byokTeasers.find(
    t => year >= t.yearRange.start && year < t.yearRange.end
  );
  return match ?? byokTeasers[byokTeasers.length - 1]; // fallback to last entry
}

// i18n helper: returns the correct language string, falling back to EN
export function getTeaserText(teaser: ByokTeaser, lang: 'en' | 'fa'): {
  text: string;
  cta: string;
} {
  return {
    text: (lang === 'fa' ? teaser.teaser.fa : undefined) ?? teaser.teaser.en,
    cta:  (lang === 'fa' ? teaser.cta.fa : undefined)    ?? teaser.cta.en,
  };
}
