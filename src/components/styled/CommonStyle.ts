import { Container, Navbar } from "react-bootstrap";
import styled from "styled-components";

export const StyledHeader = styled(Navbar)`
  box-shadow: 0px 1px 2px #ddd;
  min-height: 64px;
  padding: 0;

  .nav-link.active {
    font-weight: 500;
    color: #555 !important;
  }

  .justify-content-mobile {
    justify-content: center;
  }

  @media screen and (max-width: 576px) {
    .user {
      display: none;
    }
  }

  @media screen and (max-width: 348px) {
    .justify-content-mobile {
      justify-content: start;
    }
  }
`;

// export const StyledNav = styled<{}>(Nav)`
//   height: 100%;
//   padding: 0 10px;
//   line-height: 64px;
//   font-weight: bold;

//   &:hover {
//     background: #eee;
//   }

// `;

export const StyledContainer = styled(Container)`
  max-width: 640px;
  @media (max-width: 660px) {
    max-width: 90%;
  }
`;

export const GradientBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(45deg, #239fe9, #44d5f3);
`;
