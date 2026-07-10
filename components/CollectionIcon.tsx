import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

export type CollectionIconId = 'laws' | 'heuristics';

function content(id: CollectionIconId, color: string) {
  switch (id) {
    case 'laws':
      // a scale/balance — the classic mark of a "law"
      return (
        <>
          <Line x1={24} y1={6} x2={24} y2={38} stroke={color} strokeWidth={2.5} />
          <Line x1={10} y1={13} x2={38} y2={13} stroke={color} strokeWidth={2.5} />
          <Line x1={10} y1={13} x2={10} y2={22} stroke={color} strokeWidth={2.5} />
          <Line x1={38} y1={13} x2={38} y2={22} stroke={color} strokeWidth={2.5} />
          <Path d="M4 22 A6 7 0 0 0 16 22 Z" stroke={color} strokeWidth={2.5} fill="none" strokeLinejoin="round" />
          <Path d="M32 22 A6 7 0 0 0 44 22 Z" stroke={color} strokeWidth={2.5} fill="none" strokeLinejoin="round" />
          <Line x1={16} y1={40} x2={32} y2={40} stroke={color} strokeWidth={2.5} />
        </>
      );

    case 'heuristics':
      // a checklist — ten short, checkable rules
      return (
        <>
          <Rect x={8} y={6} width={32} height={36} rx={3} stroke={color} strokeWidth={2.5} fill="none" />
          <Path d="M15 17 L19 21 L27 12" stroke={color} strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <Line x1={31} y1={17} x2={34} y2={17} stroke={color} strokeWidth={2.5} />
          <Path d="M15 26 L19 30 L27 21" stroke={color} strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <Line x1={31} y1={26} x2={34} y2={26} stroke={color} strokeWidth={2.5} />
          <Circle cx={16.5} cy={35.5} r={1.6} fill={color} />
          <Line x1={22} y1={35.5} x2={34} y2={35.5} stroke={color} strokeWidth={2.5} opacity={0.4} />
        </>
      );
  }
}

export default function CollectionIcon({
  id,
  size = 32,
  color = '#ffffff',
}: {
  id: CollectionIconId;
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      {content(id, color)}
    </Svg>
  );
}
