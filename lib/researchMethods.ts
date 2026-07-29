import { Resource, ResourceCollection } from './resources';

export const RESEARCH_METHODS: Resource[] = [
  {
    id: 'user-interviews',
    name: 'User Interviews',
    tagline: 'Ask, then actually listen — the highest-bandwidth research method there is.',
    explanation:
      'A structured or semi-structured conversation exploring a person\'s goals, frustrations, and past behavior — usually away from the task itself, unlike contextual inquiry. The skill is almost entirely in the listening: a leading question gets you the answer you wanted to hear, not the one that was true.',
    origins:
      "Draws on qualitative interviewing traditions from anthropology and sociology, adapted specifically for product and UX practice through books like Steve Portigal's 2013 Interviewing Users, which codified techniques for avoiding leading questions and getting past rehearsed answers.",
    furtherReading: [
      'Portigal, S. (2013). Interviewing Users: How to Uncover Compelling Insights.',
      { label: 'Nielsen Norman Group, User Interviews 101 (nngroup.com).', url: 'https://www.nngroup.com/articles/user-interviews/' },
    ],
  },
  {
    id: 'card-sorting',
    name: 'Card Sorting',
    tagline: 'Let people build your navigation for you.',
    explanation:
      'Participants sort topics into groups that make sense to them (open sort) or into categories you define (closed sort), revealing how your actual users mentally organize content — which is often nothing like how the team that built the product organizes it.',
    origins:
      'Rooted in psychological sorting tasks used to study categorization since the mid-20th century, adapted into information architecture practice through the 1980s–90s as software teams needed a way to design navigation structures around real user mental models rather than internal org charts.',
    furtherReading: [
      { label: 'Nielsen Norman Group, Card Sorting: Uncover Users\' Mental Models (nngroup.com).', url: 'https://www.nngroup.com/articles/card-sorting-definition/' },
    ],
  },
  {
    id: 'tree-testing',
    name: 'Tree Testing',
    tagline: 'Strip away the visuals. Can they still find it?',
    explanation:
      'Participants try to locate an item within a text-only hierarchy of your site or app\'s structure, with no styling or visual design to lean on. It isolates whether the navigation LABELS AND STRUCTURE work, independent of whatever the interface looks like.',
    origins:
      "Developed as a complementary technique to card sorting, popularized through tools like Treejack (Optimal Workshop) in the 2010s as UX teams needed to validate proposed information architectures before investing in visual design.",
    furtherReading: [
      { label: 'Nielsen Norman Group, Tree Testing (nngroup.com).', url: 'https://www.nngroup.com/articles/tree-testing/' },
    ],
  },
  {
    id: 'ab-testing-method',
    name: 'A/B Testing',
    tagline: 'Stop debating. Ship both and let the data decide.',
    explanation:
      'Two variants of a design are shown to different segments of live traffic, and the one that performs better against a defined metric wins. It replaces opinion-driven arguments about which button color converts better with an actual measured answer — at the cost of needing real traffic and a genuine hypothesis, not just a hunch to confirm.',
    origins:
      "Descended from randomized controlled trials in agricultural and medical statistics pioneered by Ronald Fisher in the 1920s, adapted into direct-mail marketing through the mid-20th century, and brought into software product development as web analytics matured through the 2000s.",
    furtherReading: [
      'Fisher, R.A. (1935). The Design of Experiments.',
      { label: 'Kohavi, R. et al. — Trustworthy Online Controlled Experiments (experimentguide.com).', url: 'https://www.experimentguide.com/' },
    ],
  },
  {
    id: 'first-click-testing',
    name: 'First-Click Testing',
    tagline: 'Get the first click right, and the rest of the task usually follows.',
    explanation:
      'Research shows that if a user\'s first click on a task is correct, they are far more likely to complete the task successfully — and if it\'s wrong, completion rates drop sharply. This method isolates and measures just that one decisive click, making it a fast, cheap proxy for whether a layout or label is guiding people correctly.',
    origins:
      "Formalized through research by Bob Bailey and Cari Wolfson in the mid-2000s, whose studies found first-click accuracy was one of the strongest predictors of overall task success, leading to dedicated first-click testing tools like Chalkmark.",
    furtherReading: [
      { label: 'Bailey, B. & Wolfson, C. — First Click Usability Testing (usabilitynews.org, archived research summary).', url: 'https://www.nngroup.com/articles/first-click/' },
    ],
  },
  {
    id: 'five-second-test',
    name: 'Five-Second Test',
    tagline: 'What does someone remember after a five-second glance?',
    explanation:
      'Participants view a design for just five seconds, then answer questions about what they recall — the main message, what stood out, what they\'d click first. It measures a screen\'s immediate clarity and visual hierarchy before analytical thinking has a chance to kick in, closer to how real users actually first encounter a page.',
    origins:
      "Popularized in UX practice through tools like Five Second Test (launched around 2008), building on longstanding advertising-research techniques for measuring immediate ad recall and first impressions.",
    furtherReading: [
      { label: 'Usability.gov, Five-Second Test (usability.gov archive via nngroup.com).', url: 'https://www.nngroup.com/articles/five-second-usability-test/' },
    ],
  },
  {
    id: 'diary-study',
    name: 'Diary Study',
    tagline: 'Behavior observed once is a moment. Behavior logged for weeks is a pattern.',
    explanation:
      'Participants record their experiences, tasks, and feelings related to a product over an extended period — days or weeks — in their own real context, rather than in a single lab session. It surfaces habits, workarounds, and pain points that only emerge with time and would never show up in a one-hour usability test.',
    origins:
      "Adapted from diary methods long used in sociology and health research to study behavior in natural settings over time, brought into HCI and UX research practice through the 1990s–2000s as researchers sought longitudinal insight beyond single-session lab studies.",
    furtherReading: [
      { label: 'Nielsen Norman Group, Diary Studies (nngroup.com).', url: 'https://www.nngroup.com/articles/diary-studies/' },
    ],
  },
  {
    id: 'contextual-inquiry',
    name: 'Contextual Inquiry',
    tagline: "Watch them do it in their world, not yours.",
    explanation:
      'A field research method where the researcher observes and interviews users while they perform real tasks in their actual environment — their office, their home, their workflow — rather than asking them to describe it afterward from memory or perform it artificially in a lab.',
    origins:
      "Developed by Hugh Beyer and Karen Holtzblatt in the early 1990s as the data-gathering foundation of their Contextual Design methodology, formalized in their 1998 book of the same name, which argued that people cannot reliably self-report their own work practices without observation.",
    furtherReading: [
      'Beyer, H. & Holtzblatt, K. (1998). Contextual Design: Defining Customer-Centered Systems.',
    ],
  },
  {
    id: 'guerrilla-testing',
    name: 'Guerrilla Testing',
    tagline: 'Five minutes, a coffee shop, and a stranger\'s honest reaction.',
    explanation:
      'Quick, informal usability tests conducted with whoever is willing — a coworker, a stranger in a café, a friend — trading rigor and representative sampling for speed and near-zero cost. It won\'t replace a proper study, but it catches glaring problems days or weeks before a formal one would even be scheduled.',
    origins:
      "Popularized by Jakob Nielsen and other discount usability advocates through the 1990s–2000s as a reaction against the cost and slowness of formal lab-based usability testing, arguing that fast, cheap, frequent testing beats infrequent, expensive perfection.",
    furtherReading: [
      { label: 'Nielsen Norman Group, Guerrilla HCI (nngroup.com).', url: 'https://www.nngroup.com/articles/guerrilla-hci/' },
    ],
  },
  {
    id: 'eye-tracking',
    name: 'Eye Tracking',
    tagline: 'Where people say they looked and where they actually looked are different things.',
    explanation:
      'Specialized hardware records exactly where a participant\'s gaze lands and for how long, producing heatmaps and gaze paths that reveal what actually draws attention on a screen — often contradicting what people report noticing when simply asked, since most visual attention is not consciously tracked.',
    origins:
      "Eye-tracking research dates to ophthalmology studies in the late 19th century, but its use in interface and advertising research grew through the 1980s–90s as hardware became less invasive, and it entered mainstream UX practice through the 2000s as the equipment became affordable enough for usability labs.",
    furtherReading: [
      { label: 'Nielsen Norman Group, F-Shaped Pattern for Reading Web Content (nngroup.com).', url: 'https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/' },
    ],
  },
  {
    id: 'survey-research',
    name: 'Survey Research',
    tagline: 'Ask a thousand people instead of watching five.',
    explanation:
      'Structured questionnaires collect self-reported attitudes, preferences, or behaviors from a large sample, trading the depth of qualitative methods for statistical breadth. Surveys answer "how many" and "how much" — they can\'t explain "why" nearly as well as watching someone struggle in person can.',
    origins:
      "Survey methodology as a formal statistical discipline developed through the early-to-mid 20th century alongside the rise of public opinion polling (notably Gallup's work in the 1930s), and was subsequently adapted into product and UX research as a standard tool for quantitative validation alongside qualitative methods.",
    furtherReading: [
      { label: 'Nielsen Norman Group, Survey Design (nngroup.com).', url: 'https://www.nngroup.com/articles/survey-design/' },
    ],
  },
  {
    id: 'product-analytics',
    name: 'Product Analytics',
    tagline: 'What a thousand silent users actually did, not what five vocal ones said.',
    explanation:
      'Event tracking, funnels, retention curves, and cohort analysis measure real behavior at scale from actual product usage — the quantitative complement to interviews and usability tests. It tells you where people drop off; it almost never tells you why, which is what qualitative methods are for.',
    origins:
      "Grew out of web analytics (Google Analytics, 2005) into dedicated event-level product analytics as SaaS teams needed behavioral data beyond pageviews — tools like Mixpanel (2009) and Amplitude (2012) formalized funnels, retention, and cohort analysis as standard product-team instrumentation.",
    furtherReading: [
      { label: 'Amplitude, North Star Playbook (amplitude.com).', url: 'https://amplitude.com/north-star' },
    ],
  },
];

const SOURCE_URL = 'https://www.nngroup.com/articles/which-ux-research-methods/';

export const RESEARCH_COLLECTION: ResourceCollection = {
  key: 'research',
  title: 'UX RESEARCH METHODS',
  breadcrumbLabel: 'UX Research Methods',
  attribution: 'Adapted from UX research literature',
  sourceUrl: () => SOURCE_URL,
  items: RESEARCH_METHODS,
};
