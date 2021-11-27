import { IRoom, IRoomsResponse } from "../../../common/types";
import { getAuthorization, request } from "../../../common/utils";

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
