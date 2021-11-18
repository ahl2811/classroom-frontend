import React from "react";
import { Stack } from "react-bootstrap";
import { IUser } from "../../common/types";
import MemberList from "../../components/MemberList";

const members: IUser[] = [
  { id: "1", name: "hao 1" },
  { id: "2", name: "Hao 2" },
  { id: "3", name: "hao 3" },
  { id: "4", name: "Hao 4" },
  { id: "5", name: "hao 5" },
  { id: "6", name: "Hao 6" },
];

const teachers: IUser[] = [{ id: "1", name: "Teacher 1" }];

const MembersPage = () => {
  return (
    <Stack>
      <MemberList title="Teachers" members={teachers} />
      <MemberList title="Students" members={members} memCount={true} />
    </Stack>
  );
};

export default MembersPage;
