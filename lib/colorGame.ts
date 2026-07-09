export type HSL = { h: number; s: number; l: number };

export function hslToRgb({ h, s, l }: HSL): { r: number; g: number; b: number } {
  const sat = s / 100;
  const light = l / 100;
  const c = (1 - Math.abs(2 * light - 1)) * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = light - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

export function hslToCss(color: HSL): string {
  return `hsl(${Math.round(color.h)}, ${Math.round(color.s)}%, ${Math.round(color.l)}%)`;
}

function srgbToLinear(v: number): number {
  const c = v / 255;
  return c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92;
}

function labF(t: number): number {
  return t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
}

function hslToLab(color: HSL): { l: number; a: number; b: number } {
  const { r, g, b } = hslToRgb(color);
  const rl = srgbToLinear(r);
  const gl = srgbToLinear(g);
  const bl = srgbToLinear(b);
  const x = rl * 0.4124 + gl * 0.3576 + bl * 0.1805;
  const y = rl * 0.2126 + gl * 0.7152 + bl * 0.0722;
  const z = rl * 0.0193 + gl * 0.1192 + bl * 0.9505;
  const fx = labF(x / 0.95047);
  const fy = labF(y / 1.0);
  const fz = labF(z / 1.08883);
  return {
    l: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

export function scoreRound(target: HSL, guess: HSL): number {
  const labA = hslToLab(target);
  const labB = hslToLab(guess);
  const distance = Math.sqrt(
    (labA.l - labB.l) ** 2 + (labA.a - labB.a) ** 2 + (labA.b - labB.b) ** 2
  );
  return Math.max(0, Math.min(10, Math.round((10 - distance / 8) * 10) / 10));
}

export function generateTargets(count: number): HSL[] {
  return Array.from({ length: count }, () => ({
    h: Math.floor(Math.random() * 360),
    s: 55 + Math.floor(Math.random() * 40),
    l: 35 + Math.floor(Math.random() * 30),
  }));
}

export function verdictForScore(total: number, max: number): string {
  const pct = total / max;
  if (pct >= 0.9) return 'You see color the way most people hear music.';
  if (pct >= 0.7) return 'A trained eye. Mildly insufferable at paint stores.';
  if (pct >= 0.45) return 'You have opinions about color you cannot fully back up.';
  return 'Get your monitor checked. Or your eyes. Possibly both.';
}
