import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { initClarity } from './services/clarity.ts';
import App from './App.tsx';
import { ApiKeyProvider } from './context/ApiKeyContext.tsx';
import './index.css';

// Initialize Microsoft Clarity (deferred, non-blocking)
initClarity();

// Register tile cache service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/tile-cache-sw.js').catch(() => {
      // Service worker registration failed — tiles still work, just without caching
    });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApiKeyProvider>
      <App />
      <Analytics />
      <SpeedInsights />
    </ApiKeyProvider>
  </StrictMode>,
);
