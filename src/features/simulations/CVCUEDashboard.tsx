
import React, { useState } from 'react';
import { Activity, Shield, Wifi, AlertTriangle, CheckCircle, Smartphone, Server, Globe } from 'lucide-react';

interface CVCUEDashboardProps {
  onComplete: () => void;
}

const CVCUEDashboard: React.FC<CVCUEDashboardProps> = ({ onComplete }) => {
  const [activeView, setActiveView] = useState<'sla' | 'journey'>('sla');
  const [drilledDown, setDrilledDown] = useState(false);

  // Simulated data based on User Guide Chapter 7
  const metrics = [
    { label: 'Connectivity', value: '92%', status: 'success', description: 'Client connection success rate' },
    { label: 'Performance', value: '88%', status: 'warning', description: 'Clients meeting throughput thresholds' },
    { label: 'Application Exp', value: '95%', status: 'success', description: 'VoIP and Web performance' },
    { label: 'WIPS Security', value: '1 Alert', status: 'danger', description: 'Rogue AP detected' },
  ];

  const handleDrillDown = (metricLabel: string) => {
    if (metricLabel === 'Connectivity') {
      setActiveView('journey');
      setDrilledDown(true);
    }
  };

  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-xl max-w-4xl mx-auto font-sans">
      {/* Top Navigation Bar mimicking CV-CUE */}
      <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="font-bold text-xl tracking-tight">CloudVision <span className="font-light text-slate-400">CUE</span></div>
          <div className="h-6 w-px bg-slate-700 mx-2"></div>
          <div className="flex gap-4 text-sm font-medium text-slate-300">
            <button className={`${activeView === 'sla' ? 'text-white' : 'hover:text-white'}`} onClick={() => setActiveView('sla')}>Dashboard</button>
            <button className="hover:text-white">Monitor</button>
            <button className="hover:text-white">Configure</button>
            <button className="hover:text-white">Troubleshoot</button>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <span className="text-xs bg-red-500 px-2 py-1 rounded">1 Critical</span>
            <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-xs">SE</div>
        </div>
      </div>

      <div className="p-6">
        {/* View Switcher/Breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            {activeView === 'sla' ? 'SLA Dashboard' : 'Client Journey'}
          </h2>
          <div className="text-sm text-slate-500">Location: / San Francisco / HQ</div>
        </div>

        {activeView === 'sla' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((m, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleDrillDown(m.label)}
                  className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all text-left group relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-1 h-full ${
                    m.status === 'success' ? 'bg-green-500' : m.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                  }`}></div>
                  <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">{m.label}</div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">{m.value}</div>
                  <div className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors">{m.description}</div>
                  {m.label === 'Connectivity' && (
                    <div className="mt-2 text-xs text-brand-600 font-medium">Click to drill down →</div>
                  )}
                </button>
              ))}
            </div>

            {/* Simulated Heatmap / List */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="font-bold text-slate-700 mb-4">Baseline Performance</h3>
              <div className="h-40 flex items-end gap-2">
                 {[40, 65, 45, 80, 92, 88, 70, 60, 85, 90, 95, 92].map((h, i) => (
                    <div key={i} className="flex-1 bg-brand-100 rounded-t hover:bg-brand-200 transition-colors relative group">
                       <div 
                         className="absolute bottom-0 w-full bg-brand-500 rounded-t transition-all duration-500" 
                         style={{ height: `${h}%` }}
                       ></div>
                       <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded pointer-events-none">
                          {h}%
                       </div>
                    </div>
                 ))}
              </div>
              <div className="mt-2 flex justify-between text-xs text-slate-400 uppercase">
                 <span>00:00</span>
                 <span>12:00</span>
                 <span>23:59</span>
              </div>
            </div>
          </div>
        )}

        {activeView === 'journey' && (
          <div className="animate-fade-in">
             <div className="bg-white rounded-xl border border-slate-200 p-8">
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-slate-100 rounded-full">
                         <Smartphone className="w-6 h-6 text-slate-600" />
                      </div>
                      <div>
                         <h3 className="font-bold text-lg">Client: Macbook-Pro-SE</h3>
                         <div className="text-xs text-slate-500">MAC: a4:83:e7:..</div>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">Online</div>
                      <div className="text-xs text-slate-400">Duration: 2h 15m</div>
                   </div>
                </div>

                {/* The Journey Steps (Based on Guide Chapter 9) */}
                <div className="relative">
                   <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 z-0"></div>
                   <div className="grid grid-cols-4 gap-4 relative z-10">
                      {[
                        { label: 'Association', status: 'success', icon: Wifi, time: '20ms' },
                        { label: 'Authentication', status: 'success', icon: Shield, time: '140ms' },
                        { label: 'DHCP', status: 'success', icon: Server, time: '45ms' },
                        { label: 'DNS/Internet', status: 'warning', icon: Globe, time: '500ms' },
                      ].map((step, i) => (
                         <div key={i} className="flex flex-col items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 bg-white ${
                               step.status === 'success' ? 'border-green-100 text-green-600' : 'border-amber-100 text-amber-600'
                            }`}>
                               <step.icon className="w-5 h-5" />
                            </div>
                            <div className="mt-3 text-center">
                               <div className="font-bold text-sm text-slate-800">{step.label}</div>
                               <div className="text-xs text-slate-500">{step.time}</div>
                               {step.status === 'warning' && (
                                  <div className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded mt-1">High Latency</div>
                               )}
                            </div>
                         </div>
                      ))}
                   </div>
                </div>

                <div className="mt-10 p-4 bg-slate-50 rounded-lg border border-slate-200">
                   <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <Activity className="w-4 h-4" /> Root Cause Analysis
                   </h4>
                   <p className="text-sm text-slate-600">
                      The client is experiencing higher than average DNS latency (500ms). 
                      The configured DNS server (8.8.8.8) is responding slowly. 
                      <span className="block mt-2 text-brand-600 font-medium">Recommendation: Check WAN uplink saturation.</span>
                   </p>
                </div>
                
                <div className="mt-6 text-right">
                   <button 
                     onClick={onComplete}
                     className="bg-brand-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-brand-700 transition-colors"
                   >
                      Complete Analysis
                   </button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVCUEDashboard;
