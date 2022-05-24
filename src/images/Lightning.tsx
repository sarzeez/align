import React from 'react';
import Svg, {Line, Path, SvgProps} from 'react-native-svg';

const Lightning = (props: SvgProps) => (
  <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <Path
      d="M9 17.6667L20.0222 1L15.2 17.6667H9Z"
      fill={props.color || 'black'}
    />
    <Path
      d="M22.7778 14.3333L11.7555 31L16.5778 14.3333H22.7778Z"
      fill={props.color || 'black'}
    />
    <Path
      d="M9 17.6667L20.0222 1L15.2 17.6667H9Z"
      stroke={props.color || 'black'}
      stroke-linejoin="round"
    />
    <Path
      d="M22.7778 14.3333L11.7555 31L16.5778 14.3333H22.7778Z"
      stroke={props.color || 'black'}
      stroke-linejoin="round"
    />
    <Line
      x1="6.40784"
      y1="3.13408"
      x2="26.1512"
      y2="27.0339"
      stroke={props.stroke || 'black'}
      stroke-width="2"
      stroke-linecap="round"
    />
  </Svg>
);

export default Lightning;
