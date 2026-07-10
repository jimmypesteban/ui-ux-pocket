export type Shape = 'square' | 'circle' | 'rectangle';

export type CenterRound = {
  shape: Shape;
  boxWidth: number;
  boxHeight: number;
  dotX: number;
  dotY: number;
  isCentered: boolean;
};

const SHAPES: Shape[] = ['square', 'circle', 'rectangle'];

function randomSign(): number {
  return Math.random() < 0.5 ? -1 : 1;
}

export function generateCenterRound(): CenterRound {
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  const boxWidth = shape === 'rectangle' ? 220 : 160;
  const boxHeight = shape === 'rectangle' ? 120 : 160;

  // Three tiers, not two: dead-center, an obvious miss, and — a slice of the
  // time — a genuinely subtle 2-4px nudge that's meant to be nearly
  // imperceptible. That subtle tier is what "the occasional offset still
  // gets you" is supposed to mean; without it, every "not centered" round
  // was already obvious (a minimum ~6% of the shape's own size).
  const roll = Math.random();
  let offsetX = 0;
  let offsetY = 0;
  const isCentered = roll < 0.4;

  if (!isCentered) {
    const isSubtle = roll < 0.55;
    if (isSubtle) {
      offsetX = randomSign() * (2 + Math.random() * 2);
      offsetY = randomSign() * (2 + Math.random() * 2);
    } else {
      const maxOffsetX = boxWidth * 0.22;
      const maxOffsetY = boxHeight * 0.22;
      offsetX = randomSign() * (boxWidth * 0.06 + Math.random() * maxOffsetX);
      offsetY = randomSign() * (boxHeight * 0.06 + Math.random() * maxOffsetY);
    }
  }

  return {
    shape,
    boxWidth,
    boxHeight,
    dotX: boxWidth / 2 + offsetX,
    dotY: boxHeight / 2 + offsetY,
    isCentered,
  };
}

/** Straight-line distance in px from where the dot actually sits to true center. */
export function offsetDistance(round: CenterRound): number {
  const dx = round.dotX - round.boxWidth / 2;
  const dy = round.dotY - round.boxHeight / 2;
  return Math.sqrt(dx * dx + dy * dy);
}

export function verdictForCenterScore(correct: number, total: number): string {
  const pct = correct / total;
  if (pct >= 0.9) return 'You could eyeball a centered modal blindfolded.';
  if (pct >= 0.7) return 'Good eye. The occasional 3px offset still gets you.';
  if (pct >= 0.45) return 'You center things by feel, and it shows.';
  return 'Everything looks centered to you. Nothing is centered to you.';
}
