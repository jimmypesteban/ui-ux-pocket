import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ColorSlider from '../components/ColorSlider';
import AnimatedPressable from '../components/AnimatedPressable';
import GameIcon from '../components/GameIcon';
import {
  generatePixelMatchRound,
  PixelMatchRound,
  scorePixelMatch,
  verdictForPixelMatchScore,
} from '../lib/pixelMatchGame';
import { Theme, useTheme } from '../lib/theme';
import { space, radius, border } from '../lib/tokens';

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
  const [guesses, setGuesses] = useState<{ width: number; height: number }[]>([]);

  const roundIndex = scores.length;

  function startGame() {
    setRounds(Array.from({ length: ROUND_COUNT }, generatePixelMatchRound));
    setWidth(150);
    setHeight(100);
    setScores([]);
    setGuesses([]);
    setPhase('playing');
  }

  function lockInGuess() {
    if (roundIndex >= rounds.length) return;
    const roundScore = scorePixelMatch(rounds[roundIndex], width, height);
    const updated = [...scores, roundScore];
    setScores(updated);
    setGuesses((g) => [...g, { width, height }]);
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
      <View style={[styles.container, { paddingTop: insets.top + space.space24, paddingBottom: insets.bottom + space.space24 }]}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>‹ Back</Text>
        </Pressable>
        <View style={styles.titleRow}>
          <GameIcon game="pixelmatch" size={28} color={theme.fg} />
          <Text style={styles.title}>Pixel Match</Text>
        </View>
        <Text style={styles.body}>
          You get a target width and height. Draw a box that matches, {ROUND_COUNT} times. No ruler, no
          inspector panel — just your eye.
        </Text>
        {bestScore !== null && <Text style={styles.best}>Best score: {bestScore.toFixed(1)} / {ROUND_COUNT * 10}</Text>}
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
        <Text style={styles.title}>
          Match: {round.targetWidth} × {round.targetHeight}
        </Text>

        <View style={styles.stage}>
          <View style={{ width, height, backgroundColor: theme.fg, borderRadius: radius.card }} />
        </View>

        <ColorSlider label="WIDTH" value={width} min={40} max={260} onChange={setWidth} hideValue />
        <ColorSlider label="HEIGHT" value={height} min={40} max={220} onChange={setHeight} hideValue />

        <AnimatedPressable style={styles.primaryButton} onPress={lockInGuess}>
          <Text style={styles.primaryButtonText}>LOCK IN</Text>
        </AnimatedPressable>
      </View>
    );
  }

  const total = scores.reduce((a, b) => a + b, 0);
  const max = rounds.length * 10;

  return (
    <View style={[styles.container, { paddingTop: insets.top + space.space24, paddingBottom: insets.bottom + space.space24 }]}>
      <Text style={styles.eyebrow}>RESULTS</Text>
      <Text style={styles.scoreTotal}>{total.toFixed(1)} / {max}</Text>
      <Text style={styles.body}>{verdictForPixelMatchScore(total, max)}</Text>

      <View style={styles.roundList}>
        {scores.map((s, i) => {
          const target = rounds[i];
          const guess = guesses[i];
          const widthDiff = guess.width - target.targetWidth;
          const heightDiff = guess.height - target.targetHeight;
          const fmt = (d: number) => (d >= 0 ? `+${d}` : `${d}`);
          return (
            <View key={i} style={styles.roundBlock}>
              <View style={styles.roundRow}>
                <Text style={styles.roundLabel}>
                  ROUND {i + 1} · Target {target.targetWidth}×{target.targetHeight}
                </Text>
                <Text style={styles.roundScore}>{s.toFixed(1)} / 10</Text>
              </View>
              <Text style={styles.roundDelta}>
                You drew {guess.width}×{guess.height} · {fmt(widthDiff)}px W, {fmt(heightDiff)}px H
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
    stage: {
      height: 240,
      borderRadius: radius.card,
      marginBottom: space.space24,
      borderWidth: border.hairline,
      borderColor: theme.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
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
    roundList: { marginTop: space.sectionGap, gap: space.space16 },
    roundBlock: { gap: space.space4 },
    roundRow: { flexDirection: 'row', justifyContent: 'space-between' },
    roundLabel: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 1 },
    roundScore: { color: theme.fgDim, fontFamily: theme.monoFont, fontSize: 12 },
    roundDelta: { color: theme.fgDim, fontFamily: theme.monoFont, fontSize: 12 },
    doneLink: { marginTop: space.space16, alignItems: 'center' },
    doneLinkText: { color: theme.fgFaint, fontSize: 13, textDecorationLine: 'underline' },
  });
}
