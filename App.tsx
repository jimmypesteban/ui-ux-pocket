import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useTheme, useThemeMode } from './lib/theme';
import ThemeProvider from './lib/ThemeProvider';
import { AvatarId } from './lib/avatars';
import { GameLogEntry, GameStats, JudgmentChallenge, Profile } from './lib/types';
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
} from './lib/storage';
import { pickTodaysChallenge } from './lib/challengePicker';
import { recordAnswer } from './lib/gameLogic';
import { todayKey } from './lib/date';
import { ensureDailyReminderScheduled, cancelDailyReminder } from './lib/notifications';
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
import ExploreScreen from './screens/ExploreScreen';
import FlashcardsScreen from './screens/FlashcardsScreen';
import PairingsScreen from './screens/PairingsScreen';
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
    ]).then(([p, s, cb, kb, ab, keb, pmb, ceb, tob, rh, ne, log]) => {
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
      setView(p ? 'main' : 'quiz');
      if (p && ne) ensureDailyReminderScheduled(rh);
    });
  }, []);

  async function logGame(game: GameLogEntry['game'], score: number, maxScore: number) {
    const updated = await appendGameLogEntry({ game, date: todayKey(), score, maxScore });
    setGameLog(updated);
  }

  async function handleQuizComplete(newProfile: Profile) {
    await saveProfile(newProfile);
    setProfile(newProfile);
    setTab('home');
    setView('main');
    ensureDailyReminderScheduled();
  }

  function handlePlay() {
    if (!stats) return;
    setActiveChallenge(pickTodaysChallenge(stats));
    setView('game');
  }

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

  async function handleRetakeQuiz() {
    await clearProfile();
    await cancelDailyReminder();
    setProfile(null);
    setView('quiz');
  }

  async function handleToggleNotifications(enabled: boolean) {
    setNotificationsEnabled(enabled);
    await saveNotificationsEnabled(enabled);
    if (enabled) {
      await ensureDailyReminderScheduled(reminderHour);
    } else {
      await cancelDailyReminder();
    }
  }

  async function handleChangeReminderHour(hour: number) {
    setReminderHour(hour);
    await saveReminderHour(hour);
    if (notificationsEnabled) {
      await ensureDailyReminderScheduled(hour);
    }
  }

  async function handleChangeAvatar(avatarId: AvatarId) {
    if (!profile) return;
    const updated = { ...profile, avatarId };
    await saveProfile(updated);
    setProfile(updated);
  }

  if (view === 'loading' || !stats) {
    return <View style={[styles.container, { backgroundColor: theme.bg }]} />;
  }

  if (view === 'quiz') {
    return <OnboardingQuiz onComplete={handleQuizComplete} />;
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
      <View style={styles.content}>
        {tab === 'home' && (
          <HomeScreen
            profile={profile}
            stats={stats}
            colorBest={colorBest}
            contrastBest={contrastBest}
            alignmentBest={alignmentBest}
            kerningBest={kerningBest}
            pixelMatchBest={pixelMatchBest}
            centerBest={centerBest}
            typeOrderBest={typeOrderBest}
            onPlay={handlePlay}
            onPlayColorGame={() => setView('colorgame')}
            onPlayContrastGame={() => setView('contrastgame')}
            onPlayAlignmentGame={() => setView('alignmentgame')}
            onPlayKerningGame={() => setView('kerninggame')}
            onPlayPixelMatchGame={() => setView('pixelmatchgame')}
            onPlayCenterGame={() => setView('centergame')}
            onPlayTypeOrderGame={() => setView('typeordergame')}
          />
        )}
        {tab === 'explore' && <ExploreScreen yourType={profile.designTypeId} />}
        {tab === 'laws' && <FlashcardsScreen />}
        {tab === 'pairings' && <PairingsScreen yourType={profile.designTypeId} />}
        {tab === 'profile' && (
          <ProfileScreen
            stats={stats}
            gameLog={gameLog}
            avatarId={profile.avatarId}
            notificationsEnabled={notificationsEnabled}
            reminderHour={reminderHour}
            onToggleNotifications={handleToggleNotifications}
            onChangeReminderHour={handleChangeReminderHour}
            onChangeAvatar={handleChangeAvatar}
            onRetakeQuiz={handleRetakeQuiz}
          />
        )}
      </View>
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
