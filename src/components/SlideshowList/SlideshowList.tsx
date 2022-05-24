import React, {memo, useEffect, useState, useRef} from 'react';
import {
  FlatList,
  ListRenderItem,
  View,
  PanResponder,
  FlatListProps,
} from 'react-native';

export type SlideshowListProps = FlatListProps<any> & {
  // Flatlist's data
  data: any;
  // Flatlist's item render function
  renderItem: ListRenderItem<any>;
  // How far from the end (in units of visible length of the list) the edge of the list must be from the end of the content to trigger the onEndReached callback.
  onEndReachedThreshold?: number;
  // Handle "load more" if needed
  onEndReached?: () => void;
  // Slide show time (in milliseconds)
  slidingInterval?: number;
  // Same as initialScrollIndex of FlatList, but also initial index of slideshow
  startIndex?: number;
  // Time of user's inactivity (in milliseconds) before the slideshow resumes
  cooldownDuration?: number;
  // If true, slideshow goes from right to left
  slideShowReversed?: boolean;
};

const SlideshowList: React.FC<SlideshowListProps> = props => {
  const {
    data,
    renderItem,
    slidingInterval,
    startIndex,
    cooldownDuration,
    slideShowReversed,
    onEndReachedThreshold,
    onEndReached,
    // Inherits FlatList props
    ...restProps
  } = props;

  // Index of last item
  const [maxIndex, setMaxIndex] = useState(0);
  // Slideshow enabled
  const [isActive, setIsActive] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(startIndex);
  // Index that we swipe to when user is inactive more than {cooldownDuration}
  const [swipeAfterCdTo, setSwipeAfterCdTo] = useState(startIndex + 1);
  const flatlistRef = useRef(null);
  const maxIndexRef = useRef(maxIndex);
  maxIndexRef.current = maxIndex;
  const isActiveRef = useRef(isActive);
  isActiveRef.current = isActive;
  const swipeAfterCdToRef = useRef(swipeAfterCdTo);
  swipeAfterCdToRef.current = swipeAfterCdTo;
  // Ref for inactivity timer
  const timerId = useRef(0);

  // Returns true if last slide currently shown
  const endNotReached = (index: number, m: number) =>
    (!slideShowReversed && index < m) || (slideShowReversed && index > 0);

  const onViewableItemsChangedRef = useRef((newViewableItems: any) => {
    let itemsOnScreen = newViewableItems.viewableItems.length;
    // "Last item is most right item if !slideShowReversed and most left item if slideShowReversed"
    let firstViewableItemIndex =
      newViewableItems.viewableItems[slideShowReversed ? itemsOnScreen - 1 : 0]
        ?.index;
    setSwipeAfterCdTo(
      endNotReached(firstViewableItemIndex, maxIndexRef.current)
        ? firstViewableItemIndex + (slideShowReversed ? -1 : 1)
        : startIndex,
    );
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        // User starts touch
        resetInactivityTimeout();
        setIsActive(false);
      },
    }),
  ).current;

  // Initiates FlatList's scrollToIndex
  const swipeNext = (nextIndex: number) => {
    if (data && data.length) {
      // flatlistRef must exist at the moment
      flatlistRef.current &&
        flatlistRef.current.scrollToIndex({animated: true, index: nextIndex});
      // This will trigger useEffect
      setSliderIndex(nextIndex);
    }
  };

  const resetInactivityTimeout = () => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      // Action after user has been detected idle
      if (!isActiveRef.current) {
        setIsActive(true);
        swipeNext(swipeAfterCdToRef.current);
      }
    }, cooldownDuration);
  };

  useEffect(() => {
    resetInactivityTimeout();
  }, []);

  useEffect(() => {
    setMaxIndex(data.length - 1);
  }, [data]);

  useEffect(() => {
    // Mutable flag
    let isMounted = true;
    setTimeout(() => {
      // isMounted conditional check
      if (isMounted && isActiveRef.current) {
        let nextIndex = startIndex;
        if (endNotReached(sliderIndex, maxIndexRef.current))
          nextIndex = sliderIndex + (slideShowReversed ? -1 : 1);
        swipeNext(nextIndex);
      }
    }, slidingInterval);
    // cleanup toggles value, if unmounted
    return () => {
      isMounted = false;
    };
  }, [sliderIndex]);

  return (
    <View style={{flex: 1}} {...panResponder.panHandlers}>
      <FlatList
        ref={flatlistRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item._id ?? '' + ' ' + index}
        initialScrollIndex={startIndex}
        onViewableItemsChanged={onViewableItemsChangedRef.current}
        onEndReachedThreshold={onEndReachedThreshold}
        onEndReached={onEndReached ? () => onEndReached() : undefined}
        {...restProps}
      />
    </View>
  );
};

SlideshowList.defaultProps = {
  slidingInterval: 2500,
  cooldownDuration: 6000,
  startIndex: 0,
  slideShowReversed: false,
  onEndReachedThreshold: 0.4,
};

const MemorizedComponent = memo(SlideshowList);
export {MemorizedComponent as SlideshowList};
