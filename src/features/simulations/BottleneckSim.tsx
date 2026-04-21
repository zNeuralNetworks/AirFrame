
import React, { useState, useEffect } from 'react';
import { Smartphone, Gauge, AlertTriangle } from 'lucide-react';

interface BottleneckSimProps {
  onComplete: () => void;
}

const BottleneckSim: React.FC<BottleneckSimProps> = ({ onComplete }) => {
  const [clients, setClients] = useState([
    { type: '7', speed: 1000 },
    { type: '7', speed: 1000 },
    { type: '6', speed: 600 },
    { type: '5', speed: 300 },
  ]);

  const [legacyAdded, setLegacyAdded] = useState(false);
  const [networkSpeed, setNetworkSpeed] = useState(100);

  useEffect(() => {
    // Calculate aggregate network speed simulation
    // Legacy clients (802.11b/g) force protection mechanisms (RTS/CTS)
    // which slows down EVERYONE, even the Wi-Fi 7 clients.
    
    let baseSpeed = 0;
    if (legacyAdded) {
       baseSpeed = 54; // Dragged down significantly
    } else {
       baseSpeed = 800; // High speed
    }

    setNetworkSpeed(baseSpeed);
    
    if (!legacyAdded && baseSpeed > 500) {
       // Success state implies they realized removing legacy helps
       // We can trigger complete after they toggle it back off
    }
  }, [legacyAdded]);

  const handleToggleLegacy = () => {
    if (!legacyAdded) {
       setClients(prev => [...prev, { type: 'legacy', speed: 11 }]);
       setLegacyAdded(true);
    } else {
       setClients(prev => prev.filter(c => c.type !== 'legacy'));
       setLegacyAdded(false);
       setTimeout(onComplete, 1000);
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700 text-white max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Gauge className="w-5 h-5 text-red-400" />
            The Bottleneck
          </h3>
          <p className="text-slate-400 text-sm">Observe how one legacy device impacts the entire cell.</p>
        </div>
        <div className="text-right">
           <div className={`text-4xl font-mono font-bold transition-colors ${legacyAdded ? 'text-red-500' : 'text-green-500'}`}>
              {networkSpeed} <span className="text-sm text-slate-500">Mbps</span>
           </div>
           <div className="text-xs text-slate-400">Cell Capacity</div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
         {clients.map((c, i) => (
            <div key={i} className={`flex flex-col items-center animate-scale-in p-4 rounded-xl border-2 ${
               c.type === 'legacy' ? 'bg-orange-900/50 border-orange-500' : 'bg-slate-800 border-slate-600'
            }`}>
               <Smartphone className={`w-8 h-8 mb-2 ${c.type === 'legacy' ? 'text-orange-400' : 'text-blue-400'}`} />
               <div className="text-xs font-bold uppercase">{c.type === 'legacy' ? 'iPhone 3G' : `Wi-Fi ${c.type}`}</div>
               <div className="text-[10px] text-slate-400 font-mono">{c.speed} Mbps</div>
               {c.type === '7' && legacyAdded && (
                  <div className="mt-2 text-[10px] bg-red-500/20 text-red-300 px-1 rounded">Slowed by Prot.</div>
               )}
            </div>
         ))}
      </div>

      <div className="bg-slate-800 p-4 rounded-xl border border-slate-600 flex items-center justify-between">
         <div className="flex items-center gap-3">
             <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg">
                <AlertTriangle className="w-5 h-5" />
             </div>
             <div>
                <div className="font-bold text-sm">Legacy Compatibility Mode</div>
                <div className="text-xs text-slate-400">Allow 802.11b (1999) devices to connect?</div>
             </div>
         </div>
         
         <button 
            onClick={handleToggleLegacy}
            className={`w-14 h-8 rounded-full p-1 transition-colors ${legacyAdded ? 'bg-green-500' : 'bg-slate-600'}`}
         >
            <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${legacyAdded ? 'translate-x-6' : 'translate-x-0'}`}></div>
         </button>
      </div>
      
      {!legacyAdded && (
         <p className="text-center text-xs text-green-400 mt-4 animate-fade-in">
            Network Optimized! Legacy protection overhead removed.
         </p>
      )}
    </div>
  );
};

export default BottleneckSim;
