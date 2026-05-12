import { motion } from 'framer-motion';
import { ClipboardCheck, MapPinned, MessageCircle, ShieldCheck } from 'lucide-react';
import clinic from '../data/smilecare.json';

const stats = [
  { label: 'Clear journey steps', value: '4', icon: ClipboardCheck },
  { label: 'Contact options', value: '2', icon: MessageCircle },
  { label: 'Preview city', value: clinic.city, icon: MapPinned },
  { label: 'Design status', value: 'Sample', icon: ShieldCheck },
];

export default function TrustSection() {
  return (
    <section id="trust" className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
      <div className="premium-blob absolute right-4 top-8 h-64 w-64 bg-violet-100/70" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="relative mb-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">Trust cues</p>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-5xl">
            Credibility built through clarity, not inflated numbers.
          </h2>
        </div>
        <p className="max-w-2xl text-base leading-8 text-slate-600 lg:justify-self-end">
          These cues describe the page experience itself, keeping the concept premium while avoiding unverifiable ratings, outcomes, or patient volume claims.
        </p>
      </motion.div>

      <div className="relative rounded-[2rem] border border-cyan-100 bg-gradient-to-br from-white via-cyan-50/60 to-violet-50/60 p-3 shadow-premium">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
                className="rounded-[1.45rem] bg-white p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-premium"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 p-3 text-teal-700">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-3xl font-semibold tracking-normal text-slate-950">{stat.value}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
