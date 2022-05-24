import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {View} from 'react-native';

const AvatarPlaceholder49 = (props: SvgProps) => (
  <View style={{width: 44, height: 44, borderRadius: 14, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', marginTop: 2}}>
    <Svg width={49} height={49} fill="none" {...props}>
      <Path fill="#EBEBEB" d="M0 0h49v49H0z" />
      <Path
        d="m36.437 39.82-5.906-1.477-.503-2.01a10.63 10.63 0 0 0 2.983-5.92 2.317 2.317 0 0 0 1.672-1.939l.385-3.083a2.305 2.305 0 0 0-1.475-2.445l.141-2.903.577-.578c.868-.924 1.588-2.507.083-4.804-1.156-1.765-3.12-2.661-5.84-2.661-1.072 0-3.542 0-5.842 1.545-6.568.137-7.462 3.188-7.462 6.163 0 .693.168 2.251.279 3.192a2.314 2.314 0 0 0-1.597 2.493l.385 3.083a2.32 2.32 0 0 0 1.855 1.984c.319 2.12 1.346 4.2 2.835 5.738l-.537 2.148-5.906 1.477A8.646 8.646 0 0 0 6 48.228c0 .426.345.771.77.771h35.46c.425 0 .77-.348.77-.774a8.652 8.652 0 0 0-6.563-8.407Z"
        fill="#A1A1A1"
      />
    </Svg>
  </View>
);

export default AvatarPlaceholder49;
