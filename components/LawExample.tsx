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
