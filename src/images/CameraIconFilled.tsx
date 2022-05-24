import * as React from 'react';
import Svg, {SvgProps, G, Path, Rect} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const CameraIconFilled = (props: SvgProps) => (
  <Svg width="44" height="44" viewBox="0 0 44 44" {...props}>
    <G
      id="Camera_Add_Photos_"
      data-name="Camera (Add Photos)"
      transform="translate(-240 -254)"
    >
      <Rect
        id="Rectangle_91"
        data-name="Rectangle 91"
        width="44"
        height="44"
        rx="14"
        transform="translate(240 254)"
        fill="#ff9300"
      />
      <Path
        id="Path_17"
        data-name="Path 17"
        d="M13.166,0a2.6,2.6,0,0,1,2.367,1.5c.127.253.3.622.488,1.012l.223.471h0l.11.231.107.234a.243.243,0,0,0,.213.128,4.657,4.657,0,0,1,4.648,4.643h0v6.326a4.657,4.657,0,0,1-4.648,4.643H4.648A4.65,4.65,0,0,1,0,14.547H0V8.221A4.65,4.65,0,0,1,4.648,3.578a.209.209,0,0,0,.2-.128h0l.064-.128c.3-.628.661-1.4.874-1.821A2.588,2.588,0,0,1,8.145,0h5.021ZM10.661,6.826A4.181,4.181,0,0,0,7.687,8.061a4.12,4.12,0,0,0-1.215,2.95,4.192,4.192,0,1,0,4.19-4.185Zm0,1.6A2.59,2.59,0,1,1,8.07,11.011h0V11a2.5,2.5,0,0,1,.746-1.81A2.582,2.582,0,0,1,10.661,8.424Zm5.981-1.853a.964.964,0,1,0,.97.969A.964.964,0,0,0,16.642,6.571Z"
        transform="translate(251 266)"
        fill="#fff"
      />
    </G>
  </Svg>
);

export default CameraIconFilled;
