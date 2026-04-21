import React from 'react';
import { Layout } from 'lucide-react';

interface CMSEmptyStateProps {
  activeTab: string;
  onSeed: () => void;
}

export const CMSEmptyState: React.FC<CMSEmptyStateProps> = ({ activeTab, onSeed }) => (
  <div className="bg-white rounded-apple-lg p-16 text-center border border-border apple-shadow-lg">
    <div className="w-20 h-20 bg-app text-text-muted rounded-3xl flex items-center justify-center mx-auto mb-6">
       <Layout className="w-10 h-10 opacity-20" />
    </div>
    <h3 className="text-2xl font-extrabold text-text-primary mb-3 tracking-tight">No {activeTab} found in Firestore</h3>
    {activeTab !== 'feedback' && (
      <>
        <p className="text-text-muted text-lg mb-8 max-w-md mx-auto">You can seed this collection with the initial static content to get started.</p>
        <button 
          onClick={onSeed}
          className="px-10 py-4 bg-text-primary text-white rounded-apple font-bold text-lg apple-shadow hover:opacity-90 transition-all"
        >
          Seed from Static Data
        </button>
      </>
    )}
  </div>
);
