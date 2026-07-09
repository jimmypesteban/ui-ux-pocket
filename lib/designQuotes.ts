const DESIGN_QUOTES: string[] = [
  'Nobody asked for four fonts.',
  'If it needs a tooltip, it needs a redesign.',
  'White space is not empty. It is working.',
  'Consistency is a feature nobody thanks you for.',
  'The grid does not care about your feelings.',
  'Delete it. See if anyone notices.',
  'A hierarchy with twelve levels has no hierarchy.',
  'Your users are not reading. They are scanning.',
  'Every animation is a promise you have to keep at 60fps.',
  'The best interface is the one nobody has to think about.',
  'If you have to explain the icon, it is not an icon.',
  'Contrast is not a suggestion. It is a requirement.',
  'Alignment is a form of respect.',
  'The button should not need a caption.',
  'Restraint is the hardest skill to bill for.',
  'A design system is a promise to your future self.',
  'Nobody scrolls past the fold on purpose.',
  'Your favorite color is not a strategy.',
  'The fifth revision is rarely about the button color.',
  'Clarity beats cleverness, every single time.',
  'If the empty state looks broken, the design is not done.',
  'Padding is not decoration. It is oxygen.',
  'A good default saves a thousand support tickets.',
  'The interface that disappears is the one that worked.',
  'Feedback that arrives late might as well not arrive.',
];

export function quoteForToday(): string {
  const dayNumber = Math.floor(Date.now() / 86400000);
  return DESIGN_QUOTES[dayNumber % DESIGN_QUOTES.length];
}
