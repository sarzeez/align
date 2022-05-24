import React, { ReactNode } from 'react';
import { Image, ImageSourcePropType, View, ViewStyle } from 'react-native';
import { Colors } from 'theme';
import { styles } from './CarouselStyles';
import Spacer from 'components/Spacer/Spacer';
import ViewContainer from 'components/ViewContainer/ViewContainer';
import Typography from 'components/Typography/Typography';
import {DEVICE_WIDTH, PADDING_HORIZONTAL} from 'helpers/constants';

export type CarouselItemPropsTpe = {
  image: ImageSourcePropType;
  imageBottom: ImageSourcePropType;
  imageBottomContainerStyle: ViewStyle;
  heading: string;
  headingBold: string;
  description: string;
};

const CarouselItem = ({image, heading, description, imageBottom, headingBold, imageBottomContainerStyle}: CarouselItemPropsTpe) => {
  return (
    <ViewContainer width={'100%'} justifyContent="center" alignItems="center">
      <View style={styles.topImageContainer}>
        <Image source={image} style={styles.topImg}/>
        <View style={imageBottomContainerStyle}>
          <Image source={imageBottom} style={styles.bottomImg}/>
        </View>
      </View>
      <Spacer height={DEVICE_WIDTH * 0.26} />
      <View style={styles.centered}>
        <Typography text={heading} type="body" />
        <Typography text={headingBold} type="h1" />
        <View style={styles.decorLine}/>
        <Typography
          text={description}
          type="h4"
          fontColor={Colors.bodyBase}
          textCenter
        />
      </View>
    </ViewContainer>
  );
};

export default CarouselItem;