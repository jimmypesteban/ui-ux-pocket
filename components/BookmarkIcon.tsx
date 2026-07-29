import Svg, { Path } from 'react-native-svg';

export default function BookmarkIcon({
  filled,
  size = 20,
  color = '#ffffff',
}: {
  filled: boolean;
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 3.5H18C18.5523 3.5 19 3.94772 19 4.5V21L12 17L5 21V4.5C5 3.94772 5.44772 3.5 6 3.5Z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
        fill={filled ? color : 'none'}
      />
    </Svg>
  );
}
