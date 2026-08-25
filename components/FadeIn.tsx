import { ReactNode, useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

// Moti's enter animations don't fire in the production web build: the view is
// left sitting at its `from` value forever, so a `from: { opacity: 0 }` wrapper
// renders the entire screen invisible while the DOM underneath is fully
// populated. Plain Animated is predictable here — the same reason
// DigitalRainLoader avoids Moti.
export default function FadeIn({
  children,
  style,
  duration = 160,
}: {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  duration?: number;
}) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    });
    animation.start();
    // requestAnimationFrame is suspended while the tab is hidden, so a fade
    // started in a backgrounded tab can sit at 0 and leave the screen blank.
    // setTimeout still fires (throttled, and immediately on return), so use it
    // to guarantee the end state no matter what the animation did.
    const safety = setTimeout(() => opacity.setValue(1), duration + 400);
    return () => {
      animation.stop();
      clearTimeout(safety);
    };
  }, [opacity, duration]);

  return <Animated.View style={[style, { opacity }]}>{children}</Animated.View>;
}
