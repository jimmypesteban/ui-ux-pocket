import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { theme } from './lib/theme';
import { GameStats, JudgmentChallenge, Profile } from './lib/types';
import { loadProfile, loadStats, saveProfile, saveStats, clearProfile } from './lib/storage';
import { pickTodaysChallenge } from './lib/challengePicker';
import { recordAnswer } from './lib/gameLogic';
import OnboardingQuiz from './screens/OnboardingQuiz';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';

type Screen = 'loading' | 'quiz' | 'home' | 'game';

function RootScreen() {
  const [view, setView] = useState<Screen>('loading');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<GameStats | null>(null);
  const [activeChallenge, setActiveChallenge] = useState<JudgmentChallenge | null>(null);

  useEffect(() => {
    Promise.all([loadProfile(), loadStats()]).then(([p, s]) => {
      setProfile(p);
      setStats(s);
      setView(p ? 'home' : 'quiz');
    });
  }, []);

  async function handleQuizComplete(newProfile: Profile) {
    await saveProfile(newProfile);
    setProfile(newProfile);
    setView('home');
  }

  function handlePlay() {
    if (!stats) return;
    setActiveChallenge(pickTodaysChallenge(stats));
    setView('game');
  }

  async function handleGameFinish(wasCorrect: boolean) {
    if (!stats || !activeChallenge) return;
    const updated = recordAnswer(stats, activeChallenge.id, wasCorrect);
    await saveStats(updated);
    setStats(updated);
    setActiveChallenge(null);
    setView('home');
  }

  async function handleRetakeQuiz() {
    await clearProfile();
    setProfile(null);
    setView('quiz');
  }

  if (view === 'loading' || !stats) {
    return <View style={styles.container} />;
  }

  if (view === 'quiz') {
    return <OnboardingQuiz onComplete={handleQuizComplete} />;
  }

  if (view === 'game' && activeChallenge) {
    return (
      <GameScreen
        challenge={activeChallenge}
        onFinish={handleGameFinish}
        onBack={() => setView('home')}
      />
    );
  }

  if (profile) {
    return (
      <HomeScreen profile={profile} stats={stats} onPlay={handlePlay} onRetakeQuiz={handleRetakeQuiz} />
    );
  }

  return <View style={styles.container} />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <RootScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
});
