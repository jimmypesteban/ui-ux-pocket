import Svg, { Circle, Line, Rect } from 'react-native-svg';
import { DesignTypeId } from '../lib/types';

type BaseType = 'grid-zealot' | 'contrast-architect' | 'whitespace-purist' | 'chaos-agent';

const MICRO_TYPES: Partial<Record<DesignTypeId, BaseType>> = {
  'pixel-auditor': 'grid-zealot',
  'precision-provocateur': 'contrast-architect',
  'detail-drifter': 'whitespace-purist',
  'flourish-hunter': 'chaos-agent',
};

function baseGlyphContent(type: BaseType, color: string) {
  if (type === 'grid-zealot') {
    return (
      <>
        {[8, 20, 32].map((pos) => (
          <Line key={`v${pos}`} x1={pos} y1={6} x2={pos} y2={42} stroke={color} strokeWidth={2} />
        ))}
        {[8, 20, 32].map((pos) => (
          <Line key={`h${pos}`} x1={6} y1={pos} x2={42} y2={pos} stroke={color} strokeWidth={2} />
        ))}
      </>
    );
  }

  if (type === 'contrast-architect') {
    return (
      <>
        <Rect x={6} y={6} width={36} height={36} rx={4} fill="none" stroke={color} strokeWidth={2} />
        <Rect x={6} y={6} width={18} height={36} fill={color} />
      </>
    );
  }

  if (type === 'whitespace-purist') {
    return (
      <>
        <Rect x={6} y={6} width={36} height={36} rx={4} fill="none" stroke={color} strokeWidth={2} />
        <Circle cx={24} cy={24} r={3} fill={color} />
      </>
    );
  }

  return (
    <>
      <Line x1={8} y1={10} x2={30} y2={22} stroke={color} strokeWidth={2} />
      <Line x1={30} y1={22} x2={14} y2={30} stroke={color} strokeWidth={2} />
      <Line x1={14} y1={30} x2={40} y2={38} stroke={color} strokeWidth={2} />
      <Line x1={40} y1={38} x2={26} y2={12} stroke={color} strokeWidth={2} />
      <Circle cx={8} cy={10} r={2.5} fill={color} />
      <Circle cx={40} cy={38} r={2.5} fill={color} />
    </>
  );
}

export default function DesignTypeGlyph({
  type,
  size = 40,
  color = '#ffffff',
}: {
  type: DesignTypeId;
  size?: number;
  color?: string;
}) {
  const microBase = MICRO_TYPES[type];
  const base = microBase ?? (type as BaseType);

  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      {baseGlyphContent(base, color)}
      {microBase && <Circle cx={41} cy={7} r={4} fill={color} stroke="#000000" strokeWidth={1.5} />}
    </Svg>
  );
}
