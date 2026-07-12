import { Resource, ResourceCollection } from './resources';

export const COGNITIVE_BIASES: Resource[] = [
  {
    id: 'anchoring-bias',
    name: 'Anchoring Bias',
    tagline: 'The first number you see becomes the ruler for every number after.',
    explanation:
      'People rely too heavily on the first piece of information offered when making decisions. A crossed-out "original price" next to a sale price isn\'t decoration — it sets the anchor the discount is judged against, even when the original price was never real.',
    origins:
      "Identified and named by Amos Tversky and Daniel Kahneman in their 1974 paper on judgment heuristics, part of the research that eventually won Kahneman the 2002 Nobel Prize in Economics.",
    furtherReading: [
      'Tversky, A. & Kahneman, D. (1974). Judgment under Uncertainty: Heuristics and Biases — Science.',
      'Kahneman, D. (2011). Thinking, Fast and Slow.',
    ],
  },
  {
    id: 'confirmation-bias',
    name: 'Confirmation Bias',
    tagline: 'We go looking for the evidence that agrees with us.',
    explanation:
      'The tendency to search for, interpret, and recall information in a way that confirms existing beliefs. In research, it shows up as leading questions in a user interview or a designer only noticing the feedback that validates the direction they already picked.',
    origins:
      "The pattern was studied experimentally by Peter Wason starting in 1960 with his card-selection task, and the term itself entered wide psychological use through the 1960s–70s as more studies replicated the effect across domains.",
    furtherReading: [
      "Wason, P. (1960). On the Failure to Eliminate Hypotheses in a Conceptual Task — Quarterly Journal of Experimental Psychology.",
      { label: 'Nickerson, R. (1998). Confirmation Bias: A Ubiquitous Phenomenon in Many Guises — Review of General Psychology.', url: 'https://psycnet.apa.org/doi/10.1037/1089-2680.2.2.175' },
    ],
  },
  {
    id: 'peak-end-rule-bias',
    name: 'Peak-End Rule',
    tagline: 'We judge an experience by its most intense moment and its finish, not its average.',
    explanation:
      'People remember an experience largely based on how it felt at its peak (best or worst) and at its end, largely ignoring the overall duration or average. This is why one broken step at checkout can wreck the memory of an otherwise smooth flow — and why a strong final screen can rescue a rocky one.',
    origins:
      "Demonstrated by Daniel Kahneman, Barbara Fredrickson, and colleagues in a 1993 study using painful cold-water immersion, showing subjects preferred a trial with more total pain if it ended on a less painful note.",
    furtherReading: [
      'Kahneman, D., Fredrickson, B. et al. (1993). When More Pain Is Preferred to Less: Adding a Better End — Psychological Science.',
    ],
  },
  {
    id: 'loss-aversion',
    name: 'Loss Aversion',
    tagline: 'Losing $20 hurts more than finding $20 feels good.',
    explanation:
      'People weigh potential losses roughly twice as heavily as equivalent gains. It\'s why "don\'t lose your streak" motivates more reliably than "gain a bonus," and why a free trial that starts by giving you something (then threatens to take it away) converts better than one that simply offers a discount.',
    origins:
      "Central to Prospect Theory, developed by Daniel Kahneman and Amos Tversky in their landmark 1979 paper, which challenged decades of classical economic assumptions about rational, symmetric evaluation of gains and losses.",
    furtherReading: [
      'Kahneman, D. & Tversky, A. (1979). Prospect Theory: An Analysis of Decision under Risk — Econometrica.',
    ],
  },
  {
    id: 'choice-overload-bias',
    name: 'Choice Overload',
    tagline: 'More options can mean less action.',
    explanation:
      'Beyond a certain point, additional choices increase cognitive burden and decision anxiety rather than satisfaction, sometimes leading people to defer the decision entirely. A pricing page with three plans converts differently than one with nine, independent of what those plans actually offer.',
    origins:
      'Most famously demonstrated by Sheena Iyengar and Mark Lepper\'s 2000 "jam study," which found a display of 6 jams produced ten times more purchases than a display of 24 — though later meta-analyses show the effect is real but more context-dependent than the original study implied.',
    furtherReading: [
      "Iyengar, S. & Lepper, M. (2000). When Choice Is Demotivating — Journal of Personality and Social Psychology.",
      'Scheibehenne, B. et al. (2010). Can There Ever Be Too Many Options? A Meta-Analytic Review — Journal of Consumer Research.',
    ],
  },
  {
    id: 'framing-effect',
    name: 'Framing Effect',
    tagline: 'The same fact, worded two ways, produces two different decisions.',
    explanation:
      '"90% fat-free" and "10% fat" describe the identical product but are received completely differently, because people react to how a choice is presented (as a gain or a loss) more than to its actual substance. Copywriting choices are rarely neutral — they are framing decisions whether the writer intends it or not.',
    origins:
      "Demonstrated in Kahneman and Tversky's 1981 'Asian disease' experiment, part of the same Prospect Theory research program that produced loss aversion, showing identical outcomes framed as gains vs. losses flipped people's stated preferences.",
    furtherReading: [
      'Tversky, A. & Kahneman, D. (1981). The Framing of Decisions and the Psychology of Choice — Science.',
    ],
  },
  {
    id: 'iso-effect',
    name: 'IKEA Effect',
    tagline: 'People overvalue what they helped build.',
    explanation:
      'Effort disproportionately increases how much people value the resulting product, even when the objective quality is unchanged — the same reason a customized onboarding flow that asks users to make a few setup choices creates more attachment than one that configures everything automatically for them.',
    origins:
      'Named and demonstrated by Michael Norton, Daniel Mochon, and Dan Ariely in a 2011 paper, where participants who assembled their own IKEA furniture, origami, or Lego valued their creations far more than equivalent pre-built items.',
    furtherReading: [
      'Norton, M., Mochon, D., Ariely, D. (2011). The IKEA Effect: When Labor Leads to Love — Journal of Consumer Psychology.',
    ],
  },
  {
    id: 'zeigarnik-effect-bias',
    name: 'Zeigarnik Effect',
    tagline: 'Unfinished tasks nag at memory harder than finished ones.',
    explanation:
      'People remember interrupted or incomplete tasks better than completed ones, because the mind keeps rehearsing what it hasn\'t resolved. A progress bar stuck at 80% or a course marked "in progress" pulls people back far more effectively than a static, unstarted item ever could.',
    origins:
      'Discovered by Soviet psychologist Bluma Zeigarnik in 1927 after her professor, Kurt Lewin, noticed a waiter could recall complex unpaid orders in detail but forgot them instantly once the bill was settled.',
    furtherReading: [
      'Zeigarnik, B. (1927). Das Behalten erledigter und unerledigter Handlungen — Psychologische Forschung.',
    ],
  },
  {
    id: 'survivorship-bias',
    name: 'Survivorship Bias',
    tagline: 'You only hear from the ones who made it.',
    explanation:
      'Focusing on the people or things that "survived" a process while overlooking those that didn\'t, which skews conclusions. Studying only successful products (or the users who stuck around long enough to give feedback) hides the much larger, silent group who churned before anyone thought to ask them why.',
    origins:
      "Popularized through statistician Abraham Wald's WWII analysis for the US military: instead of armoring the parts of returning bombers riddled with bullet holes, he argued for armoring the parts with no holes — because planes hit there hadn't survived to be studied.",
    furtherReading: [
      'Mangel, M. & Samaniego, F. (1984). Abraham Wald\'s Work on Aircraft Survivability — Journal of the American Statistical Association.',
    ],
  },
];

const SOURCE_URL = 'https://en.wikipedia.org/wiki/List_of_cognitive_biases';

export const BIASES_COLLECTION: ResourceCollection = {
  key: 'biases',
  title: 'COGNITIVE BIASES',
  breadcrumbLabel: 'Cognitive Biases',
  attribution: 'Adapted from behavioral psychology research',
  sourceUrl: () => SOURCE_URL,
  items: COGNITIVE_BIASES,
};
