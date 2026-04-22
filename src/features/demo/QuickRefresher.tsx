
import React, { useState, lazy, Suspense } from 'react';
import { Zap, GitCompare, ShieldCheck, Target, Key, Box, Network, ArrowRightLeft, Eye, EyeOff } from 'lucide-react';
import { COMPARISON_DATA, WIFI7_TALKING_POINTS } from '../../content/comparisons';

const OFDMAVisualizer = lazy(() => import('../../components/OFDMAVisualizer'));

const QuickRefresher: React.FC = () => {
  const options = Object.keys(COMPARISON_DATA);
  const [compareA, setCompareA] = useState('Wi-Fi 6E (802.11ax)');
  const [compareB, setCompareB] = useState('Wi-Fi 7 (802.11be)');
  const [studyMode, setStudyMode] = useState(false);
  const [revealedSpecs, setRevealedSpecs] = useState<Record<string, boolean>>({});

  const toggleReveal = (key: string) => {
    setRevealedSpecs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const dataA = COMPARISON_DATA[compareA];
  const dataB = COMPARISON_DATA[compareB];
  const comparisonKeys = dataA ? Object.keys(dataA) : [];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8 pb-32">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-brand-600">
             <Zap className="w-5 h-5 fill-current" />
             <span className="small-caps text-[10px]">Reference System</span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">Field Notes</h1>
          <p className="text-text-muted text-sm mt-1">Rapid pre-call technical alignment and differentiator reference.</p>
        </div>
        <button
          onClick={() => setStudyMode(!studyMode)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            studyMode ? 'bg-brand-600 text-white shadow-lg' : 'bg-app text-text-secondary hover:bg-border'
          }`}
        >
          {studyMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          {studyMode ? 'Study Mode: ON' : 'Study Mode: OFF'}
        </button>
      </header>

      {/* Comparison Engine */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-text-muted" />
            <h2 className="text-sm font-bold text-text-primary uppercase tracking-widest">Spec Comparison</h2>
          </div>

          <div className="flex items-center gap-1 bg-surface p-1 rounded-xl border border-border shadow-sm">
            <select
              value={compareA}
              onChange={(e) => setCompareA(e.target.value)}
              className="bg-transparent text-[11px] font-bold text-text-primary px-2 py-1 focus:outline-none cursor-pointer hover:bg-app rounded-lg transition-colors"
            >
              {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ArrowRightLeft className="w-3 h-3 text-text-muted mx-0.5" />
            <select
              value={compareB}
              onChange={(e) => setCompareB(e.target.value)}
              className="bg-transparent text-[11px] font-bold text-text-primary px-2 py-1 focus:outline-none cursor-pointer hover:bg-app rounded-lg transition-colors"
            >
              {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        <div className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden transform transition-all">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface/50 border-b border-border">
                <th className="p-3 text-[10px] small-caps w-1/4">Metric</th>
                <th className="p-3 text-[10px] small-caps text-brand-600">{compareA}</th>
                <th className="p-3 text-[10px] small-caps text-indigo-500">{compareB}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {comparisonKeys.map(key => {
                const valA = dataA[key as keyof typeof dataA];
                const valB = dataB[key as keyof typeof dataB];
                const isDifferent = valA !== valB;
                const isMasked = studyMode && !revealedSpecs[key];

                return (
                  <tr key={key} className={`group transition-colors ${isDifferent ? 'bg-brand-500/5' : 'hover:bg-app'}`}>
                    <td className="p-3">
                      <div className="text-[11px] font-bold text-text-muted uppercase tracking-tight">{key}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-mono text-[11px] text-text-secondary">{valA}</div>
                    </td>
                    <td className="p-3">
                      <div
                        onClick={() => studyMode && toggleReveal(key)}
                        className={`font-mono text-[11px] transition-all ${
                          isDifferent ? 'text-indigo-500 font-bold' : 'text-text-secondary'
                        } ${isMasked ? 'study-reveal-btn masked px-2 py-0.5 rounded' : 'study-reveal-btn'}`}
                      >
                        {valB}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Wi-Fi 7 Talking Points - High Authority Cards */}
        {(compareA.includes('Wi-Fi 7') || compareB.includes('Wi-Fi 7')) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-5">
              <span className="small-caps text-[9px] text-brand-500 block mb-2">{WIFI7_TALKING_POINTS.technical.title}</span>
              <ul className="space-y-2">
                {WIFI7_TALKING_POINTS.technical.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12px] text-brand-600 leading-snug font-medium">
                    <div className="mt-1.5 w-1 h-1 rounded-full bg-brand-400 shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white shadow-xl">
              <span className="small-caps text-[9px] text-brand-400 block mb-2">{WIFI7_TALKING_POINTS.executive.title}</span>
              <ul className="space-y-2">
                {WIFI7_TALKING_POINTS.executive.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12px] text-slate-200 leading-snug">
                    <div className="mt-1.5 w-1 h-1 rounded-full bg-brand-500 shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* Visual Insight - High Density */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Box className="w-4 h-4 text-text-muted" />
          <h2 className="text-sm font-bold text-text-primary uppercase tracking-widest">Efficiency Dynamics</h2>
        </div>
        <div className="scale-[0.9] origin-top-left -mb-[5%]">
          <Suspense fallback={<div className="h-64 bg-app flex items-center justify-center text-text-muted">Loading Visualizer...</div>}>
            <OFDMAVisualizer />
          </Suspense>
        </div>
      </section>

      {/* Kill-Shot Insights */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-text-muted" />
          <h2 className="text-sm font-bold text-text-primary uppercase tracking-widest">Killer Differentiators</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="kill-shot-card p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <ShieldCheck className="w-16 h-16" />
                </div>
                <span className="small-caps text-[10px] text-brand-400 mb-2 block">Security Supremacy</span>
                <h3 className="text-xl font-bold mb-3 tracking-tight">Deterministic WIPS</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                   Other systems guess. Arista proves. Our <strong>Marker Packet</strong> technology ensures zero false positives by correlating wired and wireless data.
                </p>
                <div className="bg-white/5 rounded-lg p-3 font-mono text-[10px] text-brand-300 border border-white/5 italic">
                   "If Arista hears the marker, it's 100% a rogue. Block with confidence."
                </div>
            </div>
            <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm relative group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Target className="w-16 h-16" />
                </div>
                <span className="small-caps text-[10px] text-indigo-500 mb-2 block">Operational Edge</span>
                <h3 className="text-xl font-bold text-text-primary mb-3 tracking-tight">Mean Time to Innocence</h3>
                <p className="text-text-secondary text-xs leading-relaxed mb-4">
                   The #1 goal in Wi-Fi troubleshooting is proving it's NOT the Wi-Fi. The <strong>Client Journey</strong> provides the undeniable proof.
                </p>
                <div className="grid grid-cols-3 gap-2 text-center text-[9px] font-bold">
                    <div className="bg-app p-2 rounded border border-border text-text-muted">RF OK</div>
                    <div className="bg-app p-2 rounded border border-border text-text-muted">AUTH OK</div>
                    <div className="bg-rose-50 p-2 rounded border border-rose-100 text-rose-600 font-mono dark:bg-rose-500/10 dark:border-rose-500/20 dark:text-rose-400">DHCP FAIL</div>
                </div>
            </div>
        </div>
      </section>

      {/* Roaming & Concepts - Compact Grid */}
      <section className="bg-app/50 rounded-2xl p-6 border border-border">
        <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-6 border-b border-border pb-2">The Roaming Trinity</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-indigo-500"><Key className="w-3.5 h-3.5"/> <h4 className="font-bold text-xs uppercase">802.11k</h4></div>
                <p className="text-[11px] text-text-muted leading-relaxed font-medium">Neighbor Reports (The Map).</p>
                <p className="text-[10px] text-text-tertiary italic leading-snug">Clients get a tailored list of nearby APs to minimize scanning time.</p>
            </div>
            <div className="space-y-2 border-l border-border pl-8">
                <div className="flex items-center gap-2 text-indigo-500"><Box className="w-3.5 h-3.5"/> <h4 className="font-bold text-xs uppercase">802.11v</h4></div>
                <p className="text-[11px] text-text-muted leading-relaxed font-medium">BSS Transition (The Nudge).</p>
                <p className="text-[10px] text-text-tertiary italic leading-snug">The AP suggests a better target to the client to optimize performance.</p>
            </div>
            <div className="space-y-2 border-l border-border pl-8">
                <div className="flex items-center gap-2 text-indigo-500"><Network className="w-3.5 h-3.5"/> <h4 className="font-bold text-xs uppercase">802.11r</h4></div>
                <p className="text-[11px] text-text-muted leading-relaxed font-medium">Fast Transition (The Keys).</p>
                <p className="text-[10px] text-text-tertiary italic leading-snug">Pre-caches security keys to enable sub-50ms roams for seamless voice.</p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default QuickRefresher;
