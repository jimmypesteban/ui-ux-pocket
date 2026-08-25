import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AchievementBadge from '../components/AchievementBadge';
import { ACHIEVEMENTS, AchievementCategory, computeUnlockedIds, progressFor } from '../lib/achievements';
import { GameLogEntry, GameStats } from '../lib/types';
import { Theme, useTheme } from '../lib/theme';
import { space } from '../lib/tokens';

const CATEGORY_LABELS: Record<AchievementCategory, string> = {
  streak: 'STREAKS',
  game: 'GAME MASTERY',
  time: 'TIME SPENT',
  secret: 'SECRET',
};

const CATEGORY_ORDER: AchievementCategory[] = ['streak', 'game', 'time', 'secret'];

export default function AchievementsScreen({
  stats,
  gameLog,
  totalActiveMs,
  foundEggCount,
}: {
  stats: GameStats;
  gameLog: GameLogEntry[];
  totalActiveMs: number;
  foundEggCount: number;
}) {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const ctx = { stats, gameLog, totalActiveMs, foundEggCount };
  const unlocked = computeUnlockedIds(ctx);
  const unlockedCount = ACHIEVEMENTS.filter((a) => unlocked.has(a.id)).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingTop: space.subScreenTop, paddingBottom: space.space24 }}>
      <Text style={styles.summary}>{unlockedCount} / {ACHIEVEMENTS.length} unlocked</Text>

      {CATEGORY_ORDER.map((cat, i) => (
        <Sec key={cat} title={CATEGORY_LABELS[cat]} showDivider={i > 0} styles={styles}>
          {ACHIEVEMENTS.filter((a) => a.category === cat).map((a) => (
            <AchievementBadge
              key={a.id}
              title={a.title}
              description={a.description}
              icon={a.icon}
              unlocked={unlocked.has(a.id)}
              progress={progressFor(a.id, ctx)}
            />
          ))}
        </Sec>
      ))}
    </ScrollView>
  );
}

function Sec({
  title,
  showDivider,
  styles,
  children,
}: {
  title: string;
  showDivider: boolean;
  styles: ReturnType<typeof makeStyles>;
  children: React.ReactNode;
}) {
  return (
    <>
      {showDivider && <View style={styles.divider} />}
      <Text style={styles.eyebrow}>{title}</Text>
      {children}
    </>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: space.screenPadding },
    summary: { color: theme.fgDim, fontFamily: theme.monoFont, fontSize: 13, marginBottom: space.sectionGap },
    divider: { height: 1, backgroundColor: theme.border, marginVertical: space.sectionGap },
    eyebrow: {
      color: theme.fgFaint,
      fontFamily: theme.monoFont,
      fontSize: 12,
      letterSpacing: 2,
      marginBottom: space.space12,
      marginTop: space.space4,
    },
  });
}
