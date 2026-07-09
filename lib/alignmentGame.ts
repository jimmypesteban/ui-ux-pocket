export type OddityType = 'offset' | 'size' | 'shade';

export type AlignmentRound = {
  itemCount: number;
  oddIndex: number;
  oddity: OddityType;
  magnitude: number;
};

const ODDITY_TYPES: OddityType[] = ['offset', 'size', 'shade'];

export function generateAlignmentRound(): AlignmentRound {
  const itemCount = 6;
  const oddIndex = Math.floor(Math.random() * itemCount);
  const oddity = ODDITY_TYPES[Math.floor(Math.random() * ODDITY_TYPES.length)];
  const magnitude =
    oddity === 'offset' ? 10 + Math.random() * 12 : oddity === 'size' ? 6 + Math.random() * 8 : 0.14 + Math.random() * 0.12;
  return { itemCount, oddIndex, oddity, magnitude };
}

export function scoreRound(elapsedMs: number, correct: boolean): number {
  if (!correct) return 0;
  const score = 10 - Math.floor(elapsedMs / 500);
  return Math.max(3, Math.min(10, score));
}

export function verdictForAlignmentScore(total: number, max: number): string {
  const pct = total / max;
  if (pct >= 0.9) return 'You spot a 4px offset from across the room.';
  if (pct >= 0.7) return 'Fast eye. You would be exhausting to pair-design with.';
  if (pct >= 0.45) return 'You get there. Eventually. QA will still find things.';
  return 'Everything looks aligned to you. That is, itself, a red flag.';
}
