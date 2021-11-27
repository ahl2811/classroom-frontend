import {
  IRoomDetailResponse,
  IRoomMembersResponse,
} from "../../../common/types";
import { getAuthorization, request } from "../../../common/utils";

export const getRoomDetail = async (id: string) => {
  const { data } = await request.get<IRoomDetailResponse>(
    `/classrooms/${id}`,
    getAuthorization()
  );
  return data;
};

export const getRoomMembers = async (id: string) => {
  const { data } = await request.get<IRoomMembersResponse>(
    `/classrooms/${id}/members`,
    getAuthorization()
  );
  return data;
};

export const joinRoom = async ({
  id,
  code,
  role,
}: {
  id: string;
  code: string;
  role: string;
}) => {
  const queryString = `/classrooms/${id}/join?code=${code}&role=${role}`;
  const { data } = await request.get<IRoomMembersResponse>(
    queryString,
    getAuthorization()
  );
  return data;
};

export const inviteByEmail = async ({
  id,
  email,
  role,
}: {
  id: string;
  email: string;
  role: string;
}) => {
  const queryString = `/classrooms/${id}/joinByEmail?email=${email}&role=${role}`;
  const { data } = await request.get<IRoomMembersResponse>(
    queryString,
    getAuthorization()
  );
  return data;
};
