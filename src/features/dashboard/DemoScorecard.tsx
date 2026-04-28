
import React, { useState, useEffect } from 'react';
import { ClipboardCheck, CheckCircle2, AlertCircle, RefreshCw, Printer, Star, TrendingUp } from 'lucide-react';

const CRITERIA = [
  {
    category: "Preparation & Setup",
    items: [
      { id: 'p1', text: "Browser clean? (Incognito, no bookmarks bar, 100% zoom)", weight: 1 },
      { id: 'p2', text: "Notifications silenced? (Slack, Email, SMS)", weight: 1 },
      { id: 'p3', text: "Demo Cloud accessible? (No login timeouts)", weight: 2 },
    ]
  },
  {
    category: "The Opening (First 3 Mins)",
    items: [
      { id: 'o1', text: "Did I skip the corporate slide deck? (Jumped straight to UI)", weight: 2 },
      { id: 'o2', text: "Did I start with a 'Business Value' dashboard? (Not a config screen)", weight: 2 },
      { id: 'o3', text: "Did I confirm the audience's role and biggest pain point?", weight: 1 },
    ]
  },
  {
    category: "The Narrative",
    items: [
      { id: 'n1', text: "Did I use the 'Client Journey' to prove innocence? (MTTI)", weight: 3 },
      { id: 'n2', text: "Did I show a 'Root Cause' instead of just a symptom?", weight: 2 },
      { id: 'n3', text: "Did I avoid feature dumping? (Only showed relevant screens)", weight: 2 },
      { id: 'n4', text: "Did I use the 'Packet Capture' feature to show proof?", weight: 1 },
    ]
  },
  {
    category: "Closing & Handling",
    items: [
      { id: 'c1', text: "Did I handle objections with 'Feel, Felt, Found'?", weight: 1 },
      { id: 'c2', text: "Did I stop talking and let the customer drive? (Interactive)", weight: 2 },
      { id: 'c3', text: "Are next steps clearly defined? (POV, Quote, Deep Dive)", weight: 2 },
    ]
  }
];

const SCORECARD_KEY = 'airframe_scorecard_v1';

const calcTotal = (scores: Record<string, number>) => {
  let total = 0;
  CRITERIA.forEach(cat => cat.items.forEach(item => { total += (scores[item.id] || 0) * item.weight; }));
  return total;
};

const DemoScorecard: React.FC = () => {
  const [scores, setScores] = useState<Record<string, number>>(() => {
    try { return JSON.parse(localStorage.getItem(SCORECARD_KEY) || '{}'); } catch { return {}; }
  });
  const [maxScore, setMaxScore] = useState(0);

  useEffect(() => {
    let max = 0;
    CRITERIA.forEach(cat => cat.items.forEach(item => max += (item.weight * 2)));
    setMaxScore(max);
  }, []);

  const totalScore = calcTotal(scores);

  const handleScore = (id: string, rating: number) => {
    const newScores = { ...scores, [id]: rating };
    setScores(newScores);
    localStorage.setItem(SCORECARD_KEY, JSON.stringify(newScores));
  };

  const getRatingColor = (percentage: number) => {
    if (percentage >= 90) return 'text-apple-green';
    if (percentage >= 75) return 'text-brand-600';
    if (percentage >= 60) return 'text-apple-orange';
    return 'text-apple-red';
  };

  const getGrade = (percentage: number) => {
    if (percentage >= 95) return 'S (Ace)';
    if (percentage >= 90) return 'A (Expert)';
    if (percentage >= 80) return 'B (Solid)';
    if (percentage >= 70) return 'C (Passing)';
    return 'Needs Practice';
  };

  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  return (
    <div className="af-page-narrow">
      
      {/* Header */}
      <div className="af-page-header mb-10">
        <div className="af-heading-group">
           <div className="flex flex-wrap items-center gap-3 mb-2">
              <div className="p-2 bg-apple-indigo/10 text-apple-indigo rounded-lg">
                 <ClipboardCheck className="w-6 h-6" />
              </div>
              <h1 className="af-page-title">Demo Scorecard</h1>
              <span className="rounded-full border border-amber-300/70 bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                 BETA - Content being finalized
              </span>
           </div>
           <p className="af-page-subtitle">Self-evaluation tool for sales engineering excellence.</p>
        </div>

        <div className="flex gap-4 items-center">
           <button
             onClick={() => { setScores({}); localStorage.removeItem(SCORECARD_KEY); }}
             className="af-secondary-action bg-transparent border-transparent shadow-none"
           >
              <RefreshCw className="w-4 h-4" /> Reset
           </button>
           <button 
             onClick={() => window.print()}
             className="af-primary-action py-3"
           >
              <Printer className="w-4 h-4" /> Print Report
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Main Form */}
         <div className="lg:col-span-2 space-y-8">
            {CRITERIA.map((cat, idx) => (
               <div key={idx} className="af-card-compact">
                  <h3 className="af-card-title mb-4 pb-2 border-b border-border flex items-center gap-2">
                     <span className="w-6 h-6 rounded-full bg-app text-text-muted flex items-center justify-center text-xs">{idx + 1}</span>
                     {cat.category}
                  </h3>
                  <div className="space-y-6">
                     {cat.items.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                           <div className="flex-1">
                              <p className="text-text-secondary font-normal text-sm leading-6">{item.text}</p>
                              {item.weight > 1 && (
                                 <span className="af-meta text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded mt-1 inline-block">
                                    {item.weight}x Impact
                                 </span>
                              )}
                           </div>
                           <div className="flex gap-2 shrink-0">
                              {[0, 1, 2].map((rating) => {
                                 const isSelected = scores[item.id] === rating;
                                 let btnClass = "px-3 py-2 rounded-lg border text-xs font-semibold transition-all w-20 flex justify-center";
                                 
                                 if (rating === 0) btnClass += isSelected ? " bg-apple-red/10 border-apple-red text-apple-red" : " border-border text-text-muted hover:border-apple-red/40 hover:text-apple-red";
                                 if (rating === 1) btnClass += isSelected ? " bg-apple-orange/10 border-apple-orange text-apple-orange" : " border-border text-text-muted hover:border-apple-orange/40 hover:text-apple-orange";
                                 if (rating === 2) btnClass += isSelected ? " bg-apple-green/10 border-apple-green text-apple-green shadow-sm" : " border-border text-text-muted hover:border-apple-green/40 hover:text-apple-green";

                                 const label = rating === 0 ? "Missed" : rating === 1 ? "Okay" : "Nailed It";

                                 return (
                                    <button
                                       key={rating}
                                       onClick={() => handleScore(item.id, rating)}
                                       className={btnClass}
                                    >
                                       {label}
                                    </button>
                                 );
                              })}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            ))}
         </div>

         {/* Score Sidebar */}
         <div className="lg:col-span-1">
            <div className="bg-slate-900 text-white rounded-apple p-8 sticky top-8 shadow-xl">
               <div className="flex items-center gap-3 mb-6 opacity-80">
                  <TrendingUp className="w-5 h-5" />
                  <span className="af-eyebrow text-white/80">Performance</span>
               </div>
               
               <div className="text-center mb-8">
                  <div className={`text-5xl font-bold mb-2 ${getRatingColor(percentage)}`}>
                     {percentage}%
                  </div>
                  <div className="text-xl font-semibold text-white/80">{getGrade(percentage)}</div>
                  <div className="text-sm text-white/40 mt-1">{totalScore} / {maxScore} Points</div>
               </div>

               <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                     <h4 className="font-semibold text-brand-300 mb-1 flex items-center gap-2">
                        <Star className="w-4 h-4" /> Power Tip
                     </h4>
                     <p className="text-sm text-white/70 leading-6">
                        Don't obsess over perfection. Authenticity connects better than a scripted robot. If you make a mistake, own it and show how to fix it.
                     </p>
                  </div>

                  {percentage < 70 && (
                     <div className="p-4 bg-apple-red/10 rounded-xl border border-apple-red/30">
                        <h4 className="font-semibold text-apple-red mb-1 flex items-center gap-2">
                           <AlertCircle className="w-4 h-4" /> Focus Area
                        </h4>
                        <p className="text-sm text-white/70 leading-6">
                           You are missing key opportunities. Review the "The Golden Path" track in the Demo Roadmap to restructure your flow.
                        </p>
                     </div>
                  )}

                  {percentage >= 90 && (
                     <div className="p-4 bg-apple-green/10 rounded-xl border border-apple-green/30">
                        <h4 className="font-semibold text-apple-green mb-1 flex items-center gap-2">
                           <CheckCircle2 className="w-4 h-4" /> Ready for Launch
                        </h4>
                        <p className="text-sm text-white/70 leading-6">
                           Excellent work. You are telling a compelling story, not just showing features. Go close the deal.
                        </p>
                     </div>
                  )}
               </div>
            </div>
         </div>

      </div>
    </div>
  );
};

export default DemoScorecard;
