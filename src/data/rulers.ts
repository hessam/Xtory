export interface Ruler {
  id: string;
  name: { en: string; fa: string };
  title: { en: string; fa: string };
  dynastyId: string;
  rulerType: 'Central Monarch' | 'Regional Governor' | 'Rebel Leader';
  startDate: number;
  endDate: number;
}

export const rulers: Record<string, Ruler> = {
  cyrus_great: { id: 'cyrus_great', name: { en: 'Cyrus the Great', fa: 'کوروش بزرگ' }, title: { en: 'King of Kings', fa: 'شاهنشاه' }, dynastyId: 'achaemenid', rulerType: 'Central Monarch', startDate: -559, endDate: -530 },
  darius_i: { id: 'darius_i', name: { en: 'Darius I', fa: 'داریوش یکم' }, title: { en: 'King of Kings', fa: 'شاهنشاه' }, dynastyId: 'achaemenid', rulerType: 'Central Monarch', startDate: -522, endDate: -486 },
  mithridates_i: { id: 'mithridates_i', name: { en: 'Mithridates I', fa: 'مهرداد یکم' }, title: { en: 'King of Kings', fa: 'شاهنشاه' }, dynastyId: 'parthian', rulerType: 'Central Monarch', startDate: -171, endDate: -132 },
  orodes_ii: { id: 'orodes_ii', name: { en: 'Orodes II', fa: 'ارد دوم' }, title: { en: 'King of Kings', fa: 'شاهنشاه' }, dynastyId: 'parthian', rulerType: 'Central Monarch', startDate: -57, endDate: -37 },
  ardashir_i: { id: 'ardashir_i', name: { en: 'Ardashir I', fa: 'اردشیر بابکان' }, title: { en: 'King of Kings', fa: 'شاهنشاه' }, dynastyId: 'sasanian', rulerType: 'Central Monarch', startDate: 224, endDate: 242 },
  khosrow_i: { id: 'khosrow_i', name: { en: 'Khosrow I', fa: 'خسرو انوشیروان' }, title: { en: 'King of Kings', fa: 'شاهنشاه' }, dynastyId: 'sasanian', rulerType: 'Central Monarch', startDate: 531, endDate: 579 },
  abd_al_malik: { id: 'abd_al_malik', name: { en: 'Abd al-Malik', fa: 'عبدالملک بن مروان' }, title: { en: 'Caliph', fa: 'خلیفه' }, dynastyId: 'umayyad', rulerType: 'Central Monarch', startDate: 685, endDate: 705 },
  harun_al_rashid: { id: 'harun_al_rashid', name: { en: 'Harun al-Rashid', fa: 'هارون الرشید' }, title: { en: 'Caliph', fa: 'خلیفه' }, dynastyId: 'abbasid', rulerType: 'Central Monarch', startDate: 786, endDate: 809 },
  ismail_samani: { id: 'ismail_samani', name: { en: 'Ismail Samani', fa: 'امیر اسماعیل سامانی' }, title: { en: 'Amir', fa: 'امیر' }, dynastyId: 'samanid', rulerType: 'Central Monarch', startDate: 892, endDate: 907 },
  adud_al_dawla: { id: 'adud_al_dawla', name: { en: 'Adud al-Dawla', fa: 'عضدالدوله دیلمی' }, title: { en: 'Amir al-Umara', fa: 'امیرالامرا' }, dynastyId: 'buyid', rulerType: 'Central Monarch', startDate: 949, endDate: 983 },
  alp_arslan: { id: 'alp_arslan', name: { en: 'Alp Arslan', fa: 'آلپ ارسلان' }, title: { en: 'Sultan', fa: 'سلطان' }, dynastyId: 'seljuk', rulerType: 'Central Monarch', startDate: 1063, endDate: 1072 },
  malik_shah_i: { id: 'malik_shah_i', name: { en: 'Malik-Shah I', fa: 'ملکشاه یکم' }, title: { en: 'Sultan', fa: 'سلطان' }, dynastyId: 'seljuk', rulerType: 'Central Monarch', startDate: 1072, endDate: 1092 },
  muhammad_ii: { id: 'muhammad_ii', name: { en: 'Muhammad II', fa: 'محمد خوارزمشاه' }, title: { en: 'Shah', fa: 'شاه' }, dynastyId: 'khwarazmian', rulerType: 'Central Monarch', startDate: 1200, endDate: 1220 },
  ghazan: { id: 'ghazan', name: { en: 'Ghazan', fa: 'غازان خان' }, title: { en: 'Ilkhan', fa: 'ایلخان' }, dynastyId: 'ilkhanate', rulerType: 'Central Monarch', startDate: 1295, endDate: 1304 },
  hasan_buzurg: { id: 'hasan_buzurg', name: { en: 'Hasan Buzurg', fa: 'حسن بزرگ' }, title: { en: 'Sultan', fa: 'سلطان' }, dynastyId: 'jalayirid', rulerType: 'Central Monarch', startDate: 1336, endDate: 1356 },
  mubariz_al_din: { id: 'mubariz_al_din', name: { en: 'Mubariz al-Din', fa: 'مبارزالدین محمد' }, title: { en: 'Sultan', fa: 'سلطان' }, dynastyId: 'muzaffarid', rulerType: 'Central Monarch', startDate: 1314, endDate: 1358 },
  timur: { id: 'timur', name: { en: 'Timur', fa: 'تیمور لنگ' }, title: { en: 'Amir', fa: 'امیر' }, dynastyId: 'timurid', rulerType: 'Central Monarch', startDate: 1370, endDate: 1405 },
  shah_rukh: { id: 'shah_rukh', name: { en: 'Shah Rukh', fa: 'شاهرخ' }, title: { en: 'Sultan', fa: 'سلطان' }, dynastyId: 'timurid', rulerType: 'Central Monarch', startDate: 1405, endDate: 1447 },
  ismail_i: { id: 'ismail_i', name: { en: 'Ismail I', fa: 'شاه اسماعیل یکم' }, title: { en: 'Shah', fa: 'شاه' }, dynastyId: 'safavid', rulerType: 'Central Monarch', startDate: 1501, endDate: 1524 },
  abbas_i: { id: 'abbas_i', name: { en: 'Abbas I', fa: 'شاه عباس بزرگ' }, title: { en: 'Shah', fa: 'شاه' }, dynastyId: 'safavid', rulerType: 'Central Monarch', startDate: 1588, endDate: 1629 },
  nader_shah: { id: 'nader_shah', name: { en: 'Nader Shah', fa: 'نادرشاه افشار' }, title: { en: 'Shah', fa: 'شاه' }, dynastyId: 'afsharid', rulerType: 'Central Monarch', startDate: 1736, endDate: 1747 },
  karim_khan: { id: 'karim_khan', name: { en: 'Karim Khan', fa: 'کریم‌خان زند' }, title: { en: 'Vakil e-Raaya', fa: 'وکیل‌الرعایا' }, dynastyId: 'zand', rulerType: 'Central Monarch', startDate: 1751, endDate: 1779 },
  agha_mohammad_khan: { id: 'agha_mohammad_khan', name: { en: 'Agha Mohammad Khan', fa: 'آقامحمدخان قاجار' }, title: { en: 'Shah', fa: 'شاه' }, dynastyId: 'qajar', rulerType: 'Central Monarch', startDate: 1789, endDate: 1797 },
  naser_al_din_shah: { id: 'naser_al_din_shah', name: { en: 'Naser al-Din Shah', fa: 'ناصرالدین‌شاه' }, title: { en: 'Shah', fa: 'شاه' }, dynastyId: 'qajar', rulerType: 'Central Monarch', startDate: 1848, endDate: 1896 },
  reza_shah: { id: 'reza_shah', name: { en: 'Reza Shah', fa: 'رضاشاه' }, title: { en: 'Shah', fa: 'شاه' }, dynastyId: 'pahlavi', rulerType: 'Central Monarch', startDate: 1925, endDate: 1941 },
  mohammad_reza_shah: { id: 'mohammad_reza_shah', name: { en: 'Mohammad Reza Shah', fa: 'محمدرضاشاه' }, title: { en: 'Shah', fa: 'شاه' }, dynastyId: 'pahlavi', rulerType: 'Central Monarch', startDate: 1941, endDate: 1979 }
};
