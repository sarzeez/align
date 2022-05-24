import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, Rect} from 'react-native-svg';
import {View} from 'react-native';
import {Colors} from 'theme';
import shadows from 'theme/Shadows';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const DrawerToggleIcon = (props: SvgProps) => (
  <View
    style={{
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.white,
      borderRadius: 14,
      ...shadows.sh3,
    }}
  >
    <Svg
      width={53}
      height={53}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G filter="url(#a)">
        <Path
          d="M37 0H16C8.268 0 2 6.268 2 14v21c0 7.732 6.268 14 14 14h21c7.732 0 14-6.268 14-14V14c0-7.732-6.268-14-14-14Z"
          fill="#fff"
        />
      </G>
      <Path
        d="M12.5 15.5h28M12.5 24.5h22M12.5 33.5h28"
        stroke="#000"
        strokeWidth={4}
      />
      <Defs />
    </Svg>
  </View>
);

export default DrawerToggleIcon;
