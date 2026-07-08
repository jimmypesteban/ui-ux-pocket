import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DESIGN_TYPES } from '../lib/designTypes';
import { theme } from '../lib/theme';
import { GameStats, Profile } from '../lib/types';
import { hasPlayedToday } from '../lib/challengePicker';

export default function HomeScreen({
  profile,
  stats,
  onPlay,
  onRetakeQuiz,
}: {
  profile: Profile;
  stats: GameStats;
  onPlay: () => void;
  onRetakeQuiz: () => void;
}) {
  const insets = useSafeAreaInsets();
  const designType = DESIGN_TYPES[profile.designTypeId];
  const playedToday = hasPlayedToday(stats);
  const accuracy = stats.totalPlayed > 0 ? Math.round((stats.totalCorrect / stats.totalPlayed) * 100) : null;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }}
    >
      <Text style={styles.eyebrow}>YOUR DESIGN TYPE</Text>
      <Text style={styles.typeName}>{designType.name}</Text>
      <Text style={styles.tagline}>{designType.tagline}</Text>
      <Text style={styles.description}>{designType.description}</Text>

      <View style={styles.divider} />

      <View style={styles.statsRow}>
        <Stat label="STREAK" value={`${stats.streak}`} />
        <Stat label="BEST" value={`${stats.bestStreak}`} />
        <Stat label="ACCURACY" value={accuracy === null ? '—' : `${accuracy}%`} />
      </View>

      <View style={styles.divider} />

      <Pressable
        style={({ pressed }) => [styles.playButton, pressed && styles.playButtonPressed]}
        onPress={onPlay}
      >
        <Text style={styles.playButtonText}>
          {playedToday ? "TODAY'S CALL — PLAYED" : "TODAY'S JUDGMENT CALL"}
        </Text>
      </Pressable>
      {playedToday && <Text style={styles.playedNote}>Come back tomorrow for the next one.</Text>}

      <Pressable onPress={onRetakeQuiz} style={styles.retake}>
        <Text style={styles.retakeText}>Retake the quiz</Text>
      </Pressable>
    </ScrollView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 24 },
  eyebrow: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 2 },
  typeName: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 32, lineHeight: 38, marginTop: 8 },
  tagline: { color: theme.fgDim, fontSize: 15, lineHeight: 21, marginTop: 8, fontStyle: 'italic' },
  description: { color: theme.fg, fontSize: 15, lineHeight: 22, marginTop: 16 },
  divider: { height: 1, backgroundColor: theme.border, marginVertical: 28 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  stat: { alignItems: 'flex-start' },
  statValue: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 28 },
  statLabel: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 11, letterSpacing: 1, marginTop: 4 },
  playButton: {
    borderWidth: 1,
    borderColor: theme.fg,
    borderRadius: 4,
    paddingVertical: 18,
    alignItems: 'center',
  },
  playButtonPressed: { opacity: 0.6 },
  playButtonText: { color: theme.fg, fontFamily: theme.monoFont, fontSize: 14, letterSpacing: 1 },
  playedNote: { color: theme.fgFaint, fontSize: 13, textAlign: 'center', marginTop: 12 },
  retake: { marginTop: 24, alignItems: 'center' },
  retakeText: { color: theme.fgFaint, fontSize: 13, textDecorationLine: 'underline' },
});
