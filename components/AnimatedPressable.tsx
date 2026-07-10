import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { MotiPressable } from 'moti/interactions';

export default function AnimatedPressable({
  onPress,
  disabled,
  style,
  children,
}: {
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}) {
  // MotiPressable applies `style` only to its inner animated view, not the
  // outer Pressable — so sizing props never reach the element that actually
  // needs to size itself among row/column siblings (flex-basis children,
  // percentage-width grid cells, etc). Move them to the outer exclusively:
  // leaving them on the inner too would double-apply a percentage width
  // (48% of an already-48%-shrunk outer box).
  const { flex, width, height, ...rest } = StyleSheet.flatten(style) || {};
  const hasSizing = flex !== undefined || width !== undefined || height !== undefined;
  const containerStyle = hasSizing ? { flex, width, height } : undefined;
  const innerStyle = hasSizing ? rest : style;
  return (
    <MotiPressable
      onPress={onPress}
      disabled={disabled}
      containerStyle={containerStyle}
      style={innerStyle}
      animate={({ pressed }) => {
        'worklet';
        return {
          scale: pressed ? 0.96 : 1,
          opacity: pressed ? 0.85 : 1,
        };
      }}
      transition={{ type: 'timing', duration: 120 }}
    >
      {children}
    </MotiPressable>
  );
}
