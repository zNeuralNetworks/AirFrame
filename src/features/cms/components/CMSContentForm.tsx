import React from 'react';

interface CMSContentFormProps {
  activeTab: string;
  item: any;
  onChange: (item: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const CMSContentForm: React.FC<CMSContentFormProps> = ({ activeTab, item, onChange, onSubmit }) => {
  if (activeTab === 'insights') {
    return (
      <form onSubmit={onSubmit} className="space-y-8">
        <div>
          <label className="block text-sm font-bold text-text-muted uppercase tracking-widest mb-3 opacity-60">Insight Title</label>
          <input 
            type="text" 
            required
            value={item.title || ''} 
            onChange={e => onChange({...item, title: e.target.value})}
            className="w-full px-6 py-4 bg-app border border-border rounded-2xl text-lg font-bold focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-text-muted uppercase tracking-widest mb-3 opacity-60">Differentiator Context</label>
          <input 
            type="text" 
            required
            placeholder="e.g. Security Supremacy"
            value={item.context || ''} 
            onChange={e => onChange({...item, context: e.target.value})}
            className="w-full px-6 py-4 bg-app border border-border rounded-2xl text-lg font-bold focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-text-muted uppercase tracking-widest mb-3 opacity-60">Insight Description</label>
          <textarea 
            required
            value={item.text || ''} 
            onChange={e => onChange({...item, text: e.target.value})}
            className="w-full px-6 py-4 bg-app border border-border rounded-2xl text-lg font-medium focus:ring-4 focus:ring-brand-500/10 outline-none transition-all h-32"
          />
        </div>
      </form>
    );
  }

  if (activeTab === 'lessons') {
    return (
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-bold text-text-muted uppercase tracking-widest mb-3 opacity-60">ID (e.g. 1.1)</label>
            <input 
              type="text" 
              required
              value={item.id || ''} 
              onChange={e => onChange({...item, id: e.target.value})}
              className="w-full px-6 py-4 bg-app border border-border rounded-2xl text-lg font-bold focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-text-muted uppercase tracking-widest mb-3 opacity-60">Title</label>
            <input 
              type="text" 
              required
              value={item.title || ''} 
              onChange={e => onChange({...item, title: e.target.value})}
              className="w-full px-6 py-4 bg-app border border-border rounded-2xl text-lg font-bold focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-text-muted uppercase tracking-widest mb-3 opacity-60">Description</label>
          <textarea 
            value={item.description || ''} 
            onChange={e => onChange({...item, description: e.target.value})}
            className="w-full px-6 py-4 bg-app border border-border rounded-2xl text-lg font-medium focus:ring-4 focus:ring-brand-500/10 outline-none transition-all h-24"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-text-muted uppercase tracking-widest mb-3 opacity-60">Markdown Content</label>
          <textarea 
            required
            value={item.content || ''} 
            onChange={e => onChange({...item, content: e.target.value})}
            className="w-full px-6 py-4 bg-app border border-border rounded-2xl font-mono text-base focus:ring-4 focus:ring-brand-500/10 outline-none transition-all h-[500px]"
          />
        </div>
      </form>
    );
  }

  // Glossary form
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div>
        <label className="block text-sm font-bold text-text-muted uppercase tracking-widest mb-3 opacity-60">Term</label>
        <input 
          type="text" 
          required
          value={item.term || ''} 
          onChange={e => onChange({...item, term: e.target.value})}
          className="w-full px-6 py-4 bg-app border border-border rounded-2xl text-lg font-bold focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-text-muted uppercase tracking-widest mb-3 opacity-60">Definition</label>
        <textarea 
          required
          value={item.definition || ''} 
          onChange={e => onChange({...item, definition: e.target.value})}
          className="w-full px-6 py-4 bg-app border border-border rounded-2xl text-lg font-medium focus:ring-4 focus:ring-brand-500/10 outline-none transition-all h-40"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-text-muted uppercase tracking-widest mb-3 opacity-60">Common Misconception</label>
        <textarea 
          value={item.misconception || ''} 
          onChange={e => onChange({...item, misconception: e.target.value})}
          className="w-full px-6 py-4 bg-app border border-border rounded-2xl text-lg font-medium focus:ring-4 focus:ring-brand-500/10 outline-none transition-all h-40"
        />
      </div>
    </form>
  );
};
