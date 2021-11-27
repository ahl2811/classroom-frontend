import styled from "styled-components";

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
