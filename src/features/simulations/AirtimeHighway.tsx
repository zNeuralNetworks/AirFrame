
import React, { useState, useEffect } from 'react';
import { Truck, Car, Gauge, Play } from 'lucide-react';

interface AirtimeHighwayProps {
  onComplete: () => void;
}

const AirtimeHighway: React.FC<AirtimeHighwayProps> = ({ onComplete }) => {
  const [hasLegacy, setHasLegacy] = useState(true);
  const [throughput, setThroughput] = useState(0);

  useEffect(() => {
    // Simulating throughput calculation
    const interval = setInterval(() => {
       const target = hasLegacy ? 12 : 150; // Mbps
       setThroughput(prev => {
          if (prev < target) return prev + 1;
          if (prev > target) return prev - 5;
          return target;
       });
       
       if (!hasLegacy && throughput > 100) {
          setTimeout(onComplete, 2000);
       }
    }, 50);
    return () => clearInterval(interval);
  }, [hasLegacy, throughput, onComplete]);

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700 text-white max-w-2xl mx-auto">
       <div className="flex justify-between items-center mb-6">
         <div>
            <h3 className="text-xl font-bold">The Airtime Highway</h3>
            <p className="text-slate-400 text-sm">Visualize how low data rates block the medium.</p>
         </div>
         <div className="text-right">
            <div className={`text-3xl font-bold font-mono ${hasLegacy ? 'text-red-400' : 'text-green-400'}`}>
               {throughput} <span className="text-sm text-slate-500">Mbps</span>
            </div>
            <div className="text-xs text-slate-400 flex items-center justify-end gap-1">
               <Gauge className="w-3 h-3" /> Aggregate Speed
            </div>
         </div>
      </div>

      {/* Animation Container */}
      <div className="relative h-40 bg-slate-800 rounded-xl border border-slate-600 overflow-hidden mb-6 flex items-center">
         {/* Road Markings */}
         <div className="absolute top-1/2 w-full h-0 border-t-2 border-dashed border-slate-600"></div>

         {/* Vehicles */}
         <div className="w-full relative h-full">
            {/* Fast Cars (Wi-Fi 6) */}
            <div className="absolute top-4 animate-drive-fast left-0">
               <div className="p-2 bg-blue-500 rounded-lg shadow-lg transform -scale-x-100">
                  <Car className="w-6 h-6 text-white" />
               </div>
            </div>
            <div className="absolute top-4 animate-drive-fast left-0 animation-delay-500" style={{ animationDelay: '0.5s' }}>
               <div className="p-2 bg-blue-500 rounded-lg shadow-lg transform -scale-x-100">
                  <Car className="w-6 h-6 text-white" />
               </div>
            </div>

            {/* Legacy Trucks (1 Mbps) */}
            {hasLegacy && (
               <div className="absolute bottom-4 animate-drive-slow left-0">
                  <div className="p-3 bg-orange-600 rounded-lg shadow-lg w-32 flex items-center justify-center gap-2 border-2 border-orange-400">
                     <Truck className="w-6 h-6 text-white" />
                     <span className="text-xs font-bold text-white">1 Mbps Beacon</span>
                  </div>
               </div>
            )}
            
            {/* More Fast Cars stuck behind truck if legacy is on */}
            {!hasLegacy && (
               <>
               <div className="absolute bottom-4 animate-drive-fast left-0" style={{ animationDelay: '0.2s' }}>
                  <div className="p-2 bg-purple-500 rounded-lg shadow-lg transform -scale-x-100">
                     <Car className="w-6 h-6 text-white" />
                  </div>
               </div>
               <div className="absolute bottom-4 animate-drive-fast left-0" style={{ animationDelay: '0.8s' }}>
                  <div className="p-2 bg-purple-500 rounded-lg shadow-lg transform -scale-x-100">
                     <Car className="w-6 h-6 text-white" />
                  </div>
               </div>
               </>
            )}
         </div>

         <style>{`
            @keyframes drive-fast {
               0% { left: -50px; }
               100% { left: 100%; }
            }
            @keyframes drive-slow {
               0% { left: -150px; }
               100% { left: 100%; }
            }
            .animate-drive-fast { animation: drive-fast 2s linear infinite; }
            .animate-drive-slow { animation: drive-slow 8s linear infinite; }
         `}</style>
      </div>

      <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
         <div>
            <div className="font-bold text-sm text-slate-300">Management Traffic</div>
            <div className="text-xs text-slate-500">Are we supporting 802.11b devices?</div>
         </div>
         <button 
            onClick={() => setHasLegacy(!hasLegacy)}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
               hasLegacy 
               ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30' 
               : 'bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30'
            }`}
         >
            {hasLegacy ? 'Legacy Enabled' : 'Legacy Disabled'}
         </button>
      </div>
    </div>
  );
};

export default AirtimeHighway;
