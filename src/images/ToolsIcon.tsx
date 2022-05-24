import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const ToolsIcon = (props: SvgProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.9209 8.589L20.1149 7.783L20.7309 7.168L17.7249 4.162C17.5623 4.27949 17.371 4.35081 17.1712 4.36841C16.9714 4.38602 16.7705 4.34925 16.5899 4.262C16.3261 4.12849 16.1079 3.91967 15.9629 3.662C15.8606 3.47582 15.8126 3.26468 15.8242 3.05256C15.8359 2.84044 15.9068 2.63584 16.0289 2.462L14.5669 1L12.0029 3.564L11.3789 4.188L12.8409 5.65C13.005 5.53305 13.1976 5.46258 13.3985 5.44603C13.5993 5.42949 13.8009 5.46748 13.9819 5.556C14.2634 5.6998 14.4918 5.92959 14.6339 6.212C14.721 6.39249 14.7576 6.59315 14.74 6.79277C14.7224 6.99238 14.6512 7.18353 14.5339 7.346L15.1569 7.969L16.8789 9.691L17.5369 10.349L18.1659 9.72C19.6472 10.7264 20.8363 12.1063 21.6129 13.72C22.0835 12.9073 22.2705 11.9613 22.1447 11.0306C22.0189 10.1 21.5874 9.23759 20.9179 8.579L20.9209 8.589ZM20.876 20.5359C20.8761 20.8642 20.7789 21.1852 20.5966 21.4582C20.4142 21.7312 20.155 21.944 19.8517 22.0696C19.5483 22.1952 19.2145 22.228 18.8926 22.1638C18.5706 22.0996 18.275 21.9413 18.043 21.709L14.762 18.4279C14.8453 18.3585 14.9132 18.2724 14.9615 18.1752C15.0097 18.078 15.0371 17.9718 15.042 17.8634C15.0469 17.755 15.0291 17.6468 14.9899 17.5457C14.9507 17.4445 14.8908 17.3526 14.8141 17.2759C14.7373 17.1992 14.6455 17.1393 14.5443 17.1C14.4432 17.0608 14.3349 17.043 14.2265 17.0479C14.1181 17.0528 14.012 17.0803 13.9148 17.1285C13.8176 17.1767 13.7315 17.2446 13.662 17.328L13 16.666L13.269 16.397L14.052 15.615L15.077 14.589L15.346 14.3199L16.008 14.982C15.8831 15.1317 15.8188 15.3227 15.8276 15.5174C15.8364 15.7121 15.9177 15.8965 16.0555 16.0344C16.1934 16.1722 16.3778 16.2536 16.5725 16.2624C16.7673 16.2712 16.9583 16.2068 17.108 16.082L20.389 19.364C20.5433 19.5178 20.6656 19.7007 20.749 19.902C20.8324 20.1033 20.8752 20.3191 20.875 20.537L20.876 20.5359ZM5.547 5.72193L14.012 14.1869L14.44 14.6249L13.384 15.6809L12.601 14.8979L12.61 14.8889L4.495 6.77393L3.112 6.57393L2 4.34492L3.118 3.22693L5.347 4.33893L5.547 5.72193ZM10.5581 16.022L11.7941 14.785L10.0711 13.063L9.3361 13.798L8.8361 14.298L8.7521 14.214C8.70074 14.1628 8.63115 14.134 8.5586 14.134C8.48605 14.134 8.41647 14.1628 8.3651 14.214L4.5321 18.047L3.7001 18.879L3.0721 19.506C2.77045 19.804 2.59673 20.2078 2.58777 20.6318C2.57881 21.0557 2.73531 21.4665 3.0241 21.777C3.17228 21.9316 3.34977 22.0551 3.54621 22.1404C3.74265 22.2256 3.95411 22.2708 4.16823 22.2734C4.38235 22.276 4.59484 22.2359 4.7933 22.1555C4.99176 22.0751 5.17221 21.9559 5.3241 21.805L10.6381 16.491C10.6636 16.4656 10.6838 16.4355 10.6976 16.4023C10.7114 16.3691 10.7185 16.3334 10.7185 16.2975C10.7185 16.2615 10.7114 16.2259 10.6976 16.1927C10.6838 16.1595 10.6636 16.1294 10.6381 16.104L10.5581 16.022ZM16.0921 9.823L14.7011 8.43201L11.8401 11.293L13.5621 13.015L14.7621 11.815L14.9831 11.595L16.4041 10.174L16.4231 10.155L16.0921 9.823Z"
      fill={props.color || 'black'}
    />
  </Svg>
);

export default ToolsIcon;