import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';

import Button from 'components/Button/Button';
import localization from 'localization/localization';
import ROUTES from 'navigation/routes';

const HeaderSignInButton = ({isSkip = false}: {isSkip?: boolean}) => {
  const navigation = useNavigation();

  const onSignIn = () => {
    navigation.navigate(ROUTES.SIGN_IN as never);
  };

  return (
    <Button
      small
      btnText={isSkip ? localization.signIn.skip : localization.signIn.signIn}
      onPress={onSignIn}
    />
  );
};

export default memo(HeaderSignInButton);
