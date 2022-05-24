import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const MessageIcon = ({color}: {color: string}) => (
  <Svg
    width={21}
    height={20}
    fill="none"
  >
    <Path
      d="M17.013 2.943a9.958 9.958 0 0 0-16.2 10.964c.095.198.127.42.09.637L.027 18.76a.991.991 0 0 0 1 1.2h.2l4.26-.857c.216-.026.435.005.636.089A9.965 9.965 0 0 0 17.07 2.965l-.057-.022ZM6 10.986a1 1 0 1 1-.013-2 1 1 0 0 1 .013 2Zm3.98 0a.995.995 0 1 1 .7-.292 1 1 0 0 1-.703.292h.004Zm3.982 0a.994.994 0 1 1 .7-.292 1 1 0 0 1-.704.292h.004Z"
      fill={color}
    />
  </Svg>
);

export default MessageIcon;
