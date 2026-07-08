import { JudgmentChallenge } from './types';

export const CHALLENGES: JudgmentChallenge[] = [
  {
    id: 'tap-target',
    prompt: 'Which button is actually tappable on a real thumb?',
    optionA: { label: 'Submit', padding: 6, gap: 0, fontSize: 13, fgColor: '#000', bgColor: '#fff', align: 'center' },
    optionB: { label: 'Submit', padding: 16, gap: 0, fontSize: 16, fgColor: '#000', bgColor: '#fff', align: 'center' },
    correct: 'B',
    explanation:
      'Apple and Google both want a 44pt minimum hit target. Option A is a button for people with laser pointers, not fingers.',
  },
  {
    id: 'contrast-check',
    prompt: 'Which text will your users actually be able to read?',
    optionA: { label: 'Continue', padding: 12, gap: 0, fontSize: 15, fgColor: '#555555', bgColor: '#000000', align: 'center' },
    optionB: { label: 'Continue', padding: 12, gap: 0, fontSize: 15, fgColor: '#ffffff', bgColor: '#000000', align: 'center' },
    correct: 'B',
    explanation:
      'Option A is roughly 2.3:1 contrast. WCAG wants at least 4.5:1 for body text. You were not being subtle, you were being illegible.',
  },
  {
    id: 'breathing-room',
    prompt: 'Which card gives its content room to exist?',
    optionA: { label: 'Order summary', padding: 4, gap: 0, fontSize: 14, fgColor: '#fff', bgColor: '#111', align: 'flex-start' },
    optionB: { label: 'Order summary', padding: 24, gap: 0, fontSize: 14, fgColor: '#fff', bgColor: '#111', align: 'flex-start' },
    correct: 'B',
    explanation:
      'Cramped padding does not make an interface feel efficient. It makes it feel like it is holding its breath.',
  },
  {
    id: 'min-font',
    prompt: 'Which label survives being read on an actual phone, outdoors, by someone over 40?',
    optionA: { label: 'Terms & Conditions', padding: 10, gap: 0, fontSize: 9, fgColor: '#fff', bgColor: '#000', align: 'center' },
    optionB: { label: 'Terms & Conditions', padding: 10, gap: 0, fontSize: 15, fgColor: '#fff', bgColor: '#000', align: 'center' },
    correct: 'B',
    explanation:
      'Under 11pt and you are not being minimalist, you are asking people to get closer to their screen. They will not.',
  },
  {
    id: 'scan-align',
    prompt: 'Which layout is easier to scan down a list?',
    optionA: { label: 'Item name', padding: 12, gap: 0, fontSize: 14, fgColor: '#fff', bgColor: '#111', align: 'center' },
    optionB: { label: 'Item name', padding: 12, gap: 0, fontSize: 14, fgColor: '#fff', bgColor: '#111', align: 'flex-start' },
    correct: 'B',
    explanation:
      'Centered text in a list means every line starts somewhere new. Your eyes have to hunt. Left edges are a courtesy.',
  },
  {
    id: 'button-spacing',
    prompt: 'Which pair of adjacent buttons avoids rage-taps?',
    optionA: { label: 'Delete · Cancel', padding: 10, gap: 2, fontSize: 14, fgColor: '#fff', bgColor: '#000', align: 'center' },
    optionB: { label: 'Delete · Cancel', padding: 10, gap: 20, fontSize: 14, fgColor: '#fff', bgColor: '#000', align: 'center' },
    correct: 'B',
    explanation:
      'Two buttons 2px apart is how "Cancel" becomes "Delete Forever" by accident. Give destructive actions room to be avoided.',
  },
  {
    id: 'hierarchy-size',
    prompt: 'Which heading actually reads as a heading?',
    optionA: { label: 'Account Settings', padding: 12, gap: 0, fontSize: 15, fgColor: '#fff', bgColor: '#000', align: 'flex-start' },
    optionB: { label: 'Account Settings', padding: 12, gap: 0, fontSize: 24, fgColor: '#fff', bgColor: '#000', align: 'flex-start' },
    correct: 'B',
    explanation:
      'If your heading is the same size as your body text, it is not a heading, it is a suggestion.',
  },
  {
    id: 'faint-cta',
    prompt: 'Which call-to-action will people actually notice?',
    optionA: { label: 'Get Started', padding: 14, gap: 0, fontSize: 15, fgColor: '#666', bgColor: '#111', align: 'center' },
    optionB: { label: 'Get Started', padding: 14, gap: 0, fontSize: 15, fgColor: '#000', bgColor: '#fff', align: 'center' },
    correct: 'B',
    explanation:
      'A primary action that blends into the background is not confident restraint. It is a button in witness protection.',
  },
];
