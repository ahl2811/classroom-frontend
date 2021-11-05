import { IRoom, IRoomResponse, IRoomsResponse } from '../common/types';
import { getAuthorization, request } from '../common/utils';

export const getRooms = async () => {
  const { data } = await request.get<IRoomsResponse>(
    '/rooms',
    getAuthorization()
  );
  return data;
};

export const postRoom = async (room: IRoom) => {
  return await request.post<IRoomResponse>('/rooms', room, getAuthorization());
};
