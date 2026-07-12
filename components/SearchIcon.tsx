import Svg, { Circle, Line } from 'react-native-svg';

export default function SearchIcon({ size = 22, color = '#ffffff' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Circle cx={9.5} cy={9.5} r={7.5} stroke={color} strokeWidth={2} />
      <Line x1={15} y1={15} x2={20.5} y2={20.5} stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
