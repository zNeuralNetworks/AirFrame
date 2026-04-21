
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const SignalNoiseRatio: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 my-6 shadow-sm font-sans flex flex-col md:flex-row gap-8 items-stretch">
      
      {/* High SNR Scenario */}
      <div className="flex-1 flex flex-col items-center">
        <div className="text-sm font-bold text-slate-800 mb-4 text-center">Healthy Connection (High SNR)</div>
        <div className="relative w-24 h-48 bg-slate-100 rounded-lg border border-slate-200 flex flex-col justify-end overflow-hidden">
           {/* Noise Floor */}
           <div className="w-full h-[20%] bg-slate-400 border-t border-slate-500 flex items-center justify-center text-[10px] text-white font-bold z-10">
              Noise (-95)
           </div>
           
           {/* Signal */}
           <div className="absolute bottom-0 w-full h-[70%] bg-green-500/20 border-t-2 border-green-500 flex items-start justify-center pt-2">
              <span className="text-xs font-bold text-green-700 bg-white/80 px-1 rounded">-45 dBm</span>
           </div>

           {/* Gap Arrow */}
           <div className="absolute bottom-[20%] top-[30%] right-2 left-2 flex flex-col items-center justify-center">
              <div className="h-full w-px bg-slate-400 border-l border-dashed"></div>
              <span className="bg-white text-xs font-bold px-1 text-slate-600 shadow-sm border rounded mt-[-50%]">50dB SNR</span>
           </div>
        </div>
        <div className="mt-3 text-xs text-center text-green-600 font-bold bg-green-50 px-2 py-1 rounded">Fast (MCS 11)</div>
      </div>

      {/* Low SNR Scenario */}
      <div className="flex-1 flex flex-col items-center border-l border-slate-100 pl-8 md:pl-0 md:border-l-0">
        <div className="text-sm font-bold text-slate-800 mb-4 text-center">Noisy Environment (Low SNR)</div>
        <div className="relative w-24 h-48 bg-slate-100 rounded-lg border border-slate-200 flex flex-col justify-end overflow-hidden">
           {/* Noise Floor (High) */}
           <div className="w-full h-[60%] bg-red-400 border-t border-red-500 flex items-center justify-center text-[10px] text-white font-bold z-10">
              Noise (-60)
           </div>
           
           {/* Signal (Same strength, but useless) */}
           <div className="absolute bottom-0 w-full h-[70%] bg-green-500/20 border-t-2 border-green-500 flex items-start justify-center pt-2">
              <span className="text-xs font-bold text-green-700 bg-white/80 px-1 rounded">-45 dBm</span>
           </div>

           {/* Gap Arrow */}
           <div className="absolute bottom-[60%] top-[30%] right-2 left-2 flex flex-col items-center justify-center">
              <span className="bg-white text-xs font-bold px-1 text-red-600 shadow-sm border rounded">15dB SNR</span>
           </div>
        </div>
        <div className="mt-3 text-xs text-center text-red-500 font-bold bg-red-50 px-2 py-1 rounded">Slow (MCS 2)</div>
      </div>

    </div>
  );
};

export default SignalNoiseRatio;
