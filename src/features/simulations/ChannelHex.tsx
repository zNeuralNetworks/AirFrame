
import React, { useState, useEffect } from 'react';
import { Hexagon, AlertOctagon, CheckCircle2, RefreshCw } from 'lucide-react';

interface ChannelHexProps {
  onComplete: () => void;
}

// Simple hexagonal grid layout
// Center (0), then 6 neighbors (1-6)
interface Cell {
  id: number;
  channel: number | null;
  neighbors: number[];
  x: number;
  y: number;
}

const INITIAL_CELLS: Cell[] = [
  { id: 0, channel: null, neighbors: [1, 2, 3, 4, 5, 6], x: 0, y: 0 },
  { id: 1, channel: null, neighbors: [0, 2, 6], x: 0, y: -80 },
  { id: 2, channel: null, neighbors: [0, 1, 3], x: 70, y: -40 },
  { id: 3, channel: null, neighbors: [0, 2, 4], x: 70, y: 40 },
  { id: 4, channel: null, neighbors: [0, 3, 5], x: 0, y: 80 },
  { id: 5, channel: null, neighbors: [0, 4, 6], x: -70, y: 40 },
  { id: 6, channel: null, neighbors: [0, 5, 1], x: -70, y: -40 },
];

const CHANNELS = [1, 6, 11];

const ChannelHex: React.FC<ChannelHexProps> = ({ onComplete }) => {
  const [cells, setCells] = useState<Cell[]>(INITIAL_CELLS);
  const [collisions, setCollisions] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  const handleCellClick = (id: number) => {
    if (completed) return;
    
    setCells(prev => prev.map(cell => {
      if (cell.id === id) {
        // Cycle next channel
        const currentIdx = cell.channel ? CHANNELS.indexOf(cell.channel) : -1;
        const nextChannel = CHANNELS[(currentIdx + 1) % CHANNELS.length];
        return { ...cell, channel: nextChannel };
      }
      return cell;
    }));
  };

  // Check collisions logic
  useEffect(() => {
    const newCollisions: number[] = [];
    let isFull = true;

    cells.forEach(cell => {
      if (!cell.channel) {
        isFull = false;
        return;
      }
      // Check neighbors
      const hasConflict = cell.neighbors.some(nId => {
        const neighbor = cells.find(c => c.id === nId);
        return neighbor && neighbor.channel === cell.channel;
      });

      if (hasConflict) {
        newCollisions.push(cell.id);
      }
    });

    setCollisions(newCollisions);

    if (isFull && newCollisions.length === 0 && !completed) {
      setCompleted(true);
      setTimeout(onComplete, 1000);
    }
  }, [cells, completed, onComplete]);

  const getChannelColor = (ch: number | null) => {
    switch (ch) {
      case 1: return 'bg-cyan-500 border-cyan-300 text-white';
      case 6: return 'bg-purple-500 border-purple-300 text-white';
      case 11: return 'bg-amber-500 border-amber-300 text-white';
      default: return 'bg-slate-700 border-slate-600 text-slate-500 hover:bg-slate-600';
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700 text-white max-w-xl mx-auto flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Hexagon className="w-5 h-5 text-pink-400" />
            Channel Planning
          </h3>
          <p className="text-slate-400 text-sm">Assign channels (1, 6, 11). No touching neighbors can share the same channel.</p>
        </div>
        
        {completed && (
           <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-500/50 flex items-center gap-2 font-bold text-sm animate-pulse">
              <CheckCircle2 className="w-4 h-4" /> Perfect Design
           </div>
        )}
      </div>

      <div className="relative w-80 h-80 flex items-center justify-center">
         {cells.map(cell => {
            const isCollision = collisions.includes(cell.id);
            return (
               <button
                  key={cell.id}
                  onClick={() => handleCellClick(cell.id)}
                  className={`
                     absolute w-24 h-24 flex items-center justify-center
                     transition-all duration-300 cursor-pointer
                     clip-path-hexagon
                  `}
                  style={{ transform: `translate(${cell.x}px, ${cell.y}px)` }}
               >
                  {/* Hexagon Shape Visual */}
                  <div className={`
                     w-[90%] h-[90%] flex flex-col items-center justify-center
                     clip-path-hexagon border-4 
                     ${getChannelColor(cell.channel)}
                     ${isCollision ? 'ring-4 ring-red-500 animate-shake' : ''}
                  `}>
                     {cell.channel ? (
                        <span className="text-2xl font-bold">{cell.channel}</span>
                     ) : (
                        <span className="text-xs font-bold opacity-50">SET</span>
                     )}
                     
                     {isCollision && <AlertTriangleIcon />}
                  </div>
               </button>
            );
         })}
      </div>

      <div className="mt-8 flex gap-4 text-sm text-slate-400">
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full"></div> Ch 1
         </div>
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div> Ch 6
         </div>
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div> Ch 11
         </div>
      </div>
      
      <style>{`
         .clip-path-hexagon {
            clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
         }
         @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
         }
         .animate-shake { animation: shake 0.2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

const AlertTriangleIcon = () => (
   <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 text-white shadow-sm">
      <AlertOctagon className="w-3 h-3" />
   </div>
);

export default ChannelHex;
