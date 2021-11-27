import { Card, Container } from "react-bootstrap";
import styled from "styled-components";

export const RoomDetailsStyle = styled(Container)`
  max-width: 1000px;
  padding: 0px 24px;

  .banner {
    height: 240px;
    background: teal;
  }

  .notify-item {
    margin-bottom: 24px;
    border-radius: 8px;
  }

  @media screen and (max-width: 636px) {
    .banner {
      height: 180px;
      .class-name {
        font-size: 24px;
      }
      .class-description {
        font-size: 18px;
      }
    }
  }

  @media screen and (max-width: 425px) {
    padding: 0 12px;
    .notify-item {
      margin-bottom: 8px;
    }
  } ;
`;

export const MembersListStyle = styled(Container)`
  max-width: 760px;

  .member-title {
    font-size: 32px;
    color: teal;
    border-bottom: solid 1px teal;
    padding: 0 16px 8px;
    margin: 8px 0;

    @media screen and (max-width: 375px) {
      padding: 0 4px 8px;

      .member-type {
        font-size: 28px;
      }

      .member-count {
        font-size: 14px;
      }

      .member-add {
        margin-left: 8px !important;
      }
    }
  }

  .member-person {
    padding: 10px;
    height: 60px;
    margin-top: 8px;
    border-bottom: solid 1px #ddd;

    &:last-child {
      border: 0;
      margin-bottom: 12px;
    }
  }

  .avatar {
    width: 52px;
    height: 100%;
  }
`;

export const JoinClassPageStyle = styled(Container)`
  padding: 28px 20px;

  .join-class-container {
    max-width: 760px;
    padding: 0;
    border: solid 1px #ccc;
    border-radius: 8px;
    margin: 0 auto;
  }

  .join-class-banner {
    border-radius: 8px 8px 0 0;
    background-color: #eee;
    text-align: center;
    padding: 20px;
  }

  .join-class-footer {
    font-size: 14px;
  }

  @media screen and (max-width: 375px) {
    padding: 16px 12px;
  }
`;

export const CodeCard = styled(Card)`
  .code {
    font-size: 18px;
    color: teal;
    font-weight: 500;
    letter-spacing: 1px;
  }
  .notify-deadline {
    font-size: 14px;
    color: #ccc;
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
