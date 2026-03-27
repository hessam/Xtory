Q: Where should the quiz live in the app?
A: Embedded in the timeline — triggers when you land on a relevant era

Q: Should the quiz use static pre-written questions or AI-generated ones?
A: Hybrid — static seed questions + AI generates more on demand

Q: What should happen after a correct or incorrect answer? (Select all that apply)
A: Show the real historical story (3-4 sentences), Jump the timeline to the relevant era/ruler, Share button for X/Telegram



Let me think through the full system.Good — take your time answering those. While you think about it, let me sketch out what the full system would look like regardless of those answers, because the core architecture is the same either way.

---

## The Core Concept: "Myth vs. Reality"

The most shareable quiz format isn't "which year did X happen" — that's trivia. The format that spreads is **confident wrongness followed by surprising truth**. The user thinks they know, discovers they don't, feels the gap, and wants to tell someone.

The quiz has one job: make the user feel that gap.

---

## The Question Format

Every question follows the same structure:

```
[Myth stated as fact]
↓
[True / False / It's complicated]
↓
[The real story — 3 sentences max]
↓
[Portal into the app]
```

Examples that would work for this app specifically:

```
"Alexander the Great destroyed Persian civilization."

→ FALSE

Iran absorbed the Greek conquest and kept going. 
Within a generation, Iranians were running Alexander's 
administration in their own language. Within 60 years, 
a new Persian empire — the Parthians — had pushed the 
Greeks out entirely.

[→ See the Parthian rise on the map]
```

```
"Persia and Greece were natural enemies."

→ IT'S COMPLICATED

Persian kings employed Greek mercenaries, Greek 
philosophers visited Persian courts, and many Greek 
cities actively preferred Persian rule to Athenian 
control. The "eternal conflict" was mostly Athenian 
propaganda — and it worked.

[→ Explore 500 BC on the timeline]
```

```
"Islam erased Iranian culture."

→ FALSE

Iran is the only major country conquered by Arab armies 
that kept its own language. Persian became the literary 
language of the Islamic world — the language of Rumi, 
Ferdowsi, and the Mughal court in India. The Iranians 
didn't lose their culture. They exported it.

[→ Explore the Islamic Golden Age in Iran]
```

---

## The AI Prompt for Quiz Generation

This is where the hybrid approach earns its keep. Static seed questions ensure accuracy; the AI generates variations and new questions in the same format:

```typescript
const QUIZ_GENERATION_PROMPT = `
You are creating history quiz questions specifically 
designed to correct widespread myths about Iranian 
and Greater Iranian history.

Generate one question following this EXACT structure:

MYTH: [A commonly believed false or oversimplified 
statement about Iranian history. Write it as if 
someone confident is stating it as fact.]

ANSWER: [TRUE / FALSE / IT'S COMPLICATED]
Choose IT'S COMPLICATED only when the myth contains 
a kernel of truth that matters.

REALITY: [The real story in exactly 2-3 sentences. 
Conversational tone. One surprising detail that 
reframes everything. No academic language.]

REVEAL_HOOK: [One sentence that makes the user want 
to explore further. Should feel like the beginning 
of a bigger story, not a conclusion.]

ERA_LINK: [The year or year range most relevant to 
this question, for the app to use as a timeline link]

RULER_LINK: [The ruler name most relevant, or null]

DIFFICULTY: [EASY / MEDIUM / HARD]
Easy = the myth is widely believed, the truth is 
  dramatic and simple
Medium = requires some historical context to appreciate
Hard = the nuance is the point

SOURCES: [1-2 sources this draws from]
CERTAINTY: [HIGH / MEDIUM / LOW]

Rules:
- The myth must be something people actually believe
- The reality must genuinely surprise someone who 
  believed the myth
- Never invent facts — flag uncertainty naturally
- Focus on: Achaemenid, Parthian, Sassanid, early 
  Islamic, Mongol impact, Safavid periods
- Avoid questions that require knowing specific dates
- Avoid questions where the answer is just "it happened 
  earlier/later than you think" — that's trivia, 
  not myth-busting

Output only the structured format above, nothing else.
`;
```

---

## The Seed Question Bank

These are the 20 hand-curated questions that ship with the app — high certainty, high impact, bilingual:

```typescript
const SEED_QUESTIONS: QuizQuestion[] = [
  {
    myth: "Alexander the Great destroyed Persian civilization",
    myth_fa: "اسکندر مقدونی تمدن ایرانی را نابود کرد",
    answer: "FALSE",
    reality: "Iran absorbed the Greek conquest and kept going. Within a generation, Iranians were running the administration. Within 60 years the Parthians had rebuilt a Persian empire that outlasted anything Alexander created.",
    reality_fa: "ایران این فتح را جذب کرد و به راه خود ادامه داد...",
    reveal_hook: "The real story is who conquered whom in the long run.",
    era_link: -330,
    difficulty: "EASY",
    sources: ["Briant, From Cyrus to Alexander", "Encyclopaedia Iranica"],
    certainty: "HIGH"
  },
  {
    myth: "The Persian Wars were a clash of East vs. West",
    myth_fa: "جنگ‌های ایران و یونان، نبرد شرق در برابر غرب بود",
    answer: "IT'S COMPLICATED",
    reality: "Many Greek city-states supported Persia. Argos stayed neutral. Thessaly actively helped the Persians. The 'West vs. East' framing was Athenian propaganda that shaped how we still tell the story today.",
    reality_fa: "بسیاری از شهرهای یونانی از ایران حمایت کردند...",
    reveal_hook: "Athens wrote the history. That's worth remembering.",
    era_link: -480,
    difficulty: "MEDIUM",
    sources: ["Herodotus (with caveats)", "Briant"],
    certainty: "HIGH"
  },
  // ... 18 more
];
```

---

## The Data Model

```typescript
interface QuizQuestion {
  id: string;
  myth: string;
  myth_fa: string;
  answer: 'TRUE' | 'FALSE' | 'IT\'S COMPLICATED';
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
  times_shown: number;       // for rotation logic
  times_correct: number;     // to measure difficulty calibration
}

interface QuizSession {
  questions: QuizQuestion[];
  current_index: number;
  score: number;
  streak: number;            // consecutive correct answers
  discoveries: string[];     // era_links unlocked this session
}
```

---

## The Engagement Loop

The quiz works best when it creates a **discovery chain** — each answer naturally leads somewhere in the app:

```
Question shown
    ↓
User answers (right or wrong)
    ↓
Reality reveal (3 sentences)
    +
Reveal hook ("the real story starts here")
    ↓
Two buttons:
  [→ See this on the timeline]   ← jumps to era_link year
  [→ Next myth]                  ← continues quiz
    ↓
If they choose "See this on the timeline":
  Timeline animates to that year
  Relevant ruler bar highlights
  Events panel shows related events
  Quiz tray collapses but stays accessible
```

The key is that "See this on the timeline" is just as easy as "Next myth." You never force the exploration — you just make it one tap away.

---

## The Streak and Share Mechanic

After 3 correct answers in a row:

```
"You've corrected 3 myths in a row.
Most people get this one wrong:"

[next question — harder]
```

After completing a 5-question session:

```
"You knew 3 out of 5.

The one that surprises everyone:
[best myth from the session, one line]

[Share on X]  [Share on Telegram]  [Explore the map]
```

The share text is pre-written and designed for maximum engagement:

```typescript
function generateShareText(session: QuizSession, lang: 'en' | 'fa'): string {
  const best = session.questions
    .find(q => !q.userWasCorrect); // the one they got wrong
  
  if (lang === 'en') {
    return `I just learned that "${best?.myth}" is actually false.
    
The real story is wild.

Test yourself → [app link]`;
  }
  
  return `تازه فهمیدم که "${best?.myth_fa}" درست نیست.

داستان واقعی خیلی جالب‌تره.

تو هم امتحان کن ← [لینک]`;
}
```

This works because the share text leads with the person's own discovery — not "this app is great" but "I was wrong about this, and now I know the real story." That framing is far more likely to get clicks.

---

## One Implementation Note

The quiz questions about myths are unusually sensitive to hallucination — the AI needs to be confident and accurate, not creative. So the validation step matters: any AI-generated question where `certainty === 'LOW'` should be either held back or displayed with a visible "this is debated by historians" label. You already have the certainty system from the biography prompts — plug the quiz into the same infrastructure.

Once you answer the three questions above I can spec out exactly which placement and flow to build first.