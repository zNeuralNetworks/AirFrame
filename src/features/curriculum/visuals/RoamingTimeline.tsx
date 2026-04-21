
import React from 'react';
import { Clock } from 'lucide-react';

const RoamingTimeline: React.FC = () => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-6 font-sans">
      <div className="flex items-center gap-2 mb-6 text-slate-500 text-xs font-bold uppercase tracking-wider">
        <Clock className="w-4 h-4" /> Roaming Budget (VoIP)
      </div>

      {/* Threshold Line */}
      <div className="relative pt-6 pb-2">
         <div className="absolute top-0 bottom-0 left-[37%] w-0.5 bg-red-400 border-l border-dashed border-red-500 z-10"></div>
         <div className="absolute top-0 left-[38%] text-[10px] text-red-600 font-bold bg-red-50 px-1 rounded">
            150ms (Call Drops / Robot Voice)
         </div>

         <div className="space-y-6">
            {/* Standard Roam */}
            <div>
               <div className="text-xs font-bold text-slate-700 mb-1">Standard WPA2 Enterprise Roam</div>
               <div className="flex items-center h-8 w-full bg-slate-200 rounded overflow-hidden">
                  <div className="h-full bg-blue-400 w-[10%] flex items-center justify-center text-[9px] text-white border-r border-white/20">Scan</div>
                  <div className="h-full bg-indigo-400 w-[10%] flex items-center justify-center text-[9px] text-white border-r border-white/20">Auth</div>
                  <div className="h-full bg-purple-500 w-[40%] flex items-center justify-center text-[9px] text-white border-r border-white/20">802.1X (RADIUS)</div>
                  <div className="h-full bg-orange-400 w-[20%] flex items-center justify-center text-[9px] text-white">Key</div>
               </div>
               <div className="text-right text-xs text-red-500 font-bold mt-1">~400ms (Fail)</div>
            </div>

            {/* Fast Roam */}
            <div>
               <div className="text-xs font-bold text-slate-700 mb-1">802.11r (Fast Transition)</div>
               <div className="flex items-center h-8 w-full bg-slate-200 rounded overflow-hidden relative">
                  <div className="h-full bg-blue-400 w-[5%] flex items-center justify-center text-[9px] text-white border-r border-white/20"></div>
                  <div className="h-full bg-green-500 w-[8%] flex items-center justify-center text-[9px] text-white font-bold">FT</div>
                  {/* Empty space to show speed */}
                  <div className="flex-1"></div>
               </div>
               <div className="text-left pl-[14%] text-xs text-green-600 font-bold mt-1">~50ms (Pass)</div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default RoamingTimeline;
