import React, { useMemo, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { regions } from '../data/regions';
import { ReignEvent } from '../data/events';
import { Ruler } from '../data/rulers';
import { Dynasty } from '../data/dynasties';
import { HistoricalEvent } from '../data/historicalEvents';
import { Artifact } from '../data/artifacts';
import { Sparkles, ZoomIn, ZoomOut, Maximize, Swords, Skull, Landmark, Globe2, Building2, Book, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MapProps {
  year: number;
  lang: 'en' | 'fa';
  onRegionClick: (regionId: string) => void;
  onGlobalContextClick?: (year: number) => void;
  events: ReignEvent[];
  rulers: Record<string, Ruler>;
  dynasties: Record<string, Dynasty>;
  historicalEvents?: HistoricalEvent[];
  artifacts?: Artifact[];
  onHistoricalEventClick?: (event: HistoricalEvent) => void;
  onArtifactClick?: (artifact: Artifact) => void;
}

export const Map: React.FC<MapProps> = ({ year, lang, onRegionClick, onGlobalContextClick, events, rulers, dynasties, historicalEvents = [], artifacts = [], onHistoricalEventClick, onArtifactClick }) => {
  const [currentScale, setCurrentScale] = useState(1);
  const [tooltip, setTooltip] = useState<{ x: number, y: number, text: string, subtext?: string } | null>(null);

  const resolveCoordinates = (coords?: [number, number], regionId?: string): [number, number] | undefined => {
    if (!coords) return undefined;
    // Heuristic: If coordinates look like pure longitude/latitude (e.g., both < 90)
    // they are likely AI-generated geo-coordinates, not SVG pixel coordinates.
    if (coords[0] < 90 && coords[1] < 90) {
      if (regionId) {
        const region = regions.find(r => r.id === regionId);
        if (region) return region.center;
      }
      // Rough projection fallback: Lon 30-75 -> X 0-1000, Lat 20-45 -> Y 600-0
      const x = ((Math.max(30, Math.min(75, coords[0])) - 30) / 45) * 1000;
      const y = 600 - ((Math.max(20, Math.min(45, coords[1])) - 20) / 25) * 600;
      return [x, y] as [number, number];
    }
    return coords;
  };

  const activeEvents = useMemo(() => {
    return events.filter((e) => year >= e.startDate && year <= e.endDate);
  }, [year, events]);

  const activeHistoricalEvents = useMemo(() => {
    return historicalEvents
      .filter(e => Math.abs(e.year - year) <= 25 && e.coordinates)
      .map(e => ({ ...e, coordinates: resolveCoordinates(e.coordinates, e.regionId) }));
  }, [year, historicalEvents]);

  const activeArtifacts = useMemo(() => {
    return artifacts
      .filter(a => Math.abs(a.year - year) <= 100 && a.coordinates)
      .map(a => ({ ...a, coordinates: resolveCoordinates(a.coordinates, a.regionId) }));
  }, [year, artifacts]);

  const getRegionStyle = (regionId: string) => {
    const regionEvents = activeEvents.filter((e) => e.regionId === regionId);
    
    if (regionEvents.length === 0) {
      return { fill: '#1e293b', stroke: '#334155', strokeWidth: 1, filter: 'none' }; // Slate 800
    }

    const primaryEvent = regionEvents.find(e => e.status === 'Direct Control') || regionEvents[0];
    const ruler = rulers[primaryEvent.rulerId];
    const dynasty = dynasties[ruler.dynastyId];

    let baseColor = '#334155';
    let glowColor = 'transparent';
    if (dynasty.colorFamily === 'persian') { baseColor = '#a855f7'; glowColor = 'rgba(168, 85, 247, 0.4)'; } // Purple
    if (dynasty.colorFamily === 'arab') { baseColor = '#10b981'; glowColor = 'rgba(16, 185, 129, 0.4)'; } // Emerald
    if (dynasty.colorFamily === 'turkic') { baseColor = '#ea580c'; glowColor = 'rgba(234, 88, 12, 0.4)'; } // Orange
    if (dynasty.colorFamily === 'greek') { baseColor = '#0ea5e9'; glowColor = 'rgba(14, 165, 233, 0.4)'; } // Sky
    if (dynasty.colorFamily === 'nomadic') { baseColor = '#b45309'; glowColor = 'rgba(180, 83, 9, 0.4)'; } // Amber
    if (dynasty.colorFamily === 'foreign') { baseColor = '#e11d48'; glowColor = 'rgba(225, 29, 72, 0.4)'; } // Rose
    if (dynasty.colorFamily === 'semitic') { baseColor = '#78350f'; glowColor = 'rgba(120, 53, 15, 0.4)'; } // Dark Amber

    const hasOverlap = regionEvents.length > 1;
    const isVassal = primaryEvent.status === 'Vassal State';
    const isSphere = primaryEvent.status === 'Sphere of Influence' || primaryEvent.status === 'Contested/Warzone';

    if (hasOverlap || isSphere) {
      return { fill: `url(#stripe-${dynasty.colorFamily})`, stroke: baseColor, strokeWidth: 2, filter: `drop-shadow(0 0 8px ${glowColor})` };
    }

    if (isVassal) {
      return { fill: `url(#dot-${dynasty.colorFamily})`, stroke: baseColor, strokeWidth: 2, strokeDasharray: '4 4', filter: `drop-shadow(0 0 8px ${glowColor})` };
    }

    return { fill: baseColor, stroke: '#ffffff', strokeWidth: 1.5, filter: `drop-shadow(0 0 12px ${glowColor})` };
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'battle': return <Swords className="w-4 h-4 text-rose-400" />;
      case 'downfall': return <Skull className="w-4 h-4 text-purple-400" />;
      case 'political': return <Landmark className="w-4 h-4 text-sky-400" />;
      case 'cultural': return <Globe2 className="w-4 h-4 text-emerald-400" />;
      default: return <Sparkles className="w-4 h-4 text-amber-400" />;
    }
  };

  const getArtifactIcon = (type: string) => {
    switch (type) {
      case 'monument': return <Building2 className="w-4 h-4 text-amber-400" />;
      case 'architecture': return <Landmark className="w-4 h-4 text-sky-400" />;
      case 'manuscript': return <Book className="w-4 h-4 text-purple-400" />;
      default: return <Sparkles className="w-4 h-4 text-emerald-400" />;
    }
  };
  const [showLegend, setShowLegend] = useState(false);

  return (
    <div className="w-full h-full relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0f172a] via-[#020617] to-[#000000] overflow-hidden">
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        centerOnInit={true}
        limitToBounds={false}
        centerZoomedOut={false}
        wheel={{ step: 0.1 }}
        onTransformed={(ref) => setCurrentScale(ref.state.scale)}
      >
        {({ zoomIn, zoomOut, resetTransform }) => {
          const scale = currentScale;
          return (
          <>
            {/* Zoom Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-auto sm:left-6 z-10 flex flex-col gap-1.5 sm:gap-2 liquid-glass p-1.5 sm:p-2 rounded-xl sm:rounded-2xl calm-transition border border-white/5">
              <button onClick={() => zoomIn()} className="p-2 sm:p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg sm:rounded-xl group transition-all">
                <ZoomIn className="w-5 h-5 sm:w-5 sm:h-5 group-hover:scale-110 calm-transition" />
              </button>
              <button onClick={() => zoomOut()} className="p-2 sm:p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg sm:rounded-xl group transition-all border-y border-white/5">
                <ZoomOut className="w-5 h-5 sm:w-5 sm:h-5 group-hover:scale-110 calm-transition" />
              </button>
              <button onClick={() => resetTransform()} className="p-2 sm:p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg sm:rounded-xl group transition-all">
                <Maximize className="w-5 h-5 sm:w-5 sm:h-5 group-hover:scale-110 calm-transition" />
              </button>
            </div>

            {/* Mobile Legend Toggle */}
            <div 
              className="sm:hidden absolute left-4 z-10 pointer-events-auto"
              style={{ top: 'calc(var(--safe-top, 0px) + 72px)' }}
            >
              <button 
                onClick={() => setShowLegend(!showLegend)}
                className="liquid-glass px-3 py-2 rounded-xl text-[10px] font-bold text-white flex items-center gap-2 border border-white/10 active:scale-95 transition-all shadow-lg"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                {lang === 'en' ? 'MAP LEGEND' : 'راهنمای نقشه'}
              </button>
            </div>

            <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full">
              <svg viewBox="0 0 1000 600" className="w-full h-full" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
                <defs>
                  {/* Grid Pattern */}
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                  </pattern>

                  {/* Patterns for Persian */}
                  <pattern id="stripe-persian" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
                    <rect width="10" height="10" fill="#a855f7" fillOpacity="0.15" />
                    <line x1="0" y1="0" x2="0" y2="10" stroke="#a855f7" strokeWidth="3" />
                  </pattern>
                  <pattern id="dot-persian" patternUnits="userSpaceOnUse" width="10" height="10">
                    <rect width="10" height="10" fill="#a855f7" fillOpacity="0.1" />
                    <circle cx="5" cy="5" r="2" fill="#a855f7" />
                  </pattern>

                  {/* Patterns for Arab */}
                  <pattern id="stripe-arab" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
                    <rect width="10" height="10" fill="#10b981" fillOpacity="0.15" />
                    <line x1="0" y1="0" x2="0" y2="10" stroke="#10b981" strokeWidth="3" />
                  </pattern>
                  <pattern id="dot-arab" patternUnits="userSpaceOnUse" width="10" height="10">
                    <rect width="10" height="10" fill="#10b981" fillOpacity="0.1" />
                    <circle cx="5" cy="5" r="2" fill="#10b981" />
                  </pattern>

                  {/* Patterns for Turkic */}
                  <pattern id="stripe-turkic" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
                    <rect width="10" height="10" fill="#ea580c" fillOpacity="0.15" />
                    <line x1="0" y1="0" x2="0" y2="10" stroke="#ea580c" strokeWidth="3" />
                  </pattern>
                  <pattern id="dot-turkic" patternUnits="userSpaceOnUse" width="10" height="10">
                    <rect width="10" height="10" fill="#ea580c" fillOpacity="0.1" />
                    <circle cx="5" cy="5" r="2" fill="#ea580c" />
                  </pattern>

                  {/* Patterns for Greek */}
                  <pattern id="stripe-greek" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
                    <rect width="10" height="10" fill="#0ea5e9" fillOpacity="0.15" />
                    <line x1="0" y1="0" x2="0" y2="10" stroke="#0ea5e9" strokeWidth="3" />
                  </pattern>
                  <pattern id="dot-greek" patternUnits="userSpaceOnUse" width="10" height="10">
                    <rect width="10" height="10" fill="#0ea5e9" fillOpacity="0.1" />
                    <circle cx="5" cy="5" r="2" fill="#0ea5e9" />
                  </pattern>

                  {/* Patterns for Nomadic */}
                  <pattern id="stripe-nomadic" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
                    <rect width="10" height="10" fill="#b45309" fillOpacity="0.15" />
                    <line x1="0" y1="0" x2="0" y2="10" stroke="#b45309" strokeWidth="3" />
                  </pattern>
                  <pattern id="dot-nomadic" patternUnits="userSpaceOnUse" width="10" height="10">
                    <rect width="10" height="10" fill="#b45309" fillOpacity="0.1" />
                    <circle cx="5" cy="5" r="2" fill="#b45309" />
                  </pattern>

                  {/* Patterns for Foreign */}
                  <pattern id="stripe-foreign" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
                    <rect width="10" height="10" fill="#e11d48" fillOpacity="0.15" />
                    <line x1="0" y1="0" x2="0" y2="10" stroke="#e11d48" strokeWidth="3" />
                  </pattern>
                  <pattern id="dot-foreign" patternUnits="userSpaceOnUse" width="10" height="10">
                    <rect width="10" height="10" fill="#e11d48" fillOpacity="0.1" />
                    <circle cx="5" cy="5" r="2" fill="#e11d48" />
                  </pattern>

                  {/* Patterns for Semitic */}
                  <pattern id="stripe-semitic" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
                    <rect width="10" height="10" fill="#78350f" fillOpacity="0.15" />
                    <line x1="0" y1="0" x2="0" y2="10" stroke="#78350f" strokeWidth="3" />
                  </pattern>
                  <pattern id="dot-semitic" patternUnits="userSpaceOnUse" width="10" height="10">
                    <rect width="10" height="10" fill="#78350f" fillOpacity="0.1" />
                    <circle cx="5" cy="5" r="2" fill="#78350f" />
                  </pattern>

                  <filter id="eventGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>

                  {/* Noise Filter for Board Game Feel */}
                  <filter id="noise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
                    <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.05 0" />
                  </filter>
                </defs>

                {/* Infinite Background Grid */}
                <rect x="-5000" y="-5000" width="11000" height="10600" fill="url(#grid)" />
                
                {/* Infinite Noise Overlay */}
                <rect x="-5000" y="-5000" width="11000" height="10600" style={{ pointerEvents: 'none' }} filter="url(#noise)" />

                {/* Subtle Latitude/Longitude Grid for Board Game Feel (Extended) */}
                <g className="opacity-10 pointer-events-none">
                  {[...Array(111)].map((_, i) => (
                    <line key={`v-${i}`} x1={(i - 50) * 100} y1={-5000} x2={(i - 50) * 100} y2={5600} stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
                  ))}
                  {[...Array(111)].map((_, i) => (
                    <line key={`h-${i}`} x1={-5000} y1={(i - 50) * 100} x2={6000} y2={(i - 50) * 100} stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
                  ))}
                </g>

                {/* Water Bodies */}
                <g className="pointer-events-none">
                  {/* Caspian Sea */}
                  <polygon points="380,100 400,140 480,140 540,160 600,80 560,20 420,20 380,100" fill="#082f49" fillOpacity="0.4" stroke="#0ea5e9" strokeOpacity="0.2" strokeWidth="2" />
                  <text 
                    x="480" y="80" 
                    textAnchor="middle" 
                    className={`text-[10px] font-serif italic opacity-40 ${lang === 'fa' ? '' : 'tracking-widest'}`} 
                    fill="#38bdf8" 
                    transform="rotate(-15, 480, 80)"
                    style={{ direction: lang === 'fa' ? 'rtl' : 'ltr' }}
                  >
                    {lang === 'en' ? 'Caspian Sea' : 'دریای کاسپین'}
                  </text>
                  
                  {/* Persian Gulf */}
                  <polygon points="160,340 240,380 340,460 480,480 560,520 720,520 720,600 160,600" fill="#082f49" fillOpacity="0.4" stroke="#0ea5e9" strokeOpacity="0.2" strokeWidth="2" />
                  <text 
                    x="400" y="520" 
                    textAnchor="middle" 
                    className={`text-[12px] font-serif italic opacity-40 ${lang === 'fa' ? '' : 'tracking-widest'}`} 
                    fill="#38bdf8" 
                    transform="rotate(-10, 400, 520)"
                    style={{ direction: lang === 'fa' ? 'rtl' : 'ltr' }}
                  >
                    {lang === 'en' ? 'Persian Gulf' : 'خلیج فارس'}
                  </text>

                  {/* Mediterranean Sea */}
                  <polygon points="0,120 40,120 60,200 120,260 0,260" fill="#082f49" fillOpacity="0.4" stroke="#0ea5e9" strokeOpacity="0.2" strokeWidth="2" />
                  <text 
                    x="40" y="200" 
                    textAnchor="middle" 
                    className={`text-[10px] font-serif italic opacity-40 ${lang === 'fa' ? '' : 'tracking-widest'}`} 
                    fill="#38bdf8" 
                    transform="rotate(-60, 40, 200)"
                    style={{ direction: lang === 'fa' ? 'rtl' : 'ltr' }}
                  >
                    {lang === 'en' ? 'Mediterranean' : 'مدیترانه'}
                  </text>
                </g>

                {/* Neighboring Regions (Faded) */}
                <g className="pointer-events-none opacity-40">
                  {/* Europe / Balkans */}
                  <polygon points="0,0 160,0 160,100 40,120 0,120" fill="#0f172a" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                  <text 
                    x="60" y="60" 
                    textAnchor="middle" 
                    className={`text-[10px] font-bold opacity-50 ${lang === 'fa' ? '' : 'tracking-widest'}`} 
                    fill="#94a3b8"
                    style={{ direction: lang === 'fa' ? 'rtl' : 'ltr' }}
                  >
                    {lang === 'en' ? 'EUROPE' : 'اروپا'}
                  </text>

                  {/* Steppes */}
                  <polygon points="160,0 1000,0 1000,60 740,60 600,80 560,20 420,20 380,100 320,80 240,120 160,100" fill="#0f172a" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                  <text 
                    x="500" y="40" 
                    textAnchor="middle" 
                    className={`text-[12px] font-bold opacity-50 ${lang === 'fa' ? '' : 'tracking-widest'}`} 
                    fill="#94a3b8"
                    style={{ direction: lang === 'fa' ? 'rtl' : 'ltr' }}
                  >
                    {lang === 'en' ? 'THE STEPPES' : 'استپ‌ها'}
                  </text>

                  {/* Levant / Egypt */}
                  <polygon points="0,260 120,260 160,340 0,340" fill="#0f172a" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                  <text 
                    x="60" y="300" 
                    textAnchor="middle" 
                    className={`text-[10px] font-bold opacity-50 ${lang === 'fa' ? '' : 'tracking-widest'}`} 
                    fill="#94a3b8"
                    style={{ direction: lang === 'fa' ? 'rtl' : 'ltr' }}
                  >
                    {lang === 'en' ? 'LEVANT & EGYPT' : 'شام و مصر'}
                  </text>

                  {/* Arabia */}
                  <polygon points="0,340 160,340 240,380 340,460 480,480 560,520 720,520 720,600 0,600" fill="#0f172a" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                  <text 
                    x="200" y="480" 
                    textAnchor="middle" 
                    className={`text-[12px] font-bold opacity-50 ${lang === 'fa' ? '' : 'tracking-widest'}`} 
                    fill="#94a3b8"
                    style={{ direction: lang === 'fa' ? 'rtl' : 'ltr' }}
                  >
                    {lang === 'en' ? 'ARABIA' : 'عربستان'}
                  </text>

                  {/* India */}
                  <polygon points="980,340 920,220 1000,220 1000,600 900,560" fill="#0f172a" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                  <text 
                    x="960" y="400" 
                    textAnchor="middle" 
                    className={`text-[12px] font-bold opacity-50 ${lang === 'fa' ? '' : 'tracking-widest'}`} 
                    fill="#94a3b8" 
                    transform="rotate(70, 960, 400)"
                    style={{ direction: lang === 'fa' ? 'rtl' : 'ltr' }}
                  >
                    {lang === 'en' ? 'INDIA' : 'هند'}
                  </text>
                </g>

                {regions.map((region) => {
                  const style = getRegionStyle(region.id);
                  const regionEvents = activeEvents.filter((e) => e.regionId === region.id);
                  const primaryEvent = regionEvents.find(e => e.status === 'Direct Control') || regionEvents[0];
                  const ruler = primaryEvent ? rulers[primaryEvent.rulerId] : null;
                  const dynasty = ruler ? dynasties[ruler.dynastyId] : null;
                  const controlText = dynasty ? `${dynasty.name[lang]} - ${primaryEvent.status}` : '';

                  return (
                    <g 
                      key={region.id} 
                      onClick={() => onRegionClick(region.id)} 
                      onMouseMove={(e) => {
                        setTooltip({
                          x: e.clientX,
                          y: e.clientY,
                          text: region.name[lang],
                          subtext: controlText
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                      className="cursor-pointer hover:brightness-125 transition-all duration-300 group"
                    >
                      <polygon
                        points={region.polygon}
                        style={{
                          fill: style.fill,
                          stroke: style.stroke,
                          strokeWidth: style.strokeWidth,
                          strokeDasharray: style.strokeDasharray,
                          filter: style.filter,
                          transition: 'all 0.5s ease'
                        }}
                      />
                      <text
                        x={region.center[0]}
                        y={region.center[1]}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className={`text-xs font-bold pointer-events-none calm-transition ${
                          lang === 'fa' ? '' : 'tracking-wider'
                        } ${scale > 2.5 ? 'opacity-0' : 'opacity-60 group-hover:opacity-100'}`}
                        fill="#f8fafc"
                        style={{ 
                          textShadow: '0px 2px 4px rgba(0,0,0,0.9), 0px 0px 8px rgba(0,0,0,0.5)',
                          direction: lang === 'fa' ? 'rtl' : 'ltr'
                        }}
                      >
                        {region.name[lang]}
                      </text>
                      
                      {/* Render Cities */}
                      {region.cities?.map(city => (
                        <g key={city.id} className="pointer-events-none calm-transition">
                          <circle 
                            cx={city.coordinates[0]} 
                            cy={city.coordinates[1]} 
                            r="3" 
                            fill="#cbd5e1" 
                            stroke="#0f172a" 
                            strokeWidth="1"
                            className={`drop-shadow-md transition-opacity duration-300 ${scale > 1.2 ? 'opacity-100' : 'opacity-0'}`}
                          />
                          <text
                            x={city.coordinates[0]}
                            y={city.coordinates[1] - 8}
                            textAnchor="middle"
                            dominantBaseline="central"
                            className={`text-[8px] font-medium transition-opacity duration-300 ${scale > 1.5 ? 'opacity-100' : 'opacity-0'}`}
                            fill="#94a3b8"
                            style={{ 
                              textShadow: '0px 1px 2px rgba(0,0,0,0.9)',
                              direction: lang === 'fa' ? 'rtl' : 'ltr'
                            }}
                          >
                            {city.name[lang]}
                          </text>
                        </g>
                      ))}
                    </g>
                  );
                })}

                {/* Historical Events */}
                {activeHistoricalEvents.map((event) => (
                  <g 
                    key={event.id} 
                    className="cursor-pointer group calm-transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onHistoricalEventClick) onHistoricalEventClick(event);
                    }}
                  >
                    <circle
                      cx={event.coordinates![0]}
                      cy={event.coordinates![1]}
                      r="12"
                      fill="#0f172a"
                      stroke={event.type === 'battle' ? '#f43f5e' : event.type === 'downfall' ? '#c084fc' : event.type === 'political' ? '#38bdf8' : '#34d399'}
                      strokeWidth="1.5"
                      className="opacity-80 group-hover:opacity-100 transition-all duration-300"
                      style={{ filter: 'url(#eventGlow)' }}
                    />
                    <circle
                      cx={event.coordinates![0]}
                      cy={event.coordinates![1]}
                      r="16"
                      fill="none"
                      stroke={event.type === 'battle' ? '#f43f5e' : event.type === 'downfall' ? '#c084fc' : event.type === 'political' ? '#38bdf8' : '#34d399'}
                      strokeWidth="0.5"
                      className="opacity-0 group-hover:opacity-100 animate-ping"
                      style={{ transformOrigin: `${event.coordinates![0]}px ${event.coordinates![1]}px` }}
                    />
                    <foreignObject 
                      x={event.coordinates![0] - 8} 
                      y={event.coordinates![1] - 8} 
                      width="16" 
                      height="16"
                      className="pointer-events-none"
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        {getEventIcon(event.type)}
                      </div>
                    </foreignObject>
                    <text
                      x={event.coordinates![0]}
                      y={event.coordinates![1] + 20}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="white"
                      className={`text-[8px] font-sans font-bold transition-opacity drop-shadow-md bg-slate-900/80 px-1 rounded ${scale > 2.0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                      style={{ direction: lang === 'fa' ? 'rtl' : 'ltr' }}
                    >
                      {event.title[lang]}
                    </text>
                  </g>
                ))}

                {/* Artifacts */}
                {activeArtifacts.map((artifact) => (
                  <g 
                    key={artifact.id} 
                    className="cursor-pointer group calm-transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onArtifactClick) onArtifactClick(artifact);
                    }}
                  >
                    <circle
                      cx={artifact.coordinates![0]}
                      cy={artifact.coordinates![1]}
                      r="10"
                      fill="#0f172a"
                      stroke="#fbbf24"
                      strokeWidth="1.5"
                      className="opacity-80 group-hover:opacity-100 transition-all duration-300"
                      style={{ filter: 'url(#eventGlow)' }}
                    />
                    <circle
                      cx={artifact.coordinates![0]}
                      cy={artifact.coordinates![1]}
                      r="14"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="0.5"
                      className="opacity-0 group-hover:opacity-100 animate-ping"
                      style={{ transformOrigin: `${artifact.coordinates![0]}px ${artifact.coordinates![1]}px` }}
                    />
                    <foreignObject 
                      x={artifact.coordinates![0] - 8} 
                      y={artifact.coordinates![1] - 8} 
                      width="16" 
                      height="16"
                      className="pointer-events-none"
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        {getArtifactIcon(artifact.type)}
                      </div>
                    </foreignObject>
                    <text
                      x={artifact.coordinates![0]}
                      y={artifact.coordinates![1] + 20}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="white"
                      className={`text-[8px] font-sans font-bold transition-opacity drop-shadow-md bg-slate-900/80 px-1 rounded ${scale > 2.0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                      style={{ direction: lang === 'fa' ? 'rtl' : 'ltr' }}
                    >
                      {artifact.name[lang]}
                    </text>
                  </g>
                ))}
              </svg>
            </TransformComponent>
          </>
        )}}
      </TransformWrapper>
      
      {/* Legend Overlay */}
      <AnimatePresence>
        {(showLegend || (typeof window !== 'undefined' && window.innerWidth >= 640)) && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`absolute left-4 sm:left-6 liquid-glass p-3 sm:p-5 rounded-2xl sm:rounded-3xl text-[9px] sm:text-xs flex flex-col gap-1.5 sm:gap-3 text-slate-300 pointer-events-auto z-10 calm-transition shadow-2xl ${!showLegend && 'hidden sm:flex'}`}
            style={{ top: 'calc(var(--safe-top, 0px) + 112px)' }}
          >
            <div className="flex justify-between items-center mb-1">
              <div className="font-bold text-white uppercase tracking-wider text-[8px] sm:text-[10px] opacity-80">{lang === 'en' ? 'Legend' : 'راهنما'}</div>
              <button onClick={() => setShowLegend(false)} className="sm:hidden p-1 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-3 h-3 text-slate-400" />
              </button>
            </div>
            <div className="flex items-center gap-2 sm:gap-3"><div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#a855f7] shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div> {lang === 'en' ? 'Persian/Iranian' : 'ایرانی/پارسی'}</div>
            <div className="flex items-center gap-2 sm:gap-3"><div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div> {lang === 'en' ? 'Arab/Caliphate' : 'عرب/خلافت'}</div>
            <div className="flex items-center gap-2 sm:gap-3"><div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#ea580c] shadow-[0_0_8px_rgba(234,88,12,0.8)]"></div> {lang === 'en' ? 'Turkic/Mongol' : 'ترک/مغول'}</div>
            <div className="flex items-center gap-2 sm:gap-3"><div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#0ea5e9] shadow-[0_0_8px_rgba(14,165,233,0.8)]"></div> {lang === 'en' ? 'Hellenic/Greek' : 'یونانی/هلنیستی'}</div>
            <div className="flex items-center gap-2 sm:gap-3"><div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#b45309] shadow-[0_0_8px_rgba(180,83,9,0.8)]"></div> {lang === 'en' ? 'Nomadic/Steppe' : 'عشایر/استپ'}</div>
            <div className="flex items-center gap-2 sm:gap-3"><div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#e11d48] shadow-[0_0_8px_rgba(225,29,72,0.8)]"></div> {lang === 'en' ? 'Foreign Imperial' : 'امپراتوری خارجی'}</div>
            <div className="flex items-center gap-2 sm:gap-3"><div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#78350f] shadow-[0_0_8px_rgba(120,53,15,0.8)]"></div> {lang === 'en' ? 'Babylonian/Semitic' : 'بابلی/سامی'}</div>
            <div className="w-full h-px bg-slate-700/50 my-0.5 sm:my-1"></div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 border border-slate-400 flex items-center justify-center rounded-sm">
                <div className="w-full h-[1px] bg-slate-400 rotate-45"></div>
              </div> 
              {lang === 'en' ? 'Contested/Influence' : 'مورد مناقشه/نفوذ'}
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 border border-slate-400 border-dashed rounded-sm"></div> 
              {lang === 'en' ? 'Vassal State' : 'دولت دست‌نشانده'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Tooltip */}
      {tooltip && (
        <div 
          className="fixed z-50 pointer-events-none bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white px-3 py-2 rounded-xl shadow-2xl transform -translate-x-1/2 -translate-y-[120%]"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="font-bold text-sm">{tooltip.text}</div>
          {tooltip.subtext && (
            <div className="text-xs text-slate-300 mt-0.5">{tooltip.subtext}</div>
          )}
        </div>
      )}
    </div>
  );
};
