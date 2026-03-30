/**
 * Google Tag Manager helper utilities.
 *
 * GTM itself is initialized in index.html using Vite's %VITE_GTM_ID% env
 * substitution — this ensures the container is present in the raw HTML
 * before any JS executes, which is required for:
 *   - GTM Preview / Debug Mode
 *   - Google's Tag Assistant
 *   - Bot & crawler detection
 *
 * This file only provides runtime helpers for interacting with the
 * already-running GTM dataLayer.
 */

/**
 * Pushes a custom event to the GTM dataLayer.
 * Safe to call even if GTM hasn't initialized yet — events will queue.
 *
 * @example
 * pushToDataLayer('ai_search_start', { query: 'Achaemenid Empire' });
 * pushToDataLayer('region_selected', { region: 'Fars', era: 'ancient' });
 */
export const pushToDataLayer = (event: string, payload?: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;
  // Initialize dataLayer if it doesn't exist yet (safe guard)
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ event, ...payload });
};

/**
 * Tracks a virtual pageview — useful for SPA route changes.
 */
export const trackPageView = (path: string, title?: string) => {
  pushToDataLayer('virtualPageView', {
    page_path: path,
    page_title: title ?? document.title,
  });
};
