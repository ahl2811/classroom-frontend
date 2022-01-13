import React from "react";
import { NotificationStyle } from "./header/style/notification";

interface IProps {
  isRead: boolean;
  title: string;
  content: string;
}

export default function Notification({ isRead, title, content }: IProps) {
  return (
    <NotificationStyle isRead={isRead}>
      <div className="fw-bold">{title}</div>
      <div className="content text-wrap">{content}</div>
    </NotificationStyle>
  );
}
