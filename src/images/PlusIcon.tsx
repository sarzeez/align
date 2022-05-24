import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width={14} height={14} fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.39 7.262a.968.968 0 0 0-.968-.968H7.907V1.865a.968.968 0 0 0-1.937 0v4.43H1.455a.968.968 0 1 0 0 1.935H5.97v4.429a.968.968 0 0 0 1.937 0V8.23h4.515a.968.968 0 0 0 .968-.968Z"
      fill={props.color || '#fff'}
    />
  </Svg>
);

export default SvgComponent;
