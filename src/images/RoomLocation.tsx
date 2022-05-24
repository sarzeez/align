import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

const RoomLocation = (props: SvgProps) => (
  <Svg width={27} height={27} fill="none" {...props}>
    <G clipPath="url(#a)" stroke="#000" strokeWidth={2}>
      <Path d="M25.517 1.045H1v24.517h24.517V1.045ZM8.748 0v18.875M8.748 21.989v4.216M26.553 14.27h-4.216M19.905 14.27H8.976" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h26.553v26.561H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default RoomLocation;
