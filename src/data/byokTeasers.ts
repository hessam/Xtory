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
    teaser: { 
      en: 'The earliest Iranians carved an empire from nothing. What were they building toward?',
      fa: 'نخستین ایرانیان امپراتوری خود را از هیچ ساختند. آن‌ها به سوی چه مقصدی در حرکت بودند؟'
    },
    cta: { en: 'Explore the origins', fa: 'کاوش در ریشه‌ها' },
  },
  {
    eraId: 'median',
    yearRange: { start: -700, end: -550 },
    teaser: { 
      en: 'A nomadic confederation unified and toppled the Assyrian superpower. How?',
      fa: 'یک کنفدراسیون عشایری متحد شد و ابرقدرت آشور را سرنگون کرد. اما چگونه؟'
    },
    cta: { en: 'Discover how they won', fa: 'کشف چگونگی پیروزی' },
  },
  {
    eraId: 'achaemenid',
    yearRange: { start: -550, end: -330 },
    teaser: { 
      en: 'Cyrus freed the Jews, respected local gods, and built the first human rights charter. Unlock his story.',
      fa: 'کوروش یهودیان را آزاد کرد، به خدایان محلی احترام گذاشت و نخستین منشور حقوق بشر را نوشت. داستان او را بگشایید.'
    },
    cta: { en: 'Unlock his story', fa: 'گشودن داستان او' },
  },
  {
    eraId: 'hellenistic',
    yearRange: { start: -330, end: -247 },
    teaser: { 
      en: 'Alexander burned Persepolis — but the Persian elite survived and began a quiet resistance. Find out how.',
      fa: 'اسکندر تخت جمشید را به آتش کشید — اما نخبگان فلات ایران زنده ماندند و مقاومتی خاموش را آغاز کردند. بدانید چگونه.'
    },
    cta: { en: 'Find out how', fa: 'بدانید چگونه' },
  },
  {
    eraId: 'parthian',
    yearRange: { start: -247, end: 224 },
    teaser: { 
      en: 'For 400 years, the Parthians held Rome at bay with horse archers and Iranian culture. Discover their strategy.',
      fa: 'برای ۴۰۰ سال، اشکانیان با سوارکاران تیرانداز و فرهنگ ایرانی، روم را در حصار نگه داشتند. استراتژی آن‌ها را کشف کنید.'
    },
    cta: { en: 'Discover their strategy', fa: 'کشف استراتژی آن‌ها' },
  },
  {
    eraId: 'sasanian',
    yearRange: { start: 224, end: 651 },
    teaser: { 
      en: 'In 600 AD, an Iranian Vazir was translating Indian wisdom into Persian — while the empire crumbled around him.',
      fa: 'در سال ۶۰۰ میلادی، یک وزیر ایرانی خرد هندی را به فارسی ترجمه می‌کرد — در حالی که امپراتوری پیرامونش فرو می‌ریخت.'
    },
    cta: { en: 'Read his story', fa: 'خواندن داستان او' },
  },
  {
    eraId: 'early_islamic',
    yearRange: { start: 651, end: 820 },
    teaser: { 
      en: 'The Arab armies conquered Iran — but Iranian bureaucrats ran the caliphate in Persian. Unlock the paradox.',
      fa: 'سپاه تازیان ایران را فتح کردند — اما بوروکرات‌های ایرانی، خلافت را به زبان پارسی اداره کردند. راز این پارادوکس را بگشایید.'
    },
    cta: { en: 'Unlock the paradox', fa: 'گشودن راز پارادوکس' },
  },
  {
    eraId: 'iranian_renaissance',
    yearRange: { start: 820, end: 1040 },
    teaser: { 
      en: 'Under an Arab Caliphate, Iranians produced Ferdowsi, Avicenna, and al-Biruni in one century. How?',
      fa: 'در دوران خلافت عربی، ایرانیان در یک قرن فردوسی، ابن‌سینا و ابوریحان بیرونی را پدید آوردند. چطور ممکن بود؟'
    },
    cta: { en: 'Explore the renaissance', fa: 'کاوش در رنسانس' },
  },
  {
    eraId: 'seljuk',
    yearRange: { start: 1040, end: 1220 },
    teaser: { 
      en: 'A Turkic warlord conquered Iran — then hired an Iranian Vazir to govern it. His name was Nizam al-Mulk.',
      fa: 'یک سردار ترک ایران را فتح کرد — سپس یک وزیر ایرانی را برای اداره آن استخدام کرد. نام او نظام‌الملک بود.'
    },
    cta: { en: 'Meet Nizam al-Mulk', fa: 'دیدار با نظام‌الملک' },
  },
  {
    eraId: 'mongol_invasion',
    yearRange: { start: 1220, end: 1370 },
    teaser: { 
      en: 'The Mongols killed millions — then an Iranian scholar convinced Hulagu to spare the library of Baghdad.',
      fa: 'مغول‌ها میلیون‌ها نفر را کشتند — سپس یک دانشمند ایرانی هلاکو را متقاعد کرد که کتابخانه بغداد را حفظ کند.'
    },
    cta: { en: 'See how he did it', fa: 'ببینید او چگونه چنین کرد' },
  },
  {
    eraId: 'timurid',
    yearRange: { start: 1370, end: 1501 },
    teaser: { 
      en: 'Tamerlane left a trail of skulls — and a son who made Samarkand the cultural capital of the world.',
      fa: 'تیمور لنگ ردی از جمجمه‌ها به جا گذاشت — و فرزندی که سمرقند را به پایتخت فرهنگی جهان تبدیل کرد.'
    },
    cta: { en: 'Explore the paradox', fa: 'کاوش در پارادوکس' },
  },
  {
    eraId: 'safavid',
    yearRange: { start: 1501, end: 1736 },
    teaser: { 
      en: 'Shah Abbas built Isfahan in 30 years — one of the most beautiful cities in human history. Unlock the blueprint.',
      fa: 'شاه عباس اصفهان را در ۳۰ سال ساخت — یکی از زیباترین شهرهای تاریخ بشر. نقشه این شکوه را بگشایید.'
    },
    cta: { en: 'Unlock the blueprint', fa: 'گشودن نقشه' },
  },
  {
    eraId: 'afsharid_zand',
    yearRange: { start: 1736, end: 1796 },
    teaser: { 
      en: 'Nader Shah recaptured the Peacock Throne from Delhi — then lost everything within a generation.',
      fa: 'نادرشاه تخت طاووس را از دهلی بازپس گرفت — سپس در یک نسل همه چیز را از دست داد.'
    },
    cta: { en: 'Discover what happened', fa: 'کشف آنچه رخ داد' },
  },
  {
    eraId: 'qajar',
    yearRange: { start: 1796, end: 1925 },
    teaser: { 
      en: 'Russia and Britain carved up Iran between them — while Iranian intellectuals invented constitutional democracy.',
      fa: 'روسیه و بریتانیا ایران را بین خود تقسیم کردند — در حالی که روشنفکران ایرانی دموکراسی مشروطه را اختراع کردند.'
    },
    cta: { en: 'Read the hidden history', fa: 'خواندن تاریخ پنهان' },
  },
  {
    eraId: 'modern',
    yearRange: { start: 1925, end: 2000 },
    teaser: { 
      en: 'Iran had oil, democracy, and a revolution — all within 30 years. AI can help you connect the dots.',
      fa: 'ایران نفت، دموکراسی و یک انقلاب را تجربه کرد — همگی در ۳۰ سال. هوش مصنوعی می‌تواند به شما در اتصال این نقاط کمک کند.'
    },
    cta: { en: 'Connect the dots', fa: 'اتصال نقاط' },
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
