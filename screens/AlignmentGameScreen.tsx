import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AlignmentRound, generateAlignmentRound, scoreRound, verdictForAlignmentScore } from '../lib/alignmentGame';
import { Theme, useTheme } from '../lib/theme';

const ROUND_COUNT = 5;
const BOX_SIZE = 72;

type Phase = 'intro' | 'playing' | 'results';

export default function AlignmentGameScreen({
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
  const [rounds, setRounds] = useState<AlignmentRound[]>([]);
  const [scores, setScores] = useState<number[]>([]);
  const [flashIndex, setFlashIndex] = useState<number | null>(null);
  const roundStartRef = useRef(0);

  const roundIndex = scores.length;

  useEffect(() => {
    if (phase === 'playing' && roundIndex < rounds.length) {
      roundStartRef.current = Date.now();
      setFlashIndex(null);
    }
  }, [phase, roundIndex, rounds.length]);

  function startGame() {
    setRounds(Array.from({ length: ROUND_COUNT }, generateAlignmentRound));
    setScores([]);
    setPhase('playing');
  }

  function handleTap(index: number) {
    if (roundIndex >= rounds.length || flashIndex !== null) return;
    const round = rounds[roundIndex];
    const correct = index === round.oddIndex;
    const elapsed = Date.now() - roundStartRef.current;
    const roundScore = scoreRound(elapsed, correct);
    setFlashIndex(index);
    setTimeout(() => {
      const updated = [...scores, roundScore];
      setScores(updated);
      if (updated.length >= rounds.length) {
        setPhase('results');
        onFinish(updated.reduce((a, b) => a + b, 0));
      }
    }, 350);
  }

  if (phase === 'intro') {
    return (
      <View style={[styles.container, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>‹ Back</Text>
        </Pressable>
        <Text style={styles.title}>Spot the Odd One</Text>
        <Text style={styles.body}>
          Six elements, one is off. Tap it as fast as you can. {ROUND_COUNT} rounds. Speed and accuracy
          both count.
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
        <Text style={styles.title}>Which one is off?</Text>

        <View style={styles.grid}>
          {Array.from({ length: round.itemCount }, (_, i) => {
            const isOdd = i === round.oddIndex;
            const boxStyle: any = { width: BOX_SIZE, height: BOX_SIZE, backgroundColor: theme.fg };
            if (isOdd) {
              if (round.oddity === 'offset') boxStyle.transform = [{ translateY: round.magnitude }];
              if (round.oddity === 'size') {
                boxStyle.width = BOX_SIZE - round.magnitude;
                boxStyle.height = BOX_SIZE - round.magnitude;
              }
              if (round.oddity === 'shade') boxStyle.opacity = 1 - round.magnitude;
            }
            const isFlashed = flashIndex === i;
            return (
              <Pressable key={i} onPress={() => handleTap(i)} style={styles.cell}>
                <View
                  style={[
                    styles.box,
                    boxStyle,
                    isFlashed && (isOdd ? styles.boxCorrect : styles.boxWrong),
                  ]}
                />
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
      <Text style={styles.body}>{verdictForAlignmentScore(total, max)}</Text>

      <View style={styles.roundList}>
        {scores.map((s, i) => (
          <View key={i} style={styles.roundRow}>
            <Text style={styles.roundLabel}>ROUND {i + 1} · {rounds[i].oddity.toUpperCase()}</Text>
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
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 24,
      rowGap: 24,
    },
    cell: { width: '31%', alignItems: 'center', justifyContent: 'center', height: 100 },
    box: { borderRadius: 4 },
    boxCorrect: { borderWidth: 2, borderColor: theme.success },
    boxWrong: { borderWidth: 2, borderColor: theme.danger },
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
