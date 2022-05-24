import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

const GreySearch = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        d="m18.3 16.683 4.888 4.887-1.615 1.615-4.89-4.885a10.274 10.274 0 1 1 1.614-1.614l.003-.003Zm-2.29-.847a7.986 7.986 0 1 0-.171.171l.171-.171Z"
        fill="#ACAFBC"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default GreySearch;
