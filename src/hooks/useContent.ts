
import { useState, useEffect } from 'react';
import { Lesson, GlossaryTerm, Module } from '../types';
import { contentService } from '../services/contentService';
import { useUserStore } from '../state/userStore';
import { MODULES } from '../content/modules';

/**
 * useContent hook abstracts curriculum data fetching and management.
 * It coordinates between static content, Firestore overrides, and user progress.
 */
export const useContent = () => {
  const [modules, setModules] = useState<Module[]>(MODULES);
  const lessons = useUserStore((state) => state.lessons);
  const glossary = useUserStore((state) => state.glossary);
  const isLoading = useUserStore((state) => state.isLoading);
  const { loadLessons, loadGlossary } = useUserStore((state) => state.actions);

  useEffect(() => {
    if (lessons.length === 0) {
      loadLessons();
    }
    if (glossary.length === 0) {
      loadGlossary();
    }
  }, []);

  // Enrich modules with live lesson data (progress, status)
  useEffect(() => {
    if (lessons.length > 0) {
      const enrichedModules = MODULES.map(m => ({
        ...m,
        lessons: m.lessons.map(ml => {
          const live = lessons.find(l => l.id === ml.id);
          return live ? { ...ml, ...live } : ml;
        })
      }));
      setModules(enrichedModules);
    }
  }, [lessons]);

  const getLessonById = (id: string) => lessons.find(l => l.id === id);
  
  const getModuleByLessonId = (lessonId: string) => 
    modules.find(m => m.lessons.some(l => l.id === lessonId));

  return {
    modules,
    lessons,
    glossary,
    isLoading,
    getLessonById,
    getModuleByLessonId,
    refreshContent: () => {
      loadLessons();
      loadGlossary();
    }
  };
};
