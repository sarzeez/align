import React, {ReactNode} from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import moment from 'moment';

import ViewContainer from 'components/ViewContainer/ViewContainer';
import Typography from 'components/Typography/Typography';
import styles from './styles';
import {Colors} from 'theme';
import Divider from 'components/Divider/Divider';
import AvatarPlaceHolder from 'images/AvatarPlaceholder49';

type ChatListItemProps = {
  onPress?: () => void;
  image?: ReactNode | string;
  name?: string;
  lastMessage?: string;
  date?: string;
  isActive?: boolean;
  withDate?: boolean;
  withAutoWidth?: boolean;
};

const ChatListItem = ({
  onPress,
  image,
  name,
  lastMessage,
  date,
  isActive,
  withDate = true,
}: ChatListItemProps) => {
  const calendarDate = moment(date).calendar(null, {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    lastWeek: '[last] dddd',
    nextWeek: 'dddd',
    sameElse: 'L',
  });
  return (
    <ViewContainer>
      <ViewContainer
        flexDirection="row"
        justifyContent="center"
        style={styles.wrapper}
      >
        <TouchableOpacity
          onPress={onPress}
          disabled={!onPress}
          style={styles.container}
        >
          <View style={styles.imageContainer}>
            {image ? (
              typeof image === 'string' ? (
                <Image
                  source={{uri: image as any}}
                  style={styles.imageContainer}
                />
              ) : (
                image
              )
            ) : (
              <AvatarPlaceHolder />
            )}
            <View
              style={[
                styles.indicator,
                {
                  backgroundColor: isActive
                    ? Colors.activeGreen
                    : Colors.dividerColor,
                },
              ]}
            />
          </View>
          <ViewContainer
            justifyContent="center"
            style={styles.textStyle}
            flex={1}
          >
            <ViewContainer
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                text={name || 'Darlene Steward'}
                type={'chatName'}
                fontColor={Colors.textBlack}
              />
              {withDate && date && (
                <Typography
                  text={calendarDate}
                  type="label"
                  fontColor={Colors.gray7}
                />
              )}
            </ViewContainer>
            <Typography
              text={lastMessage}
              type="label"
              fontColor={Colors.darkGrey}
            />
          </ViewContainer>
        </TouchableOpacity>
      </ViewContainer>
      <View style={{paddingLeft: 40}}>
        <Divider />
      </View>
    </ViewContainer>
  );
};

export default ChatListItem;
