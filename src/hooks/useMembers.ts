import { useQuery } from "react-query";
import { ROOM } from "../common/constants";
import { IErrorResponse, IRoomMembersResponse } from "../common/types";
import { getRoomMembers } from "../pages/details/api";
import useUserContext from "./useUserContext";

const useMembers = (roomId: string) => {
  const { user } = useUserContext();

  const { isLoading, error, data } = useQuery<
    IRoomMembersResponse,
    IErrorResponse
  >([ROOM.MEMBERS, roomId], () => getRoomMembers(`${roomId}`));

  const teachers = data?.teachers || [];

  const isTeacher = teachers.findIndex((t) => t.id === user?.id) !== -1;

  return { isTeacher, isLoading, error, data };
};

export default useMembers;
