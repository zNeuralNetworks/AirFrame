import React from 'react';
import { Zap, Trophy, Award } from 'lucide-react';

interface CMSUserViewProps {
  item: any;
}

export const CMSUserView: React.FC<CMSUserViewProps> = ({ item }) => (
  <div className="space-y-12">
    <div className="flex items-center gap-8">
      <div className="w-24 h-24 bg-brand-100 text-brand-600 rounded-3xl flex items-center justify-center font-black text-4xl shadow-inner">
        {(item.email?.[0] || 'U').toUpperCase()}
      </div>
      <div>
        <h3 className="text-3xl font-extrabold text-text-primary tracking-tight">{item.email || 'Anonymous User'}</h3>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1.5 text-brand-600 font-bold bg-brand-50 px-3 py-1 rounded-full text-sm">
            <Zap className="w-4 h-4 fill-brand-600" />
            Level {item.level || 1}
          </div>
          <div className="flex items-center gap-1.5 text-amber-600 font-bold bg-amber-50 px-3 py-1 rounded-full text-sm">
            <Trophy className="w-4 h-4 fill-amber-600" />
            {item.totalXp || 0} XP
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 bg-app/50 border border-border rounded-2xl text-center">
        <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2 opacity-60">Lessons</h4>
        <p className="text-3xl font-black text-text-primary">{item.completedLessonIds?.length || 0}</p>
        <p className="text-xs font-bold text-text-muted mt-1 uppercase tracking-tighter">Completed</p>
      </div>
      <div className="p-6 bg-app/50 border border-border rounded-2xl text-center">
        <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2 opacity-60">Quizzes</h4>
        <p className="text-3xl font-black text-text-primary">{item.quizHistory?.length || 0}</p>
        <p className="text-xs font-bold text-text-muted mt-1 uppercase tracking-tighter">Attempts</p>
      </div>
      <div className="p-6 bg-app/50 border border-border rounded-2xl text-center">
        <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2 opacity-60">Current Streak</h4>
        <p className="text-3xl font-black text-text-primary">{item.streakDays || 0}</p>
        <p className="text-xs font-bold text-text-muted mt-1 uppercase tracking-tighter">Days</p>
      </div>
    </div>

    <div className="space-y-6">
      <h4 className="text-lg font-bold text-text-primary tracking-tight flex items-center gap-2">
        <Award className="w-5 h-5 text-brand-500" />
        Recent Achievements
      </h4>
      <div className="grid gap-3">
        {item.achievements?.length > 0 ? (
          item.achievements.slice(0, 3).map((a: any) => (
            <div key={a.id} className="flex items-center gap-4 p-4 bg-white border border-border rounded-xl apple-shadow">
              <div className="p-2 bg-amber-50 rounded-lg">
                <Trophy className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <div className="font-bold text-text-primary">{a.title}</div>
                <div className="text-xs text-text-muted">{new Date(a.dateEarned).toLocaleDateString()}</div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-text-muted italic">No achievements earned yet.</p>
        )}
      </div>
    </div>
  </div>
);
