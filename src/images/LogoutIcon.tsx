import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

const LogoutIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      d="M18.954 0h-8.912v2.37h6.542v19.26h-6.542V24h8.912V0Z"
      fill="#000"
    />
    <Path
      d="M14.361 10.816H4.331l3.192-3.444-1.737-1.611L.002 12l5.783 6.24 1.738-1.612-3.19-3.444H14.36v-2.368Z"
      fill="#000"
    />
  </Svg>
);

export default LogoutIcon;
