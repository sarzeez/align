import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const RightArrow = (props: SvgProps) => (
  <Svg width={12} height={20} fill="none" {...props}>
    <Path
      d="m7.964 9.914-7.51 7.51a1.346 1.346 0 0 0 .142 2.127 1.488 1.488 0 0 0 1.913-.142l8.431-8.5a1.346 1.346 0 0 0 0-1.985L2.51.424A1.488 1.488 0 0 0 .595.282a1.346 1.346 0 0 0-.142 2.126l7.51 7.506Z"
      fill="#2C2C2C"
    />
  </Svg>
);

export default RightArrow;
