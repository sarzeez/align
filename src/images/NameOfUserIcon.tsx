import * as React from 'react';
import Svg, {SvgProps, G, Rect, Path} from 'react-native-svg';

const NameOfUserIcon = (props: SvgProps) => (
  <Svg width={55} height={55} {...props}>
    <G data-name="Name Of Comapny">
      <G data-name="Rectangle 95" fill="#fff" stroke="#ebebeb">
        <Rect width={55} height={55} rx={20} stroke="none" />
        <Rect x={0.5} y={0.5} width={54} height={54} rx={19.5} fill="none" />
      </G>
      <Path
        data-name="Path 887"
        d="M39.827 27.274v8.712a1.017 1.017 0 0 1-1.027 1.027 1.053 1.053 0 0 1-1.027-1.068v-7.644h-3.616v7.684a1.028 1.028 0 1 1-2.055 0V20.041h-9.2v15.944a1.028 1.028 0 1 1-2.055 0v-7.684h-3.62v7.643a1.028 1.028 0 0 1-2.055 0v-8.67a1.044 1.044 0 0 1 1.027-1.027h4.643v-7.235a1.017 1.017 0 0 1 1.03-1.025h11.3a1.017 1.017 0 0 1 1.027 1.027v7.232h4.643a1.009 1.009 0 0 1 .986 1.027Zm-14.341 3.575a.945.945 0 1 0-.945-.945.93.93 0 0 0 .945.945Zm0-3.822a.945.945 0 1 0-.945-.945.93.93 0 0 0 .945.945Zm0-3.822a.945.945 0 1 0-.945-.945.93.93 0 0 0 .945.945Zm4.027 0a.945.945 0 1 0-.945-.945.956.956 0 0 0 .945.945Zm0 3.822a.945.945 0 1 0-.945-.945.956.956 0 0 0 .945.945Zm0 3.822a.945.945 0 1 0-.945-.945.956.956 0 0 0 .945.945Z"
        fill="#ff9300"
      />
    </G>
  </Svg>
);

export default NameOfUserIcon;
