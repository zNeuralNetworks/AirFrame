
import React from 'react';
import { BookOpen, Map, Layers, Layout, MousePointer2, SplitSquareHorizontal, HelpCircle, Heart, Lightbulb, Zap, Users, Brain, Terminal, ChevronDown, Network, Compass, Route } from 'lucide-react';
import Mascot from '../../shared/ui/Mascot';

const InterfaceReference: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-16 pb-32 animate-fade-in">
       {/* Header */}
       <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-violet-50 text-violet-600 rounded-2xl mb-4">
             <Layout className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Interface Reference</h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            A guide to the bespoke UI components built for Airframe. These patterns are designed to increase engagement and reduce cognitive load.
          </p>
       </div>

       {/* Component 1: The Intelligent Textbook */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><BookOpen className="w-6 h-6" /></div>
                <h2 className="text-2xl font-bold text-slate-900">The Modern Textbook</h2>
             </div>
             <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                Traditional digital textbooks are static walls of text. Our "Modern Textbook" pattern breaks content into <strong>Micro-Learning Cards</strong>. 
             </p>
             <div className="space-y-4">
                <div className="flex gap-4">
                   <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 font-bold text-blue-600">01</div>
                   <div>
                      <h4 className="font-bold text-slate-900">Chunking</h4>
                      <p className="text-sm text-slate-500">Content is split by headers into discrete cards. Users focus on one concept at a time.</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 font-bold text-blue-600">02</div>
                   <div>
                      <h4 className="font-bold text-slate-900">Vertical Feed</h4>
                      <p className="text-sm text-slate-500">Mimics social media feeds (TikTok/Instagram) for familiar scrolling behavior.</p>
                   </div>
                </div>
             </div>
          </div>
          <div className="bg-slate-100 rounded-3xl p-8 md:p-12 border border-slate-200 shadow-inner">
             {/* Mock Component */}
             <div className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 transform rotate-1 transition-transform hover:rotate-0 relative z-10">
                   <div className="h-4 w-20 bg-blue-100 rounded mb-6"></div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-4">Concept Card</h3>
                   <div className="space-y-3">
                      <div className="h-2 w-full bg-slate-100 rounded"></div>
                      <div className="h-2 w-full bg-slate-100 rounded"></div>
                      <div className="h-2 w-3/4 bg-slate-100 rounded"></div>
                   </div>
                </div>
                <div className="absolute top-4 left-0 right-0 bg-white rounded-2xl p-8 shadow-md border border-slate-100 transform -rotate-2 translate-y-4 opacity-40 scale-95 -z-0">
                   <div className="h-4 w-full bg-slate-100 rounded"></div>
                </div>
             </div>
          </div>
       </div>

       {/* Component 2: Mission Log */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200 shadow-inner flex justify-center">
             {/* Mock Component */}
             <div className="w-full max-w-xs relative pl-8 py-4">
                <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-slate-200"></div>
                <div className="space-y-6 relative z-10">
                   <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-md">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-200 shrink-0">
                         <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div className="flex-1">
                         <div className="h-2 w-16 bg-slate-800 rounded mb-2"></div>
                         <div className="h-1.5 w-full bg-emerald-100 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-emerald-500"></div>
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 opacity-60 grayscale">
                      <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                         <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                         <div className="h-2 w-16 bg-slate-300 rounded mb-2"></div>
                         <div className="h-1.5 w-full bg-slate-100 rounded-full"></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          <div className="order-1 lg:order-2">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><Map className="w-6 h-6" /></div>
                <h2 className="text-2xl font-bold text-slate-900">The Mission Log</h2>
             </div>
             <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                Replacing the standard "Table of Contents". The Mission Log is a vertical timeline that gamifies progress.
             </p>
             <ul className="space-y-4">
                <li className="flex gap-3">
                   <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0"></div>
                   <p className="text-sm text-slate-600"><strong>Progressive Disclosure:</strong> Future modules are locked or dimmed to prevent overwhelm and maintain focus on the current task.</p>
                </li>
                <li className="flex gap-3">
                   <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0"></div>
                   <p className="text-sm text-slate-600"><strong>Visual Status:</strong> Clear iconography (Lock vs Check) communicates status instantly without reading text.</p>
                </li>
             </ul>
          </div>
       </div>

       {/* Component 3: Skill Stacks */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><Layers className="w-6 h-6" /></div>
                <h2 className="text-2xl font-bold text-slate-900">Skill Stacks</h2>
             </div>
             <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                Instead of a flat list, we organize modules into "Stacks" (Foundations, Design, Security). 
                The dashboard visualizes these as physical stacks that grow as the user gains XP.
             </p>
             <p className="text-sm text-slate-500 border-l-4 border-amber-300 pl-4 py-1">
                Goal: Transform abstract "progress" into a tangible, collectible asset.
             </p>
          </div>
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200 shadow-inner flex items-center justify-center">
              <div className="flex gap-4 items-end h-40">
                 <div className="w-20 bg-white rounded-t-xl border border-slate-200 relative overflow-hidden group transition-all duration-500 shadow-sm" style={{height: '60%'}}>
                    <div className="absolute bottom-0 left-0 w-full h-full bg-amber-500 opacity-10"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500"></div>
                    <div className="p-2 text-center">
                        <div className="text-[10px] font-bold text-amber-600 uppercase">RF</div>
                        <div className="text-xs font-bold text-slate-900">60%</div>
                    </div>
                 </div>
                 <div className="w-20 bg-white rounded-t-xl border border-slate-200 relative overflow-hidden shadow-sm" style={{height: '80%'}}>
                    <div className="absolute bottom-0 left-0 w-full h-full bg-blue-500 opacity-10"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500"></div>
                    <div className="p-2 text-center">
                        <div className="text-[10px] font-bold text-blue-600 uppercase">Design</div>
                        <div className="text-xs font-bold text-slate-900">80%</div>
                    </div>
                 </div>
                 <div className="w-20 bg-white rounded-t-xl border border-slate-200 relative overflow-hidden shadow-sm" style={{height: '30%'}}>
                    <div className="absolute bottom-0 left-0 w-full h-full bg-purple-500 opacity-10"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-500"></div>
                    <div className="p-2 text-center">
                        <div className="text-[10px] font-bold text-purple-600 uppercase">Sec</div>
                        <div className="text-xs font-bold text-slate-900">30%</div>
                    </div>
                 </div>
              </div>
          </div>
       </div>

       {/* Component 4: Split-Focus Lab */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl flex justify-center">
             {/* Mock Component */}
             <div className="w-full flex gap-2 h-48">
                <div className="w-1/3 bg-slate-800 rounded-lg p-3 space-y-2 border border-slate-700">
                   <div className="h-1.5 w-1/2 bg-slate-600 rounded"></div>
                   <div className="h-1 w-full bg-slate-600 rounded"></div>
                   <div className="h-1 w-full bg-slate-600 rounded"></div>
                   <div className="h-1 w-3/4 bg-slate-600 rounded"></div>
                </div>
                <div className="flex-1 bg-slate-950 rounded-lg border border-slate-700 relative overflow-hidden flex items-center justify-center">
                   <div className="w-full h-full opacity-20" style={{backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
                   <div className="w-16 h-16 rounded-full border-2 border-brand-500 bg-brand-500/20 animate-pulse"></div>
                </div>
             </div>
          </div>
          <div className="order-1 lg:order-2">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-slate-100 text-slate-700 rounded-lg"><SplitSquareHorizontal className="w-6 h-6" /></div>
                <h2 className="text-2xl font-bold text-slate-900">The Split-Focus Lab</h2>
             </div>
             <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                Context switching kills flow. The "Split-Focus" pattern keeps instruction and action on the same screen.
             </p>
             <ul className="space-y-4">
                <li className="flex gap-3">
                   <div className="mt-1.5 w-2 h-2 rounded-full bg-slate-400 shrink-0"></div>
                   <p className="text-sm text-slate-600"><strong>Simultaneous View:</strong> Users read the theory on the left while manipulating variables on the right. No tab switching.</p>
                </li>
                <li className="flex gap-3">
                   <div className="mt-1.5 w-2 h-2 rounded-full bg-slate-400 shrink-0"></div>
                   <p className="text-sm text-slate-600"><strong>Immediate Feedback:</strong> Actions in the simulation pane trigger highlights in the instruction pane.</p>
                </li>
             </ul>
          </div>
       </div>

        {/* Component 5: The Command Deck (NEW) */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-slate-800 text-green-400 rounded-lg"><Terminal className="w-6 h-6" /></div>
                <h2 className="text-2xl font-bold text-slate-900">The Command Deck</h2>
             </div>
             <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                Engineers love the CLI. This pattern provides a safe, browser-based terminal emulator for practicing syntax without breaking production.
             </p>
             <ul className="space-y-4">
                <li className="flex gap-3">
                   <div className="mt-1.5 w-2 h-2 rounded-full bg-slate-400 shrink-0"></div>
                   <p className="text-sm text-slate-600"><strong>Syntax Guard:</strong> Real-time highlighting of incorrect commands before execution.</p>
                </li>
                <li className="flex gap-3">
                   <div className="mt-1.5 w-2 h-2 rounded-full bg-slate-400 shrink-0"></div>
                   <p className="text-sm text-slate-600"><strong>Auto-Complete:</strong> Teaches the user available commands (pressing Tab) just like the real equipment.</p>
                </li>
             </ul>
          </div>
          <div className="bg-slate-200 rounded-3xl p-8 md:p-12 border border-slate-300 shadow-inner flex items-center justify-center">
             <div className="w-full bg-slate-900 rounded-lg shadow-2xl overflow-hidden font-mono text-xs md:text-sm">
                <div className="bg-slate-800 p-2 flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="p-4 text-slate-300 space-y-1">
                   <div>Last login: Tue Oct 24 14:03:22 on tty1</div>
                   <div><span className="text-green-400">Arista#</span> show version</div>
                   <div className="text-slate-500">Arista Networks EOS</div>
                   <div className="text-slate-500">Software image version: 4.28.0F</div>
                   <div><span className="text-green-400">Arista#</span> conf t</div>
                   <div><span className="text-green-400">Arista(config)#</span> interface et1</div>
                   <div className="flex">
                      <span className="text-green-400">Arista(config-if-Et1)#</span>
                      <span className="ml-2 w-2 h-5 bg-slate-500 animate-pulse"></span>
                   </div>
                </div>
             </div>
          </div>
       </div>

       {/* Component 6: The Layer Cake (NEW) */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl flex justify-center">
             <div className="space-y-2 w-64">
                <div className="bg-purple-100 border border-purple-200 p-3 rounded-lg text-center text-purple-700 font-bold shadow-sm transform hover:-translate-y-1 transition-transform cursor-pointer">
                   Application Layer
                </div>
                <div className="bg-blue-100 border border-blue-200 p-3 rounded-lg text-center text-blue-700 font-bold shadow-sm transform hover:-translate-y-1 transition-transform cursor-pointer">
                   Transport (TCP/UDP)
                </div>
                <div className="bg-green-100 border border-green-200 p-3 rounded-lg text-center text-green-700 font-bold shadow-sm transform hover:-translate-y-1 transition-transform cursor-pointer">
                   Internet (IP)
                </div>
                <div className="bg-amber-100 border border-amber-200 p-3 rounded-lg text-center text-amber-700 font-bold shadow-sm transform hover:-translate-y-1 transition-transform cursor-pointer">
                   Link (Mac / Wi-Fi)
                </div>
                <div className="bg-slate-100 border border-slate-200 p-3 rounded-lg text-center text-slate-700 font-bold shadow-sm transform hover:-translate-y-1 transition-transform cursor-pointer">
                   Physical (RF)
                </div>
             </div>
          </div>
          <div className="order-1 lg:order-2">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><Layers className="w-6 h-6" /></div>
                <h2 className="text-2xl font-bold text-slate-900">The Layer Cake</h2>
             </div>
             <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                Networking is built on abstraction layers (OSI Model). This pattern visualizes the stack, allowing users to drill into specific layers to see where a failure occurred.
             </p>
          </div>
       </div>

       {/* Component 7: Micro-Quizzes */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-pink-100 text-pink-600 rounded-lg"><HelpCircle className="w-6 h-6" /></div>
                <h2 className="text-2xl font-bold text-slate-900">Micro-Quizzes</h2>
             </div>
             <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                Low-stakes assessment. Small checkpoints that appear inline to validate understanding before moving to the next section.
             </p>
             <p className="text-sm text-slate-500 border-l-4 border-pink-300 pl-4 py-1">
                Goal: Prevent the "Illusion of Competence" where users read without retaining.
             </p>
          </div>
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200 shadow-inner flex items-center justify-center">
             <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 w-full max-w-sm">
                <div className="flex justify-between items-center mb-4">
                   <span className="text-[10px] font-bold text-pink-600 uppercase bg-pink-50 px-2 py-0.5 rounded">Check</span>
                </div>
                <div className="h-2 w-3/4 bg-slate-800 rounded mb-4"></div>
                <div className="space-y-2">
                   <div className="p-3 rounded-lg border border-slate-200 text-xs text-slate-500">Option A</div>
                   <div className="p-3 rounded-lg border border-green-500 bg-green-50 text-xs text-green-700 font-bold flex justify-between items-center">
                      Option B (Correct)
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                   </div>
                </div>
             </div>
          </div>
       </div>

       {/* Component 8: Emotional Anchors */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 bg-orange-50 rounded-3xl p-8 md:p-12 border border-orange-100 shadow-inner flex justify-center items-center">
             <div className="relative">
                <div className="absolute -top-12 -right-12 bg-white p-3 rounded-t-xl rounded-bl-xl shadow-md text-xs text-slate-600 font-medium border border-slate-100 animate-bounce">
                   "You're doing great!"
                </div>
                <Mascot size="lg" expression="happy" />
             </div>
          </div>
          <div className="order-1 lg:order-2">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><Heart className="w-6 h-6" /></div>
                <h2 className="text-2xl font-bold text-slate-900">Emotional Anchors</h2>
             </div>
             <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                Learning technical topics is frustrating. The mascot serves as an emotional buffer, celebrating wins and softening failures.
             </p>
             <ul className="space-y-4">
                <li className="flex gap-3">
                   <div className="mt-1.5 w-2 h-2 rounded-full bg-orange-400 shrink-0"></div>
                   <p className="text-sm text-slate-600"><strong>Failure State:</strong> Instead of a red "X", show a confused mascot. It shifts blame from "I'm stupid" to "We missed that one".</p>
                </li>
             </ul>
          </div>
       </div>

       {/* Strategic Critique Section */}
       <div className="mt-24 border-t border-slate-200 pt-16">
          <div className="flex items-center gap-4 mb-8">
             <div className="bg-slate-900 text-white p-3 rounded-xl">
                <Compass className="w-6 h-6" />
             </div>
             <div>
                <h2 className="text-3xl font-bold text-slate-900">Strategic Critique: Is "Mission Log" the right choice?</h2>
                <p className="text-slate-500 mt-1">Comparing linear vs. network navigation patterns for Airframe.</p>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Option A: Mission Log */}
             <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center gap-3">
                   <div className="p-2 bg-emerald-100 rounded text-emerald-600"><Map className="w-5 h-5" /></div>
                   <h3 className="text-lg font-bold text-slate-900">Option A: The Mission Log</h3>
                </div>
                <div className="p-6 space-y-4">
                   <p className="text-slate-600 text-sm leading-relaxed">
                      A vertical, linear timeline where unlocking Module 1 opens Module 2.
                   </p>
                   <div className="space-y-2">
                      <div className="flex items-start gap-2 text-sm">
                         <div className="mt-1 w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] font-bold">+</div>
                         <span className="text-slate-700"><strong>Great for Certification:</strong> Ensures all prerequisites are met.</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                         <div className="mt-1 w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] font-bold">+</div>
                         <span className="text-slate-700"><strong>Reduced Anxiety:</strong> The user always knows exactly what to do next.</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                         <div className="mt-1 w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold">-</div>
                         <span className="text-slate-700"><strong>Frustrating for Reference:</strong> If an SE needs to jump to "Troubleshooting" immediately, a locked path blocks them.</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* Option B: Constellation Map */}
             <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center gap-3">
                   <div className="p-2 bg-indigo-100 rounded text-indigo-600"><Network className="w-5 h-5" /></div>
                   <h3 className="text-lg font-bold text-slate-900">Option B: The Constellation Map</h3>
                </div>
                <div className="p-6 space-y-4">
                   <p className="text-slate-600 text-sm leading-relaxed">
                      A network graph where nodes are connected by relationships. Non-linear exploration.
                   </p>
                   <div className="space-y-2">
                      <div className="flex items-start gap-2 text-sm">
                         <div className="mt-1 w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] font-bold">+</div>
                         <span className="text-slate-700"><strong>Better for Systems Thinking:</strong> Shows how "RF Physics" relates to "Antenna Design".</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                         <div className="mt-1 w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] font-bold">+</div>
                         <span className="text-slate-700"><strong>Allows Specialization:</strong> Users can branch into "Security Specialist" or "Design Specialist".</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                         <div className="mt-1 w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold">-</div>
                         <span className="text-slate-700"><strong>High Cognitive Load:</strong> "Where do I start?" paralysis is a real risk.</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Final Verdict */}
          <div className="mt-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 rounded-full blur-[80px] opacity-20"></div>
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                   <div className="bg-brand-500 p-2 rounded-lg text-white"><Route className="w-6 h-6" /></div>
                   <h3 className="text-2xl font-bold">The Verdict: Use a Hybrid Model</h3>
                </div>
                <p className="text-slate-300 leading-relaxed max-w-3xl mb-6">
                   For Airframe, which serves both as a <strong>Certification Platform</strong> (Linear) and a <strong>Reference Tool</strong> (Non-Linear), neither pure model is perfect.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                      <h4 className="font-bold text-brand-300 mb-2">1. Core Track (Mission Log)</h4>
                      <p className="text-sm text-slate-300">Keep the current Mission Log for the "Ace Level 1" certification. Beginners need structure. They need to know what to do next.</p>
                   </div>
                   <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                      <h4 className="font-bold text-brand-300 mb-2">2. Knowledge Graph (Constellation)</h4>
                      <p className="text-sm text-slate-300">Add a "Galaxy View" for unlocked concepts. Once a user finishes a module, it lights up in the graph, showing connections to advanced, optional topics.</p>
                   </div>
                </div>
             </div>
          </div>
       </div>

    </div>
  );
};

export default InterfaceReference;
