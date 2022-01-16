import styled from "styled-components";

export const NotificationContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    max-width: 8px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    display: none;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      display: block;
      border-radius: 8px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
      background-color: #bbb;
    }
  }
`;

export const NotificationStyle = styled.div<{ isRead: Boolean }>`
  width: 280px;
  min-height: 40px;
  padding: 0 10px 5px;
  font-size: 14px;
  background: ${(props) => (props.isRead ? "#fff" : "#e4f2ff")};
  &:hover {
    background: ${(props) => (props.isRead ? "#f8f8f8" : "#d7ecff")};
  }

  .content {
    line-height: 1.15;
  }
`;
