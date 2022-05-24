import * as React from 'react';
import Svg, {G, Rect, Path} from 'react-native-svg';

const ChatSendButton = ({backgroundColor = '#ff9300', color = '#fff'}) => (
  <Svg width={44} height={44}>
    <G data-name="Send (Orange)" transform="translate(-369 -525)">
      <Rect
        data-name="Rectangle 595"
        width={44}
        height={44}
        rx={14}
        transform="translate(369 525)"
        fill={backgroundColor}
      />
      <Path
        data-name="Path 870"
        d="m382.44 545.628 6.524 2.521 2.521 6.524a.654.654 0 0 0 .648.44.7.7 0 0 0 .648-.44l6.292-15.731a.678.678 0 0 0-.162-.74.723.723 0 0 0-.74-.162l-15.731 6.292a.7.7 0 0 0-.439.648.685.685 0 0 0 .44.648Zm14.736-5.691-5.02 12.584-1.754-4.557 2.545-2.545a.687.687 0 1 0-.972-.972l-2.452 2.406-4.927-1.9Z"
        fill={color}
      />
    </G>
  </Svg>
);

export default ChatSendButton;
