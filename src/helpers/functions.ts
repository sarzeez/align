import RNFetchBlob from 'react-native-blob-util';
import {AnyAction} from 'redux';
import {showMessage} from 'react-native-flash-message';
import OneSignal, {DeviceState} from 'react-native-onesignal';
import call from 'react-native-phone-call';

import {SCREEN_HEIGHT, SCREEN_WIDTH} from 'helpers/constants';
import localization from 'localization/localization';
import {WorkDay, UserProfile} from 'store/reducers/types';
import {WeekDaysNames, ToastMessageType} from 'typings/types.common';
import dayjs from 'dayjs';
import {File} from 'typings/types.common';
import {Sizes} from 'typings/types.common';

export const setStringToCapitalize = (value: string) =>
  value
    .split(' ')
    .map(el => el[0].toUpperCase() + el.slice(1))
    .join(' ');

export const businessDataTransformHelper = (cat: string[]) =>
  cat.map(el => ({
    id: el,
    name: el,
  }));

export const transformRemoteImageToBase64 = async (url: string) =>
  await RNFetchBlob.config({
    fileCache: true,
  })
    .fetch('GET', url)
    .then(resp => resp.readFile('base64'))
    .then(base64Data => base64Data);

export const capitalizeFirstLetter = (text: string) => {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
};

export const timeTransform = (time: number) => {
  return time > 12 ? `${time - 12}.00 pm` : `${time}.00 am`;
};

export const setInitialDaysData = (): WorkDay[] => [
  {
    day: WeekDaysNames.Monday,
    selected: false,
    isWorking: false,
    workingHours: [],
  },
  {
    day: WeekDaysNames.Tuesday,
    selected: false,
    isWorking: false,
    workingHours: [],
  },
  {
    day: WeekDaysNames.Wednesday,
    selected: false,
    isWorking: false,
    workingHours: [],
  },
  {
    day: WeekDaysNames.Thursday,
    selected: false,
    isWorking: false,
    workingHours: [],
  },
  {
    day: WeekDaysNames.Friday,
    selected: false,
    isWorking: false,
    workingHours: [],
  },
  {
    day: WeekDaysNames.Saturday,
    selected: false,
    isWorking: false,
    workingHours: [],
  },
  {
    day: WeekDaysNames.Sunday,
    selected: false,
    isWorking: false,
    workingHours: [],
  },
];

export const isSmallScreen = () => SCREEN_WIDTH <= 375 || SCREEN_HEIGHT < 700;

export const isUserProfileFilled = (userProfile: UserProfile) => {
  if (userProfile) {
    const {
      address,
      avatar,
      country,
      gender,
      interests,
      phone,
      first_name,
      last_name,
      email,
    } = userProfile;
    return (
      address &&
      avatar &&
      country &&
      gender &&
      interests.length &&
      phone &&
      first_name &&
      last_name &&
      email
    );
  }
  return false;
};

export const showRequestErrorMessage = (
  description: string = localization.common.cannotGetDataFromServer,
  message: string = localization.common.somethingWrong,
) => {
  console.log({message, description});
  showMessage({
    message,
    description,
    duration: 4000,
    type: ToastMessageType.danger,
  });
};

export const getCardMask = (nickName: string) => {
  return `**** ${nickName}`;
};

export const checkIfOneSignalDataExist = async (
  callBack?: (deviceState: DeviceState) => AnyAction,
): Promise<any> => {
  const checkUserAgain = await OneSignal.getDeviceState();
  if (!checkUserAgain?.userId) {
    return await checkIfOneSignalDataExist();
  } else {
    if (callBack) {
      await callBack(checkUserAgain);
    }

    return checkUserAgain;
  }
};

export const formatDate = (date: string) => {
  return `${dayjs(date).format('DD MMM YYYY')} at ${dayjs(date).format(
    'h:mm A',
  )}`;
};

export const ellipsis = (value = '', cropLength = 20): string =>
  value.length > cropLength
    ? `${value?.slice(0, cropLength / 2)}...${value?.slice(
        value.length - cropLength / 4,
      )}`
    : value;

export const ellipsisLast = (value = '', cropLength = 20): string =>
  value.length > cropLength ? `${value?.slice(0, cropLength)}...` : value;

export const validateFile = (file: File) => {
  if (!file.type || !file.size) {
    return;
  }

  if (
    ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.type)
  ) {
    if (file.size > Sizes.MB10) {
      return 'File must be .jpeg, .jpg, png, size <10M .';
    }
  } else if (file.type === 'application/pdf') {
    if (file.size > Sizes.MB10) {
      return 'File size must be <10M.';
    }
  } else if (
    [
      'application/doc',
      'application/docx',
      'application/ppt',
      'application/pptx',
    ].includes(file.type)
  ) {
    if (file.size > Sizes.MB50) {
      return 'File size must be <50M.';
    }
  } else if (
    ['video/mp4', 'video/avi', 'video/3gp', 'video/3gpp'].includes(file.type)
  ) {
    if (file.size > Sizes.MB1024) {
      return 'File size must be <1024M.';
    }
  } else {
    return 'Unsupported format.';
  }
};

/*export const call911 = async () => {
  const number = '911';

  await call({
    number,
    prompt: false,
  }).catch(() => {
    showRequestErrorMessage(localization.sirenAlert.errors.phoneNotAvailable);
  });
};*/
