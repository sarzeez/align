import React from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import SettingsButton from 'components/SettingsButtons/SettingsButton';
import localization from 'localization/localization';
import LogoutIcon from 'images/LogoutIcon';
import {setAppLoading, hardLogout, logout} from 'store/actions/auth.actions';
import {ActionSuffix} from 'store/models';
import {getRefreshToken, getToken} from 'store/reducers/auth.reducer';

const Archive = () => {

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text>Archive</Text>
    </View>
  );
};

export default Archive;
