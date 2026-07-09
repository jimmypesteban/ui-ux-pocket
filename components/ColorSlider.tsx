import { useMemo, useRef, useState } from 'react';
import { PanResponder, StyleSheet, Text, View } from 'react-native';
import { Theme, useTheme } from '../lib/theme';

export default function ColorSlider({
  label,
  value,
  min,
  max,
  onChange,
  trackBackground,
  hideValue,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  trackBackground?: string;
  hideValue?: boolean;
}) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const trackRef = useRef<View>(null);
  const trackWidthRef = useRef(0);
  const trackPageXRef = useRef(0);
  const [, forceRender] = useState(0);

  function measureTrack() {
    trackRef.current?.measure((_x, _y, w, _h, pageX) => {
      trackWidthRef.current = w;
      trackPageXRef.current = pageX;
    });
  }

  function updateFromPageX(pageX: number) {
    if (trackWidthRef.current <= 0) return;
    const x = pageX - trackPageXRef.current;
    const pct = Math.max(0, Math.min(1, x / trackWidthRef.current));
    onChange(Math.round(min + pct * (max - min)));
  }

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (e) => {
          measureTrack();
          updateFromPageX(e.nativeEvent.pageX);
        },
        onPanResponderMove: (e) => {
          updateFromPageX(e.nativeEvent.pageX);
        },
      }),
    [min, max]
  );

  const pct = ((value - min) / (max - min)) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {!hideValue && <Text style={styles.value}>{Math.round(value)}</Text>}
      </View>
      <View
        ref={trackRef}
        style={[styles.track, trackBackground ? { backgroundColor: trackBackground } : null]}
        onLayout={() => {
          measureTrack();
          forceRender((n) => n + 1);
        }}
        {...panResponder.panHandlers}
      >
        {!trackBackground && <View style={[styles.fill, { width: `${pct}%` }]} />}
        <View style={[styles.thumb, { left: `${Math.max(0, Math.min(96, pct))}%` }]} />
      </View>
    </View>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: { marginBottom: 22 },
    labelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    label: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 11, letterSpacing: 1 },
    value: { color: theme.fgDim, fontFamily: theme.monoFont, fontSize: 11 },
    track: {
      height: 32,
      borderRadius: 4,
      backgroundColor: theme.bgAlt,
      borderWidth: 1,
      borderColor: theme.border,
      justifyContent: 'center',
    },
    fill: { position: 'absolute', left: 0, top: 0, bottom: 0, backgroundColor: theme.fgFaint, borderRadius: 4 },
    thumb: {
      position: 'absolute',
      width: 4,
      height: 32,
      backgroundColor: theme.fg,
      top: 0,
    },
  });
}
