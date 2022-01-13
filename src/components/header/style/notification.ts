import styled from "styled-components";

export const NotificationContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
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
