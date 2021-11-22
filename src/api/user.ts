import { ILoginResponse, IUser } from "../common/types";
import { getAuthorization, request } from "../common/utils";

export const login = async (userInfo: IUser) => {
  return await request.post<ILoginResponse>("/auth/signin", userInfo);
};

export const register = async (userInfo: IUser) => {
  return await request.post("/auth/signup", userInfo);
};

export const updateUserInfo = async (userInfo: {
  name: string;
  studentId: string;
}) => {
  const { data } = await request.patch<IUser>(
    "/user",
    userInfo,
    getAuthorization()
  );
  return data;
};
