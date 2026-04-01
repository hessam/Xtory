import React from 'react';

export const MapFilters: React.FC = () => (
  <svg className="absolute inset-0 w-0 h-0 pointer-events-none opacity-0" aria-hidden="true">
    <defs>
      {/* LANDMASS: Rough, felt-like paper texture for regions */}
      <filter id="subtle-relief" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="4" seed="8" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="0.5" result="smooth-noise" />
        <feDisplacementMap in="SourceGraphic" in2="smooth-noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
      </filter>

      {/* BORDERS: Glass-edge — soft Gaussian on stroke only */}
      <filter id="glass-edge" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
      </filter>

      {/* MARKERS: Glow rings around event pins */}
      <filter id="eventGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      {/* OCEAN: Deep-space midnight radial */}
      <radialGradient id="water-depth" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="#08182b" />
        <stop offset="100%" stopColor="#020617" />
      </radialGradient>

      {/* RIVERS: Iridescent thin line gradient */}
      <linearGradient id="river-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.2" />
      </linearGradient>

      {/* WATER BODIES: glass fill + glow */}
      <radialGradient id="sea-fill" cx="50%" cy="30%" r="80%">
        <stop offset="0%" stopColor="#1e40af" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#0c1a3a" stopOpacity="0.15" />
      </radialGradient>
      
      <filter id="sea-glow" x="-15%" y="-15%" width="130%" height="130%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" />
      </filter>

      <filter id="river-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
      </filter>
    </defs>
  </svg>
);
