export type Axis = 'order' | 'intensity';

export type QuizOption = {
  text: string;
  order: number; // + systematic, - intuitive
  intensity: number; // + bold, - subtle
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
};

export type DesignTypeId = 'grid-zealot' | 'contrast-architect' | 'whitespace-purist' | 'chaos-agent';

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

export type JudgmentChallenge = {
  id: string;
  prompt: string;
  optionA: OptionSpec;
  optionB: OptionSpec;
  correct: 'A' | 'B';
  explanation: string;
};

export type GameStats = {
  streak: number;
  bestStreak: number;
  totalPlayed: number;
  totalCorrect: number;
  lastPlayedDate: string | null; // YYYY-MM-DD
  playedChallengeIds: string[];
};
