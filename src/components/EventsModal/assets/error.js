import * as React from "react"
import Svg, { Path, G, Rect } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={44}
    height={44}
    
  >
    <G data-name="Rectangle 63" fill="#2c2c2c" stroke="#2c2c2c" strokeWidth={2}>
      <Rect width={44} height={44} rx={10} stroke="none" />
      <Rect x={1} y={1} width={42} height={42} rx={9} fill="none" />
    </G>
    <G transform={{translate: 10}}>
      <Path data-name="Rectangle 638" fill="#fff" d="M9.433 4.836h5v14h-5z" />
      <Path
        data-name="Path 901"
        d="M22.671 18.018 12.676.718a1.437 1.437 0 0 0-2.486 0l-9.995 17.3a1.435 1.435 0 0 0 1.231 2.16h19.989a1.438 1.438 0 0 0 1.255-2.16Zm-11.552-12a1.3 1.3 0 0 1 1.482.7 1.109 1.109 0 0 1 .1.628c-.05.628-.075 1.256-.1 1.908-.05.979-.126 1.984-.176 2.963-.025.3-.025.6-.05.929a.948.948 0 0 1-.954.929.961.961 0 0 1-.954-.9c-.075-1.532-.176-3.064-.251-4.6l-.075-1.231a1.379 1.379 0 0 1 .98-1.331Zm.326 11.5a1.265 1.265 0 0 1-1.256-1.281 1.286 1.286 0 0 1 1.281-1.281 1.271 1.271 0 0 1 1.256 1.306 1.316 1.316 0 0 1-1.281 1.255Z"
        fill="#ff9300"
      />
    </G>
  </Svg>
)

export default SvgComponent