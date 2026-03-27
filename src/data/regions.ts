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
    name: { en: 'The Caucasus', fa: 'قفقاز' },
    polygon: '240,120 320,80 380,100 400,140 340,180 260,180',
    center: [320, 130],
    cities: [
      { id: 'artaxata', name: { en: 'Artaxata', fa: 'آرتاشات' }, coordinates: [300, 120] },
      { id: 'derbent', name: { en: 'Derbent', fa: 'دربند' }, coordinates: [380, 110] }
    ]
  },
  {
    id: 'mesopotamia',
    name: { en: 'Mesopotamia', fa: 'بین‌النهرین' },
    polygon: '120,260 220,240 260,180 340,180 380,260 320,340 240,380 160,340',
    center: [250, 280],
    cities: [
      { id: 'babylon', name: { en: 'Babylon', fa: 'بابل' }, coordinates: [260, 320] },
      { id: 'ctesiphon', name: { en: 'Ctesiphon', fa: 'تیسفون' }, coordinates: [280, 300] },
      { id: 'baghdad', name: { en: 'Baghdad', fa: 'بغداد' }, coordinates: [270, 290] }
    ]
  },
  {
    id: 'jibal',
    name: { en: 'Jibal / Media', fa: 'جبال / ماد' },
    polygon: '340,180 400,140 420,180 460,260 400,340 320,340 380,260',
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
    polygon: '400,140 480,140 540,160 560,220 460,260 420,180',
    center: [480, 190],
    cities: [
      { id: 'amol', name: { en: 'Amol', fa: 'آمل' }, coordinates: [450, 170] },
      { id: 'gorgan', name: { en: 'Gorgan', fa: 'گرگان' }, coordinates: [520, 180] }
    ]
  },
  {
    id: 'fars',
    name: { en: 'Fars / Persis', fa: 'فارس' },
    polygon: '240,380 320,340 400,340 460,260 540,320 580,420 480,480 340,460',
    center: [420, 390],
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
    id: 'sistan',
    name: { en: 'Sistan', fa: 'سیستان' },
    polygon: '540,320 680,320 760,400 720,520 560,520 480,480 580,420',
    center: [620, 420],
    cities: [
      { id: 'zaranj', name: { en: 'Zaranj', fa: 'زرنج' }, coordinates: [660, 400] }
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
    polygon: '760,400 860,360 920,220 980,340 900,560 720,520',
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
    id: 'persian_gulf',
    name: { en: 'Persian Gulf', fa: 'خلیج فارس' },
    polygon: '120,260 160,340 240,380 340,460 480,480 480,520 440,500 360,520 240,440 180,380 140,300',
    center: [320, 420],
    isWater: true
  },
  {
    id: 'sea_of_oman',
    name: { en: 'Sea of Oman', fa: 'دریای عمان' },
    polygon: '480,480 560,520 720,520 900,560 900,600 720,600 620,580 560,560 480,520',
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
