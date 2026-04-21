
import React, { useState, useEffect } from 'react';
import { Wifi, Layers, ArrowRight, Trash2, Zap } from 'lucide-react';

interface MaterialLabProps {
  onComplete: () => void;
}

interface Wall {
  id: number;
  type: 'drywall' | 'brick' | 'metal' | 'glass';
  loss: number;
  color: string;
  name: string;
}

const MaterialLab: React.FC<MaterialLabProps> = ({ onComplete }) => {
  const [walls, setWalls] = useState<Wall[]>([]);
  const [signalStrength, setSignalStrength] = useState(-50); // Starting dBm (close range)
  const [isAnimating, setIsAnimating] = useState(false);

  // Constants
  const TX_POWER = 20; // dBm
  const FREE_SPACE_LOSS = 50; // dB over the fixed distance

  const MATERIALS: Omit<Wall, 'id'>[] = [
    { type: 'glass', loss: 3, color: 'bg-blue-200 border-blue-400', name: 'Glass Window (-3dB)' },
    { type: 'drywall', loss: 4, color: 'bg-stone-200 border-stone-400', name: 'Drywall (-4dB)' },
    { type: 'brick', loss: 10, color: 'bg-red-900 border-red-950', name: 'Brick Wall (-10dB)' },
    { type: 'metal', loss: 25, color: 'bg-slate-400 border-slate-600', name: 'Elevator Shaft (-25dB)' },
  ];

  const addWall = (material: Omit<Wall, 'id'>) => {
    if (walls.length < 5) {
      setWalls([...walls, { ...material, id: Date.now() }]);
    }
  };

  const removeWall = (id: number) => {
    setWalls(walls.filter(w => w.id !== id));
  };

  // Recalculate signal whenever walls change
  useEffect(() => {
    const totalWallLoss = walls.reduce((acc, w) => acc + w.loss, 0);
    const finalRssi = TX_POWER - FREE_SPACE_LOSS - totalWallLoss;
    setSignalStrength(finalRssi);

    if (walls.length >= 3) {
       // Simple completion trigger for engagement
       // In a real app we might ask for a specific target RSSI
       setIsAnimating(true);
       setTimeout(() => {
          setIsAnimating(false);
          onComplete();
       }, 2000);
    }
  }, [walls, onComplete]);

  const getSignalStatus = (rssi: number) => {
    if (rssi > -65) return { text: 'Excellent', color: 'text-green-400' };
    if (rssi > -75) return { text: 'Good', color: 'text-yellow-400' };
    if (rssi > -85) return { text: 'Poor', color: 'text-orange-400' };
    return { text: 'Dead Zone', color: 'text-red-500' };
  };

  const status = getSignalStatus(signalStrength);

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700 text-white max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            Material Attenuation Lab
          </h3>
          <p className="text-slate-400 text-sm">Drag materials into the path to see how they kill Wi-Fi.</p>
        </div>
        <div className="text-right bg-slate-800 px-4 py-2 rounded-xl border border-slate-600">
           <div className={`text-2xl font-mono font-bold ${status.color}`}>
              {signalStrength} <span className="text-sm text-slate-500">dBm</span>
           </div>
           <div className={`text-xs font-bold uppercase ${status.color}`}>{status.text}</div>
        </div>
      </div>

      {/* Visual Simulation Area */}
      <div className="relative h-48 bg-slate-950 rounded-xl border border-slate-800 mb-8 flex items-center overflow-hidden">
         {/* Grid Background */}
         <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

         {/* Transmitter */}
         <div className="absolute left-8 z-20 flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.5)]">
               <Wifi className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-blue-400 font-mono mt-2">AP (20dBm)</span>
         </div>

         {/* Receiver */}
         <div className="absolute right-8 z-20 flex flex-col items-center">
            <div className={`w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center border-2 ${status.color.replace('text-', 'border-')}`}>
               <Zap className={`w-6 h-6 ${status.color}`} />
            </div>
            <span className="text-xs text-slate-400 font-mono mt-2">Client</span>
         </div>

         {/* Signal Beam Animation */}
         <div className="absolute left-20 right-20 h-1 bg-gradient-to-r from-blue-500/50 to-transparent top-1/2 -translate-y-1/2"></div>
         {isAnimating && (
             <div className="absolute left-20 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-sm animate-ping-slow"></div>
         )}
         
         {/* Walls in Path */}
         <div className="absolute inset-0 flex items-center justify-center gap-8 z-10 px-32 pointer-events-none">
            {walls.map((wall, idx) => (
               <div key={wall.id} className={`w-4 h-32 ${wall.color} shadow-xl relative group pointer-events-auto cursor-pointer border-2`} onClick={() => removeWall(wall.id)}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                     Remove
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Controls */}
      <div>
         <div className="text-xs text-slate-500 uppercase font-bold mb-3 tracking-wider">Add Obstacles</div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MATERIALS.map((mat) => (
               <button
                  key={mat.type}
                  onClick={() => addWall(mat)}
                  disabled={walls.length >= 5}
                  className={`p-3 rounded-xl border border-slate-600 bg-slate-800 hover:bg-slate-700 active:scale-95 transition-all text-left group disabled:opacity-50`}
               >
                  <div className={`w-full h-2 mb-3 rounded-full ${mat.color.split(' ')[0]}`}></div>
                  <div className="font-bold text-sm text-slate-200">{mat.name}</div>
               </button>
            ))}
         </div>
         <div className="mt-4 flex justify-between items-center text-xs text-slate-500">
            <span>Max 5 walls</span>
            <button onClick={() => setWalls([])} className="flex items-center gap-1 hover:text-white transition-colors">
               <Trash2 className="w-3 h-3" /> Clear All
            </button>
         </div>
      </div>
    </div>
  );
};

export default MaterialLab;
