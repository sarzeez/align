import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const RoomIcon = (props: SvgProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.1991 16.6336V3.13193H3.0956V20.9047H7.1991V19.2128H9.29433V20.9047H20.8684V13.868H19.5025V11.7727H20.8684V3.13193H9.29433V11.7727H17.4869V13.868H9.29433V16.6336H7.1991ZM22.9636 23V13.868H22.9942V11.7727H22.9636V1.0367H9.29433V1H7.1991V1.0367H1.00037V23H22.9636Z"
      fill={props.color || 'black'}
    />
  </Svg>
);

export default RoomIcon;
