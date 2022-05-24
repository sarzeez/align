import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const LocationIcon = (props: SvgProps) => (
  <Svg width="47" height="47" fill="none" {...props}>
    <Path
      d="M33 0H14C6.268 0 0 6.268 0 14v19c0 7.732 6.268 14 14 14h19c7.732 0 14-6.268 14-14V14c0-7.732-6.268-14-14-14Z"
      fill="#fff"
    />
    <Path
      d="M23.199 9a9.2 9.2 0 0 0-9.2 9.2c0 5.082 9.2 19.968 9.2 19.968s9.2-14.886 9.2-19.968a9.199 9.199 0 0 0-9.2-9.2Zm0 14.142a4.944 4.944 0 1 1 0-9.889 4.944 4.944 0 0 1 0 9.889Z"
      fill={props.color}
    />
  </Svg>
);

export default LocationIcon;
