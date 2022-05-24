import * as React from 'react';
import Svg, {G, Rect, Path} from 'react-native-svg';

const MyAccountIcon = () => (
  <Svg width={54} height={54}>
    <G data-name="My Account" transform="translate(-24 -479)">
      <Rect
        data-name="Rectangle 36"
        width={54}
        height={54}
        rx={14}
        transform="translate(24 479)"
        fill="#ff9300"
      />
      <Path
        d="M33.5 522.397a1.614 1.614 0 0 0 3.228 0 14.422 14.422 0 0 1 8.391-13.124 11.231 11.231 0 0 0 12.291-.012 14.723 14.723 0 0 1 4.117 2.865 14.432 14.432 0 0 1 4.256 10.27 1.614 1.614 0 1 0 3.228 0 17.64 17.64 0 0 0-5.202-12.553 17.881 17.881 0 0 0-3.826-2.88 11.3 11.3 0 1 0-17.468-.015 17.648 17.648 0 0 0-9.014 15.447Zm17.754-30.669a8.071 8.071 0 1 1-8.071 8.071 8.081 8.081 0 0 1 8.071-8.071Z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={0.5}
      />
    </G>
  </Svg>
);

export default MyAccountIcon;
