import { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimatedPressable from '../components/AnimatedPressable';
import CollectionIcon from '../components/CollectionIcon';
import { Resource, ResourceCollection } from '../lib/resources';
import { Theme, useTheme } from '../lib/theme';
import { space, radius, border } from '../lib/tokens';

type Phase = 'intro' | 'playing' | 'results';

function shuffledIndices(length: number): number[] {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function formatSeconds(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function InterviewPracticeScreen({
  collection,
  onExit,
}: {
  collection: ResourceCollection;
  onExit: () => void;
}) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const [phase, setPhase] = useState<Phase>('intro');
  const [order, setOrder] = useState<number[]>([]);
  const [position, setPosition] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [log, setLog] = useState<{ item: Resource; seconds: number }[]>([]);
  const startRef = useRef(Date.now());

  useEffect(() => {
    if (phase !== 'playing') return;
    const interval = setInterval(() => {
      setElapsedSec(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, position]);

  function startSession() {
    setOrder(shuffledIndices(collection.items.length));
    setPosition(0);
    setRevealed(false);
    setElapsedSec(0);
    setLog([]);
    startRef.current = Date.now();
    setPhase('playing');
  }

  function nextQuestion() {
    const item = collection.items[order[position]];
    const seconds = Math.floor((Date.now() - startRef.current) / 1000);
    const updatedLog = [...log, { item, seconds }];
    setLog(updatedLog);

    if (position + 1 >= order.length) {
      setPhase('results');
      return;
    }
    setPosition((p) => p + 1);
    setRevealed(false);
    setElapsedSec(0);
    startRef.current = Date.now();
  }

  if (phase === 'intro') {
    return (
      <View style={[styles.container, { paddingTop: insets.top + space.space24, paddingBottom: insets.bottom + space.space24 }]}>
        <Pressable onPress={onExit}>
          <Text style={styles.back}>‹ Back</Text>
        </Pressable>
        <View style={styles.titleRow}>
          <CollectionIcon id="interview" size={28} color={theme.fg} />
          <Text style={styles.title}>Practice Session</Text>
        </View>
        <Text style={styles.body}>
          {collection.items.length} real questions, shuffled. Talk through your answer out loud before you reveal what
          interviewers are actually listening for — the point is rehearsal, not a score.
        </Text>
        <AnimatedPressable style={styles.primaryButton} onPress={startSession}>
          <Text style={styles.primaryButtonText}>START</Text>
        </AnimatedPressable>
      </View>
    );
  }

  if (phase === 'playing') {
    const item = collection.items[order[position]];
    return (
      <View style={[styles.container, { paddingTop: insets.top + space.space24, paddingBottom: insets.bottom + space.space24 }]}>
        <View style={styles.playingHeader}>
          <Pressable onPress={onExit}>
            <Text style={styles.back}>✕ Exit</Text>
          </Pressable>
          <Text style={styles.timer}>{formatSeconds(elapsedSec)}</Text>
        </View>
        <Text style={styles.eyebrow}>QUESTION {position + 1} / {order.length}</Text>
        <Text style={styles.question}>{item.tagline}</Text>
        <Text style={styles.questionName}>{item.name}</Text>

        {revealed && (
          <View style={styles.revealBox}>
            <Text style={styles.sectionLabel}>WHAT THEY'RE ACTUALLY ASKING</Text>
            <Text style={styles.revealText}>{item.explanation}</Text>
            <Text style={styles.sectionLabel}>WHY THEY ASK IT</Text>
            <Text style={styles.revealText}>{item.origins}</Text>
          </View>
        )}

        {!revealed ? (
          <AnimatedPressable style={styles.primaryButton} onPress={() => setRevealed(true)}>
            <Text style={styles.primaryButtonText}>REVEAL</Text>
          </AnimatedPressable>
        ) : (
          <AnimatedPressable style={styles.primaryButton} onPress={nextQuestion}>
            <Text style={styles.primaryButtonText}>{position + 1 >= order.length ? 'FINISH' : 'NEXT'}</Text>
          </AnimatedPressable>
        )}
      </View>
    );
  }

  const totalSeconds = log.reduce((sum, entry) => sum + entry.seconds, 0);

  return (
    <View style={[styles.container, { paddingTop: insets.top + space.space24, paddingBottom: insets.bottom + space.space24 }]}>
      <Text style={styles.eyebrow}>SESSION COMPLETE</Text>
      <Text style={styles.scoreTotal}>{log.length} / {order.length}</Text>
      <Text style={styles.body}>
        {formatSeconds(totalSeconds)} total, averaging {formatSeconds(Math.round(totalSeconds / Math.max(log.length, 1)))} per question.
      </Text>

      <View style={styles.roundList}>
        {log.map((entry, i) => (
          <View key={i} style={styles.roundRow}>
            <Text style={styles.roundLabel} numberOfLines={1}>{entry.item.name}</Text>
            <Text style={styles.roundScore}>{formatSeconds(entry.seconds)}</Text>
          </View>
        ))}
      </View>

      <AnimatedPressable style={styles.primaryButton} onPress={startSession}>
        <Text style={styles.primaryButtonText}>PRACTICE AGAIN</Text>
      </AnimatedPressable>
      <Pressable onPress={onExit} style={styles.doneLink}>
        <Text style={styles.doneLinkText}>Done for now</Text>
      </Pressable>
    </View>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: space.screenPadding },
    back: { color: theme.fgDim, fontSize: 15 },
    titleRow: { flexDirection: 'row', alignItems: 'center', gap: space.rowGap, marginTop: space.space20, marginBottom: space.space16 },
    title: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 26, lineHeight: 32 },
    body: { color: theme.fgDim, fontSize: 15, lineHeight: 22 },
    primaryButton: {
      borderWidth: border.hairline,
      borderColor: theme.fg,
      borderRadius: radius.card,
      paddingVertical: 18,
      alignItems: 'center',
      marginTop: space.sectionGap,
    },
    primaryButtonText: { color: theme.fg, fontFamily: theme.monoFont, fontSize: 14, letterSpacing: 1 },
    playingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: space.space20 },
    timer: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 13, fontVariant: ['tabular-nums'] },
    eyebrow: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 2, marginBottom: space.space12 },
    question: {
      color: theme.fg,
      fontFamily: theme.displayFont,
      fontSize: 26,
      lineHeight: 33,
      fontStyle: 'italic',
    },
    questionName: { color: theme.fgFaint, fontSize: 14, marginTop: space.space12 },
    revealBox: {
      backgroundColor: theme.bgAlt,
      borderRadius: radius.card,
      padding: space.space16,
      marginTop: space.sectionGap,
      gap: space.space8,
    },
    sectionLabel: {
      color: theme.fgFaint,
      fontFamily: theme.monoFont,
      fontSize: 11,
      letterSpacing: 2,
      marginTop: space.space10,
    },
    revealText: { color: theme.fgDim, fontSize: 14, lineHeight: 21 },
    scoreTotal: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 40, marginBottom: space.space12 },
    roundList: { marginTop: space.sectionGap, gap: space.space12 },
    roundRow: { flexDirection: 'row', justifyContent: 'space-between', gap: space.space12 },
    roundLabel: { flex: 1, color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 0.5 },
    roundScore: { color: theme.fgDim, fontFamily: theme.monoFont, fontSize: 12, fontVariant: ['tabular-nums'] },
    doneLink: { marginTop: space.space16, alignItems: 'center' },
    doneLinkText: { color: theme.fgFaint, fontSize: 13, textDecorationLine: 'underline' },
  });
}
