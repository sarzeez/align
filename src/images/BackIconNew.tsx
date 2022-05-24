import * as React from "react"
import Svg, { SvgProps, G, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const BackIconNew = (props: SvgProps) => (
  <Svg width={55} height={55} {...props}>
    <Defs></Defs>
    <G data-name="Icon (Back)">
      <G>
        <Rect
          data-name="Rectangle 32"
          width={49}
          height={49}
          rx={14}
          transform="translate(3 1)"
          fill="#fff"
        />
        <G transform={"translate(19 14) scale(0.9)"}>
          <Path fill-rule="evenodd" clip-rule="evenodd" d="M10.0371 20.5827L0.792152 11.4458C0.402616 11.0612 0.402616 10.4398 0.792152 10.0542L10.0371 0.917333C10.5995 0.360889 11.5144 0.360889 12.0777 0.917333C12.64 1.47378 12.64 2.37687 12.0777 2.93332L4.16913 10.7505L12.0777 18.5657C12.64 19.1231 12.64 20.0262 12.0777 20.5827C11.5144 21.1391 10.5995 21.1391 10.0371 20.5827Z" fill={'#000'}/>
        </G>
      </G>
    </G>
  </Svg>
)

export default BackIconNew
