export type RulerType = 'Central Monarch' | 'Co-ruler' | 'Rival/Usurper' | 'Vassal/Sub-king' | 'Foreign Occupier';

export interface Ruler {
  id: string;
  name: { en: string; fa: string };
  title: { en: string; fa: string };
  dynastyId: string;
  rulerType: RulerType;
  startDate: number;
  endDate: number;
}

export const rulers: Record<string, Ruler> = {
  // Elamite
  untash_napirisha: {
    id: 'untash_napirisha',
    name: { en: 'Untash-Napirisha', fa: 'اونتاش-ناپیریشا' },
    title: { en: 'King of Anshan and Susa', fa: 'پادشاه انشان و شوش' },
    dynastyId: 'elamite',
    rulerType: 'Central Monarch',
    startDate: -1275,
    endDate: -1240,
  },
  shutruk_nakhunte: {
    id: 'shutruk_nakhunte',
    name: { en: 'Shutruk-Nakhunte', fa: 'شوتروک-ناخونته' },
    title: { en: 'King of Anshan and Susa', fa: 'پادشاه انشان و شوش' },
    dynastyId: 'elamite',
    rulerType: 'Central Monarch',
    startDate: -1185,
    endDate: -1155,
  },
  // Median
  cyaxares: {
    id: 'cyaxares',
    name: { en: 'Cyaxares', fa: 'هوخشتره' },
    title: { en: 'King of Media', fa: 'پادشاه ماد' },
    dynastyId: 'median',
    rulerType: 'Central Monarch',
    startDate: -625,
    endDate: -585,
  },
  astyages: {
    id: 'astyages',
    name: { en: 'Astyages', fa: 'ایشتوویگو' },
    title: { en: 'King of Media', fa: 'پادشاه ماد' },
    dynastyId: 'median',
    rulerType: 'Central Monarch',
    startDate: -585,
    endDate: -550,
  },
  // Achaemenid
  cyrus_great: {
    id: 'cyrus_great',
    name: { en: 'Cyrus the Great', fa: 'کوروش بزرگ' },
    title: { en: 'Shahanshah', fa: 'شاهنشاه' },
    dynastyId: 'achaemenid',
    rulerType: 'Central Monarch',
    startDate: -559,
    endDate: -530,
  },
  darius_great: {
    id: 'darius_great',
    name: { en: 'Darius the Great', fa: 'داریوش بزرگ' },
    title: { en: 'Shahanshah', fa: 'شاهنشاه' },
    dynastyId: 'achaemenid',
    rulerType: 'Central Monarch',
    startDate: -522,
    endDate: -486,
  },
  darius_iii: {
    id: 'darius_iii',
    name: { en: 'Darius III', fa: 'داریوش سوم' },
    title: { en: 'Shahanshah', fa: 'شاهنشاه' },
    dynastyId: 'achaemenid',
    rulerType: 'Central Monarch',
    startDate: -336,
    endDate: -330,
  },
  // Seleucid & Greco-Bactrian
  seleucus_i: {
    id: 'seleucus_i',
    name: { en: 'Seleucus I Nicator', fa: 'سلوکوس یکم' },
    title: { en: 'Basileus', fa: 'باسیلئوس' },
    dynastyId: 'seleucid',
    rulerType: 'Central Monarch',
    startDate: -305,
    endDate: -281,
  },
  antiochus_iv: {
    id: 'antiochus_iv',
    name: { en: 'Antiochus IV Epiphanes', fa: 'آنتیوخوس چهارم' },
    title: { en: 'Basileus', fa: 'باسیلئوس' },
    dynastyId: 'seleucid',
    rulerType: 'Central Monarch',
    startDate: -175,
    endDate: -164,
  },
  eucratides_i: {
    id: 'eucratides_i',
    name: { en: 'Eucratides I', fa: 'اوکراتید بزرگ' },
    title: { en: 'Basileus', fa: 'باسیلئوس' },
    dynastyId: 'greco_bactrian',
    rulerType: 'Central Monarch',
    startDate: -170,
    endDate: -145,
  },
  // Parthian
  mithridates_i: {
    id: 'mithridates_i',
    name: { en: 'Mithridates I', fa: 'مهرداد یکم' },
    title: { en: 'King of Kings', fa: 'شاهنشاه' },
    dynastyId: 'parthian',
    rulerType: 'Central Monarch',
    startDate: -171,
    endDate: -132,
  },
  mithridates_ii: {
    id: 'mithridates_ii',
    name: { en: 'Mithridates II', fa: 'مهرداد دوم' },
    title: { en: 'King of Kings', fa: 'شاهنشاه' },
    dynastyId: 'parthian',
    rulerType: 'Central Monarch',
    startDate: -124,
    endDate: -91,
  },
  artabanus_iv: {
    id: 'artabanus_iv',
    name: { en: 'Artabanus IV', fa: 'اردوان پنجم' },
    title: { en: 'King of Kings', fa: 'شاهنشاه' },
    dynastyId: 'parthian',
    rulerType: 'Central Monarch',
    startDate: 213,
    endDate: 224,
  },
  // Sasanian
  shapur_i: {
    id: 'shapur_i',
    name: { en: 'Shapur I', fa: 'شاپور یکم' },
    title: { en: 'Shahanshah', fa: 'شاهنشاه' },
    dynastyId: 'sasanian',
    rulerType: 'Central Monarch',
    startDate: 240,
    endDate: 270,
  },
  khosrow_i: {
    id: 'khosrow_i',
    name: { en: 'Khosrow I Anushirvan', fa: 'خسرو انوشیروان' },
    title: { en: 'Shahanshah', fa: 'شاهنشاه' },
    dynastyId: 'sasanian',
    rulerType: 'Central Monarch',
    startDate: 531,
    endDate: 579,
  },
  khosrow_ii: {
    id: 'khosrow_ii',
    name: { en: 'Khosrow II', fa: 'خسرو پرویز' },
    title: { en: 'Shahanshah', fa: 'شاهنشاه' },
    dynastyId: 'sasanian',
    rulerType: 'Central Monarch',
    startDate: 590,
    endDate: 628,
  },
  yazdegerd_iii: {
    id: 'yazdegerd_iii',
    name: { en: 'Yazdegerd III', fa: 'یزدگرد سوم' },
    title: { en: 'Shahanshah', fa: 'شاهنشاه' },
    dynastyId: 'sasanian',
    rulerType: 'Central Monarch',
    startDate: 632,
    endDate: 651,
  },
  // Abbasid
  harun_al_rashid: {
    id: 'harun_al_rashid',
    name: { en: 'Harun al-Rashid', fa: 'هارون الرشید' },
    title: { en: 'Caliph', fa: 'خلیفه' },
    dynastyId: 'abbasid',
    rulerType: 'Central Monarch',
    startDate: 786,
    endDate: 809,
  },
  // Intermezzo
  tahir_ibn_husayn: {
    id: 'tahir_ibn_husayn',
    name: { en: 'Tahir ibn Husayn', fa: 'طاهر بن حسین' },
    title: { en: 'Emir', fa: 'امیر' },
    dynastyId: 'tahirid',
    rulerType: 'Vassal/Sub-king',
    startDate: 821,
    endDate: 822,
  },
  yaqub_saffarid: {
    id: 'yaqub_saffarid',
    name: { en: 'Yaqub ibn al-Layth', fa: 'یعقوب لیث صفاری' },
    title: { en: 'Emir', fa: 'امیر' },
    dynastyId: 'saffarid',
    rulerType: 'Central Monarch',
    startDate: 861,
    endDate: 879,
  },
  ismail_samanid: {
    id: 'ismail_samanid',
    name: { en: 'Ismail Samani', fa: 'اسماعیل سامانی' },
    title: { en: 'Emir', fa: 'امیر' },
    dynastyId: 'samanid',
    rulerType: 'Central Monarch',
    startDate: 892,
    endDate: 907,
  },
  adud_al_dawla: {
    id: 'adud_al_dawla',
    name: { en: 'Adud al-Dawla', fa: 'عضدالدوله' },
    title: { en: 'Emir', fa: 'امیر' },
    dynastyId: 'buyid',
    rulerType: 'Central Monarch',
    startDate: 949,
    endDate: 983,
  },
  // Seljuks & Khwarazmians
  malik_shah_i: {
    id: 'malik_shah_i',
    name: { en: 'Malik-Shah I', fa: 'ملکشاه یکم' },
    title: { en: 'Sultan', fa: 'سلطان' },
    dynastyId: 'seljuk',
    rulerType: 'Central Monarch',
    startDate: 1072,
    endDate: 1092,
  },
  sultan_tekish: {
    id: 'sultan_tekish',
    name: { en: 'Sultan Tekish', fa: 'سلطان تکش' },
    title: { en: 'Shah', fa: 'شاه' },
    dynastyId: 'khwarazmian',
    rulerType: 'Central Monarch',
    startDate: 1172,
    endDate: 1200,
  },
  muhammad_ii: {
    id: 'muhammad_ii',
    name: { en: 'Muhammad II', fa: 'سلطان محمد خوارزمشاه' },
    title: { en: 'Shah', fa: 'شاه' },
    dynastyId: 'khwarazmian',
    rulerType: 'Central Monarch',
    startDate: 1200,
    endDate: 1220,
  },
  // Ilkhanate
  ghazan_khan: {
    id: 'ghazan_khan',
    name: { en: 'Ghazan Khan', fa: 'غازان خان' },
    title: { en: 'Ilkhan', fa: 'ایلخان' },
    dynastyId: 'ilkhanate',
    rulerType: 'Central Monarch',
    startDate: 1295,
    endDate: 1304,
  },
  abu_said: {
    id: 'abu_said',
    name: { en: 'Abu Sa\'id Bahadur Khan', fa: 'ابوسعید بهادرخان' },
    title: { en: 'Ilkhan', fa: 'ایلخان' },
    dynastyId: 'ilkhanate',
    rulerType: 'Central Monarch',
    startDate: 1316,
    endDate: 1335,
  },
  // Post-Ilkhanate
  shah_rukh: {
    id: 'shah_rukh',
    name: { en: 'Shah Rukh', fa: 'شاهرخ تیموری' },
    title: { en: 'Emir', fa: 'امیر' },
    dynastyId: 'timurid',
    rulerType: 'Central Monarch',
    startDate: 1405,
    endDate: 1447,
  },
  uzun_hasan: {
    id: 'uzun_hasan',
    name: { en: 'Uzun Hasan', fa: 'اوزون حسن' },
    title: { en: 'Sultan', fa: 'سلطان' },
    dynastyId: 'aq_qoyunlu',
    rulerType: 'Central Monarch',
    startDate: 1453,
    endDate: 1478,
  },
  // Safavid
  abbas_great: {
    id: 'abbas_great',
    name: { en: 'Abbas the Great', fa: 'شاه عباس بزرگ' },
    title: { en: 'Shah', fa: 'شاه' },
    dynastyId: 'safavid',
    rulerType: 'Central Monarch',
    startDate: 1588,
    endDate: 1629,
  },
  sultan_husayn: {
    id: 'sultan_husayn',
    name: { en: 'Sultan Husayn', fa: 'شاه سلطان حسین' },
    title: { en: 'Shah', fa: 'شاه' },
    dynastyId: 'safavid',
    rulerType: 'Central Monarch',
    startDate: 1694,
    endDate: 1722,
  },
  // Afsharid & Zand
  nader_shah: {
    id: 'nader_shah',
    name: { en: 'Nader Shah', fa: 'نادرشاه' },
    title: { en: 'Shah', fa: 'شاه' },
    dynastyId: 'afsharid',
    rulerType: 'Central Monarch',
    startDate: 1736,
    endDate: 1747,
  },
  karim_khan: {
    id: 'karim_khan',
    name: { en: 'Karim Khan Zand', fa: 'کریم‌خان زند' },
    title: { en: 'Vakil al-Ro\'aya', fa: 'وکیل‌الرعایا' },
    dynastyId: 'zand',
    rulerType: 'Central Monarch',
    startDate: 1751,
    endDate: 1779,
  },
  // Qajar
  naser_al_din: {
    id: 'naser_al_din',
    name: { en: 'Naser al-Din Shah', fa: 'ناصرالدین شاه' },
    title: { en: 'Shah', fa: 'شاه' },
    dynastyId: 'qajar',
    rulerType: 'Central Monarch',
    startDate: 1848,
    endDate: 1896,
  },
  ahmad_shah: {
    id: 'ahmad_shah',
    name: { en: 'Ahmad Shah', fa: 'احمد شاه' },
    title: { en: 'Shah', fa: 'شاه' },
    dynastyId: 'qajar',
    rulerType: 'Central Monarch',
    startDate: 1909,
    endDate: 1925,
  },
  // Pahlavi & Contemporary
  reza_shah: {
    id: 'reza_shah',
    name: { en: 'Reza Shah', fa: 'رضا شاه' },
    title: { en: 'Shah', fa: 'شاه' },
    dynastyId: 'pahlavi',
    rulerType: 'Central Monarch',
    startDate: 1925,
    endDate: 1941,
  },
  mohammad_reza_shah: {
    id: 'mohammad_reza_shah',
    name: { en: 'Mohammad Reza Pahlavi', fa: 'محمدرضا پهلوی' },
    title: { en: 'Shahanshah', fa: 'شاهنشاه' },
    dynastyId: 'pahlavi',
    rulerType: 'Central Monarch',
    startDate: 1941,
    endDate: 1979,
  },
  ruhollah_khomeini: {
    id: 'ruhollah_khomeini',
    name: { en: 'Ruhollah Khomeini', fa: 'روح‌الله خمینی' },
    title: { en: 'Supreme Leader', fa: 'رهبر' },
    dynastyId: 'islamic_republic',
    rulerType: 'Central Monarch',
    startDate: 1979,
    endDate: 1989,
  },
  bahram_chobin: {
    "id": "bahram_chobin",
    "name": {
      "en": "Bahram Chobin",
      "fa": "بهرام چوبین"
    },
    "title": {
      "en": "Shahanshah",
      "fa": "شاهنشاه"
    },
    "dynastyId": "sasanian",
    "rulerType": "Rival/Usurper",
    "startDate": 590,
    "endDate": 591
  },
  shervin_i: {
    "id": "shervin_i",
    "name": {
      "en": "Shervin I",
      "fa": "شروین یکم"
    },
    "title": {
      "en": "Ispahbad",
      "fa": "اسپهبد"
    },
    "dynastyId": "bavandid",
    "rulerType": "Vassal/Sub-king",
    "startDate": 772,
    "endDate": 817
  },
  nicholas_ii: {
    "id": "nicholas_ii",
    "name": {
      "en": "Nicholas II",
      "fa": "نیکلای دوم"
    },
    "title": {
      "en": "Emperor",
      "fa": "امپراتور"
    },
    "dynastyId": "russian_empire",
    "rulerType": "Foreign Occupier",
    "startDate": 1894,
    "endDate": 1917
  },
  george_v: {
    "id": "george_v",
    "name": {
      "en": "George V",
      "fa": "جرج پنجم"
    },
    "title": {
      "en": "King",
      "fa": "پادشاه"
    },
    "dynastyId": "british_empire",
    "rulerType": "Foreign Occupier",
    "startDate": 1910,
    "endDate": 1936
  },
  mardavij_ziyarid: {
    "id": "mardavij_ziyarid",
    "name": {
      "en": "Mardavij",
      "fa": "مرداویج زیاری"
    },
    "title": {
      "en": "Emir",
      "fa": "امیر"
    },
    "dynastyId": "ziyarid",
    "rulerType": "Central Monarch",
    "startDate": 930,
    "endDate": 935
  },
  hasan_buzurg: {
    "id": "hasan_buzurg",
    "name": {
      "en": "Hasan Buzurg",
      "fa": "حسن بزرگ"
    },
    "title": {
      "en": "Sultan",
      "fa": "سلطان"
    },
    "dynastyId": "jalayirid",
    "rulerType": "Central Monarch",
    "startDate": 1336,
    "endDate": 1356
  },
  mubariz_al_din: {
    "id": "mubariz_al_din",
    "name": {
      "en": "Mubariz al-Din Muhammad",
      "fa": "امیر مبارزالدین محمد"
    },
    "title": {
      "en": "Emir",
      "fa": "امیر"
    },
    "dynastyId": "muzaffarid",
    "rulerType": "Central Monarch",
    "startDate": 1314,
    "endDate": 1358
  },
  shutruk_nahhunte: {
    "id": "shutruk_nahhunte",
    "name": {
      "en": "Shutruk-Nahhunte",
      "fa": "شوتروک-ناخونته"
    },
    "title": {
      "en": "King",
      "fa": "پادشاه"
    },
    "dynastyId": "elamite",
    "rulerType": "Central Monarch",
    "startDate": -1184,
    "endDate": -1155
  },
  humban_haltash_iii: {
    "id": "humban_haltash_iii",
    "name": {
      "en": "Humban-Haltash III",
      "fa": "هومبان-هالتاش سوم"
    },
    "title": {
      "en": "King",
      "fa": "پادشاه"
    },
    "dynastyId": "elamite",
    "rulerType": "Central Monarch",
    "startDate": -650,
    "endDate": -640
  },
  antiochus_iii: {
    "id": "antiochus_iii",
    "name": {
      "en": "Antiochus III",
      "fa": "آنتیوخوس سوم"
    },
    "title": {
      "en": "Basileus",
      "fa": "باسیلئوس"
    },
    "dynastyId": "seleucid",
    "rulerType": "Central Monarch",
    "startDate": -222,
    "endDate": -187
  },
  antiochus_vii: {
    "id": "antiochus_vii",
    "name": {
      "en": "Antiochus VII",
      "fa": "آنتیوخوس هفتم"
    },
    "title": {
      "en": "Basileus",
      "fa": "باسیلئوس"
    },
    "dynastyId": "seleucid",
    "rulerType": "Central Monarch",
    "startDate": -138,
    "endDate": -129
  },
  diodotus_i: {
    "id": "diodotus_i",
    "name": {
      "en": "Diodotus I",
      "fa": "دیودوت یکم"
    },
    "title": {
      "en": "Basileus",
      "fa": "باسیلئوس"
    },
    "dynastyId": "greco_bactrian",
    "rulerType": "Central Monarch",
    "startDate": -250,
    "endDate": -230
  },
  heliocles_i: {
    "id": "heliocles_i",
    "name": {
      "en": "Heliocles I",
      "fa": "هلیوکل یکم"
    },
    "title": {
      "en": "Basileus",
      "fa": "باسیلئوس"
    },
    "dynastyId": "greco_bactrian",
    "rulerType": "Central Monarch",
    "startDate": -145,
    "endDate": -130
  },
  ardashir_i: {
    "id": "ardashir_i",
    "name": {
      "en": "Ardashir I",
      "fa": "اردشیر بابکان"
    },
    "title": {
      "en": "Shahanshah",
      "fa": "شاهنشاه"
    },
    "dynastyId": "sasanian",
    "rulerType": "Central Monarch",
    "startDate": 224,
    "endDate": 242
  },
  al_mansur: {
    "id": "al_mansur",
    "name": {
      "en": "Al-Mansur",
      "fa": "المنصور"
    },
    "title": {
      "en": "Caliph",
      "fa": "خلیفه"
    },
    "dynastyId": "abbasid",
    "rulerType": "Central Monarch",
    "startDate": 754,
    "endDate": 775
  },
  al_mustasim: {
    "id": "al_mustasim",
    "name": {
      "en": "Al-Musta'sim",
      "fa": "المستعصم"
    },
    "title": {
      "en": "Caliph",
      "fa": "خلیفه"
    },
    "dynastyId": "abbasid",
    "rulerType": "Central Monarch",
    "startDate": 1242,
    "endDate": 1258
  },
  muhammad_ibn_tahir: {
    "id": "muhammad_ibn_tahir",
    "name": {
      "en": "Muhammad ibn Tahir",
      "fa": "محمد بن طاهر"
    },
    "title": {
      "en": "Emir",
      "fa": "امیر"
    },
    "dynastyId": "tahirid",
    "rulerType": "Vassal/Sub-king",
    "startDate": 862,
    "endDate": 873
  },
  amr_ibn_al_layth: {
    "id": "amr_ibn_al_layth",
    "name": {
      "en": "Amr ibn al-Layth",
      "fa": "عمرو لیث صفاری"
    },
    "title": {
      "en": "Emir",
      "fa": "امیر"
    },
    "dynastyId": "saffarid",
    "rulerType": "Central Monarch",
    "startDate": 879,
    "endDate": 901
  },
  khalaf_ibn_ahmad: {
    "id": "khalaf_ibn_ahmad",
    "name": {
      "en": "Khalaf ibn Ahmad",
      "fa": "خلف بن احمد"
    },
    "title": {
      "en": "Emir",
      "fa": "امیر"
    },
    "dynastyId": "saffarid",
    "rulerType": "Central Monarch",
    "startDate": 963,
    "endDate": 1002
  },
  qabus_ibn_voshmgir: {
    "id": "qabus_ibn_voshmgir",
    "name": {
      "en": "Qabus ibn Voshmgir",
      "fa": "قابوس بن وشمگیر"
    },
    "title": {
      "en": "Emir",
      "fa": "امیر"
    },
    "dynastyId": "ziyarid",
    "rulerType": "Central Monarch",
    "startDate": 977,
    "endDate": 1012
  },
  gilanshah: {
    "id": "gilanshah",
    "name": {
      "en": "Gilanshah",
      "fa": "گیلانشاه"
    },
    "title": {
      "en": "Emir",
      "fa": "امیر"
    },
    "dynastyId": "ziyarid",
    "rulerType": "Central Monarch",
    "startDate": 1087,
    "endDate": 1090
  },
  abu_kalijar: {
    "id": "abu_kalijar",
    "name": {
      "en": "Abu Kalijar",
      "fa": "ابوکالیجار"
    },
    "title": {
      "en": "Emir",
      "fa": "امیر"
    },
    "dynastyId": "buyid",
    "rulerType": "Central Monarch",
    "startDate": 1024,
    "endDate": 1048
  },
  tughril_beg: {
    "id": "tughril_beg",
    "name": {
      "en": "Tughril Beg",
      "fa": "طغرل بیک"
    },
    "title": {
      "en": "Sultan",
      "fa": "سلطان"
    },
    "dynastyId": "seljuk",
    "rulerType": "Central Monarch",
    "startDate": 1037,
    "endDate": 1063
  },
  ahmad_sanjar: {
    "id": "ahmad_sanjar",
    "name": {
      "en": "Ahmad Sanjar",
      "fa": "احمد سنجر"
    },
    "title": {
      "en": "Sultan",
      "fa": "سلطان"
    },
    "dynastyId": "seljuk",
    "rulerType": "Central Monarch",
    "startDate": 1118,
    "endDate": 1153
  },
  tughril_iii: {
    "id": "tughril_iii",
    "name": {
      "en": "Tughril III",
      "fa": "طغرل سوم"
    },
    "title": {
      "en": "Sultan",
      "fa": "سلطان"
    },
    "dynastyId": "seljuk",
    "rulerType": "Central Monarch",
    "startDate": 1176,
    "endDate": 1194
  },
  ala_al_din_tekish: {
    "id": "ala_al_din_tekish",
    "name": {
      "en": "Ala al-Din Tekish",
      "fa": "علاءالدین تکش"
    },
    "title": {
      "en": "Shah",
      "fa": "شاه"
    },
    "dynastyId": "khwarazmian",
    "rulerType": "Central Monarch",
    "startDate": 1172,
    "endDate": 1200
  },
  hulagu_khan: {
    "id": "hulagu_khan",
    "name": {
      "en": "Hulagu Khan",
      "fa": "هولاکو خان"
    },
    "title": {
      "en": "Ilkhan",
      "fa": "ایلخان"
    },
    "dynastyId": "ilkhanate",
    "rulerType": "Central Monarch",
    "startDate": 1256,
    "endDate": 1265
  },
  abu_said_bahadur: {
    "id": "abu_said_bahadur",
    "name": {
      "en": "Abu Sa'id Bahadur Khan",
      "fa": "ابوسعید بهادرخان"
    },
    "title": {
      "en": "Ilkhan",
      "fa": "ایلخان"
    },
    "dynastyId": "ilkhanate",
    "rulerType": "Central Monarch",
    "startDate": 1316,
    "endDate": 1335
  },
  shaykh_uways: {
    "id": "shaykh_uways",
    "name": {
      "en": "Shaykh Uways",
      "fa": "شیخ اویس"
    },
    "title": {
      "en": "Sultan",
      "fa": "سلطان"
    },
    "dynastyId": "jalayirid",
    "rulerType": "Central Monarch",
    "startDate": 1356,
    "endDate": 1374
  },
  husayn_jalayir: {
    "id": "husayn_jalayir",
    "name": {
      "en": "Husayn Jalayir",
      "fa": "حسین جلایر"
    },
    "title": {
      "en": "Sultan",
      "fa": "سلطان"
    },
    "dynastyId": "jalayirid",
    "rulerType": "Central Monarch",
    "startDate": 1374,
    "endDate": 1382
  },
  shah_shuja: {
    "id": "shah_shuja",
    "name": {
      "en": "Shah Shuja",
      "fa": "شاه شجاع"
    },
    "title": {
      "en": "Emir",
      "fa": "امیر"
    },
    "dynastyId": "muzaffarid",
    "rulerType": "Central Monarch",
    "startDate": 1358,
    "endDate": 1384
  },
  shah_mansur: {
    "id": "shah_mansur",
    "name": {
      "en": "Shah Mansur",
      "fa": "شاه منصور"
    },
    "title": {
      "en": "Emir",
      "fa": "امیر"
    },
    "dynastyId": "muzaffarid",
    "rulerType": "Central Monarch",
    "startDate": 1387,
    "endDate": 1393
  },
  timur: {
    "id": "timur",
    "name": {
      "en": "Timur",
      "fa": "تیمور لنگ"
    },
    "title": {
      "en": "Emir",
      "fa": "امیر"
    },
    "dynastyId": "timurid",
    "rulerType": "Central Monarch",
    "startDate": 1370,
    "endDate": 1405
  },
  shahrukh: {
    "id": "shahrukh",
    "name": {
      "en": "Shahrukh",
      "fa": "شاهرخ"
    },
    "title": {
      "en": "Emir",
      "fa": "امیر"
    },
    "dynastyId": "timurid",
    "rulerType": "Central Monarch",
    "startDate": 1405,
    "endDate": 1447
  },
  husayn_bayqara: {
    "id": "husayn_bayqara",
    "name": {
      "en": "Husayn Bayqara",
      "fa": "سلطان حسین بایقرا"
    },
    "title": {
      "en": "Emir",
      "fa": "امیر"
    },
    "dynastyId": "timurid",
    "rulerType": "Central Monarch",
    "startDate": 1469,
    "endDate": 1506
  },
  murad_aq_qoyunlu: {
    "id": "murad_aq_qoyunlu",
    "name": {
      "en": "Sultan Murad",
      "fa": "سلطان مراد"
    },
    "title": {
      "en": "Sultan",
      "fa": "سلطان"
    },
    "dynastyId": "aq_qoyunlu",
    "rulerType": "Central Monarch",
    "startDate": 1497,
    "endDate": 1508
  },
  ismail_i: {
    "id": "ismail_i",
    "name": {
      "en": "Ismail I",
      "fa": "شاه اسماعیل یکم"
    },
    "title": {
      "en": "Shah",
      "fa": "شاه"
    },
    "dynastyId": "safavid",
    "rulerType": "Central Monarch",
    "startDate": 1501,
    "endDate": 1524
  },
  shahrokh_afshar: {
    "id": "shahrokh_afshar",
    "name": {
      "en": "Shahrokh Shah",
      "fa": "شاهرخ میرزا"
    },
    "title": {
      "en": "Shah",
      "fa": "شاه"
    },
    "dynastyId": "afsharid",
    "rulerType": "Central Monarch",
    "startDate": 1748,
    "endDate": 1796
  },
  lotf_ali_khan: {
    "id": "lotf_ali_khan",
    "name": {
      "en": "Lotf Ali Khan",
      "fa": "لطفعلی‌خان زند"
    },
    "title": {
      "en": "Vakil",
      "fa": "وکیل"
    },
    "dynastyId": "zand",
    "rulerType": "Central Monarch",
    "startDate": 1789,
    "endDate": 1794
  },
  agha_mohammad_khan: {
    "id": "agha_mohammad_khan",
    "name": {
      "en": "Agha Mohammad Khan",
      "fa": "آقامحمدخان قاجار"
    },
    "title": {
      "en": "Shah",
      "fa": "شاه"
    },
    "dynastyId": "qajar",
    "rulerType": "Central Monarch",
    "startDate": 1789,
    "endDate": 1797
  },
  ahmad_shah_qajar: {
    "id": "ahmad_shah_qajar",
    "name": {
      "en": "Ahmad Shah",
      "fa": "احمدشاه قاجار"
    },
    "title": {
      "en": "Shah",
      "fa": "شاه"
    },
    "dynastyId": "qajar",
    "rulerType": "Central Monarch",
    "startDate": 1909,
    "endDate": 1925
  },
  khomeini: {
    "id": "khomeini",
    "name": {
      "en": "Ruhollah Khomeini",
      "fa": "روح‌الله خمینی"
    },
    "title": {
      "en": "Supreme Leader",
      "fa": "رهبر"
    },
    "dynastyId": "islamic_republic",
    "rulerType": "Central Monarch",
    "startDate": 1979,
    "endDate": 1989
  },
  khamenei: {
    "id": "khamenei",
    "name": {
      "en": "Ali Khamenei",
      "fa": "علی خامنه‌ای"
    },
    "title": {
      "en": "Supreme Leader",
      "fa": "رهبر"
    },
    "dynastyId": "islamic_republic",
    "rulerType": "Central Monarch",
    "startDate": 1989,
    "endDate": 2024
  },
};
