import { StyleProp, ViewStyle } from 'react-native';
import { MotiView } from 'moti';

export default function AnimatedBar({ pct, style }: { pct: number; style?: StyleProp<ViewStyle> }) {
  return (
    <MotiView
      style={style}
      from={{ width: '0%' }}
      animate={{ width: `${pct}%` }}
      transition={{ type: 'timing', duration: 600 }}
    />
  );
}
