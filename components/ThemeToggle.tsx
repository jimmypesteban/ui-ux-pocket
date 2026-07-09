import { Pressable, StyleSheet } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { useTheme, useThemeMode } from '../lib/theme';

export default function ThemeToggle() {
  const theme = useTheme();
  const { mode, toggleMode } = useThemeMode();

  return (
    <Pressable onPress={toggleMode} style={styles.button} hitSlop={10}>
      {mode === 'dark' ? (
        <Svg width={20} height={20} viewBox="0 0 24 24">
          <Circle cx={12} cy={12} r={5} fill="none" stroke={theme.fg} strokeWidth={2} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <Line
              key={deg}
              x1={12 + 8 * Math.cos((deg * Math.PI) / 180)}
              y1={12 + 8 * Math.sin((deg * Math.PI) / 180)}
              x2={12 + 10.5 * Math.cos((deg * Math.PI) / 180)}
              y2={12 + 10.5 * Math.sin((deg * Math.PI) / 180)}
              stroke={theme.fg}
              strokeWidth={2}
              strokeLinecap="round"
            />
          ))}
        </Svg>
      ) : (
        <Svg width={20} height={20} viewBox="0 0 24 24">
          <Path
            d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"
            fill="none"
            stroke={theme.fg}
            strokeWidth={2}
            strokeLinejoin="round"
          />
        </Svg>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { padding: 4 },
});
