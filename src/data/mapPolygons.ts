// src/data/mapPolygons.ts
// SVG rendering layer — completely separate from the historical data model (regions.ts).
// All coordinates are in the 1000×600 SVG viewport space.
// This file is the ONLY place that knows about SVG polygons and pixel centers.

// ─── Zoom threshold constants ─────────────────────────────────────────────────
export const ZOOM_ANCHOR_CITIES = 1.5;  // tier 1 cities appear (top 1–3 per region)
export const ZOOM_ALL_CITIES    = 2.5;  // tier 2 + 3 cities appear

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MapCity {
  id: string;
  name: { en: string; fa: string };
  /** SVG pixel coordinates [x, y] */
  coordinates: [number, number];
  /**
   * Importance tier:
   *  1 = anchor city  — visible from ZOOM_ANCHOR_CITIES (≥1.5)
   *  2 = major city  — visible from ZOOM_ALL_CITIES (≥2.5)
   *  3 = minor city  — visible from ZOOM_ALL_CITIES + a bit more (≥3.0)
   */
  tier: 1 | 2 | 3;
}

export interface MapPolygon {
  /** Matches Region.id from regions.ts */
  id: string;
  name: { en: string; fa: string };
  /** SVG polygon points string */
  polygon: string;
  /** SVG pixel center [x, y] for label placement */
  center: [number, number];
  /** True for water bodies — styled differently */
  isWater?: boolean;
  /** True for neighbor regions outside the main cultural sphere */
  isNeighbor?: boolean;
  cities?: MapCity[];
}

// ─── Map Polygon Data ─────────────────────────────────────────────────────────
// 12 core regions + water bodies + neighbor regions
// New regions carved from old layout:
//   khuzestan  — carved from between mesopotamia + fars (southwest)
//   azerbaijan — carved from caucasus + upper jibal (northwest)
//   makran     — carved from sistan south coast
//   chorasmia  — carved from upper transoxiana (northwest of oxus delta)

export const mapPolygons: MapPolygon[] = [

  // ── Zone 1: Core Plateau ───────────────────────────────────────────────────

  {
    id: 'fars',
    name: { en: 'Fars', fa: 'فارس' },
    // Reduced slightly: khuzestan takes the western portion (toward mesopotamia)
    polygon: '325,319 346,343 314,367 315,375 338,377 335,392 313,396 342,415 340,425 353,425 346,431 356,432 367,456 456,468 520,446 515,404 494,387 474,335 436,333 434,327 410,336 420,342 403,364 389,356 391,333 401,318 385,312 387,302',
    center: [389, 376],
    cities: [
      { id: 'persepolis', name: { en: 'Persepolis', fa: 'تخت جمشید' }, coordinates: [450, 355], tier: 1 },
      { id: 'shiraz',     name: { en: 'Shiraz',     fa: 'شیراز' },      coordinates: [435, 400], tier: 1 },
      { id: 'pasargadae', name: { en: 'Pasargadae', fa: 'پاسارگاد' },   coordinates: [460, 340], tier: 2 },
      { id: 'istakhr',    name: { en: 'Istakhr',    fa: 'استخر' },      coordinates: [453, 348], tier: 2 },
      { id: 'bishapur',   name: { en: 'Bishapur',   fa: 'بیشاپور' },    coordinates: [380, 380], tier: 3 },
      { id: 'gor',        name: { en: 'Gor (Firuzabad)', fa: 'گور' },   coordinates: [395, 440], tier: 3 },
    ],
  },

  {
    id: 'jibal',
    name: { en: 'Jibal / Media', fa: 'جبال / ماد' },
    // Reduced: azerbaijan carved from the NW corner
    polygon: '231,293 236,331 279,309 325,319 385,301 401,318 389,356 403,364 420,342 410,336 474,335 504,401 540,418 540,438 559,436 571,482 588,486 614,394 584,358 562,286 571,269 544,250 556,241 523,175 521,187 494,177 459,192 365,152 351,172 367,179 359,207 303,243 305,257',
    center: [446, 303],
    cities: [
      { id: 'ecbatana',  name: { en: 'Ecbatana',  fa: 'هگمتانه' },  coordinates: [368, 238], tier: 1 },
      { id: 'isfahan',   name: { en: 'Isfahan',   fa: 'اصفهان' },   coordinates: [425, 295], tier: 1 },
      { id: 'rayy',      name: { en: 'Rayy (Rey)', fa: 'ری' },      coordinates: [410, 205], tier: 1 },
      { id: 'nihavand',  name: { en: 'Nihavand',  fa: 'نهاوند' },   coordinates: [348, 265], tier: 2 },
      { id: 'qazvin',    name: { en: 'Qazvin',    fa: 'قزوین' },    coordinates: [400, 185], tier: 2 },
    ],
  },

  {
    id: 'khuzestan',
    name: { en: 'Khuzestan', fa: 'خوزستان' },
    // Between mesopotamia and fars — the lowland wedge
    polygon: '198,289 198,308 186,319 197,321 204,338 214,338 216,361 200,388 214,386 212,403 235,417 254,409 250,402 261,397 252,396 274,394 269,405 287,406 335,392 336,375 313,374 316,362 346,343 324,324 331,313 279,309 257,314 236,331 240,315 229,302 231,293 268,273 241,284 211,274',
    center: [253, 349],
    cities: [
      { id: 'susa',         name: { en: 'Susa',         fa: 'شوش' },         coordinates: [240, 345], tier: 1 },
      { id: 'gundeshapur',  name: { en: 'Gundeshapur',  fa: 'گندیشاپور' },   coordinates: [270, 330], tier: 1 },
      { id: 'ahvaz',        name: { en: 'Ahvaz',        fa: 'اهواز' },        coordinates: [255, 375], tier: 2 },
      { id: 'shushtar',     name: { en: 'Shushtar',     fa: 'شوشتر' },        coordinates: [235, 355], tier: 3 },
    ],
  },

  // ── Zone 2: Western Lowlands ────────────────────────────────────────────────

  {
    id: 'mesopotamia',
    name: { en: 'Mesopotamia', fa: 'بین‌النهرین' },
    polygon: '-36,300 -41,342 -8,350 76,443 142,450 174,419 234,417 211,402 214,386 200,388 216,361 214,338 204,338 197,321 186,319 198,308 196,277 222,249 228,252 235,240 265,227 278,201 295,196 262,189 270,173 263,167 267,143 242,152 242,141 179,147 130,178 109,183 94,215 58,260',
    center: [183, 279],
    cities: [
      { id: 'ctesiphon', name: { en: 'Ctesiphon', fa: 'تیسفون' },   coordinates: [145, 315], tier: 1 },
      { id: 'babylon',   name: { en: 'Babylon',   fa: 'بابل' },     coordinates: [130, 350], tier: 1 },
      { id: 'baghdad',   name: { en: 'Baghdad',   fa: 'بغداد' },    coordinates: [140, 305], tier: 1 },
      { id: 'al_hira',   name: { en: 'Al-Hira',   fa: 'حیره' },     coordinates: [120, 380], tier: 2 },
      { id: 'seleucia',  name: { en: 'Seleucia',  fa: 'سلوکیه' },   coordinates: [148, 320], tier: 2 },
      { id: 'basra',     name: { en: 'Basra',     fa: 'بصره' },     coordinates: [160, 430], tier: 3 },
      { id: 'kufa',      name: { en: 'Kufa',      fa: 'کوفه' },     coordinates: [128, 362], tier: 3 },
    ],
  },

  // ── Zone 3: North & Caucasus ────────────────────────────────────────────────

  {
    id: 'azerbaijan',
    name: { en: 'Azerbaijan', fa: 'آذربایجان' },
    // Northwestern plateau, carved between caucasus south edge and jibal north
    polygon: '241,85 264,107 250,121 266,123 262,134 270,138 262,189 295,197 278,201 265,227 214,255 196,290 211,274 252,283 305,257 313,249 301,253 303,243 337,229 341,208 359,207 353,197 367,181 351,173 359,155 411,158 400,138 405,130 361,96 262,76',
    center: [302, 186],
    cities: [
      { id: 'ganzak',   name: { en: 'Ganzak (Takht-e Soleyman)', fa: 'گنزک' }, coordinates: [368, 130], tier: 1 },
      { id: 'tabriz',   name: { en: 'Tabriz',  fa: 'تبریز' },    coordinates: [340, 110], tier: 1 },
      { id: 'ardabil',  name: { en: 'Ardabil', fa: 'اردبیل' },   coordinates: [390, 115], tier: 2 },
      { id: 'maragheh', name: { en: 'Maragheh', fa: 'مراغه' },   coordinates: [360, 118], tier: 2 },
      { id: 'urmia',    name: { en: 'Urmia',   fa: 'ارومیه' },   coordinates: [335, 128], tier: 3 },
    ],
  },

  {
    id: 'caucasus',
    name: { en: 'The Caucasus', fa: 'قفقاز' },
    polygon: '58,9 113,23 132,40 126,47 171,44 209,56 214,59 210,65 218,71 252,72 300,89 361,96 406,128 394,113 403,119 397,112 401,114 379,99 397,100 394,98 368,93 306,72 311,75 308,75 312,76 219,33 201,28 186,29 176,23 137,13 110,13 65,5',
    center: [257, 65],
    cities: [
      { id: 'darband',  name: { en: 'Darband (Derbent)', fa: 'دربند' },    coordinates: [296, 68],  tier: 1 },
      { id: 'barda',    name: { en: "Barda'a",            fa: 'بردعه' },    coordinates: [264, 95],  tier: 1 },
      { id: 'artaxata', name: { en: 'Artaxata',           fa: 'آرتاشات' }, coordinates: [220, 105], tier: 2 },
      { id: 'baku',     name: { en: 'Baku',               fa: 'باکو' },     coordinates: [310, 95],  tier: 2 },
      { id: 'ganja',    name: { en: 'Ganja',              fa: 'گنجه' },     coordinates: [280, 90],  tier: 3 },
    ],
  },

  {
    id: 'caspian_coast',
    name: { en: 'Caspian Coast', fa: 'سواحل خزر' },
    // Thin strip along the south Caspian, between caucasus/azerbaijan south shore + jibal north
    polygon: '400,137 416,167 419,180 437,177 442,184 457,186 459,192 469,184 474,188 487,189 494,177 505,182 510,179 521,187 524,173 530,174 524,159 511,152 503,154 503,160 489,155 494,169 486,164 493,165 477,162 461,171 448,171 440,165 439,159 421,154 406,128 400,126 405,130',
    center: [468, 167],
    cities: [
      { id: 'amul',   name: { en: 'Amul (Amol)', fa: 'آمل' },   coordinates: [455, 170], tier: 1 },
      { id: 'sari',   name: { en: 'Sari',        fa: 'ساری' },  coordinates: [478, 168], tier: 1 },
      { id: 'gorgan', name: { en: 'Gorgan',      fa: 'گرگان' }, coordinates: [520, 178], tier: 2 },
      { id: 'rasht',  name: { en: 'Rasht',       fa: 'رشت' },   coordinates: [428, 162], tier: 3 },
    ],
  },

  // ── Zone 4: Eastern Expanse ────────────────────────────────────────────────

  {
    id: 'khorasan',
    name: { en: 'Greater Khorasan', fa: 'خراسان بزرگ' },
    polygon: '523,175 556,241 544,250 571,269 562,286 588,334 584,358 614,396 639,409 629,326 642,325 649,350 673,326 685,335 693,300 710,297 693,268 700,249 690,245 698,203 685,212 666,208 666,179 628,141 552,112 527,113 528,155 541,162 524,159 530,174',
    center: [616, 252],
    cities: [
      { id: 'nishapur', name: { en: 'Nishapur', fa: 'نیشابور' }, coordinates: [582, 240], tier: 1 },
      { id: 'merv',     name: { en: 'Merv',     fa: 'مرو' },     coordinates: [640, 178], tier: 1 },
      { id: 'herat',    name: { en: 'Herat',    fa: 'هرات' },    coordinates: [660, 280], tier: 1 },
      { id: 'balkh',    name: { en: 'Balkh',    fa: 'بلخ' },     coordinates: [700, 270], tier: 2 },
      { id: 'tus',      name: { en: 'Tus',       fa: 'توس' },     coordinates: [594, 232], tier: 2 },
      { id: 'sarakhs',  name: { en: 'Sarakhs',  fa: 'سرخس' },    coordinates: [620, 198], tier: 3 },
    ],
  },

  {
    id: 'sistan',
    name: { en: 'Sistan & Zabulistan', fa: 'سیستان و زابلستان' },
    // Core Sistan basin; makran carved from its southern coast
    polygon: '626,336 634,383 649,395 649,404 636,419 658,434 692,433 707,426 709,393 721,392 719,385 727,377 738,384 743,381 747,338 760,326 757,311 751,312 762,293 755,300 745,290 741,299 732,292 722,295 716,302 716,322 698,342 690,339 689,331 677,337 673,326 649,350 642,325 630,325',
    center: [702, 350],
    cities: [
      { id: 'zaranj',   name: { en: 'Zaranj',   fa: 'زرنج' },   coordinates: [650, 400], tier: 1 },
      { id: 'ghazni',   name: { en: 'Ghazni',   fa: 'غزنی' },   coordinates: [730, 330], tier: 1 },
      { id: 'bust',     name: { en: 'Bust',     fa: 'بست' },     coordinates: [690, 380], tier: 2 },
      { id: 'kandahar', name: { en: 'Kandahar', fa: 'کندهار' }, coordinates: [755, 355], tier: 3 },
    ],
  },

  {
    id: 'makran',
    name: { en: 'Makran & Balochistan', fa: 'مکران و بلوچستان' },
    polygon: '417,467 479,482 544,461 551,493 619,497 686,518 714,515 719,530 730,513 726,470 755,459 763,387 756,371 739,384 727,377 706,400 707,426 681,436 636,420 649,404 647,389 639,385 639,409 615,395 588,486 571,482 578,470 561,464 559,436 536,433 540,418 517,416 521,444 503,455',
    center: [627, 444],
    cities: [
      { id: 'tiz',     name: { en: 'Tiz (Chabahar)', fa: 'تیز' }, coordinates: [620, 500], tier: 1 },
      { id: 'quetta',  name: { en: 'Quetta',        fa: 'کوئته' }, coordinates: [720, 475], tier: 2 },
      { id: 'panjgur', name: { en: 'Panjgur',       fa: 'پنجگور' }, coordinates: [660, 490], tier: 3 },
    ],
  },

  // ── Zone 5: NE Frontier ────────────────────────────────────────────────────

  {
    id: 'transoxiana',
    name: { en: 'Transoxiana', fa: 'فرارود' },
    // Between Oxus (bottom) and Jaxartes (top); chorasmia carved from its west
    polygon: '588,108 663,174 666,208 699,204 702,284 772,262 783,276 815,241 871,231 839,222 804,242 800,188 781,214 740,225 753,188 742,143 761,148 777,116 797,113 798,138 818,142 846,126 792,99 810,81 759,118 722,92 680,22 614,24 612,62 632,91 597,80',
    center: [743, 157],
    cities: [
      { id: 'samarkand', name: { en: 'Samarkand', fa: 'سمرقند' }, coordinates: [732, 138], tier: 1 },
      { id: 'bukhara',   name: { en: 'Bukhara',   fa: 'بخارا' },  coordinates: [676, 122], tier: 1 },
      { id: 'panjikent', name: { en: 'Panjikent', fa: 'پنجکنت' }, coordinates: [750, 130], tier: 2 },
      { id: 'khujand',   name: { en: 'Khujand',   fa: 'خوجند' },  coordinates: [775, 98], tier: 3 },
    ],
  },

  {
    id: 'chorasmia',
    name: { en: 'Chorasmia', fa: 'خوارزم' },
    // Lower Oxus delta region, northwest of transoxiana
    polygon: '408,71 431,83 444,102 467,110 458,107 462,116 479,123 490,156 503,160 511,152 538,164 528,155 532,126 527,113 584,118 594,132 596,120 583,90 599,88 597,80 608,78 626,96 632,91 612,62 623,28 511,-20 451,-3 491,79 478,79 438,57 414,63',
    center: [523, 96],
    cities: [
      { id: 'kath',    name: { en: 'Kath',    fa: 'کاث' },    coordinates: [580, 90],  tier: 1 },
      { id: 'gurganj', name: { en: 'Gurganj', fa: 'گرگانج' }, coordinates: [558, 74], tier: 1 },
      { id: 'khiva',   name: { en: 'Khiva',   fa: 'خیوه' },   coordinates: [542, 82], tier: 2 },
    ],
  },

  // ── Water Bodies ───────────────────────────────────────────────────────────

  {
    id: 'caspian',
    name: { en: 'Caspian Sea', fa: 'دریای خزر' },
    polygon: '390,40 480,40 510,100 540,140 480,140 420,155 400,140 380,100',
    center: [453, 90],
    isWater: true,
  },
  {
    id: 'persian_gulf',
    name: { en: 'Persian Gulf', fa: 'خلیج فارس' },
    polygon: '60,480 180,510 230,460 340,490 360,510 490,520 490,540 60,540',
    center: [280, 510],
    isWater: true,
  },
  {
    id: 'sea_of_oman',
    name: { en: 'Sea of Oman', fa: 'دریای عمان' },
    polygon: '490,520 720,520 760,500 760,560 490,560',
    center: [625, 540],
    isWater: true,
  },
  {
    id: 'aral',
    name: { en: 'Aral Sea', fa: 'دریاچه آرال' },
    polygon: '480,20 510,20 510,40 480,40',
    center: [495, 30],
    isWater: true,
  },

  // ── Neighbor Regions ───────────────────────────────────────────────────────

  {
    id: 'anatolia',
    name: { en: 'Anatolia', fa: 'آناتولی' },
    polygon: '20,80 160,60 200,120 240,160 180,220 60,220 20,160',
    center: [125, 155],
    isNeighbor: true,
  },
  {
    id: 'levant',
    name: { en: 'Levant', fa: 'شام' },
    polygon: '20,220 60,220 160,310 120,400 60,400 20,360',
    center: [70, 300],
    isNeighbor: true,
  },
  {
    id: 'arabia',
    name: { en: 'Arabia', fa: 'عربستان' },
    polygon: '60,400 120,400 160,430 230,460 340,490 360,510 490,540 490,600 20,600 20,480 60,480',
    center: [250, 545],
    isNeighbor: true,
  },
  {
    id: 'egypt',
    name: { en: 'Egypt', fa: 'مصر' },
    polygon: '-200,360 20,360 20,600 -200,600',
    center: [-90, 480],
    isNeighbor: true,
  },
  {
    id: 'steppes',
    name: { en: 'The Steppes', fa: 'استپ‌ها' },
    polygon: '160,60 260,40 480,40 510,20 640,20 780,40 840,0 1000,0 1000,-40 -400,-40 -400,80 20,80',
    center: [500, 15],
    isNeighbor: true,
  },
  {
    id: 'india',
    name: { en: 'India', fa: 'هند' },
    polygon: '760,380 840,140 920,200 980,320 960,480 840,560 760,560 760,500',
    center: [868, 400],
    isNeighbor: true,
  },
  {
    id: 'mediterranean',
    name: { en: 'Mediterranean', fa: 'مدیترانه' },
    polygon: '-400,80 20,80 20,160 60,220 20,220 20,360 -400,360',
    center: [-180, 230],
    isWater: true,
  },
];
