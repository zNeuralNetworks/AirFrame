import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Lesson, GlossaryTerm } from '../types';
import { INITIAL_LESSONS } from '../content/lessons';
import { GLOSSARY } from '../content/glossary';

class ContentService {
  private static instance: ContentService;
  
  private constructor() {}

  public static getInstance(): ContentService {
    if (!ContentService.instance) {
      ContentService.instance = new ContentService();
    }
    return ContentService.instance;
  }

  /**
   * Fetches all lessons, merging Firestore data with static defaults and optionally user progress.
   */
  async getLessons(currentProgress?: Lesson[]): Promise<Lesson[]> {
    try {
      const snapshot = await getDocs(collection(db, 'lessons'));
      const firestoreLessons = snapshot.docs.map(doc => doc.data() as Lesson);
      
      let baseLessons = [...INITIAL_LESSONS];
      if (firestoreLessons.length > 0) {
        // Merge: Firestore lessons override static ones by ID
        firestoreLessons.forEach(fsLesson => {
          const index = baseLessons.findIndex(l => l.id === fsLesson.id);
          if (index !== -1) {
            baseLessons[index] = fsLesson;
          } else {
            baseLessons.push(fsLesson);
          }
        });
      }

      // Merge with user progress if provided
      if (currentProgress) {
        return baseLessons.map(l => {
          const saved = currentProgress.find(p => p.id === l.id);
          if (saved) {
            return {
              ...l,
              completed: saved.completed,
              simCompleted: saved.simCompleted,
              locked: saved.locked
            };
          }
          return l;
        }).sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' }));
      }

      return baseLessons.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' }));
    } catch (error) {
      console.warn("Failed to fetch lessons from Firestore, falling back to static content.", error);
      
      const base = [...INITIAL_LESSONS];
      if (currentProgress) {
        return base.map(l => {
          const saved = currentProgress.find(p => p.id === l.id);
          if (saved) {
            return {
              ...l,
              completed: saved.completed,
              simCompleted: saved.simCompleted,
              locked: saved.locked
            };
          }
          return l;
        });
      }
      return base;
    }
  }

  /**
   * Fetches all glossary terms.
   */
  async getGlossary(): Promise<GlossaryTerm[]> {
    try {
      const snapshot = await getDocs(collection(db, 'glossary'));
      const firestoreGlossary = snapshot.docs.map(doc => doc.data() as GlossaryTerm);
      
      if (firestoreGlossary.length === 0) return GLOSSARY;

      const merged = [...GLOSSARY];
      firestoreGlossary.forEach(fsTerm => {
        const index = merged.findIndex(t => t.term === fsTerm.term);
        if (index !== -1) {
          merged[index] = fsTerm;
        } else {
          merged.push(fsTerm);
        }
      });

      return merged.sort((a, b) => a.term.localeCompare(b.term));
    } catch (error) {
      console.warn("Failed to fetch glossary from Firestore, falling back to static content.", error);
      return GLOSSARY;
    }
  }
}

export const contentService = ContentService.getInstance();
