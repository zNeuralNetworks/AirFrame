
import React, { useState } from 'react';
import { History, CheckCircle2, RefreshCw, ArrowDown } from 'lucide-react';

interface TimelinePuzzleProps {
  onComplete: () => void;
}

interface Protocol {
  id: string;
  name: string;
  year: string;
  feature: string;
  speed: string;
}

const SOLUTION: Protocol[] = [
  { id: 'b', name: '802.11b', year: '1999', feature: 'DSSS', speed: '11 Mbps' },
  { id: 'g', name: '802.11g', year: '2003', feature: 'OFDM', speed: '54 Mbps' },
  { id: 'n', name: '802.11n', year: '2009', feature: 'MIMO', speed: '600 Mbps' },
  { id: 'ac', name: '802.11ac', year: '2013', feature: 'Beamforming', speed: '6.9 Gbps' },
  { id: 'ax', name: '802.11ax', year: '2019', feature: 'OFDMA', speed: '9.6 Gbps' },
  { id: 'be', name: '802.11be', year: '2024', feature: 'MLO', speed: '46 Gbps' },
];

const TimelinePuzzle: React.FC<TimelinePuzzleProps> = ({ onComplete }) => {
  // Fisher-Yates shuffle
  const [items, setItems] = useState<Protocol[]>(() => 
    [...SOLUTION].sort(() => Math.random() - 0.5)
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (isSuccess) return;
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newItems.length) {
      [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
      setItems(newItems);
      checkSolution(newItems);
    }
  };

  const checkSolution = (currentItems: Protocol[]) => {
    const isCorrect = currentItems.every((item, index) => item.id === SOLUTION[index].id);
    if (isCorrect) {
      setIsSuccess(true);
      setTimeout(onComplete, 1000);
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700 text-white max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <History className="w-5 h-5 text-brand-400" />
            Protocol Timeline
          </h3>
          <p className="text-slate-400 text-sm">Sort the Wi-Fi generations from Oldest (Top) to Newest (Bottom).</p>
        </div>
        {isSuccess && (
          <div className="flex items-center gap-2 text-green-400 bg-green-900/30 px-3 py-1 rounded-full text-xs font-bold border border-green-500/50 animate-pulse">
             <CheckCircle2 className="w-4 h-4" /> Timeline Restored
          </div>
        )}
      </div>

      <div className="space-y-2">
        {items.map((item, index) => {
           const isCorrectPos = item.id === SOLUTION[index].id;
           return (
            <div 
              key={item.id}
              className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 ${
                 isSuccess 
                 ? 'bg-green-500/10 border-green-500/30' 
                 : 'bg-slate-800 border-slate-600 hover:border-slate-500'
              }`}
            >
              <div className="flex flex-col gap-1">
                 <button 
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0 || isSuccess}
                    className="p-1 hover:bg-slate-700 rounded disabled:opacity-20"
                 >
                    <ArrowDown className="w-4 h-4 rotate-180" />
                 </button>
                 <button 
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === items.length - 1 || isSuccess}
                    className="p-1 hover:bg-slate-700 rounded disabled:opacity-20"
                 >
                    <ArrowDown className="w-4 h-4" />
                 </button>
              </div>

              <div className="flex-1">
                 <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-lg text-white">{item.name}</h4>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${isSuccess ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                       {item.year}
                    </span>
                 </div>
                 <div className="flex gap-4 mt-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span> {item.feature}</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> {item.speed}</span>
                 </div>
              </div>

              {isSuccess && (
                 <CheckCircle2 className="w-6 h-6 text-green-500" />
              )}
            </div>
           );
        })}
      </div>
    </div>
  );
};

export default TimelinePuzzle;
