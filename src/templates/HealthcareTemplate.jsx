import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Quote,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Video,
  X,
} from 'lucide-react';
import DisclaimerBadge from '../components/DisclaimerBadge.jsx';
import { fallbackImageFor } from '../utils/demoData.js';

/* ── Fallback ──────────────────────────────────────────────── */
const fallbackClinic = {
  clinicName:   'HealthCare Studio',
  doctorName:   'Dr. Ananya Sharma',
  specialty:    'General Medicine',
  city:         'Bengaluru',
  phoneDisplay: '+91 98765 43210',
  phoneHref:    'tel:+919876543210',
  whatsappHref: 'https://wa.me/919876543210',
  heroImage:    fallbackImageFor('hospital'),
  services:     [],
  disclaimer:   'Unofficial sample concept — created for design preview only.',
};

/* ── Motion presets ───────────────────────────────────────── */
const sc = (delay = 0) => ({
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: delay } },
});

const fu = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const fr = {
  hidden: { opacity: 0, x: 40 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Stars ────────────────────────────────────────────────── */
function Stars({ count = 5, color = '#F59E0B', size = 'h-3.5 w-3.5' }) {
  return (
    <span className="flex items-center gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className={`${size} fill-current`} style={{ color }} />
      ))}
    </span>
  );
}

/* ── Avatar ───────────────────────────────────────────────── */
function Avatar({ name, accent }) {
  const initials = String(name || 'P')
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join('');
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ring-2 ring-white"
      style={{ background: `linear-gradient(135deg, ${accent}, ${accent}99)` }}
    >
      {initials}
    </div>
  );
}

/* ── Section eyebrow pill ─────────────────────────────────── */
function Pill({ children }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]"
      style={{ borderColor: 'var(--accent-soft)', background: 'var(--accent-soft)', color: 'var(--accent-strong)' }}
    >
      <Sparkles className="h-2.5 w-2.5" />
      {children}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN TEMPLATE
   ══════════════════════════════════════════════════════════════ */
export default function HealthcareTemplate({ config, clinic = fallbackClinic }) {
  const c = { ...fallbackClinic, ...clinic };

  const heroCopy  = c.subheadline || config.heroCopy(c);
  const heroTitle = c.headline    || config.heroTitlePrefix;

  /* Hero image with safe fallback */
  const imgRef = useRef(null);
  const rawSrc = c.heroImage;
  const safeSrc =
    !rawSrc || /undefined|null/.test(rawSrc) || !/^https?:\/\//i.test(rawSrc)
      ? fallbackImageFor(c.businessType)
      : rawSrc;

  /* Services — merge CSV data with config descriptions */
  const services = c.services?.length
    ? c.services.slice(0, 6).map((title, i) => ({
        title,
        description: config.services[i % config.services.length].description,
        icon:        config.services[i % config.services.length].icon,
      }))
    : config.services;

  /* CSS custom properties */
  const cssVars = {
    '--accent':        config.colors.accent,
    '--accent-soft':   config.colors.soft,
    '--accent-strong': config.colors.strong,
    '--accent-glow':   config.colors.glow,
  };

  /* Scroll-aware navbar */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 64);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq]       = useState(null);

  const navLinks = ['Services', 'About', 'Journey', 'Contact'];

  /* Feature grid — config-provided or sensible defaults */
  const featureItems = config.featureItems || [
    { title: 'Caring',   subtitle: '24/7 specialist access',  image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&auto=format&q=70' },
    { title: 'Trusted',  subtitle: 'Rated 5/5 globally',      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=80&h=80&fit=crop&auto=format&q=70' },
    { title: 'Reports',  subtitle: 'Instant lab results',     image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=80&h=80&fit=crop&auto=format&q=70' },
    { title: 'Access',   subtitle: 'Book appointments',       image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=80&h=80&fit=crop&auto=format&q=70' },
    { title: 'Recovery', subtitle: 'Custom treatment plans',  image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop&auto=format&q=70' },
    { title: 'Wellness', subtitle: 'Track diet & vitals',     image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=80&h=80&fit=crop&auto=format&q=70' },
  ];

  const bigStat      = config.bigStat      || { value: '94%', label: 'Patients reported faster access & improved satisfaction' };
  const marqueeText  = config.marqueePhrase || `${c.clinicName} makes trusted care simple — giving you direct access to specialists`;
  const marqueeText2 = config.marqueePhrase2 || 'reports arrive · vitals tracked · care delivered · health matters · book today';

  /* Marquee items (6 × 2 = 12 for seamless loop) */
  const marqueeItems  = Array(6).fill(marqueeText);
  const marqueeItems2 = Array(6).fill(marqueeText2);

  return (
    <div
      id="top"
      style={cssVars}
      className="min-h-screen bg-[#F0EDE8] text-[#1A1916] antialiased"
    >
      <DisclaimerBadge text={c.disclaimer} />

      {/* ╔═ NAVBAR ══════════════════════════════════════════════╗ */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-[#F0EDE8]/96 shadow-sm backdrop-blur-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          {/* Brand */}
          <a href="#top" className="flex items-center gap-2.5 text-[17px] font-bold tracking-tight text-[#1A1916]">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
              style={{ background: `linear-gradient(135deg, var(--accent), var(--accent-strong))` }}
            >
              <config.navIcon className="h-4 w-4" />
            </div>
            <span className="hidden sm:block">{c.clinicName}</span>
            <span className="sm:hidden">{config.shortLabel}</span>
            <sup className="text-[10px] text-[#9B9590]">®</sup>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map(l => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-[14px] text-[#6B6560] transition-colors duration-200 hover:text-[#1A1916]"
              >
                {l}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href={c.phoneHref}
              className="hidden items-center gap-2 rounded-full bg-[#1A1916] px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:inline-flex"
            >
              <Phone className="h-3.5 w-3.5" />
              Book a call
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(v => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1A1916] text-white md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="overflow-hidden border-t border-[#E3DED8] bg-[#F0EDE8] px-5 py-3"
            >
              {navLinks.map(l => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="block border-b border-[#E3DED8] py-3.5 text-[15px] font-medium text-[#3A3630] last:border-0 hover:text-[#1A1916]"
                >
                  {l}
                </a>
              ))}
              <a
                href={c.phoneHref}
                className="mb-2 mt-4 flex items-center justify-center gap-2 rounded-full bg-[#1A1916] py-3.5 text-[15px] font-semibold text-white"
              >
                <Phone className="h-4 w-4" />
                Book a call
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="overflow-hidden">
        {/* ╔═ HERO ════════════════════════════════════════════════╗ */}
        <section className="px-5 pb-28 pt-14 sm:px-8 sm:pb-36 sm:pt-20 lg:px-10 lg:pt-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center xl:gap-20">

            {/* Left: copy */}
            <motion.div variants={sc()} initial="hidden" animate="show" className="flex flex-col">

              {/* City / type badge */}
              <motion.div variants={fu} className="mb-7 inline-flex">
                <span className="inline-flex items-center gap-2 text-[14px] text-[#6B6560]">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: 'var(--accent)' }}
                  />
                  {c.city} · {config.businessLabel}
                </span>
              </motion.div>

              {/* Main headline */}
              <motion.h1
                variants={fu}
                className="max-w-[600px] text-[2.625rem] font-bold leading-[1.02] tracking-[-0.025em] sm:text-[3.5rem] lg:text-[4rem]"
              >
                {heroTitle}{' '}
                <span style={{ color: 'var(--accent-strong)' }}>
                  {config.heroTitleAccent}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fu}
                className="mt-6 max-w-[480px] text-[1.0625rem] leading-[1.8] text-[#6B6560]"
              >
                {heroCopy}
              </motion.p>

              {/* CTA + stars */}
              <motion.div variants={fu} className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={c.phoneHref}
                  className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  style={{ background: `linear-gradient(135deg, var(--accent), var(--accent-strong))` }}
                >
                  <CalendarDays className="h-4 w-4" />
                  Book a call
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <div className="flex items-center gap-2">
                  <Stars />
                  <span className="text-[13px] text-[#9B9590]">5/5 (Design preview)</span>
                </div>
              </motion.div>

              {/* Stats row with accent dots */}
              <motion.div variants={fu} className="mt-10 flex flex-wrap items-center gap-5">
                {(config.stats || []).slice(0, 3).map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-5">
                    {i > 0 && (
                      <span
                        className="h-3 w-3 shrink-0 rounded-full"
                        style={{ background: 'var(--accent)' }}
                      />
                    )}
                    <div>
                      <p
                        className="text-[1.875rem] font-bold leading-none"
                        style={{ color: 'var(--accent-strong)' }}
                      >
                        {stat.value}
                      </p>
                      <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-[#9B9590]">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* WhatsApp secondary link */}
              <motion.div variants={fu} className="mt-6">
                <a
                  href={c.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-[#6B6560] underline-offset-2 hover:underline"
                >
                  <MessageCircle className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                  Or chat on WhatsApp
                </a>
              </motion.div>
            </motion.div>

            {/* Right: hero image */}
            <motion.div variants={fr} initial="hidden" animate="show" className="relative">
              {/* Glow aura */}
              <div
                className="pointer-events-none absolute -inset-8 rounded-[3rem] opacity-50"
                style={{
                  background: `radial-gradient(ellipse, ${config.colors.glow} 0%, transparent 70%)`,
                  filter: 'blur(56px)',
                }}
              />

              {/* Image frame */}
              <div
                className="relative overflow-hidden rounded-[2.25rem] bg-white shadow-2xl shadow-black/[0.12]"
                style={{ aspectRatio: '4/5', maxHeight: '580px' }}
              >
                <img
                  ref={imgRef}
                  src={safeSrc}
                  alt={`${c.clinicName} design preview`}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                  onError={() => {
                    if (imgRef.current) imgRef.current.src = fallbackImageFor(c.businessType);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                {/* Live badge top-left */}
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/92 px-4 py-2 text-[13px] font-semibold text-[#1A1916] shadow-md backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                      style={{ background: 'var(--accent)' }}
                    />
                    <span
                      className="relative inline-flex h-2 w-2 rounded-full"
                      style={{ background: 'var(--accent)' }}
                    />
                  </span>
                  {config.visualLabel}
                </div>

                {/* Icon badge bottom-right */}
                <div
                  className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg"
                  style={{ background: `linear-gradient(135deg, var(--accent), var(--accent-strong))` }}
                >
                  <config.heroIcon className="h-5 w-5" />
                </div>
              </div>

              {/* Floating appointment card */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="glass-float absolute -bottom-8 -left-5 z-10 w-[220px] rounded-2xl p-4 sm:-left-8 sm:w-[260px] sm:p-5"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
                    style={{ background: `linear-gradient(135deg, var(--accent), var(--accent-strong))` }}
                  >
                    <CalendarDays className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#9B9590]">
                      Next available
                    </p>
                    <p className="text-[13px] font-semibold text-[#1A1916]">Book appointment</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[12px] text-[#6B6560]">
                  <MapPin className="h-3 w-3" style={{ color: 'var(--accent)' }} />
                  {c.cityShort || c.city}
                </div>
                {/* Avatar stack */}
                <div className="mt-3 flex items-center -space-x-2">
                  {['Dr', 'Dr', 'Dr'].map((d, i) => (
                    <div
                      key={i}
                      className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[9px] font-bold text-white"
                      style={{ background: `var(--accent-strong)`, opacity: 1 - i * 0.15 }}
                    >
                      {d}
                    </div>
                  ))}
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[9px] font-bold text-white"
                    style={{ background: 'var(--accent)' }}
                  >
                    +4
                  </div>
                </div>
              </motion.div>

              {/* Trust pill top-right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -right-4 top-8 hidden items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-[12px] font-semibold text-[#1A1916] shadow-lg backdrop-blur-xl sm:flex"
              >
                <ShieldCheck className="h-3.5 w-3.5" style={{ color: 'var(--accent)' }} />
                Design preview only
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ╔═ MARQUEE TEXT ════════════════════════════════════════╗ */}
        <section className="overflow-hidden border-y border-[#E3DED8] bg-white py-10">
          {/* Line 1 — forward */}
          <div className="overflow-hidden">
            <div className="marquee-track">
              {[...marqueeItems, ...marqueeItems].map((text, i) => (
                <span
                  key={i}
                  className="mx-7 whitespace-nowrap text-[1.875rem] font-bold sm:text-[2.25rem]"
                  style={{ color: i % 2 === 0 ? '#1A1916' : '#C5BFB8' }}
                >
                  {text}
                  <span className="mx-4 text-[#E3DED8]">—</span>
                </span>
              ))}
            </div>
          </div>
          {/* Line 2 — reverse, muted */}
          <div className="mt-4 overflow-hidden">
            <div className="marquee-track-reverse">
              {[...marqueeItems2, ...marqueeItems2].map((text, i) => (
                <span
                  key={i}
                  className="mx-7 whitespace-nowrap text-[1.25rem] font-semibold text-[#C5BFB8] sm:text-[1.5rem]"
                >
                  {text}
                  <span className="mx-3 text-[#E3DED8]">·</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ╔═ FEATURE GRID (3 × 2) ═══════════════════════════════╗ */}
        <section className="px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={sc()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="grid gap-y-10 gap-x-6 sm:grid-cols-3"
            >
              {featureItems.map((item, i) => (
                <motion.div
                  key={`${item.title}-${i}`}
                  variants={fu}
                  className="flex items-start gap-4"
                >
                  {/* Thumbnail */}
                  <div
                    className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-xl"
                    style={{ boxShadow: '0 6px 20px rgba(0,0,0,0.13)' }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      onError={e => {
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.style.background = 'var(--accent-soft)';
                          e.currentTarget.style.display = 'none';
                        }
                      }}
                    />
                  </div>
                  {/* Text */}
                  <div className="pt-1">
                    <h3 className="text-[15px] font-semibold text-[#1A1916]">{item.title}</h3>
                    <p className="mt-0.5 text-[13px] text-[#9B9590]">{item.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ╔═ WHAT WE ACTUALLY MEAN ══════════════════════════════╗ */}
        <section className="overflow-hidden bg-white px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative text-center"
            >
              {/* Eyebrow */}
              <div className="mb-6 inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ background: 'var(--accent)' }} />
                <span className="text-[14px] text-[#6B6560]">We deliver results</span>
              </div>

              {/* Headline */}
              <h2 className="mx-auto max-w-3xl text-[2.5rem] font-bold leading-[1.05] tracking-[-0.02em] sm:text-[3.5rem]">
                What {c.clinicName} actually means
              </h2>

              {/* Copy */}
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.8] text-[#6B6560]">
                {c.clinicName} connects patients with {config.shortLabel.toLowerCase()} specialists, diagnostics,
                and care plans that actually make a difference.
              </p>

              {/* Page counter watermark */}
              <div className="mt-20 flex items-center gap-6">
                <p className="shrink-0 text-[13px] font-medium text-[#C5BFB8]">HJ® — 01</p>
                <div
                  className="h-px flex-1"
                  style={{ background: 'linear-gradient(90deg, #E3DED8, transparent)' }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ╔═ SERVICES ════════════════════════════════════════════╗ */}
        <section id="services" className="px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">

            {/* Section header */}
            <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Pill>{config.businessLabel}</Pill>
                <h2 className="mt-4 max-w-lg text-[2.5rem] font-bold leading-[1.05] tracking-[-0.02em] sm:text-[3rem]">
                  {config.servicesTitle}
                </h2>
              </div>
              {config.servicesCopy && (
                <p className="max-w-sm text-[15px] leading-[1.75] text-[#6B6560] lg:text-right">
                  {config.servicesCopy}
                </p>
              )}
            </div>

            {/* Cards */}
            <motion.div
              variants={sc()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.08 }}
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            >
              {services.map((svc, i) => (
                <motion.article
                  key={svc.title}
                  variants={fu}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group relative overflow-hidden rounded-2xl border border-[#E8E4DE] bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl"
                >
                  {/* Ghost number */}
                  <span className="pointer-events-none absolute right-5 top-4 select-none text-[2.75rem] font-black leading-none text-[#1A1916]/[0.05]">
                    /{String(i + 1).padStart(3, '0')}
                  </span>

                  {/* Icon */}
                  <div
                    className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-sm transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, var(--accent), var(--accent-strong))` }}
                  >
                    <svc.icon className="h-5.5 w-5.5" />
                  </div>

                  <h3 className="text-[1.125rem] font-semibold tracking-tight text-[#1A1916]">
                    {svc.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.75] text-[#6B6560]">{svc.description}</p>

                  <div
                    className="mt-6 flex items-center gap-1.5 text-[12px] font-semibold opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    style={{ color: 'var(--accent-strong)' }}
                  >
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>

                  {/* Bottom accent line on hover */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-0.5 rounded-b-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `linear-gradient(90deg, var(--accent), transparent)` }}
                  />
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ╔═ BENTO PATIENT JOURNEY ═══════════════════════════════╗ */}
        <section id="journey" className="bg-white px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">

            {/* Header */}
            <div className="mb-14 text-center">
              <Pill>Patient journey</Pill>
              <h2 className="mx-auto mt-4 max-w-2xl text-[2.5rem] font-bold leading-[1.05] tracking-[-0.02em] sm:text-[3rem]">
                {config.journeyTitle}
              </h2>
              {config.journeyCopy && (
                <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.75] text-[#6B6560]">
                  {config.journeyCopy}
                </p>
              )}
            </div>

            {/* 3-column bento */}
            <motion.div
              variants={sc()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.08 }}
              className="grid gap-4 lg:grid-cols-3"
            >
              {/* Col 1: Lab timeline */}
              <motion.div
                variants={fu}
                className="flex flex-col rounded-2xl border border-[#E8E4DE] bg-[#F7F4F0] p-6"
              >
                <h3 className="mb-5 text-[1.0625rem] font-semibold text-[#1A1916]">
                  Track consultations &amp; test results
                </h3>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Lab report received',    date: 'Today, 9:41 AM',        done: true  },
                    { label: 'Doctor review complete', date: 'Yesterday, 3:20 PM',     done: true  },
                    { label: 'Prescription note',      date: '2 days ago, 11:00 AM',   done: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl bg-white p-3.5 shadow-sm">
                      <div
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                        style={{ background: item.done ? 'var(--accent-soft)' : '#F0EDE8' }}
                      >
                        {item.done
                          ? <CheckCircle2 className="h-3.5 w-3.5" style={{ color: 'var(--accent-strong)' }} />
                          : <Clock className="h-3 w-3 text-[#9B9590]" />
                        }
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-[#1A1916]">{item.label}</p>
                        <p className="text-[11px] text-[#9B9590]">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-4 flex items-center gap-2 rounded-xl border border-[#E8E4DE] px-4 py-3 text-[13px] text-[#6B6560] transition-colors hover:border-[var(--accent-soft)]"
                >
                  <FileText className="h-4 w-4" style={{ color: 'var(--accent)' }} />
                  View all results
                  <ArrowRight className="ml-auto h-3.5 w-3.5" />
                </button>
              </motion.div>

              {/* Col 2: Chat mockup */}
              <motion.div
                variants={fu}
                className="flex flex-col rounded-2xl border border-[#E8E4DE] bg-[#F7F4F0] p-6"
              >
                <h3 className="mb-5 text-[1.0625rem] font-semibold text-[#1A1916]">
                  Connect with doctors anytime
                </h3>
                <div className="flex flex-1 flex-col gap-3">
                  {/* Doctor bubble */}
                  <div className="flex items-end gap-2">
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ background: 'var(--accent)' }}
                    >
                      Dr
                    </div>
                    <div className="max-w-[200px] rounded-2xl rounded-bl-sm bg-white px-4 py-2.5 shadow-sm">
                      <p className="text-[13px] text-[#1A1916]">Good morning! How are you feeling today?</p>
                      <p className="mt-1 text-[10px] text-[#9B9590]">9:12 AM</p>
                    </div>
                  </div>
                  {/* Patient bubble */}
                  <div className="flex items-end justify-end gap-2">
                    <div
                      className="max-w-[180px] rounded-2xl rounded-br-sm px-4 py-2.5 text-white shadow-sm"
                      style={{ background: 'var(--accent)' }}
                    >
                      <p className="text-[13px]">Much better, thank you!</p>
                      <p className="mt-1 text-[10px] opacity-70">9:15 AM</p>
                    </div>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8E4DE] text-[10px] font-bold text-[#6B6560]">
                      P
                    </div>
                  </div>
                  {/* Doctor bubble 2 */}
                  <div className="flex items-end gap-2">
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ background: 'var(--accent)' }}
                    >
                      Dr
                    </div>
                    <div className="max-w-[200px] rounded-2xl rounded-bl-sm bg-white px-4 py-2.5 shadow-sm">
                      <p className="text-[13px] text-[#1A1916]">Please take your medication after meals. ✓✓</p>
                      <p className="mt-1 text-[10px] text-[#9B9590]">9:16 AM</p>
                    </div>
                  </div>
                </div>
                {/* Input row */}
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm">
                  <input
                    disabled
                    placeholder="Type a message…"
                    className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-[#C5BFB8]"
                  />
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full text-white"
                    style={{ background: 'var(--accent)' }}
                  >
                    <Send className="h-3.5 w-3.5" />
                  </div>
                </div>
              </motion.div>

              {/* Col 3: Video call mockup */}
              <motion.div
                variants={fu}
                className="relative overflow-hidden rounded-2xl p-6 text-white"
                style={{ background: `linear-gradient(150deg, #1A1916 0%, ${config.colors.strong}cc 100%)` }}
              >
                <h3 className="mb-5 text-[1.0625rem] font-semibold">
                  Doctors through video consultations
                </h3>

                {/* Video area */}
                <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={safeSrc}
                    alt="Video call preview"
                    className="h-full w-full object-cover opacity-75"
                    onError={e => { e.currentTarget.style.opacity = '0'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Duration badge */}
                  <div className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-mono font-medium text-white backdrop-blur-sm">
                    ● 00:12:34
                  </div>

                  {/* Controls */}
                  <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <Video className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 shadow-lg">
                      <Phone className="h-5 w-5 rotate-[135deg] text-white" />
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <MessageCircle className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Doctor info */}
                <div className="mt-4 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold text-white"
                    style={{ background: 'rgba(255,255,255,0.15)' }}
                  >
                    {(c.doctorName || 'Dr').split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold">{c.doctorName}</p>
                    <p className="text-[11px] opacity-60">{c.specialty}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    Online
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ╔═ BIG STAT ════════════════════════════════════════════╗ */}
        <section className="relative overflow-hidden px-5 py-32 sm:px-8 lg:px-10">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src={safeSrc}
              alt=""
              aria-hidden
              className="h-full w-full object-cover"
              style={{ opacity: 0.18 }}
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(145deg, ${config.colors.strong}f0 0%, ${config.colors.accent}cc 100%)` }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl text-center text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[5.5rem] font-bold leading-none tracking-tight sm:text-[7rem] lg:text-[9rem]">
                {bigStat.value}
              </p>
              <p className="mx-auto mt-5 max-w-lg text-[1.125rem] leading-[1.75] text-white/80">
                {bigStat.label}
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <Stars color="rgba(255,255,255,0.8)" />
                <span className="text-[13px] text-white/60">Sample design metric</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ╔═ TESTIMONIALS ════════════════════════════════════════╗ */}
        <section id="about" className="bg-white px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Pill>Sample testimonials</Pill>
                <h2 className="mt-4 text-[2.5rem] font-bold leading-[1.05] tracking-[-0.02em] sm:text-[3rem]">
                  Clearly marked demo feedback.
                </h2>
              </div>
              <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-700">
                Not real patient reviews
              </span>
            </div>

            <motion.div
              variants={sc()}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.08 }}
              className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              {(config.testimonials || []).map(t => (
                <motion.article
                  key={t.author}
                  variants={fu}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="flex flex-col rounded-2xl border border-[#E8E4DE] bg-[#F7F4F0] p-7 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="mb-4"><Stars /></div>
                  <Quote className="mb-4 h-6 w-6 opacity-40" style={{ color: 'var(--accent)' }} />
                  <p className="flex-1 text-[15px] leading-[1.85] text-[#3A3630]">"{t.quote}"</p>
                  <div className="mt-7 flex items-center gap-3 border-t border-[#E8E4DE] pt-5">
                    <Avatar name={t.author} accent={config.colors.accent} />
                    <div>
                      <p className="text-[13px] font-semibold text-[#1A1916]">{t.author}</p>
                      <p className="text-[11px] text-[#9B9590]">{t.role}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ╔═ FAQ + SIDE CARD ═════════════════════════════════════╗ */}
        <section className="px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 text-center">
              <Pill>FAQ</Pill>
              <h2 className="mx-auto mt-4 max-w-xl text-[2.5rem] font-bold leading-[1.05] tracking-[-0.02em] sm:text-[3rem]">
                Practical answers, compliant copy.
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              {/* Accordion */}
              <div className="space-y-3">
                {(config.faqs || []).map((faq, i) => (
                  <motion.div
                    key={faq.q}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    className="overflow-hidden rounded-2xl border border-[#E8E4DE] bg-white shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-[#F7F4F0]"
                    >
                      <span className="text-[15px] font-semibold text-[#1A1916]">{faq.q}</span>
                      <motion.span
                        animate={{ rotate: openFaq === i ? 180 : 0 }}
                        transition={{ duration: 0.22 }}
                        className="shrink-0"
                      >
                        <ChevronDown className="h-5 w-5 text-[#9B9590]" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                          <div
                            className="mx-6 border-l-2 pl-4 pb-5 pt-1 text-[14px] leading-[1.85] text-[#6B6560]"
                            style={{ borderColor: 'var(--accent)' }}
                          >
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {/* Side discovery card */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className="relative overflow-hidden rounded-2xl p-7 text-white"
                style={{ background: `linear-gradient(150deg, #1A1916 0%, ${config.colors.strong}bb 100%)` }}
              >
                <div
                  className="premium-blob animate-float absolute -right-8 -top-8 h-48 w-48 opacity-20"
                  style={{ background: config.colors.accent }}
                />
                <div className="relative">
                  <div className="mb-6 overflow-hidden rounded-xl" style={{ aspectRatio: '16/9' }}>
                    <img src={safeSrc} alt="" className="h-full w-full object-cover opacity-60" />
                  </div>
                  <h3 className="text-[1.25rem] font-bold">Still not sure?</h3>
                  <p className="mt-2 text-[14px] text-white/70">
                    Book a free discovery call and speak directly with our team.
                  </p>
                  <a
                    href={c.phoneHref}
                    className="mt-6 flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-[#1A1916] shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Phone className="h-4 w-4" />
                    Book a call
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ╔═ FOOTER CTA ══════════════════════════════════════════╗ */}
        <section id="contact" className="px-5 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="relative overflow-hidden rounded-3xl p-12 text-center sm:p-16 lg:p-20"
              style={{ background: `linear-gradient(150deg, #1A1916 0%, ${config.colors.strong}cc 100%)` }}
            >
              {/* Dot grid */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />
              {/* Glow blob */}
              <div
                className="premium-blob animate-float-slow absolute -right-20 -top-20 h-96 w-96 opacity-25"
                style={{ background: config.colors.accent }}
              />

              <div className="relative">
                <div className="mb-6 flex items-center justify-center gap-2">
                  <Stars color="rgba(255,255,255,0.9)" />
                  <span className="text-[13px] text-white/50">Design preview</span>
                </div>

                <h2 className="mx-auto max-w-2xl text-[2.5rem] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-[3.5rem]">
                  {config.ctaTitle}
                </h2>
                <p className="mx-auto mt-5 max-w-md text-[1.0625rem] leading-[1.75] text-white/55">
                  {config.ctaCopy(c)}
                </p>

                <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <a
                    href={c.phoneHref}
                    className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[15px] font-semibold text-[#1A1916] shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-white/20"
                  >
                    <Phone className="h-4 w-4" />
                    Book a call
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href={c.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-8 py-4 text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/10"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>

                {/* Big logo watermark */}
                <p className="pointer-events-none mt-14 select-none text-[5rem] font-black leading-none tracking-tight text-white/[0.04] sm:text-[8rem]">
                  HJ®
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ╔═ FOOTER ══════════════════════════════════════════════╗ */}
      <footer className="border-t border-[#E3DED8] bg-white px-5 pb-10 pt-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">

          {/* Brand + social */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-[1.5rem] font-bold text-[#1A1916]">
                {c.clinicName}
                <sup className="ml-0.5 text-[11px] text-[#9B9590]">®</sup>
              </h2>
              <p className="mt-1.5 text-[14px] text-[#9B9590]">{config.footerTagline}</p>
            </div>
            <div className="flex items-center gap-2.5">
              {['IG', 'TW', 'FB', 'LI'].map(s => (
                <div
                  key={s}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E4DE] bg-[#F7F4F0] text-[11px] font-bold text-[#6B6560] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent-strong)] cursor-pointer"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div className="my-10 h-px bg-[#E8E4DE]" />

          {/* Bottom grid */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1fr_160px_200px]">

            {/* Newsletter */}
            <div>
              <h3 className="text-[1.125rem] font-bold text-[#1A1916]">Subscribe to our newsletter</h3>
              <p className="mt-1.5 text-[14px] text-[#9B9590]">Stay updated with fresh ideas</p>
              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 rounded-full border border-[#E8E4DE] bg-[#F7F4F0] px-5 py-3 text-[14px] text-[#1A1916] placeholder:text-[#C5BFB8] outline-none transition-colors focus:border-[var(--accent)]"
                />
                <button
                  type="button"
                  className="rounded-full px-6 py-3 text-[14px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: `linear-gradient(135deg, var(--accent), var(--accent-strong))` }}
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9B9590]">
                Navigation:
              </p>
              <div className="space-y-2.5">
                {['Services', 'About', 'Journey', 'Blog', 'Contact'].map((l, i) => (
                  <a
                    key={l}
                    href={`#${l.toLowerCase()}`}
                    className="flex items-center gap-2 text-[14px] text-[#3A3630] transition-colors hover:text-[var(--accent-strong)]"
                  >
                    <span className="text-[11px] font-semibold" style={{ color: 'var(--accent)' }}>
                      {String(i + 1).padStart(2, '0')}/
                    </span>
                    {l}
                  </a>
                ))}
              </div>
            </div>

            {/* Other information */}
            <div>
              <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9B9590]">
                Other Information:
              </p>
              <div className="space-y-2.5">
                {[
                  { idx: '01', val: c.email || 'info@clinic.demo' },
                  { idx: '02', val: c.phoneDisplay },
                  { idx: '03', val: c.city },
                ].map(item => (
                  <div key={item.idx} className="flex items-start gap-2 text-[14px] text-[#3A3630]">
                    <span className="shrink-0 text-[11px] font-semibold" style={{ color: 'var(--accent)' }}>
                      {item.idx}/
                    </span>
                    <span className="break-all">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#E8E4DE] pt-6 text-[12px] text-[#9B9590] sm:flex-row">
            <span>Copyright © {c.clinicName} {new Date().getFullYear()}</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
              {c.disclaimer}
            </span>
          </div>
        </div>
      </footer>

      {/* ╔═ MOBILE STICKY CTA ═══════════════════════════════════╗ */}
      <div className="fixed inset-x-3 bottom-3 z-50 sm:hidden">
        <a
          href={c.phoneHref}
          className="flex items-center justify-center gap-2.5 rounded-full py-4 text-[15px] font-semibold text-white shadow-2xl transition-all duration-300 active:scale-[0.97]"
          style={{
            background: `linear-gradient(135deg, #1A1916 0%, var(--accent-strong) 140%)`,
            boxShadow: `0 8px 32px rgba(26,25,22,0.28), 0 0 20px ${config.colors.glow}`,
          }}
        >
          <Phone className="h-[18px] w-[18px]" />
          Call {c.shortName || c.clinicName}
        </a>
      </div>
    </div>
  );
}
