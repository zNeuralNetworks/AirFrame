
import React from 'react';
import { Terminal, Code2, ListTree, Link, Lightbulb } from 'lucide-react';
import SimDevMD from '../../../docs/SIMULATION_DEVELOPMENT.md?raw';
import DocumentationViewer from './DocumentationViewer';

const iconMap = {
  'Simulation Architecture Overview': Terminal,
  'Step-by-Step: Creating a New Simulation': Code2,
  'Best Practices': Lightbulb,
};

const SimulationDevelopmentDoc: React.FC = () => {
  return (
    <DocumentationViewer
      content={SimDevMD}
      title="Simulation Development: Guide"
      description="Technical documentation for building, registering, and orchestrating interactive wireless simulations within the Airframe ecosystem."
      iconMap={iconMap}
      sourcePath="/docs/SIMULATION_DEVELOPMENT.md"
      version="v1.0.2"
    />
  );
};

export default SimulationDevelopmentDoc;
