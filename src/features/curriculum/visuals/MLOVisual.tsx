
import React from 'react';
import { Zap, ArrowRight } from 'lucide-react';

const MLOVisual: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 my-6 font-sans text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
         {/* Single Link */}
         <div className="opacity-60 grayscale">
            <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Legacy (Single Link)</div>
            <div className="relative bg-slate-800 rounded-lg p-4 h-24 flex items-center border border-slate-700">
               <div className="absolute left-2 text-[10px] text-slate-500 font-mono rotate-90 origin-left">5 GHz</div>
               <div className="flex-1 flex gap-2 overflow-hidden mx-6">
                  <div className="h-12 w-16 bg-blue-600 rounded flex items-center justify-center text-xs font-bold">Data</div>
                  <div className="h-12 w-16 bg-transparent border border-dashed border-slate-600 rounded"></div>
               </div>
               <div className="absolute right-2"><ArrowRight className="w-4 h-4 text-slate-500" /></div>
            </div>
            <p className="text-xs text-slate-500 mt-2">Congestion on 5GHz stops the flow. 6GHz is unused.</p>
         </div>

         {/* MLO */}
         <div>
            <div className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-3">Wi-Fi 7 (MLO)</div>
            <div className="bg-slate-800 rounded-lg p-4 h-24 flex flex-col justify-center gap-2 border border-slate-700 relative overflow-hidden">
               {/* 5GHz Lane */}
               <div className="h-8 bg-slate-900/50 rounded flex items-center px-2 relative">
                  <div className="text-[9px] text-slate-500 font-mono w-8">5 GHz</div>
                  <div className="h-4 w-12 bg-red-500/20 rounded border border-red-500/50 flex items-center justify-center">
                     <Zap className="w-3 h-3 text-red-500" />
                  </div>
               </div>
               
               {/* 6GHz Lane */}
               <div className="h-8 bg-slate-900/50 rounded flex items-center px-2 relative">
                  <div className="text-[9px] text-slate-500 font-mono w-8">6 GHz</div>
                  <div className="absolute left-12 right-2 flex gap-1 animate-pulse">
                     <div className="h-4 w-16 bg-cyan-500 rounded shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                     <div className="h-4 w-16 bg-cyan-500 rounded shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                  </div>
               </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">
               <span className="text-cyan-400 font-bold">Resilience:</span> 5GHz is blocked? Traffic instantly switches to 6GHz.
            </p>
         </div>

      </div>
    </div>
  );
};

export default MLOVisual;
