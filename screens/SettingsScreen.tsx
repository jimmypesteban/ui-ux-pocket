import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AnimatedPressable from '../components/AnimatedPressable';
import ColorSlider from '../components/ColorSlider';
import AvatarIcon from '../components/AvatarIcon';
import { AVATAR_IDS, AvatarId } from '../lib/avatars';
import { Theme, useTheme, useThemeMode } from '../lib/theme';
import { border, radius, space } from '../lib/tokens';

function formatHour(hour: number): string {
  const period = hour >= 12 ? 'PM' : 'AM';
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:00 ${period}`;
}

export default function SettingsScreen({
  notificationsEnabled,
  reminderHour,
  avatarId,
  onToggleNotifications,
  onChangeReminderHour,
  onChangeAvatar,
  onRetakeQuiz,
}: {
  notificationsEnabled: boolean;
  reminderHour: number;
  avatarId: AvatarId;
  onToggleNotifications: (enabled: boolean) => void;
  onChangeReminderHour: (hour: number) => void;
  onChangeAvatar: (avatarId: AvatarId) => void;
  onRetakeQuiz: () => void;
}) {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const { mode, toggleMode } = useThemeMode();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingTop: space.subScreenTop, paddingBottom: space.space24 }}>
      <Text style={styles.eyebrow}>APPEARANCE</Text>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>THEME</Text>
        <View style={styles.segmented}>
          <SegmentButton label="DARK" active={mode === 'dark'} onPress={() => mode !== 'dark' && toggleMode()} styles={styles} />
          <SegmentButton label="LIGHT" active={mode === 'light'} onPress={() => mode !== 'light' && toggleMode()} styles={styles} />
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.eyebrow}>DAILY REMINDER</Text>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>NOTIFICATIONS</Text>
        <View style={styles.segmented}>
          <SegmentButton label="ON" active={notificationsEnabled} onPress={() => onToggleNotifications(true)} styles={styles} />
          <SegmentButton label="OFF" active={!notificationsEnabled} onPress={() => onToggleNotifications(false)} styles={styles} />
        </View>
      </View>

      {notificationsEnabled && (
        <View style={styles.sliderWrap}>
          <ColorSlider
            label={`REMINDER TIME — ${formatHour(reminderHour)}`}
            value={reminderHour}
            min={0}
            max={23}
            onChange={onChangeReminderHour}
          />
        </View>
      )}

      <View style={styles.divider} />

      <Text style={styles.eyebrow}>ACCOUNT</Text>
      <Text style={styles.rowLabel}>AVATAR</Text>
      <View style={styles.avatarGrid}>
        {AVATAR_IDS.map((id) => (
          <AnimatedPressable
            key={id}
            onPress={() => onChangeAvatar(id)}
            style={[styles.avatarSlot, avatarId === id && styles.avatarSlotActive]}
          >
            <AvatarIcon id={id} size={40} color={theme.fg} />
          </AnimatedPressable>
        ))}
      </View>

      <AnimatedPressable onPress={onRetakeQuiz} style={styles.retake}>
        <Text style={styles.retakeText}>Retake the quiz</Text>
      </AnimatedPressable>

      <View style={styles.divider} />
      <Text style={styles.footer}>UI/UX Pocket · v1.0.0</Text>
    </ScrollView>
  );
}

function SegmentButton({
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
    <AnimatedPressable onPress={onPress} style={[styles.segmentButton, active && styles.segmentButtonActive]}>
      <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{label}</Text>
    </AnimatedPressable>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: space.screenPadding },
    eyebrow: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 2, marginBottom: space.space14 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: space.space8 },
    rowLabel: { color: theme.fg, fontFamily: theme.monoFont, fontSize: 13, letterSpacing: 1 },
    segmented: { flexDirection: 'row', borderWidth: border.hairline, borderColor: theme.border, borderRadius: radius.card, overflow: 'hidden' },
    segmentButton: { paddingVertical: space.space8, paddingHorizontal: space.space14 },
    segmentButtonActive: { backgroundColor: theme.fg },
    segmentText: { color: theme.fgDim, fontFamily: theme.monoFont, fontSize: 11, letterSpacing: 1 },
    segmentTextActive: { color: theme.bg },
    sliderWrap: { marginTop: space.space20 },
    avatarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: space.space12, marginTop: space.space12, marginBottom: space.space24 },
    avatarSlot: {
      width: 56,
      height: 56,
      borderRadius: 28,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: border.hairline,
      borderColor: 'transparent',
    },
    avatarSlotActive: { borderColor: theme.fg },
    divider: { height: 1, backgroundColor: theme.border, marginVertical: space.sectionGap },
    retake: { alignItems: 'flex-start' },
    retakeText: { color: theme.fgDim, fontSize: 15, textDecorationLine: 'underline' },
    footer: { color: theme.fgFaint, fontSize: 12, textAlign: 'center' },
  });
}
