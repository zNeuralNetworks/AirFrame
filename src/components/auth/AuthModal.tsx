
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, Loader2, Sparkles, LogIn, UserPlus, AtSign } from 'lucide-react';
import { useUserStore } from '../../state/userStore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'auth' | 'username';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState<Step>('auth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { actions, isLoading } = useUserStore();

  const handleClose = () => {
    setStep('auth');
    setEmail('');
    setPassword('');
    setUsername('');
    setError('');
    onClose();
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await actions.login(email, password);
        handleClose();
      } else {
        await actions.register(email, password);
        setStep('username');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await actions.loginWithGoogle();
      const { user } = useUserStore.getState();
      if (!user.username) {
        setStep('username');
      } else {
        handleClose();
      }
    } catch (e: any) {
      setError(e.message || 'Google login failed');
    }
  };

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed || trimmed.length < 2) {
      setError('Username must be at least 2 characters.');
      return;
    }
    setError('');
    await actions.setUsername(trimmed);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={step === 'auth' ? handleClose : undefined}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-surface rounded-[32px] shadow-2xl overflow-hidden border border-border"
        >
          <div className="p-8">
            {step === 'auth' && (
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 p-2 text-text-muted hover:text-text-primary hover:bg-app rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {step === 'auth' ? (
              <>
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-500/10 text-brand-600 rounded-2xl mb-4 border border-brand-500/20">
                    {isLogin ? <LogIn className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
                  </div>
                  <h2 className="text-2xl font-bold text-text-primary">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                  </h2>
                  <p className="text-text-muted text-sm mt-1">
                    {isLogin ? 'Sign in to sync your certificate progress.' : 'Join the Arista Wi-Fi Academy today.'}
                  </p>
                </div>

                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-app border border-border rounded-2xl text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                        placeholder="name@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-app border border-border rounded-2xl text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-apple-red/10 border border-apple-red/20 text-apple-red text-sm rounded-xl font-medium"
                    >
                      {error}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-brand-500 text-white font-bold rounded-2xl shadow-xl shadow-brand-500/10 hover:bg-brand-600 hover:shadow-2xl hover:shadow-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>{isLogin ? 'Sign In' : 'Get Started'}</span>
                        <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </>
                    )}
                  </button>

                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-surface px-2 text-text-muted font-bold tracking-widest">Or continue with</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full py-3.5 bg-surface border border-border text-text-secondary font-bold rounded-2xl hover:bg-surface-highlight hover:text-text-primary transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                  >
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                    <span>Google Account</span>
                  </button>
                </form>

                <div className="mt-8 pt-6 border-t border-border text-center">
                  <p className="text-text-muted text-sm">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                    <button
                      onClick={() => { setIsLogin(!isLogin); setError(''); }}
                      className="text-brand-600 font-bold hover:underline"
                    >
                      {isLogin ? 'Sign up for free' : 'Sign in here'}
                    </button>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-500/10 text-brand-600 rounded-2xl mb-4 border border-brand-500/20">
                    <AtSign className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-text-primary">Pick a callsign</h2>
                  <p className="text-text-muted text-sm mt-1">
                    This is how you'll appear on the Academy. You can change it in Settings.
                  </p>
                </div>

                <form onSubmit={handleUsernameSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">
                      Username
                    </label>
                    <div className="relative">
                      <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input
                        type="text"
                        required
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-app border border-border rounded-2xl text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                        placeholder="rf-wizard"
                        maxLength={30}
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-apple-red/10 border border-apple-red/20 text-apple-red text-sm rounded-xl font-medium"
                    >
                      {error}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-brand-500 text-white font-bold rounded-2xl shadow-xl shadow-brand-500/10 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>Set Callsign & Enter</span>
                        <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full py-3 text-text-muted hover:text-text-primary text-sm font-medium transition-colors"
                  >
                    Skip for now
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
