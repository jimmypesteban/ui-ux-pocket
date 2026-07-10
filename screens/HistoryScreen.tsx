import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CHALLENGES } from '../lib/dailyGames';
import { GAME_LABELS } from '../lib/gameMeta';
import { Theme, useTheme } from '../lib/theme';
import { GameLogEntry, GameStats } from '../lib/types';
import { space, border } from '../lib/tokens';

type CombinedEntry =
  | { kind: 'judgment'; date: string; challengeId: string; chosen: 'A' | 'B'; wasCorrect: boolean }
  | { kind: 'other'; date: string; entry: GameLogEntry };

export default function HistoryScreen({ stats, gameLog }: { stats: GameStats; gameLog: GameLogEntry[] }) {
  const theme = useTheme();
  const styles = makeStyles(theme);

  const judgmentEntries: CombinedEntry[] = stats.history.map((h) => ({
    kind: 'judgment',
    date: h.date,
    challengeId: h.challengeId,
    chosen: h.chosen,
    wasCorrect: h.wasCorrect,
  }));
  const otherEntries: CombinedEntry[] = gameLog.map((entry) => ({ kind: 'other', date: entry.date, entry }));
  const combined = [...judgmentEntries, ...otherEntries]
    .map((entry, i) => ({ entry, i }))
    .sort((a, b) => (a.entry.date < b.entry.date ? 1 : a.entry.date > b.entry.date ? -1 : b.i - a.i))
    .map(({ entry }) => entry);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingTop: space.subScreenTop, paddingBottom: space.space24 }}>
      <Text style={styles.eyebrow}>PAST ATTEMPTS</Text>

      {combined.length === 0 && (
        <Text style={styles.empty}>Nothing logged yet. Go play something and give this page a reason to exist.</Text>
      )}

      {combined.map((entry, i) => {
        if (entry.kind === 'judgment') {
          const challenge = CHALLENGES.find((c) => c.id === entry.challengeId);
          if (!challenge) return null;
          return (
            <View key={`judgment-${entry.challengeId}-${entry.date}-${i}`} style={styles.card}>
              <View style={styles.rowTop}>
                <Text style={styles.date}>{entry.date} · JUDGMENT CALL</Text>
                <Text style={[styles.verdict, entry.wasCorrect ? styles.verdictGood : styles.verdictBad]}>
                  {entry.wasCorrect ? 'CORRECT' : 'WRONG'}
                </Text>
              </View>
              <Text style={styles.prompt}>{challenge.prompt}</Text>
              <Text style={styles.meta}>
                You picked {entry.chosen} · Correct answer was {challenge.correct}
              </Text>
            </View>
          );
        }
        const { entry: logEntry } = entry;
        return (
          <View key={`other-${logEntry.game}-${logEntry.date}-${i}`} style={styles.card}>
            <View style={styles.rowTop}>
              <Text style={styles.date}>{logEntry.date} · {GAME_LABELS[logEntry.game].toUpperCase()}</Text>
              <Text style={styles.score}>
                {logEntry.score.toFixed(logEntry.score % 1 === 0 ? 0 : 1)} / {logEntry.maxScore}
              </Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: space.screenPadding },
    eyebrow: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 2, marginBottom: space.space20 },
    empty: { color: theme.fgDim, fontSize: 15, lineHeight: 22, marginTop: space.space12 },
    card: { borderTopWidth: border.hairline, borderTopColor: theme.border, paddingVertical: space.space20 },
    rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    date: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 11, letterSpacing: 1 },
    verdict: { fontFamily: theme.monoFont, fontSize: 11, letterSpacing: 1 },
    verdictGood: { color: theme.success },
    verdictBad: { color: theme.danger },
    score: { color: theme.fgDim, fontFamily: theme.monoFont, fontSize: 11, letterSpacing: 1 },
    prompt: { color: theme.fg, fontSize: 16, lineHeight: 22, marginTop: space.space10 },
    meta: { color: theme.fgDim, fontSize: 13, marginTop: space.space8 },
  });
}
