import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const EmptyCheckBox = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      d="M9 1h6a8 8 0 0 1 8 8v6a8 8 0 0 1-8 8H9a8 8 0 0 1-8-8V9a8 8 0 0 1 8-8Z"
      stroke="#707070"
      strokeWidth={2}
    />
  </Svg>
);

export default EmptyCheckBox;
