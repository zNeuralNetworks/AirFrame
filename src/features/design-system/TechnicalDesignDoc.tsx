
import React from 'react';
import { Activity, Database, BookOpen, Terminal, ShieldCheck, Cpu } from 'lucide-react';
import TechDesignMD from '../../../docs/TECHNICAL_DESIGN.md?raw';
import DocumentationViewer from './DocumentationViewer';

const iconMap = {
  'System Architecture': Activity,
  'State & Persistence Engine': Database,
  'The Curriculum Engine': BookOpen,
  'Simulation & Lab Architecture': Terminal,
  'Security & Identity Logic': ShieldCheck,
  'Engineering Quality & performance': Cpu,
};

const TechnicalDesignDoc: React.FC = () => {
  return (
    <DocumentationViewer
      content={TechDesignMD}
      title="Technical Design Specification"
      description="Detailed modular architecture, state persistence patterns, and deployment security measures for the Airframe platform."
      iconMap={iconMap}
      sourcePath="/docs/TECHNICAL_DESIGN.md"
      version="v2.4.8"
    />
  );
};

export default TechnicalDesignDoc;
