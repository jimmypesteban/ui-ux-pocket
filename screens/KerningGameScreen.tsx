import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ColorSlider from '../components/ColorSlider';
import AnimatedPressable from '../components/AnimatedPressable';
import GameIcon from '../components/GameIcon';
import { generateKerningRound, KerningRound, scoreKerningRound, verdictForKerningScore } from '../lib/kerningGame';
import { Theme, useTheme } from '../lib/theme';
import { space, radius, border } from '../lib/tokens';

const ROUND_COUNT = 5;

type Phase = 'intro' | 'playing' | 'results';

export default function KerningGameScreen({
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
  const [rounds, setRounds] = useState<KerningRound[]>([]);
  const [offsets, setOffsets] = useState<number[]>([]);
  const [scores, setScores] = useState<number[]>([]);

  const roundIndex = scores.length;

  function startGame() {
    const generated = Array.from({ length: ROUND_COUNT }, generateKerningRound);
    setRounds(generated);
    setOffsets(generated[0].startOffsets);
    setScores([]);
    setPhase('playing');
  }

  function updateOffset(gapIndex: number, value: number) {
    setOffsets((prev) => prev.map((v, i) => (i === gapIndex ? value : v)));
  }

  function lockInGuess() {
    if (roundIndex >= rounds.length) return;
    const roundScore = scoreKerningRound(offsets);
    const updated = [...scores, roundScore];
    setScores(updated);
    if (updated.length >= rounds.length) {
      setPhase('results');
      onFinish(updated.reduce((a, b) => a + b, 0));
    } else {
      setOffsets(rounds[updated.length].startOffsets);
    }
  }

  if (phase === 'intro') {
    return (
      <View style={[styles.container, { paddingTop: insets.top + space.space24, paddingBottom: insets.bottom + space.space24 }]}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>‹ Back</Text>
        </Pressable>
        <View style={styles.titleRow}>
          <GameIcon game="kerning" size={28} color={theme.fg} />
          <Text style={styles.title}>Kerning Call</Text>
        </View>
        <Text style={styles.body}>
          A word loads with every gap scrambled. Nudge each gap with its own slider until the whole word
          reads naturally, {ROUND_COUNT} times. The target is zero on every gap.
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
    const letters = round.word.split('');
    return (
      <View style={[styles.container, { paddingTop: insets.top + space.space24, paddingBottom: insets.bottom + space.space24 }]}>
        <Pressable onPress={onBack}>
          <Text style={styles.back}>✕ Exit</Text>
        </Pressable>
        <Text style={styles.eyebrow}>ROUND {roundIndex + 1} / {rounds.length}</Text>
        <Text style={styles.title}>Fix the spacing.</Text>

        <View style={styles.sample}>
          {letters.map((letter, i) => (
            <Text
              key={i}
              style={{
                fontSize: round.fontSize,
                color: theme.fg,
                fontWeight: '700',
                marginLeft: i === 0 ? 0 : 20 + offsets[i - 1],
              }}
            >
              {letter}
            </Text>
          ))}
        </View>

        <View style={styles.sliderList}>
          {offsets.map((value, i) => (
            <ColorSlider
              key={i}
              label={`${letters[i]}${letters[i + 1]}`}
              value={value}
              min={-40}
              max={40}
              onChange={(v) => updateOffset(i, v)}
            />
          ))}
        </View>

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
      <Text style={styles.body}>{verdictForKerningScore(total, max)}</Text>

      <View style={styles.roundList}>
        {scores.map((s, i) => (
          <View key={i} style={styles.roundRow}>
            <Text style={styles.roundLabel}>ROUND {i + 1} · {rounds[i].word}</Text>
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    sliderList: { gap: space.space16 },
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
    roundScore: { color: theme.fgDim, fontFamily: theme.monoFont, fontSize: 12 },
    doneLink: { marginTop: space.space16, alignItems: 'center' },
    doneLinkText: { color: theme.fgFaint, fontSize: 13, textDecorationLine: 'underline' },
  });
}
