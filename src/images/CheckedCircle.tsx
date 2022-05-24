import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

const CheckedCircle = () => (
  <Svg width={24} height={24} fill="none">
    <Circle cx={12} cy={12} r={11.5} fill="#1C78D2" stroke="#1C78D2" />
    <Path
      d="M6.866 13.235a1.183 1.183 0 1 1 1.526-1.807l2.773 2.354c.02.016.049.014.066-.005l5.244-5.889a1.17 1.17 0 1 1 1.74 1.568l-6.823 7.492a.073.073 0 0 1-.101.007l-4.425-3.72Z"
      fill="#fff"
    />
  </Svg>
);

export default CheckedCircle;
