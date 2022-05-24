import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const LocationIconSmall = (props: SvgProps) => (
  <Svg width={14} height={23} fill="#000" {...props}>
    <Path d="M7 0a7 7 0 0 0-7 7c0 3.867 7 15.193 7 15.193S14 10.867 14 7a7.002 7.002 0 0 0-7-7Zm0 10.76a3.762 3.762 0 1 1 0-7.524 3.762 3.762 0 0 1 0 7.524Z" />
  </Svg>
);

export default LocationIconSmall;
