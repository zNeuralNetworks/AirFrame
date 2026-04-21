
import React, { useState, useEffect } from 'react';
import { Power, Router, Terminal, Plus, XCircle } from 'lucide-react';

interface PoeBudgetSimProps {
  onComplete: () => void;
}

const PoeBudgetSim: React.FC<PoeBudgetSimProps> = ({ onComplete }) => {
  const TOTAL_BUDGET = 740;
  const AP_DRAW = 20;
  const PORT_COUNT = 48;

  const [budget, setBudget] = useState(TOTAL_BUDGET);
  const [aps, setAps] = useState<{ port: number; status: 'powered' | 'denied' }[]>([]);
  const [log, setLog] = useState<string[]>(['[System] PoE Switch Initialized. Budget: 740W.']);
  const [isComplete, setIsComplete] = useState(false);

  const addLog = (message: string) => {
    setLog(prev => [message, ...prev].slice(0, 10));
  };

  const handleAddAp = () => {
    if (aps.length >= PORT_COUNT) return;

    const port = aps.length + 1;

    if (budget >= AP_DRAW) {
      const newBudget = budget - AP_DRAW;
      setBudget(newBudget);
      setAps([...aps, { port, status: 'powered' }]);
      addLog(`[Port ${port}] AP connected. Requesting ${AP_DRAW}W... GRANTED. New budget: ${newBudget}W.`);
    } else {
      setAps([...aps, { port, status: 'denied' }]);
      addLog(`[Port ${port}] AP connected. Requesting ${AP_DRAW}W... DENIED (Budget Exceeded).`);
      if (!isComplete) {
        onComplete();
        setIsComplete(true);
      }
    }
  };

  const budgetPercentage = (budget / TOTAL_BUDGET) * 100;

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700 text-white w-full h-full min-h-[500px] flex flex-col font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Power className="w-5 h-5 text-green-400" />
            The Hungry Switch
          </h3>
          <p className="text-slate-400 text-sm">Fill the switch until the PoE budget is exceeded.</p>
        </div>
        <button
          onClick={handleAddAp}
          disabled={aps.length >= PORT_COUNT}
          className="flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition-all shadow-md disabled:opacity-50"
        >
          <Plus className="w-5 h-5" /> Add AP
        </button>
      </div>

      {/* Budget Meter */}
      <div className="mb-6">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-sm font-bold text-slate-300">PoE Budget Remaining</span>
          <span className={`text-2xl font-mono font-bold ${budget < AP_DRAW ? 'text-red-500' : 'text-green-400'}`}>
            {budget}W / {TOTAL_BUDGET}W
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-4 border border-slate-600 shadow-inner">
          <div
            className={`h-4 rounded-full transition-all duration-500 ${budgetPercentage > 20 ? 'bg-green-500' : 'bg-red-500'}`}
            style={{ width: `${budgetPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Switch Visual */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 mb-6">
        <h4 className="text-xs text-slate-500 uppercase font-bold mb-3">48-Port PoE+ Switch</h4>
        <div className="grid grid-cols-12 gap-2">
          {[...Array(PORT_COUNT)].map((_, i) => {
            const ap = aps.find(a => a.port === i + 1);
            let statusClass = 'bg-slate-900/50';
            let icon = null;
            if (ap) {
              if (ap.status === 'powered') {
                statusClass = 'bg-green-500/20';
                icon = <Router className="w-4 h-4 text-green-400 animate-pulse" />;
              } else {
                statusClass = 'bg-red-500/20 animate-pulse';
                icon = <XCircle className="w-4 h-4 text-red-500" />;
              }
            }
            return (
              <div key={i} className={`h-8 rounded flex items-center justify-center transition-colors ${statusClass}`}>
                {icon}
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Log */}
      <div>
        <h4 className="text-sm font-bold flex items-center gap-2 mb-3 text-slate-300">
          <Terminal className="w-4 h-4" /> Live Log
        </h4>
        <div className="bg-black/50 rounded-lg p-4 font-mono text-xs h-32 overflow-y-auto flex flex-col-reverse border border-slate-700">
          {log.map((msg, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap ${msg.includes('DENIED') ? 'text-red-400' : msg.includes('GRANTED') ? 'text-green-400' : 'text-slate-400'}`}
            >
              <span className="text-slate-600 mr-2">{'>'}</span>{msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PoeBudgetSim;
