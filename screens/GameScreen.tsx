import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { JudgmentChallenge } from '../lib/types';
import { Theme, useTheme } from '../lib/theme';
import JudgmentOption from '../components/JudgmentOption';
import AnimatedPressable from '../components/AnimatedPressable';
import { space, radius, border } from '../lib/tokens';

export default function GameScreen({
  challenge,
  onFinish,
  onBack,
}: {
  challenge: JudgmentChallenge;
  onFinish: (chosen: 'A' | 'B', wasCorrect: boolean) => void;
  onBack: () => void;
}) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const [chosen, setChosen] = useState<'A' | 'B' | null>(null);

  function choose(letter: 'A' | 'B') {
    if (chosen) return;
    setChosen(letter);
  }

  const revealed = chosen !== null;
  const wasCorrect = chosen === challenge.correct;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top + space.screenTopInset, paddingBottom: insets.bottom + space.space24 }}
    >
      <Pressable onPress={onBack}>
        <Text style={styles.back}>‹ Back</Text>
      </Pressable>

      <Text style={styles.prompt}>{challenge.prompt}</Text>

      <View style={styles.optionsRow}>
        <JudgmentOption
          spec={challenge.optionA}
          letter="A"
          onPress={() => choose('A')}
          disabled={revealed}
          isCorrect={challenge.correct === 'A'}
          isChosen={chosen === 'A'}
          revealed={revealed}
        />
        <JudgmentOption
          spec={challenge.optionB}
          letter="B"
          onPress={() => choose('B')}
          disabled={revealed}
          isCorrect={challenge.correct === 'B'}
          isChosen={chosen === 'B'}
          revealed={revealed}
        />
      </View>

      {revealed && (
        <View style={styles.feedback}>
          <Text style={[styles.verdict, wasCorrect ? styles.verdictGood : styles.verdictBad]}>
            {wasCorrect ? 'Your instincts are correct.' : 'Your instincts betrayed you.'}
          </Text>
          <Text style={styles.explanation}>{challenge.explanation}</Text>
          <AnimatedPressable
            style={styles.doneButton}
            onPress={() => chosen && onFinish(chosen, wasCorrect)}
          >
            <Text style={styles.doneButtonText}>DONE FOR TODAY</Text>
          </AnimatedPressable>
        </View>
      )}
    </ScrollView>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: space.screenPadding },
    back: { color: theme.fgDim, fontSize: 15, marginBottom: space.space24 },
    prompt: {
      color: theme.fg,
      fontFamily: theme.displayFont,
      fontSize: 24,
      lineHeight: 32,
      marginBottom: space.space24,
    },
    optionsRow: { flexDirection: 'row', gap: space.space12 },
    feedback: { marginTop: space.space32 },
    verdict: { fontFamily: theme.displayFont, fontSize: 20, marginBottom: space.space12 },
    verdictGood: { color: theme.success },
    verdictBad: { color: theme.danger },
    explanation: { color: theme.fgDim, fontSize: 15, lineHeight: 22 },
    doneButton: {
      borderWidth: border.hairline,
      borderColor: theme.fg,
      borderRadius: radius.card,
      paddingVertical: space.cardPadding,
      alignItems: 'center',
      marginTop: space.sectionGap,
    },
    doneButtonText: { color: theme.fg, fontFamily: theme.monoFont, fontSize: 13, letterSpacing: 1 },
  });
}
