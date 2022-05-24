import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const CaretLeft = (props: SvgProps) => (
  <Svg
    width={11}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      d="m3.31 10.5 7.223-7.227a1.3 1.3 0 0 0-.136-2.045 1.432 1.432 0 0 0-1.84.136L.446 9.546a1.3 1.3 0 0 0 0 1.909l8.113 8.182a1.431 1.431 0 0 0 1.841.136 1.3 1.3 0 0 0 .136-2.045L3.31 10.5Z"
      fill="#000"
    />
  </Svg>
);

export default CaretLeft;
