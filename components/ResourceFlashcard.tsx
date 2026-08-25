import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Theme, useTheme } from '../lib/theme';
import { Resource } from '../lib/resources';
import { border, radius, space } from '../lib/tokens';

// A reusable flip-card deck for browsing any "resource" — laws today, more
// resource types later (patterns, heuristics, whatever gets added next).
// Any array shaped like a Resource works; the caller supplies how to render
// the icon and (optionally) a visual example.

export type FlashcardResource = Resource;

function shuffledIndices(length: number): number[] {
  const arr = Array.from({ length }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function ResourceFlashcard({
  items,
  renderIcon,
  renderExample,
  initialIndex = 0,
  label,
  attribution,
  onExit,
}: {
  items: FlashcardResource[];
  renderIcon: (id: string, color: string) => React.ReactNode;
  renderExample?: (id: string, color: string) => React.ReactNode;
  initialIndex?: number;
  label: string | ((item: FlashcardResource) => string);
  attribution?: string | ((item: FlashcardResource) => string | undefined);
  onExit?: () => void;
}) {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const [order, setOrder] = useState<number[]>(() => items.map((_, i) => i));
  const [position, setPosition] = useState(initialIndex);
  const [flipped, setFlipped] = useState(false);

  const item = items[order[position]];
  const resolvedLabel = typeof label === 'function' ? label(item) : label;
  const resolvedAttribution = typeof attribution === 'function' ? attribution(item) : attribution;

  function goNext() {
    setFlipped(false);
    setPosition((p) => (p + 1) % order.length);
  }

  function goPrev() {
    setFlipped(false);
    setPosition((p) => (p - 1 + order.length) % order.length);
  }

  function shuffle() {
    setOrder(shuffledIndices(items.length));
    setPosition(0);
    setFlipped(false);
  }

  return (
    <View>
      {onExit && (
        <Pressable onPress={onExit}>
          <Text style={styles.back}>‹ Back to all</Text>
        </Pressable>
      )}
      <View style={styles.headerRow}>
        <Text style={styles.eyebrow}>{resolvedLabel}</Text>
        <Text style={styles.count}>{position + 1} / {order.length}</Text>
      </View>

      <Pressable style={styles.card} onPress={() => setFlipped((f) => !f)}>
        {!flipped ? (
          <>
            <View style={styles.cardIcon}>{renderIcon(item.id, theme.fg)}</View>
            <Text style={styles.cardName}>{item.name}</Text>
            <Text style={styles.tapHint}>TAP TO REVEAL</Text>
          </>
        ) : (
          <>
            <Text style={styles.cardTagline}>{item.tagline}</Text>
            <Text style={styles.cardExplanation}>{item.explanation}</Text>
            {renderExample && (
              <View style={styles.exampleBox}>
                <Text style={styles.exampleLabel}>VISUAL EXAMPLE</Text>
                {renderExample(item.id, theme.fg)}
              </View>
            )}
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

      {resolvedAttribution && <Text style={styles.attribution}>{resolvedAttribution}</Text>}
    </View>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    back: { color: theme.fgDim, fontSize: 15, marginBottom: space.space16 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: space.space20 },
    eyebrow: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 2 },
    count: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12 },
    card: {
      borderWidth: border.hairline,
      borderColor: theme.border,
      borderRadius: radius.card,
      minHeight: 320,
      padding: space.space24,
      justifyContent: 'center',
    },
    cardIcon: { alignItems: 'center', marginBottom: space.space16 },
    cardName: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 30, lineHeight: 38, textAlign: 'center' },
    tapHint: {
      color: theme.fgFaint,
      fontFamily: theme.monoFont,
      fontSize: 11,
      letterSpacing: 1,
      textAlign: 'center',
      marginTop: space.space20,
    },
    cardTagline: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 20, lineHeight: 28, fontStyle: 'italic' },
    cardExplanation: { color: theme.fgDim, fontSize: 15, lineHeight: 22, marginTop: space.space16 },
    exampleBox: {
      backgroundColor: theme.bgAlt,
      borderRadius: radius.card,
      padding: space.space16,
      marginTop: space.space20,
    },
    exampleLabel: {
      color: theme.fgFaint,
      fontFamily: theme.monoFont,
      fontSize: 10,
      letterSpacing: 2,
      marginBottom: space.space12,
    },
    navRow: { flexDirection: 'row', gap: space.space12, marginTop: space.space20 },
    navButton: { flex: 1, borderWidth: border.hairline, borderColor: theme.fg, borderRadius: radius.card, paddingVertical: space.cardPadding, alignItems: 'center' },
    navButtonPressed: { opacity: 0.6 },
    navButtonText: { color: theme.fg, fontFamily: theme.monoFont, fontSize: 13, letterSpacing: 1 },
    shuffle: { marginTop: space.space20, alignItems: 'center' },
    shuffleText: { color: theme.fgFaint, fontSize: 13, textDecorationLine: 'underline' },
    attribution: { color: theme.fgFaint, fontSize: 11, textAlign: 'center', marginTop: space.space24 },
  });
}
