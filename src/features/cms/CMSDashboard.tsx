import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Lesson, GlossaryTerm } from '../../types';
import { INITIAL_LESSONS } from '../../content/lessons';
import { GLOSSARY } from '../../content/glossary';
import { Plus, Save, X, BookOpen, MessageSquare, Database, Target, Users, ShieldCheck, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

// Component Imports
import { CMSErrorState } from './components/CMSErrorState';
import { CMSEmptyState } from './components/CMSEmptyState';
import { CMSItemCard } from './components/CMSItemCard';
import { CMSFeedbackView } from './components/CMSFeedbackView';
import { CMSUserView } from './components/CMSUserView';
import { CMSContentForm } from './components/CMSContentForm';

type ContentType = 'lessons' | 'glossary' | 'feedback' | 'insights' | 'users';

const CMSDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ContentType>('lessons');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const q = activeTab === 'users' 
        ? collection(db, 'users')
        : query(
            collection(db, activeTab),
            ...(activeTab === 'feedback' ? [orderBy('timestamp', 'desc')] : [])
          );
          
      const snapshot = await getDocs(q);
      const fetchedItems = snapshot.docs.map(doc => ({ ...doc.data(), firestoreId: doc.id }));
      setItems(fetchedItems);
    } catch (err: any) {
      console.error(`Error fetching ${activeTab}:`, err);
      setError(err?.message || "Missing or insufficient permissions.");
    } finally {
      setLoading(false);
    }
  };

  const handleSeed = async () => {
    setLoading(true);
    let staticData: any[] = [];
    if (activeTab === 'lessons') staticData = INITIAL_LESSONS;
    else if (activeTab === 'glossary') staticData = GLOSSARY;
    else if (activeTab === 'insights') {
      staticData = [
        { title: "Deterministic WIPS", text: "Other systems guess. Arista proves. Our Marker Packet technology ensures zero false positives by correlating wired and wireless data.", context: "Security Supremacy" },
        { title: "Mean Time to Innocence", text: "The #1 goal in Wi-Fi troubleshooting is proving it's NOT the Wi-Fi. The Client Journey provides the undeniable proof.", context: "Operational Edge" },
        { title: "Roaming Precision", text: "802.11k/v/r aren't 'suggestions'. They are the map, the nudge, and the keys that enable sub-50ms seamless roams.", context: "Roaming Excellence" }
      ];
    }

    try {
      for (const item of staticData) {
        const id = activeTab === 'lessons' ? (item as Lesson).id : 
                   activeTab === 'glossary' ? (item as GlossaryTerm).term :
                   (item.title as string).toLowerCase().replace(/\s+/g, '-');
        await setDoc(doc(db, activeTab, id), item);
      }
      await fetchItems();
    } catch (error) {
      console.error("Error seeding data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editingItem || activeTab === 'feedback' || activeTab === 'users') return;

    try {
      const id = activeTab === 'lessons' ? editingItem.id : 
                 activeTab === 'glossary' ? editingItem.term :
                 editingItem.firestoreId || editingItem.title.toLowerCase().replace(/\s+/g, '-');
      
      await setDoc(doc(db, activeTab, id), {
        ...editingItem,
        updatedAt: new Date().toISOString()
      });
      setEditingItem(null);
      setIsNew(false);
      fetchItems();
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteDoc(doc(db, activeTab, id));
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="min-h-screen bg-app p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-extrabold text-text-primary tracking-tight font-serif">Airframe CMS</h1>
            <p className="text-text-muted text-xl font-medium mt-2">Manage curriculum, insights, and user analytics.</p>
          </div>
          <div className="flex gap-4">
            {(activeTab !== 'feedback' && activeTab !== 'users') && (
              <button 
                onClick={() => { setEditingItem({}); setIsNew(true); }}
                className="flex items-center gap-3 px-8 py-4 bg-brand-500 text-white rounded-apple font-bold text-lg apple-shadow hover:bg-brand-600 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Plus className="w-6 h-6 stroke-[2.5]" />
                Add New
              </button>
            )}
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar Nav */}
          <aside className="w-full md:w-72 shrink-0">
            <nav className="space-y-3 sticky top-12">
              {[
                { id: 'lessons', label: 'Lessons', icon: BookOpen },
                { id: 'glossary', label: 'Glossary', icon: MessageSquare },
                { id: 'insights', label: 'Kill Shots', icon: Target },
                { id: 'feedback', label: 'User Feedback', icon: Database },
                { id: 'users', label: 'User Analytics', icon: Users },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ContentType)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-lg transition-all ${activeTab === tab.id ? 'bg-white text-brand-500 apple-shadow scale-[1.02]' : 'text-text-muted hover:bg-white/50 hover:text-text-primary'}`}
                >
                  <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? 'stroke-[2.5]' : 'stroke-[1.5]'}`} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-brand-500"></div>
              </div>
            ) : error ? (
              <CMSErrorState error={error} />
            ) : items.length === 0 ? (
              <CMSEmptyState activeTab={activeTab} onSeed={handleSeed} />
            ) : (
              <div className="grid gap-6">
                {items.map(item => (
                  <CMSItemCard 
                    key={item.firestoreId} 
                    item={item} 
                    activeTab={activeTab} 
                    onEdit={setEditingItem}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingItem(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative bg-white w-full max-w-6xl h-full max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col border border-white/20"
            >
              <header className="p-8 border-b border-border flex justify-between items-center shrink-0">
                <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">
                  {activeTab === 'feedback' ? 'Feedback Details' : 
                   activeTab === 'users' ? 'User Progress Report' :
                   (isNew ? 'Create New' : 'Edit') + ' ' + (activeTab === 'lessons' ? 'Lesson' : activeTab === 'glossary' ? 'Glossary Term' : 'Kill Shot')}
                </h2>
                <button onClick={() => setEditingItem(null)} className="p-3 hover:bg-app rounded-full transition-colors">
                  <X className="w-7 h-7 text-text-muted stroke-[2.5]" />
                </button>
              </header>

              <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                <div className="flex-1 overflow-y-auto p-10 space-y-8 border-r border-border custom-scrollbar">
                  {activeTab === 'feedback' ? (
                    <CMSFeedbackView item={editingItem} />
                  ) : activeTab === 'users' ? (
                    <CMSUserView item={editingItem} />
                  ) : (
                    <CMSContentForm 
                      activeTab={activeTab} 
                      item={editingItem} 
                      onChange={setEditingItem}
                      onSubmit={handleSave}
                    />
                  )}
                </div>

                {/* Preview Area */}
                <div className="w-full md:w-[400px] bg-app/50 overflow-y-auto p-10 custom-scrollbar">
                  <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-6 opacity-60">
                    {activeTab === 'feedback' ? 'Action Panel' : 
                     activeTab === 'users' ? 'Quick Actions' :
                     'Live Preview'}
                  </h3>
                  {activeTab === 'feedback' ? (
                    <div className="space-y-6">
                      <p className="text-base text-text-secondary mb-8 leading-relaxed font-medium">Review this feedback and take necessary action. You can delete it once resolved.</p>
                      <button 
                        onClick={() => handleDelete(editingItem.firestoreId)}
                        className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-red-50 text-apple-red rounded-2xl font-bold text-lg hover:bg-red-100 transition-all apple-shadow"
                      >
                        <Trash2 className="w-6 h-6 stroke-[2.5]" />
                        Delete Feedback
                      </button>
                      <button 
                        onClick={() => setEditingItem(null)}
                        className="w-full flex items-center justify-center gap-3 px-6 py-5 bg-white border border-border text-text-primary rounded-2xl font-bold text-lg hover:bg-app transition-all apple-shadow"
                      >
                        Mark as Read
                      </button>
                    </div>
                  ) : activeTab === 'users' ? (
                    <div className="space-y-6">
                      <p className="text-sm text-text-muted leading-relaxed">View detailed analytics for this user. You can reset their progress if they request a fresh start (caution: irreversible).</p>
                      <button 
                         className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border border-border text-text-primary rounded-2xl font-bold hover:bg-app transition-all"
                         onClick={() => alert("User reset logic not yet implemented via CMS")}
                      >
                        Reset Application Progress
                      </button>
                    </div>
                  ) : activeTab === 'insights' ? (
                    <div className="bg-white p-8 rounded-apple-lg apple-shadow border border-border">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-600 mb-3 block">{editingItem.context || 'CATEGORY'}</span>
                      <h4 className="text-2xl font-extrabold text-text-primary mb-4 tracking-tight leading-tight">{editingItem.title || 'Insight Title'}</h4>
                      <p className="text-text-secondary text-base leading-relaxed italic">{editingItem.text || 'The insight text will appear here...'}</p>
                    </div>
                  ) : activeTab === 'lessons' ? (
                    <div className="prose prose-slate prose-lg max-w-none font-serif">
                      <ReactMarkdown>{editingItem.content || '*No content yet*'}</ReactMarkdown>
                    </div>
                  ) : (
                    <div className="bg-white p-8 rounded-apple-lg apple-shadow border border-border">
                      <h4 className="text-3xl font-extrabold text-text-primary mb-4 tracking-tight font-serif">{editingItem.term || 'Term Name'}</h4>
                      <p className="text-text-secondary text-xl leading-relaxed font-serif mb-8">{editingItem.definition || 'Definition will appear here...'}</p>
                      {editingItem.misconception && (
                        <div className="p-6 bg-orange-50 border border-orange-100 rounded-apple">
                          <h5 className="text-xs font-bold text-apple-orange uppercase tracking-widest mb-3">Misconception</h5>
                          <p className="text-lg text-orange-900 italic font-medium leading-relaxed">"{editingItem.misconception}"</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <footer className="p-8 border-t border-border flex justify-end gap-6 shrink-0 bg-white/80 backdrop-blur-md">
                <button 
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-8 py-4 text-text-muted font-bold text-lg hover:bg-app rounded-apple transition-all"
                >
                  {(activeTab === 'feedback' || activeTab === 'users') ? 'Close' : 'Cancel'}
                </button>
                {(activeTab !== 'feedback' && activeTab !== 'users') && (
                  <button 
                    onClick={() => handleSave()}
                    className="flex items-center gap-3 px-12 py-4 bg-brand-500 text-white rounded-apple font-bold text-lg apple-shadow hover:bg-brand-600 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <Save className="w-6 h-6 stroke-[2.5]" />
                    Save Changes
                  </button>
                )}
              </footer>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CMSDashboard;
