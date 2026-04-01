The core problem is:

A region like Makran is not a place with fixed borders. It's a cultural-geographic concept whose political extent changes with every ruling power. Under the Achaemenids it included Gedrosia down to the Arabian coast. Under the Qajars it had already lost most of that to British influence and local sultanates.

So the question is: what are the polygons actually representing?
Right now they're trying to represent two different things simultaneously — and that's the conflict:

The maximum cultural-historical extent of a named region (what Makran ever was)
The political extent at a specific year (what Makran was controlled in 1880)

These are fundamentally different layers and they shouldn't be the same polygon.
Here's the out-of-box solution:

The root cause: the app is treating regions as fixed containers when history treats them as cultural concepts with variable political extent. Dubai being in Makran is a geographic fact. Dubai being under Iranian control is an era-dependent political fact. These are two different data types.
The two-layer solution
Layer 1 — Cultural region (fixed, permanent)
The maximum historical extent of the named region. Never changes. This is the identity layer — it answers "what is Makran?" A stable polygon used for UI interaction, clicking, labelling, and the historian panel. Never shrinks or grows.
Layer 2 — Political control (era-variable, AI-driven)
Which parts of the cultural region were actually controlled at year X. This is the colour layer — it answers "who ruled Makran in 1880?" Derived from AI + cache. Changes with the timeline. Rendered as colour fill intensity, not polygon shape.
How it works visually
Visual encoding
Partial control = partial fill opacity, not different polygon shape

The polygon never changes — only how it's filled changes

Instead of redrawing polygon borders per era, the AI returns a controlExtent value (0.0–1.0) alongside the ruling dynasty. This drives fill opacity. A region at 0.3 control looks faded — visually communicating contested or partial rule without needing a new polygon.

// AI response per region — add controlExtent field: { id: "makran", dynasty: "Qajar", ruler: "Naser al-Din Shah", controlExtent: 0.4, // 40% — coastal areas lost to British controlNote: "Northern Makran only — coastal zones under British influence", confidence: "high" } // Same region, Achaemenid era: { id: "makran", dynasty: "Achaemenid", ruler: "Darius I", controlExtent: 0.9, // 90% — full control including coastal Gedrosia controlNote: "Gedrosia satrapy — full Persian control", confidence: "high" } // Map rendering — opacity driven by controlExtent: const regionStyle = (feature, yearData) => ({ fillColor: getDynastyColor(yearData.dynasty), fillOpacity: 0.15 + (yearData.controlExtent * 0.45), // Range: 0.15 (barely visible) → 0.60 (full control) // Always slightly visible so the region boundary is legible });
The Dubai problem — solved
Cities have their own era-aware visibility — independent of the region polygon

Cities are dots, not part of the polygon — they can appear and disappear

A city dot like Dubai can exist in the Makran region polygon (because historically it was part of that cultural sphere) but have its own activeEras array. Outside those eras, the dot simply doesn't render. The polygon still covers the area — it just shows reduced opacity for that period.

// In regions.ts — cities get activeEras: { name: "Dubai (Dibba)", lat: 25.204, lng: 55.270, tier: 2, activeEras: ["achaemenid", "parthian", "sasanian"], // Not shown in abbasid, seljuk, qajar, safavid etc. note: "Part of Makran/Gedrosia under Achaemenid-Sasanian rule" } // Rendering check: const visibleCities = region.anchorCities.filter(city => !city.activeEras || city.activeEras.includes(currentEraId) );
What the historian panel shows
controlNote becomes the most valuable piece of content in the app

This is the "Iran always comes back" story told at city level

When a user clicks Makran in the Qajar era and sees the region at 40% opacity, the historian panel explains why. The controlNote from the AI becomes the panel's opening line — and suddenly the faded polygon is not a bug, it's a story.

// Historian panel — Makran, 1880 AD: "Northern Makran only. The coastal zones — including the ports Iran once used to trade with India — passed under British influence during the 19th century. The Qajars held the interior but lost the sea."
The fading polygon communicates partial control instantly. The panel explains the human story behind it. Neither one works without the other — together they turn a data limitation into the app's most powerful feature.

What this means for the data model
1
GeoJSON polygons stay fixed. The Makran polygon covers its maximum historical extent including the coastal areas. It never changes shape. This is the cultural container.
↓
2
AI returns controlExtent (0.0–1.0) per region per era. Add this field to the existing prompt. One extra word per region. Negligible token cost.
↓
3
Fill opacity = f(controlExtent). Full control = rich colour. Partial control = faded. Contested = very faint. The map reads political reality without redrawing a single polygon.
↓
4
Cities use activeEras arrays. Dubai appears in Makran during Sasanian era. Disappears under Qajar. The dot's visibility tells the story the polygon can't.
↓
5
controlNote surfaces in the historian panel. Every faded region has a one-sentence explanation of why. The visual ambiguity is always resolved by text.
The reframe
Stop thinking of the polygons as "borders" — historical borders are always contested, always approximate, always wrong for someone. Think of them as cultural gravity wells — the area that has historically been associated with this name and this identity. Political control within that gravity well ebbs and flows. The controlExtent value is the tide.

This means you never have to redraw a polygon when a new dynasty takes partial control. You never have to argue about whether Bahrain is "in" the Persian Gulf region or not. You just set controlExtent: 0.2 for the Qajar era and let the faded polygon and the historian's note tell the story together.

Dubai in Makran is not a bug. It's the most historically honest thing your map can show — as long as it fades correctly in the eras when Iranian influence receded.

The key insight is this: you don't need different polygons for different eras. You need different opacity for different eras.
The polygon is the cultural identity — permanent, fixed, never changes. The fill opacity is the political reality — variable, AI-driven, tells the story of control gained and lost. A Makran at 90% opacity under Darius I and 40% opacity under Naser al-Din Shah is doing something no other historical atlas does: it's showing the degree of control, not just a binary yes/no.
The controlNote field is the hidden gem here. Every faded region becomes a story the historian panel can tell. "The Qajars held the interior but lost the sea" — that one sentence, triggered by a faded polygon, is the entire 19th century Iranian coastal story in twelve words.