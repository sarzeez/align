import {CommonActions} from '@react-navigation/native';
import {createRef, Dispatch} from 'react';

export const navigationRef = createRef<any>();

let navigator: {
  getRootState: () => any;
  dispatch: (arg0: CommonActions.Action) => void;
} | null = null;

const store: {dispatch: any} = {
  dispatch: null,
};

export const navigationInit = ({
  dispatch,
}: {
  dispatch: Dispatch<any> | null;
}): void => {
  navigator = navigationRef.current;
  store.dispatch = dispatch;
};

export const getNavigation = (): any => {
  return navigator && navigator.getRootState();
};

export const navigateTo = (
  route: string,
  params?: Record<string, any>,
): void => {
  navigator &&
    navigator.dispatch(
      CommonActions.navigate({
        name: route,
        params,
      }),
    );
};
