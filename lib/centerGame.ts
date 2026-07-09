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

export function generateCenterRound(): CenterRound {
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  const boxWidth = shape === 'rectangle' ? 220 : 160;
  const boxHeight = shape === 'rectangle' ? 120 : 160;
  const isCentered = Math.random() < 0.4;
  const maxOffsetX = boxWidth * 0.22;
  const maxOffsetY = boxHeight * 0.22;
  const offsetX = isCentered ? 0 : (Math.random() < 0.5 ? -1 : 1) * (boxWidth * 0.06 + Math.random() * maxOffsetX);
  const offsetY = isCentered ? 0 : (Math.random() < 0.5 ? -1 : 1) * (boxHeight * 0.06 + Math.random() * maxOffsetY);
  return {
    shape,
    boxWidth,
    boxHeight,
    dotX: boxWidth / 2 + offsetX,
    dotY: boxHeight / 2 + offsetY,
    isCentered,
  };
}

export function verdictForCenterScore(correct: number, total: number): string {
  const pct = correct / total;
  if (pct >= 0.9) return 'You could eyeball a centered modal blindfolded.';
  if (pct >= 0.7) return 'Good eye. The occasional 3px offset still gets you.';
  if (pct >= 0.45) return 'You center things by feel, and it shows.';
  return 'Everything looks centered to you. Nothing is centered to you.';
}
