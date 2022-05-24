import * as React from 'react';
import Svg, {SvgProps, G, Rect, Path} from 'react-native-svg';

const FiledFileIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={44} height={44} {...props}>
    <G data-name="Attachment (Orange)" transform="translate(-15 -525)">
      <Rect
        data-name="Touch Target"
        width={44}
        height={44}
        rx={14}
        transform="translate(15 525)"
        fill="#ff9300"
      />
      <Path
        data-name="Path 869"
        d="m31.667 546.902 6.403-6.382a3.209 3.209 0 0 1 1.622-.84 2.562 2.562 0 0 1 2.343.787 2.6 2.6 0 0 1 .858 2.3 3.1 3.1 0 0 1-.866 1.638l-6.439 6.42a2.12 2.12 0 0 1-1.429.741 1.667 1.667 0 0 1-1.183-.555c-.326-.326-.948-1.22.317-2.488l6.401-6.401.528.527-6.402 6.402c-.875.875-.454 1.295-.316 1.432a.96.96 0 0 0 .654.336 1.472 1.472 0 0 0 .902-.523l6.439-6.42a2.337 2.337 0 0 0 .658-1.222 1.891 1.891 0 0 0-.649-1.657 1.834 1.834 0 0 0-1.681-.581 2.459 2.459 0 0 0-1.226.633l-6.403 6.382c-.99.99-2.347 2.94-.375 4.913 1.838 1.838 3.658.784 4.863-.42l5.28-5.316.528.528-5.282 5.316c-2.015 2.015-4.172 2.168-5.919.421s-1.606-3.991.374-5.971Z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={0.5}
      />
    </G>
  </Svg>
);

export default FiledFileIcon;
