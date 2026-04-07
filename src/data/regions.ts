// src/data/regions.ts
// Hierarchical zone → region → cities data model for Greater Iran
// 5 Zones · 12 Regions

// ─── Types ───────────────────────────────────────────────────────────────────

export type ZoneId =
  | 'core_plateau'
  | 'western_lowlands'
  | 'north_caucasus'
  | 'eastern_expanse'
  | 'ne_frontier';

export type RegionId =
  | 'fars'
  | 'jibal'
  | 'khuzestan'
  | 'mesopotamia'
  | 'azerbaijan'
  | 'caucasus'
  | 'caspian_coast'
  | 'khorasan'
  | 'sistan'
  | 'makran'
  | 'transoxiana'
  | 'chorasmia';

export type EraKey =
  | 'elamite'
  | 'median'
  | 'achaemenid'
  | 'seleucid'
  | 'parthian'
  | 'sasanian'
  | 'umayyad'
  | 'abbasid'
  | 'tahirid'
  | 'saffarid'
  | 'samanid'
  | 'alavid'
  | 'bavandid'
  | 'paduspanid'
  | 'justanid'
  | 'buyid'
  | 'ghaznavid'
  | 'seljuk'
  | 'ilkhanid'
  | 'timurid'
  | 'safavid'
  | 'afsharid'
  | 'zand'
  | 'qajar'
  | 'pahlavi';

export type EraRole = 'heartland' | 'province' | 'frontier' | 'contested' | 'independent' | 'nominal';

export interface AnchorCity {
  name: string;
  nameFa: string;
  lat: number;
  lng: number;
  /** Historical or ancient names for this city */
  historicalNames?: string[];
}

export interface Region {
  id: RegionId;
  zone: ZoneId;
  displayName: { 
    en: { full: string; short: string }; 
    fa: { full: string; short: string };
  };
  /** Era-correct name aliases for grounding AI prompts — no hallucination needed */
  aliases: string[];
  anchorCities: AnchorCity[];
  /** Geographic centroid for map dot placement (lat/lng) */
  centroid: { lat: number; lng: number };
  /** Pre-authored era presence data — AI does not need to invent these */
  eraPresence: Partial<Record<EraKey, EraRole>>;
  /** Short description of the region's historical significance */
  significance: { en: string; fa: string };
}

export interface Zone {
  id: ZoneId;
  displayName: { 
    en: { full: string; short: string }; 
    fa: { full: string; short: string };
  };
  regions: RegionId[];
}

// ─── Zone Definitions ─────────────────────────────────────────────────────────

export const zones: Zone[] = [
  {
    id: 'core_plateau',
    displayName: { en: { full: 'Core Plateau', short: 'Plateau' }, fa: { full: 'فلات مرکزی', short: 'فلات' } },
    regions: ['fars', 'jibal', 'khuzestan'],
  },
  {
    id: 'western_lowlands',
    displayName: { en: { full: 'Western Lowlands', short: 'Lowlands' }, fa: { full: 'دشت‌های غربی', short: 'دشت‌ها' } },
    regions: ['mesopotamia'],
  },
  {
    id: 'north_caucasus',
    displayName: { en: { full: 'North & Caucasus', short: 'North' }, fa: { full: 'شمال و قفقاز', short: 'شمال' } },
    regions: ['azerbaijan', 'caucasus', 'caspian_coast'],
  },
  {
    id: 'eastern_expanse',
    displayName: { en: { full: 'Eastern Expanse', short: 'East' }, fa: { full: 'پهنه شرقی', short: 'شرق' } },
    regions: ['khorasan', 'sistan', 'makran'],
  },
  {
    id: 'ne_frontier',
    displayName: { en: { full: 'NE Frontier', short: 'Frontier' }, fa: { full: 'مرز شمال‌شرقی', short: 'مرز' } },
    regions: ['transoxiana', 'chorasmia'],
  },
];

// ─── Region Definitions ───────────────────────────────────────────────────────

export const regions: Region[] = [

  // ── Zone 1: Core Plateau ───────────────────────────────────────────────────

  {
    id: 'fars',
    zone: 'core_plateau',
    displayName: { en: { full: 'Fars / Persis', short: 'Fars' }, fa: { full: 'فارس', short: 'فارس' } },
    aliases: ['Persis', 'Parsa', 'Pars', 'Pārs', 'Parsua', 'Persies', 'Eran-khwarrah-Shapur'],
    anchorCities: [
      { name: 'Persepolis', nameFa: 'تخت جمشید', lat: 29.935, lng: 52.891, historicalNames: ['Parsa', 'Takht-e Jamshid'] },
      { name: 'Shiraz', nameFa: 'شیراز', lat: 29.591, lng: 52.583 },
      { name: 'Pasargadae', nameFa: 'پاسارگاد', lat: 30.193, lng: 53.168, historicalNames: ['Pasargad'] },
      { name: 'Istakhr', nameFa: 'استخر', lat: 29.979, lng: 52.816, historicalNames: ['Stakhr'] },
      { name: 'Bishapur', nameFa: 'بیشاپور', lat: 29.776, lng: 51.570 },
      { name: 'Gor (Firuzabad)', nameFa: 'گور (فیروزآباد)', lat: 28.852, lng: 52.560, historicalNames: ['Ardashir-Khwarrah', 'Gur'] },
    ],
    centroid: { lat: 29.7, lng: 52.5 },
    eraPresence: {
      achaemenid: 'heartland',
      seleucid: 'province',
      parthian: 'province',
      sasanian: 'heartland',
      umayyad: 'province',
      abbasid: 'province',
      buyid: 'heartland',
      safavid: 'province',
    },
    significance: {
      en: 'Dynastic homeland of the Achaemenid and Sasanian empires; birthplace of the Persian language and identity.',
      fa: 'خاستگاه سلسله‌های هخامنشی و ساسانی؛ مهد زبان و هویت ایرانی.',
    },
  },

  {
    id: 'jibal',
    zone: 'core_plateau',
    displayName: { en: { full: 'Jibal / Media', short: 'Jibal' }, fa: { full: 'جبال / ماد', short: 'جبال' } },
    aliases: ['Media', 'Pahla', 'Pahlav', 'Persian Iraq', 'Iraq-i Ajam', 'Al-Mahat', 'Mada', 'Māy', 'Irāq-e Ajamī'],
    anchorCities: [
      { name: 'Ecbatana (Hamadan)', nameFa: 'هگمتانه (همدان)', lat: 34.799, lng: 48.515, historicalNames: ['Ecbatana', 'Agbatana', 'Hegmataneh'] },
      { name: 'Isfahan', nameFa: 'اصفهان', lat: 32.661, lng: 51.680, historicalNames: ['Spahan', 'Aspadana'] },
      { name: 'Rayy', nameFa: 'ری', lat: 35.598, lng: 51.503, historicalNames: ['Ray', 'Rhagae', 'Raga'] },
      { name: 'Nihavand', nameFa: 'نهاوند', lat: 34.200, lng: 48.367, historicalNames: ['Nehavand', 'Nihawand', 'Laodicea'] },
      { name: 'Qazvin', nameFa: 'قزوین', lat: 36.270, lng: 50.004 },
    ],
    centroid: { lat: 33.5, lng: 50.0 },
    eraPresence: {
      median: 'heartland',
      achaemenid: 'province',
      seleucid: 'province',
      parthian: 'province',
      sasanian: 'province',
      abbasid: 'province',
      buyid: 'province',
      seljuk: 'heartland',
      ilkhanid: 'heartland',
      safavid: 'heartland',
    },
    significance: {
      en: 'Homeland of the Medes; strategic plateau pivot connecting east and west; seat of the Adur Gushnasp sacred fire.',
      fa: 'خاستگاه مادها؛ محور استراتژیک فلات ایران میان شرق و غرب؛ جایگاه آتش مقدس آذر گشنسب.',
    },
  },

  {
    id: 'khuzestan',
    zone: 'core_plateau',
    displayName: { en: { full: 'Khuzestan / Elam', short: 'Khuzestan' }, fa: { full: 'خوزستان', short: 'خوزستان' } },
    aliases: ['Elam', 'Susiana', 'Huzistan', 'Hūzestān', 'Elymais', 'Xuzestan', 'Arabistan'],
    anchorCities: [
      { name: 'Susa', nameFa: 'شوش', lat: 32.188, lng: 48.258, historicalNames: ['Shush', 'Shushan', 'Aqatana'] },
      { name: 'Gundeshapur', nameFa: 'گندیشاپور', lat: 32.310, lng: 48.550, historicalNames: ['Jundi-Sabur', 'Beth Lapat', 'Jundaysabur'] },
      { name: 'Ahvaz', nameFa: 'اهواز', lat: 31.319, lng: 48.671, historicalNames: ['Hormozd-Ardashir'] },
      { name: 'Shushtar', nameFa: 'شوشتر', lat: 32.045, lng: 48.853, historicalNames: ['Tustar', 'Thurushter'] },
      { name: 'Chogha Zanbil', nameFa: 'چغازنبیل', lat: 32.010, lng: 48.524, historicalNames: ['Dur Untash'] },
    ],
    centroid: { lat: 32.0, lng: 48.7 },
    eraPresence: {
      elamite: 'heartland',
      achaemenid: 'province',
      seleucid: 'province',
      parthian: 'province',
      sasanian: 'province',
      abbasid: 'province',
      buyid: 'province',
    },
    significance: {
      en: 'Seat of ancient Elamite civilization; industrial and agricultural hub; site of the Academy of Gundishapur.',
      fa: 'خاستگاه تمدن کهن عیلام؛ مرکز صنعتی و کشاورزی؛ جایگاه آکادمی گندیشاپور.',
    },
  },

  // ── Zone 2: Western Lowlands ───────────────────────────────────────────────

  {
    id: 'mesopotamia',
    zone: 'western_lowlands',
    displayName: { en: { full: 'Mesopotamia / Sawad', short: 'Mesopotamia' }, fa: { full: 'بین‌النهرین / سواد', short: 'عراق' } },
    aliases: ['Asorestan', 'Āsōrestān', 'Babylonia', 'Iraq-i Arab', 'Irāq al-Arabī', 'Sawad', 'Mēšān', 'Suristan', 'Del-e Eranshahr'],
    anchorCities: [
      { name: 'Ctesiphon', nameFa: 'تیسفون', lat: 33.094, lng: 44.581, historicalNames: ['al-Madain', 'Taysafun', 'Veh-Ardashir'] },
      { name: 'Babylon', nameFa: 'بابل', lat: 32.542, lng: 44.421, historicalNames: ['Babel', 'Babilim'] },
      { name: 'Baghdad', nameFa: 'بغداد', lat: 33.341, lng: 44.400, historicalNames: ['Dar al-Salam', 'Madinat al-Salam'] },
      { name: 'Al-Hira', nameFa: 'حیره', lat: 31.990, lng: 44.410, historicalNames: ['Hira', 'Al-Hira'] },
      { name: 'Seleucia', nameFa: 'سلوکیه', lat: 33.089, lng: 44.559, historicalNames: ['Seleucia-on-the-Tigris', 'Kokhe'] },
    ],
    centroid: { lat: 33.0, lng: 44.4 },
    eraPresence: {
      achaemenid: 'heartland',
      seleucid: 'heartland',
      parthian: 'heartland',
      sasanian: 'heartland',
      umayyad: 'heartland',
      abbasid: 'heartland',
      ilkhanid: 'province',
    },
    significance: {
      en: 'Imperial heartland and winter capital; economic engine of the empire; center of Jewish, Christian, and Islamic scholarship.',
      fa: 'مرکز امپراتوری و پایتخت زمستانی؛ موتور اقتصادی امپراتوری؛ کانون علم یهودی، مسیحی و اسلامی.',
    },
  },

  // ── Zone 3: North & Caucasus ───────────────────────────────────────────────

  {
    id: 'azerbaijan',
    zone: 'north_caucasus',
    displayName: { en: { full: 'Azerbaijan / Media', short: 'Azerbaijan' }, fa: { full: 'آذربایجان', short: 'آذربایجان' } },
    aliases: ['Adurbadagan', 'Atropatene', 'Atrapatkan', 'Ādurbāyagān', 'Adharbādhakān', 'Adourbadene', 'Media Atropatene'],
    anchorCities: [
      { name: 'Ganzak (Takht-e Soleyman)', nameFa: 'گنزک (تخت سلیمان)', lat: 36.602, lng: 47.237, historicalNames: ['Shiz', 'Gandzak'] },
      { name: 'Tabriz', nameFa: 'تبریز', lat: 38.080, lng: 46.293, historicalNames: ['Tauris', 'Tebriz'] },
      { name: 'Ardabil', nameFa: 'اردبیل', lat: 38.249, lng: 48.299, historicalNames: ['Ardabīl', 'Artavil'] },
      { name: 'Maragheh', nameFa: 'مراغه', lat: 37.398, lng: 46.237, historicalNames: ['Maragha', 'Maraghah'] },
      { name: 'Urmia', nameFa: 'ارومیه', lat: 37.553, lng: 45.075, historicalNames: ['Ormi', 'Urmia', 'Rizaiyeh'] },
    ],
    centroid: { lat: 37.5, lng: 46.8 },
    eraPresence: {
      median: 'province',
      achaemenid: 'province',
      seleucid: 'independent',
      parthian: 'frontier',
      sasanian: 'province',
      umayyad: 'contested',
      abbasid: 'province',
      ilkhanid: 'heartland',
      safavid: 'heartland',
    },
    significance: {
      en: 'Religious stronghold and military frontier; site of the Adur Gushnasp fire temple; heartland of the Safavid dynasty.',
      fa: 'دژ مذهبی و مرز نظامی؛ جایگاه آتشکده آذر گشنسب؛ خاستگاه سلسله صفوی.',
    },
  },

  {
    id: 'caucasus',
    zone: 'north_caucasus',
    displayName: { en: { full: 'The Caucasus / Arran', short: 'Caucasus' }, fa: { full: 'قفقاز / ارران', short: 'قفقاز' } },
    aliases: ['Armenia', 'Armin', 'Arran', 'Albania', 'Iberia', 'Georgia', 'Viruzān', 'Balāsagān', 'Lazica'],
    anchorCities: [
      { name: 'Darband (Derbent)', nameFa: 'دربند', lat: 42.058, lng: 48.287, historicalNames: ['al-Bab', 'Bab al-Abwab', 'Chor'] },
      { name: "Barda'a (Partav)", nameFa: 'بردعه (پرتاو)', lat: 40.378, lng: 47.135, historicalNames: ["P'artaw", 'Partav', 'Barda'] },
      { name: 'Artaxata', nameFa: 'آرتاشات', lat: 39.956, lng: 44.549, historicalNames: ['Artashat'] },
      { name: 'Tbilisi', nameFa: 'تفلیس', lat: 41.694, lng: 44.834, historicalNames: ['Tiflis', 'Tphilisi'] },
      { name: 'Ganja', nameFa: 'گنجه', lat: 40.682, lng: 46.360, historicalNames: ['Gandja', 'Elizavetpol'] },
    ],
    centroid: { lat: 41.0, lng: 46.5 },
    eraPresence: {
      achaemenid: 'province',
      seleucid: 'frontier',
      parthian: 'contested',
      sasanian: 'province',
      umayyad: 'contested',
      abbasid: 'province',
      ilkhanid: 'province',
    },
    significance: {
      en: 'Fortified frontier zone; the "Iron Gate" at Derbent defended the empire against northern steppe nomads (Huns, Khazars).',
      fa: 'مرز مستحکم؛ دروازه آهنین دربند از امپراتوری در برابر کوچروان استپی شمالی (هون‌ها، خزرها) دفاع می‌کرد.',
    },
  },

  {
    id: 'caspian_coast',
    zone: 'north_caucasus',
    displayName: { en: { full: 'Caspian / Tabaristan', short: 'Caspian' }, fa: { full: 'سواحل خزر / طبرستان', short: 'خزر' } },
    aliases: ['Tabaristan', 'Gilan', 'Mazandaran', 'Hyrcania', 'Parishkhwar', 'Padishkhwargar', 'Gełan', 'Varkana'],
    anchorCities: [
      { name: 'Amul (Amol)', nameFa: 'آمل', lat: 36.471, lng: 52.357, historicalNames: ['Amol', 'Amul'] },
      { name: 'Sari', nameFa: 'ساری', lat: 36.563, lng: 53.060, historicalNames: ['Shahr-e Tabaristan'] },
      { name: 'Gorgan', nameFa: 'گرگان', lat: 36.840, lng: 54.443, historicalNames: ['Gurgan', 'Hyrcania', 'Jurjan'] },
      { name: 'Rasht', nameFa: 'رشت', lat: 37.280, lng: 49.583 },
      { name: 'Noor (Ruyan)', nameFa: 'نور (رویان)', lat: 36.577, lng: 52.016, historicalNames: ['Nūr', 'Ruyan'] },
      { name: 'Kajur (Kujur)', nameFa: 'کجور', lat: 36.495, lng: 51.722, historicalNames: ['Kojur', 'Kujur'] },
    ],
    centroid: { lat: 36.7, lng: 52.5 },
    eraPresence: {
      achaemenid: 'province',
      parthian: 'province',
      sasanian: 'province',
      umayyad: 'contested',
      abbasid: 'nominal',
      alavid: 'heartland',
      bavandid: 'heartland',
      paduspanid: 'heartland',
      justanid: 'heartland',
      buyid: 'heartland',
      seljuk: 'province',
      safavid: 'province',
    },
    significance: {
      en: 'Impenetrable mountain fortress; frequent refuge for rebels and independent dynasties; home of Dailamite warriors.',
      fa: 'دژ کوهستانی نفوذناپذیر؛ پناهگاه مکرر شورشیان و سلسله‌های مستقل؛ خانه دیلمیان.',
    },
  },

  // ── Zone 4: Eastern Expanse ────────────────────────────────────────────────

  {
    id: 'khorasan',
    zone: 'eastern_expanse',
    displayName: { en: { full: 'Greater Khorasan', short: 'Khorasan' }, fa: { full: 'خراسان بزرگ', short: 'خراسان' } },
    aliases: ['Abarshahr', 'Parthia', 'Parthava', 'Xwarāsān', 'Ariana', 'Land of the Rising Sun', 'Harēv', 'Verkāna'],
    anchorCities: [
      { name: 'Nishapur', nameFa: 'نیشابور', lat: 36.213, lng: 58.796, historicalNames: ['Neyshabur', 'Abarshahr', 'Shapur-Kart'] },
      { name: 'Merv', nameFa: 'مرو', lat: 37.653, lng: 62.191, historicalNames: ['Marw al-Shahijan', 'Margiana', 'Mary'] },
      { name: 'Herat', nameFa: 'هرات', lat: 34.352, lng: 62.204, historicalNames: ['Harev', 'Alexandria of the Arians'] },
      { name: 'Balkh', nameFa: 'بلخ', lat: 36.756, lng: 66.897, historicalNames: ['Baxl', 'Bactra', 'Zariaspa'] },
      { name: 'Tus', nameFa: 'توس', lat: 36.343, lng: 59.513, historicalNames: ['Toos'] },
    ],
    centroid: { lat: 36.0, lng: 62.0 },
    eraPresence: {
      achaemenid: 'province',
      seleucid: 'province',
      parthian: 'heartland',
      sasanian: 'province',
      umayyad: 'contested',
      abbasid: 'province',
      tahirid: 'heartland',
      samanid: 'heartland',
      ghaznavid: 'heartland',
      seljuk: 'heartland',
      ilkhanid: 'contested',
      timurid: 'heartland',
    },
    significance: {
      en: 'Eastern cultural capital; birthplace of New Persian literature; Silk Road gateway; defined by its four great cities: Nishapur, Merv, Herat, Balkh.',
      fa: 'پایتخت فرهنگی شرق؛ مهد ادبیات فارسی نو؛ دروازه جاده ابریشم؛ تعریف‌شده توسط چهار شهر بزرگ: نیشابور، مرو، هرات، بلخ.',
    },
  },

  {
    id: 'sistan',
    zone: 'eastern_expanse',
    displayName: { en: { full: 'Sistan / Sakastan', short: 'Sistan' }, fa: { full: 'سیستان و زابلستان', short: 'سیستان' } },
    aliases: ['Sagestan', 'Drangiana', 'Sakastan', 'Seistan', 'Sagestān', 'Nimroz', 'Nimruz', 'Rukhkhudh'],
    anchorCities: [
      { name: 'Zaranj', nameFa: 'زرنج', lat: 30.958, lng: 61.864, historicalNames: ['Zarang', 'Zranka'] },
      { name: 'Ghazni', nameFa: 'غزنی', lat: 33.554, lng: 68.422, historicalNames: ['Ghazna', 'Ghaznain'] },
      { name: 'Bust', nameFa: 'بست', lat: 31.558, lng: 64.357, historicalNames: ['Bost', 'Lashkargah'] },
      { name: 'Kandahar', nameFa: 'کندهار', lat: 31.628, lng: 65.710, historicalNames: ['Alexandria Arachosia', 'Iskandariyya'] },
    ],
    centroid: { lat: 31.5, lng: 64.0 },
    eraPresence: {
      achaemenid: 'province',
      seleucid: 'province',
      parthian: 'province',
      sasanian: 'province',
      umayyad: 'contested',
      abbasid: 'province',
      saffarid: 'heartland',
      samanid: 'province',
      ghaznavid: 'heartland',
      seljuk: 'province',
    },
    significance: {
      en: 'Legendary homeland of Iranian epic hero Rostam; base of the Saffarid and Ghaznavid dynasties; Helmand River basin civilization.',
      fa: 'خاستگاه افسانه‌ای رستم قهرمان حماسه ایرانی؛ پایگاه سلسله‌های صفاریان و غزنویان؛ تمدن حوضه رود هیرمند.',
    },
  },

  {
    id: 'makran',
    zone: 'eastern_expanse',
    displayName: { en: { full: 'Makran / Gedrosia', short: 'Makran' }, fa: { full: 'مکران و بلوچستان', short: 'مکران' } },
    aliases: ['Gedrosia', 'Turan', 'Maka', 'Balāsakān', 'Pāradān', 'Baluchistan', 'Makuran', 'Turgistan', 'Kirman coast'],
    anchorCities: [
      { name: 'Tiz (Chabahar)', nameFa: 'تیز (چابهار)', lat: 25.289, lng: 60.643, historicalNames: ['Tiz', 'Mosarna'] },
      { name: 'Quetta', nameFa: 'کوئته', lat: 30.183, lng: 67.008, historicalNames: ['Shalkot'] },
      { name: 'Panjgur', nameFa: 'پنجگور', lat: 26.969, lng: 64.101 },
      { name: 'Gwadar', nameFa: 'گوادر', lat: 25.121, lng: 62.325 },
    ],
    centroid: { lat: 27.0, lng: 63.5 },
    eraPresence: {
      achaemenid: 'province',
      seleucid: 'province',
      parthian: 'province',
      sasanian: 'province',
      umayyad: 'province',
      abbasid: 'province',
    },
    significance: {
      en: 'Strategic maritime corridor linking Greater Iran to India and East Africa; part of the Sasanian southern military quarter (Nimruz).',
      fa: 'دالان دریایی استراتژیک پیوند دهنده ایران بزرگ به هند و آفریقای شرقی؛ بخشی از ربع نظامی جنوبی ساسانیان (نیمروز).',
    },
  },

  // ── Zone 5: NE Frontier ────────────────────────────────────────────────────

  {
    id: 'transoxiana',
    zone: 'ne_frontier',
    displayName: { en: { full: 'Transoxiana / Sogdia', short: 'Transoxiana' }, fa: { full: 'فرارود / ماوراءالنهر', short: 'فرارود' } },
    aliases: ["Sogdia", 'Ma Wara un-Nahr', 'Sogdiana', 'Mawara un Nahr', 'Sodikene', 'Suguda', 'Osrūšana'],
    anchorCities: [
      { name: 'Samarkand', nameFa: 'سمرقند', lat: 39.655, lng: 66.975, historicalNames: ['Maracanda', 'Afrasiab'] },
      { name: 'Bukhara', nameFa: 'بخارا', lat: 39.768, lng: 64.422, historicalNames: ['Numijkath', 'Bukhara'] },
      { name: 'Panjikent', nameFa: 'پنجکنت', lat: 39.492, lng: 67.607, historicalNames: ['Panjikath', 'Bunjikat'] },
      { name: 'Khujand', nameFa: 'خوجند', lat: 40.280, lng: 69.620, historicalNames: ['Khojend', 'Alexandria Eskhata'] },
    ],
    centroid: { lat: 39.8, lng: 66.5 },
    eraPresence: {
      achaemenid: 'province',
      seleucid: 'province',
      parthian: 'frontier',
      sasanian: 'frontier',
      umayyad: 'contested',
      abbasid: 'province',
      samanid: 'heartland',
      ghaznavid: 'province',
      seljuk: 'province',
      ilkhanid: 'province',
      timurid: 'heartland',
    },
    significance: {
      en: 'Domain of the Sogdians, the Silk Road\'s greatest merchants; cradle of the Samanid dynasty; center of the Persian literary renaissance.',
      fa: 'قلمرو سغدیان، بزرگ‌ترین بازرگانان جاده ابریشم؛ مهد سلسله سامانیان؛ کانون رنسانس ادبی فارسی.',
    },
  },

  {
    id: 'chorasmia',
    zone: 'ne_frontier',
    displayName: { en: { full: 'Chorasmia / Khwarazm', short: 'Chorasmia' }, fa: { full: 'خوارزم', short: 'خوارزم' } },
    aliases: ['Khwarazm', 'Khwārizm', 'Khwarezm', 'Khorezm', 'Uwarazmiy', 'Airyanem Vaejah', 'Īrānvēj'],
    anchorCities: [
      { name: 'Kath', nameFa: 'کاث', lat: 42.031, lng: 61.119, historicalNames: ['Kath', 'Al-Fil'] },
      { name: 'Gurganj (Urgench)', nameFa: 'گرگانج (اورگنج)', lat: 41.665, lng: 60.632, historicalNames: ['Kunya-Urgench', 'Urgandj'] },
      { name: 'Khiva', nameFa: 'خیوه', lat: 41.378, lng: 60.362, historicalNames: ['Khwarazm city', 'Itchan Kala'] },
      { name: 'Toprak Kala', nameFa: 'توپراق کالا', lat: 41.925, lng: 60.790, historicalNames: ['Topraq Qala'] },
    ],
    centroid: { lat: 41.7, lng: 60.8 },
    eraPresence: {
      achaemenid: 'province',
      seleucid: 'independent',
      parthian: 'independent',
      sasanian: 'frontier',
      umayyad: 'contested',
      abbasid: 'province',
      samanid: 'province',
      ghaznavid: 'province',
      seljuk: 'independent',
      ilkhanid: 'province',
    },
    significance: {
      en: 'Resilient hydraulic oasis civilization on the Oxus delta; possible cradle of Zoroastrianism (Airyanem Vaejah); birthplace of al-Khwarizmi.',
      fa: 'تمدن مقاوم واحه هیدرولیکی بر دلتای آمودریا؛ شاید مهد زرتشت‌گری (ایران‌ویج)؛ زادگاه الخوارزمی.',
    },
  },
];

// ─── Lookup Helpers ───────────────────────────────────────────────────────────

/** Get a region by its stable machine ID */
export function getRegionById(id: RegionId): Region | undefined {
  return regions.find(r => r.id === id);
}

/** Get all regions belonging to a zone */
export function getRegionsByZone(zoneId: ZoneId): Region[] {
  return regions.filter(r => r.zone === zoneId);
}

/** Get a zone by its ID */
export function getZoneById(id: ZoneId): Zone | undefined {
  return zones.find(z => z.id === id);
}

/** Build a comma-separated alias string for use in AI prompts */
export function getAliasPromptString(regionId: RegionId): string {
  const region = getRegionById(regionId);
  if (!region) return '';
  return `${region.displayName.en.full} (also known as: ${region.aliases.join(', ')})`;
}

/** Get all anchor city names (including historical) for a region — for AI grounding */
export function getAllCityNames(regionId: RegionId): string[] {
  const region = getRegionById(regionId);
  if (!region) return [];
  return region.anchorCities.flatMap(c => [c.name, ...(c.historicalNames ?? [])]);
}
