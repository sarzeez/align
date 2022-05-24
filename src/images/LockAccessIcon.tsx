import * as React from 'react';
import Svg, {Path, G, Rect, Circle} from 'react-native-svg';

const LockAccessIcon = () => (
  <Svg width="44" height="44">
    <G data-name="Icon (Lock)">
      <G
        data-name="Rectangle 63"
        fill="#2c2c2c"
        stroke="#2c2c2c"
        stroke-width="2"
      >
        <Rect width="44" height="44" rx="10" stroke="none" />
        <Rect x="1" y="1" width="42" height="42" rx="9" fill="none" />
      </G>
      <G
        data-name="Ellipse 46"
        transform="translate(18 22.349)"
        fill="#fff"
        stroke="#707070"
      >
        <Circle cx="4.5" cy="4.5" r="4.5" stroke="none" />
        <Circle cx="4.5" cy="4.5" r="4" fill="none" />
      </G>
      <G data-name="Iconly/Bold/Lock">
        <Path
          data-name="Path 876"
          d="M21.985 11.703a5.623 5.623 0 0 1 5.7 5.556v1.579a4.3 4.3 0 0 1 3.063 4.077v5.088a4.348 4.348 0 0 1-4.394 4.3h-8.706a4.348 4.348 0 0 1-4.4-4.3v-5.088a4.3 4.3 0 0 1 3.066-4.077v-1.579a5.629 5.629 0 0 1 5.671-5.556Zm.01 11.722a.9.9 0 0 0-.91.89v2.272a.916.916 0 0 0 1.831 0v-2.272a.9.9 0 0 0-.921-.89Zm.01-9.932a3.817 3.817 0 0 0-3.857 3.746v1.377h7.711v-1.357a3.812 3.812 0 0 0-3.853-3.765Z"
          fill="#ff9300"
        />
      </G>
    </G>
  </Svg>
);

export default LockAccessIcon;
