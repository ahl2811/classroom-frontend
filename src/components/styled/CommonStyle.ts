import { Container, Navbar } from "react-bootstrap";
import styled from "styled-components";

export const StyledHeader = styled(Navbar)`
  box-shadow: 0px 1px 2px #ccc;
  min-height: 64px;
  padding: 0;

  .nav-link {
    padding-left: 16px;
    padding-right: 16px;
  }

  .nav-link.active {
    font-weight: 500;
    color: teal !important;
    border-bottom: solid teal 2px;
  }

  .brand {
    background: linear-gradient(to left, #30cfd0 0%, #330867 100%);
    font-size: 28px;
    font-weight: bold;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media screen and (max-width: 767px) {
    .user {
      display: none;
    }
    .wrapper {
      min-width: 320px;
    }
  }

  @media screen and (max-width: 375px) {
    .justify-content-mobile {
      padding-top: 8px;
    }
    .brand {
      font-size: 24px;
    }
  }
`;

export const LoginContainer = styled(Container)`
  max-width: 480px;
  @media (max-width: 500px) {
    max-width: 95%;
  }
`;

export const GradientBackground = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

export const RoomsPageStyle = styled(Container)`
  padding: 20px;
  @media screen and (max-width: 375px) {
    padding: 20px 12px;
  }
`;

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

export const IconButtonStyle = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 100%;

  text-align: center;
  cursor: pointer;
  border: 0;
  background: transparent;
  color: teal;
  font-size: 24px;
  text-align: center;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  &:active {
    background: rgba(0, 0, 0, 0.1);
  }
`;
