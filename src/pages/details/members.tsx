import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { ROOM } from "../../common/constants";
import { IErrorResponse, IRoomMembersResponse } from "../../common/types";
import DisplayByStatus from "../../components/DisplayByStatus";
import useUserContext from "../../hooks/useUserContext";
import { getRoomMembers } from "./api";
import MemberList from "./components/MemberList";
import { RoomDetailsStyle } from "./style";

const MembersPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUserContext();

  const {
    isLoading,
    error,
    data: memList,
  } = useQuery<IRoomMembersResponse, IErrorResponse>([ROOM.MEMBERS, id], () =>
    getRoomMembers(`${id}`)
  );

  const teachers = memList?.teachers || [];
  const students = memList?.students || [];

  const isTeacher = teachers.findIndex((t) => t.id === user?.id) !== -1;

  if (error || isLoading) {
    return <DisplayByStatus error={error} isLoading={isLoading} />;
  }

  return (
    <RoomDetailsStyle>
      <MemberList
        title="Teachers"
        members={teachers}
        isTeacher={isTeacher}
        roomId={id}
        role="teacher"
      />
      <MemberList
        title="Students"
        members={students}
        memCount={true}
        isTeacher={isTeacher}
        roomId={id}
        role="student"
      />
    </RoomDetailsStyle>
  );
};

export default MembersPage;
