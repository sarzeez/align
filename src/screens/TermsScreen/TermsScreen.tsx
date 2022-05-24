import React, {memo} from 'react';
import {View} from 'react-native';
import {CustomButton} from 'components/CustomButton';
import {LoginFlowContainer} from 'components/LoginFlowContainer/LoginFlowContainer';
import {Colors} from 'theme';
import {RouteProp} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import Header from 'components/Header/Header';
import Typography from 'components/Typography/Typography';
import localization from 'localization/localization';

export enum TermsScreenMode {
  TermsAndConditions,
  PrivacyPolicy,
}

export type TermsScreenProps = {
  route: RouteProp<
    {
      TermsScreenProps: {
        mode: TermsScreenMode;
      };
    },
    'TermsScreenProps'
  >;
};

const TermsScreen: React.FC<TermsScreenProps> = ({route}) => {
  const navigation = useNavigation();
  const {mode} = route.params;

  return (
    <LoginFlowContainer>
      <View style={styles.container}>
        <Header bgColor={Colors.transparent} />
        <Typography
          text={
            mode === TermsScreenMode.TermsAndConditions
              ? localization.termsScreen.termsAndConditions
              : localization.termsScreen.privacyPolicy
          }
          type="h2"
          style={styles.headingText}
        />
        <View style={styles.decorLine} />
        <WebView
          style={styles.webView}
          source={{uri: 'https://reactnative.dev/'}}
        />
        <View style={styles.largeButtonStyle}>
          <CustomButton
            title={localization.common.ok}
            onPress={() => navigation.goBack()}
            borderRadius={20}
            bgColorActive={Colors.orange}
            titleColor={Colors.white}
          />
        </View>
      </View>
    </LoginFlowContainer>
  );
};

TermsScreen.defaultProps = {};

const MemorizedComponent = memo(TermsScreen);
export {MemorizedComponent as TermsScreen};
