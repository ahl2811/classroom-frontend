export interface IUser {
  name?: string;
  email: string;
  avatar?: string;
  token?: string;
  password?: string;
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

export interface IResponse {
  error?: string;
  message?: string;
}

export interface IUserResponse extends IResponse {
  user?: IUser;
}

export interface IRoomResponse extends IResponse {
  room?: IRoom;
}

export interface IRoomsResponse extends IResponse {
  rooms?: IRoom[];
}
