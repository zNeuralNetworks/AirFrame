
import React from 'react';
import DecibelVisualizer from './DecibelVisualizer';
import HandshakeVisualizer from './HandshakeVisualizer';
import AbsorptionChart from './AbsorptionChart';
import SignalNoiseRatio from './SignalNoiseRatio';
import ChannelInterference from './ChannelInterference';
import RoamingTimeline from './RoamingTimeline';
import InterferenceGraph from './InterferenceGraph';
import HalfDuplexVisual from './HalfDuplexVisual';
import LegacyTaxChart from './LegacyTaxChart';
import RoamingDecisionVisual from './RoamingDecisionVisual';
import OFDMAVisual from './OFDMAVisual';
import MLOVisual from './MLOVisual';
import ControlPlaneVisual from './ControlPlaneVisual';
import MarkerPacketVisual from './MarkerPacketVisual';
import FailureDomainVisual from './FailureDomainVisual';
import ExperienceTrendVisual from './ExperienceTrendVisual';
import CapacityParadoxVisual from './CapacityParadoxVisual';
import AuthRealmsVisual from './AuthRealmsVisual';
import RoamingProtocolsVisual from './RoamingProtocolsVisual';
import TriRadioVisual from './TriRadioVisual';
import POVSuccessVisual from './POVSuccessVisual';
import { AlertCircle } from 'lucide-react';

const VisualRegistry: Record<string, React.FC> = {
  'DecibelVisualizer': DecibelVisualizer,
  'HandshakeVisualizer': HandshakeVisualizer,
  'AbsorptionChart': AbsorptionChart,
  'SignalNoiseRatio': SignalNoiseRatio,
  'ChannelInterference': ChannelInterference,
  'RoamingTimeline': RoamingTimeline,
  'InterferenceGraph': InterferenceGraph,
  'HalfDuplexVisual': HalfDuplexVisual,
  'LegacyTaxChart': LegacyTaxChart,
  'RoamingDecisionVisual': RoamingDecisionVisual,
  'OFDMAVisual': OFDMAVisual,
  'MLOVisual': MLOVisual,
  'ControlPlaneVisual': ControlPlaneVisual,
  'MarkerPacketVisual': MarkerPacketVisual,
  'FailureDomainVisual': FailureDomainVisual,
  'ExperienceTrendVisual': ExperienceTrendVisual,
  'CapacityParadoxVisual': CapacityParadoxVisual,
  'AuthRealmsVisual': AuthRealmsVisual,
  'RoamingProtocolsVisual': RoamingProtocolsVisual,
  'TriRadioVisual': TriRadioVisual,
  'POVSuccessVisual': POVSuccessVisual,
};

export const getVisualComponent = (visualId: string): React.ReactNode => {
  const Component = VisualRegistry[visualId];
  
  if (!Component) {
    return (
      <div className="p-4 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 text-sm flex items-center gap-2">
        <AlertCircle className="w-4 h-4" />
        Visual component "{visualId}" not found.
      </div>
    );
  }
  
  return <Component />;
};

export default VisualRegistry;
