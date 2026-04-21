
import React from 'react';
import { Wifi } from 'lucide-react';

const ChannelInterference: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 my-6 font-sans text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
         {/* Good Design */}
         <div className="flex flex-col items-center">
            <div className="mb-2 text-sm font-bold text-green-400">Proper Planning</div>
            <div className="relative w-48 h-32">
               {/* Cell 1 */}
               <div className="absolute left-0 top-0 w-24 h-24 rounded-full border-2 border-blue-500 bg-blue-500/20 flex items-center justify-center">
                  <div className="text-xs font-bold">Ch 1</div>
               </div>
               {/* Cell 2 */}
               <div className="absolute right-0 top-0 w-24 h-24 rounded-full border-2 border-purple-500 bg-purple-500/20 flex items-center justify-center">
                  <div className="text-xs font-bold">Ch 6</div>
               </div>
               {/* Overlap */}
               <div className="absolute left-[35%] top-[10%] text-[10px] text-slate-400 w-16 text-center bg-slate-900/80 px-1 rounded">
                  Different Channels = OK
               </div>
            </div>
            <div className="text-xs text-slate-400 mt-2 text-center">Devices talk simultaneously. Throughput doubles.</div>
         </div>

         {/* Bad Design */}
         <div className="flex flex-col items-center">
            <div className="mb-2 text-sm font-bold text-red-400">Co-Channel Interference (CCI)</div>
            <div className="relative w-48 h-32">
               {/* Cell 1 */}
               <div className="absolute left-0 top-0 w-24 h-24 rounded-full border-2 border-orange-500 bg-orange-500/10 flex items-center justify-center">
                  <div className="text-xs font-bold text-orange-500">Ch 6</div>
               </div>
               {/* Cell 2 */}
               <div className="absolute right-0 top-0 w-24 h-24 rounded-full border-2 border-orange-500 bg-orange-500/10 flex items-center justify-center">
                  <div className="text-xs font-bold text-orange-500">Ch 6</div>
               </div>
               {/* Collision Zone */}
               <div className="absolute left-[25%] top-0 w-24 h-24 rounded-full flex items-center justify-center overflow-hidden opacity-50">
                  <div className="w-8 h-24 bg-red-600/50 animate-pulse"></div>
               </div>
               <div className="absolute left-[40%] top-[30%] bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg transform rotate-12">
                  WAIT
               </div>
            </div>
            <div className="text-xs text-slate-400 mt-2 text-center">Devices must take turns. Throughput halves.</div>
         </div>

      </div>
    </div>
  );
};

export default ChannelInterference;
