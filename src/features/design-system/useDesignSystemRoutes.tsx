
import React from 'react';
import EdTechGallery from './EdTechGallery';
import VisualGallery from './VisualGallery';
import TypographyReference from './TypographyReference';
import CurriculumLegacy from './CurriculumLegacy';
import InterfaceReference from './InterfaceReference';
import MascotReference from './MascotReference';
import ChiefProductOfficer from './ChiefProductOfficer';
import DemoSuggestions from '../demo/DemoSuggestions';
import AboutAirframe from './AboutAirframe';
import TechnicalDesignDoc from './TechnicalDesignDoc';
import InformationArchitectureDoc from './InformationArchitectureDoc';
import ProductDesignDoc from './ProductDesignDoc';
import SimulationDevelopmentDoc from './SimulationDevelopmentDoc';
import { BrainCircuit, Palette, FileText, Component, Smile, Briefcase, Map, History, Info, Type, FileCode, Network, NotebookPen, Terminal } from 'lucide-react';
import { NavItem } from '../../shared/ui/Layout';

export const useDesignSystemRoutes = () => {
  const navItems: NavItem[] = [
    { id: 'about-airframe', label: 'Manifesto', icon: Info },
    { id: 'product-design-doc', label: 'Product Design', icon: NotebookPen },
    { id: 'ia-design-doc', label: 'Info Architecture', icon: Network },
    { id: 'tech-design-doc', label: 'Tech Design', icon: FileCode },
    { id: 'sim-dev-doc', label: 'Sim Development', icon: Terminal },
    { id: 'visual-systems', label: 'Visual Systems', icon: Palette },
    { id: 'typography', label: 'Typography & Type', icon: Type },
    { id: 'mascot-design', label: 'Mascot Identity', icon: Smile },
    { id: 'ui-reference', label: 'UI Components', icon: Component },
    { id: 'design-gallery', label: 'UX Patterns', icon: BrainCircuit },
    { id: 'pedagogy-legacy', label: 'Pedagogy, Curriculum and Roadmap', icon: History },
    { id: 'demo-strategy', label: 'Sales Playbook', icon: Map },
  ];

  const renderContent = (view: string) => {
    switch (view) {
      case 'about-airframe': return <AboutAirframe />;
      case 'product-design-doc': return <ProductDesignDoc />;
      case 'ia-design-doc': return <InformationArchitectureDoc />;
      case 'tech-design-doc': return <TechnicalDesignDoc />;
      case 'sim-dev-doc': return <SimulationDevelopmentDoc />;
      case 'cpo-strategy': return <ChiefProductOfficer />;
      case 'typography': return <TypographyReference />;
      case 'visual-systems': return <VisualGallery />;
      case 'mascot-design': return <MascotReference />;
      case 'ui-reference': return <InterfaceReference />;
      case 'design-gallery': return <EdTechGallery />;
      case 'pedagogy-legacy': return <CurriculumLegacy />;
      case 'demo-strategy': return <DemoSuggestions />;
      default: return <AboutAirframe />;
    }
  };

  return { navItems, renderContent };
};
