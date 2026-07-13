import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameId, GameLogEntry, GameStats, Profile } from './types';

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
  history: [],
};

export async function loadStats(): Promise<GameStats> {
  const raw = await AsyncStorage.getItem(STATS_KEY);
  return raw ? { ...DEFAULT_STATS, ...JSON.parse(raw) } : DEFAULT_STATS;
}

export async function saveStats(stats: GameStats): Promise<void> {
  await AsyncStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

async function loadBest(key: string): Promise<number | null> {
  const raw = await AsyncStorage.getItem(key);
  return raw ? Number(raw) : null;
}

async function saveBest(key: string, score: number): Promise<void> {
  await AsyncStorage.setItem(key, String(score));
}

export const loadColorBest = () => loadBest('ui-ux-pocket:colorBest');
export const saveColorBest = (score: number) => saveBest('ui-ux-pocket:colorBest', score);

export const loadContrastBest = () => loadBest('ui-ux-pocket:contrastBest');
export const saveContrastBest = (score: number) => saveBest('ui-ux-pocket:contrastBest', score);

export const loadAlignmentBest = () => loadBest('ui-ux-pocket:alignmentBest');
export const saveAlignmentBest = (score: number) => saveBest('ui-ux-pocket:alignmentBest', score);

export const loadKerningBest = () => loadBest('ui-ux-pocket:kerningBest');
export const saveKerningBest = (score: number) => saveBest('ui-ux-pocket:kerningBest', score);

export const loadPixelMatchBest = () => loadBest('ui-ux-pocket:pixelMatchBest');
export const savePixelMatchBest = (score: number) => saveBest('ui-ux-pocket:pixelMatchBest', score);

export const loadCenterBest = () => loadBest('ui-ux-pocket:centerBest');
export const saveCenterBest = (score: number) => saveBest('ui-ux-pocket:centerBest', score);

export const loadTypeOrderBest = () => loadBest('ui-ux-pocket:typeOrderBest');
export const saveTypeOrderBest = (score: number) => saveBest('ui-ux-pocket:typeOrderBest', score);

const REMINDER_HOUR_KEY = 'ui-ux-pocket:reminderHour';
const NOTIFICATIONS_ENABLED_KEY = 'ui-ux-pocket:notificationsEnabled';

export async function loadReminderHour(): Promise<number> {
  const raw = await AsyncStorage.getItem(REMINDER_HOUR_KEY);
  return raw ? Number(raw) : 9;
}

export async function saveReminderHour(hour: number): Promise<void> {
  await AsyncStorage.setItem(REMINDER_HOUR_KEY, String(hour));
}

export async function loadNotificationsEnabled(): Promise<boolean> {
  const raw = await AsyncStorage.getItem(NOTIFICATIONS_ENABLED_KEY);
  return raw === null ? true : raw === 'true';
}

export async function saveNotificationsEnabled(enabled: boolean): Promise<void> {
  await AsyncStorage.setItem(NOTIFICATIONS_ENABLED_KEY, String(enabled));
}

const GAME_LOG_KEY = 'ui-ux-pocket:gameLog';

export async function loadGameLog(): Promise<GameLogEntry[]> {
  const raw = await AsyncStorage.getItem(GAME_LOG_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function appendGameLogEntry(entry: GameLogEntry): Promise<GameLogEntry[]> {
  const current = await loadGameLog();
  const updated = [...current, entry].slice(-200);
  await AsyncStorage.setItem(GAME_LOG_KEY, JSON.stringify(updated));
  return updated;
}

const RECENT_ITEMS_KEY = 'ui-ux-pocket:recentSearchItems';
const RECENT_ITEMS_LIMIT = 8;

export type RecentItem = { kind: 'resource'; id: string } | { kind: 'game'; id: GameId };

function recentItemKey(item: RecentItem): string {
  return `${item.kind}:${item.id}`;
}

export async function loadRecentItems(): Promise<RecentItem[]> {
  const raw = await AsyncStorage.getItem(RECENT_ITEMS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function pushRecentItem(item: RecentItem): Promise<RecentItem[]> {
  const current = await loadRecentItems();
  const withoutDupe = current.filter((existing) => recentItemKey(existing) !== recentItemKey(item));
  const updated = [item, ...withoutDupe].slice(0, RECENT_ITEMS_LIMIT);
  await AsyncStorage.setItem(RECENT_ITEMS_KEY, JSON.stringify(updated));
  return updated;
}

const ACTIVE_MS_KEY = 'ui-ux-pocket:totalActiveMs';

export async function loadActiveMs(): Promise<number> {
  const raw = await AsyncStorage.getItem(ACTIVE_MS_KEY);
  return raw ? Number(raw) : 0;
}

export async function addActiveMs(deltaMs: number): Promise<number> {
  const current = await loadActiveMs();
  const updated = current + Math.max(0, deltaMs);
  await AsyncStorage.setItem(ACTIVE_MS_KEY, String(updated));
  return updated;
}

const FOUND_EGGS_KEY = 'ui-ux-pocket:foundEggs';

export async function loadFoundEggs(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(FOUND_EGGS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function markEggFound(id: string): Promise<string[]> {
  const current = await loadFoundEggs();
  if (current.includes(id)) return current;
  const updated = [...current, id];
  await AsyncStorage.setItem(FOUND_EGGS_KEY, JSON.stringify(updated));
  return updated;
}
