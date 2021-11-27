import { Container } from "react-bootstrap";
import styled from "styled-components";

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
