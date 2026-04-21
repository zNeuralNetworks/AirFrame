
import React from 'react';
import { Map, ArrowRight, Zap, List, Navigation } from 'lucide-react';

const RoamingProtocolsVisual: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 my-6 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         
         {/* 11k */}
         <div className="flex flex-col items-center text-center group">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 border-2 border-blue-100 group-hover:border-blue-500 transition-colors">
               <Map className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900">802.11k</h4>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">The Map</div>
            <p className="text-xs text-slate-500 leading-relaxed">
               AP sends a <strong>Neighbor Report</strong> to the client. "Here are the 6 APs nearby so you don't have to scan all 200 channels."
            </p>
         </div>

         {/* 11v */}
         <div className="flex flex-col items-center text-center group">
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-3 border-2 border-purple-100 group-hover:border-purple-500 transition-colors">
               <Navigation className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900">802.11v</h4>
            <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">The Nudge</div>
            <p className="text-xs text-slate-500 leading-relaxed">
               AP suggests a better AP via <strong>BSS Transition Management</strong>. "Please move to AP-2, it's less crowded."
            </p>
         </div>

         {/* 11r */}
         <div className="flex flex-col items-center text-center group">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-3 border-2 border-amber-100 group-hover:border-amber-500 transition-colors">
               <Zap className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900">802.11r</h4>
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">The Keys</div>
            <p className="text-xs text-slate-500 leading-relaxed">
               <strong>Fast Transition</strong> caches encryption keys ahead of time. Skips the 4-way handshake during the roam.
            </p>
         </div>

      </div>
    </div>
  );
};

export default RoamingProtocolsVisual;
