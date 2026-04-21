
import React from 'react';
import { MessageSquareOff } from 'lucide-react';

const AiTutor: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-slate-50 text-center p-8">
      <div className="bg-slate-200 p-6 rounded-full mb-6">
        <MessageSquareOff className="w-12 h-12 text-slate-400" />
      </div>
      <h2 className="text-xl font-bold text-slate-700 mb-2">Tutor Offline</h2>
      <p className="text-slate-500 max-w-sm">
        The WaveGuide AI assistant has been disabled for this session. 
        Please focus on the interactive modules and simulations.
      </p>
    </div>
  );
};

export default AiTutor;
