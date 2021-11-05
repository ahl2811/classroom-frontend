import { IUser, IUserResponse } from '../common/types';
import { request } from '../common/utils';

export const login = async (userInfo: IUser) => {
  const { data } = await request.post<IUserResponse>('/users/login', userInfo);
  return data;
};

export const register = async (userInfo: IUser) => {
  const { data } = await request.post<IUserResponse>(
    '/users/register',
    userInfo
  );
  return data;
};
