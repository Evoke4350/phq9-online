# phq9.online

[![CI](https://github.com/Evoke4350/phq9-online/actions/workflows/ci.yml/badge.svg)](https://github.com/Evoke4350/phq9-online/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Free, ad-supported, open-source web app hosting **PHQ-9** and six companion public-domain mental health screeners.

## Why this site exists

Clinical screening tools improve mental health outcomes — but only when people can access them easily. Every instrument hosted here is in the public domain or has been released for unrestricted use, so there are no licensing barriers to building or maintaining the site. No account is required, no personally identifiable information is collected or transmitted, and all scoring happens client-side in the browser. The site is sustained by unintrusive advertising rather than paywalls or data monetisation.

## Screeners hosted

| Instrument | Domain | Items | Citation |
| --- | --- | --- | --- |
| PHQ-9 | Depression | 9 | Kroenke et al., 2001 |
| PHQ-2 | Depression quick screen | 2 | Kroenke et al., 2003 |
| GAD-7 | Anxiety | 7 | Spitzer et al., 2006 |
| CES-D | Depression (epidemiologic) | 20 | Radloff, 1977 |
| PROMIS Depression 8a | Depression (NIH) | 8 | Pilkonis et al., 2011 |
| WSAS | Functional impairment | 5 | Mundt et al., 2002 |
| WHO-5 | Wellbeing | 5 | WHO, 1998 |

## Run locally

```
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build for production

```
npm run build
```

The build script runs the sitemap and llms.txt generators as a `prebuild` step before invoking Vite. Output lands in `build/`.

Set `PUBLIC_ENABLE_ADS=true` to include the AdSense script in the production build. Local dev never loads ads.

## Deploy

Designed for [Fly.io](https://fly.io). See `Dockerfile`, `Caddyfile`, and `fly.toml`.

**Quick deploy:**

1. Install [flyctl](https://fly.io/docs/hands-on/install-flyctl/).
2. `fly auth login`
3. `fly launch` (or `fly deploy` if the app already exists).

The `Dockerfile` performs a multi-stage build: Node 22 alpine builds the static SvelteKit output with `PUBLIC_ENABLE_ADS=true`; Caddy 2 alpine serves `/srv` with zstd/gzip compression, HSTS, CSP, and a 404 fallback for unknown paths.

The GitHub Actions deploy workflow (`.github/workflows/deploy.yml`) deploys automatically on every push to `main` once the `FLY_API_TOKEN` repository secret is set.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Translations and additional public-domain screeners are welcome.

## Code of Conduct

This project follows the [Contributor Covenant v2.1](CODE_OF_CONDUCT.md).

## Security

See [SECURITY.md](SECURITY.md) for how to report vulnerabilities.

## License

MIT. See [LICENSE](LICENSE).

## Sponsor

[GitHub Sponsors](https://github.com/sponsors/Evoke4350) · Ko-fi (link tbd)
