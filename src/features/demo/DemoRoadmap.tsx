
import React, { useState } from 'react';
import { 
  CheckSquare, 
  MonitorPlay, 
  Shield, 
  FileText, 
  ChevronRight, 
  AlertTriangle,
  Zap, 
  MousePointer2,
  Search,
  Wifi,
  BarChart3,
  Users,
  Target,
  Clock,
  Presentation,
  ShieldCheck,
  MicOff,
  Download,
  Loader2,
} from 'lucide-react';

const DemoRoadmap: React.FC = () => {
  const [selectedTrackId, setSelectedTrackId] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number | null>(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const checklist = [
    "Clean Browser State (Incognito)",
    "Verify Demo Cloud Access",
    "Check for 'Interesting' Data",
    "Disable Notifications",
    "Pre-load 'Client Journey' tab"
  ];

  const tracks = [
    {
      id: 0,
      title: "The Golden Path",
      audience: "General / Mixed",
      icon: Zap,
      accent: "text-brand-600", 
      border: "border-brand-500",
      description: "The standard 15-minute winning narrative.",
      steps: [
        {
          title: "1. The Hook: The Morning Coffee View",
          duration: "2 mins",
          icon: MonitorPlay,
          script: "Start at the 'Connectivity Dashboard'. Don't dive into charts yet. Ask: 'How do you currently know if users are happy?' Explain that Arista focuses on Client Experience, not just AP up/down status.",
          action: "Click the 'Connectivity' widget to drill down into the failing clients.",
          keyPoint: "We surface the 'Why', not just the 'What'."
        },
        {
          title: "2. The Investigation: From Macro to Micro",
          duration: "3 mins",
          icon: Search,
          script: "You are now looking at the list of failing clients. Pick one that looks interesting (ideally an Auth or DHCP failure). Say: 'In a traditional controller, you'd be grepping logs. Here, we just click.'",
          action: "Select a specific client MAC address to open the 'Client Journey'.",
          keyPoint: "One click from global view to single user root cause."
        },
        {
          title: "3. The Crown Jewel: Client Journey",
          duration: "5 mins",
          icon: Zap,
          script: "Walk through the timeline. 'Here is where they associated (Wi-Fi is fine), here is where they authenticated (RADIUS is fine), but HERE is where they failed DHCP.' Show the latency bubble.",
          action: "Hover over the failure event. Show the raw reason code.",
          keyPoint: "Prove it's not the Wi-Fi. Mean Time to Innocence (MTTI)."
        },
        {
          title: "4. The Impossible Feature: Live PCAP",
          duration: "2 mins",
          icon: Wifi,
          script: "Ask: 'What if you need deeper proof?' Show the Packet Capture button. Explain that the AP buffers packets. You can grab the PCAP for that specific failure event without trying to reproduce it.",
          action: "Point to the 'Download Packet Trace' icon.",
          keyPoint: "No truck rolls. No handheld testers. Instant evidence."
        },
        {
          title: "5. The Differentiator: WIPS Security",
          duration: "3 mins",
          icon: Shield,
          script: "Switch to the Security dashboard. Find a Rogue AP. Explain the 'Marker Packet' patent. 'We don't guess if it's a rogue. We inject a packet on the wire and listen on the air. It's deterministic.'",
          action: "Show the 'Rogue AP' classification and the 'Block' button.",
          keyPoint: "Automatic classification. Zero false positives."
        }
      ]
    },
    {
      id: 1,
      title: "The Executive Briefing",
      audience: "CIO / VP Infra",
      icon: BarChart3,
      accent: "text-brand-600",
      border: "border-slate-300",
      description: "Focus on business outcomes and reporting.",
      steps: [
        {
          title: "1. The High Level View",
          duration: "2 mins",
          icon: MonitorPlay,
          script: "Skip the technical charts. Show the 'User Experience' widget. 'This tells you if your investment is paying off.' Don't talk about RSSI. Talk about user happiness.",
          action: "Open Dashboard > Performance Widget.",
          keyPoint: "ROI and User Satisfaction."
        },
        {
          title: "2. Mean Time to Innocence",
          duration: "2 mins",
          icon: Target,
          script: "Explain the cost of escalations. 'When WiFi is blamed, it takes 4 hours to prove it was actually the DHCP server. We do that in 4 seconds.'",
          action: "Show the Root Cause Analysis text bubble.",
          keyPoint: "Operational Efficiency."
        },
        {
          title: "3. Automated Reporting",
          duration: "3 mins",
          icon: FileText,
          script: "Show the scheduled reports. 'You don't need to log in to know the network is healthy. We email you this summary every Monday.'",
          action: "Open 'Reports' > 'Executive Summary'.",
          keyPoint: "Visibility without effort."
        }
      ]
    },
    {
      id: 2,
      title: "The Packet Hunter",
      audience: "Senior Engineer",
      icon: Search,
      accent: "text-corgi-600",
      border: "border-corgi-500",
      description: "Technical depth, PCAPs, and root cause.",
      steps: [
        {
          title: "1. Go Straight to Failures",
          duration: "2 mins",
          icon: AlertTriangle,
          script: "Don't show the green dashboard. Click the 'Connectivity' failure metric immediately.",
          action: "Drill down into 'DHCP Failures'.",
          keyPoint: "We don't hide the problems."
        },
        {
          title: "2. Raw Frame Headers",
          duration: "5 mins",
          icon: FileText,
          script: "Open a failure event. 'Look, here is the De-auth Reason Code 7.' Engineers trust raw data, not fancy graphs.",
          action: "Show the raw JSON/Event log details.",
          keyPoint: "The packet never lies."
        },
        {
          title: "3. Live PCAP Download",
          duration: "3 mins",
          icon: Download,
          script: "Show the packet trace icon. 'You don't need to drive to the site with a laptop. The AP already captured the failure.'",
          action: "Click 'Download Packet Trace'.",
          keyPoint: "Remote troubleshooting."
        },
        {
          title: "4. Spectrum Analysis",
          duration: "5 mins",
          icon: Wifi,
          script: "Open the Spectrum view. Show non-WiFi interference (Microwaves/Bluetooth).",
          action: "Enable 'Interference' overlay on the timeline.",
          keyPoint: "Layer 1 visibility."
        }
      ]
    },
    {
      id: 3,
      title: "The Security Audit",
      audience: "CISO / SecOps",
      icon: ShieldCheck,
      accent: "text-brand-600",
      border: "border-slate-300",
      description: "Compliance, WIPS, and segmentation.",
      steps: [
        {
          title: "1. The Marker Packet",
          duration: "5 mins",
          icon: Shield,
          script: "Explain the patent. 'We inject a packet on the wire. If we hear it in the air, it's a Rogue. Zero false positives.'",
          action: "Draw the diagram on a whiteboard/notepad or show the animation.",
          keyPoint: "Deterministic Security."
        },
        {
          title: "2. Compliance Reports",
          duration: "3 mins",
          icon: FileText,
          script: "Show the PCI/HIPAA automated report.",
          action: "Open 'Reports' > 'Compliance'.",
          keyPoint: "Audit-ready in seconds."
        }
      ]
    }
  ];

  const antiPatterns = [
    {
      title: "The Feature Dump",
      desc: "Showing every menu item in order. Guaranteed to bore the audience.",
      icon: <Presentation className="w-5 h-5 text-red-500" />
    },
    {
      title: "The Live Config",
      desc: "Trying to configure 802.1X live. Too many variables. High risk.",
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />
    },
    {
      title: "The Mouse Jiggler",
      desc: "Circling the cursor frantically. Makes the audience seasick.",
      icon: <MousePointer2 className="w-5 h-5 text-red-500" />
    },
    {
      title: "The Silent Movie",
      desc: "Clicking through screens rapidly without narrating *why*.",
      icon: <MicOff className="w-5 h-5 text-red-500" />
    }
  ];

  const currentTrack = tracks.find(t => t.id === selectedTrackId) || tracks[0];

  const handleDownloadScript = () => {
    setIsDownloading(true);
    setTimeout(() => {
        setIsDownloading(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 pb-40">
      
      {/* Header - High Density */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
        <div>
           <div className="flex items-center gap-2 mb-2 text-brand-600">
              <MicOff className="w-4 h-4" />
              <span className="small-caps text-[10px]">Strategic Briefing</span>
           </div>
           <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Demo Playbooks</h1>
           <p className="text-slate-500 text-sm mt-1 max-w-xl">
             Tailored narratives optimized for specific personas. Select a track to align your technical depth with stakeholder expectations.
           </p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={handleDownloadScript}
             disabled={isDownloading}
             className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 text-xs font-bold hover:bg-slate-50 hover:text-slate-900 transition-all disabled:opacity-50"
           >
              {isDownloading ? <Loader2 className="w-3 h-3 animate-spin" /> : <FileText className="w-3 h-3" />}
              {isDownloading ? 'EXPORTING...' : 'EXPORT SCRIPT'}
           </button>
        </div>
      </div>

      {/* Scenario Selector - Tighter Grid */}
      <div className="space-y-4">
         <h3 className="small-caps text-[10px] text-slate-400">Target Narrative</h3>
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {tracks.map((track) => {
               const isSelected = selectedTrackId === track.id;
               return (
                  <button
                     key={track.id}
                     onClick={() => { setSelectedTrackId(track.id); setActiveStep(0); }}
                     className={`p-4 rounded-xl border text-left transition-all relative group flex flex-col h-full ${
                        isSelected 
                        ? `bg-white ${track.border} shadow-lg ring-1 ring-brand-100 border-2` 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                     }`}
                  >
                     <div className="flex justify-between items-start mb-2">
                        <track.icon className={`w-4 h-4 ${isSelected ? track.accent : 'text-slate-300'}`} />
                        {isSelected && <CheckSquare className={`w-3 h-3 ${track.accent}`} />}
                     </div>
                     <h4 className={`text-sm font-bold tracking-tight ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>{track.title}</h4>
                     <p className="text-[11px] text-slate-400 leading-snug mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {track.description}
                     </p>
                  </button>
               )
            })}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Checklist & Warnings - High Density */}
        <div className="lg:col-span-4 space-y-6">
           
           <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                 <CheckSquare className="w-4 h-4 text-slate-400" />
                 <h2 className="small-caps text-[10px]">Pre-Flight Checks</h2>
              </div>
              <div className="space-y-2">
                 {checklist.map((item, idx) => (
                    <label key={idx} className="flex items-center gap-3 group cursor-pointer">
                       <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                       <span className="text-[11px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{item}</span>
                    </label>
                 ))}
              </div>
           </div>

           <div className="bg-rose-50/30 rounded-2xl p-5 border border-rose-100/50">
              <div className="flex items-center gap-2 mb-4">
                 <AlertTriangle className="w-4 h-4 text-rose-500" />
                 <h2 className="small-caps text-[10px] text-rose-900/60">Avoid These Patterns</h2>
              </div>
              <div className="space-y-4">
                 {antiPatterns.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                       <div className="scale-75 origin-top">{item.icon}</div>
                       <div>
                          <div className="text-[11px] font-bold text-rose-900 uppercase tracking-tight">{item.title}</div>
                          <div className="text-[10px] text-rose-800/60 leading-tight mt-0.5">{item.desc}</div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

        </div>

        {/* Right Col: The Interactive Track */}
        <div className="lg:col-span-8">
           <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xl">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                        <currentTrack.icon className={`w-4 h-4 ${currentTrack.accent}`} />
                    </div>
                    <div>
                        <span className="small-caps text-[9px] text-slate-400 block">{currentTrack.audience}</span>
                        <h2 className="text-lg font-bold text-slate-900 tracking-tight">{currentTrack.title}</h2>
                    </div>
                 </div>
                 <div className="font-mono text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded border border-slate-200">
                    EST. {currentTrack.steps.reduce((acc, s) => acc + parseInt(s.duration), 0)} MINS
                 </div>
              </div>

              <div className="divide-y divide-slate-50">
                 {currentTrack.steps.map((step, idx) => {
                    const isActive = activeStep === idx;
                    return (
                       <div key={idx} className={`transition-all duration-300 ${isActive ? 'bg-slate-50/50 outline outline-1 outline-brand-100 -outline-offset-1' : 'bg-white hover:bg-slate-50/30'}`}>
                          <button 
                             onClick={() => setActiveStep(isActive ? null : idx)}
                             className="w-full flex items-center gap-4 p-4 text-left group"
                          >
                             <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all font-mono text-[10px] font-bold ${isActive ? 'bg-slate-900 text-brand-400' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                                0{idx + 1}
                             </div>
                             <div className="flex-1">
                                <h3 className={`text-[13px] font-bold transition-colors ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>{step.title}</h3>
                             </div>
                             <div className="font-mono text-[10px] text-slate-400">{step.duration}</div>
                             <ChevronRight className={`w-4 h-4 text-slate-300 transition-transform duration-300 ${isActive ? 'rotate-90 text-brand-500' : ''}`} />
                          </button>

                          {/* Expanded Content - High Density */}
                          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                             <div className="px-6 pb-6 pl-[4.5rem] space-y-6">
                                
                                <div className="space-y-2">
                                   <label className="small-caps text-[9px] text-slate-400">Narrative Guidance</label>
                                   <div className="relative group/revealer">
                                       <p className="text-slate-700 text-xs leading-relaxed font-medium italic border-l-2 border-brand-500 pl-4 py-1">
                                          "{step.script}"
                                       </p>
                                   </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                   <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-brand-200 transition-colors">
                                      <span className="small-caps text-[9px] text-slate-500 mb-2 flex items-center gap-1.5">
                                         <MousePointer2 className="w-3 h-3" /> Step Action
                                      </span>
                                      <p className="text-[11px] text-slate-600 leading-tight font-medium uppercase tracking-tight">{step.action}</p>
                                   </div>
                                   <div className="kill-shot-card p-4 rounded-xl border-none shadow-lg">
                                      <span className="small-caps text-[9px] text-brand-400 mb-2 flex items-center gap-1.5">
                                         <Target className="w-3 h-3" /> Memorize This
                                      </span>
                                      <p className="text-[12px] text-white leading-snug font-bold italic tracking-tight">"{step.keyPoint}"</p>
                                   </div>
                                </div>

                             </div>
                          </div>
                        </div>
                    );
                 })}
              </div>
           </div>
        </div>

      </div>

    </div>
  );
};

export default DemoRoadmap;
