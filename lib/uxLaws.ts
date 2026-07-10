import { Resource, ResourceCollection } from './resources';

export type UxLaw = Resource;

export const UX_LAWS: UxLaw[] = [
  {
    id: 'aesthetic-usability-effect',
    name: 'Aesthetic-Usability Effect',
    tagline: 'Pretty things get the benefit of the doubt.',
    explanation:
      'Users assume attractive interfaces work better, even when the underlying usability is identical. This buys you patience during onboarding. It does not excuse a broken checkout flow forever.',
    origins:
      'Documented in 1995 by Masaaki Kurosu and Kaori Kashimura at Hitachi, who tested ATM interfaces and found perceived ease-of-use correlated more strongly with visual appeal than with actual usability. Don Norman later popularized the effect, tying it to positive emotion widening tolerance for friction.',
    furtherReading: [
      'Kurosu, M. & Kashimura, K. (1995). Apparent Usability vs. Inherent Usability — CHI \'95 Conference Companion.',
      'Don Norman, Emotional Design: Why We Love (or Hate) Everyday Things (2004).',
    ],
  },
  {
    id: 'choice-overload',
    name: 'Choice Overload',
    tagline: 'More options is not more freedom.',
    explanation:
      'Past a certain point, every extra choice makes people less likely to decide at all. A settings screen with forty toggles is not empowering anyone. It is a maze with no exit sign.',
    origins:
      'Best known from Sheena Iyengar and Mark Lepper\'s 2000 "jam study," where a farmer\'s-market table offering 6 jams sold far better than one offering 24 — more browsing, far fewer purchases. It builds on Herbert Simon\'s earlier work on bounded rationality and decision fatigue.',
    furtherReading: [
      'Iyengar, S. & Lepper, M. (2000). When Choice is Demotivating — Journal of Personality and Social Psychology.',
      'Barry Schwartz, The Paradox of Choice: Why More Is Less (2004).',
    ],
  },
  {
    id: 'chunking',
    name: 'Chunking',
    tagline: 'Nobody remembers sixteen digits at once.',
    explanation:
      'Group related information into small clusters and people can actually hold onto it. This is why phone numbers have dashes and your form should have sections, not one endless scroll.',
    origins:
      'Introduced by George A. Miller in the same 1956 paper that produced Miller\'s Law. Miller observed that people recall sequences far better when items are regrouped into meaningful clusters rather than held as one long unbroken string.',
    furtherReading: [
      'Miller, G. A. (1956). The Magical Number Seven, Plus or Minus Two — Psychological Review.',
      'Susan Weinschenk, 100 Things Every Designer Needs to Know About People (2011).',
    ],
  },
  {
    id: 'cognitive-bias',
    name: 'Cognitive Bias',
    tagline: 'Your users are not rational. Neither are you.',
    explanation:
      'People consistently misjudge probability, anchor on the first number they see, and trust confident-looking things over correct ones. Design for the brain people actually have, not the one you wish they had.',
    origins:
      'The modern catalog of biases traces to Amos Tversky and Daniel Kahneman\'s research through the 1970s on heuristics and judgment under uncertainty, which showed that predictable, systematic errors — not just randomness — shape human decisions.',
    furtherReading: [
      'Tversky, A. & Kahneman, D. (1974). Judgment Under Uncertainty: Heuristics and Biases — Science.',
      'Daniel Kahneman, Thinking, Fast and Slow (2011).',
    ],
  },
  {
    id: 'cognitive-load',
    name: 'Cognitive Load',
    tagline: 'Every decision you did not make, they now have to.',
    explanation:
      'Interfaces have a mental tax, and unclear ones charge more. Reduce the number of things a person has to think about at once, or they will simply stop thinking and leave.',
    origins:
      'Formalized as Cognitive Load Theory by educational psychologist John Sweller in 1988, describing how working memory has a finite capacity for processing new information — a constraint just as real in software interfaces as in classrooms.',
    furtherReading: [
      'Sweller, J. (1988). Cognitive Load During Problem Solving — Cognitive Science.',
      'Steve Krug, Don\'t Make Me Think (2000).',
    ],
  },
  {
    id: 'doherty-threshold',
    name: 'Doherty Threshold',
    tagline: 'Four hundred milliseconds or you lose them.',
    explanation:
      'Keep response times under about 400ms and people stay locked into a productive rhythm with your product. Cross that line and attention starts to drift, spinner or not.',
    origins:
      'Named for Walter J. Doherty, whose 1982 IBM research with Ahrvind J. Thadhani found that sub-400ms system response times measurably increased both user productivity and engagement compared to slower response.',
    furtherReading: [
      'Doherty, W. J. & Thadhani, A. J. (1982). The Economic Value of Rapid Response Time — IBM Report.',
      'Jakob Nielsen, Usability Engineering (1993).',
    ],
  },
  {
    id: 'fittss-law',
    name: "Fitts's Law",
    tagline: 'Small and far away is a design choice against your user.',
    explanation:
      'The time it takes to hit a target depends on its size and distance from the starting point. That tiny close button in the corner is not minimalist. It is a math problem you set them up to fail.',
    origins:
      'Derived by psychologist Paul Fitts in 1954 while studying human motor control, producing a formula for movement time as a function of target distance and width. It remains one of the most reliably reproduced findings in human-computer interaction.',
    furtherReading: [
      'Fitts, P. M. (1954). The Information Capacity of the Human Motor System — Journal of Experimental Psychology.',
      'Bruce Tognazzini, First Principles of Interaction Design (askTog.com).',
    ],
  },
  {
    id: 'flow',
    name: 'Flow',
    tagline: 'The good kind of forgetting you exist.',
    explanation:
      'People do their best work, and enjoy it most, when fully absorbed in a task with clear goals and immediate feedback. A single badly timed interruption or confusing modal can break it instantly.',
    origins:
      'Coined by psychologist Mihaly Csikszentmihalyi, who spent decades interviewing artists, athletes, and workers about peak absorption before publishing his synthesis in 1990, describing flow as the balance point between a task\'s challenge and a person\'s skill.',
    furtherReading: [
      'Mihaly Csikszentmihalyi, Flow: The Psychology of Optimal Experience (1990).',
      'Jenova Chen, Flow in Games (2006 USC thesis, on designing for flow states).',
    ],
  },
  {
    id: 'goal-gradient-effect',
    name: 'Goal-Gradient Effect',
    tagline: 'The closer they get, the harder they push.',
    explanation:
      'Motivation increases as the finish line gets visible, which is exactly why progress bars and "80% complete" profile meters work. Show people how close they are, not just that they started.',
    origins:
      'First observed in rats by behaviorist Clark Hull in the 1930s, who noted they ran faster the closer they got to a food reward. Ran Kivetz, Oleg Urminsky, and Yuhuang Zheng confirmed the same acceleration in humans with a 2006 café loyalty-card field study.',
    furtherReading: [
      'Hull, C. L. (1932). The Goal-Gradient Hypothesis and Maze Learning — Psychological Review.',
      'Kivetz, R., Urminsky, O., & Zheng, Y. (2006). The Goal-Gradient Hypothesis Resurrected — Journal of Marketing Research.',
    ],
  },
  {
    id: 'hicks-law',
    name: "Hick's Law",
    tagline: 'Every extra option is a tax on their patience.',
    explanation:
      'Decision time increases with the number and complexity of choices in front of someone. A menu with 30 items is not thorough. It is a decision you outsourced to someone who did not ask for it.',
    origins:
      'Established independently by William Edmund Hick and Ray Hyman in a pair of 1952 studies measuring reaction time against the number of stimulus-response alternatives, giving the effect its common name, the Hick-Hyman Law.',
    furtherReading: [
      'Hick, W. E. (1952). On the Rate of Gain of Information — Quarterly Journal of Experimental Psychology.',
      'Hyman, R. (1953). Stimulus Information as a Determinant of Reaction Time — Journal of Experimental Psychology.',
    ],
  },
  {
    id: 'jakobs-law',
    name: "Jakob's Law",
    tagline: 'Your users live on every other app but yours.',
    explanation:
      'People expect your product to work like the ones they already know. Novelty in navigation is rarely the flex you think it is — familiarity is a feature, not a lack of imagination.',
    origins:
      'Named for usability consultant Jakob Nielsen, who articulated it in the early 2000s as web conventions solidified — arguing that fighting established patterns costs more in relearning than it gains in distinctiveness.',
    furtherReading: [
      'Jakob Nielsen, End of Web Design Redux (Nielsen Norman Group, 2000).',
      'Steve Krug, Don\'t Make Me Think (2000).',
    ],
  },
  {
    id: 'law-of-common-region',
    name: 'Law of Common Region',
    tagline: 'A shared border says "we belong together" louder than color ever will.',
    explanation:
      'Elements enclosed in the same boundary read as one group, regardless of how far apart or differently styled they are. A card outline can do grouping work that five margin adjustments cannot.',
    origins:
      'Proposed by psychologist Stephen Palmer in 1992 as an addition to the original Gestalt grouping principles, demonstrating that a shared enclosing boundary can override proximity and similarity entirely when determining perceived grouping.',
    furtherReading: [
      'Palmer, S. E. (1992). Common Region: A New Principle of Perceptual Grouping — Cognitive Psychology.',
      'Steven Bradley, Design Fundamentals: Elements, Attributes, and Principles (Vanseo Design).',
    ],
  },
  {
    id: 'law-of-proximity',
    name: 'Law of Proximity',
    tagline: 'Distance is a relationship status.',
    explanation:
      'Things placed close together are read as related; things placed far apart are read as unrelated, whether you meant that or not. Your spacing is making claims about your content whether you intended to or not.',
    origins:
      'One of the founding Gestalt principles of perceptual organization, first described by Max Wertheimer in his 1923 paper on perceived form, which argued the brain groups nearby elements into a single unit before it processes them individually.',
    furtherReading: [
      'Wertheimer, M. (1923). Laws of Organization in Perceptual Forms — Psycologische Forschung.',
      'Kurt Koffka, Principles of Gestalt Psychology (1935).',
    ],
  },
  {
    id: 'law-of-pragnanz',
    name: 'Law of Prägnanz',
    tagline: 'People will simplify your mess for you, whether you like the result or not.',
    explanation:
      'Given a complex shape or layout, the eye reduces it to the simplest form it can recognize. If you do not control that simplification, the interface will get read as something you never designed.',
    origins:
      'The umbrella principle of Gestalt theory, formalized by Max Wertheimer and Kurt Koffka in the 1920s. "Prägnanz" is German for conciseness — the claim being that perception always resolves ambiguous stimuli into the simplest, most orderly interpretation available.',
    furtherReading: [
      'Wertheimer, M. (1923). Laws of Organization in Perceptual Forms — Psycologische Forschung.',
      'Kurt Koffka, Principles of Gestalt Psychology (1935).',
    ],
  },
  {
    id: 'law-of-similarity',
    name: 'Law of Similarity',
    tagline: 'Same look, same job — that is the deal you are making.',
    explanation:
      'Elements that share color, shape, or size are perceived as related, even when scattered across the screen. Style two unrelated buttons identically and users will assume they do the same thing.',
    origins:
      'Another of the original Gestalt principles from Max Wertheimer\'s 1923 paper, showing that shared visual attributes cause the eye to group elements together even when proximity or alignment argue otherwise.',
    furtherReading: [
      'Wertheimer, M. (1923). Laws of Organization in Perceptual Forms — Psycologische Forschung.',
      'Steven Bradley, Design Fundamentals: Elements, Attributes, and Principles (Vanseo Design).',
    ],
  },
  {
    id: 'law-of-uniform-connectedness',
    name: 'Law of Uniform Connectedness',
    tagline: 'A line between two things is a promise they belong together.',
    explanation:
      'Elements visually connected by a line, arrow, or shared container are perceived as more related than elements with no visual connection, even overriding proximity or similarity. Connect things on purpose.',
    origins:
      'Added to the Gestalt canon in 1994 by Stephen Palmer and Irvin Rock, who showed that a visible connector between elements is a stronger grouping cue than either proximity or similarity alone.',
    furtherReading: [
      'Palmer, S. & Rock, I. (1994). Rethinking Perceptual Organization: The Role of Uniform Connectedness — Psychonomic Bulletin & Review.',
      'Steven Bradley, Design Fundamentals: Elements, Attributes, and Principles (Vanseo Design).',
    ],
  },
  {
    id: 'mental-model',
    name: 'Mental Model',
    tagline: 'They are not using your app. They are using their idea of your app.',
    explanation:
      'Every user carries a simplified internal theory of how your product works, built from past experience. Design that violates the mental model feels broken even when it is technically correct.',
    origins:
      'The term traces to psychologist Kenneth Craik\'s 1943 proposal that the mind builds small-scale internal models of reality to reason and predict. Don Norman brought the concept into design and HCI through his work on how people interpret everyday objects and systems.',
    furtherReading: [
      'Kenneth Craik, The Nature of Explanation (1943).',
      'Don Norman, The Design of Everyday Things (1988).',
    ],
  },
  {
    id: 'millers-law',
    name: "Miller's Law",
    tagline: 'Seven items, give or take two, before the brain taps out.',
    explanation:
      'Working memory holds roughly 7±2 chunks of information at once. A nav bar with eleven top-level items is not organized. It is a memory test nobody agreed to take.',
    origins:
      'Published by George A. Miller in 1956 in one of the most cited papers in psychology, synthesizing experiments across absolute judgment and memory span that repeatedly converged on the same narrow capacity limit.',
    furtherReading: [
      'Miller, G. A. (1956). The Magical Number Seven, Plus or Minus Two — Psychological Review.',
      'Nelson Cowan, The Magical Mystery Four (2010), a modern re-examination of the limit.',
    ],
  },
  {
    id: 'occams-razor',
    name: "Occam's Razor",
    tagline: 'The simplest explanation wins, and so does the simplest flow.',
    explanation:
      'Among competing solutions, the one with the fewest assumptions is usually correct — or in design terms, the one with the fewest steps is usually the one that ships.',
    origins:
      'Attributed to 14th-century Franciscan friar William of Ockham, who argued against multiplying explanatory entities beyond necessity. The principle predates computing by six centuries but maps cleanly onto minimizing steps and states in an interface.',
    furtherReading: [
      'William of Ockham, Summa Totius Logicae (c. 1323).',
      'Giles Colborne, Simple and Usable Web, Mobile, and Interaction Design (2010).',
    ],
  },
  {
    id: 'paradox-of-the-active-user',
    name: 'Paradox of the Active User',
    tagline: 'Nobody is reading the manual. Ever.',
    explanation:
      'People start using a product immediately and skip documentation entirely, favoring the shortest path to a result over learning the "right" way. Design assuming zero instructions were read, because they were not.',
    origins:
      'Named by John M. Carroll and Mary Beth Rosson in 1987, whose studies of office-software users found people consistently chose to explore and fumble rather than read manuals — even when it demonstrably cost them more time.',
    furtherReading: [
      'Carroll, J. M. & Rosson, M. B. (1987). Paradox of the Active User — Interfacing Thought: Cognitive Aspects of Human-Computer Interaction.',
      'Steve Krug, Don\'t Make Me Think (2000).',
    ],
  },
  {
    id: 'pareto-principle',
    name: 'Pareto Principle',
    tagline: 'Twenty percent of your app is doing all the work.',
    explanation:
      'Roughly 80% of outcomes come from 20% of causes — in product terms, a small slice of features drives most of the usage. Find that slice and stop diluting it with features nobody asked for.',
    origins:
      'Observed by economist Vilfredo Pareto in 1896, who noted that roughly 80% of Italy\'s land was owned by 20% of the population. Management consultant Joseph Juran later generalized it into the "vital few and trivial many" framing used across business and product design.',
    furtherReading: [
      'Vilfredo Pareto, Cours d\'économie politique (1896).',
      'Richard Koch, The 80/20 Principle (1997).',
    ],
  },
  {
    id: 'parkinsons-law',
    name: "Parkinson's Law",
    tagline: 'Give a task a week and it will take a week.',
    explanation:
      'Work expands to fill the time allotted to it. Onboarding flows and forms are no exception — an unconstrained process will always find a way to get longer, not shorter.',
    origins:
      'Coined by naval historian Cyril Northcote Parkinson in a satirical 1955 essay for The Economist about bureaucratic growth, opening with the line "work expands so as to fill the time available for its completion."',
    furtherReading: [
      'C. Northcote Parkinson, Parkinson\'s Law, or the Pursuit of Progress (1958 book, expanding the 1955 essay).',
    ],
  },
  {
    id: 'peak-end-rule',
    name: 'Peak-End Rule',
    tagline: 'They will forget the middle. They will never forget the ending.',
    explanation:
      'People judge an entire experience by its most intense moment and how it concluded, not by the average of every step. A rough journey with a great final screen beats a smooth one that fizzles out.',
    origins:
      'Identified by Daniel Kahneman and colleagues in the 1990s through experiments involving cold-water discomfort, where subjects preferred a longer trial with a gentler ending over a shorter one that simply stopped at peak discomfort.',
    furtherReading: [
      'Kahneman, D., Fredrickson, B. L., Schreiber, C. A., & Redelmeier, D. A. (1993). When More Pain Is Preferred to Less — Psychological Science.',
      'Daniel Kahneman, Thinking, Fast and Slow (2011).',
    ],
  },
  {
    id: 'postels-law',
    name: "Postel's Law",
    tagline: 'Be lenient with what you accept, strict with what you send.',
    explanation:
      'Forgive messy user input — extra spaces, odd formatting, typos in obvious places — while keeping your own output clean and predictable. Rejecting a phone number over a stray dash is a choice, not a requirement.',
    origins:
      'Also called the Robustness Principle, drawn from a line in Jon Postel\'s 1980 RFC 761 defining the early TCP specification. It has since migrated from network protocol design into general software and interface design practice.',
    furtherReading: [
      'Jon Postel, RFC 761: Transmission Control Protocol (1980).',
      'Eric S. Raymond, The Art of Unix Programming (2003), Chapter 1 on robustness.',
    ],
  },
  {
    id: 'selective-attention',
    name: 'Selective Attention',
    tagline: 'They are only looking for one thing. Everything else is invisible.',
    explanation:
      'People filter out anything irrelevant to their current goal, which is why banner blindness is real and your beautifully designed promo card is being scrolled past without registering at all.',
    origins:
      'Grounded in decades of attention research, most famously Daniel Simons and Christopher Chabris\'s 1999 "invisible gorilla" experiment, where viewers focused on counting basketball passes missed a person in a gorilla suit walking through the scene.',
    furtherReading: [
      'Simons, D. J. & Chabris, C. F. (1999). Gorillas in Our Midst: Sustained Inattentional Blindness — Perception.',
      'Benway, J. P. & Lane, D. M. (1998). Banner Blindness: Web Searchers Often Miss Obvious Links — Internetworking.',
    ],
  },
  {
    id: 'serial-position-effect',
    name: 'Serial Position Effect',
    tagline: 'First and last. Never the middle.',
    explanation:
      'People remember the first and last items in a list far better than anything in between. Bury your most important option in the middle of a menu and it might as well not exist.',
    origins:
      'Documented by Hermann Ebbinghaus in the 1880s through his pioneering self-experiments on memory and forgetting, which first identified the combined "primacy" and "recency" effects that make list-position matter.',
    furtherReading: [
      'Hermann Ebbinghaus, Über das Gedächtnis (Memory: A Contribution to Experimental Psychology) (1885).',
      'Murdock, B. B. (1962). The Serial Position Effect of Free Recall — Journal of Experimental Psychology.',
    ],
  },
  {
    id: 'teslers-law',
    name: "Tesler's Law",
    tagline: 'The complexity has to live somewhere.',
    explanation:
      'Every system has a fixed amount of complexity that cannot be removed, only moved — usually from the interface onto the user, or from the user onto your engineering team. Choose which one absorbs it.',
    origins:
      'Also called the Law of Conservation of Complexity, attributed to computer scientist Larry Tesler while working at Xerox PARC in the 1980s, who argued every application has an irreducible core of complexity that engineering can shift but never eliminate.',
    furtherReading: [
      'Larry Tesler, A Personal History of Modeless Text Editing and Cut/Copy-Paste (2012 retrospective referencing his complexity work).',
      'Alan Cooper, The Inmates Are Running the Asylum (1999).',
    ],
  },
  {
    id: 'von-restorff-effect',
    name: 'Von Restorff Effect',
    tagline: 'The one that looks different is the one they remember.',
    explanation:
      'An item that stands out from its surroundings is far more memorable than one that blends in. This is the entire argument for having exactly one primary button, not four equally loud ones.',
    origins:
      'Identified by German psychiatrist and pediatrician Hedwig von Restorff in 1933, whose memory experiments found an isolated, distinct item in a list of otherwise similar items was recalled disproportionately more often — also called the "isolation effect."',
    furtherReading: [
      'von Restorff, H. (1933). Über die Wirkung von Bereichsbildungen im Spurenfeld — Psychologische Forschung.',
      'Susan Weinschenk, 100 Things Every Designer Needs to Know About People (2011).',
    ],
  },
  {
    id: 'working-memory',
    name: 'Working Memory',
    tagline: 'The scratchpad in their head is smaller than you think.',
    explanation:
      'Working memory holds information only briefly and in small amounts before it drops out. Do not make someone remember a code on one screen to re-type it on the next. Just let it persist.',
    origins:
      'Formalized by Alan Baddeley and Graham Hitch in their 1974 multi-component model, which replaced the simpler idea of "short-term memory" with a more detailed system of temporary storage and active processing with clear capacity limits.',
    furtherReading: [
      'Baddeley, A. D. & Hitch, G. (1974). Working Memory — The Psychology of Learning and Motivation.',
      'Nelson Cowan, Working Memory Capacity (2005).',
    ],
  },
  {
    id: 'zeigarnik-effect',
    name: 'Zeigarnik Effect',
    tagline: 'Unfinished business does not leave quietly.',
    explanation:
      'People remember incomplete tasks better than completed ones, which is exactly why an unfinished progress bar or an open loop notification is so effective at pulling someone back in.',
    origins:
      'Discovered by Soviet psychologist Bluma Zeigarnik in 1927, reportedly after her advisor Kurt Lewin noticed waiters recalled unpaid orders far more accurately than ones already settled — an observation she then confirmed experimentally.',
    furtherReading: [
      'Zeigarnik, B. (1927). Das Behalten erledigter und unerledigter Handlungen — Psychologische Forschung.',
      'Kurt Lewin, A Dynamic Theory of Personality (1935).',
    ],
  },
];

export const LAWS_COLLECTION: ResourceCollection = {
  key: 'laws',
  title: 'LAWS OF UX',
  breadcrumbLabel: 'Laws of UX',
  attribution: 'Adapted from lawsofux.com',
  sourceUrl: (item) => `https://lawsofux.com/${item.id}/`,
  items: UX_LAWS,
};
