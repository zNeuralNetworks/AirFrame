
import React from 'react';
import { Router, Radio, ShieldCheck } from 'lucide-react';

const MarkerPacketVisual: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 my-6 font-sans text-white">
      <div className="flex items-center justify-between mb-6">
         <h4 className="font-bold text-lg text-white">The Marker Packet (Patent)</h4>
         <div className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">Deterministic Detection</div>
      </div>

      <div className="relative p-4 border border-slate-700 rounded-xl bg-slate-800/50">
         <div className="flex justify-between items-center relative z-10">
            {/* Switch */}
            <div className="flex flex-col items-center">
               <div className="p-3 bg-blue-900 rounded-lg border border-blue-700">
                  <Router className="w-6 h-6 text-blue-400" />
               </div>
               <span className="text-[10px] mt-2 text-slate-400">Switch</span>
            </div>

            {/* Rogue AP */}
            <div className="flex flex-col items-center relative">
               <div className="absolute -top-8 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg animate-bounce">
                  I hear the marker!
               </div>
               <div className="p-3 bg-red-900/50 rounded-lg border border-red-500 border-dashed">
                  <Radio className="w-6 h-6 text-red-400" />
               </div>
               <span className="text-[10px] mt-2 text-red-400">Rogue AP</span>
            </div>

            {/* Authorized AP */}
            <div className="flex flex-col items-center">
               <div className="p-3 bg-green-900/50 rounded-lg border border-green-500">
                  <ShieldCheck className="w-6 h-6 text-green-400" />
               </div>
               <span className="text-[10px] mt-2 text-green-400">Arista Sensor</span>
            </div>
         </div>

         {/* Wire Path */}
         <div className="absolute top-[40%] left-[10%] right-[50%] h-1 bg-slate-600 -z-0"></div>
         
         {/* Air Path */}
         <div className="absolute top-[30%] left-[50%] right-[10%] h-16 border-t-2 border-dashed border-red-500/30 rounded-t-full -z-0"></div>

         {/* Marker Animation */}
         <div className="absolute top-[35%] left-[20%] w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_10px_yellow] animate-marker-travel"></div>
      </div>

      <style>{`
         @keyframes marker-travel {
            0% { left: 10%; top: 38%; opacity: 0; }
            10% { opacity: 1; }
            45% { left: 50%; top: 38%; } /* Reaches Rogue */
            50% { left: 50%; top: 20%; } /* Transmits to Air */
            90% { left: 85%; top: 38%; opacity: 1; } /* Reaches Sensor */
            100% { left: 85%; top: 38%; opacity: 0; }
         }
         .animate-marker-travel {
            animation: marker-travel 3s ease-in-out infinite;
         }
      `}</style>

      <p className="text-xs text-slate-400 mt-4 leading-relaxed bg-slate-800 p-3 rounded">
         <strong>Logic:</strong> We inject a hidden "Marker" packet into the wired network. 
         If our Sensor hears that marker broadcasting over the air, we 100% know the Rogue AP is plugged into our switch.
      </p>
    </div>
  );
};

export default MarkerPacketVisual;
