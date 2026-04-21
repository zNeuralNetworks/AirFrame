
import React, { useState, useEffect } from 'react';
import { Cloud, Server, Wifi, Laptop, Scissors, CheckCircle2, XCircle, Activity } from 'lucide-react';

interface DistributedSimProps {
  onComplete: () => void;
}

const DistributedSim: React.FC<DistributedSimProps> = ({ onComplete }) => {
  const [cloudConnected, setCloudConnected] = useState(true);
  const [trafficFlowing, setTrafficFlowing] = useState(true);
  const [apStatus, setApStatus] = useState<'green' | 'amber'>('green');
  const [mode, setMode] = useState<'legacy' | 'arista'>('arista');
  const [simTime, setSimTime] = useState(0);

  useEffect(() => {
    let interval: any;
    if (!cloudConnected) {
       interval = setInterval(() => {
          setSimTime(t => t + 1);
       }, 1000);
    } else {
       setSimTime(0);
    }
    return () => clearInterval(interval);
  }, [cloudConnected]);

  useEffect(() => {
    if (!cloudConnected) {
        if (mode === 'legacy') {
            setTrafficFlowing(false); // Controller down = Network down
            setApStatus('amber');
        } else {
            setTrafficFlowing(true); // Distributed = Network up
            setApStatus('amber'); // Management down, but Data up
        }
    } else {
        setTrafficFlowing(true);
        setApStatus('green');
    }

    if (simTime > 5 && mode === 'arista' && !cloudConnected) {
        onComplete();
    }
  }, [cloudConnected, mode, simTime, onComplete]);

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700 text-white max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-400" />
            Control Plane Architectures
          </h3>
          <p className="text-slate-400 text-sm">Test network resilience by severing the WAN link.</p>
        </div>
        <div className="flex gap-2 bg-slate-800 p-1 rounded-lg">
            <button 
                onClick={() => { setMode('legacy'); setCloudConnected(true); }}
                className={`px-3 py-1 text-xs font-bold rounded ${mode === 'legacy' ? 'bg-red-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
                Legacy Controller
            </button>
            <button 
                onClick={() => { setMode('arista'); setCloudConnected(true); }}
                className={`px-3 py-1 text-xs font-bold rounded ${mode === 'arista' ? 'bg-green-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
                Arista Distributed
            </button>
        </div>
      </div>

      <div className="relative h-64 bg-slate-800 rounded-xl border border-slate-600 mb-6 flex flex-col items-center justify-between p-6">
         {/* Cloud Layer */}
         <div className={`transition-all duration-500 ${cloudConnected ? 'opacity-100' : 'opacity-50 grayscale'}`}>
            <Cloud className={`w-16 h-16 ${cloudConnected ? 'text-blue-400' : 'text-slate-500'}`} />
            <div className="text-xs text-center font-mono mt-1">Management / Controller</div>
         </div>

         {/* WAN Link */}
         <div className="relative h-16 w-0.5 bg-slate-500 group">
            {!cloudConnected && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-bold whitespace-nowrap animate-pulse">
                    LINK DOWN
                </div>
            )}
            <div className={`absolute inset-0 bg-blue-400 w-full transition-all ${cloudConnected ? 'h-full' : 'h-0'}`}></div>
         </div>

         {/* AP Layer */}
         <div className="flex gap-8">
            {[1, 2].map(i => (
                <div key={i} className="flex flex-col items-center">
                    <div className={`p-3 rounded-lg border-2 transition-colors duration-300 ${
                        apStatus === 'green' ? 'bg-slate-700 border-green-500' : 'bg-slate-700 border-amber-500'
                    }`}>
                        <Wifi className={`w-6 h-6 ${apStatus === 'green' ? 'text-green-400' : 'text-amber-400'}`} />
                    </div>
                    {/* Local Traffic */}
                    <div className="h-8 w-0.5 bg-slate-600 relative">
                        {trafficFlowing && (
                            <div className="absolute top-0 left-0 w-full h-2 bg-green-400 animate-packet-down"></div>
                        )}
                    </div>
                    <Laptop className={`w-6 h-6 ${trafficFlowing ? 'text-white' : 'text-red-500'}`} />
                </div>
            ))}
         </div>
      </div>

      <style>{`
        @keyframes packet-down {
            0% { top: 0; opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
        .animate-packet-down {
            animation: packet-down 1s infinite linear;
        }
      `}</style>

      <div className="flex items-center justify-between">
         <button 
            onClick={() => setCloudConnected(!cloudConnected)}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-bold transition-colors shadow-lg shadow-red-900/20"
         >
            <Scissors className="w-5 h-5" />
            {cloudConnected ? 'Cut WAN Link' : 'Restore Link'}
         </button>

         <div className="text-right">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Status</div>
            {trafficFlowing ? (
                <div className="flex items-center gap-2 text-green-400 font-bold">
                    <Activity className="w-5 h-5" /> Data Plane Active
                </div>
            ) : (
                <div className="flex items-center gap-2 text-red-400 font-bold animate-pulse">
                    <XCircle className="w-5 h-5" /> Network Outage
                </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default DistributedSim;
