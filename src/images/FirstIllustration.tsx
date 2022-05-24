import * as React from 'react';
import Svg, {G, Rect, Path, Defs, ClipPath} from 'react-native-svg';

const FirstIllustration = () => (
  <Svg width={343} height={147} fill="none">
    <G clipPath="url(#a)">
      <Rect width={343} height={147} rx={16} fill="#EFF3FF" />
      <G opacity={0.5} stroke="#1C78D2">
        <Path opacity={0.4} d="M-471 12.41H668M98.5-55v810" />
        <Path
          opacity={0.2}
          d="M-471-55 98.5 755M-471-55 668 755M-471-55 668 350"
        />
      </G>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M169.5 24c27.338 0 49.5 22.162 49.5 49.5S196.838 123 169.5 123 120 100.838 120 73.5 142.162 24 169.5 24Zm0 8.486c-22.652 0-41.014 18.362-41.014 41.014 0 22.652 18.362 41.014 41.014 41.014 22.652 0 41.014-18.362 41.014-41.014 0-22.652-18.362-41.014-41.014-41.014Zm0 2.828 29.7 65.057h-14.143L169.5 63.6l-15.557 36.771H139.8l29.7-65.057Z"
        fill="#1C78D2"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h343v147H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default FirstIllustration;
