import * as React from 'react';
import Svg, {G, Rect, Path} from 'react-native-svg';

const MyWorkspaceIcon = () => (
  <Svg width={54} height={54}>
    <G data-name="My Workspace" transform="translate(-24 -479)">
      <Rect
        data-name="Rectangle 36"
        width={54}
        height={54}
        rx={14}
        transform="translate(24 479)"
        fill="#ff9300"
      />
      <Path
        data-name="Path 886"
        d="M59.257 489.247a5.307 5.307 0 0 0-4.918 7.259l-10.056 5.579a5.284 5.284 0 1 0 .014 7.824l10.055 5.583a5.216 5.216 0 0 0-.386 1.97 5.309 5.309 0 1 0 1.309-3.471l-9.877-5.482a5.277 5.277 0 0 0 0-5.015l9.877-5.482a5.286 5.286 0 1 0 3.981-8.761Z"
        fill="#fff"
      />
    </G>
  </Svg>
);

export default MyWorkspaceIcon;
