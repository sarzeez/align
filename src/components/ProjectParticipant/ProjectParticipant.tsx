import {ActivityIndicator} from 'components/ActivityIndicator/ActivityIndicator';
import React, {memo} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ViewStyle,
} from 'react-native';
import Colors from 'theme/Colors';
import Arrow from './assets/arrow';
import AvatarPlaceholder49 from 'images/AvatarPlaceholder49';

export type ProjectParticipantProps = {
  text?: string | undefined;
  onPress?: any;
  containerStyle?: ViewStyle;
  activity: string;
  avatar: string;
};

const ProjectParticipant: React.FC<ProjectParticipantProps> = ({
  text,
  onPress,
  activity,
  containerStyle,
  avatar,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[s?.globalContainer, containerStyle]}
    >
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={s.image}>
          {!!avatar ? (
            <Image style={s.image} source={{uri: avatar}} />
          ) : (
            <AvatarPlaceholder49 />
          )}
        </View>
        <View style={s.container}>
          <Text style={s?.text}>{text}</Text>
          <ActivityIndicator activity={activity} />
        </View>
      </View>
      <View style={{marginRight: 20}}>
        <Arrow />
      </View>
    </TouchableOpacity>
  );
};

ProjectParticipant.defaultProps = {};

export const s = StyleSheet.create({
  globalContainer: {
    backgroundColor: Colors.wildSand,
    paddingHorizontal: 6,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    width: '100%',
    borderColor: Colors.gray4,
    borderWidth: 2,
  },
  text: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  image: {
    width: 49,
    height: 49,
    borderRadius: 14,
    marginRight: 8,
  },
  container: {},
});
const MemorizedComponent = memo(ProjectParticipant);
export {MemorizedComponent as ProjectParticipant};
