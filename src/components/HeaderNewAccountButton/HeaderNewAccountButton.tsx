import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';

import Button from 'components/Button/Button';
import localization from 'localization/localization';
import ROUTES from 'navigation/routes';

const HeaderNewAccountButton = () => {
  const navigation = useNavigation();

  const onSignIn = () => {
    navigation.navigate(ROUTES.GET_STARTED as never);
  };

  return (
    <Button
      small
      btnText={ localization.signIn.newAccount}
      onPress={onSignIn}
    />
  );
};

export default memo(HeaderNewAccountButton);
