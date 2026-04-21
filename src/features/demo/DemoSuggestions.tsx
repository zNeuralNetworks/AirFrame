
import React from 'react';
import { 
  Lightbulb, 
  Target, 
  Map, 
  AlertTriangle, 
  Presentation, 
  Users, 
  Clock, 
  CheckCircle2,
  Building,
  ShieldCheck,
  MousePointer2,
  MicOff,
  Grid,
  Mic,
  Zap,
  LucideIcon,
  XCircle
} from 'lucide-react';
import { DEMO_SUGGESTIONS, DEMO_ANTI_PATTERNS } from '../../content/design-system/demo';
import { getIcon } from '../../shared/ui/IconRegistry';

const DemoSuggestions: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12 pb-32 animate-fade-in">
       {/* Header */}
       <div className="text-center">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-4">
             <Map className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Demo Strategy</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
             Content ideas for structuring the perfect product demonstration. Tailoring the narrative arc to the specific audience persona.
          </p>
       </div>

       {/* Tracks */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DEMO_SUGGESTIONS.map((track, idx) => {
             const Icon = getIcon(track.icon, Presentation);
             return (
             <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all group hover:border-indigo-200">
                <div className="flex justify-between items-start mb-6">
                   <div className="p-3 bg-slate-50 text-slate-700 rounded-2xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <Icon className="w-6 h-6" />
                   </div>
                   <div className={`px-3 py-1 rounded-full text-xs font-bold border ${track.risk === 'Low' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                      {track.risk} Risk
                   </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">{track.title}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                   <Users className="w-4 h-4" /> {track.audience}
                </div>

                <div className="space-y-4 mb-6">
                   {track.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-3">
                         <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></div>
                         <p className="text-sm text-slate-600 leading-relaxed">{pt}</p>
                      </div>
                   ))}
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                   <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {track.duration}</div>
                   <div className="flex items-center gap-1"><Target className="w-3 h-3" /> {track.focus}</div>
                </div>
             </div>
          )})}
       </div>

       {/* Anti-Patterns */}
       <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
          
          <div className="flex items-center gap-4 mb-8 relative z-10">
             <AlertTriangle className="w-8 h-8 text-red-400" />
             <h2 className="text-2xl font-bold">Demo Anti-Patterns</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
             {DEMO_ANTI_PATTERNS.map((item, idx) => {
                const Icon = getIcon(item.icon, AlertTriangle);
                return (
                <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col h-full hover:bg-white/10 transition-colors">
                   <div className="mb-4">
                      {item.icon === 'Presentation' && <Presentation className="w-5 h-5 text-red-300" />}
                      {item.icon === 'AlertTriangle' && <AlertTriangle className="w-5 h-5 text-red-300" />}
                      {item.icon === 'Users' && <Users className="w-5 h-5 text-red-300" />}
                      {item.icon === 'MousePointer2' && <MousePointer2 className="w-5 h-5 text-red-300" />}
                      {item.icon === 'MicOff' && <MicOff className="w-5 h-5 text-red-300" />}
                   </div>
                   <h3 className="font-bold text-lg text-red-200 mb-2 leading-tight">{item.title}</h3>
                   <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
             )})}
          </div>
       </div>

       {/* Feature Ideas (Keep static as they weren't in the data dump request specifically but good to check) */}
       <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-10 border border-indigo-100">
          <div className="flex items-center gap-4 mb-8">
             <Lightbulb className="w-8 h-8 text-indigo-600" />
             <h2 className="text-2xl font-bold text-slate-900">Future Content Ideas</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* 1. Build Your Demo */}
             <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="mt-1 p-2 bg-green-100 text-green-600 rounded-lg">
                   <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                   <h4 className="font-bold text-slate-900 mb-1">Interactive "Build Your Demo" Tool</h4>
                   <p className="text-sm text-slate-600 leading-relaxed">
                      A drag-and-drop interface where SEs can select the modules they want to show (e.g., "WIPS" + "Roaming") and the app generates a custom script and timeline.
                   </p>
                </div>
             </div>

             {/* 2. AI Voice Coach (Scorecard Replacement) */}
             <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="mt-1 p-2 bg-purple-100 text-purple-600 rounded-lg">
                   <Mic className="w-5 h-5" />
                </div>
                <div>
                   <h4 className="font-bold text-slate-900 mb-1">AI Voice Coach</h4>
                   <p className="text-sm text-slate-600 leading-relaxed">
                      Practice mode that listens to your microphone. It flags filler words ("um", "like"), measures speaking pace, and warns if you monologue for too long without pausing.
                   </p>
                </div>
             </div>

             {/* 3. Demo Bingo */}
             <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="mt-1 p-2 bg-green-100 text-green-600 rounded-lg">
                   <Grid className="w-5 h-5" />
                </div>
                <div>
                   <h4 className="font-bold text-slate-900 mb-1">Demo Bingo</h4>
                   <p className="text-sm text-slate-600 leading-relaxed">
                      A printable Bingo card for the audience (or internal peers) with buzzwords like "Single Pane of Glass", "AI/ML", "Zero Trust", and "Cloud Native". Keeps them listening.
                   </p>
                </div>
             </div>

             {/* 4. The 2-Minute Drill */}
             <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="mt-1 p-2 bg-green-100 text-green-600 rounded-lg">
                   <Clock className="w-5 h-5" />
                </div>
                <div>
                   <h4 className="font-bold text-slate-900 mb-1">"The 2-Minute Drill" Challenge</h4>
                   <p className="text-sm text-slate-600 leading-relaxed">
                      A timed mode where an SE must reach the "Root Cause" screen from login in under 120 seconds. Leaderboard for fastest explainers.
                   </p>
                </div>
             </div>

             {/* 5. The Objection Dojo (Append) */}
             <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="mt-1 p-2 bg-red-100 text-red-600 rounded-lg">
                   <Zap className="w-5 h-5" />
                </div>
                <div>
                   <h4 className="font-bold text-slate-900 mb-1">The Objection Dojo</h4>
                   <p className="text-sm text-slate-600 leading-relaxed">
                      Rapid-fire card game. A tough customer objection appears ("Cloud is insecure!"). You have 5 seconds to select the winning compliance fact or rebuttal.
                   </p>
                </div>
             </div>

             {/* 6. Scenario Roulette (Append) */}
             <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="mt-1 p-2 bg-amber-100 text-amber-600 rounded-lg">
                   <Target className="w-5 h-5" />
                </div>
                <div>
                   <h4 className="font-bold text-slate-900 mb-1">Scenario Roulette</h4>
                   <p className="text-sm text-slate-600 leading-relaxed">
                      Spin the wheel to generate a random persona ("Angry CIO") and outage ("DHCP Failure"). Improvise the demo flow on the spot to solve it.
                   </p>
                </div>
             </div>
          </div>
       </div>

    </div>
  );
};

export default DemoSuggestions;
