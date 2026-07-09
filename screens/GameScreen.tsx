import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { JudgmentChallenge } from '../lib/types';
import { Theme, useTheme } from '../lib/theme';
import JudgmentOption from '../components/JudgmentOption';

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
  const styles = makeStyles(theme);
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
      contentContainerStyle={{ paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }}
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
          <Pressable
            style={({ pressed }) => [styles.doneButton, pressed && styles.doneButtonPressed]}
            onPress={() => chosen && onFinish(chosen, wasCorrect)}
          >
            <Text style={styles.doneButtonText}>DONE FOR TODAY</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 24 },
    back: { color: theme.fgDim, fontSize: 15, marginBottom: 24 },
    prompt: {
      color: theme.fg,
      fontFamily: theme.displayFont,
      fontSize: 24,
      lineHeight: 32,
      marginBottom: 24,
    },
    optionsRow: { flexDirection: 'row', gap: 12 },
    feedback: { marginTop: 32 },
    verdict: { fontFamily: theme.displayFont, fontSize: 20, marginBottom: 12 },
    verdictGood: { color: theme.success },
    verdictBad: { color: theme.danger },
    explanation: { color: theme.fgDim, fontSize: 15, lineHeight: 22 },
    doneButton: {
      borderWidth: 1,
      borderColor: theme.fg,
      borderRadius: 4,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 28,
    },
    doneButtonPressed: { opacity: 0.6 },
    doneButtonText: { color: theme.fg, fontFamily: theme.monoFont, fontSize: 13, letterSpacing: 1 },
  });
}
