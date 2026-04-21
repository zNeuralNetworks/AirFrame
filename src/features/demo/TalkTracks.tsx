
import React from 'react';
import { Mic2, CheckCircle2, MessageSquareQuote } from 'lucide-react';

const TRACKS = [
  {
    title: "1. Set the Mental Model (First 2 Minutes)",
    points: [
      "Wi-Fi is an airtime problem, not a speed problem",
      "Clients decide when to roam, not the network",
      "Perfect RF on paper fails in real buildings",
      "Visibility matters more than raw throughput"
    ]
  },
  {
    title: "2. Reset Expectations Early",
    points: [
      "More APs can make performance worse",
      "New standards do not fix bad RF or bad clients",
      "Speed tests do not represent real application experience",
      "Wireless is probabilistic, not deterministic"
    ]
  },
  {
    title: "3. How Arista Wireless Is Different",
    points: [
      "Cloud-native from day one, no controllers to manage",
      "Single control plane for wired and wireless",
      "Continuous optimization instead of static tuning",
      "Policy follows identity, not ports or VLANs"
    ]
  },
  {
    title: "4. Architecture Explanation (Simple)",
    points: [
      "APs handle data locally, cloud handles intelligence",
      "No controller bottlenecks or failure domains",
      "Zero-touch provisioning at scale",
      "One operational model across campus"
    ]
  },
  {
    title: "5. What Problems We Solve Best",
    points: [
      "Unexplained user complaints",
      "High-density or mixed client environments",
      "Healthcare, labs, and mission-critical spaces",
      "Operational complexity across wired and wireless"
    ]
  },
  {
    title: "6. Wi-Fi 6, 6E, 7 Positioning",
    points: [
      "New standards help only if RF is clean",
      "Wider channels increase contention in dense spaces",
      "Multi-link helps reliability more than peak speed",
      "We design for consistency, not marketing numbers"
    ]
  },
  {
    title: "7. Security Without Breaking Experience",
    points: [
      "Identity-based access, not shared secrets",
      "Segmentation without VLAN sprawl",
      "Strong security without killing performance",
      "Guest, IoT, and corporate treated differently"
    ]
  },
  {
    title: "8. Visibility Story (This Is the Hook)",
    points: [
      "We show what the client experienced, not just AP stats",
      "Timeline-based troubleshooting",
      "Clear root cause: RF, auth, DHCP, DNS, or app",
      "Fewer escalations because problems are provable"
    ]
  },
  {
    title: "9. Troubleshooting Narrative",
    points: [
      "Start with the user experience",
      "Correlate client, AP, and RF conditions",
      "Identify systemic issues vs one-off events",
      "Fix once instead of chasing symptoms"
    ]
  },
  {
    title: "10. Switching + Wireless Value",
    points: [
      "Correct PoE and multigig matter for modern APs",
      "Wired misconfigurations surface as wireless issues",
      "One policy model across the edge",
      "Campus as a single system, not silos"
    ]
  },
  {
    title: "11. Competitive Differentiation",
    points: [
      "Others focus on configuration, we focus on outcomes",
      "Controllers add operational overhead and failure points",
      "Static RF tuning does not scale",
      "Separate tools slow down troubleshooting"
    ]
  },
  {
    title: "12. Proof Points to Emphasize",
    points: [
      "Faster time to resolution",
      "Fewer tickets, not just faster speeds",
      "Simplified operations for lean IT teams",
      "Predictable performance in messy environments"
    ]
  },
  {
    title: "13. Questions You Should Ask Customers",
    points: [
      "Where do users complain, not where APs are",
      "What applications fail first",
      "How long troubleshooting takes today",
      "How often issues repeat"
    ]
  },
  {
    title: "14. How to Close the Conversation",
    points: [
      "Wireless will never be perfect, but it can be explainable",
      "Visibility changes how teams operate",
      "Consistency beats peak performance",
      "We reduce uncertainty, not just manage radios"
    ]
  }
];

const TalkTracks: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-text-primary">SE Talk Tracks</h2>
          <p className="text-text-secondary mt-2 text-lg font-medium">The narrative guide for customer conversations. What to say, when to say it.</p>
        </div>
        <div className="bg-brand-500/20 text-brand-500 px-4 py-2 rounded-lg border border-brand-500/20 flex items-center gap-2">
          <MessageSquareQuote className="w-5 h-5" />
          <span className="font-semibold text-sm">Customer Facing</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TRACKS.map((track, idx) => (
           <div key={idx} className="bg-surface p-6 rounded-2xl border border-border-DEFAULT shadow-sm hover:shadow-md transition-all duration-300 hover:border-brand-500/30 group">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-brand-500/10 text-brand-500 rounded-lg shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                  <Mic2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-text-primary leading-snug">{track.title}</h3>
              </div>
              <ul className="space-y-3 pl-2 border-l-2 border-border-highlight">
                {track.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-3 text-text-secondary text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
           </div>
        ))}
      </div>
    </div>
  );
};

export default TalkTracks;
