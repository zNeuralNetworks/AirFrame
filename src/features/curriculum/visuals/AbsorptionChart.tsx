
import React from 'react';
import { Layers, Signal } from 'lucide-react';

const AbsorptionChart: React.FC = () => {
  const materials = [
    { name: 'Drywall', loss: 4, width: 12, color: 'from-green-500 to-yellow-500', note: 'Half Power (-4dB)' },
    { name: 'Brick / Concrete', loss: 10, width: 40, color: 'from-yellow-500 to-orange-600', note: '10x Loss (-10dB)' },
    { name: 'Metal / Elevator', loss: 25, width: 90, color: 'from-orange-600 to-red-700', note: 'Signal Death (-25dB+)' },
  ];

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-6 font-sans">
      <div className="flex items-center gap-2 mb-6 text-slate-500 text-xs font-bold uppercase tracking-wider">
        <Signal className="w-4 h-4" /> Signal Attenuation by Material
      </div>
      <div className="space-y-6">
        {materials.map((mat) => (
          <div key={mat.name}>
            <div className="flex justify-between items-baseline text-sm mb-2">
              <span className="font-bold text-slate-800">{mat.name}</span>
              <span className="text-slate-500 font-mono text-xs font-medium">{mat.note}</span>
            </div>
            <div className="relative h-8 w-full bg-slate-200 rounded-full overflow-hidden border border-slate-300/50 shadow-inner">
              <div 
                className={`h-full bg-gradient-to-r ${mat.color} rounded-full transition-all duration-500`}
                style={{ width: `${mat.width}%` }}
              ></div>
              {/* Sine Wave SVG */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <path 
                  d="M0,16 C20,0 40,32 60,16 S100,0 120,16 S160,0 180,16 S220,0 240,16 S280,0 300,16 S340,0 360,16 S400,0 420,16"
                  stroke="rgba(255,255,255,0.3)" 
                  strokeWidth="2" 
                  fill="none" 
                  style={{
                    clipPath: `inset(0 ${100 - mat.width}% 0 0)`
                  }}
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-slate-400 italic text-center">
        *Values are approximate averages for 5GHz spectrum.
      </div>
    </div>
  );
};

export default AbsorptionChart;
