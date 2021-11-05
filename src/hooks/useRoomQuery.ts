import { useMutation, useQueryClient } from 'react-query';
import { postRoom } from '../api/room';
import { ROOM } from '../common/constants';
import { IRoom, IRoomsResponse, IUser } from '../common/types';

export const useRoomCreate = (user: IUser) => {
  const queryClient = useQueryClient();

  return useMutation(ROOM.CREATE, postRoom, {
    onSuccess: (response) => {
      if (response.data.error) return;
      if (response.data.room) {
        response.data.room.owner = user;
      }
      queryClient.setQueryData<IRoomsResponse>(ROOM.GET, (oldQueryData) => {
        return {
          ...oldQueryData,
          rooms: [
            ...(oldQueryData?.rooms as IRoom[]),
            response.data.room as IRoom,
          ],
        };
      });
    },
  });
};
