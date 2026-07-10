import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ColorSlider from '../components/ColorSlider';
import AnimatedPressable from '../components/AnimatedPressable';
import { generateTargets, HSL, hslToCss, scoreRound, verdictForScore } from '../lib/colorGame';
import { Theme, useTheme } from '../lib/theme';
import { space, radius, border } from '../lib/tokens';

const ROUND_COUNT = 5;
const MEMORIZE_MS = 1800;
const DEFAULT_GUESS: HSL = { h: 180, s: 50, l: 50 };

type Phase = 'intro' | 'memorize' | 'recall' | 'results';

export default function ColorGameScreen({
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
  const [targets, setTargets] = useState<HSL[]>([]);
  const [memorizeIndex, setMemorizeIndex] = useState(0);
  const [guess, setGuess] = useState<HSL>(DEFAULT_GUESS);
  const [scores, setScores] = useState<number[]>([]);
  const submittingRef = useRef(false);
  const finishedRef = useRef(false);

  const roundIndex = scores.length;

  useEffect(() => {
    if (phase !== 'memorize') return;
    if (memorizeIndex >= targets.length) {
      setPhase('recall');
      return;
    }
    const timer = setTimeout(() => setMemorizeIndex((i) => i + 1), MEMORIZE_MS);
    return () => clearTimeout(timer);
  }, [phase, memorizeIndex, targets.length]);

  useEffect(() => {
    if (phase === 'recall' && targets.length > 0 && scores.length >= targets.length && !finishedRef.current) {
      finishedRef.current = true;
      setPhase('results');
      onFinish(scores.reduce((a, b) => a + b, 0));
    }
  }, [phase, scores, targets.length, onFinish]);

  function startGame() {
    finishedRef.current = false;
    submittingRef.current = false;
    setTargets(generateTargets(ROUND_COUNT));
    setMemorizeIndex(0);
    setGuess(DEFAULT_GUESS);
    setScores([]);
    setPhase('memorize');
  }

  function lockInGuess() {
    if (submittingRef.current || roundIndex >= targets.length) return;
    submittingRef.current = true;
    const roundScore = scoreRound(targets[roundIndex], guess);
    setScores((prev) => [...prev, roundScore]);
    setGuess(DEFAULT_GUESS);
    submittingRef.current = false;
  }

  if (phase === 'intro') {
    return (
      <View style={[styles.container, { paddingTop: insets.top + space.space24, paddingBottom: insets.bottom + space.space24 }]}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>‹ Back</Text>
        </Pressable>
        <Text style={styles.title}>Color Recall</Text>
        <Text style={styles.body}>
          You will see {ROUND_COUNT} colors, one at a time. Then you will try to recreate each one from
          memory using hue, saturation, and lightness. Most people are worse at this than they think.
        </Text>
        {bestScore !== null && <Text style={styles.best}>Best score: {bestScore.toFixed(1)} / {ROUND_COUNT * 10}</Text>}
        <AnimatedPressable style={styles.primaryButton} onPress={startGame}>
          <Text style={styles.primaryButtonText}>START</Text>
        </AnimatedPressable>
      </View>
    );
  }

  if (phase === 'memorize') {
    const color = targets[memorizeIndex];
    return (
      <View style={[styles.fullBleed, { backgroundColor: color ? hslToCss(color) : theme.bg }]}>
        <Pressable onPress={onBack} style={[styles.exitOverlay, { top: insets.top + 16 }]}>
          <Text style={styles.exitOverlayText}>✕ Exit</Text>
        </Pressable>
        <Text style={[styles.memorizeCount, { top: insets.top + space.space24 }]}>
          {Math.min(memorizeIndex + 1, targets.length)} / {targets.length}
        </Text>
      </View>
    );
  }

  if (phase === 'recall') {
    if (roundIndex >= targets.length) {
      return <View style={styles.fullBleed} />;
    }
    return (
      <View style={[styles.container, { paddingTop: insets.top + space.space24, paddingBottom: insets.bottom + space.space24 }]}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>✕ Exit</Text>
        </Pressable>
        <Text style={styles.eyebrow}>ROUND {roundIndex + 1} / {targets.length}</Text>
        <Text style={styles.title}>Recreate this color from memory.</Text>

        <View style={[styles.swatch, { backgroundColor: hslToCss(guess) }]} />

        <ColorSlider label="HUE" value={guess.h} min={0} max={359} onChange={(h) => setGuess((g) => ({ ...g, h }))} />
        <ColorSlider label="SATURATION" value={guess.s} min={0} max={100} onChange={(s) => setGuess((g) => ({ ...g, s }))} />
        <ColorSlider label="LIGHTNESS" value={guess.l} min={0} max={100} onChange={(l) => setGuess((g) => ({ ...g, l }))} />

        <AnimatedPressable style={styles.primaryButton} onPress={lockInGuess}>
          <Text style={styles.primaryButtonText}>LOCK IN</Text>
        </AnimatedPressable>
      </View>
    );
  }

  const total = scores.reduce((a, b) => a + b, 0);
  const max = targets.length * 10;

  return (
    <View style={[styles.container, { paddingTop: insets.top + space.space24, paddingBottom: insets.bottom + space.space24 }]}>
      <Text style={styles.eyebrow}>RESULTS</Text>
      <Text style={styles.scoreTotal}>{total.toFixed(1)} / {max}</Text>
      <Text style={styles.body}>{verdictForScore(total, max)}</Text>

      <View style={styles.roundList}>
        {scores.map((s, i) => (
          <View key={i} style={styles.roundRow}>
            <View style={[styles.roundSwatch, { backgroundColor: hslToCss(targets[i]) }]} />
            <Text style={styles.roundScore}>{s.toFixed(1)} / 10</Text>
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
    fullBleed: { flex: 1 },
    back: { color: theme.fgDim, fontSize: 15, marginBottom: space.space24 },
    eyebrow: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 2, marginBottom: space.space8 },
    title: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 26, lineHeight: 32, marginTop: space.space8, marginBottom: space.space16 },
    body: { color: theme.fgDim, fontSize: 15, lineHeight: 22 },
    best: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, marginTop: space.space20 },
    memorizeCount: {
      position: 'absolute',
      alignSelf: 'center',
      color: 'rgba(0,0,0,0.5)',
      fontFamily: theme.monoFont,
      fontSize: 13,
      letterSpacing: 1,
    },
    exitOverlay: { position: 'absolute', left: 20, zIndex: 1 },
    exitOverlayText: {
      color: 'rgba(0,0,0,0.5)',
      fontFamily: theme.monoFont,
      fontSize: 13,
      letterSpacing: 1,
    },
    swatch: { height: 140, borderRadius: radius.card, marginBottom: space.space24, borderWidth: border.hairline, borderColor: theme.border },
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
    roundList: { marginTop: space.sectionGap, gap: space.space10 },
    roundRow: { flexDirection: 'row', alignItems: 'center', gap: space.space12 },
    roundSwatch: { width: 32, height: 32, borderRadius: radius.card, borderWidth: border.hairline, borderColor: theme.border },
    roundScore: { color: theme.fgDim, fontFamily: theme.monoFont, fontSize: 13 },
    doneLink: { marginTop: space.space16, alignItems: 'center' },
    doneLinkText: { color: theme.fgFaint, fontSize: 13, textDecorationLine: 'underline' },
  });
}
