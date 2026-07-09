import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DesignTypeGlyph from '../components/DesignTypeGlyph';
import AvatarIcon from '../components/AvatarIcon';
import GameIcon, { GameId } from '../components/GameIcon';
import { DESIGN_TYPES } from '../lib/designTypes';
import { quoteForToday } from '../lib/designQuotes';
import { Theme, useTheme } from '../lib/theme';
import { GameStats, Profile } from '../lib/types';
import { hasPlayedToday } from '../lib/challengePicker';

export default function HomeScreen({
  profile,
  stats,
  colorBest,
  contrastBest,
  alignmentBest,
  kerningBest,
  pixelMatchBest,
  centerBest,
  typeOrderBest,
  onPlay,
  onPlayColorGame,
  onPlayContrastGame,
  onPlayAlignmentGame,
  onPlayKerningGame,
  onPlayPixelMatchGame,
  onPlayCenterGame,
  onPlayTypeOrderGame,
}: {
  profile: Profile;
  stats: GameStats;
  colorBest: number | null;
  contrastBest: number | null;
  alignmentBest: number | null;
  kerningBest: number | null;
  pixelMatchBest: number | null;
  centerBest: number | null;
  typeOrderBest: number | null;
  onPlay: () => void;
  onPlayColorGame: () => void;
  onPlayContrastGame: () => void;
  onPlayAlignmentGame: () => void;
  onPlayKerningGame: () => void;
  onPlayPixelMatchGame: () => void;
  onPlayCenterGame: () => void;
  onPlayTypeOrderGame: () => void;
}) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const designType = DESIGN_TYPES[profile.designTypeId];
  const playedToday = hasPlayedToday(stats);
  const accuracy = stats.totalPlayed > 0 ? Math.round((stats.totalCorrect / stats.totalPlayed) * 100) : null;
  const quote = quoteForToday();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }}
    >
      <View style={styles.quoteCard}>
        <Text style={styles.quoteEyebrow}>TODAY'S THOUGHT</Text>
        <Text style={styles.quoteText}>{quote}</Text>
      </View>

      <View style={styles.headerRow}>
        <AvatarIcon id={profile.avatarId} size={40} color={theme.fg} />
        <View style={styles.headerText}>
          <Text style={styles.eyebrow}>YOUR DESIGN TYPE</Text>
          <View style={styles.typeRow}>
            <DesignTypeGlyph type={profile.designTypeId} size={28} color={theme.fg} />
            <Text style={styles.typeName}>{designType.name}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.tagline}>{designType.tagline}</Text>
      <Text style={styles.description}>{designType.description}</Text>

      <View style={styles.divider} />

      <View style={styles.statsRow}>
        <Stat label="STREAK" value={`${stats.streak}`} />
        <Stat label="BEST" value={`${stats.bestStreak}`} />
        <Stat label="ACCURACY" value={accuracy === null ? '—' : `${accuracy}%`} />
      </View>

      <View style={styles.divider} />

      <Text style={styles.eyebrow}>GAMES</Text>

      <GameRow
        game="judgment"
        title="TODAY'S JUDGMENT CALL"
        subtitle={playedToday ? 'Played — come back tomorrow' : 'One A/B call a day'}
        onPress={onPlay}
        emphasized
      />
      <GameRow
        game="color"
        title="COLOR RECALL"
        subtitle={colorBest === null ? 'Not played yet' : `Best: ${colorBest.toFixed(1)} / 50`}
        onPress={onPlayColorGame}
      />
      <GameRow
        game="contrast"
        title="CONTRAST CALL"
        subtitle={contrastBest === null ? 'Not played yet' : `Best: ${contrastBest.toFixed(1)} / 50`}
        onPress={onPlayContrastGame}
      />
      <GameRow
        game="alignment"
        title="SPOT THE ODD ONE"
        subtitle={alignmentBest === null ? 'Not played yet' : `Best: ${alignmentBest.toFixed(0)} / 50`}
        onPress={onPlayAlignmentGame}
      />
      <GameRow
        game="kerning"
        title="KERNING CALL"
        subtitle={kerningBest === null ? 'Not played yet' : `Best: ${kerningBest.toFixed(1)} / 50`}
        onPress={onPlayKerningGame}
      />
      <GameRow
        game="pixelmatch"
        title="PIXEL MATCH"
        subtitle={pixelMatchBest === null ? 'Not played yet' : `Best: ${pixelMatchBest.toFixed(1)} / 50`}
        onPress={onPlayPixelMatchGame}
      />
      <GameRow
        game="center"
        title="DEAD CENTER"
        subtitle={centerBest === null ? 'Not played yet' : `Best: ${centerBest.toFixed(0)} / 8`}
        onPress={onPlayCenterGame}
      />
      <GameRow
        game="typeorder"
        title="TYPE ORDER"
        subtitle={typeOrderBest === null ? 'Not played yet' : `Best: ${typeOrderBest.toFixed(0)} / 50`}
        onPress={onPlayTypeOrderGame}
      />
    </ScrollView>
  );
}

function GameRow({
  game,
  title,
  subtitle,
  onPress,
  emphasized,
}: {
  game: GameId;
  title: string;
  subtitle: string;
  onPress: () => void;
  emphasized?: boolean;
}) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <Pressable
      style={({ pressed }) => [
        styles.gameRow,
        emphasized && styles.gameRowEmphasized,
        pressed && styles.gameRowPressed,
      ]}
      onPress={onPress}
    >
      <GameIcon game={game} size={26} color={theme.fg} />
      <View style={styles.gameText}>
        <Text style={styles.gameTitle}>{title}</Text>
        <Text style={styles.gameSubtitle}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  const theme = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 24 },
    quoteCard: {
      backgroundColor: theme.bgAlt,
      borderRadius: 4,
      paddingVertical: 20,
      paddingHorizontal: 20,
      marginBottom: 28,
    },
    quoteEyebrow: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 11, letterSpacing: 2, marginBottom: 10 },
    quoteText: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 22, lineHeight: 29 },
    headerRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 14 },
    headerText: { flex: 1 },
    eyebrow: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 2, marginBottom: 12 },
    typeRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 },
    typeName: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 32, lineHeight: 38 },
    tagline: { color: theme.fgDim, fontSize: 15, lineHeight: 21, marginTop: 8, fontStyle: 'italic' },
    description: { color: theme.fg, fontSize: 15, lineHeight: 22, marginTop: 16 },
    divider: { height: 1, backgroundColor: theme.border, marginVertical: 28 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
    stat: { alignItems: 'flex-start' },
    statValue: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 28 },
    statLabel: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 11, letterSpacing: 1, marginTop: 4 },
    gameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 4,
      paddingVertical: 16,
      paddingHorizontal: 16,
      marginBottom: 12,
    },
    gameRowEmphasized: { borderColor: theme.fg },
    gameRowPressed: { opacity: 0.6 },
    gameText: { flex: 1 },
    gameTitle: { color: theme.fg, fontFamily: theme.monoFont, fontSize: 14, letterSpacing: 1 },
    gameSubtitle: { color: theme.fgFaint, fontSize: 13, marginTop: 6 },
  });
}
