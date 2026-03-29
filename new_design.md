**The Living Atlas of Greater Iran**

UX/UI Developer Handoff --- Interface Improvements Spec

*Version 1.0 · Design-system agnostic · No logic changes required*

+-----------------------------------------------------------------------+
| **Purpose of this document**                                          |
|                                                                       |
| This spec defines structural, behavioural, and copy changes to        |
| improve the user experience of the Living Atlas. It does not define   |
| visual design. All colour, typography, iconography, spacing, and      |
| component styling decisions must follow the existing app design       |
| system. This document describes WHAT to build and HOW it should       |
| behave --- not how it should look.                                    |
+-----------------------------------------------------------------------+

**Contents**

1\. Strategic context

2\. The two-tier user model (BYOK)

3\. Change 1 --- Hardcoded Historian Card

4\. Change 2 --- Vazir dot on the map

5\. Change 3 --- Persistent context strip

6\. Change 4 --- Timeline event dots

7\. Change 5 --- BYOK redesign

8\. Mobile --- bottom drawer pattern

9\. Legend simplification

10\. Implementation order

--- **SECTION 1**

**Strategic context**

The core insight driving all changes in this document is:

  -----------------------------------------------------------------------
  ***The most powerful feature in the app --- the AI oracle --- is
  invisible to the exact users who need it most.***

  -----------------------------------------------------------------------

A casual user lands on a dark map, sees no prompt, finds Era Context
eventually (if at all), and leaves before the AI magic happens. The
solution is not more features --- it is making existing features
discoverable.

**Product truth**

> *This is not a map with AI features. It is a live visual historian
> that uses a map to tell the story of how Iranian civilisation absorbed
> every conqueror and kept resurfacing --- through its language, its
> poets, its Vazirs.*

**Three historian modes --- all must be supported**

+---------------------------------------+-------------------------------+
| **Auto-narrator**                     | **Question mode**             |
|                                       |                               |
| Fires on load and after 8 seconds of  | Fires when user types or taps |
| inactivity. The app speaks first. The | a question. The historian     |
| user is never dropped into silence.   | answers AND navigates the map |
|                                       | to the relevant time and      |
| **Touch-response**                    | place.                        |
|                                       |                               |
| Fires when user clicks a region or    | *Design rule*                 |
| scrubs the timeline. The historian    |                               |
| responds to the specific action       | Context determines which mode |
| immediately.                          | activates. The user should    |
|                                       | never have to think about     |
|                                       | which mode they are in.       |
+---------------------------------------+-------------------------------+

--- **SECTION 2**

**The two-tier user model**

Approximately 50% of users do not have an API key. The design must treat
both tiers as first-class users.

**The critical rule**

  -----------------------------------------------------------------------
  The no-key experience must feel rich and complete --- not a broken or
  limited demo. The API key unlocks a superpower. It must not feel like
  it fixes something that is broken.

  -----------------------------------------------------------------------

**What each tier receives**

+-----------------------------------+-----------------------------------+
| **No key --- Curious Visitor**    | **With key --- Deep Explorer**    |
+-----------------------------------+-----------------------------------+
| • Full map and timeline           | **• Everything above, plus:**     |
|                                   |                                   |
| • Hardcoded era historian cards   | • AI fills any gap on demand      |
|                                   |                                   |
| • Vazir dots on the map           | • Free-style era and region       |
|                                   | exploration                       |
| • Hardcoded key figures and       |                                   |
| events                            | • Obscure figures and             |
|                                   | micro-events surfaced             |
| • AI buttons visible but          |                                   |
| story-gated                       | • AI answers any free-text        |
|                                   | question                          |
+-----------------------------------+-----------------------------------+

--- **SECTION 3**

**Change 1 --- Hardcoded Historian Card**

**Priority: Critical --- ship first** \| Requires key: **No** \| Data
changes: None --- uses existing article content

**Problem**

When a user lands on the app, the Era Context panel is empty until they
find and click the button. Most casual users leave before this happens.
The map is silent. The app's best feature is invisible.

**Solution**

For all major eras (Achaemenid, Seleucid, Parthian, Sasanian, Umayyad,
Abbasid, Samanid, Buyid, Ghaznavid, Seljuk, Ilkhanid, Timurid, Safavid,
Qajar, Pahlavi), pre-author a historian card that loads instantly, with
no API call required.

This card occupies the same panel that AI-generated content fills for
users with a key. The panel structure is identical --- only the data
source changes. The user never sees or cares about the difference.

**Historian card structure**

+-----------------------------------------------------------------------+
| **Field 1 --- Era name + year range**                                 |
|                                                                       |
| *Example: "Sasanian Empire · 224--651 AD"*                            |
|                                                                       |
| **Field 2 --- Summary (2--3 sentences max)**                          |
|                                                                       |
| *Plain language. No academic jargon. Written for a curious            |
| 16-year-old. Must include one specific concrete detail that makes the |
| era feel real.*                                                       |
|                                                                       |
| **Field 3 --- Connection chips (before / after)**                     |
|                                                                       |
| *Two interactive chips: '← Parthian Empire' and 'Early Islamic →'.    |
| Each chip navigates the timeline to that era when tapped.*            |
|                                                                       |
| **Field 4 --- Vazir highlight (if exists for this era)**              |
|                                                                       |
| *Vazir name, role, one-sentence contribution. Shown as a distinct     |
| sub-card within the panel. Always appears before the action buttons.* |
+-----------------------------------------------------------------------+

**Behaviour rules**

-   On app load: immediately render the hardcoded card for the default
    era. No loader. No blank state.

-   When timeline scrubs to a new major era: transition the card
    content. Use a fade or slide consistent with the existing design
    system transition style.

-   When user clicks a region: the card shifts to show that region's
    context for the current year. If no hardcoded content exists for
    that specific region-year combination, show the era-level card with
    a note indicating region-specific AI content is available.

-   With API key: the card auto-enriches with AI content after the
    hardcoded card renders. The hardcoded card is never replaced
    abruptly --- it transitions smoothly into the AI-expanded version.

-   Card height: do not fix height. Let content determine it. Use the
    existing scrollable panel pattern if content overflows.

**Copy tone guidelines**

> *These apply to the pre-authored historian card copy only. They do not
> affect AI-generated content.*

-   Write in second or third person narrator voice --- not encyclopaedia
    voice.

-   Every card must contain one specific human detail: a name, a year,
    an object, a place. Abstract summaries disengage casual readers.

-   Avoid phrases like "during this period", "notably", "significantly".
    These are filler.

-   Maximum reading time per card: 20 seconds.

--- **SECTION 4**

**Change 2 --- Vazir dot on the map**

**Priority: Critical** \| Requires key: **No** \| Data changes: New data
field: vazir\[\] per era/region

**Why Vazirs are the key feature**

The emotional core of this app is that Iranian civilisation survived
every conquest by operating from within. Vazirs are the living proof:
Iranian administrators, scholars, and poets who ran foreign empires from
the inside and kept Persian culture alive. When a user sees a dot
glowing on a region that shows as 'foreign-ruled', and discovers an
Iranian Vazir was working there, they understand the entire thesis of
the app in one moment.

> *This feature requires no AI. It uses hardcoded data. It works for
> 100% of users. It is the highest-value feature that can be shipped
> without an API key.*

**Dot behaviour**

-   Vazir dots are rendered as a distinct visual marker on the map,
    positioned at the region centroid where the Vazir operated.

-   Dot visibility: shown whenever the active timeline year falls within
    the Vazir's active period. Hidden outside that range.

-   Visual distinction: Vazir dots must be visually differentiated from
    Figure dots, Event dots, and Heritage dots. Use the existing
    dot/marker system from the app design system and assign Vazirs a
    unique category token. Do not invent new visual patterns outside the
    design system.

-   On hover (desktop): show a tooltip with: Vazir name, their ruler's
    name, one-sentence contribution.

-   On click (all platforms): open the Vazir profile card in the
    historian panel.

**Vazir profile card structure**

+-----------------------------------------------------------------------+
| **Name + title + active years**                                       |
|                                                                       |
| **Their ruler + dynasty + region**                                    |
|                                                                       |
| **What they preserved or built (1--2 sentences)**                     |
|                                                                       |
| **The paradox line (required): one sentence showing the contrast      |
| between the foreign ruler and the Iranian Vazir's influence**         |
|                                                                       |
| *Example: "Arab Caliphs sat on the throne. The Barmakid family ran    |
| the empire."*                                                         |
|                                                                       |
| **With AI key: 'Explore more about this Vazir →' action button**      |
+-----------------------------------------------------------------------+

**Minimum Vazir dataset --- priority entries**

  ---------------- --------------- ------------------ --------------------
  **Name**         **Era**         **Ruler served**   **Key contribution**

  Yahya Barmaki    Abbasid         Harun al-Rashid    Iranian family
                   Caliphate       (Arab)             governed the
                                                      Caliphate for
                                                      decades

  Nizam al-Mulk    Seljuk          Alp Arslan & Malik Founded Nizamiyya
                   Sultanate       Shah (Turkic)      universities; wrote
                                                      Siyasatnama

  Khwaja Nasir     Ilkhanate       Hulagu Khan        Saved the Maragha
  al-Din Tusi                      (Mongol)           library during the
                                                      sack of Baghdad

  Burzoe           Sasanian Empire Khosrow I          Translated
                                   (Persian)          Panchatantra from
                                                      Sanskrit into
                                                      Pahlavi

  Ali ibn Isa      Abbasid         Multiple Abbasid   Three-time Vazir;
  al-Jarrah        Caliphate       Caliphs (Arab)     reformed state
                                                      finances

  Rashid al-Din    Ilkhanate       Ghazan Khan        Converted Ghazan to
  Hamadani                         (Mongol)           Islam; authored
                                                      world history Jami\'
                                                      al-Tawarikh
  ---------------- --------------- ------------------ --------------------

--- **SECTION 5**

**Change 3 --- Persistent context strip**

**Priority: Critical** \| Requires key: **No** \| Platform: Desktop +
Mobile

**Problem**

The core drop-off issue is that users get lost mid-session. They scrub
the timeline, the map changes, but nothing tells them what just happened
or why it matters. There is no persistent orientation signal.

**Solution**

A slim, always-visible strip directly below the top navigation bar. It
never disappears. It updates live as the timeline moves. It requires no
interaction to provide value.

**Strip content --- 4 fields**

-   Era name --- uses the existing era label from the data model

-   Current year --- reflects the timeline position

-   Dominant ruler --- the ruling power controlling the most regions at
    that year

-   One-sentence situation summary --- pre-authored per major era,
    matching the historian card copy

**Update behaviour**

-   Updates instantly when timeline crosses a major era boundary

-   Does not update on every single year tick --- only on era changes
    and significant events

-   On mobile: strip is always visible above the drawer handle in both
    closed and open drawer states

> *Do not add animation to the strip text updates. Flashing text on
> every scrub tick creates visual noise. Use a simple cross-fade only on
> major era transitions.*

--- **SECTION 6**

**Change 4 --- Timeline event dots**

**Priority: High** \| Requires key: **No** \| Data changes: Uses
existing event markers

**Problem**

The timeline is currently a flat scrubber. Users have no reason to drag
it because they cannot see what they will find. The app already has
battle and event markers in the data --- they are just not visible on
the timeline track.

**Solution**

Render small dot markers directly on the timeline track at each event's
year position. The dots transform the timeline from a navigation tool
into a story with chapters.

**Dot categories and visual encoding**

Use the existing dot/marker visual system from the app design system.
Assign one token per category:

-   Vazir moment --- distinct category token (same token used on map
    dots)

-   Battle or conquest --- existing event category

-   Dynasty change --- existing era boundary

-   Cultural event --- new category if not already defined

> *Do not add more than 4 dot categories. More categories create a
> legend the user must memorise before the timeline is useful.*

**Hover / tap behaviour**

-   Desktop hover on dot: show a small tooltip with event name and year.
    No click required to see the name.

-   Mobile tap on dot: the historian panel updates to show that specific
    event context.

-   Dot density: if more than 3 dots fall within a 20-pixel range on the
    timeline, cluster them into a single dot with a count badge. Tap to
    expand.

**Persian presence indicator**

An optional secondary layer on the timeline track: a thin bar above or
below the scrubber track that changes visual weight based on how many
regions are under Iranian-origin rule at that year. Thicker = more
Iranian dominance. Thinner = more fragmentation or foreign rule. This
single visual tells the story of Iranian resilience without a single
word.

> *This is derived entirely from existing map data. No new content
> required. Discuss with design team how to encode this within the
> existing timeline component visual language.*

--- **SECTION 7**

**Change 5 --- BYOK redesign**

**Priority: High** \| Affects: \~50% of users

**Problem**

The current BYOK prompt is framed as a technical gate: "Add your API key
to unlock AI features." This is accurate but emotionally cold. A casual
user reads this as an error message, not an invitation.

**Solution --- the narrative gate**

Replace the technical prompt with a story-driven teaser that makes the
user want to unlock, not just unlock to fix something. The teaser must
be contextual --- it changes based on what is currently visible on
screen.

**Teaser format**

+-----------------------------------------------------------------------+
| **Structure: \[Blurred/skeleton content preview\] + \[One specific    |
| story teaser sentence\] + \[CTA\]**                                   |
|                                                                       |
| **Examples:**                                                         |
|                                                                       |
| *"In 1072 AD, while Seljuk Turks ruled Khorasan, an Iranian Vazir was |
| building the world's most advanced school system. Unlock his story."* |
|                                                                       |
| *"The Mongols sacked Baghdad and killed the last Abbasid Caliph. An   |
| Iranian scholar standing next to Hulagu Khan convinced him to spare   |
| the library. Find out how."*                                          |
|                                                                       |
| *"The Safavids came from a Sufi order in Azerbaijan. In three         |
| generations they rebuilt a Persian empire stronger than anything      |
| since the Sasanians. Explore the transformation."*                    |
+-----------------------------------------------------------------------+

**CTA copy rules**

-   Use "Unlock this story" not "Add API key"

-   Use "Explore deeper" not "Activate AI features"

-   The CTA must refer to a specific story or person visible in the
    teaser, not a generic AI capability

-   After key is added: the blurred content resolves immediately. No
    separate confirmation screen.

--- **SECTION 8**

**Mobile --- bottom drawer pattern**

**Priority: Critical for mobile** \| Platform: Mobile only

**Problem**

On mobile the current layout splits the screen between the map and the
era grid table. Neither half is usable at that size. The map needs the
full screen.

**Solution --- three drawer states**

  --------------- ---------------- ---------------------------------------
  **State**       **Map size**     **What is visible**

  Closed          Full screen      Map + context strip + drawer handle
                                   with era name + 3 quick-action buttons
                                   (Figures, Events, Vazir) peeking above
                                   drawer + timeline

  Half open       \~40% of screen  Map thumbnail + historian card + Vazir
                                   card + action buttons + timeline

  Full open       Hidden           Full historian panel + Vazir profile +
                                   all action buttons + timeline
  --------------- ---------------- ---------------------------------------

**Drawer rules**

-   The timeline is always visible regardless of drawer state. It is
    pinned above the drawer, below the map.

-   The context strip is always visible regardless of drawer state.

-   The drawer handle always shows the current era name and year.

-   Use the OS-native bottom sheet interaction pattern (velocity-based
    snap, spring physics). Do not implement a custom drag system.

-   The three quick-action buttons (Figures, Events, Vazir) are always
    visible in the closed state, peeking above the drawer. They act as
    the primary discovery prompt for new users.

--- **SECTION 9**

**Legend simplification**

**Priority: Medium** \| Data changes: None --- display grouping only

**Problem**

The current 7-category legend uses academic terminology:
"Nomadic/Steppe", "Babylonian/Semitic", "Hellenic/Greek". These are
precise but meaningless to a casual user without a history background.
The legend should answer "what am I looking at?" in 3 seconds.

**Solution --- simplified default + expert toggle**

Group the 7 existing categories into 3 simplified buckets for the
default view. Add a "Detailed view" toggle that restores the full
7-category legend for power users.

  ---------------------- ---------------------- -------------------------
  **Simplified label**   **Covers (existing     **User reads this as**
                         categories)**          

  Iranian-origin rule    Persian/Iranian,       Iranians are in charge
                         Vassal State           here

  Foreign rule           Arab/Caliphate,        A foreign power controls
                         Turkic/Mongol,         this region
                         Hellenic/Greek,        
                         Babylonian/Semitic,    
                         Foreign Imperial,      
                         Nomadic/Steppe         

  Contested              Contested/Influence    Control here is unclear
                                                or disputed
  ---------------------- ---------------------- -------------------------

*Important: this is a display-layer change only. The underlying data
model, colour assignments, and map rendering logic do not change. The
simplified labels are a UI relabelling, not a data recategorisation.*

--- **SECTION 10**

**Implementation order**

Ship in this sequence. Each change is independently deployable. Do not
wait to ship all changes together.

**Sprint 1 --- Orientation (no AI required)**

  -----------------------------------------------------------------------
  **Change**                     **Scope**        **Notes**
  ------------------------------ ---------------- -----------------------
  **Hardcoded Historian Card**   Frontend only    Pre-author copy for 15
                                                  major eras

  **Persistent context strip**   Frontend only    Uses existing era data

  **Legend simplification**      Frontend only    Display grouping, no
                                                  data change

  **Mobile drawer pattern**      Frontend only    Use OS bottom sheet
                                                  component
  -----------------------------------------------------------------------

**Sprint 2 --- Discovery (hardcoded data)**

  -----------------------------------------------------------------------
  **Change**                     **Scope**        **Notes**
  ------------------------------ ---------------- -----------------------
  **Vazir dots on map**          Frontend + new   Author Vazir dataset
                                 data             (6--10 entries to
                                                  start)

  **Timeline event dots**        Frontend only    Uses existing event
                                                  markers

  **Persian presence indicator** Frontend only    Derived from existing
                                                  map data
  -----------------------------------------------------------------------

**Sprint 3 --- Conversion**

  -----------------------------------------------------------------------
  **Change**                     **Scope**        **Notes**
  ------------------------------ ---------------- -----------------------
  **BYOK narrative redesign**    Frontend + copy  Write 15 contextual
                                                  teaser sentences

  **Connection chips             Frontend only    Uses existing era
  (before/after)**                                sequence data
  -----------------------------------------------------------------------

*End of specification*

*All changes are UI/UX only. No backend logic, no data model changes
(except Vazir dataset), no API changes.*