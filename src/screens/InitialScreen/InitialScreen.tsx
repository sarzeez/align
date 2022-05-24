import React, { useEffect } from 'react';
import { View } from 'react-native';
import { styles } from './InitialScreenStyles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Shadows } from 'theme';
import { setAppLoading } from 'store/actions/auth.actions';
import { TermsAndPrivacy } from './TermsAndPrivacy';
import { LoginFlowContainer } from 'components/LoginFlowContainer/LoginFlowContainer';
import { HaveAnAccount } from './HaveAnAccount';
import InitialScreenCarousel from 'components/InitialScreenCarousel/InitialScreenCarousel';
import Spacer from 'components/Spacer/Spacer';
import Button from 'components/Button/Button';
import localization from 'localization/localization';
import ROUTES from 'navigation/routes';

const InitialScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onGetStarted = () => {
    navigation.navigate(ROUTES.GET_STARTED as any);
  };

  useEffect(() => {
    dispatch(setAppLoading(false));
  }, []);

  return (
    <LoginFlowContainer>
      <View style={styles.container}>
        <InitialScreenCarousel />
        <View style={styles.bottomContainer}>
          <View style={styles.btnContainer}>
            <Button
              labelType="h3"
              fullWidth
              borderRadius={20}
              btnText={localization.initialScreen.getStarted}
              onPress={onGetStarted}
              style={{...Shadows.sh1}}
            />
          </View>
          <Spacer height={24}/>
          <HaveAnAccount />
          <Spacer height={24}/>
          <TermsAndPrivacy />
        </View>
      </View>
    </LoginFlowContainer>
  );
};

export default InitialScreen;