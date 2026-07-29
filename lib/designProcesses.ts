import { Resource, ResourceCollection } from './resources';

export const DESIGN_PROCESSES: Resource[] = [
  {
    id: 'double-diamond',
    name: 'Double Diamond',
    tagline: 'Diverge before you converge. Twice.',
    explanation:
      'A four-stage model — Discover, Define, Develop, Deliver — where each half widens the space of possibilities before narrowing to a decision. The first diamond finds the right problem; the second finds the right solution. Skipping the divergent half of either diamond is how teams solve the wrong problem, confidently.',
    origins:
      'Published by the UK Design Council in 2005 after studying the design processes of eleven global companies. It became one of the most widely taught visual models for design process because it names the shape of good divergent thinking rather than just listing steps.',
    furtherReading: [
      { label: 'Design Council, The Double Diamond (designcouncil.org.uk).', url: 'https://www.designcouncil.org.uk/our-resources/the-double-diamond/' },
      'Design Council (2005). Eleven Lessons: A Study of the Design Process.',
    ],
  },
  {
    id: 'design-thinking',
    name: 'Design Thinking',
    tagline: 'Empathize, Define, Ideate, Prototype, Test — then do it again.',
    explanation:
      'A human-centered problem-solving framework built on five non-linear stages. It insists that you understand people before you define the problem, and that you build cheap, testable prototypes before you commit to a direction — treating every solution as a hypothesis, not a conclusion.',
    origins:
      "Popularized by Stanford's d.school and IDEO through the 1990s–2000s, drawing on design methods research going back to Herbert Simon's 1969 The Sciences of the Artificial. IDEO CEO Tim Brown's 2008 Harvard Business Review article brought the term into mainstream business language.",
    furtherReading: [
      { label: "Stanford d.school, An Introduction to Design Thinking (dschool.stanford.edu).", url: 'https://dschool.stanford.edu/resources/getting-started-with-design-thinking' },
      'Brown, T. (2008). Design Thinking — Harvard Business Review.',
      'Simon, H. (1969). The Sciences of the Artificial.',
    ],
  },
  {
    id: 'design-sprint',
    name: 'Design Sprint',
    tagline: 'Five days from problem to tested prototype.',
    explanation:
      'A time-boxed five-day process — Understand, Sketch, Decide, Prototype, Test — that compresses months of debate into one week by forcing a team to commit to a single direction and validate it with real users before writing production code.',
    origins:
      'Developed by Jake Knapp at Google Ventures starting in 2010, refined across more than 100 sprints with GV portfolio companies, and published as a step-by-step methodology in the 2016 book Sprint.',
    furtherReading: [
      { label: 'Knapp, J., Zeratsky, J., Kowitz, B. — GV Sprint methodology (thesprintbook.com).', url: 'https://www.thesprintbook.com/' },
      'Knapp, J. et al. (2016). Sprint: How to Solve Big Problems and Test New Ideas in Just Five Days.',
    ],
  },
  {
    id: 'lean-ux',
    name: 'Lean UX',
    tagline: 'Ship the smallest thing that proves or kills the assumption.',
    explanation:
      'Applies Lean Startup\'s build-measure-learn loop to design: state your riskiest assumption as a hypothesis, build the smallest experiment that could disprove it, and let outcomes — not deliverables — decide what happens next. Documentation exists to align the team, not to look thorough.',
    origins:
      "Formalized by Jeff Gothelf and Josh Seiden in their 2013 book Lean UX, building directly on Eric Ries's 2011 Lean Startup and agile software practices that were displacing waterfall-style design handoffs at the time.",
    furtherReading: [
      'Gothelf, J. & Seiden, J. (2013). Lean UX: Applying Lean Principles to Improve User Experience.',
      'Ries, E. (2011). The Lean Startup.',
    ],
  },
  {
    id: 'jobs-to-be-done',
    name: 'Jobs to Be Done',
    tagline: "People don't want a product. They want progress.",
    explanation:
      'Reframes design and product decisions around the "job" a customer is hiring a product to do, rather than customer demographics or product features. A milkshake and a banana can compete for the same job — a commute-friendly breakfast — even though nothing about them looks alike on a spec sheet.',
    origins:
      "Developed by Clayton Christensen and collaborators through the 2000s as an extension of his innovation research, most famously illustrated by the 2007 McDonald's milkshake study conducted with Bob Moesta.",
    furtherReading: [
      'Christensen, C. et al. (2016). Competing Against Luck: The Story of Innovation and Customer Choice.',
      { label: 'Christensen Institute, Know Your Customers\' Jobs to Be Done (hbr.org).', url: 'https://hbr.org/2016/09/know-your-customers-jobs-to-be-done' },
    ],
  },
  {
    id: 'agile-scrum',
    name: 'Agile / Scrum',
    tagline: 'Work in short loops, and inspect what the loop produced.',
    explanation:
      'An iterative framework organizing work into fixed-length sprints, each ending in a working increment and a retrospective. For design, it means shipping in small, reviewable slices rather than delivering one enormous handoff — trading up-front certainty for the ability to correct course every sprint.',
    origins:
      "Scrum was formalized by Ken Schwaber and Jeff Sutherland in the early 1990s and later folded into the 2001 Agile Manifesto, a response by seventeen software practitioners against heavyweight, documentation-first development processes.",
    furtherReading: [
      { label: 'Beck, K. et al. (2001). Manifesto for Agile Software Development (agilemanifesto.org).', url: 'https://agilemanifesto.org/' },
      'Schwaber, K. & Sutherland, J. — The Scrum Guide.',
    ],
  },
  {
    id: 'usability-testing',
    name: 'Usability Testing',
    tagline: 'Five users will show you most of what\'s broken.',
    explanation:
      'Watching real people attempt real tasks with a design, without helping them, is the fastest way to separate what a team assumes is intuitive from what actually is. It surfaces friction that no amount of internal review or opinion can predict, because the team already knows how their own interface works.',
    origins:
      'Formalized as a discipline through the 1980s–90s usability engineering movement; Jakob Nielsen and Tom Landauer\'s 1993 research established that a handful of test participants reveal the large majority of usability problems, popularizing small-sample qualitative testing over large quantitative studies.',
    furtherReading: [
      { label: 'Nielsen, J. — Why You Only Need to Test with 5 Users (nngroup.com).', url: 'https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/' },
      "Nielsen, J. & Landauer, T. (1993). A Mathematical Model of the Finding of Usability Problems — INTERCHI '93.",
    ],
  },
  {
    id: 'design-critique',
    name: 'Design Critique',
    tagline: 'Feedback on the work, aimed at the goal — not opinions on taste.',
    explanation:
      'A structured review where a team evaluates a design against its stated goals and constraints, rather than personal preference. Good critique asks "does this solve the problem we agreed on?" instead of "would I have done it this way?" — separating the designer\'s ego from the decision being made.',
    origins:
      "Adapted from the crit tradition in architecture and art schools, brought into product design practice and written up widely by practitioners like Adam Morse and in Tom Greever's 2015 book on articulating design decisions to stakeholders.",
    furtherReading: [
      'Greever, T. (2015). Articulating Design Decisions.',
      { label: 'Morse, A. — The Art of Critique (medium.com).', url: 'https://medium.com/@adamdmorse/the-art-of-critique-3e455cd1cdba' },
    ],
  },
  {
    id: 'whiteboarding',
    name: 'Whiteboarding',
    tagline: 'The fastest way to think out loud in front of other people.',
    explanation:
      'Quick, disposable sketching and diagramming on a shared surface — a real whiteboard or its digital equivalent — used to externalize thinking before committing to a polished tool. The point is speed and shared visibility, not a keepable artifact; nobody critiques a whiteboard sketch\'s pixel alignment.',
    origins:
      "A long design-studio sketching tradition formalized as a facilitation staple by consultancies like IDEO from the 1990s onward, and later adapted into the tech industry's 'whiteboard challenge' design-interview format through the 2010s as a fast way to observe how a candidate actually thinks.",
    furtherReading: [
      { label: 'Interaction Design Foundation, Sketching and Prototyping (interaction-design.org).', url: 'https://www.interaction-design.org/literature/topics/sketching' },
    ],
  },
];

const SOURCE_URL = 'https://www.designcouncil.org.uk/our-resources/the-double-diamond/';

export const PROCESSES_COLLECTION: ResourceCollection = {
  key: 'processes',
  title: 'DESIGN PROCESSES',
  breadcrumbLabel: 'Design Processes',
  attribution: 'Adapted from design practice literature',
  sourceUrl: () => SOURCE_URL,
  items: DESIGN_PROCESSES,
};
