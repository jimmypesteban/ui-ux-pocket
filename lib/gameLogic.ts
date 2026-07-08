import { GameStats } from './types';
import { todayKey, yesterdayKey } from './date';

export function recordAnswer(stats: GameStats, challengeId: string, wasCorrect: boolean): GameStats {
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
  };
}
