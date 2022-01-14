import React from "react";
import { Image } from "react-bootstrap";
import styled from "styled-components";
import { IUser } from "../../../common/types";
import { getAvatarUrl } from "../../../common/utils";

interface IProps {
  sender: IUser;
  message: string;
}

export const Comment = ({ sender, message }: IProps) => {
  return (
    <CommentStyle>
      <div className="w-100 h-100 d-flex align-items-start mb-2">
        <div className="avatar d-flex align-items-center justify-content-center me-2 mt-2">
          <Image
            src={getAvatarUrl(String(sender?.name))}
            roundedCircle
            height={32}
          />
        </div>
        <div className="d-flex flex-grow-1 flex-column ms-1">
          <div className="name">{sender?.name}</div>
          <div className="content">{message}</div>
        </div>
      </div>
    </CommentStyle>
  );
};

export const CommentStyle = styled.div`
  .name {
    font-weight: 500;
    margin-bottom: 2px;
    color: #333;
  }
  .content {
    font-size: 14px;
  }
`;
