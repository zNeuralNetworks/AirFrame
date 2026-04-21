
import React, { useState, useEffect } from 'react';
import { Wifi, Trash2, Check, RefreshCcw } from 'lucide-react';

interface NetworkPlannerProps {
  onComplete: () => void;
}

interface Router {
  id: number;
  x: number;
  y: number;
  radius: number;
}

const NetworkPlanner: React.FC<NetworkPlannerProps> = ({ onComplete }) => {
  const [routers, setRouters] = useState<Router[]>([]);
  const [coverage, setCoverage] = useState(0);
  const maxRouters = 3;
  const areaWidth = 100; // Percentage
  const areaHeight = 100; // Percentage of container

  const addRouter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (routers.length >= maxRouters) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setRouters([...routers, { id: Date.now(), x, y, radius: 25 }]);
  };

  const removeRouter = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setRouters(routers.filter(r => r.id !== id));
  };

  // Crude coverage calculation approximation
  useEffect(() => {
    if (routers.length === 0) {
      setCoverage(0);
      return;
    }

    // Since calculating exact intersection area of circles is hard,
    // we use a simple Monte Carlo simulation (random sampling points)
    let coveredPoints = 0;
    const totalPoints = 500;

    for (let i = 0; i < totalPoints; i++) {
       const rx = Math.random() * 100;
       const ry = Math.random() * 100;
       
       // Aspect ratio correction (assuming approx 2:1 container for calculation)
       // Distance check
       const isCovered = routers.some(r => {
          const dx = Math.abs(rx - r.x);
          const dy = Math.abs(ry - r.y) * 0.6; // crude aspect ratio adjustment
          const dist = Math.sqrt(dx*dx + dy*dy);
          return dist < r.radius;
       });

       if (isCovered) coveredPoints++;
    }

    const percentage = Math.round((coveredPoints / totalPoints) * 100);
    setCoverage(percentage);

    if (percentage > 70) {
      onComplete();
    }
  }, [routers, onComplete]);

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700 text-white select-none">
       <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Wifi className="w-5 h-5 text-amber-400" />
            Coverage Planner <span className="text-xs bg-amber-900 text-amber-200 px-2 py-0.5 rounded uppercase">Sim</span>
          </h3>
          <p className="text-slate-400 text-sm">Place routers to cover at least 70% of the floor plan.</p>
        </div>
        <div className="text-right">
           <div className="text-2xl font-bold font-mono">{coverage}%</div>
           <div className="text-xs text-slate-400">Coverage</div>
        </div>
      </div>

      <div 
        className="relative w-full h-80 bg-slate-800 rounded-xl overflow-hidden border border-slate-600 cursor-crosshair group shadow-inner"
        onClick={addRouter}
      >
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>
        
        {/* Walls/Obstacles (Visual only) */}
        <div className="absolute top-[20%] left-[20%] w-[10%] h-[60%] bg-slate-950 border border-slate-700"></div>
        <div className="absolute top-[50%] right-[20%] w-[40%] h-[5%] bg-slate-950 border border-slate-700"></div>

        {/* Routers */}
        {routers.map(router => (
          <div 
            key={router.id}
            className="absolute flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 animate-scale-in"
            style={{ left: `${router.x}%`, top: `${router.y}%`, width: `${router.radius * 2}%`, height: `${router.radius * 2 * 1.6}%` }} // Aspect ratio fix for visual circle
          >
             {/* Signal Radius */}
             <div className="absolute inset-0 bg-brand-500/20 rounded-full border border-brand-500/30 animate-pulse-slow"></div>
             
             {/* Icon */}
             <div className="relative z-10 w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Wifi className="w-4 h-4 text-white" />
                <button 
                  onClick={(e) => removeRouter(e, router.id)}
                  className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-opacity"
                >
                  <Trash2 className="w-3 h-3 text-white" />
                </button>
             </div>
          </div>
        ))}

        {routers.length === 0 && (
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-slate-500 text-sm bg-slate-900/50 px-3 py-1 rounded">Click anywhere to place a router</span>
           </div>
        )}
      </div>

      <div className="mt-6 flex justify-between items-center">
         <div className="flex gap-2">
            {[...Array(maxRouters)].map((_, i) => (
               <div key={i} className={`w-3 h-3 rounded-full ${i < routers.length ? 'bg-brand-500' : 'bg-slate-700'}`}></div>
            ))}
            <span className="text-xs text-slate-500 ml-2">Routers Available</span>
         </div>

         {coverage > 70 ? (
           <button onClick={onComplete} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold transition-colors animate-bounce">
              <Check className="w-4 h-4" /> Deploy Network
           </button>
         ) : (
            <button onClick={() => setRouters([])} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <RefreshCcw className="w-4 h-4" /> Reset
            </button>
         )}
      </div>
    </div>
  );
};

export default NetworkPlanner;
