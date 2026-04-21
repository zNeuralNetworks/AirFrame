
import React, { useState, useEffect } from 'react';
import { Radio, Search, ShieldAlert, CheckCircle } from 'lucide-react';

interface GhostHunterProps {
  onComplete: () => void;
}

const GhostHunter: React.FC<GhostHunterProps> = ({ onComplete }) => {
  const [thirdRadioActive, setThirdRadioActive] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [threatDetected, setThreatDetected] = useState(false);
  const [clientThroughput, setClientThroughput] = useState(100);

  useEffect(() => {
    let interval: any;
    if (thirdRadioActive) {
       interval = setInterval(() => {
          setScanProgress(p => {
             if (p >= 100) return 100;
             return p + 2;
          });
       }, 50);
       setClientThroughput(100); // Stable
    } else {
       // Without 3rd radio, scanning requires time-slicing (bg scan)
       // which drops throughput slightly, or no scanning at all
       setScanProgress(0);
       setClientThroughput(100);
    }

    if (scanProgress >= 100 && !threatDetected) {
       setThreatDetected(true);
       setTimeout(onComplete, 1500);
    }

    return () => clearInterval(interval);
  }, [thirdRadioActive, scanProgress, threatDetected, onComplete]);

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700 text-white max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Radio className="w-5 h-5 text-purple-400" />
            Ghost Hunter
          </h3>
          <p className="text-slate-400 text-sm">Activate the 3rd Radio to scan for threats without dropping packets.</p>
        </div>
        {threatDetected && (
           <div className="flex items-center gap-2 text-green-400 bg-green-900/30 px-3 py-1 rounded-full text-xs font-bold border border-green-500/50 animate-bounce">
              <CheckCircle className="w-4 h-4" /> Rogue AP Found!
           </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
         {/* Client Radios */}
         <div className="bg-slate-800 p-4 rounded-xl border border-slate-600 relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
               <span className="text-xs font-bold text-slate-400 uppercase">Serving Radios (2.4/5GHz)</span>
               <span className="text-green-400 font-mono text-sm">{clientThroughput}% Perf</span>
            </div>
            <div className="flex gap-2">
               <div className="flex-1 h-16 bg-slate-700 rounded-lg flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-blue-500/10 animate-pulse"></div>
                  <span className="relative z-10 font-bold">2.4</span>
               </div>
               <div className="flex-1 h-16 bg-slate-700 rounded-lg flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-blue-500/10 animate-pulse"></div>
                  <span className="relative z-10 font-bold">5</span>
               </div>
            </div>
         </div>

         {/* Scanning Radio */}
         <div className={`bg-slate-800 p-4 rounded-xl border transition-all duration-500 ${thirdRadioActive ? 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'border-slate-600 opacity-50'}`}>
            <div className="flex justify-between items-center mb-4">
               <span className="text-xs font-bold text-slate-400 uppercase">3rd Radio (WIPS)</span>
               {thirdRadioActive ? <span className="text-purple-400 text-xs animate-pulse">SCANNING</span> : <span className="text-slate-600 text-xs">IDLE</span>}
            </div>
            <div className="h-16 bg-slate-900 rounded-lg border border-slate-700 relative overflow-hidden flex items-center justify-center">
               {thirdRadioActive && (
                  <>
                     <div className="absolute left-0 top-0 h-full w-1 bg-purple-500/50 shadow-[0_0_10px_#a855f7] animate-scan"></div>
                     <Search className="w-6 h-6 text-purple-400" />
                  </>
               )}
               {!thirdRadioActive && <span className="text-xs text-slate-500">Off</span>}
            </div>
         </div>
      </div>

      <style>{`
         @keyframes scan {
            0% { left: 0%; }
            100% { left: 100%; }
         }
         .animate-scan { animation: scan 1.5s linear infinite; }
      `}</style>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 font-mono text-xs text-green-400 h-24 overflow-y-auto">
         <div>&gt; System initialized...</div>
         <div>&gt; Client Radios: Online</div>
         {thirdRadioActive && (
            <>
               <div>&gt; 3rd Radio: Activated</div>
               <div>&gt; Scanning Channel 1... Clean</div>
               <div>&gt; Scanning Channel 6... Clean</div>
               <div>&gt; Scanning Channel 11... Clean</div>
               <div>&gt; Scanning Channel 36... <span className="text-red-400 font-bold">ALERT: ROGUE DETECTED</span></div>
            </>
         )}
      </div>

      <button 
         onClick={() => setThirdRadioActive(!thirdRadioActive)}
         disabled={threatDetected}
         className={`w-full py-4 rounded-xl font-bold transition-all ${
            thirdRadioActive 
            ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-900/50' 
            : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
         }`}
      >
         {thirdRadioActive ? 'Deactivate Sensor' : 'Activate 3rd Radio Sensor'}
      </button>
    </div>
  );
};

export default GhostHunter;
