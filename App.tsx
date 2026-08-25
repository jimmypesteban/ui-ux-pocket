import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FadeIn from './components/FadeIn';

import { useTheme, useThemeMode } from './lib/theme';
import ThemeProvider from './lib/ThemeProvider';
import { AvatarId } from './lib/avatars';
import { collectionFor } from './lib/collections';
import { Resource } from './lib/resources';
import { GameId, GameLogEntry, GameStats, JudgmentChallenge, Profile } from './lib/types';
import {
  loadProfile,
  loadStats,
  saveProfile,
  saveStats,
  clearProfile,
  loadColorBest,
  saveColorBest,
  loadContrastBest,
  saveContrastBest,
  loadAlignmentBest,
  saveAlignmentBest,
  loadKerningBest,
  saveKerningBest,
  loadPixelMatchBest,
  savePixelMatchBest,
  loadCenterBest,
  saveCenterBest,
  loadTypeOrderBest,
  saveTypeOrderBest,
  loadReminderHour,
  saveReminderHour,
  loadNotificationsEnabled,
  saveNotificationsEnabled,
  loadGameLog,
  appendGameLogEntry,
  loadRecentItems,
  pushRecentItem,
  RecentItem,
  loadActiveMs,
  addActiveMs,
  loadFoundEggs,
  markEggFound,
  loadFavoriteResourceIds,
  toggleFavoriteResource,
  loadResourceNotes,
  saveResourceNote,
  loadViewedResourceIds,
  markResourceViewed,
} from './lib/storage';
import { pickTodaysChallenge } from './lib/challengePicker';
import { recordAnswer } from './lib/gameLogic';
import { todayKey } from './lib/date';
import { ensureDailyReminderScheduled, cancelDailyReminder } from './lib/notifications';
import DigitalRainLoader from './components/DigitalRainLoader';
import OnboardingQuiz from './screens/OnboardingQuiz';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import ColorGameScreen from './screens/ColorGameScreen';
import ContrastGameScreen from './screens/ContrastGameScreen';
import AlignmentGameScreen from './screens/AlignmentGameScreen';
import KerningGameScreen from './screens/KerningGameScreen';
import PixelMatchGameScreen from './screens/PixelMatchGameScreen';
import CenterGameScreen from './screens/CenterGameScreen';
import TypeOrderGameScreen from './screens/TypeOrderGameScreen';
import TypesScreen from './screens/TypesScreen';
import LawsScreen from './screens/LawsScreen';
import GamesScreen from './screens/GamesScreen';
import ProfileScreen from './screens/ProfileScreen';
import TabBar, { TabKey } from './components/TabBar';

type Screen =
  | 'loading'
  | 'quiz'
  | 'main'
  | 'game'
  | 'colorgame'
  | 'contrastgame'
  | 'alignmentgame'
  | 'kerninggame'
  | 'pixelmatchgame'
  | 'centergame'
  | 'typeordergame';

const GAME_VIEW_BY_ID: Partial<Record<GameId, Screen>> = {
  color: 'colorgame',
  contrast: 'contrastgame',
  alignment: 'alignmentgame',
  kerning: 'kerninggame',
  pixelmatch: 'pixelmatchgame',
  center: 'centergame',
  typeorder: 'typeordergame',
};

function RootScreen() {
  const theme = useTheme();
  const [view, setView] = useState<Screen>('loading');
  const [tab, setTab] = useState<TabKey>('home');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<GameStats | null>(null);
  const [activeChallenge, setActiveChallenge] = useState<JudgmentChallenge | null>(null);
  const [colorBest, setColorBest] = useState<number | null>(null);
  const [contrastBest, setContrastBest] = useState<number | null>(null);
  const [alignmentBest, setAlignmentBest] = useState<number | null>(null);
  const [kerningBest, setKerningBest] = useState<number | null>(null);
  const [pixelMatchBest, setPixelMatchBest] = useState<number | null>(null);
  const [centerBest, setCenterBest] = useState<number | null>(null);
  const [typeOrderBest, setTypeOrderBest] = useState<number | null>(null);
  const [reminderHour, setReminderHour] = useState(9);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [gameLog, setGameLog] = useState<GameLogEntry[]>([]);
  const [lawsJump, setLawsJump] = useState<{ collectionKey: string; index: number; nonce: number } | null>(null);
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [totalActiveMs, setTotalActiveMs] = useState(0);
  const [foundEggs, setFoundEggs] = useState<string[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [resourceNotes, setResourceNotes] = useState<Record<string, string>>({});
  const [viewedResourceIds, setViewedResourceIds] = useState<string[]>([]);
  const [minLoadTimeElapsed, setMinLoadTimeElapsed] = useState(false);
  const activeMsRef = useRef({ lastTick: 0, isActive: true });

  useEffect(() => {
    const timer = setTimeout(() => setMinLoadTimeElapsed(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    Promise.all([
      loadProfile(),
      loadStats(),
      loadColorBest(),
      loadContrastBest(),
      loadAlignmentBest(),
      loadKerningBest(),
      loadPixelMatchBest(),
      loadCenterBest(),
      loadTypeOrderBest(),
      loadReminderHour(),
      loadNotificationsEnabled(),
      loadGameLog(),
      loadRecentItems(),
      loadActiveMs(),
      loadFoundEggs(),
      loadFavoriteResourceIds(),
      loadResourceNotes(),
      loadViewedResourceIds(),
    ]).then(([p, s, cb, kb, ab, keb, pmb, ceb, tob, rh, ne, log, recent, activeMs, eggs, favorites, notes, viewed]) => {
      setProfile(p);
      setStats(s);
      setColorBest(cb);
      setContrastBest(kb);
      setAlignmentBest(ab);
      setKerningBest(keb);
      setPixelMatchBest(pmb);
      setCenterBest(ceb);
      setTypeOrderBest(tob);
      setReminderHour(rh);
      setNotificationsEnabled(ne);
      setGameLog(log);
      setRecentItems(recent);
      setTotalActiveMs(activeMs);
      setFoundEggs(eggs);
      setFavoriteIds(favorites);
      setResourceNotes(notes);
      setViewedResourceIds(viewed);
      setView(p ? 'main' : 'quiz');
      if (p && ne) ensureDailyReminderScheduled(rh);
    });
  }, []);

  useEffect(() => {
    activeMsRef.current.lastTick = Date.now();

    const flush = async () => {
      if (!activeMsRef.current.isActive) return;
      const now = Date.now();
      const delta = now - activeMsRef.current.lastTick;
      activeMsRef.current.lastTick = now;
      if (delta > 0) {
        const updated = await addActiveMs(delta);
        setTotalActiveMs(updated);
      }
    };

    const interval = setInterval(flush, 20000);
    const subscription = AppState.addEventListener('change', (state) => {
      flush();
      activeMsRef.current.isActive = state === 'active';
      activeMsRef.current.lastTick = Date.now();
    });

    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, []);

  const handleFoundEgg = useCallback(async (id: string) => {
    const updated = await markEggFound(id);
    setFoundEggs(updated);
  }, []);

  const handleToggleFavorite = useCallback(async (id: string) => {
    const updated = await toggleFavoriteResource(id);
    setFavoriteIds(updated);
  }, []);

  async function logGame(game: GameLogEntry['game'], score: number, maxScore: number) {
    const updated = await appendGameLogEntry({ game, date: todayKey(), score, maxScore });
    setGameLog(updated);
  }

  const recordRecent = useCallback(async (item: RecentItem) => {
    const updated = await pushRecentItem(item);
    setRecentItems(updated);
  }, []);

  async function handleQuizComplete(newProfile: Profile) {
    await saveProfile(newProfile);
    setProfile(newProfile);
    setTab('home');
    setView('main');
    ensureDailyReminderScheduled();
  }

  const handlePlay = useCallback(() => {
    if (!stats) return;
    setActiveChallenge(pickTodaysChallenge(stats));
    setView('game');
  }, [stats]);

  const handleSelectResource = useCallback((item: Resource) => {
    const collection = collectionFor(item);
    if (!collection) return;
    const index = collection.items.indexOf(item);
    setLawsJump((prev) => ({ collectionKey: collection.key, index, nonce: (prev?.nonce ?? 0) + 1 }));
    setTab('laws');
  }, []);

  const handleViewResource = useCallback(
    (item: Resource) => {
      recordRecent({ kind: 'resource', id: item.id });
      markResourceViewed(item.id).then(setViewedResourceIds);
    },
    [recordRecent],
  );

  const handleSaveNote = useCallback(async (id: string, text: string) => {
    const updated = await saveResourceNote(id, text);
    setResourceNotes(updated);
  }, []);

  const goToGame = useCallback(
    (id: GameId) => {
      recordRecent({ kind: 'game', id });
      if (id === 'judgment') {
        handlePlay();
        return;
      }
      const target = GAME_VIEW_BY_ID[id];
      if (target) setView(target);
    },
    [recordRecent, handlePlay],
  );

  // Stable per-game callbacks so GamesScreen's memo isn't defeated by inline arrows.
  const playGame = useMemo(
    () => ({
      judgment: () => goToGame('judgment'),
      color: () => goToGame('color'),
      contrast: () => goToGame('contrast'),
      alignment: () => goToGame('alignment'),
      kerning: () => goToGame('kerning'),
      pixelmatch: () => goToGame('pixelmatch'),
      center: () => goToGame('center'),
      typeorder: () => goToGame('typeorder'),
    }),
    [goToGame],
  );

  async function handleGameFinish(chosen: 'A' | 'B', wasCorrect: boolean) {
    if (!stats || !activeChallenge) return;
    const updated = recordAnswer(stats, activeChallenge.id, chosen, wasCorrect);
    await saveStats(updated);
    setStats(updated);
    setActiveChallenge(null);
    setView('main');
  }

  async function handleColorGameFinish(score: number) {
    await logGame('color', score, 50);
    if (colorBest === null || score > colorBest) {
      await saveColorBest(score);
      setColorBest(score);
    }
  }

  async function handleContrastGameFinish(score: number) {
    await logGame('contrast', score, 50);
    if (contrastBest === null || score > contrastBest) {
      await saveContrastBest(score);
      setContrastBest(score);
    }
  }

  async function handleAlignmentGameFinish(score: number) {
    await logGame('alignment', score, 50);
    if (alignmentBest === null || score > alignmentBest) {
      await saveAlignmentBest(score);
      setAlignmentBest(score);
    }
  }

  async function handleKerningGameFinish(score: number) {
    await logGame('kerning', score, 50);
    if (kerningBest === null || score > kerningBest) {
      await saveKerningBest(score);
      setKerningBest(score);
    }
  }

  async function handlePixelMatchGameFinish(score: number) {
    await logGame('pixelmatch', score, 50);
    if (pixelMatchBest === null || score > pixelMatchBest) {
      await savePixelMatchBest(score);
      setPixelMatchBest(score);
    }
  }

  async function handleCenterGameFinish(score: number) {
    await logGame('center', score, 8);
    if (centerBest === null || score > centerBest) {
      await saveCenterBest(score);
      setCenterBest(score);
    }
  }

  async function handleTypeOrderGameFinish(score: number) {
    await logGame('typeorder', score, 50);
    if (typeOrderBest === null || score > typeOrderBest) {
      await saveTypeOrderBest(score);
      setTypeOrderBest(score);
    }
  }

  const handleRetakeQuiz = useCallback(async () => {
    await clearProfile();
    await cancelDailyReminder();
    setProfile(null);
    setView('quiz');
  }, []);

  const handleToggleNotifications = useCallback(
    async (enabled: boolean) => {
      setNotificationsEnabled(enabled);
      await saveNotificationsEnabled(enabled);
      if (enabled) {
        await ensureDailyReminderScheduled(reminderHour);
      } else {
        await cancelDailyReminder();
      }
    },
    [reminderHour],
  );

  const handleChangeReminderHour = useCallback(
    async (hour: number) => {
      setReminderHour(hour);
      await saveReminderHour(hour);
      if (notificationsEnabled) {
        await ensureDailyReminderScheduled(hour);
      }
    },
    [notificationsEnabled],
  );

  const handleChangeAvatar = useCallback(
    async (avatarId: AvatarId) => {
      if (!profile) return;
      const updated = { ...profile, avatarId };
      await saveProfile(updated);
      setProfile(updated);
    },
    [profile],
  );

  if (view === 'loading' || !stats || !minLoadTimeElapsed) {
    return <DigitalRainLoader />;
  }

  if (view === 'quiz') {
    return (
      <FadeIn key="quiz" style={styles.content} duration={220}>
        <OnboardingQuiz onComplete={handleQuizComplete} />
      </FadeIn>
    );
  }

  if (view === 'game' && activeChallenge) {
    return (
      <GameScreen
        challenge={activeChallenge}
        onFinish={handleGameFinish}
        onBack={() => setView('main')}
      />
    );
  }

  if (view === 'colorgame') {
    return (
      <ColorGameScreen
        bestScore={colorBest}
        onFinish={handleColorGameFinish}
        onBack={() => setView('main')}
      />
    );
  }

  if (view === 'contrastgame') {
    return (
      <ContrastGameScreen
        bestScore={contrastBest}
        onFinish={handleContrastGameFinish}
        onBack={() => setView('main')}
      />
    );
  }

  if (view === 'alignmentgame') {
    return (
      <AlignmentGameScreen
        bestScore={alignmentBest}
        onFinish={handleAlignmentGameFinish}
        onBack={() => setView('main')}
      />
    );
  }

  if (view === 'kerninggame') {
    return (
      <KerningGameScreen
        bestScore={kerningBest}
        onFinish={handleKerningGameFinish}
        onBack={() => setView('main')}
      />
    );
  }

  if (view === 'pixelmatchgame') {
    return (
      <PixelMatchGameScreen
        bestScore={pixelMatchBest}
        onFinish={handlePixelMatchGameFinish}
        onBack={() => setView('main')}
      />
    );
  }

  if (view === 'centergame') {
    return (
      <CenterGameScreen
        bestScore={centerBest}
        onFinish={handleCenterGameFinish}
        onBack={() => setView('main')}
        onFoundEgg={handleFoundEgg}
      />
    );
  }

  if (view === 'typeordergame') {
    return (
      <TypeOrderGameScreen
        bestScore={typeOrderBest}
        onFinish={handleTypeOrderGameFinish}
        onBack={() => setView('main')}
      />
    );
  }

  if (!profile) {
    return <View style={[styles.container, { backgroundColor: theme.bg }]} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <FadeIn key={tab} style={styles.content}>
        {tab === 'home' && (
          <HomeScreen
            profile={profile}
            stats={stats}
            recentItems={recentItems}
            onSelectResource={handleSelectResource}
            onSelectGame={goToGame}
            onFoundEgg={handleFoundEgg}
          />
        )}
        {tab === 'games' && (
          <GamesScreen
            stats={stats}
            colorBest={colorBest}
            contrastBest={contrastBest}
            alignmentBest={alignmentBest}
            kerningBest={kerningBest}
            pixelMatchBest={pixelMatchBest}
            centerBest={centerBest}
            typeOrderBest={typeOrderBest}
            onPlay={playGame.judgment}
            onPlayColorGame={playGame.color}
            onPlayContrastGame={playGame.contrast}
            onPlayAlignmentGame={playGame.alignment}
            onPlayKerningGame={playGame.kerning}
            onPlayPixelMatchGame={playGame.pixelmatch}
            onPlayCenterGame={playGame.center}
            onPlayTypeOrderGame={playGame.typeorder}
          />
        )}
        {tab === 'laws' && (
          <LawsScreen
            jumpTarget={lawsJump}
            onViewResource={handleViewResource}
            onFoundEgg={handleFoundEgg}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
            resourceNotes={resourceNotes}
            onSaveNote={handleSaveNote}
          />
        )}
        {tab === 'explore' && <TypesScreen yourType={profile.designTypeId} />}
        {tab === 'profile' && (
          <ProfileScreen
            stats={stats}
            gameLog={gameLog}
            totalActiveMs={totalActiveMs}
            foundEggCount={foundEggs.length}
            viewedResourceCount={viewedResourceIds.length}
            onFoundEgg={handleFoundEgg}
            avatarId={profile.avatarId}
            notificationsEnabled={notificationsEnabled}
            reminderHour={reminderHour}
            onToggleNotifications={handleToggleNotifications}
            onChangeReminderHour={handleChangeReminderHour}
            onChangeAvatar={handleChangeAvatar}
            onRetakeQuiz={handleRetakeQuiz}
          />
        )}
      </FadeIn>
      <TabBar active={tab} onChange={setTab} />
    </View>
  );
}

function AppStatusBar() {
  const { mode } = useThemeMode();
  return <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppStatusBar />
        <RootScreen />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
});
