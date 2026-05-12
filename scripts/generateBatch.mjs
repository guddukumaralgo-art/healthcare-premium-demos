import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir   = path.resolve(__dirname, '..');
const csvPath   = path.join(rootDir, 'src/data/leads.csv');
const distDir   = path.join(rootDir, 'dist');
const distIndexPath  = path.join(distDir, 'index.html');
const distAssetsDir  = path.join(distDir, 'assets');
const distImagesDir  = path.join(distDir, 'images');
const publishDir     = path.join(rootDir, 'publish');
const publishAssetsDir = path.join(publishDir, 'assets');
const publishImagesDir = path.join(publishDir, 'images');

const ALL_BATCHES = ['batch_1', 'batch_2', 'batch_3', 'batch_4', 'batch_5', 'batch_6'];

const batchArg = process.argv[2] || 'all';

function normalizeBusinessType(value = '') {
  const clean = String(value).trim().toLowerCase().replace(/[_-]+/g, ' ');
  if (/(dentist|dental)/.test(clean))                                        return 'dentist';
  if (/(dermatologist|dermatology|skin clinic|skin care|aesthetic)/.test(clean)) return 'dermatologist';
  if (/(physio|physiotherapy|physical therapy)/.test(clean))                 return 'physiotherapy';
  if (/(diagnostic|diagnostics|diagnostic center|lab|pathology)/.test(clean)) return 'diagnostic-center';
  if (/(ayurveda|ayurvedic|wellness)/.test(clean))                           return 'ayurveda';
  return 'hospital';
}

function parseCsv(source) {
  const rows = [];
  let row = [], cell = '', inQuotes = false;
  for (let i = 0; i < source.length; i++) {
    const ch = source[i], nx = source[i + 1];
    if (ch === '"' && inQuotes && nx === '"') { cell += '"'; i++; continue; }
    if (ch === '"') { inQuotes = !inQuotes; continue; }
    if (ch === ',' && !inQuotes) { row.push(cell); cell = ''; continue; }
    if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && nx === '\n') i++;
      row.push(cell);
      if (row.some(v => v.trim() !== '')) rows.push(row);
      row = []; cell = '';
      continue;
    }
    cell += ch;
  }
  row.push(cell);
  if (row.some(v => v.trim() !== '')) rows.push(row);
  const headers = rows.shift()?.map(h => h.trim()) || [];
  return rows.map(vals => Object.fromEntries(headers.map((h, i) => [h, (vals[i] || '').trim()])));
}

function safeSlug(value = '') {
  return String(value).toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 120);
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
  const script = `<script>\n${Object.entries(assignments)
    .map(([k, v]) => `  window.${k} = ${safeJson(v)};`)
    .join('\n')}\n</script>`;
  return html.replace('</head>', `  ${script}\n</head>`);
}

/* Slim row for index — only what the BatchIndex card needs */
function slimRow(row) {
  return {
    slug:          row.slug,
    clinic_name:   row.clinic_name,
    doctor_name:   row.doctor_name,
    specialty:     row.specialty,
    business_type: row.business_type,
    city:          row.city,
    batch:         row.batch,
    phone:         row.phone,
    cta_link:      row.cta_link,
  };
}

/* ── Main ─────────────────────────────────────────────────── */
const source    = await readFile(csvPath, 'utf8');
const distIndex = await readFile(distIndexPath, 'utf8');
const allRows   = parseCsv(source);

await mkdir(publishDir, { recursive: true });

if (existsSync(distAssetsDir)) {
  await mkdir(publishAssetsDir, { recursive: true });
  await cp(distAssetsDir, publishAssetsDir, { recursive: true, force: true });
}
if (existsSync(distImagesDir)) {
  await mkdir(publishImagesDir, { recursive: true });
  await cp(distImagesDir, publishImagesDir, { recursive: true, force: true });
}

if (batchArg === 'all') {
  /* ── ALL BATCHES ── */
  const selected = allRows
    .filter(row => row.status === 'ready' && ALL_BATCHES.includes(row.batch))
    .map(row => ({ ...row, slug: safeSlug(row.slug || row.clinic_name) }))
    .filter(row => row.slug);

  if (!selected.length) {
    console.log('No ready rows found across all batches.');
    process.exit(0);
  }

  /* Generate individual clinic pages */
  for (const row of selected) {
    const outDir = path.join(publishDir, row.slug);
    const page   = injectWindowData(withHeadTitle(distIndex, titleFor(row)), {
      __DEMO_SLUG__: row.slug,
      __DEMO_DATA__: row,
    });
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, 'index.html'), page, 'utf8');
  }

  /* Generate combined index — slim data to keep HTML small */
  const indexPage = injectWindowData(
    withHeadTitle(distIndex, 'Healthcare Premium Demos — All Batches'),
    { __BATCH_INDEX__: selected.map(slimRow) },
  );
  await writeFile(path.join(publishDir, 'index.html'), indexPage, 'utf8');

  /* Report */
  const batchCounts = selected.reduce((acc, r) => { acc[r.batch] = (acc[r.batch] || 0) + 1; return acc; }, {});
  const typeCounts  = selected.reduce((acc, r) => {
    const t = normalizeBusinessType(r.business_type);
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});
  console.log(`Generated ${selected.length} React demo pages across all batches.`);
  console.log('Batch index: publish/index.html');
  console.log('Assets copied: publish/assets');
  console.log('Pages by batch:',  Object.entries(batchCounts).map(([b, n]) => `${b}=${n}`).join(', '));
  console.log('Pages by type:',   Object.entries(typeCounts).map(([t, n]) => `${t}=${n}`).join(', '));

} else {
  /* ── SINGLE BATCH ── */
  const batchName = batchArg;

  if (!ALL_BATCHES.includes(batchName)) {
    console.error(`Unknown batch "${batchName}". Valid: ${ALL_BATCHES.join(', ')} or "all".`);
    process.exit(1);
  }

  const selected = allRows
    .filter(row => row.status === 'ready' && row.batch === batchName)
    .map(row => ({ ...row, slug: safeSlug(row.slug || row.clinic_name) }))
    .filter(row => row.slug);

  if (!selected.length) {
    console.log(`No ready rows found for ${batchName}.`);
    process.exit(0);
  }

  for (const row of selected) {
    const outDir = path.join(publishDir, row.slug);
    const page   = injectWindowData(withHeadTitle(distIndex, titleFor(row)), {
      __DEMO_SLUG__: row.slug,
      __DEMO_DATA__: row,
    });
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, 'index.html'), page, 'utf8');
  }

  /* Update index with this batch only (or rebuild full index if it exists) */
  /* Re-generate full index so root page stays complete */
  const allSelected = allRows
    .filter(row => row.status === 'ready' && ALL_BATCHES.includes(row.batch))
    .map(row => ({ ...row, slug: safeSlug(row.slug || row.clinic_name) }))
    .filter(row => row.slug);

  const indexPage = injectWindowData(
    withHeadTitle(distIndex, 'Healthcare Premium Demos — All Batches'),
    { __BATCH_INDEX__: allSelected.map(slimRow) },
  );
  await writeFile(path.join(publishDir, 'index.html'), indexPage, 'utf8');

  const typeCounts = selected.reduce((acc, r) => {
    const t = normalizeBusinessType(r.business_type);
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});
  console.log(`Generated ${selected.length} React demo pages for ${batchName}.`);
  console.log('Batch index: publish/index.html');
  console.log('Assets copied: publish/assets');
  console.log(`Template counts: ${Object.entries(typeCounts).map(([t, n]) => `${t}=${n}`).join(', ')}`);
}
