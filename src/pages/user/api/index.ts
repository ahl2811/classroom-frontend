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
