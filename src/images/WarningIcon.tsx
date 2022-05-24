import * as React from "react"
import Svg, { SvgProps, G, Rect, Path } from "react-native-svg"

const WarningIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={44} height={44} {...props}>
    <G data-name="Icon (Are You Sure)">
      <G
        data-name="Rectangle 63"
        fill="#2c2c2c"
        stroke="#2c2c2c"
        strokeWidth={2}
      >
        <Rect width={44} height={44} rx={10} stroke="none" />
        <Rect x={1} y={1} width={42} height={42} rx={9} fill="none" />
      </G>
      <Path
        data-name="Path 399"
        d="M29.85 22.045h-5.91v-3h5.91v-2.238l3.447 3.716-3.447 3.761Z"
        fill="#fff"
      />
      <Path
        data-name="Path 400"
        d="m20.851 32.297-7.476-3.581V12.375l7.476 3.537Z"
        fill="#ff9300"
      />
      <Path
        data-name="Path 401"
        d="M26.626 29.387H13.375a.689.689 0 0 1-.672-.672v-16.34a.688.688 0 0 1 .672-.672h13.251a.689.689 0 0 1 .672.672v4.118a.672.672 0 1 1-1.343 0v-3.492H14.046v15.088h11.909v-3.448a.672.672 0 1 1 1.343 0v4.074a.722.722 0 0 1-.672.672Z"
        fill="#ff9300"
      />
    </G>
  </Svg>
)

export default WarningIcon;
