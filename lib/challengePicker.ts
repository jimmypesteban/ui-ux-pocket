import { CHALLENGES } from './dailyGames';
import { JudgmentChallenge, GameStats } from './types';
import { todayKey } from './date';

export function hasPlayedToday(stats: GameStats): boolean {
  return stats.lastPlayedDate === todayKey();
}

export function pickTodaysChallenge(stats: GameStats): JudgmentChallenge {
  const unplayed = CHALLENGES.filter((c) => !stats.playedChallengeIds.includes(c.id));
  const pool = unplayed.length > 0 ? unplayed : CHALLENGES;
  const dayNumber = Math.floor(Date.now() / 86400000);
  return pool[dayNumber % pool.length];
}
