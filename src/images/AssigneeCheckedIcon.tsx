import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const AssigneeCheckedIcon = (props: SvgProps) => (
  <Svg
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <Path
      d="M18 0H8a8 8 0 0 0-8 8v10a8 8 0 0 0 8 8h10a8 8 0 0 0 8-8V8a8 8 0 0 0-8-8Z"
      fill="#fff"
    />
    <Path
      d="M18 4H8a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4Z"
      stroke="#FF9300"
      strokeWidth={8}
      strokeLinecap="round"
    />
  </Svg>
);

export default AssigneeCheckedIcon;
