
import React, { useState } from 'react';
import { Signal, Smartphone, Wifi, Frown, Meh, Smile } from 'lucide-react';

interface SignalThermometerProps {
  onComplete: () => void;
}

const SignalThermometer: React.FC<SignalThermometerProps> = ({ onComplete }) => {
  const [rssi, setRssi] = useState(-50);

  const getStatus = (val: number) => {
    if (val > -40) return { label: 'Too Loud', color: 'text-orange-500', bg: 'bg-orange-500', icon: Meh, desc: 'Radio compression. Distortion.' };
    if (val > -65) return { label: 'Perfect', color: 'text-green-600', bg: 'bg-green-600', icon: Smile, desc: 'Crystal clear voice & video.' };
    if (val > -75) return { label: 'OK for Data', color: 'text-yellow-600', bg: 'bg-yellow-500', icon: Meh, desc: 'Web browsing fine. Video buffers.' };
    return { label: 'Dead Zone', color: 'text-red-500', bg: 'bg-red-500', icon: Frown, desc: 'Packet loss. Disconnection.' };
  };

  const status = getStatus(rssi);
  const StatusIcon = status.icon;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setRssi(Number(e.target.value));
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 text-slate-900 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-8">
         <h3 className="text-xl font-bold flex items-center gap-2">
            <Signal className="w-6 h-6 text-brand-600" />
            Signal Thermometer
         </h3>
         <div className="text-xs text-slate-500">Target: Find the Voice Quality Zone (-65 dBm)</div>
      </div>

      <div className="flex gap-8">
         {/* Thermometer Visual */}
         <div className="h-64 w-16 bg-slate-100 rounded-full relative border border-slate-300 overflow-hidden shadow-inner">
            {/* Zones */}
            <div className="absolute top-0 w-full h-[20%] bg-orange-200/50 border-b border-orange-300/50"></div> {/* -30 to -50 */}
            <div className="absolute top-[20%] w-full h-[15%] bg-green-200/50 border-b border-green-300/50"></div> {/* -50 to -65 */}
            <div className="absolute top-[35%] w-full h-[10%] bg-yellow-200/50 border-b border-yellow-300/50"></div> {/* -65 to -75 */}
            <div className="absolute top-[45%] w-full h-[55%] bg-red-200/50"></div> {/* -75 to -100 */}

            {/* Indicator */}
            <div 
               className={`absolute w-full h-1 transition-all duration-100 ${status.bg}`}
               style={{ top: `${Math.abs(rssi + 30) / 0.7}%` }} // Approximate mapping -30 (0%) to -100 (100%)
            >
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md border border-slate-300 -mr-2"></div>
            </div>
         </div>

         <div className="flex-1 flex flex-col justify-center space-y-8">
            <div className="text-center">
               <div className="text-6xl font-bold font-mono mb-2 text-slate-800">{rssi} <span className="text-xl text-slate-400">dBm</span></div>
               <div className={`text-xl font-bold ${status.color} flex items-center justify-center gap-2`}>
                  <StatusIcon className="w-6 h-6" /> {status.label}
               </div>
               <div className="text-sm text-slate-500 mt-2">{status.desc}</div>
            </div>

            <input 
               type="range" 
               min="-90" 
               max="-30" 
               step="1"
               value={rssi}
               onChange={handleSliderChange}
               className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
            
            <button 
               onClick={onComplete}
               disabled={rssi < -68 || rssi > -60}
               className="w-full py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-brand-600 hover:bg-brand-700 text-white shadow-md hover:shadow-lg shadow-brand-900/10"
            >
               Verify Signal Quality
            </button>
         </div>
      </div>
    </div>
  );
};

export default SignalThermometer;
