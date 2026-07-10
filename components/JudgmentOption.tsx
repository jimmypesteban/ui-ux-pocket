import { StyleSheet, Text, View } from 'react-native';
import AnimatedPressable from './AnimatedPressable';
import { OptionSpec } from '../lib/types';
import { Theme, useTheme } from '../lib/theme';
import { space, radius, border } from '../lib/tokens';

export default function JudgmentOption({
  spec,
  letter,
  onPress,
  disabled,
  isCorrect,
  isChosen,
  revealed,
}: {
  spec: OptionSpec;
  letter: 'A' | 'B';
  onPress: () => void;
  disabled: boolean;
  isCorrect: boolean;
  isChosen: boolean;
  revealed: boolean;
}) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.frame,
        revealed && isCorrect && styles.frameCorrect,
        revealed && isChosen && !isCorrect && styles.frameWrong,
      ]}
    >
      <Text style={styles.letter}>{letter}</Text>
      <View style={styles.mockStage}>
        <View
          style={{
            paddingHorizontal: spec.padding,
            paddingVertical: spec.padding * 0.6,
            backgroundColor: spec.bgColor,
            alignItems: spec.align,
            width: '100%',
          }}
        >
          <Text style={{ color: spec.fgColor, fontSize: spec.fontSize, fontWeight: '600' }}>{spec.label}</Text>
        </View>
      </View>
      {revealed && isCorrect && <Text style={styles.badge}>CORRECT</Text>}
      {revealed && isChosen && !isCorrect && <Text style={styles.badgeWrong}>YOUR PICK</Text>}
    </AnimatedPressable>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    frame: {
      flex: 1,
      borderWidth: border.hairline,
      borderColor: theme.border,
      borderRadius: radius.card,
      padding: space.space12,
      gap: space.space10,
    },
    frameCorrect: { borderColor: theme.success },
    frameWrong: { borderColor: theme.danger },
    letter: { color: theme.fgDim, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 1 },
    mockStage: {
      backgroundColor: theme.bgAlt,
      borderRadius: radius.chip,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 70,
    },
    badge: { color: theme.success, fontFamily: theme.monoFont, fontSize: 11, letterSpacing: 1 },
    badgeWrong: { color: theme.danger, fontFamily: theme.monoFont, fontSize: 11, letterSpacing: 1 },
  });
}
