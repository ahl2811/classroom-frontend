import { IRoom, IUser } from '../common/types';

//RoomAction
export enum RoomActionType {
  GetAll = '/room/getAll',
  CreateRequest = 'room/create/request',
  CreateSuccess = 'room/create/success',
  CreateError = 'room/create/error',
  CreateReset = 'room/create/reset',
}

export interface IRoomCreate {
  type:
    | RoomActionType.CreateSuccess
    | RoomActionType.CreateRequest
    | RoomActionType.CreateError
    | RoomActionType.CreateReset;
  payload?: IRoom | string;
}

export interface IRoomGetAll {
  type: RoomActionType.GetAll;
  payload: IRoom[];
}

type RoomActions = IRoomCreate | IRoomGetAll;

//UserAction
export enum UserActionType {
  LoginRequest = 'user/login/request',
  LoginSuccess = 'user/login/success',
  LoginError = 'user/login/error',
  LoginReset = 'user/login/reset',
  Logout = 'user/logout',

  RegisterRequest = 'user/register/request',
  RegisterSuccess = 'user/register/success',
  RegisterError = 'user/register/error',
  RegisterReset = 'user/register/reset',
}

export interface IUserLogin {
  type:
    | UserActionType.LoginRequest
    | UserActionType.LoginSuccess
    | UserActionType.LoginError
    | UserActionType.LoginReset;
  payload?: IUser | string;
}
export interface IUserLogout {
  type: UserActionType.Logout;
}

export interface IUserRegister {
  type:
    | UserActionType.RegisterRequest
    | UserActionType.RegisterSuccess
    | UserActionType.RegisterError
    | UserActionType.RegisterReset;
  payload?: string;
}

type UserActions = IUserLogin | IUserLogout | IUserRegister;

export type Actions = UserActions | RoomActions;

//Store
export interface IStatus {
  loading?: boolean;
  message?: string;
  error?: string;
}

export interface IUserState extends IStatus {
  user: IUser | null;
}

export interface IRoomsState extends IStatus {
  rooms: IRoom[];
}

export interface IStoreState {
  userState: IUserState;
  userRegisterState: IStatus;
  roomsState: IRoomsState;
}

export interface IAppContext {
  state: IStoreState;
  dispatch: React.Dispatch<Actions>;
}
