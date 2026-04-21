
import React from 'react';
import { 
  Layout, 
  Palette, 
  Box, 
  Monitor, 
  Grid3X3, 
  Layers, 
  Sun, 
  Moon, 
  Maximize,
  PenTool,
  Rocket,
  Droplet,
  Activity
} from 'lucide-react';
import { LAYOUT_SYSTEMS, COLOR_SYSTEMS, SUGGESTED_PALETTES, METAPHORS } from '../../content/design-system/visuals';

// Visual Maps
const LayoutVisuals: Record<string, React.ReactNode> = {
  'bento': (
    <div className="grid grid-cols-3 grid-rows-3 gap-2 h-32 w-full">
       <div className="row-span-2 bg-slate-100 rounded-lg border border-slate-200"></div>
       <div className="col-span-2 bg-slate-100 rounded-lg border border-slate-200"></div>
       <div className="bg-slate-100 rounded-lg border border-slate-200"></div>
       <div className="bg-slate-100 rounded-lg border border-slate-200"></div>
       <div className="col-span-3 bg-slate-100 rounded-lg border border-slate-200"></div>
    </div>
  ),
  'split': (
    <div className="flex gap-2 h-32 w-full">
       <div className="w-[35%] bg-slate-50 border border-slate-200 rounded-lg p-2 flex flex-col gap-2">
          <div className="h-2 w-3/4 bg-slate-200 rounded"></div>
          <div className="h-2 w-full bg-slate-200 rounded"></div>
          <div className="h-2 w-1/2 bg-slate-200 rounded"></div>
       </div>
       <div className="w-[65%] bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border border-dashed border-slate-500"></div>
       </div>
    </div>
  ),
  'z-pattern': (
    <div className="relative h-32 w-full border border-slate-100 rounded-lg p-2">
       <svg className="absolute inset-0 w-full h-full text-brand-200" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 10 20 L 90 20 L 10 80 L 90 80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
       </svg>
       <div className="absolute top-2 left-2 w-8 h-8 bg-slate-100 rounded"></div>
       <div className="absolute top-2 right-2 w-20 h-8 bg-slate-100 rounded"></div>
       <div className="absolute bottom-2 left-2 w-20 h-8 bg-slate-100 rounded"></div>
       <div className="absolute bottom-2 right-2 w-8 h-8 bg-slate-100 rounded"></div>
    </div>
  )
};

const ColorVisuals: Record<string, React.ReactNode> = {
  'rule-60-30-10': (
    <div className="h-12 w-full flex rounded-xl overflow-hidden shadow-sm">
       <div className="w-[60%] bg-slate-50 flex items-center justify-center text-2xs text-slate-400 font-bold border-r border-slate-200">60% Neutral</div>
       <div className="w-[30%] bg-brand-500 flex items-center justify-center text-2xs text-white font-bold">30%</div>
       <div className="w-[10%] bg-orange-500 flex items-center justify-center text-2xs text-white font-bold">10</div>
    </div>
  ),
  'semantic': (
     <div className="flex gap-4 justify-center">
        <div className="flex flex-col items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-green-100 border border-green-300 flex items-center justify-center text-green-600">
              <Monitor className="w-4 h-4" />
           </div>
           <span className="text-2xs uppercase font-bold text-slate-400">Stable</span>
        </div>
        <div className="flex flex-col items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-600">
              <Activity className="w-4 h-4" />
           </div>
           <span className="text-2xs uppercase font-bold text-slate-400">Lag</span>
        </div>
        <div className="flex flex-col items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-red-100 border border-red-300 flex items-center justify-center text-red-600">
              <Layers className="w-4 h-4" />
           </div>
           <span className="text-2xs uppercase font-bold text-slate-400">Down</span>
        </div>
     </div>
  ),
  'elevation': (
     <div className="relative h-20 flex items-center justify-center">
        <div className="w-16 h-16 bg-white rounded-surface shadow-sm border border-slate-200 absolute scale-90 -translate-x-8 opacity-50 z-0"></div>
        <div className="w-16 h-16 bg-white rounded-surface shadow-md border border-slate-200 absolute scale-95 -translate-x-4 opacity-75 z-10"></div>
        <div className="w-16 h-16 bg-white rounded-surface shadow-xl border border-slate-200 absolute z-20 flex items-center justify-center text-brand-600">
           <Box className="w-6 h-6" />
        </div>
     </div>
  )
};

const MetaphorVisuals: Record<string, React.ReactNode> = {
  'cosmic': (
    <div className="bg-slate-900 h-32 rounded-xl p-4 relative overflow-hidden flex flex-col justify-between text-white border border-slate-800">
       <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500 rounded-full blur-[40px] opacity-30"></div>
       <Rocket className="w-6 h-6 text-brand-400" />
       <div className="space-y-1">
          <div className="h-1 w-12 bg-slate-700 rounded"></div>
          <div className="h-1 w-20 bg-slate-700 rounded"></div>
       </div>
    </div>
  ),
  'blueprint': (
    <div className="bg-blue-50 h-32 rounded-xl p-4 relative overflow-hidden flex flex-col justify-between text-blue-900 border border-blue-200">
       <div className="absolute inset-0 opacity-10" 
         style={{ backgroundImage: 'linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)', backgroundSize: '10px 10px' }}>
       </div>
       <PenTool className="w-6 h-6 text-blue-800" />
       <div className="space-y-1 font-mono">
          <div className="h-0.5 w-12 bg-blue-800 rounded"></div>
          <div className="h-0.5 w-20 bg-blue-800 rounded"></div>
       </div>
    </div>
  ),
  'arcade': (
    <div className="bg-purple-900 h-32 rounded-xl p-4 relative overflow-hidden flex flex-col justify-between text-white border-4 border-purple-400 font-mono">
       <div className="text-yellow-400 text-xs tracking-widest">SCORE: 000</div>
       <div className="self-center flex gap-1">
          <div className="w-2 h-2 bg-white"></div>
          <div className="w-2 h-2 bg-transparent"></div>
          <div className="w-2 h-2 bg-white"></div>
       </div>
       <div className="h-4 bg-red-500 w-full border-2 border-white"></div>
    </div>
  )
};

const VisualGallery: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-16 pb-32">
       
       <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-fuchsia-50 text-fuchsia-600 rounded-2xl mb-4">
             <Palette className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Visual Design Systems</h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            The structural, chromatic, and metaphorical frameworks that translate abstract pedagogical goals into a tangible user interface.
          </p>
       </div>

       {/* Section 1: Layout Systems */}
       <div className="space-y-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
             <div className="p-2 bg-slate-100 rounded-lg text-slate-700">
                <Layout className="w-6 h-6" />
             </div>
             <div>
                <h2 className="text-2xl font-bold text-slate-900">Layout Systems</h2>
                <p className="text-sm text-slate-500">Spatial organization strategies.</p>
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {LAYOUT_SYSTEMS.map((item, idx) => (
                <div key={idx} className="bg-white rounded-card p-6 border border-slate-200 shadow-sm flex flex-col h-full">
                   <div className="mb-6 h-40 bg-slate-50 rounded-surface border border-slate-100 flex items-center justify-center p-4 overflow-hidden">
                      {LayoutVisuals[item.id]}
                   </div>
                   <div className="flex justify-between items-baseline mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                      <span className="text-2xs font-bold uppercase tracking-wider text-slate-400">{item.usage}</span>
                   </div>
                   <p className="text-sm text-slate-500 leading-relaxed">
                      {item.description}
                   </p>
                </div>
             ))}
          </div>
       </div>

       {/* Section 2: Color Systems */}
       <div className="space-y-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
             <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
                <Sun className="w-6 h-6" />
             </div>
             <div>
                <h2 className="text-2xl font-bold text-slate-900">Chromatic Logic</h2>
                <p className="text-sm text-slate-500">Functional and brand color theory.</p>
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {COLOR_SYSTEMS.map((item, idx) => (
                <div key={idx} className="bg-white rounded-card p-6 border border-slate-200 shadow-sm flex flex-col h-full hover:border-brand-200 transition-colors">
                   <div className="mb-2">
                      <span className="text-xs font-bold text-brand-500 uppercase tracking-wide">{item.subtitle}</span>
                      <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                   </div>
                   <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">
                      {item.description}
                   </p>
                   <div className="bg-slate-50 rounded-surface p-4 border border-slate-100">
                      {ColorVisuals[item.id]}
                   </div>
                </div>
             ))}
          </div>

          {/* New Suggested Palettes Section */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-slate-700">
                      <Droplet className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Suggested 60-30-10 Palettes</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {SUGGESTED_PALETTES.map((scheme, idx) => (
                      <div key={idx} className="bg-white rounded-card p-5 border border-slate-200 shadow-sm">
                          <h4 className="font-bold text-slate-800 mb-1">{scheme.name}</h4>
                          <p className="text-xs text-slate-500 mb-4">{scheme.description}</p>
                          
                          <div className="space-y-3">
                              {/* 60% */}
                              <div className="flex items-center gap-3">
                                  <div className={`w-12 h-12 rounded-lg shadow-inner ${scheme.c60.class} border border-black/5`}></div>
                                  <div>
                                      <div className="text-xs font-bold text-slate-700">60% Neutral</div>
                                      <div className="text-2xs text-slate-400 font-mono">{scheme.c60.hex}</div>
                                      <div className="text-2xs text-slate-500">{scheme.c60.name}</div>
                                  </div>
                              </div>
                              {/* 30% */}
                              <div className="flex items-center gap-3">
                                  <div className={`w-12 h-12 rounded-lg shadow-inner ${scheme.c30.class} border border-black/5`}></div>
                                  <div>
                                      <div className="text-xs font-bold text-slate-700">30% Brand</div>
                                      <div className="text-2xs text-slate-400 font-mono">{scheme.c30.hex}</div>
                                      <div className="text-2xs text-slate-500">{scheme.c30.name}</div>
                                  </div>
                              </div>
                              {/* 10% */}
                              <div className="flex items-center gap-3">
                                  <div className={`w-12 h-12 rounded-lg shadow-inner ${scheme.c10.class} border border-black/5`}></div>
                                  <div>
                                      <div className="text-xs font-bold text-slate-700">10% Accent</div>
                                      <div className="text-2xs text-slate-400 font-mono">{scheme.c10.hex}</div>
                                      <div className="text-2xs text-slate-500">{scheme.c10.name}</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
       </div>

       {/* Section 3: Metaphors */}
       <div className="space-y-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
             <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                <Moon className="w-6 h-6" />
             </div>
             <div>
                <h2 className="text-2xl font-bold text-slate-900">Visual Metaphors</h2>
                <p className="text-sm text-slate-500">Thematic concepts explored during design.</p>
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {METAPHORS.map((item, idx) => (
                <div key={idx} className={`rounded-card p-6 border-2 flex flex-col h-full relative overflow-hidden ${
                   item.status === 'Selected' ? 'bg-white border-brand-500 shadow-xl scale-[1.02]' : 'bg-slate-50 border-slate-200 opacity-80'
                }`}>
                   {item.status === 'Selected' && (
                      <div className="absolute top-0 right-0 bg-brand-500 text-white text-2xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                         Winner
                      </div>
                   )}
                   
                   <div className="mb-6 h-32 w-full">
                      {MetaphorVisuals[item.id]}
                   </div>

                   <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                   <div className="text-2xs text-slate-400 font-mono mb-4">{item.theme}</div>
                   
                   <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                   </p>
                </div>
             ))}
          </div>
       </div>

    </div>
  );
};

export default VisualGallery;
