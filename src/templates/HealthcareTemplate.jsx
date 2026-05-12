import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import DisclaimerBadge from '../components/DisclaimerBadge.jsx';
import { fallbackImageFor } from '../utils/demoData.js';

/* ── Defaults ──────────────────────────────────────────── */
const fallbackClinic = {
  clinicName: 'SmileCare Dental Studio',
  doctorName: 'Dr. Ananya Sharma',
  specialty: 'Dental Care',
  city: 'Bengaluru',
  phoneDisplay: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  whatsappHref: 'https://wa.me/919876543210',
  heroImage: fallbackImageFor('dentist'),
  services: [],
  disclaimer: 'Unofficial sample concept — created for design preview only.',
};

/* ── Animation variants ────────────────────────────────── */
const sc = (delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: delay } },
});

const fu = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fl = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const fr = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Section heading ───────────────────────────────────── */
function SectionHeading({ eyebrow, title, copy, align = 'left', className = '' }) {
  return (
    <motion.div
      variants={fu}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={`mb-14 ${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}
    >
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
        <Sparkles className="h-3 w-3" />
        {eyebrow}
      </span>
      <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
        {title}
      </h2>
      {copy && <p className="mt-5 text-base leading-8 text-slate-500">{copy}</p>}
    </motion.div>
  );
}

/* ── Avatar initials ───────────────────────────────────── */
function InitialsAvatar({ name, size = 'md' }) {
  const initials = String(name || 'P')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
  const sz = size === 'sm' ? 'h-10 w-10 text-sm' : 'h-14 w-14 text-base';
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-strong)] font-bold text-white ${sz}`}
    >
      {initials}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN TEMPLATE
   ══════════════════════════════════════════════════════════ */
export default function HealthcareTemplate({ config, clinic = fallbackClinic }) {
  const mergedClinic = { ...fallbackClinic, ...clinic };
  const heroCopy = mergedClinic.subheadline || config.heroCopy(mergedClinic);
  const heroTitle = mergedClinic.headline || config.heroTitlePrefix;

  /* image with safe fallback */
  const rawSrc = mergedClinic.heroImage;
  const safeSrc =
    !rawSrc ||
    rawSrc.includes('undefined') ||
    rawSrc.includes('null') ||
    !/^https?:\/\//i.test(rawSrc)
      ? fallbackImageFor(mergedClinic.businessType)
      : rawSrc;

  const services = mergedClinic.services?.length
    ? mergedClinic.services.slice(0, 4).map((title, i) => ({
        title,
        description: config.services[i % config.services.length].description,
        icon: config.services[i % config.services.length].icon,
      }))
    : config.services;

  /* CSS variables */
  const style = {
    '--accent': config.colors.accent,
    '--accent-soft': config.colors.soft,
    '--accent-strong': config.colors.strong,
    '--accent-glow': config.colors.glow,
  };

  /* Scroll-aware navbar */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 56);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* Mobile menu */
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = ['Services', 'About', 'Trust', 'Journey', 'Contact'];

  /* FAQ accordion */
  const [openFaq, setOpenFaq] = useState(null);
  const faqs = config.faqs || [];

  /* Broken-image fallback ref */
  const imgRef = useRef(null);

  return (
    <div style={style} className="min-h-screen bg-[#f8fdff] text-slate-950 antialiased">
      <DisclaimerBadge text={mergedClinic.disclaimer} />

      {/* ══ NAVBAR ══════════════════════════════════════ */}
      <nav className="sticky top-0 z-40 px-3 py-2.5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border px-3 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled
              ? 'border-white/90 bg-white/96 shadow-premium backdrop-blur-2xl'
              : 'border-white/55 bg-white/72 shadow-card backdrop-blur-xl'
          }`}
        >
          {/* Logo */}
          <a href="#top" className="flex items-center gap-3 text-base font-semibold text-slate-950">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-strong)] text-white shadow-md ring-2 ring-[var(--accent-soft)]">
              <config.navIcon className="h-5 w-5" />
            </div>
            <span className="hidden max-w-[200px] truncate sm:block">{mergedClinic.clinicName}</span>
            <span className="sm:hidden">{config.shortLabel}</span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden rounded-full border border-slate-100/70 bg-slate-50/60 px-4 py-2 md:flex md:gap-5">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-[var(--accent-strong)]"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <a
              href={mergedClinic.phoneHref}
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:from-[var(--accent-strong)] hover:to-[var(--accent-strong)] sm:inline-flex"
            >
              <Phone className="h-3.5 w-3.5" />
              {mergedClinic.phoneDisplay}
            </a>
            <a
              href={mergedClinic.phoneHref}
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-lg sm:hidden"
            >
              <Phone className="h-3.5 w-3.5" />
              Call
            </a>
            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-white/80 text-slate-600 md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </motion.div>

        {/* Mobile slide-down menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-white/80 bg-white/94 px-4 py-4 shadow-premium backdrop-blur-2xl"
            >
              {navLinks.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 text-base font-medium text-slate-700 hover:text-[var(--accent-strong)]"
                >
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="overflow-hidden">
        {/* ══ HERO ════════════════════════════════════════ */}
        <section
          id="top"
          style={{ background: config.heroBg || 'linear-gradient(135deg,#f8fdff 0%,#f0f9ff 100%)' }}
          className="relative overflow-hidden px-4 pb-28 pt-12 sm:px-6 sm:pb-36 sm:pt-20 lg:px-8 lg:pb-44 lg:pt-24"
        >
          {/* Animated blobs */}
          <div
            className="premium-blob animate-float absolute -left-20 -top-10 h-[28rem] w-[32rem] opacity-70"
            style={{ background: config.colors.glow }}
          />
          <div className="premium-blob animate-float-delayed absolute right-[-10rem] top-20 h-[30rem] w-[34rem] bg-violet-200/35" />
          <div className="premium-blob animate-float-slow absolute bottom-8 left-1/3 h-72 w-[28rem] bg-teal-100/30" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#f8fdff] to-transparent" />

          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center xl:gap-20">
            {/* Left — copy */}
            <motion.div variants={sc(0)} initial="hidden" animate="show">
              {/* Animated live badge */}
              <motion.div variants={fu} className="mb-7 inline-flex">
                <span className="animate-bounce-subtle inline-flex items-center gap-2.5 rounded-full border border-[var(--accent-soft)] bg-white/85 px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)] shadow-card backdrop-blur-xl">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-65" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
                  </span>
                  {mergedClinic.city} · {config.businessLabel}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fu}
                className="max-w-[16ch] text-[2.7rem] font-semibold leading-[1.06] tracking-tight text-slate-950 sm:text-6xl lg:text-[4.75rem]"
              >
                {heroTitle}{' '}
                <span
                  className="text-gradient-animate bg-gradient-to-r from-[var(--accent-strong)] via-teal-500 to-violet-600 bg-clip-text text-transparent"
                  style={{ backgroundSize: '200% auto' }}
                >
                  {config.heroTitleAccent}
                </span>
              </motion.h1>

              <motion.p
                variants={fu}
                className="mt-6 max-w-xl text-lg leading-8 text-slate-500 sm:text-xl"
              >
                {heroCopy}
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fu}
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <a
                  href={mergedClinic.phoneHref}
                  className="premium-button group w-full justify-center bg-gradient-to-r from-slate-950 to-slate-800 text-white shadow-premium hover:from-[var(--accent-strong)] hover:to-[var(--accent-strong)] sm:w-auto"
                >
                  <Phone className="h-4 w-4" />
                  Call now
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href={mergedClinic.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="premium-button w-full justify-center border border-emerald-200 bg-white/90 text-emerald-800 shadow-card backdrop-blur hover:bg-emerald-50 sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp chat
                </a>
              </motion.div>

              {/* Feature badges */}
              <motion.div
                variants={sc(0.1)}
                initial="hidden"
                animate="show"
                className="mt-10 grid gap-2.5 sm:grid-cols-3"
              >
                {config.heroBadges.map((item) => (
                  <motion.div
                    key={item}
                    variants={fu}
                    whileHover={{ scale: 1.02 }}
                    className="gradient-border flex items-center gap-3 rounded-2xl border border-white/80 bg-white/82 p-4 shadow-card backdrop-blur-xl"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[var(--accent-strong)]" />
                    </div>
                    <p className="text-sm font-medium text-slate-700">{item}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — hero visual */}
            <motion.div variants={fr} initial="hidden" animate="show" className="relative">
              {/* Glow halo */}
              <div
                className="absolute -inset-8 rounded-[2.8rem] blur-3xl"
                style={{
                  background: `radial-gradient(ellipse at center, ${config.colors.glow} 0%, transparent 70%)`,
                }}
              />

              {/* Image frame */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-2 shadow-premium">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.55rem] bg-[var(--accent-soft)] lg:aspect-[0.9]">
                  <img
                    ref={imgRef}
                    src={safeSrc}
                    alt={`${mergedClinic.clinicName} design preview`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    onError={() => {
                      if (imgRef.current) {
                        imgRef.current.src = fallbackImageFor(mergedClinic.businessType);
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-white/10" />

                  {/* Top pill */}
                  <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
                    <div className="rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-[var(--accent-strong)] shadow-sm backdrop-blur-xl">
                      {config.visualLabel}
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[var(--accent-strong)] shadow-card backdrop-blur-xl">
                      <config.heroIcon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Bottom info chips */}
                  <div className="absolute inset-x-4 bottom-4 grid gap-2">
                    {config.visualCards.slice(0, 2).map((card) => (
                      <div
                        key={card}
                        className="rounded-[1.1rem] border border-white/60 bg-white/82 p-3 text-sm font-medium text-slate-700 shadow-card backdrop-blur-xl"
                      >
                        {card}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating appointment card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="animate-float relative z-10 mt-4 rounded-[1.4rem] border border-[var(--accent-soft)] bg-white/96 p-5 shadow-premium backdrop-blur-xl sm:absolute sm:-bottom-10 sm:-left-8 sm:mt-0 sm:w-[21rem]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                      Appointment
                    </p>
                    <h3 className="mt-1.5 text-lg font-semibold text-slate-950">
                      {config.appointmentTitle}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {mergedClinic.doctorName} · {mergedClinic.specialty}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[var(--accent-soft)] p-3 text-[var(--accent-strong)]">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2.5 text-slate-600">
                    <config.miniIcon className="h-4 w-4 text-[var(--accent-strong)]" />
                    {config.miniLabel}
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2.5 text-slate-600">
                    <MapPin className="h-4 w-4 text-[var(--accent-strong)]" />
                    {mergedClinic.cityShort || mergedClinic.city}
                  </div>
                </div>
              </motion.div>

              {/* Design preview pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.75 }}
                className="absolute -right-3 top-7 hidden items-center gap-2 rounded-full border border-white bg-white/94 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-card backdrop-blur-xl sm:flex"
              >
                <ShieldCheck className="h-4 w-4 text-[var(--accent-strong)]" />
                Design preview only
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══ STATS STRIP ══════════════════════════════════ */}
        <section className="relative bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={sc()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-slate-100 bg-slate-100 shadow-card lg:grid-cols-4"
            >
              {(config.stats || []).map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fu}
                  className="flex flex-col items-center justify-center gap-1 bg-white px-6 py-8 text-center"
                >
                  <span
                    className="text-4xl font-bold tracking-tight sm:text-5xl"
                    style={{ color: config.colors.strong }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-sm font-medium text-slate-500">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══ SERVICES ════════════════════════════════════ */}
        <section
          id="services"
          className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
        >
          <div
            className="premium-blob absolute -right-16 top-16 h-64 w-[26rem] opacity-50"
            style={{ background: config.colors.glow }}
          />
          <SectionHeading eyebrow="Services" title={config.servicesTitle} copy={config.servicesCopy} />

          <motion.div
            variants={sc()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          >
            {services.map((svc, i) => (
              <motion.article
                key={svc.title}
                variants={fu}
                whileHover={{ y: -7, transition: { duration: 0.22 } }}
                className="gradient-border group relative flex min-h-[20rem] flex-col overflow-hidden rounded-3xl border border-slate-100/80 bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-premium"
              >
                {/* Top accent line */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[var(--accent)] via-teal-300 to-violet-400 opacity-0 transition duration-300 group-hover:opacity-100" />
                {/* Step number */}
                <span className="absolute right-6 top-5 text-3xl font-bold text-slate-100 transition-colors duration-300 group-hover:text-[var(--accent-soft)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Icon */}
                <div className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent-soft)] to-white text-[var(--accent-strong)] shadow-sm ring-1 ring-[var(--accent-soft)] transition-all duration-300 group-hover:scale-110">
                  <svc.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-950">{svc.title}</h3>
                <p className="text-sm leading-7 text-slate-500">{svc.description}</p>
                <div className="mt-auto pt-7">
                  <div className="h-px bg-gradient-to-r from-[var(--accent-soft)] via-slate-100 to-transparent" />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* ══ ABOUT ═══════════════════════════════════════ */}
        <section
          id="about"
          className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
          style={{
            background: `linear-gradient(180deg, #f8fdff 0%, ${config.colors.soft} 50%, #f8fdff 100%)`,
          }}
        >
          <div
            className="premium-blob animate-float-slow absolute -left-24 top-20 h-80 w-80 opacity-50"
            style={{ background: config.colors.glow }}
          />
          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <SectionHeading
                eyebrow="About"
                title={`${mergedClinic.clinicName} in ${mergedClinic.city}.`}
                copy={
                  mergedClinic.about ||
                  `${mergedClinic.clinicName} is presented as a calm, modern, and patient-friendly ${config.shortLabel.toLowerCase()} sample experience.`
                }
              />

              <motion.div
                variants={sc()}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-3xl border border-white/80 bg-white/75 p-6 shadow-premium backdrop-blur-xl sm:p-8"
              >
                <div className="grid gap-3.5 sm:grid-cols-2">
                  {[
                    ['Location', mergedClinic.address || mergedClinic.city],
                    ['Specialty', mergedClinic.specialty],
                    ['Template type', config.businessLabel],
                    ['Contact', mergedClinic.email || mergedClinic.phoneDisplay],
                  ].map(([label, value]) => (
                    <motion.div
                      key={label}
                      variants={fu}
                      whileHover={{ scale: 1.025 }}
                      className="rounded-2xl border border-slate-100/80 bg-white/90 p-5 shadow-card transition-shadow duration-200 hover:shadow-premium"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
                        {label}
                      </p>
                      <p className="mt-2.5 text-sm font-medium leading-6 text-slate-700">{value}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  variants={fu}
                  className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-5 py-4"
                >
                  <p className="text-sm font-medium text-emerald-800">
                    Start a conversation on WhatsApp
                  </p>
                  <a
                    href={mergedClinic.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ TRUST ═══════════════════════════════════════ */}
        <section id="trust" className="relative bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div
            className="premium-blob animate-float-reverse absolute right-0 top-8 h-72 w-72 opacity-45"
            style={{ background: 'rgba(196,181,253,0.5)' }}
          />
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Trust cues"
              title={config.trustTitle}
              copy={config.trustCopy}
              align="center"
            />
            <motion.div
              variants={sc()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-5 md:grid-cols-3"
            >
              {config.trustCards.map((card) => (
                <motion.div
                  key={card.title}
                  variants={fu}
                  whileHover={{ y: -6, transition: { duration: 0.22 } }}
                  className="gradient-border relative overflow-hidden rounded-3xl border border-slate-100/80 bg-gradient-to-b from-white to-slate-50/70 p-8 shadow-card hover:shadow-premium"
                >
                  <span className="inline-flex items-center rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-strong)]">
                    {card.kicker}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-slate-950">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{card.copy}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══ PATIENT JOURNEY ══════════════════════════════ */}
        <section
          id="journey"
          className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${config.colors.soft}55 0%, transparent 60%)`,
            }}
          />
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading eyebrow="Patient journey" title={config.journeyTitle} copy={config.journeyCopy} />

            <motion.div
              variants={sc()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-4 lg:grid-cols-4"
            >
              {config.journey.map((step, i) => (
                <motion.div
                  key={step.title}
                  variants={fu}
                  whileHover={{ y: -6, transition: { duration: 0.22 } }}
                  className="relative rounded-3xl border border-slate-100/80 bg-white p-7 shadow-card hover:shadow-premium"
                >
                  {i < config.journey.length - 1 && (
                    <div
                      className="absolute -right-2 top-[3.2rem] z-10 hidden h-px w-5 lg:block"
                      style={{
                        background: `linear-gradient(90deg, ${config.colors.accent}, transparent)`,
                        opacity: 0.4,
                      }}
                    />
                  )}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent-soft)] to-white text-[var(--accent-strong)] shadow-sm ring-1 ring-[var(--accent-soft)]">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-bold text-[var(--accent-strong)]">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-950">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{step.copy}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ════════════════════════════════ */}
        <section className="relative bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div
            className="premium-blob absolute -left-16 top-16 h-72 w-72 opacity-40"
            style={{ background: config.colors.glow }}
          />
          <div className="relative mx-auto max-w-7xl">
            <div className="mb-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Sample testimonials"
                title="Clearly marked demo feedback for context."
                className="mb-0"
              />
              <span className="shrink-0 rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-800">
                Sample copy · not real reviews
              </span>
            </div>

            <motion.div
              variants={sc()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              {(config.testimonials || []).map((t) => (
                <motion.article
                  key={t.author}
                  variants={fu}
                  whileHover={{ y: -6, transition: { duration: 0.22 } }}
                  className="flex flex-col rounded-3xl border border-slate-100/80 bg-gradient-to-b from-white to-slate-50/60 p-8 shadow-card hover:shadow-premium"
                >
                  <Quote
                    className="mb-5 h-9 w-9 shrink-0"
                    style={{ color: config.colors.strong, opacity: 0.7 }}
                  />
                  <p className="flex-1 text-base leading-8 text-slate-700">"{t.quote}"</p>
                  <div className="mt-7 flex items-center gap-3">
                    <InitialsAvatar name={t.author} size="sm" />
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{t.author}</p>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══ FAQ ════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
          style={{
            background: `linear-gradient(180deg, #f8fdff 0%, ${config.colors.soft}60 50%, #f8fdff 100%)`,
          }}
        >
          <div
            className="premium-blob absolute right-[-4rem] top-10 h-72 w-72 opacity-50"
            style={{ background: config.colors.glow }}
          />
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="FAQ"
              title="Practical answers for a compliant demo."
              align="center"
            />

            <div className="mx-auto max-w-3xl space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left text-slate-950"
                  >
                    <span className="text-base font-semibold leading-snug">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0"
                    >
                      <ChevronDown
                        className="h-5 w-5"
                        style={{ color: config.colors.strong }}
                      />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                      >
                        <p className="px-5 pb-5 text-sm leading-7 text-slate-500">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CONTACT CTA ══════════════════════════════════ */}
        <section
          id="contact"
          className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
        >
          <motion.div
            variants={fu}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 shadow-premium sm:p-12 lg:p-16"
            style={{
              backgroundImage: `radial-gradient(ellipse at 80% 0%, ${config.colors.accent}30 0%, transparent 60%), radial-gradient(ellipse at 20% 100%, rgba(139,92,246,0.18) 0%, transparent 50%), linear-gradient(135deg, #0f172a 0%, #1e293b 100%)`,
            }}
          >
            {/* Animated background blobs */}
            <div
              className="premium-blob animate-float absolute -right-10 -top-10 h-80 w-80"
              style={{ background: `${config.colors.accent}28` }}
            />
            <div className="premium-blob animate-float-delayed absolute -bottom-14 -left-14 h-72 w-72 bg-violet-500/12" />

            {/* Dot grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />

            <div className="relative grid gap-12 lg:grid-cols-[1fr_320px] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/75 backdrop-blur-xl">
                  <Sparkles className="h-3.5 w-3.5" style={{ color: config.colors.accent }} />
                  Get in touch
                </span>
                <h2 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                  {config.ctaTitle}
                </h2>
                <p className="mt-5 max-w-lg text-base leading-8 text-white/60">
                  {config.ctaCopy(mergedClinic)}
                </p>
              </div>

              <motion.div
                variants={sc()}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-3 rounded-3xl border border-white/10 bg-white/8 p-5 backdrop-blur-2xl"
              >
                <motion.a
                  variants={fu}
                  href={mergedClinic.phoneHref}
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-4 rounded-full bg-white px-5 py-4 shadow-card transition-shadow duration-300 hover:shadow-premium"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-soft)]">
                    <Phone className="h-5 w-5 text-[var(--accent-strong)]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Phone</p>
                    <p className="font-semibold text-slate-950">{mergedClinic.phoneDisplay}</p>
                  </div>
                </motion.a>

                <motion.a
                  variants={fu}
                  href={mergedClinic.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-4 rounded-full bg-emerald-50 px-5 py-4 shadow-card transition-shadow duration-300 hover:shadow-premium"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                    <MessageCircle className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-xs text-emerald-600/70">WhatsApp</p>
                    <p className="font-semibold text-emerald-950">Chat now</p>
                  </div>
                </motion.a>

                <motion.div
                  variants={fu}
                  className="flex items-center gap-4 rounded-full bg-white/10 px-5 py-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <MapPin className="h-5 w-5 text-white/50" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40">Location</p>
                    <p className="font-semibold text-white">{mergedClinic.city}</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* ══ FOOTER ══════════════════════════════════════ */}
      <footer className="border-t border-slate-100 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-strong)] text-white shadow-sm">
                <config.navIcon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950">{mergedClinic.clinicName}</p>
                <p className="text-xs text-slate-400">{config.footerTagline}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-slate-400 sm:gap-6">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-[var(--accent-strong)] transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
            <p className="text-xs text-slate-400">{mergedClinic.disclaimer}</p>
          </div>
        </div>
      </footer>

      {/* ══ MOBILE STICKY CTA ════════════════════════════ */}
      <div className="fixed inset-x-3 bottom-3 z-50 sm:hidden">
        <a
          href={mergedClinic.phoneHref}
          className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-slate-950 to-slate-800 px-5 py-4 text-sm font-semibold text-white shadow-premium transition-all duration-300 active:scale-95"
        >
          <Phone className="h-4 w-4" />
          Call {mergedClinic.shortName || mergedClinic.clinicName}
        </a>
      </div>
    </div>
  );
}
