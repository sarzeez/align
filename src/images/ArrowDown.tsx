import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const ArrowDown = (props: SvgProps) => (
  <Svg width={19.089} height={10.947} {...props}>
    <Path
      d="M9.544 7.664 2.317.437A1.3 1.3 0 0 0 .272.573a1.432 1.432 0 0 0 .136 1.841l8.181 8.114a1.3 1.3 0 0 0 1.909 0l8.183-8.114a1.432 1.432 0 0 0 .136-1.841 1.3 1.3 0 0 0-2.045-.136Z"
      fill="rgba(0,0,0,0.53)"
    />
  </Svg>
);

export default ArrowDown;
