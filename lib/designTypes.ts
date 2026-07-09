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
  'pixel-auditor': {
    id: 'pixel-auditor',
    name: 'The Pixel Auditor',
    tagline: 'You have measured that shadow, and it is wrong.',
    description:
      'You do not just follow the grid, you audit it, pixel by pixel. Every corner radius is intentional, all of them, always. You will find the one inconsistency nobody else can see, and now neither can you unsee it.',
  },
  'precision-provocateur': {
    id: 'precision-provocateur',
    name: 'The Precision Provocateur',
    tagline: 'One perfect exception to an otherwise perfect rule.',
    description:
      'You keep the system airtight and then break exactly one thing, exactly once, exactly right. It is not chaos. It is a single, surgical act of rebellion inside a grid that still holds everywhere else.',
  },
  'detail-drifter': {
    id: 'detail-drifter',
    name: 'The Detail Drifter',
    tagline: 'You cannot see the forest. You can see every leaf.',
    description:
      'You do not work from a system, you work from a feeling, and that feeling is currently about one very specific spacing value. Zoomed in, you are unbeatable. Zoomed out, nobody, including you, knows what is happening.',
  },
  'flourish-hunter': {
    id: 'flourish-hunter',
    name: 'The Flourish Hunter',
    tagline: 'One glorious detail can carry an entire screen.',
    description:
      'You are not chasing a cohesive system, you are chasing the one moment someone screenshots. Find the flourish, make it loud, let the rest of the interface be furniture.',
  },
};

export function classifyDesignType(orderScore: number, intensityScore: number, scopeScore: number): DesignTypeId {
  const systematic = orderScore >= 0;
  const bold = intensityScore >= 0;
  const micro = scopeScore >= 0;

  if (systematic && !bold) return micro ? 'pixel-auditor' : 'grid-zealot';
  if (systematic && bold) return micro ? 'precision-provocateur' : 'contrast-architect';
  if (!systematic && !bold) return micro ? 'detail-drifter' : 'whitespace-purist';
  return micro ? 'flourish-hunter' : 'chaos-agent';
}
