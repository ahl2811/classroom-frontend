import { useMutation, useQueryClient } from "react-query";
import { postRoom } from "../api/room";
import { ROOM } from "../common/constants";
import { IRoomsResponse, IUser } from "../common/types";

export const useRoomCreate = (user: IUser) => {
  const queryClient = useQueryClient();

  return useMutation(ROOM.CREATE, postRoom, {
    onSuccess: (room) => {
      queryClient.setQueryData<IRoomsResponse>(ROOM.GET, (oldQueryData) => {
        return [
          ...(oldQueryData as IRoomsResponse),
          { owner: user, classroom: room },
        ];
      });
    },
  });
};
