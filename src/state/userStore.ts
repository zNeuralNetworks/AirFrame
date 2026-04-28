import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Lesson, UserProgress, QuizAttempt, GlossaryTerm } from '../types';
import { INITIAL_LESSONS } from '../content/lessons';
import { GLOSSARY } from '../content/glossary';
import { MOCK_USER } from '../content/user';

export interface UserInfo {
  id: string;
  email: string;
  uid?: string;
}

export interface UserState {
  lessons: Lesson[];
  glossary: GlossaryTerm[];
  user: UserProgress;
  isLoading: boolean;
  isAuthReady: boolean;
  currentUser: UserInfo | null;
  actions: {
    loadLessons: () => Promise<void>;
    loadGlossary: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
    syncProgress: () => Promise<void>;
    saveToFirebase: (progress: UserProgress) => Promise<void>;
    completeLesson: (lessonId: string, xpReward: number) => Promise<void>;
    setSimCompleted: (lessonId: string) => Promise<void>;
    recordQuizAttempt: (lessonId: string, score: number, maxScore: number) => Promise<void>;
    setUsername: (username: string) => Promise<void>;
    saveReflection: (lessonId: string, text: string) => void;
    getReflection: (lessonId: string) => string;
    awardAchievement: (achievementId: string) => Promise<void>;
    resetProgress: () => void;
  };
}

const REFLECTIONS_KEY = 'airframe_reflections_v1';
const ADMIN_EMAIL = 'tinurajan1@gmail.com';
const isE2EAuthEnabled = import.meta.env.VITE_AIRFRAME_E2E_AUTH === '1';

const isAuthorized = (email: string | null | undefined) => {
  if (!email) return false;
  const lowerEmail = email.toLowerCase();
  return lowerEmail.endsWith('@arista.com') || lowerEmail === ADMIN_EMAIL;
};

const emptyProgress = (): UserProgress => ({
  ...MOCK_USER,
  quizHistory: [],
  achievements: [],
  completedLessonIds: []
});

const initialProgress = () => {
  return { 
    lessons: INITIAL_LESSONS, 
    glossary: GLOSSARY,
    user: emptyProgress(), 
    isLoading: false 
  };
};

const mergeProgress = (local: UserProgress, remote?: Partial<UserProgress> | null): UserProgress => {
  if (!remote) return local;

  const completedLessonIds = Array.from(new Set([
    ...(remote.completedLessonIds || []),
    ...(local.completedLessonIds || [])
  ]));

  const achievementMap = new Map<string, UserProgress['achievements'][number]>();
  [...(remote.achievements || []), ...(local.achievements || [])].forEach((achievement) => {
    achievementMap.set(achievement.id, achievement);
  });

  const quizHistory = [...(remote.quizHistory || []), ...(local.quizHistory || [])];
  const seenAttempts = new Set<string>();
  const uniqueQuizHistory = quizHistory.filter((attempt) => {
    const key = `${attempt.lessonId}:${attempt.score}:${attempt.maxScore}:${attempt.date}`;
    if (seenAttempts.has(key)) return false;
    seenAttempts.add(key);
    return true;
  });

  return {
    ...local,
    ...remote,
    totalXp: Math.max(local.totalXp || 0, remote.totalXp || 0),
    streakDays: Math.max(local.streakDays || 0, remote.streakDays || 0),
    level: Math.max(local.level || 1, remote.level || 1),
    completedLessonIds,
    quizHistory: uniqueQuizHistory,
    achievements: Array.from(achievementMap.values()),
    isApproved: local.isApproved || remote.isApproved
  };
};

export const mergePersistedUserState = (
  persistedState: unknown,
  currentState: UserState
): UserState => {
  const persisted = persistedState as Partial<Pick<UserState, 'lessons' | 'user' | 'currentUser'>>;
  const mergedLessons = INITIAL_LESSONS.map(initLesson => {
    const savedLesson = persisted.lessons?.find((l: Partial<Lesson>) => l.id === initLesson.id);
    if (savedLesson) {
      return {
        ...initLesson,
        completed: savedLesson.completed || false,
        simCompleted: savedLesson.simCompleted || false,
        // Force unlock if the source content says it's unlocked, otherwise honor saved state
        locked: initLesson.locked === false ? false : (savedLesson.locked !== undefined ? savedLesson.locked : initLesson.locked),
      };
    }
    return initLesson;
  });

  const mergedUser = {
    ...MOCK_USER,
    ...(persisted.user || {}),
    quizHistory: persisted.user?.quizHistory || [],
    achievements: persisted.user?.achievements || []
  };
  
  return {
    ...currentState,
    currentUser: persisted.currentUser || null,
    lessons: mergedLessons,
    user: mergedUser,
  };
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      ...initialProgress(),
      isAuthReady: false,
      currentUser: null,
      actions: {
        login: async (email, password) => {
          set({ isLoading: true });
          try {
            const { auth } = await import('../lib/firebase');
            const { signInWithEmailAndPassword } = await import('firebase/auth');
            const result = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = result.user;
            const approved = isAuthorized(email);
            set((state) => ({ 
              currentUser: {
                id: firebaseUser.uid,
                uid: firebaseUser.uid,
                email: firebaseUser.email || email
              }, 
              isLoading: false,
              user: {
                ...state.user,
                isApproved: approved || state.user.isApproved
              }
            }));
            await get().actions.syncProgress();
          } catch (error) {
            console.error("Login failed", error);
            set({ isLoading: false });
            throw error;
          }
        },
        loginWithGoogle: async () => {
          set({ isLoading: true });
          try {
            const { auth, googleProvider, signInWithPopup } = await import('../lib/firebase');
            const result = await signInWithPopup(auth, googleProvider);
            const firebaseUser = result.user;
            
            const approved = isAuthorized(firebaseUser.email);
            
            set((state) => ({ 
              currentUser: {
                id: firebaseUser.uid,
                uid: firebaseUser.uid,
                email: firebaseUser.email || ''
              }, 
              isLoading: false,
              user: {
                ...state.user,
                isApproved: approved || state.user.isApproved
              }
            }));

            // Sync with Firestore
            await get().actions.syncProgress();
          } catch (error: any) {
            console.error("Google Login failed", error);
            set({ isLoading: false });
            if (error?.code === 'auth/unauthorized-domain') {
              throw new Error(
                `This domain is not authorized for Google sign-in. ` +
                `Add "${window.location.hostname}" to Firebase Console → Authentication → Settings → Authorized domains.`
              );
            }
            throw error;
          }
        },
        register: async (email, password) => {
          set({ isLoading: true });
          try {
            const { auth } = await import('../lib/firebase');
            const { createUserWithEmailAndPassword } = await import('firebase/auth');
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const firebaseUser = result.user;
            const approved = isAuthorized(email);
            set((state) => ({ 
              currentUser: {
                id: firebaseUser.uid,
                uid: firebaseUser.uid,
                email: firebaseUser.email || email
              }, 
              isLoading: false,
              user: {
                ...state.user,
                isApproved: approved || state.user.isApproved
              }
            }));
          } catch (error) {
            console.error("Registration failed", error);
            set({ isLoading: false });
            throw error;
          }
        },
        logout: async () => {
          try {
            const { auth } = await import('../lib/firebase');
            await auth.signOut();
          } catch (e) {}
          
          localStorage.removeItem('airframe_progress_v3');
          set({ 
            currentUser: null, 
            user: emptyProgress()
          });
        },
        syncProgress: async () => {
          const { currentUser } = get();
          if (!currentUser) return;

          set({ isLoading: true });

          if (currentUser.uid) {
            try {
              const { db } = await import('../lib/firebase');
              const { doc, getDoc, setDoc, serverTimestamp } = await import('firebase/firestore');
              const userRef = doc(db, 'users', currentUser.uid);
              const userDoc = await getDoc(userRef);
              const localProgress = get().user;
              const approved = isAuthorized(currentUser.email);

              if (userDoc.exists()) {
                const merged = mergeProgress(localProgress, userDoc.data() as UserProgress);
                const approvedMerged = { ...merged, isApproved: approved || merged.isApproved };
                set({ user: approvedMerged });
                await setDoc(userRef, {
                  ...approvedMerged,
                  updatedAt: serverTimestamp()
                }, { merge: true });
              } else {
                const emptyRemoteProgress = {
                  ...emptyProgress(),
                  totalXp: 0,
                  streakDays: 0,
                  level: 1,
                  completedLessonIds: [],
                  quizHistory: [],
                  achievements: [],
                };
                await setDoc(userRef, {
                  ...emptyRemoteProgress,
                  updatedAt: serverTimestamp()
                });
                const merged = mergeProgress(localProgress, emptyRemoteProgress);
                const approvedMerged = { ...merged, isApproved: approved || merged.isApproved };
                set({ user: approvedMerged });
                await setDoc(userRef, {
                  ...approvedMerged,
                  updatedAt: serverTimestamp()
                }, { merge: true });
              }
              set({ isLoading: false });
              return;
            } catch (e) {
              console.error("Firebase sync failed", e);
            }
          }
          set({ isLoading: false });
        },
        saveToFirebase: async (progress: UserProgress) => {
          if (isE2EAuthEnabled) return;

          const { currentUser } = get();
          if (currentUser?.uid) {
            try {
              const { db } = await import('../lib/firebase');
              const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');
              const userRef = doc(db, 'users', currentUser.uid);
              await setDoc(userRef, {
                ...progress,
                updatedAt: serverTimestamp()
              }, { merge: true });
            } catch (e) {
              console.error("Failed to save to Firebase", e);
            }
          }
        },
        loadLessons: async () => {
          set({ isLoading: true });
          try {
            const { contentService } = await import('../services/contentService');
            const lessons = await contentService.getLessons(get().lessons);
            set({ lessons, isLoading: false });
          } catch (error) {
            console.error("Failed to load lessons", error);
            set({ isLoading: false });
          }
        },
        loadGlossary: async () => {
          try {
            const { contentService } = await import('../services/contentService');
            const glossary = await contentService.getGlossary();
            set({ glossary });
          } catch (error) {
            console.error("Failed to load glossary", error);
          }
        },
        completeLesson: async (lessonId, xpReward) => {
          const state = get();
          const updatedLessons = state.lessons.map(l => {
            if (l.id === lessonId) return { ...l, completed: true };
            return l;
          });

          const completedIndex = updatedLessons.findIndex(l => l.id === lessonId);
          if (completedIndex !== -1 && completedIndex < updatedLessons.length - 1) {
            updatedLessons[completedIndex + 1].locked = false;
          }

          let updatedUser = state.user;
          if (!state.user.completedLessonIds.includes(lessonId)) {
            const newXp = state.user.totalXp + xpReward;
            const newLevel = Math.floor(newXp / 500) + 1;
            
            updatedUser = {
              ...state.user,
              totalXp: newXp,
              level: newLevel,
              completedLessonIds: [...state.user.completedLessonIds, lessonId]
            };

            const completedLesson = updatedLessons.find(l => l.id === lessonId);
            if (completedLesson) {
              const categoryLessons = updatedLessons.filter(l => l.category === completedLesson.category);
              const allCategoryCompleted = categoryLessons.every(l => l.completed);
              if (allCategoryCompleted) {
                const achievementId = 'module-master';
                if (!updatedUser.achievements.some(a => a.id === achievementId)) {
                  const achievementsList: any = {
                    'module-master': { id: 'module-master', title: 'Module Master', description: 'Finished all lessons in a module!', icon: 'Award' }
                  };
                  const newAchievement = achievementsList[achievementId];
                  updatedUser.achievements = [...updatedUser.achievements, { ...newAchievement, dateEarned: new Date().toISOString() }];
                }
              }
            }

            // Sync with Firebase
            await get().actions.saveToFirebase(updatedUser);
          }
          
          set({ lessons: updatedLessons, user: updatedUser });
        },
        setSimCompleted: async (lessonId) => {
          const state = get();
          const updatedLessons = state.lessons.map(l => 
            l.id === lessonId ? { ...l, simCompleted: true } : l
          );
          set({ lessons: updatedLessons });
        },
        recordQuizAttempt: async (lessonId, score, maxScore) => {
          const { awardAchievement } = get().actions;
          const state = get();
          
          const attempt: QuizAttempt = {
            lessonId,
            score,
            maxScore,
            date: new Date().toISOString()
          };
          
          const updatedUser = {
            ...state.user,
            quizHistory: [...state.user.quizHistory, attempt]
          };

          set({ user: updatedUser });
          
          // Sync with Firebase
          await get().actions.saveToFirebase(updatedUser);

          if (score === maxScore) {
            await awardAchievement('perfect-score');
          }
          if (updatedUser.quizHistory.length === 1) {
            await awardAchievement('first-quiz');
          }
        },
        setUsername: async (username) => {
          const updatedUser = { ...get().user, username };
          set({ user: updatedUser });
          await get().actions.saveToFirebase(updatedUser);
        },
        saveReflection: (lessonId, text) => {
          try {
            const saved = localStorage.getItem(REFLECTIONS_KEY);
            const reflections = saved ? JSON.parse(saved) : {};
            reflections[lessonId] = text;
            localStorage.setItem(REFLECTIONS_KEY, JSON.stringify(reflections));
          } catch (e) {
            console.error("Failed to save reflection", e);
          }
        },
        getReflection: (lessonId) => {
          try {
            const saved = localStorage.getItem(REFLECTIONS_KEY);
            if (!saved) return "";
            const reflections = JSON.parse(saved);
            return reflections[lessonId] || "";
          } catch (e) {
            return "";
          }
        },
        awardAchievement: async (achievementId) => {
          const state = get();
          if (state.user.achievements.some(a => a.id === achievementId)) return;
          
          const achievementsList: any = {
            'first-quiz': { id: 'first-quiz', title: 'First Steps', description: 'Completed your first quiz!', icon: 'Trophy' },
            'perfect-score': { id: 'perfect-score', title: 'Perfect 10', description: 'Got 100% on a quiz!', icon: 'Zap' },
            'module-master': { id: 'module-master', title: 'Module Master', description: 'Finished all lessons in a module!', icon: 'Award' }
          };

          const newAchievement = achievementsList[achievementId];
          if (!newAchievement) return;

          const updatedAchievements = [...state.user.achievements, { ...newAchievement, dateEarned: new Date().toISOString() }];
          
          const updatedUser = {
            ...state.user,
            achievements: updatedAchievements
          };

          set({ user: updatedUser });

          // Sync with Firebase
          await get().actions.saveToFirebase(updatedUser);
        },
        resetProgress: () => {
          localStorage.removeItem(REFLECTIONS_KEY);
          set(initialProgress());
        }
      }
    }),
    {
      name: 'airframe_progress_v3',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentUser: state.currentUser,
        lessons: state.lessons.map(l => ({
          id: l.id,
          completed: l.completed,
          simCompleted: l.simCompleted,
          locked: l.locked,
        })),
        user: state.user
      }),
      merge: mergePersistedUserState,
    }
  )
);

export const useUserActions = () => useUserStore((state) => state.actions);
