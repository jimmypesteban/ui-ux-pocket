import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { categoryBreakdown, gameLogBreakdown } from '../lib/gameLogic';
import { GAME_LABELS, OTHER_GAME_ORDER } from '../lib/gameMeta';
import { Theme, useTheme } from '../lib/theme';
import { ChallengeCategory, GameLogEntry, GameStats } from '../lib/types';

const CATEGORY_LABELS: Record<ChallengeCategory, string> = {
  contrast: 'CONTRAST',
  spacing: 'SPACING',
  'tap-targets': 'TAP TARGETS',
  hierarchy: 'HIERARCHY',
};

const CATEGORY_ORDER: ChallengeCategory[] = ['contrast', 'spacing', 'tap-targets', 'hierarchy'];

export default function StatsScreen({ stats, gameLog }: { stats: GameStats; gameLog: GameLogEntry[] }) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const breakdown = categoryBreakdown(stats);
  const byGame = gameLogBreakdown(gameLog);
  const overallAccuracy =
    stats.totalPlayed > 0 ? Math.round((stats.totalCorrect / stats.totalPlayed) * 100) : null;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: 20, paddingBottom: 24 }}
    >
      <Text style={styles.eyebrow}>OVERALL</Text>
      <View style={styles.overallRow}>
        <Stat label="PLAYED" value={`${stats.totalPlayed}`} />
        <Stat label="ACCURACY" value={overallAccuracy === null ? '—' : `${overallAccuracy}%`} />
        <Stat label="BEST STREAK" value={`${stats.bestStreak}`} />
      </View>

      <View style={styles.divider} />

      <Text style={styles.eyebrow}>BY CATEGORY</Text>
      {CATEGORY_ORDER.map((cat) => {
        const { played, correct } = breakdown[cat];
        const pct = played > 0 ? Math.round((correct / played) * 100) : null;
        return (
          <View key={cat} style={styles.catRow}>
            <View style={styles.catHeader}>
              <Text style={styles.catLabel}>{CATEGORY_LABELS[cat]}</Text>
              <Text style={styles.catValue}>{pct === null ? 'NO DATA' : `${pct}% (${correct}/${played})`}</Text>
            </View>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${pct ?? 0}%` }]} />
            </View>
          </View>
        );
      })}

      <View style={styles.divider} />

      <Text style={styles.eyebrow}>BY GAME</Text>
      {OTHER_GAME_ORDER.map((game) => {
        const { played, best, maxScore } = byGame[game];
        const pct = played > 0 && maxScore > 0 ? Math.round((best / maxScore) * 100) : null;
        return (
          <View key={game} style={styles.catRow}>
            <View style={styles.catHeader}>
              <Text style={styles.catLabel}>{GAME_LABELS[game].toUpperCase()}</Text>
              <Text style={styles.catValue}>
                {played === 0 ? 'NOT PLAYED' : `Best ${best.toFixed(best % 1 === 0 ? 0 : 1)} / ${maxScore}`}
              </Text>
            </View>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${pct ?? 0}%` }]} />
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 24 },
    eyebrow: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 2, marginBottom: 16 },
    overallRow: { flexDirection: 'row', justifyContent: 'space-between' },
    stat: { alignItems: 'flex-start' },
    statValue: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 26 },
    statLabel: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 11, letterSpacing: 1, marginTop: 4 },
    divider: { height: 1, backgroundColor: theme.border, marginVertical: 28 },
    catRow: { marginBottom: 20 },
    catHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    catLabel: { color: theme.fg, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 1 },
    catValue: { color: theme.fgDim, fontFamily: theme.monoFont, fontSize: 12 },
    barTrack: { height: 4, backgroundColor: theme.border, borderRadius: 2, overflow: 'hidden' },
    barFill: { height: 4, backgroundColor: theme.fg },
  });
}
