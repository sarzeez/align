import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const BlackCheckbox = (props: SvgProps) => (
  <Svg width={26} height={26} fill="none" {...props}>
    <Path
      d="M18 0H8a8 8 0 0 0-8 8v10a8 8 0 0 0 8 8h10a8 8 0 0 0 8-8V8a8 8 0 0 0-8-8Z"
      fill="#2C2C2C"
    />
    <Path
      d="M18 .5H8A7.5 7.5 0 0 0 .5 8v10A7.5 7.5 0 0 0 8 25.5h10a7.5 7.5 0 0 0 7.5-7.5V8A7.5 7.5 0 0 0 18 .5Z"
      stroke="#2C2C2C"
    />
    <Path
      d="m18.539 8-.9.911c-2.45 2.455-4.32 4.5-6.593 6.825L8.625 13.69l-.975-.823-1.646 1.95.975.831 3.324 2.813.9.759.83-.831c2.755-2.76 4.716-4.965 7.417-7.672l.9-.911L18.544 8h-.005Z"
      fill="#fff"
    />
  </Svg>
);

export default BlackCheckbox;
