export interface GeographicFeature {
  id: string;
  name: { en: string; fa: string };
  path: [number, number][]; // Points in SVG coordinate space (1000x600)
  type: 'river' | 'mountain';
}

export const rivers: GeographicFeature[] = [
  {
    id: 'tigris',
    name: { en: 'Tigris', fa: 'دجله' },
    type: 'river',
    path: [
      [140, 150], [180, 190], [220, 230], [250, 260], 
      [270, 290], // Near Baghdad
      [285, 330], [310, 360], [340, 395] // To Persian Gulf
    ]
  },
  {
    id: 'euphrates',
    name: { en: 'Euphrates', fa: 'فرات' },
    type: 'river',
    path: [
      [100, 150], [120, 200], [150, 250], [190, 280], 
      [230, 300], [260, 320], // Near Babylon
      [280, 340], [310, 360], [340, 395] // To Persian Gulf (joins Tigris Shatt al-Arab)
    ]
  },
  {
    id: 'indus',
    name: { en: 'Indus', fa: 'سند' },
    type: 'river',
    path: [
      [900, 180], [860, 240], 
      [880, 300], // Near Taxila
      [860, 360], [840, 420], 
      [840, 480], // Near Mohenjo-Daro
      [810, 540] // To Arabian Sea
    ]
  },
  {
    id: 'oxus',
    name: { en: 'Oxus (Amu Darya)', fa: 'آمودریا' },
    type: 'river',
    path: [
      [860, 180], [800, 170], [740, 160], [680, 130], 
      [640, 90], [600, 40], [580, 0] // Off to Aral Sea
    ]
  },
  {
    id: 'jaxartes',
    name: { en: 'Jaxartes (Syr Darya)', fa: 'سیردریا' },
    type: 'river',
    path: [
      [880, 80], [820, 70], [760, 60], [700, 40], 
      [660, 20], [620, 0] // Off to Aral Sea
    ]
  },
  {
    id: 'karun',
    name: { en: 'Karun', fa: 'کارون' },
    type: 'river',
    path: [
      [380, 310], [360, 330], 
      [330, 360], // Near Susa
      [320, 380], [340, 395] // To Persian Gulf
    ]
  }
];

// Provide multi-ring paths for mountains to act as minimal cartographic contour lines (Isolines)
export interface MountainRange {
  id: string;
  name: { en: string; fa: string };
  contours: [number, number][][];
}

export const mountains: MountainRange[] = [
  {
    id: 'zagros',
    name: { en: 'Zagros Mountains', fa: 'رشته‌کوه زاگرس' },
    contours: [
      // Outer faint line
      [[210, 160], [270, 210], [310, 260], [340, 330], [380, 380], [440, 440], [500, 460]],
      // Middle line
      [[220, 170], [280, 220], [320, 270], [350, 340], [390, 390], [450, 450], [510, 470]],
      // Inner peak line
      [[230, 180], [290, 230], [330, 280], [360, 350], [400, 400], [460, 460], [520, 480]]
    ]
  },
  {
    id: 'alborz',
    name: { en: 'Alborz Mountains', fa: 'رشته‌کوه البرز' },
    contours: [
      [[360, 160], [420, 140], [480, 140], [540, 150], [600, 160], [660, 170]],
      [[370, 170], [430, 150], [490, 150], [550, 160], [610, 170], [670, 180]],
      [[380, 180], [440, 160], [500, 160], [560, 170], [620, 180], [680, 190]]
    ]
  },
  {
    id: 'taurus',
    name: { en: 'Taurus Mountains', fa: 'کوه‌های توروس' },
    contours: [
      [[80, 220], [120, 240], [180, 250], [220, 250]],
      [[90, 230], [130, 250], [190, 260], [230, 260]]
    ]
  },
  {
    id: 'caucasus',
    name: { en: 'Caucasus Mountains', fa: 'رشته‌کوه قفقاز' },
    contours: [
      [[240, 100], [280, 110], [320, 120], [360, 120], [400, 130]],
      [[250, 110], [290, 120], [330, 130], [370, 130], [410, 140]]
    ]
  }
];
