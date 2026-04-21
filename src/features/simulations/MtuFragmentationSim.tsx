import React, { useState, useEffect } from 'react';
import { Box, Server, Cpu, Play, Check, ToggleLeft, ToggleRight, ArrowRight, Layers } from 'lucide-react';

interface MtuFragmentationSimProps {
  onComplete: () => void;
}

const MtuFragmentationSim: React.FC<MtuFragmentationSimProps> = ({ onComplete }) => {
  const [mode, setMode] = useState<'vxlan' | 'jumbo'>('vxlan');
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'fragmented' | 'success'>('idle');
  const [cpu, setCpu] = useState(5);
  const [hasFragmented, setHasFragmented] = useState(false);

  const tunnelMtu = mode === 'vxlan' ? 1450 : 1500;
  const packetSize = 1500;

  useEffect(() => {
    // FIX: Refactored to correctly scope the timer and let TypeScript infer its type.
    // This resolves the error "Namespace 'global.NodeJS' has no exported member 'Timeout'"
    // by avoiding an explicit, environment-specific type.
    if (status !== 'idle') {
      const timer = setTimeout(() => {
        if (status === 'fragmented' && mode === 'jumbo') {
          setStatus('success');
          onComplete();
        } else {
          setStatus('idle');
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, mode, onComplete]);

  const handleTransmit = () => {
    if (packetSize > tunnelMtu) {
      setStatus('fragmented');
      setCpu(95);
      setHasFragmented(true);
    } else {
      setStatus('transmitting');
      setCpu(10);
      if (hasFragmented) {
        setStatus('success');
        onComplete();
      }
    }
  };

  const getTunnelColor = () => {
    if (status === 'fragmented') return 'border-red-500';
    if (status === 'success') return 'border-green-500';
    return 'border-slate-600';
  };

  const Packet = ({ size, fragments }: { size: number, fragments?: number }) => (
    <div className={`relative flex items-center justify-center bg-blue-600 border-2 border-blue-400 rounded-lg shadow-lg text-white font-mono text-xs p-2 ${
      status === 'transmitting' && 'animate-transmit'
    } ${
      (status === 'fragmented' || status === 'success') && 'opacity-0'
    }`} style={{ width: `${(size/1500)*100}%`, height: '40px'}}>
      {size}B
    </div>
  );

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700 text-white w-full h-full min-h-[500px] flex flex-col font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            Packet Tetris
          </h3>
          <p className="text-slate-400 text-sm">Visualize MTU fragmentation in network tunnels.</p>
        </div>
        <button
          onClick={handleTransmit}
          disabled={status !== 'idle'}
          className="flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition-all shadow-md disabled:opacity-50"
        >
          <Play className="w-5 h-5" /> Transmit
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1">
            <div className="text-xs font-bold text-slate-400 mb-1 flex items-center gap-1"><Cpu size={14}/> CPU Load</div>
            <div className="w-full bg-slate-700 h-4 rounded-full overflow-hidden border border-slate-600">
                <div className={`h-full rounded-full transition-all duration-300 ${cpu > 80 ? 'bg-red-500' : 'bg-green-500'}`} style={{width: `${cpu}%`}}></div>
            </div>
        </div>
        {status === 'success' && <div className="text-green-400 font-bold text-sm animate-fade-in flex items-center gap-1"><Check size={16} /> Optimized!</div>}
      </div>


      {/* Visualization Area */}
      <div className="relative h-40 bg-slate-800 rounded-xl p-4 flex items-center justify-between border border-slate-700">
          <div className="w-1/4 flex flex-col items-center">
             <Server size={24} className="text-slate-400 mb-2"/>
             <span className="text-xs font-bold">Source</span>
          </div>

          <div className="w-1/2 h-full flex items-center">
            <Packet size={packetSize} />
            {status === 'fragmented' && (
                <div className="absolute left-1/4 w-1/2 h-full flex items-center justify-center gap-1">
                    {[1,2].map(i => 
                        <div key={i} className="flex items-center justify-center bg-red-600 border-2 border-red-400 rounded-md h-8 text-white font-mono text-[10px] p-1 animate-fragment">
                           {i === 1 ? 'Frag 1' : 'Frag 2'}
                        </div>
                    )}
                </div>
            )}
          </div>
          
          <div className="w-1/4 flex flex-col items-center">
             <Server size={24} className="text-slate-400 mb-2"/>
             <span className="text-xs font-bold">Destination</span>
          </div>

          {/* Tunnel */}
          <div className={`absolute left-1/4 right-1/4 h-16 top-1/2 -translate-y-1/2 border-x-4 ${getTunnelColor()} transition-colors`}>
              <div className="h-full border-y border-dashed border-slate-600/50 flex items-center justify-center">
                <div className="bg-slate-900 px-2 py-0.5 rounded text-xs font-mono border border-slate-700">
                    MTU: <span className={packetSize > tunnelMtu ? "text-red-400" : "text-green-400"}>{tunnelMtu}B</span>
                </div>
              </div>
          </div>
      </div>

      <style>{`
        @keyframes transmit {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(150%); opacity: 0; }
        }
        .animate-transmit { animation: transmit 2s ease-in-out forwards; }
        
        @keyframes fragment {
          0% { opacity: 0; transform: scale(0.5) translateX(0); }
          20% { opacity: 1; transform: scale(1) translateX(0); }
          80% { opacity: 1; transform: scale(1) translateX(200%); }
          100% { opacity: 0; transform: scale(1) translateX(200%); }
        }
        .animate-fragment:nth-child(1) { animation: fragment 2s ease-in-out forwards; animation-delay: 0.5s; }
        .animate-fragment:nth-child(2) { animation: fragment 2s ease-in-out forwards; animation-delay: 0.8s; }
      `}</style>
      
      <div className="mt-6 bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
         <div>
            <div className="font-bold text-sm">Network Configuration</div>
            <p className="text-xs text-slate-400">{mode === 'vxlan' ? 'A 50-byte VXLAN header reduces the effective MTU.' : 'Jumbo frames enabled, increasing MTU to accommodate overhead.'}</p>
         </div>
         <button onClick={() => setMode(p => p === 'vxlan' ? 'jumbo' : 'vxlan')} className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm border-2 border-slate-600">
             {mode === 'vxlan' ? <ToggleLeft className="w-6 h-6 text-red-400" /> : <ToggleRight className="w-6 h-6 text-green-400" />}
             <div>
                <div>{mode === 'vxlan' ? 'VXLAN Tunnel' : 'Jumbo Frames'}</div>
                <div className="text-xs text-slate-500 font-normal">{mode === 'vxlan' ? 'Standard MTU' : 'Increased MTU'}</div>
             </div>
         </button>
      </div>
    </div>
  );
};

export default MtuFragmentationSim;
