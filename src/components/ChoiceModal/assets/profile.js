import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgComponent = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={17} height={10} {...props}>
    <Path
      data-name="Polygon 1"
      d="M10.024 8.207a2 2 0 0 1-3.048 0L2.8 3.3A2 2 0 0 1 4.325 0h8.35A2 2 0 0 1 14.2 3.3Z"
      fill="#2c2c2c"
    />
  </Svg>
);

export default SvgComponent;
