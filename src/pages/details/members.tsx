import React from "react";
import { useParams } from "react-router";
import DisplayByStatus from "../../components/DisplayByStatus";
import useMembers from "../../hooks/useMembers";
import MemberList from "./components/MemberList";
import { RoomDetailsStyle } from "./style";

const MembersPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isTeacher, isLoading, error, data: memList } = useMembers(id);

  const teachers = memList?.teachers || [];
  const students = memList?.students || [];

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
