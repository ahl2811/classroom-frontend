import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { ROOM } from "../../common/constants";
import { IErrorResponse, IRoomMembersResponse } from "../../common/types";
import DisplayByStatus from "../../components/DisplayByStatus";
import MemberList from "./components/MemberList";
import useUserContext from "../../hooks/useUserContext";
import { getRoomMembers } from "./api";

const MembersPage = () => {
  const [memList, setMemList] = useState<IRoomMembersResponse>();
  const { id } = useParams<{ id: string }>();
  const { user } = useUserContext();

  const { isLoading, error } = useQuery<IRoomMembersResponse, IErrorResponse>(
    [ROOM.MEMBERS, id],
    () => getRoomMembers(`${id}`),
    {
      onSuccess: (response) => {
        setMemList(response);
      },
    }
  );

  const teachers = memList?.teachers || [];
  const students = memList?.students || [];

  const isTeacher = teachers.findIndex((t) => t.id === user?.id) !== -1;

  if (error || isLoading) {
    return <DisplayByStatus error={error} isLoading={isLoading} />;
  }

  return (
    <Stack>
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
    </Stack>
  );
};

export default MembersPage;
