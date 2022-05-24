import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

import {Props} from './types';
import {MARKER_SIZE, styles} from './styles';
import {useImageViewSize, useLayout, useMarkerCoords} from './hooks';
import {pxInDp} from './utils';

export const MarkOnImageView = (props: Props) => {
  useEffect(() => {
    if (props.mode === 'preview') {
      const px = pxInDp(img.imgSrcSize.w, img.imageViewSize.w);
      const pxX = (markerOffset.value.x + MARKER_SIZE / 2 - imgXOffset) * px;
      const pxY = (markerOffset.value.y + MARKER_SIZE / 2 - imgYOffset) * px;

      if (props.onPositionChanged) {
        props.onPositionChanged({
          x: pxX,
          y: pxY,
        });
      }
    }
  }, [props.mode]);

  const {width, height, onLayout} = useLayout();

  const img = useImageViewSize(props.image);
  const markerOffset = useMarkerCoords({
    img: img,
    container: {
      w: width,
      h: height,
    },
    coords: props.coordinates,
  });

  const imgXOffset = (width - img.imageViewSize.w) / 2;
  const imgYOffset = (height - img.imageViewSize.h) / 2;

  const animatedMarkerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: markerOffset.value.x,
      },
      {
        translateY: markerOffset.value.y,
      },
    ],
  }));

  const handleMarkerUpdate = (e: any) => {
    'worklet';
    if (e.x >= imgXOffset && e.x <= width - imgXOffset) {
      markerOffset.value = {
        x: e.x - MARKER_SIZE / 2,
        y: markerOffset.value.y,
      };
    }

    if (e.y >= imgYOffset && e.y <= height - imgYOffset) {
      markerOffset.value = {
        x: markerOffset.value.x,
        y: e.y - MARKER_SIZE / 2,
      };
    }
  };

  const dragMarkerGesture = Gesture.Pan()
    .enabled(props.mode === 'in_progress')
    .onUpdate(handleMarkerUpdate);

  const tapMarkerGesture = Gesture.Tap()
    .enabled(props.mode === 'in_progress')
    .onStart(handleMarkerUpdate);

  const composed = Gesture.Simultaneous(dragMarkerGesture, tapMarkerGesture);

  return (
    <GestureHandlerRootView style={styles.container} onLayout={onLayout}>
      {props.image && (
        <Animated.Image
          source={props.image}
          style={{
            width: width,
            height: height,
          }}
          resizeMode="contain"
        />
      )}

      <GestureDetector gesture={composed}>
        <View style={StyleSheet.absoluteFill}>
          {props.mode !== 'empty' && (
            <Animated.View style={[animatedMarkerStyle, styles.markerOuter]}>
              <View style={styles.markerInner} />
            </Animated.View>
          )}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

// TODO:
// 1. Implement standart pinch zoom on image preview (with focal point handling);
// 2. Implement Marker calculation when image is scaled;
// 3. Pre-scroll to marker functionality;
//

// const prevScale = useSharedValue(1);
// const scale = useSharedValue(1);

// const prevOffset = useSharedValue({x: 0, y: 0});
// const offset = useSharedValue({x: 0, y: 0});
// const scaledDiff = useSharedValue({x: 0, y: 0});

// const animatedImgStyle = useAnimatedStyle(() => ({
//   alignSelf: 'center',
//   width: width,
//   height: height,
//   transform: [
//     {
//       translateX: offset.value.x,
//     },
//     {
//       translateY: offset.value.y,
//     },
//     {scale: scale.value},
//   ],
// }));

// const pinchGesture = Gesture.Pinch()
//   .onUpdate((e) => {
//     scale.value = prevScale.value * e.scale;
//   })
//   .onEnd(() => {
//     prevScale.value = scale.value;
//     if (scale.value < 1) {
//       scale.value = withTiming(1);
//       prevScale.value = 1;
//       prevOffset.value = { x: 0, y: 0 };
//       offset.value = { x: 0, y: 0 };
//     } else {
//       prevScale.value = scale.value;
//     }
//   });

// const dragImageGesture = Gesture.Pan()
//   .enabled(false)
//   .averageTouches(true)
//   .onStart((e) => {
//     const scaledW = prevScale.value * img.imageViewSize.w;
//     const scaledH = prevScale.value * img.imageViewSize.h;

//     scaledDiff.value = {
//       x: (scaledW - img.imageViewSize.w) / 2,
//       y: (scaledH - img.imageViewSize.h) / 2,
//     };
//   })
//   .onUpdate((e) => {
//     if (scale.value <= 1) {
//       return;
//     }

//     const totalOffsetX = prevOffset.value.x + e.translationX;
//     const totalOffsetY = prevOffset.value.y + e.translationY;
//     console.log("x", totalOffsetX + ", y " + totalOffsetY);
//     offset.value = {
//       x: totalOffsetX,
//       y: totalOffsetY,
//     };
//   })
//   .onEnd((e) => {
//     if (Math.abs(offset.value.x) >= scaledDiff.value.x) {
//       offset.value = {
//         x: offset.value.x < 0 ? scaledDiff.value.x * -1 : scaledDiff.value.x,
//         y: offset.value.y,
//       };
//     }

//     if (Math.abs(offset.value.y) >= scaledDiff.value.y) {
//       offset.value = {
//         x: offset.value.x,
//         y: offset.value.y < 0 ? scaledDiff.value.y * -1 : scaledDiff.value.y,
//       };
//     }
//     prevOffset.value = offset.value;
//   });
