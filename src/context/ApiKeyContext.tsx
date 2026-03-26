import React, { createContext, useContext, useState, useEffect } from 'react';
import { setApiKey as setGeminiApiKey } from '../services/geminiService';

type PersistMode = 'memory' | 'local';

interface ApiKeyContextType {
  apiKey: string;
  setApiKey: (key: string, persistMode?: PersistMode) => void;
  persistMode: PersistMode;
  isReady: boolean;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiKey, setApiKeyState] = useState('');
  const [persistMode, setPersistModeState] = useState<PersistMode>('memory');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('user_gemini_key');
    if (storedKey) {
      setApiKeyState(storedKey);
      setPersistModeState('local');
      setGeminiApiKey(storedKey);
    }
    setIsReady(true);
  }, []);

  const setApiKey = (key: string, newPersistMode: PersistMode = 'memory') => {
    setApiKeyState(key);
    setPersistModeState(newPersistMode);
    setGeminiApiKey(key);

    if (newPersistMode === 'local' && key) {
      localStorage.setItem('user_gemini_key', key);
    } else {
      localStorage.removeItem('user_gemini_key');
    }
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey, persistMode, isReady }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = () => {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
};
