import { useEffect, useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnimatedPressable from '../components/AnimatedPressable';
import Breadcrumbs from '../components/Breadcrumbs';
import CollectionIcon, { CollectionIconId } from '../components/CollectionIcon';
import EasterEgg from '../components/EasterEgg';
import LawIcon from '../components/LawIcon';
import LawExample from '../components/LawExample';
import { Theme, useTheme } from '../lib/theme';
import { ALL_COLLECTIONS } from '../lib/collections';
import { ReadingRef, Resource, ResourceCollection } from '../lib/resources';
import { border, radius, space } from '../lib/tokens';

// We don't have a verified direct URL for every citation (papers/books
// referenced predate the web, or live behind shifting publisher links), so
// a bare string citation opens a search for its exact text instead of a
// hardcoded link that might 404 or point somewhere wrong. A { label, url }
// ref means we do have a verified direct source — use it as-is.
function readingUrl(ref: ReadingRef): string {
  if (typeof ref === 'string') return `https://www.google.com/search?q=${encodeURIComponent(ref)}`;
  return ref.url;
}

function readingLabel(ref: ReadingRef): string {
  return typeof ref === 'string' ? ref : ref.label;
}

type Nav =
  | { mode: 'menu' }
  | { mode: 'grid'; collectionKey: string }
  | { mode: 'detail'; collectionKey: string; index: number };

export default function LawsScreen({
  jumpTarget,
  onViewResource,
  onFoundEgg,
}: {
  jumpTarget?: { collectionKey: string; index: number; nonce: number } | null;
  onViewResource?: (item: Resource) => void;
  onFoundEgg?: (id: string) => void;
}) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [view, setView] = useState<Nav>({ mode: 'menu' });

  useEffect(() => {
    if (!jumpTarget) return;
    setView({ mode: 'detail', collectionKey: jumpTarget.collectionKey, index: jumpTarget.index });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jumpTarget?.nonce]);

  const collection = view.mode !== 'menu' ? ALL_COLLECTIONS.find((c: ResourceCollection) => c.key === view.collectionKey) ?? null : null;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: insets.top + space.screenTopInset,
        paddingBottom: insets.bottom + space.space24,
      }}
    >
      {view.mode === 'menu' && (
        <View style={styles.menuContainer}>
          <Text style={styles.title}>Laws & Principles</Text>
          {ALL_COLLECTIONS.map((c) => (
            <AnimatedPressable
              key={c.key}
              style={styles.menuCard}
              onPress={() => setView({ mode: 'grid', collectionKey: c.key })}
            >
              <CollectionIcon id={c.key as CollectionIconId} size={36} color={theme.fg} />
              <Text style={styles.menuCardTitle}>{c.title}</Text>
              <Text style={styles.menuCardAttribution}>{c.attribution}</Text>
            </AnimatedPressable>
          ))}
          <View style={styles.comingSoonCard}>
            {onFoundEgg ? (
              <EasterEgg id="coming-soon-typo" onFound={onFoundEgg}>
                <Text style={styles.comingSoonText}>More collections comming soon!</Text>
              </EasterEgg>
            ) : (
              <Text style={styles.comingSoonText}>More collections coming soon!</Text>
            )}
          </View>
        </View>
      )}

      {view.mode === 'grid' && collection && (
        <>
          <Breadcrumbs
            items={[
              { label: 'Laws & Principles', onPress: () => setView({ mode: 'menu' }) },
              { label: collection.breadcrumbLabel },
            ]}
          />
          <Text style={styles.eyebrow}>{collection.title}</Text>
          <View style={styles.grid}>
            {collection.items.map((item, i) => (
              <AnimatedPressable
                key={item.id}
                style={styles.cell}
                onPress={() => setView({ mode: 'detail', collectionKey: collection.key, index: i })}
              >
                <LawIcon id={item.id} size={30} color={theme.fg} />
                <Text style={styles.cellName}>{item.name}</Text>
              </AnimatedPressable>
            ))}
          </View>
          <Text style={styles.attribution}>{collection.attribution}</Text>
        </>
      )}

      {view.mode === 'detail' && collection && (
        <ResourceDetail
          collection={collection}
          index={view.index}
          onChangeIndex={(i) => setView({ mode: 'detail', collectionKey: collection.key, index: i })}
          onGoToMenu={() => setView({ mode: 'menu' })}
          onGoToGrid={() => setView({ mode: 'grid', collectionKey: collection.key })}
          onViewResource={onViewResource}
          styles={styles}
          theme={theme}
        />
      )}
    </ScrollView>
  );
}

function ResourceDetail({
  collection,
  index,
  onChangeIndex,
  onGoToMenu,
  onGoToGrid,
  onViewResource,
  styles,
  theme,
}: {
  collection: ResourceCollection;
  index: number;
  onChangeIndex: (i: number) => void;
  onGoToMenu: () => void;
  onGoToGrid: () => void;
  onViewResource?: (item: Resource) => void;
  styles: ReturnType<typeof makeStyles>;
  theme: Theme;
}) {
  const [jumpOpen, setJumpOpen] = useState(false);
  const items = collection.items;
  const item = items[index];
  const prevIndex = (index - 1 + items.length) % items.length;
  const nextIndex = (index + 1) % items.length;

  useEffect(() => {
    onViewResource?.(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <View>
      <Breadcrumbs
        items={[
          { label: 'Laws & Principles', onPress: onGoToMenu },
          { label: collection.breadcrumbLabel, onPress: onGoToGrid },
        ]}
      />

      <Pressable style={styles.jumpToggle} onPress={() => setJumpOpen((o) => !o)}>
        <Text style={styles.jumpToggleText}>Jump to…</Text>
        <Text style={styles.jumpToggleCaret}>{jumpOpen ? '▲' : '▼'}</Text>
      </Pressable>
      {jumpOpen && (
        <ScrollView style={styles.jumpPanel} nestedScrollEnabled>
          {items.map((it, i) => (
            <Pressable
              key={it.id}
              style={styles.jumpRow}
              onPress={() => {
                onChangeIndex(i);
                setJumpOpen(false);
              }}
            >
              <Text style={[styles.jumpRowText, i === index && styles.jumpRowTextActive]}>{it.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}

      <View style={styles.detailIcon}>
        <LawIcon id={item.id} size={40} color={theme.fg} />
      </View>
      <Text style={styles.detailName}>{item.name}</Text>
      <Text style={styles.detailTagline}>{item.tagline}</Text>
      <Text style={styles.detailExplanation}>{item.explanation}</Text>

      <View style={styles.exampleBox}>
        <Text style={styles.sectionLabel}>VISUAL EXAMPLE</Text>
        <LawExample id={item.id} color={theme.fg} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>ORIGINS</Text>
        <Text style={styles.sectionBody}>{item.origins}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>FURTHER READING</Text>
        {item.furtherReading.map((ref, i) => (
          <Pressable key={i} onPress={() => Linking.openURL(readingUrl(ref))}>
            <Text style={styles.readingItem}>— <Text style={styles.readingItemLink}>{readingLabel(ref)}</Text></Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.divider} />

      <View style={styles.pagerRow}>
        <Pressable style={styles.pagerCell} onPress={() => onChangeIndex(prevIndex)}>
          <Text style={styles.pagerLabel}>‹ PREVIOUS</Text>
          <View style={styles.pagerNameRow}>
            <LawIcon id={items[prevIndex].id} size={18} color={theme.fg} />
            <Text style={styles.pagerName}>{items[prevIndex].name}</Text>
          </View>
        </Pressable>
        <Pressable style={[styles.pagerCell, styles.pagerCellRight]} onPress={() => onChangeIndex(nextIndex)}>
          <Text style={[styles.pagerLabel, styles.pagerLabelRight]}>NEXT ›</Text>
          <View style={[styles.pagerNameRow, styles.pagerNameRowRight]}>
            <Text style={[styles.pagerName, styles.pagerNameRight]}>{items[nextIndex].name}</Text>
            <LawIcon id={items[nextIndex].id} size={18} color={theme.fg} />
          </View>
        </Pressable>
      </View>

      <Pressable onPress={() => Linking.openURL(collection.sourceUrl(item))}>
        <Text style={[styles.attribution, styles.attributionLink]}>{collection.attribution}</Text>
      </Pressable>
    </View>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: space.screenPadding },
    title: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 30, marginBottom: space.space20 },
    menuContainer: { flex: 1 },
    menuCard: {
      borderWidth: border.hairline,
      borderColor: theme.border,
      borderRadius: radius.card,
      paddingHorizontal: space.space20,
      marginBottom: space.space12,
      minHeight: 200,
      alignItems: 'center',
      justifyContent: 'center',
      gap: space.space12,
    },
    menuCardTitle: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 24, textAlign: 'center' },
    menuCardAttribution: { color: theme.fgFaint, fontSize: 13 },
    comingSoonCard: {
      flex: 1,
      minHeight: 160,
      borderWidth: border.hairline,
      borderColor: theme.border,
      borderStyle: 'dashed',
      borderRadius: radius.card,
      alignItems: 'center',
      justifyContent: 'center',
    },
    comingSoonText: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 13, letterSpacing: 0.5 },

    eyebrow: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 12, letterSpacing: 2, marginBottom: space.space20 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: space.space16 },
    cell: {
      width: '48%',
      borderWidth: border.hairline,
      borderColor: theme.border,
      borderRadius: radius.card,
      paddingVertical: space.space20,
      paddingHorizontal: space.space12,
      alignItems: 'center',
      gap: space.space10,
      minHeight: 140,
      justifyContent: 'center',
    },
    cellName: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 16, textAlign: 'center', lineHeight: 20 },
    attribution: { color: theme.fgFaint, fontSize: 11, textAlign: 'center', marginTop: space.space24 },
    attributionLink: { textDecorationLine: 'underline' },

    jumpToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: border.hairline,
      borderColor: theme.border,
      borderRadius: radius.card,
      paddingVertical: space.space12,
      paddingHorizontal: space.space16,
      marginBottom: space.sectionGap,
    },
    jumpToggleText: { color: theme.fg, fontFamily: theme.monoFont, fontSize: 13, letterSpacing: 1 },
    jumpToggleCaret: { color: theme.fgFaint, fontSize: 11 },
    jumpPanel: {
      borderWidth: border.hairline,
      borderColor: theme.border,
      borderRadius: radius.card,
      marginBottom: space.sectionGap,
      maxHeight: 260,
      overflow: 'hidden',
    },
    jumpRow: {
      paddingVertical: space.space12,
      paddingHorizontal: space.space16,
      borderBottomWidth: border.hairline,
      borderBottomColor: theme.border,
    },
    jumpRowText: { color: theme.fgDim, fontFamily: theme.displayFont, fontSize: 15 },
    jumpRowTextActive: { color: theme.fg, fontStyle: 'italic' },
    detailIcon: { alignItems: 'center', marginBottom: space.space16 },
    detailName: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 30, lineHeight: 36, textAlign: 'center' },
    detailTagline: {
      color: theme.fg,
      fontFamily: theme.displayFont,
      fontSize: 18,
      lineHeight: 25,
      fontStyle: 'italic',
      textAlign: 'center',
      marginTop: space.space12,
    },
    detailExplanation: { color: theme.fgDim, fontSize: 15, lineHeight: 22, marginTop: space.space20 },
    exampleBox: {
      backgroundColor: theme.bgAlt,
      borderRadius: radius.card,
      padding: space.space16,
      marginTop: space.sectionGap,
    },
    section: { marginTop: space.sectionGap },
    sectionLabel: {
      color: theme.fgFaint,
      fontFamily: theme.monoFont,
      fontSize: 11,
      letterSpacing: 2,
      marginBottom: space.space12,
    },
    sectionBody: { color: theme.fgDim, fontSize: 15, lineHeight: 22 },
    readingItem: { color: theme.fgDim, fontSize: 14, lineHeight: 21, marginBottom: space.space8 },
    readingItemLink: { textDecorationLine: 'underline' },
    divider: { height: 1, backgroundColor: theme.border, marginTop: space.sectionGap },
    pagerRow: { flexDirection: 'row', marginTop: space.space20, gap: space.space12 },
    pagerCell: { flex: 1 },
    pagerCellRight: { alignItems: 'flex-end' },
    pagerLabel: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 11, letterSpacing: 1, marginBottom: space.space6 },
    pagerLabelRight: { textAlign: 'right' },
    pagerNameRow: { flexDirection: 'row', alignItems: 'center', gap: space.space8 },
    pagerNameRowRight: { flexDirection: 'row-reverse' },
    pagerName: { color: theme.fg, fontFamily: theme.displayFont, fontSize: 16, lineHeight: 21 },
    pagerNameRight: { textAlign: 'right' },
  });
}
