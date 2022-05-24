import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

const NewMessageSmallCircle = () => (
  <Svg
    width={10}
    height={9}
    fill="none"
  >
    <Path
      d="M8.614 4.799a3.614 3.614 0 1 1-7.228-.002 3.614 3.614 0 0 1 7.228.002Z"
      fill="#FF9300"
      stroke="#fff"
    />
  </Svg>
);

export default NewMessageSmallCircle;
