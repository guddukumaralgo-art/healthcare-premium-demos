import HealthcareTemplate from './HealthcareTemplate.jsx';
import { dermatologyConfig } from './templateConfigs.js';

export default function DermatologyTemplate(props) {
  return <HealthcareTemplate config={dermatologyConfig} {...props} />;
}
