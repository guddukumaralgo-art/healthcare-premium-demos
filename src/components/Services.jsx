import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarCheck2, ClipboardList, Smile, Sparkles } from 'lucide-react';

const services = [
  {
    title: 'Preventive visits',
    description: 'A clean, approachable layout for routine checkups, hygiene conversations, and first-visit planning.',
    icon: Smile,
  },
  {
    title: 'Consultation planning',
    description: 'Simple information architecture that helps visitors understand how to request a consultation.',
    icon: ClipboardList,
  },
  {
    title: 'Appointment flow',
    description: 'Prominent call and WhatsApp actions designed for quick outreach from mobile or desktop.',
    icon: CalendarCheck2,
  },
  {
    title: 'Premium clinic feel',
    description: 'Soft visual cues, elegant spacing, and calm motion that support a trustworthy demo experience.',
    icon: Sparkles,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
      <div className="premium-blob absolute -right-24 top-20 h-64 w-[24rem] bg-cyan-100/75" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="relative mb-16 max-w-3xl"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">Service highlights</p>
        <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-5xl">
          Dental website sections that feel refined, useful, and calm.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
          The homepage frames common dental-care needs without promising outcomes or inventing credentials.
        </p>
      </motion.div>

      <div className="relative grid gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.07, ease: 'easeOut' }}
              className="group relative flex min-h-[19rem] flex-col overflow-hidden rounded-[1.65rem] border border-slate-100 bg-white p-7 shadow-card transition duration-300 hover:-translate-y-2 hover:border-cyan-100 hover:shadow-premium"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300 via-teal-200 to-violet-200 opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="mb-8 flex items-start justify-between gap-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-50 to-teal-50 text-cyan-700 shadow-sm ring-1 ring-cyan-100/70 transition duration-300 group-hover:scale-105 group-hover:bg-cyan-50">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 text-slate-300 transition duration-300 group-hover:border-cyan-100 group-hover:bg-cyan-50 group-hover:text-cyan-700">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
              <h3 className="mb-4 text-xl font-semibold tracking-normal text-slate-950">{service.title}</h3>
              <p className="text-sm leading-7 text-slate-600">{service.description}</p>
              <div className="mt-auto pt-8">
                <div className="h-px w-full bg-gradient-to-r from-cyan-100 via-slate-100 to-transparent" />
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
