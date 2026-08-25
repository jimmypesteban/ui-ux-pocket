import { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { generateTypeOrderRound, scoreRound, TypeOrderRound, verdictForTypeOrderScore } from '../lib/typeOrderGame';
import AnimatedPressable from '../components/AnimatedPressable';
import GameIcon from '../components/GameIcon';
import { Theme, useTheme } from '../lib/theme';
import { space, radius, border } from '../lib/tokens';

const ROUND_COUNT = 5;

type Phase = 'intro' | 'playing' | 'results';

export default function TypeOrderGameScreen({
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
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const [phase, setPhase] = useState<Phase>('intro');
  const [rounds, setRounds] = useState<TypeOrderRound[]>([]);
  const [scores, setScores] = useState<number[]>([]);
  const [details, setDetails] = useState<{ correct: boolean; elapsedMs: number }[]>([]);
  const [nextRank, setNextRank] = useState(0);
  const [flash, setFlash] = useState<{ pos: number; ok: boolean } | null>(null);
  const [answeredPositions, setAnsweredPositions] = useState<number[]>([]);
  const roundStartRef = useRef(0);

  const roundIndex = scores.length;

  useEffect(() => {
    if (phase === 'playing' && roundIndex < rounds.length) {
      roundStartRef.current = Date.now();
      setNextRank(0);
      setFlash(null);
      setAnsweredPositions([]);
    }
  }, [phase, roundIndex, rounds.length]);

  function startGame() {
    setRounds(Array.from({ length: ROUND_COUNT }, generateTypeOrderRound));
    setScores([]);
    setDetails([]);
    setPhase('playing');
  }

  function finishRound(correct: boolean) {
    const elapsed = Date.now() - roundStartRef.current;
    const roundScore = scoreRound(elapsed, correct);
    setTimeout(() => {
      const updated = [...scores, roundScore];
      setScores(updated);
      setDetails((d) => [...d, { correct, elapsedMs: elapsed }]);
      if (updated.length >= rounds.length) {
        setPhase('results');
        onFinish(updated.reduce((a, b) => a + b, 0));
      }
    }, 350);
  }

  function handleTap(pos: number) {
    if (roundIndex >= rounds.length || flash !== null || answeredPositions.includes(pos)) return;
    const round = rounds[roundIndex];
    const sizeIndex = round.displayOrder[pos];
    const sortedDesc = [...round.sizes.keys()].sort((a, b) => round.sizes[b] - round.sizes[a]);
    const expectedIndex = sortedDesc[nextRank];
    const correct = sizeIndex === expectedIndex;
    setFlash({ pos, ok: correct });
    if (!correct) {
      finishRound(false);
      return;
    }
    setAnsweredPositions((prev) => [...prev, pos]);
    if (nextRank + 1 >= round.sizes.length) {
      finishRound(true);
    } else {
      setTimeout(() => {
        setNextRank((r) => r + 1);
        setFlash(null);
      }, 200);
    }
  }

  if (phase === 'intro') {
    return (
      <View style={[styles.container, { paddingTop: insets.top + space.space24, paddingBottom: insets.bottom + space.space24 }]}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>‹ Back</Text>
        </Pressable>
        <View style={styles.titleRow}>
          <GameIcon game="typeorder" size={28} color={theme.fg} />
          <Text style={styles.title}>Type Order</Text>
        </View>
        <Text style={styles.body}>
          Five labels, shuffled sizes. Tap them largest to smallest, as fast as you can, {ROUND_COUNT} times.
        </Text>
        {bestScore !== null && <Text style={styles.best}>Best score: {bestScore.toFixed(0)} / {ROUND_COUNT * 10}</Text>}
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
        <Text style={styles.title}>Tap largest to smallest.</Text>

        <View style={styles.labelList}>
          {round.displayOrder.map((sizeIndex, pos) => {
            const isFlashed = flash?.pos === pos;
            const isAnswered = answeredPositions.includes(pos);
            return (
              <Pressable
                key={pos}
                onPress={() => handleTap(pos)}
                disabled={isAnswered}
                style={[
                  styles.labelRow,
                  isAnswered && styles.labelCorrect,
                  isFlashed && !flash!.ok && styles.labelWrong,
                ]}
              >
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{ fontSize: round.sizes[sizeIndex], color: theme.fg, fontFamily: theme.displayFont }}
                >
                  {round.labels[sizeIndex]}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  }

  const total = scores.reduce((a, b) => a + b, 0);
  const max = rounds.length * 10;

  return (
    <View style={[styles.container, { paddingTop: insets.top + space.space24, paddingBottom: insets.bottom + space.space24 }]}>
      <Text style={styles.eyebrow}>RESULTS</Text>
      <Text style={styles.scoreTotal}>{total} / {max}</Text>
      <Text style={styles.body}>{verdictForTypeOrderScore(total, max)}</Text>
      <Text style={styles.scoreExplainer}>
        Each round is a speed score, not partial credit: a wrong tap ends the round at 0, and any correct
        round scores at least 3 — up to 10 for ranking all five in under 0.7s, losing a point for every
        extra 0.7s after that.
      </Text>

      <View style={styles.roundList}>
        {scores.map((s, i) => (
          <View key={i} style={styles.roundRow}>
            <Text style={styles.roundLabel}>
              ROUND {i + 1} · {details[i]?.correct ? `${(details[i].elapsedMs / 1000).toFixed(1)}s` : 'missed'}
            </Text>
            <Text style={styles.roundScore}>{s} / 10</Text>
          </View>
        ))}
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
    labelList: { marginTop: space.space24, gap: space.space14 },
    labelRow: { borderWidth: border.hairline, borderColor: theme.border, borderRadius: radius.card, padding: space.space14 },
    labelCorrect: { borderColor: theme.success, backgroundColor: theme.success + '1a' },
    labelWrong: { borderColor: theme.danger },
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
    scoreExplainer: { color: theme.fgFaint, fontSize: 13, lineHeight: 19, marginTop: space.space16 },
    roundList: { marginTop: space.sectionGap, gap: space.space12 },
    roundRow: { flexDirection: 'row', justifyContent: 'space-between' },
    roundLabel: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 1 },
    roundScore: { color: theme.fgDim, fontFamily: theme.monoFont, fontSize: 12 },
    doneLink: { marginTop: space.space16, alignItems: 'center' },
    doneLinkText: { color: theme.fgFaint, fontSize: 13, textDecorationLine: 'underline' },
  });
}
