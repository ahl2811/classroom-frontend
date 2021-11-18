export interface IUser {
  name?: string;
  email?: string;
  avatar?: string;
  accessToken?: string;
  password?: string;
  id?: string;
}

export interface IRoom {
  name: string;
  code?: string;
  owner?: IUser;
  description?: string;
  members?: IUser[];
}

export interface LocationState {
  from: {
    pathname: string;
  };
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

interface IError {
  statusCode?: number;
  error?: string;
  message?: string;
}

export interface ILoginResponse {
  user: IUser;
}

export interface IRoomResponse extends IError {
  room?: IRoom;
}

export interface IRoomsResponse extends IError {
  rooms?: IRoom[];
}
