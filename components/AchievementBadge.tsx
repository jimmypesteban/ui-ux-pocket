import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AchievementIcon from './AchievementIcon';
import AnimatedBar from './AnimatedBar';
import { AchievementIcon as AchievementIconType, Progress } from '../lib/achievements';
import { Theme, useTheme } from '../lib/theme';
import { border, radius, space } from '../lib/tokens';

function formatValue(n: number, format?: (n: number) => string): string {
  if (format) return format(n);
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

export default function AchievementBadge({
  title,
  description,
  icon,
  unlocked,
  progress,
}: {
  title: string;
  description: string;
  icon: AchievementIconType;
  unlocked: boolean;
  progress: Progress | null;
}) {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const pct = progress && progress.target > 0 ? Math.round((progress.current / progress.target) * 100) : null;
  const hasLevel = progress?.level !== undefined && progress?.maxLevel !== undefined;

  return (
    <View style={[styles.card, unlocked && styles.cardUnlocked]}>
      <View style={styles.headerRow}>
        <View style={[styles.iconWrap, unlocked && styles.iconWrapUnlocked]}>
          <AchievementIcon icon={icon} size={20} color={unlocked ? theme.fg : theme.fgDim} />
        </View>
        <View style={styles.titleCol}>
          <Text style={[styles.title, !unlocked && styles.titleLocked]}>{title}</Text>
          {hasLevel && (
            <Text style={styles.levelTag}>
              LEVEL {progress!.level}{unlocked ? '' : ` / ${progress!.maxLevel}`}
            </Text>
          )}
        </View>
        <View style={[styles.dot, unlocked && styles.dotUnlocked]} />
      </View>
      <Text style={styles.description}>{description}</Text>
      {!unlocked && pct !== null && (
        <View style={styles.progressRow}>
          <View style={styles.barTrack}>
            <AnimatedBar pct={pct} style={styles.barFill} />
          </View>
          <Text style={styles.progressText}>
            {formatValue(progress!.current, progress!.format)}/{formatValue(progress!.target, progress!.format)}
          </Text>
        </View>
      )}
    </View>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    card: {
      borderWidth: border.hairline,
      borderColor: theme.border,
      borderRadius: radius.card,
      padding: space.cardPadding,
      marginBottom: space.space12,
      opacity: 0.55,
    },
    cardUnlocked: { opacity: 1, borderColor: theme.fg },
    headerRow: { flexDirection: 'row', alignItems: 'center', gap: space.space10, marginBottom: space.space6 },
    iconWrap: {
      width: 32,
      height: 32,
      borderRadius: radius.card,
      borderWidth: border.hairline,
      borderColor: theme.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconWrapUnlocked: { borderColor: theme.fg },
    titleCol: { flex: 1 },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.fgFaint },
    dotUnlocked: { backgroundColor: theme.success },
    title: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 16 },
    titleLocked: { color: theme.fgDim },
    levelTag: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 10, letterSpacing: 1, marginTop: 2 },
    description: { color: theme.fgFaint, fontSize: 13, lineHeight: 18 },
    progressRow: { flexDirection: 'row', alignItems: 'center', gap: space.space10, marginTop: space.space10 },
    barTrack: { flex: 1, height: 4, backgroundColor: theme.border, borderRadius: 2, overflow: 'hidden' },
    barFill: { height: 4, backgroundColor: theme.fgDim },
    progressText: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 11 },
  });
}
