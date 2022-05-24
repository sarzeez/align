import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const NewMessageIcon = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.441 30.712a2.878 2.878 0 0 1-1.662-.164l-.005.004A2.878 2.878 0 0 1 2 27.895v-21.1A4.795 4.795 0 0 1 6.8 2h19.18a4.8 4.8 0 0 1 4.8 4.795v15.343a4.8 4.8 0 0 1-4.8 4.795H9.915l-3 2.992a2.877 2.877 0 0 1-1.474.787ZM4.88 6.795v17.261l.003 3.837 3.836-3.836h17.264a1.918 1.918 0 0 0 1.918-1.918V6.795a1.917 1.917 0 0 0-1.923-1.918H6.797a1.917 1.917 0 0 0-1.918 1.918Zm13.059 13.541h-2.877l-.002-4.313h-4.315v-2.877h4.317V8.83h2.877v4.313h4.315v2.877h-4.315v4.316Z"
      fill="#fff"
    />
  </Svg>
);

export default NewMessageIcon;
