export type UxLaw = {
  id: string;
  name: string;
  tagline: string;
  explanation: string;
};

export const UX_LAWS: UxLaw[] = [
  {
    id: 'aesthetic-usability-effect',
    name: 'Aesthetic-Usability Effect',
    tagline: 'Pretty things get the benefit of the doubt.',
    explanation:
      'Users assume attractive interfaces work better, even when the underlying usability is identical. This buys you patience during onboarding. It does not excuse a broken checkout flow forever.',
  },
  {
    id: 'choice-overload',
    name: 'Choice Overload',
    tagline: 'More options is not more freedom.',
    explanation:
      'Past a certain point, every extra choice makes people less likely to decide at all. A settings screen with forty toggles is not empowering anyone. It is a maze with no exit sign.',
  },
  {
    id: 'chunking',
    name: 'Chunking',
    tagline: 'Nobody remembers sixteen digits at once.',
    explanation:
      'Group related information into small clusters and people can actually hold onto it. This is why phone numbers have dashes and your form should have sections, not one endless scroll.',
  },
  {
    id: 'cognitive-bias',
    name: 'Cognitive Bias',
    tagline: 'Your users are not rational. Neither are you.',
    explanation:
      'People consistently misjudge probability, anchor on the first number they see, and trust confident-looking things over correct ones. Design for the brain people actually have, not the one you wish they had.',
  },
  {
    id: 'cognitive-load',
    name: 'Cognitive Load',
    tagline: 'Every decision you did not make, they now have to.',
    explanation:
      'Interfaces have a mental tax, and unclear ones charge more. Reduce the number of things a person has to think about at once, or they will simply stop thinking and leave.',
  },
  {
    id: 'doherty-threshold',
    name: 'Doherty Threshold',
    tagline: 'Four hundred milliseconds or you lose them.',
    explanation:
      'Keep response times under about 400ms and people stay locked into a productive rhythm with your product. Cross that line and attention starts to drift, spinner or not.',
  },
  {
    id: 'fittss-law',
    name: "Fitts's Law",
    tagline: 'Small and far away is a design choice against your user.',
    explanation:
      'The time it takes to hit a target depends on its size and distance from the starting point. That tiny close button in the corner is not minimalist. It is a math problem you set them up to fail.',
  },
  {
    id: 'flow',
    name: 'Flow',
    tagline: 'The good kind of forgetting you exist.',
    explanation:
      'People do their best work, and enjoy it most, when fully absorbed in a task with clear goals and immediate feedback. A single badly timed interruption or confusing modal can break it instantly.',
  },
  {
    id: 'goal-gradient-effect',
    name: 'Goal-Gradient Effect',
    tagline: 'The closer they get, the harder they push.',
    explanation:
      'Motivation increases as the finish line gets visible, which is exactly why progress bars and "80% complete" profile meters work. Show people how close they are, not just that they started.',
  },
  {
    id: 'hicks-law',
    name: "Hick's Law",
    tagline: 'Every extra option is a tax on their patience.',
    explanation:
      'Decision time increases with the number and complexity of choices in front of someone. A menu with 30 items is not thorough. It is a decision you outsourced to someone who did not ask for it.',
  },
  {
    id: 'jakobs-law',
    name: "Jakob's Law",
    tagline: 'Your users live on every other app but yours.',
    explanation:
      'People expect your product to work like the ones they already know. Novelty in navigation is rarely the flex you think it is — familiarity is a feature, not a lack of imagination.',
  },
  {
    id: 'law-of-common-region',
    name: 'Law of Common Region',
    tagline: 'A shared border says "we belong together" louder than color ever will.',
    explanation:
      'Elements enclosed in the same boundary read as one group, regardless of how far apart or differently styled they are. A card outline can do grouping work that five margin adjustments cannot.',
  },
  {
    id: 'law-of-proximity',
    name: 'Law of Proximity',
    tagline: 'Distance is a relationship status.',
    explanation:
      'Things placed close together are read as related; things placed far apart are read as unrelated, whether you meant that or not. Your spacing is making claims about your content whether you intended to or not.',
  },
  {
    id: 'law-of-pragnanz',
    name: 'Law of Prägnanz',
    tagline: 'People will simplify your mess for you, whether you like the result or not.',
    explanation:
      'Given a complex shape or layout, the eye reduces it to the simplest form it can recognize. If you do not control that simplification, the interface will get read as something you never designed.',
  },
  {
    id: 'law-of-similarity',
    name: 'Law of Similarity',
    tagline: 'Same look, same job — that is the deal you are making.',
    explanation:
      'Elements that share color, shape, or size are perceived as related, even when scattered across the screen. Style two unrelated buttons identically and users will assume they do the same thing.',
  },
  {
    id: 'law-of-uniform-connectedness',
    name: 'Law of Uniform Connectedness',
    tagline: 'A line between two things is a promise they belong together.',
    explanation:
      'Elements visually connected by a line, arrow, or shared container are perceived as more related than elements with no visual connection, even overriding proximity or similarity. Connect things on purpose.',
  },
  {
    id: 'mental-model',
    name: 'Mental Model',
    tagline: 'They are not using your app. They are using their idea of your app.',
    explanation:
      'Every user carries a simplified internal theory of how your product works, built from past experience. Design that violates the mental model feels broken even when it is technically correct.',
  },
  {
    id: 'millers-law',
    name: "Miller's Law",
    tagline: 'Seven items, give or take two, before the brain taps out.',
    explanation:
      'Working memory holds roughly 7±2 chunks of information at once. A nav bar with eleven top-level items is not organized. It is a memory test nobody agreed to take.',
  },
  {
    id: 'occams-razor',
    name: "Occam's Razor",
    tagline: 'The simplest explanation wins, and so does the simplest flow.',
    explanation:
      'Among competing solutions, the one with the fewest assumptions is usually correct — or in design terms, the one with the fewest steps is usually the one that ships.',
  },
  {
    id: 'paradox-of-the-active-user',
    name: 'Paradox of the Active User',
    tagline: 'Nobody is reading the manual. Ever.',
    explanation:
      'People start using a product immediately and skip documentation entirely, favoring the shortest path to a result over learning the "right" way. Design assuming zero instructions were read, because they were not.',
  },
  {
    id: 'pareto-principle',
    name: 'Pareto Principle',
    tagline: 'Twenty percent of your app is doing all the work.',
    explanation:
      'Roughly 80% of outcomes come from 20% of causes — in product terms, a small slice of features drives most of the usage. Find that slice and stop diluting it with features nobody asked for.',
  },
  {
    id: 'parkinsons-law',
    name: "Parkinson's Law",
    tagline: 'Give a task a week and it will take a week.',
    explanation:
      'Work expands to fill the time allotted to it. Onboarding flows and forms are no exception — an unconstrained process will always find a way to get longer, not shorter.',
  },
  {
    id: 'peak-end-rule',
    name: 'Peak-End Rule',
    tagline: 'They will forget the middle. They will never forget the ending.',
    explanation:
      'People judge an entire experience by its most intense moment and how it concluded, not by the average of every step. A rough journey with a great final screen beats a smooth one that fizzles out.',
  },
  {
    id: 'postels-law',
    name: "Postel's Law",
    tagline: 'Be lenient with what you accept, strict with what you send.',
    explanation:
      'Forgive messy user input — extra spaces, odd formatting, typos in obvious places — while keeping your own output clean and predictable. Rejecting a phone number over a stray dash is a choice, not a requirement.',
  },
  {
    id: 'selective-attention',
    name: 'Selective Attention',
    tagline: 'They are only looking for one thing. Everything else is invisible.',
    explanation:
      'People filter out anything irrelevant to their current goal, which is why banner blindness is real and your beautifully designed promo card is being scrolled past without registering at all.',
  },
  {
    id: 'serial-position-effect',
    name: 'Serial Position Effect',
    tagline: 'First and last. Never the middle.',
    explanation:
      'People remember the first and last items in a list far better than anything in between. Bury your most important option in the middle of a menu and it might as well not exist.',
  },
  {
    id: 'teslers-law',
    name: "Tesler's Law",
    tagline: 'The complexity has to live somewhere.',
    explanation:
      'Every system has a fixed amount of complexity that cannot be removed, only moved — usually from the interface onto the user, or from the user onto your engineering team. Choose which one absorbs it.',
  },
  {
    id: 'von-restorff-effect',
    name: 'Von Restorff Effect',
    tagline: 'The one that looks different is the one they remember.',
    explanation:
      'An item that stands out from its surroundings is far more memorable than one that blends in. This is the entire argument for having exactly one primary button, not four equally loud ones.',
  },
  {
    id: 'working-memory',
    name: 'Working Memory',
    tagline: 'The scratchpad in their head is smaller than you think.',
    explanation:
      'Working memory holds information only briefly and in small amounts before it drops out. Do not make someone remember a code on one screen to re-type it on the next. Just let it persist.',
  },
  {
    id: 'zeigarnik-effect',
    name: 'Zeigarnik Effect',
    tagline: 'Unfinished business does not leave quietly.',
    explanation:
      'People remember incomplete tasks better than completed ones, which is exactly why an unfinished progress bar or an open loop notification is so effective at pulling someone back in.',
  },
];
