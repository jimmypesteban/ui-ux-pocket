export type TypeOrderRound = {
  sizes: number[];
  displayOrder: number[];
};

export function generateTypeOrderRound(): TypeOrderRound {
  const count = 5;
  const sizes: number[] = [];
  let size = 14 + Math.floor(Math.random() * 6);
  for (let i = 0; i < count; i++) {
    sizes.push(size);
    size += 6 + Math.floor(Math.random() * 6);
  }
  const displayOrder = sizes.map((_, i) => i);
  for (let i = displayOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [displayOrder[i], displayOrder[j]] = [displayOrder[j], displayOrder[i]];
  }
  return { sizes, displayOrder };
}

export function scoreRound(elapsedMs: number, correct: boolean): number {
  if (!correct) return 0;
  const score = 10 - Math.floor(elapsedMs / 700);
  return Math.max(3, Math.min(10, score));
}

export function verdictForTypeOrderScore(total: number, max: number): string {
  const pct = total / max;
  if (pct >= 0.9) return 'You read a type scale the way most people read a sentence.';
  if (pct >= 0.7) return 'Fast and accurate. Hierarchy is not a mystery to you.';
  if (pct >= 0.45) return 'You get there, just not at a glance.';
  return 'Every heading in your files is the same size. We can tell.';
}
