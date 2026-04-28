
import React, { useState, useEffect } from 'react';
import { Smartphone, Wifi, Settings, ArrowLeftRight } from 'lucide-react';
import ObservationBlock from '../../shared/ui/ObservationBlock';
import { calcRssiA, calcRssiB, shouldRoam } from './roamLabLogic';

interface RoamLabProps {
  onComplete: () => void;
}

const RoamLab: React.FC<RoamLabProps> = ({ onComplete }) => {
  const [clientPos, setClientPos] = useState(10); // 0 to 100
  const [connectedAp, setConnectedAp] = useState<'A' | 'B'>('A');
  const [roamThreshold, setRoamThreshold] = useState(-80); // Default sticky

  // Calculate RSSI based on position
  const rssiA = calcRssiA(clientPos);
  const rssiB = calcRssiB(clientPos);

  useEffect(() => {
    const next = shouldRoam(connectedAp, rssiA, rssiB, roamThreshold);
    if (next !== connectedAp) setConnectedAp(next);
  }, [clientPos, roamThreshold, rssiA, rssiB, connectedAp]);

  useEffect(() => {
     if (connectedAp === 'B' && roamThreshold >= -75 && roamThreshold <= -65) {
        setTimeout(onComplete, 1000);
     }
  }, [connectedAp, roamThreshold, onComplete]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 text-slate-900 max-w-2xl mx-auto">
       <div className="flex justify-between items-center mb-8">
         <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
               <ArrowLeftRight className="w-5 h-5 text-brand-600" /> Roam Logic Lab
            </h3>
            <p className="text-slate-500 text-sm">Fix the sticky client by adjusting the roam threshold.</p>
         </div>
         <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
            <Wifi className={`w-4 h-4 ${connectedAp === 'A' ? 'text-blue-600' : 'text-purple-600'}`} />
            <span className="text-sm font-bold text-slate-700">Connected: AP-{connectedAp}</span>
         </div>
      </div>

      <ObservationBlock title="The Golden Rule">
        The <strong>Client</strong> decides when to roam, not the Network. 
        If the driver is "sticky" (-90 dBm), the client will cling to a dead signal even if a better AP is right next to it.
      </ObservationBlock>

      {/* Visualization */}
      <div className="relative h-32 bg-slate-50 rounded-xl mb-8 flex items-center px-8 overflow-hidden border border-slate-200">
         {/* AP A */}
         <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
            <Wifi className="w-12 h-12 text-blue-500" />
            <span className="text-xs font-mono text-blue-600 mt-1">{rssiA} dBm</span>
         </div>

         {/* AP B */}
         <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
            <Wifi className="w-12 h-12 text-purple-500" />
            <span className="text-xs font-mono text-purple-600 mt-1">{rssiB} dBm</span>
         </div>

         {/* Client */}
         <div 
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-300 z-10"
            style={{ left: `${clientPos}%` }}
         >
            <div className={`p-2 rounded-full shadow-lg border-2 ${connectedAp === 'A' ? 'bg-blue-600 border-blue-300' : 'bg-purple-600 border-purple-300'}`}>
               <Smartphone className="w-6 h-6 text-white" />
            </div>
            {/* Connection Line */}
            <div className={`absolute top-1/2 h-0.5 w-[500px] -z-10 ${connectedAp === 'A' ? 'bg-blue-500/30 right-full mr-2' : 'bg-purple-500/30 left-full ml-2'}`}></div>
         </div>
         
         {/* Floor */}
         <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-200"></div>
      </div>

      <div className="space-y-6">
         <div>
            <label className="text-sm font-bold text-slate-500 mb-2 block">Client Position (Walk the Hallway)</label>
            <input 
               type="range" min="10" max="90" value={clientPos} onChange={(e) => setClientPos(Number(e.target.value))}
               className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
            />
         </div>

         <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-4">
               <Settings className="w-4 h-4 text-brand-600" />
               <span className="font-bold text-sm text-slate-800">Client Driver Settings</span>
            </div>
            
            <div className="flex items-center justify-between mb-2">
               <span className="text-xs text-slate-500">Roam Trigger Threshold</span>
               <span className="text-xs font-mono font-bold text-brand-600">{roamThreshold} dBm</span>
            </div>
            <input 
               type="range" min="-90" max="-60" step="5" value={roamThreshold} onChange={(e) => setRoamThreshold(Number(e.target.value))}
               className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
               <span>-90 (Sticky)</span>
               <span>-70 (Balanced)</span>
               <span>-60 (Aggressive)</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default RoamLab;
