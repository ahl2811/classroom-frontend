import React from "react";
import { Image } from "react-bootstrap";
import { IUser } from "../common/types";
import { MembersListStyle } from "./styled/CommonStyle";

interface IProps {
  title: string;
  members: IUser[];
  memCount?: boolean;
}

const MemberList = ({ title, members, memCount = false }: IProps) => {
  return (
    <MembersListStyle>
      <div className="d-flex flex-row justify-content-between member-title align-items-end mb-3">
        <div className=" text-capitalize">{title}</div>
        {memCount && <div className="fs-6 mb-2">{members.length} members</div>}
      </div>
      {members.map((member) => (
        <div
          key={member.id}
          className="w-100 h-100 d-flex align-items-center member-person"
        >
          <div className="avatar d-flex align-items-center justify-content-center me-2">
            <Image
              src={
                member.avatar ||
                "https://ui-avatars.com/api/?background=0D8ABC&color=fff"
              }
              roundedCircle
              height={32}
            />
          </div>
          <div className="d-flex flex-grow-1 pe-2">{member.name}</div>
        </div>
      ))}
    </MembersListStyle>
  );
};

export default MemberList;
