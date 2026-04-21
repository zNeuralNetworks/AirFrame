
import React from 'react';
import { SimulationType } from '../../types';

// Define a type for the onComplete prop
type SimulationProps = {
  onComplete: () => void;
};

// Define the registry with proper typing, excluding `null` from the key type.
export const simulationRegistry: Record<Exclude<SimulationType, null>, React.LazyExoticComponent<React.FC<SimulationProps>>> = {
    'db-game': React.lazy(() => import('./DbGame')),
    'spectrum-analyzer': React.lazy(() => import('./SpectrumAnalyzer')),
    'signal-thermometer': React.lazy(() => import('./SignalThermometer')),
    'airtime-highway': React.lazy(() => import('./AirtimeHighway')),
    'roam-lab': React.lazy(() => import('./RoamLab')),
    'timeline-puzzle': React.lazy(() => import('./TimelinePuzzle')),
    'ofdma-tetris': React.lazy(() => import('./OFDMATetris')),
    'multi-link-racer': React.lazy(() => import('./MultiLinkRacer')),
    'bottleneck-sim': React.lazy(() => import('./BottleneckSim')),
    'network-planner': React.lazy(() => import('./NetworkPlanner')),
    'material-lab': React.lazy(() => import('./MaterialLab')),
    'channel-hex': React.lazy(() => import('./ChannelHex')),
    'distributed-sim': React.lazy(() => import('./DistributedSim')),
    'ghost-hunter': React.lazy(() => import('./GhostHunter')),
    'cv-cue-dashboard': React.lazy(() => import('./CVCUEDashboard')),
    'protocol-match': React.lazy(() => import('./ProtocolMatch')),
    'voip-walker': React.lazy(() => import('./VoipWalker')),
    'handshake-sequencer': React.lazy(() => import('./HandshakeSequencer')),
    'wave-match': React.lazy(() => import('./WaveMatch')),
    'wips-guard': React.lazy(() => import('./WIPSGuard')),
    'poe-budget-sim': React.lazy(() => import('./PoeBudgetSim')),
    'uplink-bottleneck-sim': React.lazy(() => import('./UplinkBottleneckSim')),
    'mtu-fragmentation-sim': React.lazy(() => import('./MtuFragmentationSim')),
    'antenna-lab': React.lazy(() => import('./AntennaPatternLab')),
};

export const getSimulationComponent = (id: SimulationType | null): React.LazyExoticComponent<React.FC<SimulationProps>> | null => {
    if (!id || !(id in simulationRegistry)) {
        return null;
    }
    return simulationRegistry[id as Exclude<SimulationType, null>];
};
