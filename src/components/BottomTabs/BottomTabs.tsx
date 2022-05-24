import React from 'react';
import {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {NavigationHelpers, TabNavigationState} from '@react-navigation/native';
import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import ROUTES from 'navigation/routes';
import {IS_IPHONE_X} from 'helpers/constants';
import {useSelector} from 'react-redux';
import {getProfile} from 'store/reducers/profile.reducer';
import HomeScreenIcon from 'images/HomeScreenIcon';
import SubscriptionsIcon from 'images/SubscriptionsIcon';
import WorkspaceIcon from 'images/WorkspaceIcon';
import ProjectsIcon from 'images/ProjectsIcon';
import MessageIcon from 'images/MessageIcon';
import {Colors} from 'theme';
import Typography from 'components/Typography/Typography';
import Spacer from 'components/Spacer/Spacer';
import NewMessageSmallCircle from 'images/NewMessageSmallCircle';
import styles from './styles';

type BottomTabsProps = {
  state: TabNavigationState<Record<string, object | undefined>>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<
    Record<string, object | undefined>,
    BottomTabNavigationEventMap
  >;
};

const BottomTabs = ({state, descriptors, navigation}: BottomTabsProps) => {
  const userProfile = useSelector(getProfile);
  const isContractor = userProfile?.contractor;
  const isSubContractor = userProfile?.subcontractor;
  return (
    <Wrapper isHomeScreen={!!state.index}>
      <Container
        style={{paddingBottom: IS_IPHONE_X ? 23 : 10}}
        isIphoneX={IS_IPHONE_X}
      >
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;

          const routesIcons: any = {
            [ROUTES.HOME]: (
              <HomeScreenIcon
                color={isFocused ? Colors.black : Colors.gray99}
              />
            ),
            [ROUTES.SUBSCRIPTIONS]: (
              <SubscriptionsIcon
                color={isFocused ? Colors.black : Colors.gray99}
              />
            ),
            [ROUTES.WORKSPACES]: (
              <WorkspaceIcon color={isFocused ? Colors.black : Colors.gray99} />
            ),
            [ROUTES.PROJECTS]: (
              <ProjectsIcon color={isFocused ? Colors.black : Colors.gray99} />
            ),
            [ROUTES.MESSAGES]: (
              <MessageIcon color={isFocused ? Colors.black : Colors.gray99} />
            ),
          };

          if (!isContractor) {
            delete routesIcons[ROUTES.SUBSCRIPTIONS];
          }

          if (!isSubContractor) {
            delete routesIcons[ROUTES.WORKSPACES];
          }

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name as any);
            }
          };

          return (
            <View key={route.key}>
              <TouchableOpacity
                style={styles.tabButtonStyle}
                accessibilityRole="button"
                testID={options.tabBarTestID}
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                onPress={onPress}
              >
                {routesIcons[route.name]}
                <Spacer height={9} />
                <Typography
                  text={route.name}
                  type="bottomTabItem"
                  fontColor={isFocused ? Colors.black : Colors.gray99}
                />
              </TouchableOpacity>
              {route.name === ROUTES.MESSAGES && (
                <View style={styles.dotStyle}>
                  <NewMessageSmallCircle />
                </View>
              )}
            </View>
          );
        })}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.View<{isHomeScreen: boolean}>`
  background-color: ${props =>
    props.isHomeScreen ? Colors.transparent : Colors.white};
`;

const Container = styled.View<{isIphoneX: boolean}>`
  flex-direction: row;
  justify-content: space-around;
  padding-bottom: 25px;
  padding-top: 15px;
  background-color: ${Colors.white};
  border-top-width: 1px;
  border-top-color: ${Colors.gray4};
  height: ${props => (props.isIphoneX ? '109px' : '90px')};
`;

export default BottomTabs;
