import { Navbar, Container } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledHeader = styled(Navbar)`
  box-shadow: 0px 1px 2px #ddd;
`;

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
