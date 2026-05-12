import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  FlaskConical,
  HeartPulse,
  Hospital,
  Leaf,
  Search,
  ShieldCheck,
  Smile,
  Sparkles,
} from 'lucide-react';
import leadsCsv from './data/leads.csv?raw';
import { templateComponentByBusinessType } from './templates/index.js';
import { disclaimer, normalizeDemoRow, readyRowsForBatch } from './utils/demoData.js';

const filters = [
  { key: 'all',               label: 'All',        icon: Sparkles   },
  { key: 'dentist',           label: 'Dentist',     icon: Smile      },
  { key: 'dermatologist',     label: 'Dermatology', icon: HeartPulse },
  { key: 'physiotherapy',     label: 'Physio',      icon: Activity   },
  { key: 'diagnostic-center', label: 'Diagnostic',  icon: FlaskConical },
  { key: 'hospital',          label: 'Hospital',    icon: Hospital   },
  { key: 'ayurveda',          label: 'Ayurveda',    icon: Leaf       },
];

const typeColors = {
  dentist:            { bg: 'bg-cyan-50',    text: 'text-cyan-800',    dot: 'bg-cyan-400'    },
  dermatologist:      { bg: 'bg-purple-50',  text: 'text-purple-800',  dot: 'bg-purple-400'  },
  physiotherapy:      { bg: 'bg-emerald-50', text: 'text-emerald-800', dot: 'bg-emerald-500' },
  'diagnostic-center':{ bg: 'bg-sky-50',     text: 'text-sky-800',     dot: 'bg-sky-400'     },
  hospital:           { bg: 'bg-teal-50',    text: 'text-teal-800',    dot: 'bg-teal-500'    },
  ayurveda:           { bg: 'bg-lime-50',    text: 'text-lime-800',    dot: 'bg-lime-500'    },
};

const labels = {
  dentist:             'Dentist',
  dermatologist:       'Dermatology',
  physiotherapy:       'Physiotherapy',
  'diagnostic-center': 'Diagnostic',
  hospital:            'Hospital',
  ayurveda:            'Ayurveda',
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function BatchIndex({ rows }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [query, setQuery] = useState('');

  const filteredRows = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    return rows.filter(row => {
      const matchesType = activeFilter === 'all' || row.businessType === activeFilter;
      const matchesQuery =
        !cleanQuery ||
        [row.clinicName, row.city, row.specialty, row.originalBusinessType]
          .join(' ')
          .toLowerCase()
          .includes(cleanQuery);
      return matchesType && matchesQuery;
    });
  }, [activeFilter, query, rows]);

  const colors = typeColors;

  return (
    <div className="min-h-screen overflow-hidden bg-[#f8fdff] text-slate-950">
      {/* Disclaimer banner */}
      <div className="border-b border-cyan-100/70 bg-gradient-to-r from-cyan-50/80 via-white to-violet-50/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl justify-center px-4 py-2.5 sm:px-6 lg:px-8">
          <p className="rounded-full border border-slate-100 bg-white/90 px-4 py-1.5 text-center text-xs font-medium text-slate-500 shadow-sm">
            {disclaimer}
          </p>
        </div>
      </div>

      <main className="relative px-4 pb-28 pt-16 sm:px-6 lg:px-8">
        {/* Background blobs */}
        <div className="premium-blob animate-float absolute -left-24 top-20 h-80 w-[28rem] bg-cyan-200/40 pointer-events-none" />
        <div className="premium-blob animate-float-delayed absolute right-[-9rem] top-24 h-96 w-[30rem] bg-violet-200/30 pointer-events-none" />
        <div className="premium-blob animate-float-slow absolute bottom-20 left-1/2 h-72 w-[28rem] bg-teal-200/25 pointer-events-none" />

        <section className="relative mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="animate-bounce-subtle inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 shadow-card backdrop-blur-xl"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
              </span>
              <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
              batch_1 · {rows.length} live demos
            </motion.p>

            <h1 className="mt-8 max-w-5xl text-[2.8rem] font-semibold leading-[1.02] tracking-tight text-slate-950 sm:text-6xl lg:text-[5.2rem]">
              Premium healthcare demos
              <br />
              <span
                className="bg-gradient-to-r from-cyan-700 via-teal-600 to-violet-700 bg-clip-text text-transparent"
                style={{ backgroundSize: '200% auto', animation: 'shimmer 5s linear infinite' }}
              >
                with animated glass design.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-500 sm:text-xl sm:leading-9">
              Browse generated pages from the CSV. Each clinic page loads the same Vite React bundle with Framer Motion animations, glass cards, and a business-type template system.
            </p>
          </motion.div>

          {/* Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="sticky top-3 z-20 mt-10 rounded-[1.7rem] border border-white/80 bg-white/80 p-3 shadow-premium backdrop-blur-2xl"
          >
            <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
              <label className="flex min-h-12 items-center gap-3 rounded-full border border-slate-100 bg-white/90 px-4 shadow-sm ring-0 focus-within:ring-2 focus-within:ring-cyan-200 transition-shadow duration-200">
                <Search className="h-4 w-4 shrink-0 text-slate-400" />
                <input
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
                  placeholder="Search by clinic, city, or specialty…"
                />
              </label>

              <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
                {filters.map(filter => {
                  const Icon = filter.icon;
                  const isActive = activeFilter === filter.key;
                  return (
                    <motion.button
                      key={filter.key}
                      type="button"
                      onClick={() => setActiveFilter(filter.key)}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-250 ${
                        isActive
                          ? 'bg-gradient-to-r from-slate-950 to-slate-800 text-white shadow-lg shadow-slate-900/15'
                          : 'border border-slate-100 bg-white/80 text-slate-600 hover:border-cyan-100 hover:text-cyan-700'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {filter.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Results count */}
          <motion.p
            key={filteredRows.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 text-sm font-medium text-slate-400"
          >
            {filteredRows.length} demo{filteredRows.length !== 1 ? 's' : ''} found
          </motion.p>

          {/* Clinic card grid */}
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="relative mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {filteredRows.map((row) => {
              const c = colors[row.businessType] || { bg: 'bg-slate-50', text: 'text-slate-700', dot: 'bg-slate-400' };
              return (
                <motion.article
                  key={row.slug}
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.22 } }}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/82 p-6 shadow-card backdrop-blur-xl hover:shadow-premium"
                >
                  {/* Hover gradient top line */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-300 via-teal-300 to-violet-400 opacity-0 transition duration-300 group-hover:opacity-100" />

                  {/* Tags row */}
                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full ${c.bg} px-3 py-1.5 text-xs font-semibold ${c.text}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
                      {labels[row.businessType] || 'Healthcare'}
                    </span>
                    <span className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium capitalize text-slate-500">
                      {row.originalBusinessType || row.businessType}
                    </span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                      {row.cityShort}
                    </span>
                  </div>

                  {/* Clinic info */}
                  <h2 className="mt-5 text-xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-2xl">
                    {row.clinicName}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{row.specialty}</p>
                  <p className="mt-1 text-sm text-slate-400">{row.city}</p>

                  {/* CTA */}
                  <a
                    href={row.pageUrl}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-950 to-slate-800 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:from-cyan-700 hover:to-cyan-600"
                  >
                    Open demo
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </motion.article>
              );
            })}
          </motion.section>

          {filteredRows.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-20 text-center text-slate-400"
            >
              <Sparkles className="mx-auto mb-4 h-10 w-10 opacity-30" />
              <p className="text-lg font-medium">No demos match your search.</p>
            </motion.div>
          )}
        </section>
      </main>
    </div>
  );
}

function App() {
  const injectedDemo = typeof window !== 'undefined' ? window.__DEMO_DATA__ : null;
  const injectedRows = typeof window !== 'undefined' ? window.__BATCH_INDEX__ : null;

  if (injectedDemo) {
    const clinic = normalizeDemoRow(injectedDemo);
    const Template = templateComponentByBusinessType[clinic.businessType] || templateComponentByBusinessType.hospital;
    return <Template clinic={clinic} />;
  }

  const rows =
    Array.isArray(injectedRows) && injectedRows.length
      ? injectedRows.map(normalizeDemoRow)
      : readyRowsForBatch(leadsCsv, 'batch_1');

  return <BatchIndex rows={rows} />;
}

export default App;
