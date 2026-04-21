
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Radio, Zap, Shield, Info, Map as MapIcon, Layers } from 'lucide-react';

interface Antenna {
  id: 'omni' | 'patch';
  name: string;
  gain: number;
  pattern: string;
  description: string;
}

const ANTENNAS: Antenna[] = [
  {
    id: 'omni',
    name: 'Omni-Directional',
    gain: 2,
    pattern: 'donut',
    description: '360° coverage. Ideal for open office spaces where users are all around the AP.'
  },
  {
    id: 'patch',
    name: 'Patch (Directional)',
    gain: 8,
    pattern: 'cone',
    description: 'Focused 60-90° beam. High gain. Ideal for hallways, walls, or high-ceiling warehouses.'
  }
];

const AntennaPatternLab: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [selectedAntenna, setSelectedAntenna] = useState<Antenna>(ANTENNAS[0]);
  const [showHeatmap, setShowHeatmap] = useState(true);

  return (
    <div className="flex flex-col h-full bg-slate-50 rounded-2xl overflow-hidden border border-border">
      {/* Control Panel */}
      <div className="p-6 bg-white border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Antenna Directivity Lab</h3>
          <p className="text-sm text-slate-500">Visualize radiation patterns and gain impact.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`p-2 rounded-lg border transition-all ${showHeatmap ? 'bg-brand-50 border-brand-200 text-brand-600' : 'bg-white border-slate-200 text-slate-400'}`}
          >
            <Layers className="w-5 h-5" />
          </button>
          <button 
            onClick={onComplete}
            className="px-4 py-2 bg-brand-500 text-white rounded-lg font-bold hover:bg-brand-600 transition-all text-sm"
          >
            Finish Lab
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Controls */}
        <div className="w-80 border-r border-border bg-white p-6 space-y-6 overflow-y-auto">
          <section>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">Select Hardware</label>
            <div className="space-y-3">
              {ANTENNAS.map(ant => (
                <button
                  key={ant.id}
                  onClick={() => setSelectedAntenna(ant)}
                  className={`w-full p-4 rounded-xl text-left border-2 transition-all ${
                    selectedAntenna.id === ant.id 
                      ? 'border-brand-500 bg-brand-50' 
                      : 'border-slate-100 hover:border-slate-200 bg-white shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-900">{ant.name}</span>
                    <Radio className={`w-4 h-4 ${selectedAntenna.id === ant.id ? 'text-brand-500' : 'text-slate-300'}`} />
                  </div>
                  <div className="text-xs font-mono text-brand-600 font-bold">{ant.gain} dBi Gain</div>
                </button>
              ))}
            </div>
          </section>

          <section className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-700 leading-relaxed">
                  {selectedAntenna.description}
                </p>
              </div>
            </div>
          </section>

          <div className="pt-4 border-t border-slate-100">
             <div className="space-y-4 text-xs">
                <div className="flex justify-between items-center">
                   <span className="text-slate-400 font-medium">Focus Factor</span>
                   <span className="text-slate-900 font-bold">{selectedAntenna.id === 'omni' ? 'Low' : 'High'}</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-slate-400 font-medium">Interference Risk</span>
                   <span className="text-slate-900 font-bold">{selectedAntenna.id === 'omni' ? 'High' : 'Minimized'}</span>
                </div>
             </div>
          </div>
        </div>

        {/* Visualizer Area */}
        <div className="flex-1 bg-slate-100 relative overflow-hidden flex items-center justify-center p-12">
          {/* Mock Floorplan Layer */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="grid grid-cols-12 h-full w-full">
                {Array.from({ length: 144 }).map((_, i) => (
                  <div key={i} className="border border-slate-400" />
                ))}
             </div>
          </div>

          <div className="relative w-full max-w-2xl aspect-square bg-white rounded-3xl apple-shadow-lg flex items-center justify-center p-8 border border-slate-200">
             {/* AP Unit */}
             <div className="relative z-20">
                <div className="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center text-white apple-shadow-lg ring-8 ring-brand-100 animate-pulse">
                   <Radio className="w-8 h-8" />
                </div>
                
                {/* Antenna Pattern Visualization */}
                {selectedAntenna.id === 'omni' ? (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.6 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border-[20px] border-amber-400"
                    style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0) 70%)' }}
                  />
                ) : (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0, rotate: -30 }}
                    animate={{ scale: 1, opacity: 0.6, rotate: 0 }}
                    className="absolute top-1/2 left-0 -translate-y-1/2 origin-left w-[450px] h-[300px]"
                    style={{ 
                      background: 'conic-gradient(from 45deg at left, rgba(59,130,246,0.3) 0deg, rgba(59,130,246,0) 45deg, rgba(59,130,246,0.3) 90deg)',
                      clipPath: 'polygon(0 50%, 100% 0, 100% 100%)'
                    }}
                  />
                )}
             </div>

             {/* Dynamic Labels */}
             <div className="absolute top-8 left-8 text-xs font-bold text-slate-400 uppercase tracking-widest">RF Directivity View</div>
             <div className="absolute bottom-8 right-8 text-xs font-bold text-brand-500 flex items-center gap-2">
                <Zap className="w-4 h-4 fill-current" />
                Live EIRP Calculation active
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AntennaPatternLab;
