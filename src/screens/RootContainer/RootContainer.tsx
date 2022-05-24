import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
//import Toast from 'react-native-toast-message';

import MainLoader from 'components/MainLoader/MainLoader';
//import ErrorMessage from 'components/ToastMessage/TostMessage';
import ViewContainer from '../../components/ViewContainer/ViewContainer';
import AppRoutes from 'navigation/AppRoutes';
import {navigationInit} from 'navigation/navigation.service';
import {getIsAppLoading} from 'store/reducers/auth.reducer';
import {SelectWorkspaceModal} from '../../components/SelectWorkspaceModal/SelectWorkspaceModal';

const RootContainer = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsAppLoading);

  useEffect(() => {
    navigationInit({dispatch});
  }, [dispatch]);

  return (
    <SafeAreaProvider>
      <ViewContainer flex={1}>
        <AppRoutes />
        {isLoading && <MainLoader />}
        {/*<ErrorMessage />
        <Toast />*/}
      </ViewContainer>
      <SelectWorkspaceModal />
    </SafeAreaProvider>
  );
};

export default RootContainer;
