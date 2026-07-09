import { ChallengeCategory, GameId, GameLogEntry, GameStats } from './types';
import { CHALLENGES } from './dailyGames';
import { todayKey, yesterdayKey } from './date';
import { OTHER_GAME_ORDER } from './gameMeta';

export function recordAnswer(
  stats: GameStats,
  challengeId: string,
  chosen: 'A' | 'B',
  wasCorrect: boolean
): GameStats {
  const today = todayKey();
  const continuingStreak = stats.lastPlayedDate === yesterdayKey() || stats.lastPlayedDate === today;
  const newStreak = continuingStreak ? stats.streak + 1 : 1;
  return {
    streak: newStreak,
    bestStreak: Math.max(stats.bestStreak, newStreak),
    totalPlayed: stats.totalPlayed + 1,
    totalCorrect: stats.totalCorrect + (wasCorrect ? 1 : 0),
    lastPlayedDate: today,
    playedChallengeIds: [...stats.playedChallengeIds, challengeId].slice(-100),
    history: [...stats.history, { challengeId, date: today, chosen, wasCorrect }].slice(-200),
  };
}

export function categoryBreakdown(
  stats: GameStats
): Record<ChallengeCategory, { played: number; correct: number }> {
  const breakdown: Record<ChallengeCategory, { played: number; correct: number }> = {
    contrast: { played: 0, correct: 0 },
    spacing: { played: 0, correct: 0 },
    'tap-targets': { played: 0, correct: 0 },
    hierarchy: { played: 0, correct: 0 },
  };
  for (const entry of stats.history) {
    const challenge = CHALLENGES.find((c) => c.id === entry.challengeId);
    if (!challenge) continue;
    breakdown[challenge.category].played += 1;
    if (entry.wasCorrect) breakdown[challenge.category].correct += 1;
  }
  return breakdown;
}

export function gameLogBreakdown(
  log: GameLogEntry[]
): Record<GameId, { played: number; best: number; maxScore: number }> {
  const breakdown = {} as Record<GameId, { played: number; best: number; maxScore: number }>;
  for (const game of OTHER_GAME_ORDER) {
    breakdown[game] = { played: 0, best: 0, maxScore: 0 };
  }
  for (const entry of log) {
    const bucket = breakdown[entry.game];
    if (!bucket) continue;
    bucket.played += 1;
    bucket.maxScore = entry.maxScore;
    bucket.best = Math.max(bucket.best, entry.score);
  }
  return breakdown;
}
