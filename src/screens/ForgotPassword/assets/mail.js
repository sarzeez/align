import * as React from "react"
import Svg, { G, Rect, Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" width={44} height={44}>
    <G data-name="Icon (Email Sent)">
      <G fill="#2c2c2c" stroke="#2c2c2c" strokeWidth={2}>
        <Rect width={44} height={44} rx={10} stroke="none" />
        <Rect x={1} y={1} width={42} height={42} rx={9} fill="none" />
      </G>
      <G data-name="Group 485" transform="translate(-174.122 -374.26)">
        <Rect
          data-name="Rectangle 63"
          width={10.136}
          height={10.136}
          rx={2}
          transform="translate(200.364 395.686)"
          fill="#ff9300"
          stroke="#ff9300"
          strokeWidth={2}
        />
        <Path
          data-name="Path 136"
          d="m207.585 398.801-.352.355c-.954.956-1.682 1.754-2.568 2.658l-.943-.8-.38-.321-.641.759.38.324 1.295 1.1.349.3.324-.324c1.073-1.075 1.836-1.934 2.888-2.988l.352-.355-.7-.7Z"
          fill="#fff"
        />
        <Path
          data-name="Path 380"
          d="M197.734 401.818h-12.316v-11.292l10.093 4.752a.694.694 0 0 0 .558 0l10.093-4.752v2.865a.65.65 0 0 0 1.3 0v-6.483a.648.648 0 0 0-.648-.648H184.77a.648.648 0 0 0-.648.648v15.558a.648.648 0 0 0 .648.648h12.964a.65.65 0 0 0 0-1.3Zm8.427-14.261v1.53l-10.374 4.881-10.369-4.881v-1.53Z"
          fill="#ff9300"
          stroke="#ff9300"
          strokeWidth={0.5}
        />
      </G>
    </G>
  </Svg>
)

export default SvgComponent