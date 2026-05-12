import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  FlaskConical,
  HeartPulse,
  Hospital,
  Layers,
  Leaf,
  Search,
  ShieldCheck,
  Smile,
  Sparkles,
} from 'lucide-react';
import leadsCsv from './data/leads.csv?raw';
import { templateComponentByBusinessType } from './templates/index.js';
import { disclaimer, normalizeDemoRow, readyRowsForAllBatches } from './utils/demoData.js';

/* ── Filter definitions ───────────────────────────────────── */
const typeFilters = [
  { key: 'all',                label: 'All types',   icon: Sparkles    },
  { key: 'dentist',            label: 'Dentist',      icon: Smile       },
  { key: 'dermatologist',      label: 'Dermatology',  icon: HeartPulse  },
  { key: 'physiotherapy',      label: 'Physio',       icon: Activity    },
  { key: 'diagnostic-center',  label: 'Diagnostic',   icon: FlaskConical },
  { key: 'hospital',           label: 'Hospital',     icon: Hospital    },
  { key: 'ayurveda',           label: 'Ayurveda',     icon: Leaf        },
];

const ALL_BATCH_KEYS = ['batch_1', 'batch_2', 'batch_3', 'batch_4', 'batch_5', 'batch_6'];

const batchLabels = {
  batch_1: 'Batch 1',
  batch_2: 'Batch 2',
  batch_3: 'Batch 3',
  batch_4: 'Batch 4',
  batch_5: 'Batch 5',
  batch_6: 'Batch 6',
};

/* ── Type styling ─────────────────────────────────────────── */
const typeColors = {
  dentist:             { bg: 'bg-cyan-50',    text: 'text-cyan-800',    dot: 'bg-cyan-400'    },
  dermatologist:       { bg: 'bg-purple-50',  text: 'text-purple-800',  dot: 'bg-purple-400'  },
  physiotherapy:       { bg: 'bg-emerald-50', text: 'text-emerald-800', dot: 'bg-emerald-500' },
  'diagnostic-center': { bg: 'bg-sky-50',     text: 'text-sky-800',     dot: 'bg-sky-400'     },
  hospital:            { bg: 'bg-teal-50',    text: 'text-teal-800',    dot: 'bg-teal-500'    },
  ayurveda:            { bg: 'bg-lime-50',    text: 'text-lime-800',    dot: 'bg-lime-500'    },
};

const typeLabels = {
  dentist:             'Dentist',
  dermatologist:       'Dermatology',
  physiotherapy:       'Physiotherapy',
  'diagnostic-center': 'Diagnostic',
  hospital:            'Hospital / Clinic',
  ayurveda:            'Ayurveda',
};

const batchColors = [
  'bg-blue-50 text-blue-700',
  'bg-violet-50 text-violet-700',
  'bg-rose-50 text-rose-700',
  'bg-amber-50 text-amber-700',
  'bg-green-50 text-green-700',
  'bg-pink-50 text-pink-700',
];

/* ── Motion ───────────────────────────────────────────────── */
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.04 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

/* ── BatchIndex component ─────────────────────────────────── */
function BatchIndex({ rows }) {
  const [activeType,  setActiveType]  = useState('all');
  const [activeBatch, setActiveBatch] = useState('all');
  const [query, setQuery] = useState('');

  /* Counts for chips */
  const batchCounts = useMemo(() =>
    rows.reduce((acc, r) => { acc[r.batch] = (acc[r.batch] || 0) + 1; return acc; }, {}),
  [rows]);

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(row => {
      const matchType  = activeType  === 'all' || row.businessType === activeType;
      const matchBatch = activeBatch === 'all' || row.batch === activeBatch;
      const matchQuery = !q || [row.clinicName, row.city, row.specialty, row.originalBusinessType, row.batch]
        .join(' ').toLowerCase().includes(q);
      return matchType && matchBatch && matchQuery;
    });
  }, [activeType, activeBatch, query, rows]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#f8fdff] text-slate-950">

      {/* Disclaimer */}
      <div className="border-b border-cyan-100/70 bg-gradient-to-r from-cyan-50/80 via-white to-violet-50/80">
        <div className="mx-auto flex max-w-7xl justify-center px-4 py-2.5 sm:px-6">
          <p className="rounded-full border border-slate-100 bg-white/90 px-4 py-1.5 text-center text-xs font-medium text-slate-500 shadow-sm">
            {disclaimer}
          </p>
        </div>
      </div>

      <main className="relative px-4 pb-32 pt-16 sm:px-6 lg:px-8">
        {/* Background blobs */}
        <div className="premium-blob animate-float pointer-events-none absolute -left-24 top-20 h-80 w-[28rem] bg-cyan-200/35" />
        <div className="premium-blob animate-float-delayed pointer-events-none absolute -right-32 top-24 h-96 w-[30rem] bg-violet-200/25" />

        <section className="relative mx-auto max-w-7xl">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl"
          >
            {/* Live badge */}
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="animate-bounce-subtle inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/88 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-teal-800 shadow-card"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
              </span>
              <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
              {rows.length} live demos · 6 batches
            </motion.p>

            <h1 className="mt-7 text-[2.75rem] font-bold leading-[1.02] tracking-[-0.025em] text-slate-950 sm:text-[3.75rem] lg:text-[5rem]">
              Premium healthcare demos
              <br />
              <span
                className="bg-gradient-to-r from-cyan-700 via-teal-600 to-violet-700 bg-clip-text text-transparent"
                style={{ backgroundSize: '200% auto', animation: 'shimmer 5s linear infinite' }}
              >
                with animated glass design.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.85] text-slate-500">
              {rows.length} clinic demo pages generated from CSV — each with Framer Motion animations, glassmorphism cards, and a business-type template system. Batches 1–6 live together.
            </p>

            {/* Batch breakdown chips */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {ALL_BATCH_KEYS.map((b, i) => (
                <span
                  key={b}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${batchColors[i]}`}
                >
                  {batchLabels[b]} · {batchCounts[b] ?? 0}
                </span>
              ))}
              <span className="rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-600">
                Total · {rows.length}
              </span>
            </motion.div>
          </motion.div>

          {/* ── Sticky filter bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="sticky top-3 z-20 mt-10 space-y-3 rounded-[1.75rem] border border-white/80 bg-white/85 p-4 shadow-premium backdrop-blur-2xl"
          >
            {/* Search */}
            <label className="flex min-h-12 items-center gap-3 rounded-full border border-slate-100 bg-white/95 px-4 shadow-sm transition-shadow duration-200 focus-within:ring-2 focus-within:ring-cyan-200">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
                placeholder="Search clinic, city, specialty, batch…"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="shrink-0 rounded-full p-1 text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </label>

            {/* Business-type filter */}
            <div className="flex flex-wrap gap-2">
              {typeFilters.map(f => {
                const Icon = f.icon;
                const active = activeType === f.key;
                return (
                  <motion.button
                    key={f.key}
                    type="button"
                    onClick={() => setActiveType(f.key)}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
                      active
                        ? 'bg-slate-950 text-white shadow-md'
                        : 'border border-slate-100 bg-white/80 text-slate-600 hover:border-cyan-100 hover:text-cyan-700'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {f.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Batch filter */}
            <div className="flex flex-wrap gap-2">
              <motion.button
                type="button"
                onClick={() => setActiveBatch('all')}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
                  activeBatch === 'all'
                    ? 'bg-slate-950 text-white shadow-md'
                    : 'border border-slate-100 bg-white/80 text-slate-500 hover:border-slate-200'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                All batches
              </motion.button>
              {ALL_BATCH_KEYS.map((b, i) => (
                <motion.button
                  key={b}
                  type="button"
                  onClick={() => setActiveBatch(b)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
                    activeBatch === b
                      ? 'bg-slate-950 text-white shadow-md'
                      : `border border-slate-100 bg-white/80 text-slate-500 hover:border-slate-200 ${batchColors[i]}`
                  }`}
                >
                  {batchLabels[b]}
                  <span className="opacity-60">· {batchCounts[b] ?? 0}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Results count */}
          <motion.p
            key={`${filteredRows.length}-${activeType}-${activeBatch}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 text-sm font-medium text-slate-400"
          >
            {filteredRows.length} demo{filteredRows.length !== 1 ? 's' : ''} found
            {activeType !== 'all' && ` · ${typeFilters.find(f => f.key === activeType)?.label}`}
            {activeBatch !== 'all' && ` · ${batchLabels[activeBatch]}`}
          </motion.p>

          {/* ── Card grid ── */}
          {filteredRows.length > 0 ? (
            <motion.section
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
              {filteredRows.map((row, idx) => {
                const c = typeColors[row.businessType] || { bg: 'bg-slate-50', text: 'text-slate-700', dot: 'bg-slate-400' };
                const batchIdx = ALL_BATCH_KEYS.indexOf(row.batch);
                const batchChipClass = batchColors[batchIdx] || 'bg-slate-50 text-slate-600';
                return (
                  <motion.article
                    key={row.slug}
                    variants={fadeUp}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="group relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/88 p-6 shadow-card backdrop-blur-sm transition-shadow hover:shadow-premium"
                  >
                    {/* Hover accent line */}
                    <div className="absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-cyan-300 via-teal-300 to-violet-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Tags row */}
                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-flex items-center gap-1.5 rounded-full ${c.bg} px-3 py-1.5 text-xs font-semibold ${c.text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
                        {typeLabels[row.businessType] || 'Healthcare'}
                      </span>
                      <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${batchChipClass}`}>
                        {batchLabels[row.batch] || row.batch}
                      </span>
                      {row.cityShort && (
                        <span className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-500">
                          {row.cityShort}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <h2 className="mt-5 text-[1.2rem] font-semibold leading-tight tracking-tight text-slate-950">
                      {row.clinicName}
                    </h2>
                    <p className="mt-2 text-[13px] leading-[1.65] text-slate-500 line-clamp-2">{row.specialty}</p>
                    <p className="mt-1 text-[12px] text-slate-400">{row.city}</p>

                    {/* CTA */}
                    <a
                      href={row.pageUrl}
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-950 to-slate-800 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:from-cyan-700 hover:to-teal-600"
                    >
                      Open demo
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </motion.article>
                );
              })}
            </motion.section>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-24 text-center text-slate-400"
            >
              <Sparkles className="mx-auto mb-4 h-10 w-10 opacity-25" />
              <p className="text-lg font-medium">No demos match your filters.</p>
              <button
                type="button"
                onClick={() => { setActiveType('all'); setActiveBatch('all'); setQuery(''); }}
                className="mt-4 text-sm text-cyan-600 hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </section>
      </main>
    </div>
  );
}

/* ── Root app router ──────────────────────────────────────── */
function App() {
  const injectedDemo = typeof window !== 'undefined' ? window.__DEMO_DATA__  : null;
  const injectedRows = typeof window !== 'undefined' ? window.__BATCH_INDEX__ : null;

  if (injectedDemo) {
    const clinic   = normalizeDemoRow(injectedDemo);
    const Template = templateComponentByBusinessType[clinic.businessType]
                  || templateComponentByBusinessType.hospital;
    return <Template clinic={clinic} />;
  }

  const rows =
    Array.isArray(injectedRows) && injectedRows.length
      ? injectedRows.map(normalizeDemoRow)
      : readyRowsForAllBatches(leadsCsv);

  return <BatchIndex rows={rows} />;
}

export default App;
