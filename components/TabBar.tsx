import { memo, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimatedPressable from './AnimatedPressable';
import { Theme, useTheme } from '../lib/theme';
import { border, space } from '../lib/tokens';

export type TabKey = 'home' | 'games' | 'laws' | 'explore' | 'profile';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'home', label: 'HOME' },
  { key: 'games', label: 'GAMES' },
  { key: 'laws', label: 'LAWS' },
  { key: 'explore', label: 'TYPES' },
  { key: 'profile', label: 'PROFILE' },
];

function TabBar({ active, onChange }: { active: TabKey; onChange: (tab: TabKey) => void }) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + space.space8 }]}>
      {TABS.map((tab) => (
        <AnimatedPressable key={tab.key} style={styles.tab} onPress={() => onChange(tab.key)}>
          <Text style={[styles.label, active === tab.key && styles.labelActive]}>{tab.label}</Text>
          {active === tab.key && <View style={styles.dot} />}
        </AnimatedPressable>
      ))}
    </View>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderTopWidth: border.hairline,
      borderTopColor: theme.border,
      backgroundColor: theme.bg,
      paddingTop: space.rowGap,
    },
    tab: { flex: 1, alignItems: 'center', gap: space.space6 },
    label: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 10, letterSpacing: 1 },
    labelActive: { color: theme.fg },
    dot: { width: 3, height: 3, borderRadius: 2, backgroundColor: theme.fg },
  });
}

export default memo(TabBar);
