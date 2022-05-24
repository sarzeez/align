import {useState, useEffect, useRef} from 'react';
import {PermissionsStatuses, Pickers} from 'typings/types.common';
import {useDispatch, useSelector} from 'react-redux';
import appConfig from 'config/appConfig';
import {getToken} from 'store/reducers/auth.reducer';
import {
  getSocketConnectedSelector,
  getSocketErrorSelector,
} from 'store/reducers/socket.reducer';
import {
  connect,
  disconnect,
  setError as setSocketError,
} from 'store/actions/socket.actions';
import {updateSharedLocationUsers} from 'store/actions/geolocation.actions';
import {getUser} from 'store/actions/user.actions';
import {IS_IOS} from './constants';
import {
  check,
  Permission,
  PERMISSIONS,
  request,
} from 'react-native-permissions';
import { getMessages } from "../store/actions/messages.actions";

export const useDebounce = (value?: string, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const usePrevious = (value: any): any => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useSocket = (id?: number) => {
  const token = useSelector(getToken);
  const connected = useSelector(getSocketConnectedSelector);
  const error = useSelector(getSocketErrorSelector);
  const dispatch = useDispatch();

  const socket = new WebSocket(`${appConfig.socketUrl}${id}/${token}/`);
  const socketConnect = () => {
    if (!connected) {
      socket.onopen = () => {
        dispatch(connect());
      };

      socket.onclose = () => {
        dispatch(disconnect());
      };

      socket.onerror = ({message}) => {
        dispatch(disconnect());
        dispatch(setSocketError(message));
      };

      socket.onmessage = event => {
        const data = JSON.parse(event?.data);
        console.log(data);
        if (data.type === 'new_message') {
          dispatch(getMessages(id));
        }
      };
    }
  };

  const socketClose = () => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.close();
    }
  };

  return {
    connect: socketConnect,
    close: socketClose,
    connected,
    error,
  };
};

const transformPermissionKey = (
  key: string,
  isIos: boolean,
): Permission | '' => {
  switch (key) {
    case Pickers.Camera:
      return isIos ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
    case Pickers.Documents:
      return isIos
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    case Pickers.Photos:
      return isIos
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
    default:
      return '';
  }
};

export const usePermission = () => {
  const checkPermission = async (key: string, opt?: {request: boolean}) => {
    try {
      const cp = await check(transformPermissionKey(key, IS_IOS) as Permission);

      if (cp === PermissionsStatuses.granted || opt?.request === false) {
        return cp;
      }

      const rp = await request(
        transformPermissionKey(key, IS_IOS) as Permission,
      );

      if (rp === PermissionsStatuses.granted) {
        return rp;
      }
    } catch (error) {
      throw Error(String(error));
    }
  };

  return {checkPermission};
};
