export type KerningRound = {
  left: string;
  right: string;
  fontSize: number;
  startOffset: number;
};

const PAIRS: { left: string; right: string }[] = [
  { left: 'A', right: 'V' },
  { left: 'T', right: 'o' },
  { left: 'W', right: 'A' },
  { left: 'P', right: 'a' },
  { left: 'L', right: 'T' },
  { left: 'Y', right: 'o' },
];

export function generateKerningRound(): KerningRound {
  const pair = PAIRS[Math.floor(Math.random() * PAIRS.length)];
  const fontSize = 64 + Math.floor(Math.random() * 24);
  const startOffset = (Math.random() < 0.5 ? -1 : 1) * (10 + Math.floor(Math.random() * 16));
  return { ...pair, fontSize, startOffset };
}

export function scoreKerningGuess(guessOffset: number): number {
  const diff = Math.abs(guessOffset);
  return Math.max(0, Math.min(10, Math.round((10 - diff / 2.5) * 10) / 10));
}

export function verdictForKerningScore(total: number, max: number): string {
  const pct = total / max;
  if (pct >= 0.9) return 'You could kern by hand for a type foundry.';
  if (pct >= 0.7) return 'Close enough that only you would notice the difference.';
  if (pct >= 0.45) return 'Readable. A typographer would still wince.';
  return 'Your letters are not touching, but they are not friends either.';
}
