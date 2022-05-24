import * as React from 'react';
import Svg, {SvgProps, G, Rect, Circle, Defs, ClipPath} from 'react-native-svg';

const AvatarPlaceHolder = (props: SvgProps) => (
  <Svg width={112} height={112} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Rect width={112} height={112} rx={14} fill="#F8F7F7" />
      <Circle cx={56.5} cy={111.5} r={37.5} fill="#E9E8E8" />
      <Circle
        cx={56}
        cy={47}
        r={28}
        fill="#E9E8E8"
        stroke="#F8F7F7"
        strokeWidth={10}
      />
    </G>
    <Rect x={0.5} y={0.5} width={111} height={111} rx={13.5} stroke="#EBEBEB" />
    <Defs>
      <ClipPath id="a">
        <Rect width={112} height={112} rx={14} fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default AvatarPlaceHolder;
