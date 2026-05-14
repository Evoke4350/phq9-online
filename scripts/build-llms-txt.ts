import { writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ORIGIN = 'https://phq9.online';

const sections = [
  {
    title: 'Flagship',
    items: [{ path: '/', desc: 'PHQ-9 depression screening test (9 items, 0-27 scale)' }]
  },
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
    (s) => `## ${s.title}\n\n${s.items.map((i) => `- [${i.desc}](${ORIGIN}${i.path})`).join('\n')}`
  )
  .join('\n\n')}
`;

writeFileSync('static/llms.txt', llmsTxt);

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
  .map(
    (f) =>
      `## ${f.replace(routesDir, '').replace('/+page.svelte', '') || '/'}\n\n${stripHtml(readFileSync(f, 'utf8'))}`
  )
  .join('\n\n---\n\n');

writeFileSync('static/llms-full.txt', `# phq9.online — full content\n\n${fullBody}`);

console.log(
  `Wrote llms.txt (${llmsTxt.length} bytes) and llms-full.txt (${fullBody.length} bytes)`
);
