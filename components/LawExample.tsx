import { Fragment } from 'react';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

// Each law gets one small, literal diagram of the concept in action — not a
// mood-board illustration, a mechanism. Same line-art language as the rest
// of the app's icons: stroke-only, one weight, rounded caps/joins. Faded
// elements (opacity ~0.35) represent the "loses out" / "background" side of
// a comparison; full-opacity elements represent the "wins" / "foreground" side.

const STROKE = 3;
const VIEW = '0 0 260 120';

function content(id: string, color: string) {
  const dim = { opacity: 0.35 };

  switch (id) {
    case 'aesthetic-usability-effect':
      // plain button vs. styled button, same size — a star favors the pretty one
      return (
        <>
          <Rect x={20} y={44} width={90} height={34} rx={2} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Rect x={150} y={44} width={90} height={34} rx={10} stroke={color} strokeWidth={STROKE} fill="none" />
          <Path d="M195 30 L198 37 L206 38 L200 43 L202 51 L195 47 L188 51 L190 43 L184 38 L192 37 Z" fill={color} />
        </>
      );

    case 'choice-overload':
    case 'choice-overload-bias':
      // a hub of many equal options with a cursor stuck in the middle
      return (
        <>
          {Array.from({ length: 10 }, (_, i) => {
            const angle = (i / 10) * Math.PI * 2;
            const x = 130 + Math.cos(angle) * 46;
            const y = 60 + Math.sin(angle) * 40;
            return <Circle key={i} cx={x} cy={y} r={9} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />;
          })}
          <Circle cx={130} cy={60} r={6} fill={color} />
        </>
      );

    case 'chunking':
      // ten loose squares vs. three tidy groups
      return (
        <>
          {Array.from({ length: 10 }, (_, i) => (
            <Rect key={i} x={20 + i * 15} y={30} width={11} height={11} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          ))}
          {[0, 1, 2].map((g) => (
            <Fragment key={g}>
              {Array.from({ length: 3 }, (_, i) => (
                <Rect
                  key={i}
                  x={30 + g * 75 + i * 15}
                  y={78}
                  width={11}
                  height={11}
                  stroke={color}
                  strokeWidth={STROKE}
                  fill="none"
                />
              ))}
            </Fragment>
          ))}
        </>
      );

    case 'cognitive-bias':
      // a tilted balance scale
      return (
        <>
          <Line x1={130} y1={20} x2={130} y2={90} stroke={color} strokeWidth={STROKE} />
          <Line x1={70} y1={40} x2={190} y2={62} stroke={color} strokeWidth={STROKE} />
          <Line x1={70} y1={40} x2={70} y2={62} stroke={color} strokeWidth={STROKE} {...dim} />
          <Line x1={190} y1={62} x2={190} y2={84} stroke={color} strokeWidth={STROKE} />
          <Circle cx={70} cy={68} r={12} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Circle cx={190} cy={90} r={16} stroke={color} strokeWidth={STROKE} fill="none" />
          <Line x1={110} y1={90} x2={150} y2={90} stroke={color} strokeWidth={STROKE} />
        </>
      );

    case 'cognitive-load':
      // many arrows converging on a single point
      return (
        <>
          <Circle cx={130} cy={65} r={16} stroke={color} strokeWidth={STROKE} fill="none" />
          {Array.from({ length: 7 }, (_, i) => {
            const angle = (i / 6) * Math.PI - Math.PI / 2;
            const x = 130 + Math.cos(angle) * 60;
            const y = 65 + Math.sin(angle) * 46;
            return <Line key={i} x1={x} y1={y} x2={130 + Math.cos(angle) * 22} y2={65 + Math.sin(angle) * 22} stroke={color} strokeWidth={STROKE} {...dim} />;
          })}
        </>
      );

    case 'doherty-threshold':
      // a clock with the hand right at the fast/slow threshold line
      return (
        <>
          <Circle cx={110} cy={60} r={38} stroke={color} strokeWidth={STROKE} fill="none" />
          <Line x1={110} y1={60} x2={110} y2={32} stroke={color} strokeWidth={STROKE} />
          <Line x1={110} y1={60} x2={132} y2={68} stroke={color} strokeWidth={STROKE} />
          <Line x1={168} y1={22} x2={168} y2={98} stroke={color} strokeWidth={STROKE} strokeDasharray="6 6" {...dim} />
          <Path d="M190 50 L204 60 L190 70" stroke={color} strokeWidth={STROKE} fill="none" />
        </>
      );

    case 'fittss-law':
      // cursor approaching a near-big target and a far-small target
      return (
        <>
          <Circle cx={70} cy={60} r={3} fill={color} />
          <Path d="M70 60 L155 60" stroke={color} strokeWidth={STROKE} strokeDasharray="5 5" {...dim} />
          <Circle cx={170} cy={60} r={28} stroke={color} strokeWidth={STROKE} fill="none" />
          <Path d="M70 60 L235 30" stroke={color} strokeWidth={STROKE} strokeDasharray="5 5" {...dim} />
          <Circle cx={240} cy={28} r={9} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
        </>
      );

    case 'flow':
      // a smooth wave threading through a channel, no snags
      return (
        <>
          <Path d="M20 30 Q80 30 90 60 Q100 90 160 90 Q220 90 240 30" stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Path d="M20 90 Q80 90 90 60 Q100 30 160 30 Q220 30 240 90" stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Path d="M20 60 Q80 45 90 60 Q100 75 160 60 Q220 45 240 60" stroke={color} strokeWidth={STROKE} fill="none" />
        </>
      );

    case 'goal-gradient-effect':
      // a row of marks that grow larger the closer they get to the end
      return (
        <>
          <Line x1={20} y1={70} x2={240} y2={70} stroke={color} strokeWidth={STROKE} {...dim} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Circle key={i} cx={40 + i * 38} cy={70} r={5 + i * 2} fill={i === 5 ? color : 'none'} stroke={color} strokeWidth={STROKE} />
          ))}
        </>
      );

    case 'hicks-law':
      // one node fanning out to many choices
      return (
        <>
          <Circle cx={40} cy={60} r={8} fill={color} />
          {Array.from({ length: 8 }, (_, i) => {
            const y = 15 + i * 13;
            return (
              <Fragment key={i}>
                <Line x1={48} y1={60} x2={210} y2={y} stroke={color} strokeWidth={STROKE} {...dim} />
                <Circle cx={216} cy={y} r={7} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
              </Fragment>
            );
          })}
        </>
      );

    case 'jakobs-law':
      // two near-identical app frames — the familiar pattern repeats
      return (
        <>
          {[20, 140].map((x, i) => (
            <Fragment key={i}>
              <Rect x={x} y={20} width={90} height={80} rx={4} stroke={color} strokeWidth={STROKE} fill="none" opacity={i === 0 ? 1 : 0.35} />
              <Line x1={x + 12} y1={38} x2={x + 78} y2={38} stroke={color} strokeWidth={STROKE} opacity={i === 0 ? 1 : 0.35} />
              <Line x1={x + 12} y1={58} x2={x + 78} y2={58} stroke={color} strokeWidth={STROKE} opacity={i === 0 ? 1 : 0.35} />
              <Line x1={x + 12} y1={78} x2={x + 60} y2={78} stroke={color} strokeWidth={STROKE} opacity={i === 0 ? 1 : 0.35} />
            </Fragment>
          ))}
        </>
      );

    case 'law-of-common-region':
      // four dots inside a shared border vs. four loose dots outside
      return (
        <>
          <Rect x={20} y={30} width={90} height={60} rx={4} stroke={color} strokeWidth={STROKE} fill="none" />
          {[[45, 50], [85, 50], [45, 75], [85, 75]].map(([x, y], i) => (
            <Circle key={i} cx={x} cy={y} r={7} fill={color} />
          ))}
          {[[150, 50], [190, 50], [230, 50], [190, 85]].map(([x, y], i) => (
            <Circle key={i} cx={x} cy={y} r={7} fill={color} {...dim} />
          ))}
        </>
      );

    case 'law-of-proximity':
      // two tight clusters, far apart from each other
      return (
        <>
          {[[30, 45], [50, 45], [40, 65], [60, 65]].map(([x, y], i) => (
            <Circle key={i} cx={x} cy={y} r={8} fill={color} />
          ))}
          {[[190, 45], [212, 45], [200, 65], [222, 65]].map(([x, y], i) => (
            <Circle key={i} cx={x} cy={y} r={8} fill={color} />
          ))}
        </>
      );

    case 'law-of-pragnanz':
      // a dashed, incomplete circle the eye still reads as whole
      return <Circle cx={130} cy={60} r={40} stroke={color} strokeWidth={STROKE} strokeDasharray="14 10" fill="none" />;

    case 'law-of-similarity':
      // rows of alternating shapes read as columns, not rows
      return (
        <>
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3, 4].map((col) =>
              (row + col) % 2 === 0 ? (
                <Circle key={`${row}-${col}`} cx={40 + col * 45} cy={30 + row * 30} r={8} fill={color} />
              ) : (
                <Rect key={`${row}-${col}`} x={32 + col * 45} y={22 + row * 30} width={16} height={16} fill={color} opacity={0.35} />
              )
            )
          )}
        </>
      );

    case 'law-of-uniform-connectedness':
      // a connected pair reads as one group; an unconnected pair does not
      return (
        <>
          <Circle cx={60} cy={60} r={9} fill={color} />
          <Line x1={69} y1={60} x2={101} y2={60} stroke={color} strokeWidth={STROKE} />
          <Circle cx={110} cy={60} r={9} fill={color} />
          <Circle cx={170} cy={60} r={9} fill={color} {...dim} />
          <Circle cx={220} cy={60} r={9} fill={color} {...dim} />
        </>
      );

    case 'mental-model':
      // a complex mechanism, simplified into a thought-bubble icon
      return (
        <>
          <Circle cx={55} cy={60} r={22} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Circle cx={40} cy={48} r={8} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Circle cx={70} cy={70} r={6} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Path d="M95 60 L120 60" stroke={color} strokeWidth={STROKE} strokeDasharray="4 5" />
          <Circle cx={155} cy={45} r={5} fill={color} />
          <Circle cx={168} cy={32} r={7} fill={color} />
          <Path d="M195 20 L245 20 L245 55 L215 55 L200 68 L205 55 L195 55 Z" stroke={color} strokeWidth={STROKE} fill="none" />
        </>
      );

    case 'millers-law':
      // seven dots — the working-memory ceiling
      return (
        <>
          {Array.from({ length: 7 }, (_, i) => (
            <Circle key={i} cx={40 + i * 30} cy={60} r={10} fill={color} />
          ))}
        </>
      );

    case 'occams-razor':
      // a straight path wins over a needlessly zigzag one
      return (
        <>
          <Path d="M20 30 L60 45 L40 55 L90 40 L70 60 L120 35 L100 60 L150 30" stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Line x1={20} y1={85} x2={240} y2={85} stroke={color} strokeWidth={STROKE} />
          <Circle cx={20} cy={85} r={5} fill={color} />
          <Circle cx={240} cy={85} r={5} fill={color} />
        </>
      );

    case 'paradox-of-the-active-user':
      // the manual is skipped; the cursor goes straight for the button
      return (
        <>
          <Rect x={20} y={20} width={60} height={78} rx={3} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Line x1={32} y1={38} x2={68} y2={38} stroke={color} strokeWidth={STROKE} {...dim} />
          <Line x1={32} y1={52} x2={68} y2={52} stroke={color} strokeWidth={STROKE} {...dim} />
          <Line x1={20} y1={20} x2={80} y2={98} stroke={color} strokeWidth={STROKE} {...dim} />
          <Path d="M95 60 L200 60" stroke={color} strokeWidth={STROKE} strokeDasharray="6 6" />
          <Circle cx={225} cy={60} r={20} stroke={color} strokeWidth={STROKE} fill="none" />
        </>
      );

    case 'pareto-principle':
      // a small slice driving a disproportionately large output
      return (
        <>
          <Rect x={20} y={30} width={40} height={60} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Rect x={20} y={74} width={40} height={16} fill={color} />
          <Path d="M65 82 L110 82" stroke={color} strokeWidth={STROKE} strokeDasharray="5 5" />
          <Rect x={120} y={20} width={110} height={70} stroke={color} strokeWidth={STROKE} fill="none" />
        </>
      );

    case 'parkinsons-law':
      // a small task expands to fill the whole box it's given
      return (
        <>
          <Rect x={20} y={40} width={16} height={16} fill={color} />
          <Rect x={70} y={20} width={170} height={80} stroke={color} strokeWidth={STROKE} strokeDasharray="7 7" fill="none" />
          <Path d="M42 48 L64 40" stroke={color} strokeWidth={STROKE} />
        </>
      );

    case 'peak-end-rule':
    case 'peak-end-rule-bias':
      // a rough journey, but the peak and the ending are what's remembered
      return (
        <>
          <Path d="M20 80 Q50 20 80 70 Q110 100 140 55 Q170 90 200 60 Q220 40 240 45" stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Circle cx={80} cy={70} r={7} fill={color} />
          <Circle cx={240} cy={45} r={7} fill={color} />
        </>
      );

    case 'postels-law':
      // a funnel — messy varied inputs, one clean consistent output
      return (
        <>
          <Rect x={20} y={20} width={14} height={14} stroke={color} strokeWidth={STROKE} fill="none" />
          <Circle cx={65} cy={27} r={8} stroke={color} strokeWidth={STROKE} fill="none" />
          <Path d="M105 20 L120 20 L112 34 Z" stroke={color} strokeWidth={STROKE} fill="none" />
          <Path d="M40 40 L220 40 L150 95 L110 95 Z" stroke={color} strokeWidth={STROKE} fill="none" />
          <Rect x={116} y={100} width={28} height={14} rx={2} fill={color} />
        </>
      );

    case 'selective-attention':
      // one target locked on; everything else fades from notice
      return (
        <>
          {[[30, 30], [70, 25], [110, 35], [190, 28], [225, 40], [35, 85], [80, 90], [200, 85], [230, 90]].map(([x, y], i) => (
            <Circle key={i} cx={x} cy={y} r={8} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          ))}
          <Circle cx={150} cy={60} r={12} stroke={color} strokeWidth={STROKE} fill="none" />
          <Circle cx={150} cy={60} r={20} stroke={color} strokeWidth={STROKE / 1.5} fill="none" />
        </>
      );

    case 'serial-position-effect':
      // first and last remembered; the middle fades
      return (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <Rect
              key={i}
              x={20 + i * 46}
              y={40}
              width={34}
              height={40}
              stroke={color}
              strokeWidth={STROKE}
              fill={i === 0 || i === 4 ? color : 'none'}
              opacity={i === 0 || i === 4 ? 1 : 0.35}
            />
          ))}
        </>
      );

    case 'teslers-law':
      // complexity slides from one side to the other — it never disappears
      return (
        <>
          <Rect x={20} y={20} width={90} height={70} rx={4} stroke={color} strokeWidth={STROKE} fill="none" />
          <Rect x={150} y={20} width={90} height={70} rx={4} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Rect x={45} y={45} width={40} height={20} fill={color} {...dim} />
          <Path d="M115 55 L145 55" stroke={color} strokeWidth={STROKE} />
          <Path d="M138 47 L148 55 L138 63" stroke={color} strokeWidth={STROKE} fill="none" />
          <Rect x={175} y={45} width={40} height={20} fill={color} />
        </>
      );

    case 'von-restorff-effect':
      // the one that looks different is the one you remember
      return (
        <>
          {[0, 1, 2, 4, 5, 6].map((i) => (
            <Rect key={i} x={20 + i * 34} y={45} width={22} height={22} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          ))}
          <Circle cx={31 + 3 * 34} cy={56} r={13} fill={color} />
        </>
      );

    case 'working-memory':
      // a few items, fading out of memory over a short span
      return (
        <>
          <Path d="M20 60 L240 60" stroke={color} strokeWidth={STROKE} strokeDasharray="2 8" {...dim} />
          {[0, 1, 2, 3, 4].map((i) => (
            <Circle key={i} cx={40 + i * 45} cy={60} r={10} fill={color} opacity={1 - i * 0.2} />
          ))}
        </>
      );

    case 'zeigarnik-effect':
    case 'zeigarnik-effect-bias':
      // an almost-finished ring — the gap is what pulls you back
      return <Path d="M130 20 A40 40 0 1 1 95 88" stroke={color} strokeWidth={STROKE} fill="none" strokeLinecap="round" />;

    case 'visibility-of-system-status':
      // a progress track with a live pulse right at the leading edge
      return (
        <>
          <Line x1={20} y1={60} x2={240} y2={60} stroke={color} strokeWidth={STROKE} {...dim} />
          <Line x1={20} y1={60} x2={150} y2={60} stroke={color} strokeWidth={STROKE} />
          <Circle cx={150} cy={60} r={14} stroke={color} strokeWidth={STROKE} fill="none" />
          <Circle cx={150} cy={60} r={5} fill={color} />
        </>
      );

    case 'match-system-real-world':
      // a real-world envelope maps directly to its digital equivalent
      return (
        <>
          <Path d="M25 35 L95 35 L95 85 L25 85 Z M25 35 L60 62 L95 35" stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Path d="M115 60 L145 60" stroke={color} strokeWidth={STROKE} />
          <Path d="M138 52 L148 60 L138 68" stroke={color} strokeWidth={STROKE} fill="none" />
          <Path
            d="M165 40 H235 A8 8 0 0 1 243 48 V78 A8 8 0 0 1 235 86 H185 L165 100 V86 A8 8 0 0 1 165 86 V48 A8 8 0 0 1 165 40 Z"
            stroke={color}
            strokeWidth={STROKE}
            fill="none"
          />
        </>
      );

    case 'user-control-freedom':
      // an action loops back out through a clearly marked exit
      return (
        <>
          <Path d="M40 30 H160 A30 30 0 0 1 190 60 A30 30 0 0 1 160 90 H90" stroke={color} strokeWidth={STROKE} fill="none" />
          <Path d="M104 76 L86 90 L104 104" stroke={color} strokeWidth={STROKE} fill="none" />
          <Rect x={195} y={30} width={45} height={60} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Path d="M195 55 L175 60 L195 65" stroke={color} strokeWidth={STROKE} fill="none" />
        </>
      );

    case 'consistency-standards':
      // the same control, repeated exactly — no surprises between screens
      return (
        <>
          {[0, 1, 2].map((i) => (
            <Rect
              key={i}
              x={30 + i * 75}
              y={45}
              width={55}
              height={30}
              rx={4}
              stroke={color}
              strokeWidth={STROKE}
              fill="none"
              opacity={i === 1 ? 1 : 0.6}
            />
          ))}
        </>
      );

    case 'error-prevention':
      // a barrier before the wrong path, not a warning after it
      return (
        <>
          <Path d="M20 90 L110 90 L150 40" stroke={color} strokeWidth={STROKE} fill="none" />
          <Path d="M110 90 L200 100" stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Line x1={185} y1={80} x2={215} y2={112} stroke={color} strokeWidth={STROKE} {...dim} />
          <Line x1={215} y1={80} x2={185} y2={112} stroke={color} strokeWidth={STROKE} {...dim} />
          <Circle cx={150} cy={40} r={8} fill={color} />
        </>
      );

    case 'recognition-over-recall':
      // every option sits in view — nothing has to be remembered
      return (
        <>
          {[0, 1, 2].map((i) => (
            <Rect key={i} x={30} y={28 + i * 26} width={130} height={16} rx={2} stroke={color} strokeWidth={STROKE} fill="none" />
          ))}
          <Path d="M195 45 Q195 25 220 25 Q245 25 245 45 Q245 58 228 62 L228 68" stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Circle cx={228} cy={82} r={3} fill={color} {...dim} />
        </>
      );

    case 'flexibility-efficiency':
      // a long way round for anyone who needs it, a straight shortcut for anyone who doesn't
      return (
        <>
          <Path d="M20 95 Q80 20 130 60 Q180 100 240 30" stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Line x1={20} y1={95} x2={240} y2={30} stroke={color} strokeWidth={STROKE} />
          <Circle cx={20} cy={95} r={5} fill={color} />
          <Circle cx={240} cy={30} r={5} fill={color} />
        </>
      );

    case 'aesthetic-minimalist-design':
      // a cluttered field reduced down to the one thing that matters
      return (
        <>
          {[
            [30, 25], [55, 40], [25, 55], [50, 70], [35, 30], [60, 60],
          ].map(([x, y], i) => (
            <Rect key={i} x={x} y={y} width={14} height={14} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          ))}
          <Path d="M100 60 L140 60" stroke={color} strokeWidth={STROKE} />
          <Path d="M133 52 L143 60 L133 68" stroke={color} strokeWidth={STROKE} fill="none" />
          <Rect x={165} y={40} width={60} height={40} stroke={color} strokeWidth={STROKE} fill="none" />
        </>
      );

    case 'help-recognize-diagnose-recover':
      // a plain-language error, pointing straight at the way out
      return (
        <>
          <Path d="M55 90 L20 30 L90 30 Z" stroke={color} strokeWidth={STROKE} fill="none" />
          <Line x1={55} y1={45} x2={55} y2={65} stroke={color} strokeWidth={STROKE} />
          <Circle cx={55} cy={78} r={2.5} fill={color} />
          <Path d="M110 60 L150 60" stroke={color} strokeWidth={STROKE} />
          <Path d="M143 52 L153 60 L143 68" stroke={color} strokeWidth={STROKE} fill="none" />
          <Rect x={170} y={35} width={65} height={50} rx={4} stroke={color} strokeWidth={STROKE} fill="none" />
          <Path d="M188 60 L200 74 L222 46" stroke={color} strokeWidth={STROKE} fill="none" />
        </>
      );

    case 'help-documentation':
      // an open book, easy enough to search without getting lost in it
      return (
        <>
          <Path d="M130 30 V95 M130 30 Q90 22 55 32 V90 Q90 80 130 88 M130 30 Q170 22 205 32 V90 Q170 80 130 88" stroke={color} strokeWidth={STROKE} fill="none" />
          <Circle cx={205} cy={95} r={16} stroke={color} strokeWidth={STROKE} fill="none" />
          <Line x1={216} y1={106} x2={230} y2={120} stroke={color} strokeWidth={STROKE} />
        </>
      );

    // --- Design Processes ---------------------------------------------

    case 'double-diamond':
      // diverge, converge, diverge, converge
      return (
        <>
          <Path d="M20 60 L75 25 L130 60 L75 95 Z" stroke={color} strokeWidth={STROKE} fill="none" />
          <Path d="M130 60 L185 25 L240 60 L185 95 Z" stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
        </>
      );

    case 'design-thinking':
      // five non-linear stages, looping back on themselves
      return (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <Circle key={i} cx={30 + i * 50} cy={60} r={13} stroke={color} strokeWidth={STROKE} fill={i === 4 ? color : 'none'} />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <Line key={i} x1={43 + i * 50} y1={60} x2={67 + i * 50} y2={60} stroke={color} strokeWidth={STROKE} />
          ))}
          <Path d="M180 78 Q130 110 80 78" stroke={color} strokeWidth={STROKE} fill="none" strokeDasharray="5 6" {...dim} />
        </>
      );

    case 'design-sprint':
      // five days, the last one lands
      return (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <Rect
              key={i}
              x={20 + i * 44}
              y={35}
              width={32}
              height={50}
              rx={3}
              stroke={color}
              strokeWidth={STROKE}
              fill={i === 4 ? color : 'none'}
              opacity={i === 4 ? 1 : 0.5}
            />
          ))}
          <Path d="M28 108 L232 108" stroke={color} strokeWidth={STROKE} strokeDasharray="5 6" {...dim} />
        </>
      );

    case 'lean-ux':
      // build, measure, learn — a closed loop
      return (
        <>
          <Path d="M130 25 A38 38 0 1 1 92 60" stroke={color} strokeWidth={STROKE} fill="none" />
          <Path d="M80 50 L92 60 L104 48" stroke={color} strokeWidth={STROKE} fill="none" strokeLinejoin="round" />
          <Circle cx={130} cy={25} r={5} fill={color} />
          <Circle cx={168} cy={60} r={5} fill={color} {...dim} />
          <Circle cx={130} cy={95} r={5} fill={color} {...dim} />
        </>
      );

    case 'jobs-to-be-done':
    case 'jobs-to-be-done-product':
      // people don't want the drill, they want the hole
      return (
        <>
          <Circle cx={70} cy={70} r={16} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Path d="M110 60 L200 45" stroke={color} strokeWidth={STROKE} />
          <Path d="M192 36 L204 43 L196 55" stroke={color} strokeWidth={STROKE} fill="none" strokeLinejoin="round" />
          <Rect x={195} y={20} width={40} height={14} rx={3} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
        </>
      );

    case 'agile-scrum':
      // short loops, each ending in a shipped increment
      return (
        <>
          {[0, 1, 2].map((i) => (
            <Fragment key={i}>
              <Path d={`M${25 + i * 80} 60 A20 20 0 1 1 ${45 + i * 80} 80`} stroke={color} strokeWidth={STROKE} fill="none" {...(i < 2 ? dim : {})} />
              <Rect x={38 + i * 80} y={75} width={14} height={14} fill={i === 2 ? color : 'none'} stroke={color} strokeWidth={STROKE} opacity={i === 2 ? 1 : 0.5} />
            </Fragment>
          ))}
        </>
      );

    case 'usability-testing':
      // watching a real person move through a real task
      return (
        <>
          <Rect x={25} y={25} width={110} height={75} rx={4} stroke={color} strokeWidth={STROKE} fill="none" />
          <Path d="M45 90 Q80 45 120 60" stroke={color} strokeWidth={STROKE} fill="none" strokeDasharray="5 6" {...dim} />
          <Circle cx={120} cy={60} r={4} fill={color} />
          <Circle cx={195} cy={70} r={22} stroke={color} strokeWidth={STROKE} fill="none" />
          <Line x1={212} y1={87} x2={230} y2={105} stroke={color} strokeWidth={STROKE} />
        </>
      );

    case 'design-critique':
      // feedback aimed at the work, not at each other
      return (
        <>
          <Rect x={95} y={30} width={70} height={60} stroke={color} strokeWidth={STROKE} fill="none" />
          <Path d="M20 30 H60 A8 8 0 0 1 68 38 V52 A8 8 0 0 1 60 60 H40 L26 72 V60 H20 A8 8 0 0 1 20 60 Z" stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Path d="M180 55 H220 A8 8 0 0 1 228 63 V77 A8 8 0 0 1 220 85 H206 L192 97 V85 H180 A8 8 0 0 1 180 85 Z" stroke={color} strokeWidth={STROKE} fill="none" />
          <Line x1={68} y1={50} x2={93} y2={50} stroke={color} strokeWidth={STROKE} {...dim} />
          <Line x1={182} y1={70} x2={165} y2={70} stroke={color} strokeWidth={STROKE} />
        </>
      );

    // --- Product Thinking -----------------------------------------------

    case 'rice-scoring':
      // reach × impact × confidence ÷ effort, weighed into one score
      return (
        <>
          {['R', 'I', 'C'].map((l, i) => (
            <Rect key={l} x={20 + i * 42} y={40} width={30} height={30} stroke={color} strokeWidth={STROKE} fill="none" />
          ))}
          <Line x1={150} y1={40} x2={150} y2={70} stroke={color} strokeWidth={STROKE} />
          <Line x1={140} y1={55} x2={160} y2={55} stroke={color} strokeWidth={STROKE} />
          <Rect x={170} y={40} width={30} height={30} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Path d="M210 55 L235 55" stroke={color} strokeWidth={STROKE} />
          <Path d="M228 47 L238 55 L228 63" stroke={color} strokeWidth={STROKE} fill="none" />
        </>
      );

    case 'north-star-metric':
      // every team's effort converging on one guiding number
      return (
        <>
          <Path d="M130 15 L138 33 L158 33 L142 45 L148 64 L130 52 L112 64 L118 45 L102 33 L122 33 Z" fill={color} />
          {[50, 130, 210].map((x, i) => (
            <Line key={i} x1={x} y1={100} x2={130} y2={62} stroke={color} strokeWidth={STROKE} {...dim} />
          ))}
        </>
      );

    case 'mvp':
      // the smallest usable core, inside the full imagined product
      return (
        <>
          <Rect x={40} y={20} width={180} height={80} rx={4} stroke={color} strokeWidth={STROKE} strokeDasharray="6 7" fill="none" {...dim} />
          <Rect x={95} y={45} width={70} height={30} rx={3} stroke={color} strokeWidth={STROKE} fill={color} />
        </>
      );

    case 'opportunity-solution-tree':
      // one outcome, several opportunities, several solutions each
      return (
        <>
          <Circle cx={130} cy={18} r={9} fill={color} />
          {[70, 190].map((x, i) => (
            <Fragment key={i}>
              <Line x1={130} y1={27} x2={x} y2={53} stroke={color} strokeWidth={STROKE} />
              <Circle cx={x} cy={60} r={8} stroke={color} strokeWidth={STROKE} fill="none" />
            </Fragment>
          ))}
          {[40, 100, 160, 220].map((x, i) => (
            <Fragment key={i}>
              <Line x1={i < 2 ? 70 : 190} y1={68} x2={x} y2={92} stroke={color} strokeWidth={STROKE} {...dim} />
              <Circle cx={x} cy={98} r={6} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
            </Fragment>
          ))}
        </>
      );

    case 'kano-model':
      // basic expectations, performance, and delighters curve differently
      return (
        <>
          <Line x1={30} y1={95} x2={30} y2={15} stroke={color} strokeWidth={STROKE / 1.5} {...dim} />
          <Line x1={30} y1={95} x2={235} y2={95} stroke={color} strokeWidth={STROKE / 1.5} {...dim} />
          <Path d="M30 55 L235 55" stroke={color} strokeWidth={STROKE} {...dim} />
          <Line x1={30} y1={95} x2={220} y2={30} stroke={color} strokeWidth={STROKE} />
          <Path d="M30 55 Q140 55 220 15" stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
        </>
      );

    case 'aarrr-metrics':
      // a funnel — each stage narrower than the last
      return (
        <>
          <Path d="M20 20 H240 L175 55 H85 Z" stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Path d="M85 55 L100 80 H160 L175 55 Z" stroke={color} strokeWidth={STROKE} fill="none" />
          <Path d="M100 80 L112 105 H148 L160 80 Z" stroke={color} strokeWidth={STROKE} fill={color} />
        </>
      );

    case 'product-market-fit':
      // two shapes that were made for each other
      return (
        <>
          <Path d="M20 30 H110 V60 Q125 60 125 75 Q125 90 110 90 H20 Z" stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Path d="M240 90 H150 V60 Q135 60 135 45 Q135 30 150 30 H240 Z" stroke={color} strokeWidth={STROKE} fill="none" />
        </>
      );

    // --- Cognitive Biases -------------------------------------------------

    case 'anchoring-bias':
      // the first number drops anchor; everything after is judged against it
      return (
        <>
          <Line x1={70} y1={20} x2={70} y2={70} stroke={color} strokeWidth={STROKE} {...dim} />
          <Circle cx={70} cy={80} r={14} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Path d="M58 80 H82 M62 87 H78" stroke={color} strokeWidth={STROKE / 1.5} {...dim} />
          <Path d="M70 20 Q130 12 190 20" stroke={color} strokeWidth={STROKE} fill="none" strokeDasharray="5 6" {...dim} />
          <Circle cx={190} cy={55} r={10} fill={color} />
        </>
      );

    case 'confirmation-bias':
      // only the matching shapes make it through the filter
      return (
        <>
          <Path d="M25 25 H235 L155 60 L235 95 H25 L105 60 Z" stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Circle cx={70} cy={45} r={7} fill={color} />
          <Circle cx={70} cy={75} r={7} fill={color} />
          <Rect x={175} y={39} width={14} height={14} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Circle cx={182} cy={75} r={7} fill={color} />
        </>
      );

    case 'loss-aversion':
      // a loss weighs roughly twice as heavy as an equivalent gain
      return (
        <>
          <Line x1={130} y1={15} x2={130} y2={60} stroke={color} strokeWidth={STROKE} />
          <Line x1={60} y1={35} x2={200} y2={35} stroke={color} strokeWidth={STROKE} />
          <Line x1={60} y1={35} x2={60} y2={80} stroke={color} strokeWidth={STROKE} />
          <Line x1={200} y1={35} x2={200} y2={58} stroke={color} strokeWidth={STROKE} {...dim} />
          <Circle cx={60} cy={92} r={20} stroke={color} strokeWidth={STROKE} fill="none" />
          <Circle cx={200} cy={68} r={10} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
        </>
      );

    case 'framing-effect':
      // the same ratio, described two ways
      return (
        <>
          <Rect x={20} y={35} width={90} height={26} stroke={color} strokeWidth={STROKE} fill="none" />
          <Rect x={20} y={35} width={81} height={26} fill={color} />
          <Rect x={150} y={35} width={90} height={26} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Rect x={150} y={35} width={9} height={26} fill={color} {...dim} />
        </>
      );

    case 'iso-effect':
      // hands assembling it themselves is what makes it worth more
      return (
        <>
          {[[35, 55], [55, 55], [45, 40]].map(([x, y], i) => (
            <Rect key={i} x={x} y={y} width={16} height={16} stroke={color} strokeWidth={STROKE} fill={color} />
          ))}
          <Path d="M100 60 L140 60" stroke={color} strokeWidth={STROKE} />
          <Path d="M133 52 L143 60 L133 68" stroke={color} strokeWidth={STROKE} fill="none" />
          <Path d="M205 20 L214 30 L223 20 A6.5 6.5 0 1 0 214 34 A6.5 6.5 0 1 0 205 20 Z" fill={color} />
        </>
      );

    case 'survivorship-bias':
      // studying only what came back hides where the real damage was
      return (
        <>
          <Path d="M20 60 H100 L140 30 L150 45 L200 30 V45 L150 60 L200 75 V90 L150 75 L140 90 L100 60" stroke={color} strokeWidth={STROKE} fill="none" />
          {[[60, 50], [90, 65], [130, 45], [160, 68], [125, 68]].map(([x, y], i) => (
            <Circle key={i} cx={x} cy={y} r={4} fill={color} />
          ))}
          <Path d="M215 30 L240 20 M215 90 L240 100" stroke={color} strokeWidth={STROKE} {...dim} />
        </>
      );

    // --- Design Artifacts -------------------------------------------------

    case 'persona':
      // an identity card standing in for a real person
      return (
        <>
          <Rect x={30} y={20} width={130} height={80} rx={4} stroke={color} strokeWidth={STROKE} fill="none" />
          <Circle cx={62} cy={50} r={14} stroke={color} strokeWidth={STROKE} fill="none" />
          <Path d="M40 90 Q62 68 84 90" stroke={color} strokeWidth={STROKE} fill="none" />
          <Line x1={95} y1={40} x2={148} y2={40} stroke={color} strokeWidth={STROKE} {...dim} />
          <Line x1={95} y1={55} x2={140} y2={55} stroke={color} strokeWidth={STROKE} {...dim} />
          <Line x1={95} y1={70} x2={148} y2={70} stroke={color} strokeWidth={STROKE} {...dim} />
          <Line x1={95} y1={85} x2={125} y2={85} stroke={color} strokeWidth={STROKE} {...dim} />
        </>
      );

    case 'empathy-map':
      // says, thinks, does, feels — four quadrants around the same person
      return (
        <>
          <Line x1={130} y1={15} x2={130} y2={105} stroke={color} strokeWidth={STROKE / 1.5} {...dim} />
          <Line x1={30} y1={60} x2={230} y2={60} stroke={color} strokeWidth={STROKE / 1.5} {...dim} />
          <Circle cx={130} cy={60} r={14} stroke={color} strokeWidth={STROKE} fill="none" />
          <Path d="M60 32 Q65 25 80 28" stroke={color} strokeWidth={STROKE} fill="none" strokeLinecap="round" />
          <Circle cx={60} cy={90} r={5} fill={color} {...dim} />
          <Rect x={175} y={26} width={22} height={16} rx={2} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Path d="M60 100 L45 108 M60 100 L75 108" stroke={color} strokeWidth={STROKE} {...dim} />
        </>
      );

    case 'user-journey-map':
      // an emotional up-and-down across the stages of one task
      return (
        <>
          <Line x1={20} y1={90} x2={240} y2={90} stroke={color} strokeWidth={STROKE / 1.5} {...dim} />
          <Path d="M20 70 Q60 20 100 60 Q140 100 180 45 Q210 20 240 55" stroke={color} strokeWidth={STROKE} fill="none" />
          {[20, 100, 180, 240].map((x, i) => (
            <Line key={i} x1={x} y1={90} x2={x} y2={96} stroke={color} strokeWidth={STROKE / 1.5} {...dim} />
          ))}
        </>
      );

    case 'affinity-diagram':
      // loose notes, sorted until three themes emerge
      return (
        <>
          {[[20, 20], [40, 15], [15, 40], [35, 45], [25, 30]].map(([x, y], i) => (
            <Rect key={i} x={x} y={y} width={14} height={14} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          ))}
          <Path d="M70 45 L100 45" stroke={color} strokeWidth={STROKE} />
          <Path d="M93 37 L103 45 L93 53" stroke={color} strokeWidth={STROKE} fill="none" />
          {[[125, 25], [143, 25], [134, 43]].map(([x, y], i) => (
            <Rect key={`a-${i}`} x={x} y={y} width={14} height={14} fill={color} />
          ))}
          {[[170, 25], [188, 25], [179, 43]].map(([x, y], i) => (
            <Rect key={`b-${i}`} x={x} y={y} width={14} height={14} fill={color} />
          ))}
          {[[213, 25], [231, 25], [222, 43]].map(([x, y], i) => (
            <Rect key={`c-${i}`} x={x} y={y} width={14} height={14} fill={color} />
          ))}
        </>
      );

    case 'crazy-eights':
      // eight panels, eight fast ideas
      return (
        <>
          <Line x1={130} y1={15} x2={130} y2={105} stroke={color} strokeWidth={STROKE / 1.5} {...dim} />
          {[1, 2, 3].map((i) => (
            <Line key={i} x1={30 + i * 50} y1={15} x2={30 + i * 50} y2={105} stroke={color} strokeWidth={STROKE / 1.5} {...dim} />
          ))}
          <Line x1={30} y1={60} x2={230} y2={60} stroke={color} strokeWidth={STROKE / 1.5} {...dim} />
          {[
            'M40 30 L50 40', 'M85 45 Q95 25 105 45', 'M135 25 L155 45', 'M180 45 Q195 25 210 45',
            'M40 75 Q55 90 65 75', 'M90 75 L110 95', 'M140 95 Q155 75 170 95', 'M195 75 L215 95',
          ].map((d, i) => (
            <Path key={i} d={d} stroke={color} strokeWidth={STROKE} fill="none" strokeLinecap="round" />
          ))}
        </>
      );

    case 'design-workshop':
      // people around a table, building the answer together
      return (
        <>
          <Rect x={70} y={40} width={120} height={45} rx={4} stroke={color} strokeWidth={STROKE} fill="none" />
          <Rect x={90} y={52} width={16} height={16} fill={color} {...dim} />
          <Rect x={122} y={52} width={16} height={16} fill={color} />
          <Rect x={154} y={52} width={16} height={16} fill={color} {...dim} />
          {[[45, 30], [45, 95], [215, 30], [215, 95]].map(([x, y], i) => (
            <Circle key={i} cx={x} cy={y} r={9} stroke={color} strokeWidth={STROKE} fill="none" />
          ))}
        </>
      );

    case 'wireframe':
      // structure only — the layout, none of the polish
      return (
        <>
          <Rect x={30} y={15} width={200} height={90} rx={3} stroke={color} strokeWidth={STROKE} fill="none" />
          <Line x1={30} y1={40} x2={230} y2={40} stroke={color} strokeWidth={STROKE} />
          <Rect x={42} y={52} width={60} height={40} stroke={color} strokeWidth={STROKE} strokeDasharray="5 5" fill="none" {...dim} />
          <Line x1={115} y1={58} x2={218} y2={58} stroke={color} strokeWidth={STROKE} {...dim} />
          <Line x1={115} y1={70} x2={210} y2={70} stroke={color} strokeWidth={STROKE} {...dim} />
          <Line x1={115} y1={82} x2={218} y2={82} stroke={color} strokeWidth={STROKE} {...dim} />
        </>
      );

    case 'design-system':
      // scattered pieces, unified into one governed source
      return (
        <>
          <Circle cx={30} cy={25} r={8} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Rect x={22} y={55} width={16} height={16} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Path d="M22 95 L38 95 L30 82 Z" stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Path d="M60 60 L110 60" stroke={color} strokeWidth={STROKE} />
          <Path d="M103 52 L113 60 L103 68" stroke={color} strokeWidth={STROKE} fill="none" />
          <Rect x={125} y={30} width={110} height={60} rx={4} stroke={color} strokeWidth={STROKE} fill="none" />
          <Line x1={140} y1={48} x2={220} y2={48} stroke={color} strokeWidth={STROKE} />
          <Line x1={140} y1={62} x2={205} y2={62} stroke={color} strokeWidth={STROKE} />
          <Line x1={140} y1={76} x2={220} y2={76} stroke={color} strokeWidth={STROKE} />
        </>
      );

    case 'component-library':
      // one spec, reused everywhere — never rebuilt slightly differently
      return (
        <>
          {[0, 1, 2, 3].map((i) => (
            <Rect
              key={i}
              x={20 + i * 58}
              y={45}
              width={44}
              height={28}
              rx={5}
              stroke={color}
              strokeWidth={STROKE}
              fill={i === 1 ? color : 'none'}
              opacity={i === 2 ? 0.4 : 1}
              strokeDasharray={i === 3 ? '5 5' : undefined}
            />
          ))}
        </>
      );

    case 'style-guide':
      // the palette and type, fixed once so no one has to guess
      return (
        <>
          {[0, 1, 2, 3].map((i) => (
            <Rect key={i} x={20 + i * 30} y={20} width={24} height={24} rx={3} fill={color} opacity={1 - i * 0.22} />
          ))}
          <Path d="M150 44 L165 16 L180 44 M156 34 H174" stroke={color} strokeWidth={STROKE} fill="none" strokeLinejoin="round" />
          <Path d="M200 20 V44 M200 20 Q212 20 212 28 Q212 34 202 34" stroke={color} strokeWidth={STROKE} fill="none" strokeLinecap="round" {...dim} />
          <Line x1={20} y1={80} x2={235} y2={80} stroke={color} strokeWidth={STROKE} {...dim} />
          <Line x1={20} y1={95} x2={190} y2={95} stroke={color} strokeWidth={STROKE} {...dim} />
        </>
      );

    case 'prd':
      // what we're building, and why, written down first
      return (
        <>
          <Rect x={55} y={12} width={150} height={96} rx={3} stroke={color} strokeWidth={STROKE} fill="none" />
          <Line x1={70} y1={32} x2={190} y2={32} stroke={color} strokeWidth={STROKE} />
          <Line x1={70} y1={50} x2={175} y2={50} stroke={color} strokeWidth={STROKE} {...dim} />
          <Line x1={70} y1={64} x2={190} y2={64} stroke={color} strokeWidth={STROKE} {...dim} />
          <Line x1={70} y1={78} x2={160} y2={78} stroke={color} strokeWidth={STROKE} {...dim} />
          <Path d="M70 92 L78 100 L94 84" stroke={color} strokeWidth={STROKE} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );

    case 'user-story-ticket':
      // one small, shippable unit of user-facing intent
      return (
        <>
          <Path
            d="M30 25 H210 A6 6 0 0 1 216 31 V51 A9 9 0 0 0 216 69 V89 A6 6 0 0 1 210 95 H30 A6 6 0 0 1 24 89 V69 A9 9 0 0 0 24 51 V31 A6 6 0 0 1 30 25 Z"
            stroke={color}
            strokeWidth={STROKE}
            fill="none"
          />
          <Rect x={40} y={40} width={40} height={16} rx={3} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Line x1={95} y1={45} x2={195} y2={45} stroke={color} strokeWidth={STROKE} />
          <Path d="M40 75 L47 82 L58 68" stroke={color} strokeWidth={STROKE} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <Line x1={68} y1={75} x2={195} y2={75} stroke={color} strokeWidth={STROKE} {...dim} />
        </>
      );

    // --- UX Research Methods ----------------------------------------------

    case 'card-sorting':
      // loose cards, grouped into piles that make sense to the person sorting them
      return (
        <>
          <Rect x={16} y={20} width={22} height={16} rx={2} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Rect x={30} y={32} width={22} height={16} rx={2} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          {[[95, 30], [117, 30], [106, 46]].map(([x, y], i) => (
            <Rect key={`a-${i}`} x={x} y={y} width={22} height={16} rx={2} stroke={color} strokeWidth={STROKE} fill="none" />
          ))}
          {[[160, 30], [182, 30], [204, 30]].map(([x, y], i) => (
            <Rect key={`b-${i}`} x={x} y={y} width={22} height={16} rx={2} stroke={color} strokeWidth={STROKE} fill="none" />
          ))}
        </>
      );

    case 'tree-testing':
      // one clear path to the target leaf; the rest of the tree fades
      return (
        <>
          <Circle cx={130} cy={20} r={7} stroke={color} strokeWidth={STROKE} fill="none" />
          <Line x1={130} y1={27} x2={80} y2={50} stroke={color} strokeWidth={STROKE} {...dim} />
          <Line x1={130} y1={27} x2={130} y2={50} stroke={color} strokeWidth={STROKE} />
          <Line x1={130} y1={27} x2={180} y2={50} stroke={color} strokeWidth={STROKE} {...dim} />
          <Circle cx={80} cy={57} r={6} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Circle cx={130} cy={57} r={6} stroke={color} strokeWidth={STROKE} fill="none" />
          <Circle cx={180} cy={57} r={6} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Line x1={130} y1={63} x2={130} y2={85} stroke={color} strokeWidth={STROKE} />
          <Circle cx={130} cy={92} r={7} stroke={color} strokeWidth={STROKE} fill={color} />
        </>
      );

    case 'ab-testing-method':
      // two variants, split traffic, one measurably wins
      return (
        <>
          <Rect x={25} y={25} width={80} height={70} rx={3} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Line x1={40} y1={80} x2={40} y2={65} stroke={color} strokeWidth={STROKE} {...dim} />
          <Line x1={60} y1={80} x2={60} y2={55} stroke={color} strokeWidth={STROKE} {...dim} />
          <Line x1={80} y1={80} x2={80} y2={70} stroke={color} strokeWidth={STROKE} {...dim} />
          <Rect x={155} y={25} width={80} height={70} rx={3} stroke={color} strokeWidth={STROKE} fill="none" />
          <Line x1={170} y1={80} x2={170} y2={60} stroke={color} strokeWidth={STROKE} />
          <Line x1={190} y1={80} x2={190} y2={35} stroke={color} strokeWidth={STROKE} />
          <Line x1={210} y1={80} x2={210} y2={50} stroke={color} strokeWidth={STROKE} />
        </>
      );

    case 'first-click-testing':
      // does the very first tap land in the right place
      return (
        <>
          <Rect x={30} y={20} width={200} height={80} rx={4} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Line x1={45} y1={40} x2={110} y2={40} stroke={color} strokeWidth={STROKE} {...dim} />
          <Rect x={45} y={55} width={60} height={30} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Circle cx={175} cy={62} r={20} stroke={color} strokeWidth={STROKE} fill="none" />
          <Path d="M175 62 L200 87" stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
          <Circle cx={204} cy={91} r={4} fill={color} />
        </>
      );

    case 'five-second-test':
      // a glance, then it's gone — what actually stuck
      return (
        <>
          <Circle cx={90} cy={60} r={34} stroke={color} strokeWidth={STROKE} fill="none" />
          <Line x1={90} y1={60} x2={90} y2={36} stroke={color} strokeWidth={STROKE} />
          <Line x1={90} y1={60} x2={108} y2={68} stroke={color} strokeWidth={STROKE} />
          <Path d="M150 60 L235 60" stroke={color} strokeWidth={STROKE} strokeDasharray="6 6" {...dim} />
          <Path d="M215 45 L235 60 L215 75" stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
        </>
      );

    case 'diary-study':
      // logged day after day, not recalled after the fact
      return (
        <>
          <Rect x={40} y={20} width={70} height={80} rx={3} stroke={color} strokeWidth={STROKE} fill="none" />
          <Line x1={54} y1={40} x2={96} y2={40} stroke={color} strokeWidth={STROKE} />
          <Line x1={54} y1={54} x2={96} y2={54} stroke={color} strokeWidth={STROKE} {...dim} />
          <Line x1={54} y1={68} x2={86} y2={68} stroke={color} strokeWidth={STROKE} {...dim} />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <Circle key={i} cx={150 + i * 13} cy={60} r={5} fill={i < 4 ? color : 'none'} stroke={color} strokeWidth={STROKE} opacity={i < 4 ? 1 : 0.35} />
          ))}
        </>
      );

    case 'contextual-inquiry':
      // watched in their own environment, not asked to recall it later
      return (
        <>
          <Rect x={20} y={20} width={110} height={80} rx={4} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Circle cx={65} cy={55} r={10} stroke={color} strokeWidth={STROKE} fill="none" />
          <Path d="M48 90 Q65 68 82 90" stroke={color} strokeWidth={STROKE} fill="none" />
          <Rect x={95} y={70} width={20} height={16} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Circle cx={200} cy={55} r={22} stroke={color} strokeWidth={STROKE} fill="none" />
          <Line x1={216} y1={71} x2={232} y2={87} stroke={color} strokeWidth={STROKE} strokeLinecap="round" />
        </>
      );

    case 'guerrilla-testing':
      // fast, informal, whoever's willing
      return (
        <>
          <Path d="M40 45 H70 V70 A15 15 0 0 1 40 70 Z" stroke={color} strokeWidth={STROKE} fill="none" />
          <Path d="M70 50 H78 A8 8 0 0 1 78 66 H70" stroke={color} strokeWidth={STROKE} fill="none" />
          <Path d="M48 38 Q50 32 46 28 M58 38 Q60 30 55 25" stroke={color} strokeWidth={STROKE / 1.4} fill="none" strokeLinecap="round" {...dim} />
          <Circle cx={175} cy={40} r={20} stroke={color} strokeWidth={STROKE} fill="none" />
          <Line x1={175} y1={40} x2={175} y2={27} stroke={color} strokeWidth={STROKE} />
          <Line x1={175} y1={40} x2={185} y2={45} stroke={color} strokeWidth={STROKE} />
        </>
      );

    case 'eye-tracking':
      // where attention actually lands, not where people say it does
      return (
        <>
          <Rect x={30} y={25} width={200} height={70} rx={4} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Path d="M55 55 Q100 30 150 55 T225 55" stroke={color} strokeWidth={STROKE} fill="none" strokeDasharray="4 6" />
          <Circle cx={55} cy={55} r={9} fill={color} opacity={0.5} />
          <Circle cx={150} cy={55} r={13} fill={color} opacity={0.7} />
          <Circle cx={205} cy={70} r={7} fill={color} opacity={0.4} />
        </>
      );

    case 'survey-research':
      // breadth over depth — a thousand answers, not five conversations
      return (
        <>
          <Rect x={25} y={20} width={95} height={80} rx={3} stroke={color} strokeWidth={STROKE} fill="none" />
          {[0, 1, 2, 3].map((i) => (
            <Fragment key={i}>
              <Rect x={38} y={35 + i * 15} width={10} height={10} stroke={color} strokeWidth={STROKE} fill={i < 2 ? color : 'none'} />
              <Line x1={54} y1={40 + i * 15} x2={104} y2={40 + i * 15} stroke={color} strokeWidth={STROKE} opacity={i < 2 ? 1 : 0.35} />
            </Fragment>
          ))}
          <Line x1={150} y1={95} x2={235} y2={95} stroke={color} strokeWidth={STROKE / 1.5} {...dim} />
          {[0, 1, 2, 3].map((i) => (
            <Rect key={i} x={155 + i * 21} y={95 - (18 + i * 14)} width={13} height={18 + i * 14} fill={color} opacity={0.4 + i * 0.2} />
          ))}
        </>
      );

    case 'user-interviews':
      // a real conversation, not a form to fill out
      return (
        <>
          <Path d="M20 25 H100 A8 8 0 0 1 108 33 V60 A8 8 0 0 1 100 68 H55 L38 82 V68 H20 A8 8 0 0 1 12 60 V33 A8 8 0 0 1 20 25 Z" stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Line x1={30} y1={40} x2={90} y2={40} stroke={color} strokeWidth={STROKE / 1.5} {...dim} />
          <Line x1={30} y1={52} x2={75} y2={52} stroke={color} strokeWidth={STROKE / 1.5} {...dim} />
          <Path d="M150 45 H230 A8 8 0 0 1 238 53 V80 A8 8 0 0 1 230 88 H185 L168 102 V88 H150 A8 8 0 0 1 142 80 V53 A8 8 0 0 1 150 45 Z" stroke={color} strokeWidth={STROKE} fill="none" />
          <Line x1={160} y1={60} x2={220} y2={60} stroke={color} strokeWidth={STROKE} />
          <Line x1={160} y1={72} x2={205} y2={72} stroke={color} strokeWidth={STROKE} />
        </>
      );

    case 'product-analytics':
      // real usage at scale — a trend line over a narrowing funnel
      return (
        <>
          <Line x1={20} y1={95} x2={240} y2={95} stroke={color} strokeWidth={STROKE / 1.5} {...dim} />
          <Line x1={20} y1={95} x2={20} y2={20} stroke={color} strokeWidth={STROKE / 1.5} {...dim} />
          <Path d="M30 85 L70 65 L110 72 L150 45 L190 50 L228 22" stroke={color} strokeWidth={STROKE} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <Circle cx={228} cy={22} r={5} fill={color} />
        </>
      );

    case 'whiteboarding':
      // thinking out loud on a shared, disposable surface
      return (
        <>
          <Rect x={20} y={18} width={220} height={90} rx={4} stroke={color} strokeWidth={STROKE} fill="none" />
          <Circle cx={60} cy={50} r={14} stroke={color} strokeWidth={STROKE} fill="none" />
          <Path d="M84 50 H130" stroke={color} strokeWidth={STROKE} />
          <Path d="M123 42 L133 50 L123 58" stroke={color} strokeWidth={STROKE} fill="none" />
          <Rect x={150} y={38} width={60} height={24} rx={3} stroke={color} strokeWidth={STROKE} fill="none" {...dim} />
          <Path d="M40 82 Q60 70 80 82 T120 82" stroke={color} strokeWidth={STROKE / 1.5} fill="none" {...dim} />
          <Path d="M150 82 H210" stroke={color} strokeWidth={STROKE / 1.5} {...dim} />
        </>
      );

    default:
      return <Circle cx={130} cy={60} r={30} stroke={color} strokeWidth={STROKE} fill="none" />;
  }
}

export default function LawExample({ id, color = '#ffffff' }: { id: string; color?: string }) {
  return (
    <Svg width="100%" height={120} viewBox={VIEW} preserveAspectRatio="xMidYMid meet">
      {content(id, color)}
    </Svg>
  );
}
