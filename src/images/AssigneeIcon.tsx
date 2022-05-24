import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const AssigneeIcon = (props: SvgProps) => (
  <Svg
    width={16}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M8 13.174c4.339 0 8 .705 8 3.425C16 19.319 12.315 20 8 20c-4.338 0-8-.705-8-3.425 0-2.72 3.685-3.401 8-3.401ZM8 0a5.292 5.292 0 1 1-5.294 5.291A5.273 5.273 0 0 1 8 0Z"
        fill="#000"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default AssigneeIcon
