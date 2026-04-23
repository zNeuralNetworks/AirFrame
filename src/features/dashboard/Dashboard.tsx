import React, { useMemo, useEffect, useState } from 'react';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Insight } from '../../types';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip 
} from 'recharts';
import { useUserStore } from '../../state/userStore';
import { Zap, Flame, Trophy, ArrowRight, Award, Clock, BrainCircuit, Target, ArrowRightLeft, Info, BookOpen } from 'lucide-react';
import Mascot from '../../shared/ui/Mascot';
import { GLOSSARY } from '../../content/glossary';
import { COMPARISON_DATA } from '../../content/comparisons';

interface DashboardProps {
  onContinue: () => void;
}

const KILL_SHOT_INSIGHTS = [
  {
    title: "Deterministic WIPS",
    text: "Other systems guess. Arista proves. Our Marker Packet technology ensures zero false positives by correlating wired and wireless data.",
    context: "Security Supremacy"
  },
  {
    title: "Mean Time to Innocence",
    text: "The #1 goal in Wi-Fi troubleshooting is proving it's NOT the Wi-Fi. The Client Journey provides the undeniable proof.",
    context: "Operational Edge"
  },
  {
    title: "Roaming Precision",
    text: "802.11k/v/r aren't 'suggestions'. They are the map, the nudge, and the keys that enable sub-50ms seamless roams.",
    context: "Roaming Excellence"
  },
  {
    title: "Puncturing Proficiency",
    text: "Multi-RU Puncturing in Wi-Fi 7 allows the network to 'carve out' interference in a wide channel rather than losing the whole channel.",
    context: "Spectrum Efficiency"
  }
];

const RANKS = [
  { minLevel: 1, label: 'Spectrum Cadet' },
  { minLevel: 2, label: 'Signal Scout' },
  { minLevel: 3, label: 'Frequency Technician' },
  { minLevel: 4, label: 'Protocol Engineer' },
  { minLevel: 5, label: 'RF Architect' },
  { minLevel: 6, label: 'Wireless Master' },
];

const getRank = (level: number) => {
  const rank = [...RANKS].reverse().find(r => level >= r.minLevel);
  return rank?.label ?? 'Spectrum Cadet';
};

const Dashboard: React.FC<DashboardProps> = ({ onContinue }) => {
  const user = useUserStore(state => state.user);
  const currentUser = useUserStore(state => state.currentUser);
  const lessons = useUserStore(state => state.lessons);
  const glossary = useUserStore(state => state.glossary);
  const displayName = user.username || currentUser?.email?.split('@')[0] || 'Cadet';
  const [dynamicInsights, setDynamicInsights] = useState<Insight[]>([]);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'insights'));
        const fetched = snapshot.docs.map(doc => doc.data() as Insight);
        if (fetched.length > 0) {
          setDynamicInsights(fetched);
        }
      } catch (e) {
        console.error("Failed to load dynamic insights", e);
      }
    };
    fetchInsights();
  }, []);

  // Surface featured content
  const featuredInsight = useMemo(() => {
    const activeInsights = dynamicInsights.length > 0 ? dynamicInsights : KILL_SHOT_INSIGHTS;
    const day = new Date().getDate();
    return activeInsights[day % activeInsights.length];
  }, [dynamicInsights]);

  const featuredGlossary = useMemo(() => {
    const day = new Date().getDate();
    return glossary.length > 0 ? glossary[day % glossary.length] : GLOSSARY[day % GLOSSARY.length];
  }, [glossary]);

  const protocolSnapshot = useMemo(() => {
    const specs = ['Modulation', 'Max Throughput', 'Channel Width'];
    const day = new Date().getDate();
    const spec = specs[day % specs.length] as keyof typeof COMPARISON_DATA['Wi-Fi 6 (802.11ax)'];
    return {
      metric: spec,
      v6: COMPARISON_DATA['Wi-Fi 6 (802.11ax)'][spec],
      v7: COMPARISON_DATA['Wi-Fi 7 (802.11be)'][spec]
    };
  }, []);

  // Find the next lesson to complete
  const nextLesson = useMemo(() => {
    return lessons.find(l => !l.completed && !l.locked) || lessons[0];
  }, [lessons]);

  // Calculate overall progress
  const progressPercent = useMemo(() => {
    const completed = lessons.filter(l => l.completed).length;
    return Math.round((completed / lessons.length) * 100);
  }, [lessons]);

  // Calculate skill matrix based on lesson categories
  const skillData = useMemo(() => {
    const categoryMap: Record<string, string> = {
      'Module 1: The Physics of Invisible Light': 'Physics',
      'Module 2: Airtime Economics': 'Airtime',
      'Module 3: Spatial Design & Capacity': 'Spatial',
      'Module 4: The Connection State Machine': 'Connection',
      'Module 5: Roaming & Mobility': 'Roaming',
      'Module 6: Efficiency Standards': 'Efficiency',
      'Module 7: Infrastructure Architecture': 'Infra',
      'Module 8: Defense & Security': 'Security',
      'Module 9: Mean Time to Innocence': 'MTTI',
    };

    const coreModules = Object.keys(categoryMap);
    return coreModules.slice(0, 6).map(cat => {
      const catLessons = lessons.filter(l => l.category === cat);
      const completed = catLessons.filter(l => l.completed).length;
      const score = catLessons.length > 0
        ? Math.max(5, Math.round((completed / catLessons.length) * 100))
        : 5;
      return {
        subject: categoryMap[cat],
        A: score,
        B: 100,
        fullMark: 100
      };
    });
  }, [lessons]);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="bg-corgi-500/10 p-3 rounded-3xl border-2 border-corgi-500/20 apple-shadow">
            <Mascot size="md" expression="happy" />
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-text-primary tracking-tight font-serif">Welcome back, {displayName}.</h2>
            <p className="text-text-muted mt-2 text-xl font-medium font-serif">Ready to surf the electromagnetic spectrum?</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-extrabold text-brand-500 uppercase tracking-[0.2em]">Level {user.level}</span>
              <div className="w-20 h-1.5 bg-brand-500/10 rounded-full overflow-hidden border border-brand-500/20">
                <div 
                  className="h-full bg-brand-500 transition-all duration-1000" 
                  style={{ width: `${(user.totalXp % 500) / 5}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-6 py-3 bg-surface text-apple-orange rounded-full font-bold apple-shadow border border-border">
                <Flame className="w-6 h-6 fill-apple-orange text-apple-orange stroke-[2.5]" />
                <span className="text-base tracking-tight">{user.streakDays} Day Streak</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-surface text-brand-500 rounded-full font-bold apple-shadow border border-border">
                <Zap className="w-6 h-6 fill-brand-500 text-brand-500 stroke-[2.5]" />
                <span className="text-base tracking-tight">{user.totalXp} XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Mission + Technical Precision */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Continue Learning Card */}
        <div className="lg:col-span-3 bg-surface rounded-[40px] p-8 apple-shadow-lg border border-border flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] -mr-32 -mt-32 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-1000"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-extrabold tracking-[0.2em] text-brand-500 uppercase">Current Mission</span>
              <div className="h-px flex-1 bg-brand-500/20"></div>
            </div>
            <h3 className="text-4xl font-extrabold text-text-primary mb-6 tracking-tight font-serif leading-tight">
              {nextLesson.title}
            </h3>
            <p className="text-text-muted text-lg max-w-2xl mb-8 leading-relaxed font-serif">
              {nextLesson.description}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-sm font-bold text-text-muted uppercase tracking-widest">Overall Progress</span>
                <span className="text-2xl font-extrabold text-brand-500">{progressPercent}%</span>
              </div>
              <div className="w-full bg-app rounded-full h-4 border border-border shadow-inner overflow-hidden">
                <div 
                  style={{ width: `${progressPercent}%` }} 
                  className="bg-brand-500 h-full apple-shadow shadow-brand-500/40 transition-all duration-1000 ease-out"
                ></div>
              </div>
            </div>

            <button 
              onClick={onContinue}
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-500 text-white rounded-apple font-bold text-base hover:bg-brand-600 transition-all hover:gap-4 apple-shadow-lg active:scale-95"
            >
              Continue Mission <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Skill Radar */}
        <div className="lg:col-span-2 bg-surface rounded-[40px] p-6 apple-shadow-lg border border-border flex flex-col">
            <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4 opacity-80 self-start">Mastery Goal</h4>
            <div className="min-h-[300px] w-full flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="62%" data={skillData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                  <PolarGrid stroke="var(--color-border)" strokeWidth={1} />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: 'var(--color-text-muted)', fontSize: 10, fontWeight: 800, letterSpacing: '0.02em' }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Goal"
                    dataKey="B"
                    stroke="var(--color-text-muted)"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    fill="var(--color-text-muted)"
                    fillOpacity={0.03}
                  />
                  <Radar
                    name="Current"
                    dataKey="A"
                    stroke="var(--color-brand-500)"
                    strokeWidth={3}
                    fill="var(--color-brand-500)"
                    fillOpacity={0.25}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-surface-highlight)', color: 'var(--color-text-primary)', backdropFilter: 'blur(10px)', borderColor: 'var(--color-border)', borderRadius: '20px', border: '1px solid var(--color-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.18)' }}
                    labelStyle={{ color: 'var(--color-text-primary)', fontWeight: 800 }}
                    itemStyle={{ color: 'var(--color-brand-500)', fontWeight: 800, fontSize: '14px' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full pt-4 border-t border-border mt-4 flex items-center justify-between text-xs font-bold">
               <span className="text-text-muted uppercase tracking-widest">Rank</span>
               <span className="text-brand-500 font-extrabold uppercase">{getRank(user.level)}</span>
            </div>
        </div>

      </div>

      {/* Second Row: Mastery Radar + Glossary + Protocol Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        
        {/* Technical Precision (Refresher Content) */}
        <div className="bg-slate-900 rounded-[40px] p-10 apple-shadow-lg border border-white/5 relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute -right-12 -top-12 opacity-10 group-hover:opacity-20 transition-opacity">
            <Target className="w-64 h-64 text-white" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8 text-brand-400">
              <Zap className="w-4 h-4 fill-current" />
              <span className="text-[10px] font-black uppercase tracking-widest">{featuredInsight.context}</span>
            </div>
            <div className="space-y-4 mb-8">
              <h4 className="text-3xl font-bold text-white tracking-tight">{featuredInsight.title}</h4>
              <p className="text-white/70 text-lg leading-relaxed font-serif italic">
                "{featuredInsight.text}"
              </p>
            </div>
          </div>
          <div className="relative z-10 pt-8 border-t border-white/10">
            <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Knowledge Source</div>
            <div className="text-sm font-extrabold text-brand-400 flex items-center gap-2">
              Technical Precision System
            </div>
          </div>
        </div>

        {/* Glossary Highlight (Databank Content) */}
        <div className="bg-surface rounded-[40px] p-10 apple-shadow border border-border flex flex-col justify-between">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-brand-50 rounded-lg text-brand-500">
                      <BrainCircuit className="w-5 h-5" />
                   </div>
                   <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest opacity-60">Glossary</h4>
                </div>
                <div className="space-y-2">
                    <h5 className="text-3xl font-extrabold text-text-primary tracking-tight font-serif">{featuredGlossary.term}</h5>
                    <p className="text-text-muted text-base leading-relaxed font-serif line-clamp-3">
                        {featuredGlossary.definition}
                    </p>
                </div>
                <div className="p-5 bg-apple-orange/10 border border-apple-orange/20 rounded-2xl">
                    <div className="flex items-center gap-2 text-apple-orange text-[10px] font-black uppercase tracking-widest mb-1.5">
                        <Info className="w-3.5 h-3.5" /> Misconception
                    </div>
                    <p className="text-sm text-apple-orange font-bold font-serif leading-snug">
                        "{featuredGlossary.misconception}"
                    </p>
                </div>
            </div>
            <div className="pt-6 mt-4 border-t border-border">
                <button className="text-brand-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all group">
                    Full Databank <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>

        {/* Protocol Snapshot (Refresher/Databank Content) */}
        <div className="bg-surface rounded-[40px] p-10 apple-shadow border border-border flex flex-col justify-between">
            <div className="space-y-8">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-apple-indigo/10 rounded-lg text-apple-indigo">
                      <ArrowRightLeft className="w-5 h-5" />
                   </div>
                   <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest opacity-60">Protocol Snapshot</h4>
                </div>
                <div>
                   <span className="text-xs font-bold text-text-muted uppercase tracking-widest opacity-40 mb-4 block">Metric: {protocolSnapshot.metric}</span>
                   <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-app rounded-2xl border border-border">
                         <span className="font-bold text-text-muted">Wi-Fi 6</span>
                         <span className="font-mono text-sm font-extrabold text-text-primary">{protocolSnapshot.v6}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-brand-500 text-white rounded-2xl apple-shadow shadow-brand-500/20">
                         <span className="font-bold opacity-80">Wi-Fi 7</span>
                         <span className="font-mono text-sm font-extrabold">{protocolSnapshot.v7}</span>
                      </div>
                   </div>
                </div>
            </div>
            <div className="pt-6 mt-4 border-t border-border">
                <div className="text-[10px] font-extrabold text-brand-600 uppercase tracking-[0.2em] mt-auto">Certified Tech Stack</div>
            </div>
        </div>

      </div>

      {/* Third Row: Recent Activity & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Recent Activity */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-surface apple-shadow rounded-xl border border-border">
                <Clock className="w-6 h-6 text-brand-500 stroke-[2.5]" />
              </div>
              <h3 className="text-3xl font-extrabold text-text-primary tracking-tight font-serif">Recent Activity</h3>
            </div>
          </div>
          {user.quizHistory.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {user.quizHistory.slice(-4).reverse().map((attempt, idx) => {
                const lesson = lessons.find(l => l.id === attempt.lessonId);
                const scorePercent = Math.round((attempt.score / attempt.maxScore) * 100);
                return (
                  <div key={idx} className="bg-surface p-6 rounded-apple border border-border apple-shadow flex flex-col justify-between group hover:scale-[1.02] transition-all">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-widest opacity-60">Quiz Result</span>
                        <span className={`text-xs font-extrabold px-2 py-1 rounded-md ${scorePercent >= 80 ? 'bg-apple-green/10 text-apple-green' : 'bg-apple-orange/10 text-apple-orange'}`}>
                          {scorePercent}%
                        </span>
                      </div>
                      <h4 className="font-bold text-lg text-text-primary line-clamp-2 mb-2">{lesson?.title || 'Unknown Lesson'}</h4>
                    </div>
                    <div className="text-xs text-text-muted font-medium mt-4">
                      {new Date(attempt.date).toLocaleDateString()}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-surface-highlight border-2 border-dashed border-border rounded-[40px] p-12 text-center text-text-tertiary">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="font-medium text-lg">No sessions recorded yet.</p>
              <button 
                onClick={onContinue}
                className="text-brand-500 font-bold mt-2 hover:underline"
              >
                Start your first lesson
              </button>
            </div>
          )}
        </section>

        {/* Achievements */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-surface apple-shadow rounded-xl border border-border">
              <Trophy className="w-6 h-6 text-apple-orange stroke-[2.5]" />
            </div>
            <h3 className="text-3xl font-extrabold text-text-primary tracking-tight font-serif">Achievements</h3>
          </div>
          <div className="bg-surface rounded-[40px] border border-border apple-shadow p-10 h-full min-h-[300px]">
            {user.achievements.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {user.achievements.slice(0, 4).map((achievement) => {
                  const IconComponent = Trophy;
                  return (
                    <div key={achievement.id} className="flex items-center gap-4 p-4 rounded-3xl bg-app border border-border group hover:bg-surface-highlight hover:apple-shadow transition-all duration-300">
                      <div className="p-3 bg-surface rounded-2xl apple-shadow text-apple-orange">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-text-primary tracking-tight">{achievement.title}</div>
                        <div className="text-xs text-text-muted font-medium">{achievement.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-text-muted space-y-4 opacity-40">
                <Trophy className="w-12 h-12 stroke-[1.5]" />
                <p className="font-bold tracking-tight">No achievements yet. Keep learning!</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
