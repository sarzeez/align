import * as React from 'react';
import Svg, {SvgProps, G, Path, Rect, Defs, ClipPath} from 'react-native-svg';

const CloseIcon = (props: SvgProps) => (
  <Svg width={29} height={29} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M18 0h-7C4.925 0 0 4.925 0 11v7c0 6.075 4.925 11 11 11h7c6.075 0 11-4.925 11-11v-7c0-6.075-4.925-11-11-11Z"
        fill="#fff"
      />
      <Path
        d="M18 .5h-7C5.201.5.5 5.201.5 11v7c0 5.799 4.701 10.5 10.5 10.5h7c5.799 0 10.5-4.701 10.5-10.5v-7C28.5 5.201 23.799.5 18 .5Z"
        stroke="#EBEBEB"
      />
      <Rect
        x={10.257}
        y={10.964}
        width={1}
        height={11}
        rx={0.5}
        transform="rotate(-45 10.257 10.964)"
        fill="#2C2C2C"
      />
      <Rect
        x={10.965}
        y={18.743}
        width={1}
        height={11}
        rx={0.5}
        transform="rotate(-135 10.965 18.743)"
        fill="#2C2C2C"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h29v29H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default CloseIcon;
