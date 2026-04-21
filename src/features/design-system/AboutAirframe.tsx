
import React from 'react';
import { Info, Target, Compass, Anchor, Zap, Shield, Globe, BookOpen, Brain, Terminal, Heart, AlertTriangle, CheckCircle2 } from 'lucide-react';

const AboutAirframe: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-20 pb-32 animate-fade-in text-slate-900">
       {/* Header */}
       <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-slate-100 text-slate-700 rounded-2xl mb-6 shadow-sm border border-slate-200">
             <Info className="w-8 h-8" />
          </div>
          <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">The Airframe Manifesto</h1>
          <p className="text-slate-600 text-xl leading-relaxed font-medium">
             A living document defining the purpose, pedagogy, and physics of the wireless reasoning engine.
          </p>
       </div>

       {/* North Star Section */}
       <section>
          <div className="bg-slate-900 rounded-[2.5rem] p-12 text-white relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600 rounded-full blur-[180px] opacity-20 -mr-32 -mt-32"></div>
             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600 rounded-full blur-[150px] opacity-20 -ml-20 -mb-20"></div>
             
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                   <Compass className="w-6 h-6 text-brand-400" />
                   <span className="text-xs font-bold uppercase tracking-widest text-brand-200">The North Star</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-8">
                   "Replace intuition by accident with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-white">understanding by design</span>."
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg text-slate-300 leading-relaxed">
                   <p>
                      Airframe is not just a training portal. It is a <strong>flight simulator</strong> for the invisible physics of RF. 
                      Wireless engineers typically learn through "tribal knowledge" and painful outages. Airframe exists to give them a safe place to crash the network so they don't do it in production.
                   </p>
                   <p>
                      We believe that expertise is not about memorizing acronyms (802.11ax/be), but about building a reliable mental model of how packets move through the air. If you can visualize the invisible, you can troubleshoot anything.
                   </p>
                </div>
             </div>
          </div>
       </section>

       {/* The Problem Space */}
       <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-slate-200 pt-16">
          <div className="lg:col-span-4">
             <h3 className="text-3xl font-bold text-slate-900 mb-4 sticky top-8">The Problem Context</h3>
             <p className="text-slate-500 leading-relaxed">Why traditional training fails for wireless engineering.</p>
          </div>
          <div className="lg:col-span-8 grid gap-6">
             <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-red-200 transition-colors group">
                <div className="flex items-start gap-4">
                   <div className="p-3 bg-red-50 text-red-600 rounded-xl group-hover:bg-red-100 transition-colors">
                      <AlertTriangle className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">The Physics are Invisible</h4>
                      <p className="text-slate-600 leading-relaxed">
                         You can't see Wi-Fi. Unlike cabling, you can't verify connection with your eyes. This leads engineers to build mental models based on superstition ("reboot it twice") rather than physics. Airframe makes the invisible visible through visualization.
                      </p>
                   </div>
                </div>
             </div>

             <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-red-200 transition-colors group">
                <div className="flex items-start gap-4">
                   <div className="p-3 bg-red-50 text-red-600 rounded-xl group-hover:bg-red-100 transition-colors">
                      <Terminal className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">High Stakes, Low Safety</h4>
                      <p className="text-slate-600 leading-relaxed">
                         Breaking a production network to "test a theory" gets you fired. Learning stops where risk begins. Airframe provides a sandbox where failure is free and instant, encouraging experimentation.
                      </p>
                   </div>
                </div>
             </div>

             <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-red-200 transition-colors group">
                <div className="flex items-start gap-4">
                   <div className="p-3 bg-red-50 text-red-600 rounded-xl group-hover:bg-red-100 transition-colors">
                      <BookOpen className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">Passive Fatigue</h4>
                      <p className="text-slate-600 leading-relaxed">
                         Video lectures have a 5% retention rate. The "Sage on a Stage" model fails for complex systems thinking. Engineers learn by doing, troubleshooting, and fixing—not by watching slides.
                      </p>
                   </div>
                </div>
             </div>
          </div>
       </section>

       {/* Strategic Pillars */}
       <section className="border-t border-slate-200 pt-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
             <h3 className="text-3xl font-bold text-slate-900 mb-4">The Strategic Pillars</h3>
             <p className="text-slate-500 text-lg">The three non-negotiable rules guiding every design decision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100 flex flex-col h-full">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm mb-6">
                   <Zap className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-emerald-900 mb-3">1. Active Simulation</h4>
                <p className="text-emerald-800/80 leading-relaxed flex-1">
                   Every concept must have a manipulatable interactive element. No wall of text exists without a corresponding slider, toggle, or drag-and-drop mechanic to prove the concept.
                </p>
             </div>

             <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100 flex flex-col h-full">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm mb-6">
                   <Brain className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-indigo-900 mb-3">2. Short Feedback Loops</h4>
                <p className="text-indigo-800/80 leading-relaxed flex-1">
                   Instant validation. Red/Green states immediately after an action. We do not wait for a "Final Exam" to tell the user they misunderstood. We correct the mental model in real-time.
                </p>
             </div>

             <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100 flex flex-col h-full">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-600 shadow-sm mb-6">
                   <Heart className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-amber-900 mb-3">3. Professional Playfulness</h4>
                <p className="text-amber-800/80 leading-relaxed flex-1">
                   Respect the user's intelligence with expert-level content, but disarm their anxiety with a friendly UI and Mascot. We are "Serious Fun".
                </p>
             </div>
          </div>
       </section>

       {/* Constraints */}
       <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-slate-200 pt-16">
          <div className="lg:col-span-4">
             <h3 className="text-3xl font-bold text-slate-900 mb-4 sticky top-8">Design Constraints</h3>
             <p className="text-slate-500 leading-relaxed">The boundaries that define the solution space.</p>
          </div>
          <div className="lg:col-span-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                   <div className="mb-4 bg-white w-10 h-10 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm text-slate-600">
                      <Globe className="w-5 h-5" />
                   </div>
                   <h4 className="font-bold text-slate-900 mb-2">Zero Install (Web First)</h4>
                   <p className="text-sm text-slate-500 leading-relaxed">
                      Must run in any modern browser. No VMs, no GNS3, no heavy downloads. 100% Client-side React. This ensures accessibility for Sales Engineers on locked-down corporate laptops.
                   </p>
                </div>
                
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                   <div className="mb-4 bg-white w-10 h-10 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm text-slate-600">
                      <Shield className="w-5 h-5" />
                   </div>
                   <h4 className="font-bold text-slate-900 mb-2">Vendor Agnostic Core</h4>
                   <p className="text-sm text-slate-500 leading-relaxed">
                      While built for Arista, 80% of content is fundamental physics (IEEE 802.11 standards). This builds trust and credibility. We sell Arista by teaching Wi-Fi better than anyone else.
                   </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                   <div className="mb-4 bg-white w-10 h-10 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm text-slate-600">
                      <Zap className="w-5 h-5" />
                   </div>
                   <h4 className="font-bold text-slate-900 mb-2">Low Floor, High Ceiling</h4>
                   <p className="text-sm text-slate-500 leading-relaxed">
                      Accessible to a junior sales rep (The "Elevator Pitch" tracks), but deep enough for a CCIE (The "Packet Capture" tracks). The UI must support both user journeys without clutter.
                   </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                   <div className="mb-4 bg-white w-10 h-10 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm text-slate-600">
                      <Anchor className="w-5 h-5" />
                   </div>
                   <h4 className="font-bold text-slate-900 mb-2">No Backend Dependency</h4>
                   <p className="text-sm text-slate-500 leading-relaxed">
                      State is managed via LocalStorage. No server costs, no database latency, no login friction. The app is ephemeral but persistent enough for a single user's journey.
                   </p>
                </div>
             </div>
          </div>
       </section>

       {/* Tone & Voice */}
       <section className="bg-slate-100 rounded-[2.5rem] p-12 border border-slate-200 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Voice & Tone Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div>
                <h4 className="font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
                   <CheckCircle2 className="w-4 h-4 text-green-600" /> Encouraging
                </h4>
                <p className="text-sm text-slate-500">We celebrate progress. We treat failure as "data collection", not a character flaw.</p>
             </div>
             <div>
                <h4 className="font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
                   <CheckCircle2 className="w-4 h-4 text-green-600" /> Precise
                </h4>
                <p className="text-sm text-slate-500">We use correct terminology (RSSI, SNR, MCS) but explain it simply. We never "dumb it down" to the point of inaccuracy.</p>
             </div>
             <div>
                <h4 className="font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
                   <CheckCircle2 className="w-4 h-4 text-green-600" /> Objective
                </h4>
                <p className="text-sm text-slate-500">We prioritize engineering truth over marketing fluff. If a competitor does something well, we acknowledge the physics of why.</p>
             </div>
          </div>
       </section>

    </div>
  );
};

export default AboutAirframe;
