import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const FilledCheckBox = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 0h6a9 9 0 0 1 9 9v6a9 9 0 0 1-9 9H9a9 9 0 0 1-9-9V9a9 9 0 0 1 9-9Zm7.639 7.911.9-.911h.005l1.806 1.806-.9.911c-1.344 1.347-2.504 2.57-3.67 3.797a207.993 207.993 0 0 1-3.746 3.875l-.831.831-.9-.759-3.324-2.813-.975-.831 1.646-1.95.975.823 2.421 2.046c.953-.975 1.835-1.9 2.719-2.827a235.58 235.58 0 0 1 3.874-3.998Z"
      fill="#FF9300"
    />
  </Svg>
);

export default FilledCheckBox;
