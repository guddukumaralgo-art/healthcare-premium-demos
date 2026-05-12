import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const csvPath = path.join(rootDir, 'src/data/leads.csv');
const distDir = path.join(rootDir, 'dist');
const distIndexPath = path.join(distDir, 'index.html');
const distAssetsDir = path.join(distDir, 'assets');
const distImagesDir = path.join(distDir, 'images');
const publishDir = path.join(rootDir, 'publish');
const publishAssetsDir = path.join(publishDir, 'assets');
const publishImagesDir = path.join(publishDir, 'images');
const batchName = process.argv[2] || 'batch_1';

function normalizeBusinessType(value = '') {
  const clean = String(value).trim().toLowerCase().replace(/[_-]+/g, ' ');

  if (/(dentist|dental)/.test(clean)) return 'dentist';
  if (/(dermatologist|dermatology|skin clinic|skin care|aesthetic)/.test(clean)) return 'dermatologist';
  if (/(physio|physiotherapy|physical therapy)/.test(clean)) return 'physiotherapy';
  if (/(diagnostic|diagnostics|diagnostic center|lab|pathology)/.test(clean)) return 'diagnostic-center';
  if (/(ayurveda|ayurvedic|wellness)/.test(clean)) return 'ayurveda';
  if (/(hospital|multi specialty|multispecialty|clinic)/.test(clean)) return 'hospital';

  return 'hospital';
}

function parseCsv(source) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(cell);
      cell = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') index += 1;
      row.push(cell);
      if (row.some(value => value.trim() !== '')) rows.push(row);
      row = [];
      cell = '';
      continue;
    }

    cell += char;
  }

  row.push(cell);
  if (row.some(value => value.trim() !== '')) rows.push(row);

  const headers = rows.shift()?.map(header => header.trim()) || [];
  return rows.map(values => Object.fromEntries(headers.map((header, index) => [header, (values[index] || '').trim()])));
}

function safeSlug(value = '') {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

function safeJson(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c');
}

function titleFor(row) {
  return `${row.clinic_name || 'Healthcare'} | React Premium Demo`;
}

function withHeadTitle(html, title) {
  return html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
}

function injectWindowData(html, assignments) {
  const script = `<script>
${Object.entries(assignments)
  .map(([key, value]) => `  window.${key} = ${safeJson(value)};`)
  .join('\n')}
</script>`;

  return html.replace('</head>', `  ${script}\n</head>`);
}

const source = await readFile(csvPath, 'utf8');
const distIndex = await readFile(distIndexPath, 'utf8');
const rows = parseCsv(source);
const selected = rows
  .filter(row => row.status === 'ready' && row.batch === batchName)
  .map(row => ({ ...row, slug: safeSlug(row.slug || row.clinic_name) }))
  .filter(row => row.slug);

if (!selected.length) {
  console.log(`No ready rows found for ${batchName}.`);
  process.exit(0);
}

await mkdir(publishDir, { recursive: true });

if (existsSync(distAssetsDir)) {
  await mkdir(publishAssetsDir, { recursive: true });
  await cp(distAssetsDir, publishAssetsDir, { recursive: true, force: true });
}

if (existsSync(distImagesDir)) {
  await mkdir(publishImagesDir, { recursive: true });
  await cp(distImagesDir, publishImagesDir, { recursive: true, force: true });
}

for (const row of selected) {
  const outDir = path.join(publishDir, row.slug);
  const page = injectWindowData(withHeadTitle(distIndex, titleFor(row)), {
    __DEMO_SLUG__: row.slug,
    __DEMO_DATA__: row,
  });

  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'index.html'), page, 'utf8');
}

const indexPage = injectWindowData(withHeadTitle(distIndex, 'Healthcare Premium Batch 1 Demos'), {
  __DEMO_BATCH__: batchName,
  __BATCH_INDEX__: selected,
});

await writeFile(path.join(publishDir, 'index.html'), indexPage, 'utf8');

const counts = selected.reduce((acc, row) => {
  const type = normalizeBusinessType(row.business_type);
  acc[type] = (acc[type] || 0) + 1;
  return acc;
}, {});

console.log(`Generated ${selected.length} React demo pages for ${batchName}.`);
console.log('Batch index: publish/index.html');
console.log(`Assets copied: ${existsSync(distAssetsDir) ? 'publish/assets' : 'dist/assets not found'}`);
console.log(`Template counts: ${Object.entries(counts).map(([type, count]) => `${type}=${count}`).join(', ')}`);
