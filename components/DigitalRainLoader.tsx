import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useTheme } from '../lib/theme';

// A pure View/Text take on the classic digital-rain shader — no canvas or
// GL available in this Expo Go setup, so each column is a stack of glyphs
// translated top-to-bottom on a loop, brightest at the leading (bottom) edge
// and fading toward the tail. Each pass re-rolls a fresh chain of UX/UI terms
// (rather than replaying the same one), matching how the reference shader
// keeps its characters constantly cycling.

const TERMS = [
  'UX', 'UI', 'CTA', 'GRID', 'FLOW', 'BIAS', 'ICON', 'MODAL', 'FOCUS', 'STATE',
  'TOKEN', 'THEME', 'SKETCH', 'MOCKUP', 'SPRINT', 'SYSTEM', 'LAYOUT', 'CANVAS',
  'OVERLAY', 'TOOLTIP', 'PALETTE', 'PERSONA', 'GESTALT', 'SPACING', 'JOURNEY',
  'BACKLOG', 'EMPATHY', 'HANDOFF', 'KERNING', 'CONTRAST', 'TYPEFACE',
  'DPI', 'PX', 'REM',
];
// Design-spec numbers and measurements — "24PX", "4POINTSYSTEM" (a 4pt spacing
// system spelled out), the kind of value you'd actually see on a redline.
const NUMERIC_TERMS = [
  '4PX', '8PX', '16PX', '24PX', '32PX', '4PT', '8PT', '2X', '0.5X', '1.5X',
  '100VH', '100VW', '60FPS', '999MS', '4POINTSYSTEM', '8POINTGRID', '12COL', '360DEG',
];
// Loose symbol noise — the punctuation-and-math-glyph texture the reference
// shader is full of, mixed in alongside real words and numbers.
const SYMBOLS = ['~', '&', '%', '§', '°', '×', '÷', '≈', '≠', '∞', '≥', '≤', '√', '+', '#', '@'];

function randomToken(): string {
  const roll = Math.random();
  if (roll < 0.55) return TERMS[Math.floor(Math.random() * TERMS.length)];
  if (roll < 0.8) return NUMERIC_TERMS[Math.floor(Math.random() * NUMERIC_TERMS.length)];
  // a short burst of 1-2 symbols
  const count = 1 + Math.floor(Math.random() * 2);
  return Array.from({ length: count }, () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]).join('');
}

const COLUMN_WIDTH = 24;
const CHAR_HEIGHT = 20;

function randomTermLetters() {
  const tokenCount = 2 + Math.floor(Math.random() * 3); // 2-4 tokens chained together
  const letters: string[] = [];
  for (let i = 0; i < tokenCount; i++) {
    letters.push(...randomToken().split(''));
  }
  return letters;
}

const NOISE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('').concat(SYMBOLS);

function randomNoiseChar(): string {
  return NOISE_CHARS[Math.floor(Math.random() * NOISE_CHARS.length)];
}

function RainColumn({
  x,
  screenHeight,
  color,
  fontFamily,
}: {
  x: number;
  screenHeight: number;
  color: string;
  fontFamily: string;
}) {
  const [chars, setChars] = useState(randomTermLetters);
  const [flicker, setFlicker] = useState({ index: -1, char: '' });
  const translateY = useRef(new Animated.Value(-chars.length * CHAR_HEIGHT)).current;
  const initialDelay = useRef(Math.random() * 700).current;

  useEffect(() => {
    // A continuously roaming glitch — one position per column re-rolls to a
    // random noise character every tick, the way the reference shader's
    // glyphs constantly flicker even mid-fall.
    const interval = setInterval(() => {
      setFlicker({ index: Math.floor(Math.random() * chars.length), char: randomNoiseChar() });
    }, 110 + Math.random() * 90);
    return () => clearInterval(interval);
  }, [chars.length]);

  useEffect(() => {
    let cancelled = false;

    function fall() {
      const nextChars = randomTermLetters();
      const stackHeight = nextChars.length * CHAR_HEIGHT;
      const pxPerMs = 0.14 + Math.random() * 0.06; // roughly constant fall speed, slight variance
      const totalDistance = screenHeight + stackHeight * 2; // start (-stackHeight) to end (screenHeight + stackHeight)
      const duration = totalDistance / pxPerMs;

      setChars(nextChars);
      translateY.setValue(-stackHeight);
      Animated.timing(translateY, {
        // Overshoot past the bottom edge by a full stack height so the
        // entire chain — including the dim trailing end — visibly clears
        // the screen instead of stopping short.
        toValue: screenHeight + stackHeight,
        duration,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished && !cancelled) fall();
      });
    }

    const timer = setTimeout(fall, initialDelay);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[styles.column, { left: x, height: screenHeight }]}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {chars.map((c, i) => (
          <Text
            key={i}
            numberOfLines={1}
            style={[
              styles.glyph,
              {
                color,
                fontFamily,
                opacity: i === chars.length - 1 ? 1 : 0.12 + (i / chars.length) * 0.45,
              },
            ]}
          >
            {i === flicker.index ? flicker.char : c}
          </Text>
        ))}
      </Animated.View>
    </View>
  );
}

export default function DigitalRainLoader() {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const columnCount = Math.ceil(width / COLUMN_WIDTH) + 1;

  return (
    <View style={[appStyles.container, { backgroundColor: theme.bg }]}>
      {Array.from({ length: columnCount }, (_, i) => (
        <RainColumn key={i} x={i * COLUMN_WIDTH} screenHeight={height} color={theme.fg} fontFamily={theme.monoFont} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  column: { position: 'absolute', top: 0, width: COLUMN_WIDTH, overflow: 'hidden' },
  glyph: { fontSize: 15, textAlign: 'center', lineHeight: CHAR_HEIGHT },
});

const appStyles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
});
