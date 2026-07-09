import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ColorSlider from '../components/ColorSlider';
import {
  generatePixelMatchRound,
  PixelMatchRound,
  scorePixelMatch,
  verdictForPixelMatchScore,
} from '../lib/pixelMatchGame';
import { Theme, useTheme } from '../lib/theme';

const ROUND_COUNT = 5;

type Phase = 'intro' | 'playing' | 'results';

export default function PixelMatchGameScreen({
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
  const [rounds, setRounds] = useState<PixelMatchRound[]>([]);
  const [width, setWidth] = useState(150);
  const [height, setHeight] = useState(100);
  const [scores, setScores] = useState<number[]>([]);

  const roundIndex = scores.length;

  function startGame() {
    setRounds(Array.from({ length: ROUND_COUNT }, generatePixelMatchRound));
    setWidth(150);
    setHeight(100);
    setScores([]);
    setPhase('playing');
  }

  function lockInGuess() {
    if (roundIndex >= rounds.length) return;
    const roundScore = scorePixelMatch(rounds[roundIndex], width, height);
    const updated = [...scores, roundScore];
    setScores(updated);
    if (updated.length >= rounds.length) {
      setPhase('results');
      onFinish(updated.reduce((a, b) => a + b, 0));
    } else {
      setWidth(150);
      setHeight(100);
    }
  }

  if (phase === 'intro') {
    return (
      <View style={[styles.container, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>‹ Back</Text>
        </Pressable>
        <Text style={styles.title}>Pixel Match</Text>
        <Text style={styles.body}>
          You get a target width and height. Draw a box that matches, {ROUND_COUNT} times. No ruler, no
          inspector panel — just your eye.
        </Text>
        {bestScore !== null && <Text style={styles.best}>Best score: {bestScore.toFixed(1)} / {ROUND_COUNT * 10}</Text>}
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
        <Text style={styles.title}>
          Match: {round.targetWidth} × {round.targetHeight}
        </Text>

        <View style={styles.stage}>
          <View style={{ width, height, backgroundColor: theme.fg, borderRadius: 4 }} />
        </View>

        <ColorSlider label="WIDTH" value={width} min={40} max={260} onChange={setWidth} hideValue />
        <ColorSlider label="HEIGHT" value={height} min={40} max={220} onChange={setHeight} hideValue />

        <Pressable style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]} onPress={lockInGuess}>
          <Text style={styles.primaryButtonText}>LOCK IN</Text>
        </Pressable>
      </View>
    );
  }

  const total = scores.reduce((a, b) => a + b, 0);
  const max = rounds.length * 10;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}>
      <Text style={styles.eyebrow}>RESULTS</Text>
      <Text style={styles.scoreTotal}>{total.toFixed(1)} / {max}</Text>
      <Text style={styles.body}>{verdictForPixelMatchScore(total, max)}</Text>

      <View style={styles.roundList}>
        {scores.map((s, i) => (
          <View key={i} style={styles.roundRow}>
            <Text style={styles.roundLabel}>
              ROUND {i + 1} · {rounds[i].targetWidth}×{rounds[i].targetHeight}
            </Text>
            <Text style={styles.roundScore}>{s.toFixed(1)} / 10</Text>
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
    stage: {
      height: 240,
      borderRadius: 4,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: theme.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
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
