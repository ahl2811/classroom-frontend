import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getRoomMembers } from "../../api/room";
import { ROOM } from "../../common/constants";
import { IErrorResponse, IRoomMembersRespone } from "../../common/types";
import DisplayByStatus from "../../components/DisplayByStatus";
import MemberList from "../../components/MemberList";

const MembersPage = () => {
  const [memList, setMemList] = useState<IRoomMembersRespone>();
  const { id } = useParams<{ id: string }>();

  const { isLoading, error } = useQuery<IRoomMembersRespone, IErrorResponse>(
    ROOM.MEMBERS,
    () => getRoomMembers(`${id}`),
    {
      onSuccess: (response) => {
        setMemList(response);
      },
    }
  );

  const teachers = memList?.teachers || [];
  const students = memList?.students || [];

  if (error || isLoading) {
    return <DisplayByStatus error={error} isLoading={isLoading} />;
  }

  return (
    <Stack>
      <MemberList title="Teachers" members={teachers} />
      <MemberList title="Students" members={students} memCount={true} />
    </Stack>
  );
};

export default MembersPage;
