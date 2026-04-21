import React, { ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw, Bug, Copy, Check } from "lucide-react";
import { track } from "../../services/telemetry";

interface Props {
  children: ReactNode;
  simId: string;
  lessonId?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  copied: boolean;
}

/**
 * SimulationErrorBoundary is a specialized ErrorBoundary for interactive labs.
 * it provides a themed "Simulation Malfunction" UI and allows users to retry
 * initialization without reloading the entire application.
 */
class SimulationErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    error: undefined,
    copied: false
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, copied: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Simulation Error:", error, errorInfo);
    track('simulation_runtime_error', { 
      simId: this.props.simId, 
      lessonId: this.props.lessonId,
      error: error.message,
      componentStack: errorInfo.componentStack
    });
  }

  handleRetry = () => {
    track('simulation_retry', { simId: this.props.simId });
    this.setState({ hasError: false, error: undefined });
  }

  copyError = () => {
    if (this.state.error) {
      const errorText = `Sim ID: ${this.props.simId}\nError: ${this.state.error.message}\nStack: ${this.state.error.stack}`;
      navigator.clipboard.writeText(errorText);
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 bg-slate-900 rounded-2xl border border-red-900/50 text-center animate-fade-in shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-pulse"></div>
          
          <div className="p-4 bg-red-900/20 rounded-full mb-6 border border-red-900/30 relative">
            <AlertTriangle className="w-12 h-12 text-red-500" />
            <div className="absolute -top-1 -right-1">
              <Bug className="w-6 h-6 text-red-400 animate-pulse" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Simulation Malfunction</h3>
          <p className="text-slate-400 mb-8 max-w-md mx-auto leading-relaxed text-sm">
            The virtual lab environment for <code className="text-brand-400 font-mono">{this.props.simId}</code> encountered a critical runtime error. 
            Isolate the fault and retry initialization.
          </p>

          {this.state.error && (
            <div className="w-full max-w-lg mb-8 group">
              <div className="bg-black/50 rounded-lg border border-red-900/30 overflow-hidden relative">
                <div className="bg-red-900/20 px-4 py-2 border-b border-red-900/30 flex items-center justify-between">
                  <span className="text-2xs font-bold text-red-400 uppercase tracking-widest">Error Log</span>
                  <button 
                    onClick={this.copyError}
                    className="flex items-center gap-1.5 text-2xs text-slate-500 hover:text-white transition-colors"
                  >
                    {this.state.copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                    {this.state.copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="p-4 font-mono text-xs text-red-300 text-left overflow-x-auto whitespace-pre-wrap max-h-[150px]">
                  {this.state.error.message}
                  {this.state.error.stack && `\n\n${this.state.error.stack.split('\n').slice(0, 3).join('\n')}...`}
                </pre>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={this.handleRetry}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-brand-900/20 hover:scale-105 active:scale-95"
            >
              <RefreshCcw className="w-4 h-4" /> Re-Initialize Lab
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition-all border border-slate-700"
            >
              Full System Reboot
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SimulationErrorBoundary;
