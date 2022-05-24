import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const Logo = () => (
  <Svg width={100} height={32}>
    <Path
      d="m81.672 21.72-1.792 3.43.147.032.109.031c.288.088.552.229.791.421.27.217.488.514.653.89.166.377.249.858.249 1.442 0 .678-.159 1.26-.476 1.745-.317.485-.73.855-1.241 1.109a3.673 3.673 0 0 1-1.66.381c-.464 0-.951-.096-1.462-.29-.468-.176-.849-.407-1.142-.69l-.078-.08 1.05-1.695.05.06c.14.158.342.312.602.463.294.17.601.254.923.254a1.304 1.304 0 0 0 1.106-.621c.133-.208.2-.462.2-.763 0-.415-.117-.745-.348-.99-.232-.244-.556-.367-.972-.367-.284 0-.5.012-.646.035a4.42 4.42 0 0 0-.29.057l-.143.035-.042-.056 1.53-2.854h-2.24V21.72h5.122Zm5.979-.254 1.376 1.484-.16.064c-.632.26-1.163.581-1.593.963l-.106.096-.175.172c-.354.363-.63.736-.826 1.12l-.063.128-.027.06.03-.03a2.82 2.82 0 0 1 .132-.115c.402-.33.962-.494 1.681-.494.454 0 .894.127 1.32.381.426.255.773.608 1.043 1.06.27.452.404.98.404 1.582 0 .697-.168 1.289-.504 1.774a3.281 3.281 0 0 1-1.298 1.109 3.821 3.821 0 0 1-1.674.381c-.681 0-1.296-.16-1.845-.48-.548-.32-.984-.791-1.305-1.413-.322-.622-.483-1.38-.483-2.275 0-.556.107-1.095.32-1.618a6.217 6.217 0 0 1 .88-1.497c.373-.476.806-.921 1.298-1.335a11.57 11.57 0 0 1 1.575-1.117Zm8.39.142c.54 0 1.048.094 1.526.282.477.188.898.478 1.262.87.365.39.65.884.859 1.483.208.598.312 1.302.312 2.112 0 .838-.104 1.559-.312 2.162-.208.603-.497 1.095-.866 1.476-.369.382-.79.662-1.263.841-.472.179-.979.268-1.518.268a4.12 4.12 0 0 1-1.525-.282 3.431 3.431 0 0 1-1.263-.87c-.364-.39-.65-.884-.858-1.483-.209-.598-.313-1.302-.313-2.112 0-.904.1-1.66.299-2.268.198-.607.475-1.095.83-1.462a3 3 0 0 1 1.255-.784 5.112 5.112 0 0 1 1.575-.233Zm-8.915 5.03c-.265 0-.504.049-.717.148-.213.099-.383.23-.51.396a.864.864 0 0 0-.19.46l-.002.07v.338l.003.085c.013.194.074.378.181.551.123.198.293.36.511.488.218.127.459.19.724.19.274 0 .518-.054.73-.162.213-.108.381-.268.504-.48a1.51 1.51 0 0 0 .185-.77c0-.292-.064-.535-.192-.728a1.213 1.213 0 0 0-.51-.438 1.679 1.679 0 0 0-.717-.148Zm8.901-3.052c-.463 0-.828.122-1.093.367-.264.245-.449.575-.553.99-.104.413-.156.88-.156 1.398 0 .518.052.989.156 1.413.104.424.289.76.553 1.01.265.25.63.375 1.093.375.473 0 .842-.125 1.107-.375s.451-.591.56-1.024c.11-.434.163-.914.163-1.441 0-.519-.054-.98-.163-1.385-.109-.405-.295-.728-.56-.968-.265-.24-.634-.36-1.107-.36ZM12.415 0c6.857 0 12.416 5.535 12.416 12.363 0 6.828-5.559 12.363-12.415 12.363C5.558 24.726 0 19.191 0 12.363 0 5.535 5.559 0 12.415 0Zm47.711 9.347c.751 0 1.407.1 1.969.301l.128.048.19.08c.39.171.709.369.956.592l.08.076.089.095.228-.726h2.745v9.262l-.002.142a3.95 3.95 0 0 1-.764 2.263c-.51.7-1.188 1.25-2.032 1.653-.845.403-1.778.604-2.8.604-.836 0-1.542-.099-2.117-.296-.575-.198-1.06-.438-1.458-.721-.34-.242-.65-.474-.928-.695l-.136-.11 1.745-2.035.125.11c.297.258.635.507 1.014.748.433.276 1.004.414 1.713.414.468 0 .905-.082 1.31-.244.367-.148.67-.357.909-.627l.07-.083.077-.107a1.81 1.81 0 0 0 .293-.956l.002-.103v-1.309l-.052.085c-.24.366-.6.692-1.076.98-.596.36-1.377.541-2.342.541a4.44 4.44 0 0 1-2.33-.646 4.806 4.806 0 0 1-1.713-1.76c-.426-.741-.639-1.586-.639-2.532 0-.975.227-1.84.681-2.597a5.158 5.158 0 0 1 1.767-1.79 4.368 4.368 0 0 1 2.298-.657Zm-47.71-7.228c-5.682 0-10.288 4.587-10.288 10.244 0 5.658 4.606 10.244 10.287 10.244 5.682 0 10.288-4.586 10.288-10.244 0-5.657-4.606-10.244-10.287-10.244Zm20.39.234v16.722h-2.98V2.353h2.98Zm13.138 7.46v9.262h-2.98V9.813h2.98Zm37.197-.445c.88 0 1.614.258 2.203.773.56.492.86 1.12.9 1.887l.004.116v6.93h-2.98v-5.828l-.005-.1c-.028-.364-.136-.659-.324-.885-.206-.247-.55-.371-1.032-.371-.454 0-.852.148-1.192.445-.34.297-.603.7-.788 1.208-.169.466-.26.998-.275 1.595l-.002.164v3.773h-2.98V9.813h2.704l.208 1.475-.017.03c.327-.58.788-1.05 1.384-1.41.596-.36 1.326-.54 2.192-.54ZM12.415 2.826l7.45 16.249h-3.547L12.414 9.89l-3.902 9.184H4.966l7.45-16.25Zm48.541 8.937c-.482 0-.918.11-1.309.328-.39.22-.698.52-.925.9a2.52 2.52 0 0 0-.341 1.315c0 .495.114.94.34 1.335.228.396.536.707.926.933.39.226.827.339 1.31.339.41 0 .776-.053 1.096-.16.319-.105.603-.26.85-.465.218-.18.406-.4.563-.66l.066-.114v-2.268l-.045-.102a2.064 2.064 0 0 0-.53-.693 2.8 2.8 0 0 0-.883-.508 3.28 3.28 0 0 0-1.118-.18ZM44.54 5.023c.397 0 .762.141 1.096.424.333.282.5.643.5 1.08 0 .439-.167.796-.5 1.071a1.683 1.683 0 0 1-1.096.413c-.398 0-.77-.137-1.118-.413a1.303 1.303 0 0 1-.521-1.07c0-.438.173-.799.521-1.081.348-.283.72-.424 1.118-.424Z"
      fill="#1C78D2"
    />
  </Svg>
);

export default Logo;