import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const CheckMark = (props: SvgProps) => (
  <Svg width={15} height={12} fill="none" {...props}>
    <Path
      d="m12.543 0-.903.912C9.19 3.367 7.32 5.418 5.044 7.738L2.622 5.692l-.975-.824L0 6.82l.975.832 3.326 2.814.895.76.831-.832c2.755-2.762 4.717-4.967 7.42-7.675l.903-.911L12.544 0Z"
      fill="#ffffff"
    />
  </Svg>
);

export default CheckMark;
