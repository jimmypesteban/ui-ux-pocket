import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme, useTheme } from '../lib/theme';

export type TabKey = 'home' | 'explore' | 'laws' | 'pairings' | 'profile';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'home', label: 'HOME' },
  { key: 'laws', label: 'LAWS' },
  { key: 'explore', label: 'TYPES' },
  { key: 'pairings', label: 'PAIRS' },
  { key: 'profile', label: 'PROFILE' },
];

export default function TabBar({ active, onChange }: { active: TabKey; onChange: (tab: TabKey) => void }) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 8 }]}>
      {TABS.map((tab) => (
        <Pressable key={tab.key} style={styles.tab} onPress={() => onChange(tab.key)}>
          <Text style={[styles.label, active === tab.key && styles.labelActive]}>{tab.label}</Text>
          {active === tab.key && <View style={styles.dot} />}
        </Pressable>
      ))}
    </View>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderTopWidth: 1,
      borderTopColor: theme.border,
      backgroundColor: theme.bg,
      paddingTop: 12,
    },
    tab: { flex: 1, alignItems: 'center', gap: 6 },
    label: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 10, letterSpacing: 1 },
    labelActive: { color: theme.fg },
    dot: { width: 3, height: 3, borderRadius: 2, backgroundColor: theme.fg },
  });
}
