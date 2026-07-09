import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LawIcon from '../components/LawIcon';
import { Theme, useTheme } from '../lib/theme';
import { UX_LAWS } from '../lib/uxLaws';

function shuffledIndices(length: number): number[] {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function FlashcardsScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [order, setOrder] = useState<number[]>(() => UX_LAWS.map((_, i) => i));
  const [position, setPosition] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const law = UX_LAWS[order[position]];

  function goNext() {
    setFlipped(false);
    setPosition((p) => (p + 1) % order.length);
  }

  function goPrev() {
    setFlipped(false);
    setPosition((p) => (p - 1 + order.length) % order.length);
  }

  function shuffle() {
    setOrder(shuffledIndices(UX_LAWS.length));
    setPosition(0);
    setFlipped(false);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }}
    >
      <View style={styles.headerRow}>
        <Text style={styles.eyebrow}>LAWS OF UX</Text>
        <Text style={styles.count}>{position + 1} / {order.length}</Text>
      </View>

      <Pressable style={styles.card} onPress={() => setFlipped((f) => !f)}>
        {!flipped ? (
          <>
            <View style={styles.cardIcon}>
              <LawIcon id={law.id} size={40} color={theme.fg} />
            </View>
            <Text style={styles.cardName}>{law.name}</Text>
            <Text style={styles.tapHint}>TAP TO REVEAL</Text>
          </>
        ) : (
          <>
            <Text style={styles.cardTagline}>{law.tagline}</Text>
            <Text style={styles.cardExplanation}>{law.explanation}</Text>
          </>
        )}
      </Pressable>

      <View style={styles.navRow}>
        <Pressable style={({ pressed }) => [styles.navButton, pressed && styles.navButtonPressed]} onPress={goPrev}>
          <Text style={styles.navButtonText}>‹ PREV</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.navButton, pressed && styles.navButtonPressed]} onPress={goNext}>
          <Text style={styles.navButtonText}>NEXT ›</Text>
        </Pressable>
      </View>

      <Pressable onPress={shuffle} style={styles.shuffle}>
        <Text style={styles.shuffleText}>Shuffle the deck</Text>
      </Pressable>

      <Text style={styles.attribution}>Adapted from lawsofux.com</Text>
    </ScrollView>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 24 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    eyebrow: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 2 },
    count: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12 },
    card: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 4,
      minHeight: 320,
      padding: 24,
      justifyContent: 'center',
    },
    cardIcon: { alignItems: 'center', marginBottom: 16 },
    cardName: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 30, lineHeight: 38, textAlign: 'center' },
    tapHint: {
      color: theme.fgFaint,
      fontFamily: theme.monoFont,
      fontSize: 11,
      letterSpacing: 1,
      textAlign: 'center',
      marginTop: 20,
    },
    cardTagline: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 20, lineHeight: 28, fontStyle: 'italic' },
    cardExplanation: { color: theme.fgDim, fontSize: 15, lineHeight: 22, marginTop: 16 },
    navRow: { flexDirection: 'row', gap: 12, marginTop: 20 },
    navButton: { flex: 1, borderWidth: 1, borderColor: theme.fg, borderRadius: 4, paddingVertical: 16, alignItems: 'center' },
    navButtonPressed: { opacity: 0.6 },
    navButtonText: { color: theme.fg, fontFamily: theme.monoFont, fontSize: 13, letterSpacing: 1 },
    shuffle: { marginTop: 20, alignItems: 'center' },
    shuffleText: { color: theme.fgFaint, fontSize: 13, textDecorationLine: 'underline' },
    attribution: { color: theme.fgFaint, fontSize: 11, textAlign: 'center', marginTop: 24 },
  });
}
