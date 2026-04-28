import { describe, expect, it } from 'vitest';
import { INITIAL_LESSONS } from '../../src/content/lessons';
import { MODULES } from '../../src/content/modules';
import { LAB_SPECS } from '../../src/content/labs';
import { GLOSSARY } from '../../src/content/glossary';
import { simulationRegistry } from '../../src/features/simulations/SimulationRegistry';

describe('content integrity', () => {
  it('keeps lesson records structurally valid', () => {
    const ids = new Set<string>();

    for (const lesson of INITIAL_LESSONS) {
      expect(lesson.id, 'lesson id').toBeTruthy();
      expect(ids.has(lesson.id), `duplicate lesson id: ${lesson.id}`).toBe(false);
      ids.add(lesson.id);

      expect(lesson.title, `${lesson.id} title`).toBeTruthy();
      expect(lesson.description, `${lesson.id} description`).toBeTruthy();
      expect(lesson.category, `${lesson.id} category`).toBeTruthy();
      expect(lesson.content.trim(), `${lesson.id} content`).toBeTruthy();
      expect(lesson.durationMinutes, `${lesson.id} duration`).toBeGreaterThan(0);
      expect(lesson.xpReward, `${lesson.id} xp reward`).toBeGreaterThan(0);

      for (const question of lesson.quiz) {
        expect(question.id, `${lesson.id} question id`).toBeTruthy();
        expect(question.text, `${lesson.id} question text`).toBeTruthy();
        expect(question.options.length, `${lesson.id} question options`).toBeGreaterThan(1);
        expect(question.correctIndex, `${lesson.id} correct index lower bound`).toBeGreaterThanOrEqual(0);
        expect(question.correctIndex, `${lesson.id} correct index upper bound`).toBeLessThan(question.options.length);
        expect(question.explanation, `${lesson.id} question explanation`).toBeTruthy();
      }
    }
  });

  it('keeps simulations wired across lessons, labs, and registry', () => {
    for (const lesson of INITIAL_LESSONS) {
      if (!lesson.simulationId) continue;

      expect(
        simulationRegistry,
        `${lesson.id} has registered simulation ${lesson.simulationId}`
      ).toHaveProperty(lesson.simulationId);
      expect(
        LAB_SPECS,
        `${lesson.id} has lab spec ${lesson.simulationId}`
      ).toHaveProperty(lesson.simulationId);
    }

    for (const spec of Object.values(LAB_SPECS)) {
      expect(simulationRegistry, `lab spec ${spec.id} has registered simulation`).toHaveProperty(spec.id);
      expect(spec.title, `${spec.id} title`).toBeTruthy();
      expect(spec.objective, `${spec.id} objective`).toBeTruthy();
      expect(spec.baseline, `${spec.id} baseline`).toBeTruthy();
      expect(spec.challenges.length, `${spec.id} challenges`).toBeGreaterThan(0);
      expect(spec.observation, `${spec.id} observation`).toBeTruthy();
    }
  });

  it('every non-assessment lesson has at least 1 quiz question', () => {
    for (const lesson of INITIAL_LESSONS) {
      if (lesson.id.endsWith('assessment')) continue;
      expect(
        lesson.quiz.length,
        `${lesson.id} must have at least 1 quiz question for hasPassed to be meaningful`
      ).toBeGreaterThanOrEqual(1);
    }
  });

  it('every lesson with a simulation has a positive xpReward', () => {
    for (const lesson of INITIAL_LESSONS) {
      if (!lesson.simulationId) continue;
      expect(
        lesson.xpReward,
        `${lesson.id} has simulationId but xpReward is 0`
      ).toBeGreaterThan(0);
    }
  });

  it('every simulationId referenced in lessons exists in the registry', () => {
    for (const lesson of INITIAL_LESSONS) {
      if (!lesson.simulationId) continue;
      expect(
        simulationRegistry,
        `lesson ${lesson.id} references unregistered simulationId "${lesson.simulationId}"`
      ).toHaveProperty(lesson.simulationId);
    }
  });

  it('keeps modules and glossary pointing to real lessons', () => {
    const lessonIds = new Set(INITIAL_LESSONS.map((lesson) => lesson.id));

    for (const mod of MODULES) {
      expect(mod.id, 'module id').toBeTruthy();
      expect(mod.title, `${mod.id} title`).toBeTruthy();
      expect(mod.lessons.length, `${mod.id} lessons`).toBeGreaterThan(0);

      for (const lesson of mod.lessons) {
        expect(lessonIds.has(lesson.id), `${mod.id} references ${lesson.id}`).toBe(true);
      }
    }

    for (const term of GLOSSARY) {
      expect(term.term, 'glossary term').toBeTruthy();
      expect(term.definition, `${term.term} definition`).toBeTruthy();
      expect(term.misconception, `${term.term} misconception`).toBeTruthy();

      if (term.lessonId) {
        expect(lessonIds.has(term.lessonId), `${term.term} references ${term.lessonId}`).toBe(true);
      }
      if (term.visualId) {
        expect(simulationRegistry, `${term.term} visual ${term.visualId}`).toHaveProperty(term.visualId);
      }
    }
  });
});
