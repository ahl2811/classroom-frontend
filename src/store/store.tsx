import React, { createContext, useReducer } from 'react';
import { IUser } from '../common/types';
import { Actions, IAppContext, IStoreState, UserActionType } from './types';

const initialState: IStoreState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null,
};

const store = createContext<IAppContext>({
  state: initialState,
  dispatch: () => null,
});

const { Provider } = store;

const reducer = (state: IStoreState, action: Actions): IStoreState => {
  switch (action.type) {
    case UserActionType.LoginSuccess:
      const user = action.payload as IUser;
      localStorage.setItem('user', JSON.stringify(user));
      return {
        ...state,
        user,
      };
    case UserActionType.Logout:
      localStorage.removeItem('user');
      return { ...state, user: null };
    default:
      return state;
  }
};

const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, AppProvider };
