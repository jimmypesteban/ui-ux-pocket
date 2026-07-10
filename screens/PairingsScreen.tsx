import { ScrollView, StyleSheet, Text, View } from 'react-native';
import DesignTypeGlyph from '../components/DesignTypeGlyph';
import { DESIGN_TYPES } from '../lib/designTypes';
import { getPairing, otherTypes } from '../lib/pairings';
import { Theme, useTheme } from '../lib/theme';
import { DesignTypeId } from '../lib/types';
import { border, space } from '../lib/tokens';

export default function PairingsScreen({ yourType }: { yourType: DesignTypeId }) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const others = otherTypes(yourType);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: space.subScreenTop, paddingBottom: space.space24 }}
    >
      <Text style={styles.eyebrow}>HOW YOU CRITIQUE TOGETHER</Text>
      <Text style={styles.subhead}>As {DESIGN_TYPES[yourType].name}, paired with:</Text>

      {others.map((otherId) => {
        const pairing = getPairing(yourType, otherId);
        return (
          <View key={otherId} style={styles.card}>
            <View style={styles.otherRow}>
              <DesignTypeGlyph type={otherId} size={18} color={theme.fgFaint} />
              <Text style={styles.otherName}>{DESIGN_TYPES[otherId].name}</Text>
            </View>
            <Text style={styles.pairingTitle}>{pairing.title}</Text>
            <Text style={styles.verdict}>{pairing.verdict}</Text>
          </View>
        );
      })}

      <View style={styles.card}>
        <View style={styles.otherRow}>
          <DesignTypeGlyph type={yourType} size={18} color={theme.fgFaint} />
          <Text style={styles.otherName}>Another {DESIGN_TYPES[yourType].name.replace(/^The /, '')}</Text>
        </View>
        <Text style={styles.pairingTitle}>{getPairing(yourType, yourType).title}</Text>
        <Text style={styles.verdict}>{getPairing(yourType, yourType).verdict}</Text>
      </View>
    </ScrollView>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: space.screenPadding },
    eyebrow: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 2 },
    subhead: { color: theme.fgDim, fontSize: 14, marginTop: space.space8, marginBottom: space.space12 },
    card: { borderTopWidth: border.hairline, borderTopColor: theme.border, paddingVertical: space.space24 },
    otherRow: { flexDirection: 'row', alignItems: 'center', gap: space.space8 },
    otherName: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 1 },
    pairingTitle: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 22, marginTop: space.space6 },
    verdict: { color: theme.fg, fontSize: 15, lineHeight: 22, marginTop: space.space10 },
  });
}
