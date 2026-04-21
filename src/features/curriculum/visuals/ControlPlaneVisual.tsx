
import React from 'react';
import { CloudOff, Server, Laptop, Wifi, Check, X } from 'lucide-react';

const ControlPlaneVisual: React.FC = () => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-6 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
         {/* Legacy Controller */}
         <div className="flex flex-col items-center">
            <div className="text-sm font-bold text-red-600 uppercase tracking-wider mb-4">Legacy Controller</div>
            <div className="relative flex flex-col items-center gap-4">
               <div className="p-3 bg-red-100 rounded-xl border border-red-200">
                  <Server className="w-8 h-8 text-red-600" />
               </div>
               
               {/* Broken Link */}
               <div className="h-12 w-0.5 bg-slate-300 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-red-500 rounded-full p-1">
                     <X className="w-3 h-3 text-red-500" />
                  </div>
               </div>

               <div className="p-3 bg-slate-200 rounded-xl border border-slate-300 opacity-50">
                  <Wifi className="w-8 h-8 text-slate-500" />
               </div>
               
               <div className="text-xs text-center text-red-600 font-bold bg-red-50 px-2 py-1 rounded">Network Down</div>
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center px-4">
               Data tunnels to the controller. If the link dies, the SSID disappears.
            </p>
         </div>

         {/* Arista Distributed */}
         <div className="flex flex-col items-center border-l border-slate-100 pl-8 md:pl-0 md:border-l-0">
            <div className="text-sm font-bold text-green-600 uppercase tracking-wider mb-4">Arista Distributed</div>
            <div className="relative flex flex-col items-center gap-4">
               <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 opacity-50">
                  <CloudOff className="w-8 h-8 text-slate-400" />
               </div>
               
               {/* Broken Link (Mgmt Only) */}
               <div className="h-12 w-0.5 bg-slate-300 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-slate-400 rounded-full p-1">
                     <X className="w-3 h-3 text-slate-400" />
                  </div>
               </div>

               <div className="p-3 bg-green-100 rounded-xl border border-green-200 shadow-md">
                  <Wifi className="w-8 h-8 text-green-600" />
               </div>

               <div className="flex items-center gap-1 text-xs text-center text-green-700 font-bold bg-green-50 px-2 py-1 rounded">
                  <Check className="w-3 h-3" /> Data Plane Active
               </div>
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center px-4">
               Management is down (Cloud), but AP keeps switching packets locally.
            </p>
         </div>

      </div>
    </div>
  );
};

export default ControlPlaneVisual;
