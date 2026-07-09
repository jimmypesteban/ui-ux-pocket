import Svg, { Rect } from 'react-native-svg';
import { hashString } from '../lib/iconHash';

const COLS = 5;
const ROWS = 5;
const HALF = Math.ceil(COLS / 2);

export default function LawIcon({
  id,
  size = 36,
  color = '#ffffff',
}: {
  id: string;
  size?: number;
  color?: string;
}) {
  const hash = hashString(id);
  const cell = 48 / COLS;
  const cells: { x: number; y: number }[] = [];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < HALF; col++) {
      const bitIndex = row * HALF + col;
      const on = ((hash >> bitIndex % 30) & 1) === 1;
      if (!on) continue;
      cells.push({ x: col, y: row });
      const mirrorCol = COLS - 1 - col;
      if (mirrorCol !== col) cells.push({ x: mirrorCol, y: row });
    }
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      {cells.map((c, i) => (
        <Rect key={i} x={c.x * cell} y={c.y * cell} width={cell} height={cell} fill={color} />
      ))}
    </Svg>
  );
}
