
import React from 'react';
import { 
  Wifi, 
  Layers, 
  Map, 
  Server, 
  Activity, 
  Shield, 
  Box, 
  Zap, 
  Globe, 
  Lock, 
  FileText, 
  Target, 
  Radio, 
  Users, 
  Brain, 
  Network, 
  Smartphone, 
  ArrowRight, 
  Lightbulb,
  Trophy,
  MousePointer2,
  MessageSquare,
  Layout,
  Clock,
  CheckCircle2,
  BrainCircuit,
  Grid,
  Share2,
  Repeat,
  Eye,
  Anchor,
  Sliders,
  ChevronDown,
  Smile,
  Heart,
  Briefcase,
  Shirt,
  HardHat,
  Beaker,
  AlertCircle,
  LucideIcon,
  HelpCircle
} from 'lucide-react';

/**
 * Custom SVG Icons that aren't in Lucide
 */
const SmartphoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    {...props} 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);

/**
 * Global Icon Registry mapping strings to Lucide components
 * This prevents redundancy and local registry inflation
 */
export const IconRegistry: Record<string, LucideIcon | React.FC<any>> = {
  Wifi,
  Layers,
  Map,
  Server,
  Activity,
  Shield,
  Box,
  Zap,
  Globe,
  Lock,
  FileText,
  Target,
  Radio,
  Users,
  Brain,
  Network,
  Smartphone,
  SmartphoneIcon, // Custom
  ArrowRight,
  Lightbulb,
  Trophy,
  MousePointer2,
  MessageSquare,
  Layout,
  Clock,
  CheckCircle2,
  BrainCircuit,
  Grid,
  Share2,
  Repeat,
  Eye,
  Anchor,
  Sliders,
  ChevronDown,
  Smile,
  Heart,
  Briefcase,
  Shirt,
  HardHat,
  Beaker,
  AlertCircle,
  HelpCircle
};

/**
 * Helper to safely retrieve an icon from the registry
 */
export const getIcon = (name: string, fallback: LucideIcon | React.FC<any> = HelpCircle) => {
  return IconRegistry[name] || fallback;
};

export default IconRegistry;
