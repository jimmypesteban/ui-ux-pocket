import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Theme, useTheme } from '../lib/theme';
import { space } from '../lib/tokens';

export function LogoMark({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path
        d="M11 11V21M11 11V10.9647M11 11L20.4528 20.7159M11 11L1.44857 20.6323M11 21H2.37931C2.02061 21 1.69389 20.8607 1.44857 20.6323M11 21H19.6207C19.9332 21 20.2215 20.8942 20.4528 20.7159M11 10.9647V10.8692M11 10.9647L10.9535 10.9167M11 10.9647L20.4528 20.7159M11 10.8692V1M11 10.8692L20.4108 1.25128C20.6278 1.02949 21 1.18587 21 1.49884V19.5965C21 20.0536 20.7853 20.4596 20.4528 20.7159M11 10.8692L10.9535 10.9167M11 1H6.75745M11 1H14.9036M10.9535 10.9167L1.59032 1.25807C1.37378 1.0347 1 1.19072 1 1.50448V19.5965C1 20.0062 1.17257 20.375 1.44778 20.6316M10.9535 10.9167L1.44778 20.6316M20.4528 20.7159L20.4828 20.7468M1.44778 20.6316L1.33506 20.7468L1.44857 20.6323M1.44778 20.6316L1.44857 20.6323"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default function AppLogo({
  size = 16,
  onFoundEgg,
}: {
  size?: number;
  onFoundEgg?: (id: string) => void;
}) {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  return (
    <View style={styles.row}>
      <LogoMark size={size} color={theme.fg} />
      <Text style={styles.wordmark}>
        UI
        <Text style={styles.slash} onPress={onFoundEgg ? () => onFoundEgg('wordmark-slash') : undefined}>
          /
        </Text>
        UX Pocket
      </Text>
    </View>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: space.space8 },
    wordmark: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 12 },
    slash: { color: theme.fgDim },
  });
}
