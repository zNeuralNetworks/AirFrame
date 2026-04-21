
import React from 'react';
import { ArrowRight } from 'lucide-react';

const DecibelVisualizer: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 animate-fade-in">
      <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow">
         <div className="text-emerald-700 font-extrabold text-2xl tracking-tight">+3 dB</div>
         <div className="flex items-end gap-4 h-24 pb-2 border-b border-emerald-200/50 w-full justify-center">
            <div className="w-10 h-10 bg-emerald-200 rounded-lg flex items-center justify-center text-xs text-emerald-700 font-bold relative group">
                1x
                <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-emerald-600 bg-white px-2 py-1 rounded shadow-sm">Base</div>
            </div>
            <ArrowRight className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="w-10 h-20 bg-emerald-500 rounded-lg flex items-center justify-center text-sm text-white font-bold shadow-lg shadow-emerald-200 relative group">
                2x
                <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-emerald-600 bg-white px-2 py-1 rounded shadow-sm">Double</div>
            </div>
         </div>
         <div className="text-sm text-emerald-800 font-bold uppercase tracking-wider">Double Power</div>
         <div className="text-xs text-emerald-600 text-center px-4">Increases range by ~40%</div>
      </div>

      <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow">
         <div className="text-rose-700 font-extrabold text-2xl tracking-tight">-3 dB</div>
         <div className="flex items-end gap-4 h-24 pb-2 border-b border-rose-200/50 w-full justify-center">
            <div className="w-10 h-20 bg-rose-200 rounded-lg flex items-center justify-center text-sm text-rose-700 font-bold">1x</div>
            <ArrowRight className="w-5 h-5 text-rose-400 mb-2" />
            <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center text-xs text-white font-bold shadow-lg shadow-rose-200">½x</div>
         </div>
         <div className="text-sm text-rose-800 font-bold uppercase tracking-wider">Half Power</div>
         <div className="text-xs text-rose-600 text-center px-4">Common cause of coverage gaps</div>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow">
         <div className="text-blue-700 font-extrabold text-2xl tracking-tight">+10 dB</div>
         <div className="flex items-end gap-4 h-24 pb-2 border-b border-blue-200/50 w-full justify-center">
            <div className="w-4 h-4 bg-blue-200 rounded flex items-center justify-center text-[8px] text-blue-700 font-bold">1</div>
            <ArrowRight className="w-5 h-5 text-blue-400 mb-1" />
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-lg text-white font-bold shadow-lg shadow-blue-200">10x</div>
         </div>
         <div className="text-sm text-blue-800 font-bold uppercase tracking-wider">Tenfold Power</div>
         <div className="text-xs text-blue-600 text-center px-4">Massive boost (e.g. Antenna Gain)</div>
      </div>

      <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow">
         <div className="text-amber-700 font-extrabold text-2xl tracking-tight">-10 dB</div>
         <div className="flex items-end gap-4 h-24 pb-2 border-b border-amber-200/50 w-full justify-center">
            <div className="w-16 h-16 bg-amber-200 rounded-xl flex items-center justify-center text-sm text-amber-700 font-bold">1x</div>
            <ArrowRight className="w-5 h-5 text-amber-400 mb-6" />
            <div className="w-4 h-4 bg-amber-500 rounded flex items-center justify-center text-[8px] text-white font-bold shadow-lg shadow-amber-200">⅒</div>
         </div>
         <div className="text-sm text-amber-800 font-bold uppercase tracking-wider">One Tenth Power</div>
         <div className="text-xs text-amber-600 text-center px-4">Signal blocked by a brick wall</div>
      </div>
    </div>
  );
};

export default DecibelVisualizer;
