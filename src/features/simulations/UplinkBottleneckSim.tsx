
import React, { useState, useEffect } from 'react';
import { Network, ArrowDown, XCircle, CheckCircle, ToggleLeft, ToggleRight, Wifi } from 'lucide-react';

interface UplinkBottleneckSimProps {
  onComplete: () => void;
}

const MAX_PACKETS_IN_VISUAL = 20;

const UplinkBottleneckSim: React.FC<UplinkBottleneckSimProps> = ({ onComplete }) => {
  const [cableType, setCableType] = useState<'cat5e' | 'cat6a'>('cat5e');
  const [buffer, setBuffer] = useState(0);
  const [dropped, setDropped] = useState(0);
  const [processed, setProcessed] = useState(0);
  const [packets, setPackets] = useState<{ id: number; state: 'in' | 'out' | 'drop' }[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const AP_THROUGHPUT = 40; // Units per tick
  const UPLINK_CAPACITY = cableType === 'cat5e' ? 10 : 50; // Units per tick
  const BUFFER_MAX = 100;

  useEffect(() => {
    const simInterval = setInterval(() => {
      setBuffer(prev => {
        let newBuffer = prev + AP_THROUGHPUT;
        const canProcess = Math.min(newBuffer, UPLINK_CAPACITY);
        
        newBuffer -= canProcess;
        setProcessed(p => p + canProcess);

        if (newBuffer > BUFFER_MAX) {
          const toDrop = newBuffer - BUFFER_MAX;
          setDropped(d => d + toDrop);
          newBuffer = BUFFER_MAX;
        }

        return newBuffer;
      });
      
      // Visual packets
      const newPacketId = Date.now() + Math.random();
      setPackets(p => [...p, { id: newPacketId, state: 'in' }]);

    }, 200);

    return () => clearInterval(simInterval);
  }, [cableType]);

  useEffect(() => {
    if (cableType === 'cat6a' && !isComplete && dropped > 0) {
      setIsComplete(true);
      onComplete();
    }
  }, [cableType, dropped, isComplete, onComplete]);


  const funnelWidth = cableType === 'cat5e' ? '20%' : '80%';
  const funnelColor = cableType === 'cat5e' ? 'border-red-500' : 'border-green-500';

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700 text-white w-full h-full min-h-[500px] flex flex-col font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Network className="w-5 h-5 text-amber-400" />
            The Funnel
          </h3>
          <p className="text-slate-400 text-sm">Visualize the Wi-Fi 7 uplink bottleneck.</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
             <div className="text-xs text-slate-400">Throughput</div>
             <div className="text-lg font-mono font-bold text-green-400">{(processed / 10).toFixed(1)} Gbps</div>
          </div>
          <div className="text-right">
             <div className="text-xs text-slate-400">Packet Drop</div>
             <div className="text-lg font-mono font-bold text-red-400">{Math.floor(dropped)}</div>
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="relative h-80 bg-slate-800 rounded-xl border border-slate-700 flex flex-col items-center p-4">
        <div className="text-center mb-4">
            <Wifi className="w-8 h-8 text-blue-400 mx-auto" />
            <div className="text-xs font-bold text-slate-300">Wi-Fi 7 AP Throughput (4 Gbps)</div>
        </div>

        {/* Funnel Top */}
        <div className="w-full h-16 border-l-8 border-r-8 border-slate-600" style={{borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottom: '40px solid var(--tw-color-slate-700)'}}></div>
        
        {/* Funnel Bottom (Neck) */}
        <div className={`h-24 border-l-2 border-r-2 transition-all duration-500 ${funnelColor}`} style={{ width: funnelWidth }}></div>

        {/* Packets */}
        <div className="absolute top-20 bottom-0 w-full overflow-hidden">
            {packets.slice(-MAX_PACKETS_IN_VISUAL).map((p, i) => (
                <div key={p.id} className={`absolute w-1 h-1 bg-blue-300 rounded-full animate-packet-fall`} style={{left: `${Math.random()*80 + 10}%`, animationDelay: `${i*0.1}s`}}></div>
            ))}
        </div>
      </div>
      <style>{`
        @keyframes packet-fall {
            0% { top: 0; opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
        .animate-packet-fall { animation: packet-fall 2s linear forwards; }
      `}</style>

      <div className="mt-6 bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
         <div>
            <div className="font-bold text-sm">Uplink Cable Type</div>
            <p className="text-xs text-slate-400">Switch between legacy and modern cabling.</p>
         </div>
         <button onClick={() => setCableType(p => p === 'cat5e' ? 'cat6a' : 'cat5e')} className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm border-2 border-slate-600">
             {cableType === 'cat5e' ? <ToggleLeft className="w-6 h-6 text-red-400" /> : <ToggleRight className="w-6 h-6 text-green-400" />}
             <div>
                <div>{cableType === 'cat5e' ? 'Cat5e' : 'Cat6a'}</div>
                <div className="text-xs text-slate-500 font-normal">{cableType === 'cat5e' ? '1 Gbps' : '5 Gbps'}</div>
             </div>
         </button>
      </div>

      {isComplete && (
        <div className="mt-4 p-3 text-center bg-green-900/50 border border-green-500/50 rounded-lg text-sm text-green-300 font-medium flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Bottleneck cleared! Upgrading the wired uplink is critical for modern Wi-Fi.
        </div>
      )}
    </div>
  );
};

export default UplinkBottleneckSim;
