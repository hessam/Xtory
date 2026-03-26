Context
This brief covers all technical changes required before soft launch. Tasks are split into three priority tiers. Priority 1 items are hard blockers — the app must not launch without them. Priority 2 items should land in the first week post-launch. Priority 3 items go on the roadmap.
Primary user base: Iranians inside Iran (majority), Iranian diaspora, and international academics. All changes must account for Iran's internet environment — slow connections, blocked Western CDNs, and VPN-standard usage.


Priority 1 — Launch Blockers
All items below must be complete before any public sharing of the app.

A. BYOK — Bring Your Own Key
Remove all hardcoded or environment-variable Gemini API keys from the frontend. Replace with a user-supplied key stored in memory (default) or optionally in localStorage.
Behaviour
Core app (map, timeline, static data, search) works fully with NO key
AI features are visually disabled but not hidden when no key is present
A non-blocking banner prompts: "Add your free Gemini key to unlock AI features"
Settings modal accepts key input with two persistence options
Settings Modal — Persistence Options
Option 1 — Memory only (default): Key stored in React state only, cleared on tab close
Option 2 — Save on this device (opt-in): Key written to localStorage with a clear warning
Warning text for Option 2:
"Stored locally in your browser. Only use on your personal device. Do not use on shared or public computers."
Key Implementation Notes
// Read key — never from import.meta.env in production
const apiKey = keyPersistenceMode === 'memory'
  ? memoryKey   // React state
  : localStorage.getItem('user_gemini_key');

Link to key acquisition: aistudio.google.com/app/apikey
Key is validated with a lightweight test call before being accepted
Gemini SDK import lazy-loaded — only after key is confirmed

B. Remove All Blocked External Dependencies
The following external domains are inaccessible or unreliable in Iran without VPN. Self-hosting eliminates this dependency entirely.
Audit and Replace
Google Fonts (fonts.googleapis.com) — download .woff2 files, serve from /public/fonts/
Any CDN-hosted scripts (jsdelivr, unpkg, cdnjs) — move to npm packages bundled by Vite
Google Analytics or any external tracking — remove entirely
Firebase, Sentry, or other third-party SDKs — audit and remove or replace
Audit Command
grep -r "fonts.googleapis\|cdn.jsdelivr\|unpkg.com\|gtag\|analytics" ./src ./index.html

C. Bundle Size & Load Performance
Target: initial page load under 500KB gzipped on a 2Mbps connection. Iranian mobile internet regularly runs at 1–3Mbps.
Required Changes
Lazy-load Gemini SDK — import only after user confirms API key
Lazy-load heavy modals: DeepDiveModal, AIChat, AlternateHistory with React.lazy() + Suspense
Run map SVG through SVGO — expect 50–70% size reduction
Run: npx vite-bundle-visualizer to identify remaining large chunks
Enable Vite's built-in code splitting for route-level components
Lazy Load Pattern
const DeepDiveModal = React.lazy(() => import('./components/DeepDiveModal'));
const AIChat = React.lazy(() => import('./components/AIChat'));

<Suspense fallback={<Spinner />}>
  {showModal && <DeepDiveModal />}
</Suspense>


Priority 2 — First Week Post-Launch

D. Persian Language Auto-Detection
If the user's browser or OS is set to Persian/Farsi, default the app to Persian with RTL layout on first load.
const defaultLang = navigator.language.startsWith('fa') ? 'fa' : 'en';
Store preference in localStorage after first load — do not re-detect on return visits
Verify RTL layout switch triggers correctly for all components on auto-detection

E. Content Security Policy
Add a strict CSP header to limit damage from any XSS vulnerability. Even if an attacker injects script, CSP prevents it from calling home.
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  connect-src 'self' https://generativelanguage.googleapis.com;
  style-src 'self' 'unsafe-inline';
Configure in your hosting provider's headers (Vercel: vercel.json, Netlify: _headers file).

F. ReactMarkdown — Disable Raw HTML
AI-generated content rendered via react-markdown must not allow raw HTML execution.
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{ html: () => null }}
>
  {aiContent}
</ReactMarkdown>

G. Open Graph / Telegram Preview Tags
When the app link is shared on Telegram (the primary sharing channel for Iranian users), it must unfurl with a proper image and description.
<meta property="og:title" content="Poly-Sovereignty of Greater Iran" />
<meta property="og:description" content="4,000 years of Iranian history — interactive and free." />
<meta property="og:image" content="https://yourdomain.com/og-preview.png" />
<meta property="og:url" content="https://yourdomain.com" />
Create one high-quality static preview image (1200x630px) — screenshot of the map with a dynasty highlighted
Test with: t.me/telegrambot?start or use https://www.opengraph.xyz to preview

H. Support Page
A single /support route. No popups, no banners — linked quietly in the footer only.
USDT wallet address displayed with a one-click copy button
Patreon link with text: "Help keep this free for Iranians inside Iran"
One paragraph explaining the project mission
Optional: link to GitHub if the project is or will be open source


Priority 3 — Roadmap (Post-Launch)
Do not build these before launch. Revisit after real usage data is available.

Priority
Task
Effort
Roadmap
PWA / Offline mode
High
Roadmap
Data contribution system (user-submitted events)
High
Roadmap
Backend proxy + optional user accounts
High
Roadmap
Scholar Mode / supporter feature tier (via Gumroad)
Medium
Roadmap
Multi-key support (OpenAI, Anthropic)
Low
Roadmap
Tauri desktop app (OS keychain key storage)
Low



Pre-Launch Checklist
Sign off each item before any public link is shared.

Priority
Task
Effort
P1 — Blocker
BYOK settings modal built and connected to all Gemini calls
~1 day
P1 — Blocker
Core app runs fully with no API key present
~2 hrs
P1 — Blocker
Google Fonts self-hosted from /public/fonts/
~1 hr
P1 — Blocker
All external CDN references removed from src and index.html
~2 hrs
P1 — Blocker
Google Analytics or any tracking removed
~30 min
P1 — Blocker
Gemini SDK lazy-loaded (not in initial bundle)
~2 hrs
P1 — Blocker
Heavy modals lazy-loaded with React.lazy + Suspense
~2 hrs
P1 — Blocker
SVG map compressed with SVGO
~30 min
P1 — Blocker
Initial bundle verified under 500KB gzipped
~1 hr
P2 — Week 1
Persian language auto-detected from browser locale
~1 hr
P2 — Week 1
CSP headers configured in hosting provider
~1 hr
P2 — Week 1
react-markdown raw HTML rendering disabled
~30 min
P2 — Week 1
OG meta tags added, preview image created and tested
~2 hrs
P2 — Week 1
/support page built and linked in footer
~2 hrs
P2 — Week 1
Custom domain purchased and deployed
~1 hr



Estimated total effort: 3–4 focused developer-days for all P1 + P2 items.
P1 items are the minimum viable launch. If time is short, ship P1 only and follow with P2 in the first week. P3 items require real user feedback before scoping.

