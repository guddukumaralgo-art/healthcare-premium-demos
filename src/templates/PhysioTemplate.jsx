import HealthcareTemplate from './HealthcareTemplate.jsx';
import { physioConfig } from './templateConfigs.js';

export default function PhysioTemplate(props) {
  return <HealthcareTemplate config={physioConfig} {...props} />;
}
