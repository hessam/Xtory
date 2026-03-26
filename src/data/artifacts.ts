export interface Artifact {
  id: string;
  name: {
    en: string;
    fa: string;
  };
  description: {
    en: string;
    fa: string;
  };
  year: number; // Approximate year of creation or significance
  currentLocation: {
    en: string;
    fa: string;
  };
  coordinates?: [number, number]; // [x, y] on the map (roughly longitude, latitude mapped to SVG)
  type: 'monument' | 'artifact' | 'manuscript' | 'architecture';
  regionId: string;
}

export const artifacts: Artifact[] = [
  {
    id: "art_chogha_zanbil",
    name: { en: "Chogha Zanbil Ziggurat", fa: "زیگورات چغازنبیل" },
    description: { 
      en: "An ancient Elamite complex, it is one of the few existing ziggurats outside of Mesopotamia, built by King Untash-Napirisha.", 
      fa: "یک مجتمع عیلامی باستان، که یکی از معدود زیگورات‌های موجود در خارج از بین‌النهرین است و توسط پادشاه اونتاش-ناپیریشا ساخته شده است." 
    },
    year: -1250,
    currentLocation: { en: "Khuzestan, Iran", fa: "خوزستان، ایران" },
    coordinates: [350, 280],
    type: "monument",
    regionId: "mesopotamia"
  },
  {
    id: "art_behistun_relief",
    name: { en: "Behistun Inscription", fa: "کتیبه بیستون" },
    description: { 
      en: "A multilingual inscription and large rock relief on a cliff at Mount Behistun, established by Darius the Great.", 
      fa: "کتیبه‌ای چندزبانه و سنگ‌نگاره‌ای بزرگ بر روی صخره‌ای در کوه بیستون که توسط داریوش بزرگ برپا شده است." 
    },
    year: -520,
    currentLocation: { en: "Kermanshah, Iran", fa: "کرمانشاه، ایران" },
    coordinates: [360, 260],
    type: "monument",
    regionId: "jibal"
  },
  {
    id: "art_tomb_cyrus",
    name: { en: "Tomb of Cyrus the Great", fa: "آرامگاه کوروش بزرگ" },
    description: { 
      en: "The final resting place of Cyrus the Great, the founder of the Achaemenid Empire, located in Pasargadae.", 
      fa: "آرامگاه نهایی کوروش بزرگ، بنیانگذار شاهنشاهی هخامنشی، واقع در پاسارگاد." 
    },
    year: -530,
    currentLocation: { en: "Pasargadae, Fars, Iran", fa: "پاسارگاد، فارس، ایران" },
    coordinates: [440, 360],
    type: "monument",
    regionId: "fars"
  },
  {
    id: "art_pasargadae",
    name: { en: "Pasargadae", fa: "پاسارگاد" },
    description: { 
      en: "The first capital of the Achaemenid Empire under Cyrus the Great, featuring the early Achaemenid architectural style.", 
      fa: "اولین پایتخت شاهنشاهی هخامنشی در دوران کوروش بزرگ که سبک معماری هخامنشی اولیه را نشان می‌دهد." 
    },
    year: -550,
    currentLocation: { en: "Fars, Iran", fa: "فارس، ایران" },
    coordinates: [445, 355],
    type: "architecture",
    regionId: "fars"
  },
  {
    id: "art_cyrus_cylinder",
    name: { en: "Cyrus Cylinder", fa: "استوانه کوروش" },
    description: { 
      en: "An ancient clay cylinder, now broken into several pieces, on which is written a declaration in Akkadian cuneiform script in the name of Persia's Achaemenid king Cyrus the Great.", 
      fa: "یک استوانه گلی باستانی که اکنون به چند قطعه شکسته شده است، که بر روی آن اعلامیه‌ای به خط میخی اکدی به نام پادشاه هخامنشی ایران، کوروش بزرگ نوشته شده است." 
    },
    year: -539,
    currentLocation: { en: "British Museum, London", fa: "موزه بریتانیا، لندن" },
    coordinates: [370, 290], // Babylon approx
    type: "artifact",
    regionId: "mesopotamia"
  },
  {
    id: "art_persepolis",
    name: { en: "Persepolis (Takht-e Jamshid)", fa: "تخت جمشید" },
    description: { 
      en: "The ceremonial capital of the Achaemenid Empire. It exemplifies the Achaemenid style of architecture.", 
      fa: "پایتخت تشریفاتی امپراتوری هخامنشی. این مکان نمونه بارز سبک معماری هخامنشی است." 
    },
    year: -515,
    currentLocation: { en: "Fars Province, Iran", fa: "استان فارس، ایران" },
    coordinates: [450, 350], // Persepolis approx
    type: "monument",
    regionId: "fars"
  },
  {
    id: "art_taq_kasra",
    name: { en: "Taq Kasra (Arch of Ctesiphon)", fa: "طاق کسری" },
    description: { 
      en: "The remains of a Sasanian-era Persian monument, sometimes described as the single-span vault of unreinforced brickwork and the largest vault ever constructed in the world.", 
      fa: "بقایای یک بنای تاریخی ایرانی مربوط به دوره ساسانی، که گاهی به عنوان طاق تک‌دهانه از آجرکاری بدون تقویت‌کننده و بزرگترین طاق ساخته شده در جهان توصیف می‌شود." 
    },
    year: 540,
    currentLocation: { en: "Salman Pak, Iraq", fa: "سلمان پاک، عراق" },
    coordinates: [375, 285], // Ctesiphon approx
    type: "monument",
    regionId: "mesopotamia"
  },
  {
    id: "art_shahnameh_baysunghur",
    name: { en: "Baysunghur Shahnameh", fa: "شاهنامه بایسنقری" },
    description: { 
      en: "An illustrated manuscript of the Shahnameh, the national epic of Greater Iran, commissioned by the Timurid prince Baysunghur.", 
      fa: "یک نسخه خطی مصور از شاهنامه، حماسه ملی ایران بزرگ، که به سفارش شاهزاده تیموری بایسنقر تهیه شده است." 
    },
    year: 1430,
    currentLocation: { en: "Golestan Palace, Tehran", fa: "کاخ گلستان، تهران" },
    coordinates: [550, 250], // Herat approx
    type: "manuscript",
    regionId: "khorasan"
  },
  {
    id: "art_naqsh_e_jahan",
    name: { en: "Naqsh-e Jahan Square", fa: "میدان نقش جهان" },
    description: { 
      en: "Constructed between 1598 and 1629, it is now an important historical site, and one of UNESCO's World Heritage Sites. It is situated at the center of Isfahan city.", 
      fa: "بین سال‌های ۱۵۹۸ تا ۱۶۲۹ ساخته شده و اکنون یک مکان تاریخی مهم و یکی از میراث جهانی یونسکو است. این میدان در مرکز شهر اصفهان قرار دارد." 
    },
    year: 1629,
    currentLocation: { en: "Isfahan, Iran", fa: "اصفهان، ایران" },
    coordinates: [420, 310], // Isfahan approx
    type: "architecture",
    regionId: "jibal"
  }
];
