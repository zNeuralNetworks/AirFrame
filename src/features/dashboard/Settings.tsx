
import React, { useState } from 'react';
import { Trash2, Shield, Monitor, Save, AlertCircle, LogOut, LogIn, User } from 'lucide-react';
import { useUserStore, useUserActions } from '../../state/userStore';

const Settings: React.FC = () => {
  const [confirmReset, setConfirmReset] = useState(false);
  const currentUser = useUserStore(state => state.currentUser);
  const { resetProgress, login, logout } = useUserActions();

  const handleReset = () => {
    if (confirmReset) {
      resetProgress();
      // Optional: Reload to ensure all components re-mount with fresh initial state
      setTimeout(() => window.location.reload(), 200);
    } else {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 3000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-12 space-y-12 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12 border-b border-border pb-10">
        <div className="p-5 bg-surface rounded-3xl border border-border apple-shadow">
          <Monitor className="w-10 h-10 text-text-muted stroke-[1.5]" />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-text-primary tracking-tight font-serif">System Settings</h2>
          <p className="text-text-muted text-xl font-medium mt-1 font-serif">Manage application state and preferences.</p>
        </div>
      </div>

      <div className="space-y-10">
        {/* Account Management */}
        <div className="bg-surface rounded-[32px] border border-border p-10 apple-shadow-lg">
          <h3 className="text-xl font-extrabold text-text-primary mb-8 flex items-center gap-4 tracking-tight">
            <div className="p-2 bg-brand-500/10 rounded-lg">
              <User className="w-6 h-6 text-brand-500 stroke-[2.5]" />
            </div>
            Account
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              {currentUser ? (
                <>
                  <div className="text-xl font-extrabold text-text-primary tracking-tight">Signed in as {currentUser.email}</div>
                  <p className="text-lg text-text-muted mt-2 font-medium leading-relaxed">
                    Your progress is being synced to the cloud.
                  </p>
                </>
              ) : (
                <>
                  <div className="text-xl font-extrabold text-text-primary tracking-tight">Guest Mode</div>
                  <p className="text-lg text-text-muted mt-2 font-medium leading-relaxed">
                    Sign in via the sidebar to save your progress and access it from any device.
                  </p>
                </>
              )}
            </div>
            {currentUser && (
              <button 
                onClick={() => logout()}
                className="shrink-0 px-8 py-4 rounded-apple font-bold text-lg transition-all flex items-center gap-3 apple-shadow bg-app border border-border text-text-primary hover:bg-surface-highlight"
              >
                <LogOut className="w-6 h-6 stroke-[2]" />
                Sign Out
              </button>
            )}
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-surface rounded-[32px] border border-border p-10 apple-shadow-lg">
          <h3 className="text-xl font-extrabold text-text-primary mb-8 flex items-center gap-4 tracking-tight">
            <div className="p-2 bg-brand-500/10 rounded-lg">
              <Save className="w-6 h-6 text-brand-500 stroke-[2.5]" />
            </div>
            Data Management
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="text-xl font-extrabold text-text-primary tracking-tight">Reset Airframe Progress</div>
              <p className="text-lg text-text-muted mt-2 font-medium leading-relaxed">
                Clears all XP, completed lessons, and unlocked achievements. This action cannot be undone.
              </p>
            </div>
            <button 
              onClick={handleReset}
              className={`shrink-0 px-8 py-4 rounded-apple font-bold text-lg transition-all flex items-center gap-3 apple-shadow ${
                confirmReset 
                  ? 'bg-apple-red text-white hover:opacity-90 scale-105' 
                  : 'bg-app border border-border text-text-primary hover:bg-surface-highlight'
              }`}
            >
              {confirmReset ? <AlertCircle className="w-6 h-6 stroke-[2.5]" /> : <Trash2 className="w-6 h-6 stroke-[2]" />}
              {confirmReset ? 'Confirm Wipe' : 'Reset Data'}
            </button>
          </div>
        </div>

        {/* Demo Configuration */}
        <div className="bg-surface rounded-[32px] border border-border p-10 apple-shadow opacity-80">
          <h3 className="text-xl font-extrabold text-text-primary mb-8 flex items-center gap-4 tracking-tight">
            <div className="p-2 bg-apple-indigo/10 rounded-lg">
              <Shield className="w-6 h-6 text-apple-indigo stroke-[2.5]" />
            </div>
            Environment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-6 rounded-2xl bg-app border border-border flex items-center justify-between">
                <span className="text-base font-bold text-text-muted uppercase tracking-widest">Version</span>
                <span className="text-sm font-mono font-bold text-text-primary">v2.4.0</span>
             </div>
             <div className="p-6 rounded-2xl bg-app border border-border flex items-center justify-between">
                <span className="text-base font-bold text-text-muted uppercase tracking-widest">Build Target</span>
                <span className="text-sm font-mono font-bold text-text-primary">Production</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
