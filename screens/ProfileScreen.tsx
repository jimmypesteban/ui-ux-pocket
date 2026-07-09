import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StatsScreen from './StatsScreen';
import HistoryScreen from './HistoryScreen';
import SettingsScreen from './SettingsScreen';
import AvatarIcon from '../components/AvatarIcon';
import { AvatarId } from '../lib/avatars';
import { Theme, useTheme } from '../lib/theme';
import { GameLogEntry, GameStats } from '../lib/types';

type SubTab = 'stats' | 'log' | 'settings';

export default function ProfileScreen({
  stats,
  gameLog,
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
    <View style={[styles.container, { paddingTop: insets.top + 24 }]}>
      <View style={styles.titleRow}>
        <AvatarIcon id={avatarId} size={36} color={theme.fg} />
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.subTabRow}>
        <SubTabButton label="STATS" active={subTab === 'stats'} onPress={() => setSubTab('stats')} styles={styles} />
        <SubTabButton label="LOG" active={subTab === 'log'} onPress={() => setSubTab('log')} styles={styles} />
        <SubTabButton label="SETTINGS" active={subTab === 'settings'} onPress={() => setSubTab('settings')} styles={styles} />
      </View>
      <View style={styles.content}>
        {subTab === 'stats' && <StatsScreen stats={stats} gameLog={gameLog} />}
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
      </View>
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
    <Pressable onPress={onPress} style={styles.subTabButton}>
      <Text style={[styles.subTabText, active && styles.subTabTextActive]}>{label}</Text>
      {active && <View style={styles.subTabDot} />}
    </Pressable>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 24 },
    titleRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
    title: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 30 },
    subTabRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      paddingBottom: 12,
      marginBottom: 4,
    },
    subTabButton: { flex: 1, alignItems: 'center', gap: 6 },
    subTabText: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 1 },
    subTabTextActive: { color: theme.fg },
    subTabDot: { width: 3, height: 3, borderRadius: 2, backgroundColor: theme.fg },
    content: { flex: 1 },
  });
}
