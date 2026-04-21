import React from 'react';
import { BookOpen, MessageSquare, Target, Users, Bug, Lightbulb, MessageCircle, Star, Edit2, Trash2, ChevronRight } from 'lucide-react';

interface CMSItemCardProps {
  item: any;
  activeTab: string;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

export const CMSItemCard: React.FC<CMSItemCardProps> = ({ item, activeTab, onEdit, onDelete }) => {
  const renderIcon = () => {
    if (activeTab === 'lessons') return <BookOpen className="w-7 h-7 stroke-[2]" />;
    if (activeTab === 'glossary') return <MessageSquare className="w-7 h-7 stroke-[2]" />;
    if (activeTab === 'insights') return <Target className="w-7 h-7 stroke-[2]" />;
    if (activeTab === 'users') return <Users className="w-7 h-7 stroke-[2]" />;
    
    switch (item.category) {
      case 'bug': return <Bug className="w-5 h-5 text-red-500" />;
      case 'feature': return <Lightbulb className="w-5 h-5 text-amber-500" />;
      default: return <MessageCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getTitle = () => {
    if (activeTab === 'lessons') return item.title;
    if (activeTab === 'glossary') return item.term;
    if (activeTab === 'insights') return item.title;
    if (activeTab === 'users') return item.email || item.firestoreId;
    return ((item.category || 'General').charAt(0).toUpperCase() + (item.category || 'General').slice(1));
  };

  const getDescription = () => {
    if (activeTab === 'lessons') return item.description;
    if (activeTab === 'glossary') return item.definition;
    if (activeTab === 'insights') return item.text;
    if (activeTab === 'users') return `${item.totalXp || 0} XP • ${item.completedLessonIds?.length || 0} Lessons Complete`;
    return item.comment;
  };

  return (
    <div className="bg-white p-6 rounded-apple border border-border flex justify-between items-center apple-shadow hover:scale-[1.01] transition-all group">
      <div className="flex items-center gap-6 flex-1 min-w-0">
        <div className="w-14 h-14 bg-app text-text-muted rounded-2xl flex items-center justify-center group-hover:bg-brand-50 group-hover:text-brand-500 transition-colors shrink-0 shadow-inner">
          {renderIcon()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h4 className="font-extrabold text-text-primary text-xl truncate tracking-tight">
              {getTitle()}
            </h4>
            {activeTab === 'feedback' && (
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className={`w-3.5 h-3.5 ${item.rating >= star ? 'text-apple-orange fill-apple-orange' : 'text-border'}`} />
                ))}
              </div>
            )}
            {activeTab === 'users' && (
              <span className="px-2 py-0.5 bg-brand-50 text-brand-600 rounded text-[10px] font-bold uppercase tracking-wider">Level {item.level || 1}</span>
            )}
          </div>
          <p className="text-base text-text-muted truncate font-medium mt-1">
            {getDescription()}
          </p>
        </div>
      </div>
      <div className="flex gap-3 ml-6">
        <button 
          onClick={() => onEdit(item)}
          className="p-3 text-text-muted hover:text-brand-500 hover:bg-brand-50 rounded-xl transition-all"
        >
          {(activeTab === 'feedback' || activeTab === 'users') ? <ChevronRight className="w-6 h-6 stroke-[2.5]" /> : <Edit2 className="w-6 h-6 stroke-[2]" />}
        </button>
        {activeTab !== 'users' && (
          <button 
            onClick={() => onDelete(item.firestoreId)}
            className="p-3 text-text-muted hover:text-apple-red hover:bg-red-50 rounded-xl transition-all"
          >
            <Trash2 className="w-6 h-6 stroke-[2]" />
          </button>
        )}
      </div>
    </div>
  );
};
