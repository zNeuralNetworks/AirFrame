import React, { useState } from 'react';
import { X, Bug, Lightbulb, MessageCircle, Star, CheckCircle2, AlertCircle } from 'lucide-react';
import { track } from '../../../services/telemetry';
import { db, handleFirestoreError, OperationType } from '../../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageContext?: string;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, pageContext }) => {
  const [category, setFeedbackCategory] = useState('general');
  const [rating, setFeedbackRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setFeedbackComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !comment) return;

    setIsSubmitting(true);
    setError(null);
    
    // Track locally first
    track('feedback_submitted', { category, rating, comment, pageContext });

    try {
      // Attempt to save to Firestore
      const path = 'feedback';
      await addDoc(collection(db, path), {
        category,
        rating,
        comment,
        pageContext: pageContext || 'unknown',
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });

      setIsSubmitted(true);
      setTimeout(onClose, 2000);
    } catch (err) {
      console.error('Failed to submit feedback to Firestore:', err);
      
      // Check if it's a configuration error (placeholder values)
      if (err instanceof Error && (err.message.includes('YOUR_API_KEY') || err.message.includes('invalid-api-key'))) {
        setError('Firebase is not yet configured. Please follow the instructions in FIREBASE_SETUP.md.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
      
      // Still log the detailed error for the developer
      try {
        handleFirestoreError(err, OperationType.CREATE, 'feedback');
      } catch (jsonErr) {
        // Error already logged by handleFirestoreError
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-surface rounded-card w-full max-w-md shadow-2xl border border-border-DEFAULT animate-scale-in">
        {isSubmitted ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="p-3 bg-green-100 rounded-full mb-4 border-4 border-green-200">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="font-bold text-xl text-text-primary mb-2">Thank You!</h3>
            <p className="text-text-secondary text-sm">Your feedback helps make Airframe better.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center p-6 border-b border-border-DEFAULT">
              <div>
                <h3 className="font-bold text-lg text-text-primary">Submit Feedback</h3>
                {pageContext && (
                  <p className="text-xs text-text-muted mt-0.5">
                    Context: <span className="text-brand-600 font-semibold italic capitalize">{pageContext}</span>
                  </p>
                )}
              </div>
              <button onClick={onClose} className="p-1 rounded-full text-text-muted hover:bg-surface-highlight hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {error && (
              <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex gap-3 items-start text-red-700 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="text-sm font-bold text-text-primary mb-2 block">Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'bug', label: 'Bug Report', icon: Bug },
                    { id: 'feature', label: 'Feature Idea', icon: Lightbulb },
                    { id: 'general', label: 'General', icon: MessageCircle },
                  ].map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFeedbackCategory(cat.id)}
                      className={`p-3 rounded-lg border flex flex-col items-center gap-1 text-xs font-medium transition-colors ${category === cat.id ? 'bg-brand-50 border-brand-500 text-brand-700' : 'border-border-DEFAULT text-text-muted hover:border-border-highlight hover:bg-surface-highlight'}`}
                    >
                      <cat.icon className="w-4 h-4 mb-1" />
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-text-primary mb-2 block">How's your experience?</label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} type="button" onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} onClick={() => setFeedbackRating(star)}>
                      <Star className={`w-8 h-8 transition-colors ${(hoverRating || rating) >= star ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="feedback-comment" className="text-sm font-bold text-text-primary mb-2 block">Comments</label>
                <textarea
                  id="feedback-comment"
                  value={comment}
                  onChange={e => setFeedbackComment(e.target.value)}
                  placeholder="Tell us what you think..."
                  required
                  className="w-full h-24 p-3 bg-surface-highlight border border-border-DEFAULT rounded-lg text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !comment}
                className="w-full py-3 bg-brand-600 text-white rounded-lg font-bold shadow-md hover:bg-brand-700 disabled:opacity-50 transition-all"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;
