import {ImageSourcePropType} from 'react-native';

export type Vector = {
  x: number;
  y: number;
};

export type Dimension = {
  w: number;
  h: number;
};

export type Props = {
  image: ImageSourcePropType | null;
  mode: MarkerMode;
  coordinates?: Vector;
  onPositionChanged?: (coords: Vector) => void;
};

export type Img = {
  imageViewSize: Dimension;
  imgSrcSize: Dimension;
};

export type MarkerMode = 'empty' | 'in_progress' | 'preview';
