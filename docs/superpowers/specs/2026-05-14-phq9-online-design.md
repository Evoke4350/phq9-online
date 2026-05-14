# phq9.online — Design Spec

**Date:** 2026-05-14
**Status:** Approved by user
**Owner:** nathanib

---

## 1. Purpose

Build a free, ad-supported, open-source web application hosted at `https://phq9.online` that delivers validated mental health self-assessment instruments to the public. The PHQ-9 is the flagship instrument; the site additionally hosts ~25 other public-domain screeners across depression, anxiety, ADHD, PTSD, substance use, sleep, eating disorders, OCD, social anxiety, burnout, loneliness, wellbeing, personality, and somatic symptoms.

Revenue model: Google AdSense display ads. Secondary: GitHub Sponsors / Ko-fi.

Branding: **"Free validated mental health self-assessments"** (option B from brainstorm). PHQ-9 is the flagship and root route; companion screeners live at their own routes.

## 2. Goals

1. Approval-first AdSense application path (passes review on first submission)
2. Maximum SEO surface — multi-page static site, structured data, llms.txt, full sitemap
3. Lighthouse: Performance ≥ 95, Accessibility ≥ 95, SEO = 100, Best Practices ≥ 95
4. Clinically responsible: validated instruments only, crisis resources prominent, self-harm flag handled with care
5. Open source under MIT, public from day one, encourages translation contributions
6. Hosted on Fly.io free tier (or near-free) as static Caddy container
7. Bilingual at launch is not required; i18n architecture is in place for incremental locale rollout

## 3. Non-goals

- No user accounts, no backend database
- No analytics that collect PII or use third-party cookies (Cloudflare Web Analytics optional, cookieless)
- No machine-translated clinical content — only validated translations
- No copyrighted instruments (BDI-II, HADS, STAI, MBI, MMSE, MoCA, etc.)
- No medical advice — screening only, with explicit disclaimers
- No personalization, no email capture, no newsletter (Phase 1)

## 4. Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | **SvelteKit** | User chose; great DX, small bundles, first-class static export |
| Adapter | `@sveltejs/adapter-static` | Full prerender, zero server runtime |
| Language | TypeScript strict | Type safety on scoring + screener configs |
| Styling | Tailwind CSS + minimal custom CSS | Utility-first, dark/light theme |
| i18n | **Paraglide (inlang)** | Tree-shakes per route, type-safe message keys |
| Icons | Lucide-svelte | Small, MIT |
| Testing | Vitest (unit) + Playwright (e2e) | Standard SvelteKit stack |
| Lint | ESLint + Prettier + svelte-check | Standard |
| CI | GitHub Actions | Free for public repos |
| Deploy | Fly.io | User chose; static container via Caddy |
| Container | `caddy:2-alpine` | Brotli + HTTP/3 + auto-cert |
| License | MIT | Maximum contribution friendliness |

## 5. Site map (routes)

All routes are statically prerendered. All linked from primary nav or footer.

### Phase 1 (launch — required for AdSense application)

- `/` — Hero + PHQ-9 quiz + result (flagship)
- `/phq-2` — PHQ-2 (2-item quick screen)
- `/gad-7` — GAD-7 (anxiety, paired with PHQ-9)
- `/ces-d` — CES-D 20-item (NIH classic depression)
- `/promis-depression` — PROMIS Depression Short Form 8a (NIH modern)
- `/wsas` — Work and Social Adjustment Scale (UK NHS IAPT)
- `/who-5` — WHO-5 Wellbeing Index (UK/Iceland/Canada/EU)
- `/about-phq9` — long-form PHQ-9 reference page (≥1200 words)
- `/scoring` — universal scoring guide (≥800 words)
- `/interpretation` — what bands mean (≥1000 words)
- `/faq` — 15+ questions (FAQPage schema, ≥1500 words)
- `/crisis` — crisis resources, US/UK/Canada/Iceland/intl (≥600 words)
- `/disclaimer` — not medical advice (≥400 words)
- `/history` — local-storage attempt history (per-screener)
- `/about` — about the site / maintainer (≥500 words)
- `/contact` — `contact@phq9.online` + mailto form
- `/privacy` — privacy policy with AdSense mention (≥800 words)
- `/terms` — terms of service (≥600 words)
- `/compare` — comparison table of all screeners

**= 19 indexable routes at launch.** Target ≥15,000 words of original content total.

### Phase 2 (post-approval, +30 days)

Added screener routes (high alpha, clean licenses):

- `/asrs` — Adult ADHD Self-Report Scale v1.1 + 6-item screener
- `/mdq` — Mood Disorder Questionnaire (bipolar)
- `/pss-10` and `/pss-4` — Perceived Stress Scale
- `/stop-bang` — Sleep apnea screen
- `/swls` — Satisfaction With Life Scale
- `/ucla-loneliness` — UCLA Loneliness Scale v3
- `/cbi` — Copenhagen Burnout Inventory
- `/oci-r` — Obsessive-Compulsive Inventory-Revised
- `/scoff` — Eating disorder screen
- `/spin` and `/mini-spin` — Social Phobia Inventory

### Phase 3 (+60 days)

- `/gds-15` — Geriatric Depression Scale
- `/qids-sr16` — Quick Inventory of Depressive Symptomatology
- `/lsas-sr` — Liebowitz Social Anxiety self-report
- `/brs` — Brief Resilience Scale
- `/zung-sds` — Zung Self-Rating Depression Scale (1965)
- `/phq-15` — PHQ-15 somatic symptoms
- `/personality/mini-ipip` — Mini-IPIP Big Five (under /personality/* subsection)
- `/personality/ipip-neo-short` — IPIP-NEO short Big Five

### Phase 4 (sensitive-domain — ads suppressed on result)

- `/pcl-5` and `/pc-ptsd-5` — PTSD checklists (VA public domain)
- `/ace` — Adverse Childhood Experiences (CDC public domain)
- `/audit` and `/audit-c` — Alcohol use (WHO)
- `/cage` — Alcohol quick screen
- `/dast-10` — Drug Abuse Screening Test
- `/ftnd` — Fagerström nicotine dependence

### i18n (post-launch)

Locale-prefixed routes mirror all of the above, e.g., `/es/`, `/es/gad-7`, `/fr/`, `/is/`. Routing handled by Paraglide via `[lang]` parameter. Default locale `en` served at unprefixed root. `x-default` hreflang points to `/`.

## 6. Screener abstraction

A `Screener` is a config object describing one instrument. New screeners require config + one route + landing content; no new components.

```ts
// src/lib/screeners/types.ts
export type ResponseScale = {
  labels: Record<string, string>; // message key per option
  values: number[];               // numeric value per option
  reverseScored?: boolean[];      // per-item override
};

export type SeverityBand = {
  min: number;
  max: number;
  labelKey: string;
  severity: 'none' | 'minimal' | 'mild' | 'moderate' | 'mod-severe' | 'severe';
  actionKey: string;
};

export type ScreenerItem = {
  textKey: string;
  reverseScored?: boolean;
};

export type Screener = {
  id: string;                     // 'phq-9' | 'gad-7' | ...
  slug: string;                   // url slug, often === id
  nameKey: string;
  shortDescKey: string;
  domain: 'depression' | 'anxiety' | 'adhd' | 'ptsd' | 'substance' | 'sleep'
        | 'eating' | 'ocd' | 'social-anxiety' | 'burnout' | 'loneliness'
        | 'wellbeing' | 'personality' | 'somatic' | 'stress' | 'resilience'
        | 'life-satisfaction' | 'bipolar' | 'cognition';
  items: ScreenerItem[];
  scale: ResponseScale;
  score: (answers: number[]) => number;
  bands: SeverityBand[];
  flagItems?: number[];           // 0-indexed items that trigger crisis check
  flagThreshold?: number;         // value at/above which to show crisis banner
  suppressAdsOnResult?: boolean;  // Phase 4 screeners + when flag fires
  recommend?: string[];           // ids of follow-on screeners
  source: {
    citation: string;             // APA-style citation
    doi?: string;
    license: string;              // human-readable license note
    publicDomain: boolean;
    officialTranslationsUrl?: string;
  };
};
```

A single `Screener.svelte` component renders any config:

- Title + short description
- Item list (radio groups, keyboard-accessible)
- "Submit" button → computes score client-side
- `ScoreResult.svelte` renders band, narrative, crisis banner if `flagItems` triggered
- Saves attempt to localStorage history

Per-screener landing page (`+page.svelte`) imports the config and renders:

```svelte
<Screener config={phq9} />
<ScreenerLanding config={phq9}>
  <!-- long-form content (~1200 words) per screener -->
</ScreenerLanding>
```

## 7. Data model — localStorage history

```ts
// src/lib/storage.ts
export type Attempt = {
  id: string;                     // uuid v4
  screenerId: string;
  completedAt: string;            // ISO 8601
  locale: string;
  answers: number[];              // raw values
  score: number;
  band: string;                   // band labelKey
  flagged: boolean;               // crisis flag fired
};

const KEY = 'phq9-online:history:v1';
const SETTINGS_KEY = 'phq9-online:settings:v1';

export type Settings = {
  saveHistory: boolean;           // default false — opt-in
  locale: string;
  theme: 'auto' | 'light' | 'dark';
  consent: { ads: boolean; analytics: boolean; timestamp: string };
};
```

- All reads/writes wrapped in try/catch (localStorage may be disabled / quota-exceeded)
- Schema version (`v1`) in key — migration if shape changes
- Export buttons: download attempts as JSON or CSV (no server)
- Clear all + per-attempt delete
- `/history` route: filter by screenerId + date range, sortable table
- **Default: history OFF**. User must opt in via toggle on first attempt or in settings. Privacy-first.

## 8. Q9 / self-harm + sensitive-domain handling

- Item 9 of PHQ-9 reads (English): "Thoughts that you would be better off dead, or thoughts of hurting yourself in some way." Same handling logic applies to any screener with `flagItems` defined.
- If any flag item ≥ `flagThreshold` (default 1):
  - Red `CrisisBanner.svelte` prepended above the score result
  - Banner contents: 988 (US), Crisis Text Line ("HOME" to 741741), Samaritans 116 123 (UK/IE), 9-8-8 (Canada), 1717 Pieta (Iceland), and a link to `/crisis` for the international directory
  - `<AdSlot>` instances on the page suppress rendering (return empty `<div>`)
  - Banner is **not dismissible** during the result view; remains visible above the score until the user starts a new attempt or navigates away
  - On return to the same attempt within the same session, banner re-renders
- Phase 4 screeners (`pcl-5`, `pc-ptsd-5`, `ace`, `audit*`, `cage`, `dast-10`, `ftnd`) set `suppressAdsOnResult: true` — ads do not render on result section regardless of flag

## 9. AdSense integration

Publisher ID: `ca-pub-8001142558091314`

### Script tag

Inject in `+layout.svelte` `<svelte:head>`, gated by env var:

```svelte
{#if import.meta.env.PUBLIC_ENABLE_ADS === 'true'}
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8001142558091314"
    crossorigin="anonymous"
  ></script>
{/if}
```

Set `PUBLIC_ENABLE_ADS=true` only in production. Local dev sees zero ad code.

### ads.txt

Place at `/static/ads.txt`:

```
google.com, pub-8001142558091314, DIRECT, f08c47fec0942fa0
```

### Ad slots (post-approval, manual placements)

Three slots, max:

- **Slot A** — between long-form content sections on each screener landing (in-content)
- **Slot B** — between `/faq` Q&As and footer
- **Slot C** — sticky right rail on desktop ≥ 1024px on long-form pages only

**No ads:**
- On `/` result section when Q9 flagged
- On any Phase 4 screener result section
- Above the fold on any page (LCP protection)
- On `/crisis`, `/disclaimer`, `/contact`, `/privacy`, `/terms`, `/history`
- During development (`PUBLIC_ENABLE_ADS != 'true'`)

`AdSlot.svelte`:

```svelte
<script lang="ts">
  export let slot: string;
  export let format: 'auto' | 'fluid' = 'auto';
  import { adsEnabled, adsSuppressed } from '$lib/stores';
  import { onMount } from 'svelte';
  let mounted = false;
  onMount(() => {
    mounted = true;
    if ($adsEnabled && !$adsSuppressed) {
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); }
      catch { /* swallow; AdSense will retry */ }
    }
  });
</script>

{#if mounted && $adsEnabled && !$adsSuppressed}
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-8001142558091314"
       data-ad-slot={slot}
       data-ad-format={format}
       data-full-width-responsive="true"></ins>
{/if}
```

### Consent (Google Funding Choices)

Enable Google Funding Choices in AdSense dashboard post-approval. Renders GDPR/CCPA consent banner automatically. No additional code beyond their snippet.

## 10. SEO

### robots.txt (`/static/robots.txt`)

```
User-agent: *
Allow: /

Sitemap: https://phq9.online/sitemap.xml
```

### sitemap.xml

Generated at build time by a script (`scripts/build-sitemap.ts`). Lists every route × every locale, with `lastmod` from git commit, `changefreq=monthly`, `priority` weighted: root 1.0, screener landings 0.9, content pages 0.7, policy pages 0.3.

### llms.txt + llms-full.txt (`/static/`)

`llms.txt`: short, sectioned table of contents with absolute URLs to all pages and a one-line description each. Follows the emerging spec.

`llms-full.txt`: concatenated body content of every public page (markdown-rendered), so LLM crawlers have the full corpus in one file.

### Structured data

Every page includes:

- `<script type="application/ld+json">` with `WebSite` + `Organization` on every page
- `MedicalWebPage` on screener landings, with `medicalAudience`, `lastReviewed`, `reviewedBy`
- `Quiz` schema on screener landings
- `FAQPage` schema on `/faq`
- `BreadcrumbList` on every non-root page

### Per-page head

- `<title>` ≤ 60 chars, unique per page
- `<meta name="description">` ≤ 160 chars
- `<link rel="canonical">` absolute URL
- `<link rel="alternate" hreflang="...">` cluster (full mesh + x-default) for every locale variant of current page
- `<meta property="og:*">` + Twitter card meta
- OG image: 1200×630 PNG, screener-specific where useful
- Theme color, manifest, favicon SVG + PNG fallbacks

### Performance

- Critical CSS inlined per route by SvelteKit
- Fonts: system font stack (no external font requests) at launch; optionally one self-hosted variable font subset later
- Images: AVIF + WebP via `enhanced-img` Svelte plugin
- No external scripts on page load except AdSense (post-approval), and it loads after `requestIdleCallback`
- Preload LCP image; defer non-critical
- Brotli precompression at build, served as `.br` by Caddy

### Accessibility

- WCAG 2.2 AA target
- Semantic HTML (`<main>`, `<article>`, `<section>`, heading hierarchy)
- All interactive elements keyboard-navigable, visible focus rings
- Radio groups for screener items use `<fieldset>` + `<legend>` + `aria-describedby`
- Screen-reader testing with NVDA + VoiceOver Playwright traces
- Color contrast ≥ 4.5:1 for body, ≥ 3:1 for large text, in both light and dark themes
- Reduced-motion media query respected (no auto animations)
- RTL-ready CSS (logical properties) for future Arabic locale

## 11. i18n (Paraglide)

- Source locale: `en`
- Messages live in `/messages/{locale}.json`, flat key namespace per route + global
- Paraglide compiles to `/src/paraglide/` (gitignored)
- Locale picker in nav: persists to `localStorage` + 1-year cookie + `<html lang>` set
- URL strategy: `en` at root unprefixed (`/`), other locales prefixed (`/es/`, `/fr/`, `/is/`, etc.)
- All screener question text + scale labels + band names use message keys — never hard-coded strings
- Validated translations only:
  - PHQ-9 + GAD-7 + PHQ-2: Pfizer maintains 100+ official translations
  - WHO-5: WHO official translations (30+)
  - PROMIS: NIH HealthMeasures translations
  - Other screeners: validate per-instrument; if no validated translation exists for a locale, hide that screener from that locale's nav (don't auto-translate)
- Launch locales: **`en` only**. Add `es` in Phase 2. Community PRs welcome for others.

## 12. Theming

- CSS custom properties for color tokens
- Three modes: `auto` (default, follows `prefers-color-scheme`), `light`, `dark`
- Toggle in header, persists to localStorage
- Light = warm off-white, calm blues; dark = warm grays, muted blues
- Avoid pure black or pure white
- Theme switch is a `<button>` (no JS-required CSS-only is hard with three states)

## 13. Repository layout

```
phq9-online/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                # lint + typecheck + test on PRs
│   │   └── deploy.yml            # deploy to Fly on main push
│   ├── ISSUE_TEMPLATE/
│   └── pull_request_template.md
├── docs/
│   └── superpowers/specs/2026-05-14-phq9-online-design.md
├── messages/
│   └── en.json
├── public/                       # served as-is (alias for static/)
├── scripts/
│   ├── build-sitemap.ts
│   └── build-llms-txt.ts
├── src/
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +layout.ts            # prerender = true
│   │   ├── +page.svelte          # PHQ-9
│   │   ├── phq-2/+page.svelte
│   │   ├── gad-7/+page.svelte
│   │   ├── ces-d/+page.svelte
│   │   ├── promis-depression/+page.svelte
│   │   ├── wsas/+page.svelte
│   │   ├── who-5/+page.svelte
│   │   ├── about-phq9/+page.svelte
│   │   ├── scoring/+page.svelte
│   │   ├── interpretation/+page.svelte
│   │   ├── faq/+page.svelte
│   │   ├── crisis/+page.svelte
│   │   ├── disclaimer/+page.svelte
│   │   ├── history/+page.svelte
│   │   ├── about/+page.svelte
│   │   ├── contact/+page.svelte
│   │   ├── privacy/+page.svelte
│   │   ├── terms/+page.svelte
│   │   └── compare/+page.svelte
│   ├── lib/
│   │   ├── screeners/
│   │   │   ├── types.ts
│   │   │   ├── phq-9.ts
│   │   │   ├── phq-2.ts
│   │   │   ├── gad-7.ts
│   │   │   ├── ces-d.ts
│   │   │   ├── promis-depression.ts
│   │   │   ├── wsas.ts
│   │   │   ├── who-5.ts
│   │   │   └── index.ts          # registry
│   │   ├── components/
│   │   │   ├── Screener.svelte
│   │   │   ├── ScoreResult.svelte
│   │   │   ├── CrisisBanner.svelte
│   │   │   ├── AdSlot.svelte
│   │   │   ├── ConsentToggle.svelte
│   │   │   ├── LocalePicker.svelte
│   │   │   ├── ThemeToggle.svelte
│   │   │   ├── Nav.svelte
│   │   │   ├── Footer.svelte
│   │   │   └── ScreenerLanding.svelte
│   │   ├── stores.ts             # writable stores: settings, adsEnabled, adsSuppressed
│   │   ├── storage.ts            # localStorage CRUD
│   │   └── schema.ts             # JSON-LD generators
│   ├── content/                  # md files for long-form sections
│   │   ├── about-phq9.md
│   │   ├── scoring.md
│   │   └── ... (per route)
│   └── app.html
├── static/
│   ├── robots.txt
│   ├── sitemap.xml               # generated
│   ├── llms.txt                  # generated
│   ├── llms-full.txt             # generated
│   ├── ads.txt
│   ├── og-image.png
│   ├── favicon.svg
│   └── favicon-32.png
├── tests/
│   ├── unit/
│   │   ├── phq-9.test.ts
│   │   ├── gad-7.test.ts
│   │   └── ... (per screener)
│   └── e2e/
│       ├── phq-9-happy-path.spec.ts
│       ├── crisis-flag.spec.ts
│       ├── history.spec.ts
│       └── a11y.spec.ts
├── Dockerfile
├── Caddyfile
├── fly.toml
├── package.json
├── svelte.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── playwright.config.ts
├── LICENSE                       # MIT
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
└── .gitignore
```

## 14. Deploy (Fly.io)

### Dockerfile (multi-stage)

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM caddy:2-alpine
COPY --from=build /app/build /srv
COPY Caddyfile /etc/caddy/Caddyfile
EXPOSE 8080
```

### Caddyfile

```
:8080 {
  root * /srv
  encode zstd gzip
  file_server
  header {
    Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
    X-Content-Type-Options "nosniff"
    Referrer-Policy "strict-origin-when-cross-origin"
    Content-Security-Policy "default-src 'self'; script-src 'self' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.google.com https://*.doubleclick.net; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; frame-src https://*.googlesyndication.com https://*.doubleclick.net; connect-src 'self' https://*.google.com https://*.googlesyndication.com; font-src 'self' data:"
  }
  @notFound not file
  handle @notFound {
    rewrite * /404.html
    file_server
  }
}
```

### fly.toml

```toml
app = "phq9-online"
primary_region = "iad"

[build]
  dockerfile = "Dockerfile"

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0

[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 256
```

Custom domain: `phq9.online` + `www.phq9.online` via `fly certs add`. DNS A/AAAA records point to Fly anycast IPs.

### CI/CD (GitHub Actions)

`.github/workflows/ci.yml`:
- Runs on PRs + main pushes
- Steps: install, lint, typecheck, unit tests (Vitest), build, Playwright e2e (headless Chromium), Lighthouse CI gate

`.github/workflows/deploy.yml`:
- Triggers on push to `main` after `ci.yml` passes
- Uses `superfly/flyctl-actions/setup-flyctl@master`
- Runs `flyctl deploy --remote-only`
- Requires `FLY_API_TOKEN` repo secret

## 15. Testing

### Unit (Vitest)

- Every screener config has a test file: scoring boundaries, band assignment, flag detection
- Storage module: read/write/migrate/quota error paths
- JSON-LD generator outputs valid schemas (validate via `schema-dts` types)

### E2E (Playwright)

- Happy path each screener: open route, answer all items, see result, verify band shown
- Crisis flag path: PHQ-9 with Q9 answered ≥1, verify banner, verify ads suppressed
- History path: enable history toggle, complete two screeners, verify both in `/history`, export JSON, clear
- A11y (axe-core via `@axe-core/playwright`) on every prerendered page
- Lighthouse CI in CI: fail if perf < 95 or SEO < 100 or a11y < 95

### Content QA

- Every screener config cross-checked against its source publication (citation must include DOI or URL)
- License field on every screener verified before merge

## 16. Phasing

### Phase 0 — scaffold (Days 0-3)

- Repo init, SvelteKit static, Tailwind, Paraglide, Vitest, Playwright, CI
- Skeleton routes (empty content), layout/nav/footer, theme toggle, locale picker (en only)
- Dockerfile + fly.toml + Caddyfile + deploy to Fly under temporary fly.dev URL
- Lighthouse baseline ≥ 95 on empty pages

### Phase 1 — launch content (Days 3-14)

- 7 screener configs (PHQ-9, PHQ-2, GAD-7, CES-D, PROMIS-Depression, WSAS, WHO-5) + tests
- All 19 routes filled with content (≥15,000 words total)
- JSON-LD, OG images, sitemap, robots.txt, llms.txt, ads.txt, manifest, favicon
- E2E tests green, Lighthouse green
- DNS cut to phq9.online + custom cert on Fly
- Repo public on GitHub

### Phase 1.5 — pre-AdSense (Days 14-44)

- Submit sitemap to Google Search Console
- Wait for indexing (≥10 pages confirmed)
- Monitor Core Web Vitals
- Address Search Console issues
- Fix any content gaps

### Phase 1.6 — apply AdSense (Day ≥30)

- Verify all prerequisites met (see checklist in section 20)
- Apply via adsense.google.com
- On approval: create 3 ad units, drop slot IDs in env, enable Funding Choices CMP, deploy
- On rejection: address feedback, wait 14 days, reapply

### Phase 2 — expansion (Day ≥30, after approval)

- Add 10 Phase 2 screeners + tests + landing content
- Cross-recommendation logic
- Enable Cloudflare Web Analytics (cookieless)

### Phase 3 — depth (Day ≥60)

- Add Phase 3 screeners
- `/personality/*` subsection

### Phase 4 — sensitive (Day ≥90, with ad suppression)

- Add Phase 4 screeners
- Verify ad suppression behavior in production

### Phase 5 — i18n rollout

- Add `es` locale (Phase 1 screeners first)
- Add `fr` (Canadian bilingual support)
- Add `is` (Iceland)
- Add `de`, `pt`, `ja`, `ar` (with RTL CSS)
- Community PR pipeline

## 17. Open-source process

- License: MIT (root `LICENSE`)
- README: project description, screener list, screenshot, "deploy your own" Fly button, contribution call-to-action, sponsorship buttons (GitHub Sponsors + Ko-fi)
- CONTRIBUTING: how to add a screener (config + landing + test + content), how to add a translation, code style, commit conventions
- CODE_OF_CONDUCT: Contributor Covenant v2.1
- SECURITY: how to report vulns (email contact@phq9.online)
- Issue templates: bug, screener request, translation, content fix
- PR template: checklist (license verified, test added, content reviewed)
- Branch protection on `main`: required CI, required review, no direct push
- GitHub Sponsors enabled
- Topics tagged: `mental-health`, `psychometrics`, `phq-9`, `sveltekit`, `accessibility`, `i18n`

## 18. Risks & mitigations

| Risk | Mitigation |
|------|------------|
| AdSense rejection ("low value content") | 15,000+ words of original content, 30-day age, indexed, multiple revisions before reapply |
| AdSense demonetization on sensitive screener | Ads suppressed by design on Phase 4 screeners + Q9 flag |
| Liability for medical advice | Disclaimer prominent, "screening not diagnosis" repeated, crisis resources always 1 click away |
| Incorrect scoring | Each screener has unit tests covering boundaries + flag items; cross-checked against source paper |
| Translation accuracy | Only validated translations from official sources; never machine translate clinical instruments |
| Privacy concerns | No backend, no analytics by default, history opt-in, clear privacy policy |
| Performance regression | Lighthouse CI gate fails build below thresholds |
| Domain hijack / loss | Domain locked at registrar, MFA on account, registrar lock + auth code stored offline |
| Spam in issues / PRs | Branch protection, required reviews, templates filter low-effort |

## 19. Success metrics

- **Phase 1 launch:** site live on phq9.online, Lighthouse all green, CI passing
- **Phase 1.5:** 10+ pages indexed in Google Search Console within 30 days
- **Phase 1.6:** AdSense approved on first application
- **Phase 2:** 17+ screeners live, organic traffic ≥ 500 sessions/day by day 90
- **Phase 3:** monthly AdSense earnings cover Fly.io costs ($0-5/mo)
- **Phase 5:** ≥ 3 community translation PRs merged

## 20. AdSense approval checklist (must be all green before applying)

- [ ] HTTPS live at phq9.online with valid cert
- [ ] `/privacy` exists, mentions AdSense + cookies + 3rd-party data + opt-out
- [ ] `/terms` exists
- [ ] `/about` exists with real maintainer info
- [ ] `/contact` exists with working `contact@phq9.online`
- [ ] Footer links to all four legal pages from every page
- [ ] ≥ 15,000 words original content total
- [ ] ≥ 1200 words on `/about-phq9` (the flagship content depth signal)
- [ ] ≥ 19 indexable URLs in sitemap
- [ ] Sitemap submitted to Google Search Console
- [ ] ≥ 10 pages indexed in Google
- [ ] Site age ≥ 30 days
- [ ] No popups, no interstitials, no autoplay
- [ ] No copyrighted instruments hosted
- [ ] Citations on every screener page (DOI or URL)
- [ ] Disclaimer prominent ("not medical advice")
- [ ] Crisis resources reachable in 1 click from every page (footer link)
- [ ] Lighthouse SEO = 100 on all routes
- [ ] Mobile-friendly verified in Search Console
- [ ] No 404s in sitemap
- [ ] No broken internal links
- [ ] `ads.txt` placed at root with correct publisher ID
- [ ] Repo public on GitHub, MIT licensed
- [ ] Funding Choices CMP ready to enable

## 21. Execution plan

User has requested **subagent-driven development** for implementation. After this spec is approved and committed, invoke `superpowers:writing-plans` to break the work into discrete tasks, then `superpowers:subagent-driven-development` to dispatch parallel subagents per independent task (screener configs, content pages, infra files, tests can all parallelize).

---

**End of spec.**
