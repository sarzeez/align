import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from 'theme';

const HomeIcon = ({color = Colors.black}: {color: string}) => (
  <Svg
    width={23}
    height={24}
    fill="none"
  >
    <Path
      d="M7.962 22.527v-3.668A1.699 1.699 0 0 1 9.67 17.16h3.45a1.715 1.715 0 0 1 1.578 1.047c.085.206.13.427.13.65v3.67a1.457 1.457 0 0 0 .427 1.04c.277.276.653.432 1.045.431h2.353a4.152 4.152 0 0 0 2.932-1.198 4.091 4.091 0 0 0 1.216-2.908V9.44a2.969 2.969 0 0 0-1.075-2.282L13.72.812a3.717 3.717 0 0 0-4.738.086L1.16 7.158A2.97 2.97 0 0 0 0 9.44v10.443a4.136 4.136 0 0 0 4.147 4.12h2.3a1.477 1.477 0 0 0 1.483-1.46l.032-.016Z"
      fill={color}
    />
  </Svg>
);

export default HomeIcon;
