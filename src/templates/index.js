import DentistTemplate from './DentistTemplate.jsx';
import DermatologyTemplate from './DermatologyTemplate.jsx';
import PhysioTemplate from './PhysioTemplate.jsx';
import DiagnosticTemplate from './DiagnosticTemplate.jsx';
import HospitalTemplate from './HospitalTemplate.jsx';
import AyurvedaTemplate from './AyurvedaTemplate.jsx';

export { default as HealthcareTemplate } from './HealthcareTemplate.jsx';
export { default as DentistTemplate } from './DentistTemplate.jsx';
export { default as DermatologyTemplate } from './DermatologyTemplate.jsx';
export { default as PhysioTemplate } from './PhysioTemplate.jsx';
export { default as DiagnosticTemplate } from './DiagnosticTemplate.jsx';
export { default as HospitalTemplate } from './HospitalTemplate.jsx';
export { default as AyurvedaTemplate } from './AyurvedaTemplate.jsx';
export { templateByBusinessType } from './templateConfigs.js';

export const templateComponentByBusinessType = {
  dentist: DentistTemplate,
  dermatologist: DermatologyTemplate,
  physiotherapy: PhysioTemplate,
  'diagnostic-center': DiagnosticTemplate,
  hospital: HospitalTemplate,
  ayurveda: AyurvedaTemplate,
};
