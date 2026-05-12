import HealthcareTemplate from './HealthcareTemplate.jsx';
import { hospitalConfig } from './templateConfigs.js';

export default function HospitalTemplate(props) {
  return <HealthcareTemplate config={hospitalConfig} {...props} />;
}
