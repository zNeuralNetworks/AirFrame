import React from 'react';
import { Star, Clock, Bug, Lightbulb, MessageCircle } from 'lucide-react';

interface CMSFeedbackViewProps {
  item: any;
}

export const CMSFeedbackView: React.FC<CMSFeedbackViewProps> = ({ item }) => {
  const renderIcon = (category: string) => {
    switch (category) {
      case 'bug': return <Bug className="w-5 h-5 text-red-500" />;
      case 'feature': return <Lightbulb className="w-5 h-5 text-amber-500" />;
      default: return <MessageCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="p-5 bg-app rounded-3xl shadow-inner">
            {renderIcon(item.category)}
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-text-primary capitalize tracking-tight">{item.category} Feedback</h3>
            <div className="flex items-center gap-1.5 mt-2">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className={`w-5 h-5 ${item.rating >= star ? 'text-apple-orange fill-apple-orange' : 'text-border'}`} />
              ))}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-text-muted text-sm font-bold uppercase tracking-widest mb-2">
            <Clock className="w-4 h-4 stroke-[2]" />
            {item.timestamp?.toDate ? item.timestamp.toDate().toLocaleString() : 'Recent'}
          </div>
          <span className="px-4 py-1.5 bg-brand-50 text-brand-500 rounded-full text-xs font-extrabold uppercase tracking-widest border border-brand-100">New</span>
        </div>
      </div>

      <div className="bg-app/50 p-8 rounded-apple border border-border apple-shadow">
        <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-6 opacity-60">User Comment</h4>
        <p className="text-text-primary text-2xl leading-relaxed italic font-serif">"{item.comment}"</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-white border border-border rounded-2xl apple-shadow">
          <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3 opacity-60">Page Context</h4>
          <p className="text-lg text-brand-600 font-extrabold capitalize italic">{item.pageContext || 'Unknown'}</p>
        </div>
        <div className="p-6 bg-white border border-border rounded-2xl apple-shadow">
          <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3 opacity-60">Source URL</h4>
          <p className="text-xs text-text-secondary font-mono break-all leading-relaxed">{item.url}</p>
        </div>
        <div className="p-6 bg-white border border-border rounded-2xl apple-shadow md:col-span-2">
          <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3 opacity-60">User Agent</h4>
          <p className="text-xs text-text-secondary font-mono break-all leading-relaxed">{item.userAgent}</p>
        </div>
      </div>
    </div>
  );
};
