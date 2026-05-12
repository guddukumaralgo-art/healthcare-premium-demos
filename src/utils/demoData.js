export const basePath = '/healthcare-premium-demos/';

export const disclaimer = 'Unofficial sample concept — created for design preview only.';

const fallbackImages = {
  dentist: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=80',
  dermatologist: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
  physiotherapy: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
  'diagnostic-center': 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
  hospital: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  ayurveda: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
  general: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
};

export function normalizeBusinessType(value = '') {
  const clean = String(value).trim().toLowerCase().replace(/[_-]+/g, ' ');

  if (/(dentist|dental)/.test(clean)) return 'dentist';
  if (/(dermatologist|dermatology|skin clinic|skin care|aesthetic)/.test(clean)) return 'dermatologist';
  if (/(physio|physiotherapy|physical therapy)/.test(clean)) return 'physiotherapy';
  if (/(diagnostic|diagnostics|diagnostic center|lab|pathology)/.test(clean)) return 'diagnostic-center';
  if (/(ayurveda|ayurvedic|wellness)/.test(clean)) return 'ayurveda';
  if (/(hospital|multi specialty|multispecialty|clinic)/.test(clean)) return 'hospital';

  return 'hospital';
}

export function parseCsv(source) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      index += 1;
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
      if (char === '\r' && next === '\n') index += 1;
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

  const headers = rows.shift()?.map(header => header.trim()) || [];
  return rows.map(values => Object.fromEntries(headers.map((header, index) => [header, (values[index] || '').trim()])));
}

export function safeSlug(value = '') {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

export function cityShort(city = '') {
  return String(city || 'your city').split(',')[0].trim() || 'your city';
}

export function phoneHref(phone = '') {
  const digits = String(phone).replace(/[^\d+]/g, '');
  return digits ? `tel:${digits}` : '#contact';
}

export function phoneDisplay(phone = '') {
  return String(phone || '').trim() || 'Contact clinic';
}

export function isUnsafeImageUrl(url = '') {
  const value = String(url).trim();
  return !value || value.includes('undefined') || value.includes('null') || !/^https?:\/\//i.test(value);
}

export function fallbackImageFor(type) {
  return fallbackImages[type] || fallbackImages.general;
}

export function normalizeDemoRow(row = {}) {
  const businessType = normalizeBusinessType(row.business_type || row.businessType);
  const slug = safeSlug(row.slug || row.clinic_name || row.clinicName);
  const fallbackImage = fallbackImageFor(businessType);
  const bannerImage = isUnsafeImageUrl(row.banner_image_url || row.heroImage)
    ? fallbackImage
    : row.banner_image_url || row.heroImage;
  const profileImage = isUnsafeImageUrl(row.profile_photo_url || row.profileImage)
    ? ''
    : row.profile_photo_url || row.profileImage;
  const logoImage = isUnsafeImageUrl(row.logo_url || row.logoImage)
    ? ''
    : row.logo_url || row.logoImage;
  const city = row.city || 'your city';
  const clinicName = row.clinic_name || row.clinicName || 'Healthcare Demo';
  const phone = row.phone || '';

  return {
    ...row,
    slug,
    clinicName,
    shortName: clinicName.split(/\s+/).slice(0, 2).join(' '),
    doctorName: row.doctor_name || row.doctorName || 'Care Team',
    specialty: row.specialty || 'Healthcare',
    businessType,
    originalBusinessType: row.business_type || row.businessType || businessType,
    city,
    cityShort: cityShort(city),
    phone,
    phoneDisplay: phoneDisplay(row.phoneDisplay || phone),
    phoneHref: row.phoneHref || phoneHref(phone),
    whatsappHref: row.whatsappHref || row.cta_link || row.ctaLink || '#contact',
    email: row.email || '',
    address: row.address || city,
    headline: row.headline || '',
    subheadline: row.subheadline || '',
    about: row.about || '',
    services: Array.isArray(row.services)
      ? row.services
      : String(row.services || '').split('|').map(service => service.trim()).filter(Boolean),
    heroImage: bannerImage,
    profileImage,
    logoImage,
    disclaimer,
    pageUrl: `${basePath}${slug}/`,
  };
}

export function readyRowsForBatch(csvSource, batch = 'batch_1') {
  return parseCsv(csvSource)
    .filter(row => row.status === 'ready' && row.batch === batch)
    .map(normalizeDemoRow)
    .filter(row => row.slug);
}
