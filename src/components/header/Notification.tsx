import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { readNotification } from "../../pages/notifications/api";
import { NotificationStyle } from "./style/notification";

interface IProps {
  isRead: boolean;
  title: string;
  content: string;
  id: string;
  link: string;
}

export default function Notification({
  isRead,
  title,
  content,
  link,
  id,
}: IProps) {
  const history = useHistory();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation("read-notification", readNotification, {
    onSuccess: () => {
      queryClient.invalidateQueries("notifications");
    },
  });

  const handleClick = () => {
    mutateAsync({ notiId: id });
    history.push(link);
  };

  return (
    <NotificationStyle isRead={isRead} onClick={handleClick}>
      <div className="fw-bold">{title}</div>
      <div className="content text-wrap">{content}</div>
    </NotificationStyle>
  );
}
