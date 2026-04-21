
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export type MascotExpression = 'neutral' | 'happy' | 'confused' | 'excited' | 'sleeping' | 'thinking' | 'alarmed';
export type MascotOutfit = 'none' | 'engineer' | 'lab' | 'professional' | 'antennae';
export type MascotSize = 'xs' | 'sm' | 'md' | 'md-lg' | 'lg' | 'xl' | 'full';

interface MascotProps {
  className?: string;
  size?: MascotSize;
  expression?: MascotExpression;
  outfit?: MascotOutfit; // Deprecated in 3D mode but kept for props compatibility
  alt?: string;
  showShadow?: boolean;
}

/**
 * Modern 3D Mascot Component
 * Replaces legacy SVG logic with high-fidelity 3D assets.
 * Utilizes the 'corgimascot-{expression}.png' asset pattern.
 */
const Mascot: React.FC<MascotProps> = ({ 
  className = "",
  size = "md",
  expression = 'neutral',
  outfit = 'none',
  alt = "Packet the Corgi, your learning guide",
  showShadow = true
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses: Record<MascotSize, string> = {
    xs: 'w-6 h-6',
    sm: 'w-12 h-12',
    md: 'w-32 h-32',
    'md-lg': 'w-40 h-40',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64',
    full: 'w-full h-full'
  };

  // Maps expressions to their asset names
  const expressionMap: Record<MascotExpression, string> = {
    neutral: 'neutral',
    happy: 'happy',
    excited: 'excited',
    confused: 'confused',
    sleeping: 'sleeping',
    thinking: 'thinking',
    alarmed: 'alarmed'
  };

  // Asset URL construction
  // In development, if assets are missing, we use a themed placeholder
  const actualAssetName = `corgimascot-${expressionMap[expression]}.png`;
  const assetUrl = `/${actualAssetName}`;
  
  // High-fidelity placeholder for development/missing assets
  const placeholderUrl = `https://picsum.photos/seed/corgi-${expressionMap[expression]}/400/400`;

  return (
    <div className={`relative select-none inline-flex items-center justify-center ${sizeClasses[size]} ${className}`} role="img" aria-label={alt}>
      {/* Ground Shadow */}
      {showShadow && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[8%] bg-slate-900/10 rounded-full blur-md z-0" />
      )}

      {/* Main Mascot Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={expression}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.05, y: -5 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          src={hasError ? placeholderUrl : assetUrl}
          onError={() => setHasError(true)}
          alt={alt}
          referrerPolicy="no-referrer"
          className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
        />
      </AnimatePresence>

      {/* Micro-interaction: thinking state dots */}
      {expression === 'thinking' && (
        <motion.div 
          className="absolute -top-2 -right-2 flex gap-1 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[0, 1, 2].map(i => (
            <motion.div 
              key={i}
              className="w-1.5 h-1.5 bg-brand-400 rounded-full"
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Mascot;
