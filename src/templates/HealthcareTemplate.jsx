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
  Star,
  X,
} from 'lucide-react';
import DisclaimerBadge from '../components/DisclaimerBadge.jsx';
import { fallbackImageFor } from '../utils/demoData.js';

/* ── Defaults ──────────────────────────────────────────────── */
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

/* ── Motion helpers ────────────────────────────────────────── */
const sc = (delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: delay } },
});

const fu = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fr = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const fs = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Section heading ───────────────────────────────────────── */
function SectionHeading({ eyebrow, title, copy, align = 'left', className = '' }) {
  return (
    <motion.div
      variants={fu}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`mb-14 ${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}
    >
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
        <Sparkles className="h-2.5 w-2.5" />
        {eyebrow}
      </span>
      <h2 className="mt-5 text-4xl font-bold leading-[1.08] tracking-[-0.02em] text-slate-950 sm:text-[2.875rem]">
        {title}
      </h2>
      {copy && (
        <p className="mt-5 text-[1.0625rem] leading-[1.85] text-slate-500">{copy}</p>
      )}
    </motion.div>
  );
}

/* ── Stars row ─────────────────────────────────────────────── */
function StarsRow({ accent }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-current" style={{ color: accent }} />
      ))}
    </div>
  );
}

/* ── Initials avatar ───────────────────────────────────────── */
function InitialsAvatar({ name }) {
  const initials = String(name || 'P')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-strong)] text-sm font-bold text-white ring-2 ring-[var(--accent-soft)]">
      {initials}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN TEMPLATE
   ══════════════════════════════════════════════════════════════ */
export default function HealthcareTemplate({ config, clinic = fallbackClinic }) {
  const mergedClinic = { ...fallbackClinic, ...clinic };
  const heroCopy  = mergedClinic.subheadline || config.heroCopy(mergedClinic);
  const heroTitle = mergedClinic.headline    || config.heroTitlePrefix;

  /* safe image */
  const rawSrc = mergedClinic.heroImage;
  const safeSrc =
    !rawSrc || /undefined|null/.test(rawSrc) || !/^https?:\/\//i.test(rawSrc)
      ? fallbackImageFor(mergedClinic.businessType)
      : rawSrc;

  /* services */
  const services = mergedClinic.services?.length
    ? mergedClinic.services.slice(0, 4).map((title, i) => ({
        title,
        description: config.services[i % config.services.length].description,
        icon:        config.services[i % config.services.length].icon,
      }))
    : config.services;

  /* CSS vars */
  const style = {
    '--accent':        config.colors.accent,
    '--accent-soft':   config.colors.soft,
    '--accent-strong': config.colors.strong,
    '--accent-glow':   config.colors.glow,
  };

  /* scroll-aware navbar */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 52);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = ['Services', 'About', 'Trust', 'Journey', 'Contact'];

  const [openFaq, setOpenFaq] = useState(null);
  const faqs = config.faqs || [];

  const imgRef = useRef(null);

  const headlineGradient = config.heroGradient || 'from-[var(--accent-strong)] via-teal-500 to-violet-600';

  return (
    <div style={style} className="min-h-screen bg-[#f8fdff] text-slate-950 antialiased">
      <DisclaimerBadge text={mergedClinic.disclaimer} />

      {/* ╔═ NAVBAR ═══════════════════════════════════════╗ */}
      <nav className="sticky top-0 z-40 px-3 py-2.5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled
              ? 'border-white/80 bg-white/96 shadow-premium backdrop-blur-2xl'
              : 'border-white/55 bg-white/72 shadow-card  backdrop-blur-xl'
          }`}
        >
          {/* Brand */}
          <a href="#top" className="flex min-w-0 items-center gap-3 text-[15px] font-semibold text-slate-950">
            <div
              className="flex h-[2.375rem] w-[2.375rem] shrink-0 items-center justify-center rounded-full text-white shadow-md ring-[3px]"
              style={{
                background: `linear-gradient(135deg, ${config.colors.accent}, ${config.colors.strong})`,
                ringColor: config.colors.soft,
              }}
            >
              <config.navIcon className="h-[18px] w-[18px]" />
            </div>
            <span className="hidden max-w-[200px] truncate sm:block">{mergedClinic.clinicName}</span>
            <span className="sm:hidden">{config.shortLabel}</span>
          </a>

          {/* Desktop links */}
          <div className="hidden rounded-full border border-slate-100/60 bg-slate-50/50 px-4 py-2 md:flex md:gap-5">
            {navLinks.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-[var(--accent-strong)]"
              >
                {l}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href={mergedClinic.phoneHref}
              className="hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 sm:inline-flex"
              style={{ background: `linear-gradient(135deg, #0f172a, ${config.colors.strong})` }}
            >
              <Phone className="h-3.5 w-3.5" />
              {mergedClinic.phoneDisplay}
            </a>
            <a
              href={mergedClinic.phoneHref}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-white sm:hidden"
              style={{ background: `linear-gradient(135deg, #0f172a, ${config.colors.strong})` }}
            >
              <Phone className="h-3.5 w-3.5" />
              Call
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 bg-white/80 text-slate-600 md:hidden"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </motion.div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-white/70 bg-white/95 px-5 py-3 shadow-premium backdrop-blur-2xl"
            >
              {navLinks.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="block border-b border-slate-100/60 py-3.5 text-[15px] font-medium text-slate-700 last:border-0 hover:text-[var(--accent-strong)]"
                >
                  {l}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="overflow-hidden">
        {/* ╔═ HERO ══════════════════════════════════════════╗ */}
        <section
          id="top"
          style={{ background: config.heroBg || 'linear-gradient(135deg,#f8fdff 0%,#f0f9ff 100%)' }}
          className="relative overflow-hidden px-4 pb-36 pt-12 sm:px-6 sm:pb-48 sm:pt-24 lg:px-8 lg:pb-60 lg:pt-28"
        >
          {/* Background mesh */}
          <div
            className="premium-blob animate-float absolute -left-32 -top-16 h-[40rem] w-[44rem] opacity-70"
            style={{ background: config.colors.glow }}
          />
          <div className="premium-blob animate-float-delayed absolute -right-28 top-20 h-[32rem] w-[36rem] bg-violet-200/25" />
          <div className="premium-blob animate-float-slow absolute bottom-8 left-1/3 h-80 w-[32rem] bg-teal-100/20" />

          {/* Mesh noise overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.022]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(15,23,42,1) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#f8fdff] via-[#f8fdff]/60 to-transparent" />

          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center xl:gap-24">

            {/* ── Left: copy ── */}
            <motion.div variants={sc()} initial="hidden" animate="show" className="flex flex-col">

              {/* Live badge */}
              <motion.div variants={fu} className="mb-7 inline-flex">
                <span className="animate-bounce-subtle inline-flex items-center gap-2.5 rounded-full border border-[var(--accent-soft)] bg-white/85 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)] shadow-card backdrop-blur-xl">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  </span>
                  {mergedClinic.city} · {config.businessLabel}
                </span>
              </motion.div>

              {/* Display headline */}
              <motion.h1
                variants={fu}
                className="max-w-[640px] text-[2.5rem] font-bold leading-[1.02] tracking-[-0.03em] text-slate-950 sm:text-[3.5rem] lg:text-[4.5rem]"
              >
                {heroTitle}{' '}
                <span
                  className={`text-gradient-animate bg-gradient-to-r ${headlineGradient} bg-clip-text text-transparent`}
                  style={{ backgroundSize: '200% auto' }}
                >
                  {config.heroTitleAccent}
                </span>
              </motion.h1>

              {/* Sub-copy */}
              <motion.p
                variants={fu}
                className="mt-7 max-w-[500px] text-[1.0625rem] leading-[1.85] text-slate-600"
              >
                {heroCopy}
              </motion.p>

              {/* CTA row */}
              <motion.div
                variants={fu}
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <a
                  href={mergedClinic.phoneHref}
                  className="premium-button btn-accent-glow group w-full justify-center text-white shadow-lg sm:w-auto"
                  style={{ background: `linear-gradient(135deg, #0c1222 0%, ${config.colors.strong} 140%)` }}
                >
                  <Phone className="h-4 w-4" />
                  Call now
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href={mergedClinic.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="premium-button w-full justify-center border border-emerald-200/80 bg-white/90 text-emerald-800 shadow-card backdrop-blur-sm hover:-translate-y-[3px] hover:border-emerald-300 hover:bg-emerald-50/90 sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp chat
                </a>
              </motion.div>

              {/* Trust strip */}
              <motion.div
                variants={fu}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <div className="flex items-center gap-2">
                  <StarsRow accent={config.colors.accent} />
                  <span className="text-[12px] font-medium text-slate-500">Sample design preview</span>
                </div>
                <div className="h-3.5 w-px bg-slate-200 hidden sm:block" />
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" style={{ color: config.colors.strong }} />
                  <span className="text-[12px] font-medium text-slate-500">No fake claims</span>
                </div>
                <div className="h-3.5 w-px bg-slate-200 hidden sm:block" />
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" style={{ color: config.colors.strong }} />
                  <span className="text-[12px] font-medium text-slate-500">Mobile-ready</span>
                </div>
              </motion.div>

              {/* Feature chips */}
              <motion.div
                variants={sc(0.14)}
                initial="hidden"
                animate="show"
                className="mt-10 grid gap-2.5 sm:grid-cols-3"
              >
                {config.heroBadges.map((item) => (
                  <motion.div
                    key={item}
                    variants={fu}
                    whileHover={{ y: -4, transition: { duration: 0.18 } }}
                    className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/72 p-4 shadow-card backdrop-blur-xl transition-shadow hover:shadow-card-md"
                  >
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                      style={{ background: config.colors.soft }}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" style={{ color: config.colors.strong }} />
                    </div>
                    <p className="text-[13px] font-medium text-slate-700">{item}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right: visual ── */}
            <motion.div variants={fr} initial="hidden" animate="show" className="relative">

              {/* Decorative ring */}
              <div
                className="pointer-events-none absolute -inset-6 rounded-[3rem] opacity-60"
                style={{
                  background: `radial-gradient(ellipse at 50% 50%, ${config.colors.glow} 0%, transparent 65%)`,
                  filter: 'blur(40px)',
                }}
              />

              {/* Outer decorative arc */}
              <div
                className="pointer-events-none absolute -inset-4 rounded-[2.5rem] border opacity-30"
                style={{ borderColor: config.colors.accent }}
              />

              {/* Main image frame */}
              <div className="relative overflow-hidden rounded-[2.25rem] border border-white/75 bg-white p-2 shadow-float-card">
                <div
                  className="relative overflow-hidden rounded-[1.75rem] lg:aspect-[0.85]"
                  style={{ background: config.colors.soft, aspectRatio: '4/3' }}
                >
                  <img
                    ref={imgRef}
                    src={safeSrc}
                    alt={`${mergedClinic.clinicName} design preview`}
                    loading="eager"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 will-change-transform hover:scale-[1.05]"
                    onError={() => {
                      if (imgRef.current) imgRef.current.src = fallbackImageFor(mergedClinic.businessType);
                    }}
                  />
                  {/* Dark vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-white/6" />

                  {/* Top bar */}
                  <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
                    <div className="rounded-full bg-white/92 px-4 py-1.5 text-[13px] font-semibold backdrop-blur-xl" style={{ color: config.colors.strong }}>
                      {config.visualLabel}
                    </div>
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/92 shadow-card backdrop-blur-xl"
                      style={{ color: config.colors.strong }}
                    >
                      <config.heroIcon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Bottom info chips */}
                  <div className="absolute inset-x-4 bottom-4 grid gap-2">
                    {config.visualCards.slice(0, 2).map((card) => (
                      <div
                        key={card}
                        className="rounded-[1.1rem] border border-white/60 bg-white/85 px-4 py-3 text-[13px] font-medium text-slate-700 shadow-card backdrop-blur-xl"
                      >
                        {card}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating appointment card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="animate-float glass-float relative z-10 mt-4 rounded-[1.6rem] p-5 sm:absolute sm:-bottom-12 sm:-left-10 sm:mt-0 sm:w-[23rem]"
              >
                {/* Accent top stripe */}
                <div
                  className="absolute inset-x-0 top-0 h-[2px] rounded-t-[1.6rem]"
                  style={{ background: `linear-gradient(90deg, ${config.colors.accent}, ${config.colors.soft})` }}
                />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: config.colors.strong }}>
                      Appointment
                    </p>
                    <h3 className="mt-1.5 text-[17px] font-semibold leading-snug text-slate-950">{config.appointmentTitle}</h3>
                    <p className="mt-1 text-[13px] text-slate-500">
                      {mergedClinic.doctorName} · {mergedClinic.specialty}
                    </p>
                  </div>
                  <div
                    className="rounded-2xl p-3 shadow-sm"
                    style={{ background: `linear-gradient(135deg, ${config.colors.soft}, white)`, color: config.colors.strong }}
                  >
                    <CalendarDays className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-[13px]">
                  <div
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-slate-600"
                    style={{ background: `${config.colors.soft}80` }}
                  >
                    <config.miniIcon className="h-3.5 w-3.5" style={{ color: config.colors.strong }} />
                    {config.miniLabel}
                  </div>
                  <div
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-slate-600"
                    style={{ background: `${config.colors.soft}80` }}
                  >
                    <MapPin className="h-3.5 w-3.5" style={{ color: config.colors.strong }} />
                    {mergedClinic.cityShort || mergedClinic.city}
                  </div>
                </div>
              </motion.div>

              {/* Design-preview pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.85 }}
                className="absolute -right-5 top-8 hidden items-center gap-2 rounded-full border border-white/80 bg-white/94 px-4 py-2.5 text-[13px] font-semibold text-slate-700 shadow-card backdrop-blur-xl sm:flex"
              >
                <ShieldCheck className="h-4 w-4" style={{ color: config.colors.strong }} />
                Design preview only
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ╔═ STATS STRIP ═══════════════════════════════════╗ */}
        <section className="relative overflow-hidden bg-white px-4 sm:px-6 lg:px-8">
          <div
            className="absolute inset-x-0 top-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent 0%, ${config.colors.accent}70 50%, transparent 100%)` }}
          />
          <div className="mx-auto max-w-7xl py-10 sm:py-14">
            <motion.div
              variants={sc()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-100 bg-slate-100/70 shadow-card lg:grid-cols-4"
            >
              {(config.stats || []).map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fu}
                  className="group flex flex-col items-center justify-center gap-1.5 bg-white px-6 py-9 text-center transition-colors duration-250 hover:bg-[var(--accent-soft)]"
                >
                  <span
                    className="text-[2.875rem] font-bold leading-none tracking-tight sm:text-[3.25rem]"
                    style={{ color: config.colors.strong }}
                  >
                    {stat.value}
                  </span>
                  <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400 group-hover:text-[var(--accent-strong)]">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div
            className="absolute inset-x-0 bottom-0 h-[1px]"
            style={{ background: `linear-gradient(90deg, transparent 0%, ${config.colors.soft} 50%, transparent 100%)` }}
          />
        </section>

        {/* ╔═ SERVICES ══════════════════════════════════════╗ */}
        <section
          id="services"
          className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36"
        >
          <div
            className="premium-blob absolute -right-20 top-16 h-72 w-[26rem] opacity-40"
            style={{ background: config.colors.glow }}
          />
          <SectionHeading eyebrow="Services" title={config.servicesTitle} copy={config.servicesCopy} />

          <motion.div
            variants={sc()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          >
            {services.map((svc, i) => (
              <motion.article
                key={svc.title}
                variants={fu}
                whileHover={{ y: -10, transition: { duration: 0.22 } }}
                className="gradient-border group relative flex min-h-[21rem] flex-col overflow-hidden rounded-3xl border border-slate-100/70 bg-white p-8 transition-all duration-300"
                style={{
                  boxShadow: '0 4px 6px rgba(15,23,42,0.04), 0 12px 40px rgba(15,23,42,0.07)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 8px 12px rgba(15,23,42,0.05), 0 28px 60px rgba(15,23,42,0.11), 0 0 0 1px ${config.colors.soft}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(15,23,42,0.04), 0 12px 40px rgba(15,23,42,0.07)';
                }}
              >
                {/* Accent top bar on hover */}
                <div
                  className="absolute inset-x-0 top-0 h-[3px] rounded-t-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, ${config.colors.accent}, rgba(139,92,246,0.6))` }}
                />
                {/* Ghost number */}
                <span
                  className="pointer-events-none absolute right-6 top-5 select-none text-[2.75rem] font-black leading-none transition-colors duration-300"
                  style={{ color: `${config.colors.soft}` }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Icon */}
                <div
                  className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm ring-1 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${config.colors.soft}, white)`,
                    color: config.colors.strong,
                    ringColor: config.colors.soft,
                  }}
                >
                  <svc.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-[1.125rem] font-semibold tracking-tight text-slate-950">{svc.title}</h3>
                <p className="text-[14px] leading-[1.8] text-slate-500">{svc.description}</p>
                <div className="mt-auto pt-7">
                  <div
                    className="h-px"
                    style={{ background: `linear-gradient(90deg, ${config.colors.soft}, rgba(226,232,240,0.6), transparent)` }}
                  />
                  <div className="mt-4 flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: config.colors.strong }}>
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* ╔═ ABOUT ═════════════════════════════════════════╗ */}
        <section
          id="about"
          className="relative overflow-hidden px-4 py-28 sm:px-6 lg:px-8 lg:py-36"
          style={{
            background: `linear-gradient(180deg, #f8fdff 0%, ${config.colors.soft}70 48%, #f8fdff 100%)`,
          }}
        >
          <div
            className="premium-blob animate-float-slow absolute -left-20 top-20 h-96 w-96 opacity-35"
            style={{ background: config.colors.glow }}
          />
          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
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
                className="glass-float rounded-3xl p-7 sm:p-9"
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ['Location', mergedClinic.address || mergedClinic.city],
                    ['Specialty', mergedClinic.specialty],
                    ['Template type', config.businessLabel],
                    ['Contact', mergedClinic.email || mergedClinic.phoneDisplay],
                  ].map(([label, value]) => (
                    <motion.div
                      key={label}
                      variants={fu}
                      whileHover={{ scale: 1.025, transition: { duration: 0.18 } }}
                      className="rounded-2xl border border-slate-100/70 bg-white/95 p-5 shadow-card transition-shadow hover:shadow-card-md"
                    >
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.18em]"
                        style={{ color: config.colors.strong }}
                      >
                        {label}
                      </p>
                      <p className="mt-2.5 text-[13px] font-medium leading-6 text-slate-700">{value}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  variants={fu}
                  className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-5 py-4"
                >
                  <p className="text-sm font-medium text-emerald-800">Chat on WhatsApp</p>
                  <a
                    href={mergedClinic.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="premium-button shrink-0 bg-emerald-600 py-2 text-white shadow-sm hover:bg-emerald-700"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ╔═ TRUST ═════════════════════════════════════════╗ */}
        <section id="trust" className="relative bg-white px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
          <div className="premium-blob animate-float-reverse absolute right-0 top-10 h-80 w-80 bg-violet-200/30 opacity-45" />
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
              {config.trustCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  variants={fu}
                  whileHover={{ y: -8, transition: { duration: 0.22 } }}
                  className="relative overflow-hidden rounded-3xl border border-slate-100/70 bg-gradient-to-b from-white to-slate-50/60 p-8 shadow-card transition-all duration-300 hover:shadow-card-md"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 8px 12px rgba(15,23,42,0.05), 0 28px 60px rgba(15,23,42,0.10), 0 0 0 1.5px ${config.colors.soft}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  {/* Colored top border */}
                  <div
                    className="absolute inset-x-0 top-0 h-[3px] rounded-t-3xl"
                    style={{ background: `linear-gradient(90deg, ${config.colors.accent}, rgba(139,92,246,0.55))` }}
                  />
                  {/* Step number */}
                  <div
                    className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                    style={{ background: config.colors.soft, color: config.colors.strong }}
                  >
                    {i + 1}
                  </div>
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]"
                    style={{ background: `${config.colors.soft}CC`, color: config.colors.strong }}
                  >
                    {card.kicker}
                  </span>
                  <h3 className="mt-5 text-[1.125rem] font-semibold tracking-tight text-slate-950">{card.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.8] text-slate-500">{card.copy}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ╔═ PATIENT JOURNEY ═══════════════════════════════╗ */}
        <section
          id="journey"
          className="relative overflow-hidden px-4 py-28 sm:px-6 lg:px-8 lg:py-36"
          style={{ background: `linear-gradient(135deg, ${config.colors.soft}50 0%, #f8fdff 55%, white 100%)` }}
        >
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading eyebrow="Patient journey" title={config.journeyTitle} copy={config.journeyCopy} />

            <motion.div
              variants={sc()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid gap-4 lg:grid-cols-4"
            >
              {config.journey.map((step, i) => (
                <motion.div
                  key={step.title}
                  variants={fu}
                  whileHover={{ y: -8, transition: { duration: 0.22 } }}
                  className="relative rounded-3xl border border-slate-100/70 bg-white p-7 shadow-card transition-all duration-300 hover:shadow-card-md"
                >
                  {/* Connector (desktop) */}
                  {i < config.journey.length - 1 && (
                    <div
                      className="absolute -right-2.5 top-[2.85rem] z-10 hidden h-px w-5 lg:block"
                      style={{ background: `linear-gradient(90deg, ${config.colors.accent}90, transparent)` }}
                    />
                  )}
                  <div className="mb-6 flex items-center justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm"
                      style={{
                        background: `linear-gradient(135deg, ${config.colors.soft}, white)`,
                        color: config.colors.strong,
                        boxShadow: `0 0 0 1.5px ${config.colors.soft}`,
                      }}
                    >
                      <step.icon className="h-6 w-6" />
                    </div>
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                      style={{ background: config.colors.soft, color: config.colors.strong }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-[1.0625rem] font-semibold tracking-tight text-slate-950">{step.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.8] text-slate-500">{step.copy}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ╔═ TESTIMONIALS ══════════════════════════════════╗ */}
        <section className="relative bg-white px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
          <div
            className="premium-blob absolute -left-10 top-10 h-80 w-80 opacity-30"
            style={{ background: config.colors.glow }}
          />
          <div className="relative mx-auto max-w-7xl">
            <div className="mb-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Sample testimonials"
                title="Clearly marked demo feedback."
                className="mb-0"
              />
              <span className="shrink-0 self-start rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-700 sm:self-auto">
                Not real patient reviews
              </span>
            </div>

            <motion.div
              variants={sc()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              {(config.testimonials || []).map((t) => (
                <motion.article
                  key={t.author}
                  variants={fu}
                  whileHover={{ y: -8, transition: { duration: 0.22 } }}
                  className="relative flex flex-col overflow-hidden rounded-3xl border border-slate-100/70 bg-gradient-to-b from-white to-slate-50/50 p-8 shadow-card transition-all duration-300 hover:shadow-card-md"
                >
                  {/* Colored top line */}
                  <div
                    className="absolute inset-x-0 top-0 h-[2.5px] rounded-t-3xl"
                    style={{ background: `linear-gradient(90deg, ${config.colors.accent}90, transparent)` }}
                  />
                  {/* Star row */}
                  <div className="mb-4">
                    <StarsRow accent={config.colors.accent} />
                  </div>
                  <Quote
                    className="mb-5 h-7 w-7 shrink-0"
                    style={{ color: config.colors.accent, opacity: 0.7 }}
                  />
                  <p className="flex-1 text-[15px] leading-[1.85] text-slate-700">"{t.quote}"</p>
                  <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-5">
                    <InitialsAvatar name={t.author} />
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{t.author}</p>
                      <p className="text-[11px] text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ╔═ FAQ ═══════════════════════════════════════════╗ */}
        <section
          className="relative overflow-hidden px-4 py-28 sm:px-6 lg:px-8 lg:py-36"
          style={{ background: `linear-gradient(180deg, #f8fdff 0%, ${config.colors.soft}60 50%, #f8fdff 100%)` }}
        >
          <div
            className="premium-blob absolute -right-16 top-10 h-72 w-72 opacity-40"
            style={{ background: config.colors.glow }}
          />
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="FAQ"
              title="Practical answers, compliant copy."
              align="center"
            />
            <div className="mx-auto max-w-3xl space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.48, delay: i * 0.06 }}
                  className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition-shadow hover:shadow-card-md"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 ${
                      openFaq === i ? '' : 'hover:bg-slate-50/80'
                    }`}
                    style={openFaq === i ? { background: `${config.colors.soft}60` } : {}}
                  >
                    <span className="text-[15px] font-semibold leading-snug text-slate-900">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.22 }}
                      className="shrink-0"
                    >
                      <ChevronDown className="h-5 w-5" style={{ color: config.colors.strong }} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.26, ease: 'easeOut' }}
                      >
                        <div
                          className="mx-6 border-l-[2.5px] pl-4 pb-5 pt-1 text-[14px] leading-[1.85] text-slate-500"
                          style={{ borderColor: config.colors.accent }}
                        >
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ╔═ CONTACT CTA ═══════════════════════════════════╗ */}
        <section id="contact" className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
          <motion.div
            variants={fs}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative overflow-hidden rounded-[2.5rem] p-10 sm:p-14 lg:p-18"
            style={{
              background: `
                radial-gradient(ellipse at 80% -10%, ${config.colors.accent}30 0%, transparent 50%),
                radial-gradient(ellipse at 10% 110%, rgba(139,92,246,0.18) 0%, transparent 52%),
                linear-gradient(145deg, #080d18 0%, #0f172a 100%)
              `,
              padding: 'clamp(2.5rem, 5vw, 4.5rem)',
            }}
          >
            {/* Animated blobs */}
            <div
              className="premium-blob animate-float absolute -right-16 -top-16 h-96 w-96 opacity-60"
              style={{ background: `${config.colors.accent}18` }}
            />
            <div className="premium-blob animate-float-delayed absolute -bottom-20 -left-20 h-80 w-80 bg-violet-500/8" />

            {/* Dot grid */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />

            {/* Horizontal divider glow line */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${config.colors.accent}60, transparent)` }}
            />

            <div className="relative grid gap-14 lg:grid-cols-[1fr_320px] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65 backdrop-blur-xl">
                  <Sparkles className="h-3.5 w-3.5" style={{ color: config.colors.accent }} />
                  Get in touch
                </span>
                <h2 className="mt-6 text-[2.75rem] font-bold leading-[1.05] tracking-[-0.025em] text-white sm:text-5xl">
                  {config.ctaTitle}
                </h2>
                <p className="mt-5 max-w-[440px] text-[15px] leading-[1.85] text-white/50">
                  {config.ctaCopy(mergedClinic)}
                </p>
              </div>

              <motion.div
                variants={sc()}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-3 rounded-3xl border border-white/8 bg-white/5 p-5 backdrop-blur-2xl"
              >
                <motion.a
                  variants={fu}
                  href={mergedClinic.phoneHref}
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-card-md transition-all duration-300 hover:shadow-premium"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ background: config.colors.soft }}
                  >
                    <Phone style={{ height: '1.125rem', width: '1.125rem', color: config.colors.strong }} />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-slate-400">Phone</p>
                    <p className="text-[15px] font-semibold text-slate-950">{mergedClinic.phoneDisplay}</p>
                  </div>
                </motion.a>

                <motion.a
                  variants={fu}
                  href={mergedClinic.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-4 rounded-2xl bg-emerald-50 px-5 py-4 shadow-card transition-all duration-300 hover:shadow-premium"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                    <MessageCircle style={{ height: '1.125rem', width: '1.125rem' }} className="text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-emerald-600/70">WhatsApp</p>
                    <p className="text-[15px] font-semibold text-emerald-950">Chat now</p>
                  </div>
                </motion.a>

                <motion.div
                  variants={fu}
                  className="flex items-center gap-4 rounded-2xl bg-white/6 px-5 py-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <MapPin style={{ height: '1.125rem', width: '1.125rem' }} className="text-white/50" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-white/35">Location</p>
                    <p className="text-[15px] font-semibold text-white">{mergedClinic.city}</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* ╔═ FOOTER ════════════════════════════════════════╗ */}
      <footer className="relative bg-white px-4 pb-10 pt-12 sm:px-6 lg:px-8">
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${config.colors.accent}55 50%, transparent 100%)` }}
        />
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-white shadow-sm"
                style={{ background: `linear-gradient(135deg, ${config.colors.accent}, ${config.colors.strong})` }}
              >
                <config.navIcon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950">{mergedClinic.clinicName}</p>
                <p className="text-[11px] text-slate-400">{config.footerTagline}</p>
              </div>
            </div>

            {/* Nav links */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-slate-400">
              {navLinks.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className="transition-colors duration-200 hover:text-[var(--accent-strong)]"
                >
                  {l}
                </a>
              ))}
            </div>

            {/* Disclaimer */}
            <p className="text-[11px] leading-5 text-slate-400 sm:max-w-[260px] sm:text-right">
              {mergedClinic.disclaimer}
            </p>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-6 text-[11px] text-slate-400 sm:flex-row">
            <span>© {new Date().getFullYear()} {mergedClinic.clinicName} — design preview only.</span>
            <span
              className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
              style={{ background: config.colors.soft, color: config.colors.strong }}
            >
              {config.businessLabel}
            </span>
          </div>
        </div>
      </footer>

      {/* ╔═ MOBILE STICKY BAR ════════════════════════════╗ */}
      <div className="fixed inset-x-3 bottom-3 z-50 sm:hidden">
        <a
          href={mergedClinic.phoneHref}
          className="flex items-center justify-center gap-2.5 rounded-full py-4 text-[15px] font-semibold text-white transition-all duration-300 active:scale-[0.97]"
          style={{
            background: `linear-gradient(135deg, #0c1222 0%, ${config.colors.strong} 140%)`,
            boxShadow: `0 8px 32px rgba(15,23,42,0.28), 0 0 0 1px rgba(255,255,255,0.07) inset, 0 0 20px ${config.colors.glow}`,
          }}
        >
          <Phone className="h-[18px] w-[18px]" />
          Call {mergedClinic.shortName || mergedClinic.clinicName}
        </a>
      </div>
    </div>
  );
}
