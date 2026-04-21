
import React from 'react';
import { Target, Users, Layout, Palette, MousePointer2, Rocket } from 'lucide-react';
import ProductDesignMD from '../../../docs/PRODUCT_DESIGN.md?raw';
import DocumentationViewer from './DocumentationViewer';

const iconMap = {
  'Product Vision': Target,
  'Target Audience & Personas': Users,
  'Core Product Pillars': Rocket,
  'Visual Language & Brand Identity': Palette,
  'UX & Interaction Patterns': MousePointer2,
  'Future Roadmap (Product Design)': Layout,
};

const ProductDesignDoc: React.FC = () => {
  return (
    <DocumentationViewer
      content={ProductDesignMD}
      title="Product Design: Airframe"
      description="The product vision, target personas, and design pillars that define the Airframe user experience."
      iconMap={iconMap}
      sourcePath="/docs/PRODUCT_DESIGN.md"
      version="v1.2.4"
    />
  );
};

export default ProductDesignDoc;
