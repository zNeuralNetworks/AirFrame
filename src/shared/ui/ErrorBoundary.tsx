import React, { ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
  children: ReactNode;
  simId?: string;
  lessonId?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    error: undefined,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    console.error(`Context: SimID: ${this.props.simId}, LessonID: ${this.props.lessonId}`);
  }

  handleRetry = () => {
      this.setState({ hasError: false, error: undefined });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 bg-slate-900 rounded-2xl border border-red-900/50 text-center animate-fade-in">
            <div className="p-4 bg-red-900/20 rounded-full mb-6 border border-red-900/30">
                <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Simulation Malfunction</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
                The virtual lab environment encountered a critical error. 
                Isolate the fault and retry initialization.
                {this.state.error && (
                    <span className="block mt-4 p-3 bg-black/30 rounded-lg font-mono text-xs text-red-300 text-left overflow-x-auto border border-red-900/30">
                        Error: {this.state.error.message}
                    </span>
                )}
            </p>
            <div className="flex gap-4">
                <button 
                    onClick={this.handleRetry}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-brand-900/20"
                >
                    <RefreshCcw className="w-4 h-4" /> Retry Initialization
                </button>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
