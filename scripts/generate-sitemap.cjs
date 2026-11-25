const fs = require('node:fs');
const host = (process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || '').replace(/^https?:\\/\\//, '').replace(/\\/$/, '');
const robots = [
  'User-agent: *',
  'Allow: /',
  'Disallow: /data/',
  'Disallow: /admin-stock.html',
  'Disallow: /assets/admin.js'
];
if (host) {
  const origin = 'https://' + host;
  const routes = ['/', '/stock', '/reprise', '/services', '/contact', '/mentions-legales'];
  const langs = ['fr', 'nl', 'de'];
  const urls = [];
  for (const route of routes) {
    for (const lang of langs) {
      const loc = origin + route + '?lang=' + lang;
      const alternates = langs.map(l => '<xhtml:link rel="alternate" hreflang="' + l + '" href="' + origin + route + '?lang=' + l + '"/>').join('');
      urls.push('<url><loc>' + loc + '</loc>' + alternates + '</url>');
    }
  }
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\\n' +
    urls.join('\\n') + '\\n</urlset>\\n';
  fs.writeFileSync('sitemap.xml', xml, 'utf8');
  robots.push('Sitemap: ' + origin + '/sitemap.xml');
} else {
  console.warn('No Vercel domain env found; sitemap.xml is not generated.');
}
fs.writeFileSync('robots.txt', robots.join('\\n') + '\\n', 'utf8');
