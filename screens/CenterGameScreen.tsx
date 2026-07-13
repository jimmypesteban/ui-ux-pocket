import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CenterRound, generateCenterRound, offsetDistance, verdictForCenterScore } from '../lib/centerGame';
import AnimatedPressable from '../components/AnimatedPressable';
import GameIcon from '../components/GameIcon';
import { Theme, useTheme } from '../lib/theme';
import { space, radius, border } from '../lib/tokens';

const ROUND_COUNT = 8;

type Phase = 'intro' | 'playing' | 'results';

export default function CenterGameScreen({
  onFinish,
  onBack,
  bestScore,
  onFoundEgg,
}: {
  onFinish: (score: number) => void;
  onBack: () => void;
  bestScore: number | null;
  onFoundEgg?: (id: string) => void;
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
      <View style={[styles.container, { paddingTop: insets.top + space.space24, paddingBottom: insets.bottom + space.space24 }]}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>‹ Back</Text>
        </Pressable>
        <View style={styles.titleRow}>
          <GameIcon game="center" size={28} color={theme.fg} />
          <Text style={styles.title}>Dead Center</Text>
        </View>
        <Text style={styles.body}>
          A dot sits inside a shape. Sometimes it's{' '}
          <Text onPress={onFoundEgg ? () => onFoundEgg('center-typo') : undefined}>centred</Text>, sometimes it's
          off by a little. Call it, {ROUND_COUNT} times.
        </Text>
        {bestScore !== null && <Text style={styles.best}>Best score: {bestScore.toFixed(0)} / {ROUND_COUNT}</Text>}
        <AnimatedPressable style={styles.primaryButton} onPress={startGame}>
          <Text style={styles.primaryButtonText}>START</Text>
        </AnimatedPressable>
      </View>
    );
  }

  if (phase === 'playing') {
    if (roundIndex >= rounds.length) {
      return <View style={styles.container} />;
    }
    const round = rounds[roundIndex];
    return (
      <View style={[styles.container, { paddingTop: insets.top + space.space24, paddingBottom: insets.bottom + space.space24 }]}>
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
          <AnimatedPressable style={styles.answerButton} onPress={() => answer(true)}>
            <Text style={styles.answerButtonText}>CENTERED</Text>
          </AnimatedPressable>
          <AnimatedPressable style={styles.answerButton} onPress={() => answer(false)}>
            <Text style={styles.answerButtonText}>OFF-CENTER</Text>
          </AnimatedPressable>
        </View>
      </View>
    );
  }

  const correctCount = answers.filter(Boolean).length;

  return (
    <View style={[styles.container, { paddingTop: insets.top + space.space24, paddingBottom: insets.bottom + space.space24 }]}>
      <Text style={styles.eyebrow}>RESULTS</Text>
      <Text style={styles.scoreTotal}>{correctCount} / {rounds.length}</Text>
      <Text style={styles.body}>{verdictForCenterScore(correctCount, rounds.length)}</Text>

      <View style={styles.roundList}>
        {answers.map((correct, i) => {
          const round = rounds[i];
          const offset = offsetDistance(round);
          return (
            <View key={i} style={styles.roundRow}>
              <Text style={styles.roundLabel}>ROUND {i + 1} · {round.shape.toUpperCase()}</Text>
              <Text style={[styles.roundScore, correct ? styles.roundScoreGood : styles.roundScoreBad]}>
                {round.isCentered ? 'Centered' : `${offset.toFixed(1)}px off`} · {correct ? 'Correct' : 'Missed'}
              </Text>
            </View>
          );
        })}
      </View>

      <AnimatedPressable style={styles.primaryButton} onPress={startGame}>
        <Text style={styles.primaryButtonText}>PLAY AGAIN</Text>
      </AnimatedPressable>
      <Pressable onPress={onBack} style={styles.doneLink}>
        <Text style={styles.doneLinkText}>Done for now</Text>
      </Pressable>
    </View>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: space.screenPadding },
    back: { color: theme.fgDim, fontSize: 15, marginBottom: space.space24 },
    eyebrow: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 2, marginBottom: space.space8 },
    title: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 26, lineHeight: 32, marginTop: space.space8, marginBottom: space.space16 },
    titleRow: { flexDirection: 'row', alignItems: 'center', gap: space.rowGap },
    body: { color: theme.fgDim, fontSize: 15, lineHeight: 22 },
    best: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, marginTop: space.space20 },
    stage: { alignItems: 'center', justifyContent: 'center', marginTop: space.space16, marginBottom: space.space24 },
    shape: { borderWidth: 2, backgroundColor: theme.bgAlt },
    dot: { position: 'absolute', width: 10, height: 10, borderRadius: 5, backgroundColor: theme.fg },
    answerRow: { flexDirection: 'row', gap: space.space12 },
    answerButton: { flex: 1, borderWidth: border.hairline, borderColor: theme.fg, borderRadius: radius.card, paddingVertical: space.cardPadding, alignItems: 'center' },
    answerButtonText: { color: theme.fg, fontFamily: theme.monoFont, fontSize: 13, letterSpacing: 1 },
    primaryButton: {
      borderWidth: border.hairline,
      borderColor: theme.fg,
      borderRadius: radius.card,
      paddingVertical: 18,
      alignItems: 'center',
      marginTop: space.space12,
    },
    primaryButtonText: { color: theme.fg, fontFamily: theme.monoFont, fontSize: 14, letterSpacing: 1 },
    scoreTotal: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 40, marginBottom: space.space12 },
    roundList: { marginTop: space.sectionGap, gap: space.space12 },
    roundRow: { flexDirection: 'row', justifyContent: 'space-between' },
    roundLabel: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 1 },
    roundScore: { fontFamily: theme.monoFont, fontSize: 12 },
    roundScoreGood: { color: theme.success },
    roundScoreBad: { color: theme.danger },
    doneLink: { marginTop: space.space16, alignItems: 'center' },
    doneLinkText: { color: theme.fgFaint, fontSize: 13, textDecorationLine: 'underline' },
  });
}
