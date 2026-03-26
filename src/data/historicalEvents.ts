export type EventType = 'battle' | 'downfall' | 'universal' | 'cultural' | 'political';

export interface HistoricalEvent {
  id: string;
  year: number;
  title: { en: string; fa: string };
  description: { en: string; fa: string };
  type: EventType;
  coordinates?: [number, number]; // [x, y] on the map
  regionId: string;
}

export const historicalEvents: HistoricalEvent[] = [
  {
    id: 'ev_susa_foundation',
    year: -2700,
    title: { en: 'Rise of Susa', fa: 'ظهور شوش' },
    description: { en: 'Susa becomes a major urban center and the capital of the Elamite civilization, one of the oldest cities in the world.', fa: 'شوش به یک مرکز شهری بزرگ و پایتخت تمدن عیلام تبدیل می‌شود که یکی از قدیمی‌ترین شهرهای جهان است.' },
    type: 'universal',
    coordinates: [340, 280],
    regionId: 'mesopotamia'
  },
  {
    id: 'ev_median_foundation',
    year: -678,
    title: { en: 'Foundation of the Median Kingdom', fa: 'تأسیس پادشاهی ماد' },
    description: { en: 'Deioces unites the Median tribes, establishing the first Iranian kingdom with Ecbatana as its capital.', fa: 'دیاکو قبایل ماد را متحد کرده و اولین پادشاهی ایرانی را با پایتختی هگمتانه تأسیس می‌کند.' },
    type: 'political',
    coordinates: [380, 240],
    regionId: 'jibal'
  },
  {
    id: 'ev_nineveh_fall',
    year: -612,
    title: { en: 'Fall of Nineveh', fa: 'سقوط نینوا' },
    description: { en: 'A coalition of Medes and Babylonians destroys Nineveh, leading to the collapse of the Neo-Assyrian Empire.', fa: 'اتحادی از مادها و بابلی‌ها نینوا را ویران کرده و منجر به فروپاشی امپراتوری آشور نو می‌شود.' },
    type: 'battle',
    coordinates: [320, 200],
    regionId: 'mesopotamia'
  },
  {
    id: 'ev_achaemenid_foundation',
    year: -550,
    title: { en: 'Foundation of the Achaemenid Empire', fa: 'تأسیس شاهنشاهی هخامنشی' },
    description: { en: 'Cyrus the Great defeats Astyages of Media, uniting the Medes and Persians under the Achaemenid dynasty.', fa: 'کوروش بزرگ ایشتوویگو پادشاه ماد را شکست داده و مادها و پارس‌ها را تحت سلسله هخامنشی متحد می‌کند.' },
    type: 'political',
    coordinates: [400, 320],
    regionId: 'fars'
  },
  {
    id: 'ev_conquest_lydia',
    year: -547,
    title: { en: 'Conquest of Lydia', fa: 'فتح لیدیه' },
    description: { en: 'Cyrus the Great defeats Croesus of Lydia, bringing Asia Minor under Persian control.', fa: 'کوروش بزرگ کرزوس پادشاه لیدیه را شکست داده و آسیای صغیر را تحت کنترل ایران در می‌آورد.' },
    type: 'battle',
    coordinates: [100, 160],
    regionId: 'anatolia'
  },
  {
    id: 'ev_conquest_babylon',
    year: -539,
    title: { en: 'Conquest of Babylon', fa: 'فتح بابل' },
    description: { en: 'Cyrus the Great enters Babylon without a fight, ending the Neo-Babylonian Empire and freeing the Jews from captivity.', fa: 'کوروش بزرگ بدون جنگ وارد بابل می‌شود، به امپراتوری بابل نو پایان می‌دهد و یهودیان را از اسارت آزاد می‌کند.' },
    type: 'political',
    coordinates: [370, 290],
    regionId: 'mesopotamia'
  },
  {
    id: 'ev_behistun',
    year: -522,
    title: { en: 'Darius the Great\'s Accession', fa: 'به تخت نشستن داریوش بزرگ' },
    description: { en: 'Darius I ascends the throne after a period of civil war, solidifying the empire\'s administration.', fa: 'داریوش یکم پس از یک دوره جنگ داخلی به تخت می‌نشیند و مدیریت امپراتوری را تثبیت می‌کند.' },
    type: 'political',
    coordinates: [360, 260],
    regionId: 'jibal'
  },
  {
    id: 'ev_marathon',
    year: -490,
    title: { en: 'Battle of Marathon', fa: 'نبرد ماراتون' },
    description: { en: 'The first Persian invasion of Greece ends with a decisive Greek victory.', fa: 'اولین تهاجم ایران به یونان با پیروزی قاطع یونانیان به پایان می‌رسد.' },
    type: 'battle',
    coordinates: [20, 140],
    regionId: 'anatolia'
  },
  {
    id: 'ev_gaugamela',
    year: -331,
    title: { en: 'Battle of Gaugamela', fa: 'نبرد گوگمل' },
    description: { en: 'Alexander the Great defeats Darius III, leading to the fall of the Achaemenid Empire.', fa: 'اسکندر مقدونی داریوش سوم را شکست می‌دهد که منجر به سقوط شاهنشاهی هخامنشی می‌شود.' },
    type: 'battle',
    coordinates: [260, 200],
    regionId: 'mesopotamia'
  },
  {
    id: 'ev_carrhae',
    year: -53,
    title: { en: 'Battle of Carrhae', fa: 'نبرد حران' },
    description: { en: 'Parthian forces led by Surena decisively defeat a Roman invasion force led by Crassus.', fa: 'نیروهای اشکانی به رهبری سورنا نیروی تهاجمی روم به رهبری کراسوس را قاطعانه شکست می‌دهند.' },
    type: 'battle',
    coordinates: [200, 240],
    regionId: 'mesopotamia'
  },
  {
    id: 'ev_edessa',
    year: 260,
    title: { en: 'Battle of Edessa', fa: 'نبرد ادسا' },
    description: { en: 'Sasanian King Shapur I defeats and captures the Roman Emperor Valerian.', fa: 'شاپور یکم، پادشاه ساسانی، والرین امپراتور روم را شکست داده و اسیر می‌کند.' },
    type: 'battle',
    coordinates: [180, 220],
    regionId: 'anatolia'
  },
  {
    id: 'ev_qadisiyyah',
    year: 636,
    title: { en: 'Battle of al-Qadisiyyah', fa: 'نبرد قادسیه' },
    description: { en: 'The Arab Muslim army defeats the Sasanian army, marking the beginning of the end for the Sasanian Empire.', fa: 'ارتش مسلمانان عرب ارتش ساسانی را شکست می‌دهد که آغاز پایان شاهنشاهی ساسانی است.' },
    type: 'battle',
    coordinates: [260, 320],
    regionId: 'mesopotamia'
  },
  {
    id: 'ev_nahavand',
    year: 642,
    title: { en: 'Battle of Nahavand', fa: 'نبرد نهاوند' },
    description: { en: 'The decisive battle that led to the final collapse of the Sasanian Empire.', fa: 'نبرد سرنوشت‌سازی که منجر به فروپاشی نهایی شاهنشاهی ساسانی شد.' },
    type: 'downfall',
    coordinates: [360, 260],
    regionId: 'jibal'
  },
  {
    id: 'ev_manzikert',
    year: 1071,
    title: { en: 'Battle of Manzikert', fa: 'نبرد ملازگرد' },
    description: { en: 'Seljuk Turks defeat the Byzantine Empire, opening Anatolia to Turkic settlement.', fa: 'ترک‌های سلجوقی امپراتوری بیزانس را شکست می‌دهند و آناتولی را برای سکونت ترک‌ها باز می‌کنند.' },
    type: 'battle',
    coordinates: [280, 140],
    regionId: 'anatolia'
  },
  {
    id: 'ev_mongol_invasion',
    year: 1219,
    title: { en: 'Mongol Invasion of Khwarazmia', fa: 'حمله مغول به خوارزمشاهیان' },
    description: { en: 'Genghis Khan begins his devastating invasion of the Khwarazmian Empire.', fa: 'چنگیزخان تهاجم ویرانگر خود را به امپراتوری خوارزمشاهیان آغاز می‌کند.' },
    type: 'downfall',
    coordinates: [680, 120],
    regionId: 'transoxiana'
  },
  {
    id: 'ev_baghdad_fall',
    year: 1258,
    title: { en: 'Siege of Baghdad', fa: 'سقوط بغداد' },
    description: { en: 'Hulagu Khan captures and destroys Baghdad, ending the Abbasid Caliphate.', fa: 'هولاکو خان بغداد را تصرف و ویران می‌کند و به خلافت عباسی پایان می‌دهد.' },
    type: 'downfall',
    coordinates: [270, 290],
    regionId: 'mesopotamia'
  },
  {
    id: 'ev_chaldiran',
    year: 1514,
    title: { en: 'Battle of Chaldiran', fa: 'نبرد چالدران' },
    description: { en: 'The Ottoman Empire decisively defeats the Safavid Empire, halting Safavid expansion.', fa: 'امپراتوری عثمانی امپراتوری صفوی را قاطعانه شکست می‌دهد و گسترش صفویان را متوقف می‌کند.' },
    type: 'battle',
    coordinates: [300, 160],
    regionId: 'anatolia'
  },
  {
    id: 'ev_karnal',
    year: 1739,
    title: { en: 'Battle of Karnal', fa: 'نبرد کرنال' },
    description: { en: 'Nader Shah defeats the Mughal Empire, leading to the sack of Delhi.', fa: 'نادرشاه امپراتوری گورکانی را شکست می‌دهد که منجر به غارت دهلی می‌شود.' },
    type: 'battle',
    coordinates: [920, 400],
    regionId: 'indus'
  },
  {
    id: 'ev_constitutional_revolution',
    year: 1906,
    title: { en: 'Constitutional Revolution', fa: 'انقلاب مشروطه' },
    description: { en: 'The Persian Constitutional Revolution leads to the establishment of a parliament during the Qajar dynasty.', fa: 'انقلاب مشروطه ایران منجر به تأسیس پارلمان در دوران سلسله قاجار می‌شود.' },
    type: 'political',
    coordinates: [380, 220],
    regionId: 'jibal'
  },
  {
    id: 'ev_islamic_revolution',
    year: 1979,
    title: { en: 'Islamic Revolution', fa: 'انقلاب اسلامی' },
    description: { en: 'The Pahlavi dynasty is overthrown, and the Islamic Republic is established.', fa: 'سلسله پهلوی سرنگون می‌شود و جمهوری اسلامی تأسیس می‌گردد.' },
    type: 'downfall',
    coordinates: [380, 220],
    regionId: 'jibal'
  }
];
