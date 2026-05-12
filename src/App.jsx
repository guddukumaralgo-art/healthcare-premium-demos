import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, FlaskConical, HeartPulse, Hospital, Leaf, Search, ShieldCheck, Smile, Sparkles } from 'lucide-react';
import leadsCsv from './data/leads.csv?raw';
import { templateComponentByBusinessType } from './templates/index.js';
import { disclaimer, normalizeDemoRow, readyRowsForBatch } from './utils/demoData.js';

const filters = [
  { key: 'all', label: 'All', icon: Sparkles },
  { key: 'dentist', label: 'Dentist', icon: Smile },
  { key: 'dermatologist', label: 'Dermatology', icon: HeartPulse },
  { key: 'physiotherapy', label: 'Physio', icon: Activity },
  { key: 'diagnostic-center', label: 'Diagnostic', icon: FlaskConical },
  { key: 'hospital', label: 'Hospital', icon: Hospital },
  { key: 'ayurveda', label: 'Ayurveda', icon: Leaf },
];

const labels = {
  dentist: 'Dentist',
  dermatologist: 'Dermatology',
  physiotherapy: 'Physiotherapy',
  'diagnostic-center': 'Diagnostic',
  hospital: 'Hospital',
  ayurveda: 'Ayurveda',
};

function BatchIndex({ rows }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [query, setQuery] = useState('');

  const filteredRows = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    return rows.filter(row => {
      const matchesType = activeFilter === 'all' || row.businessType === activeFilter;
      const matchesQuery = !cleanQuery || [row.clinicName, row.city, row.specialty, row.originalBusinessType]
        .join(' ')
        .toLowerCase()
        .includes(cleanQuery);
      return matchesType && matchesQuery;
    });
  }, [activeFilter, query, rows]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#fbfefd] text-slate-950">
      <div className="border-b border-cyan-100 bg-gradient-to-r from-cyan-50 via-white to-violet-50 text-sm text-slate-600">
        <div className="mx-auto flex max-w-7xl justify-center px-4 py-3 sm:px-6 lg:px-8">
          <p className="rounded-full border border-cyan-100 bg-white/80 px-4 py-2 text-center font-medium shadow-sm backdrop-blur-xl">
            {disclaimer}
          </p>
        </div>
      </div>

      <main className="relative px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div className="premium-blob absolute -left-24 top-20 h-80 w-[28rem] bg-cyan-200/50" />
        <div className="premium-blob absolute right-[-9rem] top-24 h-96 w-[30rem] bg-violet-200/35" />
        <div className="premium-blob absolute bottom-16 left-1/2 h-72 w-[28rem] bg-teal-200/30" />

        <section className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="max-w-4xl"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/78 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 shadow-card backdrop-blur-xl">
              <ShieldCheck className="h-4 w-4 text-teal-600" />
              batch_1 React demos
            </p>
            <h1 className="mt-8 max-w-5xl text-[2.95rem] font-semibold leading-[0.98] tracking-normal text-slate-950 sm:text-6xl lg:text-[5.35rem]">
              Premium healthcare demos with{' '}
              <span className="bg-gradient-to-r from-cyan-700 via-teal-600 to-violet-700 bg-clip-text text-transparent">
                animated glass design.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
              Browse generated pages from the CSV. Each clinic page now loads the same Vite React bundle, Framer Motion animations, translucent cards, and business-type template system.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: 'easeOut' }}
            className="sticky top-3 z-20 mt-10 rounded-[1.7rem] border border-white/80 bg-white/76 p-3 shadow-card backdrop-blur-2xl"
          >
            <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
              <label className="flex min-h-12 items-center gap-3 rounded-full border border-slate-100 bg-white/80 px-4 shadow-sm">
                <Search className="h-4 w-4 shrink-0 text-slate-400" />
                <input
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
                  placeholder="Search by clinic, city, or specialty"
                />
              </label>
              <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
                {filters.map(filter => {
                  const Icon = filter.icon;
                  const isActive = activeFilter === filter.key;
                  return (
                    <button
                      key={filter.key}
                      type="button"
                      onClick={() => setActiveFilter(filter.key)}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition duration-300 ${
                        isActive
                          ? 'bg-slate-950 text-white shadow-lg shadow-slate-900/10'
                          : 'border border-slate-100 bg-white/80 text-slate-600 hover:-translate-y-0.5 hover:text-cyan-700'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <section className="relative mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredRows.map((row, index) => (
              <motion.article
                key={row.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: Math.min(index % 6, 5) * 0.04, ease: 'easeOut' }}
                className="group relative overflow-hidden rounded-[1.65rem] border border-white/80 bg-white/78 p-6 shadow-card backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:shadow-premium"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300 via-teal-300 to-violet-300 opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-800">
                    {labels[row.businessType] || 'Healthcare'}
                  </span>
                  <span className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold capitalize text-slate-500">
                    {row.originalBusinessType || row.businessType}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    {row.cityShort}
                  </span>
                </div>
                <h2 className="mt-5 text-2xl font-semibold leading-tight tracking-normal text-slate-950">{row.clinicName}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{row.specialty}</p>
                <p className="mt-2 text-sm leading-7 text-slate-500">{row.city}</p>
                <a
                  href={row.pageUrl}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition duration-300 hover:-translate-y-1 hover:bg-cyan-700"
                >
                  Open demo
                </a>
              </motion.article>
            ))}
          </section>
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

  const rows = Array.isArray(injectedRows) && injectedRows.length
    ? injectedRows.map(normalizeDemoRow)
    : readyRowsForBatch(leadsCsv, 'batch_1');

  return <BatchIndex rows={rows} />;
}

export default App;
