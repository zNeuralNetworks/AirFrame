
import React, { useState } from 'react';
import { Trash2, Shield, Monitor, Save, AlertCircle, LogOut, LogIn, User, Sun } from 'lucide-react';
import { useUserStore, useUserActions } from '../../state/userStore';
import ThemeToggle from '../../shared/ui/layout/ThemeToggle';

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
    <div className="af-page-readable animate-fade-in">
      <div className="af-page-header items-center">
        <div className="p-4 bg-surface rounded-2xl border border-border apple-shadow">
          <Monitor className="w-8 h-8 text-text-muted stroke-[1.5]" />
        </div>
        <div className="text-center md:text-left af-heading-group">
          <h2 className="af-page-title">System Settings</h2>
          <p className="af-page-subtitle">Manage application state and preferences.</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Account Management */}
        <div className="af-card">
          <h3 className="af-card-title mb-8 flex items-center gap-4">
            <div className="p-2 bg-brand-500/10 rounded-lg">
              <User className="w-6 h-6 text-brand-500 stroke-[2.5]" />
            </div>
            Account
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              {currentUser ? (
                <>
                  <div className="af-card-title">Signed in as {currentUser.email}</div>
                  <p className="af-body-sm mt-2">
                    Your progress is being synced to the cloud.
                  </p>
                </>
              ) : (
                <>
                  <div className="af-card-title">Guest Mode</div>
                  <p className="af-body-sm mt-2">
                    Sign in via the sidebar to save your progress and access it from any device.
                  </p>
                </>
              )}
            </div>
            {currentUser && (
              <button 
                onClick={() => logout()}
                className="shrink-0 af-secondary-action text-base"
              >
                <LogOut className="w-6 h-6 stroke-[2]" />
                Sign Out
              </button>
            )}
          </div>
        </div>

        {/* Data Management */}
        <div className="af-card">
          <h3 className="af-card-title mb-8 flex items-center gap-4">
            <div className="p-2 bg-brand-500/10 rounded-lg">
              <Save className="w-6 h-6 text-brand-500 stroke-[2.5]" />
            </div>
            Data Management
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="af-card-title">Reset Airframe Progress</div>
              <p className="af-body-sm mt-2">
                Clears all XP, completed lessons, and unlocked achievements. This action cannot be undone.
              </p>
            </div>
            <button 
              onClick={handleReset}
              className={`shrink-0 px-6 py-3.5 rounded-apple font-semibold text-base transition-all flex items-center gap-3 apple-shadow ${
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

        {/* Appearance */}
        <div className="bg-surface rounded-[32px] border border-border p-10 apple-shadow-lg">
          <h3 className="text-xl font-extrabold text-text-primary mb-8 flex items-center gap-4 tracking-tight">
            <div className="p-2 bg-brand-500/10 rounded-lg">
              <Sun className="w-6 h-6 text-brand-500 stroke-[2.5]" />
            </div>
            Appearance
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-extrabold text-text-primary tracking-tight">Theme</div>
              <p className="text-lg text-text-muted mt-2 font-medium leading-relaxed">Switch between light and dark mode.</p>
            </div>
            <ThemeToggle showLabel />
          </div>
        </div>

        {/* Demo Configuration */}
        <div className="af-card opacity-90">
          <h3 className="af-card-title mb-8 flex items-center gap-4">
            <div className="p-2 bg-apple-indigo/10 rounded-lg">
              <Shield className="w-6 h-6 text-apple-indigo stroke-[2.5]" />
            </div>
            Environment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-6 rounded-2xl bg-app border border-border flex items-center justify-between">
                <span className="af-meta">Version</span>
                <span className="text-sm font-mono font-bold text-text-primary">v2.4.0</span>
             </div>
             <div className="p-6 rounded-2xl bg-app border border-border flex items-center justify-between">
                <span className="af-meta">Build Target</span>
                <span className="text-sm font-mono font-bold text-text-primary">Production</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
