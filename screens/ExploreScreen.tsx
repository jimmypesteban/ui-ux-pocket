import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DesignTypeGlyph from '../components/DesignTypeGlyph';
import { DESIGN_TYPES } from '../lib/designTypes';
import { Theme, useTheme } from '../lib/theme';
import { DesignTypeId } from '../lib/types';

const ORDER: DesignTypeId[] = [
  'grid-zealot',
  'pixel-auditor',
  'contrast-architect',
  'precision-provocateur',
  'whitespace-purist',
  'detail-drifter',
  'chaos-agent',
  'flourish-hunter',
];

export default function ExploreScreen({ yourType }: { yourType: DesignTypeId }) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top + 24, paddingBottom: 24 }}
    >
      <Text style={styles.eyebrow}>THE EIGHT TYPES</Text>
      {ORDER.map((id) => {
        const type = DESIGN_TYPES[id];
        const isYou = id === yourType;
        return (
          <View key={id} style={styles.card}>
            <View style={styles.nameRow}>
              <DesignTypeGlyph type={id} size={28} color={theme.fg} />
              <Text style={styles.name}>{type.name}</Text>
              {isYou && <Text style={styles.youBadge}>YOU</Text>}
            </View>
            <Text style={styles.tagline}>{type.tagline}</Text>
            <Text style={styles.description}>{type.description}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 24 },
    eyebrow: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 2, marginBottom: 20 },
    card: { borderTopWidth: 1, borderTopColor: theme.border, paddingVertical: 24 },
    nameRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    name: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 24 },
    youBadge: {
      color: theme.bg,
      backgroundColor: theme.fg,
      fontFamily: theme.monoFont,
      fontSize: 10,
      letterSpacing: 1,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 2,
    },
    tagline: { color: theme.fgDim, fontSize: 15, lineHeight: 21, marginTop: 8, fontStyle: 'italic' },
    description: { color: theme.fg, fontSize: 15, lineHeight: 22, marginTop: 12 },
  });
}
