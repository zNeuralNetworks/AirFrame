import React, { useState, useMemo, Suspense, useEffect } from 'react';
import { BookCopy, GitCompare, ChevronsUpDown, Phone, Users, BookText, Check, Search, Info, BrainCircuit, X, Beaker, Briefcase } from 'lucide-react';
import { COMPARISON_DATA } from '../../content/comparisons';
import { CHEATSHEETS } from '../../content/cheatsheets';
import { Lesson, GlossaryTerm } from '../../types';
import { GLOSSARY } from '../../content/glossary';
import { getSimulationComponent } from '../simulations/SimulationRegistry';
import SimulationLoader from '../simulations/SimulationLoader';

const ICONS: Record<string, React.ElementType> = {
  Phone,
  Users,
  BookText,
  Beaker,
};

interface DatabankProps {
  lessons: Lesson[];
  glossary: GlossaryTerm[];
  onSelectLesson: (lesson: Lesson) => void;
  initialTerm: string | null;
  onClearInitialTerm: () => void;
}

const Databank: React.FC<DatabankProps> = ({ lessons, glossary, onSelectLesson, initialTerm, onClearInitialTerm }) => {
  const [compareA, setCompareA] = useState('Wi-Fi 6 (802.11ax)');
  const [compareB, setCompareB] = useState('Wi-Fi 7 (802.11be)');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Visual Glossary State
  const [glossarySearch, setGlossarySearch] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

  useEffect(() => {
    if (glossary.length > 0 && !selectedTerm) {
      setSelectedTerm(glossary[0]);
    }
  }, [glossary]);

  // Separate Playbooks from Cheatsheets
  const playbooks = useMemo(() => CHEATSHEETS.filter(cs => cs.title.includes('Playbook')), []);
  const regularCheatsheets = useMemo(() => CHEATSHEETS.filter(cs => !cs.title.includes('Playbook')), []);

  useEffect(() => {
    if (initialTerm) {
      const term = glossary.find(g => g.term === initialTerm);
      if (term) setSelectedTerm(term);
      onClearInitialTerm();
    }
  }, [initialTerm, onClearInitialTerm, glossary]);

  const filteredGlossary = useMemo(() => {
    if (!glossarySearch) return glossary;
    return glossary.filter(term => 
      term.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      term.definition.toLowerCase().includes(glossarySearch.toLowerCase())
    );
  }, [glossarySearch, glossary]);

  const comparisonOptions = Object.keys(COMPARISON_DATA);
  const dataA = COMPARISON_DATA[compareA];
  const dataB = COMPARISON_DATA[compareB];
  const comparisonKeys = dataA ? Object.keys(dataA) : [];

  const SelectedSim = selectedTerm?.visualId ? getSimulationComponent(selectedTerm.visualId) : null;
  const relevantLesson = selectedTerm?.lessonId ? lessons.find(l => l.id === selectedTerm.lessonId) : null;

  const renderExpandableList = (items: typeof CHEATSHEETS) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {items.map(item => {
        const Icon = ICONS[item.icon] || BookText;
        const isExpanded = expandedItem === item.id;
        return (
          <div key={item.id} className={`bg-white rounded-apple-lg border border-border apple-shadow transition-all duration-500 overflow-hidden ${isExpanded ? 'md:col-span-2 scale-[1.02]' : 'hover:scale-[1.02]'}`}>
            <button onClick={() => setExpandedItem(isExpanded ? null : item.id)} className="w-full p-10 text-left flex items-center gap-8 group">
              <div className="p-5 bg-app text-brand-500 rounded-apple group-hover:bg-brand-50 transition-colors shadow-inner">
                <Icon className="w-8 h-8 stroke-[2]" />
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-text-primary text-2xl tracking-tight">{item.title}</h3>
                <p className="text-base text-text-muted font-medium mt-1">{item.description}</p>
              </div>
              <ChevronsUpDown className={`w-6 h-6 text-text-muted transform transition-all duration-300 ${isExpanded ? 'rotate-180 text-brand-500 stroke-[2.5]' : 'stroke-[1.5]'}`} />
            </button>
            {isExpanded && (
              <div className="px-10 pb-10 animate-fade-in">
                <div className="bg-app/50 border border-border rounded-apple p-10 space-y-8">
                  {item.content.map((section, idx) => (
                    <div key={idx}>
                      <h4 className="font-bold text-text-primary text-xs uppercase tracking-widest mb-4 opacity-40">{section.title}</h4>
                      <ul className="space-y-4">
                        {section.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-4 text-text-secondary text-lg leading-relaxed font-medium">
                            <div className="mt-2.5 w-2 h-2 rounded-full bg-brand-500 shrink-0 shadow-sm shadow-brand-500/40"></div>
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-24 pb-40">
      <header className="text-center space-y-8">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-white text-brand-500 rounded-[32px] apple-shadow-lg border border-border">
           <BookCopy className="w-12 h-12 stroke-[2.5]" />
        </div>
        <div className="space-y-3">
          <h1 className="text-6xl font-extrabold text-text-primary tracking-tight font-serif">Databank</h1>
          <p className="text-text-muted text-2xl font-medium max-w-2xl mx-auto leading-relaxed font-serif">
            Your unified reference library and reasoning engine.
          </p>
        </div>
      </header>

      {/* Visual Glossary */}
      <section className="space-y-10">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-white apple-shadow rounded-2xl text-brand-500 border border-border"><BrainCircuit className="w-8 h-8 stroke-[2]" /></div>
          <h2 className="text-4xl font-extrabold text-text-primary tracking-tight">Visual Glossary</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 h-[800px] bg-white rounded-apple-lg border border-border apple-shadow-lg p-8">
            {/* Left Pane: Search & List */}
            <div className="md:col-span-1 flex flex-col h-full overflow-hidden border-r border-border pr-8">
                <div className="relative mb-8">
                    <Search className="absolute left-5 top-4.5 w-6 h-6 text-text-muted stroke-[2]" />
                    <input 
                        type="text"
                        placeholder="Search terms..."
                        value={glossarySearch}
                        onChange={e => setGlossarySearch(e.target.value)}
                        className="w-full pl-14 pr-6 py-4.5 bg-app border border-border rounded-apple text-lg font-medium focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all"
                    />
                </div>
                <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                    {filteredGlossary.map(term => (
                        <button 
                            key={term.term}
                            onClick={() => setSelectedTerm(term)}
                            className={`w-full text-left px-6 py-5 rounded-apple text-lg font-bold transition-all duration-300 ${selectedTerm?.term === term.term ? 'bg-brand-500 text-white apple-shadow scale-[1.02]' : 'text-text-secondary hover:bg-app hover:text-text-primary'}`}
                        >
                            {term.term}
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Pane: Concept Card */}
            <div className="md:col-span-2 bg-app/30 rounded-[32px] p-12 overflow-y-auto custom-scrollbar">
                {selectedTerm ? (
                    <div className="space-y-12 animate-fade-in">
                        <div className="space-y-6">
                          <h3 className="text-5xl font-extrabold text-text-primary tracking-tighter font-serif">{selectedTerm.term}</h3>
                          <p className="text-text-secondary text-2xl leading-relaxed font-serif">{selectedTerm.definition}</p>
                        </div>
                        
                        {SelectedSim && (
                            <div className="bg-white rounded-apple-lg p-8 border border-border apple-shadow-lg">
                                <div className="aspect-video h-72 mx-auto">
                                    <div className="w-full h-full scale-[0.95] origin-center">
                                        <SimulationLoader 
                                            simId={selectedTerm.visualId!} 
                                            lessonId={selectedTerm.lessonId} 
                                            onComplete={() => {}} 
                                            Component={SelectedSim} 
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="p-10 bg-white border border-border apple-shadow rounded-apple-lg">
                            <div className="flex items-center gap-3 text-apple-orange font-bold text-xs uppercase tracking-widest mb-4">
                                <Info className="w-5 h-5 stroke-[2.5]" /> Common Misconception
                            </div>
                            <p className="text-text-secondary text-xl leading-relaxed italic font-serif">
                                "{selectedTerm.misconception}"
                            </p>
                        </div>
                        
                        {relevantLesson && (
                            <button onClick={() => onSelectLesson(relevantLesson)} className="w-full p-6 bg-brand-500 text-white font-bold text-xl rounded-apple apple-shadow hover:bg-brand-600 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4">
                                <BookText className="w-7 h-7 stroke-[2.5]" />
                                Go to Lesson: {relevantLesson.title}
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-text-muted space-y-6">
                        <BookCopy className="w-20 h-20 opacity-10 stroke-[1.5]" />
                        <p className="text-2xl font-bold tracking-tight">Select a term to explore</p>
                    </div>
                )}
            </div>
        </div>
      </section>

      {/* Comparison Engine */}
      <section className="space-y-10">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-white apple-shadow rounded-2xl text-brand-500 border border-border"><GitCompare className="w-8 h-8 stroke-[2]" /></div>
          <h2 className="text-4xl font-extrabold text-text-primary tracking-tight">Comparison Engine</h2>
        </div>
        <div className="bg-white rounded-apple-lg border border-border apple-shadow-lg overflow-hidden">
          <div className="p-12 flex flex-col md:flex-row items-center justify-center gap-10 border-b border-border bg-app/30">
            <div className="relative w-full md:w-80">
              <select value={compareA} onChange={e => setCompareA(e.target.value)} className="w-full bg-white border border-border rounded-apple p-5 font-bold text-xl text-text-primary focus:ring-4 focus:ring-brand-500/10 focus:outline-none apple-shadow appearance-none cursor-pointer">
                {comparisonOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <ChevronsUpDown className="absolute right-5 top-5.5 w-6 h-6 text-text-muted pointer-events-none stroke-[2]" />
            </div>
            <div className="p-4 bg-white rounded-full apple-shadow border border-border">
              <GitCompare className="w-8 h-8 text-brand-500 stroke-[2.5]" />
            </div>
            <div className="relative w-full md:w-80">
              <select value={compareB} onChange={e => setCompareB(e.target.value)} className="w-full bg-white border border-border rounded-apple p-5 font-bold text-xl text-text-primary focus:ring-4 focus:ring-brand-500/10 focus:outline-none apple-shadow appearance-none cursor-pointer">
                {comparisonOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <ChevronsUpDown className="absolute right-5 top-5.5 w-6 h-6 text-text-muted pointer-events-none stroke-[2]" />
            </div>
          </div>
          <div className="divide-y divide-border">
            {comparisonKeys.map(key => {
              const valA = dataA[key as keyof typeof dataA];
              const valB = dataB[key as keyof typeof dataB];
              const isDifferent = valA !== valB;

              return (
              <div key={key} className="grid grid-cols-12 p-8 text-lg items-center hover:bg-app transition-colors">
                <div className="col-span-12 md:col-span-3 text-text-muted font-bold uppercase text-xs tracking-widest mb-3 md:mb-0 opacity-60">{key}</div>
                <div className="col-span-6 md:col-span-4 text-text-primary font-bold text-center md:text-left">{valA}</div>
                <div className={`col-span-6 md:col-span-5 text-text-primary font-extrabold text-center md:text-left ${isDifferent ? 'text-brand-500' : ''}`}>{valB}</div>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* Vertical Playbooks */}
      <section className="space-y-10">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-white apple-shadow rounded-2xl text-brand-500 border border-border"><Briefcase className="w-8 h-8 stroke-[2]" /></div>
          <h2 className="text-4xl font-extrabold text-text-primary tracking-tight">Vertical Playbooks</h2>
        </div>
        {renderExpandableList(playbooks)}
      </section>

      {/* Curated Cheatsheets */}
      <section className="space-y-10">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-white apple-shadow rounded-2xl text-brand-500 border border-border"><Check className="w-8 h-8 stroke-[2.5]" /></div>
          <h2 className="text-4xl font-extrabold text-text-primary tracking-tight">Curated Cheatsheets</h2>
        </div>
        {renderExpandableList(regularCheatsheets)}
      </section>
    </div>
  );
};

export default Databank;