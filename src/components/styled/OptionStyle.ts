import styled from "styled-components";

export const StyledOptions = styled.div<{
  isActive: boolean;
}>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  padding: 4px;
  text-align: center;
  cursor: pointer;

  ${({ isActive }) =>
    isActive
      ? "background: rgba(0, 0, 0, 0.15);"
      : "&:hover {background: rgba(0, 0, 0, 0.1); .bi, .icon{opacity: 0.85;}}"};

  .icon {
    border-radius: 50%;
    overflow: hidden;
  }
`;

export const OptionMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #eee;
  box-shadow: 0px 1px 1px #999;
  text-align: left;
  padding: 8px 0px;
  white-space: nowrap;
  line-height: 32px;
`;

export const OptionItem = styled.div`
  padding: 0px 16px;
  &:hover {
    background: #eee;
  }
  &:active {
    background: #ddd;
  }
`;
