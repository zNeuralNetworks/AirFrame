
import React from 'react';
import { Clock } from 'lucide-react';

const LegacyTaxChart: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 my-6 font-sans shadow-sm">
      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
         <Clock className="w-5 h-5 text-brand-600" /> Airtime Consumption (1MB File)
      </h4>

      <div className="space-y-4">
         {/* Wi-Fi 6 Client */}
         <div>
            <div className="flex justify-between text-xs mb-1">
               <span className="font-bold text-slate-700">Wi-Fi 6 Client (1200 Mbps)</span>
               <span className="text-slate-500">~1ms</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
               <div className="bg-green-500 h-full w-[5%]"></div>
            </div>
         </div>

         {/* Wi-Fi 4 Client */}
         <div>
            <div className="flex justify-between text-xs mb-1">
               <span className="font-bold text-slate-700">Wi-Fi 4 Client (150 Mbps)</span>
               <span className="text-slate-500">~12ms</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
               <div className="bg-blue-400 h-full w-[30%]"></div>
            </div>
         </div>

         {/* Legacy Client */}
         <div>
            <div className="flex justify-between text-xs mb-1">
               <span className="font-bold text-slate-700">Legacy 802.11b (1 Mbps)</span>
               <span className="text-red-500 font-bold">~1500ms</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden relative">
               <div className="bg-red-500 h-full w-full animate-pulse"></div>
               <div className="absolute inset-0 flex items-center justify-center text-[9px] text-white font-bold tracking-widest uppercase">
                  Blocking the Highway
               </div>
            </div>
         </div>
      </div>
      
      <div className="mt-4 p-3 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-200">
         <strong>Insight:</strong> The legacy client doesn't just hurt itself; it forces the fast clients to wait 1.5 seconds for the air to clear.
      </div>
    </div>
  );
};

export default LegacyTaxChart;
