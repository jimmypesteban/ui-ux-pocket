import { gameLogBreakdown } from './gameLogic';
import { GAME_LABELS, OTHER_GAME_ORDER } from './gameMeta';
import { GameId, GameLogEntry, GameStats } from './types';

export type AchievementCategory = 'streak' | 'game' | 'time' | 'secret';

export type AchievementIcon =
  | { kind: 'game'; game: GameId }
  | { kind: 'flame' }
  | { kind: 'trophy' }
  | { kind: 'clock' }
  | { kind: 'eye' };

export type Achievement = {
  id: string;
  category: AchievementCategory;
  title: string;
  description: string;
  icon: AchievementIcon;
};

export type AchievementContext = {
  stats: GameStats;
  gameLog: GameLogEntry[];
  totalActiveMs: number;
  foundEggCount: number;
};

const STREAK_TIERS = [10, 25, 50, 75, 100];
const TIME_TIERS_MS = [0.5, 2, 5, 10, 24].map((h) => h * 3600_000);

function levelFor(value: number, tiers: number[]): number {
  return tiers.filter((t) => value >= t).length;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'streak-level',
    category: 'streak',
    title: 'Streak Level',
    description: 'Come back every day to level up your streak.',
    icon: { kind: 'flame' },
  },
  ...OTHER_GAME_ORDER.map((id) => ({
    id: `perfect-${id}`,
    category: 'game' as const,
    title: `Perfect: ${GAME_LABELS[id]}`,
    description: `Score full marks in ${GAME_LABELS[id]}.`,
    icon: { kind: 'game' as const, game: id },
  })),
  {
    id: 'grand-slam',
    category: 'game',
    title: 'Grand Slam',
    description: 'Score full marks in all 7 practice games.',
    icon: { kind: 'trophy' },
  },
  {
    id: 'time-level',
    category: 'time',
    title: 'Time Invested',
    description: 'Spend time in the app to level up.',
    icon: { kind: 'clock' },
  },
  {
    id: 'sharp-eye',
    category: 'secret',
    title: '???',
    description: 'Find all 5 hidden oddities scattered around the app.',
    icon: { kind: 'eye' },
  },
];

export function computeUnlockedIds(ctx: AchievementContext): Set<string> {
  const unlocked = new Set<string>();

  if (ctx.stats.bestStreak >= STREAK_TIERS[STREAK_TIERS.length - 1]) unlocked.add('streak-level');

  const breakdown = gameLogBreakdown(ctx.gameLog);
  let allPerfect = true;
  for (const g of OTHER_GAME_ORDER) {
    const b = breakdown[g];
    const perfect = b.maxScore > 0 && b.best >= b.maxScore;
    if (perfect) unlocked.add(`perfect-${g}`);
    else allPerfect = false;
  }
  if (allPerfect) unlocked.add('grand-slam');

  if (ctx.totalActiveMs >= TIME_TIERS_MS[TIME_TIERS_MS.length - 1]) unlocked.add('time-level');

  if (ctx.foundEggCount >= 5) unlocked.add('sharp-eye');

  return unlocked;
}

function formatMs(ms: number): string {
  const totalMinutes = Math.round(ms / 60000);
  if (totalMinutes < 60) return `${totalMinutes}m`;
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export type Progress = {
  current: number;
  target: number;
  format?: (n: number) => string;
  level?: number;
  maxLevel?: number;
};

export function progressFor(id: string, ctx: AchievementContext): Progress | null {
  if (id === 'streak-level') {
    const value = ctx.stats.bestStreak;
    const maxLevel = STREAK_TIERS.length;
    const level = levelFor(value, STREAK_TIERS);
    const target = STREAK_TIERS[Math.min(level, maxLevel - 1)];
    return { current: Math.min(value, target), target, level, maxLevel };
  }
  if (id.startsWith('perfect-')) {
    const gameId = id.slice('perfect-'.length) as keyof ReturnType<typeof gameLogBreakdown>;
    const b = gameLogBreakdown(ctx.gameLog)[gameId];
    const target = b.maxScore || 1;
    return { current: Math.min(b.best, target), target };
  }
  if (id === 'grand-slam') {
    const breakdown = gameLogBreakdown(ctx.gameLog);
    const done = OTHER_GAME_ORDER.filter((g) => breakdown[g].maxScore > 0 && breakdown[g].best >= breakdown[g].maxScore).length;
    return { current: done, target: OTHER_GAME_ORDER.length };
  }
  if (id === 'time-level') {
    const value = ctx.totalActiveMs;
    const maxLevel = TIME_TIERS_MS.length;
    const level = levelFor(value, TIME_TIERS_MS);
    const target = TIME_TIERS_MS[Math.min(level, maxLevel - 1)];
    return { current: Math.min(value, target), target, format: formatMs, level, maxLevel };
  }
  if (id === 'sharp-eye') {
    return { current: Math.min(ctx.foundEggCount, 5), target: 5 };
  }
  return null;
}
