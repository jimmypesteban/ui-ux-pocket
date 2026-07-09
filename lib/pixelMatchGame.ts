export type PixelMatchRound = { targetWidth: number; targetHeight: number };

export function generatePixelMatchRound(): PixelMatchRound {
  return {
    targetWidth: 60 + Math.floor(Math.random() * 200),
    targetHeight: 40 + Math.floor(Math.random() * 160),
  };
}

export function scorePixelMatch(round: PixelMatchRound, width: number, height: number): number {
  const widthDiff = Math.abs(round.targetWidth - width) / round.targetWidth;
  const heightDiff = Math.abs(round.targetHeight - height) / round.targetHeight;
  const avgDiff = (widthDiff + heightDiff) / 2;
  return Math.max(0, Math.min(10, Math.round((10 - avgDiff * 40) * 10) / 10));
}

export function verdictForPixelMatchScore(total: number, max: number): string {
  const pct = total / max;
  if (pct >= 0.9) return 'You could eyeball a spec sheet out of existence.';
  if (pct >= 0.7) return "Close enough that the developer won't notice.";
  if (pct >= 0.45) return 'You are estimating, not measuring. It shows.';
  return 'This is why design tools have a properties panel.';
}
