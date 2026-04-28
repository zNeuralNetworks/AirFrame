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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map(item => {
        const Icon = ICONS[item.icon] || BookText;
        const isExpanded = expandedItem === item.id;
        return (
          <div key={item.id} className={`af-card transition-all duration-500 overflow-hidden ${isExpanded ? 'md:col-span-2 scale-[1.01]' : 'hover:scale-[1.01]'}`}>
            <button onClick={() => setExpandedItem(isExpanded ? null : item.id)} className="w-full text-left flex items-center gap-6 group">
              <div className="p-4 bg-app text-brand-500 rounded-2xl group-hover:bg-brand-500/10 transition-colors shadow-inner">
                <Icon className="w-7 h-7 stroke-[2]" />
              </div>
              <div className="flex-1">
                <h3 className="af-card-title">{item.title}</h3>
                <p className="af-body-sm mt-1">{item.description}</p>
              </div>
              <ChevronsUpDown className={`w-6 h-6 text-text-muted transform transition-all duration-300 ${isExpanded ? 'rotate-180 text-brand-500 stroke-[2.5]' : 'stroke-[1.5]'}`} />
            </button>
            {isExpanded && (
              <div className="pt-8 animate-fade-in">
                <div className="af-panel space-y-8">
                  {item.content.map((section, idx) => (
                    <div key={idx}>
                      <h4 className="af-eyebrow mb-4">{section.title}</h4>
                      <ul className="space-y-4">
                        {section.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-4 af-body">
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
    <div className="af-page max-w-6xl">
      <header className="text-center af-heading-group">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-surface text-brand-500 rounded-apple apple-shadow-lg border border-border mb-4">
           <BookCopy className="w-10 h-10 stroke-[2.5]" />
        </div>
        <div className="space-y-2">
          <h1 className="af-page-title">Databank</h1>
          <p className="af-page-subtitle mx-auto">
            Your unified reference library and reasoning engine.
          </p>
        </div>
      </header>

      {/* Visual Glossary */}
      <section className="space-y-6">
        <div className="flex items-center gap-5">
          <div className="p-3 bg-surface apple-shadow rounded-2xl text-brand-500 border border-border"><BrainCircuit className="w-7 h-7 stroke-[2]" /></div>
          <h2 className="af-section-title">Visual Glossary</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:h-[760px] bg-surface rounded-apple-lg border border-border apple-shadow-lg p-6 md:p-8">
            {/* Left Pane: Search & List */}
            <div className="md:col-span-1 flex flex-col h-full overflow-hidden md:border-r border-border md:pr-6">
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-4 w-5 h-5 text-text-muted stroke-[2]" />
                    <input 
                        type="text"
                        aria-label="Search glossary terms"
                        placeholder="Search terms..."
                        value={glossarySearch}
                        onChange={e => setGlossarySearch(e.target.value)}
                        className="w-full pl-12 pr-5 py-3.5 bg-app border border-border rounded-2xl text-base text-text-primary placeholder:text-text-muted font-medium focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all"
                    />
                </div>
                <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                    {filteredGlossary.map(term => (
                        <button 
                            key={term.term}
                            onClick={() => setSelectedTerm(term)}
                            className={`w-full text-left px-4 py-3.5 rounded-2xl text-base font-semibold transition-all duration-300 ${selectedTerm?.term === term.term ? 'bg-brand-500 text-white apple-shadow scale-[1.01]' : 'text-text-secondary hover:bg-app hover:text-text-primary'}`}
                        >
                            {term.term}
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Pane: Concept Card */}
            <div className="md:col-span-2 bg-app/30 rounded-apple p-6 md:p-8 overflow-y-auto custom-scrollbar">
                {selectedTerm ? (
                    <div className="space-y-8 animate-fade-in">
                        <div className="space-y-4">
                          <h3 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight">{selectedTerm.term}</h3>
                          <p className="text-text-secondary text-lg md:text-xl leading-8">{selectedTerm.definition}</p>
                        </div>
                        
                        {SelectedSim && (
                            <div className="bg-surface rounded-apple p-6 border border-border apple-shadow-lg">
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

                        <div className="af-card">
                            <div className="flex items-center gap-3 text-apple-orange af-eyebrow mb-4">
                                <Info className="w-5 h-5 stroke-[2.5]" /> Common Misconception
                            </div>
                            <p className="text-text-secondary text-lg leading-8 italic">
                                "{selectedTerm.misconception}"
                            </p>
                        </div>
                        
                        {relevantLesson && (
                            <button onClick={() => onSelectLesson(relevantLesson)} className="w-full af-primary-action">
                                <BookText className="w-7 h-7 stroke-[2.5]" />
                                Go to Lesson: {relevantLesson.title}
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-text-muted space-y-6">
                        <BookCopy className="w-20 h-20 opacity-10 stroke-[1.5]" />
                        <p className="text-xl font-semibold">Select a term to explore</p>
                    </div>
                )}
            </div>
        </div>
      </section>

      {/* Comparison Engine */}
      <section className="space-y-6">
        <div className="flex items-center gap-5">
          <div className="p-3 bg-surface apple-shadow rounded-2xl text-brand-500 border border-border"><GitCompare className="w-7 h-7 stroke-[2]" /></div>
          <h2 className="af-section-title">Comparison Engine</h2>
        </div>
        <div className="bg-surface rounded-apple-lg border border-border apple-shadow-lg overflow-hidden">
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 border-b border-border bg-app/30">
            <div className="relative w-full md:w-80">
              <select aria-label="First comparison item" value={compareA} onChange={e => setCompareA(e.target.value)} className="w-full bg-surface border border-border rounded-2xl p-4 font-semibold text-base text-text-primary focus:ring-4 focus:ring-brand-500/10 focus:outline-none apple-shadow appearance-none cursor-pointer">
                {comparisonOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <ChevronsUpDown className="absolute right-5 top-5.5 w-6 h-6 text-text-muted pointer-events-none stroke-[2]" />
            </div>
            <div className="p-4 bg-surface rounded-full apple-shadow border border-border">
              <GitCompare className="w-8 h-8 text-brand-500 stroke-[2.5]" />
            </div>
            <div className="relative w-full md:w-80">
              <select aria-label="Second comparison item" value={compareB} onChange={e => setCompareB(e.target.value)} className="w-full bg-surface border border-border rounded-2xl p-4 font-semibold text-base text-text-primary focus:ring-4 focus:ring-brand-500/10 focus:outline-none apple-shadow appearance-none cursor-pointer">
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
              <div key={key} className="grid grid-cols-12 p-5 md:p-6 text-base items-center hover:bg-app transition-colors">
                <div className="col-span-12 md:col-span-3 af-meta mb-3 md:mb-0 opacity-70">{key}</div>
                <div className="col-span-6 md:col-span-4 text-text-primary font-semibold text-center md:text-left">{valA}</div>
                <div className={`col-span-6 md:col-span-5 text-text-primary font-bold text-center md:text-left ${isDifferent ? 'text-brand-500' : ''}`}>{valB}</div>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* Vertical Playbooks */}
      <section className="space-y-6">
        <div className="flex items-center gap-5">
          <div className="p-3 bg-surface apple-shadow rounded-2xl text-brand-500 border border-border"><Briefcase className="w-7 h-7 stroke-[2]" /></div>
          <h2 className="af-section-title">Vertical Playbooks</h2>
        </div>
        {renderExpandableList(playbooks)}
      </section>

      {/* Curated Cheatsheets */}
      <section className="space-y-6">
        <div className="flex items-center gap-5">
          <div className="p-3 bg-surface apple-shadow rounded-2xl text-brand-500 border border-border"><Check className="w-7 h-7 stroke-[2.5]" /></div>
          <h2 className="af-section-title">Curated Cheatsheets</h2>
        </div>
        {renderExpandableList(regularCheatsheets)}
      </section>
    </div>
  );
};

export default Databank;
