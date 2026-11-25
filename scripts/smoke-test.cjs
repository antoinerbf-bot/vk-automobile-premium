const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const required = [
  'index.html', 'stock.html', 'vehicle.html', 'blog.html', 'article.html', 'reprise.html',
  'services.html', 'contact.html', 'mentions-legales.html',
  'assets/app.js', 'assets/admin.js', 'assets/site.css',
  'data/vehicles.json', 'vercel.json'
];

const errors = [];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) errors.push('Missing required file: ' + file);
}

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

if (!errors.length) {
  for (const file of ['assets/app.js', 'assets/admin.js']) {
    try { new Function(read(file)); }
    catch (error) { errors.push('JavaScript syntax error in ' + file + ': ' + error.message); }
  }

  let vehicles;
  try { vehicles = JSON.parse(read('data/vehicles.json')); }
  catch (error) { errors.push('Invalid data/vehicles.json: ' + error.message); }

  if (vehicles !== undefined) {
    if (!Array.isArray(vehicles)) errors.push('data/vehicles.json must be an array.');
    else {
      const ids = new Set();
      vehicles.forEach((vehicle, index) => {
        const label = 'Vehicle #' + (index + 1);
        if (!vehicle || typeof vehicle !== 'object' || Array.isArray(vehicle)) {
          errors.push(label + ' must be an object.');
          return;
        }
        if (!vehicle.id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(vehicle.id)) errors.push(label + ' needs a unique lowercase slug id.');
        if (ids.has(vehicle.id)) errors.push('Duplicate vehicle id: ' + vehicle.id);
        ids.add(vehicle.id);
        if (vehicle.published === true) {
          for (const field of ['make', 'model', 'fuel', 'transmission']) {
            if (!String(vehicle[field] || '').trim()) errors.push(label + ' is published but has no ' + field + '.');
          }
          for (const field of ['year', 'mileage', 'price']) {
            if (!Number.isFinite(Number(vehicle[field])) || Number(vehicle[field]) < 0) errors.push(label + ' is published but has an invalid ' + field + '.');
          }
          if (!Array.isArray(vehicle.images) || vehicle.images.length === 0) errors.push(label + ' is published without real vehicle photos.');
          else vehicle.images.forEach((url, photoIndex) => {
            try {
              const parsed = new URL(url);
              if (parsed.protocol !== 'https:') errors.push(label + ' photo ' + (photoIndex + 1) + ' must use HTTPS.');
            } catch { errors.push(label + ' photo ' + (photoIndex + 1) + ' is not a valid URL.'); }
          });
        }
      });
    }
  }

  try {
    const config = JSON.parse(read('vercel.json'));
    if (config.outputDirectory !== '.') errors.push('vercel.json outputDirectory must be "." for this static site.');
    if (!Array.isArray(config.rewrites) || !config.rewrites.some(rule => rule.source === '/blog/:slug' && rule.destination === '/article.html?slug=:slug')) errors.push('Vercel blog article rewrite is missing.');
  } catch (error) { errors.push('Invalid vercel.json: ' + error.message); }

  const pages = {
    'index.html': 'home',
    'stock.html': 'stock',
    'vehicle.html': 'vehicle',
    'reprise.html': 'trade',
    'services.html': 'services',
    'contact.html': 'contact',
    'mentions-legales.html': 'legal',
    'blog.html': 'blog',
    'article.html': 'article'
  };
  for (const [file, page] of Object.entries(pages)) {
    const html = read(file);
    if (!html.includes('data-page="' + page + '"')) errors.push(file + ' has an incorrect data-page route.');
    if (!html.includes('assets/app.js')) errors.push(file + ' does not load assets/app.js.');
    if (!html.includes('assets/site.css')) errors.push(file + ' does not load assets/site.css.');
  }
}

if (errors.length) {
  console.error('\nVK Automobile smoke test failed:\n- ' + errors.join('\n- ') + '\n');
  process.exit(1);
}
console.log('VK Automobile smoke test passed. Required pages, scripts, configuration and vehicle data are valid.');
