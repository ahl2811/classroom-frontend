import { IRoom, IRoomMembersRespone, IRoomsResponse } from "../common/types";
import { getAuthorization, request } from "../common/utils";

export const getRooms = async () => {
  const { data } = await request.get<IRoomsResponse>(
    "/classrooms",
    getAuthorization()
  );
  return data;
};

export const postRoom = async (room: IRoom) => {
  const { data } = await request.post<IRoom>(
    "/classrooms",
    room,
    getAuthorization()
  );
  return data;
};

export const getRoomDetail = async (id: string) => {
  const { data } = await request.get<IRoom>(
    `/classrooms/${id}`,
    getAuthorization()
  );
  return data;
};

export const getRoomMembers = async (id: string) => {
  const { data } = await request.get<IRoomMembersRespone>(
    `/classrooms/${id}/members`,
    getAuthorization()
  );
  return data;
};

export const joinRoom = async (id: string, code: string) => {
  const { data } = await request.get<IRoomMembersRespone>(
    `/classrooms/${id}/join?code=${code}&role=student`,
    getAuthorization()
  );
  return data;
};
