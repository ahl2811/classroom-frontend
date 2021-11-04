export interface IUser {
  name: string;
  email: string;
  avatar?: string;
  token: string;
}

export interface IRoom {
  name: string;
  code: string;
  owner: IUser;
  description?: string;
  members: IUser[];
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
