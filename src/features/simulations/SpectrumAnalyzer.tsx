
import React, { useRef, useEffect, useState } from 'react';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';

interface SpectrumAnalyzerProps {
  onComplete: () => void;
}

const SpectrumAnalyzer: React.FC<SpectrumAnalyzerProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [identified, setIdentified] = useState(false);
  const [interfererType, setInterfererType] = useState<'none' | 'radar' | 'microwave'>('radar');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;
    let time = 0;

    const render = () => {
      time += 0.02;
      // White background for light theme
      ctx.fillStyle = '#FFFFFF'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid - Light gray
      ctx.strokeStyle = '#E2E8F0'; // slate-200
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 50) { ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); }
      for (let y = 0; y < canvas.height; y += 50) { ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); }
      ctx.stroke();

      // Draw Noise Floor - Darker gray
      ctx.strokeStyle = '#94A3B8'; // slate-400
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const noise = Math.random() * 10 + (canvas.height - 30);
        if (x === 0) ctx.moveTo(x, noise); else ctx.lineTo(x, noise);
      }
      ctx.stroke();

      // Draw Wi-Fi Signals (Static-ish) - Blue
      const drawSignal = (centerX: number, width: number, height: number, color: string) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(centerX - width / 2, canvas.height - 30);
        ctx.quadraticCurveTo(centerX, canvas.height - 30 - height, centerX + width / 2, canvas.height - 30);
        ctx.fill();
      };

      // Channel 1, 6, 11 - Brand Blue with opacity
      drawSignal(100, 60, 100, 'rgba(14, 165, 233, 0.2)'); 
      drawSignal(300, 60, 120, 'rgba(14, 165, 233, 0.2)');
      drawSignal(500, 60, 90, 'rgba(14, 165, 233, 0.2)');

      // Draw Interference
      if (interfererType === 'radar') {
         // Sweeping pulse - Red
         const pos = (time * 100) % (canvas.width + 100) - 50;
         ctx.fillStyle = 'rgba(239, 68, 68, 0.6)'; // Red-500
         ctx.fillRect(pos, 50, 40, canvas.height);
      } else if (interfererType === 'microwave') {
         // Broad noise - Orange
         ctx.fillStyle = 'rgba(249, 115, 22, 0.2)'; // Orange-500
         for (let i = 0; i < 20; i++) {
             const w = Math.random() * 200 + 100;
             const h = Math.random() * 50 + 50;
             const x = 300 + Math.random() * 50;
             ctx.fillRect(x, canvas.height - 30 - h, w, h);
         }
      }

      frameId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(frameId);
  }, [interfererType]);

  const handleIdentify = (guess: string) => {
    if (guess === interfererType) {
      setIdentified(true);
      onComplete();
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 text-slate-900 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-600" />
            Spectrum Analyzer
          </h3>
          <p className="text-slate-500 text-sm">Identify the interference pattern impacting the Wi-Fi spectrum.</p>
        </div>
        {identified && (
          <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full border border-green-200">
            <CheckCircle className="w-5 h-5" />
            Threat Neutralized
          </div>
        )}
      </div>

      <div className="relative w-full h-64 bg-white rounded-xl overflow-hidden mb-6 border border-slate-300 shadow-inner">
        <canvas ref={canvasRef} width={600} height={256} className="w-full h-full" />
        <div className="absolute bottom-2 left-2 text-[10px] text-slate-400 font-mono">2.412 GHz</div>
        <div className="absolute bottom-2 right-2 text-[10px] text-slate-400 font-mono">2.472 GHz</div>
      </div>

      {!identified && (
         <div className="grid grid-cols-2 gap-4">
            <button 
               onClick={() => handleIdentify('microwave')}
               className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-3 transition-colors text-left"
            >
               <div className="p-2 bg-orange-100 rounded text-orange-600"><AlertTriangle className="w-5 h-5" /></div>
               <div>
                  <div className="font-bold text-sm text-slate-900">Microwave Oven</div>
                  <div className="text-xs text-slate-500">Broadband noise across upper channels</div>
               </div>
            </button>
            <button 
               onClick={() => handleIdentify('radar')}
               className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-3 transition-colors text-left"
            >
               <div className="p-2 bg-red-100 rounded text-red-600"><Activity className="w-5 h-5" /></div>
               <div>
                  <div className="font-bold text-sm text-slate-900">Radar Pulse</div>
                  <div className="text-xs text-slate-500">Sweeping signal, narrow duty cycle</div>
               </div>
            </button>
         </div>
      )}
    </div>
  );
};

export default SpectrumAnalyzer;
