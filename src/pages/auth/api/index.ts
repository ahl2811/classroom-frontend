import { ILoginResponse, IUser } from "../../../common/types";
import { request } from "../../../common/utils";

export const login = async (userInfo: IUser) => {
  return await request.post<ILoginResponse>("/auth/signin", userInfo);
};

export const register = async (userInfo: IUser) => {
  return await request.post("/auth/signup", userInfo);
};

export const activeAccount = async (token: string) => {
  return await request.get(`/auth/activate-account?token=${token}`);
};

export const resetPassword = async (email: string) => {
  return await request.post("/auth/reset-password", { email });
};

export const validateToken = async (token: string) => {
  return await request.get(`/auth/validate-token?token=${token}`);
};

export const addnewPassword = async (data: {
  password: string;
  token: string;
}) => {
  return await request.patch("/auth/password", data);
};
