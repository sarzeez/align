import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const WorkspaceIcon = ({color}: {color: string}) => (
  <Svg width={18} height={22} fill="none">
    <Path
      d="M14.526.997a3.168 3.168 0 0 0-2.936 4.334l-6 3.331a3.154 3.154 0 1 0 .008 4.671l6 3.331a3.169 3.169 0 1 0 .551-.896l-5.9-3.273a3.15 3.15 0 0 0 0-2.994l5.9-3.273a3.156 3.156 0 1 0 2.377-5.23Z"
      fill={color}
    />
  </Svg>
);

export default WorkspaceIcon;
