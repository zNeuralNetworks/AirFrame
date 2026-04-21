
import React from 'react';
import { Smartphone, RefreshCw, XCircle, CheckCircle } from 'lucide-react';

const RoamingDecisionVisual: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 my-6 font-sans text-white">
      <div className="flex items-center gap-2 mb-6">
         <Smartphone className="w-5 h-5 text-pink-400" />
         <h4 className="font-bold text-lg">Client Driver Logic</h4>
      </div>

      <div className="relative pt-8 pb-4 px-4">
         {/* Gradient Bar */}
         <div className="h-4 w-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-600 rounded-full relative"></div>

         {/* Scale Markers */}
         <div className="absolute top-0 left-[10%] -ml-4 flex flex-col items-center">
            <span className="text-xs font-mono text-slate-400">-50</span>
            <div className="h-10 w-0.5 bg-slate-600 mt-1"></div>
         </div>
         <div className="absolute top-0 left-[40%] -ml-4 flex flex-col items-center">
            <span className="text-xs font-mono text-slate-400">-70</span>
            <div className="h-10 w-0.5 bg-white mt-1"></div>
         </div>
         <div className="absolute top-0 left-[60%] -ml-4 flex flex-col items-center">
            <span className="text-xs font-mono text-slate-400">-80</span>
            <div className="h-10 w-0.5 bg-slate-600 mt-1"></div>
         </div>

         {/* Zones */}
         <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="text-center">
               <div className="inline-flex items-center gap-1 text-green-400 text-xs font-bold uppercase mb-1">
                  <CheckCircle className="w-3 h-3" /> Content
               </div>
               <p className="text-[10px] text-slate-400 leading-tight">Client is happy. Will not even look for other APs.</p>
            </div>
            
            <div className="text-center relative">
               <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                  Trigger Point (-70dBm)
               </div>
               <div className="inline-flex items-center gap-1 text-yellow-400 text-xs font-bold uppercase mb-1">
                  <RefreshCw className="w-3 h-3" /> Scanning
               </div>
               <p className="text-[10px] text-slate-400 leading-tight">Client begins sending Probe Requests to find a better AP.</p>
            </div>

            <div className="text-center">
               <div className="inline-flex items-center gap-1 text-red-400 text-xs font-bold uppercase mb-1">
                  <XCircle className="w-3 h-3" /> Sticky / Dead
               </div>
               <p className="text-[10px] text-slate-400 leading-tight">Packet loss begins. User experience degrades.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default RoamingDecisionVisual;
