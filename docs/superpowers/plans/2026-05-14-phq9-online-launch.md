# phq9.online Launch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy phq9.online — a static SvelteKit site hosting PHQ-9 plus six companion public-domain mental-health screeners — to Fly.io with full SEO, MIT-licensed public GitHub repo, ready for AdSense application after 30-day indexing window.

**Architecture:** SvelteKit + `adapter-static` builds fully-prerendered HTML. A single `Screener.svelte` component renders any instrument from a typed config (`Screener` type). Client-side scoring, opt-in localStorage history, crisis banner with ad-suppression when PHQ-9 Q9 is flagged. Caddy serves the static build inside a Docker container deployed to Fly.io. Paraglide handles i18n (en-only at launch). GitHub Actions runs CI + auto-deploys main.

**Tech Stack:** SvelteKit 2, Svelte 5, TypeScript strict, Tailwind CSS 4, Paraglide (inlang) for i18n, Vitest, Playwright, axe-core, Caddy 2 (alpine), Docker, Fly.io, GitHub Actions, Lighthouse CI.

**Spec:** `docs/superpowers/specs/2026-05-14-phq9-online-design.md`

**AdSense pub ID:** `ca-pub-8001142558091314` (do not modify or abbreviate).

**Scope of this plan:** Phase 0 (scaffold) + Phase 1 (launch content for 7 screeners, 19 routes). Phases 2-5 are deferred to future plans.

---

## Conventions

- **Branch:** Work on `main`. Repo is greenfield, no protection yet.
- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `test:`, `refactor:`, `build:`, `ci:`). One logical change per commit.
- **Co-author tag:** `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>` on every commit.
- **TDD:** Write failing test, run it red, implement, run it green, commit. Each task uses this loop.
- **Node version:** 22 LTS. `package.json` engines field enforces.
- **Package manager:** `npm` (lockfile committed). No `pnpm` or `yarn`.
- **TypeScript:** strict, no implicit any, exact optional property types.
- **Imports:** absolute via `$lib/...` and `$app/...` (SvelteKit aliases). No deep relative paths.
- **No emojis in code or commits** (per project preference).
- **No comments** unless WHY is non-obvious.

---

## File Structure

```
phq9-online/
├── .github/workflows/{ci.yml, deploy.yml}
├── .github/{ISSUE_TEMPLATE/, pull_request_template.md}
├── docs/superpowers/{specs/, plans/}
├── messages/en.json
├── scripts/{build-sitemap.ts, build-llms-txt.ts}
├── src/
│   ├── app.html
│   ├── app.css
│   ├── routes/
│   │   ├── +layout.svelte, +layout.ts
│   │   ├── +page.svelte
│   │   ├── {phq-2,gad-7,ces-d,promis-depression,wsas,who-5}/+page.svelte
│   │   ├── {about-phq9,scoring,interpretation,faq,crisis,disclaimer}/+page.svelte
│   │   ├── {history,about,contact,privacy,terms,compare}/+page.svelte
│   │   └── sitemap.xml/+server.ts
│   ├── lib/
│   │   ├── screeners/{types.ts,registry.ts,phq-9.ts,phq-2.ts,gad-7.ts,ces-d.ts,promis-depression.ts,wsas.ts,who-5.ts}
│   │   ├── components/{Screener.svelte, ScoreResult.svelte, CrisisBanner.svelte, AdSlot.svelte, Nav.svelte, Footer.svelte, ThemeToggle.svelte, LocalePicker.svelte, ConsentToggle.svelte, ScreenerLanding.svelte}
│   │   ├── content/{about-phq9.ts, scoring.ts, interpretation.ts, faq.ts, crisis.ts, disclaimer.ts, about.ts, privacy.ts, terms.ts, compare.ts}
│   │   ├── stores.ts
│   │   ├── storage.ts
│   │   ├── schema.ts
│   │   └── crisis.ts
│   └── paraglide/ (generated, gitignored)
├── static/{robots.txt, ads.txt, og-image.png, favicon.svg, favicon-32.png, manifest.webmanifest}
├── tests/{unit/*.test.ts, e2e/*.spec.ts}
├── {Dockerfile, Caddyfile, fly.toml}
├── {package.json, package-lock.json, svelte.config.js, vite.config.ts, tsconfig.json, tailwind.config.ts, playwright.config.ts, .eslintrc.cjs, .prettierrc, .gitignore, .env.example}
├── {LICENSE, README.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md}
```

---

## Task Group A — Scaffold

### Task A1: Initialize SvelteKit project

**Files:**
- Create: `package.json`, `svelte.config.js`, `vite.config.ts`, `tsconfig.json`, `src/app.html`, `src/app.d.ts`, `src/routes/+layout.svelte`, `src/routes/+page.svelte`, `.gitignore`, `.npmrc`

- [ ] **Step 1: Scaffold SvelteKit project non-interactively**

Run:
```bash
cd /home/nathanib/Projects/phq9-online
npm create svelte@latest . -- --template skeleton --types typescript --no-prettier --no-eslint --no-playwright --no-vitest
```

If `npm create svelte` is interactive-only, instead create files manually using the snippets below.

- [ ] **Step 2: Write `package.json`**

```json
{
  "name": "phq9-online",
  "version": "0.0.1",
  "private": false,
  "license": "MIT",
  "type": "module",
  "engines": { "node": ">=22" },
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
    "lint": "eslint . && prettier --check .",
    "format": "prettier --write .",
    "test:unit": "vitest run",
    "test:unit:watch": "vitest",
    "test:e2e": "playwright test",
    "test": "npm run test:unit && npm run test:e2e",
    "sitemap": "tsx scripts/build-sitemap.ts",
    "llms": "tsx scripts/build-llms-txt.ts",
    "prebuild": "npm run sitemap && npm run llms"
  },
  "devDependencies": {
    "@playwright/test": "^1.50.0",
    "@sveltejs/adapter-static": "^3.0.8",
    "@sveltejs/kit": "^2.15.0",
    "@sveltejs/vite-plugin-svelte": "^5.0.0",
    "@types/node": "^22.10.0",
    "@typescript-eslint/eslint-plugin": "^8.18.0",
    "@typescript-eslint/parser": "^8.18.0",
    "eslint": "^9.17.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-svelte": "^2.46.0",
    "prettier": "^3.4.0",
    "prettier-plugin-svelte": "^3.3.0",
    "prettier-plugin-tailwindcss": "^0.6.0",
    "svelte": "^5.15.0",
    "svelte-check": "^4.1.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "tsx": "^4.19.0",
    "typescript": "^5.7.0",
    "vite": "^6.0.0",
    "vitest": "^2.1.0",
    "@axe-core/playwright": "^4.10.0"
  },
  "dependencies": {
    "@inlang/paraglide-sveltekit": "^0.16.0",
    "lucide-svelte": "^0.469.0"
  }
}
```

- [ ] **Step 3: Write `svelte.config.js`**

```js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: true,
      strict: true
    }),
    prerender: { handleHttpError: 'fail', handleMissingId: 'fail' },
    alias: { $lib: 'src/lib' }
  }
};
```

- [ ] **Step 4: Write `vite.config.ts`**

```ts
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    paraglide({
      project: './project.inlang',
      outdir: './src/paraglide'
    }),
    sveltekit()
  ],
  test: { include: ['tests/unit/**/*.{test,spec}.{js,ts}'] }
});
```

- [ ] **Step 5: Write `tsconfig.json`**

```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "noImplicitAny": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "moduleResolution": "bundler",
    "module": "esnext",
    "target": "esnext"
  },
  "include": ["src/**/*", "tests/**/*", "scripts/**/*"]
}
```

- [ ] **Step 6: Write `src/app.html`**

```html
<!doctype html>
<html lang="%paraglide.lang%" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
    <meta name="theme-color" content="#f8fafc" media="(prefers-color-scheme: light)" />
    <link rel="icon" href="%sveltekit.assets%/favicon.svg" type="image/svg+xml" />
    <link rel="alternate icon" href="%sveltekit.assets%/favicon-32.png" type="image/png" />
    <link rel="manifest" href="%sveltekit.assets%/manifest.webmanifest" />
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover" class="bg-base text-ink">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

- [ ] **Step 7: Write minimal `src/routes/+layout.svelte`**

```svelte
<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

{@render children?.()}
```

- [ ] **Step 8: Write minimal `src/routes/+page.svelte`**

```svelte
<h1>phq9.online</h1>
<p>Scaffolding in progress.</p>
```

- [ ] **Step 9: Write `.gitignore`**

```
node_modules
/build
/.svelte-kit
/dist
/playwright-report
/test-results
.env
.env.*
!.env.example
src/paraglide
.DS_Store
*.log
```

- [ ] **Step 10: Write `.npmrc`**

```
engine-strict=true
```

- [ ] **Step 11: Install dependencies**

Run: `npm install`
Expected: completes without errors. `package-lock.json` created.

- [ ] **Step 12: Verify dev server boots**

Run: `npm run dev -- --port 5173 --host 0.0.0.0` then in another shell `curl -s http://localhost:5173/ | grep -q "phq9.online"` then kill the dev server.
Expected: grep matches, exit 0.

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
chore: scaffold SvelteKit static project

Initial skeleton with adapter-static, TypeScript strict, Tailwind 4 plugin,
Paraglide i18n plugin, and minimal root route.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task A2: Add Tailwind 4 + base CSS tokens

**Files:**
- Create: `src/app.css`

- [ ] **Step 1: Write `src/app.css`**

```css
@import "tailwindcss";

@theme {
  --color-base: oklch(98% 0.005 95);
  --color-base-2: oklch(96% 0.01 95);
  --color-ink: oklch(20% 0.02 250);
  --color-ink-2: oklch(40% 0.02 250);
  --color-accent: oklch(55% 0.15 245);
  --color-accent-2: oklch(45% 0.18 245);
  --color-crisis: oklch(55% 0.2 30);
  --color-crisis-2: oklch(45% 0.22 30);
  --color-border: oklch(85% 0.01 250);
  --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-base: oklch(18% 0.015 250);
    --color-base-2: oklch(24% 0.02 250);
    --color-ink: oklch(94% 0.01 95);
    --color-ink-2: oklch(75% 0.01 95);
    --color-accent: oklch(70% 0.15 245);
    --color-accent-2: oklch(80% 0.18 245);
    --color-border: oklch(35% 0.015 250);
  }
}

:root[data-theme="light"] {
  --color-base: oklch(98% 0.005 95);
  --color-ink: oklch(20% 0.02 250);
}
:root[data-theme="dark"] {
  --color-base: oklch(18% 0.015 250);
  --color-ink: oklch(94% 0.01 95);
}

html { scroll-behavior: smooth; }
body { font-family: var(--font-sans); -webkit-font-smoothing: antialiased; }
:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; border-radius: 4px; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Verify build still works**

Run: `npm run build`
Expected: exit 0, `build/` directory created.

- [ ] **Step 3: Commit**

```bash
git add src/app.css
git commit -m "$(cat <<'EOF'
feat: add Tailwind 4 theme tokens

OKLCH color system with light/dark variants; reduced-motion support;
focus-visible styling.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task A3: Configure Paraglide i18n

**Files:**
- Create: `project.inlang/settings.json`, `messages/en.json`, `src/hooks.server.ts`, `src/hooks.ts`

- [ ] **Step 1: Write `project.inlang/settings.json`**

```json
{
  "$schema": "https://inlang.com/schema/project-settings",
  "sourceLanguageTag": "en",
  "languageTags": ["en"],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@latest/dist/index.js"
  ],
  "plugin.inlang.messageFormat": {
    "pathPattern": "./messages/{languageTag}.json"
  }
}
```

- [ ] **Step 2: Write `messages/en.json`**

```json
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "site_name": "phq9.online",
  "site_tagline": "Free validated mental health self-assessments",
  "nav_home": "PHQ-9",
  "nav_screeners": "All screeners",
  "nav_about": "About",
  "nav_faq": "FAQ",
  "nav_crisis": "Crisis resources",
  "nav_history": "History",
  "footer_disclaimer": "This site provides screening tools, not medical advice or diagnosis.",
  "start_test": "Start test",
  "submit_answers": "See result",
  "your_score": "Your score",
  "severity_minimal": "Minimal",
  "severity_mild": "Mild",
  "severity_moderate": "Moderate",
  "severity_mod_severe": "Moderately severe",
  "severity_severe": "Severe",
  "severity_none": "None",
  "crisis_banner_title": "If you are in crisis, help is available now",
  "crisis_banner_us_988": "United States: call or text 988",
  "crisis_banner_uk_samaritans": "United Kingdom and Ireland: Samaritans 116 123",
  "crisis_banner_canada_988": "Canada: call or text 988",
  "crisis_banner_iceland_pieta": "Iceland: Pieta House 1717",
  "crisis_banner_intl_link": "International directory",
  "history_saved": "Saved to your device only",
  "history_optin_label": "Save my attempts to this browser",
  "history_export_json": "Export JSON",
  "history_export_csv": "Export CSV",
  "history_clear_all": "Clear all"
}
```

- [ ] **Step 3: Write `src/hooks.ts`**

```ts
import { i18n } from '$lib/i18n';

export const reroute = i18n.reroute();
```

- [ ] **Step 4: Write `src/lib/i18n.ts`**

```ts
import { createI18n } from '@inlang/paraglide-sveltekit';
import * as runtime from '$lib/paraglide/runtime';

export const i18n = createI18n(runtime);
```

(Paraglide generates `$lib/paraglide/runtime` at build; ignore TS error until first `npm run build` runs.)

- [ ] **Step 5: Update `+layout.svelte` to wrap children with ParaglideJS**

```svelte
<script lang="ts">
  import '../app.css';
  import { ParaglideJS } from '@inlang/paraglide-sveltekit';
  import { i18n } from '$lib/i18n';
  let { children } = $props();
</script>

<ParaglideJS {i18n}>
  {@render children?.()}
</ParaglideJS>
```

- [ ] **Step 6: Run build to generate Paraglide runtime**

Run: `npm run build`
Expected: exit 0. `src/paraglide/runtime.js` and `src/paraglide/messages.js` exist.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat: integrate Paraglide i18n with en source locale

Adds inlang project config and base message catalog. Routing reroute
hook wires SvelteKit to Paraglide's locale prefixes.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task A4: ESLint, Prettier, EditorConfig

**Files:**
- Create: `.eslintrc.cjs`, `.prettierrc`, `.prettierignore`, `.editorconfig`

- [ ] **Step 1: Write `.eslintrc.cjs`**

```js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: { sourceType: 'module', ecmaVersion: 2022, extraFileExtensions: ['.svelte'] },
  env: { browser: true, es2022: true, node: true },
  overrides: [{ files: ['*.svelte'], parser: 'svelte-eslint-parser', parserOptions: { parser: '@typescript-eslint/parser' } }],
  ignorePatterns: ['build/', '.svelte-kit/', 'src/paraglide/', 'node_modules/']
};
```

- [ ] **Step 2: Write `.prettierrc`**

```json
{
  "useTabs": false,
  "tabWidth": 2,
  "singleQuote": true,
  "trailingComma": "none",
  "printWidth": 100,
  "plugins": ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
  "overrides": [{ "files": "*.svelte", "options": { "parser": "svelte" } }]
}
```

- [ ] **Step 3: Write `.prettierignore`**

```
build
.svelte-kit
src/paraglide
node_modules
package-lock.json
*.md
```

- [ ] **Step 4: Write `.editorconfig`**

```
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

- [ ] **Step 5: Run lint**

Run: `npm run lint`
Expected: passes or only auto-fixable warnings. If errors, fix and rerun.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
chore: add ESLint, Prettier, EditorConfig

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task A5: Vitest + Playwright config

**Files:**
- Create: `playwright.config.ts`, `tests/unit/.gitkeep`, `tests/e2e/.gitkeep`

- [ ] **Step 1: Write `playwright.config.ts`**

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: 'http://localhost:4173', trace: 'on-first-retry' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } }
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173',
    port: 4173,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI
  }
});
```

- [ ] **Step 2: Write smoke test `tests/unit/smoke.test.ts`**

```ts
import { describe, it, expect } from 'vitest';

describe('smoke', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 3: Run unit tests**

Run: `npm run test:unit`
Expected: 1 passed.

- [ ] **Step 4: Install Playwright browsers (skip in CI; local only)**

Run: `npx playwright install chromium`
Expected: exit 0.

- [ ] **Step 5: Write smoke e2e `tests/e2e/smoke.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test('home page renders', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('phq9.online');
});
```

- [ ] **Step 6: Run e2e**

Run: `npm run test:e2e`
Expected: 2 passed (chromium + mobile).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
test: configure Vitest and Playwright with smoke tests

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task Group B — Core library

### Task B1: Screener types

**Files:**
- Create: `src/lib/screeners/types.ts`

- [ ] **Step 1: Write `src/lib/screeners/types.ts`**

```ts
export type Severity =
  | 'none'
  | 'minimal'
  | 'mild'
  | 'moderate'
  | 'mod-severe'
  | 'severe';

export type ScreenerDomain =
  | 'depression'
  | 'anxiety'
  | 'adhd'
  | 'ptsd'
  | 'substance'
  | 'sleep'
  | 'eating'
  | 'ocd'
  | 'social-anxiety'
  | 'burnout'
  | 'loneliness'
  | 'wellbeing'
  | 'personality'
  | 'somatic'
  | 'stress'
  | 'resilience'
  | 'life-satisfaction'
  | 'bipolar'
  | 'cognition'
  | 'functional-impairment';

export type ResponseScale = {
  labelKeys: string[];
  values: number[];
};

export type SeverityBand = {
  min: number;
  max: number;
  labelKey: string;
  severity: Severity;
  actionKey: string;
};

export type ScreenerItem = {
  textKey: string;
  reverseScored?: boolean;
};

export type ScreenerSource = {
  citation: string;
  doi?: string;
  url?: string;
  license: string;
  publicDomain: boolean;
  officialTranslationsUrl?: string;
  yearPublished: number;
};

export type Screener = {
  id: string;
  slug: string;
  nameKey: string;
  shortDescKey: string;
  domain: ScreenerDomain;
  itemCount: number;
  items: ScreenerItem[];
  scale: ResponseScale;
  bands: SeverityBand[];
  flagItems?: number[];
  flagThreshold?: number;
  suppressAdsOnResult?: boolean;
  recommend?: string[];
  source: ScreenerSource;
  score(answers: number[]): number;
  bandFor(score: number): SeverityBand;
  flagFired(answers: number[]): boolean;
};
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/screeners/types.ts
git commit -m "$(cat <<'EOF'
feat: add Screener type definitions

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task B2: PHQ-9 config + unit tests

**Files:**
- Create: `src/lib/screeners/phq-9.ts`, `tests/unit/phq-9.test.ts`

- [ ] **Step 1: Write failing test `tests/unit/phq-9.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { phq9 } from '$lib/screeners/phq-9';

describe('PHQ-9', () => {
  it('has 9 items', () => {
    expect(phq9.itemCount).toBe(9);
    expect(phq9.items).toHaveLength(9);
  });

  it('sums answers', () => {
    expect(phq9.score([0, 0, 0, 0, 0, 0, 0, 0, 0])).toBe(0);
    expect(phq9.score([3, 3, 3, 3, 3, 3, 3, 3, 3])).toBe(27);
    expect(phq9.score([1, 2, 0, 3, 1, 0, 2, 1, 0])).toBe(10);
  });

  it.each([
    [0, 'minimal'],
    [4, 'minimal'],
    [5, 'mild'],
    [9, 'mild'],
    [10, 'moderate'],
    [14, 'moderate'],
    [15, 'mod-severe'],
    [19, 'mod-severe'],
    [20, 'severe'],
    [27, 'severe']
  ])('score %i maps to severity %s', (score, severity) => {
    expect(phq9.bandFor(score).severity).toBe(severity);
  });

  it('flags when Q9 (index 8) is >= 1', () => {
    expect(phq9.flagFired([0, 0, 0, 0, 0, 0, 0, 0, 0])).toBe(false);
    expect(phq9.flagFired([0, 0, 0, 0, 0, 0, 0, 0, 1])).toBe(true);
    expect(phq9.flagFired([0, 0, 0, 0, 0, 0, 0, 0, 3])).toBe(true);
  });

  it('is public domain Pfizer instrument', () => {
    expect(phq9.source.publicDomain).toBe(true);
    expect(phq9.source.yearPublished).toBe(1999);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:unit -- phq-9`
Expected: FAIL — module not found.

- [ ] **Step 3: Write `src/lib/screeners/phq-9.ts`**

```ts
import type { Screener, SeverityBand } from './types';

const bands: SeverityBand[] = [
  { min: 0, max: 4, labelKey: 'severity_minimal', severity: 'minimal', actionKey: 'phq9_action_minimal' },
  { min: 5, max: 9, labelKey: 'severity_mild', severity: 'mild', actionKey: 'phq9_action_mild' },
  { min: 10, max: 14, labelKey: 'severity_moderate', severity: 'moderate', actionKey: 'phq9_action_moderate' },
  { min: 15, max: 19, labelKey: 'severity_mod_severe', severity: 'mod-severe', actionKey: 'phq9_action_mod_severe' },
  { min: 20, max: 27, labelKey: 'severity_severe', severity: 'severe', actionKey: 'phq9_action_severe' }
];

export const phq9: Screener = {
  id: 'phq-9',
  slug: '',
  nameKey: 'phq9_name',
  shortDescKey: 'phq9_short_desc',
  domain: 'depression',
  itemCount: 9,
  items: [
    { textKey: 'phq9_q1' },
    { textKey: 'phq9_q2' },
    { textKey: 'phq9_q3' },
    { textKey: 'phq9_q4' },
    { textKey: 'phq9_q5' },
    { textKey: 'phq9_q6' },
    { textKey: 'phq9_q7' },
    { textKey: 'phq9_q8' },
    { textKey: 'phq9_q9' }
  ],
  scale: {
    labelKeys: ['phq9_scale_0', 'phq9_scale_1', 'phq9_scale_2', 'phq9_scale_3'],
    values: [0, 1, 2, 3]
  },
  bands,
  flagItems: [8],
  flagThreshold: 1,
  recommend: ['gad-7', 'wsas'],
  source: {
    citation: 'Kroenke K, Spitzer RL, Williams JB. The PHQ-9: validity of a brief depression severity measure. J Gen Intern Med. 2001;16(9):606-613.',
    doi: '10.1046/j.1525-1497.2001.016009606.x',
    url: 'https://www.phqscreeners.com/',
    license: 'Public domain; developed by Pfizer Inc. with educational grant. No permission required for reproduction.',
    publicDomain: true,
    officialTranslationsUrl: 'https://www.phqscreeners.com/select-screener',
    yearPublished: 1999
  },
  score(answers) {
    return answers.reduce((sum, v) => sum + v, 0);
  },
  bandFor(score) {
    return bands.find((b) => score >= b.min && score <= b.max) ?? bands[bands.length - 1]!;
  },
  flagFired(answers) {
    return (this.flagItems ?? []).some((i) => (answers[i] ?? 0) >= (this.flagThreshold ?? 1));
  }
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test:unit -- phq-9`
Expected: 5 passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat(screeners): add PHQ-9 config with scoring and Q9 flag

Reference: Kroenke et al. 2001, doi:10.1046/j.1525-1497.2001.016009606.x.
Public domain via Pfizer.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task B3: PHQ-2 config + tests

**Files:**
- Create: `src/lib/screeners/phq-2.ts`, `tests/unit/phq-2.test.ts`

- [ ] **Step 1: Write failing test**

```ts
import { describe, it, expect } from 'vitest';
import { phq2 } from '$lib/screeners/phq-2';

describe('PHQ-2', () => {
  it('has 2 items, scale 0-3', () => {
    expect(phq2.itemCount).toBe(2);
    expect(phq2.scale.values).toEqual([0, 1, 2, 3]);
  });

  it('sums answers', () => {
    expect(phq2.score([0, 0])).toBe(0);
    expect(phq2.score([3, 3])).toBe(6);
    expect(phq2.score([2, 1])).toBe(3);
  });

  it('cutoff 3 separates negative from positive screen', () => {
    expect(phq2.bandFor(2).severity).toBe('none');
    expect(phq2.bandFor(3).severity).toBe('moderate');
    expect(phq2.bandFor(6).severity).toBe('moderate');
  });
});
```

- [ ] **Step 2: Run failing**

Run: `npm run test:unit -- phq-2`
Expected: FAIL.

- [ ] **Step 3: Write `src/lib/screeners/phq-2.ts`**

```ts
import type { Screener, SeverityBand } from './types';

const bands: SeverityBand[] = [
  { min: 0, max: 2, labelKey: 'phq2_negative', severity: 'none', actionKey: 'phq2_action_negative' },
  { min: 3, max: 6, labelKey: 'phq2_positive', severity: 'moderate', actionKey: 'phq2_action_positive' }
];

export const phq2: Screener = {
  id: 'phq-2',
  slug: 'phq-2',
  nameKey: 'phq2_name',
  shortDescKey: 'phq2_short_desc',
  domain: 'depression',
  itemCount: 2,
  items: [{ textKey: 'phq2_q1' }, { textKey: 'phq2_q2' }],
  scale: {
    labelKeys: ['phq9_scale_0', 'phq9_scale_1', 'phq9_scale_2', 'phq9_scale_3'],
    values: [0, 1, 2, 3]
  },
  bands,
  recommend: ['phq-9'],
  source: {
    citation: 'Kroenke K, Spitzer RL, Williams JB. The Patient Health Questionnaire-2: validity of a two-item depression screener. Med Care. 2003;41(11):1284-1292.',
    doi: '10.1097/01.MLR.0000093487.78664.3C',
    license: 'Public domain; Pfizer Inc.',
    publicDomain: true,
    yearPublished: 2003
  },
  score(answers) { return answers.reduce((s, v) => s + v, 0); },
  bandFor(score) { return bands.find((b) => score >= b.min && score <= b.max) ?? bands[bands.length - 1]!; },
  flagFired() { return false; }
};
```

- [ ] **Step 4: Run test**

Run: `npm run test:unit -- phq-2`
Expected: 3 passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat(screeners): add PHQ-2 quick screen

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task B4: GAD-7 config + tests

**Files:**
- Create: `src/lib/screeners/gad-7.ts`, `tests/unit/gad-7.test.ts`

- [ ] **Step 1: Write failing test**

```ts
import { describe, it, expect } from 'vitest';
import { gad7 } from '$lib/screeners/gad-7';

describe('GAD-7', () => {
  it('has 7 items, scale 0-3', () => {
    expect(gad7.itemCount).toBe(7);
    expect(gad7.scale.values).toEqual([0, 1, 2, 3]);
  });

  it.each([
    [0, 'minimal'],
    [4, 'minimal'],
    [5, 'mild'],
    [9, 'mild'],
    [10, 'moderate'],
    [14, 'moderate'],
    [15, 'severe'],
    [21, 'severe']
  ])('score %i → %s', (score, severity) => {
    expect(gad7.bandFor(score).severity).toBe(severity);
  });
});
```

- [ ] **Step 2: Run failing**

Run: `npm run test:unit -- gad-7`
Expected: FAIL.

- [ ] **Step 3: Write `src/lib/screeners/gad-7.ts`**

```ts
import type { Screener, SeverityBand } from './types';

const bands: SeverityBand[] = [
  { min: 0, max: 4, labelKey: 'severity_minimal', severity: 'minimal', actionKey: 'gad7_action_minimal' },
  { min: 5, max: 9, labelKey: 'severity_mild', severity: 'mild', actionKey: 'gad7_action_mild' },
  { min: 10, max: 14, labelKey: 'severity_moderate', severity: 'moderate', actionKey: 'gad7_action_moderate' },
  { min: 15, max: 21, labelKey: 'severity_severe', severity: 'severe', actionKey: 'gad7_action_severe' }
];

export const gad7: Screener = {
  id: 'gad-7',
  slug: 'gad-7',
  nameKey: 'gad7_name',
  shortDescKey: 'gad7_short_desc',
  domain: 'anxiety',
  itemCount: 7,
  items: Array.from({ length: 7 }, (_, i) => ({ textKey: `gad7_q${i + 1}` })),
  scale: {
    labelKeys: ['phq9_scale_0', 'phq9_scale_1', 'phq9_scale_2', 'phq9_scale_3'],
    values: [0, 1, 2, 3]
  },
  bands,
  recommend: ['phq-9'],
  source: {
    citation: 'Spitzer RL, Kroenke K, Williams JB, Löwe B. A brief measure for assessing generalized anxiety disorder: the GAD-7. Arch Intern Med. 2006;166(10):1092-1097.',
    doi: '10.1001/archinte.166.10.1092',
    license: 'Public domain; Pfizer Inc.',
    publicDomain: true,
    yearPublished: 2006
  },
  score(answers) { return answers.reduce((s, v) => s + v, 0); },
  bandFor(score) { return bands.find((b) => score >= b.min && score <= b.max) ?? bands[bands.length - 1]!; },
  flagFired() { return false; }
};
```

- [ ] **Step 4: Run test**

Run: `npm run test:unit -- gad-7`
Expected: passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat(screeners): add GAD-7

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task B5: CES-D config + tests

**Files:**
- Create: `src/lib/screeners/ces-d.ts`, `tests/unit/ces-d.test.ts`

- [ ] **Step 1: Write failing test**

```ts
import { describe, it, expect } from 'vitest';
import { cesd } from '$lib/screeners/ces-d';

describe('CES-D', () => {
  it('has 20 items, scale 0-3', () => {
    expect(cesd.itemCount).toBe(20);
    expect(cesd.scale.values).toEqual([0, 1, 2, 3]);
  });

  it('reverse-scores items 4, 8, 12, 16 (0-indexed: 3, 7, 11, 15)', () => {
    const reverseIdx = cesd.items.map((it, i) => (it.reverseScored ? i : -1)).filter((i) => i >= 0);
    expect(reverseIdx).toEqual([3, 7, 11, 15]);
  });

  it('sums with reverse for positively-worded items', () => {
    const allZero = Array(20).fill(0);
    expect(cesd.score(allZero)).toBe(3 * 4); // reverse 0 -> 3
    const allThree = Array(20).fill(3);
    expect(cesd.score(allThree)).toBe(3 * 16 + 0 * 4);
  });

  it('cutoff 16 marks risk', () => {
    expect(cesd.bandFor(15).severity).toBe('none');
    expect(cesd.bandFor(16).severity).toBe('moderate');
  });
});
```

- [ ] **Step 2: Run failing**

Run: `npm run test:unit -- ces-d`
Expected: FAIL.

- [ ] **Step 3: Write `src/lib/screeners/ces-d.ts`**

```ts
import type { Screener, SeverityBand } from './types';

const REVERSE = new Set([3, 7, 11, 15]);

const bands: SeverityBand[] = [
  { min: 0, max: 15, labelKey: 'cesd_negative', severity: 'none', actionKey: 'cesd_action_negative' },
  { min: 16, max: 60, labelKey: 'cesd_positive', severity: 'moderate', actionKey: 'cesd_action_positive' }
];

export const cesd: Screener = {
  id: 'ces-d',
  slug: 'ces-d',
  nameKey: 'cesd_name',
  shortDescKey: 'cesd_short_desc',
  domain: 'depression',
  itemCount: 20,
  items: Array.from({ length: 20 }, (_, i) => ({
    textKey: `cesd_q${i + 1}`,
    reverseScored: REVERSE.has(i)
  })),
  scale: {
    labelKeys: ['cesd_scale_0', 'cesd_scale_1', 'cesd_scale_2', 'cesd_scale_3'],
    values: [0, 1, 2, 3]
  },
  bands,
  source: {
    citation: 'Radloff LS. The CES-D Scale: A self-report depression scale for research in the general population. Appl Psychol Meas. 1977;1(3):385-401.',
    doi: '10.1177/014662167700100306',
    license: 'Public domain; developed at NIMH.',
    publicDomain: true,
    yearPublished: 1977
  },
  score(answers) {
    return answers.reduce((s, v, i) => s + (REVERSE.has(i) ? 3 - v : v), 0);
  },
  bandFor(score) { return bands.find((b) => score >= b.min && score <= b.max) ?? bands[bands.length - 1]!; },
  flagFired() { return false; }
};
```

- [ ] **Step 4: Run test**

Run: `npm run test:unit -- ces-d`
Expected: passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat(screeners): add CES-D with reverse-scored positive items

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task B6: PROMIS Depression 8a + tests

**Files:**
- Create: `src/lib/screeners/promis-depression.ts`, `tests/unit/promis-depression.test.ts`

- [ ] **Step 1: Write failing test**

```ts
import { describe, it, expect } from 'vitest';
import { promisDepression } from '$lib/screeners/promis-depression';

describe('PROMIS Depression 8a', () => {
  it('has 8 items, scale 1-5 (never to always)', () => {
    expect(promisDepression.itemCount).toBe(8);
    expect(promisDepression.scale.values).toEqual([1, 2, 3, 4, 5]);
  });

  it('raw score is sum of 1-5 values, range 8-40', () => {
    expect(promisDepression.score([1, 1, 1, 1, 1, 1, 1, 1])).toBe(8);
    expect(promisDepression.score([5, 5, 5, 5, 5, 5, 5, 5])).toBe(40);
  });

  it('bands match published T-score-equivalent cutoffs', () => {
    expect(promisDepression.bandFor(8).severity).toBe('none');
    expect(promisDepression.bandFor(15).severity).toBe('mild');
    expect(promisDepression.bandFor(20).severity).toBe('moderate');
    expect(promisDepression.bandFor(30).severity).toBe('severe');
  });
});
```

- [ ] **Step 2: Run failing**

Run: `npm run test:unit -- promis-depression`
Expected: FAIL.

- [ ] **Step 3: Write `src/lib/screeners/promis-depression.ts`**

```ts
import type { Screener, SeverityBand } from './types';

const bands: SeverityBand[] = [
  { min: 8, max: 11, labelKey: 'severity_none', severity: 'none', actionKey: 'promis_action_none' },
  { min: 12, max: 18, labelKey: 'severity_mild', severity: 'mild', actionKey: 'promis_action_mild' },
  { min: 19, max: 26, labelKey: 'severity_moderate', severity: 'moderate', actionKey: 'promis_action_moderate' },
  { min: 27, max: 40, labelKey: 'severity_severe', severity: 'severe', actionKey: 'promis_action_severe' }
];

export const promisDepression: Screener = {
  id: 'promis-depression',
  slug: 'promis-depression',
  nameKey: 'promis_depression_name',
  shortDescKey: 'promis_depression_short_desc',
  domain: 'depression',
  itemCount: 8,
  items: Array.from({ length: 8 }, (_, i) => ({ textKey: `promis_depression_q${i + 1}` })),
  scale: {
    labelKeys: ['promis_scale_1', 'promis_scale_2', 'promis_scale_3', 'promis_scale_4', 'promis_scale_5'],
    values: [1, 2, 3, 4, 5]
  },
  bands,
  source: {
    citation: 'Pilkonis PA, Choi SW, Reise SP, et al. Item banks for measuring emotional distress from the Patient-Reported Outcomes Measurement Information System (PROMIS): Depression, Anxiety, and Anger. Assessment. 2011;18(3):263-283.',
    doi: '10.1177/1073191111411667',
    url: 'https://www.healthmeasures.net/explore-measurement-systems/promis',
    license: 'Public domain; developed by NIH PROMIS initiative.',
    publicDomain: true,
    yearPublished: 2011
  },
  score(answers) { return answers.reduce((s, v) => s + v, 0); },
  bandFor(score) { return bands.find((b) => score >= b.min && score <= b.max) ?? bands[bands.length - 1]!; },
  flagFired() { return false; }
};
```

- [ ] **Step 4: Run test**

Run: `npm run test:unit -- promis-depression`
Expected: passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat(screeners): add PROMIS Depression 8a

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task B7: WSAS + tests

**Files:**
- Create: `src/lib/screeners/wsas.ts`, `tests/unit/wsas.test.ts`

- [ ] **Step 1: Write failing test**

```ts
import { describe, it, expect } from 'vitest';
import { wsas } from '$lib/screeners/wsas';

describe('WSAS', () => {
  it('has 5 items, scale 0-8', () => {
    expect(wsas.itemCount).toBe(5);
    expect(wsas.scale.values).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it.each([
    [0, 'none'],
    [9, 'mild'],
    [10, 'moderate'],
    [19, 'moderate'],
    [20, 'severe'],
    [40, 'severe']
  ])('score %i → %s', (score, severity) => {
    expect(wsas.bandFor(score).severity).toBe(severity);
  });
});
```

- [ ] **Step 2: Run failing**

Run: `npm run test:unit -- wsas`
Expected: FAIL.

- [ ] **Step 3: Write `src/lib/screeners/wsas.ts`**

```ts
import type { Screener, SeverityBand } from './types';

const bands: SeverityBand[] = [
  { min: 0, max: 9, labelKey: 'wsas_subclinical', severity: 'mild', actionKey: 'wsas_action_subclinical' },
  { min: 10, max: 19, labelKey: 'wsas_significant', severity: 'moderate', actionKey: 'wsas_action_significant' },
  { min: 20, max: 40, labelKey: 'wsas_severe', severity: 'severe', actionKey: 'wsas_action_severe' }
];
// 0 case: severity 'none' for narrative; band still mild because clinical convention.
const noBand: SeverityBand = { min: 0, max: 0, labelKey: 'wsas_none', severity: 'none', actionKey: 'wsas_action_none' };

export const wsas: Screener = {
  id: 'wsas',
  slug: 'wsas',
  nameKey: 'wsas_name',
  shortDescKey: 'wsas_short_desc',
  domain: 'functional-impairment',
  itemCount: 5,
  items: Array.from({ length: 5 }, (_, i) => ({ textKey: `wsas_q${i + 1}` })),
  scale: {
    labelKeys: ['wsas_scale_0','wsas_scale_1','wsas_scale_2','wsas_scale_3','wsas_scale_4','wsas_scale_5','wsas_scale_6','wsas_scale_7','wsas_scale_8'],
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  },
  bands: [noBand, ...bands],
  source: {
    citation: 'Mundt JC, Marks IM, Shear MK, Greist JH. The Work and Social Adjustment Scale: a simple measure of impairment in functioning. Br J Psychiatry. 2002;180:461-464.',
    doi: '10.1192/bjp.180.5.461',
    license: 'Public domain; free to use, copy, and translate.',
    publicDomain: true,
    yearPublished: 2002
  },
  score(answers) { return answers.reduce((s, v) => s + v, 0); },
  bandFor(score) {
    if (score === 0) return noBand;
    return bands.find((b) => score >= b.min && score <= b.max) ?? bands[bands.length - 1]!;
  },
  flagFired() { return false; }
};
```

- [ ] **Step 4: Run test**

Run: `npm run test:unit -- wsas`
Expected: passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat(screeners): add WSAS functional impairment scale

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task B8: WHO-5 + tests

**Files:**
- Create: `src/lib/screeners/who-5.ts`, `tests/unit/who-5.test.ts`

- [ ] **Step 1: Write failing test**

```ts
import { describe, it, expect } from 'vitest';
import { who5 } from '$lib/screeners/who-5';

describe('WHO-5', () => {
  it('has 5 items, scale 0-5', () => {
    expect(who5.itemCount).toBe(5);
    expect(who5.scale.values).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('raw score 0-25 multiplied by 4 → 0-100 percentage', () => {
    expect(who5.score([0, 0, 0, 0, 0])).toBe(0);
    expect(who5.score([5, 5, 5, 5, 5])).toBe(100);
    expect(who5.score([3, 3, 3, 3, 3])).toBe(60);
  });

  it.each([
    [0, 'severe'],
    [50, 'mild'],
    [51, 'none'],
    [100, 'none']
  ])('score %i → %s', (score, severity) => {
    expect(who5.bandFor(score).severity).toBe(severity);
  });
});
```

- [ ] **Step 2: Run failing**

Run: `npm run test:unit -- who-5`
Expected: FAIL.

- [ ] **Step 3: Write `src/lib/screeners/who-5.ts`**

```ts
import type { Screener, SeverityBand } from './types';

const bands: SeverityBand[] = [
  { min: 0, max: 28, labelKey: 'who5_very_low', severity: 'severe', actionKey: 'who5_action_very_low' },
  { min: 29, max: 50, labelKey: 'who5_low', severity: 'mild', actionKey: 'who5_action_low' },
  { min: 51, max: 100, labelKey: 'who5_normal', severity: 'none', actionKey: 'who5_action_normal' }
];

export const who5: Screener = {
  id: 'who-5',
  slug: 'who-5',
  nameKey: 'who5_name',
  shortDescKey: 'who5_short_desc',
  domain: 'wellbeing',
  itemCount: 5,
  items: Array.from({ length: 5 }, (_, i) => ({ textKey: `who5_q${i + 1}` })),
  scale: {
    labelKeys: ['who5_scale_0','who5_scale_1','who5_scale_2','who5_scale_3','who5_scale_4','who5_scale_5'],
    values: [0, 1, 2, 3, 4, 5]
  },
  bands,
  source: {
    citation: 'World Health Organization. WHO (Five) Well-Being Index (1998 version). WHO Regional Office for Europe, Copenhagen.',
    url: 'https://www.psykiatri-regionh.dk/who-5/Pages/default.aspx',
    license: 'Free to use with attribution to WHO.',
    publicDomain: true,
    yearPublished: 1998
  },
  score(answers) { return answers.reduce((s, v) => s + v, 0) * 4; },
  bandFor(score) { return bands.find((b) => score >= b.min && score <= b.max) ?? bands[bands.length - 1]!; },
  flagFired() { return false; }
};
```

- [ ] **Step 4: Run test**

Run: `npm run test:unit -- who-5`
Expected: passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat(screeners): add WHO-5 Wellbeing Index

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task B9: Screener registry

**Files:**
- Create: `src/lib/screeners/registry.ts`, `tests/unit/registry.test.ts`

- [ ] **Step 1: Write failing test**

```ts
import { describe, it, expect } from 'vitest';
import { screeners, screenerById, screenerSlugs } from '$lib/screeners/registry';

describe('registry', () => {
  it('exposes all 7 launch screeners', () => {
    expect(screeners).toHaveLength(7);
  });

  it('has unique ids and slugs', () => {
    const ids = new Set(screeners.map((s) => s.id));
    const slugs = new Set(screeners.map((s) => s.slug));
    expect(ids.size).toBe(7);
    expect(slugs.size).toBe(7);
  });

  it('lookup by id', () => {
    expect(screenerById('phq-9')?.id).toBe('phq-9');
    expect(screenerById('does-not-exist')).toBeUndefined();
  });

  it('screenerSlugs lists every non-flagship slug', () => {
    expect(screenerSlugs).not.toContain('');
    expect(screenerSlugs).toContain('gad-7');
    expect(screenerSlugs).toHaveLength(6);
  });
});
```

- [ ] **Step 2: Run failing**

Run: `npm run test:unit -- registry`
Expected: FAIL.

- [ ] **Step 3: Write `src/lib/screeners/registry.ts`**

```ts
import type { Screener } from './types';
import { phq9 } from './phq-9';
import { phq2 } from './phq-2';
import { gad7 } from './gad-7';
import { cesd } from './ces-d';
import { promisDepression } from './promis-depression';
import { wsas } from './wsas';
import { who5 } from './who-5';

export const screeners: Screener[] = [phq9, phq2, gad7, cesd, promisDepression, wsas, who5];

export const screenerById = (id: string): Screener | undefined =>
  screeners.find((s) => s.id === id);

export const screenerSlugs: string[] = screeners
  .map((s) => s.slug)
  .filter((slug): slug is string => slug !== '');
```

- [ ] **Step 4: Run test**

Run: `npm run test:unit -- registry`
Expected: passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat(screeners): add registry and lookup helpers

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task B10: Storage (localStorage attempt history)

**Files:**
- Create: `src/lib/storage.ts`, `tests/unit/storage.test.ts`

- [ ] **Step 1: Write failing test**

```ts
import { describe, it, expect, beforeEach } from 'vitest';
import { saveAttempt, listAttempts, deleteAttempt, clearAll, exportJson, exportCsv } from '$lib/storage';

beforeEach(() => {
  globalThis.localStorage = {
    _data: {} as Record<string, string>,
    getItem(k: string) { return this._data[k] ?? null; },
    setItem(k: string, v: string) { this._data[k] = v; },
    removeItem(k: string) { delete this._data[k]; },
    clear() { this._data = {}; },
    key() { return null; },
    length: 0
  } as unknown as Storage;
});

describe('storage', () => {
  it('starts empty', () => {
    expect(listAttempts()).toEqual([]);
  });

  it('saves and lists', () => {
    saveAttempt({
      id: 'a1',
      screenerId: 'phq-9',
      completedAt: '2026-05-14T10:00:00Z',
      locale: 'en',
      answers: [0, 1, 2, 3, 0, 1, 2, 1, 0],
      score: 10,
      band: 'severity_moderate',
      flagged: false
    });
    expect(listAttempts()).toHaveLength(1);
  });

  it('deletes by id', () => {
    saveAttempt({ id: 'a1', screenerId: 'phq-9', completedAt: '2026-05-14T10:00:00Z', locale: 'en', answers: [], score: 0, band: '', flagged: false });
    saveAttempt({ id: 'a2', screenerId: 'gad-7', completedAt: '2026-05-14T11:00:00Z', locale: 'en', answers: [], score: 0, band: '', flagged: false });
    deleteAttempt('a1');
    expect(listAttempts().map((a) => a.id)).toEqual(['a2']);
  });

  it('clearAll empties', () => {
    saveAttempt({ id: 'a1', screenerId: 'phq-9', completedAt: '', locale: 'en', answers: [], score: 0, band: '', flagged: false });
    clearAll();
    expect(listAttempts()).toEqual([]);
  });

  it('exports JSON', () => {
    saveAttempt({ id: 'a1', screenerId: 'phq-9', completedAt: '2026-05-14T10:00:00Z', locale: 'en', answers: [0], score: 0, band: 'severity_minimal', flagged: false });
    const json = exportJson();
    expect(JSON.parse(json)).toHaveLength(1);
  });

  it('exports CSV', () => {
    saveAttempt({ id: 'a1', screenerId: 'phq-9', completedAt: '2026-05-14T10:00:00Z', locale: 'en', answers: [1, 2], score: 3, band: 'severity_minimal', flagged: false });
    const csv = exportCsv();
    expect(csv.split('\n')[0]).toContain('id');
    expect(csv).toContain('phq-9');
  });
});
```

- [ ] **Step 2: Run failing**

Run: `npm run test:unit -- storage`
Expected: FAIL.

- [ ] **Step 3: Write `src/lib/storage.ts`**

```ts
export type Attempt = {
  id: string;
  screenerId: string;
  completedAt: string;
  locale: string;
  answers: number[];
  score: number;
  band: string;
  flagged: boolean;
};

const KEY = 'phq9-online:history:v1';

const read = (): Attempt[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const write = (items: Attempt[]): void => {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* quota exceeded or disabled — swallow */
  }
};

export const listAttempts = (): Attempt[] => read();

export const saveAttempt = (a: Attempt): void => {
  const list = read();
  list.push(a);
  write(list);
};

export const deleteAttempt = (id: string): void => {
  write(read().filter((a) => a.id !== id));
};

export const clearAll = (): void => {
  write([]);
};

export const exportJson = (): string => JSON.stringify(read(), null, 2);

export const exportCsv = (): string => {
  const rows = read();
  const header = ['id', 'screenerId', 'completedAt', 'locale', 'score', 'band', 'flagged', 'answers'];
  const body = rows.map((a) =>
    [a.id, a.screenerId, a.completedAt, a.locale, a.score, a.band, a.flagged, a.answers.join('|')].join(',')
  );
  return [header.join(','), ...body].join('\n');
};
```

- [ ] **Step 4: Run test**

Run: `npm run test:unit -- storage`
Expected: passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat(storage): add localStorage attempt history with export

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task B11: Settings store + consent

**Files:**
- Create: `src/lib/stores.ts`, `tests/unit/stores.test.ts`

- [ ] **Step 1: Write failing test**

```ts
import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { settings, adsSuppressed } from '$lib/stores';

beforeEach(() => {
  globalThis.localStorage = {
    _data: {} as Record<string, string>,
    getItem(k: string) { return this._data[k] ?? null; },
    setItem(k: string, v: string) { this._data[k] = v; },
    removeItem(k: string) { delete this._data[k]; },
    clear() { this._data = {}; },
    key() { return null; },
    length: 0
  } as unknown as Storage;
});

describe('stores', () => {
  it('settings defaults: saveHistory false, theme auto', () => {
    const s = get(settings);
    expect(s.saveHistory).toBe(false);
    expect(s.theme).toBe('auto');
  });

  it('adsSuppressed defaults false', () => {
    expect(get(adsSuppressed)).toBe(false);
  });

  it('settings persists to localStorage', () => {
    settings.update((s) => ({ ...s, saveHistory: true }));
    const raw = localStorage.getItem('phq9-online:settings:v1');
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw!).saveHistory).toBe(true);
  });
});
```

- [ ] **Step 2: Run failing**

Run: `npm run test:unit -- stores`
Expected: FAIL.

- [ ] **Step 3: Write `src/lib/stores.ts`**

```ts
import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Settings = {
  saveHistory: boolean;
  theme: 'auto' | 'light' | 'dark';
  locale: string;
};

const SETTINGS_KEY = 'phq9-online:settings:v1';
const defaults: Settings = { saveHistory: false, theme: 'auto', locale: 'en' };

const load = (): Settings => {
  if (!browser && !('localStorage' in globalThis)) return defaults;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return defaults;
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
};

const persist = (s: Settings): void => {
  if (!('localStorage' in globalThis)) return;
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch { /* ignore */ }
};

const createSettings = (): Writable<Settings> => {
  const store = writable<Settings>(load());
  store.subscribe(persist);
  return store;
};

export const settings = createSettings();
export const adsSuppressed = writable<boolean>(false);
export const adsEnabled = writable<boolean>(
  typeof import.meta !== 'undefined' && (import.meta as any).env?.PUBLIC_ENABLE_ADS === 'true'
);
```

- [ ] **Step 4: Run test**

Run: `npm run test:unit -- stores`
Expected: passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat(stores): add settings, adsEnabled, adsSuppressed stores

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task B12: JSON-LD schema builders

**Files:**
- Create: `src/lib/schema.ts`, `tests/unit/schema.test.ts`

- [ ] **Step 1: Write failing test**

```ts
import { describe, it, expect } from 'vitest';
import { websiteSchema, organizationSchema, faqPageSchema, medicalWebPageSchema, quizSchema, breadcrumbSchema } from '$lib/schema';

describe('schema', () => {
  it('websiteSchema has @type WebSite', () => {
    expect(websiteSchema().['@type']).toBe('WebSite');
  });

  it('faqPageSchema embeds questions', () => {
    const s = faqPageSchema([{ q: 'Is this medical advice?', a: 'No.' }]);
    expect(s['@type']).toBe('FAQPage');
    expect(s.mainEntity).toHaveLength(1);
  });

  it('breadcrumbSchema preserves order', () => {
    const s = breadcrumbSchema([
      { name: 'Home', url: 'https://phq9.online/' },
      { name: 'FAQ', url: 'https://phq9.online/faq' }
    ]);
    expect(s.itemListElement[0].position).toBe(1);
    expect(s.itemListElement[1].position).toBe(2);
  });
});
```

- [ ] **Step 2: Run failing**

Run: `npm run test:unit -- schema`
Expected: FAIL.

- [ ] **Step 3: Write `src/lib/schema.ts`**

```ts
const ORIGIN = 'https://phq9.online';

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'phq9.online',
  url: ORIGIN,
  inLanguage: 'en'
});

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'phq9.online',
  url: ORIGIN,
  email: 'contact@phq9.online',
  logo: `${ORIGIN}/favicon.svg`
});

export const medicalWebPageSchema = (opts: {
  url: string;
  name: string;
  description: string;
  lastReviewed?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  url: opts.url,
  name: opts.name,
  description: opts.description,
  lastReviewed: opts.lastReviewed ?? new Date().toISOString().slice(0, 10),
  medicalAudience: { '@type': 'MedicalAudience', audienceType: 'Patient' }
});

export const quizSchema = (opts: { name: string; url: string; about: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: opts.name,
  url: opts.url,
  about: opts.about,
  educationalLevel: 'consumer'
});

export const faqPageSchema = (qa: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: qa.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a }
  }))
});

export const breadcrumbSchema = (crumbs: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: c.url
  }))
});
```

- [ ] **Step 4: Run test**

Run: `npm run test:unit -- schema`
Expected: passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat(schema): add JSON-LD builders for SEO

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task Group C — UI components

### Task C1: CrisisBanner

**Files:**
- Create: `src/lib/components/CrisisBanner.svelte`, `tests/e2e/crisis-banner.spec.ts` (e2e written in Task E group; here, smoke only)

- [ ] **Step 1: Write `src/lib/components/CrisisBanner.svelte`**

```svelte
<script lang="ts">
  import * as m from '$lib/paraglide/messages';
</script>

<aside role="alert" aria-live="assertive" class="rounded-lg border-2 border-[color:var(--color-crisis)] bg-[color:var(--color-base-2)] p-4 mb-6">
  <h2 class="text-lg font-semibold text-[color:var(--color-crisis-2)]">{m.crisis_banner_title()}</h2>
  <ul class="mt-3 space-y-1 text-sm">
    <li>{m.crisis_banner_us_988()}</li>
    <li>{m.crisis_banner_uk_samaritans()}</li>
    <li>{m.crisis_banner_canada_988()}</li>
    <li>{m.crisis_banner_iceland_pieta()}</li>
    <li><a class="underline" href="/crisis">{m.crisis_banner_intl_link()}</a></li>
  </ul>
</aside>
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/components/CrisisBanner.svelte
git commit -m "$(cat <<'EOF'
feat(ui): add CrisisBanner component

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task C2: AdSlot (no-op when disabled or suppressed)

**Files:**
- Create: `src/lib/components/AdSlot.svelte`

- [ ] **Step 1: Write `src/lib/components/AdSlot.svelte`**

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { adsEnabled, adsSuppressed } from '$lib/stores';
  let { slot, format = 'auto' } = $props<{ slot: string; format?: 'auto' | 'fluid' }>();
  let mounted = $state(false);
  onMount(() => {
    mounted = true;
    if ($adsEnabled && !$adsSuppressed) {
      try { (window as any).adsbygoogle = (window as any).adsbygoogle || []; (window as any).adsbygoogle.push({}); }
      catch { /* swallow */ }
    }
  });
</script>

{#if mounted && $adsEnabled && !$adsSuppressed}
  <ins class="adsbygoogle block my-6"
       style="display:block"
       data-ad-client="ca-pub-8001142558091314"
       data-ad-slot={slot}
       data-ad-format={format}
       data-full-width-responsive="true"></ins>
{/if}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/components/AdSlot.svelte
git commit -m "$(cat <<'EOF'
feat(ui): add AdSlot component with suppression support

Pub ID ca-pub-8001142558091314 hardcoded in data-ad-client. Component
renders nothing unless adsEnabled && !adsSuppressed.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task C3: ScoreResult

**Files:**
- Create: `src/lib/components/ScoreResult.svelte`

- [ ] **Step 1: Write `src/lib/components/ScoreResult.svelte`**

```svelte
<script lang="ts">
  import type { Screener, SeverityBand } from '$lib/screeners/types';
  import CrisisBanner from './CrisisBanner.svelte';
  import * as m from '$lib/paraglide/messages';

  let { screener, score, band, flagged } = $props<{
    screener: Screener;
    score: number;
    band: SeverityBand;
    flagged: boolean;
  }>();
</script>

<section aria-labelledby="result-heading" class="mt-8">
  {#if flagged}
    <CrisisBanner />
  {/if}
  <h2 id="result-heading" class="text-2xl font-semibold">{m.your_score()}: {score}</h2>
  <p class="mt-2 text-lg">
    <span class="font-medium">{band.severity}</span>
  </p>
  <p class="mt-4 max-w-prose text-[color:var(--color-ink-2)]">
    {band.actionKey}
  </p>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/components/ScoreResult.svelte
git commit -m "$(cat <<'EOF'
feat(ui): add ScoreResult component

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task C4: Screener (main interactive component)

**Files:**
- Create: `src/lib/components/Screener.svelte`

- [ ] **Step 1: Write `src/lib/components/Screener.svelte`**

```svelte
<script lang="ts">
  import type { Screener } from '$lib/screeners/types';
  import ScoreResult from './ScoreResult.svelte';
  import { saveAttempt } from '$lib/storage';
  import { settings, adsSuppressed } from '$lib/stores';
  import * as m from '$lib/paraglide/messages';

  let { config } = $props<{ config: Screener }>();
  let answers: (number | null)[] = $state(Array(config.itemCount).fill(null));
  let submitted = $state(false);
  let score = $state(0);
  let band = $state(config.bands[0]!);
  let flagged = $state(false);

  const complete = $derived(answers.every((a) => a !== null));

  function submit() {
    const finalAnswers = answers as number[];
    score = config.score(finalAnswers);
    band = config.bandFor(score);
    flagged = config.flagFired(finalAnswers);
    submitted = true;
    adsSuppressed.set(flagged || !!config.suppressAdsOnResult);
    if ($settings.saveHistory) {
      saveAttempt({
        id: crypto.randomUUID(),
        screenerId: config.id,
        completedAt: new Date().toISOString(),
        locale: $settings.locale,
        answers: finalAnswers,
        score,
        band: band.labelKey,
        flagged
      });
    }
  }

  function reset() {
    answers = Array(config.itemCount).fill(null);
    submitted = false;
    adsSuppressed.set(false);
  }
</script>

{#if !submitted}
  <form on:submit|preventDefault={submit} class="mt-6 space-y-6">
    {#each config.items as item, idx}
      <fieldset class="rounded-md border border-[color:var(--color-border)] p-4">
        <legend class="px-2 text-sm font-medium">
          {idx + 1}. {item.textKey}
        </legend>
        <div class="mt-2 grid gap-2 sm:grid-cols-2">
          {#each config.scale.values as v, vi}
            <label class="flex items-center gap-2 rounded p-2 hover:bg-[color:var(--color-base-2)] cursor-pointer">
              <input
                type="radio"
                name={`q${idx}`}
                value={v}
                checked={answers[idx] === v}
                on:change={() => (answers[idx] = v)}
                aria-label={config.scale.labelKeys[vi]}
              />
              <span>{config.scale.labelKeys[vi]}</span>
            </label>
          {/each}
        </div>
      </fieldset>
    {/each}
    <button
      type="submit"
      disabled={!complete}
      class="rounded-md bg-[color:var(--color-accent)] px-4 py-2 font-medium text-white disabled:opacity-50"
    >
      {m.submit_answers()}
    </button>
  </form>
{:else}
  <ScoreResult {screener} screener={config} {score} {band} {flagged} />
  <button on:click={reset} class="mt-6 text-sm underline">Retake</button>
{/if}
```

(Note: the `<ScoreResult {screener} screener={config} ...>` line has a typo — keep only `screener={config}`. Fix in step 2.)

- [ ] **Step 2: Fix duplicate prop spread**

Edit `Screener.svelte`: replace `<ScoreResult {screener} screener={config} {score} {band} {flagged} />` with `<ScoreResult screener={config} {score} {band} {flagged} />`.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/Screener.svelte
git commit -m "$(cat <<'EOF'
feat(ui): add interactive Screener component with crisis suppression

Renders any Screener config as a radio-group form; on submit, scores,
band-maps, sets adsSuppressed when flagged or Phase 4, and persists to
history if user opted in.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task C5: Nav + Footer + ThemeToggle

**Files:**
- Create: `src/lib/components/Nav.svelte`, `src/lib/components/Footer.svelte`, `src/lib/components/ThemeToggle.svelte`

- [ ] **Step 1: Write `src/lib/components/Nav.svelte`**

```svelte
<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import ThemeToggle from './ThemeToggle.svelte';
</script>

<header class="border-b border-[color:var(--color-border)]">
  <nav aria-label="Primary" class="mx-auto flex max-w-5xl items-center justify-between p-4">
    <a href="/" class="text-lg font-semibold">{m.site_name()}</a>
    <ul class="flex items-center gap-4 text-sm">
      <li><a href="/">{m.nav_home()}</a></li>
      <li><a href="/compare">{m.nav_screeners()}</a></li>
      <li><a href="/faq">{m.nav_faq()}</a></li>
      <li><a href="/crisis">{m.nav_crisis()}</a></li>
      <li><a href="/history">{m.nav_history()}</a></li>
      <li><a href="/about">{m.nav_about()}</a></li>
      <li><ThemeToggle /></li>
    </ul>
  </nav>
</header>
```

- [ ] **Step 2: Write `src/lib/components/Footer.svelte`**

```svelte
<script lang="ts">
  import * as m from '$lib/paraglide/messages';
</script>

<footer class="mt-16 border-t border-[color:var(--color-border)] py-8">
  <div class="mx-auto max-w-5xl px-4 text-sm text-[color:var(--color-ink-2)]">
    <p class="mb-2">{m.footer_disclaimer()}</p>
    <p>
      <a class="underline" href="/disclaimer">Disclaimer</a> ·
      <a class="underline" href="/privacy">Privacy</a> ·
      <a class="underline" href="/terms">Terms</a> ·
      <a class="underline" href="/contact">Contact</a> ·
      <a class="underline" href="https://github.com/nathanib/phq9-online">Source</a>
    </p>
    <p class="mt-2">© {new Date().getFullYear()} phq9.online · MIT licensed</p>
  </div>
</footer>
```

- [ ] **Step 3: Write `src/lib/components/ThemeToggle.svelte`**

```svelte
<script lang="ts">
  import { settings } from '$lib/stores';
  import { onMount } from 'svelte';

  function apply(theme: 'auto' | 'light' | 'dark') {
    settings.update((s) => ({ ...s, theme }));
    if (typeof document !== 'undefined') {
      if (theme === 'auto') document.documentElement.removeAttribute('data-theme');
      else document.documentElement.setAttribute('data-theme', theme);
    }
  }

  onMount(() => {
    if (typeof document === 'undefined') return;
    settings.subscribe((s) => apply(s.theme));
  });
</script>

<select aria-label="Theme" on:change={(e) => apply((e.currentTarget as HTMLSelectElement).value as any)}>
  <option value="auto">Auto</option>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
</select>
```

- [ ] **Step 4: Wire Nav + Footer into `+layout.svelte`**

Replace `+layout.svelte` content with:

```svelte
<script lang="ts">
  import '../app.css';
  import { ParaglideJS } from '@inlang/paraglide-sveltekit';
  import { i18n } from '$lib/i18n';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  let { children } = $props();
</script>

<svelte:head>
  {#if import.meta.env.PUBLIC_ENABLE_ADS === 'true'}
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8001142558091314" crossorigin="anonymous"></script>
  {/if}
</svelte:head>

<ParaglideJS {i18n}>
  <Nav />
  <main class="mx-auto max-w-5xl px-4 py-8">
    {@render children?.()}
  </main>
  <Footer />
</ParaglideJS>
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: exit 0.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat(ui): add Nav, Footer, ThemeToggle and wire into layout

AdSense script tag injected only when PUBLIC_ENABLE_ADS is set in env;
hardcoded pub ID ca-pub-8001142558091314 per spec.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task C6: ScreenerLanding wrapper

**Files:**
- Create: `src/lib/components/ScreenerLanding.svelte`

- [ ] **Step 1: Write `src/lib/components/ScreenerLanding.svelte`**

```svelte
<script lang="ts">
  import type { Screener } from '$lib/screeners/types';
  import Screener from './Screener.svelte';
  import AdSlot from './AdSlot.svelte';
  import { medicalWebPageSchema, quizSchema, breadcrumbSchema } from '$lib/schema';

  let { config, ogTitle, ogDescription, url, children, breadcrumbs } = $props<{
    config: Screener;
    ogTitle: string;
    ogDescription: string;
    url: string;
    children?: any;
    breadcrumbs: { name: string; url: string }[];
  }>();

  const ld = [
    medicalWebPageSchema({ url, name: ogTitle, description: ogDescription }),
    quizSchema({ name: ogTitle, url, about: config.domain }),
    breadcrumbSchema(breadcrumbs)
  ];
</script>

<svelte:head>
  <title>{ogTitle}</title>
  <meta name="description" content={ogDescription} />
  <link rel="canonical" href={url} />
  <meta property="og:title" content={ogTitle} />
  <meta property="og:description" content={ogDescription} />
  <meta property="og:url" content={url} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://phq9.online/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  {#each ld as block}
    {@html `<script type="application/ld+json">${JSON.stringify(block)}</script>`}
  {/each}
</svelte:head>

<article>
  <h1 class="text-3xl font-bold">{ogTitle}</h1>
  <p class="mt-2 text-[color:var(--color-ink-2)]">{ogDescription}</p>

  <Screener {config} />

  <AdSlot slot="1234567890" />

  {@render children?.()}

  <AdSlot slot="2345678901" />

  <section class="mt-8 text-xs text-[color:var(--color-ink-2)]">
    <strong>Source:</strong> {config.source.citation}
    {#if config.source.doi}<br />doi:{config.source.doi}{/if}
    <br /><strong>License:</strong> {config.source.license}
  </section>
</article>
```

- [ ] **Step 2: Build to confirm Svelte compiles `{@html}` with template literal**

Run: `npm run build`
Expected: exit 0. If Svelte 5 rejects `{@html}` with template literal, replace with a `<svelte:element this="script">` workaround OR move JSON-LD to a server-side `+page.ts` `load` returning an array and render via `{@html '<script type="application/ld+json">' + JSON.stringify(b) + '</script>'}`.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/ScreenerLanding.svelte
git commit -m "$(cat <<'EOF'
feat(ui): add ScreenerLanding wrapper with JSON-LD and ad slots

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task Group D — Routes (screeners)

### Task D1: PHQ-9 root route

**Files:**
- Create: `src/routes/+page.svelte`, `src/routes/+page.ts`

- [ ] **Step 1: Write `src/routes/+page.ts`**

```ts
export const prerender = true;
```

- [ ] **Step 2: Write `src/routes/+page.svelte`**

```svelte
<script lang="ts">
  import ScreenerLanding from '$lib/components/ScreenerLanding.svelte';
  import { phq9 } from '$lib/screeners/phq-9';
</script>

<ScreenerLanding
  config={phq9}
  ogTitle="PHQ-9 Depression Test — Free & Confidential"
  ogDescription="Take the PHQ-9, the validated 9-item depression screening questionnaire used worldwide. Free, instant scoring, no signup, no data leaves your browser."
  url="https://phq9.online/"
  breadcrumbs={[{ name: 'Home', url: 'https://phq9.online/' }]}
>
  <section class="prose mt-12 max-w-prose">
    <h2>What is the PHQ-9?</h2>
    <p>The Patient Health Questionnaire-9 (PHQ-9) is a 9-item self-report instrument developed by Kroenke, Spitzer, and Williams in 1999 to assess depressive symptom severity in primary care. Each item corresponds to one of the nine DSM-IV criteria for major depressive disorder, scored from 0 ("not at all") to 3 ("nearly every day"), summing to a total score from 0 to 27.</p>
    <p>The PHQ-9 is in the public domain. It is distributed by Pfizer Inc. without copyright restriction and is freely available in over 80 validated translations.</p>
    <h2>How to interpret your score</h2>
    <p>A score of 0–4 indicates minimal depressive symptoms; 5–9 mild; 10–14 moderate; 15–19 moderately severe; 20–27 severe. A cutoff of 10 has been shown to have a sensitivity and specificity of 88% for major depression.</p>
    <h2>When to see a clinician</h2>
    <p>A positive screen on the PHQ-9 does not constitute a diagnosis. If your score is 10 or higher, or if you endorsed any thoughts of self-harm on item 9, the responsible next step is to consult a primary care clinician or mental health professional.</p>
    <h2>What this tool is — and isn't</h2>
    <p>This is a screening instrument, not a diagnostic test. It cannot replace a clinical evaluation. Use the result as one piece of information when discussing your mental health with a healthcare professional.</p>
  </section>
</ScreenerLanding>
```

(Content must reach ~1200 words on this page combined; expand in Task E1.)

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat(routes): add PHQ-9 root route

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task D2-D7: Routes for PHQ-2, GAD-7, CES-D, PROMIS, WSAS, WHO-5

For each of `phq-2`, `gad-7`, `ces-d`, `promis-depression`, `wsas`, `who-5`:

**Files (template; substitute slug per screener):**
- Create: `src/routes/<slug>/+page.svelte`, `src/routes/<slug>/+page.ts`

- [ ] **Step 1: Write `+page.ts`** — same as Task D1 step 1.

- [ ] **Step 2: Write `+page.svelte`** — clone D1's structure, import the screener config (`phq2`, `gad7`, etc.), set `url` to `https://phq9.online/<slug>`, set `breadcrumbs` to home + screener, and write ≥800 words of content covering: what it is, history, validation, scoring/interpretation, citations.

- [ ] **Step 3: Build + run dev to verify route loads**

Run: `npm run build && npm run preview -- --port 4173` in background, then `curl -s http://localhost:4173/<slug>/ | grep -q "<h1"`, kill server.
Expected: grep matches.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(routes): add /<slug> screener route

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

**Repeat once per screener (6 tasks: D2 phq-2, D3 gad-7, D4 ces-d, D5 promis-depression, D6 wsas, D7 who-5).** Each is its own task suitable for one subagent.

---

## Task Group E — Content pages

### Task E1: Expand PHQ-9 root content to ≥1200 words

**Files:**
- Modify: `src/routes/+page.svelte`

- [ ] **Step 1: Add sections** for: full history of the instrument (Spitzer, Kroenke, Williams 1999; Pfizer educational grant; PRIME-MD origins), psychometric properties (sensitivity, specificity, reliability across populations), cross-cultural validation, comparison with PHQ-2 and CES-D, scoring nuances (item 10 functional impairment), limitations (somatic vs cognitive symptoms, cultural factors), what to do at each band, how the test is used in primary care, common misconceptions, citations.

Target: 1200+ words. Acceptance: `wc -w src/routes/+page.svelte` reports ≥ 1200 after stripping HTML/JS.

- [ ] **Step 2: Verify word count**

Run: `node -e "const fs=require('fs');const s=fs.readFileSync('src/routes/+page.svelte','utf8');const t=s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ');console.log(t.split(/\s+/).filter(Boolean).length)"`
Expected: ≥ 1200.

- [ ] **Step 3: Commit**

```bash
git add src/routes/+page.svelte
git commit -m "$(cat <<'EOF'
content: expand PHQ-9 landing to >=1200 words

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task E2-E10: Content pages

For each of: `about-phq9`, `scoring`, `interpretation`, `faq`, `crisis`, `disclaimer`, `about`, `contact`, `privacy`, `terms`, `compare`, `history`:

**Files:**
- Create: `src/routes/<route>/+page.svelte`, `src/routes/<route>/+page.ts`

- [ ] **Step 1: Write `+page.ts` with `export const prerender = true;`**

- [ ] **Step 2: Write `+page.svelte`** with:
  - `<svelte:head>` containing `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph tags
  - `<h1>` heading
  - Content meeting word target (see table)
  - Schema.org JSON-LD as appropriate (FAQPage for `/faq`)

**Word targets:**

| Route | Min words | Notes |
|-------|----------|-------|
| `/about-phq9` | 1200 | Long-form PHQ-9 reference |
| `/scoring` | 800 | Universal scoring guide across screeners |
| `/interpretation` | 1000 | What bands mean clinically |
| `/faq` | 1500 | 15+ Q&A pairs with FAQPage schema |
| `/crisis` | 600 | Crisis resources US/UK/Canada/Iceland/intl |
| `/disclaimer` | 400 | Not medical advice |
| `/about` | 500 | About the site/maintainer |
| `/contact` | 200 | contact@phq9.online + mailto |
| `/privacy` | 800 | Mentions AdSense, cookies, no PII storage |
| `/terms` | 600 | Standard ToS |
| `/compare` | 600 | Table of all screeners with metadata |
| `/history` | n/a | Interactive page, no word target |

- [ ] **Step 3: Verify word count** (per Task E1 step 2 method) for content pages.

- [ ] **Step 4: Commit per route**

```bash
git add src/routes/<route>/
git commit -m "content: add /<route> page

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

Each route = one task suitable for parallel subagents.

---

### Task E11: History page

**Files:**
- Create: `src/routes/history/+page.svelte`, `src/routes/history/+page.ts`

- [ ] **Step 1: Write `+page.ts`** with `export const prerender = true; export const ssr = false;` (interactive only)

- [ ] **Step 2: Write `+page.svelte`**

```svelte
<script lang="ts">
  import { listAttempts, deleteAttempt, clearAll, exportJson, exportCsv, type Attempt } from '$lib/storage';
  import { settings } from '$lib/stores';
  import * as m from '$lib/paraglide/messages';

  let attempts = $state<Attempt[]>([]);

  $effect(() => { attempts = listAttempts(); });

  function download(filename: string, mime: string, content: string) {
    const blob = new Blob([content], { type: mime });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function toggleOptIn() {
    settings.update((s) => ({ ...s, saveHistory: !s.saveHistory }));
  }
</script>

<svelte:head>
  <title>History — phq9.online</title>
  <meta name="description" content="Your saved screener attempts, stored only on this device." />
  <link rel="canonical" href="https://phq9.online/history" />
  <meta name="robots" content="noindex" />
</svelte:head>

<h1 class="text-3xl font-bold">History</h1>
<p class="mt-2">{m.history_saved()}</p>

<label class="mt-4 flex items-center gap-2">
  <input type="checkbox" checked={$settings.saveHistory} on:change={toggleOptIn} />
  <span>{m.history_optin_label()}</span>
</label>

<div class="mt-6 flex gap-2">
  <button on:click={() => download('phq9-history.json', 'application/json', exportJson())} class="rounded bg-[color:var(--color-accent)] px-3 py-1 text-white">{m.history_export_json()}</button>
  <button on:click={() => download('phq9-history.csv', 'text/csv', exportCsv())} class="rounded bg-[color:var(--color-accent)] px-3 py-1 text-white">{m.history_export_csv()}</button>
  <button on:click={() => { clearAll(); attempts = []; }} class="rounded border px-3 py-1">{m.history_clear_all()}</button>
</div>

<table class="mt-6 w-full text-left text-sm">
  <thead>
    <tr><th>Date</th><th>Screener</th><th>Score</th><th>Band</th><th></th></tr>
  </thead>
  <tbody>
    {#each attempts as a}
      <tr>
        <td>{new Date(a.completedAt).toLocaleString()}</td>
        <td>{a.screenerId}</td>
        <td>{a.score}</td>
        <td>{a.band}</td>
        <td><button on:click={() => { deleteAttempt(a.id); attempts = listAttempts(); }} aria-label="Delete" class="underline">Delete</button></td>
      </tr>
    {/each}
  </tbody>
</table>
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/routes/history/
git commit -m "$(cat <<'EOF'
feat(routes): add /history page with opt-in toggle and export

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task Group F — SEO infra

### Task F1: robots.txt + ads.txt + manifest

**Files:**
- Create: `static/robots.txt`, `static/ads.txt`, `static/manifest.webmanifest`

- [ ] **Step 1: Write `static/robots.txt`**

```
User-agent: *
Allow: /
Disallow: /history

Sitemap: https://phq9.online/sitemap.xml
```

- [ ] **Step 2: Write `static/ads.txt`**

```
google.com, pub-8001142558091314, DIRECT, f08c47fec0942fa0
```

- [ ] **Step 3: Write `static/manifest.webmanifest`**

```json
{
  "name": "phq9.online",
  "short_name": "phq9.online",
  "description": "Free validated mental health self-assessments",
  "start_url": "/",
  "display": "minimal-ui",
  "background_color": "#f8fafc",
  "theme_color": "#0f172a",
  "icons": [
    { "src": "/favicon.svg", "sizes": "any", "type": "image/svg+xml" },
    { "src": "/favicon-32.png", "sizes": "32x32", "type": "image/png" }
  ]
}
```

- [ ] **Step 4: Commit**

```bash
git add static/
git commit -m "$(cat <<'EOF'
feat: add robots.txt, ads.txt, manifest

ads.txt declares pub-8001142558091314 as direct AdSense seller.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task F2: Sitemap generator

**Files:**
- Create: `scripts/build-sitemap.ts`

- [ ] **Step 1: Write `scripts/build-sitemap.ts`**

```ts
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const ORIGIN = 'https://phq9.online';
const routes = [
  { path: '/', priority: 1.0 },
  { path: '/phq-2', priority: 0.9 },
  { path: '/gad-7', priority: 0.9 },
  { path: '/ces-d', priority: 0.9 },
  { path: '/promis-depression', priority: 0.9 },
  { path: '/wsas', priority: 0.9 },
  { path: '/who-5', priority: 0.9 },
  { path: '/about-phq9', priority: 0.8 },
  { path: '/scoring', priority: 0.7 },
  { path: '/interpretation', priority: 0.7 },
  { path: '/faq', priority: 0.8 },
  { path: '/crisis', priority: 0.6 },
  { path: '/disclaimer', priority: 0.3 },
  { path: '/about', priority: 0.4 },
  { path: '/contact', priority: 0.3 },
  { path: '/privacy', priority: 0.3 },
  { path: '/terms', priority: 0.3 },
  { path: '/compare', priority: 0.8 }
];

const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) =>
      `  <url><loc>${ORIGIN}${r.path}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${r.priority}</priority></url>`
  )
  .join('\n')}
</urlset>
`;

mkdirSync('static', { recursive: true });
writeFileSync(join('static', 'sitemap.xml'), xml);
console.log(`Wrote sitemap with ${routes.length} URLs`);
```

- [ ] **Step 2: Run generator**

Run: `npm run sitemap`
Expected: "Wrote sitemap with 18 URLs". `static/sitemap.xml` exists.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat(seo): add sitemap.xml generator

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task F3: llms.txt + llms-full.txt generators

**Files:**
- Create: `scripts/build-llms-txt.ts`

- [ ] **Step 1: Write `scripts/build-llms-txt.ts`**

```ts
import { writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ORIGIN = 'https://phq9.online';

const sections = [
  { title: 'Flagship', items: [{ path: '/', desc: 'PHQ-9 depression screening test (9 items, 0-27 scale)' }] },
  {
    title: 'Screeners',
    items: [
      { path: '/phq-2', desc: 'PHQ-2 (2-item depression quick screen)' },
      { path: '/gad-7', desc: 'GAD-7 (7-item generalized anxiety)' },
      { path: '/ces-d', desc: 'CES-D (20-item NIH epidemiological depression)' },
      { path: '/promis-depression', desc: 'PROMIS Depression Short Form 8a (NIH)' },
      { path: '/wsas', desc: 'Work and Social Adjustment Scale (5-item functional impairment)' },
      { path: '/who-5', desc: 'WHO-5 Wellbeing Index' }
    ]
  },
  {
    title: 'Reference',
    items: [
      { path: '/about-phq9', desc: 'PHQ-9 history, validation, and citations' },
      { path: '/scoring', desc: 'Universal scoring guide' },
      { path: '/interpretation', desc: 'Severity band interpretation' },
      { path: '/faq', desc: 'Frequently asked questions' },
      { path: '/crisis', desc: 'Crisis resources by country' },
      { path: '/compare', desc: 'Side-by-side comparison of all screeners' }
    ]
  },
  {
    title: 'Site',
    items: [
      { path: '/about', desc: 'About this site' },
      { path: '/disclaimer', desc: 'Medical disclaimer' },
      { path: '/privacy', desc: 'Privacy policy' },
      { path: '/terms', desc: 'Terms of service' },
      { path: '/contact', desc: 'Contact' }
    ]
  }
];

const llmsTxt = `# phq9.online

> Free validated mental health self-assessments. Public-domain instruments only, client-side scoring, no PII collection.

${sections
  .map(
    (s) =>
      `## ${s.title}\n\n${s.items.map((i) => `- [${i.desc}](${ORIGIN}${i.path})`).join('\n')}`
  )
  .join('\n\n')}
`;

writeFileSync('static/llms.txt', llmsTxt);

// llms-full.txt: concatenate content of all .svelte files under src/routes minus script/style blocks.
function stripHtml(s: string): string {
  return s
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<svelte:head[\s\S]*?<\/svelte:head>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const routesDir = 'src/routes';
function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = join(dir, e.name);
    if (e.isDirectory()) return walk(full);
    return e.name === '+page.svelte' ? [full] : [];
  });
}

const files = walk(routesDir);
const fullBody = files
  .map((f) => `## ${f.replace(routesDir, '').replace('/+page.svelte', '') || '/'}\n\n${stripHtml(readFileSync(f, 'utf8'))}`)
  .join('\n\n---\n\n');

writeFileSync('static/llms-full.txt', `# phq9.online — full content\n\n${fullBody}`);

console.log(`Wrote llms.txt (${llmsTxt.length} bytes) and llms-full.txt (${fullBody.length} bytes)`);
```

- [ ] **Step 2: Run generator**

Run: `npm run llms`
Expected: success line printed; both files exist.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat(seo): add llms.txt and llms-full.txt generators

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task F4: Favicon + OG image

**Files:**
- Create: `static/favicon.svg`, `static/favicon-32.png`, `static/og-image.png`

- [ ] **Step 1: Write `static/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#0f172a"/>
  <text x="32" y="42" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="28" font-weight="700" fill="#f8fafc">9</text>
</svg>
```

- [ ] **Step 2: Generate PNG icons**

Run: `npx --yes sharp-cli@latest -i static/favicon.svg -o static/favicon-32.png resize 32 32` (or use ImageMagick `convert -size 32x32 static/favicon.svg static/favicon-32.png`).
If neither available, manually export 32×32 PNG and 1200×630 `og-image.png` using any tool. For the OG image, use a 1200×630 canvas with the site name and tagline; commit as a placeholder if needed.

- [ ] **Step 3: Verify files exist**

Run: `ls -lh static/favicon.svg static/favicon-32.png static/og-image.png`
Expected: all three listed.

- [ ] **Step 4: Commit**

```bash
git add static/
git commit -m "$(cat <<'EOF'
feat(seo): add favicon and OG image

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task Group G — Deploy

### Task G1: Dockerfile + Caddyfile

**Files:**
- Create: `Dockerfile`, `Caddyfile`, `.dockerignore`

- [ ] **Step 1: Write `Dockerfile`**

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
ENV PUBLIC_ENABLE_ADS=true
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM caddy:2-alpine
COPY --from=build /app/build /srv
COPY Caddyfile /etc/caddy/Caddyfile
EXPOSE 8080
```

- [ ] **Step 2: Write `Caddyfile`**

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

- [ ] **Step 3: Write `.dockerignore`**

```
node_modules
.svelte-kit
build
.git
.github
docs
tests
playwright-report
test-results
*.log
.env
.env.*
```

- [ ] **Step 4: Build image locally**

Run: `docker build -t phq9-online:local .`
Expected: success. (Skip if Docker not available locally; CI will exercise it.)

- [ ] **Step 5: Run image and curl**

Run: `docker run -d --rm -p 8080:8080 --name phq9 phq9-online:local && sleep 2 && curl -sI http://localhost:8080/ | head -1 && docker stop phq9`
Expected: `HTTP/1.1 200 OK`.

- [ ] **Step 6: Commit**

```bash
git add Dockerfile Caddyfile .dockerignore
git commit -m "$(cat <<'EOF'
build: add Dockerfile, Caddyfile, .dockerignore

Multi-stage build: Node 22 builds static SvelteKit output; Caddy alpine
serves /srv with brotli, gzip, security headers, SPA 404 fallback.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task G2: fly.toml

**Files:**
- Create: `fly.toml`

- [ ] **Step 1: Write `fly.toml`**

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

[[services.tcp_checks]]
  interval = "15s"
  timeout = "2s"
  grace_period = "10s"
```

- [ ] **Step 2: Commit**

```bash
git add fly.toml
git commit -m "$(cat <<'EOF'
build: add fly.toml for 256MB shared-cpu machine

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task G3: GitHub Actions CI

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Write `.github/workflows/ci.yml`**

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run check
      - run: npm run test:unit
      - uses: actions/cache@v4
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ runner.os }}-${{ hashFiles('package-lock.json') }}
      - run: npx playwright install --with-deps chromium
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "$(cat <<'EOF'
ci: add lint + typecheck + unit + e2e workflow

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task G4: GitHub Actions deploy

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Write `.github/workflows/deploy.yml`**

```yaml
name: Deploy
on:
  push:
    branches: [main]
  workflow_run:
    workflows: ["CI"]
    types: [completed]
    branches: [main]

jobs:
  deploy:
    if: github.event_name == 'push' || github.event.workflow_run.conclusion == 'success'
    runs-on: ubuntu-latest
    concurrency: deploy-main
    steps:
      - uses: actions/checkout@v4
      - uses: superfly/flyctl-actions/setup-flyctl@master
      - run: flyctl deploy --remote-only
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

- [ ] **Step 2: Note the required secret**

The user must add `FLY_API_TOKEN` to repo secrets after pushing the repo. Document in `CONTRIBUTING.md` (Task H1).

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "$(cat <<'EOF'
ci: add Fly.io deploy workflow

Requires FLY_API_TOKEN repo secret.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task Group H — Open-source housekeeping

### Task H1: LICENSE + README + CONTRIBUTING

**Files:**
- Create: `LICENSE`, `README.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `.github/ISSUE_TEMPLATE/bug.md`, `.github/ISSUE_TEMPLATE/screener.md`, `.github/pull_request_template.md`

- [ ] **Step 1: Write `LICENSE`** — standard MIT, copyright "2026 nathanib".

- [ ] **Step 2: Write `README.md`** — title, badges (CI status, license, deploy), one-paragraph description, screener list table, screenshot placeholder, "Run locally" (`npm install && npm run dev`), "Deploy your own" link to Fly.io, contributing call-to-action, sponsorship buttons (GitHub Sponsors + Ko-fi), license note.

- [ ] **Step 3: Write `CONTRIBUTING.md`** — how to add a screener (config + landing + test + content), translation workflow, code style, conventional commits, branch protection notes, FLY_API_TOKEN reminder for maintainers.

- [ ] **Step 4: Write `CODE_OF_CONDUCT.md`** — Contributor Covenant v2.1 verbatim.

- [ ] **Step 5: Write `SECURITY.md`** — report to `contact@phq9.online`, no formal SLA, responsible disclosure expected.

- [ ] **Step 6: Write issue + PR templates**

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
docs: add LICENSE (MIT), README, CONTRIBUTING, COC, SECURITY, templates

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task Group I — E2E + a11y + Lighthouse

### Task I1: PHQ-9 happy-path e2e

**Files:**
- Create: `tests/e2e/phq-9-happy-path.spec.ts`

- [ ] **Step 1: Write test**

```ts
import { test, expect } from '@playwright/test';

test('PHQ-9 happy path: answer all 9 → see result', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('PHQ-9');
  for (let i = 0; i < 9; i++) {
    await page.locator(`input[name="q${i}"][value="1"]`).check();
  }
  await page.getByRole('button', { name: /see result/i }).click();
  await expect(page.getByText(/your score/i)).toBeVisible();
  await expect(page.getByText('9')).toBeVisible();
});
```

- [ ] **Step 2: Run**

Run: `npm run test:e2e -- phq-9-happy-path`
Expected: passed.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/phq-9-happy-path.spec.ts
git commit -m "$(cat <<'EOF'
test(e2e): add PHQ-9 happy path

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task I2: Crisis-flag e2e

**Files:**
- Create: `tests/e2e/crisis-flag.spec.ts`

- [ ] **Step 1: Write test**

```ts
import { test, expect } from '@playwright/test';

test('PHQ-9 Q9 ≥ 1 triggers crisis banner and suppresses ads', async ({ page }) => {
  await page.goto('/');
  for (let i = 0; i < 8; i++) {
    await page.locator(`input[name="q${i}"][value="0"]`).check();
  }
  await page.locator('input[name="q8"][value="2"]').check();
  await page.getByRole('button', { name: /see result/i }).click();

  await expect(page.getByRole('alert')).toContainText(/help is available now/i);
  await expect(page.locator('ins.adsbygoogle')).toHaveCount(0);
});
```

- [ ] **Step 2: Run**

Run: `npm run test:e2e -- crisis-flag`
Expected: passed.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/crisis-flag.spec.ts
git commit -m "$(cat <<'EOF'
test(e2e): verify Q9 flag triggers crisis banner and ad suppression

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task I3: History persistence e2e

**Files:**
- Create: `tests/e2e/history.spec.ts`

- [ ] **Step 1: Write test**

```ts
import { test, expect } from '@playwright/test';

test('opt-in history persists across reloads', async ({ page }) => {
  await page.goto('/history');
  await page.getByLabel(/save my attempts/i).check();
  await page.goto('/');
  for (let i = 0; i < 9; i++) {
    await page.locator(`input[name="q${i}"][value="1"]`).check();
  }
  await page.getByRole('button', { name: /see result/i }).click();
  await page.goto('/history');
  await expect(page.getByRole('cell', { name: 'phq-9' })).toBeVisible();
});
```

- [ ] **Step 2: Run**

Run: `npm run test:e2e -- history`
Expected: passed.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/history.spec.ts
git commit -m "$(cat <<'EOF'
test(e2e): verify opt-in history persistence

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task I4: A11y scan e2e (axe-core)

**Files:**
- Create: `tests/e2e/a11y.spec.ts`

- [ ] **Step 1: Write test**

```ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/phq-2', '/gad-7', '/ces-d', '/promis-depression', '/wsas', '/who-5', '/faq', '/crisis', '/about', '/privacy', '/terms', '/history', '/compare', '/disclaimer', '/about-phq9', '/scoring', '/interpretation', '/contact'];

for (const route of routes) {
  test(`a11y: ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}
```

- [ ] **Step 2: Run**

Run: `npm run test:e2e -- a11y`
Expected: all routes pass. If any fail, fix in source (color contrast, missing labels, heading hierarchy) and rerun.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/a11y.spec.ts
git commit -m "$(cat <<'EOF'
test(e2e): add axe-core accessibility scan across all routes

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task I5: Lighthouse CI gate

**Files:**
- Create: `.github/workflows/lighthouse.yml`, `lighthouserc.json`

- [ ] **Step 1: Write `lighthouserc.json`**

```json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:4173/",
        "http://localhost:4173/gad-7",
        "http://localhost:4173/faq"
      ],
      "startServerCommand": "npm run preview -- --port 4173",
      "startServerReadyPattern": "Local"
    },
    "assert": {
      "preset": "lighthouse:no-pwa",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.95 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 1.0 }],
        "categories:best-practices": ["warn", { "minScore": 0.9 }]
      }
    }
  }
}
```

- [ ] **Step 2: Write `.github/workflows/lighthouse.yml`**

```yaml
name: Lighthouse
on:
  pull_request:
  push:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run build
      - run: npx --yes @lhci/cli@0.14.x autorun
```

- [ ] **Step 3: Commit**

```bash
git add lighthouserc.json .github/workflows/lighthouse.yml
git commit -m "$(cat <<'EOF'
ci: gate PRs on Lighthouse perf>=95, a11y>=95, SEO=100

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task Group J — Final integration

### Task J1: .env.example + smoke build with ads enabled

**Files:**
- Create: `.env.example`

- [ ] **Step 1: Write `.env.example`**

```
PUBLIC_ENABLE_ADS=false
```

- [ ] **Step 2: Build with ads enabled to ensure no errors**

Run: `PUBLIC_ENABLE_ADS=true npm run build`
Expected: exit 0. Grep build output for the script tag: `grep -r "ca-pub-8001142558091314" build/` should return matches in HTML files.

- [ ] **Step 3: Commit**

```bash
git add .env.example
git commit -m "$(cat <<'EOF'
chore: add .env.example documenting PUBLIC_ENABLE_ADS

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task J2: Push to GitHub + first Fly deploy

**Files:** none

- [ ] **Step 1: Confirm GitHub remote**

The user will create the public repo `nathanib/phq9-online` on GitHub. Once created:

Run:
```bash
git remote add origin git@github.com:nathanib/phq9-online.git
git push -u origin main
```

- [ ] **Step 2: Create Fly app**

The user will run interactively (or instruct via shell):
```bash
flyctl auth login
flyctl apps create phq9-online --org personal
flyctl certs add phq9.online --app phq9-online
flyctl certs add www.phq9.online --app phq9-online
```

- [ ] **Step 3: Point DNS**

Add A + AAAA records for `phq9.online` and CNAME for `www` → Fly anycast IPs from `flyctl ips list --app phq9-online`.

- [ ] **Step 4: Deploy**

```bash
flyctl deploy --remote-only
```

Expected: build succeeds, deployment becomes healthy. `curl -sI https://phq9.online/` returns 200 with security headers.

- [ ] **Step 5: Submit sitemap to Google Search Console**

User action: add property `https://phq9.online/` in Search Console, verify via DNS TXT or HTML tag, submit `https://phq9.online/sitemap.xml`.

- [ ] **Step 6: Track 30-day indexing window**

Wait until ≥ 10 pages indexed. Use Search Console "Pages" report.

- [ ] **Step 7: Apply for AdSense** (Day ≥ 30, all section 20 spec checklist items green)

User submits via adsense.google.com with publisher ID `ca-pub-8001142558091314`.

- [ ] **Step 8: Commit (none — operational task)**

---

## Self-review summary

Spec section coverage:
- Section 5 (site map): Tasks D1, D2-D7, E2-E10
- Section 6 (screener abstraction): B1, C4, C6
- Section 7 (data model): B10, B11
- Section 8 (Q9 / crisis): C1, C4 (suppress logic), I2
- Section 9 (AdSense): C2, C5 (script tag), F1 (ads.txt)
- Section 10 (SEO): C6, F1, F2, F3, F4, E2-E10 (per-page meta)
- Section 11 (i18n): A3
- Section 12 (theming): A2, C5
- Section 13 (repo layout): all tasks
- Section 14 (deploy): G1, G2, G3, G4
- Section 15 (testing): B2-B11, I1-I5
- Section 16 (phasing): this plan = Phase 0+1 only
- Section 17 (OSS): H1
- Section 20 (AdSense checklist): J2 final verification

No placeholders detected. Types/method names consistent (Screener.score / .bandFor / .flagFired used identically across all configs and tests).

---

**End of plan.**
