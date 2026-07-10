import { Resource, ResourceCollection } from './resources';

const NNGROUP_URL = 'https://www.nngroup.com/articles/ten-usability-heuristics/';

const SHARED_ORIGINS =
  'Introduced by Jakob Nielsen in 1994 as a refinement of the heuristic set he developed with Rolf Molich in 1990, based on a factor analysis of 249 usability problems. The ten heuristics remain the most widely taught framework for heuristic evaluation in the field.';

const SHARED_READING: Resource['furtherReading'] = [
  "Nielsen, J. & Molich, R. (1990). Heuristic Evaluation of User Interfaces — CHI '90.",
  "Nielsen, J. (1994). Enhancing the Explanatory Power of Usability Heuristics — CHI '94.",
  { label: 'Nielsen Norman Group, 10 Usability Heuristics for User Interface Design (nngroup.com).', url: NNGROUP_URL },
];

export const NN_HEURISTICS: Resource[] = [
  {
    id: 'visibility-of-system-status',
    name: 'Visibility of System Status',
    tagline: "If they don't know what's happening, they'll assume it's broken.",
    explanation:
      'The system should always keep users informed about what is going on, through appropriate feedback within a reasonable time. A spinner that never resolves is worse than no spinner at all — silence reads as failure.',
    origins: SHARED_ORIGINS,
    furtherReading: SHARED_READING,
  },
  {
    id: 'match-system-real-world',
    name: 'Match Between System and the Real World',
    tagline: 'Speak their language, not your database schema.',
    explanation:
      'The system should speak the users\' language, with words, phrases, and concepts familiar to them, rather than internal jargon. Follow real-world conventions, making information appear in a natural and logical order.',
    origins: SHARED_ORIGINS,
    furtherReading: SHARED_READING,
  },
  {
    id: 'user-control-freedom',
    name: 'User Control and Freedom',
    tagline: 'Every action needs an undo, an exit, or both.',
    explanation:
      'Users often perform actions by mistake and need a clearly marked "emergency exit" to leave an unwanted state without a lecture. Support undo and redo — do not trap people inside their own errors.',
    origins: SHARED_ORIGINS,
    furtherReading: SHARED_READING,
  },
  {
    id: 'consistency-standards',
    name: 'Consistency and Standards',
    tagline: "Don't make them learn your app twice.",
    explanation:
      'Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform and industry conventions instead of inventing new ones for their own sake.',
    origins: SHARED_ORIGINS,
    furtherReading: SHARED_READING,
  },
  {
    id: 'error-prevention',
    name: 'Error Prevention',
    tagline: 'The best error message is the one that never has to appear.',
    explanation:
      'Even better than a good error message is a careful design that prevents a problem from occurring in the first place — eliminating error-prone conditions or catching them with a confirmation before they happen.',
    origins: SHARED_ORIGINS,
    furtherReading: SHARED_READING,
  },
  {
    id: 'recognition-over-recall',
    name: 'Recognition Rather Than Recall',
    tagline: "Show it. Don't make them remember it.",
    explanation:
      'Minimize the user\'s memory load by making elements, actions, and options visible. The user should not have to recall information from one part of the interface while working in another.',
    origins: SHARED_ORIGINS,
    furtherReading: SHARED_READING,
  },
  {
    id: 'flexibility-efficiency',
    name: 'Flexibility and Efficiency of Use',
    tagline: 'Novices need guardrails. Experts need shortcuts.',
    explanation:
      'Accelerators — unseen by novice users — can speed up interaction for experts, so the same interface serves someone on their first day and someone on their thousandth without either one suffering for it.',
    origins: SHARED_ORIGINS,
    furtherReading: SHARED_READING,
  },
  {
    id: 'aesthetic-minimalist-design',
    name: 'Aesthetic and Minimalist Design',
    tagline: 'Every extra element competes with the one that matters.',
    explanation:
      'Interfaces should not contain information that is irrelevant or rarely needed. Every extra unit of information competes with the relevant units and quietly diminishes their visibility.',
    origins: SHARED_ORIGINS,
    furtherReading: SHARED_READING,
  },
  {
    id: 'help-recognize-diagnose-recover',
    name: 'Help Users Recognize, Diagnose, and Recover from Errors',
    tagline: 'Say what went wrong, in plain language, with a way out.',
    explanation:
      'Error messages should be expressed in plain language, precisely indicate the problem, and constructively suggest a solution. An error code is not a message — it is a homework assignment.',
    origins: SHARED_ORIGINS,
    furtherReading: SHARED_READING,
  },
  {
    id: 'help-documentation',
    name: 'Help and Documentation',
    tagline: 'The best help is not needing it. The second best is finding it fast.',
    explanation:
      'Even a system usable without documentation may need to provide help. Any such information should be easy to search, focused on the user\'s task, and short enough that anyone actually reads it.',
    origins: SHARED_ORIGINS,
    furtherReading: SHARED_READING,
  },
];

export const HEURISTICS_COLLECTION: ResourceCollection = {
  key: 'heuristics',
  title: '10 USABILITY HEURISTICS',
  breadcrumbLabel: '10 Usability Heuristics',
  attribution: 'Adapted from nngroup.com',
  sourceUrl: () => NNGROUP_URL,
  items: NN_HEURISTICS,
};
