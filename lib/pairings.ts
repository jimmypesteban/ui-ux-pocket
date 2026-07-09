import { DesignTypeId } from './types';

export type Pairing = {
  title: string;
  verdict: string;
};

type BaseType = 'grid-zealot' | 'contrast-architect' | 'whitespace-purist' | 'chaos-agent';

const BASE_TYPE: Record<DesignTypeId, BaseType> = {
  'grid-zealot': 'grid-zealot',
  'pixel-auditor': 'grid-zealot',
  'contrast-architect': 'contrast-architect',
  'precision-provocateur': 'contrast-architect',
  'whitespace-purist': 'whitespace-purist',
  'detail-drifter': 'whitespace-purist',
  'chaos-agent': 'chaos-agent',
  'flourish-hunter': 'chaos-agent',
};

const KEY_ORDER: DesignTypeId[] = [
  'grid-zealot',
  'contrast-architect',
  'whitespace-purist',
  'chaos-agent',
  'pixel-auditor',
  'precision-provocateur',
  'detail-drifter',
  'flourish-hunter',
];

function pairKey(a: BaseType, b: BaseType): string {
  const order: BaseType[] = ['grid-zealot', 'contrast-architect', 'whitespace-purist', 'chaos-agent'];
  return order.indexOf(a) <= order.indexOf(b) ? `${a}__${b}` : `${b}__${a}`;
}

const SAME_TYPE: Record<BaseType, Pairing> = {
  'grid-zealot': {
    title: 'Working With Your Own Kind',
    verdict:
      'Two Grid Zealots in one review means the meeting runs long and the grid runs perfect. Nobody ships until the baseline is right. Everybody agrees this was necessary.',
  },
  'contrast-architect': {
    title: 'Working With Your Own Kind',
    verdict:
      'Two Contrast Architects will each want to be the one bold move in the room. Someone has to blink first. It will not be either of you.',
  },
  'whitespace-purist': {
    title: 'Working With Your Own Kind',
    verdict:
      'Two Whitespace Purists in a critique session will eventually delete the interface entirely and call it "cleaner." Technically correct.',
  },
  'chaos-agent': {
    title: 'Working With Your Own Kind',
    verdict:
      'Two Chaos Agents will produce either the best screen your team has ever shipped or a Figma file that has to be quarantined. There is no in-between.',
  },
};

const PAIRINGS: Record<string, Pairing> = {
  'grid-zealot__contrast-architect': {
    title: 'Structural Allies',
    verdict:
      'You both start from the same grid. The friction shows up later, when the Architect wants to break it on purpose and you want to know why nobody asked you first.',
  },
  'grid-zealot__whitespace-purist': {
    title: 'The Quiet War',
    verdict:
      'You both worship restraint, which means you will disagree constantly about what restraint actually looks like. Your restraint has rulers. Theirs has vibes.',
  },
  'grid-zealot__chaos-agent': {
    title: 'Opposites, Barely Coexisting',
    verdict:
      'Every guide you laid down, they will ignore on instinct, not out of spite. When it works, you will hate how well it works.',
  },
  'contrast-architect__whitespace-purist': {
    title: 'Loud Meets Silent',
    verdict:
      'You want one unmissable move. They want to remove it. The screen that survives both of you is usually the best one in the file.',
  },
  'contrast-architect__chaos-agent': {
    title: 'Reckless Symmetry',
    verdict:
      'You both like breaking rules. The difference is you can explain why, in a sentence, in review. They cannot, and somehow still win the room.',
  },
  'whitespace-purist__chaos-agent': {
    title: 'Nothing Survives This Review',
    verdict:
      'They keep removing things. You keep adding things. The project either finds its exact right amount of stuff, or it never ships.',
  },
};

export function getPairing(a: DesignTypeId, b: DesignTypeId): Pairing {
  const baseA = BASE_TYPE[a];
  const baseB = BASE_TYPE[b];
  if (baseA === baseB) return SAME_TYPE[baseA];
  return PAIRINGS[pairKey(baseA, baseB)];
}

export function otherTypes(id: DesignTypeId): DesignTypeId[] {
  return KEY_ORDER.filter((t) => t !== id);
}
