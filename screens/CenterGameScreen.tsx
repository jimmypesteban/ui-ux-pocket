import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CenterRound, generateCenterRound, verdictForCenterScore } from '../lib/centerGame';
import { Theme, useTheme } from '../lib/theme';

const ROUND_COUNT = 8;

type Phase = 'intro' | 'playing' | 'results';

export default function CenterGameScreen({
  onFinish,
  onBack,
  bestScore,
}: {
  onFinish: (score: number) => void;
  onBack: () => void;
  bestScore: number | null;
}) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [phase, setPhase] = useState<Phase>('intro');
  const [rounds, setRounds] = useState<CenterRound[]>([]);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [feedback, setFeedback] = useState<boolean | null>(null);

  const roundIndex = answers.length;

  function startGame() {
    setRounds(Array.from({ length: ROUND_COUNT }, generateCenterRound));
    setAnswers([]);
    setFeedback(null);
    setPhase('playing');
  }

  function answer(guessCentered: boolean) {
    if (roundIndex >= rounds.length || feedback !== null) return;
    const correct = guessCentered === rounds[roundIndex].isCentered;
    setFeedback(correct);
    setTimeout(() => {
      const updated = [...answers, correct];
      setAnswers(updated);
      setFeedback(null);
      if (updated.length >= rounds.length) {
        setPhase('results');
        onFinish(updated.filter(Boolean).length);
      }
    }, 350);
  }

  if (phase === 'intro') {
    return (
      <View style={[styles.container, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>‹ Back</Text>
        </Pressable>
        <Text style={styles.title}>Dead Center</Text>
        <Text style={styles.body}>
          A dot sits inside a shape. Sometimes it's centered, sometimes it's off by a little. Call it,
          {' '}{ROUND_COUNT} times.
        </Text>
        {bestScore !== null && <Text style={styles.best}>Best score: {bestScore.toFixed(0)} / {ROUND_COUNT}</Text>}
        <Pressable style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]} onPress={startGame}>
          <Text style={styles.primaryButtonText}>START</Text>
        </Pressable>
      </View>
    );
  }

  if (phase === 'playing') {
    if (roundIndex >= rounds.length) {
      return <View style={styles.container} />;
    }
    const round = rounds[roundIndex];
    return (
      <View style={[styles.container, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>✕ Exit</Text>
        </Pressable>
        <Text style={styles.eyebrow}>ROUND {roundIndex + 1} / {rounds.length}</Text>
        <Text style={styles.title}>Is the dot centered?</Text>

        <View style={styles.stage}>
          <View
            style={[
              styles.shape,
              {
                width: round.boxWidth,
                height: round.boxHeight,
                borderRadius: round.shape === 'circle' ? round.boxWidth / 2 : 8,
                borderColor: feedback === null ? theme.border : feedback ? theme.success : theme.danger,
              },
            ]}
          >
            <View style={[styles.dot, { left: round.dotX - 5, top: round.dotY - 5 }]} />
          </View>
        </View>

        <View style={styles.answerRow}>
          <Pressable
            style={({ pressed }) => [styles.answerButton, pressed && styles.pressed]}
            onPress={() => answer(true)}
          >
            <Text style={styles.answerButtonText}>CENTERED</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.answerButton, pressed && styles.pressed]}
            onPress={() => answer(false)}
          >
            <Text style={styles.answerButtonText}>OFF-CENTER</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const correctCount = answers.filter(Boolean).length;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
      <Text style={styles.eyebrow}>RESULTS</Text>
      <Text style={styles.scoreTotal}>{correctCount} / {rounds.length}</Text>
      <Text style={styles.body}>{verdictForCenterScore(correctCount, rounds.length)}</Text>

      <Pressable style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]} onPress={startGame}>
        <Text style={styles.primaryButtonText}>PLAY AGAIN</Text>
      </Pressable>
      <Pressable onPress={onBack} style={styles.doneLink}>
        <Text style={styles.doneLinkText}>Done for now</Text>
      </Pressable>
    </View>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 24 },
    back: { color: theme.fgDim, fontSize: 15, marginBottom: 24 },
    eyebrow: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 2, marginBottom: 8 },
    title: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 26, lineHeight: 32, marginTop: 8, marginBottom: 16 },
    body: { color: theme.fgDim, fontSize: 15, lineHeight: 22 },
    best: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, marginTop: 20 },
    stage: { alignItems: 'center', justifyContent: 'center', marginTop: 16, marginBottom: 24 },
    shape: { borderWidth: 2, backgroundColor: theme.bgAlt },
    dot: { position: 'absolute', width: 10, height: 10, borderRadius: 5, backgroundColor: theme.fg },
    answerRow: { flexDirection: 'row', gap: 12 },
    answerButton: { flex: 1, borderWidth: 1, borderColor: theme.fg, borderRadius: 4, paddingVertical: 16, alignItems: 'center' },
    pressed: { opacity: 0.6 },
    answerButtonText: { color: theme.fg, fontFamily: theme.monoFont, fontSize: 13, letterSpacing: 1 },
    primaryButton: {
      borderWidth: 1,
      borderColor: theme.fg,
      borderRadius: 4,
      paddingVertical: 18,
      alignItems: 'center',
      marginTop: 12,
    },
    primaryButtonText: { color: theme.fg, fontFamily: theme.monoFont, fontSize: 14, letterSpacing: 1 },
    scoreTotal: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 40, marginBottom: 12 },
    doneLink: { marginTop: 16, alignItems: 'center' },
    doneLinkText: { color: theme.fgFaint, fontSize: 13, textDecorationLine: 'underline' },
  });
}
