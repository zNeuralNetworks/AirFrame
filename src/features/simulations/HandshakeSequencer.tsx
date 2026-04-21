
import React, { useState } from 'react';
import { Key, ArrowDown, CheckCircle2, RotateCcw } from 'lucide-react';

interface HandshakeSequencerProps {
  onComplete: () => void;
}

interface Frame {
  id: string;
  label: string;
  desc: string;
}

const CORRECT_ORDER = ['m1', 'm2', 'm3', 'm4'];

const FRAMES: Frame[] = [
  { id: 'm1', label: 'Message 1', desc: 'AP sends Anonce to Client' },
  { id: 'm2', label: 'Message 2', desc: 'Client sends Snonce + MIC to AP' },
  { id: 'm3', label: 'Message 3', desc: 'AP sends GTK + MIC to Client' },
  { id: 'm4', label: 'Message 4', desc: 'Client confirms ("Ack")' },
];

const HandshakeSequencer: React.FC<HandshakeSequencerProps> = ({ onComplete }) => {
  // Shuffle initially
  const [available, setAvailable] = useState<Frame[]>(() => [...FRAMES].sort(() => Math.random() - 0.5));
  const [slots, setSlots] = useState<(Frame | null)[]>([null, null, null, null]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDrop = (frame: Frame, slotIndex: number) => {
    if (isSuccess) return;
    const newSlots = [...slots];
    // If slot occupied, return item to available
    if (newSlots[slotIndex]) {
       setAvailable(prev => [...prev, newSlots[slotIndex]!]);
    }
    newSlots[slotIndex] = frame;
    setSlots(newSlots);
    setAvailable(prev => prev.filter(f => f.id !== frame.id));

    // Check win
    if (newSlots.every(s => s !== null)) {
       const currentOrder = newSlots.map(s => s!.id);
       if (JSON.stringify(currentOrder) === JSON.stringify(CORRECT_ORDER)) {
          setIsSuccess(true);
          setTimeout(onComplete, 1000);
       }
    }
  };

  const handleRemove = (slotIndex: number) => {
     if (isSuccess) return;
     const frame = slots[slotIndex];
     if (frame) {
        setAvailable(prev => [...prev, frame]);
        const newSlots = [...slots];
        newSlots[slotIndex] = null;
        setSlots(newSlots);
     }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700 text-white max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Key className="w-5 h-5 text-yellow-400" />
            WPA2 4-Way Handshake
          </h3>
          <p className="text-slate-400 text-sm">Drag the frames into the correct chronological order.</p>
        </div>
        {isSuccess && (
           <div className="flex items-center gap-2 text-green-400 font-bold animate-pulse">
              <CheckCircle2 className="w-6 h-6" /> Keys Installed!
           </div>
        )}
      </div>

      <div className="flex gap-4 mb-8">
         <div className="w-16 flex flex-col justify-between py-4 text-center text-xs font-bold text-slate-500">
            <span>START</span>
            <ArrowDown className="w-4 h-4 mx-auto opacity-50" />
            <ArrowDown className="w-4 h-4 mx-auto opacity-50" />
            <ArrowDown className="w-4 h-4 mx-auto opacity-50" />
            <span>END</span>
         </div>
         <div className="flex-1 space-y-3">
            {slots.map((slot, idx) => (
               <div 
                  key={idx}
                  onClick={() => handleRemove(idx)}
                  className={`
                     h-16 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-all
                     ${slot 
                        ? (isSuccess ? 'bg-green-500/20 border-green-500' : 'bg-slate-800 border-slate-600') 
                        : 'border-slate-700 bg-slate-900/50 hover:bg-slate-800'}
                  `}
               >
                  {slot ? (
                     <div className="text-center">
                        <div className="font-bold text-yellow-400">{slot.label}</div>
                        <div className="text-xs text-slate-400">{slot.desc}</div>
                     </div>
                  ) : (
                     <span className="text-slate-600 text-xs font-bold uppercase">Slot {idx + 1}</span>
                  )}
               </div>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4 bg-slate-800 rounded-xl border border-slate-600">
         {available.length === 0 && !isSuccess && <div className="col-span-2 text-center text-sm text-slate-500">All frames placed. Check order.</div>}
         {available.map(frame => (
            <button
               key={frame.id}
               onClick={() => {
                  const firstEmpty = slots.findIndex(s => s === null);
                  if (firstEmpty !== -1) handleDrop(frame, firstEmpty);
               }}
               className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg border border-slate-500 text-left transition-colors"
            >
               <div className="font-bold text-sm text-white">{frame.label}</div>
               <div className="text-[10px] text-slate-300">{frame.desc}</div>
            </button>
         ))}
      </div>
    </div>
  );
};

export default HandshakeSequencer;
