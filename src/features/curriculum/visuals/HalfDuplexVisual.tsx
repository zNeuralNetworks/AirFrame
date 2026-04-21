
import React from 'react';
import { Mic, MicOff, ArrowRight, ArrowLeft } from 'lucide-react';

const HalfDuplexVisual: React.FC = () => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-6 font-sans">
      <div className="grid grid-cols-2 gap-4">
         
         {/* Full Duplex (Phone) */}
         <div className="p-4 bg-white rounded-xl border border-slate-200 opacity-50 grayscale">
            <div className="text-xs font-bold text-slate-400 uppercase mb-4 text-center">Ethernet (Full Duplex)</div>
            <div className="flex justify-between items-center px-4">
               <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
               <div className="flex flex-col gap-1">
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                  <ArrowLeft className="w-4 h-4 text-slate-400" />
               </div>
               <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
            </div>
            <div className="text-[10px] text-slate-400 text-center mt-3">Talk & Listen simultaneously</div>
         </div>

         {/* Half Duplex (Walkie Talkie) */}
         <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
            <div className="text-xs font-bold text-blue-600 uppercase mb-4 text-center">Wi-Fi (Half Duplex)</div>
            <div className="flex justify-between items-center px-2">
               <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md">
                     <Mic className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-blue-800 mt-1">Talking</span>
               </div>
               
               <div className="flex-1 border-b-2 border-dashed border-blue-400 mx-2 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] bg-white px-1 text-blue-600 font-bold">RF Medium</div>
               </div>

               <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 border border-slate-300">
                     <MicOff className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 mt-1">Muted</span>
               </div>
            </div>
            <div className="text-xs text-blue-700 text-center mt-4 bg-blue-100 py-1 rounded">
               "Over." <span className="font-normal">(Switch Roles)</span>
            </div>
         </div>

      </div>
    </div>
  );
};

export default HalfDuplexVisual;
