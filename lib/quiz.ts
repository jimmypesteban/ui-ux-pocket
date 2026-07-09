import { QuizQuestion } from './types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    prompt: 'A client asks for "something that pops."',
    options: [
      { text: 'You reach for a strict type scale and call it a day.', order: 1, intensity: -1, scope: -1 },
      { text: 'You reach for a strict type scale, then break it once, deliberately.', order: 1, intensity: 1, scope: 1 },
      { text: 'You start dragging things around until it feels right.', order: -1, intensity: -1, scope: 1 },
      { text: 'You throw in a color nobody asked for and defend it in review.', order: -1, intensity: 1, scope: -1 },
    ],
  },
  {
    id: 'q2',
    prompt: 'Your honest reaction to an 8pt spacing system:',
    options: [
      { text: 'Finally, some structure.', order: 1, intensity: -1, scope: -1 },
      { text: 'Structure is good. Now let me push it somewhere interesting.', order: 1, intensity: 1, scope: 1 },
      { text: 'I will use it as a starting point and abandon it by section two.', order: -1, intensity: -1, scope: 1 },
      { text: 'Rules are for people with less confidence than me.', order: -1, intensity: 1, scope: -1 },
    ],
  },
  {
    id: 'q3',
    prompt: 'You just found a 1px misalignment in a shipped screen.',
    options: [
      { text: 'You cannot sleep until it is fixed.', order: 1, intensity: -1, scope: 1 },
      { text: 'You fix it and quietly tighten three other things nobody noticed.', order: 1, intensity: 1, scope: -1 },
      { text: 'You notice, then genuinely forget about it in ten minutes.', order: -1, intensity: -1, scope: -1 },
      { text: 'Honestly? Adds character.', order: -1, intensity: 1, scope: 1 },
    ],
  },
  {
    id: 'q4',
    prompt: 'Pick the critique that stings the most:',
    options: [
      { text: '"This feels inconsistent."', order: 1, intensity: -1, scope: -1 },
      { text: '"This feels safe."', order: 1, intensity: 1, scope: -1 },
      { text: '"This feels cluttered."', order: -1, intensity: -1, scope: 1 },
      { text: '"This feels like everything else out there."', order: -1, intensity: 1, scope: -1 },
    ],
  },
  {
    id: 'q5',
    prompt: 'Your Figma file, if we opened it right now:',
    options: [
      { text: 'Named layers, locked components, a design system page.', order: 1, intensity: -1, scope: -1 },
      { text: 'Same, plus one page labeled "chaos experiments" you are proud of.', order: 1, intensity: 1, scope: 1 },
      { text: 'A beautiful mess only you can navigate.', order: -1, intensity: -1, scope: 1 },
      { text: 'Seventeen versions named "final" and no regrets.', order: -1, intensity: 1, scope: 1 },
    ],
  },
  {
    id: 'q6',
    prompt: 'When a button just is not working, you:',
    options: [
      { text: 'Check the padding, the contrast ratio, the hit target — in that order.', order: 1, intensity: -1, scope: 1 },
      { text: 'Make it bigger, louder, and unmissable.', order: 1, intensity: 1, scope: -1 },
      { text: 'Stare at it until it tells you what it wants.', order: -1, intensity: -1, scope: -1 },
      { text: 'Delete it and design a completely different interaction.', order: -1, intensity: 1, scope: -1 },
    ],
  },
];
