import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const HomeScreenIcon = ({color}: {color: string}) => (
  <Svg
    width={19}
    height={20}
    fill="none"
  >
    <Path
      d="M6.635 18.773v-3.057A1.419 1.419 0 0 1 8.058 14.3h2.874a1.43 1.43 0 0 1 1.316.872c.071.172.108.356.108.542v3.058a1.214 1.214 0 0 0 .756 1.134c.15.062.31.093.471.093h1.961a3.46 3.46 0 0 0 2.443-1A3.408 3.408 0 0 0 19 16.578V7.867a2.474 2.474 0 0 0-.9-1.9L11.434.676a3.1 3.1 0 0 0-3.949.071L.967 5.965A2.474 2.474 0 0 0 0 7.867v8.7A3.444 3.444 0 0 0 3.456 20h1.916a1.23 1.23 0 0 0 1.236-1.218l.027-.009Z"
      fill={color}
    />
  </Svg>
);

export default HomeScreenIcon;
