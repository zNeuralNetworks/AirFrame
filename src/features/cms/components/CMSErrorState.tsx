import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface CMSErrorStateProps {
  error: string;
}

export const CMSErrorState: React.FC<CMSErrorStateProps> = ({ error }) => (
  <div className="bg-red-50 border border-red-100 rounded-apple-lg p-12 text-center apple-shadow">
    <div className="w-20 h-20 bg-red-100 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
       <ShieldCheck className="w-10 h-10" />
    </div>
    <h3 className="text-2xl font-extrabold text-red-900 mb-3 tracking-tight">Access Denied</h3>
    <p className="text-red-700 text-lg mb-8 max-w-md mx-auto">{error}</p>
    <div className="p-4 bg-white/50 rounded-xl text-xs font-mono text-red-800 text-left overflow-auto max-h-40">
      Firestore rules on your project may need to be updated to allow 'list' operations for the 'users' collection for the current authenticated user.
    </div>
  </div>
);
