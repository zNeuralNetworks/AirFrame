
import React, { useState, useEffect } from 'react';
import { Truck, Box, Check, RefreshCw } from 'lucide-react';

interface OFDMATetrisProps {
  onComplete: () => void;
}

const OFDMATetris: React.FC<OFDMATetrisProps> = ({ onComplete }) => {
  const [mode, setMode] = useState<'ofdm' | 'ofdma'>('ofdm');
  const [packetsDelivered, setPacketsDelivered] = useState(0);
  const [trucksSent, setTrucksSent] = useState(0);

  // Simulation loop
  useEffect(() => {
    let interval: any;
    
    if (packetsDelivered < 20) {
       interval = setInterval(() => {
          setTrucksSent(t => t + 1);
          
          if (mode === 'ofdm') {
             // OFDM: 1 Truck = 1 Packet (Inefficient for small data)
             setPacketsDelivered(p => p + 1);
          } else {
             // OFDMA: 1 Truck = 4 Packets (Efficient)
             setPacketsDelivered(p => p + 4);
          }
       }, 1000);
    } else {
       if (mode === 'ofdma') {
          onComplete();
       }
    }

    return () => clearInterval(interval);
  }, [mode, packetsDelivered, onComplete]);

  const reset = () => {
    setPacketsDelivered(0);
    setTrucksSent(0);
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700 text-white max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Box className="w-5 h-5 text-purple-400" />
            OFDMA Packer
          </h3>
          <p className="text-slate-400 text-sm">Visualize the efficiency of Wi-Fi 6 (OFDMA) vs Wi-Fi 5 (OFDM).</p>
        </div>
        <div className="text-right">
           <div className="text-xs text-slate-500 uppercase">Efficiency Score</div>
           <div className={`text-2xl font-mono font-bold ${mode === 'ofdma' ? 'text-green-400' : 'text-orange-400'}`}>
              {(packetsDelivered / (trucksSent || 1)).toFixed(1)} <span className="text-sm">pkts/frame</span>
           </div>
        </div>
      </div>

      <div className="relative h-48 bg-slate-800 rounded-xl border border-slate-600 mb-6 overflow-hidden flex items-center justify-center">
         {/* Road */}
         <div className="absolute bottom-0 w-full h-1 bg-slate-500"></div>

         {/* Moving Truck Animation */}
         <div key={trucksSent} className="absolute animate-drive-right flex items-end bottom-1">
             <div className="w-32 h-16 bg-slate-700 border-2 border-slate-500 rounded-lg relative flex items-center justify-center gap-1 p-1">
                {mode === 'ofdm' ? (
                   // Single Big Packet
                   <div className="w-24 h-12 bg-orange-500 rounded flex items-center justify-center text-xs font-bold shadow-lg">
                      User A
                   </div>
                ) : (
                   // Multi User Packets
                   <>
                      <div className="w-6 h-12 bg-purple-500 rounded flex items-center justify-center text-[10px] font-bold shadow-lg">A</div>
                      <div className="w-6 h-12 bg-blue-500 rounded flex items-center justify-center text-[10px] font-bold shadow-lg">B</div>
                      <div className="w-6 h-12 bg-green-500 rounded flex items-center justify-center text-[10px] font-bold shadow-lg">C</div>
                      <div className="w-6 h-12 bg-pink-500 rounded flex items-center justify-center text-[10px] font-bold shadow-lg">D</div>
                   </>
                )}
                {/* Wheels */}
                <div className="absolute -bottom-2 left-2 w-4 h-4 bg-black rounded-full"></div>
                <div className="absolute -bottom-2 right-2 w-4 h-4 bg-black rounded-full"></div>
             </div>
         </div>
      </div>

      <style>{`
         @keyframes drive-right {
            0% { transform: translateX(-200%); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateX(200%); opacity: 0; }
         }
         .animate-drive-right {
            animation: drive-right 0.9s linear forwards;
         }
      `}</style>

      <div className="grid grid-cols-2 gap-4">
         <button 
            onClick={() => { setMode('ofdm'); reset(); }}
            className={`p-4 rounded-xl border-2 transition-all ${
               mode === 'ofdm' ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'bg-slate-800 border-slate-600 text-slate-400'
            }`}
         >
            <div className="font-bold mb-1">Legacy (OFDM)</div>
            <div className="text-xs opacity-80">1 User per Frame. Wasted airtime if data is small.</div>
         </button>

         <button 
            onClick={() => { setMode('ofdma'); reset(); }}
            className={`p-4 rounded-xl border-2 transition-all ${
               mode === 'ofdma' ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'bg-slate-800 border-slate-600 text-slate-400'
            }`}
         >
            <div className="font-bold mb-1">Wi-Fi 6 (OFDMA)</div>
            <div className="text-xs opacity-80">Multiple Users (RUs) per Frame. High efficiency.</div>
         </button>
      </div>
    </div>
  );
};

export default OFDMATetris;
