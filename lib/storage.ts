import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameStats, Profile } from './types';

const PROFILE_KEY = 'ui-ux-pocket:profile';
const STATS_KEY = 'ui-ux-pocket:stats';

export async function loadProfile(): Promise<Profile | null> {
  const raw = await AsyncStorage.getItem(PROFILE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function saveProfile(profile: Profile): Promise<void> {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export async function clearProfile(): Promise<void> {
  await AsyncStorage.removeItem(PROFILE_KEY);
}

const DEFAULT_STATS: GameStats = {
  streak: 0,
  bestStreak: 0,
  totalPlayed: 0,
  totalCorrect: 0,
  lastPlayedDate: null,
  playedChallengeIds: [],
};

export async function loadStats(): Promise<GameStats> {
  const raw = await AsyncStorage.getItem(STATS_KEY);
  return raw ? { ...DEFAULT_STATS, ...JSON.parse(raw) } : DEFAULT_STATS;
}

export async function saveStats(stats: GameStats): Promise<void> {
  await AsyncStorage.setItem(STATS_KEY, JSON.stringify(stats));
}
