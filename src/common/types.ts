export interface IUser {
  name?: string;
  email?: string;
  avatar?: string;
  accessToken?: string;
  password?: string;
  id?: string;
}

export interface IRoom {
  id?: string;
  name: string;
  code?: string;
  description?: string;
  section?: string;
  subject?: string;
}

export interface LocationState {
  from: {
    pathname: string;
  };
  search: string;
}

export interface ILoginResponse {
  user: IUser;
  accessToken: string;
}

export interface IErrorResponse {
  response: {
    data: {
      statusCode?: number;
      error?: string;
      message?: string;
    };
  };
}

export interface IRoomDetailResponse {
  teachers: IUser[];
  classroom: IRoom;
}

export interface IRoomMembersResponse {
  teachers: IUser[];
  students: IUser[];
}

export type IRoomsResponse = {
  owner: IUser;
  classroom: IRoom;
}[];
