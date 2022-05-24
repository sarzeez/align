import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const WhiteCheckIcon = (props: SvgProps) => (
  <Svg width={54} height={54} fill="none" {...props}>
    <Path
      d="M40 0H14C6.268 0 0 6.268 0 14v26c0 7.732 6.268 14 14 14h26c7.732 0 14-6.268 14-14V14c0-7.732-6.268-14-14-14Z"
      fill="#fff"
    />
    <Path
      d="m37.16 17.515-1.526 1.54c-4.141 4.15-7.3 7.616-11.147 11.538l-4.094-3.46-1.65-1.391-2.782 3.3 1.649 1.405 5.62 4.756 1.514 1.284 1.405-1.405c4.656-4.666 7.972-8.394 12.538-12.971l1.527-1.54-3.054-3.054v-.002Z"
      fill="#09C875"
    />
  </Svg>
);

export default WhiteCheckIcon;
