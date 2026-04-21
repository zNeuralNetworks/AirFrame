
import React, { useState } from 'react';
import Layout from '../shared/ui/Layout';
import { useDesignSystemRoutes } from '../features/design-system/useDesignSystemRoutes';

interface DesignSystemProps {
  onExit: () => void;
}

const DesignSystem: React.FC<DesignSystemProps> = ({ onExit }) => {
  const [view, setView] = useState('about-airframe');
  const { navItems, renderContent } = useDesignSystemRoutes();

  return (
    <Layout 
      currentView={view} 
      onChangeView={setView}
      navItems={navItems}
      title="Design System"
      themeColor="purple"
      onExitApp={onExit}
      onPrint={() => {
        setTimeout(() => window.print(), 100);
      }}
    >
      {renderContent(view)}
    </Layout>
  );
};

export default DesignSystem;
