import React from 'react';
import { Key } from 'lucide-react';
import { useApiKey } from '../context/ApiKeyContext';

interface AIKeyButtonProps {
  onClick: () => void;
  className?: string;
}

export function AIKeyButton({ onClick, className = '' }: AIKeyButtonProps) {
  const { apiKey } = useApiKey();

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-xl transition-all flex items-center gap-2 group ring-1 calm-transition ${
        apiKey 
          ? 'bg-emerald-500/10 ring-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' 
          : 'bg-amber-500/10 ring-amber-500/30 text-amber-400 hover:bg-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
      } ${className}`}
      title={apiKey ? "API Key Set" : "Setup API Key"}
    >
      <div className={`p-1 rounded-lg ${apiKey ? 'bg-emerald-500/20' : 'bg-amber-500/20 animate-pulse'}`}>
        <Key className="w-3.5 h-3.5" />
      </div>
      {!apiKey && (
        <span className="text-[10px] font-bold tracking-wider hidden sm:inline-block pr-1 group-hover:text-amber-300">
          SET AI KEY
        </span>
      )}
    </button>
  );
}
