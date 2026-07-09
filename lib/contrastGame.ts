import { hslToRgb, HSL } from './colorGame';

function srgbToLinear(v: number): number {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(color: HSL): number {
  const { r, g, b } = hslToRgb(color);
  const rl = srgbToLinear(r);
  const gl = srgbToLinear(g);
  const bl = srgbToLinear(b);
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}

export function contrastRatio(a: HSL, b: HSL): number {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export type ContrastRound = { fg: HSL; bg: HSL; actual: number };

export function generateContrastRound(): ContrastRound {
  const bgLight = Math.random() < 0.5;
  const bg: HSL = {
    h: Math.floor(Math.random() * 360),
    s: 20 + Math.floor(Math.random() * 60),
    l: bgLight ? 75 + Math.floor(Math.random() * 20) : 5 + Math.floor(Math.random() * 20),
  };
  const fg: HSL = {
    h: Math.floor(Math.random() * 360),
    s: 20 + Math.floor(Math.random() * 60),
    l: Math.floor(Math.random() * 100),
  };
  return { fg, bg, actual: contrastRatio(fg, bg) };
}

export function scoreContrastGuess(actual: number, guess: number): number {
  const diff = Math.abs(actual - guess);
  return Math.max(0, Math.min(10, Math.round((10 - diff * 3) * 10) / 10));
}

export function verdictForContrastScore(total: number, max: number): string {
  const pct = total / max;
  if (pct >= 0.9) return 'You read contrast ratios the way sommeliers read tannins.';
  if (pct >= 0.7) return 'Solid instinct. You could pass a WCAG audit by eye.';
  if (pct >= 0.45) return 'You know illegible when you see it. Numerically, less so.';
  return 'You have been designing on a very good monitor in a very dark room.';
}
