import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import StatsScreen from './StatsScreen';
import HistoryScreen from './HistoryScreen';
import AchievementsScreen from './AchievementsScreen';
import SettingsScreen from './SettingsScreen';
import AnimatedPressable from '../components/AnimatedPressable';
import AvatarIcon from '../components/AvatarIcon';
import { AvatarId } from '../lib/avatars';
import { Theme, useTheme } from '../lib/theme';
import { GameLogEntry, GameStats } from '../lib/types';
import { space, radius, border } from '../lib/tokens';

type SubTab = 'stats' | 'badges' | 'log' | 'settings';

export default function ProfileScreen({
  stats,
  gameLog,
  totalActiveMs,
  foundEggCount,
  onFoundEgg,
  avatarId,
  notificationsEnabled,
  reminderHour,
  onToggleNotifications,
  onChangeReminderHour,
  onChangeAvatar,
  onRetakeQuiz,
}: {
  stats: GameStats;
  gameLog: GameLogEntry[];
  totalActiveMs: number;
  foundEggCount: number;
  onFoundEgg: (id: string) => void;
  avatarId: AvatarId;
  notificationsEnabled: boolean;
  reminderHour: number;
  onToggleNotifications: (enabled: boolean) => void;
  onChangeReminderHour: (hour: number) => void;
  onChangeAvatar: (avatarId: AvatarId) => void;
  onRetakeQuiz: () => void;
}) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [subTab, setSubTab] = useState<SubTab>('stats');

  return (
    <View style={[styles.container, { paddingTop: insets.top + space.space24 }]}>
      <View style={styles.titleRow}>
        <AvatarIcon id={avatarId} size={36} color={theme.fg} />
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.subTabRow}>
        <SubTabButton label="STATS" active={subTab === 'stats'} onPress={() => setSubTab('stats')} styles={styles} />
        <SubTabButton label="BADGES" active={subTab === 'badges'} onPress={() => setSubTab('badges')} styles={styles} />
        <SubTabButton label="LOG" active={subTab === 'log'} onPress={() => setSubTab('log')} styles={styles} />
        <SubTabButton label="SETTINGS" active={subTab === 'settings'} onPress={() => setSubTab('settings')} styles={styles} />
      </View>
      <MotiView key={subTab} style={styles.content} from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 160 }}>
        {subTab === 'stats' && <StatsScreen stats={stats} gameLog={gameLog} onFoundEgg={onFoundEgg} />}
        {subTab === 'badges' && (
          <AchievementsScreen stats={stats} gameLog={gameLog} totalActiveMs={totalActiveMs} foundEggCount={foundEggCount} />
        )}
        {subTab === 'log' && <HistoryScreen stats={stats} gameLog={gameLog} />}
        {subTab === 'settings' && (
          <SettingsScreen
            notificationsEnabled={notificationsEnabled}
            reminderHour={reminderHour}
            avatarId={avatarId}
            onToggleNotifications={onToggleNotifications}
            onChangeReminderHour={onChangeReminderHour}
            onChangeAvatar={onChangeAvatar}
            onRetakeQuiz={onRetakeQuiz}
          />
        )}
      </MotiView>
    </View>
  );
}

function SubTabButton({
  label,
  active,
  onPress,
  styles,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  styles: ReturnType<typeof makeStyles>;
}) {
  return (
    <AnimatedPressable onPress={onPress} style={styles.subTabButton}>
      <Text style={[styles.subTabText, active && styles.subTabTextActive]}>{label}</Text>
      {active && <View style={styles.subTabDot} />}
    </AnimatedPressable>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: space.screenPadding },
    titleRow: { flexDirection: 'row', alignItems: 'center', gap: space.rowGap, marginBottom: space.space20 },
    title: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 30 },
    subTabRow: {
      flexDirection: 'row',
      borderBottomWidth: border.hairline,
      borderBottomColor: theme.border,
      paddingBottom: space.space12,
      marginBottom: space.space4,
    },
    subTabButton: { flex: 1, alignItems: 'center', gap: space.space6 },
    subTabText: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 1 },
    subTabTextActive: { color: theme.fg },
    subTabDot: { width: 3, height: 3, borderRadius: 2, backgroundColor: theme.fg },
    content: { flex: 1 },
  });
}
