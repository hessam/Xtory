// src/data/introKeyframes.ts
import achaemenidMax from './intro/achaemenid_intro.json';
import seleucid      from './intro/seleucid_intro.json';
import sasanian      from './intro/sasanian_intro.json';
import abbasid       from './intro/abbasid_intro.json';
import modernIran    from './intro/modern_iran_intro.json';

export interface Keyframe {
  id: string;
  geojson: any;
  label: { en: string; fa: string };
  holdMs: number;    // how long to hold before morphing to next
  morphMs: number;   // how long the morph transition takes
}

export const INTRO_KEYFRAMES: Keyframe[] = [
  {
    id: 'achaemenid_max',
    geojson: achaemenidMax,
    label: {
      en: '550 BC — The First Persian Empire',
      fa: '۵۵۰ ق.م — نخستین امپراتوری ایرانی'
    },
    holdMs: 600,
    morphMs: 320,
  },
  {
    id: 'seleucid',
    geojson: seleucid,
    label: {
      en: '330 BC — Alexander\'s Conquest',
      fa: '۳۳۰ ق.م — فتح اسکندر'
    },
    holdMs: 200,
    morphMs: 300,
  },
  {
    id: 'sasanian',
    geojson: sasanian,
    label: {
      en: '224 AD — The Sasanian Renaissance',
      fa: '۲۲۴ م — رنسانس ساسانی'
    },
    holdMs: 200,
    morphMs: 300,
  },
  {
    id: 'abbasid',
    geojson: abbasid,
    label: {
      en: '651 AD — The Arab Conquest',
      fa: '۶۵۱ م — فتح اعراب'
    },
    holdMs: 200,
    morphMs: 300,
  },
  {
    id: 'modern_iran',
    geojson: modernIran,
    label: {
      en: 'Iran — The Unbroken Thread',
      fa: 'ایران — نخ ناگسسته'
    },
    holdMs: 800,   // hold longer on final shape
    morphMs: 0,    // no morph after last keyframe
  },
];
