import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ColorSlider from '../components/ColorSlider';
import AnimatedPressable from '../components/AnimatedPressable';
import GameIcon from '../components/GameIcon';
import {
  ContrastRound,
  generateContrastRound,
  scoreContrastGuess,
  verdictForContrastScore,
} from '../lib/contrastGame';
import { hslToCss } from '../lib/colorGame';
import { Theme, useTheme } from '../lib/theme';
import { space, radius, border } from '../lib/tokens';

const ROUND_COUNT = 5;

type Phase = 'intro' | 'playing' | 'results';

export default function ContrastGameScreen({
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
  const [rounds, setRounds] = useState<ContrastRound[]>([]);
  const [guess, setGuess] = useState(10);
  const [scores, setScores] = useState<number[]>([]);

  const roundIndex = scores.length;

  function startGame() {
    setRounds(Array.from({ length: ROUND_COUNT }, generateContrastRound));
    setGuess(10);
    setScores([]);
    setPhase('playing');
  }

  function lockInGuess() {
    if (roundIndex >= rounds.length) return;
    const roundScore = scoreContrastGuess(rounds[roundIndex].actual, guess);
    const updated = [...scores, roundScore];
    setScores(updated);
    if (updated.length >= rounds.length) {
      setPhase('results');
      onFinish(updated.reduce((a, b) => a + b, 0));
    } else {
      setGuess(10);
    }
  }

  if (phase === 'intro') {
    return (
      <View style={[styles.container, { paddingTop: insets.top + space.space24, paddingBottom: insets.bottom + space.space24 }]}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>‹ Back</Text>
        </Pressable>
        <View style={styles.titleRow}>
          <GameIcon game="contrast" size={28} color={theme.fg} />
          <Text style={styles.title}>Contrast Call</Text>
        </View>
        <Text style={styles.body}>
          You will see text on a background {ROUND_COUNT} times. Guess the WCAG contrast ratio, from 1
          (invisible) to 21 (pure black on white). Most people overestimate how readable their favorite
          color pairing actually is.
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
        <Text style={styles.title}>What's the contrast ratio?</Text>

        <View style={[styles.sample, { backgroundColor: hslToCss(round.bg) }]}>
          <Text style={[styles.sampleText, { color: hslToCss(round.fg) }]}>Sample Text</Text>
        </View>

        <ColorSlider label="RATIO GUESS" value={guess} min={1} max={21} onChange={setGuess} />

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
      <Text style={styles.body}>{verdictForContrastScore(total, max)}</Text>

      <View style={styles.roundList}>
        {scores.map((s, i) => (
          <View key={i} style={styles.roundRow}>
            <View style={[styles.roundSwatch, { backgroundColor: hslToCss(rounds[i].bg) }]}>
              <Text style={[styles.roundSwatchText, { color: hslToCss(rounds[i].fg) }]}>Aa</Text>
            </View>
            <Text style={styles.roundScore}>
              {rounds[i].actual.toFixed(1)}:1 actual · {s.toFixed(1)} / 10
            </Text>
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
    sample: {
      height: 140,
      borderRadius: radius.card,
      marginBottom: space.space24,
      borderWidth: border.hairline,
      borderColor: theme.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sampleText: { fontSize: 22, fontWeight: '600' },
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
    roundRow: { flexDirection: 'row', alignItems: 'center', gap: space.space12 },
    roundSwatch: { width: 48, height: 32, borderRadius: radius.card, borderWidth: border.hairline, borderColor: theme.border, alignItems: 'center', justifyContent: 'center' },
    roundSwatchText: { fontSize: 13, fontWeight: '600' },
    roundScore: { color: theme.fgDim, fontFamily: theme.monoFont, fontSize: 12 },
    doneLink: { marginTop: space.space16, alignItems: 'center' },
    doneLinkText: { color: theme.fgFaint, fontSize: 13, textDecorationLine: 'underline' },
  });
}
