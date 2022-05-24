import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const BackArrowIcon = () => (
  <Svg width={32} height={31}>
    <Path
      d="M0 15.573C0 7.072 6.892.18 15.393.18h1.214C25.108.18 32 7.072 32 15.573c0 8.502-6.892 15.394-15.393 15.394h-1.214C6.892 30.967 0 24.075 0 15.574Z"
      fill="#fff"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.152 15.573c0-.552.358-1 .8-1h14.4c.442 0 .8.448.8 1 0 .553-.358 1-.8 1h-14.4c-.442 0-.8-.447-.8-1Z"
      fill="#033B57"
    />
    <Path
      d="M15.243 23.267c.199.198.451.306.749.306.595 0 1.073-.468 1.073-1.064 0-.297-.126-.568-.334-.776l-6.313-6.169 6.314-6.15c.207-.208.333-.488.333-.776 0-.596-.478-1.065-1.073-1.065-.298 0-.55.109-.749.307l-7.017 6.855c-.252.234-.37.523-.378.838 0 .316.126.587.378.83l7.017 6.864Z"
      fill="#033B57"
    />
  </Svg>
);

export default BackArrowIcon;
