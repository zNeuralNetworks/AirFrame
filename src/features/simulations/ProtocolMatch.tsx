
import React, { useState } from 'react';
import { Book, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProtocolMatchProps {
  onComplete: () => void;
}

const ProtocolMatch: React.FC<ProtocolMatchProps> = ({ onComplete }) => {
  const [cards, setCards] = useState([
    { id: 'k', label: '802.11k', type: 'term', matched: false },
    { id: 'v', label: '802.11v', type: 'term', matched: false },
    { id: 'r', label: '802.11r', type: 'term', matched: false },
    { id: 'k-def', label: 'Neighbor Report (The Map)', type: 'def', matchId: 'k', matched: false },
    { id: 'v-def', label: 'BSS Transition (The Nudge)', type: 'def', matchId: 'v', matched: false },
    { id: 'r-def', label: 'Fast Transition (The Keys)', type: 'def', matchId: 'r', matched: false },
  ].sort(() => Math.random() - 0.5));

  const [selected, setSelected] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  const handleSelect = (id: string) => {
    if (selected === id) {
       setSelected(null);
       return;
    }

    if (!selected) {
       setSelected(id);
    } else {
       // Check match
       const card1 = cards.find(c => c.id === selected);
       const card2 = cards.find(c => c.id === id);
       
       if (
          (card1?.type !== card2?.type) && 
          (card1?.matchId === card2?.id || card2?.matchId === card1?.id)
       ) {
          // Match!
          const newCards = cards.map(c => 
             (c.id === selected || c.id === id) ? { ...c, matched: true } : c
          );
          setCards(newCards);
          setSelected(null);
          
          if (newCards.every(c => c.matched)) {
             setTimeout(onComplete, 1000);
          }
       } else {
          // No match
          setShake(true);
          setTimeout(() => {
             setShake(false);
             setSelected(null);
          }, 500);
       }
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700 text-white max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Book className="w-5 h-5 text-violet-400" />
            Alphabet Soup
          </h3>
          <p className="text-slate-400 text-sm">Match the protocol standard to its function.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
         {/* Terms Column */}
         <div className="space-y-4">
            {cards.filter(c => c.type === 'term').map(card => (
               <button
                  key={card.id}
                  onClick={() => !card.matched && handleSelect(card.id)}
                  disabled={card.matched}
                  className={`
                     w-full p-4 rounded-xl border-2 font-bold text-lg transition-all duration-200
                     ${card.matched ? 'bg-green-500/20 border-green-500 text-green-400 opacity-50' : 
                       selected === card.id ? 'bg-violet-500 border-violet-400 text-white scale-105 shadow-lg' : 
                       'bg-slate-800 border-slate-600 hover:border-slate-400 text-slate-300'}
                     ${selected && shake ? 'animate-shake' : ''}
                  `}
               >
                  {card.label}
                  {card.matched && <CheckCircle2 className="inline ml-2 w-5 h-5" />}
               </button>
            ))}
         </div>

         {/* Definitions Column */}
         <div className="space-y-4">
            {cards.filter(c => c.type === 'def').map(card => (
               <button
                  key={card.id}
                  onClick={() => !card.matched && handleSelect(card.id)}
                  disabled={card.matched}
                  className={`
                     w-full p-4 rounded-xl border-2 text-sm font-medium transition-all duration-200 h-16 flex items-center justify-center text-center
                     ${card.matched ? 'bg-green-500/20 border-green-500 text-green-400 opacity-50' : 
                       selected === card.id ? 'bg-violet-500 border-violet-400 text-white scale-105 shadow-lg' : 
                       'bg-slate-800 border-slate-600 hover:border-slate-400 text-slate-300'}
                     ${selected && shake ? 'animate-shake' : ''}
                  `}
               >
                  {card.label}
               </button>
            ))}
         </div>
      </div>

      <style>{`
         @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
         }
         .animate-shake { animation: shake 0.3s ease-in-out; }
      `}</style>
    </div>
  );
};

export default ProtocolMatch;
