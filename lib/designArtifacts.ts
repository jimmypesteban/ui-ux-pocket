import { Resource, ResourceCollection } from './resources';

export const DESIGN_ARTIFACTS: Resource[] = [
  {
    id: 'persona',
    name: 'Persona',
    tagline: 'A fictional stand-in for the user you keep forgetting is a real person.',
    explanation:
      'A composite archetype built from real research — goals, frustrations, context — used to keep a team designing for an actual person instead of an abstract "the user." A persona built from opinions instead of interviews is just a mood board with a fake name on it.',
    origins:
      "Popularized by Alan Cooper through his 1980s–90s software consulting practice and formalized in his 1999 book The Inmates Are Running the Asylum, which argued that designing for an implied 'elastic user' produces software that fits no one well.",
    furtherReading: [
      'Cooper, A. (1999). The Inmates Are Running the Asylum.',
      { label: 'Cooper, A. — The Origin of Personas (cooper.com).', url: 'https://www.cooper.com/journal/2008/5/the-origin-of-personas' },
    ],
  },
  {
    id: 'empathy-map',
    name: 'Empathy Map',
    tagline: 'What they say is rarely all of what they think.',
    explanation:
      'A four-quadrant canvas — Says, Thinks, Does, Feels — that separates a user\'s stated words from their unspoken attitudes and observed behavior. Filling it in forces a team to notice the gap between what a person tells you in an interview and what they actually do.',
    origins:
      "Developed by Dave Gray and popularized through XPLANE's collaborative-visualization practice, later published in the widely used 2010 book Gamestorming by Gray, Brown, and Macanufo, and adopted into Stanford d.school's design thinking curriculum.",
    furtherReading: [
      'Gray, D., Brown, S., Macanufo, J. (2010). Gamestorming: A Playbook for Innovators, Rulebreakers, and Changemakers.',
      { label: "Stanford d.school, Empathy Map (dschool-old.stanford.edu).", url: 'https://dschool-old.stanford.edu/sandbox/groups/designresources/wiki/70bfe/attachments/f9f42/Empathy%20Map.pdf' },
    ],
  },
  {
    id: 'user-journey-map',
    name: 'User Journey Map',
    tagline: 'The story of a task, stage by stage, including the parts that hurt.',
    explanation:
      'A timeline of a user\'s steps toward a goal, plotted against their emotional highs and lows at each stage. It exposes the moments a product actually breaks trust — often not the feature everyone argues about, but a quiet handoff between two steps nobody owns.',
    origins:
      "Rooted in service blueprinting, introduced by Lynn Shostack in her 1984 Harvard Business Review article 'Designing Services That Deliver.' The user-journey-map format was adapted from that service-design lineage into digital product practice through the 2000s and 2010s.",
    furtherReading: [
      'Shostack, G.L. (1984). Designing Services That Deliver — Harvard Business Review.',
      { label: 'Nielsen Norman Group, Journey Mapping 101 (nngroup.com).', url: 'https://www.nngroup.com/articles/journey-mapping-101/' },
    ],
  },
  {
    id: 'affinity-diagram',
    name: 'Affinity Diagram',
    tagline: 'A hundred loose notes, sorted until the patterns show themselves.',
    explanation:
      'A method for grouping many individual observations — sticky notes from interviews, survey comments, bug reports — into emergent themes, built bottom-up rather than sorted into categories decided in advance. The clusters that form are often more honest than the ones a team would have guessed at.',
    origins:
      "Developed as the KJ Method by Japanese anthropologist Jiro Kawakita in the 1960s. It entered UX practice through Hugh Beyer and Karen Holtzblatt's Contextual Design methodology, published in their 1998 book, which used it to synthesize contextual-inquiry field data.",
    furtherReading: [
      'Beyer, H. & Holtzblatt, K. (1998). Contextual Design: Defining Customer-Centered Systems.',
      { label: 'Nielsen Norman Group, Affinity Diagramming (nngroup.com).', url: 'https://www.nngroup.com/articles/affinity-diagram/' },
    ],
  },
  {
    id: 'crazy-eights',
    name: 'Crazy 8s',
    tagline: 'Eight ideas in eight minutes — bad ones included, on purpose.',
    explanation:
      'A rapid-sketching exercise: fold a page into eight panels and force one distinct idea into each in under a minute apiece. The speed is the feature — it silences the inner critic long enough for a genuinely strange idea to reach paper before judgment kills it.',
    origins:
      "A long-standing sketching-studio technique formalized and named within Google Ventures' Design Sprint methodology, published by Jake Knapp, John Zeratsky, and Braden Kowitz in their 2016 book Sprint as the standard divergent-sketching step before a sprint's decision-making phase.",
    furtherReading: [
      { label: 'GV, Crazy 8s (library.gv.com).', url: 'https://library.gv.com/the-crazy-8s-7f0c7ab86720' },
      'Knapp, J., Zeratsky, J., Kowitz, B. (2016). Sprint: How to Solve Big Problems and Test New Ideas in Just Five Days.',
    ],
  },
  {
    id: 'design-workshop',
    name: 'Design Workshop',
    tagline: 'The room where stakeholders build the answer together, instead of arguing about it after.',
    explanation:
      'A structured, facilitated session bringing designers, engineers, and stakeholders together to align, ideate, or decide as a group — rather than one person designing in isolation and presenting a finished answer for others to react to. Good facilitation, not seniority, decides whose ideas make it to the wall.',
    origins:
      "Traces to the Scandinavian participatory design movement of the 1970s, led by researchers like Kristen Nygaard and Pelle Ehn, who argued that the workers affected by a system should help design it — a principle that generalized into the collaborative workshop formats used across product and UX teams today.",
    furtherReading: [
      'Ehn, P. (1988). Work-Oriented Design of Computer Artifacts.',
      { label: 'Interaction Design Foundation, Participatory Design (interaction-design.org).', url: 'https://www.interaction-design.org/literature/topics/participatory-design' },
    ],
  },
  {
    id: 'wireframe',
    name: 'Wireframe',
    tagline: 'Structure first, style later — on purpose.',
    explanation:
      'A low-fidelity layout showing what goes where — hierarchy, structure, flow — with typography, color, and imagery deliberately left out. Stripping the visual polish keeps early conversation on whether the structure works, instead of whether someone likes the shade of blue.',
    origins:
      "The term is borrowed from 3D computer graphics, where a 'wireframe model' shows an object's underlying structure with no surface rendering. It was adopted into web and software design through the 1990s–2000s as tools like Visio and later Balsamick and Figma made low-fidelity layout sketching a distinct step in the process.",
    furtherReading: [
      { label: 'Nielsen Norman Group, Low-Fidelity Prototyping (nngroup.com).', url: 'https://www.nngroup.com/articles/paper-prototyping/' },
    ],
  },
  {
    id: 'design-system',
    name: 'Design System',
    tagline: 'One source of truth, so ten teams stop reinventing the same button.',
    explanation:
      'A shared library of components, tokens, and guidelines that keeps a product\'s interface consistent across teams and platforms without every designer re-deciding what a button looks like. It is a product in its own right — one with its own users, roadmap, and maintenance cost.',
    origins:
      "Popularized publicly through mid-2010s releases like Google's Material Design (2014) and Salesforce's Lightning Design System (2015), and codified methodologically by Brad Frost's Atomic Design framework, published as a book in 2016 after several years developed as a blog series.",
    furtherReading: [
      'Frost, B. (2016). Atomic Design.',
      { label: 'Google, Material Design (m3.material.io).', url: 'https://m3.material.io/' },
    ],
  },
  {
    id: 'component-library',
    name: 'Component Library',
    tagline: 'Build the atoms once. Assemble everything else from them.',
    explanation:
      'A catalog of reusable interface pieces — buttons, inputs, cards — built once to a single spec and reused everywhere, rather than rebuilt slightly differently on every screen. It is the buildable half of a design system; the guidelines are the other half.',
    origins:
      "Formalized within Brad Frost's Atomic Design methodology (2013–2016), which breaks interfaces into atoms, molecules, organisms, templates, and pages — a direct analogy to chemistry meant to make component hierarchy legible to both designers and engineers.",
    furtherReading: [
      'Frost, B. (2016). Atomic Design.',
      { label: 'Frost, B. — Atomic Design Methodology (atomicdesign.bradfrost.com).', url: 'https://atomicdesign.bradfrost.com/chapter-2/' },
    ],
  },
  {
    id: 'style-guide',
    name: 'Style Guide',
    tagline: 'The rules for how the brand looks, so nobody has to guess.',
    explanation:
      'A reference document defining a product or brand\'s visual language — color, type, spacing, tone of voice — so that any designer or writer touching the product produces something recognizably consistent, without needing to ask.',
    origins:
      'Descended from print-era editorial style guides such as The Chicago Manual of Style (first published 1906), adapted into visual brand guideline documents through 20th-century corporate identity design and later into dedicated digital UI style guides as the web matured through the early 2000s.',
    furtherReading: [
      { label: 'Nielsen Norman Group, Style Guides, Pattern Libraries, and Design Systems (nngroup.com).', url: 'https://www.nngroup.com/articles/style-guides-pattern-libraries-design-systems/' },
    ],
  },
  {
    id: 'prd',
    name: 'PRD (Product Requirements Document)',
    tagline: 'What we\'re building, for whom, and why — written down before anyone builds it.',
    explanation:
      'A document defining a feature\'s purpose, scope, and success criteria before engineering work begins, aligning stakeholders on what "done" means. A PRD that only lists features and skips the "why" invites a team to build the wrong thing extremely well.',
    origins:
      'A staple of traditional product management practice going back to structured software development processes of the 1980s–90s, refined for modern, lean product teams through practitioners like Marty Cagan, whose writing (including the 2008 and 2017 editions of Inspired) argued for outcome-focused PRDs over exhaustive spec documents.',
    furtherReading: [
      'Cagan, M. (2017). Inspired: How to Create Tech Products Customers Love.',
    ],
  },
  {
    id: 'user-story-ticket',
    name: 'User Story / Ticket',
    tagline: '"As a [user], I want [goal], so that [benefit]" — the smallest unit of shippable intent.',
    explanation:
      'A short, plain-language description of a piece of work from the user\'s point of view, sized small enough to build, test, and ship within a single sprint. The format exists to keep every ticket answerable to a real user need, not just a task on a list.',
    origins:
      "Originated within Extreme Programming, developed by Kent Beck in the late 1990s, and formalized into the widely used template and estimation practices by Mike Cohn in his 2004 book User Stories Applied, which remains the standard reference for the format.",
    furtherReading: [
      'Cohn, M. (2004). User Stories Applied: For Agile Software Development.',
      { label: 'Beck, K. — Extreme Programming Explained (worldcat.org record).', url: 'https://www.oreilly.com/library/view/extreme-programming-explained/0201616416/' },
    ],
  },
];

const SOURCE_URL = 'https://www.nngroup.com/articles/journey-mapping-101/';

export const ARTIFACTS_COLLECTION: ResourceCollection = {
  key: 'artifacts',
  title: 'DESIGN ARTIFACTS',
  breadcrumbLabel: 'Design Artifacts',
  attribution: 'Adapted from UX & product practice literature',
  sourceUrl: () => SOURCE_URL,
  items: DESIGN_ARTIFACTS,
};
