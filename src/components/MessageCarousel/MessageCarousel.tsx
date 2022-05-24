import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import dayjs from 'dayjs';

import colors from 'theme/Colors';
import {DEVICE_WIDTH, PADDING_HORIZONTAL} from 'helpers/constants';

import {styles} from './styles';
import Typography from 'components/Typography/Typography';
import Spacer from 'components/Spacer/Spacer';
import ROUTES from 'navigation/routes';
import {useNavigation} from '@react-navigation/native';

const MessageCarousel = ({list}: any) => {
  const navigation = useNavigation();
  const CAROUSEL_WIDTH = DEVICE_WIDTH - 32;
  const MESSAGE_ITEM_SIZE = 121;
  const [isVertical, setIsVertical] = React.useState(false);
  const progressValue = useSharedValue<number>(0);

  function getDisplayDate(date: any) {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    let compDate = new Date(date); // month - 1 because January == 0
    let diff = today.getTime() - compDate.getTime(); // get the difference between today(at 00:00:00) and the date
    if (diff <= 24 * 60 * 60 * 1000) {
      return 'Today';
    } else if (24 * 60 * 60 * 1000 < diff && diff < 48 * 60 * 60 * 1000) {
      return 'Yesterday';
    } else {
      return `${dayjs(compDate).format('MMM DD')}`; // or format it what ever way you want
    }
  }

  const handlePressMessage = (message: any) => {
    // console.log(message);
    navigation.navigate(ROUTES.CHAT as never, {chatItem: message} as never);
  };

  return (
    <Carousel
      loop={list.length !== 1}
      vertical
      style={{
        justifyContent: 'center',
        width: CAROUSEL_WIDTH,
      }}
      width={CAROUSEL_WIDTH}
      pagingEnabled={false}
      height={MESSAGE_ITEM_SIZE}
      data={list.slice(list.length - 5, list.length).reverse()}
      renderItem={({item, index}: any) => (
        <TouchableOpacity
          onPress={() => handlePressMessage(item)}
          style={[styles.container]}
        >
          <View style={styles.content}>
            <View style={styles.conatiner}>
              <View style={styles.contentInner}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  {item.avatar ? (
                    <Image
                      source={{
                        uri: item.avatar,
                      }}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 14,
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 14,
                        backgroundColor: colors.white,
                      }}
                    />
                  )}
                  {/* <Image source={{uri: image as any}} style={styles.imageContainer} /> */}

                  <Typography
                    text={`${getDisplayDate(item.last_message_date)}`}
                    type="label"
                    fontType="Bold"
                  />
                </View>
                <Spacer height={4} />
                <Typography
                  text={item.name}
                  type="h3"
                  fontType="Bold"
                  numberOfLines={1}
                />
              </View>
              <Typography
                text={item.last_message_text}
                numberOfLines={1}
                type="h4"
                fontColor={colors.gray3}
              />
            </View>
          </View>
          <View>
            {list.map((_item: any, index: number) => {
              return (
                <PaginationItem
                  backgroundColor={colors.orange}
                  animValue={progressValue}
                  index={index}
                  key={index}
                  isRotate={isVertical}
                  length={list.length}
                />
              );
            })}
          </View>
        </TouchableOpacity>
      )}
      onProgressChange={(_, absoluteProgress) =>
        (progressValue.value = absoluteProgress)
      }
    />
  );
};

const PaginationItem: React.FC<{
  index: number;
  backgroundColor: string;
  length: number;
  animValue: Animated.SharedValue<number>;
  isRotate?: boolean;
}> = props => {
  const {animValue, index, length, backgroundColor, isRotate} = props;
  const width = 8;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        backgroundColor: '#D8D5D5',
        width,
        height: width,
        borderRadius: 50,
        overflow: 'hidden',
        marginVertical: 4,
        transform: [
          {
            rotateZ: isRotate ? '90deg' : '0deg',
          },
        ],
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

export default MessageCarousel;
