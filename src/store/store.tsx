import React, { createContext, useReducer } from 'react';
import { IRoom, IUser } from '../common/types';
import {
  Actions,
  IAppContext,
  IRoomsState,
  IStatus,
  IStoreState,
  IUserState,
  RoomActionType,
  UserActionType,
} from './types';

const initialState: IStoreState = {
  userState: {
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') as string)
      : null,
  },
  userRegisterState: {},
  roomsState: { rooms: [] },
};

const store = createContext<IAppContext>({
  state: initialState,
  dispatch: () => null,
});

const { Provider } = store;

const userReducer = (state: IUserState, action: Actions): IUserState => {
  switch (action.type) {
    case UserActionType.LoginRequest:
      return {
        ...state,
        loading: true,
      };
    case UserActionType.LoginSuccess:
      const user = action.payload as IUser;
      localStorage.setItem('user', JSON.stringify(user));
      return {
        ...state,
        loading: false,
        error: '',
        user,
      };
    case UserActionType.LoginError:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };

    case UserActionType.LoginReset:
      return {
        ...state,
        loading: false,
        error: '',
      };

    case UserActionType.Logout:
      localStorage.removeItem('user');
      return { ...state, user: null };
    default:
      return state;
  }
};

const userRegisterReducer = (state: IStatus, action: Actions): IStatus => {
  switch (action.type) {
    case UserActionType.RegisterRequest:
      return {
        ...state,
        loading: true,
      };
    case UserActionType.RegisterSuccess:
      return {
        ...state,
        loading: false,
        error: '',
        message: action.payload as string,
      };
    case UserActionType.RegisterError:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };
    case UserActionType.RegisterReset:
      return {
        ...state,
        loading: false,
        error: '',
        message: '',
      };
    default:
      return state;
  }
};

const roomReducer = (state: IRoomsState, action: Actions): IRoomsState => {
  //   const { user } = state;
  const { rooms } = state;
  switch (action.type) {
    case RoomActionType.GetAll:
      return { ...state, rooms: [...action.payload] };
    case RoomActionType.CreateRequest:
      return { ...state, loading: true };
    case RoomActionType.CreateSuccess:
      const newRooms = [...rooms, action.payload as IRoom];
      return { ...state, rooms: newRooms, loading: false, error: '' };
    case RoomActionType.CreateError:
      return { ...state, loading: false, error: action.payload as string };
    case RoomActionType.CreateReset:
      return { ...state, loading: false, error: '' };
    default:
      return state;
  }
};

const reducer = (
  { userState, roomsState, userRegisterState }: IStoreState,
  action: Actions
) => ({
  userState: userReducer(userState, action),
  userRegisterState: userRegisterReducer(userRegisterState, action),
  roomsState: roomReducer(roomsState, action),
});

const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //   useStoreSideEffect(state, dispatch);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, AppProvider };
