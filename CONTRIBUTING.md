# Contributing

Thank you for considering a contribution to phq9.online. This document explains how to add a screener, add a translation, and follow the project's coding and commit conventions.

---

## Table of contents

1. [Adding a screener](#adding-a-screener)
2. [Adding a translation](#adding-a-translation)
3. [Code style](#code-style)
4. [Commit conventions](#commit-conventions)
5. [Branch protection](#branch-protection)
6. [Maintainer notes](#maintainer-notes)

---

## Adding a screener

Only instruments that are **public domain or explicitly licensed for unrestricted use** may be added. When in doubt, include a link to the licence or the publication that confirms public-domain status in your pull request.

### Steps

1. **Create a config file** in `src/lib/screeners/`.

   Model the file on an existing screener, e.g. `src/lib/screeners/gad-7.ts`. Export a `Screener` object (see `src/lib/screeners/types.ts` for the full type).

2. **Register the screener** in `src/lib/screeners/registry.ts`.

   Add an import and append the object to the exported array.

3. **Add a route** under `src/routes/`.

   Create `src/routes/<slug>/+page.svelte`. Use `ScreenerLanding` and `Screener` components; copy the pattern from an existing screener route.

4. **Write a landing page** of at least 800 words.

   The page must include: a plain-language description of the instrument, its validated use cases, how to interpret scores, a citation, and a clear disclaimer that the tool is for informational purposes only and does not constitute medical advice.

5. **Write Vitest unit tests**.

   Place tests in `src/lib/screeners/__tests__/` (or co-located). Cover at minimum: scoring algorithm boundary conditions, all band labels, and the flagged-item logic where applicable.

6. **Confirm the licence** in your PR description.

   Provide a URL to the original publication or an official instrument page that states the licensing terms. PRs adding instruments without clear public-domain evidence will not be merged.

---

## Adding a translation

Translations are managed with [Paraglide](https://inlang.com/m/gerre34r/library-inlang-paraglideJs).

1. Add a new messages file under `messages/`, e.g. `messages/fr.json`, mirroring the structure of `messages/en.json`.
2. Run `npm run dev` — Paraglide will pick up the new locale automatically.
3. Submit a pull request with only the new messages file plus any route-level copy changes.

If you are not a native speaker of the target language, note that in the PR so a reviewer can arrange a proof-read.

---

## Code style

The project uses ESLint, Prettier, and `svelte-check`. Before opening a PR, run:

```
npm run lint      # ESLint + Prettier check
npm run check     # svelte-check (TypeScript + Svelte diagnostics)
npm run test:unit # Vitest unit tests
npm run test:e2e  # Playwright end-to-end tests (requires a running dev server)
```

All four checks must pass without errors. Warnings in `svelte-check` output for Svelte 5 event directive deprecations that exist in the current codebase are known and do not block merges, but new code should use the `on<event>` attribute syntax rather than `on:<event>` directives.

---

## Commit conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/).

Common types:

| Type | Use for |
| --- | --- |
| `feat` | New screener, new page, new feature |
| `fix` | Bug fixes |
| `content` | Copy, wording, or information updates |
| `ci` | CI/CD workflow changes |
| `build` | Dockerfile, fly.toml, Vite config changes |
| `docs` | README, CONTRIBUTING, and other documentation |
| `test` | Adding or fixing tests |
| `refactor` | Code changes that are neither features nor bug fixes |
| `chore` | Dependency updates, tooling |

Subject line: imperative mood, lowercase, no trailing full stop, ≤72 characters.

---

## Branch protection

The `main` branch requires a passing CI run before merging. Direct pushes to `main` are restricted to maintainers. Open a pull request against `main` for all contributions.

---

## Maintainer notes

- The `FLY_API_TOKEN` repository secret must be set to enable automatic deploys via the GitHub Actions deploy workflow.
- The CI workflow caches Playwright browsers by `package-lock.json` hash. If end-to-end tests start timing out in CI after a dependency update, clear the `playwright-*` cache entry.
- AdSense is loaded only when `PUBLIC_ENABLE_ADS=true` is set at build time. The Dockerfile sets this env var so production builds always include the script; local dev does not.
