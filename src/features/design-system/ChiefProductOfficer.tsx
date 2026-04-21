
import React from 'react';
import { Target, Users, Zap, TrendingUp, Shield, Rocket, Layout, Box, Telescope, Cpu, BrainCircuit, CheckCircle } from 'lucide-react';

const ChiefProductOfficer: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-16 pb-32 animate-fade-in bg-slate-50 min-h-screen">
      
      {/* Manifesto Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center p-3 bg-brand-600 text-white rounded-2xl mb-6 shadow-lg shadow-brand-200">
             <Layout className="w-8 h-8" />
        </div>
        <div className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-widest mb-4 border border-brand-100">
            Strategy Memo 2.4
        </div>
        <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            From "Simulator"<br/>to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">Reasoning Engine</span>
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed font-medium">
          We aren't just teaching users how to configure Arista. We are giving them a physics engine for their intuition.
        </p>
      </div>

      {/* The Core Shift */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-slate-50 rounded-full -mr-32 -mt-32 z-0"></div>
         <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">The Pivot</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                    In v1.0, we built "Simulations" (large, heavy labs). We found that users would skip them because they felt like "homework".
                </p>
                <p className="text-slate-600 leading-relaxed font-medium">
                    In v2.4, we pivoted to <span className="text-brand-600">"Micro-Visuals"</span>. Instead of a separate lab, we inject interactive physics directly into the reading flow using the Token Engine.
                </p>
            </div>
            <div className="bg-slate-900 rounded-2xl p-6 text-white font-mono text-sm shadow-2xl border border-slate-700">
                <div className="text-slate-500 mb-2">// The Content Engine</div>
                <div className="text-green-400"># The Decibel Code</div>
                <div className="text-slate-300 pl-4">RF power is logarithmic...</div>
                <div className="bg-brand-900/30 text-brand-300 p-2 rounded my-2 border border-brand-500/30">
                    [[Visual:DecibelVisualizer]]
                </div>
                <div className="text-slate-300 pl-4">Notice how -3dB cuts power in half.</div>
            </div>
         </div>
      </div>

      {/* Strategic Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 flex flex-col h-full">
          <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 shadow-sm">
             <BrainCircuit className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-indigo-900 mb-3">1. Hybrid Navigation</h3>
          <p className="text-indigo-700/80 leading-relaxed text-sm flex-1">
            We solved the "Linear vs Reference" conflict. Rookies get the <strong>Mission Log</strong> (Step-by-step). Experts get the <strong>Galaxy Map</strong> (Knowledge Graph). Both coexist.
          </p>
        </div>
        
        <div className="bg-violet-50 p-8 rounded-3xl border border-violet-100 flex flex-col h-full">
          <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center text-violet-600 mb-6 shadow-sm">
             <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-violet-900 mb-3">2. Mean Time to Innocence</h3>
          <p className="text-violet-700/80 leading-relaxed text-sm flex-1">
            Our demo track now focuses entirely on "MTTI". We don't sell "Speed"; we sell "Proof". The <strong>Client Journey</strong> view is our killer feature.
          </p>
        </div>

        <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100 flex flex-col h-full">
          <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center text-orange-600 mb-6 shadow-sm">
             <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-orange-900 mb-3">3. Cognitive Load Balancing</h3>
          <p className="text-orange-700/80 leading-relaxed text-sm flex-1">
            Packet the Corgi is not decoration. He is a stress buffer. When complexity spikes (Math/Physics), we increase the whimsy to keep the user engaged.
          </p>
        </div>
      </div>

      {/* Roadmap */}
      <div className="border-t border-slate-200 pt-16">
         <div className="flex items-center gap-4 mb-8">
            <div className="p-2 bg-slate-900 text-white rounded-lg"><Rocket className="w-6 h-6" /></div>
            <h2 className="text-2xl font-bold text-slate-900">Execution Roadmap</h2>
         </div>
         <div className="space-y-6">
            <div className="flex gap-6 items-start p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
               <div className="w-16 text-center font-bold text-slate-400 text-lg">Q1</div>
               <div className="flex-1">
                  <h4 className="font-bold text-lg text-slate-900">Objection Dojo</h4>
                  <p className="text-slate-500 text-sm mt-1">An interactive flashcard system for practicing rebuttals to common customer objections (e.g., "Cloud isn't secure," "Why do I need Wi-Fi 6E?").</p>
               </div>
               <div className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full border border-slate-200">PLANNED</div>
            </div>

            <div className="flex gap-6 items-start p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
               <div className="w-16 text-center font-bold text-slate-400 text-lg">Q2</div>
               <div className="flex-1">
                  <h4 className="font-bold text-lg text-slate-900">Demo Flow Architect</h4>
                  <p className="text-slate-500 text-sm mt-1">A tool to generate tailored demo scripts. Select a customer vertical (e.g., Healthcare) and time constraint to get a "Golden Path" of talking points and features.</p>
               </div>
               <div className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full border border-slate-200">PLANNED</div>
            </div>

            <div className="flex gap-6 items-start p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
               <div className="w-16 text-center font-bold text-slate-400 text-lg">Q3</div>
               <div className="flex-1">
                  <h4 className="font-bold text-lg text-slate-900">The Scenario Foundry</h4>
                  <p className="text-slate-500 text-sm mt-1">An engine to procedurally generate infinite variations of network problems. Prevents memorization and builds true reasoning skills.</p>
               </div>
               <div className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full border border-slate-200">PLANNED</div>
            </div>

            <div className="flex gap-6 items-start p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
               <div className="w-16 text-center font-bold text-slate-400 text-lg">Q4</div>
               <div className="flex-1">
                  <h4 className="font-bold text-lg text-slate-900">Competitive Intelligence Hub</h4>
                  <p className="text-slate-500 text-sm mt-1">Dynamic, bite-sized battle cards providing real-time strengths, weaknesses, and key differentiators against major competitors for quick pre-call review.</p>
               </div>
               <div className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full border border-slate-200">PLANNED</div>
            </div>
         </div>
      </div>

      {/* Blue Sky Research */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-indigo-900 text-indigo-100 rounded-[2rem] p-8 border border-indigo-800 relative overflow-hidden">
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-4 text-indigo-300">
                  <Telescope className="w-6 h-6" />
                  <span className="uppercase tracking-widest font-bold text-xs">Research</span>
               </div>
               <h3 className="text-2xl font-bold text-white mb-3">Spatial Audio Surveying</h3>
               <p className="text-indigo-200 text-sm leading-relaxed">
                  Using Head-Related Transfer Functions (HRTF) to allow engineers to "hear" interference. 
                  A Geiger-counter mechanic where microwave interference "buzzes" spatially as you walk near it.
               </p>
            </div>
         </div>

         <div className="bg-slate-900 text-slate-100 rounded-[2rem] p-8 border border-slate-800 relative overflow-hidden">
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-4 text-slate-400">
                  <Cpu className="w-6 h-6" />
                  <span className="uppercase tracking-widest font-bold text-xs">Moonshot</span>
               </div>
               <h3 className="text-2xl font-bold text-white mb-3">Hardware-in-the-Loop</h3>
               <p className="text-slate-300 text-sm leading-relaxed">
                  Connecting the web app to physical lab APs via API.
                  When a learner clicks "Reboot AP" in Airframe, the actual physical AP on their desk reboots and flashes its LEDs.
               </p>
            </div>
         </div>
      </div>

    </div>
  );
};

export default ChiefProductOfficer;
