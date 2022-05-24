import React, {useState} from 'react';
import {DEVICE_WIDTH, PADDING_HORIZONTAL} from 'helpers/constants';
import {CarouselItemPropsTpe} from './CarouselItem';
import {styles} from './CarouselStyles';
import Spacer from 'components/Spacer/Spacer';
import Carousel from 'react-native-snap-carousel';
import localization from 'localization/localization';
import CarouselItem from './CarouselItem';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import Pagination from './Pagination';

// Global constants
const CAROUSEL_WIDTH = DEVICE_WIDTH - 56;

const CAROUSEL_DATA = [
  {
    heading: localization.illustration.firstHeading,
    headingBold: localization.illustration.align,
    description: localization.illustration.firstDescription,
    image: require('./assets/Slide1Top.png'),
    imageBottom: require('./assets/Slide1Bottom.png'),
    imageBottomContainerStyle: styles.bottomImageContainer1,
  },
  {
    heading: localization.illustration.secondHeading,
    headingBold: localization.illustration.punchLists,
    description: localization.illustration.firstDescription,
    image: require('./assets/Slide2Top.png'),
    imageBottom: require('./assets/Slide2Bottom.png'),
    imageBottomContainerStyle: styles.bottomImageContainer2,
  },
  {
    heading: localization.illustration.thirdHeading,
    headingBold: localization.illustration.progress,
    description: localization.illustration.firstDescription,
    image: require('./assets/Slide3Top.png'),
    imageBottom: require('./assets/Slide3Bottom.png'),
    imageBottomContainerStyle: styles.bottomImageContainer3,
  },
];

const InitialScreenCarousel = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const renderItem = ({item}: {item: CarouselItemPropsTpe}) => (
    <CarouselItem {...item} />
  );

  return (
    <ViewContainer width={'100%'} alignItems="center">
      <Carousel
        data={CAROUSEL_DATA}
        renderItem={renderItem}
        sliderWidth={CAROUSEL_WIDTH}
        itemWidth={CAROUSEL_WIDTH}
        onSnapToItem={slideIndex => setActiveIndex(slideIndex)}
        loop
      />
      <Spacer height={24} />
      <ViewContainer width={DEVICE_WIDTH - PADDING_HORIZONTAL}>
        <Pagination
          activeIndex={activeIndex}
          totalDots={CAROUSEL_DATA.length}
        />
      </ViewContainer>
    </ViewContainer>
  );
};

export default InitialScreenCarousel;
