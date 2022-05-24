import * as React from 'react';
import Svg, {SvgProps, G, Rect, Path} from 'react-native-svg';

const RightArrowIcon = (props: SvgProps) => (
  <Svg width={70} height={70} {...props}>
    <G data-name="Caret Icon" transform="translate(12 19)">
      <Rect
        data-name="Rectangle 37"
        width={70}
        height={70}
        rx={23}
        transform="translate(-12 -19)"
        fill="rgba(255,255,255,0)"
      />
      <G data-name="icons Q2">
        <Path
          data-name="Path 8"
          d="m25.664 18-7.223 7.227a1.3 1.3 0 0 0 .136 2.045 1.432 1.432 0 0 0 1.841-.136l8.11-8.182a1.3 1.3 0 0 0 0-1.909l-8.114-8.182a1.432 1.432 0 0 0-1.841-.136 1.3 1.3 0 0 0-.136 2.045Z"
          fill={props.color || '#2c2c2c'}
        />
      </G>
    </G>
  </Svg>
);

export default RightArrowIcon;
