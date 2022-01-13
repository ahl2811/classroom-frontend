import { Container } from "react-bootstrap";
import styled from "styled-components";
import { JoinClassPageStyle } from "../../details/style";

export const LoginContainer = styled(Container)`
  max-width: 480px;
  @media (max-width: 500px) {
    max-width: 95%;
  }
`;

export const FullScreenContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

export const ActivationContainer = styled(JoinClassPageStyle)`
  max-width: 700px;
`;
