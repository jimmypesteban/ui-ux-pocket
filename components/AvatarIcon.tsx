import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';
import { AvatarId } from '../lib/avatars';

export default function AvatarIcon({
  id,
  size = 48,
  color = '#ffffff',
  bg = 'transparent',
}: {
  id: AvatarId;
  size?: number;
  color?: string;
  bg?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Circle cx={24} cy={24} r={22.5} fill={bg} stroke={color} strokeWidth={1.5} />
      {id === 'circle' && <Circle cx={24} cy={24} r={10} fill={color} />}
      {id === 'ring' && <Circle cx={24} cy={24} r={10} fill="none" stroke={color} strokeWidth={3.5} />}
      {id === 'triangle' && <Path d="M24 13 L34 33 L14 33 Z" fill={color} />}
      {id === 'diamond' && (
        <Rect x={16.5} y={16.5} width={15} height={15} fill={color} transform="rotate(45 24 24)" />
      )}
      {id === 'duo' && (
        <>
          <Circle cx={19} cy={24} r={8} fill="none" stroke={color} strokeWidth={2} />
          <Circle cx={29} cy={24} r={8} fill={color} />
        </>
      )}
      {id === 'crescent' && (
        <Path
          d="M30 12A13 13 0 1 0 30 36A10.5 10.5 0 0 1 30 12Z"
          fill={color}
        />
      )}
      {id === 'cross' && (
        <>
          <Line x1={24} y1={13} x2={24} y2={35} stroke={color} strokeWidth={3.5} />
          <Line x1={13} y1={24} x2={35} y2={24} stroke={color} strokeWidth={3.5} />
        </>
      )}
      {id === 'stripes' && (
        <>
          <Line x1={14} y1={30} x2={22} y2={14} stroke={color} strokeWidth={3} />
          <Line x1={22} y1={34} x2={30} y2={18} stroke={color} strokeWidth={3} />
          <Line x1={30} y1={34} x2={34} y2={26} stroke={color} strokeWidth={3} />
        </>
      )}
    </Svg>
  );
}
