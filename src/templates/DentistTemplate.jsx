import HealthcareTemplate from './HealthcareTemplate.jsx';
import { dentistConfig } from './templateConfigs.js';

export default function DentistTemplate(props) {
  return <HealthcareTemplate config={dentistConfig} {...props} />;
}
