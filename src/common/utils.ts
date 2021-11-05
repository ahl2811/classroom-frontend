import axios from 'axios';
import { SERVER_URL } from './constants';
import { IUser } from './types';

export const getToken = () => {
  const user: IUser = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null;
  return user?.token || '';
};

export const getAuthorization = () => {
  return { headers: { 'x-token': getToken() } };
};

export const request = axios.create({
  baseURL: `${SERVER_URL}`,
});
