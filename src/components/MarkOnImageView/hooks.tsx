import {useEffect, useRef, useState, useCallback} from 'react';
import {Image, ImageSourcePropType, useWindowDimensions} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';

import {MARKER_SIZE} from './styles';
import {Dimension, Img, Vector} from './types';
import {pxInDp} from './utils';

export const useImageViewSize = (imageSrc: ImageSourcePropType | null) => {
  const window = useWindowDimensions();
  const imgSrcSize = useRef<{w: number; h: number}>({w: 0, h: 0});
  const [imageViewSize, setImageViewSize] = useState({w: 0, h: 0});

  useEffect(() => {
    if (imageSrc === null) {
      return;
    }

    const src = Image.resolveAssetSource(imageSrc);
    Image.getSize(src.uri, (w, h) => {
      imgSrcSize.current = {w, h};

      const ratio = w / h;

      setImageViewSize({
        w: window.width,
        h: window.width / ratio,
      });
    });
  }, [imageSrc]);

  return {imageViewSize, imgSrcSize: imgSrcSize.current};
};

type MarkerHooksProps = {
  coords?: Vector;
  img: Img;
  container: Dimension;
};

export const useMarkerCoords = ({img, coords, container}: MarkerHooksProps) => {
  const markerOffset = useSharedValue({x: 0, y: 0});

  const diffW = container.w - img.imageViewSize.w;
  const diffH = container.h - img.imageViewSize.h;

  useEffect(() => {
    const px = pxInDp(img.imgSrcSize.w, img.imageViewSize.w);
    if (coords) {
      markerOffset.value = {
        x: coords.x / px - MARKER_SIZE / 2 + diffW / 2,
        y: coords.y / px - MARKER_SIZE / 2 + diffH / 2,
      };
    } else {
      markerOffset.value = {
        x: container.w / 2 - MARKER_SIZE / 2,
        y: container.h / 2 - MARKER_SIZE / 2,
      };
    }
  }, [img]);

  return markerOffset;
};

export function useLayout() {
  const [layout, setLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const onLayout = useCallback(e => setLayout(e.nativeEvent.layout), []);

  return {
    onLayout,
    ...layout,
  };
}
