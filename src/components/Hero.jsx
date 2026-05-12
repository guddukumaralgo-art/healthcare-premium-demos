import { motion } from 'framer-motion';
import { CalendarDays, CheckCircle2, Clock3, MapPin, MessageCircle, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import clinic from '../data/smilecare.json';

const features = [
  'Calm first-visit experience',
  'Clear appointment guidance',
  'Transparent next steps',
];

const heroStats = [
  { value: '2', label: 'contact paths' },
  { value: '4', label: 'journey steps' },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-hero-glow px-4 pb-24 pt-[4.5rem] sm:px-6 sm:pb-28 sm:pt-24 lg:px-8 lg:pb-40 lg:pt-28">
      <div className="premium-blob absolute -left-24 top-20 h-80 w-[28rem] bg-cyan-200/50" />
      <div className="premium-blob absolute right-[-9rem] top-28 h-96 w-[30rem] bg-violet-200/40" />
      <div className="premium-blob absolute bottom-14 left-1/2 h-72 w-[28rem] bg-teal-200/35" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#fbfefd] to-transparent" />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center xl:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="relative z-10"
        >
          <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 shadow-card backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-teal-600" />
            {clinic.city} {clinic.businessType} concept
          </p>
          <h1 className="max-w-4xl text-[2.95rem] font-semibold leading-[0.98] tracking-normal text-slate-950 sm:text-6xl lg:text-[5.35rem]">
            Premium dental care website concept for a <span className="bg-gradient-to-r from-cyan-700 via-teal-600 to-violet-700 bg-clip-text text-transparent">calmer patient journey.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
            {clinic.clinicName} is presented as a polished design preview for {clinic.specialty.toLowerCase()} outreach in {clinic.city}, with simple contact flows and reassuring clinic storytelling.
          </p>

          <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={clinic.phoneHref}
              className="premium-button w-full bg-slate-950 text-white shadow-premium hover:bg-cyan-700 focus:ring-cyan-100 sm:w-auto"
            >
              <Phone className="h-4 w-4" />
              Call now
            </a>
            <a
              href={clinic.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="premium-button w-full border border-emerald-200 bg-white/90 text-emerald-800 shadow-card backdrop-blur hover:border-emerald-300 hover:bg-emerald-50 focus:ring-emerald-100 sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp chat
            </a>
          </div>

          <div className="mt-14 grid gap-3 sm:grid-cols-3">
            {features.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.24 + index * 0.08 }}
                className="flex min-h-20 items-center gap-3 rounded-[1.35rem] border border-white/80 bg-white/78 p-4 shadow-card backdrop-blur-xl"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-500" />
                <p className="text-sm font-medium text-slate-700">{item}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
            {heroStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.45 + index * 0.08 }}
                className="rounded-[1.35rem] border border-white/70 bg-white/55 px-5 py-4 shadow-sm backdrop-blur-xl"
              >
                <p className="text-2xl font-semibold text-slate-950">{stat.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
          className="relative z-10"
        >
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.4rem] bg-gradient-to-br from-cyan-200/45 via-white/25 to-violet-200/35 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-2 shadow-premium">
              <img
                src={clinic.heroImage}
                alt="Modern dental studio design preview"
                className="aspect-[4/3] w-full rounded-[1.55rem] object-cover lg:aspect-[0.96]"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.45, ease: 'easeOut' }}
              className="relative z-10 mt-4 rounded-[1.4rem] border border-cyan-100 bg-white/94 p-5 shadow-premium backdrop-blur-xl sm:absolute sm:-bottom-9 sm:-left-10 sm:mt-0 sm:w-[22rem]"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Appointment</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">Request a consult</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{clinic.doctorName} · {clinic.specialty}</p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-cyan-50 to-teal-50 p-3 text-cyan-700 shadow-sm">
                  <CalendarDays className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-3 text-slate-600">
                  <Clock3 className="h-4 w-4 text-teal-600" />
                  Easy booking
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-3 text-slate-600">
                  <MapPin className="h-4 w-4 text-teal-600" />
                  {clinic.city}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.6, ease: 'easeOut' }}
              className="absolute -right-3 top-8 hidden rounded-full border border-white bg-white/90 px-4 py-3 text-sm font-semibold text-slate-700 shadow-card backdrop-blur-xl sm:flex sm:items-center sm:gap-2"
            >
              <ShieldCheck className="h-5 w-5 text-teal-500" />
              Design preview only
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
