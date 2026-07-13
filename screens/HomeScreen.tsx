import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppLogo from '../components/AppLogo';
import DesignTypeGlyph from '../components/DesignTypeGlyph';
import AvatarIcon from '../components/AvatarIcon';
import EasterEgg from '../components/EasterEgg';
import LawIcon from '../components/LawIcon';
import LawExample from '../components/LawExample';
import ResourceFlashcard from '../components/ResourceFlashcard';
import SearchIcon from '../components/SearchIcon';
import SearchOverlay from '../components/SearchOverlay';
import { DESIGN_TYPES } from '../lib/designTypes';
import { quoteForToday } from '../lib/designQuotes';
import { ALL_RESOURCES, collectionFor } from '../lib/collections';
import { Resource } from '../lib/resources';
import { RecentItem } from '../lib/storage';
import { Theme, useTheme } from '../lib/theme';
import { GameId, GameStats, Profile } from '../lib/types';
import { space, radius } from '../lib/tokens';

function todaysResourceIndex(): number {
  const dayNumber = Math.floor(Date.now() / 86400000);
  return dayNumber % ALL_RESOURCES.length;
}

export default function HomeScreen({
  profile,
  stats,
  recentItems,
  onSelectResource,
  onSelectGame,
  onFoundEgg,
}: {
  profile: Profile;
  stats: GameStats;
  recentItems: RecentItem[];
  onSelectResource: (item: Resource) => void;
  onSelectGame: (id: GameId) => void;
  onFoundEgg: (id: string) => void;
}) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const designType = DESIGN_TYPES[profile.designTypeId];
  const accuracy = stats.totalPlayed > 0 ? Math.round((stats.totalCorrect / stats.totalPlayed) * 100) : null;
  const quote = quoteForToday();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingTop: insets.top + space.screenTopInset, paddingBottom: insets.bottom + space.space24 }}
      >
        <View style={styles.topRow}>
          <AppLogo onFoundEgg={onFoundEgg} />
          <View style={styles.topRowRight}>
            <Pressable onPress={() => setSearchOpen(true)} hitSlop={8}>
              <SearchIcon size={22} color={theme.fg} />
            </Pressable>
            <AvatarIcon id={profile.avatarId} size={24} color={theme.fg} />
          </View>
        </View>

        <View style={styles.quoteCard}>
          <EasterEgg id="quote-eyebrow" onFound={onFoundEgg}>
            <Text style={styles.quoteEyebrow}>TODAY'S THOUGHt</Text>
          </EasterEgg>
          <Text style={styles.quoteText}>{quote}</Text>
        </View>

        <Text style={styles.eyebrow}>YOUR DESIGN TYPE</Text>
        <View style={styles.typeRow}>
          <DesignTypeGlyph type={profile.designTypeId} size={28} color={theme.fg} />
          <Text style={styles.typeName}>{designType.name}</Text>
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

        <ResourceFlashcard
          items={ALL_RESOURCES}
          initialIndex={todaysResourceIndex()}
          label={(item) => collectionFor(item)?.title ?? 'RESOURCES'}
          attribution={(item) => collectionFor(item)?.attribution}
          renderIcon={(id, color) => <LawIcon id={id} size={40} color={color} />}
          renderExample={(id, color) => <LawExample id={id} color={color} />}
        />
      </ScrollView>

      {searchOpen && (
        <SearchOverlay
          recentItems={recentItems}
          onClose={() => setSearchOpen(false)}
          onSelectResource={(item) => {
            setSearchOpen(false);
            onSelectResource(item);
          }}
          onSelectGame={(id) => {
            setSearchOpen(false);
            onSelectGame(id);
          }}
        />
      )}
    </View>
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
    container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: space.screenPadding },
    quoteCard: {
      backgroundColor: theme.bgAlt,
      borderRadius: radius.card,
      paddingVertical: space.space20,
      paddingHorizontal: space.space20,
      marginBottom: space.sectionGap,
    },
    quoteEyebrow: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 11, letterSpacing: 2, marginBottom: space.space10 },
    quoteText: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 22, lineHeight: 29 },
    topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: space.space20 },
    topRowRight: { flexDirection: 'row', alignItems: 'center', gap: space.space16 },
    eyebrow: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 2, marginBottom: space.space12 },
    typeRow: { flexDirection: 'row', alignItems: 'center', gap: space.space10, marginTop: space.space8 },
    typeName: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 32, lineHeight: 38 },
    tagline: { color: theme.fgDim, fontSize: 15, lineHeight: 21, marginTop: space.space8, fontStyle: 'italic' },
    description: { color: theme.fg, fontSize: 15, lineHeight: 22, marginTop: space.space16 },
    divider: { height: 1, backgroundColor: theme.border, marginVertical: space.sectionGap },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
    stat: { alignItems: 'flex-start' },
    statValue: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 28 },
    statLabel: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 11, letterSpacing: 1, marginTop: space.space4 },
  });
}
