import { Navbar } from "react-bootstrap";
import styled from "styled-components";

export const OffCanvasStyle = styled(Navbar.Offcanvas)`
  .oc-user {
    display: none !important;
  }

  .oc-person {
    padding: 12px;
    background: #fafafa;
    border-radius: 20px;

    &:hover {
      background: #f8f8f8;
      cursor: pointer;
    }
    &:active {
      background: #f6f6f6;
    }
  }

  @media screen and (max-width: 767px) {
    .oc-user {
      display: block !important;
    }
  }
`;
