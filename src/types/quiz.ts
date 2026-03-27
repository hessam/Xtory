export interface QuizQuestion {
  id: string;
  myth: string;
  myth_fa: string;
  answer: 'TRUE' | 'FALSE' | "IT'S COMPLICATED";
  reality: string;
  reality_fa: string;
  reveal_hook: string;
  reveal_hook_fa: string;
  era_link: number;          // year to jump to in timeline
  ruler_link?: string;       // ruler name to open
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  sources: string[];
  certainty: 'HIGH' | 'MEDIUM' | 'LOW';
  is_ai_generated: boolean;
}

export interface QuizSession {
  questions: QuizQuestion[];
  current_index: number;
  score: number;
  streak: number;
  discoveries: number[];     // era_links visited
}
