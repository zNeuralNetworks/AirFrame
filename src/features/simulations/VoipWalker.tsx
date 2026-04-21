
import React, { useState, useEffect } from 'react';
import { Phone, Wifi, PersonStanding, MoveRight, Frown, Smile } from 'lucide-react';

interface VoipWalkerProps {
  onComplete: () => void;
}

const VoipWalker: React.FC<VoipWalkerProps> = ({ onComplete }) => {
  const [walking, setWalking] = useState(false);
  const [position, setPosition] = useState(0); // 0 to 100
  const [fastRoamEnabled, setFastRoamEnabled] = useState(false);
  const [callQuality, setCallQuality] = useState(100);
  const [roamEvent, setRoamEvent] = useState(false);

  useEffect(() => {
    let interval: any;
    if (walking) {
       interval = setInterval(() => {
          setPosition(p => {
             if (p >= 100) {
                setWalking(false);
                if (fastRoamEnabled) onComplete();
                return 100;
             }
             return p + 1;
          });
       }, 50);
    }
    return () => clearInterval(interval);
  }, [walking, fastRoamEnabled, onComplete]);

  // Simulate Roam Event at 50%
  useEffect(() => {
     if (Math.abs(position - 50) < 2) {
        setRoamEvent(true);
        // If fast roam (802.11r) is OFF, quality drops significantly
        if (!fastRoamEnabled) {
           setCallQuality(30); 
        } else {
           setCallQuality(95); // Slight dip but unnoticed
        }
     } else {
        setRoamEvent(false);
        if (position > 60) setCallQuality(prev => Math.min(100, prev + 5)); // Recovery
     }
  }, [position, fastRoamEnabled]);

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700 text-white max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Phone className="w-5 h-5 text-green-400" />
            VoWiFi Walker
          </h3>
          <p className="text-slate-400 text-sm">Maintain call quality while walking between APs.</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${callQuality > 80 ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-red-500/20 border-red-500 text-red-400'}`}>
           {callQuality > 80 ? <Smile className="w-4 h-4" /> : <Frown className="w-4 h-4" />}
           <span className="font-bold font-mono">{callQuality}% MOS</span>
        </div>
      </div>

      {/* Hallway Visualization */}
      <div className="relative h-32 bg-slate-800 rounded-xl mb-8 border border-slate-600 overflow-hidden">
         {/* APs */}
         <div className="absolute left-10 top-4 text-blue-400 flex flex-col items-center">
            <Wifi className="w-8 h-8" />
            <span className="text-[10px]">AP-1</span>
         </div>
         <div className="absolute right-10 top-4 text-blue-400 flex flex-col items-center">
            <Wifi className="w-8 h-8" />
            <span className="text-[10px]">AP-2</span>
         </div>

         {/* Walker */}
         <div 
            className="absolute bottom-4 transition-all duration-75 flex flex-col items-center"
            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
         >
            <div className={`p-2 rounded-full border-2 ${roamEvent ? 'bg-yellow-500 border-white scale-125' : 'bg-white border-slate-300'}`}>
               <PersonStanding className="w-6 h-6 text-slate-900" />
            </div>
            {roamEvent && <span className="text-[10px] bg-black px-1 rounded text-white absolute -top-6 whitespace-nowrap">Roaming...</span>}
         </div>

         {/* Zones */}
         <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-blue-500/10 pointer-events-none"></div>
      </div>

      <div className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-600">
         <div className="flex items-center gap-3">
            <button 
               onClick={() => setFastRoamEnabled(!fastRoamEnabled)}
               disabled={walking}
               className={`w-12 h-6 rounded-full relative transition-colors ${fastRoamEnabled ? 'bg-green-500' : 'bg-slate-600'}`}
            >
               <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${fastRoamEnabled ? 'translate-x-6' : ''}`}></div>
            </button>
            <div className="text-sm">
               <div className="font-bold">802.11r (Fast Transition)</div>
               <div className="text-slate-400 text-xs">Pre-authenticates the next AP.</div>
            </div>
         </div>

         <button 
            onClick={() => { setPosition(0); setWalking(true); }}
            disabled={walking}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-bold text-white flex items-center gap-2"
         >
            Start Walk <MoveRight className="w-4 h-4" />
         </button>
      </div>
    </div>
  );
};

export default VoipWalker;
