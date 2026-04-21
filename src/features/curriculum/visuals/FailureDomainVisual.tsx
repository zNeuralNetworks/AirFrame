
import React from 'react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

const FailureDomainVisual: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 my-6 font-sans">
      <h4 className="font-bold text-slate-800 mb-4 text-center">Mean Time to Innocence Pipeline</h4>
      
      <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
         {/* Step 1 */}
         <div className="flex flex-col items-center gap-2 opacity-50 group">
            <div className="w-24 h-10 bg-green-50 border border-green-200 rounded-lg flex items-center justify-center gap-2 shadow-sm">
               <CheckCircle2 className="w-4 h-4 text-green-600" />
               <span className="text-xs font-bold text-green-800">Association</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">RF is OK</span>
         </div>

         <ArrowRight className="w-4 h-4 text-slate-300 rotate-90 md:rotate-0" />

         {/* Step 2 */}
         <div className="flex flex-col items-center gap-2 opacity-50 group">
            <div className="w-24 h-10 bg-green-50 border border-green-200 rounded-lg flex items-center justify-center gap-2 shadow-sm">
               <CheckCircle2 className="w-4 h-4 text-green-600" />
               <span className="text-xs font-bold text-green-800">Auth (Radius)</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Password OK</span>
         </div>

         <ArrowRight className="w-4 h-4 text-slate-300 rotate-90 md:rotate-0" />

         {/* Step 3 (Failure) */}
         <div className="flex flex-col items-center gap-2 animate-pulse">
            <div className="w-28 h-12 bg-red-50 border-2 border-red-500 rounded-xl flex items-center justify-center gap-2 shadow-md transform scale-110">
               <XCircle className="w-5 h-5 text-red-600" />
               <span className="text-sm font-bold text-red-800">DHCP</span>
            </div>
            <span className="text-xs text-red-600 font-bold bg-red-50 px-2 py-1 rounded">ROOT CAUSE</span>
         </div>

         <ArrowRight className="w-4 h-4 text-slate-300 rotate-90 md:rotate-0" />

         {/* Step 4 */}
         <div className="flex flex-col items-center gap-2 opacity-30 grayscale">
            <div className="w-24 h-10 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center gap-2">
               <span className="text-xs font-bold text-slate-500">DNS / App</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Not Reached</span>
         </div>
      </div>

      <div className="mt-6 text-center text-xs text-slate-500 italic bg-slate-50 p-2 rounded">
         "The user says 'Wi-Fi is broken', but the dashboard proves the failure is at the DHCP server."
      </div>
    </div>
  );
};

export default FailureDomainVisual;
