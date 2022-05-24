import * as React from 'react';
import Svg, {SvgProps, G, Rect, Path} from 'react-native-svg';

const AddWorkspaceIcon = (props: SvgProps) => (
  <Svg width={36} height={36} {...props}>
    <G data-name="Add Workspace">
      <G data-name="Rectangle 32" fill="#ff9300" stroke="#ff9300">
        <Rect width={36} height={36} rx={11} stroke="none" />
        <Rect x={0.5} y={0.5} width={35} height={35} rx={10.5} fill="none" />
      </G>
      <Path
        data-name="Path 398"
        d="M15.796 27.716V8.282h4.409v19.434Zm-7.513-7.512v-4.409h19.434v4.409Z"
        fill="#fff"
      />
    </G>
  </Svg>
);

export default AddWorkspaceIcon;
