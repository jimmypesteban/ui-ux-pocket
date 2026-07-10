import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimatedPressable from '../components/AnimatedPressable';
import GameIcon, { GameId } from '../components/GameIcon';
import { Theme, useTheme } from '../lib/theme';
import { GameStats } from '../lib/types';
import { hasPlayedToday } from '../lib/challengePicker';
import { border, radius, space } from '../lib/tokens';

export default function GamesScreen({
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
  const playedToday = hasPlayedToday(stats);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top + space.screenTopInset, paddingBottom: insets.bottom + space.space24 }}
    >
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
    <AnimatedPressable
      style={[styles.gameRow, emphasized && styles.gameRowEmphasized]}
      onPress={onPress}
    >
      <GameIcon game={game} size={26} color={theme.fg} />
      <View style={styles.gameText}>
        <Text style={styles.gameTitle}>{title}</Text>
        <Text style={styles.gameSubtitle}>{subtitle}</Text>
      </View>
    </AnimatedPressable>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: space.screenPadding },
    eyebrow: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 2, marginBottom: space.space20 },
    gameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: space.space14,
      borderWidth: border.hairline,
      borderColor: theme.border,
      borderRadius: radius.card,
      paddingVertical: space.cardPadding,
      paddingHorizontal: space.cardPadding,
      marginBottom: space.space12,
    },
    gameRowEmphasized: { borderColor: theme.fg },
    gameText: { flex: 1 },
    gameTitle: { color: theme.fg, fontFamily: theme.monoFont, fontSize: 14, letterSpacing: 1 },
    gameSubtitle: { color: theme.fgFaint, fontSize: 13, marginTop: space.space6 },
  });
}
