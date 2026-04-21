
import React from 'react';
import { ArrowRight, ChevronLeft } from 'lucide-react';

const HandshakeVisualizer: React.FC = () => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-6 animate-fade-in font-sans">
      <div className="flex justify-between px-8 mb-4 font-bold text-slate-700 text-xs sm:text-sm uppercase tracking-wider">
        <span>Authenticator (AP)</span>
        <span>Supplicant (Client)</span>
      </div>
      
      <div className="relative space-y-4">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-2 bottom-2 w-0.5 bg-slate-200 -translate-x-1/2"></div>

        {/* M1 */}
        <div className="relative flex items-center justify-between group">
           <div className="w-[45%] text-right pr-4 text-xs text-slate-500">
              Generated <strong>ANonce</strong>
           </div>
           <div className="absolute left-1/2 -translate-x-1/2 bg-blue-100 text-blue-600 border border-blue-200 rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs z-10 shadow-sm">M1</div>
           <div className="w-[45%] pl-4 text-xs text-slate-400">
              (Open)
           </div>
           {/* Arrow Visual (Right) */}
           <div className="absolute left-[52%] top-1/2 w-[40%] h-px bg-blue-300 -z-0"></div>
           <ArrowRight className="absolute right-[5%] top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
        </div>

        {/* M2 */}
        <div className="relative flex items-center justify-between group pt-4">
           <div className="w-[45%] text-right pr-4 text-xs text-slate-400">
              Verifies ANonce
           </div>
           <div className="absolute left-1/2 -translate-x-1/2 bg-amber-100 text-amber-600 border border-amber-200 rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs z-10 shadow-sm">M2</div>
           <div className="w-[45%] pl-4 text-xs text-slate-600 font-medium">
              Sends <strong>SNonce</strong> + <strong>MIC</strong>
              <div className="text-[10px] text-amber-600 mt-0.5">"I know the password"</div>
           </div>
           {/* Arrow Visual (Left) */}
           <div className="absolute right-[52%] top-[65%] w-[40%] h-px bg-amber-300 -z-0"></div>
           <ChevronLeft className="absolute left-[5%] top-[65%] -translate-y-1/2 w-4 h-4 text-amber-300" />
        </div>

        {/* M3 */}
        <div className="relative flex items-center justify-between group pt-4">
           <div className="w-[45%] text-right pr-4 text-xs text-slate-600 font-medium">
              Sends <strong>GTK</strong> (Group Key)
              <div className="text-[10px] text-purple-600 mt-0.5">"Here is the broadcast key"</div>
           </div>
           <div className="absolute left-1/2 -translate-x-1/2 bg-purple-100 text-purple-600 border border-purple-200 rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs z-10 shadow-sm">M3</div>
           <div className="w-[45%] pl-4 text-xs text-slate-400">
              Verifies MIC
           </div>
           {/* Arrow Visual (Right) */}
           <div className="absolute left-[52%] top-[65%] w-[40%] h-px bg-purple-300 -z-0"></div>
           <ArrowRight className="absolute right-[5%] top-[65%] -translate-y-1/2 w-4 h-4 text-purple-300" />
        </div>

        {/* M4 */}
        <div className="relative flex items-center justify-between group pt-4">
           <div className="w-[45%] text-right pr-4 text-xs text-slate-400">
              Keys Installed
           </div>
           <div className="absolute left-1/2 -translate-x-1/2 bg-green-100 text-green-600 border border-green-200 rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs z-10 shadow-sm">M4</div>
           <div className="w-[45%] pl-4 text-xs text-slate-600 font-medium">
              <strong>ACK</strong> (Confirmation)
           </div>
           {/* Arrow Visual (Left) */}
           <div className="absolute right-[52%] top-[65%] w-[40%] h-px bg-green-300 -z-0"></div>
           <ChevronLeft className="absolute left-[5%] top-[65%] -translate-y-1/2 w-4 h-4 text-green-300" />
        </div>
      </div>
    </div>
  );
};

export default HandshakeVisualizer;
