import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const csvPath = path.join(rootDir, 'src/data/leads.csv');
const distAssetsDir = path.join(rootDir, 'dist/assets');
const publishDir = path.join(rootDir, 'publish');
const publishAssetsDir = path.join(publishDir, 'assets');
const batchName = process.argv[2] || 'batch_1';
const basePath = '/healthcare-premium-demos/';
const disclaimer = 'Unofficial sample concept — created for design preview only.';

const fallbackImages = {
  dentist: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=80',
  dermatologist: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
  physiotherapy: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
  'diagnostic-center': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
  hospital: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  clinic: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  ayurveda: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
  general: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
};

const templates = {
  dentist: {
    label: 'Dental Studio',
    accent: '#0891b2',
    accent2: '#14b8a6',
    soft: '#ecfeff',
    glow: 'rgba(125, 211, 252, 0.46)',
    icon: 'smile',
    fallbackHeadline: city => `Premium Dental Care in ${city}`,
    fallbackSubheadline: 'Comfort-first dental care with clear guidance and easy appointment access.',
    trustTitle: 'Dental care pages built around clarity and comfort.',
    trustCopy: 'A polished dental layout with measured language, clear appointment flow, and no exaggerated treatment claims.',
    journey: ['Call or WhatsApp', 'Share your concern', 'Visit the studio', 'Review next steps'],
  },
  dermatologist: {
    label: 'Dermatology Clinic',
    accent: '#7e22ce',
    accent2: '#c084fc',
    soft: '#faf5ff',
    glow: 'rgba(216, 180, 254, 0.46)',
    icon: 'sparkles',
    fallbackHeadline: city => `Advanced Skin Care in ${city}`,
    fallbackSubheadline: 'Clean dermatology consultation flow with calm, patient-friendly guidance.',
    trustTitle: 'Skin-care pages with a private, premium tone.',
    trustCopy: 'Service sections are framed as consultation topics and avoid before-after promises or outcome claims.',
    journey: ['Request consult', 'Share skin concern', 'Visit the clinic', 'Receive guidance'],
  },
  physiotherapy: {
    label: 'Physiotherapy Care',
    accent: '#047857',
    accent2: '#34d399',
    soft: '#ecfdf5',
    glow: 'rgba(110, 231, 183, 0.44)',
    icon: 'activity',
    fallbackHeadline: city => `Physiotherapy Care in ${city}`,
    fallbackSubheadline: 'Supportive movement-focused care with simple session booking.',
    trustTitle: 'Movement support presented with clarity.',
    trustCopy: 'The design feels active and reassuring without promising recovery timelines or results.',
    journey: ['Connect', 'Share mobility goals', 'Attend session', 'Plan follow-up'],
  },
  'diagnostic-center': {
    label: 'Diagnostic Center',
    accent: '#0369a1',
    accent2: '#38bdf8',
    soft: '#f0f9ff',
    glow: 'rgba(125, 211, 252, 0.5)',
    icon: 'test',
    fallbackHeadline: city => `Diagnostic Center in ${city}`,
    fallbackSubheadline: 'Clear test booking, report support, and patient-friendly navigation.',
    trustTitle: 'Diagnostic browsing designed for quick understanding.',
    trustCopy: 'The layout focuses on organized test information and avoids accuracy or turnaround claims.',
    journey: ['Choose test', 'Book slot', 'Visit center', 'Access reports'],
  },
  hospital: {
    label: 'Healthcare Center',
    accent: '#1d4ed8',
    accent2: '#60a5fa',
    soft: '#eff6ff',
    glow: 'rgba(147, 197, 253, 0.46)',
    icon: 'hospital',
    fallbackHeadline: city => `Advanced Healthcare in ${city}`,
    fallbackSubheadline: 'Clear department discovery, visitor support, and easy contact access.',
    trustTitle: 'A clear structure for healthcare decisions.',
    trustCopy: 'The page uses navigation, restraint, and visible contact paths instead of fake rankings or awards.',
    journey: ['Explore care', 'Contact desk', 'Plan visit', 'Follow guidance'],
  },
  ayurveda: {
    label: 'Ayurveda Wellness',
    accent: '#4d7c0f',
    accent2: '#84cc16',
    soft: '#f7fee7',
    glow: 'rgba(190, 242, 100, 0.42)',
    icon: 'leaf',
    fallbackHeadline: city => `Ayurveda Wellness in ${city}`,
    fallbackSubheadline: 'Serene consultation flow with nature-inspired wellness presentation.',
    trustTitle: 'A calm wellness tone with responsible copy.',
    trustCopy: 'The page stays consultative and avoids cure claims or guaranteed outcomes.',
    journey: ['Request consult', 'Share wellness goals', 'Visit clinic', 'Review guidance'],
  },
};

const businessTypeToTemplate = {
  dentist: 'dentist',
  dermatologist: 'dermatologist',
  physiotherapy: 'physiotherapy',
  'diagnostic-center': 'diagnostic-center',
  hospital: 'hospital',
  ayurveda: 'ayurveda',
  clinic: 'hospital',
};

function parseCsv(source) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];
    const next = source[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(cell);
      cell = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') i += 1;
      row.push(cell);
      if (row.some(value => value.trim() !== '')) rows.push(row);
      row = [];
      cell = '';
      continue;
    }

    cell += char;
  }

  row.push(cell);
  if (row.some(value => value.trim() !== '')) rows.push(row);

  const headers = rows.shift().map(header => header.trim());
  return rows.map(values => Object.fromEntries(headers.map((header, index) => [header, (values[index] || '').trim()])));
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function safeSlug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

function cityShort(city) {
  return (city || 'your city').split(',')[0].trim() || 'your city';
}

function normalizePhoneHref(phone) {
  const digits = phone.replace(/[^\d+]/g, '');
  return digits ? `tel:${digits}` : '#contact';
}

function isUnsafeImageUrl(url) {
  const value = String(url || '').trim();
  return !value || value.includes('undefined') || value.includes('null') || !/^https?:\/\//i.test(value);
}

function safeImage(url, fallback) {
  return isUnsafeImageUrl(url) ? fallback : url.trim();
}

function fallbackForBusinessType(businessType) {
  return fallbackImages[businessType] || fallbackImages[businessTypeToTemplate[businessType]] || fallbackImages.general;
}

function initials(value) {
  const words = String(value || 'HC').split(/\s+/).filter(Boolean);
  return words.slice(0, 2).map(word => word[0]).join('').toUpperCase() || 'HC';
}

function pageUrl(slug) {
  return `${basePath}${slug}/`;
}

function iconSvg(name) {
  const common = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  const paths = {
    smile: '<circle cx="12" cy="12" r="9"/><path d="M8.5 10h.01M15.5 10h.01M8 14.2c1.1 1.1 2.4 1.6 4 1.6s2.9-.5 4-1.6"/>',
    sparkles: '<path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"/>',
    activity: '<path d="M3 12h4l2-6 4 12 2-6h6"/>',
    test: '<path d="M9 2h6"/><path d="M10 2v6l-5 9a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 17l-5-9V2"/><path d="M8 15h8"/>',
    hospital: '<path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16"/><path d="M9 21v-6h6v6"/><path d="M12 7v5M9.5 9.5h5"/>',
    leaf: '<path d="M20 4c-8 0-14 5-14 12a4 4 0 0 0 4 4c7 0 10-8 10-16z"/><path d="M6 20c2-5 6-8 12-10"/>',
  };

  return `<svg viewBox="0 0 24 24" aria-hidden="true" ${common}>${paths[name] || paths.sparkles}</svg>`;
}

function safeImageMarkup(src, fallback, alt, className = '') {
  return `<img${className ? ` class="${className}"` : ''} src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" onerror="this.onerror=null;this.src='${escapeHtml(fallback)}';" />`;
}

function logoMarkup(row, template) {
  if (isUnsafeImageUrl(row.logo_url)) {
    return `<span class="logo-mark">${escapeHtml(initials(row.clinic_name))}</span>`;
  }

  const fallback = fallbackForBusinessType(row.business_type);
  return `<span class="logo-mark image-logo">${safeImageMarkup(safeImage(row.logo_url, fallback), fallback, `${row.clinic_name} logo`)}</span>`;
}

function doctorMarkup(row, template, fallback) {
  if (isUnsafeImageUrl(row.profile_photo_url)) {
    return `<div class="doctor-avatar initials-avatar">${escapeHtml(initials(row.doctor_name || row.clinic_name))}</div>`;
  }

  return `<div class="doctor-avatar image-avatar">${safeImageMarkup(safeImage(row.profile_photo_url, fallback), fallback, `${row.doctor_name || row.clinic_name} profile`)}</div>`;
}

function renderPage(row) {
  const businessType = row.business_type || 'hospital';
  const templateKey = businessTypeToTemplate[businessType] || 'hospital';
  const template = templates[templateKey];
  const city = cityShort(row.city);
  const services = (row.services || '')
    .split('|')
    .map(service => service.trim())
    .filter(Boolean)
    .slice(0, 4);
  const safeServices = services.length ? services : ['Consultation', 'Care Planning', 'Follow-up Support', 'Patient Guidance'];
  const headline = row.headline || template.fallbackHeadline(city);
  const subheadline = row.subheadline || template.fallbackSubheadline;
  const ctaLink = row.cta_link || normalizePhoneHref(row.phone || '');
  const phoneHref = normalizePhoneHref(row.phone || '');
  const doctor = row.doctor_name || 'Care Team';
  const specialty = row.specialty || template.label;
  const about = row.about || `${row.clinic_name} offers a calm, clear, and patient-friendly healthcare experience in ${city}.`;
  const fallback = fallbackForBusinessType(businessType);
  const bannerImage = safeImage(row.banner_image_url, fallback);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(row.clinic_name)} | Premium Healthcare Demo</title>
  ${sharedStyles(template)}
</head>
<body>
  <div class="disclaimer">${disclaimer}</div>
  <div class="nav-wrap">
    <nav class="nav">
      <a class="brand" href="${basePath}">
        ${logoMarkup(row, template)}
        <span>${escapeHtml(row.clinic_name)}</span>
      </a>
      <div class="nav-links">
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#trust">Trust</a>
        <a href="#contact">Contact</a>
      </div>
      <a class="nav-cta" href="${escapeHtml(phoneHref)}">Call <span>${escapeHtml(row.phone || '')}</span></a>
    </nav>
  </div>

  <main>
    <section id="top" class="hero">
      <div class="blob blob-a"></div>
      <div class="blob blob-b"></div>
      <div class="container hero-grid">
        <div class="reveal">
          <div class="eyebrow">${iconSvg(template.icon)} ${escapeHtml(city)} ${escapeHtml(template.label)}</div>
          <h1>${escapeHtml(headline)} <span class="gradient-text">for modern patient outreach.</span></h1>
          <p class="subhead">${escapeHtml(subheadline)}</p>
          <div class="actions">
            <a class="btn-primary" href="${escapeHtml(phoneHref)}">Call now</a>
            <a class="btn-secondary" href="${escapeHtml(ctaLink)}">WhatsApp chat</a>
          </div>
          <div class="badges">
            <div class="badge delay-1"><span class="badge-dot">✓</span> Clear appointment path</div>
            <div class="badge delay-2"><span class="badge-dot">✓</span> Calm premium design</div>
            <div class="badge delay-3"><span class="badge-dot">✓</span> Sample-safe copy</div>
          </div>
        </div>

        <div class="visual-shell reveal delay-2">
          <div class="visual-glow"></div>
          <div class="visual-card">
            <div class="visual-image-wrap">
              ${safeImageMarkup(bannerImage, fallback, `${row.clinic_name} visual preview`)}
            </div>
          </div>
          <div class="appointment">
            <div class="appointment-row">
              ${doctorMarkup(row, template, fallback)}
              <div class="appointment-copy">
                <small>Appointment</small>
                <h2>Request a consult</h2>
                <p>${escapeHtml(doctor)} · ${escapeHtml(specialty)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="services" class="content">
      <div class="container">
        <div class="section-head reveal">
          <p>Services</p>
          <h2>Focused sections built around ${escapeHtml(specialty)}.</h2>
          <p class="copy">Service cards use the lead data while keeping the language clear, premium, and responsible.</p>
        </div>
        <div class="cards">
          ${safeServices.map((service, index) => `
            <article class="service-card reveal delay-${Math.min(index, 3)}">
              <div class="service-icon">${iconSvg(template.icon)}</div>
              <h3>${escapeHtml(service)}</h3>
              <p>Clear information and appointment guidance for ${escapeHtml(service.toLowerCase())} inquiries.</p>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <section id="about" class="content about-band">
      <div class="container">
        <div class="section-head reveal">
          <p>About</p>
          <h2>${escapeHtml(row.clinic_name)} in ${escapeHtml(city)}.</h2>
        </div>
        <div class="about-box reveal delay-1">
          <p>${escapeHtml(about)}</p>
          <div class="about-meta">
            <span>${escapeHtml(row.address || row.city || city)}</span>
            <span>${escapeHtml(row.email || 'Sample outreach email')}</span>
          </div>
        </div>
      </div>
    </section>

    <section id="trust" class="content">
      <div class="container">
        <div class="section-head center reveal">
          <p>Trust cues</p>
          <h2>${escapeHtml(template.trustTitle)}</h2>
          <p class="copy">${escapeHtml(template.trustCopy)}</p>
        </div>
        <div class="trust-grid">
          <article class="trust-card reveal"><small>Clarity</small><h3>Simple next steps</h3><p>Visitors can quickly understand how to connect and what the first action is.</p></article>
          <article class="trust-card reveal delay-1"><small>Restraint</small><h3>No fake claims</h3><p>The page avoids unverifiable awards, guarantees, ratings, and outcome promises.</p></article>
          <article class="trust-card reveal delay-2"><small>Access</small><h3>Mobile-first contact</h3><p>Call and WhatsApp actions are easy to use across mobile and desktop layouts.</p></article>
        </div>
      </div>
    </section>

    <section class="content">
      <div class="container">
        <div class="section-head reveal">
          <p>Patient journey</p>
          <h2>A calm route from first inquiry to next steps.</h2>
        </div>
        <div class="journey-grid">
          ${template.journey.map((step, index) => `
            <article class="journey-card reveal delay-${Math.min(index, 3)}">
              <div class="journey-top"><div class="icon-box">${iconSvg(template.icon)}</div><span class="step-number">0${index + 1}</span></div>
              <h3>${escapeHtml(step)}</h3>
              <p>A simple stage in the patient inquiry experience, designed for clarity and comfort.</p>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <section id="contact" class="content">
      <div class="container">
        <div class="cta reveal">
          <div class="cta-grid">
            <div>
              <h2>Ready to preview this premium healthcare concept?</h2>
              <p>This static demo uses the provided lead data for ${escapeHtml(row.clinic_name)} and keeps the experience clearly marked as an unofficial sample.</p>
            </div>
            <div class="contact-card">
              <a href="${escapeHtml(phoneHref)}">Call ${escapeHtml(row.phone || 'now')}</a>
              <a href="${escapeHtml(ctaLink)}">WhatsApp chat</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="footer-inner">
      <span>${escapeHtml(row.clinic_name)} — ${disclaimer}</span>
      <span>${escapeHtml(city)} · ${escapeHtml(specialty)}</span>
    </div>
  </footer>
</body>
</html>`;
}

function sharedStyles(template) {
  return `<style>
    :root {
      --accent: ${template.accent};
      --accent-2: ${template.accent2};
      --accent-soft: ${template.soft};
      --accent-glow: ${template.glow};
      --ink: #0f172a;
      --muted: #64748b;
      --line: rgba(226, 232, 240, 0.9);
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--ink);
      background:
        radial-gradient(circle at 0 0, var(--accent-glow), transparent 26rem),
        radial-gradient(circle at 88% 8%, rgba(216, 180, 254, 0.24), transparent 24rem),
        linear-gradient(180deg, #fbfefd 0%, #f8fcff 48%, #fbfefd 100%);
      text-rendering: geometricPrecision;
    }
    a { color: inherit; text-decoration: none; }
    img { display: block; max-width: 100%; }
    .disclaimer {
      border-bottom: 1px solid #cffafe;
      background: linear-gradient(90deg, #ecfeff, #fff, #faf5ff);
      padding: 12px 16px;
      text-align: center;
      color: #475569;
      font-size: 14px;
      font-weight: 600;
    }
    .nav-wrap { position: sticky; top: 0; z-index: 20; padding: 12px; }
    .nav {
      max-width: 1180px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      border: 1px solid rgba(255,255,255,.86);
      border-radius: 999px;
      background: rgba(255,255,255,.82);
      padding: 12px 14px;
      box-shadow: 0 18px 55px rgba(15,23,42,.08);
      backdrop-filter: blur(22px);
    }
    .brand { display: flex; align-items: center; gap: 12px; font-weight: 750; min-width: 0; }
    .logo-mark, .brand-icon, .icon-box {
      width: 44px; height: 44px; border-radius: 999px;
      display: grid; place-items: center;
      color: var(--accent);
      background: var(--accent-soft);
      flex: 0 0 auto;
      overflow: hidden;
      font-weight: 850;
    }
    .image-logo img { width: 100%; height: 100%; object-fit: cover; }
    .icon-box svg, .visual-icon svg, .service-icon svg { width: 22px; height: 22px; }
    .brand span:last-child { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .nav-links { display: none; gap: 26px; border: 1px solid #f1f5f9; background: rgba(248,250,252,.74); border-radius: 999px; padding: 12px 18px; color: #64748b; font-size: 14px; font-weight: 650; }
    .nav-cta, .btn-primary, .btn-secondary {
      display: inline-flex; align-items: center; justify-content: center; gap: 9px;
      border-radius: 999px; font-size: 14px; font-weight: 750;
      transition: transform .28s ease, box-shadow .28s ease, background .28s ease;
    }
    .nav-cta { background: #0f172a; color: #fff; padding: 12px 16px; box-shadow: 0 16px 38px rgba(15,23,42,.15); }
    .btn-primary { background: #0f172a; color: #fff; padding: 16px 28px; box-shadow: 0 30px 100px rgba(15,23,42,.13); }
    .btn-secondary { border: 1px solid var(--line); background: rgba(255,255,255,.9); color: #1f2937; padding: 16px 28px; box-shadow: 0 18px 55px rgba(15,23,42,.08); }
    .nav-cta:hover, .btn-primary:hover, .btn-secondary:hover { transform: translateY(-4px); }
    .btn-primary:hover, .nav-cta:hover { background: var(--accent); }
    .hero { position: relative; overflow: hidden; padding: 76px 16px 112px; }
    .blob { position: absolute; border-radius: 38% 62% 65% 35% / 42% 44% 56% 58%; filter: blur(78px); pointer-events: none; transform: rotate(-10deg); }
    .blob-a { left: -120px; top: 90px; width: 450px; height: 320px; background: var(--accent-glow); }
    .blob-b { right: -140px; top: 120px; width: 470px; height: 360px; background: rgba(216, 180, 254, .34); }
    .container { max-width: 1180px; margin: 0 auto; position: relative; }
    .hero-grid { display: grid; gap: 64px; align-items: center; }
    .eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      border: 1px solid rgba(255,255,255,.8);
      border-radius: 999px;
      background: rgba(255,255,255,.78);
      padding: 9px 15px;
      color: var(--accent);
      box-shadow: 0 18px 55px rgba(15,23,42,.08);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: .16em;
      text-transform: uppercase;
    }
    .eyebrow svg { width: 17px; height: 17px; }
    h1 {
      margin: 30px 0 0;
      max-width: 790px;
      font-size: clamp(46px, 8vw, 82px);
      line-height: .98;
      font-weight: 760;
      letter-spacing: 0;
    }
    .gradient-text {
      background: linear-gradient(90deg, var(--accent), var(--accent-2), #7c3aed);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .subhead {
      max-width: 680px;
      margin: 28px 0 0;
      color: var(--muted);
      font-size: clamp(18px, 2vw, 21px);
      line-height: 1.72;
    }
    .actions { display: flex; flex-direction: column; gap: 14px; margin-top: 42px; }
    .badges { display: grid; gap: 12px; margin-top: 46px; }
    .badge {
      min-height: 76px;
      display: flex; align-items: center; gap: 12px;
      border: 1px solid rgba(255,255,255,.82);
      border-radius: 22px;
      background: rgba(255,255,255,.76);
      padding: 16px;
      box-shadow: 0 18px 55px rgba(15,23,42,.08);
      color: #334155;
      font-weight: 650;
      backdrop-filter: blur(18px);
    }
    .badge-dot { width: 22px; height: 22px; border-radius: 999px; background: var(--accent-soft); color: var(--accent); display: grid; place-items: center; flex: 0 0 auto; }
    .visual-shell { position: relative; }
    .visual-glow { position: absolute; inset: -24px; border-radius: 40px; background: linear-gradient(135deg, var(--accent-glow), rgba(255,255,255,.2), rgba(216,180,254,.3)); filter: blur(28px); }
    .visual-card {
      position: relative; overflow: hidden;
      border: 2px solid #fff;
      border-radius: 32px;
      background: #fff;
      padding: 8px;
      box-shadow: 0 30px 100px rgba(15,23,42,.13);
    }
    .visual-image-wrap { aspect-ratio: 4 / 3; border-radius: 25px; overflow: hidden; }
    .visual-image-wrap img { width: 100%; height: 100%; object-fit: cover; }
    .appointment {
      position: relative;
      margin-top: 16px;
      border: 1px solid #fff;
      border-radius: 24px;
      background: rgba(255,255,255,.94);
      padding: 22px;
      box-shadow: 0 30px 100px rgba(15,23,42,.13);
      backdrop-filter: blur(18px);
    }
    .appointment-row { display: flex; align-items: center; gap: 16px; }
    .doctor-avatar { width: 58px; height: 58px; border-radius: 999px; flex: 0 0 auto; overflow: hidden; display: grid; place-items: center; background: linear-gradient(135deg, var(--accent-soft), #fff); color: var(--accent); font-weight: 850; }
    .doctor-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .appointment small { color: var(--accent); font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
    .appointment h2 { margin: 8px 0 0; font-size: 26px; }
    .appointment p { margin: 8px 0 0; color: var(--muted); line-height: 1.6; }
    section.content { padding: 112px 16px; }
    .section-head { max-width: 760px; margin-bottom: 64px; }
    .section-head.center { margin-left: auto; margin-right: auto; text-align: center; }
    .section-head p:first-child { color: var(--accent); font-size: 13px; font-weight: 850; letter-spacing: .16em; text-transform: uppercase; }
    .section-head h2 { margin: 18px 0 0; font-size: clamp(36px, 5vw, 52px); line-height: 1.06; letter-spacing: 0; }
    .section-head .copy { margin: 22px 0 0; color: var(--muted); line-height: 1.8; font-size: 16px; }
    .cards { display: grid; gap: 22px; }
    .service-card, .trust-card, .journey-card {
      border: 1px solid #f1f5f9;
      border-radius: 26px;
      background: #fff;
      padding: 28px;
      box-shadow: 0 18px 55px rgba(15,23,42,.08);
      transition: transform .28s ease, box-shadow .28s ease, border-color .28s ease;
    }
    .service-card:hover { transform: translateY(-8px); border-color: var(--accent-soft); box-shadow: 0 30px 100px rgba(15,23,42,.13); }
    .service-icon { width: 56px; height: 56px; border-radius: 18px; background: var(--accent-soft); color: var(--accent); display: grid; place-items: center; margin-bottom: 28px; }
    .service-icon svg { width: 27px; height: 27px; }
    .service-card h3, .trust-card h3, .journey-card h3 { margin: 0; font-size: 21px; }
    .service-card p, .trust-card p, .journey-card p { color: var(--muted); line-height: 1.75; margin: 14px 0 0; }
    .about-band { background: linear-gradient(180deg, #fff, var(--accent-soft)); }
    .about-box {
      border: 1px solid rgba(255,255,255,.85);
      border-radius: 32px;
      background: rgba(255,255,255,.72);
      box-shadow: 0 30px 100px rgba(15,23,42,.1);
      padding: 32px;
      backdrop-filter: blur(18px);
    }
    .about-box p { color: var(--muted); line-height: 1.85; font-size: 17px; margin: 0; }
    .about-meta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
    .about-meta span { border-radius: 999px; background: #fff; color: #475569; padding: 10px 14px; font-size: 14px; font-weight: 650; }
    .trust-grid, .journey-grid { display: grid; gap: 22px; }
    .trust-card small { color: var(--accent); text-transform: uppercase; letter-spacing: .14em; font-weight: 850; }
    .journey-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 26px; }
    .step-number { color: #cbd5e1; font-weight: 850; }
    .cta {
      position: relative; overflow: hidden;
      border-radius: 32px;
      background: #0f172a;
      color: #fff;
      padding: 36px;
      box-shadow: 0 30px 100px rgba(15,23,42,.13);
    }
    .cta::before { content: ""; position: absolute; right: -80px; top: -80px; width: 300px; height: 300px; border-radius: 999px; background: var(--accent); opacity: .22; filter: blur(50px); }
    .cta-grid { position: relative; display: grid; gap: 34px; align-items: center; }
    .cta h2 { margin: 0; font-size: clamp(36px, 5vw, 52px); line-height: 1.08; }
    .cta p { color: rgba(255,255,255,.72); line-height: 1.8; }
    .contact-card { display: grid; gap: 14px; border: 1px solid rgba(255,255,255,.1); border-radius: 24px; background: rgba(255,255,255,.1); padding: 18px; backdrop-filter: blur(18px); }
    .contact-card a { border-radius: 999px; background: #fff; color: var(--ink); padding: 16px 20px; font-weight: 750; }
    footer { padding: 40px 16px; color: #64748b; border-top: 1px solid #f1f5f9; background: #fff; }
    .footer-inner { max-width: 1180px; margin: 0 auto; display: flex; flex-direction: column; gap: 10px; font-size: 14px; }
    .reveal { opacity: 0; transform: translateY(22px); animation: reveal .75s ease forwards; }
    .delay-1 { animation-delay: .08s; } .delay-2 { animation-delay: .16s; } .delay-3 { animation-delay: .24s; }
    @keyframes reveal { to { opacity: 1; transform: translateY(0); } }
    @media (min-width: 640px) {
      .actions { flex-direction: row; }
      .badges { grid-template-columns: repeat(3, 1fr); }
      .btn-primary, .btn-secondary { width: auto; }
    }
    @media (min-width: 768px) {
      .nav-links { display: flex; }
      .cards { grid-template-columns: repeat(2, 1fr); }
      .trust-grid { grid-template-columns: repeat(3, 1fr); }
      .journey-grid { grid-template-columns: repeat(4, 1fr); }
      .footer-inner { flex-direction: row; justify-content: space-between; }
    }
    @media (min-width: 1024px) {
      .hero-grid { grid-template-columns: 1.02fr .98fr; }
      .cards { grid-template-columns: repeat(4, 1fr); }
      .appointment { position: absolute; left: -42px; bottom: -36px; width: 390px; margin: 0; }
      .cta-grid { grid-template-columns: 1fr 340px; }
    }
    @media (max-width: 639px) {
      .brand span:last-child { max-width: 145px; }
      .nav-cta span { display: none; }
      .hero { padding-top: 56px; }
      .btn-primary, .btn-secondary { width: 100%; }
      .visual-image-wrap { aspect-ratio: 4 / 3; }
      section.content { padding: 92px 16px; }
      .cta { padding: 28px; }
    }
  </style>`;
}

function renderIndex(rows) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Healthcare Premium Batch 1 Demos</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: #0f172a;
      background:
        radial-gradient(circle at 0 0, rgba(125, 211, 252, .32), transparent 28rem),
        radial-gradient(circle at 90% 6%, rgba(216, 180, 254, .26), transparent 24rem),
        #fbfefd;
    }
    a { color: inherit; text-decoration: none; }
    .disclaimer {
      border-bottom: 1px solid #cffafe;
      background: linear-gradient(90deg, #ecfeff, #fff, #faf5ff);
      padding: 12px 16px;
      text-align: center;
      color: #475569;
      font-size: 14px;
      font-weight: 600;
    }
    .wrap { max-width: 1180px; margin: 0 auto; padding: 72px 16px 96px; }
    .hero { max-width: 820px; margin-bottom: 46px; }
    .eyebrow { display: inline-flex; border: 1px solid #e0f2fe; border-radius: 999px; background: rgba(255,255,255,.8); padding: 10px 15px; color: #0e7490; font-size: 12px; font-weight: 850; letter-spacing: .16em; text-transform: uppercase; box-shadow: 0 18px 55px rgba(15,23,42,.08); }
    h1 { margin: 24px 0 0; font-size: clamp(44px, 8vw, 78px); line-height: .98; letter-spacing: 0; }
    .hero p { margin: 24px 0 0; max-width: 680px; color: #64748b; font-size: 19px; line-height: 1.75; }
    .grid { display: grid; gap: 18px; }
    .card { border: 1px solid #f1f5f9; border-radius: 26px; background: rgba(255,255,255,.86); padding: 24px; box-shadow: 0 18px 55px rgba(15,23,42,.08); transition: transform .25s ease, box-shadow .25s ease; }
    .card:hover { transform: translateY(-5px); box-shadow: 0 30px 100px rgba(15,23,42,.12); }
    .meta { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
    .pill { border-radius: 999px; background: #ecfeff; color: #0e7490; padding: 7px 10px; font-size: 12px; font-weight: 800; text-transform: capitalize; }
    h2 { margin: 0; font-size: 22px; line-height: 1.25; }
    .card p { margin: 10px 0 0; color: #64748b; line-height: 1.65; }
    .button { display: inline-flex; margin-top: 22px; border-radius: 999px; background: #0f172a; color: #fff; padding: 13px 18px; font-size: 14px; font-weight: 800; }
    footer { border-top: 1px solid #f1f5f9; background: #fff; color: #64748b; padding: 32px 16px; text-align: center; font-size: 14px; }
    @media (min-width: 720px) { .grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1040px) { .grid { grid-template-columns: repeat(3, 1fr); } }
  </style>
</head>
<body>
  <div class="disclaimer">${disclaimer}</div>
  <main class="wrap">
    <section class="hero">
      <div class="eyebrow">${escapeHtml(batchName)} demos</div>
      <h1>Premium healthcare demo websites for LinkedIn outreach.</h1>
      <p>Browse every ready demo generated from <code>src/data/leads.csv</code>. Each page is an unofficial sample concept created for design preview only.</p>
    </section>
    <section class="grid" aria-label="Generated demo websites">
      ${rows.map(row => `
        <article class="card">
          <div class="meta">
            <span class="pill">${escapeHtml(row.business_type || 'healthcare')}</span>
            <span class="pill">${escapeHtml(cityShort(row.city))}</span>
          </div>
          <h2>${escapeHtml(row.clinic_name)}</h2>
          <p>${escapeHtml(row.specialty || 'Healthcare')}</p>
          <p>${escapeHtml(row.city || '')}</p>
          <a class="button" href="${escapeHtml(pageUrl(row.slug))}">Open demo</a>
        </article>
      `).join('')}
    </section>
  </main>
  <footer>${disclaimer}</footer>
</body>
</html>`;
}

const source = await readFile(csvPath, 'utf8');
const rows = parseCsv(source);
const selected = rows
  .filter(row => row.status === 'ready' && row.batch === batchName)
  .map(row => ({ ...row, slug: safeSlug(row.slug || row.clinic_name) }))
  .filter(row => row.slug);

if (!selected.length) {
  console.log(`No ready rows found for ${batchName}.`);
  process.exit(0);
}

await mkdir(publishDir, { recursive: true });

if (existsSync(distAssetsDir)) {
  await mkdir(publishAssetsDir, { recursive: true });
  await cp(distAssetsDir, publishAssetsDir, { recursive: true, force: true });
}

for (const row of selected) {
  const outDir = path.join(publishDir, row.slug);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'index.html'), renderPage(row), 'utf8');
}

await writeFile(path.join(publishDir, 'index.html'), renderIndex(selected), 'utf8');

console.log(`Generated ${selected.length} static demo pages for ${batchName}.`);
console.log(`Batch index: publish/index.html`);
console.log(`Assets copied: ${existsSync(distAssetsDir) ? 'publish/assets' : 'dist/assets not found'}`);
