import React, { useState, useEffect } from 'react';
import { Search, X, Loader2, Sparkles, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { searchHistoricalElement, SearchResult } from '../services/geminiService';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchResult: (result: SearchResult) => void;
  lang: 'en' | 'fa';
}

export function SearchModal({ isOpen, onClose, onSearchResult, lang }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) setQuery('');
  }, [isOpen]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setError(null);

    try {
      const result = await searchHistoricalElement(query, lang);
      if (result) {
        onSearchResult(result);
        onClose();
      } else {
        setError(lang === 'en' ? 'No results found.' : 'نتیجه‌ای یافت نشد.');
      }
    } catch (err) {
      setError(lang === 'en' ? 'Search error.' : 'خطایی در جستجو رخ داد.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 sm:pt-24 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm pointer-events-auto"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-2xl liquid-glass-heavy border border-white/20 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden pointer-events-auto flex flex-col backdrop-blur-3xl"
          >
            <form onSubmit={handleSearch} className="relative flex items-center p-4">
              <Search className="absolute left-7 w-5 h-5 text-slate-400" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={lang === 'en' ? 'Search history...' : 'جستجوی تاریخ...'}
                className="w-full bg-black/20 border border-white/5 rounded-xl py-3 pl-12 pr-24 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                dir={lang === 'fa' ? 'rtl' : 'ltr'}
              />
              <div className="absolute right-7 flex items-center gap-2">
                {isSearching && <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />}
                <button 
                  type="button"
                  onClick={onClose}
                  className="p-1 hover:bg-white/10 rounded-lg text-slate-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </form>

            <div className="px-6 py-4 bg-black/20 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span>{lang === 'en' ? 'AI-powered historical search' : 'جستجوی تاریخی با هوش مصنوعی'}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                <Command className="w-3 h-3" />
                <span>K to toggle</span>
              </div>
            </div>

            {error && (
              <div className="px-6 py-3 bg-red-500/10 text-red-400 text-xs border-t border-red-500/20 text-center">
                {error}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
