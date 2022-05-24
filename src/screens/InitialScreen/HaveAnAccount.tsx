import React, {memo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {styles} from './InitialScreenStyles';
import {Colors} from 'theme';
import {useNavigation} from '@react-navigation/native';
import localization from 'localization/localization';
import Typography from 'components/Typography/Typography';
import ROUTES from 'navigation/routes';

export type HaveAnAccountProps = {};

const HaveAnAccount: React.FC<HaveAnAccountProps> = ({}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.row}>
      <Typography
        type={'h3'}
        text={localization.initialScreen.haveAccount}
        fontColor={Colors.textGray}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(ROUTES.SIGN_IN as never)}
      >
        <Typography
          type={'h3'}
          text={localization.signIn.signIn}
          fontColor={Colors.orange}
          underlined
          style={styles.orangeText}
        />
      </TouchableOpacity>
    </View>
  );
};

HaveAnAccount.defaultProps = {};

const MemorizedComponent = memo(HaveAnAccount);
export {MemorizedComponent as HaveAnAccount};
