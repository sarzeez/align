import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const LockIcon = () => (
  <Svg width={11} height={16}>
    <Path
      d="M3.745 4a1.6 1.6 0 0 1 3.201 0V7.46h2.398V4a4 4 0 0 0-6.827-2.829 4 4 0 0 0-1.17 2.829v3.458h2.398V4ZM9.344 8H1.103A1.103 1.103 0 0 0 0 9.1v5.797A1.104 1.104 0 0 0 1.103 16h8.481a1.104 1.104 0 0 0 1.103-1.103V9.101A1.103 1.103 0 0 0 9.588 8h-.244Z"
      fill="#1C78D2"
    />
  </Svg>
);

export default LockIcon;
