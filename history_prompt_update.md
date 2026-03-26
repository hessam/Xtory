This is excellent source material. Now let me design the complete prompt system that uses these sources properly.

---

## The Prompt Architecture: Three Tiers

Different content types need different prompts. One prompt for everything is the mistake most apps make.

---

### Tier 1 — Ruler Biography Prompt

```typescript
const BIOGRAPHY_PROMPT = (ruler: Ruler) => `
You are a historian writing for a curious general audience — 
not academics. Your tone is clear, warm, and storytelling. 
You make history feel like it happened to real people.

Write a biography of ${ruler.name} (${ruler.dynasty}, 
${ruler.startYear} to ${ruler.endYear}) in exactly 
three paragraphs:

PARAGRAPH 1 — Open with a specific scene or moment 
from their reign. Make it vivid and human. One thing 
they did, decided, or faced that reveals who they were.

PARAGRAPH 2 — Their reign's arc: what they built or 
destroyed, what shaped them, what defined their era. 
Include the central tension or conflict of their time.

PARAGRAPH 3 — Their echo: why they still matter, 
what they left behind, and one honest question that 
history still hasn't fully answered about them.

CRITICAL RULES:
- Never invent specific quotes
- When something is uncertain or debated, say so 
  naturally inside the sentence — not in brackets 
  or footnotes. Use phrases like:
  "historians are divided on...", 
  "the sources suggest, though not conclusively...",
  "we know from inscriptions that... though the 
  exact reasons remain unclear"
- No headers, no bullet points, no markdown
- No invented exact numbers unless from primary sources

Draw your knowledge from these sources for this period:
${getSourcesForPeriod(ruler.startYear)}

After the three paragraphs, on a new line, output 
exactly this format for the UI to parse:
SOURCES: [comma-separated list of 2-3 sources you 
drew from most heavily]
CERTAINTY: [HIGH / MEDIUM / LOW — how well-documented 
is this ruler overall]
`;
```

---

### Tier 2 — Historical Event Prompt

```typescript
const EVENT_PROMPT = (event: HistoricalEvent) => `
You are a historian explaining a moment in history 
to someone who knows nothing about it — but is 
genuinely curious.

Explain the ${event.name} (${event.year}) in 
two paragraphs:

PARAGRAPH 1 — What happened and why it mattered 
in its own time. Write it as if telling a story, 
not filing a report.

PARAGRAPH 2 — Its long shadow: how it changed what 
came after. One thing that would have been different 
if it hadn't happened.

Use natural uncertainty language when appropriate.
No bullet points, no headers.
No invented dialogue or quotes.

After the two paragraphs:
SOURCES: [2-3 sources]
CERTAINTY: [HIGH / MEDIUM / LOW]
ARCHAEOLOGICAL_EVIDENCE: [YES / NO / PARTIAL — 
is there physical evidence for this event]
`;
```

---

### Tier 3 — Era Context Prompt (the "What was happening" panel)

```typescript
const ERA_CONTEXT_PROMPT = (year: number, region: string) => `
You are a thoughtful guide helping someone understand 
what life was like in ${region} around ${year}.

Write three short paragraphs:

PARAGRAPH 1 — Political reality: who held power and 
what kind of power was it — stable, fragile, contested?

PARAGRAPH 2 — Daily life and culture: what would an 
ordinary person in this region have experienced? 
What language did they speak, what did they believe, 
what was being built or written?

PARAGRAPH 3 — The horizon: what tension or change 
was approaching that the people living then probably 
didn't fully see coming?

Keep it conversational. Use "around this time..." 
and "we believe..." when evidence is thin.
No bullet points. No academic tone.

SOURCES: [2-3 sources]
CERTAINTY: [HIGH / MEDIUM / LOW]
`;
```

---

## The Source Mapping Function

This is the piece that makes everything trustworthy — automatically selecting the right sources per period:

```typescript
function getSourcesForPeriod(year: number): string {
  if (year < -550) return `
    - Elamite cuneiform texts and Mesopotamian records
    - Archaeological evidence from Susa, Chogha Zanbil, 
      Tepe Sialk
    - Cambridge History of Iran Vol. 2 
      (Gershevitch, ed.)
    - Oxford Handbook of Iranian History 
      (Daryaee, ed.)
    Note: written sources are scarce for this period. 
    Flag clearly when drawing on archaeology vs. 
    textual tradition.`;

  if (year >= -550 && year < -247) return `
    - Behistun Inscription (Darius I, ~520 BCE) 
      — treat as primary but note its propagandistic 
      framing
    - Persepolis Fortification Tablets 
      — administrative records, highly reliable
    - Pierre Briant, From Cyrus to Alexander (2002) 
      — the definitive modern synthesis
    - Herodotus and Xenophon — use cautiously, 
      note Greek perspective
    - Encyclopaedia Iranica entries`;

  if (year >= -247 && year < 651) return `
    - Coin evidence and rock inscriptions 
      (Naqsh-e Rostam, Shapur inscription)
    - Cambridge History of Iran Vol. 3 
      (Yarshater, ed.)
    - Josef Wiesehöfer, Ancient Persia
    - Roman, Armenian, and Chinese sources 
      — note each perspective's bias
    - Encyclopaedia Iranica entries`;

  if (year >= 651 && year < 1501) return `
    - al-Tabari's Tarikh (primary, but cross-check — 
      written 200+ years after early events)
    - al-Biruni's writings (10th–11th century, 
      highly reliable for his own era)
    - Cambridge History of Iran Vol. 4 and 5
    - Ferdowsi's Shahnameh — literary tradition, 
      not reliable as strict history
    - Encyclopaedia Iranica entries
    Note: distinguish clearly between what chronicles 
    say and what archaeology confirms.`;

  if (year >= 1501 && year < 1925) return `
    - Persian court chronicles (note court bias)
    - European traveler accounts 
      (cross-reference multiple)
    - Cambridge History of Iran Vol. 6
    - Abbas Amanat, Iran: A Modern History (2017)
    - Encyclopaedia Iranica entries`;

  return `
    - Abbas Amanat, Iran: A Modern History (2017)
    - Ervand Abrahamian, A History of Modern Iran
    - Michael Axworthy, Iran: Empire of the Mind
    - Declassified archival documents where relevant
    - Encyclopaedia Iranica entries`;
}
```

---

## Parsing the AI Response

The prompts above ask the AI to append structured metadata. Parse it before rendering:

```typescript
interface AIContentResult {
  body: string;          // the actual prose
  sources: string[];     // ["Behistun Inscription", "Briant"]
  certainty: 'HIGH' | 'MEDIUM' | 'LOW';
  archaeologicalEvidence?: 'YES' | 'NO' | 'PARTIAL';
}

function parseAIResponse(raw: string): AIContentResult {
  const lines = raw.split('\n');
  const bodyLines: string[] = [];
  let sources: string[] = [];
  let certainty: 'HIGH' | 'MEDIUM' | 'LOW' = 'MEDIUM';
  let archaeologicalEvidence: 'YES' | 'NO' | 'PARTIAL' | undefined;

  lines.forEach(line => {
    if (line.startsWith('SOURCES:')) {
      sources = line.replace('SOURCES:', '')
        .trim().split(',').map(s => s.trim());
    } else if (line.startsWith('CERTAINTY:')) {
      certainty = line.replace('CERTAINTY:', '').trim() 
        as 'HIGH' | 'MEDIUM' | 'LOW';
    } else if (line.startsWith('ARCHAEOLOGICAL_EVIDENCE:')) {
      archaeologicalEvidence = line
        .replace('ARCHAEOLOGICAL_EVIDENCE:', '').trim() 
        as 'YES' | 'NO' | 'PARTIAL';
    } else {
      bodyLines.push(line);
    }
  });

  return {
    body: bodyLines.join('\n').trim(),
    sources,
    certainty,
    archaeologicalEvidence
  };
}
```

---

## Rendering: Certainty + Sources in the UI

```typescript
const CERTAINTY_CONFIG = {
  HIGH: {
    label: 'مستند',           // "Documented"
    labelEn: 'Well documented',
    color: '#34d399',
    bg: 'rgba(16,185,129,0.1)',
    icon: '✓'
  },
  MEDIUM: {
    label: 'نسبتاً مستند',    // "Partially documented"
    labelEn: 'Partially documented',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.1)',
    icon: '◎'
  },
  LOW: {
    label: 'افسانه‌آمیز',     // "Legendary / sparse"
    labelEn: 'Sparse sources',
    color: '#f87171',
    bg: 'rgba(248,113,113,0.1)',
    icon: '?'
  }
};
```

The footer of every AI-generated card then shows:

```
[✦ هوش مصنوعی]  [◎ نسبتاً مستند]  [📚 طبری · بریان · ایرانیکا]
```

---

## Typography System for the Prose

Three rules that handle everything:

```css
.ai-prose {
  font-size: 15px;
  line-height: 1.8;
  max-width: 62ch;
  color: var(--text-primary);
}

.ai-prose p {
  margin: 0;
}

.ai-prose p + p {
  margin-top: 1.5em;    /* the single most important rule */
}

/* Uncertainty phrases — detected and wrapped by parser */
.uncertain {
  color: var(--text-secondary);
  font-style: italic;
}

/* First paragraph gets slightly more weight */
.ai-prose p:first-child {
  font-size: 16px;
  line-height: 1.75;
}
```

The paragraph spacing (`1.5em`) is the highest-leverage change. Most apps use `1em` or less, which makes prose feel like one wall of text. At `1.5em`, each paragraph breathes, and the three-paragraph structure becomes visually obvious without any headers needed.

---

## The Result

Every AI card in your app will now have: a vivid opening scene, natural uncertainty language, period-appropriate sources cited in the prompt, a parsed certainty badge, source names displayed, and clean three-paragraph prose that's easy to read on screen. The trust comes not from claiming accuracy — it comes from being honest about what is and isn't known, which is exactly what good historians do.