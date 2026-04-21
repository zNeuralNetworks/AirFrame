
import React from 'react';
import { Wifi, Users } from 'lucide-react';

const CapacityParadoxVisual: React.FC = () => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-6 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
         {/* The Auditorium Approach (Bad) */}
         <div className="flex flex-col items-center">
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 text-center">
                Large Cell (High Power)
            </div>
            <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Large Coverage Area */}
                <div className="absolute inset-0 bg-orange-100 rounded-full border-2 border-orange-300 opacity-50"></div>
                
                {/* Single AP */}
                <div className="relative z-10 w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center shadow-lg">
                    <Wifi className="w-5 h-5 text-white" />
                </div>

                {/* Crowded Clients */}
                {[...Array(12)].map((_, i) => (
                    <div 
                        key={i} 
                        className="absolute w-2 h-2 bg-orange-500 rounded-full"
                        style={{
                            top: `${50 + 35 * Math.sin(i * 0.5)}%`,
                            left: `${50 + 35 * Math.cos(i * 0.5)}%`
                        }}
                    ></div>
                ))}
            </div>
            <div className="mt-4 text-center">
                <div className="text-2xl font-bold text-orange-600">50 Mbps</div>
                <div className="text-xs text-slate-500">Aggregate Speed (Shared Medium)</div>
            </div>
         </div>

         {/* The Small Cell Approach (Good) */}
         <div className="flex flex-col items-center">
            <div className="text-sm font-bold text-brand-600 uppercase tracking-wider mb-4 text-center">
                Small Cells (Low Power)
            </div>
            <div className="relative w-48 h-48 grid grid-cols-2 grid-rows-2 gap-2">
                {[1, 2, 3, 4].map((cell, idx) => (
                    <div key={cell} className="relative flex items-center justify-center">
                        {/* Small Coverage Area */}
                        <div className="absolute inset-2 bg-green-100 rounded-full border border-green-300 opacity-50"></div>
                        
                        {/* AP */}
                        <div className="relative z-10 w-6 h-6 bg-brand-600 rounded flex items-center justify-center shadow-sm">
                            <Wifi className="w-3 h-3 text-white" />
                        </div>

                        {/* Distributed Clients */}
                        {[...Array(3)].map((_, i) => (
                            <div 
                                key={i} 
                                className="absolute w-2 h-2 bg-green-600 rounded-full"
                                style={{
                                    top: `${50 + 25 * Math.sin(i * 2)}%`,
                                    left: `${50 + 25 * Math.cos(i * 2)}%`
                                }}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="mt-4 text-center">
                <div className="text-2xl font-bold text-green-600">200 Mbps</div>
                <div className="text-xs text-slate-500">Aggregate Speed (Frequency Reuse)</div>
            </div>
         </div>

      </div>
    </div>
  );
};

export default CapacityParadoxVisual;
