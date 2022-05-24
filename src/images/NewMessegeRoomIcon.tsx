import * as React from 'react';
import Svg, {SvgProps, G, Rect, Path} from 'react-native-svg';

const NewMessageRoomIcon = (props: SvgProps) => (
  <Svg width={49} height={49} {...props}>
    <G data-name="New Message" transform="translate(-19 -56)">
      <Rect
        data-name="Rectangle 32"
        width={49}
        height={49}
        rx={14}
        transform="translate(19 56)"
        fill="#2c2c2c"
      />
      <Path
        data-name="Path 858"
        d="M30.889 95.664a2.878 2.878 0 0 0 3.136-.623l3-2.992H53.09a4.8 4.8 0 0 0 4.8-4.795V71.911a4.8 4.8 0 0 0-4.8-4.795H33.91a4.795 4.795 0 0 0-4.8 4.795v21.1a2.878 2.878 0 0 0 1.774 2.657Zm1.1-6.492V71.911a1.917 1.917 0 0 1 1.918-1.918h19.18a1.917 1.917 0 0 1 1.923 1.918v15.344a1.918 1.918 0 0 1-1.918 1.918H35.828l-3.836 3.836Z"
        fill="#ff9300"
      />
      <Path
        data-name="Path 859"
        d="M42.061 85.336h2.877V81.02h4.315v-2.877h-4.315V73.83h-2.877v4.316h-4.317v2.877h4.315Z"
        fill="#fff"
      />
    </G>
  </Svg>
);

export default NewMessageRoomIcon;
