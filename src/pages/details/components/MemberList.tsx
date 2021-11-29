import React, { ReactNode, useState } from "react";
import { Image } from "react-bootstrap";
import { IUser } from "../../../common/types";
import { MembersListStyle } from "../style";
import ModalInviteMembers from "./ModalInviteMembers";
import { IconButtonStyle } from "../../../components/style";

interface IProps {
  title: string;
  members: IUser[];
  memCount?: boolean;
  modal?: ReactNode;
  role: "student" | "teacher" | "owner";
  isTeacher: boolean;
  roomId: string;
}

const MemberList = ({
  title,
  members,
  memCount = false,
  role,
  roomId,
  isTeacher,
}: IProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <MembersListStyle>
      <div className="d-flex flex-row justify-content-between member-title align-items-center mb-3">
        <div className=" text-capitalize member-type">{title}</div>
        <div className="fs-6 mb-2 d-flex flex-row align-items-center">
          <>
            {memCount && (
              <div className="text-truncate member-count">
                {members.length} members
              </div>
            )}
            {isTeacher && (
              <>
                <IconButtonStyle
                  className="ms-3 d-flex member-add ps-2"
                  onClick={() => setShowModal(true)}
                >
                  <i className="bi bi-person-plus-fill"></i>
                </IconButtonStyle>
                <ModalInviteMembers
                  show={showModal}
                  onHide={() => setShowModal(false)}
                  centered
                  roomId={roomId}
                  role={role}
                />
              </>
            )}
          </>
        </div>
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
                `https://ui-avatars.com/api/?name=${member.name}&background=0D8ABC&color=fff`
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
