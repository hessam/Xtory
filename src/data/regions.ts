export interface City {
  id: string;
  name: { en: string; fa: string };
  coordinates: [number, number]; // [x, y]
}

export interface Region {
  id: string;
  name: { en: string; fa: string };
  polygon: string; // SVG points
  center: [number, number]; // [x, y]
  cities?: City[];
  isWater?: boolean;
  isNeighbor?: boolean;
}

export const regions: Region[] = [
  {
    id: 'anatolia',
    name: { en: 'Anatolia', fa: 'آناتولی' },
    polygon: '40,120 160,100 240,120 260,180 220,240 120,260 60,200',
    center: [150, 180],
    cities: [
      { id: 'sardis', name: { en: 'Sardis', fa: 'سارد' }, coordinates: [80, 180] },
      { id: 'gordion', name: { en: 'Gordion', fa: 'گوردیون' }, coordinates: [160, 160] }
    ]
  },
  {
    id: 'caucasus',
    name: { en: 'Arran / Shirvan', fa: 'آران و شیروان' },
    // Southern boundary raised from y=180 → y=152 to create space for Atropatene below.
    // The Caucasus historically ends at the Kura/Araxes mountain passes, ~40km north of
    // the Aras River; Atropatene occupies the band directly south of it (south of Aras).
    polygon: '240,120 320,80 380,100 402,132 360,152 258,152',
    center: [320, 118],
    cities: [
      { id: 'artaxata', name: { en: 'Artaxata', fa: 'آرتاشات' }, coordinates: [300, 114] },
      { id: 'derbent', name: { en: 'Derbent', fa: 'دربند' }, coordinates: [382, 108] }
    ]
  },
  {
    id: 'iranian_azerbaijan',
    name: { en: 'Atropatene', fa: 'آتورپاتگان' },
    // ────── GEOGRAPHIC REASONING ──────────────────────────────────────────────
    // Atropatene (Media Atropatene) = historical kingdom south of the Aras River;
    // the precursor to what is now Iranian Azerbaijan (East & West Azerb., Ardabil).
    //
    // Northern boundary (Aras River line) = shared with the NEW Caucasus south edge:
    //   258,152 → 360,152 → 402,132
    // Eastern boundary connects to Jibal's north corner at 400,140:
    //   402,132 → 400,140
    // South & West boundary = old Caucasus south = current Jibal/Mesop top:
    //   400,140 → 340,180 → 260,180
    // Closes back by going NW: 260,180 → 258,152
    //
    // This creates a clean non-overlapping band between the raised Caucasus
    // and the unchanged Jibal / Mesopotamia regions.
    polygon: '258,152 360,152 402,132 400,140 340,180 260,180',
    center: [330, 162],
    cities: [
      { id: 'tabriz', name: { en: 'Tabriz (Tauris)', fa: 'تبریز' }, coordinates: [302, 165] },
      { id: 'gazaka', name: { en: 'Gazaka', fa: 'گزاکا' }, coordinates: [355, 158] },
      { id: 'urmia', name: { en: 'Urmia', fa: 'ارومیه' }, coordinates: [270, 170] }
    ]
  },
  {
    id: 'Gilan',
    name: { en: 'Gilan', fa: 'گیلان' },
    polygon: '400,140 452,140 440,220 420,180',
    center: [426, 172],
    cities: [
      { id: 'rasht', name: { en: 'Rasht', fa: 'رشت' }, coordinates: [415, 165] }
    ]
  },
  {
    id: 'mesopotamia',
    name: { en: 'Mesopotamia', fa: 'بین‌النهرین' },
    polygon: '120,260 220,240 260,180 290,220 300,270 270,320 240,380 160,340',
    center: [210, 290],
    cities: [
      { id: 'babylon', name: { en: 'Babylon', fa: 'بابل' }, coordinates: [240, 310] },
      { id: 'ctesiphon', name: { en: 'Ctesiphon', fa: 'تیسفون' }, coordinates: [260, 290] },
      { id: 'baghdad', name: { en: 'Baghdad', fa: 'بغداد' }, coordinates: [250, 280] }
    ]
  },
  {
    id: 'kurdistan',
    name: { en: 'Kurdistan / Hulwan', fa: 'کردستان / حلوان' },
    polygon: '260,180 340,180 380,260 320,340 270,320 300,270 290,220',
    center: [315, 260],
    cities: [
      { id: 'hulwan', name: { en: 'Hulwan', fa: 'حلوان' }, coordinates: [310, 290] },
      { id: 'kermanshah', name: { en: 'Kermanshah', fa: 'کرمانشاه' }, coordinates: [330, 300] }
    ]
  },
  {
    id: 'khuzestan',
    name: { en: 'Khuzestan / Elam', fa: 'خوزستان / عیلام' },
    polygon: '270,320 320,340 360,380 290,420 240,380',
    center: [290, 360],
    cities: [
      { id: 'susa', name: { en: 'Susa', fa: 'شوش' }, coordinates: [310, 360] },
      { id: 'ahvaz', name: { en: 'Ahvaz', fa: 'اهواز' }, coordinates: [280, 390] }
    ]
  },
  {
    id: 'jibal',
    name: { en: 'Jibal / Media', fa: 'جبال / ماد' },
    polygon: '340,180 400,140 420,180 440,220 460,260 400,340 320,340 380,260',
    center: [390, 250],
    cities: [
      { id: 'ecbatana', name: { en: 'Ecbatana (Hamedan)', fa: 'هگمتانه (همدان)' }, coordinates: [370, 240] },
      { id: 'rhagae', name: { en: 'Rhagae (Rey)', fa: 'ری' }, coordinates: [410, 210] },
      { id: 'isfahan', name: { en: 'Isfahan', fa: 'اصفهان' }, coordinates: [420, 290] }
    ]
  },
  {
    id: 'tabaristan',
    name: { en: 'Tabaristan', fa: 'طبرستان' },
    polygon: '452,140 480,140 540,160 560,220 460,260 440,220',
    center: [500, 188],
    cities: [
      { id: 'amol', name: { en: 'Amol', fa: 'آمل' }, coordinates: [470, 180] },
      { id: 'gorgan', name: { en: 'Gorgan', fa: 'گرگان' }, coordinates: [520, 180] }
    ]
  },
  {
    id: 'fars',
    name: { en: 'Fars / Persis', fa: 'فارس' },
    polygon: '340,460 290,420 360,380 320,340 400,340 460,260 540,320 480,380 410,470',
    center: [420, 380],
    cities: [
      { id: 'persepolis', name: { en: 'Persepolis', fa: 'تخت جمشید' }, coordinates: [440, 380] },
      { id: 'pasargadae', name: { en: 'Pasargadae', fa: 'پاسارگاد' }, coordinates: [450, 360] },
      { id: 'shiraz', name: { en: 'Shiraz', fa: 'شیراز' }, coordinates: [430, 400] },
      { id: 'susa', name: { en: 'Susa', fa: 'شوش' }, coordinates: [330, 360] }
    ]
  },
  {
    id: 'khorasan',
    name: { en: 'Khorasan', fa: 'خراسان' },
    polygon: '460,260 560,220 540,160 640,140 720,220 680,320 540,320',
    center: [600, 250],
    cities: [
      { id: 'nishapur', name: { en: 'Nishapur', fa: 'نیشابور' }, coordinates: [580, 240] },
      { id: 'merv', name: { en: 'Merv', fa: 'مرو' }, coordinates: [640, 180] },
      { id: 'herat', name: { en: 'Herat', fa: 'هرات' }, coordinates: [660, 280] }
    ]
  },
  {
    id: 'transoxiana',
    name: { en: 'Transoxiana', fa: 'فرارود' },
    polygon: '540,160 600,80 740,60 840,140 780,240 720,220 640,140',
    center: [700, 140],
    cities: [
      { id: 'samarkand', name: { en: 'Samarkand', fa: 'سمرقند' }, coordinates: [720, 130] },
      { id: 'bukhara', name: { en: 'Bukhara', fa: 'بخارا' }, coordinates: [660, 120] }
    ]
  },
  {
    id: 'kirman',
    name: { en: 'Kirman', fa: 'کرمان' },
    polygon: '540,320 480,380 410,470 480,480 520,500 580,420',
    center: [500, 420],
    cities: [
      { id: 'kerman', name: { en: 'Kerman', fa: 'کرمان' }, coordinates: [490, 400] },
      { id: 'jiroft', name: { en: 'Jiroft', fa: 'جیرفت' }, coordinates: [510, 440] }
    ]
  },
  {
    id: 'sistan',
    name: { en: 'Sistan', fa: 'سیستان' },
    polygon: '540,320 680,320 760,400 730,490 660,450 580,420',
    center: [640, 390],
    cities: [
      { id: 'zaranj', name: { en: 'Zaranj', fa: 'زرنج' }, coordinates: [660, 400] }
    ]
  },
  {
    id: 'makran',
    name: { en: 'Makran', fa: 'مکران' },
    polygon: '520,500 580,420 660,450 730,490 720,520 560,520',
    center: [620, 480],
    cities: [
      { id: 'pura', name: { en: 'Pura', fa: 'پورا' }, coordinates: [600, 480] }
    ]
  },
  {
    id: 'bactria',
    name: { en: 'Bactria / Afghanistan', fa: 'باختر / افغانستان' },
    polygon: '680,320 720,220 780,240 840,140 920,220 860,360 760,400',
    center: [800, 260],
    cities: [
      { id: 'bactra', name: { en: 'Bactra (Balkh)', fa: 'بلخ' }, coordinates: [760, 240] },
      { id: 'kabul', name: { en: 'Kabul', fa: 'کابل' }, coordinates: [840, 280] }
    ]
  },
  {
    id: 'indus',
    name: { en: 'Indus Valley', fa: 'دره سند' },
    polygon: '760,400 860,360 920,220 980,340 900,560 720,520 730,490',
    center: [860, 420],
    cities: [
      { id: 'taxila', name: { en: 'Taxila', fa: 'تاکسیلا' }, coordinates: [880, 300] },
      { id: 'mohenjo_daro', name: { en: 'Mohenjo-daro', fa: 'موهنجودارو' }, coordinates: [840, 480] }
    ]
  },
  {
    id: 'caspian',
    name: { en: 'Caspian Sea', fa: 'دریای کاسپین' },
    polygon: '240,120 320,80 380,100 400,140 480,140 540,160 600,80 500,40 340,40',
    center: [450, 90],
    isWater: true
  },
  {
    id: 'mediterranean',
    name: { en: 'Mediterranean', fa: 'دریای مدیترانه' },
    polygon: '-400,80 40,120 60,200 20,300 20,380 -400,380',
    center: [-150, 240],
    isWater: true
  },
  {
    id: 'red_sea',
    name: { en: 'Red Sea', fa: 'دریای سرخ' },
    polygon: '15,380 20,380 60,400 60,600 15,600',
    center: [30, 500],
    isWater: true
  },
  {
    id: 'egypt',
    name: { en: 'Egypt', fa: 'مصر' },
    polygon: '-350,380 15,380 15,600 -350,600',
    center: [-160, 480],
    isNeighbor: true
  },
  {
    id: 'persian_gulf',
    name: { en: 'Persian Gulf', fa: 'خلیج فارس' },
    polygon: '120,260 160,340 240,380 290,420 340,460 410,470 480,480 480,520 440,500 360,520 240,440 180,380 140,300',
    center: [320, 420],
    isWater: true
  },
  {
    id: 'sea_of_oman',
    name: { en: 'Sea of Oman', fa: 'دریای عمان' },
    polygon: '480,480 520,500 560,520 720,520 900,560 900,600 720,600 620,580 560,560 480,520',
    center: [680, 540],
    isWater: true
  },
  {
    id: 'levant',
    name: { en: 'Levant', fa: 'شام' },
    polygon: '120,260 160,340 120,400 60,400 20,380 20,300 60,200',
    center: [80, 280],
    isNeighbor: true
  },
  {
    id: 'arabia',
    name: { en: 'Arabia', fa: 'عربستان' },
    polygon: '120,260 140,300 180,380 240,440 360,520 440,500 480,520 560,560 620,580 620,600 60,600 60,400 120,400 160,340',
    center: [300, 560],
    isNeighbor: true
  },
  {
    id: 'steppes',
    name: { en: 'The Steppes', fa: 'استپ‌ها' },
    polygon: '240,120 340,40 500,40 600,80 740,60 840,140 900,100 900,-20 -20,-20 -20,100',
    center: [550, 0],
    isNeighbor: true
  },
  {
    id: 'india',
    name: { en: 'India', fa: 'هند' },
    polygon: '920,220 980,340 900,560 1050,560 1050,220',
    center: [980, 400],
    isNeighbor: true
  }
];
