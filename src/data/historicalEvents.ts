export type EventType = 'battle' | 'downfall' | 'universal' | 'cultural' | 'political' | 'tradition';

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
    coordinates: [32.1892, 48.2415],
    regionId: 'mesopotamia'
  },
  {
    id: 'ev_moses_exodus',
    year: -1300,
    title: { en: 'The Exodus', fa: 'خروج از مصر' },
    description: { en: 'A foundational narrative in Biblical tradition where Moses leads the Israelites out of slavery in Egypt.', fa: 'روایت بنیادین در سنت کتاب مقدس که در آن موسی بنی‌اسرائیل را از بردگی در مصر خارج می‌کند.' },
    type: 'tradition',
    coordinates: [29.5000, 33.5000],
    regionId: 'mesopotamia'
  },
  {
    id: 'ev_red_sea_parting',
    year: -1300,
    title: { en: 'Parting of the Red Sea', fa: 'شکافتن دریای سرخ' },
    description: { en: 'A traditional miracle account where the Red Sea is parted to allow the escape of the Israelites.', fa: 'روایت سنتی از معجزه‌ای که در آن دریای سرخ برای فرار بنی‌اسرائیل شکافته می‌شود.' },
    type: 'tradition',
    coordinates: [28.5000, 33.0000],
    regionId: 'mesopotamia'
  },
  {
    id: 'ev_zarathushtra_rise',
    year: -1000,
    title: { en: 'Rise of Zarathushtra', fa: 'ظهور زرتشت' },
    description: { en: 'Zarathushtra introduces Zoroastrianism, the first monotheistic religion, profoundly influencing Iranian culture and philosophy.', fa: 'زرتشت آیین مزدیسنا را معرفی می‌کند، که اولین دین توحیدی است و تأثیر عمیقی بر فرهنگ و فلسفه ایران می‌گذارد.' },
    type: 'universal',
    coordinates: [36.7584, 66.8988],
    regionId: 'khorasan'
  },
  {
    id: 'ev_median_foundation',
    year: -678,
    title: { en: 'Foundation of the Median Kingdom', fa: 'تأسیس پادشاهی ماد' },
    description: { en: 'Deioces unites the Median tribes, establishing the first Iranian kingdom with Ecbatana as its capital.', fa: 'دیاکو قبایل ماد را متحد کرده و اولین پادشاهی ایرانی را با پایتختی هگمتانه تأسیس می‌کند.' },
    type: 'political',
    coordinates: [34.7992, 48.5146],
    regionId: 'jibal'
  },
  {
    id: 'ev_nineveh_fall',
    year: -612,
    title: { en: 'Fall of Nineveh', fa: 'سقوط نینوا' },
    description: { en: 'A coalition of Medes and Babylonians destroys Nineveh, leading to the collapse of the Neo-Assyrian Empire.', fa: 'اتحادی از مادها و بابلی‌ها نینوا را ویران کرده و منجر به فروپاشی امپراتوری آشور نو می‌شود.' },
    type: 'battle',
    coordinates: [36.3592, 43.1533],
    regionId: 'mesopotamia'
  },
  {
    id: 'ev_achaemenid_foundation',
    year: -550,
    title: { en: 'Foundation of the Achaemenid Empire', fa: 'تأسیس شاهنشاهی هخامنشی' },
    description: { en: 'Cyrus the Great defeats Astyages of Media, uniting the Medes and Persians under the Achaemenid dynasty.', fa: 'کوروش بزرگ ایشتوویگو پادشاه ماد را شکست داده و مادها و پارس‌ها را تحت سلسله هخامنشی متحد می‌کند.' },
    type: 'political',
    coordinates: [30.2036, 53.1788],
    regionId: 'fars'
  },
  {
    id: 'ev_conquest_lydia',
    year: -547,
    title: { en: 'Conquest of Lydia', fa: 'فتح لیدیه' },
    description: { en: 'Cyrus the Great defeats Croesus of Lydia, bringing Asia Minor under Persian control.', fa: 'کوروش بزرگ کرزوس پادشاه لیدیه را شکست داده و آسیای صغیر را تحت کنترل ایران در می‌آورد.' },
    type: 'battle',
    coordinates: [38.4883, 28.0403],
    regionId: 'caucasus'
  },
  {
    id: 'ev_conquest_babylon',
    year: -539,
    title: { en: 'Conquest of Babylon', fa: 'فتح بابل' },
    description: { en: 'Cyrus the Great enters Babylon without a fight, ending the Neo-Babylonian Empire and freeing the Jews from captivity.', fa: 'کوروش بزرگ بدون جنگ وارد بابل می‌شود، به امپراتوری بابل نو پایان می‌دهد و یهودیان را از اسارت آزاد می‌کند.' },
    type: 'political',
    coordinates: [32.5363, 44.4208],
    regionId: 'mesopotamia'
  },
  {
    id: 'ev_behistun',
    year: -522,
    title: { en: 'Darius the Great\'s Accession', fa: 'به تخت نشستن داریوش بزرگ' },
    description: { en: 'Darius I ascends the throne after a period of civil war, solidifying the empire\'s administration.', fa: 'داریوش یکم پس از یک دوره جنگ داخلی به تخت می‌نشیند و مدیریت امپراتوری را تثبیت می‌کند.' },
    type: 'political',
    coordinates: [34.3853, 47.4363],
    regionId: 'jibal'
  },
  {
    id: 'ev_marathon',
    year: -490,
    title: { en: 'Battle of Marathon', fa: 'نبرد ماراتون' },
    description: { en: 'The first Persian invasion of Greece ends with a decisive Greek victory.', fa: 'اولین تهاجم ایران به یونان با پیروزی قاطع یونانیان به پایان می‌رسد.' },
    type: 'battle',
    coordinates: [38.1500, 23.9500],
    regionId: 'azerbaijan'
  },
  {
    id: 'ev_gaugamela',
    year: -331,
    title: { en: 'Battle of Gaugamela', fa: 'نبرد گوگمل' },
    description: { en: 'Alexander the Great defeats Darius III, leading to the fall of the Achaemenid Empire.', fa: 'اسکندر مقدونی داریوش سوم را شکست می‌دهد که منجر به سقوط شاهنشاهی هخامنشی می‌شود.' },
    type: 'battle',
    coordinates: [36.1911, 44.0091],
    regionId: 'mesopotamia'
  },
  {
    id: 'ev_carrhae',
    year: -53,
    title: { en: 'Battle of Carrhae', fa: 'نبرد حران' },
    description: { en: 'Parthian forces led by Surena decisively defeat a Roman invasion force led by Crassus.', fa: 'نیروهای اشکانی به رهبری سورنا نیروی تهاجمی روم به رهبری کراسوس را قاطعانه شکست می‌دهند.' },
    type: 'battle',
    coordinates: [36.8667, 39.0333],
    regionId: 'mesopotamia'
  },
  {
    id: 'ev_birth_jesus',
    year: -4,
    title: { en: 'Birth of Jesus', fa: 'میلاد عیسی مسیح' },
    description: { en: 'Historical birth of Jesus of Nazareth in Roman-occupied Judea.', fa: 'تولد تاریخی عیسی ناصری در یهودیه تحت اشغال روم.' },
    type: 'universal',
    coordinates: [31.7047, 35.2037],
    regionId: 'mesopotamia'
  },
  {
    id: 'ev_biblical_magi',
    year: -4,
    title: { en: 'Journey of the Magi', fa: 'سفر مغان' },
    description: { en: 'In Christian tradition, wise men (Magi) from the East visit the newborn Jesus; historically linked to the Persian priestly class.', fa: 'در روایت مسیحی، مردان دانا (مغان) از شرق به دیدار عیسی نوزاد می‌روند؛ این رویداد از نظر تاریخی با طبقه کاهنان ایرانی پیوند خورده است.' },
    type: 'tradition',
    coordinates: [35.0210, 50.3564],
    regionId: 'jibal'
  },
  {
    id: 'ev_crucifixion',
    year: 30,
    title: { en: 'Crucifixion of Jesus', fa: 'صلب عیسی مسیح' },
    description: { en: 'The historical and spiritual event marking the end of the earthly life of Jesus in Jerusalem.', fa: 'رویداد تاریخی و مذهبی که پایان زندگی زمینی عیسی مسیح در اورشلیم را رقم می‌زند.' },
    type: 'universal',
    coordinates: [31.7683, 35.2137],
    regionId: 'mesopotamia'
  },
  {
    id: 'ev_edessa',
    year: 260,
    title: { en: 'Battle of Edessa', fa: 'نبرد ادسا' },
    description: { en: 'Sasanian King Shapur I defeats and captures the Roman Emperor Valerian.', fa: 'شاپور یکم، پادشاه ساسانی، والرین امپراتور روم را شکست داده و اسیر می‌کند.' },
    type: 'battle',
    coordinates: [37.1670, 38.7939],
    regionId: 'azerbaijan'
  },
  {
    id: 'ev_qadisiyyah',
    year: 636,
    title: { en: 'Battle of al-Qadisiyyah', fa: 'نبرد قادسیه' },
    description: { en: 'The Arab Muslim army defeats the Sasanian army, marking the beginning of the end for the Sasanian Empire.', fa: 'ارتش مسلمانان عرب ارتش ساسانی را شکست می‌دهد که آغاز پایان شاهنشاهی ساسانی است.' },
    type: 'battle',
    coordinates: [31.8617, 44.4363],
    regionId: 'mesopotamia'
  },
  {
    id: 'ev_nahavand',
    year: 642,
    title: { en: 'Battle of Nahavand', fa: 'نبرد نهاوند' },
    description: { en: 'The decisive battle that led to the final collapse of the Sasanian Empire.', fa: 'نبرد سرنوشت‌سازی که منجر به فروپاشی نهایی شاهنشاهی ساسانی شد.' },
    type: 'downfall',
    coordinates: [34.1852, 48.3756],
    regionId: 'jibal'
  },
  {
    id: 'ev_manzikert',
    year: 1071,
    title: { en: 'Battle of Manzikert', fa: 'نبرد ملازگرد' },
    description: { en: 'Seljuk Turks defeat the Byzantine Empire, opening Anatolia to Turkic settlement.', fa: 'ترک‌های سلجوقی امپراتوری بیزانس را شکست می‌دهند و آناتولی را برای سکونت ترک‌ها باز می‌کنند.' },
    type: 'battle',
    coordinates: [39.1417, 42.5401],
    regionId: 'azerbaijan'
  },
  {
    id: 'ev_mongol_invasion',
    year: 1219,
    title: { en: 'Mongol Invasion of Khwarazmia', fa: 'حمله مغول به خوارزمشاهیان' },
    description: { en: 'Genghis Khan begins his devastating invasion of the Khwarazmian Empire.', fa: 'چنگیزخان تهاجم ویرانگر خود را به امپراتوری خوارزمشاهیان آغاز می‌کند.' },
    type: 'downfall',
    coordinates: [42.3217, 59.1554],
    regionId: 'transoxiana'
  },
  {
    id: 'ev_baghdad_fall',
    year: 1258,
    title: { en: 'Siege of Baghdad', fa: 'سقوط بغداد' },
    description: { en: 'Hulagu Khan captures and destroys Baghdad, ending the Abbasid Caliphate.', fa: 'هولاکو خان بغداد را تصرف و ویران می‌کند و به خلافت عباسی پایان می‌دهد.' },
    type: 'downfall',
    coordinates: [33.3152, 44.3661],
    regionId: 'mesopotamia'
  },
  {
    id: 'ev_chaldiran',
    year: 1514,
    title: { en: 'Battle of Chaldiran', fa: 'نبرد چالدران' },
    description: { en: 'The Ottoman Empire decisively defeats the Safavid Empire, halting Safavid expansion.', fa: 'امپراتوری عثمانی امپراتوری صفوی را قاطعانه شکست می‌دهد و گسترش صفویان را متوقف می‌کند.' },
    type: 'battle',
    coordinates: [39.0645, 44.4172],
    regionId: 'azerbaijan'
  },
  {
    id: 'ev_karnal',
    year: 1739,
    title: { en: 'Battle of Karnal', fa: 'نبرد کرنال' },
    description: { en: 'Nader Shah defeats the Mughal Empire, leading to the sack of Delhi.', fa: 'نادرشاه امپراتوری گورکانی را شکست می‌دهد که منجر به غارت دهلی می‌شود.' },
    type: 'battle',
    coordinates: [29.6857, 76.9905],
    regionId: 'makran'
  },
  {
    id: 'ev_constitutional_revolution',
    year: 1906,
    title: { en: 'Constitutional Revolution', fa: 'انقلاب مشروطه' },
    description: { en: 'The Persian Constitutional Revolution leads to the establishment of a parliament during the Qajar dynasty.', fa: 'انقلاب مشروطه ایران منجر به تأسیس پارلمان در دوران سلسله قاجار می‌شود.' },
    type: 'political',
    coordinates: [35.6892, 51.3890],
    regionId: 'jibal'
  },
  {
    id: 'ev_islamic_revolution',
    year: 1979,
    title: { en: 'Islamic Revolution', fa: 'انقلاب اسلامی' },
    description: { en: 'The Pahlavi dynasty is overthrown, and the Islamic Republic is established.', fa: 'سلسله پهلوی سرنگون می‌شود و جمهوری اسلامی تأسیس می‌گردد.' },
    type: 'downfall',
    coordinates: [35.6892, 51.3890],
    regionId: 'jibal'
  }
];
