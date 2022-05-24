import * as React from 'react';
import Svg, {SvgProps, G, Rect, Path} from 'react-native-svg';

const EditAccount = (props: SvgProps) => (
  <Svg width={49} height={49} {...props}>
    <G transform="translate(-19 -56)">
      <Rect
        data-name="Rectangle 32"
        width={49}
        height={49}
        rx={14}
        transform="translate(19 56)"
        fill="#f8f7f7"
      />
      <G fill="#737373">
        <Path
          data-name="Path 388"
          d="M57.081 66.909a5.013 5.013 0 0 0-7.09 0l-10.605 10.6a10.057 10.057 0 0 0-1.448 1.652 6.051 6.051 0 0 0-.338.605 10.051 10.051 0 0 0-.647 2.1l-.052.217a19.352 19.352 0 0 0-.423 2.08 3.107 3.107 0 0 0 .4 2.116 3.026 3.026 0 0 0 .911.9 3.106 3.106 0 0 0 2.121.369 19.42 19.42 0 0 0 2.076-.45l.213-.054a10.047 10.047 0 0 0 2.046-.657 6.043 6.043 0 0 0 .586-.332 10.03 10.03 0 0 0 1.613-1.418l10.642-10.642a5.013 5.013 0 0 0 0-7.09Zm-4.95 2.14a1.987 1.987 0 1 1 2.81 2.81l-.66.66a3.029 3.029 0 0 1-2.778-2.842Zm-3.067 3.068a6.093 6.093 0 0 0 2.8 2.823l-7.465 7.465a8.427 8.427 0 0 1-1.206 1.109 3.006 3.006 0 0 1-.293.166 8.456 8.456 0 0 1-1.571.466 18.225 18.225 0 0 1-1.8.4h-.042v-.041a18.212 18.212 0 0 1 .38-1.807 8.439 8.439 0 0 1 .458-1.612 2.99 2.99 0 0 1 .169-.3 8.424 8.424 0 0 1 1.133-1.235Z"
          fillRule="evenodd"
        />
        <Path
          data-name="Path 389"
          d="M38.935 66.812a41.544 41.544 0 0 0-5.076.18 5.454 5.454 0 0 0-5.23 5.23 41.5 41.5 0 0 0-.18 5.076v7.78a41.5 41.5 0 0 0 .18 5.076 5.454 5.454 0 0 0 5.23 5.23 41.5 41.5 0 0 0 5.076.18h7.78a41.5 41.5 0 0 0 5.076-.18 5.454 5.454 0 0 0 5.23-5.23 41.5 41.5 0 0 0 .18-5.076v-3.137a1.513 1.513 0 0 0-3.027 0v3.027a40.4 40.4 0 0 1-.153 4.78 2.516 2.516 0 0 1-2.634 2.634 40.4 40.4 0 0 1-4.78.153h-7.566a40.4 40.4 0 0 1-4.78-.153 2.515 2.515 0 0 1-2.634-2.634 40.393 40.393 0 0 1-.153-4.78v-7.567a40.4 40.4 0 0 1 .153-4.78 2.515 2.515 0 0 1 2.634-2.634 40.4 40.4 0 0 1 4.78-.153h3.027a1.513 1.513 0 0 0 0-3.027Z"
        />
      </G>
    </G>
  </Svg>
);

export default EditAccount;
