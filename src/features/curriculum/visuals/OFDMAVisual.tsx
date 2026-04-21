
import React from 'react';
import { Box } from 'lucide-react';

const OFDMAVisual: React.FC = () => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-6 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
         {/* Legacy OFDM */}
         <div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Legacy (OFDM)</div>
            <div className="bg-white border-2 border-slate-300 rounded-xl p-4 relative h-24 flex items-center">
               <div className="absolute top-2 left-2 text-[10px] text-slate-400 font-mono">FRAME 1</div>
               <div className="h-16 w-16 bg-blue-100 border border-blue-300 rounded flex flex-col items-center justify-center">
                  <Box className="w-6 h-6 text-blue-500" />
                  <span className="text-[10px] font-bold text-blue-700">User A</span>
               </div>
               <div className="flex-1 flex items-center justify-center">
                  <span className="text-xs text-red-400 italic">Unused Airtime (Wasted)</span>
               </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">1 User per transmission. The truck sends one small box.</p>
         </div>

         {/* OFDMA */}
         <div>
            <div className="text-sm font-bold text-brand-600 uppercase tracking-wider mb-3">Wi-Fi 6 (OFDMA)</div>
            <div className="bg-white border-2 border-brand-200 rounded-xl p-4 relative h-24 flex items-center gap-2">
               <div className="absolute top-2 left-2 text-[10px] text-slate-400 font-mono">FRAME 1</div>
               <div className="h-16 w-16 bg-blue-100 border border-blue-300 rounded flex flex-col items-center justify-center">
                  <Box className="w-6 h-6 text-blue-500" />
                  <span className="text-[10px] font-bold text-blue-700">User A</span>
               </div>
               <div className="h-16 w-16 bg-purple-100 border border-purple-300 rounded flex flex-col items-center justify-center">
                  <Box className="w-6 h-6 text-purple-500" />
                  <span className="text-[10px] font-bold text-purple-700">User B</span>
               </div>
               <div className="h-16 w-16 bg-green-100 border border-green-300 rounded flex flex-col items-center justify-center">
                  <Box className="w-6 h-6 text-green-500" />
                  <span className="text-[10px] font-bold text-green-700">User C</span>
               </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">Multiple users packed into one transmission. High efficiency.</p>
         </div>

      </div>
    </div>
  );
};

export default OFDMAVisual;
