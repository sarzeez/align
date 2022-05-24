import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const MenuIcon = (props: SvgProps) => (
  <Svg width="44" height="44" viewBox="0 0 44 44" fill="none" {...props}>
    <Path
      d="M12 25C13.6569 25 15 23.6569 15 22C15 20.3431 13.6569 19 12 19C10.3431 19 9 20.3431 9 22C9 23.6569 10.3431 25 12 25Z"
      fill={props.color || 'black'}
    />
    <Path
      d="M22 25C23.6569 25 25 23.6569 25 22C25 20.3431 23.6569 19 22 19C20.3431 19 19 20.3431 19 22C19 23.6569 20.3431 25 22 25Z"
      fill={props.color || 'black'}
    />
    <Path
      d="M32 25C33.6569 25 35 23.6569 35 22C35 20.3431 33.6569 19 32 19C30.3431 19 29 20.3431 29 22C29 23.6569 30.3431 25 32 25Z"
      fill={props.color || 'black'}
    />
  </Svg>
);

export default MenuIcon;
