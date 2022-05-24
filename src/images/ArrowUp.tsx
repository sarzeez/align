import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';

const ArrowUp = () => {
  return (
    <Svg width={20} height={12} fill="none" xmlns="http://www.w3.org/2000/svg">
      <G>
        <G transform={{scale: 1.4}}>
          <Path
            d="M1.937 8L.567 6.607 7.067 0l6.5 6.607L12.197 8l-5.13-5.214L1.937 8z"
            fill="#737373"
          />
        </G>
      </G>
    </Svg>
  );
};

export default ArrowUp;
