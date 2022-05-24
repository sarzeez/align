import React, {ReactNode} from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import DrawerToggleIcon from 'images/DrawerToggleIcon';
import {useNavigation} from '@react-navigation/native';

const DrawerToggleButton = () => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.toggleDrawer();
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <DrawerToggleIcon />
    </TouchableOpacity>
  );
};

export default DrawerToggleButton;
