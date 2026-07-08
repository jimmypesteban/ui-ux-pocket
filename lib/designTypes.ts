import { DesignType, DesignTypeId } from './types';

export const DESIGN_TYPES: Record<DesignTypeId, DesignType> = {
  'grid-zealot': {
    id: 'grid-zealot',
    name: 'The Grid Zealot',
    tagline: 'You have never met a misaligned element you could forgive.',
    description:
      'You think in 8px increments. Your Figma files have more guides than layers. You are correct about almost everything, and insufferable about all of it.',
  },
  'contrast-architect': {
    id: 'contrast-architect',
    name: 'The Contrast Architect',
    tagline: 'Systematic, but loud about it.',
    description:
      'You follow the rules religiously, right up until you break one on purpose, at scale, for effect. Your hierarchy is airtight. Your restraint is not.',
  },
  'whitespace-purist': {
    id: 'whitespace-purist',
    name: 'The Whitespace Purist',
    tagline: 'You would rather remove one more thing.',
    description:
      'You design by feel, not by grid, and somehow it still breathes perfectly. Every element earns its place or it is gone. You are exhausting in critique sessions.',
  },
  'chaos-agent': {
    id: 'chaos-agent',
    name: 'The Chaos Agent',
    tagline: 'The grid is a suggestion.',
    description:
      'You design with your gut and your gut is loud. When it works, it is the best thing in the room. When it does not, nobody can tell you why.',
  },
};

export function classifyDesignType(orderScore: number, intensityScore: number): DesignTypeId {
  const systematic = orderScore >= 0;
  const bold = intensityScore >= 0;
  if (systematic && !bold) return 'grid-zealot';
  if (systematic && bold) return 'contrast-architect';
  if (!systematic && !bold) return 'whitespace-purist';
  return 'chaos-agent';
}
