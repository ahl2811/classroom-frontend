import { ILoginResponse, IUser } from "../common/types";
import { request } from "../common/utils";

export const login = async (userInfo: IUser) => {
  return await request.post<ILoginResponse>("/auth/signin", userInfo);
};

export const register = async (userInfo: IUser) => {
  return await request.post("/auth/signup", userInfo);
};
