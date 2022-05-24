import * as React from 'react';
import Svg, {SvgProps, G, Rect, Path} from 'react-native-svg';

const TakePictureIcon = (props: SvgProps) => (
  <Svg width={44} height={44} {...props}>
    <G data-name="Camera (Change Profile)">
      <G data-name="Rectangle 91" fill="#ff9300" stroke="#fff" strokeWidth={2}>
        <Rect width={44} height={44} rx={14} stroke="none" />
        <Rect x={1} y={1} width={42} height={42} rx={13} fill="none" />
      </G>
      <Path
        data-name="Path 17"
        d="M24.166 12a2.6 2.6 0 0 1 2.367 1.5c.127.253.3.622.488 1.012l.223.471.11.231.107.234a.243.243 0 0 0 .213.128 4.657 4.657 0 0 1 4.648 4.643v6.326a4.657 4.657 0 0 1-4.648 4.643H15.648A4.65 4.65 0 0 1 11 26.547v-6.326a4.65 4.65 0 0 1 4.648-4.643.209.209 0 0 0 .2-.128l.064-.128c.3-.628.661-1.4.874-1.821A2.588 2.588 0 0 1 19.145 12h5.021Zm-2.505 6.826a4.181 4.181 0 0 0-2.974 1.235 4.12 4.12 0 0 0-1.215 2.95 4.192 4.192 0 1 0 4.19-4.185Zm0 1.6a2.59 2.59 0 1 1-2.591 2.585V23a2.5 2.5 0 0 1 .746-1.81 2.582 2.582 0 0 1 1.845-.766Zm5.981-1.853a.964.964 0 1 0 .97.969.964.964 0 0 0-.97-.971Z"
        fill="#fff"
      />
    </G>
  </Svg>
);

export default TakePictureIcon;
