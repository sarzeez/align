import {useEffect, useState, useCallback} from 'react';
import OneSignal, {DeviceState} from 'react-native-onesignal';
import {useDispatch} from 'react-redux';
//import {navigateTo} from 'navigation/navigation.service';

import appConfig from 'config/appConfig';
import {IS_IOS, IS_SIMULATOR} from 'helpers/constants';
import {
  setAppLoading,
  setOneSignalDeviceState,
} from 'store/actions/auth.actions';
//import ROUTES from 'navigation/routes';
//import {getNotificationHistory} from 'store/actions/notification.actions';

const OneSignalManager = () => {
  const dispatch = useDispatch();
  const [pushToken, setPushToken] = useState('');
  const [useRef, setUseRef] = useState(null);

  useEffect(() => {
    init();

    OneSignal.setNotificationWillShowInForegroundHandler(() => {
      /*
      dispatch(getTransactions());
      dispatch(getUserPaymentMethods());
      dispatch(getNotificationHistory(PAGINATION_LIMIT, 0));
      */
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  OneSignal.setNotificationOpenedHandler(notification => {
    //navigateTo(ROUTES.SHARE_LOCATION);
  });

  const getDeviceState = useCallback(async (): Promise<DeviceState> => {
    const deviceState = await OneSignal.getDeviceState();
    setPushToken(deviceState?.pushToken);
    dispatch(setOneSignalDeviceState(deviceState));
    return deviceState;
  }, [dispatch]);

  const handleAppLoading = useCallback(async () => {
    if (await IS_SIMULATOR) {
      dispatch(setAppLoading(false));
    } else {
      if (!pushToken) {
        dispatch(setAppLoading(false));
        const interRef = setInterval(() => getDeviceState(), 1000);
        setUseRef(interRef as any);
      } else {
        clearInterval(useRef as any);
        dispatch(setAppLoading(false));
      }
    }
  }, [dispatch, getDeviceState, pushToken]);

  const init = () => {
    OneSignal.setAppId(appConfig.oneSignal);

    if (IS_IOS) {
      /**
       * Show permission pop up for ios  push notifications
       */

      OneSignal.promptForPushNotificationsWithUserResponse(response => {
        if (response) {
          getDeviceState();
        }
      });
    }

    getDeviceState();
  };

  useEffect(() => {
    handleAppLoading();
  }, [dispatch, handleAppLoading, pushToken]);

  return null;
};

export default OneSignalManager;
