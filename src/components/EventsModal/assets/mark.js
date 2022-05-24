import * as React from "react"
import Svg, { G, Rect, Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" width={44} height={44}>
    <G data-name="Check (Action Performed)">
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
        data-name="Path 136"
        d="m31.343 13.526-1.527 1.54c-4.141 4.15-7.3 7.616-11.147 11.538l-4.094-3.459-1.649-1.392-2.783 3.3 1.649 1.405 5.621 4.756 1.513 1.284 1.405-1.405c4.656-4.666 7.972-8.394 12.538-12.971l1.527-1.54-3.054-3.054Z"
        fill="#ff9300"
      />
    </G>
  </Svg>
)

export default SvgComponent