// src/services/introAudio.ts
// Cinematic drone synthesizer — zero audio files, pure Web Audio

export interface IntroAudio {
  fadeIn: () => void;
  pulse: () => void;
  resolve: () => void;
  stop: () => void;
}

export function createIntroAudio(): IntroAudio | null {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  let ctx: AudioContext;
  let master: GainNode;
  let osc1: OscillatorNode;
  let osc2: OscillatorNode;
  let osc3: OscillatorNode;
  let lfo: OscillatorNode;
  let lfoGain: GainNode;

  try {
    ctx = new AudioContext();

    // ── Master bus with soft limiter ──────────────────────────────────────
    master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);

    // Subtle reverb simulation via delay + feedback
    const delay = ctx.createDelay(1.0);
    delay.delayTime.setValueAtTime(0.12, ctx.currentTime);
    const feedback = ctx.createGain();
    feedback.gain.setValueAtTime(0.25, ctx.currentTime);
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(800, ctx.currentTime);

    // Routing: master → delay → lowpass → feedback → delay (loop)
    //          master → destination (dry)
    //          delay  → destination (wet)
    master.connect(ctx.destination);
    master.connect(delay);
    delay.connect(lowpass);
    lowpass.connect(feedback);
    feedback.connect(delay);
    delay.connect(ctx.destination);

    // ── Primary sub-bass A1 (55 Hz) ──────────────────────────────────────
    osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(55, ctx.currentTime);
    const osc1Gain = ctx.createGain();
    osc1Gain.gain.setValueAtTime(1.0, ctx.currentTime);
    osc1.connect(osc1Gain);
    osc1Gain.connect(master);
    osc1.start();

    // ── Overtone A2 (110 Hz) — warmth ────────────────────────────────────
    osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(110, ctx.currentTime);
    const osc2Gain = ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.2, ctx.currentTime);
    osc2.connect(osc2Gain);
    osc2Gain.connect(master);
    osc2.start();

    // ── Minor third E2 (82.4 Hz) — darkness ──────────────────────────────
    osc3 = ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(82.4, ctx.currentTime);
    const osc3Gain = ctx.createGain();
    osc3Gain.gain.setValueAtTime(0.12, ctx.currentTime);
    osc3.connect(osc3Gain);
    osc3Gain.connect(master);
    osc3.start();

    // ── LFO for subtle amplitude tremolo (0.3 Hz — slow breathe) ─────────
    lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.3, ctx.currentTime);
    lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(0.008, ctx.currentTime); // very subtle
    lfo.connect(lfoGain);
    lfoGain.connect(master.gain);
    lfo.start();

  } catch (_) {
    return null;
  }

  return {
    fadeIn() {
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      if (ctx.state === 'closed') return;
      // Slow atmospheric swell — 1200ms
      master.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 1.2);
    },

    pulse() {
      if (ctx.state !== 'running') return;
      const t = ctx.currentTime;
      // Sub drop — feels like a massive stone door closing
      osc1.frequency.setValueAtTime(55, t);
      osc1.frequency.linearRampToValueAtTime(44, t + 0.08);
      osc1.frequency.linearRampToValueAtTime(55, t + 0.5);
      // Volume swell
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(0.08, t + 0.06);
      master.gain.linearRampToValueAtTime(0.05, t + 0.6);
    },

    resolve() {
      if (ctx.state !== 'running') return;
      const t = ctx.currentTime;
      // Rise to major — feels like light breaking through
      osc1.frequency.linearRampToValueAtTime(65.4, t + 1.0);
      osc2.frequency.linearRampToValueAtTime(130.8, t + 1.0);
      osc3.frequency.linearRampToValueAtTime(98, t + 1.0); // resolves to G
      // Swell then fade to absolute silence
      master.gain.linearRampToValueAtTime(0.07, t + 0.5);
      master.gain.linearRampToValueAtTime(0, t + 2.5);
    },

    stop() {
      try {
        if (ctx.state !== 'closed') {
          osc1.stop(); osc2.stop(); osc3.stop(); lfo.stop();
          ctx.close();
        }
      } catch (_) {}
    },
  };
}
