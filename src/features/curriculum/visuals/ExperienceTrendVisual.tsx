
import React from 'react';
import { TrendingUp, Frown } from 'lucide-react';

const ExperienceTrendVisual: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 my-6 font-sans">
      <div className="grid grid-cols-2 gap-8">
         
         {/* Vanity Metric */}
         <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Old Way (Uptime)</div>
            <div className="h-24 bg-slate-50 rounded-lg border border-slate-200 relative overflow-hidden flex items-end">
               <div className="w-full h-[90%] border-t-2 border-green-500 bg-green-500/10"></div>
               <div className="absolute top-2 right-2 text-green-700 font-bold text-xs">99.99% Up</div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 leading-tight">
               "The AP was powered on, so the dashboard was green."
            </p>
         </div>

         {/* Reality Metric */}
         <div>
            <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-2">New Way (User Exp)</div>
            <div className="h-24 bg-slate-50 rounded-lg border border-slate-200 relative overflow-hidden flex items-end px-1">
               {/* Trend Line */}
               <svg className="w-full h-full absolute bottom-0 left-0" preserveAspectRatio="none" viewBox="0 0 100 50">
                  <path d="M0 45 L20 45 L25 10 L35 10 L40 45 L100 45" fill="none" stroke="#ef4444" strokeWidth="2" />
                  <path d="M0 45 L20 45 L25 10 L35 10 L40 45 L100 45" fill="rgba(239, 68, 68, 0.1)" stroke="none" />
               </svg>
               <div className="absolute top-2 right-2 text-red-600 font-bold text-xs flex items-center gap-1">
                  <Frown className="w-3 h-3" /> User Failed
               </div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 leading-tight">
               "At 10:00 AM, DHCP failed. Users were unhappy despite AP being 'Up'."
            </p>
         </div>

      </div>
    </div>
  );
};

export default ExperienceTrendVisual;
