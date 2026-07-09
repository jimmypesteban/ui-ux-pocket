import { GameId } from './types';

export const GAME_LABELS: Record<GameId, string> = {
  judgment: 'Judgment Call',
  color: 'Color Recall',
  contrast: 'Contrast Call',
  alignment: 'Spot the Odd One',
  kerning: 'Kerning Call',
  pixelmatch: 'Pixel Match',
  center: 'Dead Center',
  typeorder: 'Type Order',
};

export const OTHER_GAME_ORDER: GameId[] = [
  'color',
  'contrast',
  'alignment',
  'kerning',
  'pixelmatch',
  'center',
  'typeorder',
];
