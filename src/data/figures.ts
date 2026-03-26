export interface HistoricalFigure {
  id: string;
  name: { en: string; fa: string };
  birthYear: number;
  deathYear: number;
  description: { en: string; fa: string };
  type: 'philosopher' | 'poet' | 'scientist' | 'artist' | 'other';
}

export const historicalFigures: HistoricalFigure[] = [
  {
    id: 'zoroaster',
    name: { en: 'Zoroaster (Zarathustra)', fa: 'زرتشت' },
    birthYear: -1000,
    deathYear: -930,
    description: {
      en: 'Ancient Iranian prophet and the founder of Zoroastrianism, the primary religion of Pre-Islamic Iran.',
      fa: 'پیامبر ایران باستان و بنیانگذار مزدیسنا، دین اصلی ایران پیش از اسلام.'
    },
    type: 'philosopher'
  },
  {
    id: 'aristotle',
    name: { en: 'Aristotle', fa: 'ارسطو' },
    birthYear: -384,
    deathYear: -322,
    description: {
      en: 'Greek philosopher and polymath during the Classical period in Ancient Greece.',
      fa: 'فیلسوف و همه‌چیزدان یونانی در دوره کلاسیک یونان باستان.'
    },
    type: 'philosopher'
  },
  {
    id: 'plato',
    name: { en: 'Plato', fa: 'افلاطون' },
    birthYear: -428,
    deathYear: -348,
    description: {
      en: 'Athenian philosopher, founder of the Platonist school of thought and the Academy.',
      fa: 'فیلسوف آتنی، بنیانگذار مکتب افلاطونی و آکادمی.'
    },
    type: 'philosopher'
  },
  {
    id: 'socrates',
    name: { en: 'Socrates', fa: 'سقراط' },
    birthYear: -470,
    deathYear: -399,
    description: {
      en: 'Greek philosopher from Athens who is credited as a founder of Western philosophy.',
      fa: 'فیلسوف یونانی اهل آتن که به عنوان یکی از بنیانگذاران فلسفه غرب شناخته می‌شود.'
    },
    type: 'philosopher'
  },
  {
    id: 'khayyam',
    name: { en: 'Omar Khayyam', fa: 'عمر خیام' },
    birthYear: 1048,
    deathYear: 1131,
    description: {
      en: 'Persian polymath, mathematician, astronomer, philosopher, and poet.',
      fa: 'همه‌چیزدان، ریاضیدان، ستاره‌شناس، فیلسوف و شاعر ایرانی.'
    },
    type: 'scientist'
  },
  {
    id: 'avicenna',
    name: { en: 'Avicenna (Ibn Sina)', fa: 'ابن سینا' },
    birthYear: 980,
    deathYear: 1037,
    description: {
      en: 'Persian polymath who is regarded as one of the most significant physicians, astronomers, thinkers and writers of the Islamic Golden Age.',
      fa: 'همه‌چیزدان ایرانی که به عنوان یکی از مهم‌ترین پزشکان، ستاره‌شناسان، متفکران و نویسندگان دوران طلایی اسلام شناخته می‌شود.'
    },
    type: 'scientist'
  },
  {
    id: 'ferdowsi',
    name: { en: 'Ferdowsi', fa: 'فردوسی' },
    birthYear: 940,
    deathYear: 1020,
    description: {
      en: 'Persian poet and the author of Shahnameh, which is one of the world\'s longest epic poems created by a single poet.',
      fa: 'شاعر ایرانی و نویسنده شاهنامه، که یکی از طولانی‌ترین منظومه‌های حماسی جهان است که توسط یک شاعر سروده شده است.'
    },
    type: 'poet'
  },
  {
    id: 'rumi',
    name: { en: 'Rumi', fa: 'مولوی' },
    birthYear: 1207,
    deathYear: 1273,
    description: {
      en: '13th-century Persian poet, Hanafi faqih, Islamic scholar, Maturidi theologian, and Sufi mystic.',
      fa: 'شاعر پارسی‌گوی قرن سیزدهم، فقیه حنفی، محقق اسلامی، متکلم ماتریدی و عارف صوفی.'
    },
    type: 'poet'
  },
  {
    id: 'hafez',
    name: { en: 'Hafez', fa: 'حافظ' },
    birthYear: 1315,
    deathYear: 1390,
    description: {
      en: 'Persian lyric poet, whose collected works are regarded by many Iranians as a pinnacle of Persian literature.',
      fa: 'شاعر غزل‌سرای ایرانی که دیوان اشعار او توسط بسیاری از ایرانیان به عنوان اوج ادبیات فارسی شناخته می‌شود.'
    },
    type: 'poet'
  },
  {
    id: 'saadi',
    name: { en: 'Saadi Shirazi', fa: 'سعدی شیرازی' },
    birthYear: 1210,
    deathYear: 1291,
    description: {
      en: 'Major Persian poet and literary figure of the medieval period.',
      fa: 'شاعر و ادیب بزرگ ایرانی در قرون وسطی.'
    },
    type: 'poet'
  },
  {
    id: 'alkhwarizmi',
    name: { en: 'Al-Khwarizmi', fa: 'خوارزمی' },
    birthYear: 780,
    deathYear: 850,
    description: {
      en: 'Persian polymath who produced vastly influential works in mathematics, astronomy, and geography.',
      fa: 'همه‌چیزدان ایرانی که آثار بسیار تأثیرگذاری در ریاضیات، نجوم و جغرافیا تولید کرد.'
    },
    type: 'scientist'
  },
  {
    id: 'biruni',
    name: { en: 'Al-Biruni', fa: 'ابوریحان بیرونی' },
    birthYear: 973,
    deathYear: 1050,
    description: {
      en: 'Khwarazmian Iranian scholar and polymath during the Islamic Golden Age.',
      fa: 'دانشمند و همه‌چیزدان ایرانی خوارزمی در دوران طلایی اسلام.'
    },
    type: 'scientist'
  },
  {
    id: 'farabi',
    name: { en: 'Al-Farabi', fa: 'فارابی' },
    birthYear: 872,
    deathYear: 950,
    description: {
      en: 'Renowned early Islamic philosopher and jurist who wrote in the fields of political philosophy, metaphysics, ethics and logic.',
      fa: 'فیلسوف و فقیه مشهور اوایل اسلام که در زمینه‌های فلسفه سیاسی، متافیزیک، اخلاق و منطق می‌نوشت.'
    },
    type: 'philosopher'
  }
];
