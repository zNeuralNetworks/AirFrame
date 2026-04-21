
import React from 'react';
import { Map, Layers, Database, Workflow, ShieldCheck, Box } from 'lucide-react';
import IAMD from '../../../docs/INFORMATION_ARCHITECTURE.md?raw';
import DocumentationViewer from './DocumentationViewer';

const iconMap = {
  'App Ecosystem Overview': Box,
  'Navigation & User Journey': Map,
  'Data Architecture': Database,
  'Component Hierarchy': Layers,
  'Simulation Architecture': Workflow,
  'Directory Structure': Box,
};

const InformationArchitectureDoc: React.FC = () => {
  return (
    <DocumentationViewer
      content={IAMD}
      title="Information Architecture: Airframe"
      description="The structural design of the shared information environment, mapping the user journey, data domain, and system hierarchy."
      iconMap={iconMap}
      sourcePath="/docs/INFORMATION_ARCHITECTURE.md"
      version="v1.1.0"
    />
  );
};

export default InformationArchitectureDoc;
