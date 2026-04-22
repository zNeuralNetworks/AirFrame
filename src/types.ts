
export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizAttempt {
  lessonId: string;
  score: number;
  maxScore: number;
  date: string;
}

export type SimulationType = 
  | 'wave-match' 
  | 'network-planner' 
  | 'cv-cue-dashboard' 
  | 'wips-guard' 
  | 'db-game' 
  | 'spectrum-analyzer' 
  | 'signal-thermometer' 
  | 'airtime-highway' 
  | 'roam-lab' 
  | 'timeline-puzzle'
  | 'ofdma-tetris'
  | 'multi-link-racer'
  | 'bottleneck-sim'
  | 'material-lab'
  | 'channel-hex'
  | 'distributed-sim'
  | 'ghost-hunter'
  | 'protocol-match'
  | 'voip-walker'
  | 'handshake-sequencer'
  // FIX: Add missing simulation types to resolve type conflicts.
  | 'poe-budget-sim'
  | 'uplink-bottleneck-sim'
  | 'mtu-fragmentation-sim'
  | 'antenna-lab'
  | null;

export enum ContentStatus {
  Active = 'Active',
  Proposed = 'Proposed',
  Concept = 'Concept'
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string; // Markdown-like text
  difficulty: Difficulty;
  durationMinutes: number;
  xpReward: number;
  completed: boolean;
  simCompleted?: boolean; // New: Tracks if the interactive lab is finished
  locked: boolean;
  quiz: Question[];
  category: string;
  simulationId: SimulationType;
  // Roadmap/Meta fields
  status: ContentStatus;
  objective?: string;
  format?: string;
  suggestion?: string;
}

export interface Module {
  id: string;
  title: string;
  subtitle?: string;
  tag: string;
  description: string;
  icon: string;
  color: string;
  status: ContentStatus;
  lessons: Lesson[];
}

export interface GlossaryTerm {
  term: string;
  aliases?: string[];
  definition: string;
  misconception: string;
  visualId?: SimulationType;
  lessonId?: string;
}

export interface Insight {
  title: string;
  text: string;
  context: string;
  active?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  dateEarned: string;
}

export interface UserProgress {
  totalXp: number;
  streakDays: number;
  completedLessonIds: string[];
  level: number;
  quizHistory: QuizAttempt[];
  achievements: Achievement[];
  isApproved?: boolean;
  username?: string;
}
