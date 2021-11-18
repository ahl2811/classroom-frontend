import { IUser } from "../common/types";
import { request } from "../common/utils";

export const login = async (userInfo: IUser) => {
  return await request.post<IUser>("/auth/signin", userInfo);
};

export const register = async (userInfo: IUser) => {
  return await request.post("/auth/signup", userInfo);
};
