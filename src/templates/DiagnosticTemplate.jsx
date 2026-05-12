import HealthcareTemplate from './HealthcareTemplate.jsx';
import { diagnosticConfig } from './templateConfigs.js';

export default function DiagnosticTemplate(props) {
  return <HealthcareTemplate config={diagnosticConfig} {...props} />;
}
