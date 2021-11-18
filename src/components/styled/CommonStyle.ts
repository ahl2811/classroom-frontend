import { Container, Navbar } from "react-bootstrap";
import styled from "styled-components";

export const StyledHeader = styled(Navbar)`
  box-shadow: 0px 1px 2px #ccc;
  min-height: 64px;
  padding: 0;

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

export const StyledContainer = styled(Container)`
  max-width: 600px;
  @media (max-width: 620px) {
    max-width: 95%;
  }
`;

export const GradientBackground = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(45deg, #239fe9, #44d5f3);
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
