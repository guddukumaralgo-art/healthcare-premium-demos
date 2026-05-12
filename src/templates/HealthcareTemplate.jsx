import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import DisclaimerBadge from '../components/DisclaimerBadge.jsx';

const fallbackImage = `${import.meta.env.BASE_URL}images/smilecare-studio.png`;

const fallbackClinic = {
  clinicName: 'SmileCare Dental Studio',
  doctorName: 'Dr. Ananya Sharma',
  specialty: 'Dental Care',
  city: 'Bengaluru',
  phoneDisplay: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  whatsappHref: 'https://wa.me/919876543210',
  heroImage: fallbackImage,
  services: [],
};

/* ── Stagger container variants ───────────────────── */
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Section heading ───────────────────────────────── */
function SectionHeading({ eyebrow, title, copy, align = 'left' }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={align === 'center' ? 'mx-auto mb-16 max-w-3xl text-center' : 'mb-16 max-w-3xl'}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
        <Sparkles className="h-3 w-3" />
        {eyebrow}
      </span>
      <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-5xl">
        {title}
      </h2>
      {copy && <p className="mt-5 text-base leading-8 text-slate-500">{copy}</p>}
    </motion.div>
  );
}

/* ── Main template ─────────────────────────────────── */
export default function HealthcareTemplate({ config, clinic = fallbackClinic }) {
  const mergedClinic = { ...fallbackClinic, ...clinic };
  const heroCopy = mergedClinic.subheadline || config.heroCopy(mergedClinic);
  const heroTitle = mergedClinic.headline || config.heroTitlePrefix;
  const imageSrc = mergedClinic.heroImage || fallbackImage;
  const services = mergedClinic.services?.length
    ? mergedClinic.services.slice(0, 4).map((title, index) => ({
        title,
        description: config.services[index % config.services.length].description,
        icon: config.services[index % config.services.length].icon,
      }))
    : config.services;

  const style = {
    '--accent': config.colors.accent,
    '--accent-soft': config.colors.soft,
    '--accent-strong': config.colors.strong,
    '--accent-glow': config.colors.glow,
  };

  /* scroll-aware navbar */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div style={style} className="min-h-screen bg-[#f8fdff] text-slate-950">
      <DisclaimerBadge />

      {/* ── Navbar ──────────────────────────────────── */}
      <nav className="sticky top-0 z-40 px-3 py-3 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border px-3 py-3 transition-all duration-500 sm:px-4 ${
            scrolled
              ? 'border-white/90 bg-white/95 shadow-premium backdrop-blur-2xl'
              : 'border-white/60 bg-white/75 shadow-card backdrop-blur-xl'
          }`}
        >
          <a href="#top" className="flex items-center gap-3 text-base font-semibold tracking-normal text-slate-950">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-strong)] text-white shadow-lg ring-2 ring-[var(--accent-soft)]">
              <config.navIcon className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline">{mergedClinic.clinicName}</span>
            <span className="sm:hidden">{config.shortLabel}</span>
          </a>

          <div className="hidden rounded-full border border-slate-100/80 bg-slate-50/60 px-4 py-2.5 md:flex md:gap-6">
            {['Services', 'About', 'Trust', 'Journey', 'Contact'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-slate-500 transition-all duration-200 hover:text-[var(--accent-strong)]"
              >
                {item}
              </a>
            ))}
          </div>

          <a
            href={mergedClinic.phoneHref}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:from-[var(--accent-strong)] hover:to-[var(--accent-strong)] sm:px-5"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">{mergedClinic.phoneDisplay}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </motion.div>
      </nav>

      <main className="overflow-hidden">
        {/* ── Hero ────────────────────────────────────── */}
        <section id="top" className="relative overflow-hidden px-4 pb-28 pt-[3.5rem] sm:px-6 sm:pb-32 sm:pt-20 lg:px-8 lg:pb-44 lg:pt-24">
          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[var(--accent-soft)]/50 to-violet-50/60" />
          <div className="absolute inset-0 bg-mesh-gradient opacity-70" />

          {/* Animated blobs */}
          <div className="premium-blob animate-float absolute -left-20 top-16 h-80 w-[30rem] bg-[var(--accent-glow)] opacity-80" />
          <div className="premium-blob animate-float-delayed absolute right-[-8rem] top-24 h-96 w-[32rem] bg-violet-200/40" />
          <div className="premium-blob animate-float-slow absolute bottom-10 left-1/3 h-72 w-[28rem] bg-teal-200/30" />

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f8fdff] to-transparent" />

          <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center xl:gap-20">
            {/* Left — copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {/* Floating badge */}
              <motion.p
                variants={fadeUp}
                className="animate-bounce-subtle mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--accent-soft)] bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)] shadow-card backdrop-blur-xl"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
                </span>
                {mergedClinic.city} · {config.businessLabel}
              </motion.p>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="max-w-4xl text-[2.85rem] font-semibold leading-[1.02] tracking-tight text-slate-950 sm:text-6xl lg:text-[5rem]"
              >
                {heroTitle}{' '}
                <span
                  className="text-gradient-animate bg-gradient-to-r from-[var(--accent-strong)] via-teal-500 to-violet-600 bg-clip-text text-transparent"
                  style={{ backgroundSize: '200% auto' }}
                >
                  {config.heroTitleAccent}
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-lg leading-8 text-slate-500 sm:text-xl sm:leading-9">
                {heroCopy}
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href={mergedClinic.phoneHref}
                  className="premium-button w-full bg-gradient-to-r from-slate-950 to-slate-800 text-white shadow-premium hover:from-[var(--accent-strong)] hover:to-[var(--accent-strong)] focus:ring-[var(--accent-soft)] sm:w-auto"
                >
                  <Phone className="h-4 w-4" />
                  Call now
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href={mergedClinic.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="premium-button w-full border border-emerald-200 bg-white/90 text-emerald-800 shadow-card backdrop-blur hover:border-emerald-300 hover:bg-emerald-50 focus:ring-emerald-100 sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp chat
                </a>
              </motion.div>

              {/* Feature badges */}
              <motion.div variants={staggerContainer} className="mt-12 grid gap-3 sm:grid-cols-3">
                {config.heroBadges.map((item) => (
                  <motion.div
                    key={item}
                    variants={fadeUp}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="gradient-border flex min-h-[5rem] items-center gap-3 rounded-[1.35rem] border border-white/80 bg-white/80 p-4 shadow-card backdrop-blur-xl"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)]">
                      <CheckCircle2 className="h-4 w-4 text-[var(--accent-strong)]" />
                    </div>
                    <p className="text-sm font-medium text-slate-700">{item}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — visual card */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate="show"
              className="relative"
            >
              {/* Glow ring behind image */}
              <div className="absolute -inset-8 rounded-[2.6rem] bg-gradient-to-br from-[var(--accent-glow)] via-white/10 to-violet-200/25 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-2 shadow-premium">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.55rem] bg-gradient-to-br from-[var(--accent-soft)] via-white to-violet-50 lg:aspect-[0.96]">
                  <img
                    src={imageSrc}
                    alt={`${mergedClinic.clinicName} design preview`}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    onError={event => { event.currentTarget.src = fallbackImage; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-white/10" />

                  {/* Top overlay bar */}
                  <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
                    <div className="rounded-full bg-white/88 px-4 py-2 text-sm font-semibold text-[var(--accent-strong)] shadow-sm backdrop-blur-xl">
                      {config.visualLabel}
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/88 text-[var(--accent-strong)] shadow-card backdrop-blur-xl">
                      <config.heroIcon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Bottom info cards */}
                  <div className="absolute inset-x-4 bottom-4 grid gap-2">
                    {config.visualCards.slice(0, 2).map(card => (
                      <div
                        key={card}
                        className="rounded-[1.2rem] border border-white/65 bg-white/80 p-3.5 text-sm font-medium text-slate-700 shadow-card backdrop-blur-xl"
                      >
                        {card}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Appointment floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                className="animate-float relative z-10 mt-4 rounded-[1.4rem] border border-[var(--accent-soft)] bg-white/96 p-5 shadow-premium backdrop-blur-xl sm:absolute sm:-bottom-10 sm:-left-10 sm:mt-0 sm:w-[22rem]"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">Appointment</p>
                    <h2 className="mt-2 text-xl font-semibold tracking-normal text-slate-950">{config.appointmentTitle}</h2>
                    <p className="mt-1.5 text-sm leading-6 text-slate-500">{mergedClinic.doctorName} · {mergedClinic.specialty}</p>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-[var(--accent-soft)] to-white p-3 text-[var(--accent-strong)] shadow-sm">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2.5 text-sm">
                  <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2.5 text-slate-600">
                    <config.miniIcon className="h-4 w-4 text-[var(--accent-strong)]" />
                    {config.miniLabel}
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2.5 text-slate-600">
                    <MapPin className="h-4 w-4 text-[var(--accent-strong)]" />
                    {mergedClinic.city}
                  </div>
                </div>
              </motion.div>

              {/* Design preview pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -right-4 top-8 hidden rounded-full border border-white bg-white/92 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-card backdrop-blur-xl sm:flex sm:items-center sm:gap-2"
              >
                <ShieldCheck className="h-4 w-4 text-[var(--accent-strong)]" />
                Design preview only
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Services ────────────────────────────────── */}
        <section id="services" className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
          <div className="premium-blob absolute -right-20 top-16 h-64 w-[26rem] bg-[var(--accent-glow)] opacity-60" />

          <SectionHeading eyebrow="Services" title={config.servicesTitle} copy={config.servicesCopy} />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="relative grid gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4"
          >
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="gradient-border group relative flex min-h-[20rem] flex-col overflow-hidden rounded-[1.65rem] border border-slate-100/80 bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-premium"
              >
                {/* Hover gradient top line */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[var(--accent)] via-teal-300 to-violet-400 opacity-0 transition duration-300 group-hover:opacity-100" />

                {/* Step number */}
                <span className="absolute right-6 top-6 text-3xl font-bold text-slate-100 group-hover:text-[var(--accent-soft)] transition-colors duration-300">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Icon */}
                <div className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent-soft)] to-white text-[var(--accent-strong)] shadow-sm ring-1 ring-[var(--accent-soft)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-accent-glow">
                  <service.icon className="h-7 w-7" />
                </div>

                <h3 className="mb-3 text-xl font-semibold tracking-normal text-slate-950">{service.title}</h3>
                <p className="text-sm leading-7 text-slate-500">{service.description}</p>

                <div className="mt-auto pt-7">
                  <div className="h-px w-full bg-gradient-to-r from-[var(--accent-soft)] via-slate-100 to-transparent" />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* ── About ───────────────────────────────────── */}
        <section id="about" className="relative overflow-hidden bg-gradient-to-b from-[#f8fdff] via-[var(--accent-soft)]/30 to-[#f8fdff] px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
          <div className="premium-blob absolute -left-24 top-20 h-80 w-80 bg-teal-100/60 animate-float-slow" />
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
              <SectionHeading
                eyebrow="About"
                title={`${mergedClinic.clinicName} in ${mergedClinic.city}.`}
                copy={mergedClinic.about || `${mergedClinic.clinicName} is presented as a calm, modern, and patient-friendly ${config.shortLabel.toLowerCase()} sample experience.`}
              />

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-premium backdrop-blur-xl sm:p-8"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    ['Location', mergedClinic.address || mergedClinic.city],
                    ['Specialty', mergedClinic.specialty],
                    ['Template', config.businessLabel],
                    ['Contact', mergedClinic.email || mergedClinic.phoneDisplay],
                  ].map(([label, value]) => (
                    <motion.div
                      key={label}
                      variants={fadeUp}
                      whileHover={{ scale: 1.02 }}
                      className="rounded-[1.35rem] border border-slate-100/80 bg-white/90 p-5 shadow-card transition-shadow duration-200 hover:shadow-premium"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">{label}</p>
                      <p className="mt-3 text-sm font-medium leading-6 text-slate-700">{value}</p>
                    </motion.div>
                  ))}
                </div>

                {/* WhatsApp inline CTA */}
                <motion.div variants={fadeUp} className="mt-5 flex items-center justify-between gap-4 rounded-[1.35rem] border border-emerald-100 bg-emerald-50/70 px-5 py-4">
                  <p className="text-sm font-medium text-emerald-800">Start a conversation on WhatsApp</p>
                  <a
                    href={mergedClinic.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Trust ───────────────────────────────────── */}
        <section id="trust" className="relative bg-white px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
          <div className="premium-blob absolute right-4 top-8 h-64 w-64 bg-violet-100/60 animate-float-reverse" />
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Trust cues" title={config.trustTitle} copy={config.trustCopy} align="center" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-5 md:grid-cols-3"
            >
              {config.trustCards.map((card) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  whileHover={{ y: -5, transition: { duration: 0.22 } }}
                  className="gradient-border relative overflow-hidden rounded-[1.65rem] border border-slate-100/80 bg-gradient-to-b from-white to-slate-50/80 p-8 shadow-card hover:shadow-premium"
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[var(--accent)] to-violet-400 opacity-0 transition duration-300 group-hover:opacity-100" />
                  <span className="inline-flex items-center rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
                    {card.kicker}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-slate-950">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{card.copy}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Patient journey ─────────────────────────── */}
        <section id="journey" className="relative overflow-hidden px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-soft)]/25 via-transparent to-violet-50/25" />
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading eyebrow="Patient journey" title={config.journeyTitle} copy={config.journeyCopy} />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-5 lg:grid-cols-4 lg:gap-4"
            >
              {config.journey.map((step, index) => (
                <motion.div
                  key={step.title}
                  variants={fadeUp}
                  whileHover={{ y: -5, transition: { duration: 0.22 } }}
                  className="relative rounded-[1.65rem] border border-slate-100/80 bg-white p-7 shadow-card hover:shadow-premium"
                >
                  {/* Connector line (hidden on last) */}
                  {index < config.journey.length - 1 && (
                    <div className="absolute -right-2.5 top-[3.2rem] z-10 hidden h-[1.5px] w-5 bg-gradient-to-r from-[var(--accent)] to-transparent opacity-30 lg:block" />
                  )}

                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent-soft)] to-white text-[var(--accent-strong)] shadow-sm ring-1 ring-[var(--accent-soft)]">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent-strong)]">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-950">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{step.copy}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Contact CTA ─────────────────────────────── */}
        <section id="contact" className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-[color:var(--accent-strong)]/40 p-8 shadow-premium sm:p-12 lg:p-16"
          >
            {/* Animated background blobs */}
            <div className="premium-blob animate-float absolute -right-12 -top-12 h-80 w-80 bg-[var(--accent)]/25" />
            <div className="premium-blob animate-float-delayed absolute -bottom-16 -left-16 h-80 w-80 bg-violet-400/15" />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />

            <div className="relative grid gap-12 lg:grid-cols-[1fr_340px] lg:items-center">
              <div>
                <motion.p
                  variants={fadeUp}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-xl"
                >
                  <Sparkles className="h-4 w-4 text-[var(--accent)]" />
                  Get in touch
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  className="glow-text mt-6 text-4xl font-semibold leading-tight tracking-normal text-white sm:text-5xl"
                >
                  {config.ctaTitle}
                </motion.h2>
                <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base leading-8 text-white/60">
                  {config.ctaCopy(mergedClinic)}
                </motion.p>
              </div>

              <motion.div
                variants={fadeUp}
                className="space-y-3 rounded-[1.65rem] border border-white/10 bg-white/8 p-5 shadow-white-glow backdrop-blur-2xl"
              >
                <a
                  href={mergedClinic.phoneHref}
                  className="flex items-center gap-4 rounded-full bg-white px-5 py-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-soft)]">
                    <Phone className="h-5 w-5 text-[var(--accent-strong)]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Phone</p>
                    <p className="font-semibold text-slate-950">{mergedClinic.phoneDisplay}</p>
                  </div>
                </a>
                <a
                  href={mergedClinic.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-full bg-emerald-50 px-5 py-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                    <MessageCircle className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-xs text-emerald-600/70">WhatsApp</p>
                    <p className="font-semibold text-emerald-950">Chat now</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 rounded-full bg-white/10 px-5 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <MapPin className="h-5 w-5 text-white/60" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Location</p>
                    <p className="font-semibold text-white">{mergedClinic.city}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* ── Mobile sticky CTA ───────────────────────── */}
      <div className="fixed inset-x-3 bottom-3 z-50 sm:hidden">
        <a
          href={mergedClinic.phoneHref}
          className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-slate-950 to-slate-800 px-5 py-4 text-sm font-semibold text-white shadow-premium"
        >
          <Phone className="h-4 w-4" />
          Call {mergedClinic.shortName || 'clinic'}
        </a>
      </div>
    </div>
  );
}
