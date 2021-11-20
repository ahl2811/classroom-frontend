import { Card } from "react-bootstrap";
import styled from "styled-components";

export const RoomCard = styled(Card)`
  &:hover {
    box-shadow: 0px 0px 8px #ddd;
  }
  .title {
    max-width: 80%;
    font-size: 20px;
  }
  .body {
    height: 120px;
  }
  .owner {
    text-transform: capitalize;
    font-weight: normal;
    cursor: pointer;
  }
  .link {
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const CodeCard = styled(Card)`
  .code {
    font-size: 18px;
    color: teal;
    font-weight: 500;
    letter-spacing: 1px;
  }
`;

export const PostNotifyCard = styled(Card)`
  height: 72px;
  box-shadow: 0 0 8px #ccc;
  display: flex;
  cursor: pointer;

  .avatar {
    width: 72px;
  }

  .notify-intro {
    font-size: 14px;
    color: #555;
  }

  &:hover {
    .notify-intro {
      color: teal;
    }
  }
`;
