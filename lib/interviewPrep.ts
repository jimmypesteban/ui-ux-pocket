import { Resource, ResourceCollection } from './resources';

// Real UI/UX design interview questions, adapted from startup.jobs. The
// explanations below are written fresh for this app rather than reproducing
// their sample answers — think of "origins" here as "why this gets asked"
// and "further reading" as the source list itself.

export const INTERVIEW_QUESTIONS: Resource[] = [
  {
    id: 'portfolio-walkthrough',
    name: 'Walk Me Through a Portfolio Piece',
    tagline: 'Not "what did you make" — "what was broken, and what changed."',
    explanation:
      'Asks you to narrate a real project end to end: the problem, the constraint, the decision you made and why, and what actually got better afterward. A strong answer names a number or a concrete before/after — a weak one describes the final screens and stops there.',
    origins:
      'This is the single most common opener in design interviews, because a portfolio full of polished screens says nothing about how you think — only a walkthrough does.',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'design-process-tight-timelines',
    name: 'Your Process, Under a Tight Timeline',
    tagline: 'Everyone has a process. Fewer people can say what they\'d cut first.',
    explanation:
      'Describing discovery-to-delivery is the easy half of this question. The half that actually gets evaluated is what you compress when a deadline shrinks — do you cut research, cut fidelity, or cut scope? Naming the cut, and why that one is safest, is the real answer.',
    origins:
      'Startups ask this because "what\'s your process" alone just tests memorized steps; adding time pressure tests judgment.',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'mvp-limited-data',
    name: 'Designing an MVP With Almost Nothing to Go On',
    tagline: 'The smallest thing that could possibly be wrong, tested fast.',
    explanation:
      'With little data and two weeks, the job isn\'t to design less carefully — it\'s to find the one path that has to work and build only that, then validate it with a handful of real users before the deadline instead of after.',
    origins:
      'This tests whether you default to "build everything smaller" or genuinely rethink scope down to a single testable slice.',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'scrappy-user-research',
    name: 'Scrappy Research That Actually Changed a Decision',
    tagline: 'Five hallway conversations can outrank a survey nobody reads.',
    explanation:
      'The interviewer isn\'t asking whether you can run research — they\'re asking whether you\'ve ever made do with too little time or budget and still found something real enough to change a design. Naming the specific insight, not just the method, is what separates this answer from a research-methods lecture.',
    origins:
      'A near-universal startup reality: research budgets are the first thing cut, and the job still has to get done.',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'design-tool-stack',
    name: 'Your Tools, and Why Those Specifically',
    tagline: 'The tools matter less than what you use them to prevent.',
    explanation:
      'Naming Figma is not the answer. Naming Figma because Auto Layout keeps handoff specs from drifting out of sync with engineering — that\'s the answer. This question is really asking how deliberately you\'ve thought about speed, consistency, and communication, with tool names as the evidence.',
    origins:
      'A fluency check disguised as a preferences question — it reveals whether tool choices are habits or decisions.',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'onboarding-drop-off-diagnosis',
    name: 'Diagnosing a 60% Onboarding Drop-Off',
    tagline: 'The dashboard tells you where. Only a person can tell you why.',
    explanation:
      'A number this specific is a trap for anyone who jumps straight to redesigning. The right first move is diagnosis — segment the funnel, watch session replays, form a real hypothesis — and only then propose a fix, tested small before it ships wide.',
    origins:
      'Tests whether you reach for evidence before you reach for a redesign — a distinction that separates senior from junior instincts.',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'accessible-fast-roadmap',
    name: 'Accessibility Without Slowing the Roadmap',
    tagline: 'Bake it into the system once. Stop re-deciding it every sprint.',
    explanation:
      'The honest answer isn\'t "I always prioritize accessibility" — it\'s a mechanism: contrast-checked color tokens, focus states built into components, a lightweight audit habit, so accessibility is inherited by default instead of relitigated on every feature.',
    origins:
      'Startups ask this specifically because "accessibility takes too long" is the objection they\'ve already heard internally — they want to know if you have a real answer to it.',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'conflicting-stakeholder-feedback',
    name: 'When Stakeholders Disagree With Each Other',
    tagline: 'Two opinions in a room. Neither of them is the user.',
    explanation:
      'Naming who wanted what is not the point — resolving it by returning to a shared metric or user scenario is. The strongest version of this answer ends with a test that settled the disagreement with evidence, not with whoever argued loudest winning.',
    origins:
      'A direct probe for political maturity: can you de-escalate a disagreement without either avoiding it or becoming the tiebreaker by fiat?',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'design-system-early-stage',
    name: 'Starting a Design System From Nothing',
    tagline: 'Tokens and a handful of components beat a beautiful, unused library.',
    explanation:
      'At an early-stage company a design system built too early is a museum nobody visits. The right shape is minimal — an audit of what already exists, a small set of tokens, a few high-traffic components — with room to grow rather than a fully speculative library upfront.',
    origins:
      'Tests scope judgment: can you build the 20% of a design system that actually gets used, instead of the 100% that looks impressive in a portfolio?',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'data-vs-user-feedback',
    name: 'When the Data and the Users Disagree',
    tagline: 'Enthusiasm in an interview and lift in a metric are not the same evidence.',
    explanation:
      'People can genuinely love something that doesn\'t move a number — often because it wasn\'t reaching the audience it was built for. Before trusting either signal, the real work is asking whether the data measured the right cohort and whether the feedback came from the right users.',
    origins:
      'A judgment test for handling contradictory signals without simply picking whichever one is more convenient to believe.',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'ambiguous-problem-statements',
    name: 'Designing Before the Problem Is Even Clear',
    tagline: 'You don\'t need the answer yet. You need a hypothesis you can test.',
    explanation:
      'Ambiguity doesn\'t get resolved by waiting for more clarity from above — it gets resolved by turning the vague thing into a specific, testable guess, sketching against that guess, and letting a few real conversations either confirm or correct it fast.',
    origins:
      'Early-stage teams live in ambiguity permanently; this checks whether you create structure or wait for someone else to provide it.',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'engineer-collaboration-design-debt',
    name: 'Working With Engineers Without Accruing Design Debt',
    tagline: 'Debt happens in the silence between design and dev, not in either room alone.',
    explanation:
      'The teams that avoid design debt aren\'t the ones with the most detailed specs — they\'re the ones who involve engineering during discovery, not after decisions are already made, and who treat "matches the design" as part of done, not a nice-to-have.',
    origins:
      'Design-debt questions probe whether quality is a shared responsibility for you, or something you hand off and hope survives.',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'wearing-multiple-hats',
    name: 'Doing Work Outside the Design Job Description',
    tagline: 'Small teams don\'t have a lane. They have whatever needs doing.',
    explanation:
      'The useful part of this story isn\'t that you did something outside design — plenty of people can say that. It\'s that you protected the core design outcomes while doing it, instead of letting the extra work quietly become your whole job.',
    origins:
      'Startups are explicitly checking for scope elasticity — whether you\'ll bend under a gap in the team or wait for someone to fill it.',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'measuring-design-success',
    name: 'Measuring Whether a Design Actually Worked',
    tagline: 'Shipped is not the same as succeeded.',
    explanation:
      'A design without a defined success metric can\'t fail — which sounds nice until you realize it also can\'t improve. The stronger habit is picking one primary metric before launch, checking it against a baseline afterward, and treating the result as the start of the next iteration, not the end of the project.',
    origins:
      'Separates designers who think in deliverables from designers who think in outcomes — a distinction that matters a lot more at a startup than a portfolio review.',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'onboarding-competitive-audit',
    name: 'Auditing a Product You Don\'t Work At Yet',
    tagline: 'What you\'d notice in ten minutes, with nothing but the public app.',
    explanation:
      'This is a compressed version of the whole job: form a hypothesis from limited evidence, and say it plainly. A heuristic pass on the first-run experience plus a skim of public reviews for recurring complaints gets you most of the way to a credible, testable opinion.',
    origins:
      'A stand-in for "do you actually have product sense," asked in a way that doesn\'t require inside information to answer well.',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'innovation-vs-established-patterns',
    name: 'When to Innovate and When to Use the Obvious Pattern',
    tagline: 'Novelty has a cost. Spend it only where it earns something back.',
    explanation:
      'Reinventing a familiar pattern for its own sake just adds a small tax of confusion to every user who already knew the old one. The better default is to save genuine invention for the one or two moments that actually differentiate the product, and prove those moments work before shipping them.',
    origins:
      'Checks for restraint — whether creativity gets deployed strategically or gets spent everywhere it\'s merely possible to use it.',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'learning-from-a-design-miss',
    name: 'A Design That Didn\'t Perform As Expected',
    tagline: 'The interesting part isn\'t the mistake. It\'s what you did the week after.',
    explanation:
      'Anyone can admit a design underperformed. What actually answers this question is naming the specific evidence that revealed it — a metric, a support pattern, a usability session — and the concrete change that followed, not a vague "we learned and iterated."',
    origins:
      'Interviewers ask this because a portfolio of only-wins reads as either dishonest or untested — a real miss, handled well, reads as credible.',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'usability-testing-time-constrained',
    name: 'Usability Testing With Almost No Time',
    tagline: 'Three questions, five people, one afternoon — done well beats done thoroughly.',
    explanation:
      'Under real constraints, the discipline is in narrowing scope before the session, not compressing it during analysis. Pick a small number of priority questions, recruit just enough participants who match the real audience, and synthesize fast enough to still act on it.',
    origins:
      'A lean-testing check: do you know how to get a usable answer fast, or only how to run a textbook study when nobody\'s rushing you?',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'responsive-mobile-first',
    name: 'Responsive Design for Complex Web Apps',
    tagline: 'Mobile-first isn\'t about the small screen. It\'s about the small set of things that actually matter.',
    explanation:
      'Starting from the narrowest viewport forces a ruthless answer to "what does this screen absolutely need," which then scales up cleanly — versus starting wide and trying to cram a desktop\'s worth of decisions into a phone afterward.',
    origins:
      'Especially relevant for complex web apps, where a naive "just make it responsive" answer usually means the designer hasn\'t actually shipped one.',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'pivot-momentum-morale',
    name: 'Redesigning Through a Product Pivot',
    tagline: 'The flows changed. The reason people trust the roadmap can\'t.',
    explanation:
      'A pivot mid-project tests communication more than craft — restating the new goal clearly, sequencing the redesign so early wins are visible fast, and keeping the team informed as things change, so morale survives even when the plan doesn\'t stay fixed.',
    origins:
      'Startups pivot often enough that this isn\'t hypothetical for most of them — they\'re checking if you\'ve actually been through one.',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'staying-current-with-trends',
    name: 'Staying Current Without Chasing Fads',
    tagline: 'Notice everything. Adopt almost none of it.',
    explanation:
      'The useful version of "staying current" isn\'t a list of newsletters — it\'s a filter: does this trend solve a real problem your users have, or does it just look contemporary? Most trends fail that filter, and saying so is more convincing than pretending to adopt all of them.',
    origins:
      'A quiet test for whether design opinions are borrowed from what\'s popular or grounded in what actually serves the product.',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'influencing-product-strategy',
    name: 'Influencing Strategy, Not Just Executing It',
    tagline: 'The roadmap changed because of something you noticed, not something you were told.',
    explanation:
      'This question is checking for a specific kind of story: a piece of research or a design insight that surfaced an opportunity nobody had already prioritized, quantified well enough that leadership acted on it, and led somewhere measurable.',
    origins:
      'Distinguishes designers who execute a given roadmap from designers who help write it — a meaningfully different level of seniority.',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'design-to-dev-handoff',
    name: 'A Smooth Handoff to Engineering',
    tagline: 'The handoff isn\'t a file. It\'s everything that keeps the file from being misread.',
    explanation:
      'A clean handoff is annotated specs, defined edge cases and empty states, and a design QA pass before release — not just "here\'s the Figma link." The difference shows up later, in how many small inconsistencies ship versus get caught first.',
    origins:
      'Handoff quality is one of the most visible signals of craft discipline, because everyone downstream directly feels the gaps.',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
  {
    id: 'why-this-startup',
    name: 'Why This Startup, Specifically',
    tagline: 'A generic answer here reads as "any startup would do."',
    explanation:
      'This isn\'t really a question about motivation — it\'s a question about whether you\'ve actually looked at the product. Naming something specific about their stage, their users, or a problem you noticed in their existing experience is what separates a real answer from an interchangeable one.',
    origins:
      'Startups ask this last because by this point they want signal on cultural fit and genuine interest, not just competence.',
    furtherReading: [
      { label: 'startup.jobs, UI/UX Designer Interview Questions.', url: 'https://startup.jobs/interview-questions/ui-ux-designer' },
    ],
  },
];

const SOURCE_URL = 'https://startup.jobs/interview-questions/ui-ux-designer';

export const INTERVIEW_COLLECTION: ResourceCollection = {
  key: 'interview',
  title: 'INTERVIEW PREP',
  breadcrumbLabel: 'Interview Prep',
  attribution: 'Adapted from startup.jobs',
  sourceUrl: () => SOURCE_URL,
  items: INTERVIEW_QUESTIONS,
};
