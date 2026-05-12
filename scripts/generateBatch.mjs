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
  ayurveda: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
  general: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
};

const templateConfigs = {
  dentist: {
    type: 'dentist',
    label: 'Dentist',
    filterLabel: 'Dentist',
    badge: 'Bright dental studio concept',
    heroAccent: 'comfort-first dental care',
    accent: '#0891b2',
    accent2: '#2563eb',
    accent3: '#14b8a6',
    soft: '#ecfeff',
    glow: 'rgba(103, 232, 249, 0.48)',
    pageBg: 'linear-gradient(180deg, #fafdff 0%, #f3fbff 48%, #ffffff 100%)',
    heroBg: 'radial-gradient(circle at 8% 18%, rgba(103,232,249,.42), transparent 28rem), radial-gradient(circle at 88% 8%, rgba(191,219,254,.45), transparent 25rem), linear-gradient(135deg, #ffffff 0%, #ecfeff 52%, #eff6ff 100%)',
    sectionBg: 'linear-gradient(180deg, #ffffff 0%, #ecfeff 100%)',
    icon: 'smile',
    serviceIcons: ['smile', 'sparkles', 'shield', 'calendar'],
    heroBadges: ['Smile-focused visit flow', 'Bright dental studio feel', 'Comfort-first guidance'],
    servicesLabel: 'Dental Services',
    servicesTitle: specialty => `Dental sections shaped around ${specialty}.`,
    serviceFallbacks: ['Dental implants', 'Aligners', 'Root canal', 'Whitening'],
    serviceDescriptions: [
      'A polished inquiry path for restorative dental consultation topics.',
      'Clear, friendly framing for smile alignment conversations.',
      'Measured treatment-planning copy without outcome promises.',
      'A refined presentation for cosmetic dental interest.',
    ],
    trustTitle: 'Dental trust built through clarity and comfort.',
    trustCopy: 'This version uses bright space, soft cyan accents, and responsible dental copy without guarantees or invented credentials.',
    trustCards: [
      ['Comfort', 'Calm appointment flow', 'Visitors can see how to connect without feeling rushed.'],
      ['Clarity', 'Treatment topics, not claims', 'Services are presented as consultation areas, not promised outcomes.'],
      ['Access', 'Mobile-ready contact', 'Call and WhatsApp actions stay easy to reach.'],
    ],
    journeyLabel: 'Smile Journey',
    journeyTitle: 'A simple path from dental inquiry to next steps.',
    journey: ['Call or WhatsApp', 'Share your dental concern', 'Visit the studio', 'Review next steps'],
    ctaText: 'Book dental consultation',
    secondaryCtaText: 'WhatsApp dental team',
    ctaTitle: 'Preview a premium dental consultation flow.',
    fallbackHeadline: city => `Premium Dental Care in ${city}`,
    fallbackSubheadline: 'Comfort-first dental care with clear guidance and easy appointment access.',
  },
  dermatologist: {
    type: 'dermatologist',
    label: 'Dermatology',
    filterLabel: 'Dermatology',
    badge: 'Soft skin clinic concept',
    heroAccent: 'clearer skin-care conversations',
    accent: '#be123c',
    accent2: '#a855f7',
    accent3: '#fb7185',
    soft: '#fff1f2',
    glow: 'rgba(251, 207, 232, 0.56)',
    pageBg: 'linear-gradient(180deg, #fffafa 0%, #fff7fb 46%, #ffffff 100%)',
    heroBg: 'radial-gradient(circle at 12% 12%, rgba(251,207,232,.56), transparent 27rem), radial-gradient(circle at 90% 12%, rgba(221,214,254,.55), transparent 25rem), linear-gradient(135deg, #fff7ed 0%, #fff1f2 45%, #f5f3ff 100%)',
    sectionBg: 'linear-gradient(180deg, #ffffff 0%, #fff1f2 58%, #f5f3ff 100%)',
    icon: 'sparkles',
    serviceIcons: ['sparkles', 'scanFace', 'shield', 'heartPulse'],
    heroBadges: ['Skin consultation framing', 'Beauty plus medical trust', 'Private, measured copy'],
    servicesLabel: 'Skin Clinic Services',
    servicesTitle: specialty => `Skin-care sections shaped around ${specialty}.`,
    serviceFallbacks: ['Acne care', 'Laser treatment', 'Anti-aging', 'Skin consultation'],
    serviceDescriptions: [
      'A clear entry point for acne-related consultation inquiries.',
      'Premium framing for laser treatment conversations.',
      'Careful language for age-related skin-care interest.',
      'A calm pathway for first-time dermatology visitors.',
    ],
    trustTitle: 'A private, premium tone for skin-care decisions.',
    trustCopy: 'The rose and lavender system feels elevated while avoiding dramatic transformation promises.',
    trustCards: [
      ['Privacy', 'Composed patient flow', 'The page feels calm for sensitive skin and aesthetic topics.'],
      ['Restraint', 'No before-after promises', 'Copy is consultative instead of sensational.'],
      ['Guidance', 'Easy skin consult path', 'Visitors can understand how to request a consultation.'],
    ],
    journeyLabel: 'Skin Journey',
    journeyTitle: 'A calm route from skin concern to consultation.',
    journey: ['Request consult', 'Share skin concern', 'Visit the clinic', 'Receive guidance'],
    ctaText: 'Book skin consultation',
    secondaryCtaText: 'WhatsApp skin clinic',
    ctaTitle: 'Preview a premium dermatology inquiry flow.',
    fallbackHeadline: city => `Advanced Skin Care in ${city}`,
    fallbackSubheadline: 'Clean dermatology consultation flow with calm, patient-friendly guidance.',
  },
  physiotherapy: {
    type: 'physiotherapy',
    label: 'Physiotherapy',
    filterLabel: 'Physiotherapy',
    badge: 'Movement recovery concept',
    heroAccent: 'guided movement support',
    accent: '#047857',
    accent2: '#84cc16',
    accent3: '#10b981',
    soft: '#ecfdf5',
    glow: 'rgba(110, 231, 183, 0.48)',
    pageBg: 'linear-gradient(180deg, #fbfff8 0%, #f2fdf5 48%, #ffffff 100%)',
    heroBg: 'radial-gradient(circle at 9% 15%, rgba(187,247,208,.65), transparent 28rem), radial-gradient(circle at 88% 14%, rgba(217,249,157,.52), transparent 24rem), linear-gradient(135deg, #f7fee7 0%, #ecfdf5 48%, #f0fdfa 100%)',
    sectionBg: 'linear-gradient(180deg, #ffffff 0%, #ecfdf5 100%)',
    icon: 'activity',
    serviceIcons: ['activity', 'dumbbell', 'heartPulse', 'moveRight'],
    heroBadges: ['Movement-led visit flow', 'Recovery-focused sections', 'Posture and rehab tone'],
    servicesLabel: 'Recovery Services',
    servicesTitle: specialty => `Movement sections shaped around ${specialty}.`,
    serviceFallbacks: ['Spine therapy', 'Sports injury', 'Posture correction', 'Rehab'],
    serviceDescriptions: [
      'A supportive section for spine and mobility-related inquiries.',
      'Active but responsible framing for sports injury rehab interest.',
      'Practical content for posture and workplace movement concerns.',
      'A clear pathway for guided rehabilitation conversations.',
    ],
    trustTitle: 'Recovery support presented with practical clarity.',
    trustCopy: 'The green system feels active and hopeful without promising timelines or results.',
    trustCards: [
      ['Movement', 'Active visual language', 'Cards and icons communicate motion without over-animation.'],
      ['Support', 'Plain next steps', 'Visitors can understand how to request a session.'],
      ['Care', 'Responsible rehab copy', 'The page avoids recovery guarantees and inflated claims.'],
    ],
    journeyLabel: 'Recovery Journey',
    journeyTitle: 'A practical path from inquiry to guided movement.',
    journey: ['Connect', 'Share mobility goals', 'Attend session', 'Plan follow-up'],
    ctaText: 'Start recovery plan',
    secondaryCtaText: 'WhatsApp physio team',
    ctaTitle: 'Preview a premium physiotherapy contact flow.',
    fallbackHeadline: city => `Physiotherapy Care in ${city}`,
    fallbackSubheadline: 'Supportive movement-focused care with simple session booking.',
  },
  'diagnostic-center': {
    type: 'diagnostic-center',
    label: 'Diagnostic',
    filterLabel: 'Diagnostic',
    badge: 'Precision lab concept',
    heroAccent: 'clearer test booking',
    accent: '#4338ca',
    accent2: '#0ea5e9',
    accent3: '#6366f1',
    soft: '#eef2ff',
    glow: 'rgba(125, 211, 252, 0.52)',
    pageBg: 'linear-gradient(180deg, #fbfdff 0%, #f4f7ff 48%, #ffffff 100%)',
    heroBg: 'radial-gradient(circle at 12% 16%, rgba(191,219,254,.58), transparent 29rem), radial-gradient(circle at 88% 12%, rgba(199,210,254,.6), transparent 24rem), linear-gradient(135deg, #eef2ff 0%, #f0f9ff 50%, #ffffff 100%)',
    sectionBg: 'linear-gradient(180deg, #ffffff 0%, #eef2ff 55%, #f0f9ff 100%)',
    icon: 'flask',
    serviceIcons: ['flask', 'microscope', 'clipboard', 'clock'],
    heroBadges: ['Lab-report navigation', 'Precision-inspired layout', 'Fast booking path'],
    servicesLabel: 'Diagnostic Services',
    servicesTitle: specialty => `Diagnostic sections shaped around ${specialty}.`,
    serviceFallbacks: ['Blood tests', 'Health packages', 'Imaging', 'Same-day reports'],
    serviceDescriptions: [
      'A clean pathway for common blood test inquiries.',
      'Organized package-style information without performance claims.',
      'Clear navigation for imaging and scan-related questions.',
      'Report-oriented flow presented without turnaround promises.',
    ],
    trustTitle: 'Diagnostic browsing designed for quick understanding.',
    trustCopy: 'The indigo and sky system focuses on organized test information and avoids accuracy or turnaround claims.',
    trustCards: [
      ['Precision', 'Lab-inspired structure', 'Information is grouped for quick scanning.'],
      ['Reports', 'Clear support flow', 'Visitors can see where report questions fit.'],
      ['Neutrality', 'No performance claims', 'Copy avoids unverifiable speed or accuracy promises.'],
    ],
    journeyLabel: 'Test Journey',
    journeyTitle: 'A simple path from test inquiry to report support.',
    journey: ['Choose test', 'Book slot', 'Visit center', 'Access reports'],
    ctaText: 'Book health checkup',
    secondaryCtaText: 'WhatsApp diagnostics',
    ctaTitle: 'Preview a premium diagnostic booking flow.',
    fallbackHeadline: city => `Diagnostic Center in ${city}`,
    fallbackSubheadline: 'Clear test booking, report support, and patient-friendly navigation.',
  },
  hospital: {
    type: 'hospital',
    label: 'Hospital',
    filterLabel: 'Hospital',
    badge: 'Multi-specialty care concept',
    heroAccent: 'clearer care navigation',
    accent: '#0f766e',
    accent2: '#1e3a8a',
    accent3: '#14b8a6',
    soft: '#f0fdfa',
    glow: 'rgba(45, 212, 191, 0.38)',
    pageBg: 'linear-gradient(180deg, #fbfefd 0%, #f5fbff 46%, #ffffff 100%)',
    heroBg: 'radial-gradient(circle at 7% 12%, rgba(45,212,191,.34), transparent 28rem), radial-gradient(circle at 90% 10%, rgba(30,58,138,.2), transparent 25rem), linear-gradient(135deg, #f8fafc 0%, #f0fdfa 42%, #eff6ff 100%)',
    sectionBg: 'linear-gradient(180deg, #ffffff 0%, #f0fdfa 58%, #eff6ff 100%)',
    icon: 'hospital',
    serviceIcons: ['hospital', 'stethoscope', 'ambulance', 'shield'],
    heroBadges: ['Multi-specialty structure', 'Emergency-ready information area', 'Trusted care navigation'],
    servicesLabel: 'Hospital Services',
    servicesTitle: specialty => `Care sections shaped around ${specialty}.`,
    serviceFallbacks: ['OPD', 'Emergency', 'Surgery', 'Specialist care'],
    serviceDescriptions: [
      'A clear outpatient discovery section for appointment-led browsing.',
      'Structured urgent-contact information if provided by the business.',
      'Careful framing for procedure-related inquiry pathways.',
      'Easy navigation for specialist consultation interest.',
    ],
    trustTitle: 'A clear structure for healthcare decisions.',
    trustCopy: 'The navy and teal system uses navigation, restraint, and visible contact paths instead of fake rankings or awards.',
    trustCards: [
      ['Navigation', 'Department clarity', 'Visitors can orient themselves quickly across care areas.'],
      ['Access', 'Prominent contact paths', 'Key inquiry options remain easy to find.'],
      ['Restraint', 'No invented authority', 'The page avoids unverified awards, ratings, and claims.'],
    ],
    journeyLabel: 'Care Journey',
    journeyTitle: 'A clear route from healthcare inquiry to visit planning.',
    journey: ['Explore care', 'Contact desk', 'Plan visit', 'Follow guidance'],
    ctaText: 'Book appointment',
    secondaryCtaText: 'WhatsApp care desk',
    ctaTitle: 'Preview a premium hospital inquiry experience.',
    fallbackHeadline: city => `Advanced Healthcare in ${city}`,
    fallbackSubheadline: 'Clear department discovery, visitor support, and easy contact access.',
  },
  ayurveda: {
    type: 'ayurveda',
    label: 'Ayurveda',
    filterLabel: 'Ayurveda',
    badge: 'Natural wellness concept',
    heroAccent: 'calm wellness inquiries',
    accent: '#4d7c0f',
    accent2: '#d97706',
    accent3: '#84cc16',
    soft: '#f7fee7',
    glow: 'rgba(254, 215, 170, 0.5)',
    pageBg: 'linear-gradient(180deg, #fffdf7 0%, #fbfff1 48%, #ffffff 100%)',
    heroBg: 'radial-gradient(circle at 10% 16%, rgba(217,249,157,.58), transparent 28rem), radial-gradient(circle at 90% 12%, rgba(254,215,170,.62), transparent 24rem), linear-gradient(135deg, #fff7ed 0%, #f7fee7 50%, #ffffff 100%)',
    sectionBg: 'linear-gradient(180deg, #ffffff 0%, #f7fee7 56%, #fff7ed 100%)',
    icon: 'leaf',
    serviceIcons: ['leaf', 'flower', 'heart', 'sun'],
    heroBadges: ['Natural wellness tone', 'Warm heritage-inspired palette', 'Calm consultation flow'],
    servicesLabel: 'Wellness Services',
    servicesTitle: specialty => `Wellness sections shaped around ${specialty}.`,
    serviceFallbacks: ['Panchakarma', 'Stress care', 'Immunity', 'Wellness consultation'],
    serviceDescriptions: [
      'A serene way to present Panchakarma-related consultation interest.',
      'Gentle copy for stress and lifestyle-support conversations.',
      'Wellness framing that avoids cure or outcome claims.',
      'A clear entry point for Ayurveda consultation requests.',
    ],
    trustTitle: 'A calm wellness tone with responsible copy.',
    trustCopy: 'The green and amber system stays consultative and avoids cure claims or guaranteed outcomes.',
    trustCards: [
      ['Calm', 'Nature-inspired design', 'Warm gradients and soft cards create a grounded experience.'],
      ['Responsibility', 'No cure claims', 'Copy remains careful and consultation-led.'],
      ['Flow', 'Simple wellness inquiry', 'Visitors can request a consultation without confusion.'],
    ],
    journeyLabel: 'Wellness Journey',
    journeyTitle: 'A calm path from wellness interest to consultation.',
    journey: ['Request consult', 'Share wellness goals', 'Visit clinic', 'Review guidance'],
    ctaText: 'Book wellness consultation',
    secondaryCtaText: 'WhatsApp wellness team',
    ctaTitle: 'Preview a premium Ayurveda consultation flow.',
    fallbackHeadline: city => `Ayurveda Wellness in ${city}`,
    fallbackSubheadline: 'Serene consultation flow with nature-inspired wellness presentation.',
  },
};

function normalizeBusinessType(value = '') {
  const clean = String(value).trim().toLowerCase().replace(/[_-]+/g, ' ');

  if (/(dentist|dental)/.test(clean)) return 'dentist';
  if (/(dermatologist|dermatology|skin clinic|skin care|aesthetic)/.test(clean)) return 'dermatologist';
  if (/(physio|physiotherapy|physical therapy)/.test(clean)) return 'physiotherapy';
  if (/(diagnostic|diagnostics|diagnostic center|lab|pathology)/.test(clean)) return 'diagnostic-center';
  if (/(ayurveda|ayurvedic|wellness)/.test(clean)) return 'ayurveda';
  if (/(hospital|multi specialty|multispecialty|clinic)/.test(clean)) return 'hospital';

  return 'hospital';
}

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
  const digits = String(phone || '').replace(/[^\d+]/g, '');
  return digits ? `tel:${digits}` : '#contact';
}

function isUnsafeImageUrl(url) {
  const value = String(url || '').trim();
  return !value || value.includes('undefined') || value.includes('null') || !/^https?:\/\//i.test(value);
}

function safeImage(url, fallback) {
  return isUnsafeImageUrl(url) ? fallback : String(url).trim();
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
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    calendar: '<path d="M8 2v4M16 2v4M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M8 14h.01M12 14h.01M16 14h.01"/>',
    scanFace: '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
    heartPulse: '<path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 0 1 12 6a5 5 0 0 1 7.5 6.6z"/><path d="M3 12h4l2-4 3 8 2-4h7"/>',
    activity: '<path d="M3 12h4l2-6 4 12 2-6h6"/>',
    dumbbell: '<path d="M6.5 6.5v11M17.5 6.5v11M4 9v6M20 9v6M6.5 12h11"/>',
    moveRight: '<path d="M18 8l4 4-4 4M2 12h20"/>',
    flask: '<path d="M9 2h6"/><path d="M10 2v6l-5 9a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 17l-5-9V2"/><path d="M8 15h8"/>',
    microscope: '<path d="M6 18h8M3 22h18M14 22a7 7 0 0 0 7-7"/><path d="m6 11 4 4 6-6-4-4-6 6z"/><path d="m14 7 2-2 3 3-2 2"/>',
    clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    hospital: '<path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16"/><path d="M9 21v-6h6v6"/><path d="M12 7v5M9.5 9.5h5"/>',
    stethoscope: '<path d="M6 3v5a4 4 0 0 0 8 0V3"/><path d="M10 15a5 5 0 0 0 10 0v-3"/><circle cx="20" cy="10" r="2"/>',
    ambulance: '<path d="M10 17H6a2 2 0 1 1 0-4h4V6h7l4 5v6h-2"/><path d="M14 17h2M6 17h8M14 10h5M6 8h4M8 6v4"/><circle cx="6" cy="17" r="2"/><circle cx="18" cy="17" r="2"/>',
    leaf: '<path d="M20 4c-8 0-14 5-14 12a4 4 0 0 0 4 4c7 0 10-8 10-16z"/><path d="M6 20c2-5 6-8 12-10"/>',
    flower: '<path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M12 7V3M12 21v-4M16.2 8.8 19 6M5 18l2.8-2.8M17 18l-2.8-2.8M5 6l2.8 2.8"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
  };

  return `<svg viewBox="0 0 24 24" aria-hidden="true" ${common}>${paths[name] || paths.sparkles}</svg>`;
}

function safeImageMarkup(src, fallback, alt, className = '') {
  return `<img${className ? ` class="${className}"` : ''} src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" onerror="this.onerror=null;this.src='${escapeHtml(fallback)}';" />`;
}

function logoMarkup(row, template, fallback) {
  if (isUnsafeImageUrl(row.logo_url)) {
    return `<span class="logo-mark">${escapeHtml(initials(row.clinic_name))}</span>`;
  }

  return `<span class="logo-mark image-logo">${safeImageMarkup(safeImage(row.logo_url, fallback), fallback, `${row.clinic_name} logo`)}</span>`;
}

function doctorMarkup(row, fallback) {
  if (isUnsafeImageUrl(row.profile_photo_url)) {
    return `<div class="doctor-avatar initials-avatar">${escapeHtml(initials(row.doctor_name || row.clinic_name))}</div>`;
  }

  return `<div class="doctor-avatar image-avatar">${safeImageMarkup(safeImage(row.profile_photo_url, fallback), fallback, `${row.doctor_name || row.clinic_name} profile`)}</div>`;
}

function renderPage(row) {
  const templateType = normalizeBusinessType(row.business_type);
  const template = templateConfigs[templateType] || templateConfigs.hospital;
  const city = cityShort(row.city);
  const services = (row.services || '')
    .split('|')
    .map(service => service.trim())
    .filter(Boolean)
    .slice(0, 4);
  const safeServices = services.length ? services : template.serviceFallbacks;
  const headline = row.headline || template.fallbackHeadline(city);
  const subheadline = row.subheadline || template.fallbackSubheadline;
  const ctaLink = row.cta_link || normalizePhoneHref(row.phone || '');
  const phoneHref = normalizePhoneHref(row.phone || '');
  const doctor = row.doctor_name || 'Care Team';
  const specialty = row.specialty || template.label;
  const about = row.about || `${row.clinic_name} offers a calm, clear, and patient-friendly ${template.label.toLowerCase()} experience in ${city}.`;
  const fallback = fallbackImages[templateType] || fallbackImages.general;
  const bannerImage = safeImage(row.banner_image_url, fallback);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(row.clinic_name)} | ${escapeHtml(template.label)} Demo</title>
  ${sharedStyles(template)}
</head>
<body>
  <div class="disclaimer">${disclaimer}</div>
  <div class="nav-wrap">
    <nav class="nav">
      <a class="brand" href="${basePath}">
        ${logoMarkup(row, template, fallback)}
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
          <div class="eyebrow">${iconSvg(template.icon)} ${escapeHtml(template.badge)} · ${escapeHtml(city)}</div>
          <h1>${escapeHtml(headline)} <span class="gradient-text">${escapeHtml(template.heroAccent)}.</span></h1>
          <p class="subhead">${escapeHtml(subheadline)}</p>
          <div class="actions">
            <a class="btn-primary" href="${escapeHtml(phoneHref)}">${escapeHtml(template.ctaText)}</a>
            <a class="btn-secondary" href="${escapeHtml(ctaLink)}">${escapeHtml(template.secondaryCtaText)}</a>
          </div>
          <div class="badges">
            ${template.heroBadges.map((badge, index) => `<div class="badge delay-${index + 1}"><span class="badge-dot">✓</span> ${escapeHtml(badge)}</div>`).join('')}
          </div>
        </div>

        <div class="visual-shell reveal delay-2">
          <div class="visual-glow"></div>
          <div class="visual-card">
            <div class="visual-topline">
              <span>${escapeHtml(template.label)} preview</span>
              <span class="visual-icon">${iconSvg(template.icon)}</span>
            </div>
            <div class="visual-image-wrap">
              ${safeImageMarkup(bannerImage, fallback, `${row.clinic_name} visual preview`)}
            </div>
            <div class="visual-strip">
              ${template.serviceIcons.slice(0, 3).map(icon => `<span>${iconSvg(icon)}</span>`).join('')}
            </div>
          </div>
          <div class="appointment">
            <div class="appointment-row">
              ${doctorMarkup(row, fallback)}
              <div class="appointment-copy">
                <small>${escapeHtml(template.ctaText)}</small>
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
          <p>${escapeHtml(template.servicesLabel)}</p>
          <h2>${escapeHtml(template.servicesTitle(specialty))}</h2>
          <p class="copy">These cards use the lead data first, then fall back to ${escapeHtml(template.label.toLowerCase())}-specific topics with careful sample-safe language.</p>
        </div>
        <div class="cards">
          ${safeServices.map((service, index) => `
            <article class="service-card reveal delay-${Math.min(index, 3)}">
              <div class="service-icon">${iconSvg(template.serviceIcons[index % template.serviceIcons.length])}</div>
              <h3>${escapeHtml(service)}</h3>
              <p>${escapeHtml(template.serviceDescriptions[index % template.serviceDescriptions.length])}</p>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <section id="about" class="content about-band">
      <div class="container">
        <div class="section-head reveal">
          <p>About ${escapeHtml(template.label)}</p>
          <h2>${escapeHtml(row.clinic_name)} in ${escapeHtml(city)}.</h2>
        </div>
        <div class="about-box reveal delay-1">
          <p>${escapeHtml(about)}</p>
          <div class="about-meta">
            <span>${escapeHtml(row.address || row.city || city)}</span>
            <span>${escapeHtml(row.email || 'Sample outreach email')}</span>
            <span>${escapeHtml(row.business_type || template.label)} → ${escapeHtml(template.label)}</span>
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
          ${template.trustCards.map((card, index) => `
            <article class="trust-card reveal delay-${Math.min(index, 3)}">
              <small>${escapeHtml(card[0])}</small>
              <h3>${escapeHtml(card[1])}</h3>
              <p>${escapeHtml(card[2])}</p>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="content">
      <div class="container">
        <div class="section-head reveal">
          <p>${escapeHtml(template.journeyLabel)}</p>
          <h2>${escapeHtml(template.journeyTitle)}</h2>
        </div>
        <div class="journey-grid">
          ${template.journey.map((step, index) => `
            <article class="journey-card reveal delay-${Math.min(index, 3)}">
              <div class="journey-top"><div class="icon-box">${iconSvg(template.serviceIcons[index % template.serviceIcons.length])}</div><span class="step-number">0${index + 1}</span></div>
              <h3>${escapeHtml(step)}</h3>
              <p>A simple stage in the ${escapeHtml(template.label.toLowerCase())} inquiry experience, designed for clarity and comfort.</p>
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
              <span class="cta-kicker">${escapeHtml(template.label)} contact</span>
              <h2>${escapeHtml(template.ctaTitle)}</h2>
              <p>This static demo uses the provided lead data for ${escapeHtml(row.clinic_name)} and keeps the experience clearly marked as an unofficial sample concept.</p>
            </div>
            <div class="contact-card">
              <a href="${escapeHtml(phoneHref)}">${escapeHtml(template.ctaText)}</a>
              <a href="${escapeHtml(ctaLink)}">${escapeHtml(template.secondaryCtaText)}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="footer-inner">
      <span>${escapeHtml(row.clinic_name)} — ${disclaimer}</span>
      <span>${escapeHtml(city)} · ${escapeHtml(specialty)} · ${escapeHtml(template.label)}</span>
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
      --accent-3: ${template.accent3};
      --accent-soft: ${template.soft};
      --accent-glow: ${template.glow};
      --page-bg: ${template.pageBg};
      --hero-bg: ${template.heroBg};
      --section-bg: ${template.sectionBg};
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
      background: var(--page-bg);
      text-rendering: geometricPrecision;
    }
    a { color: inherit; text-decoration: none; }
    img { display: block; max-width: 100%; }
    .disclaimer {
      border-bottom: 1px solid rgba(226,232,240,.9);
      background: linear-gradient(90deg, #ffffff, var(--accent-soft), #ffffff);
      padding: 12px 16px;
      text-align: center;
      color: #475569;
      font-size: 14px;
      font-weight: 650;
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
      background: rgba(255,255,255,.84);
      padding: 12px 14px;
      box-shadow: 0 18px 55px rgba(15,23,42,.08);
      backdrop-filter: blur(22px);
    }
    .brand { display: flex; align-items: center; gap: 12px; font-weight: 780; min-width: 0; }
    .logo-mark, .icon-box {
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
      border-radius: 999px; font-size: 14px; font-weight: 780;
      transition: transform .28s ease, box-shadow .28s ease, background .28s ease, border-color .28s ease;
    }
    .nav-cta { background: #0f172a; color: #fff; padding: 12px 16px; box-shadow: 0 16px 38px rgba(15,23,42,.15); }
    .btn-primary { background: #0f172a; color: #fff; padding: 16px 28px; box-shadow: 0 30px 100px rgba(15,23,42,.13); }
    .btn-secondary { border: 1px solid var(--line); background: rgba(255,255,255,.9); color: #1f2937; padding: 16px 28px; box-shadow: 0 18px 55px rgba(15,23,42,.08); }
    .nav-cta:hover, .btn-primary:hover, .btn-secondary:hover { transform: translateY(-4px); }
    .btn-primary:hover, .nav-cta:hover { background: var(--accent); }
    .btn-secondary:hover { border-color: var(--accent-soft); background: var(--accent-soft); }
    .hero { position: relative; overflow: hidden; padding: 76px 16px 122px; background: var(--hero-bg); }
    .blob { position: absolute; border-radius: 38% 62% 65% 35% / 42% 44% 56% 58%; filter: blur(78px); pointer-events: none; transform: rotate(-10deg); }
    .blob-a { left: -120px; top: 90px; width: 450px; height: 320px; background: var(--accent-glow); }
    .blob-b { right: -140px; top: 120px; width: 470px; height: 360px; background: color-mix(in srgb, var(--accent-2) 18%, transparent); }
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
      font-weight: 850;
      letter-spacing: .16em;
      text-transform: uppercase;
    }
    .eyebrow svg { width: 17px; height: 17px; }
    h1 {
      margin: 30px 0 0;
      max-width: 790px;
      font-size: clamp(46px, 8vw, 82px);
      line-height: .98;
      font-weight: 780;
      letter-spacing: 0;
    }
    .gradient-text {
      background: linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3));
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
    .visual-glow { position: absolute; inset: -24px; border-radius: 40px; background: linear-gradient(135deg, var(--accent-glow), rgba(255,255,255,.2), color-mix(in srgb, var(--accent-2) 22%, transparent)); filter: blur(28px); }
    .visual-card {
      position: relative; overflow: hidden;
      border: 2px solid #fff;
      border-radius: 32px;
      background: #fff;
      padding: 8px;
      box-shadow: 0 30px 100px rgba(15,23,42,.13);
    }
    .visual-topline {
      position: absolute; z-index: 2; left: 24px; right: 24px; top: 24px;
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
    }
    .visual-topline > span:first-child {
      border-radius: 999px; background: rgba(255,255,255,.84); color: var(--accent);
      padding: 9px 13px; font-size: 13px; font-weight: 850; box-shadow: 0 18px 55px rgba(15,23,42,.08);
      backdrop-filter: blur(16px);
    }
    .visual-icon, .visual-strip span {
      width: 44px; height: 44px; border-radius: 999px; display: grid; place-items: center;
      color: var(--accent); background: rgba(255,255,255,.86); box-shadow: 0 18px 55px rgba(15,23,42,.08);
      backdrop-filter: blur(16px);
    }
    .visual-image-wrap { aspect-ratio: 4 / 3; border-radius: 25px; overflow: hidden; }
    .visual-image-wrap img { width: 100%; height: 100%; object-fit: cover; }
    .visual-strip { position: absolute; left: 24px; bottom: 24px; display: flex; gap: 10px; }
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
    .appointment small { color: var(--accent); font-weight: 850; letter-spacing: .14em; text-transform: uppercase; }
    .appointment h2 { margin: 8px 0 0; font-size: 26px; }
    .appointment p { margin: 8px 0 0; color: var(--muted); line-height: 1.6; }
    section.content { padding: 118px 16px; }
    .section-head { max-width: 760px; margin-bottom: 64px; }
    .section-head.center { margin-left: auto; margin-right: auto; text-align: center; }
    .section-head p:first-child, .cta-kicker { color: var(--accent); font-size: 13px; font-weight: 850; letter-spacing: .16em; text-transform: uppercase; }
    .section-head h2 { margin: 18px 0 0; font-size: clamp(36px, 5vw, 52px); line-height: 1.06; letter-spacing: 0; }
    .section-head .copy { margin: 22px 0 0; color: var(--muted); line-height: 1.8; font-size: 16px; }
    .cards { display: grid; gap: 22px; }
    .service-card, .trust-card, .journey-card {
      border: 1px solid #f1f5f9;
      border-radius: 26px;
      background: rgba(255,255,255,.92);
      padding: 28px;
      box-shadow: 0 18px 55px rgba(15,23,42,.08);
      transition: transform .28s ease, box-shadow .28s ease, border-color .28s ease;
    }
    .service-card { min-height: 282px; position: relative; overflow: hidden; }
    .service-card::before { content: ""; position: absolute; inset: 0 0 auto; height: 4px; background: linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent-3)); opacity: .9; }
    .service-card:hover { transform: translateY(-8px); border-color: var(--accent-soft); box-shadow: 0 30px 100px rgba(15,23,42,.13); }
    .service-icon { width: 56px; height: 56px; border-radius: 18px; background: var(--accent-soft); color: var(--accent); display: grid; place-items: center; margin-bottom: 28px; }
    .service-icon svg { width: 27px; height: 27px; }
    .service-card h3, .trust-card h3, .journey-card h3 { margin: 0; font-size: 21px; }
    .service-card p, .trust-card p, .journey-card p { color: var(--muted); line-height: 1.75; margin: 14px 0 0; }
    .about-band { background: var(--section-bg); }
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
      background: linear-gradient(135deg, #0f172a, color-mix(in srgb, var(--accent-2) 28%, #0f172a));
      color: #fff;
      padding: 36px;
      box-shadow: 0 30px 100px rgba(15,23,42,.13);
    }
    .cta::before { content: ""; position: absolute; right: -80px; top: -80px; width: 300px; height: 300px; border-radius: 999px; background: var(--accent); opacity: .22; filter: blur(50px); }
    .cta-grid { position: relative; display: grid; gap: 34px; align-items: center; }
    .cta h2 { margin: 14px 0 0; font-size: clamp(36px, 5vw, 52px); line-height: 1.08; }
    .cta p { color: rgba(255,255,255,.72); line-height: 1.8; }
    .contact-card { display: grid; gap: 14px; border: 1px solid rgba(255,255,255,.1); border-radius: 24px; background: rgba(255,255,255,.1); padding: 18px; backdrop-filter: blur(18px); }
    .contact-card a { border-radius: 999px; background: #fff; color: var(--ink); padding: 16px 20px; font-weight: 780; text-align: center; transition: transform .25s ease; }
    .contact-card a:hover { transform: translateY(-3px); }
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
  const filters = [
    ['all', 'All'],
    ['dentist', 'Dentist'],
    ['dermatologist', 'Dermatology'],
    ['physiotherapy', 'Physiotherapy'],
    ['diagnostic-center', 'Diagnostic'],
    ['hospital', 'Hospital'],
    ['ayurveda', 'Ayurveda'],
  ];

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
      font-weight: 650;
    }
    .wrap { max-width: 1180px; margin: 0 auto; padding: 72px 16px 96px; }
    .hero { max-width: 860px; margin-bottom: 34px; }
    .eyebrow { display: inline-flex; border: 1px solid #e0f2fe; border-radius: 999px; background: rgba(255,255,255,.8); padding: 10px 15px; color: #0e7490; font-size: 12px; font-weight: 850; letter-spacing: .16em; text-transform: uppercase; box-shadow: 0 18px 55px rgba(15,23,42,.08); }
    h1 { margin: 24px 0 0; font-size: clamp(44px, 8vw, 78px); line-height: .98; letter-spacing: 0; }
    .hero p { margin: 24px 0 0; max-width: 700px; color: #64748b; font-size: 19px; line-height: 1.75; }
    .filters { display: flex; flex-wrap: wrap; gap: 10px; margin: 0 0 30px; }
    .filter { border: 1px solid #e2e8f0; border-radius: 999px; background: rgba(255,255,255,.86); color: #475569; padding: 11px 15px; font: inherit; font-size: 14px; font-weight: 800; cursor: pointer; box-shadow: 0 12px 30px rgba(15,23,42,.06); transition: transform .22s ease, background .22s ease, color .22s ease; }
    .filter:hover { transform: translateY(-2px); }
    .filter.is-active { background: #0f172a; color: #fff; border-color: #0f172a; }
    .grid { display: grid; gap: 18px; }
    .card { border: 1px solid #f1f5f9; border-radius: 26px; background: rgba(255,255,255,.86); padding: 24px; box-shadow: 0 18px 55px rgba(15,23,42,.08); transition: transform .25s ease, box-shadow .25s ease; }
    .card[hidden] { display: none; }
    .card:hover { transform: translateY(-5px); box-shadow: 0 30px 100px rgba(15,23,42,.12); }
    .meta { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
    .pill { border-radius: 999px; background: #ecfeff; color: #0e7490; padding: 7px 10px; font-size: 12px; font-weight: 800; text-transform: capitalize; }
    .pill.type { background: #f1f5f9; color: #334155; }
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
      <h1>Premium healthcare demo websites by business type.</h1>
      <p>Browse every ready demo generated from <code>src/data/leads.csv</code>. Each page uses a template-specific visual system and remains an unofficial sample concept.</p>
    </section>
    <div class="filters" aria-label="Filter demos by business type">
      ${filters.map(([key, label]) => `<button class="filter${key === 'all' ? ' is-active' : ''}" type="button" data-filter="${key}">${label}</button>`).join('')}
    </div>
    <section class="grid" aria-label="Generated demo websites">
      ${rows.map(row => {
        const templateType = normalizeBusinessType(row.business_type);
        const template = templateConfigs[templateType] || templateConfigs.hospital;
        return `
        <article class="card" data-type="${escapeHtml(templateType)}">
          <div class="meta">
            <span class="pill type">${escapeHtml(template.filterLabel)}</span>
            <span class="pill">${escapeHtml(row.business_type || 'healthcare')}</span>
            <span class="pill">${escapeHtml(cityShort(row.city))}</span>
          </div>
          <h2>${escapeHtml(row.clinic_name)}</h2>
          <p>${escapeHtml(row.specialty || template.label)}</p>
          <p>${escapeHtml(row.city || '')}</p>
          <a class="button" href="${escapeHtml(pageUrl(row.slug))}">Open demo</a>
        </article>`;
      }).join('')}
    </section>
  </main>
  <footer>${disclaimer}</footer>
  <script>
    const buttons = document.querySelectorAll('[data-filter]');
    const cards = document.querySelectorAll('[data-type]');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        buttons.forEach((item) => item.classList.toggle('is-active', item === button));
        cards.forEach((card) => {
          card.hidden = filter !== 'all' && card.dataset.type !== filter;
        });
      });
    });
  </script>
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

const counts = selected.reduce((acc, row) => {
  const type = normalizeBusinessType(row.business_type);
  acc[type] = (acc[type] || 0) + 1;
  return acc;
}, {});

console.log(`Generated ${selected.length} static demo pages for ${batchName}.`);
console.log(`Batch index: publish/index.html`);
console.log(`Assets copied: ${existsSync(distAssetsDir) ? 'publish/assets' : 'dist/assets not found'}`);
console.log(`Template counts: ${Object.entries(counts).map(([type, count]) => `${type}=${count}`).join(', ')}`);
