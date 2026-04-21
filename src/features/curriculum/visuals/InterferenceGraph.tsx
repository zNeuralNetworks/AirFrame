
import React from 'react';
import { Activity, Zap } from 'lucide-react';

const InterferenceGraph: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 my-6 font-sans text-white">
      <div className="flex items-center justify-between mb-6">
         <h4 className="font-bold text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-400" /> Duty Cycle Comparison
         </h4>
         <div className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">Time Domain →</div>
      </div>

      {/* Wi-Fi (Polite) */}
      <div className="mb-6">
         <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span className="text-green-400 font-bold">Wi-Fi (Polite)</span>
            <span>~20% Duty Cycle</span>
         </div>
         <div className="h-12 bg-slate-800 rounded-lg flex items-center px-1 gap-1 overflow-hidden relative">
            <div className="h-full w-full absolute inset-0 flex items-center gap-4 px-2">
               <div className="h-8 w-4 bg-green-500 rounded shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
               <div className="h-8 w-8 bg-green-500 rounded shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
               <div className="text-[10px] text-slate-500 font-mono w-12 text-center">Gap</div>
               <div className="h-8 w-6 bg-green-500 rounded shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
               <div className="text-[10px] text-slate-500 font-mono w-16 text-center">Listen</div>
               <div className="h-8 w-4 bg-green-500 rounded shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            </div>
         </div>
         <p className="text-xs text-slate-500 mt-1">Leaves gaps for others to talk. CSMA/CA Compliant.</p>
      </div>

      {/* Microwave (Rude) */}
      <div>
         <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span className="text-red-400 font-bold">Microwave / Analog Cam (Rude)</span>
            <span>~100% Duty Cycle</span>
         </div>
         <div className="h-12 bg-slate-800 rounded-lg flex items-center px-1 overflow-hidden relative">
            <div className="h-8 w-full bg-gradient-to-r from-red-600 to-orange-600 rounded flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.4)]">
               <Zap className="w-4 h-4 text-white animate-pulse" />
               <span className="text-xs font-bold text-white ml-2 tracking-widest">CONTINUOUS NOISE</span>
            </div>
         </div>
         <p className="text-xs text-slate-500 mt-1">No gaps. Destroys all packets in its path.</p>
      </div>
    </div>
  );
};

export default InterferenceGraph;
