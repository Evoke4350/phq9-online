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
