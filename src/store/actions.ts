import { IUser } from "../common/types";
import { IUserLogin, IUserLogout, UserActionType } from "./types";

//User Login
export const LoginSuccess = (user: IUser): IUserLogin => ({
  type: UserActionType.LoginSuccess,
  payload: user,
});

export const Logout = (): IUserLogout => ({ type: UserActionType.Logout });
