import * as React from 'react';
import {
  CommonActions,
  DrawerActions,
  useFocusEffect,
  useLinkBuilder,
  useRoute,
} from '@react-navigation/native';
import {DrawerItem} from '@react-navigation/drawer';

import ROUTES from 'navigation/routes';
import {SCREEN_HEIGHT, DEVICE_HEIGHT} from 'helpers/constants';
import {Colors} from 'theme';

const DrawerList = (props: any) => {
  const {
    state,
    navigation,
    descriptors,
    activeTintColor,
    inactiveTintColor,
    activeBackgroundColor,
    inactiveBackgroundColor,
    itemStyle,
    labelStyle,
  } = props;
  const buildLink = useLinkBuilder();

  return state.routes.map((route, i) => {
    const linkTo = buildLink(route.name, route.params);
    //Access the custom onPress that is passed as an option
    const {title, drawerLabel, drawerIcon, onPress} =
      descriptors[route.key].options;
    const focused = false;
    return (
      <DrawerItem
        key={route.key}
        label={
          drawerLabel !== undefined
            ? drawerLabel
            : title !== undefined
            ? title
            : route.name
        }
        icon={drawerIcon}
        navigation={navigation}
        focused={focused}
        activeTintColor={activeTintColor}
        inactiveTintColor={inactiveTintColor}
        activeBackgroundColor={activeBackgroundColor}
        inactiveBackgroundColor={inactiveBackgroundColor}
        labelStyle={[labelStyle, focused && {color: Colors.orange}]}
        style={[
          itemStyle,
          route.name === ROUTES.SETTINGS && {
            position: 'absolute',
            bottom: -(SCREEN_HEIGHT - 70 - 343 - 80),
            left: 0,
            right: 0,
            borderTopWidth: 1,
            borderBottomWidth: 0,
          },
        ]}
        to={linkTo}
        onPress={
          onPress
            ? () => onPress(navigation)
            : () => {
                // console.log('route.name', route.name);
                // console.log('state.key', state.key);
                // navigation.dispatch({
                //   ...(focused
                //     ? DrawerActions.closeDrawer()
                //     : CommonActions.navigate(route.name)),
                // });

                DrawerActions.closeDrawer();

                if (
                  [ROUTES.HOME, ROUTES.SUBSCRIPTIONS, ROUTES.PROJECTS].includes(
                    route.name,
                  )
                ) {
                  navigation.navigate(ROUTES.TAB_BAR, {
                    screen: route.name,
                  });
                } else {
                  navigation.dispatch({
                    ...(focused
                      ? DrawerActions.closeDrawer()
                      : CommonActions.navigate(route.name)),
                  });
                }
              }
        }
      />
    );
  });
};

export default DrawerList;
