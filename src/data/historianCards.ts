export interface VazirHighlight {
  id: string;                                // matches a vazir ID from vazirs.ts (Sprint 2)
  name: { en: string; fa: string };
  role: { en: string; fa: string };
  contribution: { en: string; fa: string };
  paradox: { en: string; fa: string };
}

export interface HistorianCard {
  eraId: string;                             // unique slug: e.g. "achaemenid"
  eraName: { en: string; fa: string };
  yearRange: { start: number; end: number }; // use negative numbers for BC years
  situationOneLiner: { en: string; fa: string }; // max 15 words. shown in header strip + drawer handle
  fullSummary: { en: string; fa?: string };  // 2-3 sentences. fa is optional.
  prevEraId?: string;                        // must match another eraId in this array
  nextEraId?: string;                        // must match another eraId in this array
  vazirHighlight?: VazirHighlight;           // optional. leave undefined for Sprint 1.
}

export const historianCards: HistorianCard[] = [
  {
    eraId: "prehistoric",
    eraName: { en: "Pre-Historic Iran", fa: "ایران پیش از تاریخ" },
    yearRange: { start: -3000, end: -700 },
    situationOneLiner: {
      en: "Tribes coalesce in the Zagros; the dawn of civilization before writing.",
      fa: "قبایل در زاگرس متحد می‌شوند؛ سپیده‌دم تمدن از کلام مکتوب پیشی می‌گیرد."
    },
    fullSummary: {
      en: "From the earliest settlements in Sialk to the rise of Elam, Iranian plateaus host a complex mosaic of tribes and early city-states. This era lays the geographic and cultural foundations before the first unified empires appeared.",
      fa: "از نخستین سکونتگاه‌ها در سیلک تا ظهور عیلام، فلات ایران میزبان موزاییکی پیچیده از قبایل و دولت‌شهرهای اولیه بود. این دوران پایه های جغرافیایی و فرهنگی را پیش از ظهور نخستین امپراتوری‌های متحد بنا کرد."
    },
    nextEraId: "median"
  },
  {
    eraId: "median",
    eraName: { en: "Median Empire", fa: "امپراتوری ماد" },
    yearRange: { start: -700, end: -550 },
    situationOneLiner: {
      en: "A tribal confederation humbles Assyria but struggles to hold itself together.",
      fa: "کنفدراسیون سستی از قبایل، غول آشوری را به زانو در می‌آورد اما در حفظ اتحاد خود درمانده است."
    },
    fullSummary: {
      en: "The Medes successfully challenged the Assyrian hegemony, establishing the first major Iranian political entity. However, its decentralized structure eventually paved the way for the rise of the Achaemenids.",
      fa: "مادها با موفقیت هژمونی آشور را به چالش کشیدند و نخستین نهاد سیاسی بزرگ ایرانی را پایه گذاری کردند. با این حال، ساختار غیرمتمرکز آن در نهایت راه را برای ظهور هخامنشیان هموار کرد."
    },
    prevEraId: "prehistoric",
    nextEraId: "achaemenid"
  },
  {
    eraId: "achaemenid",
    eraName: { en: "Achaemenid Empire", fa: "امپراتوری هخامنشی" },
    yearRange: { start: -550, end: -330 },
    situationOneLiner: {
      en: "Cyrus builds history's first superpower — from the Indus to the Nile.",
      fa: "کوروش نخستین ابرقدرت تاریخ را بنا می‌کند و ملت‌های گوناگون را در صلحی طلایی و شکننده پیوند می‌دهد."
    },
    fullSummary: {
      en: "The largest empire the world had seen, stretching from the Indus to the Nile. It was defined by its innovative administration and a policy of relative tolerance toward conquered peoples.",
      fa: "بزرگترین امپراتوری که جهان به خود دیده بود، از سند تا نیل گسترده شد. این امپراتوری با مدیریت نوآورانه و سیاست مدارای نسبی با اقوام مغلوب تعریف می شد."
    },
    prevEraId: "median",
    nextEraId: "hellenistic"
  },
  {
    eraId: "hellenistic",
    eraName: { en: "Hellenistic Period", fa: "دوره هلنیستی" },
    yearRange: { start: -330, end: -247 },
    situationOneLiner: {
      en: "Alexander's dream of a unified East dissolves into rival Greek states.",
      fa: "رویای اسکندر برای اتحاد شرق و غرب در موزاییکی از جنرال‌های رقیب یونانی از هم می‌پاشد."
    },
    fullSummary: {
      en: "Following Alexander's conquest, the Seleucid dynasty sought to Greekify the Iranian heartland. This period marked a fascinating, if tense, fusion of Hellenic and Persian cultures.",
      fa: "پس از فتوحات اسکندر، سلسله سلوکی در پی یونانی مآب کردن قلب ایران برآمد. این دوره نشان دهنده پیوند جذاب، هرچند پرتنش، فرهنگ‌های هلنی و پارسی بود."
    },
    prevEraId: "achaemenid",
    nextEraId: "parthian"
  },
  {
    eraId: "parthian",
    eraName: { en: "Parthian Empire", fa: "امپراتوری اشکانی" },
    yearRange: { start: -247, end: 224 },
    situationOneLiner: {
      en: "Mounted archers master the Silk Road, defying Rome for four centuries.",
      fa: "کمانداران سوارکار استپ، اربابان جاده ابریشم می‌شوند و قرن‌ها در برابر روم ایستادگی می‌کنند."
    },
    fullSummary: {
      en: "A decentralized feudal empire that served as the primary eastern rival to the Roman Empire. They controlled the lucrative trade routes between China and the West.",
      fa: "امپراتوری ملوک الطوایفی و غیرمتمرکزی که رقیب اصلی شرقی امپراتوری روم بود. آن‌ها مسیرهای تجاری پرسود بین چین و غرب را کنترل می کردند."
    },
    prevEraId: "hellenistic",
    nextEraId: "sasanian"
  },
  {
    eraId: "sasanian",
    eraName: { en: "Sasanian Empire", fa: "امپراتوری ساسانی" },
    yearRange: { start: 224, end: 651 },
    situationOneLiner: {
      en: "The glory of the Shahanshah peaks as the old world crumbles away.",
      fa: "شکوه شاهنشاه به اوج خود می‌رسد، درست زمانی که دنیای کهن آغاز به فروپاشی می‌کند."
    },
    fullSummary: {
      en: "The last great Iranian empire before the Islamic conquests, characterized by highly centralized administration, Zoroastrianism, and a grand renaissance of Persian art and architecture.",
      fa: "آخرین امپراتوری بزرگ ایرانی پیش از فتوحات اسلامی که با مدیریت متمرکز، آیین زرتشت و رنسانس باشکوه هنر و معماری پارسی شناخته می شد."
    },
    prevEraId: "parthian",
    nextEraId: "early_islamic"
  },
  {
    eraId: "early_islamic",
    eraName: { en: "Early Islamic Conquest", fa: "دوره فتوحات اسلامی" },
    yearRange: { start: 651, end: 820 },
    situationOneLiner: {
      en: "The empire collapses; a new faith arrives as the Persian spirit adapts.",
      fa: "امپراتوری کهن فرو می‌ریزد؛ آیینی نو فرا می‌رسد و روح ایرانی انطباق طولانی و آرام خود را آغاز می‌کند."
    },
    fullSummary: {
      en: "A period of profound transformation following the fall of the Sasanians. While political power shifted to the Caliphate, Persian administrative and cultural structures became the bedrock of the new Islamic world.",
      fa: "دوره ای از تحولات عمیق پس از سقوط ساسانیان. در حالی که قدرت سیاسی به خلافت منتقل شد، ساختارهای اداری و فرهنگی ایران به بستر دنیای جدید اسلامی تبدیل گشت."
    },
    prevEraId: "sasanian",
    nextEraId: "iranian_renaissance"
  },
  {
    eraId: "iranian_renaissance",
    eraName: { en: "Iranian Renaissance", fa: "رنسانس ایرانی" },
    yearRange: { start: 820, end: 1040 },
    situationOneLiner: {
      en: "Persian language and science bloom with defiant brilliance under the Caliphate.",
      fa: "در سایه خلافت، زبان و دانش پارسی با درخششی چالش‌برانگیز شکوفا می‌شود."
    },
    fullSummary: {
      en: "An era of cultural rebirth where local dynasties like the Samanids and Buyids championed Persian literature and science, producing giants like Ferdowsi and Avicenna.",
      fa: "دوران نوزایی فرهنگی که در آن سلسله های محلی مانند سامانیان و آل بویه حامی ادبیات و دانش پارسی شدند و بزرگانی چون فردوسی و ابن سینا را پروردند."
    },
    prevEraId: "early_islamic",
    nextEraId: "seljuk"
  },
  {
    eraId: "seljuk",
    eraName: { en: "Seljuk Dominance", fa: "دوره سلجوقی" },
    yearRange: { start: 1040, end: 1220 },
    situationOneLiner: {
      en: "Turkic warriors conquer the land, transformed by the culture they subdued.",
      fa: "جنگجویان ترک زمین را فتح می‌کنند، اما خود شیفته و دگرگون‌شده‌ی فرهنگی می‌شوند که بر آن چیره گشتند."
    },
    fullSummary: {
      en: "Turkic nomads established a massive empire, but they rapidly adopted Persian language, administration, and higher culture, spreading it as far as Anatolia.",
      fa: "عشایر ترک امپراتوری بزرگی را پدید آوردند، اما به سرعت زبان، مدیریت و فرهنگ والای پارسی را پذیرفتند و آن را تا آناتولی گسترش دادند."
    },
    prevEraId: "iranian_renaissance",
    nextEraId: "mongol_invasion"
  },
  {
    eraId: "mongol_invasion",
    eraName: { en: "Mongol Invasion", fa: "حمله مغول" },
    yearRange: { start: 1220, end: 1370 },
    situationOneLiner: {
      en: "Apocalypse from the East wipes cities away, yet clears trade paths.",
      fa: "قیامت از شرق فرا می‌رسد، شهرها را محو می‌کند اما راهی هموار برای تجارت جهانی باقی می‌گذارد."
    },
    fullSummary: {
      en: "A cataclysmic shock that decimated the population, yet eventually established the Ilkhanate, which connected Iran to a vast trans-Eurasian trade and diplomatic network.",
      fa: "شوکی فاجعه‌بار که جمعیت را به شدت کاهش داد، اما در نهایت ایلخانان را مستقر کرد که ایران را به شبکه وسیع تجارت و دیپلماسی سراسر اوراسیا متصل کرد."
    },
    prevEraId: "seljuk",
    nextEraId: "timurid"
  },
  {
    eraId: "timurid",
    eraName: { en: "Timurid Era", fa: "دوره تیموری" },
    yearRange: { start: 1370, end: 1501 },
    situationOneLiner: {
      en: "Timur builds a bloody empire; his descendants turn conquest into art.",
      fa: "تیمور امپراتوری خونینی بر پایه کشورگشایی بنا می‌کند، اما نوادگانش پایتخت او را به مهد هنر بدل می‌کنند."
    },
    fullSummary: {
      en: "Emerging from the shadow of central Asian conquest, the Timurids presided over a magnificent era of Persianate architecture, painting, and scholarship.",
      fa: "تیموریان که از سایه فتوحات آسیای مرکزی سر برآوردند، بر دوران با شکوهی از معماری، نقاشی و دانش پارسی مآبانه ریاست کردند."
    },
    prevEraId: "mongol_invasion",
    nextEraId: "safavid"
  },
  {
    eraId: "safavid",
    eraName: { en: "Safavid Empire", fa: "امپراتوری صفوی" },
    yearRange: { start: 1501, end: 1736 },
    situationOneLiner: {
      en: "Modern borders are drawn in blood as a new identity is forged.",
      fa: "مرزهای ایران مدرن با خون و ابریشم ترسیم می‌شود، در حالی که هویتی ملی در آتش شکل می‌گیرد."
    },
    fullSummary: {
      en: "The empire that established Shi'ism as the state religion and unified Iran into a centralized state. This era represents the peak of early modern Persian power and cultural prestige.",
      fa: "امپراتوری که تشیع را به عنوان مذهب رسمی مستقر کرد و ایران را در قالب کشوری متمرکز متحد نمود. این دوره اوج قدرت و اعتبار فرهنگی ایران در دوران مدرن اولیه است."
    },
    prevEraId: "timurid",
    nextEraId: "afsharid_zand"
  },
  {
    eraId: "afsharid_zand",
    eraName: { en: "Afsharid & Zand Period", fa: "دوره افشاریه و زندیه" },
    yearRange: { start: 1736, end: 1796 },
    situationOneLiner: {
      en: "Nader Shah strikes across Asia, leaving a vacuum that plunges into chaos.",
      fa: "نادرشاه چون صاعقه‌ای بر پهنه آسیا می‌تازد، اما خلأیی بر جای می‌گذارد که سرزمین را به کام آشوب می‌کشد."
    },
    fullSummary: {
      en: "The military brilliance of Nader Shah temporarily restored Iranian prestige, followed by the more benevolent but short-lived rule of Karim Khan Zand.",
      fa: "درخشش نظامی نادرشاه موقتا اعتبار ایران را بازگرداند و پس از او حکومت خیرخواهانه اما کوتاه مدت کریم خان زند فرا رسید."
    },
    prevEraId: "safavid",
    nextEraId: "qajar"
  },
  {
    eraId: "qajar",
    eraName: { en: "Qajar Dynasty", fa: "دوره قاجار" },
    yearRange: { start: 1796, end: 1925 },
    situationOneLiner: {
      en: "A traditional dynasty faces the industrial world, desperately clinging to the past.",
      fa: "سلسله‌ای سنتی با دنیای صنعتی روبرو می‌شود؛ سرزمین‌ها را از دست می‌دهد در حالی که ناامیدانه به گذشته چنگ زده است."
    },
    fullSummary: {
      en: "A challenging century where Iran struggled to maintain sovereignty against the encroaching European powers, marked by the loss of northern territories and the Constitutional Revolution.",
      fa: "قرنی چالش برانگیز که در آن ایران برای حفظ حاکمیت در برابر قدرت های متجاوز اروپایی مبارزه کرد؛ دورانی که با از دست دادن اراضی شمالی و انقلاب مشروطه شناخته می شود."
    },
    prevEraId: "afsharid_zand",
    nextEraId: "modern"
  },
  {
    eraId: "modern",
    eraName: { en: "Modern Iran", fa: "ایران مدرن" },
    yearRange: { start: 1925, end: 2000 },
    situationOneLiner: {
      en: "An old nation enters a century of oil, revolution, and change.",
      fa: "ملتی کهن وارد قرن نفت، انقلاب و تغییرات شتابان می‌شود و در جستجوی جایگاه خود در جهان است."
    },
    fullSummary: {
      en: "The Pahlavi era and the subsequent Islamic Revolution brought about dramatic, rapid modernization and deep social upheaval as Iran sought a new path in the 20th century.",
      fa: "دوران پهلوی و پس از آن انقلاب اسلامی، نوسازی سریع و دراماتیک و تحولات عمیق اجتماعی را به همراه داشت، در حالی که ایران در جستجوی راهی نو در قرن بیستم بود."
    },
    prevEraId: "qajar"
  }
];
