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
      ? "background: rgba(0, 0, 0, 0.1);"
      : "&:hover {background: rgba(0, 0, 0, 0.05); .blur-hover{opacity: 0.85}}"};

  .icon {
    border-radius: 50%;
    overflow: hidden;
  }

  .link-item {
    color: inherit;
  }
`;

export const OptionMenu = styled.div<{ menuCenter?: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background: #fff;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  text-align: left;
  padding: 8px 0px;
  white-space: nowrap;
  line-height: 32px;
  min-width: 160px;
  background-clip: padding-box;
  z-index: 9999;

  ${(props) =>
    props.menuCenter &&
    "right: 50%; transform: translate(50%, 0); @media screen and (max-width: 767px){right: 0; transform: none}"}
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
