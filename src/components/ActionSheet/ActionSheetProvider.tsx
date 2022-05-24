import React, {FC, createContext, useContext} from 'react';

import {ActionSheetItem} from './ActionSheet';

export type ContextType = {
  title?: string | null;
  actions: ActionSheetItem[];
  setActions: (actions: ActionSheetItem[]) => void;
  setTitle: (title: string | null) => void;
  isCenter?: boolean;
  setIsCenter?: (isCenter: boolean) => void;
};

export const ActionSheetContext = createContext({
  title: null,
  actions: [],
  setActions: () => {},
  setIsCenter: () => {},
  setTitle: () => {},
  isCenter: false,
} as ContextType);

export const useActionSheet = () => useContext(ActionSheetContext);

export const ActionSheetProvider: FC<any> = ({children, ...rest}) => (
  <ActionSheetContext.Provider value={rest}>
    {children}
  </ActionSheetContext.Provider>
);
