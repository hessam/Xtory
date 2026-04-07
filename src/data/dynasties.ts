export type Classification = 'Native Empire' | 'Nomadic Intruder' | 'Foreign Empire' | 'Isolated Enclave';

export interface Dynasty {
  id: string;
  name: { en: string; fa: string };
  classification: Classification;
  capitalCity: { en: string; fa: string };
  colorFamily: 'persian' | 'arab' | 'turkic' | 'greek' | 'nomadic' | 'foreign' | 'semitic';
}

export const dynasties: Record<string, Dynasty> = {
  achaemenid: { id: 'achaemenid', name: { en: 'Achaemenid Empire', fa: 'شاهنشاهی هخامنشی' }, classification: 'Native Empire', capitalCity: { en: 'Persepolis', fa: 'تخت جمشید' }, colorFamily: 'persian' },
  parthian: { id: 'parthian', name: { en: 'Parthian Empire', fa: 'شاهنشاهی اشکانی' }, classification: 'Native Empire', capitalCity: { en: 'Ctesiphon', fa: 'تیسفون' }, colorFamily: 'persian' },
  sasanian: { id: 'sasanian', name: { en: 'Sasanian Empire', fa: 'شاهنشاهی ساسانی' }, classification: 'Native Empire', capitalCity: { en: 'Ctesiphon', fa: 'تیسفون' }, colorFamily: 'persian' },
  umayyad: { id: 'umayyad', name: { en: 'Umayyad Caliphate', fa: 'خلافت اموی' }, classification: 'Foreign Empire', capitalCity: { en: 'Damascus', fa: 'دمشق' }, colorFamily: 'arab' },
  abbasid: { id: 'abbasid', name: { en: 'Abbasid Caliphate', fa: 'خلافت عباسی' }, classification: 'Foreign Empire', capitalCity: { en: 'Baghdad', fa: 'بغداد' }, colorFamily: 'arab' },
  samanid: { id: 'samanid', name: { en: 'Samanid Empire', fa: 'سامانیان' }, classification: 'Native Empire', capitalCity: { en: 'Bukhara', fa: 'بخارا' }, colorFamily: 'persian' },
  buyid: { id: 'buyid', name: { en: 'Buyid Dynasty', fa: 'آل بویه' }, classification: 'Native Empire', capitalCity: { en: 'Shiraz', fa: 'شیراز' }, colorFamily: 'persian' },
  seljuk: { id: 'seljuk', name: { en: 'Seljuk Empire', fa: 'امپراتوری سلجوقی' }, classification: 'Nomadic Intruder', capitalCity: { en: 'Isfahan', fa: 'اصفهان' }, colorFamily: 'turkic' },
  khwarazmian: { id: 'khwarazmian', name: { en: 'Khwarazmian Empire', fa: 'خوارزمشاهیان' }, classification: 'Native Empire', capitalCity: { en: 'Gurganj', fa: 'گرگانج' }, colorFamily: 'turkic' },
  ilkhanate: { id: 'ilkhanate', name: { en: 'Ilkhanate', fa: 'ایلخانان' }, classification: 'Nomadic Intruder', capitalCity: { en: 'Maragheh', fa: 'مراغه' }, colorFamily: 'nomadic' },
  jalayirid: { id: 'jalayirid', name: { en: 'Jalayirid Sultanate', fa: 'جلایریان' }, classification: 'Nomadic Intruder', capitalCity: { en: 'Baghdad', fa: 'بغداد' }, colorFamily: 'nomadic' },
  muzaffarid: { id: 'muzaffarid', name: { en: 'Muzaffarid Dynasty', fa: 'آل مظفر' }, classification: 'Native Empire', capitalCity: { en: 'Shiraz', fa: 'شیراز' }, colorFamily: 'persian' },
  timurid: { id: 'timurid', name: { en: 'Timurid Empire', fa: 'امپراتوری تیموری' }, classification: 'Nomadic Intruder', capitalCity: { en: 'Samarkand', fa: 'سمرقند' }, colorFamily: 'turkic' },
  safavid: { id: 'safavid', name: { en: 'Safavid Empire', fa: 'امپراتوری صفوی' }, classification: 'Native Empire', capitalCity: { en: 'Isfahan', fa: 'اصفهان' }, colorFamily: 'persian' },
  afsharid: { id: 'afsharid', name: { en: 'Afsharid Dynasty', fa: 'افشاریان' }, classification: 'Native Empire', capitalCity: { en: 'Mashhad', fa: 'مشهد' }, colorFamily: 'persian' },
  zand: { id: 'zand', name: { en: 'Zand Dynasty', fa: 'زندیه' }, classification: 'Native Empire', capitalCity: { en: 'Shiraz', fa: 'شیراز' }, colorFamily: 'persian' },
  qajar: { id: 'qajar', name: { en: 'Qajar Dynasty', fa: 'قاجاریان' }, classification: 'Native Empire', capitalCity: { en: 'Tehran', fa: 'تهران' }, colorFamily: 'persian' },
  pahlavi: { id: 'pahlavi', name: { en: 'Pahlavi Dynasty', fa: 'دودمان پهلوی' }, classification: 'Native Empire', capitalCity: { en: 'Tehran', fa: 'تهران' }, colorFamily: 'persian' }
};
