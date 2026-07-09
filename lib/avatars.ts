export const AVATAR_IDS = [
  'circle',
  'ring',
  'triangle',
  'diamond',
  'duo',
  'crescent',
  'cross',
  'stripes',
] as const;

export type AvatarId = (typeof AVATAR_IDS)[number];

export const DEFAULT_AVATAR_ID: AvatarId = 'circle';
