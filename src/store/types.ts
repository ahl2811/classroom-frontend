import { IUser } from '../common/types';

//UserAction
export enum UserActionType {
  LoginSuccess = 'user/login/success',
  Logout = 'user/logout',
}

export interface IUserLogin {
  type: UserActionType.LoginSuccess;
  payload: IUser;
}

export interface IUserLogout {
  type: UserActionType.Logout;
}

type UserActions = IUserLogin | IUserLogout;

export type Actions = UserActions;

export interface IStoreState {
  user: IUser | null;
}

export interface IAppContext {
  state: IStoreState;
  dispatch: React.Dispatch<Actions>;
}
