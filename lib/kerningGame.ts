export type KerningRound = {
  word: string;
  fontSize: number;
  startOffsets: number[];
};

// Real short words instead of isolated 2-letter pairs — every adjacent
// letter pair in the word is its own gap, each scrambled independently and
// each with its own slider to fix.
const WORDS = ['TYPE', 'WAVY', 'GRID', 'FLOW', 'VOTE', 'WALK', 'YOGA', 'JAZZ', 'ZOOM', 'WOVEN'];

export function generateKerningRound(): KerningRound {
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];
  const fontSize = 56 + Math.floor(Math.random() * 20);
  const gapCount = word.length - 1;
  const startOffsets = Array.from(
    { length: gapCount },
    () => (Math.random() < 0.5 ? -1 : 1) * (10 + Math.floor(Math.random() * 16))
  );
  return { word, fontSize, startOffsets };
}

export function scoreKerningRound(guessOffsets: number[]): number {
  const perGap = guessOffsets.map((offset) => {
    const diff = Math.abs(offset);
    return Math.max(0, Math.min(10, (10 - diff / 2.5)));
  });
  const avg = perGap.reduce((a, b) => a + b, 0) / perGap.length;
  return Math.round(avg * 10) / 10;
}

export function verdictForKerningScore(total: number, max: number): string {
  const pct = total / max;
  if (pct >= 0.9) return 'You could kern by hand for a type foundry.';
  if (pct >= 0.7) return 'Close enough that only you would notice the difference.';
  if (pct >= 0.45) return 'Readable. A typographer would still wince.';
  return 'Your letters are not touching, but they are not friends either.';
}
