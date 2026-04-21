
import React from 'react';
import { ClipboardCheck, CheckCircle2, XCircle } from 'lucide-react';

const POVSuccessVisual: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 my-6 font-sans">
      <div className="flex items-center gap-3 mb-6 bg-slate-50 p-3 rounded-lg border border-slate-100">
         <ClipboardCheck className="w-5 h-5 text-brand-600" />
         <div>
            <h4 className="font-bold text-slate-900 text-sm">Success Criteria Plan</h4>
            <div className="text-xs text-slate-500">Agreed upon metrics before installation.</div>
         </div>
      </div>

      <div className="space-y-4">
         <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="text-sm text-slate-700">Roaming Continuity</div>
            <div className="flex items-center gap-2">
               <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">0 Drops</span>
               <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
         </div>

         <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="text-sm text-slate-700">Voice Latency</div>
            <div className="flex items-center gap-2">
               <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">&lt; 50ms</span>
               <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
         </div>

         <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="text-sm text-slate-700">WIPS Detection</div>
            <div className="flex items-center gap-2">
               <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">&lt; 10s</span>
               <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
         </div>

         <div className="flex items-center justify-between opacity-50">
            <div className="text-sm text-slate-700">Speed Test</div>
            <div className="flex items-center gap-2">
               <span className="text-xs bg-slate-100 text-slate-400 px-2 py-0.5 rounded font-mono line-through">1 Gbps</span>
               <XCircle className="w-4 h-4 text-slate-300" />
            </div>
         </div>
      </div>
      
      <div className="mt-4 text-[10px] text-slate-400 text-center italic">
         "Don't promise speed. Promise experience (zero drops)."
      </div>
    </div>
  );
};

export default POVSuccessVisual;
