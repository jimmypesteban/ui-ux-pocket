import { AvatarId } from './avatars';

export type Axis = 'order' | 'intensity' | 'scope';

export type QuizOption = {
  text: string;
  order: number; // + systematic, - intuitive
  intensity: number; // + bold, - subtle
  scope: number; // + detail-focused (micro), - big-picture (macro)
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
};

export type DesignTypeId =
  | 'grid-zealot'
  | 'contrast-architect'
  | 'whitespace-purist'
  | 'chaos-agent'
  | 'pixel-auditor'
  | 'precision-provocateur'
  | 'detail-drifter'
  | 'flourish-hunter';

export type DesignType = {
  id: DesignTypeId;
  name: string;
  tagline: string;
  description: string;
};

export type Profile = {
  designTypeId: DesignTypeId;
  orderScore: number;
  intensityScore: number;
  scopeScore: number;
  avatarId: AvatarId;
  completedAt: string;
};

export type OptionSpec = {
  label: string;
  padding: number;
  gap: number;
  fontSize: number;
  fgColor: string;
  bgColor: string;
  align: 'flex-start' | 'center' | 'flex-end';
};

export type ChallengeCategory = 'contrast' | 'spacing' | 'tap-targets' | 'hierarchy';

export type JudgmentChallenge = {
  id: string;
  category: ChallengeCategory;
  prompt: string;
  optionA: OptionSpec;
  optionB: OptionSpec;
  correct: 'A' | 'B';
  explanation: string;
};

export type HistoryEntry = {
  challengeId: string;
  date: string; // YYYY-MM-DD
  chosen: 'A' | 'B';
  wasCorrect: boolean;
};

export type GameStats = {
  streak: number;
  bestStreak: number;
  totalPlayed: number;
  totalCorrect: number;
  lastPlayedDate: string | null; // YYYY-MM-DD
  playedChallengeIds: string[];
  history: HistoryEntry[];
};

export type GameId =
  | 'judgment'
  | 'color'
  | 'contrast'
  | 'alignment'
  | 'kerning'
  | 'pixelmatch'
  | 'center'
  | 'typeorder';

export type GameLogEntry = {
  game: GameId;
  date: string; // YYYY-MM-DD
  score: number;
  maxScore: number;
};
