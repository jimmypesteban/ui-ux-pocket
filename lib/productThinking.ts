import { Resource, ResourceCollection } from './resources';

export const PRODUCT_THINKING: Resource[] = [
  {
    id: 'jobs-to-be-done-product',
    name: 'Jobs to Be Done',
    tagline: "Customers hire products to make progress.",
    explanation:
      'A lens for prioritization that asks what "job" a customer is trying to get done, independent of any existing feature set. Two products that look nothing alike can compete for the same job — which means your real competition is rarely who your feature-comparison chart says it is.',
    origins:
      "Developed by Clayton Christensen and collaborators through the 2000s, most famously demonstrated through the 2007 McDonald's milkshake study, which found people \"hired\" milkshakes for a boring commute, not because they were the best-tasting option.",
    furtherReading: [
      'Christensen, C. et al. (2016). Competing Against Luck: The Story of Innovation and Customer Choice.',
      { label: "Christensen Institute, Know Your Customers' Jobs to Be Done (hbr.org).", url: 'https://hbr.org/2016/09/know-your-customers-jobs-to-be-done' },
    ],
  },
  {
    id: 'rice-scoring',
    name: 'RICE Prioritization',
    tagline: 'Reach × Impact × Confidence ÷ Effort.',
    explanation:
      'A scoring formula for ranking competing ideas on the same scale: how many people it reaches, how much it moves the needle, how confident you actually are in those numbers, and how much it costs to build. It doesn\'t remove judgment — it forces the judgment into the open where it can be argued with.',
    origins:
      'Introduced by Intercom\'s product team (Sean McBride) around 2016 as an internal prioritization framework, later published publicly and widely adopted as an alternative to purely gut-feel roadmapping.',
    furtherReading: [
      { label: 'Intercom, How We Prioritize Work (intercom.com).', url: 'https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/' },
    ],
  },
  {
    id: 'north-star-metric',
    name: 'North Star Metric',
    tagline: 'One number the whole team steers by.',
    explanation:
      'A single metric chosen to represent the core value a product delivers to customers — not revenue, which is a lagging result, but the leading behavior that predicts it (e.g. Spotify\'s "time spent listening"). Every team\'s roadmap gets judged by whether it moves that one number.',
    origins:
      'Popularized in the mid-2010s by growth practitioners including Sean Ellis and firms like Amplitude, as SaaS and consumer-growth teams needed one shared metric to align product, marketing, and engineering around instead of siloed departmental KPIs.',
    furtherReading: [
      { label: 'Amplitude, North Star Playbook (amplitude.com).', url: 'https://amplitude.com/north-star' },
    ],
  },
  {
    id: 'mvp',
    name: 'Minimum Viable Product',
    tagline: 'Build the smallest thing that teaches you something real.',
    explanation:
      'The version of a new product with just enough features to be usable by early customers, who then provide feedback for future development. An MVP is not a smaller, worse version of the final product — it is the fastest possible loop for turning an assumption into evidence.',
    origins:
      'The term was coined by Frank Robinson around 2001 and brought to mainstream product practice by Eric Ries\'s 2011 book The Lean Startup, which framed it as the core unit of the build-measure-learn cycle.',
    furtherReading: [
      'Ries, E. (2011). The Lean Startup.',
    ],
  },
  {
    id: 'opportunity-solution-tree',
    name: 'Opportunity Solution Tree',
    tagline: 'Map the problem space before you fall in love with an answer.',
    explanation:
      'A visual structure connecting a single desired outcome to the customer opportunities (pain points, needs) that could drive it, and then to the range of solutions that could address each opportunity — making it visible when a team has jumped straight to one solution without considering the alternatives beside it.',
    origins:
      "Developed and popularized by product coach Teresa Torres through the 2010s as part of her continuous discovery habits practice, published in her 2021 book of the same name.",
    furtherReading: [
      { label: 'Torres, T. — Opportunity Solution Trees (producttalk.org).', url: 'https://www.producttalk.org/2016/08/opportunity-solution-tree/' },
      'Torres, T. (2021). Continuous Discovery Habits.',
    ],
  },
  {
    id: 'kano-model',
    name: 'Kano Model',
    tagline: 'Not all features make customers equally happy.',
    explanation:
      'Classifies features into categories — basic expectations, performance features, and delighters — based on the non-linear relationship between how much of a feature you deliver and how satisfied it makes customers. A missing basic expectation causes outsized anger; an added delighter causes outsized joy, but only until it becomes the new baseline.',
    origins:
      'Developed by Noriaki Kano and colleagues, published in 1984 in Japanese quality-management research, and later adopted widely in product management as a way to reason about feature prioritization beyond a flat "more is better" assumption.',
    furtherReading: [
      'Kano, N. et al. (1984). Attractive Quality and Must-Be Quality — Journal of the Japanese Society for Quality Control.',
    ],
  },
  {
    id: 'aarrr-metrics',
    name: 'AARRR (Pirate Metrics)',
    tagline: 'Acquisition, Activation, Retention, Referral, Revenue.',
    explanation:
      'A five-stage funnel for diagnosing where a product is actually losing people — getting users in the door is a different problem than getting them to come back, and a different problem again from getting them to pay or refer others. Fixing the wrong stage wastes effort on people who were never going to convert anyway.',
    origins:
      'Coined by investor and startup advisor Dave McClure in a 2007 presentation, the acronym\'s cheeky pronunciation ("pirate metrics") stuck because it gave early-stage startups one memorable framework for growth analytics.',
    furtherReading: [
      { label: 'McClure, D. — Startup Metrics for Pirates (slideshare.net).', url: 'https://www.slideshare.net/dmc500hats/startup-metrics-for-pirates-long-version' },
    ],
  },
  {
    id: 'product-market-fit',
    name: 'Product-Market Fit',
    tagline: 'When the market pulls the product out of your hands.',
    explanation:
      'The point at which a product satisfies real market demand strongly enough that growth stops being a matter of persuasion and starts being a matter of keeping up. Before it, most metrics are noise; after it, the hard part shifts from "will anyone want this" to "how do we scale delivering it."',
    origins:
      'The term was coined by venture capitalist Marc Andreessen in a 2007 essay, which described it as the single most important thing for any new startup, ahead of team or even the specific product itself.',
    furtherReading: [
      { label: 'Andreessen, M. — The Only Thing That Matters (pmarchive.com).', url: 'https://pmarchive.com/guide_to_startups_part4.html' },
    ],
  },
];

const SOURCE_URL = 'https://www.producttalk.org/2016/08/opportunity-solution-tree/';

export const PRODUCT_COLLECTION: ResourceCollection = {
  key: 'product',
  title: 'PRODUCT THINKING',
  breadcrumbLabel: 'Product Thinking',
  attribution: 'Adapted from product management literature',
  sourceUrl: () => SOURCE_URL,
  items: PRODUCT_THINKING,
};
