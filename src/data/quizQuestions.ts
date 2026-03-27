import { QuizQuestion } from '../types/quiz';

export const SEED_QUESTIONS: QuizQuestion[] = [
  {
    id: 'yazdegerd-youth',
    myth: "Yazdegerd III was an old, experienced king when the Arab armies invaded the Sassanid Empire.",
    myth_fa: "یزدگرد سوم هنگام حمله اعراب به امپراتوری ساسانی، پادشاهی پیر و باتجربه بود.",
    answer: "FALSE",
    reality: "He was actually crowned at just 8 years old. When he died, effectively ending the 400-year Sassanid Empire, he was only about 27 years old, having spent his entire youth fleeing from the invasion.",
    reality_fa: "او در واقع تنها ۸ سال داشت که تاج‌گذاری کرد. زمانی که کشته شد و به امپراتوری ۴۰۰ ساله ساسانی پایان داد، تنها حدود ۲۷ سال داشت و تمام جوانی خود را در حال فرار از تهاجم گذرانده بود.",
    reveal_hook: "The last Sassanid emperor was practically a kid facing the end of a world.",
    reveal_hook_fa: "آخرین امپراتور ساسانی عملاً کودک/جوانی بود که با پایان یک دنیا روبرو شد.",
    era_link: 651,
    difficulty: "EASY",
    sources: ["Tabari", "Pourshariati"],
    certainty: "HIGH",
    is_ai_generated: false
  },
  {
    id: 'ismail-child-king',
    myth: "Shah Ismail I spent decades uniting Iran before declaring himself the founder of the Safavid Empire.",
    myth_fa: "شاه اسماعیل اول دهه‌ها را صرف متحد کردن ایران کرد تا خود را بنیانگذار امپراتوری صفوی اعلام کند.",
    answer: "FALSE",
    reality: "Incredibly, Shah Ismail was only 14 years old when he captured Tabriz, crowned himself Shah, and declared Shia Islam the state religion—an act that fundamentally changed Iran's history forever.",
    reality_fa: "به طرز باورنکردنی، شاه اسماعیل تنها ۱۴ سال داشت که تبریز را فتح کرد، خود را پادشاه نامید و مذهب شیعه را دین رسمی اعلام کرد - اقدامی که تاریخ ایران را برای همیشه تغییر داد.",
    reveal_hook: "A teenager built one of the greatest empires of the modern age.",
    reveal_hook_fa: "یک نوجوان، یکی از بزرگترین امپراتوری‌های دوران مدرن را ساخت.",
    era_link: 1501,
    difficulty: "MEDIUM",
    sources: ["Roger Savory, Iran under the Safavids"],
    certainty: "HIGH",
    is_ai_generated: false
  },
  {
    id: 'first-animation',
    myth: "The concept of animation is a modern invention created in the 19th century.",
    myth_fa: "مفهوم انیمیشن (پویانمایی) یک اختراع مدرن است که در قرن نوزدهم ایجاد شده است.",
    answer: "FALSE",
    reality: "A 5,200-year-old pottery goblet found in Iran's Shahr-e Sukhteh (Burnt City) features a sequence of five images showing a goat jumping to eat leaves. When spun, it creates the world's oldest known example of animation.",
    reality_fa: "یک جام سفالی ۵۲۰۰ ساله که در شهر سوخته ایران کشف شده، مجموعه‌ای از پنج تصویر را نشان می‌دهد که بزی را در حال پریدن برای خوردن برگ نشان می‌دهد. با چرخاندن آن، قدیمی‌ترین نمونه شناخته شده انیمیشن در جهان شکل می‌گیرد.",
    reveal_hook: "Bronze Age humans were already playing with moving pictures.",
    reveal_hook_fa: "انسان‌های عصر مفرغ از قبل با تصاویر متحرک بازی می‌کردند.",
    era_link: -3200,
    difficulty: "MEDIUM",
    sources: ["Archaeological findings at Shahr-e Sukhteh"],
    certainty: "HIGH",
    is_ai_generated: false
  },
  {
    id: 'achaemenid-population',
    myth: "The Roman Empire held the highest percentage of the global population of any ancient empire.",
    myth_fa: "امپراتوری روم بیشترین درصد جمعیت جهان را در میان تمام امپراتوری‌های باستانی در اختیار داشت.",
    answer: "FALSE",
    reality: "The Achaemenid Persian Empire under Darius the Great ruled over roughly 44% of the entire human population at the time (around 50 million people). This remains the highest percentage of the world's population ever ruled by a single empire in history.",
    reality_fa: "امپراتوری هخامنشی در زمان داریوش بزرگ بر تقریباً ۴۴٪ از کل جمعیت انسان‌های آن زمان (حدود ۵۰ میلیون نفر) حکومت می‌کرد. این بالاترین درصدی است که در تاریخ توسط یک امپراتوری واحد اداره شده است.",
    reveal_hook: "Almost half the people on Earth lived under one king.",
    reveal_hook_fa: "تقریباً نیمی از مردم روی زمین زیر فرمان یک پادشاه زندگی می‌کردند.",
    era_link: -480,
    difficulty: "HARD",
    sources: ["Guinness World Records", "Historical population estimates"],
    certainty: "HIGH",
    is_ai_generated: false
  },
  {
    id: 'ancient-ice',
    myth: "Ancient Persians living in the desert plains had to drink warm water during summer because ice was impossible to store.",
    myth_fa: "ایرانیان باستان که در دشت‌های بیابانی زندگی می‌کردند مجبور بودند در تابستان آب گرم بنوشند زیرا ذخیره یخ غیرممکن بود.",
    answer: "FALSE",
    reality: "Over 2,400 years ago, Iranians invented the Yakhchāl—massive domed evaporative coolers. They channelled winter ice from mountains into underground pits, keeping ice completely frozen through the scorching desert summer.",
    reality_fa: "بیش از ۲۴۰۰ سال پیش، ایرانیان یخچال را اختراع کردند - خنک‌کننده‌های تبخیری گنبدی‌شکل عظیمی بودند. آن‌ها یخ‌های زمستانی را به گودال‌های زیرزمینی هدایت می‌کردند و یخ را در تمام طول تابستان سوزان بیابان کاملاً منجمد نگه می‌داشتند.",
    reveal_hook: "Desert tech that rivals modern refrigeration.",
    reveal_hook_fa: "فناوری بیابانی که با یخچال‌های مدرن رقابت می‌کند.",
    era_link: -400,
    difficulty: "EASY",
    sources: ["History of Persian Architecture"],
    certainty: "HIGH",
    is_ai_generated: false
  }
];

export const getQuestionsForYear = (year: number): QuizQuestion[] => {
  return SEED_QUESTIONS.filter(q => Math.abs(q.era_link - year) <= 100);
};
