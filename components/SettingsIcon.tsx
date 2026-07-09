import Svg, { Circle, Line } from 'react-native-svg';

export default function SettingsIcon({ size = 20, color = '#ffffff' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Line x1={3} y1={7} x2={21} y2={7} stroke={color} strokeWidth={2} />
      <Circle cx={15} cy={7} r={2.5} fill="none" stroke={color} strokeWidth={2} />
      <Line x1={3} y1={13} x2={21} y2={13} stroke={color} strokeWidth={2} />
      <Circle cx={9} cy={13} r={2.5} fill="none" stroke={color} strokeWidth={2} />
      <Line x1={3} y1={19} x2={21} y2={19} stroke={color} strokeWidth={2} />
      <Circle cx={17} cy={19} r={2.5} fill="none" stroke={color} strokeWidth={2} />
    </Svg>
  );
}
