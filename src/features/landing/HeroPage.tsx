
import React from 'react';
import { 
  ArrowRight, 
  Zap, 
  Target, 
  Shield, 
  Activity, 
  Globe, 
  Cpu, 
  CheckCircle2,
  Lock,
  ChevronRight
} from 'lucide-react';
import Mascot from '../../shared/ui/Mascot';
import { motion } from 'motion/react';

interface HeroPageProps {
  onEnter: () => void;
}

const HeroPage: React.FC<HeroPageProps> = ({ onEnter }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring' as const, damping: 25, stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] selection:bg-brand-500/30 selection:text-brand-900 font-sans text-text-primary overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-brand-500/5 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Navigation Rail / Header */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between glass apple-shadow">
        <div className="flex items-center gap-3">
          <Mascot size="xs" expression="happy" showShadow={false} />
          <span className="font-bold text-xl tracking-tight">Airframe</span>
          <div className="hidden md:block px-2 py-0.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded">Academy</div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-text-muted">
            <a href="#vision" className="hover:text-text-primary transition-colors">Vision</a>
            <a href="#labs" className="hover:text-text-primary transition-colors">Interactive Labs</a>
            <a href="#pillars" className="hover:text-text-primary transition-colors">The Pillars</a>
          </div>
          <button 
            onClick={onEnter}
            className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 apple-shadow"
          >
            Enter Mission Control
          </button>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-24">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-32">
          <motion.div 
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <Mascot size="xl" expression="neutral" />
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9]">
                Wireless Mastery <br />
                <span className="text-brand-500 italic font-serif font-light">by simulation.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
                Stop guessing. Start visualizing. <br className="hidden md:block" />
                Airframe is the first high-fidelity flight simulator for <span className="text-slate-900 font-bold border-b-2 border-brand-200">RF physics</span> and protocol logic.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                <button 
                  onClick={onEnter}
                  className="w-full sm:w-auto px-10 py-5 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xl transition-all hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 group"
                >
                  Start Training
                  <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Vision Marquee */}
        <div className="bg-slate-900 py-6 overflow-hidden rotate-[-1deg] border-y-4 border-brand-500 shadow-2xl relative z-20">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 font-mono text-3xl font-black text-white/90 uppercase tracking-tighter px-6">
                <span>Signal Propagation</span>
                <span className="text-brand-500">•</span>
                <span>802.11 ax/be</span>
                <span className="text-brand-500">•</span>
                <span>Spectrum Analysis</span>
                <span className="text-brand-500">•</span>
                <span>Spatial Reuse</span>
                <span className="text-brand-500">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Bento Grid */}
        <section id="labs" className="container mx-auto px-6 py-32 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]">
            {/* Simulation Lab Feature */}
            <div className="md:col-span-8 bg-white rounded-apple-lg border border-border-DEFAULT p-10 apple-shadow flex flex-col justify-between overflow-hidden relative group">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-brand-500/10 rounded-2xl flex items-center justify-center text-brand-600 mb-6 font-bold">01</div>
                <h2 className="text-4xl font-black text-slate-900 mb-4">Interactive Labs</h2>
                <p className="text-slate-600 max-w-md font-medium text-lg leading-relaxed">
                  Real-time simulations of RF environments. Adjust antenna patterns, place bottlenecks, and troubleshoot roaming behavior instantly.
                </p>
              </div>
              
              <div className="absolute right-[-10%] bottom-[-10%] w-[350px] opacity-20 group-hover:opacity-40 transition-opacity">
                 <Cpu className="w-full h-full text-brand-500" />
              </div>
            </div>

            {/* Micro-learning Feature */}
            <div className="md:col-span-4 bg-slate-900 rounded-apple-lg p-10 flex flex-col justify-between text-white overflow-hidden relative group">
               <div className="relative z-10">
                <Zap className="w-10 h-10 text-brand-400 mb-6" />
                <h3 className="text-3xl font-bold mb-4 italic font-serif">Kill Shots</h3>
                <p className="text-brand-200/70 text-sm font-medium leading-relaxed">
                  Bite-sized, high-impact tactical insights for field engineers. Solves real-world Wi-Fi fires with first principles.
                </p>
               </div>
               <button onClick={onEnter} className="mt-auto flex items-center gap-2 text-brand-400 font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all">
                 Explore Insights <ChevronRight className="w-4 h-4" />
               </button>
            </div>

            {/* Certification Feature */}
            <div className="md:col-span-4 bg-white rounded-apple-lg border border-border-DEFAULT p-8 apple-shadow flex flex-col group">
              <Target className="w-8 h-8 text-apple-green mb-4" />
              <h3 className="text-xl font-black text-slate-900 mb-2 underline decoration-apple-green/30">Skill Matrix</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Track your expertise across 12 disciplines. From PHY layer diagnostics to advanced security protocols.
              </p>
              <div className="mt-auto pt-6 flex gap-1">
                {[1,2,3,4,5].map(i => <div key={i} className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-apple-green" style={{ width: `${i * 15}%` }} />
                </div>)}
              </div>
            </div>

            {/* Community/Social Feature */}
            <div className="md:col-span-8 bg-brand-500 rounded-apple-lg p-10 flex flex-col md:flex-row gap-8 items-center text-white relative overflow-hidden">
              <div className="flex-1 space-y-4">
                <Globe className="w-10 h-10 text-white/40" />
                <h3 className="text-3xl font-black leading-tight">Global Feedback Loop</h3>
                <p className="text-brand-50/80 font-medium leading-relaxed">
                  Request new labs, report real-world anomalies, and help build the repository of wireless knowledge.
                </p>
              </div>
              <div className="w-full md:w-64 bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-white/20" />
                  <div className="h-3 w-24 bg-white/20 rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-white/20 rounded" />
                  <div className="h-2 w-4/5 bg-white/20 rounded" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pillars Section */}
        <section id="pillars" className="bg-white py-32 border-y border-border-DEFAULT shadow-inner overflow-hidden">
          <div className="container mx-auto px-6 text-center mb-20">
             <h2 className="text-sm font-black text-brand-500 uppercase tracking-[0.3em] mb-4">The Airframe Pillars</h2>
             <p className="text-5xl font-black text-slate-900 tracking-tight leading-none">Engineering excellence <br className="hidden md:block" /> is built on fundamentals.</p>
          </div>

          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Active Mastery", icon: Activity, text: "Retention is 90% higher when you physically manipulate signal variables. Watch less, do more." },
              { title: "Visual Physics", icon: Activity, text: "RF is invisible, which breeds superstition. We turn abstract formulas into tactile visualizations." },
              { title: "Mission Critical", icon: Shield, text: "Break the simulator, not the client's network. Airframe is your production-grade sandbox." }
            ].map((p, i) => (
              <div key={i} className="space-y-6 text-center md:text-left">
                <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto md:mx-0 shadow-inner">
                  <p.icon className="w-8 h-8 text-slate-900" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900">{p.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed">{p.text}</p>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 group cursor-default">
                  <span>METRIC: 94% SUCCESS RATE</span>
                  <div className="h-[1px] flex-1 bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust/Social Proof */}
        <section className="py-24 container mx-auto px-6">
           <div className="flex flex-col md:flex-row items-center gap-12 border border-border-DEFAULT bg-white rounded-apple-lg p-12 apple-shadow">
             <div className="flex-1 space-y-4 text-center md:text-left">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-apple-green/10 text-apple-green text-xs font-black rounded-full uppercase tracking-widest">
                 <CheckCircle2 className="w-3 h-3" /> Pilot Trusted
               </div>
               <h3 className="text-3xl font-bold text-slate-900 leading-tight">"This is how wireless engineering should have always been taught."</h3>
               <p className="text-slate-500 font-medium">— Senior Wireless Lead</p>
             </div>
             <div className="w-px h-24 bg-slate-100 hidden md:block" />
             <div className="flex items-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
               <Mascot size="sm" expression="happy" showShadow={false} />
               <span className="font-black text-2xl tracking-tighter text-slate-900 underline decoration-slate-900/10">AIRFRAME.EDU</span>
             </div>
           </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-12">
            <div className="space-y-4">
              <h2 className="text-5xl font-black text-slate-900">Ready for takeoff?</h2>
              <p className="text-xl text-slate-500 font-medium">Clear your desk. The simulation is ready.</p>
            </div>
            
            <button 
              onClick={onEnter}
              className="px-16 py-6 bg-brand-500 text-white rounded-apple lg text-2xl font-black shadow-2xl shadow-brand-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 mx-auto group"
            >
              Enter Academy
              <Lock className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
            </button>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-border-DEFAULT bg-white/50 relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Mascot size="xs" expression="sleeping" showShadow={false} />
            <span className="font-bold text-slate-900">Airframe 2026</span>
          </div>
          <div className="flex gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-brand-500 transition-colors">Internal Ops</a>
            <a href="#" className="hover:text-brand-500 transition-colors">Design Spec</a>
            <a href="#" className="hover:text-brand-500 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HeroPage;
