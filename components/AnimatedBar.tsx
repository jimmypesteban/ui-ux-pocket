import { useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

// Uses Animated rather than Moti for the same reason as FadeIn: Moti's `from`
// value never animates away in the production web build, which left every bar
// stuck at 0% width.
export default function AnimatedBar({ pct, style }: { pct: number; style?: StyleProp<ViewStyle> }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: pct,
      duration: 600,
      useNativeDriver: false, // width can't be driven natively
    });
    animation.start();
    // See FadeIn: rAF is suspended in a hidden tab, which would otherwise leave
    // the bar parked at 0 width.
    const safety = setTimeout(() => progress.setValue(pct), 1000);
    return () => {
      animation.stop();
      clearTimeout(safety);
    };
  }, [progress, pct]);

  const width = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return <Animated.View style={[style, { width }]} />;
}
