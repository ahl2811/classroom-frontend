import { Navbar } from "react-bootstrap";
import styled from "styled-components";

export const HeaderStyle = styled(Navbar)`
  box-shadow: 0px 1px 2px #ccc;
  min-height: 64px;
  padding: 0 24px;

  .nav-link {
    padding-left: 16px;
    padding-right: 16px;
  }

  .nav-link.active {
    font-weight: 500;
    color: teal !important;
    border-bottom: solid teal 4px;
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

  @media screen and (max-width: 425px) {
    padding: 0 12px;
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
