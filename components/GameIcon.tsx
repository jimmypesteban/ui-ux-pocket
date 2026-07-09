import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';
import { GameId } from '../lib/types';

export type { GameId };

export default function GameIcon({
  game,
  size = 24,
  color = '#ffffff',
}: {
  game: GameId;
  size?: number;
  color?: string;
}) {
  if (game === 'judgment') {
    return (
      <Svg width={size} height={size} viewBox="0 0 48 48">
        <Rect x={5} y={12} width={16} height={24} rx={3} fill="none" stroke={color} strokeWidth={2} />
        <Rect x={27} y={12} width={16} height={24} rx={3} fill={color} />
      </Svg>
    );
  }

  if (game === 'color') {
    return (
      <Svg width={size} height={size} viewBox="0 0 48 48">
        <Rect x={8} y={16} width={22} height={22} rx={4} fill="none" stroke={color} strokeWidth={2} />
        <Rect x={18} y={8} width={22} height={22} rx={4} fill={color} />
      </Svg>
    );
  }

  if (game === 'contrast') {
    return (
      <Svg width={size} height={size} viewBox="0 0 48 48">
        <Circle cx={24} cy={24} r={18} fill="none" stroke={color} strokeWidth={2} />
        <Path d="M24 6 A18 18 0 0 1 24 42 Z" fill={color} />
      </Svg>
    );
  }

  if (game === 'alignment') {
    return (
      <Svg width={size} height={size} viewBox="0 0 48 48">
        <Rect x={6} y={6} width={16} height={16} rx={3} fill={color} />
        <Rect x={26} y={6} width={16} height={16} rx={3} fill={color} />
        <Rect x={6} y={26} width={16} height={16} rx={3} fill={color} />
      </Svg>
    );
  }

  if (game === 'kerning') {
    return (
      <Svg width={size} height={size} viewBox="0 0 48 48">
        <Rect x={6} y={8} width={10} height={32} fill={color} />
        <Rect x={32} y={8} width={10} height={32} fill={color} />
        <Line x1={19} y1={24} x2={29} y2={24} stroke={color} strokeWidth={2} />
        <Path d="M22 20 L18 24 L22 28" stroke={color} strokeWidth={2} fill="none" />
        <Path d="M26 20 L30 24 L26 28" stroke={color} strokeWidth={2} fill="none" />
      </Svg>
    );
  }

  if (game === 'pixelmatch') {
    return (
      <Svg width={size} height={size} viewBox="0 0 48 48">
        <Rect x={6} y={6} width={36} height={36} rx={2} fill="none" stroke={color} strokeWidth={2} strokeDasharray="4,4" />
        <Rect x={16} y={16} width={16} height={16} rx={2} fill={color} />
      </Svg>
    );
  }

  if (game === 'center') {
    return (
      <Svg width={size} height={size} viewBox="0 0 48 48">
        <Rect x={6} y={6} width={36} height={36} rx={4} fill="none" stroke={color} strokeWidth={2} />
        <Line x1={24} y1={6} x2={24} y2={14} stroke={color} strokeWidth={2} />
        <Line x1={24} y1={34} x2={24} y2={42} stroke={color} strokeWidth={2} />
        <Line x1={6} y1={24} x2={14} y2={24} stroke={color} strokeWidth={2} />
        <Line x1={34} y1={24} x2={42} y2={24} stroke={color} strokeWidth={2} />
        <Circle cx={24} cy={24} r={3.5} fill={color} />
      </Svg>
    );
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Rect x={8} y={8} width={32} height={6} rx={1} fill={color} />
      <Rect x={8} y={21} width={22} height={5} rx={1} fill={color} />
      <Rect x={8} y={33} width={13} height={4} rx={1} fill={color} />
    </Svg>
  );
}
