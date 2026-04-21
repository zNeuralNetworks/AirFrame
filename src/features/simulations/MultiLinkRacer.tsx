
import React, { useState, useEffect } from 'react';
import { Network, Zap, Play } from 'lucide-react';

interface MultiLinkRacerProps {
  onComplete: () => void;
}

const MultiLinkRacer: React.FC<MultiLinkRacerProps> = ({ onComplete }) => {
  const [mloEnabled, setMloEnabled] = useState(false);
  const [progress5, setProgress5] = useState(0);
  const [progress6, setProgress6] = useState(0);
  const [downloaded, setDownloaded] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
       // 5GHz Band: Subject to interference
       const speed5 = Math.random() > 0.7 ? 0 : 2; 
       
       // 6GHz Band: Clean
       const speed6 = 4;

       if (mloEnabled) {
          // MLO aggregates both
          setDownloaded(prev => prev + speed5 + speed6);
          setProgress5(p => (p + speed5) % 100);
          setProgress6(p => (p + speed6) % 100);
       } else {
          // Single Link (5GHz only)
          setDownloaded(prev => prev + speed5);
          setProgress5(p => (p + speed5) % 100);
          setProgress6(0); // Unused
       }
    }, 50);

    if (downloaded > 500 && mloEnabled) {
       onComplete();
    }

    return () => clearInterval(interval);
  }, [mloEnabled, downloaded, onComplete]);

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700 text-white max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Network className="w-5 h-5 text-cyan-400" />
            Multi-Link Operation (MLO)
          </h3>
          <p className="text-slate-400 text-sm">Combine 5GHz and 6GHz bands for speed and redundancy.</p>
        </div>
        <div className="text-right">
           <div className="text-3xl font-mono font-bold text-white">{downloaded} <span className="text-sm text-slate-500">MB</span></div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
         {/* 5GHz Lane */}
         <div className="relative h-12 bg-slate-800 rounded-lg overflow-hidden border border-slate-600 flex items-center px-4">
            <div className="absolute left-0 top-0 h-full bg-orange-500/10 w-full flex items-center justify-center">
               <span className="text-xs font-bold text-orange-500 uppercase tracking-widest opacity-30">5 GHz Band (Congested)</span>
            </div>
            {/* Packets */}
            <div 
               className="h-6 w-12 bg-orange-500 rounded shadow-lg relative z-10 transition-all duration-75"
               style={{ left: `${progress5}%` }}
            >
               <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-white/50"></div>
            </div>
            {/* Interference Visual */}
            <div className="absolute right-20 top-0 h-full w-12 bg-red-500/20 flex items-center justify-center border-l border-r border-red-500/30">
               <Zap className="w-4 h-4 text-red-500 animate-pulse" />
            </div>
         </div>

         {/* 6GHz Lane */}
         <div className={`relative h-12 rounded-lg overflow-hidden border flex items-center px-4 transition-all ${
            mloEnabled ? 'bg-slate-800 border-slate-600' : 'bg-slate-900 border-slate-800 opacity-30 grayscale'
         }`}>
            <div className="absolute left-0 top-0 h-full bg-cyan-500/10 w-full flex items-center justify-center">
               <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest opacity-30">6 GHz Band (Superhighway)</span>
            </div>
             {/* Packets */}
             <div 
               className="h-6 w-12 bg-cyan-500 rounded shadow-lg relative z-10 transition-all duration-75"
               style={{ left: `${progress6}%` }}
            >
               <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-white/50"></div>
            </div>
         </div>
      </div>

      <div className="flex justify-center">
         <button 
            onClick={() => { setMloEnabled(!mloEnabled); setDownloaded(0); }}
            className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all ${
               mloEnabled 
               ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50' 
               : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
         >
            <Network className="w-5 h-5" />
            {mloEnabled ? 'MLO Active' : 'Enable Wi-Fi 7 MLO'}
         </button>
      </div>
    </div>
  );
};

export default MultiLinkRacer;
