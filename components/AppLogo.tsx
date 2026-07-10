import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Theme, useTheme } from '../lib/theme';
import { space } from '../lib/tokens';

function LogoMark({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={(size * 59) / 60} viewBox="0 0 60 59" fill="none">
      <Path
        d="M30 29.5V58M30 29.5V29.3995M30 29.5L57.4132 57.1903M30 29.5L2.30085 56.9521M30 58H5C3.95978 58 3.01229 57.6029 2.30085 56.9521M30 58H55C55.9063 58 56.7425 57.6984 57.4132 57.1903M30 29.3995V29.1271M30 29.3995L29.865 29.2627M30 29.3995L57.4132 57.1903M30 29.1271V1M30 29.1271L57.2913 1.71614C57.9207 1.08405 59 1.52974 59 2.4217V54C59 55.3027 58.3773 56.46 57.4132 57.1903M30 29.1271L29.865 29.2627M30 1H14.7966M30 1H44.2203M29.865 29.2627L2.71193 1.73551C2.08397 1.0989 1 1.54356 1 2.43776V54C1 55.1678 1.50044 56.2187 2.29857 56.95M29.865 29.2627L2.29857 56.95M57.4132 57.1903L57.5 57.2783M2.29857 56.95L1.97169 57.2783L2.30085 56.9521M2.29857 56.95L2.30085 56.9521"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function AppLogo({ size = 16 }: { size?: number }) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.row}>
      <LogoMark size={size} color={theme.fg} />
      <Text style={styles.wordmark}>UI/UX Pocket</Text>
    </View>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: space.space8 },
    wordmark: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 12 },
  });
}
