import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      {...props}
      width={18}
      height={14}
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M6.471 10.08l8.602-9.007a1.282 1.282 0 011.872 0c.518.541.518 1.419 0 1.96L6.471 14 .388 7.63a1.433 1.433 0 010-1.96 1.282 1.282 0 011.872 0l4.211 4.41z"
        fill={props.color}
      />
    </Svg>
  )
}

export default SvgComponent