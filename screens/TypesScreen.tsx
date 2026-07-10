import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import ExploreScreen from './ExploreScreen';
import PairingsScreen from './PairingsScreen';
import AnimatedPressable from '../components/AnimatedPressable';
import { Theme, useTheme } from '../lib/theme';
import { DesignTypeId } from '../lib/types';
import { border, space } from '../lib/tokens';

type SubTab = 'types' | 'pairs';

export default function TypesScreen({ yourType }: { yourType: DesignTypeId }) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [subTab, setSubTab] = useState<SubTab>('types');

  return (
    <View style={[styles.container, { paddingTop: insets.top + space.space24 }]}>
      <Text style={styles.title}>Types</Text>
      <View style={styles.subTabRow}>
        <SubTabButton label="TYPES" active={subTab === 'types'} onPress={() => setSubTab('types')} styles={styles} />
        <SubTabButton label="PAIRS" active={subTab === 'pairs'} onPress={() => setSubTab('pairs')} styles={styles} />
      </View>
      <MotiView key={subTab} style={styles.content} from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 160 }}>
        {subTab === 'types' && <ExploreScreen yourType={yourType} />}
        {subTab === 'pairs' && <PairingsScreen yourType={yourType} />}
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
    title: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 30, marginBottom: space.space20 },
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
