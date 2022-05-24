import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent() {
  return (
    <Svg width={20} height={15} viewBox="0 0 15 10" fill="none">
      <Path
        d="M7.5 0C4.09 0 1.18 2.073 0 5c1.18 2.927 4.09 5 7.5 5s6.32-2.073 7.5-5c-1.18-2.927-4.09-5-7.5-5zm0 8.333C5.618 8.333 4.09 6.84 4.09 5S5.619 1.667 7.5 1.667c1.882 0 3.41 1.493 3.41 3.333S9.381 8.333 7.5 8.333zM7.5 3c-1.132 0-2.045.893-2.045 2S6.368 7 7.5 7s2.045-.893 2.045-2S8.632 3 7.5 3z"
        fill="#828282"
      />
    </Svg>
  )
}

export default SvgComponent