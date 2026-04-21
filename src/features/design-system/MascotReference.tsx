
import React from 'react';
import { Smile, Heart, Zap, Shield, Briefcase, Shirt, HardHat, Beaker, CheckCircle2, LucideIcon } from 'lucide-react';
import Mascot, { MascotExpression, MascotOutfit } from '../../shared/ui/Mascot';
import { MASCOT_PERSONAS, MASCOT_WARDROBE, MASCOT_EXPRESSIONS } from '../../content/design-system/mascot';
import { getIcon } from '../../shared/ui/IconRegistry';

const MascotReference: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-16 pb-32 animate-fade-in">
       {/* Header */}
       <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-orange-50 text-orange-600 rounded-2xl mb-4">
             <Smile className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Mascot Identity & Wardrobe</h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            The evolution of "Packet" the Corgi. Adapting the service animal metaphor to support professional contexts via the "Sales Switch" and gamification via "Costume Sinks".
          </p>
       </div>

       {/* Section 1: The Persona Matrix */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
             <h2 className="text-2xl font-bold text-slate-900 mb-4">The Dual Identity</h2>
             <p className="text-slate-600 mb-6 leading-relaxed">
                The CPO strategy identified a conflict: <strong>Whimsy vs. Authority</strong>. We solved this by giving Packet a job. He isn't just a pet; he is a working dog.
             </p>
             <div className="space-y-4">
                {MASCOT_PERSONAS.map((persona) => {
                   const Icon = getIcon(persona.icon, Heart);
                   return (
                   <div key={persona.id} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                      <div className={`p-2 ${persona.bgColor} rounded-lg ${persona.textColor} shrink-0`}>
                         <Icon className="w-6 h-6" />
                      </div>
                      <div>
                         <h3 className="font-bold text-slate-900">{persona.title}</h3>
                         <p className="text-sm text-slate-500">
                            <strong>Outfit:</strong> {persona.outfit}<br/>
                            <strong>Role:</strong> {persona.role}
                         </p>
                      </div>
                   </div>
                )})}
             </div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-slate-100 rounded-3xl p-8 border border-slate-200 flex flex-col items-center justify-center gap-8">
             <div className="flex items-center gap-8">
                <div className="flex flex-col items-center">
                   <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white mb-4">
                      <Mascot size="md" expression="happy" outfit="none" />
                   </div>
                   <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Standard</span>
                </div>
                <div className="h-px w-12 bg-slate-300"></div>
                <div className="flex flex-col items-center">
                   <div className="w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center shadow-lg border-4 border-slate-700 mb-4">
                      <Mascot size="md" expression="neutral" outfit="professional" />
                   </div>
                   <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Sales Mode</span>
                </div>
             </div>
          </div>
       </div>

       {/* Section 2: The Wardrobe (Costume Sinks) */}
       <div className="space-y-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
             <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                <Shirt className="w-6 h-6" />
             </div>
             <div>
                <h2 className="text-2xl font-bold text-slate-900">The XP Sink: Wardrobe</h2>
                <p className="text-sm text-slate-500">Redeeming earned XP for professional specializations.</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {MASCOT_WARDROBE.map((item) => {
                const Icon = getIcon(item.icon, Briefcase);
                const outfitType = item.mascotOutfit as MascotOutfit;
                const expressionType = item.mascotExpression as MascotExpression;
                
                return (
                <div key={item.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all group">
                   <div className="flex justify-between items-start mb-6">
                      <div className={`p-3 ${item.color} bg-opacity-20 rounded-xl`}>
                         <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded">{item.xpCost}</span>
                   </div>
                   <div className="h-40 flex items-center justify-center bg-slate-50 rounded-xl mb-6 group-hover:bg-slate-100 transition-colors">
                      <Mascot size="md" expression={expressionType} outfit={outfitType} />
                   </div>
                   <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                   <p className="text-sm text-slate-500 mt-2">
                      {item.description}
                   </p>
                </div>
             )})}
          </div>
       </div>

       {/* Section 3: Expression Matrix Update */}
       <div className="space-y-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
             <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
                <Smile className="w-6 h-6" />
             </div>
             <div>
                <h2 className="text-2xl font-bold text-slate-900">Expression Dynamics</h2>
                <p className="text-sm text-slate-500">How accessories interact with emotion.</p>
             </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {MASCOT_EXPRESSIONS.map((exp, idx) => {
                   const outfitType = exp.outfit as MascotOutfit;
                   const expressionType = exp.expression as MascotExpression;
                   return (
                   <div key={idx} className="text-center">
                      <Mascot size="sm" className="mx-auto mb-3" expression={expressionType} outfit={outfitType} />
                      <div className="text-xs font-bold text-slate-600">{exp.label}</div>
                      <div className="text-[10px] text-slate-400">{exp.subtext}</div>
                   </div>
                )})}
             </div>
          </div>
       </div>

    </div>
  );
};

export default MascotReference;
