import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Truck, Box } from 'lucide-react';

const OFDMVisualizer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);

  const togglePlay = () => {
    if (isPlaying) {
      setKey(prev => prev + 1);
    } else {
      setIsPlaying(true);
    }
  };

  const reset = () => {
    setIsPlaying(false);
    setKey(prev => prev + 1);
  };

  const users = [
    { color: 'bg-brand-500', label: 'User A (VoIP)' },
    { color: 'bg-indigo-500', label: 'User B (Web)' },
    { color: 'bg-emerald-500', label: 'User C (Video)' },
    { color: 'bg-amber-500', label: 'User D (IoT)' },
  ];

  return (
    <div className="bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-2xl overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">OFDMA Traffic Comparison</h3>
          <p className="text-slate-400 text-sm max-w-md italic font-serif">
            Visualizing airtime efficiency: How Arista/Wi-Fi 6 packs the "cargo" to eliminate latency.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden lg:block bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2 text-[10px] text-slate-400 max-w-xs leading-tight">
            <span className="text-brand-400 font-bold block mb-1">PRO TIP:</span>
            Explain that Wi-Fi 6/7 acts like a multilane highway instead of a single-lane bridge.
          </div>
          <button 
            onClick={togglePlay}
            className="flex items-center gap-2 px-6 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-full text-sm font-bold transition-all active:scale-95 shadow-lg shadow-brand-900/40 shrink-0"
          >
            {isPlaying ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            {isPlaying ? 'Replay' : 'Simulate Traffic'}
          </button>
        </div>
      </div>

      <div className="space-y-12 relative">
        {/* OFDM Section (Wasted Airtime) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-slate-500 font-bold">Standard: Wi-Fi 5 (OFDM)</span>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-mono text-slate-500">Wait Time high</span>
               <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-rose-500 font-bold bg-rose-500/10 px-2 py-0.5 rounded">Inefficient</span>
            </div>
          </div>
          <div className="h-20 bg-slate-950/50 rounded-2xl border border-slate-800 relative flex items-center overflow-hidden">
            <div className="absolute left-4 top-2 text-[8px] text-slate-700 font-bold uppercase tracking-widest z-10">Channel Frequency</div>
            {/* The Track Line */}
            <div className="absolute inset-0 border-b border-dashed border-slate-800 translate-y-[-1px] scale-y-50" />
            
            <AnimatePresence mode="wait">
              {isPlaying && (
                <motion.div 
                  key={`ofdm-${key}`}
                  initial={{ x: -200 }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                  className="flex gap-20"
                >
                  {/* Each "Truck" in OFDM only carries ONE user */}
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="relative group">
                      <div className="w-48 h-12 bg-slate-800 rounded-lg border border-slate-700 flex items-center p-1.5 shadow-lg">
                        <div className={`h-full w-12 rounded ${users[i % users.length].color} opacity-80`} />
                        <div className="ml-3 flex-1 h-2 bg-slate-900 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-slate-700 animate-pulse" />
                        </div>
                        <Truck className="w-4 h-4 text-slate-600 ml-2" />
                      </div>
                      <div className="absolute -top-6 left-2 whitespace-nowrap text-[9px] font-mono text-slate-500 uppercase">
                        Heavy Load • Single User
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            {!isPlaying && <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-mono text-[10px] uppercase tracking-widest">Awaiting Simulation</div>}
          </div>
          <p className="text-[10px] text-slate-600 font-mono italic">Result: Airtime wasted. Users must wait in queue even for tiny packets.</p>
        </div>

        {/* OFDMA Section (Arista Efficiency) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-slate-500 font-bold">Standard: Wi-Fi 6/7 (OFDMA)</span>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-mono text-emerald-500/80">0ms Wait Time</span>
               <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Maximum Efficiency</span>
            </div>
          </div>
          <div className="h-20 bg-slate-950/50 rounded-2xl border border-brand-900/30 relative flex items-center overflow-hidden">
            <div className="absolute left-4 top-2 text-[8px] text-brand-900 font-bold uppercase tracking-widest z-10">Resource Units (RUs)</div>
            {/* The Track Line */}
            <div className="absolute inset-0 border-b border-dashed border-brand-900/10 translate-y-[-1px] scale-y-50" />
            
            <AnimatePresence mode="wait">
              {isPlaying && (
                <motion.div 
                  key={`ofdma-${key}`}
                  initial={{ x: -200 }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                  className="flex gap-12"
                >
                  {/* Each "Truck" in OFDMA carries MULTIPLE users */}
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="relative">
                      <div className="w-48 h-12 bg-brand-950/20 rounded-lg border border-brand-500/30 flex items-center p-1 gap-1 shadow-[0_0_20px_rgba(37,99,235,0.1)]">
                        {users.map((user, idx) => (
                          <div key={idx} className={`h-full flex-1 rounded-sm ${user.color} flex items-center justify-center group relative`}>
                            <Box className="w-3 h-3 text-white/50" />
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-slate-800 text-white text-[8px] p-1 rounded whitespace-nowrap z-50">
                              {user.label}
                            </div>
                          </div>
                        ))}
                        <Truck className="w-4 h-4 text-brand-400 ml-1 shrink-0" />
                      </div>
                      <div className="absolute -top-6 left-2 whitespace-nowrap text-[9px] font-mono text-brand-400 uppercase font-bold">
                        Parallel Load • 4 Users/Frame
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            {!isPlaying && <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-mono text-[10px] uppercase tracking-widest">Awaiting Simulation</div>}
          </div>
          <p className="text-[10px] text-brand-400/80 font-mono italic">Result: Deterministic latency. Small packets (Voice/IoT) bypass the queue.</p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-10 pt-6 border-t border-slate-800 flex flex-wrap gap-6 justify-center">
        {users.map((user, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${user.color}`} />
            <span className="text-[10px] font-mono text-slate-500">{user.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OFDMVisualizer;
