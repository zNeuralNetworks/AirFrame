
import React from 'react';
import { Radio, Search, AlertCircle } from 'lucide-react';

const TriRadioVisual: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 my-6 font-sans text-white">
      
      {/* 2-Radio (Legacy) */}
      <div className="mb-8">
         <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-bold text-slate-400">Standard 2-Radio AP</div>
            <div className="text-xs text-red-400 flex items-center gap-1">
               <AlertCircle className="w-3 h-3" /> Blind Spot
            </div>
         </div>
         
         <div className="h-10 bg-slate-800 rounded overflow-hidden flex text-xs font-bold">
            <div className="w-[40%] bg-blue-600 flex items-center justify-center">Serving Clients</div>
            <div className="w-[10%] bg-purple-500/50 flex items-center justify-center text-[8px] animate-pulse">Scan</div>
            <div className="w-[40%] bg-blue-600 flex items-center justify-center">Serving Clients</div>
            <div className="w-[10%] bg-purple-500/50 flex items-center justify-center text-[8px] animate-pulse">Scan</div>
         </div>
         <p className="text-[10px] text-slate-500 mt-1">
            Radio must stop serving data to scan for threats (Time Slicing). Video/Voice jitters during scan.
         </p>
      </div>

      {/* 3-Radio (Arista) */}
      <div>
         <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-bold text-green-400">Arista 3-Radio AP</div>
            <div className="text-xs text-green-400 flex items-center gap-1">
               <Search className="w-3 h-3" /> Continuous
            </div>
         </div>
         
         <div className="space-y-1">
            <div className="h-8 bg-blue-600 rounded flex items-center px-4 text-xs font-bold shadow-lg">
               <Radio className="w-3 h-3 mr-2" /> Serving Radio 1 (5GHz)
            </div>
            <div className="h-8 bg-blue-600 rounded flex items-center px-4 text-xs font-bold shadow-lg">
               <Radio className="w-3 h-3 mr-2" /> Serving Radio 2 (2.4GHz)
            </div>
            <div className="h-8 bg-purple-600 rounded flex items-center px-4 text-xs font-bold border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
               <Search className="w-3 h-3 mr-2 animate-spin-slow" /> WIPS Sensing Radio (Scanning 24/7)
            </div>
         </div>
         <p className="text-[10px] text-slate-500 mt-2">
            Dedicated sensor radio scans continuously without interrupting client traffic.
         </p>
      </div>

    </div>
  );
};

export default TriRadioVisual;
