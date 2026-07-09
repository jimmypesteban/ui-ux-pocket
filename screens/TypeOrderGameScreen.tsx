import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { generateTypeOrderRound, scoreRound, TypeOrderRound, verdictForTypeOrderScore } from '../lib/typeOrderGame';
import { Theme, useTheme } from '../lib/theme';

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
  const styles = makeStyles(theme);
  const [phase, setPhase] = useState<Phase>('intro');
  const [rounds, setRounds] = useState<TypeOrderRound[]>([]);
  const [scores, setScores] = useState<number[]>([]);
  const [nextRank, setNextRank] = useState(0);
  const [flash, setFlash] = useState<{ pos: number; ok: boolean } | null>(null);
  const roundStartRef = useRef(0);

  const roundIndex = scores.length;

  useEffect(() => {
    if (phase === 'playing' && roundIndex < rounds.length) {
      roundStartRef.current = Date.now();
      setNextRank(0);
      setFlash(null);
    }
  }, [phase, roundIndex, rounds.length]);

  function startGame() {
    setRounds(Array.from({ length: ROUND_COUNT }, generateTypeOrderRound));
    setScores([]);
    setPhase('playing');
  }

  function finishRound(correct: boolean) {
    const elapsed = Date.now() - roundStartRef.current;
    const roundScore = scoreRound(elapsed, correct);
    setTimeout(() => {
      const updated = [...scores, roundScore];
      setScores(updated);
      if (updated.length >= rounds.length) {
        setPhase('results');
        onFinish(updated.reduce((a, b) => a + b, 0));
      }
    }, 350);
  }

  function handleTap(pos: number) {
    if (roundIndex >= rounds.length || flash !== null) return;
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
      <View style={[styles.container, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>‹ Back</Text>
        </Pressable>
        <Text style={styles.title}>Type Order</Text>
        <Text style={styles.body}>
          Five labels, shuffled sizes. Tap them largest to smallest, as fast as you can, {ROUND_COUNT} times.
        </Text>
        {bestScore !== null && <Text style={styles.best}>Best score: {bestScore.toFixed(0)} / {ROUND_COUNT * 10}</Text>}
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
        <Text style={styles.title}>Tap largest to smallest.</Text>

        <View style={styles.labelList}>
          {round.displayOrder.map((sizeIndex, pos) => {
            const isFlashed = flash?.pos === pos;
            return (
              <Pressable
                key={pos}
                onPress={() => handleTap(pos)}
                style={[
                  styles.labelRow,
                  isFlashed && (flash!.ok ? styles.labelCorrect : styles.labelWrong),
                ]}
              >
                <Text style={{ fontSize: round.sizes[sizeIndex], color: theme.fg, fontFamily: theme.displayFont }}>
                  Heading
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
    <View style={[styles.container, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
      <Text style={styles.eyebrow}>RESULTS</Text>
      <Text style={styles.scoreTotal}>{total} / {max}</Text>
      <Text style={styles.body}>{verdictForTypeOrderScore(total, max)}</Text>

      <View style={styles.roundList}>
        {scores.map((s, i) => (
          <View key={i} style={styles.roundRow}>
            <Text style={styles.roundLabel}>ROUND {i + 1}</Text>
            <Text style={styles.roundScore}>{s} / 10</Text>
          </View>
        ))}
      </View>

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
    labelList: { marginTop: 24, gap: 14 },
    labelRow: { borderWidth: 1, borderColor: theme.border, borderRadius: 4, padding: 14 },
    labelCorrect: { borderColor: theme.success },
    labelWrong: { borderColor: theme.danger },
    primaryButton: {
      borderWidth: 1,
      borderColor: theme.fg,
      borderRadius: 4,
      paddingVertical: 18,
      alignItems: 'center',
      marginTop: 12,
    },
    pressed: { opacity: 0.6 },
    primaryButtonText: { color: theme.fg, fontFamily: theme.monoFont, fontSize: 14, letterSpacing: 1 },
    scoreTotal: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 40, marginBottom: 12 },
    roundList: { marginTop: 28, gap: 12 },
    roundRow: { flexDirection: 'row', justifyContent: 'space-between' },
    roundLabel: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 1 },
    roundScore: { color: theme.fgDim, fontFamily: theme.monoFont, fontSize: 12 },
    doneLink: { marginTop: 16, alignItems: 'center' },
    doneLinkText: { color: theme.fgFaint, fontSize: 13, textDecorationLine: 'underline' },
  });
}
