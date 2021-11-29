import { Container } from "react-bootstrap";
import styled from "styled-components";

export const IconButtonStyle = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  cursor: pointer;
  border: 0;
  background: transparent;
  color: teal;
  font-size: 24px;
  line-height: 40px;
  text-align: center;
  outline: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  &:active {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const PageContainer = styled(Container)`
  padding: 28px 24px;

  @media screen and (max-width: 425px) {
    padding: 16px 12px;
  }
`;
