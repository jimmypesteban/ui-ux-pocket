import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LawIcon from './LawIcon';
import GameIcon from './GameIcon';
import { ALL_RESOURCES, collectionFor } from '../lib/collections';
import { GAME_LABELS } from '../lib/gameMeta';
import { Resource } from '../lib/resources';
import { RecentItem } from '../lib/storage';
import { GameId } from '../lib/types';
import { Theme, useTheme } from '../lib/theme';
import { border, radius, space } from '../lib/tokens';

type ResourceHit = { kind: 'resource'; item: Resource };
type GameHit = { kind: 'game'; id: GameId };
type Hit = ResourceHit | GameHit;

const ALL_GAME_IDS = Object.keys(GAME_LABELS) as GameId[];
const RESOURCE_BY_ID = new Map(ALL_RESOURCES.map((r) => [r.id, r]));

function resolveRecent(recentItems: RecentItem[]): Hit[] {
  return recentItems
    .map((r): Hit | null => {
      if (r.kind === 'game') return { kind: 'game', id: r.id };
      const item = RESOURCE_BY_ID.get(r.id);
      return item ? { kind: 'resource', item } : null;
    })
    .filter((h): h is Hit => h !== null);
}

export default function SearchOverlay({
  recentItems,
  onClose,
  onSelectResource,
  onSelectGame,
}: {
  recentItems: RecentItem[];
  onClose: () => void;
  onSelectResource: (item: Resource) => void;
  onSelectGame: (id: GameId) => void;
}) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const [query, setQuery] = useState('');

  const hits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const resourceHits: ResourceHit[] = ALL_RESOURCES.filter(
      (r) => r.name.toLowerCase().includes(q) || r.tagline.toLowerCase().includes(q)
    ).map((item) => ({ kind: 'resource', item }));

    const gameHits: GameHit[] = ALL_GAME_IDS.filter((id) => GAME_LABELS[id].toLowerCase().includes(q)).map((id) => ({
      kind: 'game',
      id,
    }));

    const startsWith = (h: Hit) => {
      const label = h.kind === 'resource' ? h.item.name : GAME_LABELS[h.id];
      return label.toLowerCase().startsWith(q);
    };

    const all: Hit[] = [...gameHits, ...resourceHits];
    all.sort((a, b) => Number(startsWith(b)) - Number(startsWith(a)));
    return all.slice(0, 30);
  }, [query]);

  const recentHits = useMemo(() => resolveRecent(recentItems), [recentItems]);
  const showingRecent = query.trim().length === 0;
  const list = showingRecent ? recentHits : hits;

  function renderHit(hit: Hit, i: number) {
    if (hit.kind === 'resource') {
      return (
        <Pressable key={`r-${hit.item.id}-${i}`} style={styles.row} onPress={() => onSelectResource(hit.item)}>
          <LawIcon id={hit.item.id} size={26} color={theme.fg} />
          <View style={styles.rowText}>
            <Text style={styles.rowName}>{hit.item.name}</Text>
            <Text style={styles.rowMeta}>{collectionFor(hit.item)?.breadcrumbLabel ?? 'Resource'}</Text>
          </View>
        </Pressable>
      );
    }
    return (
      <Pressable key={`g-${hit.id}`} style={styles.row} onPress={() => onSelectGame(hit.id)}>
        <GameIcon game={hit.id} size={26} color={theme.fg} />
        <View style={styles.rowText}>
          <Text style={styles.rowName}>{GAME_LABELS[hit.id]}</Text>
          <Text style={styles.rowMeta}>Game</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={[styles.overlay, { paddingTop: insets.top + space.space16 }]}>
      <View style={styles.headerRow}>
        <TextInput
          autoFocus
          value={query}
          onChangeText={setQuery}
          placeholder="Search laws, biases, games…"
          placeholderTextColor={theme.fgFaint}
          style={styles.input}
        />
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </Pressable>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: insets.bottom + space.space24 }}>
        {showingRecent && recentHits.length > 0 && <Text style={styles.sectionLabel}>RECENTLY VIEWED</Text>}
        {showingRecent && recentHits.length === 0 && (
          <Text style={styles.hint}>Try a name — a law, a bias, a process, or a game.</Text>
        )}
        {!showingRecent && hits.length === 0 && <Text style={styles.hint}>No matches for "{query}".</Text>}

        {list.map(renderHit)}
      </ScrollView>
    </View>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.bg,
      paddingHorizontal: space.screenPadding,
      zIndex: 100,
    },
    headerRow: { flexDirection: 'row', alignItems: 'center', gap: space.space12, marginBottom: space.sectionGap },
    input: {
      flex: 1,
      borderWidth: border.hairline,
      borderColor: theme.border,
      borderRadius: radius.card,
      paddingVertical: space.space12,
      paddingHorizontal: space.space16,
      color: theme.fg,
      fontSize: 16,
    },
    closeButton: { padding: space.space8 },
    closeText: { color: theme.fgDim, fontSize: 20 },
    hint: { color: theme.fgFaint, fontSize: 14, marginTop: space.space16 },
    sectionLabel: {
      color: theme.fgFaint,
      fontFamily: theme.monoFont,
      fontSize: 11,
      letterSpacing: 2,
      marginBottom: space.space12,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: space.rowGap,
      paddingVertical: space.space14,
      borderBottomWidth: border.hairline,
      borderBottomColor: theme.border,
    },
    rowText: { flex: 1 },
    rowName: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 17 },
    rowMeta: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 11, letterSpacing: 1, marginTop: space.space4 },
  });
}
