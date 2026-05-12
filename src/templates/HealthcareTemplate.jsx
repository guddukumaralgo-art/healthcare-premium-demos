import { motion } from 'framer-motion';
import {
  CalendarDays,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import DisclaimerBadge from '../components/DisclaimerBadge.jsx';

const fallbackClinic = {
  clinicName: 'SmileCare Dental Studio',
  doctorName: 'Dr. Ananya Sharma',
  specialty: 'Dental Care',
  city: 'Bengaluru',
  phoneDisplay: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  whatsappHref: 'https://wa.me/919876543210',
};

function SectionHeading({ eyebrow, title, copy, align = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className={align === 'center' ? 'mx-auto mb-16 max-w-3xl text-center' : 'mb-16 max-w-3xl'}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">{eyebrow}</p>
      <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-5xl">
        {title}
      </h2>
      {copy ? <p className="mt-6 text-base leading-8 text-slate-600">{copy}</p> : null}
    </motion.div>
  );
}

export default function HealthcareTemplate({ config, clinic = fallbackClinic }) {
  const mergedClinic = { ...fallbackClinic, ...clinic };
  const style = {
    '--accent': config.colors.accent,
    '--accent-soft': config.colors.soft,
    '--accent-strong': config.colors.strong,
    '--accent-glow': config.colors.glow,
  };

  return (
    <div style={style} className="min-h-screen bg-[#fbfefd] text-slate-950">
      <DisclaimerBadge />

      <nav className="sticky top-0 z-40 px-3 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-white/80 bg-white/82 px-3 py-3 shadow-card backdrop-blur-2xl sm:px-4">
          <a href="#top" className="flex items-center gap-3 text-base font-semibold tracking-normal text-slate-950">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-strong)] shadow-lg">
              <config.navIcon className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline">{mergedClinic.clinicName}</span>
            <span className="sm:hidden">{config.shortLabel}</span>
          </a>
          <div className="hidden rounded-full border border-slate-100 bg-slate-50/70 px-4 py-3 md:flex md:gap-7">
            {['Services', 'Trust', 'Journey', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-600 transition hover:text-[var(--accent-strong)]">
                {item}
              </a>
            ))}
          </div>
          <a href={mergedClinic.phoneHref} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--accent-strong)] sm:px-5">
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">{mergedClinic.phoneDisplay}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </nav>

      <main className="overflow-hidden">
        <section id="top" className="relative overflow-hidden px-4 pb-24 pt-[4.5rem] sm:px-6 sm:pb-28 sm:pt-24 lg:px-8 lg:pb-40 lg:pt-28">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[var(--accent-soft)]/60 to-violet-50" />
          <div className="premium-blob absolute -left-24 top-20 h-80 w-[28rem] bg-[var(--accent-glow)]" />
          <div className="premium-blob absolute right-[-9rem] top-28 h-96 w-[30rem] bg-violet-200/35" />
          <div className="premium-blob absolute bottom-14 left-1/2 h-72 w-[28rem] bg-teal-200/30" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#fbfefd] to-transparent" />

          <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center xl:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
            >
              <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)] shadow-card backdrop-blur-xl">
                <Sparkles className="h-4 w-4" />
                {mergedClinic.city} {config.businessLabel}
              </p>
              <h1 className="max-w-4xl text-[2.95rem] font-semibold leading-[0.98] tracking-normal text-slate-950 sm:text-6xl lg:text-[5.2rem]">
                {config.heroTitlePrefix}{' '}
                <span className="bg-gradient-to-r from-[var(--accent-strong)] via-teal-600 to-violet-700 bg-clip-text text-transparent">
                  {config.heroTitleAccent}
                </span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
                {config.heroCopy(mergedClinic)}
              </p>

              <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href={mergedClinic.phoneHref} className="premium-button w-full bg-slate-950 text-white shadow-premium hover:bg-[var(--accent-strong)] focus:ring-[var(--accent-soft)] sm:w-auto">
                  <Phone className="h-4 w-4" />
                  Call now
                </a>
                <a href={mergedClinic.whatsappHref} target="_blank" rel="noreferrer" className="premium-button w-full border border-slate-100 bg-white/90 text-slate-800 shadow-card backdrop-blur hover:border-[var(--accent-soft)] hover:bg-[var(--accent-soft)] focus:ring-[var(--accent-soft)] sm:w-auto">
                  <MessageCircle className="h-4 w-4 text-[var(--accent-strong)]" />
                  WhatsApp chat
                </a>
              </div>

              <div className="mt-14 grid gap-3 sm:grid-cols-3">
                {config.heroBadges.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.24 + index * 0.08 }}
                    className="flex min-h-20 items-center gap-3 rounded-[1.35rem] border border-white/80 bg-white/78 p-4 shadow-card backdrop-blur-xl"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--accent-strong)]" />
                    <p className="text-sm font-medium text-slate-700">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-[2.4rem] bg-gradient-to-br from-[var(--accent-glow)] via-white/25 to-violet-200/30 blur-2xl" />
              <div className="relative rounded-[2rem] border border-white bg-white p-2 shadow-premium">
                <div className="aspect-[4/3] overflow-hidden rounded-[1.55rem] bg-gradient-to-br from-[var(--accent-soft)] via-white to-violet-50 lg:aspect-[0.96]">
                  <div className="flex h-full flex-col justify-between p-6 sm:p-8">
                    <div className="flex items-center justify-between">
                      <div className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[var(--accent-strong)] shadow-sm backdrop-blur">
                        {config.visualLabel}
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[var(--accent-strong)] shadow-card">
                        <config.heroIcon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="grid gap-4">
                      {config.visualCards.map(card => (
                        <div key={card} className="rounded-[1.35rem] border border-white/70 bg-white/72 p-4 text-sm font-medium text-slate-700 shadow-card backdrop-blur-xl">
                          {card}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.45, ease: 'easeOut' }}
                className="relative z-10 mt-4 rounded-[1.4rem] border border-white bg-white/94 p-5 shadow-premium backdrop-blur-xl sm:absolute sm:-bottom-9 sm:-left-10 sm:mt-0 sm:w-[22rem]"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">Appointment</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">{config.appointmentTitle}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{mergedClinic.doctorName} · {mergedClinic.specialty}</p>
                  </div>
                  <div className="rounded-2xl bg-[var(--accent-soft)] p-3 text-[var(--accent-strong)] shadow-sm">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-3 text-slate-600">
                    <config.miniIcon className="h-4 w-4 text-[var(--accent-strong)]" />
                    {config.miniLabel}
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-3 text-slate-600">
                    <MapPin className="h-4 w-4 text-[var(--accent-strong)]" />
                    {mergedClinic.city}
                  </div>
                </div>
              </motion.div>

              <div className="absolute -right-3 top-8 hidden rounded-full border border-white bg-white/90 px-4 py-3 text-sm font-semibold text-slate-700 shadow-card backdrop-blur-xl sm:flex sm:items-center sm:gap-2">
                <ShieldCheck className="h-5 w-5 text-[var(--accent-strong)]" />
                Design preview only
              </div>
            </motion.div>
          </div>
        </section>

        <section id="services" className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
          <div className="premium-blob absolute -right-24 top-20 h-64 w-[24rem] bg-[var(--accent-glow)]" />
          <SectionHeading eyebrow="Services" title={config.servicesTitle} copy={config.servicesCopy} />

          <div className="relative grid gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
            {config.services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.07, ease: 'easeOut' }}
                className="group relative flex min-h-[19rem] flex-col overflow-hidden rounded-[1.65rem] border border-slate-100 bg-white p-7 shadow-card transition duration-300 hover:-translate-y-2 hover:border-[var(--accent-soft)] hover:shadow-premium"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--accent)] via-teal-200 to-violet-200 opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent-strong)] shadow-sm ring-1 ring-white/80 transition duration-300 group-hover:scale-105">
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-4 text-xl font-semibold tracking-normal text-slate-950">{service.title}</h3>
                <p className="text-sm leading-7 text-slate-600">{service.description}</p>
                <div className="mt-auto pt-8">
                  <div className="h-px w-full bg-gradient-to-r from-[var(--accent-soft)] via-slate-100 to-transparent" />
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="trust" className="relative bg-white px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Trust cues" title={config.trustTitle} copy={config.trustCopy} align="center" />
            <div className="grid gap-5 md:grid-cols-3">
              {config.trustCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.06, ease: 'easeOut' }}
                  className="rounded-[1.55rem] border border-slate-100 bg-gradient-to-b from-white to-slate-50 p-7 shadow-card"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">{card.kicker}</p>
                  <h3 className="mt-4 text-xl font-semibold text-slate-950">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{card.copy}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="journey" className="relative px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Patient journey" title={config.journeyTitle} copy={config.journeyCopy} />
            <div className="grid gap-5 lg:grid-cols-4">
              {config.journey.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.06, ease: 'easeOut' }}
                  className="rounded-[1.55rem] border border-slate-100 bg-white p-7 shadow-card"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-semibold text-slate-300">0{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-950">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{step.copy}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-[2rem] border border-white bg-slate-950 p-8 shadow-premium sm:p-12 lg:p-14"
          >
            <div className="premium-blob absolute right-0 top-0 h-72 w-72 bg-[var(--accent)]/30" />
            <div className="relative grid gap-12 lg:grid-cols-[1fr_340px] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
                  <Sparkles className="h-4 w-4" />
                  Contact
                </p>
                <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl">
                  {config.ctaTitle}
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/70">
                  {config.ctaCopy(mergedClinic)}
                </p>
              </div>
              <div className="space-y-4 rounded-[1.55rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                <a href={mergedClinic.phoneHref} className="flex items-center gap-4 rounded-full bg-white px-5 py-4 shadow-card transition duration-300 hover:-translate-y-1">
                  <Phone className="h-5 w-5 text-[var(--accent-strong)]" />
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="font-semibold text-slate-950">{mergedClinic.phoneDisplay}</p>
                  </div>
                </a>
                <a href={mergedClinic.whatsappHref} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-full bg-white/90 px-5 py-4 shadow-card transition duration-300 hover:-translate-y-1">
                  <MessageCircle className="h-5 w-5 text-[var(--accent-strong)]" />
                  <div>
                    <p className="text-sm text-slate-500">WhatsApp</p>
                    <p className="font-semibold text-slate-950">Chat now</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
