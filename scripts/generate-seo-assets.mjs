import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = resolve(__dirname, '../apps/web/public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const rawSiteUrl = process.env.VITE_SITE_URL || 'https://syntaxgym.online';
const siteUrl = rawSiteUrl.replace(/\/$/, '');

// Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

fs.writeFileSync(resolve(publicDir, 'robots.txt'), robotsTxt, 'utf-8');
console.log(`Generated robots.txt in ${publicDir} pointing to ${siteUrl}`);

// Generate sitemap.xml
const routes = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/practice', changefreq: 'daily', priority: '0.9' },
  { path: '/snippets', changefreq: 'weekly', priority: '0.8' },
  { path: '/docs', changefreq: 'weekly', priority: '0.8' },
  { path: '/docs/what-is-syntaxgym', changefreq: 'monthly', priority: '0.8' },
  { path: '/docs/rust-typing-practice', changefreq: 'monthly', priority: '0.8' },
];

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

for (const route of routes) {
  sitemapXml += `  <url>
    <loc>${siteUrl}${route.path === '/' ? '' : route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
}

sitemapXml += `</urlset>
`;

fs.writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
console.log(`Generated sitemap.xml in ${publicDir} with domain ${siteUrl}`);
