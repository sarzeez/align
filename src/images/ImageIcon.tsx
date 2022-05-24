import * as React from 'react';
import Svg, {G, Path, SvgProps} from 'react-native-svg';

const ImageIcon = ({width = '44px', height = '44px', ...rest}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 44 44" {...rest}>
    <G data-name="Image">
      <Path
        data-name="Path 871"
        d="M22.259 0c5.263 0 8.8 3.693 8.8 9.188V21.87c0 5.5-3.536 9.188-8.8 9.188H8.8c-5.263 0-8.8-3.693-8.8-9.188V9.188C0 3.693 3.536 0 8.8 0Zm1.713 16.383c-1.665-1.038-2.95.42-3.3.886-.334.45-.622.947-.924 1.444a8.89 8.89 0 0 1-3.056 3.462c-2.133 1.181-3.753.093-4.917-.7a8.579 8.579 0 0 0-1.285-.76c-1.043-.45-1.982.063-3.375 1.832-.731.925-1.455 1.841-2.189 2.755a1.2 1.2 0 0 0 .258 1.755 6.414 6.414 0 0 0 3.4.894h13.089a7.027 7.027 0 0 0 2.185-.332 5.743 5.743 0 0 0 3.51-3.279 5.853 5.853 0 0 0 .306-4.257 3.5 3.5 0 0 0-.8-1.216 16.747 16.747 0 0 0-2.902-2.484ZM10.092 6.212a3.882 3.882 0 1 0 3.881 3.882 3.885 3.885 0 0 0-3.881-3.882Z"
        fill={rest.color}
      />
    </G>
  </Svg>
);

export default ImageIcon;