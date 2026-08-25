import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

export type CollectionIconId = 'laws' | 'heuristics' | 'processes' | 'product' | 'biases' | 'artifacts' | 'research' | 'saved' | 'notes' | 'interview';

function content(id: CollectionIconId, color: string) {
  switch (id) {
    case 'laws':
      // a scale/balance — the classic mark of a "law"
      return (
        <>
          <Line x1={24} y1={6} x2={24} y2={38} stroke={color} strokeWidth={2.5} />
          <Line x1={10} y1={13} x2={38} y2={13} stroke={color} strokeWidth={2.5} />
          <Line x1={10} y1={13} x2={10} y2={22} stroke={color} strokeWidth={2.5} />
          <Line x1={38} y1={13} x2={38} y2={22} stroke={color} strokeWidth={2.5} />
          <Path d="M4 22 A6 7 0 0 0 16 22 Z" stroke={color} strokeWidth={2.5} fill="none" strokeLinejoin="round" />
          <Path d="M32 22 A6 7 0 0 0 44 22 Z" stroke={color} strokeWidth={2.5} fill="none" strokeLinejoin="round" />
          <Line x1={16} y1={40} x2={32} y2={40} stroke={color} strokeWidth={2.5} />
        </>
      );

    case 'heuristics':
      // a checklist — ten short, checkable rules
      return (
        <>
          <Rect x={8} y={6} width={32} height={36} rx={3} stroke={color} strokeWidth={2.5} fill="none" />
          <Path d="M15 17 L19 21 L27 12" stroke={color} strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <Line x1={31} y1={17} x2={34} y2={17} stroke={color} strokeWidth={2.5} />
          <Path d="M15 26 L19 30 L27 21" stroke={color} strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <Line x1={31} y1={26} x2={34} y2={26} stroke={color} strokeWidth={2.5} />
          <Circle cx={16.5} cy={35.5} r={1.6} fill={color} />
          <Line x1={22} y1={35.5} x2={34} y2={35.5} stroke={color} strokeWidth={2.5} opacity={0.4} />
        </>
      );

    case 'processes':
      // the double diamond — diverge, converge, diverge, converge
      return (
        <>
          <Path d="M4 24 L14 8 L24 24 L14 40 Z" stroke={color} strokeWidth={2.5} fill="none" strokeLinejoin="round" />
          <Path d="M24 24 L34 8 L44 24 L34 40 Z" stroke={color} strokeWidth={2.5} fill="none" strokeLinejoin="round" />
        </>
      );

    case 'product':
      // a target — aim, prioritize, hit the right thing
      return (
        <>
          <Circle cx={24} cy={24} r={17} stroke={color} strokeWidth={2.5} fill="none" />
          <Circle cx={24} cy={24} r={10} stroke={color} strokeWidth={2.5} fill="none" />
          <Circle cx={24} cy={24} r={3} fill={color} />
        </>
      );

    case 'biases':
      // a head in profile with a distortion line — perception isn't reality
      return (
        <>
          <Path
            d="M14 40 V30 C8 27 6 20 9 14 C12 8 19 5 26 6 C33 7 38 12 39 19 C39.5 22 40 24 43 25 L38 27 C38 30 37 32 35 34 L35 40"
            stroke={color}
            strokeWidth={2.5}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path d="M14 19 Q20 15 24 19 T34 19" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" opacity={0.5} />
        </>
      );

    case 'artifacts':
      // a stack of index cards — the deliverables designers actually hand off
      return (
        <>
          <Rect x={10} y={16} width={28} height={20} rx={2} stroke={color} strokeWidth={2.5} fill="none" opacity={0.4} />
          <Rect x={7} y={11} width={28} height={20} rx={2} stroke={color} strokeWidth={2.5} fill="none" opacity={0.7} />
          <Rect x={4} y={6} width={28} height={20} rx={2} stroke={color} strokeWidth={2.5} fill="none" />
          <Line x1={9} y1={13} x2={22} y2={13} stroke={color} strokeWidth={2} />
          <Line x1={9} y1={18} x2={27} y2={18} stroke={color} strokeWidth={2} />
        </>
      );

    case 'research':
      // a magnifying glass over an observed data point — watching real behavior
      return (
        <>
          <Circle cx={20} cy={20} r={14} stroke={color} strokeWidth={2.5} fill="none" />
          <Line x1={30} y1={30} x2={42} y2={42} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
          <Circle cx={20} cy={20} r={4} fill={color} opacity={0.5} />
        </>
      );

    case 'saved':
      // a bookmark — set this aside for later
      return (
        <Path
          d="M12 6H36C37.1046 6 38 6.89543 38 8V42L24 34L10 42V8C10 6.89543 10.8954 6 12 6Z"
          stroke={color}
          strokeWidth={2.5}
          strokeLinejoin="round"
          fill="none"
        />
      );

    case 'notes':
      // a page with a pencil — what you wrote down yourself
      return (
        <>
          <Path
            d="M34 6H10C8.89543 6 8 6.89543 8 8V40C8 41.1046 8.89543 42 10 42H32C33.1046 42 34 41.1046 34 40V26"
            stroke={color}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <Line x1={15} y1={17} x2={27} y2={17} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
          <Line x1={15} y1={25} x2={24} y2={25} stroke={color} strokeWidth={2.5} strokeLinecap="round" opacity={0.55} />
          <Line x1={15} y1={33} x2={27} y2={33} stroke={color} strokeWidth={2.5} strokeLinecap="round" opacity={0.55} />
          <Path
            d="M40.5 6.5 A3.5 3.5 0 0 1 40.5 11.5 L31 21 L26 22.5 L27.5 17.5 Z"
            stroke={color}
            strokeWidth={2.5}
            strokeLinejoin="round"
            fill="none"
          />
        </>
      );

    case 'interview':
      // a speech bubble asking the question — the interview itself
      return (
        <>
          <Path
            d="M8 8H40C41.1046 8 42 8.89543 42 10V30C42 31.1046 41.1046 32 40 32H24L14 42V32H8C6.89543 32 6 31.1046 6 30V10C6 8.89543 6.89543 8 8 8Z"
            stroke={color}
            strokeWidth={2.5}
            strokeLinejoin="round"
            fill="none"
          />
          <Path d="M18 17 C18 13 22 12 24 12 C27 12 30 14 30 17 C30 20 25 20 25 24" stroke={color} strokeWidth={2.5} fill="none" strokeLinecap="round" />
          <Circle cx={25} cy={29} r={1.8} fill={color} />
        </>
      );
  }
}

export default function CollectionIcon({
  id,
  size = 32,
  color = '#ffffff',
}: {
  id: CollectionIconId;
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      {content(id, color)}
    </Svg>
  );
}
