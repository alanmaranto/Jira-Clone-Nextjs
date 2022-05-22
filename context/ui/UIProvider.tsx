import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext, uiReducer } from './';

type Props = {};

export interface UIState {
  sidemenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
};

export const UIProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);
  return (
    <UIContext.Provider
      value={{
        sidemenuOpen: false,
      }}
    >
      {children}
    </UIContext.Provider>
);
};