import * as React from 'react';
import Svg, {SvgProps, G, Rect, Path} from 'react-native-svg';

const IphoneIcon = (props: SvgProps) => (
  <Svg width={55} height={55} {...props}>
    <G data-name="Rectangle 94" fill="#fff" stroke="#ebebeb">
      <Rect width={55} height={55} rx={20} stroke="none" />
      <Rect x={0.5} y={0.5} width={54} height={54} rx={19.5} fill="none" />
    </G>
    <Path
      data-name="Path 387"
      d="m39.116 34.792-.148-.3c-.416-.979-5.521-2.463-5.936-2.493l-.327.03c-.623.119-1.306.683-2.642 1.84a.806.806 0 0 1-.95.119 23.312 23.312 0 0 1-4.957-4.126 18.639 18.639 0 0 1-3.205-5.075.889.889 0 0 1 .237-.92c1.514-1.365 2.167-2.018 2.226-2.731.03-.416-.861-5.669-1.781-6.174l-.267-.178a3.363 3.363 0 0 0-2.463-.742 2.726 2.726 0 0 0-.683.267 8.922 8.922 0 0 0-3.027 3c-.445.92-.653 9.26 5.58 16.294 6.173 6.975 13.8 7.272 14.929 7.034h.03l.089-.03a8.781 8.781 0 0 0 3.354-2.642c.92-1.1.3-2.434-.059-3.176Z"
      fill="#ff9300"
    />
  </Svg>
);

export default IphoneIcon;
