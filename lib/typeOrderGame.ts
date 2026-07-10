// A mix of UX/UI vocabulary at varying lengths, so the labels don't all read
// as the same word at different sizes — a real type scale mixes short titles
// with longer running phrases, and that variety is part of what makes reading
// hierarchy at a glance (or failing to) meaningful. Longer entries are meant
// to run past two lines and get truncated by the label's own numberOfLines,
// same as real UI copy that never fits as neatly as the mockup implied.
const LABEL_POOL = [
  'Heading',
  'Empty State',
  'Onboarding Flow',
  'Design Tokens',
  'Call to Action',
  'Component Library',
  'Visual Hierarchy',
  'Usability Testing',
  'Information Architecture',
  'Accessibility Audit',
  'User Research',
  'Interaction Design',
  'Reduce cognitive load for first-time users navigating the dashboard',
  'Increase conversion on the checkout flow without adding more steps',
  'Improve color contrast so text is readable for low-vision users',
  'Simplify the onboarding experience for people who skip instructions',
  'Every extra field on this form is a reason to abandon it halfway',
];

function pickLabels(count: number): string[] {
  const pool = [...LABEL_POOL];
  const picked: string[] = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    picked.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return picked;
}

export type TypeOrderRound = {
  sizes: number[];
  labels: string[];
  displayOrder: number[];
};

export function generateTypeOrderRound(): TypeOrderRound {
  const count = 5;
  const sizes: number[] = [];
  let size = 14 + Math.floor(Math.random() * 6);
  for (let i = 0; i < count; i++) {
    sizes.push(size);
    size += 6 + Math.floor(Math.random() * 6);
  }
  const labels = pickLabels(count);
  const displayOrder = sizes.map((_, i) => i);
  for (let i = displayOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [displayOrder[i], displayOrder[j]] = [displayOrder[j], displayOrder[i]];
  }
  return { sizes, labels, displayOrder };
}

export function scoreRound(elapsedMs: number, correct: boolean): number {
  if (!correct) return 0;
  const score = 10 - Math.floor(elapsedMs / 700);
  return Math.max(3, Math.min(10, score));
}

export function verdictForTypeOrderScore(total: number, max: number): string {
  const pct = total / max;
  if (pct >= 0.9) return 'You read a type scale the way most people read a sentence.';
  if (pct >= 0.7) return 'Fast and accurate. Hierarchy is not a mystery to you.';
  if (pct >= 0.45) return 'You get there, just not at a glance.';
  return 'Every heading in your files is the same size. We can tell.';
}
