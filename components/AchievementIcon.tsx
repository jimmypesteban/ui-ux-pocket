import Svg, { Circle, Line, Path } from 'react-native-svg';
import GameIcon from './GameIcon';
import { AchievementIcon as AchievementIconType } from '../lib/achievements';

export default function AchievementIcon({
  icon,
  size = 22,
  color = '#ffffff',
}: {
  icon: AchievementIconType;
  size?: number;
  color?: string;
}) {
  if (icon.kind === 'game') {
    return <GameIcon game={icon.game} size={size} color={color} />;
  }

  if (icon.kind === 'flame') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 2C12 2 6 8.5 6 13.5A6 6 0 0 0 18 13.5C18 11.5 17 10.5 17 10.5C17 10.5 17 12.5 15 12.5C13.2 12.5 12.7 10.7 13.8 9C15 7.2 12 2 12 2Z"
          stroke={color}
          strokeWidth={1.6}
          fill="none"
          strokeLinejoin="round"
        />
      </Svg>
    );
  }

  if (icon.kind === 'trophy') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M7 4H17V8A5 5 0 0 1 7 8V4Z" stroke={color} strokeWidth={1.6} fill="none" />
        <Path d="M7 5H4V7A3 3 0 0 0 7 10" stroke={color} strokeWidth={1.6} fill="none" strokeLinecap="round" />
        <Path d="M17 5H20V7A3 3 0 0 1 17 10" stroke={color} strokeWidth={1.6} fill="none" strokeLinecap="round" />
        <Line x1={12} y1={13} x2={12} y2={18} stroke={color} strokeWidth={1.6} />
        <Path d="M9 18H15L16 20H8L9 18Z" stroke={color} strokeWidth={1.6} fill="none" strokeLinejoin="round" />
      </Svg>
    );
  }

  if (icon.kind === 'clock') {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.6} fill="none" />
        <Line x1={12} y1={12} x2={12} y2={7} stroke={color} strokeWidth={1.6} strokeLinecap="round" />
        <Line x1={12} y1={12} x2={15.5} y2={14} stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      </Svg>
    );
  }

  // eye — fits the "sharp eye" secret theme
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M2 12C2 12 6 5 12 5S22 12 22 12 18 19 12 19 2 12 2 12Z" stroke={color} strokeWidth={1.6} fill="none" strokeLinejoin="round" />
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={1.6} fill="none" />
    </Svg>
  );
}
