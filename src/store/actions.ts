import { IRoom, IUser } from '../common/types';
import {
  IRoomCreate,
  IRoomGetAll,
  IUserLogin,
  IUserLogout,
  IUserRegister,
  RoomActionType,
  UserActionType,
} from './types';

//User Login
export const LoginRequest = (): IUserLogin => ({
  type: UserActionType.LoginRequest,
});
export const LoginSuccess = (user: IUser): IUserLogin => ({
  type: UserActionType.LoginSuccess,
  payload: user,
});
export const LoginError = (error: string): IUserLogin => ({
  type: UserActionType.LoginError,
  payload: error,
});
export const LoginReset = (): IUserLogin => ({
  type: UserActionType.LoginReset,
});
export const Logout = (): IUserLogout => ({ type: UserActionType.Logout });

//User Register
export const RegisterRequest = (): IUserRegister => ({
  type: UserActionType.RegisterRequest,
});
export const RegisterSuccess = (message: string): IUserRegister => ({
  type: UserActionType.RegisterSuccess,
  payload: message,
});
export const RegisterError = (error: string): IUserRegister => ({
  type: UserActionType.RegisterError,
  payload: error,
});
export const RegisterReset = (): IUserRegister => ({
  type: UserActionType.RegisterReset,
});

//Rooms
export const GetAllRooms = (rooms: IRoom[]): IRoomGetAll => ({
  type: RoomActionType.GetAll,
  payload: rooms,
});
export const CreateRoomRequest = (): IRoomCreate => ({
  type: RoomActionType.CreateRequest,
});
export const CreateRoomSuccess = (room: IRoom): IRoomCreate => ({
  type: RoomActionType.CreateSuccess,
  payload: room,
});
export const CreateRoomError = (error: string): IRoomCreate => ({
  type: RoomActionType.CreateError,
  payload: error,
});
export const CreateRoomReset = (): IRoomCreate => ({
  type: RoomActionType.CreateReset,
});
