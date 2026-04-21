
import React, { useRef, useEffect, useState } from 'react';
import { RefreshCw, CheckCircle, HelpCircle } from 'lucide-react';

interface WaveMatchProps {
  onComplete: () => void;
}

const WaveMatch: React.FC<WaveMatchProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frequency, setFrequency] = useState(50);
  const [amplitude, setAmplitude] = useState(50);
  const [targetFreq] = useState(Math.floor(Math.random() * 60) + 20); // Random target
  const [targetAmp] = useState(Math.floor(Math.random() * 60) + 20); // Random target
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Check for win condition
  useEffect(() => {
    const freqDiff = Math.abs(frequency - targetFreq);
    const ampDiff = Math.abs(amplitude - targetAmp);
    
    if (freqDiff < 5 && ampDiff < 5 && !isSuccess) {
      setIsSuccess(true);
      onComplete();
    }
  }, [frequency, amplitude, targetFreq, targetAmp, isSuccess, onComplete]);

  // Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Draw Grid
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < width; i += 40) { ctx.moveTo(i, 0); ctx.lineTo(i, height); }
      for (let i = 0; i < height; i += 40) { ctx.moveTo(0, i); ctx.lineTo(width, i); }
      ctx.stroke();

      // Draw Target Wave (Ghost)
      ctx.strokeStyle = 'rgba(203, 213, 225, 0.5)'; // Slate-300 transparent
      ctx.lineWidth = 4;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin((x + time * 20) * (targetFreq * 0.001)) * targetAmp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw User Wave
      ctx.strokeStyle = isSuccess ? '#22c55e' : '#0ea5e9'; // Green if success, Blue otherwise
      ctx.lineWidth = 4;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        // Frequency multiplier adjusted for visual scaling
        const y = centerY + Math.sin((x + time * 20) * (frequency * 0.001)) * amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [frequency, amplitude, targetFreq, targetAmp, isSuccess]);

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700 text-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <RefreshCw className={`w-5 h-5 ${isSuccess ? 'text-green-400' : 'text-cyan-400'}`} />
            Wave Lab <span className="text-xs bg-cyan-900 text-cyan-200 px-2 py-0.5 rounded uppercase">Simulation</span>
          </h3>
          <p className="text-slate-400 text-sm">Match the ghost wave to sync the signal.</p>
        </div>
        {isSuccess && (
          <div className="flex items-center gap-2 text-green-400 font-bold bg-green-900/30 px-3 py-1 rounded-full border border-green-500/50">
            <CheckCircle className="w-5 h-5" />
            Signal Locked
          </div>
        )}
      </div>

      <div className="relative w-full h-64 bg-slate-800 rounded-xl overflow-hidden mb-6 border border-slate-700 shadow-inner">
        <canvas 
          ref={canvasRef} 
          width={600} 
          height={256} 
          className="w-full h-full"
        />
        {showHint && (
           <div className="absolute top-2 right-2 bg-black/70 text-xs p-2 rounded max-w-[200px]">
              Tip: Match the height (Amplitude) and the tightness of the loops (Frequency).
           </div>
        )}
        <button 
           onClick={() => setShowHint(!showHint)}
           className="absolute bottom-2 right-2 p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
           <HelpCircle className="w-4 h-4 text-slate-300" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <label className="text-cyan-300">Frequency (Hz)</label>
            <span className="text-slate-400">{frequency}</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={frequency} 
            onChange={(e) => setFrequency(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400"
          />
          <p className="text-xs text-slate-500">Controls the number of cycles per second (pitch).</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <label className="text-purple-300">Amplitude (Power)</label>
            <span className="text-slate-400">{amplitude}</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={amplitude} 
            onChange={(e) => setAmplitude(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400"
          />
          <p className="text-xs text-slate-500">Controls the signal strength (loudness).</p>
        </div>
      </div>
    </div>
  );
};

export default WaveMatch;
