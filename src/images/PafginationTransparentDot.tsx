import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';
import {Colors} from 'theme';

const PaginationTransparentDot = ({isActive}: {isActive: boolean}) => (
  <Svg width={10} height={10}>
    <Circle
      cx={5}
      cy={5}
      r={4.5}
      stroke={isActive ? Colors.orange : Colors.dotBorderColor}
      fill={isActive ? Colors.orange : Colors.dotBorderColor}
    />
  </Svg>
);

export default PaginationTransparentDot;
