import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';

const EstimatedComplition = (props: SvgProps) => (
  <Svg
    width={27}
    height={27}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M13.281-.003a13.28 13.28 0 1 0 13.281 13.281A13.3 13.3 0 0 0 13.281-.002Zm0 2.415A10.866 10.866 0 1 1 2.415 13.278 10.848 10.848 0 0 1 13.281 2.415v-.003Zm0 2.012a1.208 1.208 0 0 0-1.207 1.207v7.646a1.205 1.205 0 0 0 .352.855l4.842 4.842a1.21 1.21 0 0 0 1.71-1.71l-4.49-4.49V5.631a1.207 1.207 0 0 0-1.207-1.207Z"
        fill="#000"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h26.561v26.561H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default EstimatedComplition;
