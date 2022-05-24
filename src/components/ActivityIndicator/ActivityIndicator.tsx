import React, {memo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Colors from 'theme/Colors';

export type ActivityIndicatorProps = {
  activity: string;
};

const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({activity}) => {
  const handleActivity = (activity: string) => {
    switch (activity) {
      case 'active':
        return {
          color: Colors.green,
          text: 'Active',
        };
      case 'inactive':
        return {
          color: Colors.red,
          text: 'Inactive',
        };
      default:
        return {
          color: Colors.red,
          text: 'Error',
        };
    }
  };

  return (
    <View style={s.globalContainer}>
      <View
        style={[s.circle, {backgroundColor: handleActivity(activity).color}]}
      ></View>
      <Text style={[s.text, {color: handleActivity(activity).color}]}>
        {handleActivity(activity).text}
      </Text>
    </View>
  );
};

ActivityIndicator.defaultProps = {};

export const s = StyleSheet.create({
  globalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 20,
  },
  text: {
    marginLeft: 7,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});
const MemorizedComponent = memo(ActivityIndicator);
export {MemorizedComponent as ActivityIndicator};
