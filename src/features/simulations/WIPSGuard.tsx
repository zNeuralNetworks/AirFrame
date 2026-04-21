
import React, { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, Wifi, AlertOctagon, HelpCircle } from 'lucide-react';

interface WIPSGuardProps {
  onComplete: () => void;
}

interface Threat {
  id: number;
  name: string;
  ssid: string;
  channel: number;
  rssi: number;
  type: 'rogue' | 'authorized' | 'external' | 'honeypot';
  description: string;
}

const WIPSGuard: React.FC<WIPSGuardProps> = ({ onComplete }) => {
  const [threats, setThreats] = useState<Threat[]>([
    { id: 1, name: "Unknown AP", ssid: "Corporate-Guest", channel: 6, rssi: -45, type: 'honeypot', description: "Broadcasting your corporate SSID but not on your wired network." },
    { id: 2, name: "Employee Mobile", ssid: "MyiPhone", channel: 11, rssi: -60, type: 'external', description: "Personal hotspot, not connected to wired network." },
    { id: 3, name: "Lab AP", ssid: "Test-Network", channel: 36, rssi: -30, type: 'rogue', description: "Unknown AP plugged into your secure switch port." },
  ]);
  
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [processedCount, setProcessedCount] = useState(0);

  const handleAction = (threat: Threat, action: 'block' | 'ignore') => {
    let correct = false;
    let message = "";

    if (threat.type === 'rogue' || threat.type === 'honeypot') {
       if (action === 'block') {
          correct = true;
          message = "Correct! This device poses a security risk. Arista WIPS will send de-auth packets.";
       } else {
          message = "Danger! This device is spoofing your network or is plugged into your wire. It must be blocked.";
       }
    } else {
       if (action === 'ignore') {
          correct = true;
          message = "Correct. External hotspots are annoying but don't threaten the wire unless they try to connect to it.";
       } else {
          message = "Careful. Blocking neighbor's Wi-Fi is illegal in many jurisdictions (FCC). Only block if it touches your wire.";
       }
    }

    setFeedback(message);
    if (correct) setScore(s => s + 1);

    setTimeout(() => {
       setFeedback(null);
       setThreats(prev => prev.filter(t => t.id !== threat.id));
       setProcessedCount(c => c + 1);
       if (processedCount + 1 >= 3) {
          onComplete();
       }
    }, 2000);
  };

  if (processedCount >= 3) {
     return (
        <div className="bg-slate-900 text-white p-8 rounded-2xl text-center">
           <ShieldCheck className="w-16 h-16 text-green-400 mx-auto mb-4" />
           <h2 className="text-2xl font-bold mb-2">WIPS Calibration Complete</h2>
           <p className="text-slate-400 mb-6">You correctly identified {score}/3 threats.</p>
           <button onClick={onComplete} className="bg-brand-600 px-6 py-2 rounded-lg font-bold">Return to Lesson</button>
        </div>
     )
  }

  const currentThreat = threats[0];

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700 text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            WIPS Guardian <span className="text-xs bg-red-900 text-red-200 px-2 py-0.5 rounded uppercase">Simulation</span>
          </h3>
          <p className="text-slate-400 text-sm">Classify and act on the detected signal.</p>
        </div>
        <div className="text-right">
           <div className="text-xl font-bold font-mono text-brand-400">{score} pts</div>
        </div>
      </div>

      {currentThreat && (
         <div className="bg-slate-800 rounded-xl p-6 border border-slate-600 relative overflow-hidden">
            {feedback && (
               <div className={`absolute inset-0 flex items-center justify-center z-10 bg-slate-900/90 text-center p-6 transition-opacity ${feedback.includes('Correct') ? 'text-green-400' : 'text-red-400'}`}>
                  <div className="font-bold text-lg">{feedback}</div>
               </div>
            )}
            
            <div className="flex items-start gap-4 mb-6">
               <div className="p-4 bg-slate-700 rounded-full">
                  <Wifi className="w-8 h-8 text-white animate-pulse" />
               </div>
               <div>
                  <h4 className="text-2xl font-bold">{currentThreat.name}</h4>
                  <div className="flex gap-4 mt-2 text-sm text-slate-300 font-mono">
                     <span className="bg-slate-900 px-2 py-1 rounded">SSID: {currentThreat.ssid}</span>
                     <span className="bg-slate-900 px-2 py-1 rounded">CH: {currentThreat.channel}</span>
                     <span className="bg-slate-900 px-2 py-1 rounded">RSSI: {currentThreat.rssi} dBm</span>
                  </div>
               </div>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-lg mb-8 border border-slate-700">
               <p className="text-slate-300 italic">"Analysis: {currentThreat.description}"</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <button 
                  onClick={() => handleAction(currentThreat, 'ignore')}
                  className="py-4 rounded-xl border border-slate-500 hover:bg-slate-700 transition-colors font-bold text-slate-300 flex flex-col items-center gap-1"
               >
                  <HelpCircle className="w-6 h-6" />
                  Classify as External (Ignore)
               </button>
               <button 
                  onClick={() => handleAction(currentThreat, 'block')}
                  className="py-4 rounded-xl bg-red-600 hover:bg-red-700 border border-red-500 transition-colors font-bold text-white flex flex-col items-center gap-1"
               >
                  <AlertOctagon className="w-6 h-6" />
                  Classify as Rogue (Block)
               </button>
            </div>
         </div>
      )}
    </div>
  );
};

export default WIPSGuard;
