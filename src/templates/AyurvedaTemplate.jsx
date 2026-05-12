import HealthcareTemplate from './HealthcareTemplate.jsx';
import { ayurvedaConfig } from './templateConfigs.js';

export default function AyurvedaTemplate(props) {
  return <HealthcareTemplate config={ayurvedaConfig} {...props} />;
}
