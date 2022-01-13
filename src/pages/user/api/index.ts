import { IUser } from "../../../common/types";
import { getAuthorization, request } from "../../../common/utils";

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

export const getUser = async (id: string) => {
  const { data } = await request.get<IUser>("/user/" + id, getAuthorization());
  return data;
};

export const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  return await request.patch("/user/password", data, getAuthorization());
};
