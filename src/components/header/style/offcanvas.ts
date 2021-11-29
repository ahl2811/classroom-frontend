import { Navbar } from "react-bootstrap";
import styled from "styled-components";

export const OffCanvasStyle = styled(Navbar.Offcanvas)`
  .offcanvas-body {
    padding: 10px 8px 10px 0;
  }
  .oc-user {
    display: none !important;
  }

  .oc-person {
    padding: 8px 16px;
    background: #fafafa;
    border-radius: 0 20px 20px 0;

    .name {
      font-weight: 500;
      color: #333;
    }

    .email {
      color: #ddd;
      font-size: 14px;
    }

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
