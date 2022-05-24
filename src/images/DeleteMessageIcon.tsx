import * as React from 'react';
import Svg, {SvgProps, Defs, G, Rect, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const DeleteMessageIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={62} height={62} {...props}>
    <Defs />
    <G data-name="Icon (Delete Messages)">
      <G filter="url(#a)" data-name="Get Started CTA">
        <Rect
          data-name="Rectangle 61"
          width={44}
          height={44}
          rx={14}
          transform="translate(9 6)"
          fill="#fff"
        />
      </G>
      <G data-name="Iconly/Bold/Delete">
        <Path
          data-name="Path 882"
          d="M36.951 25.758a.581.581 0 0 1 .419.187.6.6 0 0 1 .145.446c0 .054-.426 5.446-.67 7.716a2.334 2.334 0 0 1-2.4 2.262c-1.033.023-2.045.031-3.045.031-1.058 0-2.093-.008-3.1-.031a2.333 2.333 0 0 1-2.345-2.262c-.251-2.278-.669-7.662-.677-7.716a.633.633 0 0 1 .152-.446.565.565 0 0 1 .419-.187ZM33.052 20.4a1.589 1.589 0 0 1 1.522 1.2l.131.584a1.024 1.024 0 0 0 .993.813h2.332a.578.578 0 0 1 .57.587v.3a.584.584 0 0 1-.57.587H24.771a.584.584 0 0 1-.571-.585v-.3a.579.579 0 0 1 .571-.587H27.1a1.026 1.026 0 0 0 1-.817l.122-.546a1.59 1.59 0 0 1 1.526-1.236h3.3Z"
          fill="#ff9300"
        />
      </G>
    </G>
  </Svg>
);

export default DeleteMessageIcon;
